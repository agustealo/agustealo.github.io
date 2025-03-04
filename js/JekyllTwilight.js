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
            const dropdownMenu = this.nextElementSibling;
            if (dropdownMenu) dropdownMenu.classList.toggle('show');
          });
        });
        menu.insertAdjacentElement('afterend', mobileMenuClone);
        navigationMobile = mobileMenuClone;
      }
    } else {
      if (navigationMobile) {
        navigationMobile.remove();
        if (mobileNavToggle && mobileNavToggle.classList.contains('open')) {
          mobileNavToggle.classList.remove('open');
        }
      }
    }
  };

  JekyllTwilight.listenerMenu = function () {
    const mobileNavToggle = document.getElementById('mobile-nav');
    const navigationMobile = document.getElementById('navigation-mobile');
    if (mobileNavToggle && navigationMobile) {
      mobileNavToggle.addEventListener('click', function (e) {
        this.classList.toggle('open');
        navigationMobile.classList.toggle('open');
        e.preventDefault();
      });
      navigationMobile.querySelectorAll('#menu-nav-mobile a').forEach(link => {
        link.addEventListener('click', () => {
          mobileNavToggle.classList.remove('open');
          navigationMobile.classList.remove('open');
        });
      });
    }
  };

  /* Slider */
  JekyllTwilight.slider = function () {
    const slides = [
      {
        image: 'images/slider-images/image01.jpg',
        title: '<div class="slide-content"><div class="content-intro"><img alt="October Offer" src="images/logo-feat.png" /><br /><h3>| Developer | Hybrid</h3></div></div>',
        thumb: '',
        url: ''
      }
      // Add additional slides here
    ];
    let currentSlide = 0;
    const slideContainer = document.getElementById('home-slider');
    const slideCaption = document.getElementById('slidecaption');
    if (!slideContainer || !slideCaption) {
      console.warn("Slider elements not found. Slider will not initialize.");
      return;
    }
    function showSlide() {
      slideContainer.style.backgroundImage = `url(${slides[currentSlide].image})`;
      slideCaption.innerHTML = slides[currentSlide].title;
    }
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide();
    }
    showSlide();
    setInterval(nextSlide, 12000);
  };

  /* Navigation Fix using IntersectionObserver */
  JekyllTwilight.nav = function () {
    const stickyNav = document.querySelector('.sticky-nav');
    if (stickyNav) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => e.target.classList.toggle('is-sticky', !e.isIntersecting));
      }, { threshold: [0] });
      observer.observe(stickyNav);
    }
  };

  /* Portfolio Filter Functionality for the Portfolio Section */
  JekyllTwilight.filterWorks = function () {
    // Wrap your portfolio items inside a container with id "portfolio-items"
    const projectsContainer = document.getElementById('portfolio-items');
    // Filter links are located within the #options container
    const filterLinks = document.querySelectorAll('#options .option-set a');

    if (!projectsContainer || !filterLinks.length) {
      console.warn("Portfolio elements not found. Filter functionality will not be initialized.");
      return;
    }

    function filterProjects(filter) {
      // Each portfolio item should have the class "portfolio-item" and a data-categories attribute
      const items = projectsContainer.querySelectorAll('.portfolio-item');
      items.forEach(item => {
        const categories = item.dataset.categories ? item.dataset.categories.split(' ') : [];
        item.style.display = (filter === '*' || categories.includes(filter)) ? 'block' : 'none';
      });
    }

    filterLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        filterLinks.forEach(fl => fl.classList.remove('selected'));
        this.classList.add('selected');
        filterProjects(this.dataset.optionValue);
      });
    });
  };


  /* FancyBox Replacement for Modal Effects */
  JekyllTwilight.fancyBox = function () {
    document.querySelectorAll('.md-trigger').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (!modal) {
          console.warn(`Modal with id ${modalId} not found.`);
          return;
        }
        modal.style.display = 'block';
        const closeButton = modal.querySelector('.md-close');
        if (closeButton) {
          closeButton.addEventListener('click', () => modal.style.display = 'none');
        }
        modal.addEventListener('click', (event) => {
          if (event.target === modal) modal.style.display = 'none';
        });
      });
    });
  };

  /* Contact Form */
  JekyllTwilight.contactForm = function () {
    const contactSubmit = document.getElementById('contact-submit');
    if (contactSubmit) {
      contactSubmit.addEventListener('click', async (e) => {
        e.preventDefault();
        const contactForm = document.getElementById('contact-form');
        const responseDiv = document.getElementById('response');
        if (!contactForm || !responseDiv) {
          console.error("Contact form or response element not found.");
          return;
        }
        const fields = new FormData(contactForm);
        try {
          const response = await fetch('php/contact.php', { method: 'POST', body: fields });
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          if (data.status) {
            contactForm.querySelectorAll('input, textarea').forEach(input => input.value = '');
          }
          responseDiv.innerHTML = data.html;
        } catch (error) {
          console.error('Contact form error:', error);
          responseDiv.innerHTML = '<p class="error">An error occurred. Please try again later.</p>';
        }
      });
    }
  };

  /* Twitter Feed */
  JekyllTwilight.tweetFeed = function () {
    const tweetContainer = document.getElementById('ticker');
    if (!tweetContainer) {
      console.warn('Tweet container not found. Twitter feed will not be initialized.');
      return;
    }
    const bearerToken = 'YOUR_TWITTER_BEARER_TOKEN'; // Replace with your token
    if (bearerToken === 'YOUR_TWITTER_BEARER_TOKEN') {
      console.warn("Please set your Twitter bearer token. Twitter feed will not work without it.");
      tweetContainer.innerHTML = '<p class="warning">Please configure Twitter Bearer Token.</p>';
      return;
    }
    function createTweetElement(tweet) {
      const li = document.createElement('li');
      const tweetText = tweet.text;
      const createdAt = new Date(tweet.created_at).toLocaleDateString();
      li.innerHTML = `<span>${tweetText} <span>${createdAt}</span></span>`;
      return li;
    }
    fetch(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=Agustealo&count=10`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${bearerToken}` }
    })
      .then(response => { if (!response.ok) throw new Error(`Twitter API error: ${response.status}`); return response.json(); })
      .then(tweets => {
        if (!Array.isArray(tweets) || tweets.length === 0) {
          tweetContainer.innerHTML = '<p class="warning">No tweets found.</p>';
          return;
        }
        const ul = document.createElement('ul');
        tweets.forEach(tweet => ul.appendChild(createTweetElement(tweet)));
        tweetContainer.appendChild(ul);
        (function ticker() {
          setTimeout(function () {
            const firstItem = ul.querySelector('li:first-child');
            if (!firstItem) return;
            firstItem.style.marginTop = '-64px';
            setTimeout(() => {
              firstItem.style.transition = 'margin-top 500ms linear';
              firstItem.style.marginTop = '0';
              firstItem.addEventListener('transitionend', function () {
                ul.appendChild(firstItem);
              }, { once: true });
            }, 10);
            ticker();
          }, 5000);
        })();
      })
      .catch(error => {
        console.error('Twitter feed error:', error);
        tweetContainer.innerHTML = '<p class="error">Failed to load tweets. Please check your API key and connection.</p>';
      });
  };

  /* Menu Highlighting */
  JekyllTwilight.menu = function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#menu-nav a, #menu-nav-mobile a');
    if (!sections.length || !navLinks.length) {
      console.warn("No sections or nav links found. Menu highlighting will not be initialized.");
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const targetId = link.getAttribute('href').replace('#', '');
            link.classList.toggle('current', targetId === id);
          });
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(section => observer.observe(section));
  };

  /* Next Section Scroll */
  JekyllTwilight.goSection = function () {
    document.querySelectorAll('#nextsection').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (!targetElement) {
          console.warn(`Target element not found for selector: ${this.getAttribute('href')}`);
          return;
        }
        window.scrollTo({ top: targetElement.offsetTop - 30, behavior: 'smooth' });
      });
    });
  };

  /* Scroll To Top */
  JekyllTwilight.scrollToTop = function () {
    const arrow = document.getElementById('back-to-top');
    if (!arrow) {
      console.warn("Scroll to top arrow element not found.");
      return;
    }
    arrow.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', debounce(() => {
      arrow.style.display = window.scrollY > 1000 ? 'block' : 'none';
    }, 100));
  };

  /* Utility Effects for Thumbs & Social */
  JekyllTwilight.utils = function () {
    document.querySelectorAll('.item-thumbs .image-wrap, #social ul li').forEach(element => {
      element.addEventListener('touchstart', function () {
        document.querySelectorAll('.item-thumbs .image-wrap, #social ul li').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
      });
    });
  };

  /* Accordion */
  JekyllTwilight.accordion = function () {
    document.querySelectorAll('.accordion-heading.accordionize .accordion-toggle').forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        this.classList.toggle('active');
        this.classList.toggle('inactive');
        const accordionContent = this.parentNode.nextElementSibling;
        if (accordionContent) {
          accordionContent.style.display = this.classList.contains('active') ? 'block' : 'none';
        }
      });
    });
  };

  /* Toggle */
  JekyllTwilight.toggle = function () {
    document.querySelectorAll('.accordion-heading.togglize .accordion-toggle').forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        this.classList.toggle('active');
        this.classList.toggle('inactive');
        const toggleContent = this.parentNode.nextElementSibling;
        if (toggleContent) {
          toggleContent.style.display = this.classList.contains('active') ? 'block' : 'none';
        }
      });
    });
  };

  /* Tooltip */
  JekyllTwilight.toolTip = function () {
    document.querySelectorAll('a[data-toggle=tooltip]').forEach(element => {
      element.addEventListener('mouseover', function (e) {
        e.preventDefault();
        const tooltipText = this.getAttribute('title');
        if (!tooltipText) return;
        const tooltip = document.createElement('div');
        tooltip.textContent = tooltipText;
        tooltip.classList.add('tooltip');
        document.body.appendChild(tooltip);
        const rect = this.getBoundingClientRect();
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '5px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.zIndex = '1000';
        tooltip.style.pointerEvents = 'none';
        let top = rect.bottom + window.scrollY + 10;
        let left = rect.left + window.scrollX;
        if (top + tooltip.offsetHeight > window.innerHeight) {
          top = rect.top + window.scrollY - tooltip.offsetHeight - 10;
        }
        if (left + tooltip.offsetWidth > window.innerWidth) {
          left = rect.right + window.scrollX - tooltip.offsetWidth;
        }
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
        element.addEventListener('mousemove', function (e) {
          let top = e.pageY + 10;
          let left = e.pageX + 10;
          if (top + tooltip.offsetHeight > window.innerHeight) top = e.pageY - tooltip.offsetHeight - 10;
          if (left + tooltip.offsetWidth > window.innerWidth) left = e.pageX - tooltip.offsetWidth;
          tooltip.style.top = `${top}px`;
          tooltip.style.left = `${left}px`;
        });
        element.addEventListener('mouseout', function () {
          tooltip.remove();
        }, { once: true });
      });
    });
  };

  /* Skills Bar Animation */
  JekyllTwilight.animateSkills = function () {
    const skillBars = document.querySelectorAll('.progress-bar');
    if (!skillBars.length) {
      console.warn("No skill bars found. Skill animation will not be initialized.");
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.progress;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    skillBars.forEach(bar => observer.observe(bar));
  };

  /* Timeline Item Placement */
  JekyllTwilight.timelinePlacement = function () {
    const timelineItems = document.querySelectorAll('.timeline > li');
    if (!timelineItems.length) {
      console.warn("No timeline items found. Timeline placement will not be initialized.");
      return;
    }
    timelineItems.forEach((item, index) => {
      item.classList.add(index % 2 === 0 ? 'timeline-even' : 'timeline-odd');
    });
  };

  /* Initialization */
  document.addEventListener('DOMContentLoaded', function () {
    console.log('JekyllTwilight: DOMContentLoaded event fired.');
    JekyllTwilight.slider();
    JekyllTwilight.nav();
    JekyllTwilight.mobileNav();
    JekyllTwilight.listenerMenu();
    JekyllTwilight.menu();
    JekyllTwilight.goSection();
    JekyllTwilight.scrollToTop();
    JekyllTwilight.utils();
    JekyllTwilight.accordion();
    JekyllTwilight.toggle();
    JekyllTwilight.toolTip();
    JekyllTwilight.filterWorks();
    JekyllTwilight.animateSkills();
    JekyllTwilight.timelinePlacement();
    JekyllTwilight.mobileNav();
  });

  window.addEventListener('resize', debounce(() => {
    JekyllTwilight.mobileNav();
  }, 250));

  window.JekyllTwilight = JekyllTwilight;
})();
