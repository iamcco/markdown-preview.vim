module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("highlight.js");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("markdown-it");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("markdown-it-katex");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("markdown-it-plantuml");

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19);


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(2);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);

// EXTERNAL MODULE: external "socket.io-client"
var external_socket_io_client_ = __webpack_require__(3);
var external_socket_io_client_default = /*#__PURE__*/__webpack_require__.n(external_socket_io_client_);

// EXTERNAL MODULE: external "markdown-it"
var external_markdown_it_ = __webpack_require__(4);
var external_markdown_it_default = /*#__PURE__*/__webpack_require__.n(external_markdown_it_);

// EXTERNAL MODULE: external "markdown-it-katex"
var external_markdown_it_katex_ = __webpack_require__(5);
var external_markdown_it_katex_default = /*#__PURE__*/__webpack_require__.n(external_markdown_it_katex_);

// EXTERNAL MODULE: external "highlight.js"
var external_highlight_js_ = __webpack_require__(1);
var external_highlight_js_default = /*#__PURE__*/__webpack_require__.n(external_highlight_js_);

// EXTERNAL MODULE: external "markdown-it-plantuml"
var external_markdown_it_plantuml_ = __webpack_require__(6);
var external_markdown_it_plantuml_default = /*#__PURE__*/__webpack_require__.n(external_markdown_it_plantuml_);

// CONCATENATED MODULE: ./pages/linenumbers.js
/*
 * https://github.com/digitalmoksha/markdown-it-inject-linenumbers/blob/master/index.js
*/
function injectLinenumbersPlugin(md) {
  //
  // Inject line numbers for sync scroll. Notes:
  //
  // - We track only headings and paragraphs, at any level.
  // - TODO Footnotes content causes jumps. Level limit filters it automatically.
  function injectLineNumbers(tokens, idx, options, env, slf) {
    var line; // if (tokens[idx].map && tokens[idx].level === 0) {

    if (tokens[idx].map) {
      line = tokens[idx].map[0];
      tokens[idx].attrJoin('class', 'source-line');
      tokens[idx].attrSet('data-source-line', String(line));
    }

    return slf.renderToken(tokens, idx, options, env, slf);
  }

  md.renderer.rules.paragraph_open = injectLineNumbers;
  md.renderer.rules.heading_open = injectLineNumbers;
  md.renderer.rules.list_item_open = injectLineNumbers;
  md.renderer.rules.table_open = injectLineNumbers;
}
// CONCATENATED MODULE: ./pages/index.jsx
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return pages_PreviewPage; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var DEFAULT_OPTIONS = {
  mkit: {
    // Enable HTML tags in source
    html: true,
    // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    xhtmlOut: true,
    // Convert '\n' in paragraphs into <br>
    breaks: false,
    // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    langPrefix: 'language-',
    // Autoconvert URL-like text to links
    linkify: true,
    // Enable some language-neutral replacement + quotes beautification
    typographer: true,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externally.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: function highlight(str, lang) {
      if (lang && external_highlight_js_default.a.getLanguage(lang)) {
        try {
          return external_highlight_js_default.a.highlight(lang, str).value;
        } catch (__) {}
      }

      return ''; // use external default escaping
    }
  },
  katex: {
    'throwOnError': false,
    'errorColor': ' #cc0000'
  },
  uml: {
    useLocal: true
  }
};

var pages_PreviewPage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PreviewPage, _React$Component);

  function PreviewPage(props) {
    var _this;

    _classCallCheck(this, PreviewPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PreviewPage).call(this, props));
    _this.state = {
      cursor: '',
      content: ''
    };
    return _this;
  }

  _createClass(PreviewPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var socket = external_socket_io_client_default()({
        query: {
          bufnr: window.location.pathname.split('/')[2]
        }
      });
      window.socket = socket;
      socket.on('connect', this.onConnect.bind(this));
      socket.on('disconnect', this.onDisconnect.bind(this));
      socket.on('close', this.onClose.bind(this));
      socket.on('refresh_content', this.onRefreshContent.bind(this));
      socket.on('close_page', this.onClose.bind(this));
    }
  }, {
    key: "onConnect",
    value: function onConnect() {
      console.log('connect success');
    }
  }, {
    key: "onDisconnect",
    value: function onDisconnect() {
      console.log('disconnect');
    }
  }, {
    key: "onClose",
    value: function onClose() {
      console.log('close');
      window.close();
    }
  }, {
    key: "onRefreshContent",
    value: function onRefreshContent(_ref) {
      var _ref$options = _ref.options,
          options = _ref$options === void 0 ? {} : _ref$options,
          cursor = _ref.cursor,
          content = _ref.content;

      if (!this.md) {
        var _options$mkit = options.mkit,
            mkit = _options$mkit === void 0 ? {} : _options$mkit,
            _options$katex = options.katex,
            katex = _options$katex === void 0 ? {} : _options$katex,
            _options$uml = options.uml,
            uml = _options$uml === void 0 ? {} : _options$uml; // markdown-it

        this.md = new external_markdown_it_default.a(_objectSpread({}, DEFAULT_OPTIONS.mkit, mkit)); // katex

        this.md.use(external_markdown_it_katex_default.a, _objectSpread({}, DEFAULT_OPTIONS.katex, katex)).use(external_markdown_it_plantuml_default.a, _objectSpread({
          imageFormat: 'png'
        }, uml.useLocal || DEFAULT_OPTIONS.uml.useLocal ? {
          server: '/_uml'
        } : {})).use(injectLinenumbersPlugin);
      }

      this.setState({
        cursor: cursor,
        content: this.md.render(content.join('\n'))
      }, function () {
        var line = cursor[1];
        var lineEle = document.querySelector("[data-source-line=\"".concat(line - 1, "\"]"));

        if (lineEle) {
          // eslint-disable-next-line
          TweenLite.to(document.body, 0.4, {
            scrollTop: lineEle.offsetTop - 100,
            ease: Power2.easeOut // eslint-disable-line

          }); // eslint-disable-next-line

          TweenLite.to(document.documentElement, 0.4, {
            scrollTop: lineEle.offsetTop - 100,
            ease: Power2.easeOut // eslint-disable-line

          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var content = this.state.content;
      return external_react_default.a.createElement(external_react_default.a.Fragment, null, external_react_default.a.createElement(head_default.a, null, external_react_default.a.createElement("title", null, "preview page"), external_react_default.a.createElement("link", {
        rel: "stylesheet",
        href: "/_static/markdown.css"
      }), external_react_default.a.createElement("link", {
        rel: "stylesheet",
        href: "/_static/highlight.css"
      }), external_react_default.a.createElement("link", {
        rel: "stylesheet",
        href: "/_static/katex@0.5.1.css"
      }), external_react_default.a.createElement("script", {
        type: "text/javascript",
        src: "/_static/tweenlite.min.js"
      })), external_react_default.a.createElement("section", {
        className: "markdown-body",
        dangerouslySetInnerHTML: {
          __html: content
        }
      }));
    }
  }]);

  return PreviewPage;
}(external_react_default.a.Component);



/***/ })
/******/ ]);