
/* /node_modules/moof/src/geom.coffee
*/

var ALPHABET58, BASE64_ALPHABET, BUTTON_STYLUS, Button, D, E, Element, Event, KEYCODE_0, KEYCODE_1, KEYCODE_2, KEYCODE_3, KEYCODE_4, KEYCODE_5, KEYCODE_6, KEYCODE_7, KEYCODE_8, KEYCODE_9, KEYCODE_A, KEYCODE_B, KEYCODE_C, KEYCODE_D, KEYCODE_DELETE, KEYCODE_DOWN, KEYCODE_E, KEYCODE_ESCAPE, KEYCODE_F, KEYCODE_G, KEYCODE_H, KEYCODE_I, KEYCODE_J, KEYCODE_K, KEYCODE_KEYPAD_0, KEYCODE_KEYPAD_1, KEYCODE_KEYPAD_2, KEYCODE_KEYPAD_3, KEYCODE_KEYPAD_4, KEYCODE_KEYPAD_5, KEYCODE_KEYPAD_6, KEYCODE_KEYPAD_7, KEYCODE_KEYPAD_8, KEYCODE_KEYPAD_9, KEYCODE_L, KEYCODE_LEFT, KEYCODE_M, KEYCODE_N, KEYCODE_O, KEYCODE_P, KEYCODE_Q, KEYCODE_R, KEYCODE_RETURN, KEYCODE_RIGHT, KEYCODE_S, KEYCODE_SPACE, KEYCODE_T, KEYCODE_TAB, KEYCODE_U, KEYCODE_UP, KEYCODE_V, KEYCODE_W, KEYCODE_X, KEYCODE_Y, KEYCODE_Z, Morph, Point, Rect, Tween, addCss, b64decode, b64encode, bodyOn, decimal_gt, distanceBetweenPoints, endswith, interpolateColors, interpolatePoints, interpolateRects, intervalSet, invertedDict, json_decode_via_eval, json_encode, keysOf, linear, lstrip, matrix_centerOfGravity, matrix_create, matrix_rotated, max, min, mixInEventEmitter, moof_color_hex2, random, randomInteger, randomToken, re_escape, rgbFromWeb, rjust, rstrip, startswith, strip, timeoutSet, valuesOf, webFromRgb;
var __slice = Array.prototype.slice, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Point = (function() {

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  return Point;

})();

