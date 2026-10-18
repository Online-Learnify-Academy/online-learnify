"use strict";

// Mobile Navigation
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const menuIcon = document.getElementById("menuIcon");

if (menuBtn && navMenu && menuIcon) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("hidden");

        const isOpen = !navMenu.classList.contains("hidden");

        menuBtn.setAttribute("aria-expanded", isOpen);

        if (isOpen) {
            menuIcon.innerHTML = `
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12">
                </path>
            `;

            menuBtn.setAttribute("aria-label", "Close navigation menu");
        } else {
            menuIcon.innerHTML = `
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16">
                </path>
            `;

            menuBtn.setAttribute("aria-label", "Open navigation menu");
        }
    });
}

// Close Mobile Menu After Clicking a Link
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (!navMenu || !menuBtn || !menuIcon) return;

        navMenu.classList.add("hidden");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation menu");

        menuIcon.innerHTML = `
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16">
            </path>
        `;
    });
});

// Hero Statistics Counter
document.addEventListener("DOMContentLoaded", function () {
    const heroStats = document.querySelectorAll(".hero-stat");

    heroStats.forEach(function (stat) {
        const target = Number(stat.dataset.target);
        const suffix = stat.dataset.suffix || "";
        const duration = 2000;
        const startTime = performance.now();

        function countUp(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(progress * target);

            stat.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(countUp);
            } else {
                stat.textContent = target + suffix;
            }
        }

        stat.textContent = "0" + suffix;

        requestAnimationFrame(countUp);
    });
});

