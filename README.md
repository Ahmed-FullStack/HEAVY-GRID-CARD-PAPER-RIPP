# Google Paper Ripple Animation

Example at <a href="https://codepen.io/ahmed_ashraf-developer/pen/JjLgNLY">codepen</a>

## Usage

Add ripple class to button or achor tag

```html
<!-- In Head tag -->
<link rel="stylesheet" href="./styles.css" />
<script src="./index.js" type="module"></script>
<!-- In Head tag -->

<button class="btn ripple">Paper Ripple</button>
```

Import reset.css and paper-ripple.css in your main stylessheet

```css
@import url(../reset.css);
@import url(./paperRipple/paperRipple.css);
```

If you want to change the waves color change the bg property in css

```css
.btn {
	--bg: 0 0% 52%;
	--opacity: 0.5;
	background-color: hsl(0 0% 15% / 0.3);
	color: #fff;
	padding: 1.2em 2em;
	border-radius: 0.5em;
}
```

For Javascript

```js
import PaperRipple from './paperRipple/PaperRipple.js'
const btns = document.querySelectorAll('.ripple')
PaperRipple(btns)
```
# HEAVY-GRID-CARD-PAPER-RIPP
