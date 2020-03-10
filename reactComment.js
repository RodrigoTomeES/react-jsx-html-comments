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
