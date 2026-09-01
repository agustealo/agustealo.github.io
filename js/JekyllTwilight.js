(function () {
  const JekyllTwilight = window.JekyllTwilight || {};

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
        const mobileList = mobileMenuClone.querySelector('ul');
        if (mobileList) {
          mobileList.id = 'menu-nav-mobile';
        }
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
      mobileNavToggle?.setAttribute('aria-expanded', 'false');
    }
  };

  JekyllTwilight.listenerMenu = function () {
    const mobileNavToggle = document.getElementById('mobile-nav');
    const navigationMobile = document.getElementById('navigation-mobile');
    if (mobileNavToggle && navigationMobile) {
      mobileNavToggle.addEventListener('click', function (e) {
        e.preventDefault();
        const isOpen = this.classList.toggle('open');
        navigationMobile.classList.toggle('open', isOpen);
        this.setAttribute('aria-expanded', String(isOpen));
      });

      navigationMobile.querySelectorAll('#menu-nav-mobile a').forEach(link => {
        link.addEventListener('click', () => {
          mobileNavToggle.classList.remove('open');
          navigationMobile.classList.remove('open');
          mobileNavToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  };

  JekyllTwilight.nav = function () {
    const stickyNav = document.querySelector('.sticky-nav');
    if (stickyNav && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.classList.toggle('is-sticky', !entry.isIntersecting));
      }, { threshold: 0 });
      observer.observe(stickyNav);
    }
  };

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

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof JekyllTwilight.slider === 'function') {
      JekyllTwilight.slider();
    }
    JekyllTwilight.nav();
    JekyllTwilight.mobileNav();
    JekyllTwilight.listenerMenu();
    JekyllTwilight.scrollToTop();
  });

  window.addEventListener('resize', debounce(JekyllTwilight.mobileNav, 250));

  window.JekyllTwilight = JekyllTwilight;
})();
