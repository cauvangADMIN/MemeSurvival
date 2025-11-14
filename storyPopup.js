/**
 * Story Popup Module
 * Handles the story popup functionality for character 1
 */

// Initialize the story popup functionality
function initStoryPopup() {
  console.log('Initializing Story Popup');
  // Create popup elements if they don't exist
  if (!document.getElementById('storyPopup')) {
    console.log('Creating story popup elements');
    createStoryPopupElements();
  } else {
    console.log('Story popup elements already exist');
  }
}

// Create the popup elements and append them to the body
function createStoryPopupElements() {
  console.log('Creating story popup elements');
  
  // Remove existing popup if it exists (to avoid duplicates)
  const existingPopup = document.getElementById('storyPopup');
  if (existingPopup) {
    console.log('Removing existing popup');
    existingPopup.remove();
  }
  
  // Create the main popup container
  const popupElement = document.createElement('div');
  popupElement.id = 'storyPopup';
  popupElement.className = 'story-popup';
  popupElement.style.display = 'none';
  
  // Create the popup content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'story-content-container';
  
  // Create the image container
  const imageContainer = document.createElement('div');
  imageContainer.className = 'story-image-container';
  
  // Create the first story image
  const image1 = document.createElement('img');
  image1.src = 'assets/images/story-01.png';
  image1.className = 'story-image active';
  image1.id = 'storyImage1';
  
  // Create the second story image
  const image2 = document.createElement('img');
  image2.src = 'assets/images/story-02.png';
  image2.className = 'story-image';
  image2.id = 'storyImage2';
  
  // Add images to the container
  imageContainer.appendChild(image1);
  imageContainer.appendChild(image2);
  
  // Create the button container
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'story-button-container';
  
  // Create the Next button
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.className = 'story-button';
  nextButton.id = 'storyNextButton';
  
  // Create the Ready button (initially hidden)
  const readyButton = document.createElement('button');
  readyButton.textContent = 'Ready !';
  readyButton.className = 'story-button';
  readyButton.id = 'storyReadyButton';
  readyButton.style.display = 'none';
  
  // Add buttons to the container
  buttonContainer.appendChild(nextButton);
  buttonContainer.appendChild(readyButton);
  
  // Add containers to the content container
  contentContainer.appendChild(imageContainer);
  contentContainer.appendChild(buttonContainer);
  
  // Add the content container to the popup
  popupElement.appendChild(contentContainer);
  
  // Add the popup to the body
  document.body.appendChild(popupElement);
  
  console.log('Story popup element created and added to body');
  
  // Add event listeners for the buttons
  nextButton.addEventListener('click', showSecondStoryImage);
  readyButton.addEventListener('click', startGame);
  
  // Add some inline styles to ensure visibility and proper positioning
  const style = document.createElement('style');
  style.textContent = `
    .story-popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    
    .story-popup.show {
      opacity: 1;
    }
    
    .story-content-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 90%;
      max-height: 90%;
    }
    
    .story-image-container {
      position: relative;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
    
    .story-image {
      max-width: 100%;
      max-height: 70vh;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transform: translateX(100%);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .story-image.active {
      opacity: 1;
      transform: translateX(0);
      position: relative;
    }
    
    .story-image.slide-left {
      transform: translateX(-100%);
      opacity: 0;
    }
    
    .story-image.slide-right {
      transform: translateX(100%);
      opacity: 0;
    }
    
    .story-button-container {
      margin-top: 20px;
    }
    
    .story-button {
      background: linear-gradient(90deg, #ff005e, #ff8000);
      padding: 12px 30px;
      border: none;
      border-radius: 12px;
      font-size: 1.3em;
      font-weight: bold;
      cursor: pointer;
      color: #fff;
      transition: 0.3s;
    }
    
    .story-button:hover {
      transform: scale(1.1);
      box-shadow: 0 0 20px #ff8000;
    }
  `;
  document.head.appendChild(style);
}

// Show the story popup
function showStoryPopup() {
  console.log('Showing story popup');
  
  // Make sure the popup elements exist
  if (!document.getElementById('storyPopup')) {
    createStoryPopupElements();
  }
  
  const popup = document.getElementById('storyPopup');
  if (popup) {
    // Reset to first image
    const image1 = document.getElementById('storyImage1');
    const image2 = document.getElementById('storyImage2');
    const nextButton = document.getElementById('storyNextButton');
    const readyButton = document.getElementById('storyReadyButton');
    
    if (image1 && image2 && nextButton && readyButton) {
      image1.className = 'story-image active';
      image2.className = 'story-image';
      nextButton.style.display = 'block';
      readyButton.style.display = 'none';
    }
    
    // Show the popup with animation
    popup.style.display = 'flex';
    setTimeout(() => {
      popup.classList.add('show');
    }, 10);
  } else {
    console.error('Story popup element not found even after creation!');
  }
}

// Show the second story image with animation
function showSecondStoryImage() {
  console.log('Showing second story image');
  
  const image1 = document.getElementById('storyImage1');
  const image2 = document.getElementById('storyImage2');
  const nextButton = document.getElementById('storyNextButton');
  const readyButton = document.getElementById('storyReadyButton');
  
  if (image1 && image2 && nextButton && readyButton) {
    // Animate first image sliding out to the left
    image1.classList.add('slide-left');
    
    // After a short delay, make the second image active and slide in from the right
    setTimeout(() => {
      image1.classList.remove('active');
      image2.classList.add('active');
      
      // Hide Next button, show Ready button
      nextButton.style.display = 'none';
      readyButton.style.display = 'block';
    }, 500);
  }
}

// Hide the story popup
function hideStoryPopup() {
  const popup = document.getElementById('storyPopup');
  if (popup) {
    // Hide with animation
    popup.classList.remove('show');
    
    // Remove the popup after animation completes
    setTimeout(() => {
      popup.style.display = 'none';
    }, 500);
  }
}

// Start the game
function startGame() {
  console.log('Starting game after story');
  
  // Hide the popup
  hideStoryPopup();
  
  // Set the selected character and mode
  localStorage.setItem('selectedCharacter', 'ganyu');
  localStorage.setItem('gameMode', 'survival');
  
  // Navigate to the game page
  setTimeout(() => {
    window.location.href = 'game_update.html';
  }, 500);
}

// Export functions to make them available to the game
window.StoryPopup = {
  init: initStoryPopup,
  show: showStoryPopup,
  hide: hideStoryPopup
};

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing StoryPopup');
  initStoryPopup();
});

// Also initialize immediately in case DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('Document already loaded, initializing StoryPopup now');
  setTimeout(initStoryPopup, 100);
}