Rect = (function() {

  function Rect(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  Rect.prototype.translated = function(r) {
    return new Rect(this.x + r.x, this.y + r.y, this.w, this.h);
  };

  Rect.prototype.scaled = function(scaledBy) {
    return new Rect(this.x, this.y, this.w * scaledBy, this.h * scaledBy);
  };

  Rect.prototype.center = function() {
    return new Point(this.x + (this.w / 2), this.y + (this.h / 2));
  };

  Rect.prototype.centeredAt = function(r) {
    return new Rect(r.x - (this.w / 2), r.y - (this.h / 2), this.w, this.h);
  };

  Rect.prototype.centeredIn = function(r) {
    return this.centeredAt(r.center());
  };

  return Rect;

})();

interpolateRects = function(r1, r2, t) {
  return new Rect(r1.x + (r2.x - r1.x) * t, r1.y + (r2.y - r1.y) * t, r1.w + (r2.w - r1.w) * t, r1.h + (r2.h - r1.h) * t);
};

interpolatePoints = function(r1, r2, t) {
  return new Point(r1.x + (r2.x - r1.x) * t, r1.y + (r2.y - r1.y) * t);
};

distanceBetweenPoints = function(p, p2) {
  var dx, dy;
  dx = p.x - p2.x;
  dy = p.y - p2.y;
  return Math.sqrt((dx * dx) + (dy * dy));
};

/* /node_modules/moof/src/event.coffee
*/

KEYCODE_DELETE = 8;

KEYCODE_TAB = 9;

KEYCODE_RETURN = 13;

KEYCODE_ESCAPE = 27;

KEYCODE_SPACE = 32;

KEYCODE_LEFT = 37;

KEYCODE_UP = 38;

KEYCODE_RIGHT = 39;

KEYCODE_DOWN = 40;

KEYCODE_0 = 48;

KEYCODE_1 = 49;

KEYCODE_2 = 50;

KEYCODE_3 = 51;

KEYCODE_4 = 52;

KEYCODE_5 = 53;

KEYCODE_6 = 54;

KEYCODE_7 = 55;

KEYCODE_8 = 56;

KEYCODE_9 = 57;

KEYCODE_KEYPAD_0 = 96;

KEYCODE_KEYPAD_1 = 97;

KEYCODE_KEYPAD_2 = 98;

KEYCODE_KEYPAD_3 = 99;

KEYCODE_KEYPAD_4 = 100;

KEYCODE_KEYPAD_5 = 101;

KEYCODE_KEYPAD_6 = 102;

KEYCODE_KEYPAD_7 = 103;

KEYCODE_KEYPAD_8 = 104;

KEYCODE_KEYPAD_9 = 105;

KEYCODE_A = 65;

KEYCODE_B = 66;

KEYCODE_C = 67;

KEYCODE_D = 68;

KEYCODE_E = 69;

KEYCODE_F = 70;

KEYCODE_G = 71;

KEYCODE_H = 72;

KEYCODE_I = 73;

KEYCODE_J = 74;

KEYCODE_K = 75;

KEYCODE_L = 76;

KEYCODE_M = 77;

KEYCODE_N = 78;

KEYCODE_O = 79;

KEYCODE_P = 80;

KEYCODE_Q = 81;

KEYCODE_R = 82;

KEYCODE_S = 83;

KEYCODE_T = 84;

KEYCODE_U = 85;

KEYCODE_V = 86;

KEYCODE_W = 87;

KEYCODE_X = 88;

KEYCODE_Y = 89;

KEYCODE_Z = 90;

Event = (function() {

  function Event(e) {
    this.e = e;
  }

  Event.prototype.getKeycode = function() {
    return this.e.charCode || this.e.keyCode;
  };

  Event.prototype.isRightButton = function() {
    if (this.e.which) {
      return this.e.which === 3;
    } else if (e.button) {
      return this.e.button === 2;
    }
  };

  Event.prototype.getPos = function() {
    if (this.e.pageX || this.e.pageY) {
      return new Point(this.e.pageX, this.e.pageY);
    } else if (this.e.clientX || this.e.clientY) {
      return new Point(this.e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, this.e.clientY + document.body.scrollTop + document.documentElement.scrollTop);
    }
  };

  Event.prototype.controlDown = function() {
    return this.e.ctrlKey;
  };

  Event.prototype.altDown = function() {
    return this.e.altKey;
  };

  Event.prototype.shiftDown = function() {
    return this.e.shiftKey;
  };

  Event.prototype.metaDown = function() {
    return this.e.metaKey;
  };

  Event.prototype.stop = function() {
    if (this.e.stopPropagation) {
      this.e.stopPropagation();
    } else {
      this.e.cancelBubble = true;
    }
    if (this.e.preventDefault) {
      return this.e.preventDefault();
    } else {
      return this.e.returnValue = false;
    }
  };

  return Event;

})();

/* /node_modules/moof/src/page.coffee
*/

bodyOn = function(k, f) {
  return document.body['on' + k] = function(e) {
    return f(new Event(e));
  };
};

/* /node_modules/moof/src/element.coffee
*/

Element = (function() {

  function Element() {
    var arg, args, k, kid, node, nodeType, _i, _j, _len, _len2;
    nodeType = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    this._ = node = document.createElement(nodeType);
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      arg = args[_i];
      if ((typeof arg) === 'string') {
        node.className = arg;
      } else if (arg instanceof Array) {
        for (_j = 0, _len2 = arg.length; _j < _len2; _j++) {
          kid = arg[_j];
          if ((typeof kid) === 'string') {
            node.appendChild(document.createTextNode(kid));
          } else {
            node.appendChild(kid._);
          }
        }
      } else {
        for (k in arg) {
          if (!__hasProp.call(arg, k)) continue;
          node[k] = "" + arg[k];
        }
      }
    }
  }

  Element.prototype.appendChildren = function(arr) {
    var x, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      x = arr[_i];
      _results.push(this.appendChild(x));
    }
    return _results;
  };

  Element.prototype.appendChild = function(x) {
    return this._.appendChild(x._);
  };

  Element.prototype.removeChildren = function() {
    var x, _results;
    x = this._.lastChild;
    _results = [];
    while (x) {
      this._.removeChild(x);
      _results.push(x = this._.lastChild);
    }
    return _results;
  };

  Element.prototype.setChildren = function(arr) {
    var x, _i, _len, _results;
    this.removeChildren();
    _results = [];
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      x = arr[_i];
      _results.push(this.appendChild(x));
    }
    return _results;
  };

  Element.prototype.setChild = function(x) {
    return this.setChildren([x]);
  };

  Element.prototype.prependChild = function(x) {
    if (this._.childNodes.length === 0) {
      this._.appendChild(x._);
    } else {

    }
    return this._.insertBefore(x._, this._.firstChild);
  };

  Element.prototype.insertBefore = function(kid, existingKid) {
    return this._.insertBefore(kid._, existingKid._);
  };

  Element.prototype.appendToBody = function() {
    return document.body.appendChild(this._);
  };

  Element.prototype.appendToHead = function() {
    return document.getElementsByTagName("head")[0].appendChild(this._);
  };

  Element.prototype.appendTo = function(x) {
    return x._.appendChild(this._);
  };

  Element.prototype.prependTo = function(x) {
    return x.prependChild(this);
  };

  Element.prototype.remove = function() {
    var _ref;
    return (_ref = this._.parentNode) != null ? _ref.removeChild(this._) : void 0;
  };

  Element.prototype.setTextChild = function(text) {
    this.removeChildren();
    return this._.appendChild(document.createTextNode(text));
  };

  Element.prototype.setOpacity = function(fraction) {
    var percent;
    percent = Math.round(100 * fraction);
    return this.setStyles({
      opacity: fraction,
      filter: "alpha(opacity=" + percent + ")",
      '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(opacity=" + percent + ")"
    });
  };

  Element.prototype.setStyles = function(d) {
    var k, v, _results;
    _results = [];
    for (k in d) {
      if (!__hasProp.call(d, k)) continue;
      v = d[k];
      _results.push(this._.style[k] = v);
    }
    return _results;
  };

  Element.prototype.setPos = function(r) {
    return this.setStyles({
      left: Math.round(r.x),
      top: Math.round(r.y)
    });
  };

  Element.prototype.setRect = function(r) {
    return this.setStyles({
      left: Math.round(r.x) + 'px',
      top: Math.round(r.y) + 'px',
      width: Math.round(r.w) + 'px',
      height: Math.round(r.h) + 'px'
    });
  };

  Element.prototype.on = function(k, f) {
    return this._['on' + k] = function(event) {
      return f(new Event(event));
    };
  };

  Element.prototype.setClasses = function(classes) {
    return this._.className = classes.join(' ');
  };

  Element.prototype.getClasses = function() {
    if (this._.className) {
      return this._.className.split(' ');
    } else {
      return [];
    }
  };

  Element.prototype.addClass = function(className) {
    var arr;
    arr = this.getClasses();
    if (arr.indexOf(className) === -1) {
      arr.push(className);
      return this.setClasses(arr);
    }
  };

  Element.prototype.removeClass = function(className) {
    var arr, i;
    arr = this.getClasses();
    i = arr.indexOf(className);
    if (i !== -1) {
      arr.splice(i, 1);
      return this.setClasses(arr);
    }
  };

  Element.prototype.getValue = function() {
    return this._.value;
  };

  Element.prototype.setValue = function(x) {
    return this._.value = x;
  };

  Element.prototype.scrollToBottom = function() {
    return this._.scrollTop = this._.scrollHeight - this._.clientHeight;
  };

  return Element;

})();

