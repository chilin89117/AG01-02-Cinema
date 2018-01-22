import {addClass, removeClass} from './helpers.js';

// These functions are called from <div class="session-time">, so
// go up to the parent and get the <span> to add or remove
// "tooltip-show" class.
let mouseOverHandler = (event) => {
  let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
  addClass(span, 'tooltip-show');
};

let mouseOutHandler = (event) => {
  let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
  removeClass(span, 'tooltip-show');
};

export default {
  install(Vue) {
    Vue.directive('tooltip', {
      // 'el' is <div class="session-time-wrapper tooltip-wrapper">.
      bind(el, bindings) {
        // Create <span> element to show number of available seats
        let tooltipSpan = document.createElement('SPAN');
        let text = document.createTextNode(`Avail. seats: ${bindings.value.seats}`);
        tooltipSpan.appendChild(text);
        addClass(tooltipSpan, 'tooltip');
        el.appendChild(tooltipSpan);

        // Get the <div class="session-time"> and attach event handlers.
        // 'touchstart' and 'touchend' are for mobile devices.
        let div = el.getElementsByTagName('DIV')[0];
        div.addEventListener('mouseover', mouseOverHandler);
        div.addEventListener('mouseout', mouseOutHandler);
        div.addEventListener('touchstart', mouseOverHandler);
        div.addEventListener('touchend', mouseOutHandler);
      },
      // Remove event listeners when elements are removed from DOM.
      unbind(el) {
        let div = el.getElementsByTagName('DIV')[0];
        div.removeEventListener('mouseover', mouseOverHandler);
        div.removeEventListener('mouseout', mouseOutHandler);
        div.removeEventListener('touchstart', mouseOverHandler);
        div.removeEventListener('touchend', mouseOutHandler);
      },
    });
  },
};
