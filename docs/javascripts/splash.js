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

    /* Per-dot scatter parameters, in viewBox units. The upward bias reads as
       the logo lifting apart rather than simply exploding. */
    var rnd = mulberry32(0x5eed);
    var parts = logo.dots.map(function (d) {
      var ang = rnd() * Math.PI * 2;
      return {
        x: d[0],
        y: d[1],
        dx: Math.cos(ang),
        dy: Math.sin(ang) - 0.35,
        dist: 260 + rnd() * 900,
        delay: rnd() * 0.45
      };
    });

    var dpr, sw, sh, scale, ox, oy;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      sw = rect.width;
      sh = rect.height;
      canvas.width = Math.round(sw * dpr);
      canvas.height = Math.round(sh * dpr);

      var pad = sw < 700 ? 20 : 64;
      scale = Math.min((sw - pad * 2) / logo.w, (sh - pad * 2) / logo.h);
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
      ctx.fillStyle = logo.fill;

      var r0 = logo.r * scale;
      for (var i = 0; i < parts.length; i++) {
        var q = parts[i];

        /* Each dot runs its own 0..1 over a window of the scroll, so the
           wordmark crumbles progressively instead of leaving all at once. */
        var t = (p - q.delay) / 0.55;
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        if (t >= 1) continue;

        var e = t * t; // accelerate outward
        ctx.globalAlpha = 1 - t;
        ctx.beginPath();
        ctx.arc(
          ox + (q.x + q.dx * q.dist * e) * scale,
          oy + (q.y + q.dy * q.dist * e) * scale,
          r0 * (1 - 0.35 * t),
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
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
