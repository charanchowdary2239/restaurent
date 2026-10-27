/**
 * BLUE ORCHID RESTAURANT — INTERACTIVE WEBSITE SCRIPT
 * Developed for Client Demonstrations by NRK Digitals
 * 
 * Vanilla JavaScript (Zero External Frameworks)
 * Compatible with all modern browsers, mobile devices, GitHub Pages & Vercel
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. CENTRAL CONFIGURATION (EASY TO CUSTOMIZE)
     ========================================================================== */
  
  /**
   * RESTAURANT WHATSAPP NUMBER
   * Format: Country code without '+' or special characters, followed by the 10-digit number.
   * Example for India: "919876543210"
   * Replace this placeholder with the actual client's WhatsApp number when going live!
   */
  const RESTAURANT_CONFIG = {
    whatsappNumber: '919876543210', // Placeholder demo number
    restaurantName: 'Blue Orchid Restaurant',
    phoneFormatted: '+91 98765 43210',
    email: 'info@blueorchidrestaurant-demo.com',
    defaultWaMessage: 'Hello Blue Orchid Restaurant! I am visiting your website and would like to make an enquiry.'
  };

  /**
   * Helper to construct WhatsApp Web/App URLs safely
   */
  function createWhatsAppUrl(messageText) {
    const encodedText = encodeURIComponent(messageText);
    return `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encodedText}`;
  }


  /* ==========================================================================
     2. MOBILE NAVIGATION & HAMBURGER TOGGLE
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-item, .btn-nav-cta');
  const mainHeader = document.getElementById('mainHeader');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when any nav item is clicked
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          hamburgerBtn.classList.remove('active');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close when clicking outside the navbar
    document.addEventListener('click', (e) => {
      if (!mainHeader.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ==========================================================================
     3. STICKY HEADER & SCROLLSPY
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTopBtn');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header styling on scroll
    if (mainHeader) {
      if (scrollY > 50) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    }

    // Scrollspy: Highlight active link based on scroll position
    const headerHeight = mainHeader ? mainHeader.offsetHeight + 40 : 100;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links .nav-item').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* ==========================================================================
     4. FLOATING WHATSAPP & GENERAL ENQUIRY BUTTONS
     ========================================================================== */
  const floatingWaBtn = document.getElementById('floatingWaBtn');
  if (floatingWaBtn) {
    floatingWaBtn.setAttribute('href', createWhatsAppUrl(RESTAURANT_CONFIG.defaultWaMessage));
  }

  const btnContactWa = document.getElementById('btnContactWa');
  if (btnContactWa) {
    btnContactWa.addEventListener('click', () => {
      const msg = `Hello ${RESTAURANT_CONFIG.restaurantName}! I'd like to get in touch regarding table availability and dine-in questions.`;
      window.open(createWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
    });
  }

  const btnCustomEnquiry = document.getElementById('btnCustomEnquiry');
  if (btnCustomEnquiry) {
    btnCustomEnquiry.addEventListener('click', () => {
      const msg = `Hello ${RESTAURANT_CONFIG.restaurantName}! I am planning a party / bulk family event and would like to discuss a customized catering menu.`;
      window.open(createWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
    });
  }

  // Hook all footer WhatsApp links
  document.querySelectorAll('.footer-wa-link').forEach(link => {
    link.setAttribute('href', createWhatsAppUrl(RESTAURANT_CONFIG.defaultWaMessage));
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });


  /* ==========================================================================
     5. MENU CATEGORY FILTERING
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-item-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active state on buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const filterValue = button.getAttribute('data-filter');

      // Filter dishes with smooth opacity transition
      menuCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        const match = (filterValue === 'all') || categories.includes(filterValue);

        if (match) {
          card.classList.remove('hide');
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 40);
        } else {
          card.classList.add('hide');
        }
      });
    });
  });


  /* ==========================================================================
     6. "ORDER ON WHATSAPP" FUNCTIONALITY (DISHES & SPECIALS)
     ========================================================================== */
  const orderButtons = document.querySelectorAll('.btn-order-wa');

  orderButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dishName = btn.getAttribute('data-dish') || 'Menu Item';
      const dishPrice = btn.getAttribute('data-price') || '';

      const priceText = dishPrice ? ` (₹${dishPrice})` : '';
      const message = `Hello ${RESTAURANT_CONFIG.restaurantName}! 👋\nI would like to order: *${dishName}${priceText}*.\nPlease confirm preparation time and dine-in / takeaway availability. Thank you!`;

      window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
    });
  });


  /* ==========================================================================
     7. PHOTO GALLERY LIGHTBOX VIEWER
     ========================================================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');

  let currentGalleryIndex = 0;
  const galleryData = [];

  galleryItems.forEach((item, index) => {
    const imgEl = item.querySelector('img');
    const caption = item.getAttribute('data-caption') || imgEl.getAttribute('alt') || 'Restaurant Gallery Photo';
    galleryData.push({
      src: imgEl.getAttribute('src'),
      alt: imgEl.getAttribute('alt') || caption,
      caption: caption
    });

    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    if (!galleryData[index]) return;
    currentGalleryIndex = index;
    updateLightboxContent();
    lightboxModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeLightbox() {
    lightboxModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const data = galleryData[currentGalleryIndex];
    if (!data) return;

    lightboxImg.src = data.src;
    lightboxImg.alt = data.alt;
    lightboxCaption.textContent = data.caption;
    lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${galleryData.length}`;
  }

  function nextGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateLightboxContent();
  }

  function prevGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextGalleryImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevGalleryImage);

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextGalleryImage();
      if (e.key === 'ArrowLeft') prevGalleryImage();
    }
  });


  /* ==========================================================================
     8. TABLE RESERVATION FORM VALIDATION & WHATSAPP GENERATION
     ========================================================================== */
  const reservationForm = document.getElementById('reservationForm');
  const reservationSuccessCard = document.getElementById('reservationSuccessCard');
  const formErrorAlert = document.getElementById('formErrorAlert');
  const formErrorMessage = document.getElementById('formErrorMessage');

  const resName = document.getElementById('resName');
  const resPhone = document.getElementById('resPhone');
  const resEmail = document.getElementById('resEmail');
  const resGuests = document.getElementById('resGuests');
  const resDate = document.getElementById('resDate');
  const resTime = document.getElementById('resTime');
  const resNotes = document.getElementById('resNotes');

  const btnDirectWaConfirm = document.getElementById('btnDirectWaConfirm');
  const btnNewReservation = document.getElementById('btnNewReservation');
  const btnModalWaConfirm = document.getElementById('btnModalWaConfirm');
  const reservationSummaryBox = document.getElementById('reservationSummaryBox');
  const successCustomerName = document.getElementById('successCustomerName');

  // Set minimum date for reservation to today
  if (resDate) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDateString = `${yyyy}-${mm}-${dd}`;
    resDate.setAttribute('min', minDateString);
  }

  /**
   * Helper to validate single field with visual cues
   */
  function validateField(inputElement, errorElementId, condition, errorText) {
    const errorEl = document.getElementById(errorElementId);
    if (!condition) {
      inputElement.classList.add('is-invalid');
      if (errorEl) {
        if (errorText) errorEl.textContent = errorText;
        errorEl.style.display = 'block';
      }
      return false;
    } else {
      inputElement.classList.remove('is-invalid');
      if (errorEl) {
        errorEl.style.display = 'none';
      }
      return true;
    }
  }

  /**
   * Complete Form Validation
   */
  function validateReservationForm() {
    let isValid = true;

    // Validate Name
    const nameVal = resName.value.trim();
    if (!validateField(resName, 'nameError', nameVal.length >= 2, 'Please enter your full name (minimum 2 characters).')) {
      isValid = false;
    }

    // Validate Phone (Sensible check: clean digits, at least 10 digits)
    const phoneClean = resPhone.value.replace(/\D/g, '');
    const isPhoneValid = phoneClean.length >= 10 && phoneClean.length <= 15;
    if (!validateField(resPhone, 'phoneError', isPhoneValid, 'Please enter a valid 10-digit mobile number.')) {
      isValid = false;
    }

    // Validate Email if provided (optional)
    const emailVal = resEmail.value.trim();
    if (emailVal.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!validateField(resEmail, 'emailError', emailRegex.test(emailVal), 'Please enter a valid email format.')) {
        isValid = false;
      }
    } else {
      resEmail.classList.remove('is-invalid');
      const emailError = document.getElementById('emailError');
      if (emailError) emailError.style.display = 'none';
    }

    // Validate Guests
    if (!validateField(resGuests, 'guestsError', resGuests.value !== '', 'Please select the number of guests.')) {
      isValid = false;
    }

    // Validate Date (Must be today or future date)
    const dateVal = resDate.value;
    let isDateValid = false;
    if (dateVal) {
      const selectedDate = new Date(dateVal + 'T00:00:00');
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      isDateValid = selectedDate >= todayDate;
    }
    if (!validateField(resDate, 'dateError', isDateValid, 'Please choose today or an upcoming date.')) {
      isValid = false;
    }

    // Validate Time Slot
    if (!validateField(resTime, 'timeError', resTime.value !== '', 'Please select a preferred time slot.')) {
      isValid = false;
    }

    return isValid;
  }

  /**
   * Build WhatsApp message text from reservation inputs
   */
  function buildReservationWhatsAppMessage() {
    const name = resName.value.trim();
    const phone = resPhone.value.trim();
    const guests = resGuests.value;
    const date = resDate.value;
    const time = resTime.value;
    const notes = resNotes.value.trim();

    // Format readable date
    let formattedDate = date;
    try {
      const dateObj = new Date(date + 'T00:00:00');
      formattedDate = dateObj.toLocaleDateString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      formattedDate = date;
    }

    let msg = `🍽️ *TABLE RESERVATION REQUEST*\n`;
    msg += `------------------------------------\n`;
    msg += `Restaurant: *${RESTAURANT_CONFIG.restaurantName}*\n`;
    msg += `Guest Name: *${name}*\n`;
    msg += `Phone: *${phone}*\n`;
    msg += `Guests: *${guests}*\n`;
    msg += `Date: *${formattedDate}*\n`;
    msg += `Time Slot: *${time}*\n`;
    if (notes) {
      msg += `Special Requests: _${notes}_\n`;
    }
    msg += `------------------------------------\n`;
    msg += `Kindly confirm our table reservation and let us know if any further details are needed. Thank you!`;

    return { msg, formattedDate };
  }

  /**
   * Display confirmation summary card
   */
  function displayReservationSuccess(formattedDate) {
    if (formErrorAlert) formErrorAlert.style.display = 'none';

    if (successCustomerName) {
      successCustomerName.textContent = resName.value.trim();
    }

    const { msg } = buildReservationWhatsAppMessage();

    // Fill summary box
    if (reservationSummaryBox) {
      reservationSummaryBox.innerHTML = `
        <div class="summary-row">
          <span class="summary-label">Name:</span>
          <span class="summary-value">${escapeHtml(resName.value.trim())}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Contact:</span>
          <span class="summary-value">${escapeHtml(resPhone.value.trim())}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Date &amp; Time:</span>
          <span class="summary-value">${escapeHtml(formattedDate)} at ${escapeHtml(resTime.value)}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Party Size:</span>
          <span class="summary-value">${escapeHtml(resGuests.value)}</span>
        </div>
        ${resNotes.value.trim() ? `
        <div class="summary-row">
          <span class="summary-label">Special Notes:</span>
          <span class="summary-value">${escapeHtml(resNotes.value.trim())}</span>
        </div>` : ''}
      `;
    }

    // Set link for WhatsApp confirmation button inside success modal
    if (btnModalWaConfirm) {
      btnModalWaConfirm.setAttribute('href', createWhatsAppUrl(msg));
    }

    // Switch view
    reservationForm.style.display = 'none';
    reservationSuccessCard.style.display = 'block';
  }

  // Handle Form Submission
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateReservationForm()) {
        if (formErrorAlert) {
          formErrorMessage.textContent = 'Please correct the highlighted fields before submitting.';
          formErrorAlert.style.display = 'flex';
        }
        return;
      }

      const { formattedDate } = buildReservationWhatsAppMessage();
      displayReservationSuccess(formattedDate);
    });
  }

  // Handle "Confirm via WhatsApp" button on the form
  if (btnDirectWaConfirm) {
    btnDirectWaConfirm.addEventListener('click', () => {
      if (!validateReservationForm()) {
        if (formErrorAlert) {
          formErrorMessage.textContent = 'Please fill in required fields to generate your WhatsApp confirmation.';
          formErrorAlert.style.display = 'flex';
        }
        return;
      }

      const { msg } = buildReservationWhatsAppMessage();
      window.open(createWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
    });
  }

  // Handle "Book Another Table" reset
  if (btnNewReservation) {
    btnNewReservation.addEventListener('click', () => {
      reservationForm.reset();
      reservationSuccessCard.style.display = 'none';
      reservationForm.style.display = 'block';
      if (formErrorAlert) formErrorAlert.style.display = 'none';
    });
  }


  /* ==========================================================================
     9. IMAGE FALLBACKS & RESILIENCE
     ========================================================================== */
  // Elegant fallback SVG in case of offline browsing or external CDN blocks
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23123B66"/><circle cx="300" cy="180" r="60" fill="%232878B5"/><path d="M280 150 L320 150 L315 210 L285 210 Z" fill="%23FFFFFF"/><text x="300" y="270" font-family="sans-serif" font-size="20" font-weight="bold" fill="%23FFFFFF" text-anchor="middle">Blue Orchid Culinary Specialty</text></svg>`;

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      if (this.src !== fallbackSvg) {
        this.src = fallbackSvg;
      }
    });
  });


  /* ==========================================================================
     10. UTILITY HELPERS
     ========================================================================== */
  function escapeHtml(string) {
    const div = document.createElement('div');
    div.innerText = string;
    return div.innerHTML;
  }

});
