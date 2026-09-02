document.addEventListener('DOMContentLoaded', function () {
  window.JekyllTwilight = window.JekyllTwilight || {};

  const projects = Array.from(document.querySelectorAll('.portfolio-item'));
  const filters = Array.from(document.querySelectorAll('.project-filter a[data-filter]'));

  window.JekyllTwilight.filterWorks = function (filterValue = '*') {
    const normalizedFilter = filters.some(filter => filter.getAttribute('data-filter') === filterValue)
      ? filterValue
      : '*';

    projects.forEach(project => {
      const matches = normalizedFilter === '*' || project.matches(normalizedFilter);
      project.classList.toggle('show', matches);
      project.hidden = !matches;
    });

    filters.forEach(filter => {
      const selected = filter.getAttribute('data-filter') === normalizedFilter;
      filter.classList.toggle('selected', selected);
      if (selected) filter.setAttribute('aria-current', 'true');
      else filter.removeAttribute('aria-current');
    });
  };

  filters.forEach(filter => {
    filter.addEventListener('click', function (event) {
      event.preventDefault();
      window.JekyllTwilight.filterWorks(this.getAttribute('data-filter') || '*');
    });
  });

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'md-overlay';
  modalOverlay.hidden = true;
  document.body.appendChild(modalOverlay);

  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  let activeModal = null;
  let lastTrigger = null;

  function getFocusableElements(modal) {
    return Array.from(modal.querySelectorAll(focusableSelector)).filter(element => {
      return !element.hasAttribute('hidden') && element.getAttribute('aria-hidden') !== 'true';
    });
  }

  function closeModal() {
    if (!activeModal) return;

    activeModal.classList.remove('md-show');
    activeModal.setAttribute('aria-hidden', 'true');
    modalOverlay.hidden = true;
    document.body.classList.remove('modal-open');

    const trigger = lastTrigger;
    activeModal = null;
    lastTrigger = null;
    trigger?.focus();
  }

  function openModal(trigger) {
    const modalId = trigger.getAttribute('data-modal');
    const modal = modalId ? document.getElementById(modalId) : null;
    if (!modal) return;

    if (activeModal && activeModal !== modal) {
      activeModal.classList.remove('md-show');
      activeModal.setAttribute('aria-hidden', 'true');
    }

    activeModal = modal;
    lastTrigger = trigger;

    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('md-show');
    modalOverlay.hidden = false;
    document.body.classList.add('modal-open');

    const heading = modal.querySelector('h3');
    if (heading) {
      if (!heading.id) heading.id = `${modalId}-title`;
      modal.setAttribute('aria-labelledby', heading.id);
    }

    const focusable = getFocusableElements(modal);
    (focusable[0] || modal).focus();
  }

  function trapModalFocus(event) {
    if (!activeModal || event.key !== 'Tab') return;

    const focusable = getFocusableElements(activeModal);
    if (focusable.length === 0) {
      event.preventDefault();
      activeModal.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => openModal(trigger));
  });

  document.querySelectorAll('.md-modal').forEach(modal => {
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('tabindex', '-1');
    modal.querySelectorAll('.md-close').forEach(button => button.addEventListener('click', closeModal));
  });

  modalOverlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && activeModal) {
      event.preventDefault();
      closeModal();
      return;
    }

    trapModalFocus(event);
  });

  window.JekyllTwilight.filterWorks('*');
});