E = function() {
  var args;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return typeof result === "object" ? result : child;
  })(Element, args, function() {});
};

D = function() {
  var args;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return typeof result === "object" ? result : child;
  })(Element, ['div'].concat(__slice.call(args)), function() {});
};

/* /node_modules/moof/src/widgets.coffee
*/

BUTTON_STYLUS = "\n.Button\n  display block\n  cursor pointer\n  text-align center\n  color white\n  position relative\n\n.Button *\n  cursor pointer\n\n.Button table\n  border-spacing 0\n  width 100%\n  height 100%\n\n.Button .Boverlay\n  z-index 50\n  abs(0, 0)\n  dim(100%, 100%)\n  text-align center\n\n.Button .BL\n  padding 0\n\n.Button .BR\n  padding 0\n";

Button = (function() {

  __extends(Button, Element);

  function Button() {
    var args, classes, opt, t, text, type, x, _i, _len;
    var _this = this;
    x = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (typeof x === 'string') {
      type = 'whole';
      classes = "Button " + x;
    } else if (x.lmr) {
      type = 'lmr';
      classes = "Button " + x.lmr;
    }
    Button.__super__.constructor.call(this, 'a', classes, [this.overlay = E('div', 'Boverlay')]);
    if (type === 'lmr') {
      this.appendChildren([E('table', [E('tr', [E('td', "BLR BL"), E('td', "BM", [' ']), E('td', "BLR BR")])])]);
    }
    this.on('click', (function(e) {
      return _this.click(e);
    }));
    text = null;
    opt = {};
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      x = args[_i];
      t = typeof x;
      if (t === 'string') {
        text = x;
      } else if (t === 'function') {
        this.onclick = x;
      } else {
        _.extend(opt, x);
      }
    }
    if (opt.id) this._.id = opt.id;
    if (text) this.overlay.appendChild(this.label = D('Blabel', [text]));
  }

  Button.prototype.setText = function(text) {
    return this.label.setTextChild(text);
  };

  Button.prototype.click = function(e) {
    if (e) e.stop();
    if (this.onclick) return this.onclick(e);
  };

  Button.prototype.showLoader = function(className) {};

  Button.prototype.hideLoader = function() {};

  return Button;

})();

