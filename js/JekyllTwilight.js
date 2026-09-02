(function () {
  const JekyllTwilight = window.JekyllTwilight || {};

  function debounce(func, wait, immediate) {
    let timeout;

    return function () {
      const context = this;
      const args = arguments;
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

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function closeMobileNav(toggle, navigationMobile) {
    navigationMobile?.classList.remove('open');
    toggle?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open navigation');
  }

  JekyllTwilight.mobileNav = function () {
    const mobileNavToggle = document.getElementById('mobile-nav');
    const menu = document.getElementById('menu');
    let navigationMobile = document.getElementById('navigation-mobile');

    if (!mobileNavToggle || !menu) return;

    if (window.innerWidth <= 979) {
      if (!navigationMobile) {
        navigationMobile = menu.cloneNode(true);
        navigationMobile.id = 'navigation-mobile';
        navigationMobile.setAttribute('aria-label', 'Mobile navigation');
        navigationMobile.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));

        const mobileList = navigationMobile.querySelector('ul');
        if (mobileList) mobileList.id = 'menu-nav-mobile';

        menu.insertAdjacentElement('afterend', navigationMobile);
      }

      mobileNavToggle.setAttribute('aria-expanded', navigationMobile.classList.contains('open') ? 'true' : 'false');
      return;
    }

    navigationMobile?.remove();
    closeMobileNav(mobileNavToggle, null);
  };

  JekyllTwilight.listenerMenu = function () {
    const mobileNavToggle = document.getElementById('mobile-nav');
    if (!mobileNavToggle) return;

    mobileNavToggle.addEventListener('click', function () {
      const navigationMobile = document.getElementById('navigation-mobile');
      if (!navigationMobile) return;

      const isOpen = !navigationMobile.classList.contains('open');
      navigationMobile.classList.toggle('open', isOpen);
      this.classList.toggle('open', isOpen);
      this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      this.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    document.addEventListener('click', function (event) {
      const navigationMobile = document.getElementById('navigation-mobile');
      if (!navigationMobile || !navigationMobile.contains(event.target)) return;

      if (event.target.closest('a')) {
        closeMobileNav(mobileNavToggle, navigationMobile);
      }
    });
  };

  JekyllTwilight.scrollToTop = function () {
    const arrow = document.getElementById('back-to-top');
    if (!arrow) return;

    arrow.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    });

    const updateVisibility = debounce(function () {
      arrow.hidden = window.scrollY <= 1000;
    }, 100);

    arrow.hidden = window.scrollY <= 1000;
    window.addEventListener('scroll', updateVisibility, { passive: true });
  };

  document.addEventListener('DOMContentLoaded', function () {
    JekyllTwilight.mobileNav();
    JekyllTwilight.listenerMenu();
    JekyllTwilight.scrollToTop();
  });

  window.addEventListener('resize', debounce(JekyllTwilight.mobileNav, 250));

  window.JekyllTwilight = JekyllTwilight;
})();
