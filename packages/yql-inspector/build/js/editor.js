!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define("YQLInspector",["react"],t):"object"==typeof exports?exports.YQLInspector=t(require("react")):e.YQLInspector=t(e.React)}("undefined"!=typeof self?self:this,function(e){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=50)}({1:function(t,n){t.exports=e},10:function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},11:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(){}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(1),c=o(l),f=n(2),d=o(f),p=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.assignRef=function(e){n.containerElement=e},n.containerElement=void 0,n.__current_value=e.value,n.__current_original=e.original,n}return a(t,e),s(t,[{key:"componentDidMount",value:function(){this.afterViewInit()}},{key:"componentDidUpdate",value:function(e){var t=this.props.context||window;this.props.value===this.__current_value&&this.props.original===this.__current_original||(this.__current_value=this.props.value,this.__current_original=this.props.original,this.editor&&(this.__prevent_trigger_change_event=!0,this.updateModel(this.__current_value,this.__current_original),this.__prevent_trigger_change_event=!1)),e.language!==this.props.language&&t.monaco.editor.setModelLanguage(this.editor.getModel(),this.props.language)}},{key:"componentWillUnmount",value:function(){this.destroyMonaco()}},{key:"editorWillMount",value:function(e){(0,this.props.editorWillMount)(e)}},{key:"editorDidMount",value:function(e,t){var n=this;this.props.editorDidMount(e,t),e.onDidUpdateDiff(function(t){var o=e.getValue();n.__current_value=o,n.__prevent_trigger_change_event||n.props.onChange(o,t)})}},{key:"afterViewInit",value:function(){var e=this,t=this.props.context||window;if(void 0!==t.monaco)return void this.initMonaco();var n=this.props.requireConfig,o=n.url||"vs/loader.js",r=function(){if(t.__REACT_MONACO_EDITOR_LOADER_ISPENDING__&&n.paths&&n.paths.vs&&t.require.config(n),t.require(["vs/editor/editor.main"],function(){e.initMonaco()}),t.__REACT_MONACO_EDITOR_LOADER_ISPENDING__){t.__REACT_MONACO_EDITOR_LOADER_ISPENDING__=!1;var o=t.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__;if(o&&o.length)for(var r=o.shift();r;)r.fn.call(r.context),r=o.shift()}};if(t.__REACT_MONACO_EDITOR_LOADER_ISPENDING__)t.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__=t.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__||[],t.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__.push({context:this,fn:r});else if(void 0===t.require){var i=t.document.createElement("script");i.type="text/javascript",i.src=o,i.addEventListener("load",r),t.document.body.appendChild(i),t.__REACT_MONACO_EDITOR_LOADER_ISPENDING__=!0}else r()}},{key:"updateModel",value:function(e,t){var n=this.props.context||window,o=this.props.language,r=n.monaco.editor.createModel(t,o),i=n.monaco.editor.createModel(e,o);this.editor.setModel({original:r,modified:i})}},{key:"initMonaco",value:function(){var e=null!==this.props.value?this.props.value:this.props.defaultValue,t=this.props,n=t.original,o=t.theme,r=t.options,i=this.props.context||window;this.containerElement&&void 0!==i.monaco&&(this.editorWillMount(i.monaco),this.editor=i.monaco.editor.createDiffEditor(this.containerElement,r),o&&i.monaco.editor.setTheme(o),this.updateModel(e,n),this.editorDidMount(this.editor,i.monaco))}},{key:"destroyMonaco",value:function(){void 0!==this.editor&&this.editor.dispose()}},{key:"render",value:function(){var e=this.props,t=e.width,n=e.height,o=-1!==t.toString().indexOf("%")?t:t+"px",r=-1!==n.toString().indexOf("%")?n:n+"px",i={width:o,height:r};return c.default.createElement("div",{ref:this.assignRef,style:i,className:"react-monaco-editor-container"})}}]),t}(c.default.Component);p.propTypes={width:d.default.oneOfType([d.default.string,d.default.number]),height:d.default.oneOfType([d.default.string,d.default.number]),original:d.default.string,value:d.default.string,defaultValue:d.default.string,language:d.default.string,theme:d.default.string,options:d.default.object,editorDidMount:d.default.func,editorWillMount:d.default.func,onChange:d.default.func,requireConfig:d.default.object,context:d.default.object},p.defaultProps={width:"100%",height:"100%",original:null,value:null,defaultValue:"",language:"javascript",theme:null,options:{},editorDidMount:u,editorWillMount:u,onChange:u,requireConfig:{}},t.default=p},12:function(e,t,n){"use strict";function o(e){return new Promise(function(t){return setTimeout(t,e)})}Object.defineProperty(t,"__esModule",{value:!0}),t.sleep=o},2:function(e,t,n){e.exports=n(7)()},4:function(e,t,n){"use strict";var o=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),r=this&&this.__assign||Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++){t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},i=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))(function(r,i){function a(e){try{s(o.next(e))}catch(e){i(e)}}function u(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(a,u)}s((o=o.apply(e,t||[])).next())})},a=this&&this.__generator||function(e,t){function n(e){return function(t){return o([e,t])}}function o(n){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,i&&(a=i[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(i,n[1])).done)return a;switch(i=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return s.label++,{value:n[1],done:!1};case 5:s.label++,i=n[1],n=[0];continue;case 7:n=s.ops.pop(),s.trys.pop();continue;default:if(a=s.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){s=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){s.label=n[1];break}if(6===n[0]&&s.label<a[1]){s.label=a[1],a=n;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(n);break}a[2]&&s.ops.pop(),s.trys.pop();continue}n=t.call(e,s)}catch(e){n=[6,e],i=0}finally{r=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var r,i,a,u,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return u={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u},u=this&&this.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&(n[o[r]]=e[o[r]]);return n};Object.defineProperty(t,"__esModule",{value:!0});var s=n(1),l=n(5),c=n(12),f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.editorDidMount=function(){return i(t,void 0,void 0,function(){var e;return a(this,function(t){switch(t.label){case 0:return[4,c.sleep(0)];case 1:return t.sent(),(e=this.editor)?(e.getModel().updateOptions({tabSize:2}),e.layout(),[2]):[2]}})})},t.getSelectedText=function(){return i(t,void 0,void 0,function(){var e;return a(this,function(t){switch(t.label){case 0:return[4,c.sleep(0)];case 1:return t.sent(),e=this.editor,e?[2,e.getModel().getValueInRange(e.getSelection())]:[2]}})})},t}return o(t,e),Object.defineProperty(t.prototype,"editor",{get:function(){return this.monaco&&this.monaco.editor},enumerable:!0,configurable:!0}),t.prototype.render=function(){var e=this,t=this.props,n=t.language,o=void 0===n?"yaml":n,i=t.readOnly,a=t.onChange,c=u(t,["language","readOnly","onChange"]);return s.createElement("div",{style:{height:"100%"}},s.createElement(l.default,r({},c,{onChange:a,ref:function(t){return e.monaco=t},language:o,options:{automaticLayout:!0,readOnly:i,minimap:{enabled:!1},folding:!0,renderLineHighlight:"none"},editorDidMount:this.editorDidMount,theme:"vs-light"})))},t}(s.Component);t.default=f},5:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.MonacoDiffEditor=t.default=void 0;var r=n(6),i=o(r),a=n(11),u=o(a);t.default=i.default,t.MonacoDiffEditor=u.default},50:function(e,t,n){e.exports=n(4)},6:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(){}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(1),f=o(c),d=n(2),p=o(d),_=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.afterViewInit=function(){var e=n.props.context||window;if(void 0!==e.monaco)return void n.initMonaco();var t=n.props.requireConfig,o=e.process&&"renderer"===e.process.type,r=t.url||"vs/loader.js";o&&(e.electronNodeRequire=e.require,r=t.url||"../node_modules/monaco-editor/min/vs/loader.js");var i=function(){if(e.__REACT_MONACO_EDITOR_LOADER_ISPENDING__){if(o){var r=t.baseUrl;if(!r){var i=e.electronNodeRequire("path"),a=i.join(e.__dirname,"../node_modules/monaco-editor/min");r=i.resolve(a).replace(/\\/g,"/"),r.length>0&&"/"!==r.charAt(0)&&(r="/"+r),r=encodeURI("file://"+r)}e.require.config({baseUrl:r}),e.window.module=void 0,e.window.process.browser=!0}t.paths&&t.paths.vs&&!o&&e.require.config(t)}if(e.require(["vs/editor/editor.main"],function(){n.initMonaco()}),e.__REACT_MONACO_EDITOR_LOADER_ISPENDING__){e.__REACT_MONACO_EDITOR_LOADER_ISPENDING__=!1;var u=e.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__;if(u&&u.length)for(var s=u.shift();s;)s.fn.call(s.context),s=u.shift()}};if(e.__REACT_MONACO_EDITOR_LOADER_ISPENDING__)e.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__=e.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__||[],e.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__.push({context:n,fn:i});else if(void 0===e.require||o){var a=e.document.createElement("script");a.type="text/javascript",a.src=r,a.addEventListener("load",i),e.document.body.appendChild(a),e.__REACT_MONACO_EDITOR_LOADER_ISPENDING__=!0}else i()},n.assignRef=function(e){n.containerElement=e},n.containerElement=void 0,n.__current_value=e.value,n}return a(t,e),l(t,[{key:"componentDidMount",value:function(){this.afterViewInit()}},{key:"componentDidUpdate",value:function(e){var t=this.props.context||window;this.props.value!==this.__current_value&&(this.__current_value=this.props.value,this.editor&&(this.__prevent_trigger_change_event=!0,this.editor.setValue(this.__current_value),this.__prevent_trigger_change_event=!1)),e.language!==this.props.language&&t.monaco.editor.setModelLanguage(this.editor.getModel(),this.props.language)}},{key:"componentWillUnmount",value:function(){this.destroyMonaco()}},{key:"editorWillMount",value:function(e){(0,this.props.editorWillMount)(e)}},{key:"editorDidMount",value:function(e,t){var n=this;this.props.editorDidMount(e,t),e.onDidChangeModelContent(function(t){var o=e.getValue();n.__current_value=o,n.__prevent_trigger_change_event||n.props.onChange(o,t)})}},{key:"initMonaco",value:function(){var e=null!==this.props.value?this.props.value:this.props.defaultValue,t=this.props,n=t.language,o=t.theme,r=t.options,i=this.props.context||window;this.containerElement&&void 0!==i.monaco&&(this.editorWillMount(i.monaco),this.editor=i.monaco.editor.create(this.containerElement,s({value:e,language:n},r)),o&&i.monaco.editor.setTheme(o),this.editorDidMount(this.editor,i.monaco))}},{key:"destroyMonaco",value:function(){void 0!==this.editor&&this.editor.dispose()}},{key:"render",value:function(){var e=this.props,t=e.width,n=e.height,o=-1!==t.toString().indexOf("%")?t:t+"px",r=-1!==n.toString().indexOf("%")?n:n+"px",i={width:o,height:r};return f.default.createElement("div",{ref:this.assignRef,style:i,className:"react-monaco-editor-container"})}}]),t}(f.default.Component);_.propTypes={width:p.default.oneOfType([p.default.string,p.default.number]),height:p.default.oneOfType([p.default.string,p.default.number]),value:p.default.string,defaultValue:p.default.string,language:p.default.string,theme:p.default.string,options:p.default.object,editorDidMount:p.default.func,editorWillMount:p.default.func,onChange:p.default.func,requireConfig:p.default.object,context:p.default.object},_.defaultProps={width:"100%",height:"100%",value:null,defaultValue:"",language:"javascript",theme:null,options:{},editorDidMount:u,editorWillMount:u,onChange:u,requireConfig:{}},t.default=_},7:function(e,t,n){"use strict";var o=n(8),r=n(9),i=n(10);e.exports=function(){function e(e,t,n,o,a,u){u!==i&&r(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},8:function(e,t,n){"use strict";function o(e){return function(){return e}}var r=function(){};r.thatReturns=o,r.thatReturnsFalse=o(!1),r.thatReturnsTrue=o(!0),r.thatReturnsNull=o(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(e){return e},e.exports=r},9:function(e,t,n){"use strict";function o(e,t,n,o,i,a,u,s){if(r(t),!e){var l;if(void 0===t)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,o,i,a,u,s],f=0;l=new Error(t.replace(/%s/g,function(){return c[f++]})),l.name="Invariant Violation"}throw l.framesToPop=1,l}}var r=function(e){};e.exports=o}})});
//# sourceMappingURL=editor.js.map