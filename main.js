// SABORES NA BRAZA — comportamento partilhado
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- header scroll state ---------- */
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (!header) return;
    if (window.scrollY > 30) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('is-open');
      links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', links.classList.contains('is-open'));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('is-open');
        links.classList.remove('is-open');
      });
    });
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- menu sticky pill nav: scroll shadow + active state ---------- */
  var menuNav = document.querySelector('.menu-nav');
  if (menuNav) {
    document.addEventListener('scroll', function () {
      if (window.scrollY > 200) menuNav.classList.add('is-scrolled');
      else menuNav.classList.remove('is-scrolled');
    }, { passive: true });

    var pills = menuNav.querySelectorAll('.menu-pill');
    var sections = Array.prototype.slice.call(pills).map(function (p) {
      return document.querySelector(p.getAttribute('href'));
    });
    var setActive = function () {
      var pos = window.scrollY + 180;
      var current = 0;
      sections.forEach(function (sec, i) {
        if (sec && sec.offsetTop <= pos) current = i;
      });
      pills.forEach(function (p, i) {
        p.classList.toggle('is-active', i === current);
      });
    };
    document.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  /* ---------- gallery filter ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var figures = document.querySelectorAll('.masonry figure');
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var cat = btn.getAttribute('data-filter');
        figures.forEach(function (fig) {
          var show = cat === 'all' || fig.getAttribute('data-cat') === cat;
          fig.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- lightbox ---------- */
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbCap = lightbox.querySelector('.lightbox-cap');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    document.querySelectorAll('.masonry figure img').forEach(function (img) {
      img.addEventListener('click', function () {
        lbImg.src = img.getAttribute('data-full') || img.src;
        lbImg.alt = img.alt;
        lbCap.textContent = img.alt;
        lightbox.classList.add('is-open');
      });
    });
    var closeLb = function () { lightbox.classList.remove('is-open'); };
    closeBtn.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  }

});
