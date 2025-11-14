/**
 * Coming Soon Popup Module
 * Handles the coming soon popup functionality for locked characters
 */

// Initialize the coming soon popup functionality
function initComingSoonPopup() {
  console.log('Initializing Coming Soon Popup');
  // Create popup elements if they don't exist
  if (!document.getElementById('comingSoonPopup')) {
    console.log('Creating popup elements');
    createComingSoonPopupElements();
  } else {
    console.log('Popup elements already exist');
  }
}

// Create the popup elements and append them to the body
function createComingSoonPopupElements() {
  console.log('Creating coming soon popup elements');
  
  // Remove existing popup if it exists (to avoid duplicates)
  const existingPopup = document.getElementById('comingSoonPopup');
  if (existingPopup) {
    console.log('Removing existing popup');
    existingPopup.remove();
  }
  
  // Create the main popup container
  const popupElement = document.createElement('div');
  popupElement.id = 'comingSoonPopup';
  popupElement.className = 'coming-soon-popup';
  popupElement.style.display = 'none';
  
  // Create the popup bubble
  const bubbleElement = document.createElement('div');
  bubbleElement.className = 'bubble-chat';
  
  // Create the popup content - split into 2 lines
  const contentElement = document.createElement('div');
  contentElement.className = 'bubble-content';
  
  // Create two separate lines for better formatting
  const line1 = document.createElement('div');
  line1.textContent = 'Tôi cần thêm kinh phí để phát triển nhân vật này.';
  
  const line2 = document.createElement('div');
  line2.textContent = 'Hãy donate cho tôi nhé!';
  
  contentElement.appendChild(line1);
  contentElement.appendChild(line2);
  
  // Add the content to the bubble
  bubbleElement.appendChild(contentElement);
  
  // Add the bubble to the popup
  popupElement.appendChild(bubbleElement);
  
  // Add the popup to the body
  document.body.appendChild(popupElement);
  
  console.log('Popup element created and added to body');
  
  // Add click event listener to close the popup when clicking anywhere else
  document.addEventListener('click', (event) => {
    const popup = document.getElementById('comingSoonPopup');
    if (popup && popup.style.display === 'block' && !popup.contains(event.target) && 
        !event.target.classList.contains('fight-btn')) {
      console.log('Clicked outside popup, hiding it');
      hideComingSoonPopup();
    }
  });
  
  // Add some inline styles to ensure visibility and proper positioning
  const style = document.createElement('style');
  style.textContent = `
    #comingSoonPopup {
      visibility: visible !important;
      position: absolute !important;
      z-index: 9999 !important;
    }
    .bubble-chat {
      visibility: visible !important;
      width: 250px !important; /* Slightly smaller width */
      background: linear-gradient(135deg, #ffe6eb, #ffb6c1) !important; /* Light pink background */
      color: #d40000 !important; /* Red text */
      padding: 12px 16px !important;
    }
    .bubble-chat:after {
      border-top-color: #ffb6c1 !important; /* Match the bubble tip color */
    }
    .bubble-content div {
      line-height: 1.3 !important;
      margin-bottom: 4px !important;
      font-weight: 500 !important;
    }
  `;
  document.head.appendChild(style);
}

// Show the coming soon popup at a specific position
function showComingSoonPopup(x, y) {
  console.log(`Showing popup at position: ${x}, ${y}`);
  
  // Always recreate the popup to ensure it's fresh and properly positioned
  createComingSoonPopupElements();
  
  const popup = document.getElementById('comingSoonPopup');
  if (popup) {
    // Get the button element for positioning
    const fightBtn = document.getElementById('fight-btn');
    if (fightBtn) {
      const rect = fightBtn.getBoundingClientRect();
      
      // Calculate position to place popup at the top-left of the button
      // We want the bubble tip to point at the top-left corner of the button
      const buttonLeft = rect.left;
      const buttonTop = rect.top;
      
      // Position the popup - we'll use fixed positioning relative to viewport
      popup.style.position = 'fixed';
      popup.style.left = `${buttonLeft - 180}px`; // Position to the left of the button
      popup.style.top = `${buttonTop - 80}px`; // Position above the button with space for the bubble
      
      console.log(`Positioned popup at left: ${popup.style.left}, top: ${popup.style.top}`);
    } else {
      console.error('Fight button not found!');
      // Fallback position in the center of the screen
      popup.style.position = 'fixed';
      popup.style.left = '50%';
      popup.style.top = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
    }
    
    // Show the popup with animation
    popup.style.display = 'block';
    popup.classList.add('show-animation');
    
    // Remove the animation class after animation completes
    setTimeout(() => {
      popup.classList.remove('show-animation');
    }, 500);
  } else {
    console.error('Popup element not found even after creation!');
    // Fallback to alert
    alert('Tôi cần thêm kinh phí để phát triển nhân vật này. Hãy donate cho tôi nhé');
  }
}

// Hide the coming soon popup
function hideComingSoonPopup() {
  const popup = document.getElementById('comingSoonPopup');
  if (popup) {
    // Add hide animation
    popup.classList.add('hide-animation');
    
    // Remove the popup after animation completes
    setTimeout(() => {
      popup.style.display = 'none';
      popup.classList.remove('hide-animation');
    }, 300);
  }
}

// Check if a character is coming soon
function isCharacterComingSoon(characterId) {
  console.log(`Checking if character ${characterId} is coming soon`);
  
  // Get character data from the GameCharacters object
  if (window.GameCharacters && window.GameCharacters.characters) {
    console.log('Using GameCharacters object');
    const character = window.GameCharacters.characters[characterId];
    const isComingSoon = character && character.comingSoon === true;
    console.log(`Character ${characterId} coming soon: ${isComingSoon}`);
    return isComingSoon;
  }
  
  // Fallback to check local characters object if GameCharacters is not available
  if (typeof characters !== 'undefined' && characters[characterId]) {
    console.log('Using local characters object (fallback)');
    const isComingSoon = characterId !== 'ganyu'; // Only ganyu is not coming soon
    console.log(`Character ${characterId} coming soon (fallback): ${isComingSoon}`);
    return isComingSoon;
  }
  
  console.log(`No character data found for ${characterId}`);
  return false;
}

// Export functions to make them available to the game
window.ComingSoonPopup = {
  init: initComingSoonPopup,
  show: showComingSoonPopup,
  hide: hideComingSoonPopup,
  isComingSoon: isCharacterComingSoon
};

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing ComingSoonPopup');
  initComingSoonPopup();
});

// Also initialize immediately in case DOM is already loaded
console.log('Running immediate initialization check');
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('Document already loaded, initializing now');
  setTimeout(initComingSoonPopup, 100);
}
