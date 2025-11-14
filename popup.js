/**
 * Popup Tutorial Module
 * Handles the tutorial popup functionality for the game
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize popup functionality
  initPopup();
});

/**
 * Initialize popup functionality
 */
function initPopup() {
  // Get references to the popup elements
  const tutorialPopup = document.getElementById('tutorialPopup');
  const understandBtn = document.getElementById('understandBtn');
  
  // Attach click event to the "Got it!!!" button
  understandBtn.onclick = handleUnderstandBtnClick;
}

/**
 * Show or hide the tutorial popup
 * @param {boolean} on - Whether to show (true) or hide (false) the popup
 */
function showTutorialPopup(on) {
  const tutorialPopup = document.getElementById('tutorialPopup');
  if (on) {
    tutorialPopup.style.display = 'flex';
  } else {
    tutorialPopup.style.display = 'none';
  }
}

/**
 * Handle the click event on the "Got it!!!" button
 */
function handleUnderstandBtnClick() {
  // Get references to the popup elements
  const popupElement = document.getElementById('tutorialPopup');
  const popupBoxElement = popupElement.querySelector('.popup-box');
  const understandBtn = document.getElementById('understandBtn');
  
  // Prevent multiple clicks
  understandBtn.disabled = true;
  
  // Get the background color of the game for smooth transition
  const computedStyle = getComputedStyle(document.body);
  const gameBackgroundColor = computedStyle.background;
  
  // Add a subtle scale effect to the button when clicked
  understandBtn.style.transform = 'scale(0.95)';
  understandBtn.style.opacity = '0.9';
  
  // After a short delay, start the main animation
  setTimeout(() => {
    // Add the animation classes
    popupElement.classList.add('fading-out');
    popupBoxElement.classList.add('sliding-up');
    
    // Wait for the animation to complete before hiding the popup and starting the game
    setTimeout(() => {
      showTutorialPopup(false);
      
      // Call the game's countdown function if it exists
      if (typeof startCountdownThenStartGame === 'function') {
        startCountdownThenStartGame();
      } else if (typeof window.startCountdownThenStartGame === 'function') {
        window.startCountdownThenStartGame();
      } else {
        console.error('startCountdownThenStartGame function not found');
      }
      
      // Reset classes and button state for next time
      setTimeout(() => {
        popupElement.classList.remove('fading-out');
        popupBoxElement.classList.remove('sliding-up');
        understandBtn.disabled = false;
        understandBtn.style.transform = '';
        understandBtn.style.opacity = '';
      }, 100);
    }, 800); // Match the transition duration in CSS
  }, 50); // Short delay before starting the animation
}

// Export functions to make them available to the game
window.PopupTutorial = {
  show: showTutorialPopup,
  init: initPopup
};