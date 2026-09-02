document.addEventListener('DOMContentLoaded', function () {
  window.JekyllTwilight = window.JekyllTwilight || {};

  window.JekyllTwilight.filterWorks = function (filterValue = '*') {
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
      const matches = filterValue === '*' || project.classList.contains(filterValue.substring(1));
      project.classList.toggle('show', matches);
      project.hidden = !matches;
    });

    document.querySelectorAll('.project-filter a').forEach(button => {
      button.classList.toggle('selected', button.getAttribute('data-filter') === filterValue);
      button.setAttribute('aria-current', button.getAttribute('data-filter') === filterValue ? 'true' : 'false');
    });
  };

  document.querySelectorAll('.project-filter a').forEach(filter => {
    filter.addEventListener('click', function (event) {
      event.preventDefault();
      window.JekyllTwilight.filterWorks(this.getAttribute('data-filter') || '*');
    });
  });

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'md-overlay';
  modalOverlay.hidden = true;
  document.body.appendChild(modalOverlay);

  let activeModal = null;
  let lastTrigger = null;

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

    const firstFocusable = modal.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();
  }

  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => openModal(trigger));
    trigger.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(trigger);
      }
    });
  });

  document.querySelectorAll('.md-modal').forEach(modal => {
    modal.setAttribute('aria-hidden', 'true');
    modal.querySelectorAll('.md-close').forEach(button => button.addEventListener('click', closeModal));
  });

  modalOverlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
  });

  function resizeMasonryGrid() {
    const grid = document.querySelector('.project-contents');
    if (!grid) return;

    const computedStyle = window.getComputedStyle(grid);
    const columns = parseInt(computedStyle.getPropertyValue('--columns'), 10) || 3;
    const columnWidth = grid.offsetWidth / columns;

    document.querySelectorAll('.project:not([hidden])').forEach(item => {
      const rowSpan = Math.ceil((item.offsetHeight + 20) / columnWidth);
      item.style.gridRowEnd = `span ${rowSpan}`;
    });
  }

  window.JekyllTwilight.filterWorks('*');
  window.addEventListener('load', resizeMasonryGrid);
  window.addEventListener('resize', resizeMasonryGrid);
});
