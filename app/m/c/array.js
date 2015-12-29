define(function (require) {
  return function array(el) {
    el.on('push', ev => {
      var elem_model = require([el.attr('of')], model => {
        var elem_val = ev.detail.elem.valueOf();
        var ch = model.q(elem_val);
        ch.attr('index', el.children.length);
        el.appendChild(ch);
      });
    });
  };
});