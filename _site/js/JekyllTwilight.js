(function () {
  const JekyllTwilight = window.JekyllTwilight || {};

  /* Utility: Debounce */
  function debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this, args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  /* Mobile Navigation */
  JekyllTwilight.mobileNav = function () {
    const windowWidth = window.innerWidth;
    const mobileNavToggle = document.getElementById('mobile-nav');
    let navigationMobile = document.getElementById('navigation-mobile');
    const menu = document.getElementById('menu');

    if (windowWidth <= 979) {
      if (!navigationMobile && menu) {
        const mobileMenuClone = menu.cloneNode(true);
        mobileMenuClone.id = 'navigation-mobile';
        mobileMenuClone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
        mobileMenuClone.querySelector('ul').id = 'menu-nav-mobile';
        mobileMenuClone.querySelectorAll('.dropdown-toggle').forEach(toggle => {
          toggle.addEventListener('click', function (e) {
            e.preventDefault();
            this.nextElementSibling?.classList.toggle('show');
          });
        });
        menu.insertAdjacentElement('afterend', mobileMenuClone);
        navigationMobile = mobileMenuClone;
      }
    } else if (navigationMobile) {
      navigationMobile.remove();
      mobileNavToggle?.classList.remove('open');
    }
  };

  JekyllTwilight.listenerMenu = function () {
    const mobileNavToggle = document.getElementById('mobile-nav');
    const navigationMobile = document.getElementById('navigation-mobile');
    if (mobileNavToggle && navigationMobile) {
      mobileNavToggle.addEventListener('click', function (e) {
        e.preventDefault();
        this.classList.toggle('open');
        navigationMobile.classList.toggle('open');
      });

      navigationMobile.querySelectorAll('#menu-nav-mobile a').forEach(link => {
        link.addEventListener('click', () => {
          mobileNavToggle.classList.remove('open');
          navigationMobile.classList.remove('open');
        });
      });
    }
  };

  /* Sticky Navigation */
  JekyllTwilight.nav = function () {
    const stickyNav = document.querySelector('.sticky-nav');
    if (stickyNav) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => e.target.classList.toggle('is-sticky', !e.isIntersecting));
      }, { threshold: 0 });
      observer.observe(stickyNav);
    }
  };

  /* Scroll to Top */
  JekyllTwilight.scrollToTop = function () {
    const arrow = document.getElementById('back-to-top');
    if (!arrow) return;

    arrow.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', debounce(() => {
      arrow.style.display = window.scrollY > 1000 ? 'block' : 'none';
    }, 100));
  };

  /* Initialization */
  document.addEventListener('DOMContentLoaded', function () {
    console.log('JekyllTwilight: DOMContentLoaded event fired.');
    JekyllTwilight.slider();
    JekyllTwilight.nav();
    JekyllTwilight.mobileNav();
    JekyllTwilight.listenerMenu();
    JekyllTwilight.scrollToTop();
  });

  window.addEventListener('resize', debounce(JekyllTwilight.mobileNav, 250));

  window.JekyllTwilight = JekyllTwilight;
})();
