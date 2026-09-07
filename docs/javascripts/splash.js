/* Splash logo decomposition.
 *
 * Draws the Physalia wordmark as its ~557 dots on a canvas, then scatters them
 * as the visitor scrolls. Dot centres come from logo-dots.js, generated from
 * the source SVG.
 *
 * Canvas rather than DOM nodes: 557 elements would be redrawn on every scroll
 * event, which stutters. One canvas does not.
 */
(function () {
  "use strict";

  var teardown = null;

  /* Small seeded PRNG, so the scatter is identical on every visit rather than
     rearranging itself each load. */
  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function init() {
    if (teardown) {
      teardown();
      teardown = null;
    }

    var canvas = document.querySelector("[data-phy-logo]");
    if (!canvas || !window.PHY_LOGO) return;

    var logo = window.PHY_LOGO;
    var hero = canvas.closest(".phy-hero");
    var stage = canvas.parentNode;
    var ctx = canvas.getContext("2d");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Per-dot scatter parameters. Direction is a unit vector with an upward
       bias, so the logo reads as lifting apart rather than simply exploding.
       `spread` is a multiple of the canvas diagonal, which keeps the travel
       resolution-independent and guarantees every dot clears the viewport: the
       longest escape a dot inside the frame can need is one diagonal, so the
       shortest throw is set just above 1. */
    var rnd = mulberry32(0x5eed);
    var parts = logo.dots.map(function (d) {
      var ang = rnd() * Math.PI * 2;
      var dx = Math.cos(ang);
      var dy = Math.sin(ang) - 0.35;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      return {
        x: d[0],
        y: d[1],
        dx: dx / len,
        dy: dy / len,
        spread: 1.05 + rnd() * 0.85,
        delay: rnd() * 0.45
      };
    });

    var dpr, sw, sh, scale, ox, oy, ink;

    function resize() {
      /* The dot colour comes from the --phy-ink custom property so the header
         and the dots stay in step from one place. logo.fill, baked in from the
         source SVG, is the fallback if the property is ever missing. */
      ink =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--phy-ink")
          .trim() || logo.fill;

      var rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      sw = rect.width;
      sh = rect.height;
      canvas.width = Math.round(sw * dpr);
      canvas.height = Math.round(sh * dpr);

      var pad = sw < 700 ? 20 : 64;
      /* FIT is the fraction of the available box the wordmark occupies. */
      var FIT = 0.75;
      scale = Math.min((sw - pad * 2) / logo.w, (sh - pad * 2) / logo.h) * FIT;
      ox = (sw - logo.w * scale) / 2;
      oy = (sh - logo.h * scale) / 2;
    }

    /* 0 while the stage is still travelling into place, 1 once the hero has
       been scrolled through. Self-calibrating: before the stage pins, its top
       tracks the hero's, so the difference is 0. */
    function progress() {
      var run = hero.offsetHeight - stage.offsetHeight;
      if (run <= 0) return 0;
      var p = (stage.getBoundingClientRect().top - hero.getBoundingClientRect().top) / run;
      return p < 0 ? 0 : p > 1 ? 1 : p;
    }

    function draw(p) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, sw, sh);
      ctx.fillStyle = ink;

      var r0 = logo.r * scale;
      var diag = Math.sqrt(sw * sw + sh * sh);

      for (var i = 0; i < parts.length; i++) {
        var q = parts[i];

        /* Each dot runs its own 0..1 over a window of the scroll, so the
           wordmark crumbles progressively instead of leaving all at once. */
        var t = (p - q.delay) / 0.55;
        t = t < 0 ? 0 : t > 1 ? 1 : t;

        var off = diag * q.spread * t * t; // accelerate outward
        var x = ox + q.x * scale + q.dx * off;
        var y = oy + q.y * scale + q.dy * off;

        /* Dots keep full opacity and full size — they leave the frame intact
           rather than dissolving, so they survive to be recalled into the next
           shape. Anything past the edge is simply not drawn. */
        if (x < -r0 || x > sw + r0 || y < -r0 || y > sh + r0) continue;

        ctx.beginPath();
        ctx.arc(x, y, r0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    var frame = null;
    function render() {
      frame = null;
      draw(reduce ? 0 : progress());
    }
    function request() {
      if (frame === null) frame = requestAnimationFrame(render);
    }

    resize();
    request();

    var onScroll = function () {
      request();
    };
    var onResize = function () {
      resize();
      request();
    };
    /* requestAnimationFrame does not fire in a hidden tab, so a page opened in
       the background never gets its first paint. Redraw when it becomes
       visible, and after a back/forward cache restore. */
    var onShow = function () {
      if (!document.hidden) {
        resize();
        request();
      }
    };

    if (!reduce) window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onShow);
    window.addEventListener("pageshow", onShow);

    teardown = function () {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onShow);
      window.removeEventListener("pageshow", onShow);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }

  /* navigation.instant swaps pages without a reload, so hook the theme's
     per-page observable when it exists. */
  if (typeof document$ !== "undefined" && document$ && document$.subscribe) {
    document$.subscribe(init);
  } else if (document.readyState !== "loading") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
