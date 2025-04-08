/* JavaScript Animation Controller
 * This file implements the JavaScript functionality needed for the elite-level animations
 * and handles performance optimization across different devices
 */

// Performance Detection and Optimization
class PerformanceController {
  constructor() {
    this.performanceTier = this.detectPerformanceTier();
    this.applyPerformanceSettings();
    this.setupEventListeners();
  }
  
  detectPerformanceTier() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'low';
    }
    
    // Check for mobile devices
    if (window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return 'medium';
    }
    
    // Check for low-end devices using rough heuristics
    const lowEndDevice = navigator.hardwareConcurrency <= 2;
    if (lowEndDevice) {
      return 'low';
    }
    
    // Default to high performance for desktop devices
    return 'high';
  }
  
  applyPerformanceSettings() {
    // Set CSS variables based on detected performance tier
    document.documentElement.style.setProperty('--current-performance-tier', 
      this.performanceTier === 'high' ? 2 : 
      this.performanceTier === 'medium' ? 1 : 0
    );
    
    // Apply performance classes to the document
    document.body.classList.add(`performance-${this.performanceTier}`);
    
    // Configure visibility of performance-tiered elements
    if (this.performanceTier === 'low') {
      document.documentElement.style.setProperty('--high-tier-display', 'none');
      document.documentElement.style.setProperty('--medium-tier-display', 'none');
      document.documentElement.style.setProperty('--enhancement-animation-state', 'paused');
    } else if (this.performanceTier === 'medium') {
      document.documentElement.style.setProperty('--high-tier-display', 'none');
      document.documentElement.style.setProperty('--enhancement-animation-state', 'running');
    } else {
      document.documentElement.style.setProperty('--enhancement-animation-state', 'running');
    }
    
    console.log(`Performance tier set to: ${this.performanceTier}`);
  }
  
  setupEventListeners() {
    // Listen for window resize to adjust performance settings if needed
    window.addEventListener('resize', this.debounce(() => {
      const newTier = this.detectPerformanceTier();
      if (newTier !== this.performanceTier) {
        this.performanceTier = newTier;
        this.applyPerformanceSettings();
      }
    }, 250));
  }
  
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Magnetic Button Effect
class MagneticEffect {
  constructor(elements) {
    this.elements = document.querySelectorAll(elements);
    this.bindEvents();
  }
  
  bindEvents() {
    this.elements.forEach(element => {
      element.addEventListener('mousemove', this.handleMouseMove.bind(this, element));
      element.addEventListener('mouseleave', this.handleMouseLeave.bind(this, element));
    });
  }
  
  handleMouseMove(element, e) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    const strength = 0.3; // Adjust magnetic strength
    const maxDistance = Math.max(rect.width, rect.height) / 2;
    
    const x = distanceX * strength * (maxDistance / Math.max(Math.abs(distanceX), maxDistance));
    const y = distanceY * strength * (maxDistance / Math.max(Math.abs(distanceY), maxDistance));
    
    element.style.setProperty('--x', x);
    element.style.setProperty('--y', y);
    
    // Apply the transform
    element.style.transform = `translate(${x}px, ${y}px)`;
  }
  
  handleMouseLeave(element) {
    // Reset position with a smooth transition
    element.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    element.style.transform = 'translate(0px, 0px)';
    
    // Remove transition after animation completes
    setTimeout(() => {
      element.style.transition = '';
    }, 500);
  }
}

// 3D Tilt Effect
class TiltEffect {
  constructor(elements) {
    this.elements = document.querySelectorAll(elements);
    this.bindEvents();
  }
  
  bindEvents() {
    this.elements.forEach(element => {
      element.addEventListener('mousemove', this.handleMouseMove.bind(this, element));
      element.addEventListener('mouseleave', this.handleMouseLeave.bind(this, element));
    });
  }
  
  handleMouseMove(element, e) {
    const rect = element.getBoundingClientRect();
    
    // Calculate mouse position relative to element (0 to 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Convert to -1 to 1 range
    const tiltX = (x - 0.5) * 2;
    const tiltY = (y - 0.5) * 2;
    
    // Set CSS variables for the tilt
    element.style.setProperty('--tilt-x', tiltX);
    element.style.setProperty('--tilt-y', tiltY);
    
    // Apply the transform directly for browsers that don't support CSS variables
    const rotateX = tiltY * -10; // Reversed for natural tilt
    const rotateY = tiltX * 10;
    
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  }
  
  handleMouseLeave(element) {
    // Reset tilt with a smooth transition
    element.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    
    // Remove transition after animation completes
    setTimeout(() => {
      element.style.transition = '';
    }, 500);
  }
}

// Particle Effect
class ParticleEffect {
  constructor(elements) {
    this.elements = document.querySelectorAll(elements);
    this.bindEvents();
  }
  
  bindEvents() {
    this.elements.forEach(element => {
      // Create particle container if it doesn't exist
      if (!element.querySelector('.particles')) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        element.appendChild(particlesContainer);
      }
      
      element.addEventListener('click', this.createParticles.bind(this, element));
    });
  }
  
  createParticles(element) {
    const particlesContainer = element.querySelector('.particles');
    const performanceTier = document.body.classList.contains('performance-high') ? 'high' : 
                           document.body.classList.contains('performance-medium') ? 'medium' : 'low';
    
    // Adjust particle count based on performance tier
    const particleCount = performanceTier === 'high' ? 12 : 
                         performanceTier === 'medium' ? 6 : 3;
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    // Create new particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Calculate random angle and distance
      const angle = (i / particleCount) * Math.PI * 2;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      
      // Set particle position variables
      particle.style.setProperty('--x', x);
      particle.style.setProperty('--y', y);
      
      particlesContainer.appendChild(particle);
    }
  }
}

