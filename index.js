import rippleElement from './paperRipple/PaperRipple.js';

const ripples = document.querySelectorAll('.ripple');

ripples.forEach(ripple => {
	rippleElement(ripple);
});
