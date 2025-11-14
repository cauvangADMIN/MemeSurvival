/**
 * Mobile Controls for Meme Survival Game
 * - Detects mobile devices
 * - Forces landscape orientation and fullscreen
 * - Provides touch controls (D-pad and Space button)
 * - Shows controls only after tutorial
 */

const MobileControls = {
  // State variables
  isMobile: false,
  isLandscape: false,
  keys: {},
  controlsVisible: false,
  tutorialClosed: false,
  
  // Initialize mobile controls
  init: function() {
    // Detect if user is on mobile
    this.detectMobile();
    
    // Create orientation message
    this.createOrientationMessage();
    
    // Force fullscreen for all devices, not just mobile
    this.requestFullscreen();
    
    // Create mobile controls if on mobile, but keep them hidden
    if (this.isMobile) {
      this.createMobileControls();
      this.setupEventListeners();
      this.checkOrientation();
      this.hideControls(); // Initially hide controls
      
      // Listen for orientation changes
      window.addEventListener('resize', () => {
        this.checkOrientation();
        this.requestFullscreen(); // Try again on resize
      });
      window.addEventListener('orientationchange', () => {
        this.checkOrientation();
        this.requestFullscreen(); // Try again on orientation change
      });
      
      // Try to request fullscreen on various user interactions
      document.addEventListener('click', () => this.requestFullscreen());
      document.addEventListener('touchstart', () => this.requestFullscreen());
      
      // Listen for tutorial close event
      window.addEventListener('tutorialClosed', () => {
        this.tutorialClosed = true;
        this.showControls();
        this.requestFullscreen(); // Try again when tutorial closes
      });
    }
  },
  
  // Detect if user is on mobile device
  detectMobile: function() {
    // Check for touch capability and screen size
    const isTouchDevice = ('ontouchstart' in window) || 
                         (navigator.maxTouchPoints > 0) || 
                         (navigator.msMaxTouchPoints > 0);
    
    const isSmallScreen = window.innerWidth <= 900;
    
    // Check for mobile user agents
    const mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    this.isMobile = (isTouchDevice && isSmallScreen) || mobileUserAgent;
    
    // Add mobile class to body if on mobile
    if (this.isMobile) {
      document.body.classList.add('mobile-device');
    }
    
    console.log("Mobile detection:", this.isMobile);
  },
  
  // Request fullscreen mode - enhanced version that works for all devices
  requestFullscreen: function() {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
      
      // Try to lock orientation if supported
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(e => {
          console.log('Orientation lock failed:', e);
        });
      }
    } catch (e) {
      console.log('Fullscreen request error:', e);
    }
  },
  
  // Check and handle orientation
  checkOrientation: function() {
    // Always try to force fullscreen regardless of device type
    this.requestFullscreen();
    
    // Determine if in landscape mode
    this.isLandscape = window.innerWidth > window.innerHeight;
    
    // Show/hide orientation message
    const orientationMessage = document.getElementById('orientation-message');
    if (orientationMessage) {
      orientationMessage.style.display = this.isLandscape ? 'none' : 'flex';
    }
    
    // Force landscape orientation
    if (!this.isLandscape) {
      // Try to lock orientation if supported
      try {
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock('landscape').catch(e => {
            console.log('Orientation lock failed:', e);
          });
        }
      } catch (e) {
        console.log('Orientation lock error:', e);
      }
    } else {
      // We're in landscape, make sure controls are visible if tutorial is closed
      if (this.tutorialClosed) {
        this.showControls();
      }
    }
  },
  
  // Create orientation message overlay
  createOrientationMessage: function() {
    if (!this.isMobile) return;
    
    const orientationDiv = document.createElement('div');
    orientationDiv.id = 'orientation-message';
    orientationDiv.className = 'orientation-message';
    
    // Rotate phone icon (simple text-based for compatibility)
    const rotateIcon = document.createElement('div');
    rotateIcon.innerHTML = '📱';
    rotateIcon.style.fontSize = '50px';
    rotateIcon.style.animation = 'rotate 2s infinite linear';
    
    const message = document.createElement('p');
    message.textContent = 'Please rotate your device';
    
    const subMessage = document.createElement('p');
    subMessage.textContent = 'This game works best in landscape mode';
    subMessage.style.fontSize = '14px';
    subMessage.style.opacity = '0.8';
    
    orientationDiv.appendChild(rotateIcon);
    orientationDiv.appendChild(message);
    orientationDiv.appendChild(subMessage);
    
    document.body.appendChild(orientationDiv);
  },
  
  // Create mobile control elements
  createMobileControls: function() {
    // Create container for all mobile controls
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'mobile-controls';
    
    // Create D-pad
    const dpadContainer = document.createElement('div');
    dpadContainer.className = 'dpad-container';
    
    const dpad = document.createElement('div');
    dpad.className = 'dpad';
    
    // Create D-pad buttons
    const directions = [
      { name: 'up', symbol: '▲', key: 'w' },
      { name: 'right', symbol: '▶', key: 'd' },
      { name: 'down', symbol: '▼', key: 's' },
      { name: 'left', symbol: '◀', key: 'a' }
    ];
    
    directions.forEach(dir => {
      const button = document.createElement('div');
      button.className = `dpad-button dpad-${dir.name}`;
      button.setAttribute('data-key', dir.key);
      button.textContent = dir.symbol;
      dpad.appendChild(button);
    });
    
    // Add center of D-pad
    const center = document.createElement('div');
    center.className = 'dpad-button dpad-center';
    dpad.appendChild(center);
    
    dpadContainer.appendChild(dpad);
    
    // Create Space button
    const spaceContainer = document.createElement('div');
    spaceContainer.className = 'space-button-container';
    
    const spaceButton = document.createElement('div');
    spaceButton.className = 'space-button';
    spaceButton.setAttribute('data-key', ' ');
    spaceButton.textContent = 'Space !!';
    spaceButton.id = 'mobile-space-button';
    
    spaceContainer.appendChild(spaceButton);
    
    // Add all elements to the container
    controlsContainer.appendChild(dpadContainer);
    controlsContainer.appendChild(spaceContainer);
    
    // Add to document
    document.body.appendChild(controlsContainer);
  },
  
  // Set up event listeners for mobile controls
  setupEventListeners: function() {
    // Get all buttons
    const buttons = document.querySelectorAll('.dpad-button, .space-button');
    
    // Touch events for each button
    buttons.forEach(button => {
      const key = button.getAttribute('data-key');
      
      // Touch start - press key
      button.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default touch behavior
        this.keys[key] = true;
        
        // Trigger keydown event for the game
        const keyEvent = new KeyboardEvent('keydown', {
          key: key,
          code: key === ' ' ? 'Space' : `Key${key.toUpperCase()}`,
          bubbles: true
        });
        document.dispatchEvent(keyEvent);
        
        // Enhanced visual feedback
        button.style.opacity = '0.7';
        button.classList.add('active'); // Add active class for animation
        
        // Add haptic feedback if available
        if (window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate(50); // Short vibration for 50ms
        }
      });
      
      // Touch end - release key
      button.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.keys[key] = false;
        
        // Trigger keyup event for the game
        const keyEvent = new KeyboardEvent('keyup', {
          key: key,
          code: key === ' ' ? 'Space' : `Key${key.toUpperCase()}`,
          bubbles: true
        });
        document.dispatchEvent(keyEvent);
        
        // Reset visual feedback
        button.style.opacity = '1';
        button.classList.remove('active'); // Remove active class
      });
      
      // Touch cancel - also release key
      button.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        this.keys[key] = false;
        
        // Trigger keyup event
        const keyEvent = new KeyboardEvent('keyup', {
          key: key,
          code: key === ' ' ? 'Space' : `Key${key.toUpperCase()}`,
          bubbles: true
        });
        document.dispatchEvent(keyEvent);
        
        // Reset visual feedback
        button.style.opacity = '1';
        button.classList.remove('active'); // Remove active class
      });
    });
  },
  
  // Update space button state (ready/not ready)
  updateSpaceButton: function(isReady) {
    const spaceButton = document.getElementById('mobile-space-button');
    if (spaceButton) {
      if (isReady) {
        spaceButton.classList.add('ready');
      } else {
        spaceButton.classList.remove('ready');
      }
    }
  },
  
  // Show mobile controls
  showControls: function() {
    if (!this.isMobile || !this.tutorialClosed) return;
    
    const controls = document.querySelector('.mobile-controls');
    if (controls) {
      controls.style.display = 'block';
      this.controlsVisible = true;
    }
  },
  
  // Hide mobile controls
  hideControls: function() {
    const controls = document.querySelector('.mobile-controls');
    if (controls) {
      controls.style.display = 'none';
      this.controlsVisible = false;
    }
  }
};

// Initialize mobile controls when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  MobileControls.init();
  
  // Connect to the game's energy system to update space button state
  window.updateMobileSpaceButton = function(isReady) {
    MobileControls.updateSpaceButton(isReady);
  };
  
  // Function to show controls after tutorial
  window.showMobileControls = function() {
    // Dispatch event that tutorial is closed
    const event = new Event('tutorialClosed');
    window.dispatchEvent(event);
    
    // Try to request fullscreen again when user interacts
    MobileControls.requestFullscreen();
  };
});