// Character Split Animation
class CharSplitEffect {
  constructor(elements) {
    this.elements = document.querySelectorAll(elements);
    this.init();
  }
  
  init() {
    this.elements.forEach(element => {
      const text = element.textContent;
      element.setAttribute('data-original-text', text);
      
      // Skip processing if performance tier is low
      if (document.body.classList.contains('performance-low')) {
        return;
      }
      
      // Clear and rebuild content
      element.innerHTML = '';
      
      // Split text into characters
      for (let i = 0; i < text.length; i++) {
        const char = document.createElement('span');
        char.className = 'char';
        char.textContent = text[i];
        char.style.setProperty('--char-index', i);
        element.appendChild(char);
      }
    });
  }
}

// Spotlight Effect
class SpotlightEffect {
  constructor(elements) {
    this.elements = document.querySelectorAll(elements);
    this.bindEvents();
  }
  
  bindEvents() {
    this.elements.forEach(element => {
      element.addEventListener('mousemove', this.handleMouseMove.bind(this, element));
      element.addEventListener('mouseleave', this.handleMouseLeave.bind(this, element));
    });
  }
  
  handleMouseMove(element, e) {
    const rect = element.getBoundingClientRect();
    
    // Calculate mouse position relative to element (0 to 100%)
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Set CSS variables for the spotlight position
    element.style.setProperty('--x', `${x}%`);
    element.style.setProperty('--y', `${y}%`);
  }
  
  handleMouseLeave(element) {
    // Reset spotlight to center
    element.style.setProperty('--x', '50%');
    element.style.setProperty('--y', '50%');
  }
}

// Floating Elements Effect
class FloatingElementsEffect {
  constructor(elements) {
    this.elements = document.querySelectorAll(elements);
    this.bindEvents();
  }
  
  bindEvents() {
    this.elements.forEach(element => {
      element.addEventListener('mouseenter', this.createFloatingElements.bind(this, element));
    });
  }
  
  createFloatingElements(element) {
    // Skip if performance tier is not high
    if (!document.body.classList.contains('performance-high')) {
      return;
    }
    
    // Clear existing floating elements
    const existingElements = element.querySelectorAll('.floating-element');
    existingElements.forEach(el => el.remove());
    
    // Create new floating elements
    const elementCount = 8;
    
    for (let i = 0; i < elementCount; i++) {
      const floatingEl = document.createElement('div');
      floatingEl.className = 'floating-element';
      
      // Random position within the element
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      floatingEl.style.left = `${x}%`;
      floatingEl.style.bottom = `${y}%`;
      
      // Random direction
      const xOffset = (Math.random() - 0.5) * 2;
      const yOffset = -1 * Math.random(); // Always float upward
      
      floatingEl.style.setProperty('--x-offset', xOffset);
      floatingEl.style.setProperty('--y-offset', yOffset);
      
      element.appendChild(floatingEl);
    }
  }
}

// Scroll Animation Controller
class ScrollAnimationController {
  constructor() {
    this.animatedElements = document.querySelectorAll('.fade-in-on-scroll, .scale-in-on-scroll, .slide-in-left, .slide-in-right, .lazy-animate');
    this.setupIntersectionObserver();
  }
  
  setupIntersectionObserver() {
    const options = {
      root: null, // Use viewport as root
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of element is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Unobserve after animation is triggered
          if (!entry.target.classList.contains('keep-observing')) {
            observer.unobserve(entry.target);
          }
        } else if (entry.target.classList.contains('keep-observing')) {
          // Remove visible class if element should be re-animated when scrolling back
          entry.target.classList.remove('visible');
        }
      });
    }, options);
    
    this.animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Staggered Animation Controller
class StaggeredAnimationController {
  constructor() {
    this.staggerGroups = document.querySelectorAll('.stagger-group');
    this.setupStaggeredElements();
  }
  
  setupStaggeredElements() {
    this.staggerGroups.forEach(group => {
      const children = Array.from(group.children);
      
      children.forEach((child, index) => {
        child.classList.add('stagger-fade-in');
        child.style.setProperty('--stagger-index', index);
      });
    });
  }
}

// Initialize all animation controllers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize performance controller first
  const performanceController = new PerformanceController();
  
  // Initialize animation controllers based on performance tier
  if (!document.body.classList.contains('performance-low')) {
    // Medium and high performance get these animations
    new MagneticEffect('.magnetic-hover');
    new TiltEffect('.tilt-hover');
    new SpotlightEffect('.spotlight-hover');
    new CharSplitEffect('.split-char-hover, .char-split');
    new ScrollAnimationController();
    new StaggeredAnimationController();
    
    // Only high performance gets these animations
    if (document.body.classList.contains('performance-high')) {
      new ParticleEffect('.cta-button, .secondary-button');
      new FloatingElementsEffect('.floating-elements-hover');
    }
  }
  
  console.log('Elite animations initialized');
});
