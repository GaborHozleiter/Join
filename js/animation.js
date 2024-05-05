document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
});
/**
* Initializes animations for the website's logo and content visibility.
*/
function initAnimations() {
 const logo = document.querySelector('.logo-icon');
 const websiteContent = document.querySelector('.Website');
 setTimeout(() => {
     websiteContent.style.display = 'flex';
 }, 700);
 setTimeout(() => {
     animateLogo(logo);
 }, 2500);
}

/**
* Animates the logo by setting its position, size, and transformation.
* 
* @param {HTMLElement} logo - The logo element to be animated.
*/
function animateLogo(logo) {
 logo.style.top = '80px';
 logo.style.left = '77px';
 logo.style.width = '100.03px';
 logo.style.height = '121.97px';
 logo.style.transform = 'translate(0, 0)';
}