/* /node_modules/moof/src/color.coffee
*/

moof_color_hex2 = function(n) {
  if (n < 16) {
    return "0" + n.toString(16);
  } else {
    return n.toString(16);
  }
};

rgbFromWeb = function(web) {
  return [parseInt(web.substr(1, 2), 16), parseInt(web.substr(3, 2), 16), parseInt(web.substr(5, 2), 16)];
};

webFromRgb = function(r, g, b) {
  return "#" + moof_color_hex2(r) + moof_color_hex2(g) + moof_color_hex2(b);
};

interpolateColors = function(c1, c2, t) {
  var b1, b2, g1, g2, r1, r2, _ref, _ref2;
  _ref = rgbFromWeb(c1), r1 = _ref[0], g1 = _ref[1], b1 = _ref[2];
  _ref2 = rgbFromWeb(c2), r2 = _ref2[0], g2 = _ref2[1], b2 = _ref2[2];
  return webFromRgb(Math.round(r1 + (r2 - r1) * t), Math.round(g1 + (g2 - g1) * t), Math.round(b1 + (b2 - b1) * t));
};

/* /node_modules/moof/src/animation.coffee
*/

Tween = (function() {

  function Tween(duration, transition, f) {
    var _this = this;
    this.duration = duration;
    this.transition = transition;
    this.f = f;
    this.start = new Date().getTime();
    this.f(0);
    setTimeout((function() {
      return _this.step();
    }), 0);
  }

  Tween.prototype.step = function() {
    var t;
    var _this = this;
    t = (new Date().getTime() - this.start) / this.duration;
    if (t > 1) t = 1;
    this.f(this.transition(t));
    if (t < 1) {
      return setTimeout((function() {
        return _this.step();
      }), 0);
    }
  };

  return Tween;

})();

Morph = (function() {

  function Morph(elements, info) {
    var background, duration, numFrames, oncomplete, opacity, pos, rect, transition;
    duration = info.duration, transition = info.transition, oncomplete = info.oncomplete, opacity = info.opacity, rect = info.rect, pos = info.pos, background = info.background;
    if (!(elements instanceof Array)) elements = [elements];
    numFrames = 0;
    new Tween(duration, transition, function(t) {
      var element, _i, _len;
      numFrames++;
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        element = elements[_i];
        if (opacity) {
          element.setOpacity(opacity[0] + (opacity[1] - opacity[0]) * t);
        }
        if (rect) element.setRect(interpolateRects(rect[0], rect[1], t));
        if (pos) element.setPos(interpolatePoints(pos[0], pos[1], t));
        if (background) {
          element._.style.background = interpolateColors(background[0], background[1], t);
        }
      }
      if (t === 1 && oncomplete) {
        return oncomplete({
          numFrames: numFrames,
          info: info
        });
      }
    });
  }

  return Morph;

})();

linear = function(t) {
  return t;
};

/* /node_modules/moof/src/base64.coffee
*/

BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

