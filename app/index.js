// Entry point with ES6 support
// Happy Coding!
/* @jsx h*/
module.hot.accept();
const $ = require('jquery');
$.fn.red = function() {
  return this.each(function () {
    $(this).css({
      color: 'blue'
    });
  })
}
