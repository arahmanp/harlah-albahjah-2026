/**
 * INDEX.JS — Al-Bahjah Harlah 2026
 * Scripts specific to the Home page
 */

$(function () {

  /* ============================================================
     THEME TOGGLE
     ============================================================ */
  const $html = $('html');
  const $toggleBtn = $('#themeToggle');
  const $icon = $toggleBtn.find('i');

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    $html.attr('data-theme', theme);
    localStorage.setItem('harlah-theme', theme);
    if (theme === 'dark') {
      $icon.removeClass('bi-sun-fill').addClass('bi-moon-stars-fill');
    } else {
      $icon.removeClass('bi-moon-stars-fill').addClass('bi-sun-fill');
    }
  }

  // Init theme
  const savedTheme = localStorage.getItem('harlah-theme') || getSystemTheme();
  applyTheme(savedTheme);

  $toggleBtn.on('click', function () {
    const current = $html.attr('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Listen to system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('harlah-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });


  /* ============================================================
     NAVBAR — Scroll Effect & Active Link
     ============================================================ */
  const $navbar = $('#mainNavbar');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 40) {
      $navbar.addClass('scrolled');
    } else {
      $navbar.removeClass('scrolled');
    }

    // Active nav link based on section in view
    let currentSection = '';
    $('section[id]').each(function () {
      const sTop = $(this).offset().top - 120;
      if ($(window).scrollTop() >= sTop) {
        currentSection = $(this).attr('id');
      }
    });

    $('.navbar-links a, .mobile-menu a').each(function () {
      $(this).removeClass('active');
      if ($(this).attr('href') === '#' + currentSection) {
        $(this).addClass('active');
      }
    });
  });


  /* ============================================================
     MOBILE MENU
     ============================================================ */
  $('#navToggler').on('click', function () {
    $('#mobileMenu').toggleClass('open');
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('#mainNavbar, #mobileMenu').length) {
      $('#mobileMenu').removeClass('open');
    }
  });

  $('#mobileMenu a').on('click', function () {
    $('#mobileMenu').removeClass('open');
  });


  /* ============================================================
     HERO — Trigger loaded class for parallax
     ============================================================ */
  setTimeout(function () {
    $('#hero').addClass('loaded');
  }, 100);


  /* ============================================================
     COUNTDOWN TIMER
     Target: 1 June 2026, 00:00:00
     ============================================================ */
  const targetDate = new Date('2026-06-25T00:00:00');

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      $('#cd-days').text('00');
      $('#cd-hours').text('00');
      $('#cd-mins').text('00');
      $('#cd-secs').text('00');
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    function pad(n) { return n < 10 ? '0' + n : n; }

    $('#cd-days').text(pad(days));
    $('#cd-hours').text(pad(hours));
    $('#cd-mins').text(pad(minutes));
    $('#cd-secs').text(pad(seconds));
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  /* ============================================================
     FAQ ACCORDION
     ============================================================ */
  $('.faq-question').on('click', function () {
    const $item = $(this).closest('.faq-item');
    const isOpen = $item.hasClass('open');

    // Close all
    $('.faq-item').removeClass('open');
    $('.faq-answer').removeClass('open');

    // Open clicked if it was closed
    if (!isOpen) {
      $item.addClass('open');
      $item.find('.faq-answer').addClass('open');
    }
  });


  /* ============================================================
     SCROLL FADE-IN (IntersectionObserver)
     ============================================================ */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        $(entry.target).addClass('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(function (el) {
    observer.observe(el);
  });


  /* ============================================================
     SMOOTH SCROLL for nav links
     ============================================================ */
  $(document).on('click', 'a[href^="#"]', function (e) {
    const target = $(this).attr('href');
    if (target === '#' || !$(target).length) return;
    e.preventDefault();
    const offset = $(target).offset().top - 90;
    $('html, body').animate({ scrollTop: offset }, 600, 'swing');
  });

});
