const WHATSAPP_NUMBER = "601XXXXXXXX";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const scrollToBooking = () => document.querySelector("#booking")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-stuck", window.scrollY > 80);
}, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("is-locked", !isOpen);
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
    document.body.classList.remove("is-locked");
  });
});

document.querySelectorAll("[data-comparison]").forEach((comparison) => {
  const range = comparison.querySelector("input[type='range']");
  range?.addEventListener("input", (event) => {
    comparison.style.setProperty("--position", `${event.currentTarget.value}%`);
  });
});

const filterButtons = document.querySelectorAll("[data-filter]");
const looks = document.querySelectorAll(".look[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    looks.forEach((look) => {
      const categories = look.dataset.category.split(" ");
      look.hidden = selected !== "all" && !categories.includes(selected);
    });
  });
});

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = lightbox?.querySelector(".lightbox-image");
const lightboxCaption = lightbox?.querySelector("#lightbox-caption");
const lightboxClose = lightbox?.querySelector(".lightbox-close");
let lastFocusedElement = null;

const openLightbox = (trigger) => {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;
  lastFocusedElement = trigger;
  lightboxImage.style.backgroundImage = `url('${trigger.dataset.image}')`;
  lightboxImage.setAttribute("aria-label", trigger.dataset.caption || "Salon look");
  lightboxCaption.textContent = trigger.dataset.caption || "Salon look";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
  lightboxClose?.focus();
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
  lastFocusedElement?.focus();
};

document.querySelectorAll("[data-image][data-caption]").forEach((trigger) => {
  trigger.addEventListener("click", () => openLightbox(trigger));
});
lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("is-open")) closeLightbox();
});

const serviceTabs = [...document.querySelectorAll("[data-service-tab]")];
const servicePanels = [...document.querySelectorAll("[data-service-panel]")];

const activateServiceTab = (tab) => {
  const category = tab.dataset.serviceTab;
  serviceTabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
  servicePanels.forEach((panel) => {
    const active = panel.dataset.servicePanel === category;
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
  });
};

serviceTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateServiceTab(tab));
  tab.addEventListener("keydown", (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = serviceTabs[(index + direction + serviceTabs.length) % serviceTabs.length];
    next.focus();
    activateServiceTab(next);
  });
});

const bookingForm = document.querySelector("#booking-form");
const serviceField = document.querySelector("#service");
const stylistField = document.querySelector("#stylist");
const notesField = document.querySelector("#notes");
const dateField = document.querySelector("#date");

if (dateField) {
  const localToday = new Date();
  const offset = localToday.getTimezoneOffset() * 60000;
  dateField.min = new Date(localToday.getTime() - offset).toISOString().split("T")[0];
}

const setSelectValue = (select, value) => {
  if (!select) return;
  const matchingOption = [...select.options].find((option) => option.value.toLowerCase() === value.toLowerCase());
  if (matchingOption) {
    select.value = matchingOption.value;
  } else if (notesField) {
    notesField.value = `${value}${notesField.value ? `\n${notesField.value}` : ""}`;
  }
};

document.querySelectorAll("[data-book-service]").forEach((button) => {
  button.addEventListener("click", () => {
    setSelectValue(serviceField, button.dataset.bookService);
    if (notesField && serviceField?.value === "") notesField.value = `Interested in: ${button.dataset.bookService}`;
    scrollToBooking();
  });
});

document.querySelectorAll("[data-consultation]").forEach((button) => {
  button.addEventListener("click", () => {
    setSelectValue(serviceField, button.dataset.consultation);
    scrollToBooking();
  });
});

document.querySelectorAll("[data-stylist]").forEach((button) => {
  button.addEventListener("click", () => {
    setSelectValue(stylistField, button.dataset.stylist);
    scrollToBooking();
  });
});

document.querySelectorAll("a[href='#']").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const data = new FormData(bookingForm);
  const message = [
    "Hi Velvet & Vine, I'd like to enquire about an appointment.",
    "",
    `Name: ${data.get("name")}`,
    `My WhatsApp: ${data.get("whatsapp")}`,
    `Service: ${data.get("service")}`,
    `Preferred stylist: ${data.get("stylist")}`,
    `Hair length: ${data.get("length")}`,
    `Current hair condition: ${data.get("condition")}`,
    `Preferred date: ${data.get("date")}`,
    `Preferred time: ${data.get("time")}`,
    `Notes: ${data.get("notes") || "None"}`,
    "",
    "Please let me know the availability and estimated price. Thank you."
  ].join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const status = document.querySelector("#form-status");

  if (WHATSAPP_NUMBER.includes("X")) {
    navigator.clipboard?.writeText(message).catch(() => {});
    if (status) status.textContent = "WhatsApp message prepared. Replace 601XXXXXXXX in script.js with the salon number to activate sending.";
    return;
  }

  if (status) status.textContent = "Opening WhatsApp…";
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
