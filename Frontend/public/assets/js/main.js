/**
* Template Name: Sailor - v2.0.0
* Optimized for High Performance (Core Web Vitals & Zero Forced Reflows)
*/
!(function($) {
  "use strict";

  // Helper to safely and consistently close mobile navigation
  function closeMobileNav() {
    if (document.body.classList.contains('mobile-nav-active')) {
      document.body.classList.remove('mobile-nav-active');
      var toggleIcon = document.querySelector('.mobile-nav-toggle i');
      if (toggleIcon) {
        toggleIcon.classList.remove('icofont-close');
        toggleIcon.classList.add('icofont-navigation-menu');
      }
      var overlay = document.querySelector('.mobile-nav-overly');
      if (overlay) {
        $(overlay).fadeOut(200);
      }
    }
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if ($(this).is('.drop-down > a') || $(this).attr('href') === '#' || $(this).attr('href') === 'javascript:void(0)') {
      return;
    }

    if (location.pathname.replace(/^\//, '').toLowerCase() === this.pathname.replace(/^\//, '').toLowerCase() && location.hostname === this.hostname) {
      var hash = this.hash;
      if (hash && hash !== '#' && $(hash).length) {
        e.preventDefault();
        var target = $(hash);
        var headerEl = document.getElementById('header');
        var headerOffset = headerEl ? headerEl.offsetHeight : 0;
        var scrollto = target.offset().top - headerOffset;

        if ($(this).attr("href") == '#header' || $(this).attr("href") == '#top') {
          scrollto = 0;
        }

        window.scrollTo({
          top: Math.max(0, scrollto),
          behavior: 'smooth'
        });

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        closeMobileNav();
        return false;
      }
    }
  });

  // Mobile Navigation Setup
  if ($('.nav-menu').length) {
    if (!$('.mobile-nav').length) {
      var $mobile_nav = $('.nav-menu').clone().prop({
        class: 'mobile-nav d-lg-none'
      });
      $('body').append($mobile_nav);
    }
    if (!$('.mobile-nav-toggle').length) {
      $('.header-right').append('<button type="button" class="mobile-nav-toggle d-lg-none" aria-label="Toggle navigation"><i class="icofont-navigation-menu"></i></button>');
    }
    if (!$('.mobile-nav-overly').length) {
      $('body').append('<div class="mobile-nav-overly"></div>');
    }

    // Toggle Mobile Navigation Menu Open/Close
    $(document).off('click', '.mobile-nav-toggle').on('click', '.mobile-nav-toggle', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var willBeActive = !document.body.classList.contains('mobile-nav-active');
      document.body.classList.toggle('mobile-nav-active', willBeActive);
      var toggleIcon = document.querySelector('.mobile-nav-toggle i');
      var overlay = document.querySelector('.mobile-nav-overly');
      if (willBeActive) {
        if (toggleIcon) {
          toggleIcon.classList.remove('icofont-navigation-menu');
          toggleIcon.classList.add('icofont-close');
        }
        if (overlay) $(overlay).fadeIn(200);
      } else {
        if (toggleIcon) {
          toggleIcon.classList.remove('icofont-close');
          toggleIcon.classList.add('icofont-navigation-menu');
        }
        if (overlay) $(overlay).fadeOut(200);
      }
    });

    // Mobile Dropdown Submenu Toggle
    $(document).off('click', '.mobile-nav .drop-down > a').on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var $parent = $(this).parent();
      var $nextUl = $(this).next('ul');

      $parent.siblings('.drop-down.active').removeClass('active').find('> ul').slideUp(250);
      $nextUl.slideToggle(250);
      $parent.toggleClass('active');
    });

    // Handle single-tap navigation for mobile nav links
    $(document).off('click', '.mobile-nav a:not(.drop-down > a)').on('click', '.mobile-nav a:not(.drop-down > a)', function(e) {
      var href = $(this).attr('href');
      if (!href || href === '#' || href.startsWith('javascript:')) {
        return;
      }

      var isModal = $(this).is('[data-toggle="modal"], [data-bs-toggle="modal"], [data-target], [data-bs-target]');
      if (isModal) {
        closeMobileNav();
        return;
      }

      if (this.hash && this.hash !== '#' && $(this.hash).length && 
          location.pathname.replace(/^\//, '').toLowerCase() === this.pathname.replace(/^\//, '').toLowerCase()) {
        return;
      }

      var linkPath = this.pathname.replace(/^\//, '').toLowerCase();
      var currPath = location.pathname.replace(/^\//, '').toLowerCase();
      if (linkPath === currPath && this.hostname === location.hostname && (!this.hash || this.hash === '')) {
        e.preventDefault();
        closeMobileNav();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return false;
      }

      closeMobileNav();
    });

    // Close when tapping outside the mobile menu
    $(document).on('click', function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        closeMobileNav();
      }
    });

    // Window Resize Handler using matchMedia (Zero forced reflows)
    var mql = window.matchMedia('(min-width: 992px)');
    var handleResize = function(e) {
      if (e.matches) {
        closeMobileNav();
      }
    };
    if (mql.addEventListener) {
      mql.addEventListener('change', handleResize);
    } else if (mql.addListener) {
      mql.addListener(handleResize);
    }
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // ===== OPTIMIZED SCROLL HANDLER =====
  // Uses requestAnimationFrame and passive listeners to eliminate Layout Thrashing
  var header = document.getElementById('header');
  var backToTop = document.querySelector('.back-to-top');
  var scrollTicking = false;

  function updateScrollState() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    var isScrolled = scrollY > 100;

    if (header) {
      header.classList.toggle('header-scrolled', isScrolled);
    }
    if (backToTop) {
      backToTop.classList.toggle('active', isScrolled);
    }
    scrollTicking = false;
  }

  window.addEventListener('scroll', function() {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollState);
      scrollTicking = true;
    }
  }, { passive: true });

  // Initial check after DOM paint
  window.requestAnimationFrame(updateScrollState);

  // Back to top button click (native smooth scroll)
  if (backToTop) {
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return false;
    });
  }

  // Intro carousel indicators batch generation
  var heroCarousel = $("#heroCarousel");
  var heroCarouselIndicators = $("#hero-carousel-indicators");
  if (heroCarousel.length && heroCarouselIndicators.length) {
    var carouselItems = heroCarousel.find(".carousel-inner > .carousel-item");
    if (carouselItems.length) {
      var indicatorsHtml = '';
      for (var i = 0; i < carouselItems.length; i++) {
        indicatorsHtml += "<li data-target='#heroCarousel' data-slide-to='" + i + "'" + (i === 0 ? " class='active'" : "") + "></li>";
      }
      heroCarouselIndicators.html(indicatorsHtml);
    }

    heroCarousel.on('slid.bs.carousel', function() {
      $(this).find('h2').addClass('animate__animated animate__fadeInDown');
      $(this).find('p, .btn-get-started').addClass('animate__animated animate__fadeInUp');
    });
  }

  // Portfolio isotope and filter
  $(window).on('load', function() {
    if ($.fn.isotope && $('.portfolio-container').length) {
      var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item'
      });

      $('#portfolio-flters li').on('click', function() {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({
          filter: $(this).data('filter')
        });
      });
    }

    // Initiate venobox (lightbox feature used in portfolio)
    if ($.fn.venobox && $('.venobox').length) {
      $('.venobox').venobox({
        'share': false
      });
    }
  });

  // Skills section waypoint
  if ($.fn.waypoint && $('.skills-content').length) {
    $('.skills-content').waypoint(function() {
      $('.progress .progress-bar').each(function() {
        $(this).css("width", $(this).attr("aria-valuenow") + '%');
      });
    }, {
      offset: '80%'
    });
  }

  // Portfolio details carousel
  if ($.fn.owlCarousel && $(".portfolio-details-carousel").length) {
    $(".portfolio-details-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1
    });
  }

})(jQuery);
