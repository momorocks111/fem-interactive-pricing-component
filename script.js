"use strict";

// Get the necessary DOM elements
const slider = document.getElementById("scroll-bar");
const output = document.getElementById("show-views");
const amountMobile = document.getElementById("show-amount-mobile");
const amountDesktop = document.getElementById("show-amount-desktop");
const toggleBtn = document.getElementById("check");

// Set the initial slider value
slider.value = 100000;

// Initialize the amount per month variable
let amountPerMonth;

// Add event listeners
toggleBtn.addEventListener("click", handleToggle);
slider.addEventListener("input", handleSliderInput);
slider.addEventListener("mousemove", updateSliderBackground);

// Call the initial update functions
updateDisplayValues();
updateAmount();
updateSliderBackground();

/**
 * Handles the toggle button click event.
 */
function handleToggle() {
  updateDisplayValues();
  updateAmount();
  updateSliderBackground();
}

/**
 * Handles the slider input event.
 */
function handleSliderInput() {
  updateDisplayValues();
  updateAmount();
  updateSliderBackground();
}

/**
 * Updates the page views display.
 */
function updateDisplayValues() {
  const value = parseInt(slider.value, 10);

  if (value < 1000000) {
    const pageViewsK = Math.floor(value / 1000);
    output.textContent = `${pageViewsK}K PAGEVIEWS`;
  } else {
    const pageViewsM = Math.floor(value / 1000000);
    output.textContent = `${pageViewsM}M PAGEVIEWS`;
  }
}

/**
 * Updates the amount display based on the slider value and toggle button state.
 */
function updateAmount() {
  const value = parseInt(slider.value, 10);

  if (value < 50000) {
    amountPerMonth = 8;
  } else if (value < 100000) {
    amountPerMonth = 12;
  } else if (value < 500000) {
    amountPerMonth = 16;
  } else if (value < 1000000) {
    amountPerMonth = 24;
  } else {
    amountPerMonth = 36;
  }

  if (toggleBtn.checked) {
    amountPerMonth *= 9;
  }

  updateAmountDisplay(amountPerMonth, amountMobile);
  updateAmountDisplay(amountPerMonth, amountDesktop);
}

/**
 * Updates the amount display for a given element.
 * @param {number} amount - The amount to display.
 * @param {HTMLElement} amountElement - The element to update.
 */
function updateAmountDisplay(amount, amountElement) {
  const monthText = document.createElement("span");
  monthText.classList.add("month-text");

  if (toggleBtn.checked) {
    monthText.textContent = "/year";
  } else {
    monthText.textContent = "/month";
  }

  amountElement.textContent = `$${amount}.00`;
  amountElement.appendChild(monthText);
}

/**
 * Updates the background gradient of the range slider based on the current slider value.
 */
function updateSliderBackground() {
  const value = parseInt(slider.value, 10);
  const min = parseInt(slider.min, 10);
  const max = parseInt(slider.max, 10);
  const percentage = ((value - min) / (max - min)) * 100;

  const color = `linear-gradient(90deg, var(--Soft-Cyan-clr) ${percentage}%, var(--Light-Grayish-Blue-clr-1) ${percentage}%)`;
  slider.style.backgroundImage = color;
}
