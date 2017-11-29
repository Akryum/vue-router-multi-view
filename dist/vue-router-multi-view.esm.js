function warn(condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn('[vue-router] ' + message);
  }
}

var hasConsole = typeof console !== 'undefined';

function warn$1(msg, vm) {
  var trace = '';
  if (Vue.config.warnHandler) {
    Vue.config.warnHandler.call(null, msg, vm, trace);
  } else if (hasConsole && !Vue.config.silent) {
    console.error('[Vue warn]: ' + msg + trace);
  }
}

function handleError(err, vm, info) {
  if (vm) {
    var cur = vm;
    while (cur = cur.$parent) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) return;
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError(err, vm, info) {
  if (Vue.config.errorHandler) {
    try {
      return Vue.config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError(err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn$1('Error in ' + info + ': "' + err.toString() + '"', vm);
  }
  /* istanbul ignore else */
  if (hasConsole) {
    console.error(err);
  } else {
    throw err;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) return true;
  }
  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, hook + ' hook');
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function updateActive(isCurrent, cached, vm) {
  if (cached.active !== isCurrent) {
    if (vm) {
      if (isCurrent) {
        activateChildComponent(vm, true);
      } else {
        deactivateChildComponent(vm, true);
      }
      vm._inactive = !isCurrent;
    }
    cached.active = isCurrent;
  }
}

var MultiView = {
  name: 'RouterView',
  functional: true,
  props: {
    viewName: {
      type: String,
      default: 'default'
    },
    morph: {
      type: [String, Object, Function],
      default: 'div'
    }
  },
  render: function render(_, _ref) {
    var props = _ref.props,
        parent = _ref.parent,
        data = _ref.data,
        children = _ref.children;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.viewName;
    var route = parent.$route;
    var bigCache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    var routerViewDepth = depth;

    var currentCache = null;

    var matched = route.matched[depth];
    if (matched) {
      var key = matched.path;
      var cache = bigCache[key] || (bigCache[key] = {});

      // render previous view if the tree is inactive and kept-alive
      if (inactive) {
        currentCache = cache[name];
      } else {
        var cached = cache[name] || (cache[name] = {
          component: null,
          data: {},
          name: matched.name,
          active: undefined
        });
        currentCache = cached;
        cached.component = matched.components[name];
      }
    }

    var finalChildren = [];

    Object.keys(bigCache).forEach(function (key) {
      var cached = bigCache[key][name];
      if (cached && cached.component) {
        var isCurrent = cached === currentCache;

        var _data = _extends({}, cached.data, {
          routerView: true,
          routerViewDepth: routerViewDepth,
          key: key,
          attrs: {
            'data-route-path': key,
            'data-route-name': cached.name,
            'data-is-active': isCurrent ? true : null
          },
          keepAlive: true,
          directives: [{
            name: 'show',
            value: isCurrent
          }]
        });

        if (isCurrent) {
          var _matched = route.matched[depth];

          // attach instance registration hook
          // this will be called in the instance's injected lifecycle hooks
          _data.registerRouteInstance = function (vm, val) {
            // val could be undefined for unregistration
            var current = _matched.instances[name];
            if (val && current !== vm || !val && current === vm) {
              _matched.instances[name] = val;
            }
          };

          // resolve props
          var propsToPass = _data.props = resolveProps(route, _matched.props && _matched.props[name]);
          if (propsToPass) {
            // clone to prevent mutation
            propsToPass = _data.props = extend({}, propsToPass);
            // pass non-declared props as attrs
            var attrs = _data.attrs = _data.attrs || {};
            for (var _key in propsToPass) {
              if (!cached.component.props || !(_key in cached.component.props)) {
                attrs[_key] = propsToPass[_key];
                delete propsToPass[_key];
              }
            }
          }
        }

        // also register instance in prepatch hook
        // in case the same component instance is reused across different routes
        (_data.hook || (_data.hook = {})).prepatch = function (_, vnode) {
          if (isCurrent) {
            matched.instances[name] = vnode.componentInstance;
          }
          updateActive(isCurrent, cached, vnode.componentInstance);
        };

        cached.data = _data;

        finalChildren.push(h(cached.component, _data));
      }
    });

    children && finalChildren.push.apply(finalChildren, toConsumableArray(children));

    return h(props.morph, data, finalChildren);
  }
};

function resolveProps(route, config) {
  switch (typeof config === 'undefined' ? 'undefined' : _typeof(config)) {
    case 'undefined':
      return;
    case 'object':
      return config;
    case 'function':
      return config(route);
    case 'boolean':
      return config ? route.params : undefined;
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(false, 'props in \'' + route.path + '\' is a ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)) + ', ' + 'expecting an object, function or boolean.');
      }
  }
}

function extend(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to;
}

var Vue = void 0;

function install(pVue) {
  if (install.installed) return;
  install.installed = true;

  Vue = pVue;

  Vue.component('router-multi-view', MultiView);
}

var RouterMultiView = MultiView;

var plugin = {
  install: install

  // Auto-install
};var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export { Vue, install, RouterMultiView };
export default plugin;
