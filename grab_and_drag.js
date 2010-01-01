var data;
var orig = {
  mousedown: function () {},
  mousemove: function () {},
  mouseup: function () {}
};

var waiting = Object.create(orig);
waiting.name = "waiting";
waiting.mousedown = function (e) {
  data = e;
  trans(judging);
};

var selecting = Object.create(orig);
selecting.name = "selecting";
selecting.mouseup = function (e) {
  trans(waiting);
};

var judging = Object.create(orig);
judging.mousemove = function (e) {
  if ((e.timeStamp - data.timeStamp) > 300) {
    trans(selecting);
  } else {
    trans(grabbing);
  }
};
judging.mouseup = function () {
  trans(waiting);
};

var grabbing = Object.create(orig);
grabbing.name = "grabbing";
grabbing.mousemove = function (e) {
  window.scrollBy(data.clientX - e.clientX, data.clientY - e.clientY);
  data = e;
};
grabbing.mouseup = function () {
  trans(waiting);
};

var state;

var trans = function (next) {
  state = next;
  document.documentElement.setAttribute("data-grab_and_drag", state.name);
};

trans(waiting);

var handle = function (type) {
  document.documentElement.addEventListener(type ,function (e) {
    state[type](e);
  }, false);
};

handle("mousedown");
handle("mousemove");
handle("mouseup");
