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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PreviewPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var markdown_it__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var markdown_it__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(markdown_it__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(highlight_js__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var MARKDOWN_STYLE = './pages/markdown.css';
var HLJS_STYLE = '../node_modules/highlight.js/styles/github.css'; // eslint-disable-next-line

var HLJSStyle = "/*\n\ngithub.com style (c) Vasily Polovnyov <vast@whiteants.net>\n\n*/\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  color: #333;\n  background: #f8f8f8;\n}\n\n.hljs-comment,\n.hljs-quote {\n  color: #998;\n  font-style: italic;\n}\n\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-subst {\n  color: #333;\n  font-weight: bold;\n}\n\n.hljs-number,\n.hljs-literal,\n.hljs-variable,\n.hljs-template-variable,\n.hljs-tag .hljs-attr {\n  color: #008080;\n}\n\n.hljs-string,\n.hljs-doctag {\n  color: #d14;\n}\n\n.hljs-title,\n.hljs-section,\n.hljs-selector-id {\n  color: #900;\n  font-weight: bold;\n}\n\n.hljs-subst {\n  font-weight: normal;\n}\n\n.hljs-type,\n.hljs-class .hljs-title {\n  color: #458;\n  font-weight: bold;\n}\n\n.hljs-tag,\n.hljs-name,\n.hljs-attribute {\n  color: #000080;\n  font-weight: normal;\n}\n\n.hljs-regexp,\n.hljs-link {\n  color: #009926;\n}\n\n.hljs-symbol,\n.hljs-bullet {\n  color: #990073;\n}\n\n.hljs-built_in,\n.hljs-builtin-name {\n  color: #0086b3;\n}\n\n.hljs-meta {\n  color: #999;\n  font-weight: bold;\n}\n\n.hljs-deletion {\n  background: #fdd;\n}\n\n.hljs-addition {\n  background: #dfd;\n}\n\n.hljs-emphasis {\n  font-style: italic;\n}\n\n.hljs-strong {\n  font-weight: bold;\n}\n"; // eslint-disable-next-line

var MARKDOWNStyle = ".markdown-body ol ol,\n.markdown-body ul ol,\n.markdown-body ol ul,\n.markdown-body ul ul,\n.markdown-body ol ul ol,\n.markdown-body ul ul ol,\n.markdown-body ol ul ul,\n.markdown-body ul ul ul {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.markdown-body {\n  font-family: \"Helvetica Neue\", Helvetica, \"Segoe UI\", Arial, freesans, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  font-size: 16px;\n  color: #333;\n  line-height: 1.6;\n  word-wrap: break-word;\n  padding: 45px;\n  background: #fff;\n  border: 1px solid #ddd;\n  -webkit-border-radius: 0 0 3px 3px;\n  border-radius: 0 0 3px 3px;\n}\n.markdown-body > *:first-child {\n  margin-top: 0 !important;\n}\n.markdown-body > *:last-child {\n  margin-bottom: 0 !important;\n}\n.markdown-body * {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.markdown-body h1,\n.markdown-body h2,\n.markdown-body h3,\n.markdown-body h4,\n.markdown-body h5,\n.markdown-body h6 {\n  margin-top: 1em;\n  margin-bottom: 16px;\n  font-weight: bold;\n  line-height: 1.4;\n}\n.markdown-body p,\n.markdown-body blockquote,\n.markdown-body ul,\n.markdown-body ol,\n.markdown-body dl,\n.markdown-body table,\n.markdown-body pre {\n  margin-top: 0;\n  margin-bottom: 16px;\n}\n.markdown-body h1 {\n  margin: 0.67em 0;\n  padding-bottom: 0.3em;\n  font-size: 2.25em;\n  line-height: 1.2;\n  border-bottom: 1px solid #eee;\n}\n.markdown-body h2 {\n  padding-bottom: 0.3em;\n  font-size: 1.75em;\n  line-height: 1.225;\n  border-bottom: 1px solid #eee;\n}\n.markdown-body h3 {\n  font-size: 1.5em;\n  line-height: 1.43;\n}\n.markdown-body h4 {\n  font-size: 1.25em;\n}\n.markdown-body h5 {\n  font-size: 1em;\n}\n.markdown-body h6 {\n  font-size: 1em;\n  color: #777;\n}\n.markdown-body ol,\n.markdown-body ul {\n  padding-left: 2em;\n}\n.markdown-body ol ol,\n.markdown-body ul ol {\n  list-style-type: lower-roman;\n}\n.markdown-body ol ul,\n.markdown-body ul ul {\n  list-style-type: circle;\n}\n.markdown-body ol ul ul,\n.markdown-body ul ul ul {\n  list-style-type: square;\n}\n.markdown-body ol {\n  list-style-type: decimal;\n}\n.markdown-body ul {\n  list-style-type: disc;\n}\n.markdown-body blockquote {\n  margin-left: 0;\n  margin-right: 0;\n  padding: 0 15px;\n  color: #777;\n  border-left: 4px solid #ddd;\n}\n.markdown-body table {\n  display: block;\n  width: 100%;\n  overflow: auto;\n  word-break: normal;\n  word-break: keep-all;\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n.markdown-body table tr {\n  background-color: #fff;\n  border-top: 1px solid #ccc;\n}\n.markdown-body table tr:nth-child(2n) {\n  background-color: #f8f8f8;\n}\n.markdown-body table th,\n.markdown-body table td {\n  padding: 6px 13px;\n  border: 1px solid #ddd;\n}\n.markdown-body pre {\n  word-wrap: normal;\n  padding: 16px;\n  overflow: auto;\n  font-size: 85%;\n  line-height: 1.45;\n  background-color: #f7f7f7;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n}\n.markdown-body pre code {\n  display: inline;\n  max-width: initial;\n  padding: 0;\n  margin: 0;\n  overflow: initial;\n  font-size: 100%;\n  line-height: inherit;\n  word-wrap: normal;\n  white-space: pre;\n  border: 0;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n  background-color: transparent;\n}\n.markdown-body pre code:before,\n.markdown-body pre code:after {\n  content: normal;\n}\n.markdown-body code {\n  font-family: Consolas, \"Liberation Mono\", Menlo, Courier, monospace;\n  padding: 0;\n  padding-top: 0.2em;\n  padding-bottom: 0.2em;\n  margin: 0;\n  font-size: 85%;\n  background-color: rgba(0,0,0,0.04);\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n}\n.markdown-body code:before,\n.markdown-body code:after {\n  letter-spacing: -0.2em;\n  content: \"\\00a0\";\n}\n.markdown-body a {\n  color: #4078c0;\n  text-decoration: none;\n  background: transparent;\n}\n.markdown-body img {\n  max-width: 100%;\n  max-height: 100%;\n  -webkit-border-radius: 4px;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 0 10px #555;\n  box-shadow: 0 0 10px #555;\n}\n.markdown-body strong {\n  font-weight: bold;\n}\n.markdown-body em {\n  font-style: italic;\n}\n.markdown-body del {\n  text-decoration: line-through;\n}\n";
var style = "\n".concat(MARKDOWNStyle, "\n").concat(HLJSStyle, "\n");

var PreviewPage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PreviewPage, _React$Component);

  function PreviewPage(props) {
    var _this;

    _classCallCheck(this, PreviewPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PreviewPage).call(this, props));
    _this.state = {
      content: ''
    };
    _this.md = new markdown_it__WEBPACK_IMPORTED_MODULE_3___default.a({
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
        if (lang && highlight_js__WEBPACK_IMPORTED_MODULE_4___default.a.getLanguage(lang)) {
          try {
            return highlight_js__WEBPACK_IMPORTED_MODULE_4___default.a.highlight(lang, str).value;
          } catch (__) {}
        }

        return ''; // use external default escaping
      }
    });
    return _this;
  }

  _createClass(PreviewPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var socket = socket_io_client__WEBPACK_IMPORTED_MODULE_2___default()({
        query: {
          bufnr: window.location.pathname.split('/')[2]
        }
      });
      window.socket = socket;
      socket.on('refresh_content', function (_ref) {
        var cursor = _ref.cursor,
            content = _ref.content;
        console.log('refresh: ', cursor, content);

        _this2.setState({
          cursor: cursor,
          content: _this2.md.render(content.join('\n'))
        });
      });
      socket.on('connect', function () {
        console.log('connect success');
      });
      socket.on('disconnect', function () {
        console.log('disconnect');
      });
      socket.on('close', function () {
        window.close();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var content = this.state.content;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", null, "preview page"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("style", {
        dangerouslySetInnerHTML: {
          __html: style
        }
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
        className: "markdown-body",
        dangerouslySetInnerHTML: {
          __html: content
        }
      }));
    }
  }]);

  return PreviewPage;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ })
/******/ ]);