b64encode = function(octets) {
  var combined, i, numOctets, paddingLength, s, strings;
  strings = [];
  numOctets = octets.length;
  i = 0;
  while (i < numOctets) {
    combined = ((octets[i] || 0) << 16) | ((octets[i + 1] || 0) << 8) | (octets[i + 2] || 0);
    i += 3;
    strings.push(BASE64_ALPHABET.charAt((combined >> 18) & 0x3F) + BASE64_ALPHABET.charAt((combined >> 12) & 0x3F) + BASE64_ALPHABET.charAt((combined >> 6) & 0x3F) + BASE64_ALPHABET.charAt(combined & 0x3F));
  }
  paddingLength = [0, 2, 1][numOctets % 3];
  s = strings.join('');
  return s.substr(0, s.length - paddingLength) + ['', '=', '=='][paddingLength];
};

b64decode = function(s) {
  var combined, i, numChars, octets;
  octets = [];
  numChars = s.length - (s.match(/[=]+/) || [''])[0].length;
  i = 0;
  while (i < numChars) {
    combined = ((BASE64_ALPHABET.indexOf(s[i]) % 64) << 18) | ((BASE64_ALPHABET.indexOf(s[i + 1]) % 64) << 12) | ((BASE64_ALPHABET.indexOf(s[i + 2]) % 64) << 6) | (BASE64_ALPHABET.indexOf(s[i + 3]) % 64);
    i += 4;
    octets.push((combined >> 16) & 0xFF);
    if ((i - 1) <= numChars) {
      octets.push((combined >> 8) & 0xFF);
      if ((i - 1) < numChars) octets.push(combined & 0xFF);
    }
  }
  return octets;
};

/* /node_modules/moof/src/decimal.coffee
*/

decimal_gt = function(x, y) {
  return (1 * x) > (1 * y);
};

/* /node_modules/moof/src/dom.coffee
*/

addCss = function(css) {
  var node;
  node = document.createElement('style');
  node.type = 'text/css';
  node.appendChild(document.createTextNode(css));
  return document.head.appendChild(node);
};

/* /node_modules/moof/src/eventemitter.coffee
*/

mixInEventEmitter = function(x) {
  x.EventEmitter_listeners = {};
  x.emit = function() {
    var args, arr, f, k, _i, _len, _results;
    k = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    arr = this.EventEmitter_listeners[k] = this.EventEmitter_listeners[k] || [];
    _results = [];
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      f = arr[_i];
      _results.push(f.apply(null, args));
    }
    return _results;
  };
  x.on = function(k, f) {
    var arr;
    arr = this.EventEmitter_listeners[k] = this.EventEmitter_listeners[k] || [];
    return arr.push(f);
  };
  return x.listeners = function(k) {
    if (!this.EventEmitter_listeners[k]) this.EventEmitter_listeners[k] = [];
    return this.EventEmitter_listeners[k];
  };
};

/* /node_modules/moof/src/json.coffee
*/

json_encode = function(x) {
  var arr, k, t, v, y, _i, _len;
  t = typeof x;
  if (x === null || t === 'undefined') {
    return 'null';
  } else if (t === 'boolean' || t === 'number') {
    return x.valueOf();
  } else if (t === 'string') {
    return '"' + (x.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/, '\\n')) + '"';
  } else if (x instanceof Array) {
    arr = [];
    for (_i = 0, _len = x.length; _i < _len; _i++) {
      y = x[_i];
      arr.push(json_encode(y));
    }
    return "[" + arr.join(',') + "]";
  } else {
    arr = [];
    for (k in x) {
      if (!__hasProp.call(x, k)) continue;
      v = x[k];
      arr.push(json_encode(k) + ":" + json_encode(v));
    }
    return "{" + arr.join(',') + "}";
  }
};

json_decode_via_eval = function(s) {
  return eval("(" + s + ")");
};

/* /node_modules/moof/src/util.coffee
*/

timeoutSet = function(ms, f) {
  return setTimeout(f, ms);
};

intervalSet = function(ms, f) {
  return setInterval(f, ms);
};

min = function(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
};

max = function(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
};

keysOf = function(d) {
  var k, _results;
  _results = [];
  for (k in d) {
    if (!__hasProp.call(d, k)) continue;
    _results.push(k);
  }
  return _results;
};

valuesOf = function(d) {
  var k, v, _results;
  _results = [];
  for (k in d) {
    if (!__hasProp.call(d, k)) continue;
    v = d[k];
    _results.push(v);
  }
  return _results;
};

invertedDict = function(d) {
  var d2, k, v;
  d2 = {};
  for (k in d) {
    if (!__hasProp.call(d, k)) continue;
    v = d[k];
    d2[v] = k;
  }
  return d2;
};

