# React / JSX HTML Comments
Enable HTML comments and conditional IE comments in React components and JSX using a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

This repository is intended to share a solution to include native HTML comments in React components and JSX. It uses a Web Component (W3C Custom Element) to transform text to a native HTML comment.

The solution use the native Custom Elements V1 API so it does **NOT** depends on [document.registerElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/registerElement) that requires a polyfill for most browsers, e.g. [WebReflection/document-register-element](https://github.com/WebReflection/document-register-element).

You can read more about Web Components at [www.webcomponents.org](http://webcomponents.org/), [facebook.github.io/react/docs/webcomponents.html](https://facebook.github.io/react/docs/webcomponents.html) and [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

Include the following javascript in your application to enable the `<react-comment>` Web Component. 

```javascript
/**
 * <react-comment> Web Component
 *
 * @usage
 *  <react-comment>Comment-text, e.g. [if lte IE 9]><script ... /><![endif]</react-comment>

 * @result
 *  <!--Comment-text, e.g. [if lte IE 9]><script ... /><![endif]-->
 */

class ReactComment extends window.HTMLElement {
  get name () {
    return 'React HTML Comment'
  }

  connectedCallback () {
    /**
    * Firefox fix, is="null" prevents attachedCallback
    * @link https://github.com/WebReflection/document-register-element/issues/22
    */
    this.is = ''
    this.removeAttribute('is')
    this.outerHTML = '<!--' + this.textContent + '-->'
  }
}

window.customElements.define('react-comment', ReactComment)
```

To include a comment in your JSX or React component, simply include the `<react-comment>` tag with the comment-text as content and import index.js (you can rename the file) or use the npm package [react-jsx-html-comments](https://www.npmjs.com/package/react-jsx-html-comments).

### Install
#### NPM
Use the following command in your directory to use and save the npm package. This will put index.js inside `node_modules/react-jsx-html-comments/` of your project.
```
npm install --save react-jsx-html-comments
```

#### Vanilla JavaScript
Download the index.js file (rename if you want) and save it in your proyect.

### Import
#### NPM
If you're working with a tool like Browserify, Webpack, RequireJS, etc, you can import the script at some point before you need to use the API.

```javascript
import 'react-jsx-html-comments' // ES2015
// or
require('react-jsx-html-comments') // CommonJS
// or
define(['react-jsx-html-comments'], function() {}) // AMD
```

#### Vanilla JavaScript
If you're not using a module system, just place index.js (rename if you want) somewhere where it will be served by your server, then put:
```html
<script src="/path/to/index.js"></script>
```

### Use
#### JSX
```jsx
<footer>Copyright {year}, Website.com</footer>
<react-comment>Page loaded in {loadtime} seconds</react-comment>
```

#### React component / element
```javascript
var MyComponent = React.createClass({
 render: function() {
  return React.createElement('react-comment',{},'This is sample comment text.');
 }
});
```

This solution is a migration of the code from [optimalisatie](https://github.com/optimalisatie) to the new Custom Elements API V1 that does **NOT** require polyfill, you can see the original code [here](https://github.com/optimalisatie/react-jsx-html-comments).
