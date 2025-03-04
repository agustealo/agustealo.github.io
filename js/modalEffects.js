var ModalEffects = (function () {
	// Helper function to check if an element has a class
	function hasClass(el, className) {
	  return el.classList.contains(className);
	}
  
	// Helper function to add a class to an element
	function addClass(el, className) {
	  el.classList.add(className);
	}
  
	// Helper function to remove a class from an element
	function removeClass(el, className) {
	  el.classList.remove(className);
	}
  
	// Helper function to open a modal by ID
	function openModalById(modalId) {
	  var modal = document.querySelector('#' + modalId);
	  if (!modal) {
		console.error('Modal not found for ID:', modalId);
		return;
	  }
  
	  var overlay = document.querySelector('.md-overlay');
	  addClass(modal, 'md-show');
	  overlay.removeEventListener('click', removeModalHandler);
	  overlay.addEventListener('click', removeModalHandler);
  
	  // Add perspective if needed
	  var trigger = document.querySelector('.md-trigger[data-modal="' + modalId + '"]');
	  if (trigger && hasClass(trigger, 'md-setperspective')) {
		setTimeout(function () {
		  addClass(document.documentElement, 'md-perspective');
		}, 25);
	  }
  
	  // Focus on the first focusable element in the modal for accessibility
	  var focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
	  if (focusable) focusable.focus();
	}
  
	// Helper function to close the modal
	function removeModal(modal, hasPerspective) {
	  removeClass(modal, 'md-show');
  
	  if (hasPerspective) {
		removeClass(document.documentElement, 'md-perspective');
	  }
  
	  // Restore focus to the trigger element for accessibility
	  var trigger = document.querySelector('.md-trigger[data-modal="' + modal.id + '"]');
	  if (trigger) trigger.focus();
	}
  
	// Global modal removal handler
	function removeModalHandler() {
	  var openModal = document.querySelector('.md-show');
	  if (openModal) {
		var trigger = document.querySelector('.md-trigger[data-modal="' + openModal.id + '"]');
		removeModal(openModal, trigger && hasClass(trigger, 'md-setperspective'));
	  }
	}
  
	function init() {
	  var overlay = document.querySelector('.md-overlay');
  
	  // Only target elements with the .md-trigger class
	  [].slice.call(document.querySelectorAll('.md-trigger')).forEach(function (el) {
		var modalId = el.getAttribute('data-modal');
		var modal = document.querySelector('#' + modalId);
  
		if (!modal) {
		  console.error('Modal not found for trigger:', el);
		  return;
		}
  
		var close = modal.querySelector('.md-close');
  
		// Add ARIA attributes for accessibility
		el.setAttribute('aria-haspopup', 'true');
		el.setAttribute('aria-expanded', 'false');
		modal.setAttribute('aria-hidden', 'true');
		modal.setAttribute('role', 'dialog');
  
		// Open modal on trigger click
		el.addEventListener('click', function (ev) {
		  ev.preventDefault();
		  openModalById(modalId);
  
		  // Update ARIA attributes
		  el.setAttribute('aria-expanded', 'true');
		  modal.setAttribute('aria-hidden', 'false');
		});
  
		// Close modal on close button click
		close.addEventListener('click', function (ev) {
		  ev.stopPropagation();
		  removeModalHandler();
  
		  // Update ARIA attributes
		  el.setAttribute('aria-expanded', 'false');
		  modal.setAttribute('aria-hidden', 'true');
		});
	  });
  
	  // Close modal on overlay click
	  overlay.addEventListener('click', removeModalHandler);
  
	  // Close modal on pressing the Escape key
	  document.addEventListener('keydown', function (ev) {
		if (ev.key === 'Escape') {
		  removeModalHandler();
		}
	  });
  
	  // Open modal directly if URL contains a hash matching a modal ID
	  if (window.location.hash) {
		var modalId = window.location.hash.substring(1); // Remove the '#' from the hash
		openModalById(modalId);
	  }
	}
  
	return {
	  init: init,
	  openModalById: openModalById // Expose this function for external use
	};
  })();
  
  // Initialize the modal effects
  ModalEffects.init();
  
  // Example: Open a modal directly by ID (e.g., #latest)
  if (window.location.hash === '#latest') {
	ModalEffects.openModalById('latest');
  }