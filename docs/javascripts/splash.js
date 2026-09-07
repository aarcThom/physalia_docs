/* Splash logo decomposition.
 *
 * Draws the Physalia wordmark as its ~557 dots on a canvas, then scatters them
 * as the visitor scrolls. Dot centres come from logo-dots.js, generated from
 * the source SVG.
 *
 * Canvas rather than DOM nodes: 557 elements would be restyled on every scroll
 * event, which stutters. One canvas does not.
 */
(function () {
  "use strict";

  /* --- Tweakables -------------------------------------------------------
   * BOIL is the hand-drawn shimmer: every dot is redrawn a hair off its true
   * position, and the offsets swap a few times a second. The look comes from
   * cycling a SMALL number of fixed drawings at a LOW frame rate, the way
   * animation on paper boils, so avoid raising STATES or FPS much. Smooth,
   * high-rate motion reads as floating instead.
   */
  var BOIL_PX = 0.4; // how far a dot strays from true, in CSS pixels
  var BOIL_FPS = 9; // how often the drawing swaps
  var BOIL_STATES = 3; // how many drawings it cycles through
  var FIT = 0.75; // fraction of the available box the wordmark fills
  var SCATTER = 0.55; // portion of the scroll each dot takes to leave

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
       shortest throw is set just above 1.

       `boil` holds this dot's fixed jitter offsets, one per drawing. */
    var rnd = mulberry32(0x5eed);
    var parts = logo.dots.map(function (d) {
      var ang = rnd() * Math.PI * 2;
      var dx = Math.cos(ang);
      var dy = Math.sin(ang) - 0.35;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;

      var boil = [];
      for (var k = 0; k < BOIL_STATES; k++) {
        boil.push([(rnd() * 2 - 1) * BOIL_PX, (rnd() * 2 - 1) * BOIL_PX]);
      }

      return {
        x: d[0],
        y: d[1],
        dx: dx / len,
        dy: dy / len,
        spread: 1.05 + rnd() * 0.85,
        delay: rnd() * 0.45,
        boil: boil
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
      var top = stage.getBoundingClientRect().top - hero.getBoundingClientRect().top;
      var p = top / run;
      return p < 0 ? 0 : p > 1 ? 1 : p;
    }

    function draw(p, state) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, sw, sh);
      ctx.fillStyle = ink;

      var r0 = logo.r * scale;
      var diag = Math.sqrt(sw * sw + sh * sh);

      for (var i = 0; i < parts.length; i++) {
        var q = parts[i];

        /* Each dot runs its own 0..1 over a window of the scroll, so the
           wordmark crumbles progressively instead of leaving all at once. */
        var t = (p - q.delay) / SCATTER;
        t = t < 0 ? 0 : t > 1 ? 1 : t;

        var off = diag * q.spread * t * t; // accelerate outward
        var j = q.boil[state];
        var x = ox + q.x * scale + q.dx * off + j[0];
        var y = oy + q.y * scale + q.dy * off + j[1];

        /* Dots keep full opacity and full size, so they leave the frame intact
           rather than dissolving and survive to be recalled into the next
           shape. Anything past the edge is simply not drawn. */
        if (x < -r0 || x > sw + r0 || y < -r0 || y > sh + r0) continue;

        ctx.beginPath();
        ctx.arc(x, y, r0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* The boil needs a running clock, but only while there is something to
       see: the loop is parked whenever the stage scrolls out of view or the
       tab is hidden, and it repaints only when the drawing or the scroll
       position has actually changed. */
    var raf = null;
    var inView = true;
    var boilState = 0;
    var boilAt = 0;
    var lastP = -1;

    function tick(ts) {
      raf = window.requestAnimationFrame(tick);

      var changed = false;
      if (ts - boilAt >= 1000 / BOIL_FPS) {
        boilAt = ts;
        boilState = (boilState + 1) % BOIL_STATES;
        changed = true;
      }

      var p = progress();
      if (p !== lastP) {
        lastP = p;
        changed = true;
      }

      if (changed) draw(p, boilState);
    }

    function start() {
      if (reduce || raf !== null || document.hidden || !inView) return;
      boilAt = 0;
      raf = window.requestAnimationFrame(tick);
    }

    function stop() {
      if (raf !== null) {
        window.cancelAnimationFrame(raf);
        raf = null;
      }
    }

    function redrawOnce() {
      lastP = reduce ? 0 : progress();
      draw(lastP, boilState);
    }

    resize();
    redrawOnce();
    start();

    var io = null;
    if (window.IntersectionObserver) {
      io = new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView) start();
        else stop();
      });
      io.observe(stage);
    }

    var onResize = function () {
      resize();
      redrawOnce();
    };

    /* requestAnimationFrame does not fire in a hidden tab, so a page opened in
       the background never gets its first paint. Redraw when it becomes
       visible, and after a back/forward cache restore. */
    var onShow = function () {
      if (document.hidden) {
        stop();
      } else {
        resize();
        redrawOnce();
        start();
      }
    };

    /* With the loop parked, scrolling still has to repaint. */
    var onScroll = function () {
      if (raf === null && !reduce) redrawOnce();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onShow);
    window.addEventListener("pageshow", onShow);

    teardown = function () {
      stop();
      if (io) io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onShow);
      window.removeEventListener("pageshow", onShow);
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