document.addEventListener("DOMContentLoaded", function () {

  const slider = document.getElementById("hero-slider");
  const track = document.getElementById("hero-track");
  if (!slider || !track) return;
  const slides = Array.from(
    track.querySelectorAll(".hero-slide")
  );

  const dots = Array.from(
    slider.querySelectorAll(".hero-dot")
  );

  const prevButton = document.getElementById("hero-prev");
  const nextButton = document.getElementById("hero-next");

  let currentSlide = 0;
  let autoSlide = null;

  const delay = 6000;

  // Show the selected slide
  function showSlide(index) {

    currentSlide = (index + slides.length) % slides.length;

    track.style.transform =
      `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {

      const active = i === currentSlide;

      dot.classList.toggle("bg-[#F5B82E]", active);
      dot.classList.toggle("w-7", active);

      dot.classList.toggle("bg-white/70", !active);
      dot.classList.toggle("w-2.5", !active);

      dot.setAttribute(
        "aria-current",
        active ? "true" : "false"
      );
    });
  }

  // Stop automatic sliding
  function stopAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = null;
  }

  // Start automatic sliding
  function startAutoSlide() {
    stopAutoSlide();

    autoSlide = setInterval(function () {
      showSlide(currentSlide + 1);
    }, delay);
  }

  // Previous button
  prevButton.addEventListener("click", function () {
    showSlide(currentSlide - 1);
    startAutoSlide();
  });

  // Next button
  nextButton.addEventListener("click", function () {
    showSlide(currentSlide + 1);
    startAutoSlide();
  });

  // Indicator buttons
  dots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {
      showSlide(index);
      startAutoSlide();
    });

  });

  // Pause while hovering
  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);

  // Pause while navigating with keyboard
  slider.addEventListener("focusin", stopAutoSlide);
  slider.addEventListener("focusout", function (event) {
    if (!slider.contains(event.relatedTarget)) {
      startAutoSlide();
    }
  });

  // Mobile touch swipe
  let touchStartX = 0;

  slider.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  slider.addEventListener("touchend", function (event) {

    const touchEndX = event.changedTouches[0].clientX;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > 50) {
      showSlide(
        currentSlide + (difference > 0 ? 1 : -1)
      );

      startAutoSlide();
    }

  }, { passive: true });

  // Initialize slider on the first slide
  showSlide(0);
  startAutoSlide();

});

// Mobile About Dropdown
const mobileAboutBtn = document.getElementById("mobileAboutBtn");
const mobileAboutMenu = document.getElementById("mobileAboutMenu");
const mobileAboutIcon = document.getElementById("mobileAboutIcon");

if (mobileAboutBtn && mobileAboutMenu) {
    mobileAboutBtn.addEventListener("click", function () {
        mobileAboutMenu.classList.toggle("hidden");
        mobileAboutIcon.classList.toggle("rotate-180");
    });
}

// Students Slider
const studentTrack = document.getElementById("studentTrack");
const studentSlides = document.querySelectorAll(".student-slide");
const studentIndicators = document.querySelectorAll(".student-indicator");
const studentPrev = document.getElementById("studentPrev");
const studentNext = document.getElementById("studentNext");

let currentStudent = 0;

function showStudent(index) {
    if (!studentTrack || studentSlides.length === 0) return;

    currentStudent = index;

    studentTrack.style.transform = `translateX(-${currentStudent * 100}%)`;

    studentIndicators.forEach((indicator, i) => {
        if (i === currentStudent) {
            indicator.classList.remove("w-2", "bg-gray-300");
            indicator.classList.add("w-8", "bg-[#071B3A]");
        } else {
            indicator.classList.remove("w-8", "bg-[#071B3A]");
            indicator.classList.add("w-2", "bg-gray-300");
        }
    });
}

if (studentTrack && studentSlides.length > 0 && studentPrev && studentNext) {
    studentNext.addEventListener("click", () => {
        const nextIndex = (currentStudent + 1) % studentSlides.length;
        showStudent(nextIndex);
    });

    studentPrev.addEventListener("click", () => {
        const previousIndex =
            (currentStudent - 1 + studentSlides.length) % studentSlides.length;

        showStudent(previousIndex);
    });

    studentIndicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            showStudent(index);
        });
    });

    showStudent(0);
}

// Success Stories Slider
const successTrack = document.getElementById("successCarouselTrack");
const successStories = document.querySelectorAll(".success-story");
const successPrev = document.getElementById("successCarouselPrev");
const successNext = document.getElementById("successCarouselNext");
const successIndicators = document.querySelectorAll(".success-indicator");

let successIndex = 1;

function updateSuccessCarousel() {
    if (!successTrack || successStories.length === 0) return;

    const screenWidth = window.innerWidth;

    let visibleStories = 1;

    if (screenWidth >= 1024) {
        visibleStories = 3;
    } else if (screenWidth >= 768) {
        visibleStories = 2;
    }

    const storyWidth = 100 / visibleStories;

    successStories.forEach((story) => {
        story.style.width = `${storyWidth}%`;
    });

    const offset =
        (successIndex - Math.floor(visibleStories / 2)) * storyWidth;

    successTrack.style.transform = `translateX(-${offset}%)`;

    successStories.forEach((story, index) => {
        const card = story.querySelector(".success-story-card");

        if (!card) return;

        if (index === successIndex) {
            story.classList.remove("scale-90", "opacity-60");
            story.classList.add("scale-100", "opacity-100");

            card.classList.add(
                "border-yellow-400/60",
                "shadow-2xl"
            );

            card.classList.remove("border-white/15");
        } else {
            story.classList.remove("scale-100", "opacity-100");
            story.classList.add("scale-90", "opacity-60");

            card.classList.remove(
                "border-yellow-400/60",
                "shadow-2xl"
            );

            card.classList.add("border-white/15");
        }
    });

    const indicatorIndex = Math.floor(successIndex / 3);

    successIndicators.forEach((indicator, index) => {
        if (index === indicatorIndex) {
            indicator.classList.remove("w-2", "bg-white/30");
            indicator.classList.add("w-8", "bg-yellow-400");
        } else {
            indicator.classList.remove("w-8", "bg-yellow-400");
            indicator.classList.add("w-2", "bg-white/30");
        }
    });
}

if (
    successTrack &&
    successStories.length > 0 &&
    successPrev &&
    successNext
) {
    successNext.addEventListener("click", () => {
        successIndex++;

        if (successIndex >= successStories.length) {
            successIndex = 0;
        }

        updateSuccessCarousel();
    });

    successPrev.addEventListener("click", () => {
        successIndex--;

        if (successIndex < 0) {
            successIndex = successStories.length - 1;
        }

        updateSuccessCarousel();
    });

    successIndicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            successIndex = index * 3 + 1;

            if (successIndex >= successStories.length) {
                successIndex = successStories.length - 1;
            }

            updateSuccessCarousel();
        });
    });

    window.addEventListener("resize", updateSuccessCarousel);

    updateSuccessCarousel();
}

// Gallery Carousel
const gallerySlides = document.querySelectorAll(".gallery-slide");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");

let galleryIndex = 0;

function updateGallery() {
    if (gallerySlides.length === 0) return;

    const total = gallerySlides.length;

    gallerySlides.forEach((slide, index) => {
        let position = index - galleryIndex;

        if (position > total / 2) {
            position -= total;
        }

        if (position < -total / 2) {
            position += total;
        }

        if (position === 0) {
            slide.style.transform =
                "translate(-50%, -50%) scale(1) rotate(0deg)";
            slide.style.zIndex = "20";
            slide.style.opacity = "1";
        } else if (position === -1) {
            slide.style.transform =
                "translate(calc(-50% - 280px), -50%) scale(0.82) rotate(-8deg)";
            slide.style.zIndex = "15";
            slide.style.opacity = "0.9";
        } else if (position === 1) {
            slide.style.transform =
                "translate(calc(-50% + 280px), -50%) scale(0.82) rotate(8deg)";
            slide.style.zIndex = "15";
            slide.style.opacity = "0.9";
        } else if (position === -2) {
            slide.style.transform =
                "translate(calc(-50% - 470px), -50%) scale(0.68) rotate(-14deg)";
            slide.style.zIndex = "10";
            slide.style.opacity = "0.7";
        } else if (position === 2) {
            slide.style.transform =
                "translate(calc(-50% + 470px), -50%) scale(0.68) rotate(14deg)";
            slide.style.zIndex = "10";
            slide.style.opacity = "0.7";
        } else {
            slide.style.transform =
                "translate(-50%, -50%) scale(0.5)";
            slide.style.zIndex = "1";
            slide.style.opacity = "0";
        }
    });
}

if (galleryNext && galleryPrev && gallerySlides.length > 0) {
    galleryNext.addEventListener("click", () => {
        galleryIndex++;

        if (galleryIndex >= gallerySlides.length) {
            galleryIndex = 0;
        }

        updateGallery();
    });

    galleryPrev.addEventListener("click", () => {
        galleryIndex--;

        if (galleryIndex < 0) {
            galleryIndex = gallerySlides.length - 1;
        }

        updateGallery();
    });

    updateGallery();
}

// Project Filter
const projectFilters = document.querySelectorAll(".project-filter");
const projectItems = document.querySelectorAll("#projectsGrid > article");

if (projectFilters.length > 0 && projectItems.length > 0) {
    projectFilters.forEach((filter) => {
        filter.addEventListener("click", () => {
            const selectedFilter = filter.dataset.filter;

            // Update active filter button
            projectFilters.forEach((btn) => {
                btn.classList.remove("bg-[#071B3A]", "text-white");
                btn.classList.add("bg-white", "text-[#071B3A]");
            });

            filter.classList.remove("bg-white", "text-[#071B3A]");
            filter.classList.add("bg-[#071B3A]", "text-white");

            projectItems.forEach((project) => {
                const categoryBadge = project.querySelector("span");

                if (!categoryBadge) return;

                const category = categoryBadge.textContent.trim().toLowerCase();

                let projectCategory = "";

                if (
                    category.includes("social media") ||
                    category.includes("creative post")
                ) {
                    projectCategory = "social";
                } 
                else if (category.includes("branding")) {
                    projectCategory = "branding";
                } 
                else if (
                    category.includes("logo") ||
                    category.includes("brand logo")
                ) {
                    projectCategory = "logo";
                } 
                else if (
                    category.includes("packaging") ||
                    category.includes("box packaging")
                ) {
                    projectCategory = "packaging";
                } 
                else if (category.includes("poster")) {
                    projectCategory = "poster";
                }

                if (selectedFilter === "all" || projectCategory === selectedFilter) {
                    project.style.display = "";
                } else {
                    project.style.display = "none";
                }
            });
        });
    });
}

const galleryEvents = [
    {
        id: "annual-meetup",
        title: "Annual Meetup & Batch 01 Passout Ceremony",
        description: "Celebrating the achievements and memories of our first batch.",
        folder: "assests/gallery images/annual meetup",
        cover: "group photo 01.jpg",
        photos: Array.from({ length: 11 }, (_, i) =>
            `group photo ${String(i + 1).padStart(2, "0")}.jpg`
        )
    },
    {
    id: "first-anniversary",
    title: "1 Year Celebration & Website Launching Ceremony",
    description: "Celebrating one year of learning, creativity, and growth.",
    folder: "assests/gallery images/1st anniversary",
    cover: "picture 2.jpg",
    photos: Array.from({ length: 33 }, (_, i) =>
        `picture ${i + 1}.jpg`
        )
    },
];

const eventsView = document.getElementById("eventsView");
const photoView = document.getElementById("photoView");
const eventCards = document.getElementById("eventCards");
const galleryGrid = document.getElementById("galleryGrid");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxCounter = document.getElementById("lightboxCounter");

let activeEvent = null;
let activeIndex = 0;

// Gallery page only: skip this whole block on pages without the gallery markup.
if (eventsView && photoView && eventCards && galleryGrid && lightbox) {

// RENDER EVENT CARDS
galleryEvents.forEach(event => {
    const card = document.createElement("article");

    card.className =
        "overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-[#0A1628]";

    card.innerHTML = `
        <button type="button" class="block w-full text-left">
            <div class="aspect-4/3 overflow-hidden bg-gray-200 dark:bg-gray-800">
                <img src="${event.folder}/${event.cover}"
                     alt="${event.title}"
                     class="h-full w-full object-cover transition duration-500 hover:scale-105"
                     loading="lazy">
            </div>

            <div class="p-5 sm:p-6">
                

                <h3 class="mb-3 text-lg font-bold sm:text-xl">
                    ${event.title}
                </h3>

                <p class="mb-5 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    ${event.description}
                </p>

                <span class="font-semibold text-[#245DAA] dark:text-[#9cc8f5]">
                    View Gallery <i class="fa-solid fa-arrow-right ml-2"></i>
                </span>
            </div>
        </button>
    `;

    card.querySelector("button").addEventListener("click", () => {
        openGallery(event);
    });

    eventCards.appendChild(card);
});


// OPEN SELECTED EVENT
function openGallery(event) {
    activeEvent = event;

    eventsView.hidden = true;
    photoView.hidden = false;

    document.getElementById("galleryHeading").textContent = event.title;
    document.getElementById("galleryDescription").textContent = event.description;
    

    galleryGrid.innerHTML = "";

    event.photos.forEach((photo, index) => {
        const image = document.createElement("img");
        const button = document.createElement("button");

        image.src = `${event.folder}/${photo}`;
        image.alt = `${event.title} - Photo ${index + 1}`;
        image.loading = "lazy";

        image.className =
            "h-full w-full object-cover transition duration-300 group-hover:scale-105";

        button.type = "button";
        button.className =
            "group aspect-square overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800";

        button.appendChild(image);

        image.addEventListener("error", () => {
            button.remove();
        });

        button.addEventListener("click", () => openLightbox(index));

        galleryGrid.appendChild(button);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}


// OPEN IMAGE PREVIEW
function openLightbox(index) {
    activeIndex = index;
    updateLightbox();

    lightbox.hidden = false;
    document.body.classList.add("overflow-hidden");
}

function updateLightbox() {
    const photo = activeEvent.photos[activeIndex];

    lightboxImage.src = `${activeEvent.folder}/${photo}`;
    lightboxImage.alt = `${activeEvent.title} - Photo ${activeIndex + 1}`;
    lightboxCaption.textContent = activeEvent.title;
    lightboxCounter.textContent =
        `${activeIndex + 1} / ${activeEvent.photos.length}`;
}


// PREVIOUS / NEXT
document.getElementById("prevPhoto").addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + activeEvent.photos.length)
        % activeEvent.photos.length;
    updateLightbox();
});

document.getElementById("nextPhoto").addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % activeEvent.photos.length;
    updateLightbox();
});


// CLOSE LIGHTBOX
function closeLightbox() {
    lightbox.hidden = true;
    lightboxImage.src = "";
    document.body.classList.remove("overflow-hidden");
}

document.getElementById("closeLightbox").addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") closeLightbox();

    if (event.key === "ArrowRight") {
        activeIndex = (activeIndex + 1) % activeEvent.photos.length;
        updateLightbox();
    }

    if (event.key === "ArrowLeft") {
        activeIndex = (activeIndex - 1 + activeEvent.photos.length)
            % activeEvent.photos.length;
        updateLightbox();
    }
});


// BACK TO EVENTS
document.getElementById("backToEvents").addEventListener("click", () => {
    photoView.hidden = true;
    eventsView.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
});

} // end gallery-only block

// Back To Top
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.classList.remove("hidden");
            backToTop.classList.add("flex");
        } else {
            backToTop.classList.add("hidden");
            backToTop.classList.remove("flex");
        }
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// Dark / Light Mode
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

if (themeToggle && themeIcon) {
    const savedTheme = localStorage.getItem("theme");

    // Apply saved theme
    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        document.documentElement.classList.remove("dark");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }

    // Toggle theme
    themeToggle.addEventListener("click", function () {
        document.documentElement.classList.toggle("dark");

        const isDark = document.documentElement.classList.contains("dark");

        if (isDark) {
            localStorage.setItem("theme", "dark");

            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        } else {
            localStorage.setItem("theme", "light");

            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        }
    });
}

// Course information
const courseSelect = document.getElementById("course");
const courseSummary = document.getElementById("courseSummary");
const selectedCourseName = document.getElementById("selectedCourseName");
const selectedCourseDuration = document.getElementById("selectedCourseDuration");
const selectedCourseFee = document.getElementById("selectedCourseFee");
if (courseSelect) courseSelect.addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    if (!this.value) {
        courseSummary.classList.add("hidden");
        return;
    }
    selectedCourseName.textContent = selectedOption.value;
    selectedCourseDuration.textContent = selectedOption.dataset.duration;
    selectedCourseFee.textContent = selectedOption.dataset.fee;
    courseSummary.classList.remove("hidden");
});
// Payment method
const paymentDetails = document.getElementById("paymentDetails");
const paymentMethodName = document.getElementById("paymentMethodName");
const paymentAccountNumber = document.getElementById("paymentAccountNumber");
const paymentAccountName = document.getElementById("paymentAccountName");
const paymentAccounts = {
    Easypaisa: "0311 0619854"
};
document.querySelectorAll('input[name="paymentMethod"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
        const method = this.value;
        paymentMethodName.textContent = method;
        paymentAccountNumber.textContent = paymentAccounts[method] || "";
        paymentDetails.classList.remove("hidden");
    });
});


// ===== Enrollment Form (connected to Learnify backend) =====
(function () {
    var API = "https://ybbvakeaixihtjwrlknj.supabase.co";
    var KEY = "sb_publishable_gYx40fREmy1wRellfyqdiA_iTbaC-zt";
    var SUCCESS = "Thank you! Your enrollment application and payment screenshot have been submitted. Our team is verifying your payment. Once approved, you will receive your WhatsApp group link.";
    var form = document.getElementById("enrollmentForm");
    var btn = document.getElementById("enrollmentSubmit");
    if (!form || !btn) return;
    var fileInput = document.getElementById("paymentScreenshot");
    var fileName = document.getElementById("fileName");
    if (fileInput && fileName) fileInput.addEventListener("change", function () {
        fileName.textContent = fileInput.files[0] ? fileInput.files[0].name : "No file selected";
    });

    function rpc(fn, body) {
        return fetch(API + "/rest/v1/rpc/" + fn, { method: "POST", headers: { "Content-Type": "application/json", apikey: KEY }, body: JSON.stringify(body || {}) })
            .then(function (r) { if (!r.ok) throw new Error("x"); return r.json(); });
    }
    function msg(text, type, ms) {
        var old = document.getElementById("formMessage"); if (old) old.remove();
        var p = document.createElement("p"); p.id = "formMessage"; p.textContent = text;
        p.className = type === "success" ? "mt-4 rounded-lg bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700" : "mt-4 rounded-lg bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700";
        form.appendChild(p); setTimeout(function () { p.remove(); }, ms || 6000);
    }

    // Payment account details (editable from the admin portal)
    rpc("get_payment_account").then(function (rows) {
        var acc = Array.isArray(rows) ? rows[0] : rows;
        if (!acc) return;
        if (acc.account_number) paymentAccounts.Easypaisa = acc.account_number;
        if (acc.account_name && paymentAccountName) paymentAccountName.textContent = acc.account_name;
        var checked = form.querySelector('input[name="paymentMethod"]:checked');
        if (checked && paymentAccountNumber) paymentAccountNumber.textContent = paymentAccounts[checked.value] || "";
    }).catch(function () {});

    var select = document.getElementById("course");
    var byName = {};
    rpc("get_active_courses").then(function (list) {
        if (!Array.isArray(list) || !list.length) return;
        list.forEach(function (c) { byName[c.name.toLowerCase()] = c; });
        // Keep the existing options' look; update data from the database
        var keep = select.querySelector('option[value=""]');
        select.innerHTML = ""; if (keep) select.appendChild(keep);
        list.forEach(function (c) {
            var o = document.createElement("option");
            o.value = c.name; o.textContent = c.name + (c.duration ? " - " + c.duration : "");
            o.dataset.duration = c.duration || ""; o.dataset.fee = c.fee != null ? c.fee : "";
            select.appendChild(o);
        });
    }).catch(function () {});

    var errors = { invalid_name: "Please enter your full name (2-100 characters).", invalid_email: "Please enter a valid email address.",
        invalid_phone: "Please enter a valid WhatsApp number.", invalid_city: "City name is too long.", invalid_university: "Please enter your university/institute name.", invalid_semester: "Please enter your semester/class.", invalid_payment_method: "Please select a payment method.",
        invalid_screenshot: "Please upload your payment screenshot again.", invalid_course: "Please choose a course from the list.",
        rate_limited: "You've submitted several applications recently. Please try again later." };
    var busy = false, original = btn.innerHTML;

    form.addEventListener("submit", function (ev) {
        ev.preventDefault(); if (busy) return;
        var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; };
        var name = v("fullName"), email = v("email"), phone = v("phone"), city = v("city"), university = v("university"), semester = v("semester");
        var course = byName[(select.value || "").toLowerCase()];
        var pm = form.querySelector('input[name="paymentMethod"]:checked');
        var file = fileInput && fileInput.files[0];
        var confirmBox = document.getElementById("paymentConfirmation");
        if (!name || !email || !phone || !university || !semester || !select.value) return msg("Please fill in all required fields.", "error");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return msg(errors.invalid_email, "error");
        if (!/^\+?[0-9 ()-]{7,20}$/.test(phone)) return msg(errors.invalid_phone, "error");
        if (!course) return msg("Courses are still loading. Please choose your course again in a moment.", "error");
        if (!pm) return msg(errors.invalid_payment_method, "error");
        if (!file) return msg("Please upload your payment screenshot.", "error");
        if (!/^image\//.test(file.type) || file.size > 5 * 1024 * 1024) return msg("Please upload an image file under 5 MB.", "error");
        if (confirmBox && !confirmBox.checked) return msg("Please confirm your payment details.", "error");
        var ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        if (["jpg","jpeg","png","webp","gif","heic"].indexOf(ext) === -1) ext = "jpg";
        var path = "receipts/" + crypto.randomUUID() + "." + ext;

        busy = true; btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
        fetch(API + "/storage/v1/object/payment-receipts/" + path, { method: "POST", headers: { apikey: KEY, "Content-Type": file.type }, body: file })
            .then(function (r) { if (!r.ok) throw new Error("upload"); })
            .then(function () { return rpc("submit_paid_enrollment", { _full_name: name.slice(0, 100), _email: email.slice(0, 255), _phone: phone.slice(0, 20), _city: city.slice(0, 80), _course_id: course.id, _payment_method: pm.value, _screenshot_path: path, _university_name: university.slice(0, 120), _semester: semester.slice(0, 40) }); })
            .then(function (res) {
                if (res === "ok") { form.reset(); if (fileName) fileName.textContent = "No file selected"; msg(SUCCESS, "success", 12000); }
                else msg(errors[res] || "Something went wrong. Please try again.", "error");
            })
            .catch(function () { msg("We couldn't submit your application right now. Please check your connection and try again.", "error"); })
            .finally(function () { busy = false; btn.disabled = false; btn.innerHTML = original; });
    });
})();

