// C&C Glass & Window Repair - Main Interactive Controller

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initStickyHeader();
  initHeroSlider();
  initQuoteModal();
  initForms();
  initGalleryFilter();
  initLightbox();
});

// Main Hero Slider (Exact Replica of JetSlider)
function initHeroSlider() {
  const slider = document.querySelector('.cnc-hero-slider');
  const track = document.querySelector('.cnc-slider-track');
  const slides = document.querySelectorAll('.cnc-slide');
  const prevBtn = document.querySelector('.cnc-slider-arrow.prev');
  const nextBtn = document.querySelector('.cnc-slider-arrow.next');
  const dotsContainer = document.querySelector('.cnc-slider-dots');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;

  // Render dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `cnc-slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  const updateDots = () => {
    const dots = document.querySelectorAll('.cnc-slider-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  };

  const goToSlide = (index) => {
    currentIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  slider?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      nextSlide();
      resetAutoplay();
    } else if (touchEndX - touchStartX > 50) {
      prevSlide();
      resetAutoplay();
    }
  }, { passive: true });

  // Autoplay
  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 4500);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
  };

  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  slider?.addEventListener('mouseenter', stopAutoplay);
  slider?.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

// Mobile Drawer Menu
function initMobileMenu() {
  const openBtn = document.getElementById('open-mobile-menu');
  const closeBtn = document.getElementById('close-mobile-menu');
  const menu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-backdrop');

  if (!menu) return;

  const toggle = (isOpen) => {
    if (isOpen) {
      menu.classList.remove('closed');
      menu.classList.add('open');
      backdrop?.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      menu.classList.add('closed');
      menu.classList.remove('open');
      backdrop?.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  openBtn?.addEventListener('click', () => toggle(true));
  closeBtn?.addEventListener('click', () => toggle(false));
  backdrop?.addEventListener('click', () => toggle(false));

  // Mobile submenu accordion toggles
  document.querySelectorAll('.mobile-dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.mobile-dropdown-icon');
      if (content) {
        content.classList.toggle('hidden');
        if (icon) icon.classList.toggle('rotate-180');
      }
    });
  });
}

// Sticky Header enhancement
function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shadow-lg');
    } else {
      header.classList.remove('shadow-lg');
    }
  });
}

// Quote Modal
function initQuoteModal() {
  const modal = document.getElementById('quote-modal');
  const openButtons = document.querySelectorAll('.open-quote-modal');
  const closeButtons = document.querySelectorAll('.close-quote-modal');
  const serviceSelect = document.getElementById('modal-service-select');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preselectedService = btn.getAttribute('data-service');
      if (serviceSelect && preselectedService) {
        serviceSelect.value = preselectedService;
      }
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// Form Handlers & Feedback
function initForms() {
  const forms = document.querySelectorAll('form[data-ajax-form]');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-5 w-5 inline text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg> Submitting...
        `;
      }

      // Simulate quick processing
      setTimeout(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        // Close modal if form is inside modal
        const modal = document.getElementById('quote-modal');
        if (modal && !modal.classList.contains('hidden')) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          document.body.style.overflow = '';
        }

        showToast("Thank you! Your request has been received. Our team will contact you shortly.");
      }, 700);
    });
  });
}

// Toast notification
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 transform translate-y-20 opacity-0 transition-all duration-300 border border-slate-700';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    <div class="text-sm font-medium pr-2">${message}</div>
    <button onclick="this.parentElement.classList.add('translate-y-20', 'opacity-0')" class="text-slate-400 hover:text-white ml-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  `;

  // Show
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-20', 'opacity-0');
  });

  // Auto-hide after 5s
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 5000);
}

// Gallery Filtering
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterButtons.length || !galleryItems.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-sky-600', 'text-white');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });
      btn.classList.add('bg-sky-600', 'text-white');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.classList.add('fade-in');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Fullscreen Lightbox
function initLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  const imgElement = document.getElementById('lightbox-image');
  const titleElement = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const triggers = document.querySelectorAll('[data-lightbox]');

  if (!overlay || !imgElement) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-lightbox-src') || trigger.getAttribute('src');
      const caption = trigger.getAttribute('data-lightbox-title') || trigger.getAttribute('alt') || 'Project Showcase';

      imgElement.src = src;
      if (titleElement) titleElement.textContent = caption;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeLightbox();
    }
  });
}