startswith = function(s, s2) {
  return (s.length >= s2.length) && (s.substr(0, s2.length) === s2);
};

endswith = function(s, s2) {
  return (s.length >= s2.length) && (s.substr(s.length - s2.length) === s2);
};

rstrip = function(s, chars) {
  var m;
  if (chars == null) chars = "\t\n\v\f\r ";
  m = s.match(new RegExp("[" + (re_escape(chars)) + "]+$"));
  if (m) {
    return s.substr(0, s.length - m[0].length);
  } else {
    return s;
  }
};

lstrip = function(s, chars) {
  var m;
  if (chars == null) chars = "\t\n\v\f\r ";
  m = s.match(new RegExp("^[" + (re_escape(chars)) + "]+"));
  if (m) {
    return s.substr(m[0].length);
  } else {
    return s;
  }
};

strip = function(s, chars) {
  if (chars == null) chars = "\t\n\v\f\r ";
  return lstrip(rstrip(s, chars), chars);
};

rjust = function(s, width, fillchar) {
  var arr, i, n;
  if (fillchar == null) fillchar = ' ';
  n = width - s.length;
  if (n <= 0) {
    return s;
  } else {
    arr = [];
    for (i = 0; 0 <= n ? i < n : i > n; 0 <= n ? i++ : i--) {
      arr.push(fillchar);
    }
    arr.push(s);
    return arr.join('');
  }
};

re_escape = function(s) {
  return s.replace(/[-\[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

ALPHABET58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

random = function() {
  var x;
  x = Math.random();
  if (x === 1) {
    return 0;
  } else {
    return x;
  }
};

randomInteger = function(a, b) {
  return Math.floor(random() * (b - a + 1)) + a;
};

randomToken = function(n, alphabet) {
  var i, lte;
  if (n == null) n = 8;
  if (alphabet == null) alphabet = ALPHABET58;
  lte = alphabet.length - 1;
  return ((function() {
    var _results;
    _results = [];
    for (i = 0; 0 <= n ? i < n : i > n; 0 <= n ? i++ : i--) {
      _results.push(alphabet.charAt(randomInteger(0, lte)));
    }
    return _results;
  })()).join('');
};

/* /node_modules/moof/src/matrix.coffee
*/

matrix_create = function(w, h, v) {
  var m, row, vIsAFunction, x, y;
  if (v == null) v = 0;
  vIsAFunction = (typeof v) === 'function';
  m = [];
  for (y = 0; 0 <= h ? y < h : y > h; 0 <= h ? y++ : y--) {
    row = [];
    for (x = 0; 0 <= w ? x < w : x > w; 0 <= w ? x++ : x--) {
      if (vIsAFunction) {
        row.push(v(x, y));
      } else {
        row.push(v);
      }
    }
    m.push(row);
  }
  return m;
};

matrix_rotated = function(m, rotation90s) {
  var m2, n, n_minus_one, x, y;
  rotation90s %= 4;
  n = m.length;
  n_minus_one = n - 1;
  m2 = matrix_create(n, n);
  for (y = 0; 0 <= n ? y < n : y > n; 0 <= n ? y++ : y--) {
    for (x = 0; 0 <= n ? x < n : x > n; 0 <= n ? x++ : x--) {
      if (rotation90s === 0) {
        m2[y][x] = m[y][x];
      } else if (rotation90s === 1) {
        m2[y][x] = m[n_minus_one - x][y];
      } else if (rotation90s === 2) {
        m2[y][x] = m[n_minus_one - y][n_minus_one - x];
      } else if (rotation90s === 3) {
        m2[y][x] = m[x][n_minus_one - y];
      }
    }
  }
  return m2;
};

matrix_centerOfGravity = function(m) {
  var h, totalWeight, w, weight, x, xsum, y, ysum;
  h = m.length;
  w = m[0].length;
  totalWeight = 0;
  xsum = 0;
  ysum = 0;
  for (y = 0; 0 <= h ? y < h : y > h; 0 <= h ? y++ : y--) {
    for (x = 0; 0 <= w ? x < w : x > w; 0 <= w ? x++ : x--) {
      weight = m[y][x];
      totalWeight += weight;
      xsum += weight * (x + 0.5);
      ysum += weight * (y + 0.5);
    }
  }
  return [xsum / totalWeight, ysum / totalWeight];
};

/* /node_modules/moof/src/moof_bodystitch_main.coffee
*/
