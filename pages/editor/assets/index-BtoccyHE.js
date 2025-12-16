var w2=Object.defineProperty;var S2=(m,l,i)=>l in m?w2(m,l,{enumerable:!0,configurable:!0,writable:!0,value:i}):m[l]=i;var y=(m,l,i)=>S2(m,typeof l!="symbol"?l+"":l,i);(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const c of d.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function i(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerPolicy&&(d.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?d.credentials="include":s.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(s){if(s.ep)return;s.ep=!0;const d=i(s);fetch(s.href,d)}})();function E2(m){return m&&m.__esModule&&Object.prototype.hasOwnProperty.call(m,"default")?m.default:m}var _b={exports:{}},Ov={},wb={exports:{}},mf={exports:{}};mf.exports;(function(m,l){/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var i="18.3.1",o=Symbol.for("react.element"),s=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),h=Symbol.for("react.provider"),p=Symbol.for("react.context"),_=Symbol.for("react.forward_ref"),S=Symbol.for("react.suspense"),T=Symbol.for("react.suspense_list"),C=Symbol.for("react.memo"),D=Symbol.for("react.lazy"),F=Symbol.for("react.offscreen"),q=Symbol.iterator,$="@@iterator";function j(b){if(b===null||typeof b!="object")return null;var N=q&&b[q]||b[$];return typeof N=="function"?N:null}var K={current:null},Z={transition:null},I={current:null,isBatchingLegacy:!1,didScheduleLegacyUpdate:!1},ne={current:null},z={},X=null;function re(b){X=b}z.setExtraStackFrame=function(b){X=b},z.getCurrentStack=null,z.getStackAddendum=function(){var b="";X&&(b+=X);var N=z.getCurrentStack;return N&&(b+=N()||""),b};var se=!1,le=!1,ze=!1,_e=!1,ye=!1,et={ReactCurrentDispatcher:K,ReactCurrentBatchConfig:Z,ReactCurrentOwner:ne};et.ReactDebugCurrentFrame=z,et.ReactCurrentActQueue=I;function gt(b){{for(var N=arguments.length,B=new Array(N>1?N-1:0),H=1;H<N;H++)B[H-1]=arguments[H];Tt("warn",b,B)}}function Ne(b){{for(var N=arguments.length,B=new Array(N>1?N-1:0),H=1;H<N;H++)B[H-1]=arguments[H];Tt("error",b,B)}}function Tt(b,N,B){{var H=et.ReactDebugCurrentFrame,oe=H.getStackAddendum();oe!==""&&(N+="%s",B=B.concat([oe]));var Me=B.map(function(xe){return String(xe)});Me.unshift("Warning: "+N),Function.prototype.apply.call(console[b],console,Me)}}var wr={};function Yn(b,N){{var B=b.constructor,H=B&&(B.displayName||B.name)||"ReactClass",oe=H+"."+N;if(wr[oe])return;Ne("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",N,H),wr[oe]=!0}}var qn={isMounted:function(b){return!1},enqueueForceUpdate:function(b,N,B){Yn(b,"forceUpdate")},enqueueReplaceState:function(b,N,B,H){Yn(b,"replaceState")},enqueueSetState:function(b,N,B,H){Yn(b,"setState")}},Gt=Object.assign,pn={};Object.freeze(pn);function or(b,N,B){this.props=b,this.context=N,this.refs=pn,this.updater=B||qn}or.prototype.isReactComponent={},or.prototype.setState=function(b,N){if(typeof b!="object"&&typeof b!="function"&&b!=null)throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,b,N,"setState")},or.prototype.forceUpdate=function(b){this.updater.enqueueForceUpdate(this,b,"forceUpdate")};{var ci={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]},Vr=function(b,N){Object.defineProperty(or.prototype,b,{get:function(){gt("%s(...) is deprecated in plain JavaScript React classes. %s",N[0],N[1])}})};for(var Ir in ci)ci.hasOwnProperty(Ir)&&Vr(Ir,ci[Ir])}function Sr(){}Sr.prototype=or.prototype;function vn(b,N,B){this.props=b,this.context=N,this.refs=pn,this.updater=B||qn}var Xn=vn.prototype=new Sr;Xn.constructor=vn,Gt(Xn,or.prototype),Xn.isPureReactComponent=!0;function ar(){var b={current:null};return Object.seal(b),b}var sr=Array.isArray;function Wt(b){return sr(b)}function kn(b){{var N=typeof Symbol=="function"&&Symbol.toStringTag,B=N&&b[Symbol.toStringTag]||b.constructor.name||"Object";return B}}function sn(b){try{return $t(b),!1}catch{return!0}}function $t(b){return""+b}function Kt(b){if(sn(b))return Ne("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",kn(b)),$t(b)}function lr(b,N,B){var H=b.displayName;if(H)return H;var oe=N.displayName||N.name||"";return oe!==""?B+"("+oe+")":B}function Er(b){return b.displayName||"Context"}function $n(b){if(b==null)return null;if(typeof b.tag=="number"&&Ne("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof b=="function")return b.displayName||b.name||null;if(typeof b=="string")return b;switch(b){case d:return"Fragment";case s:return"Portal";case v:return"Profiler";case c:return"StrictMode";case S:return"Suspense";case T:return"SuspenseList"}if(typeof b=="object")switch(b.$$typeof){case p:var N=b;return Er(N)+".Consumer";case h:var B=b;return Er(B._context)+".Provider";case _:return lr(b,b.render,"ForwardRef");case C:var H=b.displayName||null;return H!==null?H:$n(b.type)||"Memo";case D:{var oe=b,Me=oe._payload,xe=oe._init;try{return $n(xe(Me))}catch{return null}}}return null}var jr=Object.prototype.hasOwnProperty,Cr={key:!0,ref:!0,__self:!0,__source:!0},Ln,Tr,Nn;Nn={};function ur(b){if(jr.call(b,"ref")){var N=Object.getOwnPropertyDescriptor(b,"ref").get;if(N&&N.isReactWarning)return!1}return b.ref!==void 0}function It(b){if(jr.call(b,"key")){var N=Object.getOwnPropertyDescriptor(b,"key").get;if(N&&N.isReactWarning)return!1}return b.key!==void 0}function kr(b,N){var B=function(){Ln||(Ln=!0,Ne("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",N))};B.isReactWarning=!0,Object.defineProperty(b,"key",{get:B,configurable:!0})}function ki(b,N){var B=function(){Tr||(Tr=!0,Ne("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",N))};B.isReactWarning=!0,Object.defineProperty(b,"ref",{get:B,configurable:!0})}function Ni(b){if(typeof b.ref=="string"&&ne.current&&b.__self&&ne.current.stateNode!==b.__self){var N=$n(ne.current.type);Nn[N]||(Ne('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',N,b.ref),Nn[N]=!0)}}var ue=function(b,N,B,H,oe,Me,xe){var Oe={$$typeof:o,type:b,key:N,ref:B,props:xe,_owner:Me};return Oe._store={},Object.defineProperty(Oe._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(Oe,"_self",{configurable:!1,enumerable:!1,writable:!1,value:H}),Object.defineProperty(Oe,"_source",{configurable:!1,enumerable:!1,writable:!1,value:oe}),Object.freeze&&(Object.freeze(Oe.props),Object.freeze(Oe)),Oe};function we(b,N,B){var H,oe={},Me=null,xe=null,Oe=null,Ke=null;if(N!=null){ur(N)&&(xe=N.ref,Ni(N)),It(N)&&(Kt(N.key),Me=""+N.key),Oe=N.__self===void 0?null:N.__self,Ke=N.__source===void 0?null:N.__source;for(H in N)jr.call(N,H)&&!Cr.hasOwnProperty(H)&&(oe[H]=N[H])}var mt=arguments.length-2;if(mt===1)oe.children=B;else if(mt>1){for(var bt=Array(mt),_t=0;_t<mt;_t++)bt[_t]=arguments[_t+2];Object.freeze&&Object.freeze(bt),oe.children=bt}if(b&&b.defaultProps){var Rt=b.defaultProps;for(H in Rt)oe[H]===void 0&&(oe[H]=Rt[H])}if(Me||xe){var Ft=typeof b=="function"?b.displayName||b.name||"Unknown":b;Me&&kr(oe,Ft),xe&&ki(oe,Ft)}return ue(b,Me,xe,Oe,Ke,ne.current,oe)}function Ge(b,N){var B=ue(b.type,N,b.ref,b._self,b._source,b._owner,b.props);return B}function dt(b,N,B){if(b==null)throw new Error("React.cloneElement(...): The argument must be a React element, but you passed "+b+".");var H,oe=Gt({},b.props),Me=b.key,xe=b.ref,Oe=b._self,Ke=b._source,mt=b._owner;if(N!=null){ur(N)&&(xe=N.ref,mt=ne.current),It(N)&&(Kt(N.key),Me=""+N.key);var bt;b.type&&b.type.defaultProps&&(bt=b.type.defaultProps);for(H in N)jr.call(N,H)&&!Cr.hasOwnProperty(H)&&(N[H]===void 0&&bt!==void 0?oe[H]=bt[H]:oe[H]=N[H])}var _t=arguments.length-2;if(_t===1)oe.children=B;else if(_t>1){for(var Rt=Array(_t),Ft=0;Ft<_t;Ft++)Rt[Ft]=arguments[Ft+2];oe.children=Rt}return ue(b.type,Me,xe,Oe,Ke,mt,oe)}function ft(b){return typeof b=="object"&&b!==null&&b.$$typeof===o}var Qt=".",jt=":";function Kn(b){var N=/[=:]/g,B={"=":"=0",":":"=2"},H=b.replace(N,function(oe){return B[oe]});return"$"+H}var xt=!1,cr=/\/+/g;function kt(b){return b.replace(cr,"$&/")}function Nt(b,N){return typeof b=="object"&&b!==null&&b.key!=null?(Kt(b.key),Kn(""+b.key)):N.toString(36)}function di(b,N,B,H,oe){var Me=typeof b;(Me==="undefined"||Me==="boolean")&&(b=null);var xe=!1;if(b===null)xe=!0;else switch(Me){case"string":case"number":xe=!0;break;case"object":switch(b.$$typeof){case o:case s:xe=!0}}if(xe){var Oe=b,Ke=oe(Oe),mt=H===""?Qt+Nt(Oe,0):H;if(Wt(Ke)){var bt="";mt!=null&&(bt=kt(mt)+"/"),di(Ke,N,bt,"",function(kf){return kf})}else Ke!=null&&(ft(Ke)&&(Ke.key&&(!Oe||Oe.key!==Ke.key)&&Kt(Ke.key),Ke=Ge(Ke,B+(Ke.key&&(!Oe||Oe.key!==Ke.key)?kt(""+Ke.key)+"/":"")+mt)),N.push(Ke));return 1}var _t,Rt,Ft=0,st=H===""?Qt:H+jt;if(Wt(b))for(var mo=0;mo<b.length;mo++)_t=b[mo],Rt=st+Nt(_t,mo),Ft+=di(_t,N,B,Rt,oe);else{var Aa=j(b);if(typeof Aa=="function"){var Qs=b;Aa===Qs.entries&&(xt||gt("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),xt=!0);for(var Tf=Aa.call(Qs),zi,Zs=0;!(zi=Tf.next()).done;)_t=zi.value,Rt=st+Nt(_t,Zs++),Ft+=di(_t,N,B,Rt,oe)}else if(Me==="object"){var Js=String(b);throw new Error("Objects are not valid as a React child (found: "+(Js==="[object Object]"?"object with keys {"+Object.keys(b).join(", ")+"}":Js)+"). If you meant to render a collection of children, use an array instead.")}}return Ft}function Hr(b,N,B){if(b==null)return b;var H=[],oe=0;return di(b,H,"","",function(Me){return N.call(B,Me,oe++)}),H}function jo(b){var N=0;return Hr(b,function(){N++}),N}function ka(b,N,B){Hr(b,function(){N.apply(this,arguments)},B)}function Fs(b){return Hr(b,function(N){return N})||[]}function Ho(b){if(!ft(b))throw new Error("React.Children.only expected to receive a single React element child.");return b}function Go(b){var N={$$typeof:p,_currentValue:b,_currentValue2:b,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};N.Provider={$$typeof:h,_context:N};var B=!1,H=!1,oe=!1;{var Me={$$typeof:p,_context:N};Object.defineProperties(Me,{Provider:{get:function(){return H||(H=!0,Ne("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")),N.Provider},set:function(xe){N.Provider=xe}},_currentValue:{get:function(){return N._currentValue},set:function(xe){N._currentValue=xe}},_currentValue2:{get:function(){return N._currentValue2},set:function(xe){N._currentValue2=xe}},_threadCount:{get:function(){return N._threadCount},set:function(xe){N._threadCount=xe}},Consumer:{get:function(){return B||(B=!0,Ne("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")),N.Consumer}},displayName:{get:function(){return N.displayName},set:function(xe){oe||(gt("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.",xe),oe=!0)}}}),N.Consumer=Me}return N._currentRenderer=null,N._currentRenderer2=null,N}var Ri=-1,io=0,Di=1,fi=2;function Gr(b){if(b._status===Ri){var N=b._result,B=N();if(B.then(function(Me){if(b._status===io||b._status===Ri){var xe=b;xe._status=Di,xe._result=Me}},function(Me){if(b._status===io||b._status===Ri){var xe=b;xe._status=fi,xe._result=Me}}),b._status===Ri){var H=b;H._status=io,H._result=B}}if(b._status===Di){var oe=b._result;return oe===void 0&&Ne(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,oe),"default"in oe||Ne(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,oe),oe.default}else throw b._result}function R(b){var N={_status:Ri,_result:b},B={$$typeof:D,_payload:N,_init:Gr};{var H,oe;Object.defineProperties(B,{defaultProps:{configurable:!0,get:function(){return H},set:function(Me){Ne("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),H=Me,Object.defineProperty(B,"defaultProps",{enumerable:!0})}},propTypes:{configurable:!0,get:function(){return oe},set:function(Me){Ne("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),oe=Me,Object.defineProperty(B,"propTypes",{enumerable:!0})}}})}return B}function ee(b){b!=null&&b.$$typeof===C?Ne("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):typeof b!="function"?Ne("forwardRef requires a render function but was given %s.",b===null?"null":typeof b):b.length!==0&&b.length!==2&&Ne("forwardRef render functions accept exactly two parameters: props and ref. %s",b.length===1?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),b!=null&&(b.defaultProps!=null||b.propTypes!=null)&&Ne("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");var N={$$typeof:_,render:b};{var B;Object.defineProperty(N,"displayName",{enumerable:!1,configurable:!0,get:function(){return B},set:function(H){B=H,!b.name&&!b.displayName&&(b.displayName=H)}})}return N}var ce;ce=Symbol.for("react.module.reference");function Re(b){return!!(typeof b=="string"||typeof b=="function"||b===d||b===v||ye||b===c||b===S||b===T||_e||b===F||se||le||ze||typeof b=="object"&&b!==null&&(b.$$typeof===D||b.$$typeof===C||b.$$typeof===h||b.$$typeof===p||b.$$typeof===_||b.$$typeof===ce||b.getModuleId!==void 0))}function $e(b,N){Re(b)||Ne("memo: The first argument must be a component. Instead received: %s",b===null?"null":typeof b);var B={$$typeof:C,type:b,compare:N===void 0?null:N};{var H;Object.defineProperty(B,"displayName",{enumerable:!1,configurable:!0,get:function(){return H},set:function(oe){H=oe,!b.name&&!b.displayName&&(b.displayName=oe)}})}return B}function Ae(){var b=K.current;return b===null&&Ne(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`),b}function je(b){var N=Ae();if(b._context!==void 0){var B=b._context;B.Consumer===b?Ne("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?"):B.Provider===b&&Ne("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?")}return N.useContext(b)}function Ve(b){var N=Ae();return N.useState(b)}function Pt(b,N,B){var H=Ae();return H.useReducer(b,N,B)}function Ye(b){var N=Ae();return N.useRef(b)}function Mt(b,N){var B=Ae();return B.useEffect(b,N)}function Rn(b,N){var B=Ae();return B.useInsertionEffect(b,N)}function Wr(b,N){var B=Ae();return B.useLayoutEffect(b,N)}function Yr(b,N){var B=Ae();return B.useCallback(b,N)}function ln(b,N){var B=Ae();return B.useMemo(b,N)}function Wo(b,N,B){var H=Ae();return H.useImperativeHandle(b,N,B)}function Na(b,N){{var B=Ae();return B.useDebugValue(b,N)}}function Ls(){var b=Ae();return b.useTransition()}function Mi(b){var N=Ae();return N.useDeferredValue(b)}function Xe(){var b=Ae();return b.useId()}function Yo(b,N,B){var H=Ae();return H.useSyncExternalStore(b,N,B)}var oo=0,Us,Bs,Vs,Is,js,Hs,Gs;function Vu(){}Vu.__reactDisabledLog=!0;function Sf(){{if(oo===0){Us=console.log,Bs=console.info,Vs=console.warn,Is=console.error,js=console.group,Hs=console.groupCollapsed,Gs=console.groupEnd;var b={configurable:!0,enumerable:!0,value:Vu,writable:!0};Object.defineProperties(console,{info:b,log:b,warn:b,error:b,group:b,groupCollapsed:b,groupEnd:b})}oo++}}function Ws(){{if(oo--,oo===0){var b={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:Gt({},b,{value:Us}),info:Gt({},b,{value:Bs}),warn:Gt({},b,{value:Vs}),error:Gt({},b,{value:Is}),group:Gt({},b,{value:js}),groupCollapsed:Gt({},b,{value:Hs}),groupEnd:Gt({},b,{value:Gs})})}oo<0&&Ne("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var qo=et.ReactCurrentDispatcher,Nr;function ao(b,N,B){{if(Nr===void 0)try{throw Error()}catch(oe){var H=oe.stack.trim().match(/\n( *(at )?)/);Nr=H&&H[1]||""}return`
`+Nr+b}}var so=!1,Ra;{var Ys=typeof WeakMap=="function"?WeakMap:Map;Ra=new Ys}function Iu(b,N){if(!b||so)return"";{var B=Ra.get(b);if(B!==void 0)return B}var H;so=!0;var oe=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var Me;Me=qo.current,qo.current=null,Sf();try{if(N){var xe=function(){throw Error()};if(Object.defineProperty(xe.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(xe,[])}catch(st){H=st}Reflect.construct(b,[],xe)}else{try{xe.call()}catch(st){H=st}b.call(xe.prototype)}}else{try{throw Error()}catch(st){H=st}b()}}catch(st){if(st&&H&&typeof st.stack=="string"){for(var Oe=st.stack.split(`
`),Ke=H.stack.split(`
`),mt=Oe.length-1,bt=Ke.length-1;mt>=1&&bt>=0&&Oe[mt]!==Ke[bt];)bt--;for(;mt>=1&&bt>=0;mt--,bt--)if(Oe[mt]!==Ke[bt]){if(mt!==1||bt!==1)do if(mt--,bt--,bt<0||Oe[mt]!==Ke[bt]){var _t=`
`+Oe[mt].replace(" at new "," at ");return b.displayName&&_t.includes("<anonymous>")&&(_t=_t.replace("<anonymous>",b.displayName)),typeof b=="function"&&Ra.set(b,_t),_t}while(mt>=1&&bt>=0);break}}}finally{so=!1,qo.current=Me,Ws(),Error.prepareStackTrace=oe}var Rt=b?b.displayName||b.name:"",Ft=Rt?ao(Rt):"";return typeof b=="function"&&Ra.set(b,Ft),Ft}function qs(b,N,B){return Iu(b,!1)}function Ef(b){var N=b.prototype;return!!(N&&N.isReactComponent)}function lo(b,N,B){if(b==null)return"";if(typeof b=="function")return Iu(b,Ef(b));if(typeof b=="string")return ao(b);switch(b){case S:return ao("Suspense");case T:return ao("SuspenseList")}if(typeof b=="object")switch(b.$$typeof){case _:return qs(b.render);case C:return lo(b.type,N,B);case D:{var H=b,oe=H._payload,Me=H._init;try{return lo(Me(oe),N,B)}catch{}}}return""}var ju={},Xs=et.ReactDebugCurrentFrame;function Da(b){if(b){var N=b._owner,B=lo(b.type,b._source,N?N.type:null);Xs.setExtraStackFrame(B)}else Xs.setExtraStackFrame(null)}function Hu(b,N,B,H,oe){{var Me=Function.call.bind(jr);for(var xe in b)if(Me(b,xe)){var Oe=void 0;try{if(typeof b[xe]!="function"){var Ke=Error((H||"React class")+": "+B+" type `"+xe+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof b[xe]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw Ke.name="Invariant Violation",Ke}Oe=b[xe](N,xe,H,B,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(mt){Oe=mt}Oe&&!(Oe instanceof Error)&&(Da(oe),Ne("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",H||"React class",B,xe,typeof Oe),Da(null)),Oe instanceof Error&&!(Oe.message in ju)&&(ju[Oe.message]=!0,Da(oe),Ne("Failed %s type: %s",B,Oe.message),Da(null))}}}function it(b){if(b){var N=b._owner,B=lo(b.type,b._source,N?N.type:null);re(B)}else re(null)}var $s;$s=!1;function Ks(){if(ne.current){var b=$n(ne.current.type);if(b)return`

Check the render method of \``+b+"`."}return""}function Be(b){if(b!==void 0){var N=b.fileName.replace(/^.*[\\\/]/,""),B=b.lineNumber;return`

Check your code at `+N+":"+B+"."}return""}function Gu(b){return b!=null?Be(b.__source):""}var Dn={};function Xo(b){var N=Ks();if(!N){var B=typeof b=="string"?b:b.displayName||b.name;B&&(N=`

Check the top-level render call using <`+B+">.")}return N}function uo(b,N){if(!(!b._store||b._store.validated||b.key!=null)){b._store.validated=!0;var B=Xo(N);if(!Dn[B]){Dn[B]=!0;var H="";b&&b._owner&&b._owner!==ne.current&&(H=" It was passed a child from "+$n(b._owner.type)+"."),it(b),Ne('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',B,H),it(null)}}}function Wu(b,N){if(typeof b=="object"){if(Wt(b))for(var B=0;B<b.length;B++){var H=b[B];ft(H)&&uo(H,N)}else if(ft(b))b._store&&(b._store.validated=!0);else if(b){var oe=j(b);if(typeof oe=="function"&&oe!==b.entries)for(var Me=oe.call(b),xe;!(xe=Me.next()).done;)ft(xe.value)&&uo(xe.value,N)}}}function un(b){{var N=b.type;if(N==null||typeof N=="string")return;var B;if(typeof N=="function")B=N.propTypes;else if(typeof N=="object"&&(N.$$typeof===_||N.$$typeof===C))B=N.propTypes;else return;if(B){var H=$n(N);Hu(B,b.props,"prop",H,b)}else if(N.PropTypes!==void 0&&!$s){$s=!0;var oe=$n(N);Ne("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",oe||"Unknown")}typeof N.getDefaultProps=="function"&&!N.getDefaultProps.isReactClassApproved&&Ne("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function zt(b){{for(var N=Object.keys(b.props),B=0;B<N.length;B++){var H=N[B];if(H!=="children"&&H!=="key"){it(b),Ne("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",H),it(null);break}}b.ref!==null&&(it(b),Ne("Invalid attribute `ref` supplied to `React.Fragment`."),it(null))}}function Yu(b,N,B){var H=Re(b);if(!H){var oe="";(b===void 0||typeof b=="object"&&b!==null&&Object.keys(b).length===0)&&(oe+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var Me=Gu(N);Me?oe+=Me:oe+=Ks();var xe;b===null?xe="null":Wt(b)?xe="array":b!==void 0&&b.$$typeof===o?(xe="<"+($n(b.type)||"Unknown")+" />",oe=" Did you accidentally export a JSX literal instead of a component?"):xe=typeof b,Ne("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",xe,oe)}var Oe=we.apply(this,arguments);if(Oe==null)return Oe;if(H)for(var Ke=2;Ke<arguments.length;Ke++)Wu(arguments[Ke],b);return b===d?zt(Oe):un(Oe),Oe}var dr=!1;function Qn(b){var N=Yu.bind(null,b);return N.type=b,dr||(dr=!0,gt("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")),Object.defineProperty(N,"type",{enumerable:!1,get:function(){return gt("Factory.type is deprecated. Access the class directly before passing it to createFactory."),Object.defineProperty(this,"type",{value:b}),b}}),N}function mi(b,N,B){for(var H=dt.apply(this,arguments),oe=2;oe<arguments.length;oe++)Wu(arguments[oe],H.type);return un(H),H}function Cf(b,N){var B=Z.transition;Z.transition={};var H=Z.transition;Z.transition._updatedFibers=new Set;try{b()}finally{if(Z.transition=B,B===null&&H._updatedFibers){var oe=H._updatedFibers.size;oe>10&&gt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),H._updatedFibers.clear()}}}var Ma=!1,$o=null;function qu(b){if($o===null)try{var N=("require"+Math.random()).slice(0,7),B=m&&m[N];$o=B.call(m,"timers").setImmediate}catch{$o=function(oe){Ma===!1&&(Ma=!0,typeof MessageChannel>"u"&&Ne("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var Me=new MessageChannel;Me.port1.onmessage=oe,Me.port2.postMessage(void 0)}}return $o(b)}var co=0,Xu=!1;function $u(b){{var N=co;co++,I.current===null&&(I.current=[]);var B=I.isBatchingLegacy,H;try{if(I.isBatchingLegacy=!0,H=b(),!B&&I.didScheduleLegacyUpdate){var oe=I.current;oe!==null&&(I.didScheduleLegacyUpdate=!1,za(oe))}}catch(Rt){throw Pi(N),Rt}finally{I.isBatchingLegacy=B}if(H!==null&&typeof H=="object"&&typeof H.then=="function"){var Me=H,xe=!1,Oe={then:function(Rt,Ft){xe=!0,Me.then(function(st){Pi(N),co===0?Pa(st,Rt,Ft):Rt(st)},function(st){Pi(N),Ft(st)})}};return!Xu&&typeof Promise<"u"&&Promise.resolve().then(function(){}).then(function(){xe||(Xu=!0,Ne("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),Oe}else{var Ke=H;if(Pi(N),co===0){var mt=I.current;mt!==null&&(za(mt),I.current=null);var bt={then:function(Rt,Ft){I.current===null?(I.current=[],Pa(Ke,Rt,Ft)):Rt(Ke)}};return bt}else{var _t={then:function(Rt,Ft){Rt(Ke)}};return _t}}}}function Pi(b){b!==co-1&&Ne("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),co=b}function Pa(b,N,B){{var H=I.current;if(H!==null)try{za(H),qu(function(){H.length===0?(I.current=null,N(b)):Pa(b,N,B)})}catch(oe){B(oe)}else N(b)}}var fo=!1;function za(b){if(!fo){fo=!0;var N=0;try{for(;N<b.length;N++){var B=b[N];do B=B(!0);while(B!==null)}b.length=0}catch(H){throw b=b.slice(N+1),H}finally{fo=!1}}}var Ku=Yu,Qu=mi,Zu=Qn,Ju={map:Hr,forEach:ka,count:jo,toArray:Fs,only:Ho};l.Children=Ju,l.Component=or,l.Fragment=d,l.Profiler=v,l.PureComponent=vn,l.StrictMode=c,l.Suspense=S,l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=et,l.act=$u,l.cloneElement=Qu,l.createContext=Go,l.createElement=Ku,l.createFactory=Zu,l.createRef=ar,l.forwardRef=ee,l.isValidElement=ft,l.lazy=R,l.memo=$e,l.startTransition=Cf,l.unstable_act=$u,l.useCallback=Yr,l.useContext=je,l.useDebugValue=Na,l.useDeferredValue=Mi,l.useEffect=Mt,l.useId=Xe,l.useImperativeHandle=Wo,l.useInsertionEffect=Rn,l.useLayoutEffect=Wr,l.useMemo=ln,l.useReducer=Pt,l.useRef=Ye,l.useState=Ve,l.useSyncExternalStore=Yo,l.useTransition=Ls,l.version=i,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})()})(mf,mf.exports);var C2=mf.exports;wb.exports=C2;var U=wb.exports;const hf=E2(U);/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){var m=U,l=Symbol.for("react.element"),i=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),d=Symbol.for("react.profiler"),c=Symbol.for("react.provider"),v=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),_=Symbol.for("react.suspense_list"),S=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),C=Symbol.for("react.offscreen"),D=Symbol.iterator,F="@@iterator";function q(R){if(R===null||typeof R!="object")return null;var ee=D&&R[D]||R[F];return typeof ee=="function"?ee:null}var $=m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function j(R){{for(var ee=arguments.length,ce=new Array(ee>1?ee-1:0),Re=1;Re<ee;Re++)ce[Re-1]=arguments[Re];K("error",R,ce)}}function K(R,ee,ce){{var Re=$.ReactDebugCurrentFrame,$e=Re.getStackAddendum();$e!==""&&(ee+="%s",ce=ce.concat([$e]));var Ae=ce.map(function(je){return String(je)});Ae.unshift("Warning: "+ee),Function.prototype.apply.call(console[R],console,Ae)}}var Z=!1,I=!1,ne=!1,z=!1,X=!1,re;re=Symbol.for("react.module.reference");function se(R){return!!(typeof R=="string"||typeof R=="function"||R===o||R===d||X||R===s||R===p||R===_||z||R===C||Z||I||ne||typeof R=="object"&&R!==null&&(R.$$typeof===T||R.$$typeof===S||R.$$typeof===c||R.$$typeof===v||R.$$typeof===h||R.$$typeof===re||R.getModuleId!==void 0))}function le(R,ee,ce){var Re=R.displayName;if(Re)return Re;var $e=ee.displayName||ee.name||"";return $e!==""?ce+"("+$e+")":ce}function ze(R){return R.displayName||"Context"}function _e(R){if(R==null)return null;if(typeof R.tag=="number"&&j("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof R=="function")return R.displayName||R.name||null;if(typeof R=="string")return R;switch(R){case o:return"Fragment";case i:return"Portal";case d:return"Profiler";case s:return"StrictMode";case p:return"Suspense";case _:return"SuspenseList"}if(typeof R=="object")switch(R.$$typeof){case v:var ee=R;return ze(ee)+".Consumer";case c:var ce=R;return ze(ce._context)+".Provider";case h:return le(R,R.render,"ForwardRef");case S:var Re=R.displayName||null;return Re!==null?Re:_e(R.type)||"Memo";case T:{var $e=R,Ae=$e._payload,je=$e._init;try{return _e(je(Ae))}catch{return null}}}return null}var ye=Object.assign,et=0,gt,Ne,Tt,wr,Yn,qn,Gt;function pn(){}pn.__reactDisabledLog=!0;function or(){{if(et===0){gt=console.log,Ne=console.info,Tt=console.warn,wr=console.error,Yn=console.group,qn=console.groupCollapsed,Gt=console.groupEnd;var R={configurable:!0,enumerable:!0,value:pn,writable:!0};Object.defineProperties(console,{info:R,log:R,warn:R,error:R,group:R,groupCollapsed:R,groupEnd:R})}et++}}function ci(){{if(et--,et===0){var R={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:ye({},R,{value:gt}),info:ye({},R,{value:Ne}),warn:ye({},R,{value:Tt}),error:ye({},R,{value:wr}),group:ye({},R,{value:Yn}),groupCollapsed:ye({},R,{value:qn}),groupEnd:ye({},R,{value:Gt})})}et<0&&j("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var Vr=$.ReactCurrentDispatcher,Ir;function Sr(R,ee,ce){{if(Ir===void 0)try{throw Error()}catch($e){var Re=$e.stack.trim().match(/\n( *(at )?)/);Ir=Re&&Re[1]||""}return`
`+Ir+R}}var vn=!1,Xn;{var ar=typeof WeakMap=="function"?WeakMap:Map;Xn=new ar}function sr(R,ee){if(!R||vn)return"";{var ce=Xn.get(R);if(ce!==void 0)return ce}var Re;vn=!0;var $e=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var Ae;Ae=Vr.current,Vr.current=null,or();try{if(ee){var je=function(){throw Error()};if(Object.defineProperty(je.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(je,[])}catch(ln){Re=ln}Reflect.construct(R,[],je)}else{try{je.call()}catch(ln){Re=ln}R.call(je.prototype)}}else{try{throw Error()}catch(ln){Re=ln}R()}}catch(ln){if(ln&&Re&&typeof ln.stack=="string"){for(var Ve=ln.stack.split(`
`),Pt=Re.stack.split(`
`),Ye=Ve.length-1,Mt=Pt.length-1;Ye>=1&&Mt>=0&&Ve[Ye]!==Pt[Mt];)Mt--;for(;Ye>=1&&Mt>=0;Ye--,Mt--)if(Ve[Ye]!==Pt[Mt]){if(Ye!==1||Mt!==1)do if(Ye--,Mt--,Mt<0||Ve[Ye]!==Pt[Mt]){var Rn=`
`+Ve[Ye].replace(" at new "," at ");return R.displayName&&Rn.includes("<anonymous>")&&(Rn=Rn.replace("<anonymous>",R.displayName)),typeof R=="function"&&Xn.set(R,Rn),Rn}while(Ye>=1&&Mt>=0);break}}}finally{vn=!1,Vr.current=Ae,ci(),Error.prepareStackTrace=$e}var Wr=R?R.displayName||R.name:"",Yr=Wr?Sr(Wr):"";return typeof R=="function"&&Xn.set(R,Yr),Yr}function Wt(R,ee,ce){return sr(R,!1)}function kn(R){var ee=R.prototype;return!!(ee&&ee.isReactComponent)}function sn(R,ee,ce){if(R==null)return"";if(typeof R=="function")return sr(R,kn(R));if(typeof R=="string")return Sr(R);switch(R){case p:return Sr("Suspense");case _:return Sr("SuspenseList")}if(typeof R=="object")switch(R.$$typeof){case h:return Wt(R.render);case S:return sn(R.type,ee,ce);case T:{var Re=R,$e=Re._payload,Ae=Re._init;try{return sn(Ae($e),ee,ce)}catch{}}}return""}var $t=Object.prototype.hasOwnProperty,Kt={},lr=$.ReactDebugCurrentFrame;function Er(R){if(R){var ee=R._owner,ce=sn(R.type,R._source,ee?ee.type:null);lr.setExtraStackFrame(ce)}else lr.setExtraStackFrame(null)}function $n(R,ee,ce,Re,$e){{var Ae=Function.call.bind($t);for(var je in R)if(Ae(R,je)){var Ve=void 0;try{if(typeof R[je]!="function"){var Pt=Error((Re||"React class")+": "+ce+" type `"+je+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof R[je]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw Pt.name="Invariant Violation",Pt}Ve=R[je](ee,je,Re,ce,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(Ye){Ve=Ye}Ve&&!(Ve instanceof Error)&&(Er($e),j("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",Re||"React class",ce,je,typeof Ve),Er(null)),Ve instanceof Error&&!(Ve.message in Kt)&&(Kt[Ve.message]=!0,Er($e),j("Failed %s type: %s",ce,Ve.message),Er(null))}}}var jr=Array.isArray;function Cr(R){return jr(R)}function Ln(R){{var ee=typeof Symbol=="function"&&Symbol.toStringTag,ce=ee&&R[Symbol.toStringTag]||R.constructor.name||"Object";return ce}}function Tr(R){try{return Nn(R),!1}catch{return!0}}function Nn(R){return""+R}function ur(R){if(Tr(R))return j("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",Ln(R)),Nn(R)}var It=$.ReactCurrentOwner,kr={key:!0,ref:!0,__self:!0,__source:!0},ki,Ni,ue;ue={};function we(R){if($t.call(R,"ref")){var ee=Object.getOwnPropertyDescriptor(R,"ref").get;if(ee&&ee.isReactWarning)return!1}return R.ref!==void 0}function Ge(R){if($t.call(R,"key")){var ee=Object.getOwnPropertyDescriptor(R,"key").get;if(ee&&ee.isReactWarning)return!1}return R.key!==void 0}function dt(R,ee){if(typeof R.ref=="string"&&It.current&&ee&&It.current.stateNode!==ee){var ce=_e(It.current.type);ue[ce]||(j('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',_e(It.current.type),R.ref),ue[ce]=!0)}}function ft(R,ee){{var ce=function(){ki||(ki=!0,j("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",ee))};ce.isReactWarning=!0,Object.defineProperty(R,"key",{get:ce,configurable:!0})}}function Qt(R,ee){{var ce=function(){Ni||(Ni=!0,j("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",ee))};ce.isReactWarning=!0,Object.defineProperty(R,"ref",{get:ce,configurable:!0})}}var jt=function(R,ee,ce,Re,$e,Ae,je){var Ve={$$typeof:l,type:R,key:ee,ref:ce,props:je,_owner:Ae};return Ve._store={},Object.defineProperty(Ve._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(Ve,"_self",{configurable:!1,enumerable:!1,writable:!1,value:Re}),Object.defineProperty(Ve,"_source",{configurable:!1,enumerable:!1,writable:!1,value:$e}),Object.freeze&&(Object.freeze(Ve.props),Object.freeze(Ve)),Ve};function Kn(R,ee,ce,Re,$e){{var Ae,je={},Ve=null,Pt=null;ce!==void 0&&(ur(ce),Ve=""+ce),Ge(ee)&&(ur(ee.key),Ve=""+ee.key),we(ee)&&(Pt=ee.ref,dt(ee,$e));for(Ae in ee)$t.call(ee,Ae)&&!kr.hasOwnProperty(Ae)&&(je[Ae]=ee[Ae]);if(R&&R.defaultProps){var Ye=R.defaultProps;for(Ae in Ye)je[Ae]===void 0&&(je[Ae]=Ye[Ae])}if(Ve||Pt){var Mt=typeof R=="function"?R.displayName||R.name||"Unknown":R;Ve&&ft(je,Mt),Pt&&Qt(je,Mt)}return jt(R,Ve,Pt,$e,Re,It.current,je)}}var xt=$.ReactCurrentOwner,cr=$.ReactDebugCurrentFrame;function kt(R){if(R){var ee=R._owner,ce=sn(R.type,R._source,ee?ee.type:null);cr.setExtraStackFrame(ce)}else cr.setExtraStackFrame(null)}var Nt;Nt=!1;function di(R){return typeof R=="object"&&R!==null&&R.$$typeof===l}function Hr(){{if(xt.current){var R=_e(xt.current.type);if(R)return`

Check the render method of \``+R+"`."}return""}}function jo(R){{if(R!==void 0){var ee=R.fileName.replace(/^.*[\\\/]/,""),ce=R.lineNumber;return`

Check your code at `+ee+":"+ce+"."}return""}}var ka={};function Fs(R){{var ee=Hr();if(!ee){var ce=typeof R=="string"?R:R.displayName||R.name;ce&&(ee=`

Check the top-level render call using <`+ce+">.")}return ee}}function Ho(R,ee){{if(!R._store||R._store.validated||R.key!=null)return;R._store.validated=!0;var ce=Fs(ee);if(ka[ce])return;ka[ce]=!0;var Re="";R&&R._owner&&R._owner!==xt.current&&(Re=" It was passed a child from "+_e(R._owner.type)+"."),kt(R),j('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',ce,Re),kt(null)}}function Go(R,ee){{if(typeof R!="object")return;if(Cr(R))for(var ce=0;ce<R.length;ce++){var Re=R[ce];di(Re)&&Ho(Re,ee)}else if(di(R))R._store&&(R._store.validated=!0);else if(R){var $e=q(R);if(typeof $e=="function"&&$e!==R.entries)for(var Ae=$e.call(R),je;!(je=Ae.next()).done;)di(je.value)&&Ho(je.value,ee)}}}function Ri(R){{var ee=R.type;if(ee==null||typeof ee=="string")return;var ce;if(typeof ee=="function")ce=ee.propTypes;else if(typeof ee=="object"&&(ee.$$typeof===h||ee.$$typeof===S))ce=ee.propTypes;else return;if(ce){var Re=_e(ee);$n(ce,R.props,"prop",Re,R)}else if(ee.PropTypes!==void 0&&!Nt){Nt=!0;var $e=_e(ee);j("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",$e||"Unknown")}typeof ee.getDefaultProps=="function"&&!ee.getDefaultProps.isReactClassApproved&&j("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function io(R){{for(var ee=Object.keys(R.props),ce=0;ce<ee.length;ce++){var Re=ee[ce];if(Re!=="children"&&Re!=="key"){kt(R),j("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",Re),kt(null);break}}R.ref!==null&&(kt(R),j("Invalid attribute `ref` supplied to `React.Fragment`."),kt(null))}}var Di={};function fi(R,ee,ce,Re,$e,Ae){{var je=se(R);if(!je){var Ve="";(R===void 0||typeof R=="object"&&R!==null&&Object.keys(R).length===0)&&(Ve+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var Pt=jo($e);Pt?Ve+=Pt:Ve+=Hr();var Ye;R===null?Ye="null":Cr(R)?Ye="array":R!==void 0&&R.$$typeof===l?(Ye="<"+(_e(R.type)||"Unknown")+" />",Ve=" Did you accidentally export a JSX literal instead of a component?"):Ye=typeof R,j("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",Ye,Ve)}var Mt=Kn(R,ee,ce,$e,Ae);if(Mt==null)return Mt;if(je){var Rn=ee.children;if(Rn!==void 0)if(Re)if(Cr(Rn)){for(var Wr=0;Wr<Rn.length;Wr++)Go(Rn[Wr],R);Object.freeze&&Object.freeze(Rn)}else j("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else Go(Rn,R)}if($t.call(ee,"key")){var Yr=_e(R),ln=Object.keys(ee).filter(function(Ls){return Ls!=="key"}),Wo=ln.length>0?"{key: someKey, "+ln.join(": ..., ")+": ...}":"{key: someKey}";if(!Di[Yr+Wo]){var Na=ln.length>0?"{"+ln.join(": ..., ")+": ...}":"{}";j(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,Wo,Yr,Na,Yr),Di[Yr+Wo]=!0}}return R===o?io(Mt):Ri(Mt),Mt}}var Gr=fi;Ov.Fragment=o,Ov.jsxDEV=Gr})();_b.exports=Ov;var w=_b.exports;const T2="_arrow_1rhr5_45",k2={arrow:T2},Iv=({open:m})=>w.jsxDEV("div",{className:k2.arrow,"data-open":m,children:w.jsxDEV("svg",{width:"10",height:"10",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[w.jsxDEV("g",{clipPath:"url(#clip0_57_2)",children:w.jsxDEV("path",{d:"M18 10L3 18.6603L3 1.33974L18 10Z",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/ArrowIcon/index.tsx",lineNumber:8,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/ArrowIcon/index.tsx",lineNumber:7,columnNumber:4},void 0),w.jsxDEV("defs",{children:w.jsxDEV("clipPath",{id:"clip0_57_2",children:w.jsxDEV("rect",{width:"20",height:"20",fill:"white"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/ArrowIcon/index.tsx",lineNumber:12,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/ArrowIcon/index.tsx",lineNumber:11,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/ArrowIcon/index.tsx",lineNumber:10,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/ArrowIcon/index.tsx",lineNumber:6,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/ArrowIcon/index.tsx",lineNumber:5,columnNumber:9},void 0),N2="_block_1l63f_45",R2="_head_1l63f_58",D2="_head_icon_1l63f_63",M2="_head_text_1l63f_72",P2="_content_1l63f_79",Ru={block:N2,head:R2,head_icon:D2,head_text:M2,content:P2},zs=m=>{const[l,i]=hf.useState(!m.defaultClose),o=U.useCallback(()=>{m.accordion===!0&&i(!l)},[l,m.accordion]),s=m.bg&&typeof m.bg=="string"&&m.bg||void 0;return w.jsxDEV("div",{className:Ru.block,"data-bg":m.bg!==void 0,"data-nomargin":m.noMargin,"data-no_indent":m.noIndent,style:{backgroundColor:s},children:[w.jsxDEV("div",{className:Ru.head,"data-accordion":m.accordion,"data-open":l,children:[m.accordion&&w.jsxDEV("div",{className:Ru.head_icon,onClick:o,children:w.jsxDEV(Iv,{open:l},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Block/index.tsx",lineNumber:33,columnNumber:75},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Block/index.tsx",lineNumber:33,columnNumber:24},void 0),m.label&&w.jsxDEV("span",{className:Ru.head_text,children:m.label},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Block/index.tsx",lineNumber:34,columnNumber:20},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Block/index.tsx",lineNumber:32,columnNumber:3},void 0),l&&w.jsxDEV("div",{className:Ru.content,"data-open":l,"data-no_indent":m.noIndent,children:m.children},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Block/index.tsx",lineNumber:36,columnNumber:13},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Block/index.tsx",lineNumber:31,columnNumber:9},void 0)},z2="_button_fci8n_45",A2={button:z2},Ta=m=>w.jsxDEV("button",{className:A2.button,onClick:l=>{m.onClick&&m.onClick(l),l.preventDefault()},type:m.type||"button",disabled:m.disabled,children:m.children},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Button/index.tsx",lineNumber:12,columnNumber:9},void 0),O2=U.createContext(null),Nv={didCatch:!1,error:null};class F2 extends U.Component{constructor(l){super(l),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=Nv}static getDerivedStateFromError(l){return{didCatch:!0,error:l}}resetErrorBoundary(){const{error:l}=this.state;if(l!==null){for(var i,o,s=arguments.length,d=new Array(s),c=0;c<s;c++)d[c]=arguments[c];(i=(o=this.props).onReset)===null||i===void 0||i.call(o,{args:d,reason:"imperative-api"}),this.setState(Nv)}}componentDidCatch(l,i){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,l,i)}componentDidUpdate(l,i){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&i.error!==null&&L2(l.resetKeys,s)){var d,c;(d=(c=this.props).onReset)===null||d===void 0||d.call(c,{next:s,prev:l.resetKeys,reason:"keys"}),this.setState(Nv)}}render(){const{children:l,fallbackRender:i,FallbackComponent:o,fallback:s}=this.props,{didCatch:d,error:c}=this.state;let v=l;if(d){const h={error:c,resetErrorBoundary:this.resetErrorBoundary};if(typeof i=="function")v=i(h);else if(o)v=U.createElement(o,h);else if(s!==void 0)v=s;else throw console.error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop"),c}return U.createElement(O2.Provider,{value:{didCatch:d,error:c,resetErrorBoundary:this.resetErrorBoundary}},v)}}function L2(){let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return m.length!==l.length||m.some((i,o)=>!Object.is(i,l[o]))}const U2="_mouseMenu_11xi2_1",B2="_hide_11xi2_10",V2="_menuItem_11xi2_19",I2="_menuItem_inner_11xi2_23",j2="_menuItem_inner_inner_11xi2_26",Du={mouseMenu:U2,hide:B2,menuItem:V2,menuItem_inner:I2,menuItem_inner_inner:j2},Sb=U.createContext(void 0),Eb=U.createContext(null),jv=()=>{const m=U.useContext(Eb);if(m===null)throw new Error("useMouseMenu must be used within a MouseMenuProvider");return m},Qx=()=>{const{itemList:m,containerRef:l,closeAll:i}=jv();return w.jsxDEV("div",{className:Du.mouseMenu,ref:l,children:[m&&m.length>0&&w.jsxDEV("div",{className:Du.hide,onClick:()=>{i&&i()}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/MouseMenu/index.tsx",lineNumber:14,columnNumber:40},void 0),m&&m.map((o,s)=>{const d=o.pos;return w.jsxDEV(Sb.Provider,{value:o,children:w.jsxDEV("div",{className:Du.menuItem,style:{left:0,top:0,transform:`translate(${d.x}px, ${d.y}px)`},children:w.jsxDEV("div",{className:Du.menuItem_inner,children:w.jsxDEV("div",{className:Du.menuItem_inner_inner,"data-direction":o.direction,children:o.elm},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/MouseMenu/index.tsx",lineNumber:29,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/MouseMenu/index.tsx",lineNumber:28,columnNumber:8},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/MouseMenu/index.tsx",lineNumber:27,columnNumber:7},void 0)},o.id,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/MouseMenu/index.tsx",lineNumber:26,columnNumber:13},void 0)})]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/MouseMenu/index.tsx",lineNumber:13,columnNumber:3},void 0)};let H2=0;const G2=()=>{const m=U.useRef(null),l=U.useRef({x:0,y:0}),i=U.useCallback(p=>{l.current.x=p.clientX,l.current.y=p.clientY},[]);U.useEffect(()=>(window.addEventListener("pointermove",i),()=>{window.removeEventListener("pointermove",i)}),[i]);const[o,s]=U.useState([]),d=U.useRef(o);d.current=o;const c=U.useCallback(p=>{d.current=d.current.filter(_=>_.id!==p),s(d.current)},[]),v=U.useCallback(()=>{s([])},[]),h=U.useCallback(p=>{const _=H2++,S={x:l.current.x,y:l.current.y},T=(S.x<window.innerWidth/2?"right":"left")+"-"+(S.y<window.innerHeight/2?"bottom":"top"),C={id:_,elm:p,pos:S,direction:T,close:()=>c(_)};return s([...d.current,C]),C},[c]);return{itemList:o,pushContent:h,closeAll:v,containerRef:m}},W2="_panel_vqys8_45",Y2="_panel_inner_vqys8_51",q2="_content_vqys8_59",Rv={panel:W2,panel_inner:Y2,content:q2},Wn=m=>w.jsxDEV("div",{className:Rv.panel,style:{backgroundColor:m.bgColor},children:w.jsxDEV("div",{className:Rv.panel_inner,children:w.jsxDEV("div",{className:Rv.content,style:{padding:m.noPadding?"0 0":void 0},children:m.children},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Panel/index.tsx",lineNumber:17,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Panel/index.tsx",lineNumber:16,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Panel/index.tsx",lineNumber:15,columnNumber:9},void 0),X2="_panelContainer_xa08o_45",$2="_header_xa08o_54",K2="_header_item_xa08o_60",Q2="_content_xa08o_75",Jd={panelContainer:X2,header:$2,header_item:K2,content:Q2},Fr=m=>{const[l,i]=U.useState(0);let o=m.children||[];return o=Array.isArray(o)?o:[o],w.jsxDEV("div",{className:Jd.panelContainer,children:[w.jsxDEV("div",{className:Jd.header,children:o.map((s,d)=>w.jsxDEV("div",{className:Jd.header_item,onClick:()=>i(d),"data-active":d==l,children:w.jsxDEV("p",{children:s.props.title},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/PanelContainer/index.tsx",lineNumber:25,columnNumber:6},void 0)},d,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/PanelContainer/index.tsx",lineNumber:24,columnNumber:12},void 0))},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/PanelContainer/index.tsx",lineNumber:21,columnNumber:3},void 0),w.jsxDEV("div",{className:Jd.content,children:o[l]},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/PanelContainer/index.tsx",lineNumber:32,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/PanelContainer/index.tsx",lineNumber:20,columnNumber:9},void 0)},Z2="_splitContainer_1a8nd_45",J2="_horizontal_1a8nd_52",eN="_vertical_1a8nd_55",tN="_pane_1a8nd_59",nN="_splitter_1a8nd_65",rN="_dragging_1a8nd_74",Ns={splitContainer:Z2,horizontal:J2,vertical:eN,pane:tN,splitter:nN,dragging:rN},Lo=m=>{const{children:l,direction:i,sizes:o,minSizes:s=[],storageKey:d,splitterSize:c=4,enableTouch:v=!0}=m,h=U.Children.toArray(l),p=h.length,_=U.useRef(null),[S,T]=U.useState(null),[C,D]=U.useState([]);U.useEffect(()=>{if(d){const Z=localStorage.getItem(d);if(Z)try{const I=JSON.parse(Z);if(I.length===p){D(I);return}}catch(I){console.warn("Failed to parse saved sizes:",I)}}const K=o&&o.length===p?o:new Array(p).fill(1);D(K)},[d,o,p]);const F=U.useCallback(K=>{D(K),d&&localStorage.setItem(d,JSON.stringify(K))},[d]),q=U.useCallback((K,Z)=>{K.preventDefault(),T(Z);const I=i==="horizontal"?"touches"in K?K.touches[0].clientX:K.clientX:"touches"in K?K.touches[0].clientY:K.clientY,ne=_.current?i==="horizontal"?_.current.clientWidth:_.current.clientHeight:0,z=c*(p-1),X=ne-z,re=C.map((ze,_e)=>{if(typeof ze=="string")return ze.endsWith("px")?parseFloat(ze):ze.endsWith("%")?parseFloat(ze)/100*X:parseFloat(ze)||0;const ye=_.current&&_.current.children[_e*2];return ye?i==="horizontal"?ye.clientWidth:ye.clientHeight:0}),se=ze=>{const ye=(i==="horizontal"?"touches"in ze?ze.touches[0].clientX:ze.clientX:"touches"in ze?ze.touches[0].clientY:ze.clientY)-I,et=[...re];et[Z]=re[Z]+ye,et[Z+1]=re[Z+1]-ye;const gt=s[Z]||50,Ne=s[Z+1]||50;et[Z]<gt?(et[Z]=gt,et[Z+1]=re[Z]+re[Z+1]-gt):et[Z+1]<Ne&&(et[Z+1]=Ne,et[Z]=re[Z]+re[Z+1]-Ne);const Tt=[...C];Tt[Z]=et[Z],Tt[Z+1]=et[Z+1],F(Tt)},le=()=>{T(null),window.removeEventListener("mousemove",se),window.removeEventListener("mouseup",le),window.removeEventListener("touchmove",se),window.removeEventListener("touchend",le)};window.addEventListener("mousemove",se),window.addEventListener("mouseup",le),v&&(window.addEventListener("touchmove",se),window.addEventListener("touchend",le))},[i,c,p,C,s,F,v]),$=[];h.forEach((K,Z)=>{const I=C[Z]||1,ne={flex:typeof I=="string"?void 0:I,width:typeof I=="string"&&i==="horizontal"?I:void 0,height:typeof I=="string"&&i==="vertical"?I:void 0,minWidth:i==="horizontal"&&s[Z]?s[Z]+"px":void 0,minHeight:i==="vertical"&&s[Z]?s[Z]+"px":void 0};if($.push(w.jsxDEV("div",{className:Ns.pane,style:ne,children:K},`pane-${Z}`,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/SplitContainer/index.tsx",lineNumber:231,columnNumber:4},void 0)),Z<p-1){const z=[Ns.splitter,Ns[i],S===Z?Ns.dragging:""].join(" "),X=i==="horizontal"?{width:c+"px"}:{height:c+"px"};$.push(w.jsxDEV("div",{className:z,style:X,onMouseDown:re=>q(re,Z),onTouchStart:v?re=>q(re,Z):void 0},`splitter-${Z}`,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/SplitContainer/index.tsx",lineNumber:250,columnNumber:5},void 0))}});const j=[Ns.splitContainer,Ns[i]].join(" ");return w.jsxDEV("div",{ref:_,className:j,children:$},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/SplitContainer/index.tsx",lineNumber:270,columnNumber:3},void 0)},Cb=U.createContext(void 0),Hv=(m,l)=>{const[i,o]=U.useState(()=>m?m.serialize():{}),s=l?[...l]:[],d=U.useMemo(()=>s,s);return U.useEffect(()=>{if(m===void 0)return;o(m.serialize());const c=v=>{let h=d.length==0;for(let p=0;p<d.length;p++)if(v.find(_=>_==d[p])){h=!0;break}h&&o(m.serialize())};return m.on("fields/update",c),()=>{m.off("fields/update",c)}},[m,d]),{fields:i}},iN=m=>(Hv(m.target),{target:m.target}),oN=()=>{const m=U.useContext(Cb);if(!m)throw new Error("SerializeFieldViewContext is not defined");return m},aN="_container_1xcsu_45",sN="_label_1xcsu_55",lN="_item_1xcsu_62",Dv={container:aN,label:sN,item:lN},Lr=m=>w.jsxDEV("div",{className:Dv.container,"data-vertical":m.vertical,children:[w.jsxDEV("div",{className:Dv.label,style:{textAlign:m.labelAlign||"left"},"data-vertical":m.vertical,children:m.title},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Label/index.tsx",lineNumber:12,columnNumber:4},void 0),w.jsxDEV("div",{className:Dv.item,"data-vertical":m.vertical,children:m.children},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Label/index.tsx",lineNumber:13,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Label/index.tsx",lineNumber:11,columnNumber:3},void 0),uN=()=>w.jsxDEV("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[w.jsxDEV("rect",{x:"2",y:"10.8486",width:"2.61726",height:"7.84447",transform:"rotate(-44.9331 2 10.8486)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/Check/index.tsx",lineNumber:5,columnNumber:3},void 0),w.jsxDEV("rect",{x:"9.38757",y:"14.5518",width:"2.57272",height:"12.3494",transform:"rotate(-135 9.38757 14.5518)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/Check/index.tsx",lineNumber:6,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/Check/index.tsx",lineNumber:4,columnNumber:9},void 0),cN="_inputBoolean_1xgaw_45",dN="_input_1xgaw_45",fN="_check_1xgaw_60",Mv={inputBoolean:cN,input:dN,check:fN},mN=({onChange:m,...l})=>w.jsxDEV("div",{className:Mv.inputBoolean,onClick:i=>{i.stopPropagation()},children:w.jsxDEV("label",{children:[w.jsxDEV("input",{className:Mv.input,type:"checkbox",checked:l.checked,disabled:l.disabled,readOnly:l.readOnly,onChange:i=>{l.readOnly||m&&m(i.target.checked)}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Input/InputCheckBox/index.tsx",lineNumber:22,columnNumber:4},void 0),w.jsxDEV("div",{className:Mv.check,"data-read_only":l.readOnly,children:l.checked&&w.jsxDEV(uN,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Input/InputCheckBox/index.tsx",lineNumber:36,columnNumber:23},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Input/InputCheckBox/index.tsx",lineNumber:35,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Input/InputCheckBox/index.tsx",lineNumber:21,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Input/InputCheckBox/index.tsx",lineNumber:16,columnNumber:9},void 0),hN="_input_1rofd_45",Zx={input:hN},Tb=m=>{const l=U.useRef(!1),i=U.useRef();i.current=m.onChange;const o=U.useRef();o.current=m.value;const s=U.useCallback(v=>{const h=o.current;if(l.current===!1)return;const p=v.movementX;if(typeof h=="number"){const _=p*.05*(m.step||1);i.current&&i.current(h+_),v.stopPropagation()}v.preventDefault()},[m.step]),d=U.useCallback(v=>{l.current=!0;const h=()=>{l.current=!1,window.removeEventListener("pointerup",h),window.removeEventListener("pointermove",s)};window.addEventListener("pointerup",h),window.addEventListener("pointermove",s)},[s]),c=Number((m.value||0).toFixed(m.step??3));return w.jsxDEV("div",{className:Zx.inputNumber,children:w.jsxDEV("input",{className:Zx.input,type:"number",value:c,disabled:m.disabled,readOnly:m.readOnly,"data-lo":m.readOnly,step:m.step||1,min:m.min,max:m.max,onChange:v=>{var h;(h=m.onChange)==null||h.call(m,Number(v.target.value))},onPointerDown:d},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Input/InputNumber/index.tsx",lineNumber:74,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Input/InputNumber/index.tsx",lineNumber:73,columnNumber:9},void 0)},pN="_inputSelect_d7lo3_45",vN="_input_d7lo3_45",ef={inputSelect:pN,input:vN},gN=({onChange:m,value:l,...i})=>{if(i.readOnly)return w.jsxDEV("div",{className:ef.inputSelect,children:w.jsxDEV("input",{className:ef.input,value:l,readOnly:!0},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Input/InputSelect/index.tsx",lineNumber:21,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Input/InputSelect/index.tsx",lineNumber:20,columnNumber:10},void 0);let o=i.selectList;return typeof o=="function"&&(o=o()),w.jsxDEV("div",{className:ef.inputSelect,children:w.jsxDEV("select",{className:ef.input,onChange:s=>{m&&m(s.target.value)},value:l,children:o.map((s,d)=>{let c="",v="";return typeof s=="string"?(c=s,v=s):(c=s.label,v=s.value),w.jsxDEV("option",{value:v,children:c},d,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Input/InputSelect/index.tsx",lineNumber:61,columnNumber:12},void 0)})},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Input/InputSelect/index.tsx",lineNumber:35,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Input/InputSelect/index.tsx",lineNumber:34,columnNumber:9},void 0)},yN="_input_ndjbn_45",Jx={input:yN},Fv=({onChange:m,value:l,...i})=>{const[o,s]=U.useState(l),d=U.useCallback(()=>{m&&m(o)},[o,m]);return U.useEffect(()=>{s(l)},[l]),w.jsxDEV("div",{className:Jx.container,children:w.jsxDEV("input",{className:Jx.input,type:"text",value:o,placeholder:i.readOnly?"-":"",disabled:i.disabled,readOnly:i.readOnly,"data-lo":i.readOnly,onChange:c=>{s(c.target.value)},onBlur:c=>{d()},onKeyDown:c=>{c.key==="Enter"&&c.currentTarget.blur()}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Input/InputText/index.tsx",lineNumber:35,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Input/InputText/index.tsx",lineNumber:34,columnNumber:9},void 0)},xN={},bN=["x","y","z","w"],kb=({onChange:m,disabled:l,...i})=>{const o=U.useRef();o.current=i.value;const s=U.useCallback((c,v)=>{if(m&&o.current){const h={};for(let p=0;p<o.current.length;p++)h[p]=o.current[p];h[c]=v,m(h)}},[m]),d=[];for(let c=0;c<i.value.length;c++)d.push(w.jsxDEV(Lr,{title:bN[c],labelAlign:"right",children:w.jsxDEV(Tb,{disabled:l,value:i.value[c],step:i.step,onChange:v=>{s(c,v)}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Vector/index.tsx",lineNumber:49,columnNumber:5},void 0)},c,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Vector/index.tsx",lineNumber:48,columnNumber:4},void 0));return w.jsxDEV("div",{className:xN.vector,children:d.map(c=>c)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Vector/index.tsx",lineNumber:59,columnNumber:9},void 0)},ui=m=>{let l=null;const i=m.onChange,o=m.value,s=m.format,d=c=>{i&&i(c)};if(o==null)return null;if(s&&(s.type=="vector"&&Array.isArray(o)?l=w.jsxDEV(kb,{value:o,onChange:d},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Value/index.tsx",lineNumber:48,columnNumber:15},void 0):s.type=="select"&&(l=w.jsxDEV(gN,{value:o,onChange:d,selectList:s.list},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Value/index.tsx",lineNumber:52,columnNumber:15},void 0))),!l)if(typeof o=="number")l=w.jsxDEV(Tb,{...m,value:o,onChange:d},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Value/index.tsx",lineNumber:62,columnNumber:15},void 0);else if(typeof o=="string")l=w.jsxDEV(Fv,{...m,value:o,onChange:d},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Value/index.tsx",lineNumber:66,columnNumber:15},void 0);else if(typeof o=="boolean")l=w.jsxDEV(mN,{...m,checked:o,onChange:d},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Value/index.tsx",lineNumber:70,columnNumber:15},void 0);else if(typeof o=="function"){const c=m.label||"Run";l=w.jsxDEV(Ta,{onClick:()=>{o()},children:c},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Value/index.tsx",lineNumber:76,columnNumber:15},void 0)}else l=w.jsxDEV(Fv,{...m,value:JSON.stringify(o),onChange:()=>{}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Value/index.tsx",lineNumber:86,columnNumber:15},void 0);return l},_N="_container_dlq1w_1",wN={container:_N},SN=m=>{const l=[],i=m.value,o=m.format,s=(o==null?void 0:o.type)=="array"?o.labels:void 0;if(i===void 0)return null;for(let d=0;d<i.length;d++){const c=i[d];let v=d.toString();s&&(v+="/ "+s(c,d)),l.push(w.jsxDEV(Lr,{title:v,children:w.jsxDEV(ui,{...m,value:c,onChange:h=>{const p=i.concat();p[d]=h,m.onChange&&m.onChange(p)}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/ValueArray/index.tsx",lineNumber:32,columnNumber:5},void 0)},d,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/ValueArray/index.tsx",lineNumber:31,columnNumber:4},void 0))}return w.jsxDEV("div",{className:wN.container,children:l},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/ValueArray/index.tsx",lineNumber:50,columnNumber:9},void 0)},EN=m=>{const{target:l}=oN(),i=m.field.value,o=typeof i,s=m.field.opt,d=s==null?void 0:s.format,c=(s==null?void 0:s.label)||m.path.split("/").pop(),v=d&&d.type=="vector";let h=null;if(Array.isArray(i))(d==null?void 0:d.type)=="vector"?h=w.jsxDEV(kb,{value:i,...s,onChange:p=>{l.setField(m.path,p)}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:26,columnNumber:15},void 0):h=w.jsxDEV(SN,{value:i,...s,onChange:p=>{l.setField(m.path,p)}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:35,columnNumber:15},void 0);else if(h=w.jsxDEV(ui,{value:i,...s,onChange:p=>{l.setField(m.path,p)}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:45,columnNumber:14},void 0),o==="function")return h;return w.jsxDEV(Lr,{title:c,vertical:v,children:h},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:59,columnNumber:9},void 0)},CN="_container_3297g_1",TN="_field_3297g_5",kN="_block_3297g_9",eb={container:CN,field:TN,block:kN},Nb=m=>{const l=[],i=Object.keys(m.fields.childs);for(let o=0;o<i.length;o++){const s=i[o],d=m.fields.childs[s],{opt:c}=d;let v=!1;if(c&&(typeof c.hidden=="function"?v=c.hidden(d.type=="value"?d.value:null):v=c.hidden||!1),v)continue;const h="field"+s,p=(m.basePath?m.basePath+"/":"")+s;let _=null;d.type==="value"?_=w.jsxDEV(EN,{path:p,field:d},h,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:46,columnNumber:10},void 0):_=w.jsxDEV("div",{className:eb.block,children:w.jsxDEV(zs,{accordion:!0,label:s,children:w.jsxDEV(Nb,{fields:d,basePath:p},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:52,columnNumber:6},void 0)},h,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:51,columnNumber:5},void 0)},h,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:50,columnNumber:10},void 0),_&&l.push(_)}return w.jsxDEV("div",{className:eb.container,children:l},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:66,columnNumber:9},void 0)},Rb=m=>{const l=iN(m),i=l.target.serializeToDirectory();return w.jsxDEV(Cb.Provider,{value:l,children:w.jsxDEV(Nb,{fields:i},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/SerializeFieldView/index.tsx",lineNumber:18,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/SerializeFieldView/index.tsx",lineNumber:17,columnNumber:9},void 0)},Db=U.createContext(null),no=()=>{const m=U.useContext(Db);if(m===null)throw new Error("useEditor must be used within a EditorProvider");return m},Vt=(m,l)=>{const i=d=>{m==null||m.setField(l,d)},{fields:o}=Hv(m,[l]);return[o&&o[l],i]};class Mb{constructor(l){y(this,"gl");y(this,"extDisJointTimerQuery");this.gl=l,this.gl.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,!0),this.gl.getExtension("EXT_color_buffer_float"),this.gl.getExtension("EXT_color_buffer_half_float"),this.gl.getExtension("OES_texture_float_linear"),this.extDisJointTimerQuery=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")}}class NN{constructor(l,i){y(this,"gl");y(this,"vao");y(this,"program");y(this,"indexBuffer");y(this,"attributes");y(this,"vertCount");y(this,"indexCount");y(this,"instanceCount");y(this,"attribPointerDiect");y(this,"attribTypeDict");this.gl=l,this.program=i,this.vao=this.gl.createVertexArray(),this.attributes=new Map,this.indexBuffer=null,this.vertCount=0,this.indexCount=0,this.instanceCount=0,this.attribPointerDiect=new Map([["Float32Array",this.gl.vertexAttribPointer.bind(this.gl)],["Int32Array",this.gl.vertexAttribIPointer.bind(this.gl)],["Int16Array",this.gl.vertexAttribIPointer.bind(this.gl)],["Int8Array",this.gl.vertexAttribIPointer.bind(this.gl)],["UInt32Array",this.gl.vertexAttribIPointer.bind(this.gl)],["UInt16Array",this.gl.vertexAttribIPointer.bind(this.gl)],["UInt8Array",this.gl.vertexAttribIPointer.bind(this.gl)]]),this.attribTypeDict=new Map([["Float32Array",this.gl.FLOAT],["Int32Array",this.gl.INT],["Int16Array",this.gl.SHORT],["Int8Array",this.gl.BYTE],["UInt32Array",this.gl.UNSIGNED_INT],["UInt16Array",this.gl.UNSIGNED_SHORT],["UInt8Array",this.gl.UNSIGNED_BYTE]])}calcVertCount(){this.vertCount=0,this.instanceCount=0,this.attributes.forEach((l,i)=>{l.instanceDivisor==null&&i!="index"&&(this.vertCount=Math.max(this.vertCount,l.count)),l.instanceDivisor!==void 0&&l.instanceDivisor>0&&(this.instanceCount==0?this.instanceCount=l.count:this.instanceCount=Math.min(this.instanceCount,l.count))})}setAttribute(l,i,o,s){if(i.array===null)return;const d={buffer:i,size:o,count:i.array?i.array.length/o:0,location:void 0,...s};this.attributes.set(l,d),this.gl.bindVertexArray(this.vao),d.location=this.gl.getAttribLocation(this.program,l);const c=this.attribPointerDiect.get(i.array.constructor.name),v=this.attribTypeDict.get(i.array.constructor.name);if(d.location>-1)if(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,d.buffer.buffer),d.size==16){for(let h=0;h<4;h++)this.gl.enableVertexAttribArray(d.location+h);for(let h=0;h<4;h++)this.gl.vertexAttribPointer(d.location+h,4,v,!1,64,16*h);if(d.instanceDivisor!==void 0)for(let h=0;h<4;h++)this.gl.vertexAttribDivisor(d.location+h,d.instanceDivisor)}else this.gl.enableVertexAttribArray(d.location),c(d.location,d.size,v,!1,0,0),d.instanceDivisor!==void 0&&this.gl.vertexAttribDivisor(d.location,d.instanceDivisor);return this.gl.bindVertexArray(null),this.calcVertCount(),this}removeAttribute(l){return this.attributes.delete(l),this.calcVertCount(),this}setIndex(l){this.indexBuffer=l,this.vao&&(this.gl.bindVertexArray(this.vao),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer?this.indexBuffer.buffer:null),this.gl.bindVertexArray(null),this.indexBuffer&&this.indexBuffer.array&&(this.indexCount=this.indexBuffer.array.length))}use(l){this.gl.bindVertexArray(this.vao),l&&l(this),this.gl.bindVertexArray(null)}getVAO(){return this.vao}dispose(){this.attributes.forEach(l=>{l.buffer.dispose()})}}class Pb{constructor(l){y(this,"gl");y(this,"program");y(this,"vao");y(this,"uniforms");this.gl=l,this.program=this.gl.createProgram(),this.vao=new Map,this.uniforms=new Map}setShader(l,i,o){if(this.program===null){console.warn("program is null.");return}const s=this.createShader(l,this.gl.VERTEX_SHADER),d=this.createShader(i,this.gl.FRAGMENT_SHADER);if(!(!s||!d))return this.gl.attachShader(this.program,s),this.gl.attachShader(this.program,d),o&&o.transformFeedbackVaryings&&this.gl.transformFeedbackVaryings(this.program,o.transformFeedbackVaryings,this.gl.SEPARATE_ATTRIBS),this.gl.linkProgram(this.program),this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS)||console.error("program link error:",this.gl.getProgramInfoLog(this.program)),this}createShader(l,i){const o=this.gl.createShader(i);if(!o)return null;if(this.gl.shaderSource(o,l),this.gl.compileShader(o),this.gl.getShaderParameter(o,this.gl.COMPILE_STATUS))return o;{const s=this.gl.getShaderInfoLog(o);if(s){const d=l.split(`
`),c=s.matchAll(/ERROR: 0:(\d+)/g);Array.from(c).forEach((v,h)=>{const p=Number(v[1]),_=Math.max(0,p-5),S=Math.min(d.length,p+2);let T=s.split(`
`)[h]+`
`;d.forEach((C,D)=>{_<=D&&D<=S&&(T+=`${D+1}: ${C}
`)}),console.error(T)})}}}setUniform(l,i,o){const s=this.uniforms.get(l);if(s)if(s.type=i,s.value=o,s.cache){for(let d=0;d<o.length;d++)if(s.cache[d]!==o[d]){s.needsUpdate=!0;break}}else s.needsUpdate=!0;else this.uniforms.set(l,{value:o,type:i,location:null,needsUpdate:!0}),this.updateUniformLocations()}updateUniformLocations(l){this.program&&this.uniforms.forEach((i,o)=>{(i.location===null||l)&&(i.location=this.gl.getUniformLocation(this.program,o))})}uploadUniforms(){this.uniforms.forEach(l=>{l.needsUpdate&&l.location!==null&&(/Matrix[2|3|4]fv/.test(l.type)?this.gl["uniform"+l.type](l.location,!1,l.value):/[1|2|3|4][f|i]$/.test(l.type)?this.gl["uniform"+l.type](l.location,...l.value):this.gl["uniform"+l.type](l.location,l.value),l.cache=l.value.concat(),l.needsUpdate=!1)})}resetUniforms(){this.uniforms.forEach(l=>{if(l.location===null)return;let i=1;l.type.includes("Matrix4")?i=16:l.type.includes("Matrix3")?i=9:l.type.includes("Matrix2")||l.type.includes("4")?i=4:l.type.includes("3")?i=3:l.type.includes("2")&&(i=2),l.value=new Array(i).fill(0),l.needsUpdate=!0})}getVAO(l="_"){if(!this.program)return null;let i=this.vao.get(l);return i||(i=new NN(this.gl,this.program),this.vao.set(l,i),i)}use(l){this.program&&(this.gl.useProgram(this.program),l&&l(this),this.gl.useProgram(null))}getProgram(){return this.program}dispose(){this.vao.forEach(l=>{l.dispose()}),this.vao.clear(),this.gl.deleteProgram(this.program)}}class df{constructor(l){y(this,"gl");y(this,"buffer");y(this,"array");this.gl=l,this.buffer=this.gl.createBuffer(),this.array=null}setData(l,i="vbo",o){const s=i=="vbo"?this.gl.ARRAY_BUFFER:this.gl.ELEMENT_ARRAY_BUFFER;return this.gl.bindBuffer(s,this.buffer),this.gl.bufferData(s,l,o||this.gl.STATIC_DRAW),this.gl.bindBuffer(s,null),this.array=l,this}dispose(){this.gl.deleteBuffer(this.buffer)}}class Q{constructor(l,i,o,s){y(this,"x");y(this,"y");y(this,"z");y(this,"w");this.x=0,this.y=0,this.z=0,this.w=0,this.set(l,i,o,s)}get isVector(){return!0}set(l,i,o,s){return this.x=l??0,this.y=i??0,this.z=o??0,this.w=s??0,this}setScalar(l){return this.x=l,this.y=l,this.z=l,this.w=l,this}setFromArray(l){return this.x=l[0]||0,this.y=l[1]||0,this.z=l[2]||0,this.w=l[3]||0,this}add(l){return typeof l=="number"?(this.x+=l,this.y+=l,this.z+=l,this.w+=l):(this.x+=l.x??0,this.y+=l.y??0,this.z+=l.z??0,this.w+=l.w??0),this}sub(l){return typeof l=="number"?(this.x-=l,this.y-=l,this.z-=l):(this.x-=l.x??0,this.y-=l.y??0,this.z-=l.z??0,this.w-=l.w??0),this}multiply(l){return typeof l=="number"?(this.x*=l,this.y*=l,this.z*=l,this.w*=l):(this.x*=l.x,this.y*=l.y,this.z*=l.z,this.w*=l.w),this}divide(l){return typeof l=="number"?(this.x/=l,this.y/=l,this.z/=l,this.w/=l):(this.x/=l.x,this.y/=l.y,this.z/=l.z,this.w/=l.w),this}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}distanceTo(l){const i=this.x-l.x,o=this.y-l.y,s=this.z-l.z;return Math.sqrt(i*i+o*o+s*s)}normalize(){const l=this.length()||1;return this.x/=l,this.y/=l,this.z/=l,this}cross(l){const i=this.x,o=this.y,s=this.z,d=l.x,c=l.y,v=l.z;return this.x=o*v-s*c,this.y=s*d-i*v,this.z=i*c-o*d,this}dot(l){return this.x*l.x+this.y*l.y+this.z*l.z}applyMatrix3(l){const i=l.elm,o=i[0],s=i[1],d=i[2],c=i[4],v=i[5],h=i[6],p=i[8],_=i[9],S=i[10],T=this.x*o+this.y*c+this.z*p,C=this.x*s+this.y*v+this.z*_,D=this.x*d+this.y*h+this.z*S;return this.x=T,this.y=C,this.z=D,this.w=0,this}applyMatrix4(l){const i=l.elm,o=i[0],s=i[1],d=i[2],c=i[3],v=i[4],h=i[5],p=i[6],_=i[7],S=i[8],T=i[9],C=i[10],D=i[11],F=i[12],q=i[13],$=i[14],j=i[15],K=this.x*o+this.y*v+this.z*S+this.w*F,Z=this.x*s+this.y*h+this.z*T+this.w*q,I=this.x*d+this.y*p+this.z*C+this.w*$,ne=this.x*c+this.y*_+this.z*D+this.w*j;return this.x=K,this.y=Z,this.z=I,this.w=ne,this}applyMatrix4AsPosition(l){const i=this.w;return this.w=1,this.applyMatrix4(l),this.w=i,this}applyMatrix4AsDirection(l){const i=this.w;return this.w=0,this.applyMatrix4(l),this.w=i,this}floor(){this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w)}lerp(l,i){return this.x=this.x+(l.x-this.x)*i,this.y=this.y+(l.y-this.y)*i,this.z=this.z+(l.z-this.z)*i,this.w=this.w+(l.w-this.w)*i,this}copy(l){return this.x=l.x??0,this.y=l.y??0,this.z=l.z??0,this.w=l.w??0,this}clone(){return new Q(this.x,this.y,this.z,this.w)}getElm(l){return l=="vec2"?[this.x,this.y]:l=="vec3"?[this.x,this.y,this.z]:[this.x,this.y,this.z,this.w]}}class rt{constructor(l){y(this,"unit");y(this,"image");y(this,"size");y(this,"gl");y(this,"glTex");y(this,"textureType");y(this,"_setting");this.gl=l,this.image=null,this.unit=0,this.size=new Q,this.glTex=this.gl.createTexture(),this._setting={type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.RGBA,format:this.gl.RGBA,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST,generateMipmap:!1,wrapS:this.gl.CLAMP_TO_EDGE,wrapT:this.gl.CLAMP_TO_EDGE},this.textureType=l.TEXTURE_2D}get isTexture(){return!0}setting(l){return this._setting={...this._setting,...l},this.attach(this.image),this}attach(l){if(this.image=l,this.gl.bindTexture(this.textureType,this.glTex),this.image){const i=Array.isArray(this.image)?this.image[0]:this.image;this.size.set(i.width,i.height),i instanceof HTMLImageElement||i instanceof HTMLCanvasElement?this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this._setting.format,this._setting.type,i):this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,i.width,i.height,0,this._setting.format,this._setting.type,i.data||null)}else this.size.set(1,1),this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this.size.x,this.size.y,0,this._setting.format,this._setting.type,null);return this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}activate(l){return this.gl.activeTexture(this.gl.TEXTURE0+l),this.gl.bindTexture(this.textureType,this.glTex),this.unit=l,this}load(l,i){const o=new Image;return o.onload=()=>{this.attach(o),i&&i()},o.src=l,this}getTexture(){return this.glTex}get type(){return this.textureType}dispose(){this.gl.deleteTexture(this.glTex)}}class Et{constructor(l,i){y(this,"size");y(this,"gl");y(this,"glFrameBuffer");y(this,"textures");y(this,"depthTexture");y(this,"textureAttachmentList");this.gl=l,this.size=new Q(1,1),this.glFrameBuffer=this.gl.createFramebuffer(),this.depthTexture=null,this.textures=[],this.textureAttachmentList=[],(!i||!i.disableDepthBuffer)&&this.setDepthTexture(new rt(this.gl).setting({internalFormat:this.gl.DEPTH_COMPONENT32F,format:this.gl.DEPTH_COMPONENT,type:this.gl.FLOAT,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST}))}setDepthTexture(l){this.depthTexture=l,this.depthTexture&&(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.getTexture(),0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null))}setTexture(l){return this.textures=l,this.textureAttachmentList=[],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textures.forEach((i,o)=>{i.attach({width:this.size.x,height:this.size.y});const s=this.gl.COLOR_ATTACHMENT0+o;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,s,this.gl.TEXTURE_2D,i.getTexture(),0),this.textureAttachmentList.push(s)}),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this}setSize(l,i){return typeof l=="number"?(this.size.x=l,i!==void 0&&(this.size.y=i)):this.size.copy(l),this.size.floor(),this.setTexture(this.textures),this.textures.forEach(o=>{o.attach({width:this.size.x,height:this.size.y})}),this.depthTexture&&this.depthTexture.attach({width:this.size.x,height:this.size.y}),this}getFrameBuffer(){return this.glFrameBuffer}dispose(){this.gl.deleteFramebuffer(this.glFrameBuffer)}}class RN extends Et{constructor(i,o){super(i,o);y(this,"cubeTarget");y(this,"textures");y(this,"currentFace");this.textures=[],this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z],this.currentFace=this.cubeTarget[0]}setTexture(i){return this.textures=i,this.textureAttachmentList=[],this.textures.forEach(o=>{o.attach({width:this.size.x,height:this.size.y})}),this}face(i){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textureAttachmentList=[],this.textures.forEach((o,s)=>{const d=this.gl.COLOR_ATTACHMENT0+s;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,d,this.cubeTarget[i],o.getTexture(),0),this.textureAttachmentList.push(d)}),this.currentFace=this.cubeTarget[i],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}}class DN extends rt{constructor(i){super(i);y(this,"cubeTarget");this.textureType=i.TEXTURE_CUBE_MAP,this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]}attach(i){if(this.image=i,this.gl.bindTexture(this.textureType,this.glTex),this.image)for(let o=0;o<6;o++){const s=Array.isArray(this.image)?this.image[o]:this.image;this.size.set(s.width,s.height),s instanceof HTMLImageElement||s instanceof HTMLCanvasElement?this.gl.texImage2D(this.cubeTarget[o],0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,s):this.gl.texImage2D(this.cubeTarget[o],0,this._setting.internalFormat,s.width,s.height,0,this._setting.format,this._setting.type,s.data||null)}return this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}}class MN{constructor(l){y(this,"gl");y(this,"transformFeedback");y(this,"feedbackBuffer");this.gl=l,this.transformFeedback=this.gl.createTransformFeedback(),this.feedbackBuffer=new Map}bind(l){this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK,this.transformFeedback),l&&l(),this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK,null)}setBuffer(l,i,o){this.feedbackBuffer.set(l,{buffer:i,varyingIndex:o})}use(l){this.bind(()=>{this.feedbackBuffer.forEach(i=>{this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER,i.varyingIndex,i.buffer.buffer)}),l&&l(this),this.feedbackBuffer.forEach(i=>{this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER,i.varyingIndex,null)})})}}class nt{constructor(l){y(this,"elm");this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],l&&this.set(l)}identity(){return this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],this}clone(){return new nt().copy(this)}copy(l){return this.set(l.elm),this}perspective(l,i,o,s){const d=1/Math.tan(l*Math.PI/360),c=s-o;return this.elm=[d/i,0,0,0,0,d,0,0,0,0,-(s+o)/c,-1,0,0,-(s*o*2)/c,0],this}orthographic(l,i,o,s){return this.elm=[2/l,0,0,0,0,2/i,0,0,0,0,-2/(s-o),0,0,0,-(s+o)/(s-o),1],this}lookAt(l,i,o){const s=l.clone().sub(i).normalize(),d=o.clone().cross(s).normalize(),c=s.clone().cross(d).normalize();return this.elm=[d.x,d.y,d.z,0,c.x,c.y,c.z,0,s.x,s.y,s.z,0,l.x,l.y,l.z,1],this}inverse(){const l=this.elm[0],i=this.elm[1],o=this.elm[2],s=this.elm[3],d=this.elm[4],c=this.elm[5],v=this.elm[6],h=this.elm[7],p=this.elm[8],_=this.elm[9],S=this.elm[10],T=this.elm[11],C=this.elm[12],D=this.elm[13],F=this.elm[14],q=this.elm[15],$=l*c-i*d,j=l*v-o*d,K=l*h-s*d,Z=i*v-o*c,I=i*h-s*c,ne=o*h-s*v,z=p*D-_*C,X=p*F-S*C,re=p*q-T*C,se=_*F-S*D,le=_*q-T*D,ze=S*q-T*F,_e=$*ze-j*le+K*se+Z*re-I*X+ne*z,ye=1/_e;return _e==0?this.identity():(this.elm[0]=(c*ze-v*le+h*se)*ye,this.elm[1]=(-i*ze+o*le-s*se)*ye,this.elm[2]=(D*ne-F*I+q*Z)*ye,this.elm[3]=(-_*ne+S*I-T*Z)*ye,this.elm[4]=(-d*ze+v*re-h*X)*ye,this.elm[5]=(l*ze-o*re+s*X)*ye,this.elm[6]=(-C*ne+F*K-q*j)*ye,this.elm[7]=(p*ne-S*K+T*j)*ye,this.elm[8]=(d*le-c*re+h*z)*ye,this.elm[9]=(-l*le+i*re-s*z)*ye,this.elm[10]=(C*I-D*K+q*$)*ye,this.elm[11]=(-p*I+_*K-T*$)*ye,this.elm[12]=(-d*se+c*X-v*z)*ye,this.elm[13]=(l*se-i*X+o*z)*ye,this.elm[14]=(-C*Z+D*j-F*$)*ye,this.elm[15]=(p*Z-_*j+S*$)*ye,this)}transpose(){const l=this.elm[0],i=this.elm[1],o=this.elm[2],s=this.elm[3],d=this.elm[4],c=this.elm[5],v=this.elm[6],h=this.elm[7],p=this.elm[8],_=this.elm[9],S=this.elm[10],T=this.elm[11],C=this.elm[12],D=this.elm[13],F=this.elm[14],q=this.elm[15];return this.elm[0]=l,this.elm[1]=d,this.elm[2]=p,this.elm[3]=C,this.elm[4]=i,this.elm[5]=c,this.elm[6]=_,this.elm[7]=D,this.elm[8]=o,this.elm[9]=v,this.elm[10]=S,this.elm[11]=F,this.elm[12]=s,this.elm[13]=h,this.elm[14]=T,this.elm[15]=q,this}set(l){for(let i=0;i<this.elm.length;i++)this.elm[i]=l[i]??0;return this}setFromTransform(l,i,o){return this.identity(),l&&this.applyPosition(l),i&&this.applyQuaternion(i),o&&this.applyScale(o),this}applyPosition(l){return this.matmul([1,0,0,0,0,1,0,0,0,0,1,0,l.x,l.y,l.z,1]),this}applyQuaternion(l){const i=l.x,o=l.y,s=l.z,d=l.w,c=i*i,v=o*o,h=s*s,p=d*d,_=i*o,S=i*s,T=i*d,C=o*s,D=o*d,F=s*d;return this.matmul([c-v-h+p,2*(_+F),2*(S-D),0,2*(_-F),-c+v-h+p,2*(C+T),0,2*(S+D),2*(C-T),-c-v+h+p,0,0,0,0,1]),this}applyScale(l){return this.matmul([l.x,0,0,0,0,l.y,0,0,0,0,l.z,0,0,0,0,1]),this}matmul(l){const i=new Array(16);for(let o=0;o<4;o++)for(let s=0;s<4;s++){let d=0;for(let c=0;c<4;c++)d+=this.elm[c*4+s]*l[c+o*4];i[s+o*4]=d}this.elm=i}setRotationFromDirection(l,i){{i=i||{x:0,y:1,z:0};const o=new Q().copy(l).normalize(),s=new Q().copy(i).cross(o).normalize();s.length()==0&&(o.x+=.001,s.copy(i).cross(o).normalize());const d=o.clone().cross(s).normalize();return this.set([s.x,s.y,s.z,0,d.x,d.y,d.z,0,o.x,o.y,o.z,0,0,0,0,1]),this}}makeRotationAxis(l,i){{const o=Math.cos(i),s=Math.sin(i),d=1-o,c=l.x,v=l.y,h=l.z,p=d*c,_=d*v;this.set([p*c+o,p*v-s*h,p*h+s*v,0,p*v+s*h,_*v+o,_*h-s*c,0,p*h-s*v,_*h+s*c,d*h*h+o,0,0,0,0,1])}return this}multiply(l){return this.matmul(l.elm),this}preMultiply(l){const i=this.copyToArray([]);return this.set(l.elm),this.matmul(i),this}decompose(l,i,o){l&&(l.x=this.elm[12],l.y=this.elm[13],l.z=this.elm[14]),i&&i.setFromMatrix(this)}copyToArray(l){l.length=this.elm.length;for(let i=0;i<this.elm.length;i++)l[i]=this.elm[i];return l}}class Ms extends Q{constructor(i,o,s,d){super(i,o,s,0);y(this,"order");this.order=d||"XYZ"}copy(i){return"order"in i&&(this.order=i.order),super.copy(i)}setFromQuaternion(i){const o=new nt().applyQuaternion(i);return this.setFromRotationMatrix(o),this}setFromRotationMatrix(i){const o=i.elm,s=o[0],d=o[4],c=o[8];o[1];const v=o[5],h=o[9];o[2];const p=o[6],_=o[10];return this.order="XYZ",this.y=Math.asin(Math.min(1,Math.max(-1,c))),Math.abs(c)<.9999999?(this.x=Math.atan2(-h,_),this.z=Math.atan2(-d,s)):(this.x=Math.atan2(p,v),this.z=0),this}}class Bu{constructor(l,i,o,s){y(this,"x");y(this,"y");y(this,"z");y(this,"w");y(this,"updated",!1);this.x=l||0,this.y=i||0,this.z=o||0,this.w=s||1}set(l,i,o,s){this.x=l??this.x,this.y=i??this.y,this.z=o??this.z,this.w=s??this.w,this.updated=!0}setFromEuler(l,i){const o=i||("order"in l?l.order:"XYZ"),s=Math.sin(l.x/2),d=Math.sin(l.y/2),c=Math.sin(l.z/2),v=Math.cos(l.x/2),h=Math.cos(l.y/2),p=Math.cos(l.z/2);return o=="XYZ"?(this.x=v*d*c+s*h*p,this.y=-s*h*c+v*d*p,this.z=v*h*c+s*d*p,this.w=-s*d*c+v*h*p):o=="XZY"?(this.x=-v*d*c+s*h*p,this.y=v*d*p-s*h*c,this.z=s*d*p+v*h*c,this.w=s*d*c+v*h*p):o=="YZX"?(this.x=s*h*p+v*d*c,this.y=s*h*c+v*d*p,this.z=-s*d*p+v*h*c,this.w=-s*d*c+v*h*p):o=="ZYX"&&(this.x=s*h*p-v*d*c,this.y=s*h*c+v*d*p,this.z=-s*d*p+v*h*c,this.w=s*d*c+v*h*p),this.updated=!0,this}setFromMatrix(l){const i=l.elm,o=i[0]+i[5]+i[10];let s,d,c,v;if(o>0){const p=Math.sqrt(o+1)*2;v=.25*p,s=(i[6]-i[9])/p,d=(i[8]-i[2])/p,c=(i[1]-i[4])/p}else if(i[0]>i[5]&&i[0]>i[10]){const p=Math.sqrt(1+i[0]-i[5]-i[10])*2;v=(i[6]-i[9])/p,s=.25*p,d=(i[1]+i[4])/p,c=(i[2]+i[8])/p}else if(i[5]>i[10]){const p=Math.sqrt(1+i[5]-i[0]-i[10])*2;v=(i[8]-i[2])/p,s=(i[1]+i[4])/p,d=.25*p,c=(i[6]+i[9])/p}else{const p=Math.sqrt(1+i[10]-i[0]-i[5])*2;v=(i[1]-i[4])/p,s=(i[2]+i[8])/p,d=(i[6]+i[9])/p,c=.25*p}const h=Math.sqrt(s*s+d*d+c*c+v*v);return s/=h,d/=h,c/=h,v/=h,this.x=s,this.y=d,this.z=c,this.w=v,this.updated=!0,this}multiply(l){const i=this.w*l.w-this.x*l.x-this.y*l.y-this.z*l.z,o=this.w*l.x+this.x*l.w+this.y*l.z-this.z*l.y,s=this.w*l.y-this.x*l.z+this.y*l.w+this.z*l.x,d=this.w*l.z+this.x*l.y-this.y*l.x+this.z*l.w;return this.set(o,s,d,i),this.updated=!0,this}preMultiply(l){const i=l.clone().multiply(this);this.set(i.x,i.y,i.z,i.w)}inverse(){return this.set(-this.x,-this.y,-this.z,this.w),this.updated=!0,this}copy(l){return this.x=l.x??0,this.y=l.y??0,this.z=l.z??0,this.w=l.w??0,this.updated=!0,this}clone(){return new Bu(this.x,this.y,this.z,this.w)}}var Ur;(m=>{m.gauss=(l,i,o)=>{const s=l-i,d=-(s*s)/(2*o*o);return 1/Math.sqrt(2*Math.PI*o)*Math.exp(d)},m.gaussWeights=l=>{let i=0;const o=[];if(l<=1)return[.5];for(let s=0;s<l;s++){const d=s/(l-1),c=(0,m.gauss)(d,0,1);i+=c*(s>0?2:1),o.push(c)}for(let s=0;s<l;s++)o[s]/=i;return o},m.randomSeed=l=>{l^=l<<13,l^=0,l^=l<<5;let i=123456789^l;l^=l<<13,l^=0,l^=l<<5;let o=362436069^l;l^=l<<13,l^=0,l^=l<<5;let s=521288629^l;l^=l<<13,l^=0,l^=l<<5;let d=88675123^l,c;return()=>(c=i^i<<11,i=o,o=s,s=d,d=(d^d>>>19^(c^c>>>8))>>>0,d/4294967296)},m.randomRange=(l=-1,i=1)=>l+Math.random()*(i-l),m.randomVector=(l=new Q(-1,-1,-1,-1),i=new Q(1,1,1,1))=>new Q((0,m.randomRange)(l.x,i.x),(0,m.randomRange)(l.y,i.y),(0,m.randomRange)(l.z,i.z),(0,m.randomRange)(l.w,i.w)),m.randomInSphere=(l=1,i=Math.random)=>{const o=i(),s=i(),d=i(),c=2*Math.PI*o,v=Math.acos(2*s-1),h=Math.cbrt(d)*l,p=Math.sin(v);return{x:h*p*Math.cos(c),y:h*p*Math.sin(c),z:h*Math.cos(v)}},m.smoothstep=(l,i,o)=>o<=l?0:o>=i?1:(o=(o-l)/(i-l),o*o*(3-2*o))})(Ur||(Ur={}));var Bo;(m=>{m.NEWTON_ITERATIONS=4,m.NEWTON_MIN_SLOPE=.001,m.SUBDIVISION_PRECISION=1e-7,m.SUBDIVISION_MAX_ITERATIONS=10,m.BEZIER_EASING_CACHE_SIZE=11,m.BEZIER_EASING_SAMPLE_STEP_SIZE=1/m.BEZIER_EASING_CACHE_SIZE;function l(p){return-p.p0+3*p.p1-3*p.p2+p.p3}function i(p){return 3*p.p0-6*p.p1+3*p.p2}function o(p){return-3*p.p0+3*p.p1}function s(p,_){return 3*l(p)*_*_+2*i(p)*_+o(p)}m.calcBezierSlope=s;function d(p,_){return((l(p)*_+i(p))*_+o(p))*_+p.p0}m.calcBezier=d;function c(p,_,S,T){let C=0,D=0;for(let F=0;F<m.SUBDIVISION_MAX_ITERATIONS;F++)D=_+(S-_)/2,C=d(T,D),C>p?S=D:_=D;return D}function v(p,_,S){for(let T=0;T<m.NEWTON_ITERATIONS;T++){const C=s(_,S);if(C==0)return S;const D=d(_,S)-p;S-=D/C}return S}function h(p,_,S){p.p1=Math.max(p.p0,Math.min(p.p3,p.p1)),p.p2=Math.max(p.p0,Math.min(p.p3,p.p2));let T=0;for(let F=1;F<S.length&&(T=F-1,!(_<S[F]));F++);const C=T/(m.BEZIER_EASING_CACHE_SIZE-1),D=s(p,C)/(p.p3-p.p0);return D==0?C:D>.01?v(_,p,C):c(_,C,C+m.BEZIER_EASING_SAMPLE_STEP_SIZE,p)}m.getBezierTfromX=h})(Bo||(Bo={}));var Lv;(m=>{function l(i,o,s,d){const c=new Array(Bo.BEZIER_EASING_CACHE_SIZE);for(let v=0;v<Bo.BEZIER_EASING_CACHE_SIZE;++v)c[v]=Bo.calcBezier({p0:i.x,p1:o.x,p2:s.x,p3:d.x},v/(Bo.BEZIER_EASING_CACHE_SIZE-1));return v=>v<=i.x?i.y:d.x<=v?d.y:Bo.calcBezier({p0:i.y,p1:o.y,p2:s.y,p3:d.y},Bo.getBezierTfromX({p0:i.x,p1:o.x,p2:s.x,p3:d.x},v,c))}m.bezier=l})(Lv||(Lv={}));class Tn{constructor(){y(this,"listeners");this.listeners=[]}on(l,i){this.listeners.push({event:l,cb:i})}once(l,i){this.listeners.push({event:l,cb:i,once:!0})}off(l,i){this.listeners=this.listeners.filter(o=>i==null?o.event!=l:!(o.event==l&&o.cb==i))}emit(l,i){const o=this.listeners.concat();for(let s=0;s<o.length;s++){const d=o[s];d.event==l&&(d.cb.apply(this,i||[]),d.once&&this.off(l,d.cb))}}hasEvent(l){return this.listeners.some(i=>i.event==l)}}class PN extends Tn{constructor(i){super();y(this,"keyframes",[]);y(this,"cache",{frame:NaN,value:NaN});y(this,"frameStart");y(this,"frameEnd");y(this,"frameDuration");this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.set(i)}set(i){i&&(this.keyframes=[],i.forEach(o=>{this.addKeyFrame(o)}))}addKeyFrame(i){let o=0;for(let s=0;s<this.keyframes.length&&this.keyframes[s].coordinate.x<i.coordinate.x;s++)o++;this.keyframes.splice(o,0,i),this.frameStart=this.keyframes[0].coordinate.x,this.frameEnd=this.keyframes[this.keyframes.length-1].coordinate.x}getValue(i){if(i==this.cache.frame)return this.cache.value;let o=null;for(let s=0;s<this.keyframes.length;s++){const d=this.keyframes[s];if(i<d.coordinate.x){const c=this.keyframes[s-1];c?o=c.to(d,i):o=d.coordinate.y;break}}return o===null&&this.keyframes.length>0&&(o=this.keyframes[this.keyframes.length-1].coordinate.y),o!==null?(this.cache={frame:i,value:o},o):0}}class zN extends Tn{constructor(i,o,s,d,c){super();y(this,"name");y(this,"curves");y(this,"frameStart");y(this,"frameEnd");y(this,"frameDuration");y(this,"updatedFrame",-1);y(this,"value");this.name=i||"",this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.curves=new Map,this.value=new Q,o&&this.setFCurve(o,"x"),s&&this.setFCurve(s,"y"),d&&this.setFCurve(d,"z"),c&&this.setFCurve(c,"w")}setFCurve(i,o){this.curves.set(o,i);let s=1/0,d=-1/0;this.curves.forEach(c=>{c.frameStart<s&&(s=c.frameStart),c.frameEnd>d&&(d=c.frameEnd)}),(s==-1/0||d==1/0)&&(s=0,d=1),this.frameStart=s,this.frameEnd=d,this.frameDuration=this.frameEnd-this.frameStart}getFCurve(i){return this.curves.get(i)||null}setFrame(i){if(i==this.updatedFrame)return this;const o=this.curves.get("x"),s=this.curves.get("y"),d=this.curves.get("z"),c=this.curves.get("w");return o&&(this.value.x=o.getValue(i)),s&&(this.value.y=s.getValue(i)),d&&(this.value.z=d.getValue(i)),c&&(this.value.w=c.getValue(i)),this.updatedFrame=i,this}}class AN extends Tn{constructor(i,o,s,d){super();y(this,"coordinate",{x:0,y:0});y(this,"handleLeft",{x:0,y:0});y(this,"handleRight",{x:0,y:0});y(this,"interpolation","BEZIER");y(this,"easing",null);y(this,"nextFrame",null);this.set(i,o,s,d)}set(i,o,s,d){this.coordinate=i,this.handleLeft=o||i,this.handleRight=s||i,this.interpolation=d||"BEZIER"}getEasing(i,o){return i=="BEZIER"?Lv.bezier(this.coordinate,this.handleRight,o.handleLeft,o.coordinate):i=="CONSTANT"?()=>this.coordinate.y:s=>{const d=o.coordinate.y-this.coordinate.y;return s=(s-this.coordinate.x)/(o.coordinate.x-this.coordinate.x),this.coordinate.y+s*d}}to(i,o){return(this.nextFrame==null||this.nextFrame.coordinate.x!=i.coordinate.x||this.nextFrame.coordinate.y!=i.coordinate.y)&&(this.easing=this.getEasing(this.interpolation,i),this.nextFrame=i),this.easing?this.easing(o):0}}var Uv;(m=>{function l(){const i=Date.now()&65535,o=Math.floor(Math.random()*65536);return((i<<16|o)>>>0).toString(16).padStart(8,"0")}m.genUUID=l})(Uv||(Uv={}));class As extends Tn{constructor(){super();y(this,"uuid");y(this,"initiator");y(this,"fields_");this.uuid=Uv.genUUID(),this.fields_=new Map,this.initiator="script"}serialize(i){const o=i||{mode:"view"},s={};return this.fields_.forEach((d,c)=>{const v=this.getFieldOpt(c);o.mode=="export"&&v&&v&&v.noExport||(s[c]=d.get(o))}),s}serializeToDirectory(){return(o=>{const s={type:"folder",childs:{},opt:{}},d=Object.keys(o);for(let c=0;c<d.length;c++){const v=d[c],h=this.getFieldOpt(v);if(!v)continue;let p=s;const _=v.split("/");for(let S=0;S<_.length;S++){const T=_[S];T&&p.type!="value"&&(p.childs[T]||(S==_.length-1?p.childs[T]={type:"value",value:null,opt:h}:p.childs[T]={type:"folder",childs:{},opt:h}),p=p.childs[T])}p.type=="value"&&(p.value=o[v])}return s})(this.serialize())}deserialize(i){const o=Object.keys(i);for(let s=0;s<o.length;s++){const d=o[s],c=this.fields_.get(d);c&&c.set(i[d])}}exportEditor(){this.serialize({mode:"export"})}field(i,o,s,d){const c=typeof s=="function"?s:void 0,v=typeof s=="object"&&s||d||{};c||(v.readOnly=!0,v.noExport=!0);const h=i.startsWith("/")?i.slice(1):i;this.fields_.set(h,{get:o,set:p=>{c&&c(p),this.noticeField(i)},opt:v})}fieldDir(i,o){const s=i;return this.field(s+"/",()=>null,void 0,{...o,isFolder:!0}),{dir:d=>this.fieldDir(`${s}/${d}`),field:(d,c,v,h)=>{this.field(`${s}/${d}`,c,v,h)}}}setField(i,o){this.deserialize({[i]:o})}getField(i,o){const s=this.fields_.get(i);if(s)return o=o||{mode:"view"},s.get(o)}getFieldOpt(i){const o=this.fields_.get(i);if(o)return o.opt}noticeField(i){this.emit("fields/update/"+i),this.emit("fields/update",[[i]])}}class Te extends As{constructor(i){super();y(this,"disableEdit");y(this,"order");y(this,"_entity");y(this,"_enabled");y(this,"_tag");y(this,"_disposed");this.disableEdit=!1,this._entity=i.entity,this._enabled=!0,this._disposed=!1,this._tag="",this.order=0,this.field("enabled",()=>this.enabled,o=>this.enabled=o,{hidden:!0,noExport:!0}),this.field("tag",()=>this.tag,o=>this._tag=o,{readOnly:!0,noExport:!0,hidden:o=>o==""})}get tag(){return this._tag}get entity(){return this._entity}set enabled(i){this._enabled=i}get enabled(){return this._enabled}update(i){this.enabled&&this.updateImpl(i)}updateImpl(i){}postUpdate(i){this.enabled&&this.postUpdateImpl(i)}postUpdateImpl(i){}beforeRender(i){this.enabled&&this.beforeRenderImpl(i)}beforeRenderImpl(i){}afterRender(i){this.enabled&&this.afterRenderImpl(i)}afterRenderImpl(i){}dispose(){this._disposed=!0,this.disposeImpl(),this.emit("dispose")}disposeImpl(){}}class Io extends As{constructor(){super();y(this,"vertCount");y(this,"attributes");y(this,"vaoCache");this.vertCount=0,this.attributes=new Map,this.vaoCache=new Map}setAttribute(i,o,s,d){const c=this.attributes.get(i);return c&&c.buffer&&c.buffer.dispose(),this.attributes.set(i,{array:o,size:s,opt:d}),this.updateVertCount(),this}getAttribute(i){return this.attributes.get(i)}updateVertCount(){this.vertCount=this.attributes.size>0?1/0:0,this.attributes.forEach((i,o)=>{o=="index"||i.opt&&i.opt.instanceDivisor||(this.vertCount=Math.min(i.array.length/i.size,this.vertCount))})}applyMatrix(i){const o=new Q,s=(v,h,p)=>{for(let _=0;_<v.length;_+=3)o.set(v[_],v[_+1],v[_+2]),p?o.applyMatrix4AsPosition(h):o.applyMatrix4AsDirection(h).normalize(),v[_]=o.x,v[_+1]=o.y,v[_+2]=o.z},d=this.attributes.get("position");d&&s(d.array,i,!0);const c=this.attributes.get("normal");return c&&s(c.array,i.clone().inverse().transpose(),!1),this.requestUpdate(),this}createBuffers(i){this.attributes.forEach((o,s)=>{o.buffer||(o.buffer=new df(i).setData(o.array,s=="index"?"ibo":"vbo",o.opt&&o.opt.usage))})}requestUpdate(){this.vaoCache.clear()}dispose(){this.attributes.forEach(i=>{var o;(o=i.buffer)==null||o.dispose()})}}const ON=`// @shader-file: packages/maxpower/Material/shaders/basic.fs
#include <common>\r
#include <packing>\r
#include <frag_h>\r
\r
void main( void ) {\r
\r
	#include <frag_in>\r
	#include <frag_out>\r
\r
}`,FN=`// @shader-file: packages/maxpower/Material/shaders/basic.vs
#include <common>\r
#include <vert_h>\r
\r
void main( void ) {\r
\r
	#include <vert_in>\r
	#include <vert_out>\r
	\r
}`;class He extends As{constructor(i){super();y(this,"name");y(this,"vert");y(this,"frag");y(this,"defines");y(this,"uniforms");y(this,"useLight");y(this,"depthTest");y(this,"depthWrite");y(this,"cullFace");y(this,"drawType");y(this,"blending");y(this,"visibilityFlag");y(this,"programCache");i=i||{},this.name=i.name||"",this.visibilityFlag={},this.setVisibility(i.phase||["shadowMap","deferred"]),this.useLight=!0,this.depthTest=!0,this.cullFace=!1,this.depthWrite=i.depthTest!==void 0?i.depthTest:!0,this.drawType=i.drawType||"TRIANGLES",this.blending=i.blending||"NORMAL",this.vert=i.vert||FN,this.frag=i.frag||ON,this.defines=i.defines||{},this.uniforms=i.uniforms||{},this.programCache={}}setVisibility(i){this.visibilityFlag={shadowMap:i.indexOf("shadowMap")>-1,deferred:i.indexOf("deferred")>-1,forward:i.indexOf("forward")>-1,ui:i.indexOf("ui")>-1,envMap:i.indexOf("envMap")>-1,postprocess:i.indexOf("postprocess")>-1}}requestUpdate(){this.programCache={}}}const LN=new Io,UN=new He;class me extends Te{constructor(i){super(i);y(this,"geometry");y(this,"material");const o=i.args||{};this.geometry=o.geometry||LN,this.material=o.material||UN,this.field("material",()=>this.material.name)}}class Ct extends As{constructor(i){super();y(this,"name");y(this,"position");y(this,"euler");y(this,"quaternion");y(this,"scale");y(this,"matrix");y(this,"matrixWorld");y(this,"matrixWorldPrev");y(this,"autoMatrixUpdate");y(this,"parent");y(this,"children");y(this,"components");y(this,"componentsSorted");y(this,"visible");y(this,"userData");this.name=i&&i.name||"",this.position=new Q(0,0,0,1),this.euler=new Ms,this.quaternion=new Bu(0,0,0,1),this.scale=new Q(1,1,1),this.matrix=new nt,this.matrixWorld=new nt,this.matrixWorldPrev=new nt,this.autoMatrixUpdate=!0,this.parent=null,this.children=[],this.components=new Map,this.componentsSorted=[],this.visible=!0,this.userData={},this.field("name",()=>this.name,o=>this.name=o),this.field("position",()=>this.position.getElm("vec3"),o=>this.position.setFromArray(o),{format:{type:"vector"}}),this.field("euler",()=>this.euler.getElm("vec3"),o=>this.euler.setFromArray(o),{format:{type:"vector"}}),this.field("scale",()=>this.scale.getElm("vec3"),o=>this.scale.setFromArray(o),{format:{type:"vector"}}),this.field("children",()=>this.children.map(o=>o.uuid),{hidden:!0}),this.field("components",()=>{const o=[];return this.components.forEach(s=>o.push(s.uuid)),o},{hidden:!0})}update(i){const o={...i};o.matrix=this.matrixWorld,this.updateImpl(i);for(let s=0;s<this.componentsSorted.length;s++)this.componentsSorted[s].update(o);this.autoMatrixUpdate&&this.updateMatrix();for(let s=0;s<this.children.length;s++)this.children[s].update(o)}updateImpl(i){}onBeforeRender(i){for(let o=0;o<this.componentsSorted.length;o++)this.componentsSorted[o].beforeRender(i);for(let o=0;o<this.children.length;o++)this.children[o].onBeforeRender(i)}onAfterRender(i){this.matrixWorldPrev.copy(this.matrixWorld);for(let o=0;o<this.componentsSorted.length;o++)this.componentsSorted[o].afterRender(i);for(let o=0;o<this.children.length;o++)this.children[o].onAfterRender(i)}add(i){i.parent&&i.parent.remove(i),i.parent=this,this.children.push(i),this.noticeField("children")}remove(i){this.children=this.children.filter(o=>o.uuid!=i.uuid),this.noticeField("children")}updateMatrix(i){this.parent&&i&&this.parent.updateMatrix(!0);const o=this.parent?this.parent.matrixWorld:new nt;this.quaternion.updated?this.euler.setFromQuaternion(this.quaternion):this.quaternion.setFromEuler(this.euler),this.quaternion.updated=!1,this.matrix.setFromTransform(this.position,this.quaternion,this.scale),this.matrixWorld.copy(this.matrix).preMultiply(o)}decomposeMatrix(i){i.decompose(this.position,this.quaternion,this.scale),this.updateMatrix()}applyMatrix(i){this.decomposeMatrix(this.matrix.clone().multiply(i))}lookAt(i){this.updateMatrix();const o=new nt,s=new Q;this.matrixWorld.decompose(s);const d=this.position.clone().add(i.clone().sub(s));o.lookAt(this.position,d,new Q(0,1,0)),this.decomposeMatrix(o)}addComponent(i,...o){this.removeComponent(i);const[s]=o,d=new i({entity:this,args:s||{}});return this.components.set(i,d),this.componentsSorted.push(d),this.componentsSorted.sort((c,v)=>c.order-v.order),this.noticeField("components"),d}removeComponent(i){const o=this.components.get(i);o&&o.dispose(),this.components.delete(i),this.componentsSorted=this.componentsSorted.filter(s=>s!==o),this.noticeField("components")}removeComponentByUUID(i){for(const o of this.components){const s=o[0],d=o[1];if(d.uuid===i)return d.dispose(),this.components.delete(s),this.noticeField("components"),d}}getComponent(i){return this.components.get(i)}getComponentByUUID(i){for(const o of this.components.values())if(o.uuid===i)return o;return null}getComponentByTag(i){for(const o of this.components.values())if(o.tag===i)return o;return null}getComponentsByTag(i){const o=[];return this.components.forEach(s=>{s.tag==i&&o.push(s)}),o}findEntityByName(i){if(this.name==i)return this;for(let o=0;o<this.children.length;o++){const d=this.children[o].findEntityByName(i);if(d)return d}}findEntityByUUID(i){if(this.uuid==i)return this;for(let o=0;o<this.children.length;o++){const d=this.children[o].findEntityByUUID(i);if(d)return d}}getRootEntity(){return this.parent?this.parent.getRootEntity():this}getScenePath(i){let o="/"+this.name;return i&&i.uuid==this.uuid||this.parent&&(o=this.parent.getScenePath(i)+o),o}traverse(i){i(this),this.children.forEach(o=>o.traverse(i))}isVisibleTraverse(){return this.visible?this.parent?this.parent.isVisibleTraverse():!0:!1}dispose(){this.emit("dispose"),this.parent&&this.parent.remove(this),this.components.forEach(i=>{i.dispose()}),this.components.clear(),this.componentsSorted=[]}disposeRecursive(){this.dispose(),this.children.concat().forEach(i=>{i.disposeRecursive()}),this.children=[]}}const BN=`// @shader-file: packages/maxpower/Loaders/GLTFLoader/shaders/gltf.fs
#include <common>\r
\r
#include <packing>\r
#include <frag_h>\r
\r
#ifdef USE_COLOR\r
\r
	uniform vec4 uBaseColor;\r
\r
#endif\r
\r
#ifdef USE_COLOR_MAP\r
\r
	uniform sampler2D uBaseColorMap;\r
\r
#endif\r
\r
#ifdef USE_ROUGHNESS\r
\r
	uniform float uRoughness;\r
\r
#endif\r
\r
#ifdef USE_METALNESS\r
\r
	uniform float uMetalness;\r
\r
#endif\r
\r
#ifdef USE_NORMAL_MAP\r
\r
	uniform sampler2D uNormalMap;\r
\r
#endif\r
\r
#ifdef USE_TANGENT\r
\r
	in vec3 vTangent;\r
	in vec3 vBitangent;\r
\r
#endif\r
\r
#ifdef USE_MR_MAP\r
\r
	uniform sampler2D uMRMap;\r
\r
#endif\r
\r
#ifdef USE_EMISSION\r
\r
	uniform vec3 uEmission;\r
\r
#endif\r
\r
\r
#ifdef USE_EMISSION_MAP\r
\r
	uniform sampler2D uEmissionMap;\r
\r
#endif\r
\r
#ifdef USE_EMISSION_STRENGTH\r
\r
	uniform float uEmissionStrength;\r
\r
#endif\r
\r
void main( void ) {\r
\r
	#include <frag_in>\r
\r
	vec2 mapUv = vUv;\r
	mapUv.y = 1.0 - mapUv.y;\r
\r
	#ifdef USE_COLOR\r
\r
		outColor = uBaseColor;\r
\r
	#endif\r
\r
	#ifdef USE_COLOR_MAP\r
\r
		outColor = texture( uBaseColorMap, mapUv );\r
\r
	#endif\r
\r
	if( outColor.w < 0.5 ) discard;\r
\r
	outMetalic = 1.0;\r
\r
	#ifdef USE_MR_MAP\r
\r
		vec4 mr = texture( uMRMap, mapUv );\r
		outRoughness = mr.y;\r
		outMetalic = mr.z;\r
\r
	#endif\r
	\r
	#ifdef USE_ROUGHNESS\r
\r
		outRoughness = uRoughness;\r
\r
	#endif\r
\r
	#ifdef USE_NORMAL_MAP \r
\r
		vec3 outNormalMap = texture( uNormalMap, mapUv ).xyz;\r
		outNormalMap = outNormalMap * 2.0 - 1.0;\r
		\r
	#endif\r
\r
	#ifdef USE_METALNESS\r
\r
		outMetalic = uMetalness;\r
\r
	#endif\r
\r
	#ifdef USE_EMISSION\r
\r
		outEmission = uEmission;\r
\r
	#endif\r
\r
	#ifdef USE_EMISSION_MAP\r
\r
		vec4 emission = texture( uEmissionMap, mapUv );\r
		outEmission = emission.xyz;\r
\r
	#endif\r
\r
	#ifdef USE_EMISSION_STRENGTH\r
\r
		outEmission *= uEmissionStrength;\r
\r
	#endif\r
\r
	#include <frag_out>\r
\r
} `,VN=`// @shader-file: packages/maxpower/Loaders/GLTFLoader/shaders/gltf.vs
#include <common>\r
#include <vert_h>\r
\r
#ifdef USE_TANGENT\r
\r
	layout ( location = 3 ) in vec4 tangent;\r
	out vec3 vTangent;\r
	out vec3 vBitangent;\r
\r
#endif\r
\r
void main( void ) {\r
\r
	#include <vert_in>\r
	#include <vert_out>\r
\r
	#ifdef USE_TANGENT\r
\r
		vTangent = (uModelMatrix * vec4(tangent.xyz, 0.0)).xyz;\r
		vBitangent = normalize( cross( vNormal, vTangent.xyz ) * tangent.w );\r
\r
	#endif\r
\r
}`,tf=12,nf=8,IN=m=>{switch(m){case"VEC2":return 2;case"VEC3":return 3;case"VEC4":return 4;case"SCALAR":return 1;default:return 1}},jN=m=>{switch(m){case"TEXCOORD_0":return"uv";default:return m.toLowerCase()}};class HN extends Tn{constructor(i){super();y(this,"gl");this.gl=i}async load(i){const s=await(await fetch(i)).arrayBuffer(),d=new TextDecoder,c=d.decode(new Uint8Array(s,0,4)),v=new Map;let h=null;if(c=="glTF"){const I=new DataView(s),ne=tf,z={length:I.getUint32(ne,!0),type:I.getUint32(ne+4,!0)};if(z.type==1313821514){const X=tf+nf;h=JSON.parse(d.decode(new Uint8Array(s,X,z.length)))}if(s.byteLength>nf+z.length+tf){const X=tf+nf+z.length,re={length:I.getUint32(X,!0),type:I.getUint32(X+4,!0)};if(re.type==5130562){const se=X+nf,le=s.slice(se,se+re.length);v.set(0,le)}}}else h=JSON.parse(d.decode(new Uint8Array(s)));if(!h)throw new Error("");const p=h,_=I=>{const ne=v.get(I.buffer);return ne?ne.slice(I.byteOffset,I.byteOffset+I.byteLength):null},S=new Map;h.accessors&&h.accessors.forEach((I,ne)=>{const{type:z}=I;if(!p.bufferViews)return;const X=p.bufferViews[I.bufferView],re=_(X);re&&S.set(ne,{type:z,buffer:re})});const T=new Map,C=(p.images||[]).map((I,ne)=>new Promise(z=>{if(I.bufferView!==void 0){if(!p.bufferViews)return;const X=p.bufferViews[I.bufferView],re=_(X);if(re){const se=new Blob([new Uint8Array(re)],{type:I.mimeType}),le=new Image;le.onload=()=>{z(I)},le.src=URL.createObjectURL(se),T.set(ne,le)}}}));await Promise.all(C);const D=new Map,F=I=>{if(!p.textures)return null;const ne=p.textures[I];if(ne){const z=new rt(this.gl),X=T.get(ne.source);if(X)return z.attach(X),z}return null};p.materials&&p.materials.forEach((I,ne)=>{const z=new He({frag:BN,vert:VN});if(I.normalTexture){const X=F(I.normalTexture.index);X&&(z.uniforms.uNormalMap={value:X,type:"1i"},z.defines.USE_NORMAL_MAP="")}if(I.pbrMetallicRoughness){const X=I.pbrMetallicRoughness;if(X.baseColorFactor&&(z.uniforms.uBaseColor={value:X.baseColorFactor,type:"4fv"},z.defines.USE_COLOR=""),X.baseColorTexture){const re=F(X.baseColorTexture.index);re&&(z.uniforms.uBaseColorMap={value:re,type:"1i"},z.defines.USE_COLOR_MAP="")}if(X.roughnessFactor!==void 0&&(z.uniforms.uRoughness={value:X.roughnessFactor,type:"1f"},z.defines.USE_ROUGHNESS=""),X.metallicFactor!==void 0&&(z.uniforms.uMetalness={value:X.metallicFactor,type:"1f"},z.defines.USE_METALNESS=""),X.metallicRoughnessTexture){const re=F(X.metallicRoughnessTexture.index);re&&(z.uniforms.uMRMap={value:re,type:"1i"},z.defines.USE_MR_MAP="")}}if(I.emissiveFactor&&(z.uniforms.uEmission={value:I.emissiveFactor,type:"3fv"},z.defines.USE_EMISSION=""),I.emissiveTexture){const X=F(I.emissiveTexture.index);X&&(z.uniforms.uEmissionMap={value:X,type:"1i"},z.defines.USE_EMISSION_MAP="")}I.extensions&&I.extensions.KHR_materials_emissive_strength&&(z.uniforms.uEmissionStrength={value:I.extensions.KHR_materials_emissive_strength.emissiveStrength,type:"1fv"},z.defines.USE_EMISSION_STRENGTH=""),D.set(ne,z)});const q=new Map;p.meshes&&p.meshes.forEach((I,ne)=>{const{primitives:z}=I;q.set(ne,z.map(X=>{const re=new Io;if(Object.keys(X.attributes).forEach(le=>{const ze=X.attributes[le],_e=S.get(ze);_e&&re.setAttribute(jN(le),new Float32Array(_e.buffer),IN(_e.type))}),X.indices!==void 0){const le=S.get(X.indices);le&&re.setAttribute("index",new Uint16Array(le.buffer),1)}let se=null;if(X.material!==void 0){const le=D.get(X.material);le&&(se=le)}return se||(se=new He),re.attributes.has("tangent")&&(se.defines.USE_TANGENT=""),{geometry:re,material:se}}))});const $=new Map,j=(I,ne)=>{const z=new Ct;ne.translation&&z.position.set(ne.translation[0],ne.translation[1],ne.translation[2]),ne.rotation&&z.quaternion.set(ne.rotation[0],ne.rotation[1],ne.rotation[2],ne.rotation[3]),ne.scale&&z.scale.set(ne.scale[0],ne.scale[1],ne.scale[2]);const X=q.get(ne.mesh);if(z.name=ne.name,X)if(X.length==1){const re=X[0],se=z.addComponent(me);se.geometry=re.geometry,se.material=re.material}else X.forEach((re,se)=>{const le=new Ct;le.name=ne.name+"_"+se;const ze=le.addComponent(me);ze.geometry=re.geometry,ze.material=re.material,z.add(le)});return ne.children&&ne.children.forEach(re=>{const se=$.get(re);se?z.add(se):p.nodes&&z.add(j(re,p.nodes[re]))}),$.set(I,z),z};p.nodes&&p.nodes.forEach((I,ne)=>{j(ne,I)});const K=new Ct,Z=p.scenes&&p.scenes[0];return Z&&Z.nodes&&Z.nodes.forEach(I=>{const ne=$.get(I);ne&&K.add(ne)}),{scene:K}}}class GN extends Tn{constructor(i,o){super();y(this,"gl");y(this,"connection");y(this,"frame");y(this,"nodes");y(this,"curveGroups");y(this,"root");y(this,"gltf");y(this,"currentData");this.gl=i,this.root=null,this.nodes=[],this.curveGroups=[],this.currentData=null,this.frame={start:0,end:100,current:0,fps:30,playing:!1},o&&this.connect(o)}connect(i,o){{const s=new WebSocket(i);s.onopen=this.onOpen.bind(this),s.onmessage=this.onMessage.bind(this),s.onclose=this.onClose.bind(this),s.onerror=d=>{console.error(d),this.emit("error")},this.connection={url:i,ws:s,gltfPath:o}}}disconnect(){this.connection&&(this.connection.ws.close(),this.connection.ws.onmessage=null,this.connection.ws.onclose=null,this.connection.ws.onopen=null,this.connection=void 0)}binaryStringToArrayBuffer(i){const o=new Uint8Array(i.length);for(let s=0;s<i.length;s++){const d=i.charCodeAt(s);o[s]=d}return o.buffer}async loadScene(i,o){const s=JSON.parse(JSON.stringify(i));o&&await new HN(this.gl).load(o).then(p=>{this.gltf=p,this.emit("gltfLoaded",[p])}),await new Promise(h=>{setTimeout(()=>{h(null)},100)}),this.frame.start=s.frame.start,this.frame.end=s.frame.end,this.frame.fps=s.frame.fps,this.curveGroups=[],this.nodes=[];const d=Object.keys(s.animations);s.version===2&&s.fcurves.forEach(h=>{for(let p=1;p<h.k.length;p++)h.k[p][1][0]+=h.k[p-1][1][0]});for(let h=0;h<d.length;h++){const p=d[h],_=new zN(p);s.animations[h].forEach(S=>{const T=s.fcurves[S],C=new PN;C.set(T.k.map(D=>{const F=D[1];return new AN({x:F[0],y:F[1]},F[2]!==void 0&&{x:F[2],y:F[3]}||void 0,F[4]!==void 0&&{x:F[4],y:F[5]}||void 0,["LINEAR","CONSTANT","BEZIER"][D[0]])})),_.setFCurve(C,T.axis)}),this.curveGroups.push(_)}this.nodes=[];const v=h=>{const p={name:h.name,class:h.class,uuid:h.uuid,children:[],animations:h.animation||{},position:h.position||[0,0,0],rotation:h.rotation||[0,0,0],scale:h.scale||[1,1,1],uniforms:h.uniforms||{},type:h.type||"empty",visible:h.visible!==void 0?h.visible:!0},_=h.param;return _&&"position"in _?p.param={position:new Float32Array(this.binaryStringToArrayBuffer(atob(_.position))),normal:new Float32Array(this.binaryStringToArrayBuffer(atob(_.normal))),uv:new Float32Array(this.binaryStringToArrayBuffer(atob(_.uv))),index:new Uint16Array(this.binaryStringToArrayBuffer(atob(_.index)))}:p.param=_,h.children&&h.children.forEach(S=>{p.children.push(v(S))}),this.nodes.push(p),p};this.root=v(s.root),this.currentData=s,this.emit("sync/scene",[this])}onSyncTimeline(i){this.frame=i,this.emit("sync/timeline",[this.frame])}onOpen(){}onMessage(i){{const o=JSON.parse(i.data);o.type=="sync/scene"?this.loadScene(o.data,this.connection&&this.connection.gltfPath):o.type=="sync/timeline"?this.onSyncTimeline(o.data):o.type=="sync/selection"?this.emit("sync/selection",[o.data]):o.type=="event"&&this.emit("event/"+o.data.type)}}onClose(){this.disconnect()}getCurveGroup(i){return this.curveGroups[i]}setFrame(i){this.onSyncTimeline({...this.frame,playing:!0,current:i})}get gltfPrm(){return this.gltf?Promise.resolve(this.gltf):new Promise(i=>{this.on("gltfLoaded",o=>{i(o)})})}dispose(){this.disconnect()}}class _r extends Io{constructor(l){super();const i=[],o=[],s=[],d=[],c=[],{width:v,height:h,depth:p,segmentsWidth:_,segmentsHeight:S,segmentsDepth:T}={width:1,height:1,depth:1,segmentsWidth:1,segmentsHeight:1,segmentsDepth:1,...l},C=[{normal:[0,0,1],dir:[1,0,0],up:[0,1,0],w:v,h,d:p,segW:_,segH:S},{normal:[0,0,-1],dir:[-1,0,0],up:[0,1,0],w:v,h,d:p,segW:_,segH:S},{normal:[1,0,0],dir:[0,0,-1],up:[0,1,0],w:p,h,d:v,segW:T,segH:S},{normal:[-1,0,0],dir:[0,0,1],up:[0,1,0],w:p,h,d:v,segW:T,segH:S},{normal:[0,1,0],dir:[-1,0,0],up:[0,0,1],w:v,h:p,d:h,segW:_,segH:T},{normal:[0,-1,0],dir:[-1,0,0],up:[0,0,-1],w:v,h:p,d:h,segW:_,segH:T}];let D=0;for(const F of C){const q=F.normal,$=F.dir,j=F.up,K=F.segW,Z=F.segH,I=F.w/2,ne=F.h/2,z=F.d/2,X=F.w/K,re=F.h/Z;for(let se=0;se<=Z;se++)for(let le=0;le<=K;le++){const ze=-I+le*X,_e=-ne+se*re,ye=-z,et=le/K,gt=se/Z,Ne=ze*-$[0]+_e*j[0]+ye*-q[0],Tt=ze*-$[1]+_e*j[1]+ye*-q[1],wr=ze*-$[2]+_e*j[2]+ye*-q[2];if(i.push(Ne,Tt,wr),o.push(...q),s.push(et,gt),c.push(se/Z*j[1]+Math.max(0,j[2])),se<Z&&le<K){const Yn=D+se*(K+1)+le,qn=D+(se+1)*(K+1)+le,Gt=D+(se+1)*(K+1)+(le+1),pn=D+se*(K+1)+(le+1);d.push(Yn,qn,pn),d.push(qn,Gt,pn)}}D+=(K+1)*(Z+1)}this.setAttribute("position",new Float32Array(i),3),this.setAttribute("normal",new Float32Array(o),3),this.setAttribute("uv",new Float32Array(s),2),this.setAttribute("posY",new Float32Array(c),1),this.setAttribute("index",new Uint16Array(d),1)}}class bf extends Io{constructor(l){super();const i=[],o=[],s=[],d=[],{height:c,radiusTop:v,radiusBottom:h,radSegments:p,heightSegments:_,caps:S}={height:1,radiusTop:1,radiusBottom:1,radSegments:8,heightSegments:1,caps:!0,...l};for(let T=0;T<=_+2;T++)for(let C=0;C<=p;C++){const D=Math.PI*2/p*C;if(T<=_){const F=1-T/_,q=(1-F)*v+F*h,$=Math.cos(D)*q,j=-(c/2)+c/_*T,K=Math.sin(D)*q;i.push($,j,K),s.push(C/p,T/_);const Z=new Q(Math.cos(D),0,Math.sin(D)).normalize();if(o.push(Z.x,Z.y,Z.z),T<_){const I=p+1;d.push(T*I+C,(T+1)*I+(C+1)%I,T*I+(C+1)%I,T*I+C,(T+1)*I+C,(T+1)*I+(C+1)%I)}}else{if(!S)continue;const F=T-_-1,q=F?v:h,$=Math.cos(D)*q,j=-(c/2)+c*F,K=Math.sin(D)*q;i.push($,j,K),s.push(($+q)*.5/q,(K+q)*.5/q),o.push(0,-1+F*2,0);const Z=(p+1)*(_+(F+1));C<=p-2&&(F==0?d.push(Z,Z+C,Z+C+1):d.push(Z,Z+C+1,Z+C))}}this.setAttribute("position",new Float32Array(i),3),this.setAttribute("normal",new Float32Array(o),3),this.setAttribute("uv",new Float32Array(s),2),this.setAttribute("index",new Uint16Array(d),1)}}class ro extends Io{constructor(l){super();const{width:i,height:o,widthSegments:s,heightSegments:d,floor:c}={width:1,height:1,widthSegments:1,heightSegments:1,...l},v=i/2,h=o/2,p=[],_=[],S=[],T=[];for(let C=0;C<=d;C++)for(let D=0;D<=s;D++){const F=D/s,q=C/d;if(c?(p.push(-v+i*F,0,h-o*q),_.push(0,1,0)):(p.push(-v+i*F,-h+o*q,0),_.push(0,0,1)),S.push(F,q),C>0&&D>0){const $=s+1,j=$*C+D,K=$*(C-1)+D-1;T.push(j,$*C+D-1,K,j,K,$*(C-1)+D)}}this.setAttribute("position",new Float32Array(p),3),this.setAttribute("normal",new Float32Array(_),3),this.setAttribute("uv",new Float32Array(S),2),this.setAttribute("index",new Uint16Array(T),1)}}class ir extends Io{constructor(l){super();const i=[],o=[],s=[],d=[],{radius:c,widthSegments:v,heightSegments:h}={radius:.5,widthSegments:8,heightSegments:8,...l};for(let p=0;p<=h;p++){const _=p/h*Math.PI;for(let S=0;S<=v;S++){const T=S/v*Math.PI*2,C=Math.sin(_)*c,D=Math.cos(T)*C,F=-Math.cos(_)*c,q=-Math.sin(T)*C;i.push(D,F,q),s.push(S/v,p/h);const $=new Q(D,F,q).normalize();if(o.push($.x,$.y,$.z),S<v&&p<h){const j=v+1;d.push(p*j+S,p*j+(S+1)%j,(p+1)*j+(S+1)%j,p*j+S,(p+1)*j+(S+1)%j,(p+1)*j+S)}}}for(let p=0;p<d.length;p++)d[p]=Math.min(i.length/3-1,d[p]);this.setAttribute("position",new Float32Array(i),3),this.setAttribute("normal",new Float32Array(o),3),this.setAttribute("uv",new Float32Array(s),2),this.setAttribute("index",new Uint16Array(d),1)}}class _f extends Te{constructor(i){super(i);y(this,"cameraType");y(this,"fov");y(this,"aspect");y(this,"near");y(this,"far");y(this,"orthWidth");y(this,"orthHeight");y(this,"projectionMatrix");y(this,"viewMatrix");y(this,"projectionMatrixPrev");y(this,"viewMatrixPrev");y(this,"needsUpdateProjectionMatrix");y(this,"displayOut");y(this,"viewPort");this.cameraType="perspective",this.viewMatrix=new nt,this.projectionMatrix=new nt,this.viewMatrixPrev=new nt,this.projectionMatrixPrev=new nt,this.viewPort=null,this.fov=50,this.near=.1,this.far=1e3,this.aspect=1,this.orthWidth=1,this.orthHeight=1,this.needsUpdateProjectionMatrix=!0,this.displayOut=!0,this.field("fov",()=>this.fov,o=>this.fov=o,{noExport:!0}),this._tag="camera"}updateProjectionMatrix(){this.cameraType=="perspective"?this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far):this.projectionMatrix.orthographic(this.orthWidth,this.orthHeight,this.near,this.far),this.needsUpdateProjectionMatrix=!1}updateViewMatrix(){this.viewMatrix.copy(this.entity.matrixWorld).inverse()}beforeRenderImpl(i){this.updateViewMatrix(),this.needsUpdateProjectionMatrix&&this.updateProjectionMatrix()}afterRenderImpl(i){this.viewMatrixPrev.copy(this.viewMatrix),this.projectionMatrixPrev.copy(this.projectionMatrix)}}class WN extends _f{constructor(i){super(i);y(this,"renderTarget");y(this,"viewMatrixOffset");this.renderTarget=null,this.viewMatrixOffset=new Bu().setFromEuler({x:-Math.PI/2,y:0,z:0}),this.near=.1,this.far=100}beforeRenderImpl(i){super.beforeRenderImpl(i),this.viewMatrix.copy(this.entity.matrixWorld).applyQuaternion(this.viewMatrixOffset).inverse()}}class Ps extends WN{constructor(i){super(i);y(this,"_lightType");y(this,"color");y(this,"intensity");y(this,"castShadow");y(this,"_shadowMapSize");y(this,"angle");y(this,"blend");y(this,"distance");y(this,"decay");this._lightType="spot",this.cameraType="perspective",this.color=new Q(1,1,1,0),this.intensity=1,this.castShadow=!0,this._shadowMapSize=new Q(256,256),this.orthWidth=4,this.orthHeight=4,this.angle=Math.PI*.5,this.blend=1,this.distance=30,this.decay=2,this.field("type",()=>this._lightType,o=>{this._lightType=o,this.updateProjectionMatrix()},{format:{type:"select",list:[{label:"Directional",value:"directional"},{label:"Spot",value:"spot"}]}}),this.field("intensity",()=>this.intensity,o=>this.intensity=o,{noExport:!0}),this.field("blend",()=>this.blend,o=>this.blend=o,{noExport:!0}),this.field("angle",()=>this.angle,o=>{this.angle=o,this.updateProjectionMatrix()},{noExport:!0}),this.field("color",()=>this.color.getElm("vec3"),o=>this.color.setFromArray(o),{noExport:!0}),this.field("castShadow",()=>this.castShadow,o=>this.castShadow=o,{noExport:!0}),this.field("distance",()=>this.distance,o=>this.distance=o,{noExport:!0}),this.field("decay",()=>this.decay,o=>this.decay=o,{noExport:!0}),this.updateProjectionMatrix()}get lightType(){return this._lightType}set lightType(i){this._lightType=i,this.updateProjectionMatrix()}updateProjectionMatrix(){this.fov=this.angle/Math.PI*180,super.updateProjectionMatrix()}setShadowMap(i){this.renderTarget=i,this.renderTarget.setSize(this._shadowMapSize)}setShadowMapSize(i){this._shadowMapSize.copy(i),this.renderTarget&&this.renderTarget.setSize(this._shadowMapSize)}lookAt(i){this.entity.lookAt(i),this.entity.quaternion.multiply(new Bu().setFromEuler(new Ms(Math.PI/2)))}}class li extends Te{constructor(i){super(i);y(this,"node");y(this,"rotationOffsetX");y(this,"animations");y(this,"uniforms");y(this,"uniformCurves");y(this,"transformAutoUpdate");y(this,"_blidge");y(this,"_cameraComponent");y(this,"_lightComponent");this.rotationOffsetX=0,this.animations=new Map,this.uniforms={},this.uniformCurves=new Map,this.transformAutoUpdate=!0,this._blidge=i.args.blidge,this.node=i.args.node,this.node.type=="camera"&&(this.rotationOffsetX=-Math.PI/2);const o=Object.keys(this.node.animations);for(let c=0;c<o.length;c++){const v=o[c];this.animations.set(v,this._blidge.getCurveGroup(this.node.animations[v]))}const s=Object.keys(this.node.uniforms);for(let c=0;c<s.length;c++){const v=s[c],h=this.node.uniforms[v],p=this._blidge.curveGroups[h];p&&(this.uniformCurves.set(v,p),this.uniforms[v]={type:"4fv",value:p.value})}const d=this.entity;if(this.node.uuid&&(d.uuid=this.node.uuid),d.name=this.node.name,d.position.set(this.node.position[0],this.node.position[1],this.node.position[2]),d.quaternion.setFromEuler({x:this.node.rotation[0]+this.rotationOffsetX,y:this.node.rotation[1],z:this.node.rotation[2]},"YZX"),d.quaternion.updated=!1,d.euler.setFromQuaternion(d.quaternion),d.scale.set(this.node.scale[0],this.node.scale[1],this.node.scale[2]),this.node.type=="cube"){const c=d.addComponent(me),v=this.node.param;c.geometry=new _r({width:v.x,height:v.y,depth:v.z,segmentsWidth:10,segmentsHeight:10,segmentsDepth:10})}else if(this.node.type=="sphere"){const c=d.addComponent(me),v=this.node.param;c.geometry=new ir({radius:v.r,widthSegments:32,heightSegments:16})}else if(this.node.type=="cylinder"){const c=d.addComponent(me);c.geometry=new bf}else if(this.node.type=="plane"){const c=d.addComponent(me),v=this.node.param;c.geometry=new ro({width:v.x,height:v.y})}else if(this.node.type=="mesh"){const c=d.addComponent(me),v=this.node.param,h=new Io;h.setAttribute("position",v.position,3),h.setAttribute("uv",v.uv,2),h.setAttribute("normal",v.normal,3),h.setAttribute("index",v.index,3),c.geometry=h}else if(this.node.type=="gltf"){const c=d.addComponent(me);this._blidge.gltfPrm.then(v=>{const h=v.scene.findEntityByName(this.node.name);if(h){const p=h.getComponent(me);p&&(c.geometry=p.geometry,c.material=p.material)}this.emit("update/blidge/scene",[d])})}if(this.node.type=="light"){const c=this.node.param;this._lightComponent=d.addComponent(Ps),this._lightComponent.deserialize({...c,lightType:c.type,color:new Q().copy(c.color).getElm("vec3"),castShadow:c.shadow_map!==void 0?c.shadow_map:!0})}if(this.node.type=="camera"&&(this._cameraComponent=d.getComponentsByTag("camera")[0],this._cameraComponent)){const c=this.node.param;this._cameraComponent.fov=c.fov}d.visible=this.node.visible,this.field("uuid",()=>this.node.uuid||"",void 0,{noExport:!0,readOnly:!0}),this.field("type",()=>this.node.type,void 0,{noExport:!0,readOnly:!0}),this.field("param",()=>JSON.stringify(this.node.param),void 0,{noExport:!0,readOnly:!0})}bindUniforms(i){Object.assign(i,this.uniforms)}updateImpl(i){if(!this._blidge||!this.node)return;const o=i.timeCode*this._blidge.frame.fps;if(this.animations.forEach(d=>{d.setFrame(o)}),this.transformAutoUpdate){const d=this.animations.get("position");if(d){const h=d.value;d.getFCurve("x")&&(this.entity.position.x=h.x),d.getFCurve("y")&&(this.entity.position.y=h.y),d.getFCurve("z")&&(this.entity.position.z=h.z)}const c=this.animations.get("rotation");if(c){const h={x:this.node.rotation[0],y:this.node.rotation[1],z:this.node.rotation[2]},p=c.value;c.getFCurve("x")&&(h.x=p.x),c.getFCurve("y")&&(h.y=p.y),c.getFCurve("z")&&(h.z=p.z),this.entity.quaternion.setFromEuler({x:h.x+this.rotationOffsetX,y:h.y,z:h.z},"YZX")}const v=this.animations.get("scale");if(v){const h=v.setFrame(o).value;v.getFCurve("x")&&(this.entity.scale.x=h.x),v.getFCurve("y")&&(this.entity.scale.y=h.y),v.getFCurve("z")&&(this.entity.scale.z=h.z)}}const s=this.animations.get("hide");if(s&&(this.entity.visible=s.value.x<.5),this._lightComponent){const d=this.animations.get("light");if(d){const c=d.setFrame(o).value;this._lightComponent.intensity=c.x}}this.uniformCurves.forEach((d,c)=>{this.uniforms[c].value=d.setFrame(o).value})}}class Br extends As{constructor(i){super();y(this,"name");y(this,"enabled");y(this,"_passes");const s=("pipeline"in i?void 0:i)||{};this.name=s.name||"",this.enabled=!0,this._passes=s.passes||[]}get passes(){return this._passes}get hasOutput(){return this._passes.length>0&&this._passes.some(i=>i.enabled)}get output(){for(let i=this._passes.length-1;i>=0;i--){const o=this._passes[i];if(!o.passThrough&&o.enabled)return o.renderTarget}return null}resize(i){if(this._passes)for(let o=0;o<this._passes.length;o++)this._passes[o].resize(i)}dispose(){this.emit("dispose")}}class zb extends Br{constructor(i){super({...i});y(this,"_passes");y(this,"date");this._passes=i.passes,this.date=new Date}get passes(){return this._passes}compute(i){const o=Math.min(.016666666666666666,(new Date().getTime()-this.date.getTime())/1e3);this.date=new Date,this.passes.forEach(s=>{s.uniforms.uDeltaTime.value=o}),i.renderPostProcess(this)}}const YN=`// @shader-file: packages/maxpower/PostProcess/PostProcessPass/shaders/pass.fs
#include <common>\r
\r
uniform sampler2D uBackBuffer0;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
in vec2 vUv;\r
\r
void main( void ) {\r
\r
	outColor = texture( uBackBuffer0, vUv );\r
	outColor.w = 1.0;\r
\r
}`,qN=`// @shader-file: packages/maxpower/PostProcess/PostProcessPass/shaders/quad.vs
layout ( location = 0 ) in vec3 position;\r
layout ( location = 1 ) in vec2 uv;\r
\r
out vec2 vUv;\r
\r
void main( void ) {\r
\r
	vec3 pos = position;\r
	gl_Position = vec4( pos.xy, 0.0, 1.0 );\r
	vUv = uv;\r
\r
}`;class yt extends He{constructor(i,o){super({...o,frag:o.frag||YN,vert:o.vert||qN});y(this,"enabled");y(this,"renderTarget");y(this,"backBufferOverride");y(this,"clearColor");y(this,"clearDepth");y(this,"resolutionRatio");y(this,"passThrough");y(this,"resolution");y(this,"resolutionInv");y(this,"viewPort");y(this,"_fixedResolution");this.enabled=!0,this._fixedResolution=o.fixedResotluion?o.fixedResotluion.clone():null,this.resolution=new Q,this.resolutionInv=new Q,this.viewPort=null,this.uniforms.uPPResolution={value:this.resolution,type:"2fv"},this.uniforms.uPPPixelSize={value:this.resolutionInv,type:"2fv"},this.renderTarget=o.renderTarget!==void 0?o.renderTarget:new Et(i).setTexture([new rt(i).setting({magFilter:i.LINEAR,minFilter:i.LINEAR})]),this.clearColor=o.clearColor??null,this.clearDepth=o.clearDepth??null,this.depthTest=o.depthTest!==void 0?o.depthTest:!1,this.resolutionRatio=o.resolutionRatio||1,this.passThrough=o.passThrough??!1,this.viewPort=o.viewPort||null,this.backBufferOverride=o.backBufferOverride||null}get fixedResolution(){return this._fixedResolution}set fixedResolution(i){this._fixedResolution=i,this.resize(i||new Q)}onAfterRender(){}resize(i){this._fixedResolution?this.resolution.copy(this._fixedResolution):this.resolution.copy(i).multiply(this.resolutionRatio),this.resolutionInv.set(1/this.resolution.x,1/this.resolution.y),this.renderTarget&&this.renderTarget.setSize(this.resolution)}setRendertarget(i){this.renderTarget=i,this.renderTarget&&(this.renderTarget.size.x!=this.resolution.x||this.renderTarget.size.y!=this.resolution.y)&&this.renderTarget.setSize(this.resolution)}}var Ce;(m=>{m.assign=(l,...i)=>{for(let o=0;o<i.length;o++)i[o]!=null&&Object.assign(l,i[o]);return l},m.merge=(...l)=>{const i={};return(0,m.assign)(i,...l)}})(Ce||(Ce={}));const XN=`// @shader-file: packages/maxpower/Component/GPUComputePass/shaders/quad.vs
layout ( location = 0 ) in vec3 position;\r
layout ( location = 1 ) in vec2 uv;\r
\r
out vec2 vUv;\r
\r
\r
void main( void ) {\r
\r
	vec3 pos = position;\r
	gl_Position = vec4( pos.xy, 0.0, 1.0 );\r
	vUv = uv;\r
\r
}`;class Ab extends yt{constructor(i,o){const s=Object.assign({type:i.FLOAT,internalFormat:i.RGBA32F,format:i.RGBA,magFilter:i.NEAREST,minFilter:i.NEAREST},o.textureParam),d=new Et(i).setTexture(new Array(o.dataLayerCount).fill(0).map(()=>new rt(i).setting(s))).setSize(o.size),c=new Et(i).setTexture(new Array(o.dataLayerCount).fill(0).map(()=>new rt(i).setting(s))).setSize(o.size),v={uGPUResolution:{value:o.size,type:"2fv"}};for(let h=0;h<o.dataLayerCount;h++)v["uGPUSampler"+h]={value:c.textures[h],type:"1i"};super(i,{...o,vert:o.vert||XN,renderTarget:d,uniforms:Ce.merge(o.uniforms,v,{uDeltaTime:{value:0,type:"1f"}})});y(this,"gl");y(this,"size");y(this,"layerCnt");y(this,"clearColor");y(this,"rt1");y(this,"rt2");y(this,"outputUniforms");this.gl=i,this.size=o.size,this.layerCnt=o.dataLayerCount,this.rt1=d,this.rt2=c,this.renderTarget=this.rt1,this.clearColor=o.clearColor??null,this.outputUniforms=v}onAfterRender(){super.onAfterRender();for(let o=0;o<this.layerCnt;o++)this.outputUniforms["uGPUSampler"+o].value=this.renderTarget.textures[o];const i=this.rt1;this.rt1=this.rt2,this.rt2=i,this.renderTarget=this.rt1}initTexture(i){for(let o=0;o<this.layerCnt;o++){this.gl.bindTexture(this.gl.TEXTURE_2D,this.rt2.textures[o].getTexture());const s=[];for(let d=0;d<this.size.y;d++)for(let c=0;c<this.size.x;c++){const v=c,h=d;s.push(...i(o,v,h))}this.gl.texSubImage2D(this.gl.TEXTURE_2D,0,0,0,this.size.x,this.size.y,this.gl.RGBA,this.gl.FLOAT,new Float32Array(s))}this.gl.bindTexture(this.gl.TEXTURE_2D,null)}}class Lu extends _f{constructor(i){super(i);y(this,"dofParams");y(this,"_gl");y(this,"_renderTarget");y(this,"_gBuffer");y(this,"_resolution");this.dofParams={focusDistance:.5,kFilmHeight:.008};const o=i.args.gl;this._gl=o,this._resolution=new Q,this._gBuffer=new Et(o),this._gBuffer.setTexture([new rt(o).setting({type:o.FLOAT,internalFormat:o.RGBA32F,format:o.RGBA,magFilter:o.NEAREST,minFilter:o.NEAREST}),new rt(o).setting({type:o.FLOAT,internalFormat:o.RGBA32F,format:o.RGBA}),new rt(o),new rt(o),new rt(o).setting({type:o.FLOAT,internalFormat:o.RGBA32F,format:o.RGBA})]);const s=new Et(o,{disableDepthBuffer:!0});s.setTexture([new rt(o).setting({type:o.FLOAT,internalFormat:o.RGBA16F,format:o.RGBA}),new rt(o).setting({type:o.FLOAT,internalFormat:o.RGBA16F,format:o.RGBA})]);const d=new Et(o,{disableDepthBuffer:!0});d.setDepthTexture(this._gBuffer.depthTexture),d.setTexture([s.textures[0],this._gBuffer.textures[0],this._gBuffer.textures[4]]);const c=new Et(o,{disableDepthBuffer:!0});c.setDepthTexture(this._gBuffer.depthTexture),c.setTexture([new rt(o)]),this._renderTarget={gBuffer:this._gBuffer,shadingBuffer:s,forwardBuffer:d,uiBuffer:c},this.resize(this._resolution)}get resolution(){return this._resolution}get gBuffer(){return this._gBuffer}get renderTarget(){return this._renderTarget}resize(i){i.x==this._resolution.x&&i.y==this._resolution.y||(this._resolution.copy(i),this.aspect=i.x/i.y,this._renderTarget&&(this._renderTarget.gBuffer.setSize(this._resolution),this._renderTarget.shadingBuffer.setSize(this._resolution),this._renderTarget.forwardBuffer.setSize(this._resolution),this._renderTarget.uiBuffer.setSize(this._resolution)),this.needsUpdateProjectionMatrix=!0)}}new He;class Ob extends Te{constructor(i){super(i);y(this,"_resolution");y(this,"_postProcesses");y(this,"_postProcessesDict");this._postProcesses=[],this._postProcessesDict=new Map,this._resolution=new Q,this.field("postprocess",()=>this._postProcesses.map((o,s)=>o.enabled),o=>{o.forEach((s,d)=>{const c=this._postProcesses[d];c&&(c.enabled=s)})},{format:{type:"array",labels:(o,s)=>this._postProcesses[s].name}})}get postProcesses(){return this._postProcesses}add(i,...o){const[s]=o,d=new i({pipeline:this,args:s||{}});return this.postProcesses.push(d),d.resize(this._resolution),d}remove(i){const o=this._postProcesses.indexOf(i);o>-1&&this._postProcesses.splice(o,1)}resize(i){this._resolution.copy(i),this.postProcesses.forEach(o=>{o.resize(i)})}}const tb=new Map,Se=(m,l)=>{{const i=tb.get(m);if(i)return i;tb.set(m,l)}return l},$N=`// @shader-file: packages/maxpower/Utils/ShaderParser/shaderModules/common.module.glsl
#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metalic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
	float gradient;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 rgb2hsv(vec3 c)\r
{\r
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\r
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\r
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\r
\r
    float d = q.x - min(q.w, q.y);\r
    float e = 1.0e-10;\r
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\r
}\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}`,KN=`// @shader-file: packages/maxpower/Utils/ShaderParser/shaderModules/hash.module.glsl
// https://www.shadertoy.com/view/4djSRW

// Hash without Sine
// MIT License...
/* Copyright (c)2014 David Hoskins.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

//----------------------------------------------------------------------------------------
//  1 out, 1 in...
float hash11(float p)
{
    p = fract(p * .1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

//----------------------------------------------------------------------------------------
//  1 out, 2 in...
float hash12(vec2 p)
{
	vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

//----------------------------------------------------------------------------------------
//  1 out, 3 in...
float hash13(vec3 p3)
{
	p3  = fract(p3 * .1031);
    p3 += dot(p3, p3.zyx + 31.32);
    return fract((p3.x + p3.y) * p3.z);
}
//----------------------------------------------------------------------------------------
// 1 out 4 in...
float hash14(vec4 p4)
{
	p4 = fract(p4  * vec4(.1031, .1030, .0973, .1099));
    p4 += dot(p4, p4.wzxy+33.33);
    return fract((p4.x + p4.y) * (p4.z + p4.w));
}

//----------------------------------------------------------------------------------------
//  2 out, 1 in...
vec2 hash21(float p)
{
	vec3 p3 = fract(vec3(p) * vec3(.1031, .1030, .0973));
	p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx+p3.yz)*p3.zy);

}

//----------------------------------------------------------------------------------------
///  2 out, 2 in...
vec2 hash22(vec2 p)
{
	vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx+33.33);
    return fract((p3.xx+p3.yz)*p3.zy);

}

//----------------------------------------------------------------------------------------
///  2 out, 3 in...
vec2 hash23(vec3 p3)
{
	p3 = fract(p3 * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx+33.33);
    return fract((p3.xx+p3.yz)*p3.zy);
}

//----------------------------------------------------------------------------------------
//  3 out, 1 in...
vec3 hash31(float p)
{
   vec3 p3 = fract(vec3(p) * vec3(.1031, .1030, .0973));
   p3 += dot(p3, p3.yzx+33.33);
   return fract((p3.xxy+p3.yzz)*p3.zyx); 
}


//----------------------------------------------------------------------------------------
///  3 out, 2 in...
vec3 hash32(vec2 p)
{
	vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yxz+33.33);
    return fract((p3.xxy+p3.yzz)*p3.zyx);
}

//----------------------------------------------------------------------------------------
///  3 out, 3 in...
vec3 hash33(vec3 p3)
{
	p3 = fract(p3 * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yxz+33.33);
    return fract((p3.xxy + p3.yxx)*p3.zyx);

}

//----------------------------------------------------------------------------------------
// 4 out, 1 in...
vec4 hash41(float p)
{
	vec4 p4 = fract(vec4(p) * vec4(.1031, .1030, .0973, .1099));
    p4 += dot(p4, p4.wzxy+33.33);
    return fract((p4.xxyz+p4.yzzw)*p4.zywx);
    
}

//----------------------------------------------------------------------------------------
// 4 out, 2 in...
vec4 hash42(vec2 p)
{
	vec4 p4 = fract(vec4(p.xyxy) * vec4(.1031, .1030, .0973, .1099));
    p4 += dot(p4, p4.wzxy+33.33);
    return fract((p4.xxyz+p4.yzzw)*p4.zywx);

}

//----------------------------------------------------------------------------------------
// 4 out, 3 in...
vec4 hash43(vec3 p)
{
	vec4 p4 = fract(vec4(p.xyzx)  * vec4(.1031, .1030, .0973, .1099));
    p4 += dot(p4, p4.wzxy+33.33);
    return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}

//----------------------------------------------------------------------------------------
// 4 out, 4 in...
vec4 hash44(vec4 p4)
{
	p4 = fract(p4  * vec4(.1031, .1030, .0973, .1099));
    p4 += dot(p4, p4.wzxy+33.33);
    return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}`,QN=`// @shader-file: packages/maxpower/Utils/ShaderParser/shaderModules/light.module.glsl
struct DirectionalLight {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
struct SpotLight {\r
	vec3 position;\r
	vec3 direction;\r
	vec3 color;\r
	float angle;\r
	float blend;\r
	float distance;\r
	float decay;\r
};\r
\r
struct LightCamera {\r
	float near;\r
	float far;\r
	mat4 viewMatrix;\r
	mat4 projectionMatrix;\r
	vec2 resolution;\r
};\r
\r
struct Light {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
#if NUM_LIGHT_DIR > 0 \r
\r
	uniform DirectionalLight uDirectionalLight[NUM_LIGHT_DIR];\r
	uniform LightCamera uDirectionalLightCamera[NUM_LIGHT_DIR];\r
\r
	#if NUM_SHADOWMAP_DIR > 0 \r
\r
	uniform sampler2D uDirectionalLightShadowMap[NUM_SHADOWMAP_DIR];\r
\r
	#endif\r
	\r
#endif\r
\r
#if NUM_LIGHT_SPOT > 0 \r
\r
	uniform SpotLight uSpotLight[NUM_LIGHT_SPOT];\r
	uniform LightCamera uSpotLightCamera[NUM_LIGHT_SPOT];\r
\r
	#if NUM_SHADOWMAP_SPOT > 0 \r
	\r
		uniform sampler2D uSpotLightShadowMap[NUM_SHADOWMAP_SPOT];\r
\r
	#endif\r
	\r
#endif\r
\r
// shadowmap\r
\r
float compareShadowDepth( float lightDepth, sampler2D shadowMap, vec2 shadowCoord, float depthOffset ) {\r
\r
	float shadowMapDepth = rgbaToFloat( texture( shadowMap, shadowCoord ) );\r
\r
	if( shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0 ) {\r
\r
		return step( lightDepth, shadowMapDepth + depthOffset );\r
\r
	}\r
\r
	return 1.0;\r
\r
}\r
\r
// shadow\r
\r
void setShadowCoord( vec3 pos, LightCamera camera, inout vec2 shadowCoord, inout float lightDepth ) {\r
	\r
	vec4 mvPosition = camera.viewMatrix * vec4( pos, 1.0 );\r
	vec4 mvpPosition = camera.projectionMatrix * mvPosition;\r
	shadowCoord = ( mvpPosition.xy / mvpPosition.w ) * 0.5 + 0.5;\r
	\r
	float lightNear = camera.near;\r
	float lightFar = camera.far;\r
	lightDepth = ( -mvPosition.z - lightNear ) / ( lightFar - lightNear );\r
\r
}\r
\r
float getShadow( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
\r
	return compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
}\r
\r
#define SHADOW_SAMPLE_COUNT 2\r
\r
float getShadowSmooth( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
	\r
	float shadowSum = compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
	for( int i = 0; i < SHADOW_SAMPLE_COUNT; i++ ) {\r
\r
		vec2 offset = 1.0 / camera.resolution * ( float( i + 1 ) / float(SHADOW_SAMPLE_COUNT) );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, -offset.y ), depthOffset );\r
		\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, 0.0 ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, 0.0 ), depthOffset );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, offset.y ), depthOffset );\r
\r
	}\r
\r
	return shadowSum / ( float( SHADOW_SAMPLE_COUNT ) * 8.0 );\r
\r
}\r
\r
float ggx( float dNH, float roughness ) {\r
	\r
	float a2 = roughness * roughness;\r
	a2 = a2 * a2;\r
	float dNH2 = dNH * dNH;\r
\r
	if( dNH2 <= 0.0 ) return 0.0;\r
\r
	return a2 / ( PI * pow( dNH2 * ( a2 - 1.0 ) + 1.0, 2.0) );\r
\r
}\r
\r
vec3 lambert( vec3 diffuseColor ) {\r
\r
	return diffuseColor / PI;\r
\r
}\r
\r
float gSchlick( float d, float k ) {\r
\r
	if( d == 0.0 ) return 0.0;\r
\r
	return d / ( d * ( 1.0 - k ) + k );\r
	\r
}\r
\r
float gSmith( float dNV, float dNL, float roughness ) {\r
\r
	float k = clamp( roughness * sqrt( 2.0 / PI ), 0.0, 1.0 );\r
\r
	return gSchlick( dNV, k ) * gSchlick( dNL, k );\r
	\r
}\r
\r
float fresnel( float d ) {\r
	\r
	float f0 = 0.04;\r
\r
	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );\r
\r
}\r
\r
vec3 RE( Geometry geo, Material mat, Light light) {\r
\r
	vec3 lightDir = normalize( light.direction );\r
	vec3 halfVec = normalize( geo.viewDir + lightDir );\r
\r
	float dLH = clamp( dot( lightDir, halfVec ), 0.0, 1.0 );\r
	float dNH = clamp( dot( geo.normal, halfVec ), 0.0, 1.0 );\r
	float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );\r
	float dNL = clamp( dot( geo.normal, lightDir), 0.0, 1.0 );\r
\r
	vec3 irradiance = light.color * dNL;\r
\r
	// diffuse\r
	vec3 diffuse = lambert( mat.diffuseColor ) * irradiance;\r
\r
	// specular\r
	float D = ggx( dNH, mat.roughness );\r
	float G = gSmith( dNV, dNL, mat.roughness );\r
	float F = fresnel( dLH );\r
	\r
	vec3 specular = (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance; \r
\r
	vec3 c = vec3( 0.0 );\r
	c += diffuse * ( 1.0 - F ) + specular;\r
\r
	return c;\r
\r
}`,ZN=`// @shader-file: packages/maxpower/Utils/ShaderParser/shaderModules/matrix.module.glsl
// マトリックス生成ユーティリティ関数

// スケールマトリックス（均等）
mat4 makeScale(float scale) {
	return mat4(
		scale, 0.0,   0.0,   0.0,
		0.0,   scale, 0.0,   0.0,
		0.0,   0.0,   scale, 0.0,
		0.0,   0.0,   0.0,   1.0
	);
}

// スケールマトリックス（xyz個別）
mat4 makeScale(vec3 scale) {
	return mat4(
		scale.x, 0.0,     0.0,     0.0,
		0.0,     scale.y, 0.0,     0.0,
		0.0,     0.0,     scale.z, 0.0,
		0.0,     0.0,     0.0,     1.0
	);
}

// 平行移動マトリックス
mat4 makeTranslation(vec3 translation) {
	return mat4(
		1.0, 0.0, 0.0, 0.0,
		0.0, 1.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		translation.x, translation.y, translation.z, 1.0
	);
}

// X軸回転マトリックス
mat4 makeRotationX(float angle) {
	float c = cos(angle);
	float s = sin(angle);
	return mat4(
		1.0, 0.0, 0.0, 0.0,
		0.0, c,   -s,  0.0,
		0.0, s,   c,   0.0,
		0.0, 0.0, 0.0, 1.0
	);
}

// Y軸回転マトリックス
mat4 makeRotationY(float angle) {
	float c = cos(angle);
	float s = sin(angle);
	return mat4(
		c,   0.0, s,   0.0,
		0.0, 1.0, 0.0, 0.0,
		-s,  0.0, c,   0.0,
		0.0, 0.0, 0.0, 1.0
	);
}

// Z軸回転マトリックス
mat4 makeRotationZ(float angle) {
	float c = cos(angle);
	float s = sin(angle);
	return mat4(
		c,   -s,  0.0, 0.0,
		s,   c,   0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
	);
}

// XY平面回転マトリックス（Z軸回転と同等）
mat4 makeRotationXY(float angle) {
	return makeRotationZ(angle);
}

// YZ平面回転マトリックス（X軸回転と同等）
mat4 makeRotationYZ(float angle) {
	return makeRotationX(angle);
}

// XZ平面回転マトリックス（Y軸回転の逆）
mat4 makeRotationXZ(float angle) {
	return makeRotationY(-angle);
}

// オイラー角から回転マトリックス生成（ZYX順）
mat4 makeRotationFromEuler(vec3 euler) {
	return makeRotationZ(euler.z) * makeRotationY(euler.y) * makeRotationX(euler.x);
}

// 3x3回転マトリックスを4x4に拡張
mat4 mat3ToMat4(mat3 m) {
	return mat4(
		m[0][0], m[0][1], m[0][2], 0.0,
		m[1][0], m[1][1], m[1][2], 0.0,
		m[2][0], m[2][1], m[2][2], 0.0,
		0.0,     0.0,     0.0,     1.0
	);
}

// 法線変換用：4x4マトリックスから回転・スケール部分（3x3）を抽出
mat3 normalMatrix(mat4 m) {
	return mat3(
		m[0][0], m[0][1], m[0][2],
		m[1][0], m[1][1], m[1][2],
		m[2][0], m[2][1], m[2][2]
	);
}
`,JN=`// @shader-file: packages/maxpower/Utils/ShaderParser/shaderModules/noiseCyclic.module.glsl
\r
// https://www.shadertoy.com/view/3tcyD7\r
\r
vec3 noiseCyc( vec3 p ){\r
\r
  vec4 n = vec4(0);\r
  float a=1.0;\r
\r
  for( int i = 0; i < 8; i++ ){\r
    p += sin( p.zxy );\r
    n += vec4(cross(sin(p.xyz), cos(p.yzx)), 1.0) * a;\r
    a *= 0.6;\r
    p *= 1.5;\r
  }\r
\r
  n.xyz /= n.w;\r
\r
  return n.xyz;\r
\r
}`,eR=`// @shader-file: packages/maxpower/Utils/ShaderParser/shaderModules/noiseSimplex.module.glsl
\r
// https://github.com/ashima/webgl-noise/blob/master/src/noise4D.glsl\r
\r
//\r
// Description : Array and textureless GLSL 2D/3D/4D simplex \r
//               noise functions.\r
//      Author : Ian McEwan, Ashima Arts.\r
//  Maintainer : stegu\r
//     Lastmod : 20110822 (ijm)\r
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\r
//               Distributed under the MIT License. See LICENSE file.\r
//               https://github.com/ashima/webgl-noise\r
//               https://github.com/stegu/webgl-noise\r
// \r
\r
vec4 mod289(vec4 x) {\r
  return x - floor(x * (1.0 / 289.0)) * 289.0; }\r
\r
vec3 mod289(vec3 x) {\r
  return x - floor(x * (1.0 / 289.0)) * 289.0;\r
}\r
\r
float mod289(float x) {\r
  return x - floor(x * (1.0 / 289.0)) * 289.0; }\r
\r
vec4 permute(vec4 x) {\r
     return mod289(((x*34.0)+10.0)*x);\r
}\r
\r
float permute(float x) {\r
     return mod289(((x*34.0)+10.0)*x);\r
}\r
\r
vec4 taylorInvSqrt(vec4 r)\r
{\r
  return 1.79284291400159 - 0.85373472095314 * r;\r
}\r
\r
float taylorInvSqrt(float r)\r
{\r
  return 1.79284291400159 - 0.85373472095314 * r;\r
}\r
\r
vec4 grad4(float j, vec4 ip)\r
  {\r
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\r
  vec4 p,s;\r
\r
  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\r
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\r
  s = vec4(lessThan(p, vec4(0.0)));\r
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www; \r
\r
  return p;\r
  }\r
						\r
// (sqrt(5) - 1)/4 = F4, used once below\r
#define F4 0.309016994374947451\r
\r
float noiseSimplex(vec4 v)\r
  {\r
  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4\r
                        0.276393202250021,  // 2 * G4\r
                        0.414589803375032,  // 3 * G4\r
                       -0.447213595499958); // -1 + 4 * G4\r
\r
// First corner\r
  vec4 i  = floor(v + dot(v, vec4(F4)) );\r
  vec4 x0 = v -   i + dot(i, C.xxxx);\r
\r
// Other corners\r
\r
// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)\r
  vec4 i0;\r
  vec3 isX = step( x0.yzw, x0.xxx );\r
  vec3 isYZ = step( x0.zww, x0.yyz );\r
//  i0.x = dot( isX, vec3( 1.0 ) );\r
  i0.x = isX.x + isX.y + isX.z;\r
  i0.yzw = 1.0 - isX;\r
//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );\r
  i0.y += isYZ.x + isYZ.y;\r
  i0.zw += 1.0 - isYZ.xy;\r
  i0.z += isYZ.z;\r
  i0.w += 1.0 - isYZ.z;\r
\r
  // i0 now contains the unique values 0,1,2,3 in each channel\r
  vec4 i3 = clamp( i0, 0.0, 1.0 );\r
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\r
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\r
\r
  //  x0 = x0 - 0.0 + 0.0 * C.xxxx\r
  //  x1 = x0 - i1  + 1.0 * C.xxxx\r
  //  x2 = x0 - i2  + 2.0 * C.xxxx\r
  //  x3 = x0 - i3  + 3.0 * C.xxxx\r
  //  x4 = x0 - 1.0 + 4.0 * C.xxxx\r
  vec4 x1 = x0 - i1 + C.xxxx;\r
  vec4 x2 = x0 - i2 + C.yyyy;\r
  vec4 x3 = x0 - i3 + C.zzzz;\r
  vec4 x4 = x0 + C.wwww;\r
\r
// Permutations\r
  i = mod289(i); \r
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);\r
  vec4 j1 = permute( permute( permute( permute (\r
             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\r
           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\r
           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\r
           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\r
\r
// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope\r
// 7*7*6 = 294, which is close to the ring size 17*17 = 289.\r
  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\r
\r
  vec4 p0 = grad4(j0,   ip);\r
  vec4 p1 = grad4(j1.x, ip);\r
  vec4 p2 = grad4(j1.y, ip);\r
  vec4 p3 = grad4(j1.z, ip);\r
  vec4 p4 = grad4(j1.w, ip);\r
\r
// Normalise gradients\r
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r
  p0 *= norm.x;\r
  p1 *= norm.y;\r
  p2 *= norm.z;\r
  p3 *= norm.w;\r
  p4 *= taylorInvSqrt(dot(p4,p4));\r
\r
// Mix contributions from the five corners\r
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);\r
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);\r
  m0 = m0 * m0;\r
  m1 = m1 * m1;\r
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))\r
               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;\r
\r
  }\r
\r
//\r
// Description : Array and textureless GLSL 2D/3D/4D simplex \r
//               noise functions.\r
//      Author : Ian McEwan, Ashima Arts.\r
//  Maintainer : stegu\r
//     Lastmod : 20201014 (stegu)\r
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\r
//               Distributed under the MIT License. See LICENSE file.\r
//               https://github.com/ashima/webgl-noise\r
//               https://github.com/stegu/webgl-noise\r
// \r
\r
\r
float noiseSimplex(vec3 v)\r
  { \r
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r
\r
// First corner\r
  vec3 i  = floor(v + dot(v, C.yyy) );\r
  vec3 x0 =   v - i + dot(i, C.xxx) ;\r
\r
// Other corners\r
  vec3 g = step(x0.yzx, x0.xyz);\r
  vec3 l = 1.0 - g;\r
  vec3 i1 = min( g.xyz, l.zxy );\r
  vec3 i2 = max( g.xyz, l.zxy );\r
\r
  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\r
  //   x1 = x0 - i1  + 1.0 * C.xxx;\r
  //   x2 = x0 - i2  + 2.0 * C.xxx;\r
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\r
  vec3 x1 = x0 - i1 + C.xxx;\r
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\r
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\r
\r
// Permutations\r
  i = mod289(i); \r
  vec4 p = permute( permute( permute( \r
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \r
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r
\r
// Gradients: 7x7 points over a square, mapped onto an octahedron.\r
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\r
  float n_ = 0.142857142857; // 1.0/7.0\r
  vec3  ns = n_ * D.wyz - D.xzx;\r
\r
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\r
\r
  vec4 x_ = floor(j * ns.z);\r
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\r
\r
  vec4 x = x_ *ns.x + ns.yyyy;\r
  vec4 y = y_ *ns.x + ns.yyyy;\r
  vec4 h = 1.0 - abs(x) - abs(y);\r
\r
  vec4 b0 = vec4( x.xy, y.xy );\r
  vec4 b1 = vec4( x.zw, y.zw );\r
\r
  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\r
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\r
  vec4 s0 = floor(b0)*2.0 + 1.0;\r
  vec4 s1 = floor(b1)*2.0 + 1.0;\r
  vec4 sh = -step(h, vec4(0.0));\r
\r
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r
\r
  vec3 p0 = vec3(a0.xy,h.x);\r
  vec3 p1 = vec3(a0.zw,h.y);\r
  vec3 p2 = vec3(a1.xy,h.z);\r
  vec3 p3 = vec3(a1.zw,h.w);\r
\r
//Normalise gradients\r
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r
  p0 *= norm.x;\r
  p1 *= norm.y;\r
  p2 *= norm.z;\r
  p3 *= norm.w;\r
\r
// Mix final noise value\r
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\r
  m = m * m;\r
  return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), \r
                                dot(p2,x2), dot(p3,x3) ) );\r
  }`,tR=`// @shader-file: packages/maxpower/Utils/ShaderParser/shaderModules/noiseValue.module.glsl
\r
// https://www.shadertoy.com/view/4dS3Wd\r
\r
float hashv(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }\r
float hashv(vec2 p) {vec3 p3 = fract(vec3(p.xyx) * 0.13); p3 += dot(p3, p3.yzx + 3.333); return fract((p3.x + p3.y) * p3.z); }\r
\r
#define NUM_NOISE_OCTAVES 5\r
\r
float noiseValue(vec3 x) {\r
    const vec3 step = vec3(110, 241, 171);\r
\r
    vec3 i = floor(x);\r
    vec3 f = fract(x);\r
 \r
    // For performance, compute the base input to a 1D hash from the integer part of the argument and the \r
    // incremental change to the 1D based on the 3D -> 1D wrapping\r
    float n = dot(i, step);\r
\r
    vec3 u = f * f * (3.0 - 2.0 * f);\r
    return mix(mix(mix( hashv(n + dot(step, vec3(0, 0, 0))), hashv(n + dot(step, vec3(1, 0, 0))), u.x),\r
                   mix( hashv(n + dot(step, vec3(0, 1, 0))), hashv(n + dot(step, vec3(1, 1, 0))), u.x), u.y),\r
               mix(mix( hashv(n + dot(step, vec3(0, 0, 1))), hashv(n + dot(step, vec3(1, 0, 1))), u.x),\r
                   mix( hashv(n + dot(step, vec3(0, 1, 1))), hashv(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);\r
}\r
\r
float fbm(vec3 x) {\r
	float v = 0.0;\r
	float a = 0.5;\r
	vec3 shift = vec3(100);\r
	for (int i = 0; i < NUM_NOISE_OCTAVES; ++i) {\r
		v += a * noiseValue(x);\r
		x = x * 2.0 + shift;\r
		a *= 0.5;\r
    if( i == -1 ) break;\r
	}\r
	return v;\r
}\r
\r
float fbm(float x) {\r
  return fbm(vec3(x));\r
}`,nR=`// @shader-file: packages/maxpower/Utils/ShaderParser/shaderModules/pmrem.module.glsl
// https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L11C8-L11C15\r
\r
float getPmremFace( vec3 direction ) {\r
\r
	vec3 absDirection = abs( direction );\r
\r
	float face = - 1.0;\r
\r
	if ( absDirection.x > absDirection.z ) {\r
\r
		if ( absDirection.x > absDirection.y )\r
\r
			face = direction.x > 0.0 ? 0.0 : 3.0;\r
\r
		else\r
\r
			face = direction.y > 0.0 ? 1.0 : 4.0;\r
\r
	} else {\r
\r
		if ( absDirection.z > absDirection.y )\r
\r
			face = direction.z > 0.0 ? 2.0 : 5.0;\r
\r
		else\r
\r
			face = direction.y > 0.0 ? 1.0 : 4.0;\r
\r
	}\r
\r
	return face;\r
\r
}\r
\r
// https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L44\r
\r
vec2 getPmremUV( vec3 direction, float face ) {\r
\r
	vec2 uv;\r
\r
	if ( face == 0.0 ) {\r
\r
		uv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x\r
\r
	} else if ( face == 1.0 ) {\r
\r
		uv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y\r
\r
	} else if ( face == 2.0 ) {\r
\r
		uv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z\r
\r
	} else if ( face == 3.0 ) {\r
\r
		uv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x\r
\r
	} else if ( face == 4.0 ) {\r
\r
		uv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y\r
\r
	} else {\r
\r
		uv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z\r
\r
	}\r
\r
	return 0.5 * ( uv + 1.0 );\r
\r
}\r
\r
vec3 getPmremDir( vec2 uv, float face ) {\r
\r
	vec3 dir = vec3( 0.0 );\r
\r
	if ( face == 0.0 ) {\r
\r
		vec2 yz = ( vec2( uv.y, uv.x ) - 0.5 ) * 2.0;\r
		\r
		dir = vec3( 1.0, yz );\r
\r
	} else if( face == 1.0 ) {\r
\r
		vec2 xz = ( vec2( - uv.x, -uv.y ) + 0.5 ) * 2.0;\r
		\r
		dir = vec3( xz.x, 1.0, xz.y );\r
		\r
	} else if( face == 2.0 ) {\r
\r
		vec2 xy = ( vec2( - uv.x + 0.5, uv.y - 0.5 ) ) * 2.0;\r
		\r
		dir = vec3( xy, 1.0 );\r
		\r
	} else if( face == 3.0 ) {\r
\r
		vec2 zy = ( vec2( - uv.x + 0.5, uv.y - 0.5 ) ) * 2.0;\r
		\r
		dir = vec3( -1.0, zy.y, zy.x );\r
		\r
	} else if( face == 4.0 ) {\r
\r
		vec2 xz = ( vec2( - uv.x + 0.5 , uv.y - 0.5 ) ) * 2.0;\r
		\r
		dir = vec3( xz.x, -1.0, xz.y );\r
		\r
	} else if( face == 5.0 ) {\r
\r
		vec2 xy = ( vec2( uv.x, uv.y ) - 0.5 ) * 2.0;\r
		\r
		dir = vec3( xy, -1.0 );\r
		\r
	}\r
\r
	return normalize( dir );\r
\r
}\r
\r
\r
//https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L132\r
\r
#define MAXMIP 5.0\r
\r
float roughnessToMip( float roughness ) {\r
\r
	float mip = 0.0;\r
\r
	mip = roughness * ( MAXMIP - 1.0 );\r
\r
	return mip;\r
\r
}\r
\r
vec3 getPmremMip( sampler2D envMap, vec3 direction, float mip ) {\r
\r
	float face = getPmremFace( direction );\r
	vec2 uv = getPmremUV( direction, face );\r
\r
	vec2 faceRes = vec2(textureSize( envMap, 0 )) * pow( 0.5, floor( mip ) );\r
	float s = 2.0;\r
	uv *= faceRes - 2.0 * s;\r
	uv += 1.0 * s;\r
	uv /= faceRes;\r
\r
	uv.x += mod( face, 3.0 );\r
	uv.y += floor( face / 3.0) ;\r
	\r
	uv.y *= 0.5;\r
	uv.y *= 0.5;\r
	uv.x /= 3.0;\r
\r
	float scale = 1.0 - pow( 2.0, -floor(mip) );\r
	uv.y *= 1.0 - scale;\r
	uv.x *= 1.0 - scale;\r
	uv.y += scale;\r
\r
	vec4 col = textureGrad( envMap, uv, vec2( 0.0 ), vec2( 0.0 )  );\r
\r
	return col.xyz / col.w;\r
\r
}\r
\r
vec3 getPmrem( sampler2D envMap, vec3 direction, float roughness ) {\r
\r
	float mip = roughnessToMip( roughness );\r
	float mipF = fract( mip );\r
	float mipInt = floor( mip );\r
\r
	vec3 color0 = getPmremMip( envMap, direction, mipInt );\r
\r
	if ( mipF == 0.0 ) {\r
\r
		return color0;\r
\r
	} else {\r
\r
		vec3 color1 = getPmremMip( envMap, direction, mipInt + 1.0 );\r
\r
		return mix( color0, color1, mipF );\r
\r
	}\r
\r
}`,rR=`// @shader-file: packages/maxpower/Utils/ShaderParser/shaderModules/random.module.glsl
// https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl\r
\r
float random(vec2 p){\r
	return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);\r
}\r
\r
// https://www.shadertoy.com/view/4djSRW\r
\r
vec3 hash(vec3 p3)\r
{\r
	p3 = fract(p3 * vec3(.1031, .1030, .0973));\r
  p3 += dot(p3, p3.yxz+33.33);\r
  return fract((p3.xxy + p3.yxx)*p3.zyx);\r
\r
}`,iR=`// @shader-file: packages/maxpower/Utils/ShaderParser/shaderModules/raymarch_normal.module.glsl
vec3 N( vec3 pos, float delta ){\r
\r
    return normalize( vec3(\r
		D( vec3( pos.x + delta, pos.y, pos.z ) ).d - D( vec3( pos.x - delta, pos.y, pos.z ) ).d,\r
		D( vec3( pos.x, pos.y + delta, pos.z ) ).d - D( vec3( pos.x, pos.y - delta, pos.z ) ).d,\r
		D( vec3( pos.x, pos.y, pos.z + delta ) ).d - D( vec3( pos.x, pos.y, pos.z - delta ) ).d\r
	) );\r
	\r
}`,oR=`// @shader-file: packages/maxpower/Utils/ShaderParser/shaderModules/rotate.module.glsl
mat2 rotate(float rad) {\r
  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));\r
}\r
\r
void rotate( inout vec2 pos, inout vec2 normal, float rad ) {\r
\r
	mat2 rot = rotate( rad );\r
\r
	pos *= rot;\r
	normal *= rot;\r
\r
}\r
\r
mat3 makeRotationDir( vec3 direction, vec3 up ) {\r
\r
	vec3 xaxis = normalize( cross( up, direction ) );\r
	vec3 yaxis = normalize( cross( direction, xaxis ) );\r
\r
	return mat3(\r
		xaxis.x, yaxis.x, direction.x,\r
		xaxis.y, yaxis.y, direction.y,\r
		xaxis.z, yaxis.z, direction.z\r
	);\r
\r
}`,aR=`// @shader-file: packages/maxpower/Utils/ShaderParser/shaderModules/sdf.module.glsl
// https://iquilezles.org/articles/distfunctions/\r
\r
// 3D SDF\r
\r
\r
float sdSphere( vec3 p, float s )\r
{\r
  return length(p)-s;\r
}\r
\r
float sdBox( vec3 p, vec3 b )\r
{\r
  vec3 q = abs(p) - b;\r
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);\r
}\r
\r
float sdPlane( vec3 p, vec3 n, float h )\r
{\r
  // n must be normalized\r
  return dot(p,n) + h;\r
}\r
\r
// Vertical Capped Cylinder - exact (https://www.shadertoy.com/view/wdXGDr)\r
float sdCappedCylinder( vec3 p, float r, float h )\r
{\r
  vec2 d = abs(vec2(length(p.xz),p.y)) - vec2(r,h);\r
  return min(max(d.x,d.y),0.0) + length(max(d,0.0));\r
}\r
\r
// Vertical Capsule\r
float sdVerticalCapsule( vec3 p, float h, float r )\r
{\r
  p.y -= clamp( p.y, 0.0, h );\r
  return length( p ) - r;\r
}\r
\r
float sdRoundedCylinder( vec3 p, float ra, float rb, float h )\r
{\r
  vec2 d = vec2( length(p.xz)-2.0*ra+rb, abs(p.y) - h );\r
  return min(max(d.x,d.y),0.0) + length(max(d,0.0)) - rb;\r
}\r
\r
float sdVesicaSegment( in vec3 p, in vec3 a, in vec3 b, in float w )\r
{\r
    vec3  c = (a+b)*0.5;\r
    float l = length(b-a);\r
    vec3  v = (b-a)/l;\r
    float y = dot(p-c,v);\r
    vec2  q = vec2(length(p-c-y*v),abs(y));\r
    \r
    float r = 0.5*l;\r
    float d = 0.5*(r*r-w*w)/w;\r
    vec3  h = (r*q.x<d*(q.y-r)) ? vec3(0.0,r,0.0) : vec3(-d,0.0,d+w);\r
 \r
    return length(q-h.xy) - h.z;\r
}\r
\r
float sdTriPrism( vec3 p, vec2 h )\r
{\r
  vec3 q = abs(p);\r
  return max(q.z-h.y,max(q.x*0.866025+p.y*0.5,-p.y)-h.x*0.5);\r
}\r
\r
float dot2( in vec3 v ) { return dot(v,v); }\r
\r
float udTriangle( vec3 p, vec3 a, vec3 b, vec3 c )\r
{\r
  vec3 ba = b - a; vec3 pa = p - a;\r
  vec3 cb = c - b; vec3 pb = p - b;\r
  vec3 ac = a - c; vec3 pc = p - c;\r
  vec3 nor = cross( ba, ac );\r
\r
  return sqrt(\r
    (sign(dot(cross(ba,nor),pa)) +\r
     sign(dot(cross(cb,nor),pb)) +\r
     sign(dot(cross(ac,nor),pc))<2.0)\r
     ?\r
     min( min(\r
     dot2(ba*clamp(dot(ba,pa)/dot2(ba),0.0,1.0)-pa),\r
     dot2(cb*clamp(dot(cb,pb)/dot2(cb),0.0,1.0)-pb) ),\r
     dot2(ac*clamp(dot(ac,pc)/dot2(ac),0.0,1.0)-pc) )\r
     :\r
     dot(nor,pa)*dot(nor,pa)/dot2(nor) );\r
}\r
\r
// 2D\r
\r
float sdRing( in vec2 p, in vec2 n, in float r, in float th )\r
{\r
    p.x = abs(p.x);\r
    \r
    p = mat2(n.x,n.y,-n.y,n.x)*p;\r
\r
    return max( abs(length(p)-r)-th*0.5,\r
                length(vec2(p.x,max(0.0,abs(r-p.y)-th*0.5)))*sign(p.x) );\r
}\r
\r
float sdBox( in vec2 p, in vec2 b )\r
{\r
    vec2 d = abs(p)-b;\r
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);\r
}\r
\r
float sdRoundBox( vec3 p, vec3 b, float r )\r
{\r
  vec3 q = abs(p) - b + r;\r
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0) - r;\r
}\r
\r
float sdSegment( in vec2 p, in vec2 a, in vec2 b )\r
{\r
    vec2 pa = p-a, ba = b-a;\r
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );\r
    return length( pa - ba*h );\r
}\r
\r
// operators\r
\r
float opAdd( float d1, float d2 ) {\r
	return d1 < d2 ? d1 : d2;\r
}\r
\r
vec2 opAdd( vec2 d1, vec2 d2 ) {\r
	return d1.x < d2.x ? d1 : d2;\r
}\r
\r
float opSub( float d1, float d2 ) {\r
	d2 *= -1.0;\r
	return d1 < d2 ? d2 : d1;\r
}\r
\r
vec2 opSub( vec2 d1, vec2 d2 ) {\r
	d2 *= -1.0;\r
	return d1.x < d2.x ? d2 : d1;\r
}\r
\r
vec2 opAnd( vec2 d1, vec2 d2 ) {\r
	return d1.x < d2.x ? d2 : d1;\r
}\r
\r
float opAnd( float d1, float d2 ) {\r
	return d1 < d2 ? d2 : d1;\r
}\r
\r
float opSmoothAdd( float d1, float d2, float k ) {\r
  float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );\r
  return mix( d2, d1, h ) - k*h*(1.0-h);\r
}\r
\r
float opSmoothSub( float d1, float d2, float k ) {\r
  float h = clamp( 0.5 - 0.5*(d2+d1)/k, 0.0, 1.0 );\r
  return mix( d2, -d1, h ) + k*h*(1.0-h);\r
}\r
\r
float opRound( float d, float rad ) {\r
  return d - rad;\r
}\r
\r
// utils\r
\r
// https://neort.io/product/bvcrf5s3p9f7gigeevf0\r
\r
vec2 pmod(vec2 p, float n)\r
{\r
  float a=mod(atan(p.y, p.x),TPI/n)-.5 *TPI/n;\r
  return length(p)*vec2(sin(a),cos(a));\r
}\r
`,sR=`// @shader-file: packages/maxpower/Utils/ShaderParser/shaderModules/subsurface.module.glsl
float subsurface(vec3 ro, vec3 rd, float ra) {
    float res = 0.;
    const int N = 8;
    for (int i=0; i<N; i++) {
        float h = ra * float(i)/float(N);
        res += clamp(D(ro + rd*h).d / h,0.,1.);
    }
    res /= float(N);
    return res*res*(3.-2.*res);
}
`,lR="in vec2 vUv;\rin vec3 vNormal;\rin vec3 vViewNormal;\rin vec3 vPos;\rin vec3 vMVPosition;\rin vec3 vMVPPosition;\rin vec2 vVelocity;\r\runiform mat4 uModelMatrix;\runiform mat4 uModelMatrixInverse;\runiform mat4 uViewMatrix;\runiform mat4 uViewMatrixInverse;\runiform mat4 uProjectionMatrix;\runiform mat4 uProjectionMatrixInverse;\runiform vec3 uCameraPosition;\runiform vec2 uResolution;\r\r#ifdef IS_DEPTH\r	uniform float uCameraNear;\r	uniform float uCameraFar;\r#endif\r\r#ifdef IS_DEFERRED\r	layout (location = 0) out vec4 outColor0;\r	layout (location = 1) out vec4 outColor1;\r	layout (location = 2) out vec4 outColor2;\r	layout (location = 3) out vec4 outColor3;\r	layout (location = 4) out vec4 outColor4;\r#endif\r\r#ifdef IS_FORWARD\r	uniform sampler2D uDeferredTexture;\r	uniform vec2 uDeferredResolution;\r#endif\r\r#if defined(IS_FORWARD) || defined(IS_DEPTH)\r	layout (location = 0) out vec4 outColor0;\r	layout (location = 1) out vec4 outColor1;\r	layout (location = 2) out vec4 outColor2;\r#endif",uR="vec4 outColor = vec4(1.0);\rvec3 outNormal = normalize(vNormal);\rvec3 outNormalMap = vec3( 0.0 );\rfloat outSSN = 0.0;\rvec3 outEmission = vec3(0.0);\rfloat outRoughness = 0.5;\rfloat outMetalic = 0.0;\rvec3 outPos = vPos;\rfloat outEnv = 1.0;\rfloat outGradient = 0.0;",cR="#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r#endif\r\r#ifdef IS_DEPTH\r	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r	outColor0 = vec4(floatToRGBA( depth_z ));\r#endif\r\r#ifdef IS_DEFERRED\r\r	#ifdef USE_NORMAL_MAP \r\r		vec3 tangent;\r		vec3 bitangent;\r\r		#ifdef USE_TANGENT\r\r			tangent = normalize( vTangent );\r			bitangent = normalize( vBitangent );\r\r		#else\r\r			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r			bitangent = cross(tangent, outNormal);\r\r		#endif\r\r		#ifdef DOUBLE_SIDED\r\r			tangent *= faceDirection;\r			bitangent *= faceDirection;\r			\r		#endif\r\r		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r		outNormal = normalize( vTBN * outNormalMap );\r\r	#endif\r\r	vec4 mvp = uProjectionMatrix * mv;\r	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r	outColor0 = vec4( outPos, outEmission.x );\r	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r	outColor2 = vec4( outColor.xyz, outGradient );\r	outColor3 = vec4( outRoughness, outMetalic, outSSN, outEnv );\r	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r#endif\r\r#ifdef IS_FORWARD\r	outColor0 = outColor;\r	outColor1 = vec4(outPos, 1.0);\r	outColor2 = vec4(vVelocity, 0.0, 1.0);\r#endif",dR="vec3 refDir = reflect( -geo.viewDir, geo.normal );\rfloat dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );\rfloat EF = mix( fresnel( dNV ), 1.0, mat.metalic );\routColor.xyz += getPmrem( uEnvMap, geo.normal, 1.0) * mat.diffuseColor * mat.envMapIntensity;\routColor.xyz = mix( outColor.xyz, getPmrem( uEnvMap, refDir, mat.roughness ), EF * mat.specularColor * mat.envMapIntensity );",fR="Geometry geo = Geometry(\r	outPos,\r	outNormal,\r	0.0,\r	normalize( uCameraPosition - outPos ),\r	vec3( 0.0 ),\r	0.0\r);\r\rMaterial mat = Material(\r	vec3( 1.0 ),\r	outRoughness,\r	outMetalic,\r	outEmission,\r	mix( outColor.xyz, vec3( 0.0, 0.0, 0.0 ), outMetalic ),\r	mix( vec3( 1.0, 1.0, 1.0 ), outColor.xyz, outMetalic ),\r	outEnv,\r	outGradient\r);\r\routColor.xyz *= 0.0;",mR="// required common, light,\r\rfloat shadow;\r\r// direcitonalLight\r\rLight light;\rLightCamera lightCamera;\r\r#if NUM_LIGHT_DIR > 0\r\r	DirectionalLight dLight;\r\r	#pragma loop_start NUM_LIGHT_DIR\r\r		dLight = uDirectionalLight[ LOOP_INDEX ];\r		light.direction = dLight.direction;\r		light.color = dLight.color;\r\r		// shadow\r\r		#if LOOP_INDEX < NUM_SHADOWMAP_DIR\r\r			shadow = getShadowSmooth( geo.position, uDirectionalLightCamera[ LOOP_INDEX ], uDirectionalLightShadowMap[ LOOP_INDEX ], 0.0001 );\r\r		#else\r\r			shadow = 1.0;\r\r		#endif\r		\r		// lighting\r\r		outColor.xyz += RE( geo, mat, light );// * shadow;\r\r	#pragma loop_end\r\r#endif\r\r#if NUM_LIGHT_SPOT > 0\r\r	SpotLight sLight;\r	\r	vec3 spotDirection;\r	float spotDistance;\r	float spotAngleCos;\r	float spotAttenuation;\r	vec3 radiance;\r\r	#pragma loop_start NUM_LIGHT_SPOT\r\r		// shadow\r\r		#if LOOP_INDEX < NUM_SHADOWMAP_SPOT\r\r			shadow = getShadowSmooth( geo.position, uSpotLightCamera[ LOOP_INDEX ], uSpotLightShadowMap[ LOOP_INDEX ], 0.01 );\r\r		#else\r\r			shadow = 1.0;\r\r		#endif\r\r		// lighting\r\r		sLight = uSpotLight[ LOOP_INDEX ];\r\r		spotDirection = normalize(sLight.position - geo.position);\r		spotDistance = length( sLight.position - geo.position );\r		spotAngleCos = dot( sLight.direction, spotDirection );\r		spotAttenuation = 0.0;\r\r		if( spotAngleCos > sLight.angle ) {\r\r			spotAttenuation = smoothstep( sLight.angle, sLight.angle + ( 1.0 - sLight.angle ) * sLight.blend, spotAngleCos );\r\r		}\r\r		light.direction = spotDirection;\r		light.color = sLight.color * spotAttenuation * pow( clamp( 1.0 - spotDistance / sLight.distance, 0.0, 1.0 ),  sLight.decay );\r\r		radiance = RE( geo, mat, light );\r		outColor.xyz += shadow * radiance;\r\r	#pragma loop_end\r\r#endif",hR="struct SDFResult {\r	float d;\r	vec3 pos;\r	float mat;\r	vec4 matparam;\r};",pR="SDFResult dist;bool hit = false;for( int i = 0; i < ARG1; i++ ) {	dist = D( rayPos );	rayPos += dist.d * rayDir * ARG3;	if( dist.d < ARG2 ) {		hit = true;		break;	}}",vR="vec4 worldNormal = normalize(uModelMatrix * vec4( outNormal, 0.0 ));\rvec4 viewNormal = normalize(uViewMatrix * worldNormal);\routNormal = worldNormal.xyz;\r\rvec4 modelPosition = uModelMatrix * vec4( rayPos, 1.0 );\rvec4 mvpPosition = uProjectionMatrix * uViewMatrix * modelPosition;\routPos = modelPosition.xyz;\rgl_FragDepth =  ( mvpPosition.z / mvpPosition.w ) * 0.5 + 0.5;",gR="vec3 rayPos = ( uModelMatrixInverse * vec4( vPos, 1.0 ) ).xyz;\rvec3 rayDir = normalize( ( uModelMatrixInverse * vec4( normalize( vPos - uCameraPosition ), 0.0 ) ).xyz );",yR="vec3 rayPos = ( uModelMatrixInverse * vec4( uCameraPosition, 1.0 ) ).xyz;\rvec4 clipSpacePos = vec4((gl_FragCoord.xy / uResolution) * 2.0 - 1.0, -1.0, 1.0);\rvec4 viewSpacePos = uProjectionMatrixInverse * clipSpacePos;\rviewSpacePos /= viewSpacePos.w;\rvec3 viewDir = normalize(viewSpacePos.xyz);\rvec3 rayDir = normalize((uModelMatrixInverse* uViewMatrixInverse * vec4(viewDir, 0.0)).xyz);",xR="uniform float uTime;\runiform float uTimeF;\runiform float uTimeE;\runiform float uTimeEF;",bR="uniform mat4 uModelMatrix;\runiform mat4 uViewMatrix;\runiform mat4 uProjectionMatrix;\runiform mat4 uNormalMatrix;\r\runiform mat4 uModelMatrixPrev;\runiform mat4 uModelViewMatrix;\runiform mat4 uViewMatrixPrev;\runiform mat4 uProjectionMatrixPrev;\r\rout vec2 vUv;\rout vec3 vViewNormal;\rout vec3 vNormal;\rout vec3 vMVPosition;\rout vec3 vMVPPosition;\rout vec3 vPos;\r\rout vec2 vVelocity;\r\rlayout ( location = 0 ) in vec3 position;\rlayout ( location = 1 ) in vec2 uv;\rlayout ( location = 2 ) in vec3 normal;\r\r#ifdef TF_MODELER\r	out vec3 o_position;\r	out vec3 o_normal;\r#endif",_R="vec3 outPos = position;\rvec3 outNormal = normal;\rvec2 outUv = uv;",wR="#ifdef TF_MODELER\r		o_position = outPos;\r		o_normal = outNormal;\r		return;\r#endif\r\rvec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);\rvec4 mvPosition = uViewMatrix * modelPosition;\rgl_Position = uProjectionMatrix * mvPosition;\r\rvec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);\rvec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;\rvec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;\r\rvUv = outUv;\rvViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );\rvNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;\rvPos = modelPosition.xyz;\rvMVPosition = mvPosition.xyz;\rvMVPPosition = gl_Position.xyz / gl_Position.w;\r\rvVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;\rvVelocity *= 0.2;",SR=(m,l)=>{if(!l)return m;const i=Object.keys(l);let o="";for(let s=0;s<i.length;s++)o+="#define "+i[s]+" "+l[i[s]]+`
`;return o=o+m,o},ER=m=>{const l=new Map([["common",$N],["hash",KN],["sdf",aR],["rotate",oR],["matrix",ZN],["random",rR],["noise_simplex",eR],["noise_cyclic",JN],["noise_value",tR],["light",QN],["lighting_light",mR],["lighting_env",dR],["lighting_forwardIn",fR],["vert_h",bR],["vert_in",_R],["vert_out",wR],["frag_h",lR],["frag_in",uR],["frag_out",cR],["rm_h",hR],["rm_normal",iR],["rm_ray_obj",gR],["rm_ray_screen",yR],["rm_out_obj",vR],["rm_loop",pR],["uni_time",xR],["pmrem",nR],["subsurface",sR]]);return m=m.replace(/#include\s?<([\S]*)>/g,(i,o)=>{let s="";const d=o.split(","),c=d[0],v=d.slice(1);let h=l.get(c)||"";h=h.replace(/#define GLSLIFY .*\n/g,"");for(let p=0;p<v.length;p++)v[p]&&(h=h.replace(new RegExp("ARG"+(p+1),"g"),v[p]));return s+=h,s}),m},CR=(m,l)=>(m=m.replaceAll("NUM_LIGHT_DIR",l?l.directional.length.toString():"0"),m=m.replaceAll("NUM_SHADOWMAP_DIR",l?Math.min(2,l.directional.filter(i=>i.component.castShadow).length).toString():"0"),m=m.replaceAll("NUM_LIGHT_SPOT",l?l.spot.length.toString():"0"),m=m.replaceAll("NUM_SHADOWMAP_SPOT",l?Math.min(2,l.spot.filter(i=>i.component.castShadow).length).toString():"0"),m),TR=m=>(m=m.replace(/#pragma\sloop_start\s(\d+)*([\s\S]+?)#pragma\sloop_end/g,(l,i,o)=>{let s="";for(let d=0;d<Number(i);d++)s+=o.replaceAll("LOOP_INDEX",d.toString());return s}),m),pf=(m,l,i)=>(m=SR(m,l),m=`#version 300 es
precision highp float;
`+m,m=ER(m),m=CR(m,i),m=TR(m),m=m.replace(/#define GLSLIFY .*\n/g,""),m),kR=`// @shader-file: packages/maxpower/Component/Renderer/DeferredRenderer/shaders/deferredShading.fs
#include <common>\r
#include <packing>\r
#include <light>\r
#include <pmrem>\r
#include <random>\r
\r
// uniforms\r
\r
uniform sampler2D sampler0; // position.xyz, emission.x\r
uniform sampler2D sampler1; // normal.xyz, emission.y\r
uniform sampler2D sampler2; // albedo.xyz, unused\r
uniform sampler2D sampler3; // roughness, metalic, normalSelect, envSelect,\r
uniform sampler2D sampler4; // velocity.xy, flatness, emission.z\r
\r
uniform sampler2D uSSAOTexture;\r
uniform sampler2D uEnvMap;\r
uniform sampler2D uNoiseSimpleTex;\r
\r
uniform vec3 uColor;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uCameraMatrix;\r
uniform vec3 uCameraPosition;\r
\r
// -------------------------\r
\r
// varyings\r
\r
in vec2 vUv;\r
\r
// out\r
\r
layout (location = 0) out vec4 glFragOut0;\r
layout (location = 1) out vec4 glFragOut1;\r
\r
void main( void ) {\r
\r
	//[\r
\r
	float occlusion = texture( uSSAOTexture, vUv ).x;\r
\r
	vec4 tex0 = texture( sampler0, vUv );\r
	vec4 tex1 = texture( sampler1, vUv );\r
	vec4 tex2 = texture( sampler2, vUv );\r
	vec4 tex3 = texture( sampler3, vUv );\r
	vec4 tex4 = texture( sampler4, vUv );\r
\r
	vec3 normal = tex1.xyz;\r
	vec3 color = tex2.xyz;\r
	float gradient = tex2.w;\r
	float roughness = tex3.x;\r
	float metalic = tex3.y;\r
	vec3 emission = vec3( tex0.w, tex1.w, tex4.w );\r
	float envMapIntensity= tex3.w;\r
\r
	Geometry geo = Geometry(\r
		tex0.xyz,\r
		normal,\r
		0.0,\r
		normalize( uCameraPosition - tex0.xyz ),\r
		vec3( 0.0 ),\r
		occlusion\r
	);\r
\r
	Material mat = Material(\r
		color,\r
		roughness,\r
		metalic,\r
		emission,\r
		mix( color, vec3( 0.0, 0.0, 0.0 ), metalic ),\r
		mix( vec3( 1.0, 1.0, 1.0 ), color, metalic ),\r
		envMapIntensity,\r
		gradient\r
	);\r
	vec3 outColor = vec3( 0.0 );\r
	//]\r
	\r
	// lighting\r
\r
	#include <lighting_light>\r
	\r
\r
	// env\r
\r
	#include <lighting_env>\r
	\r
	// occlusion\r
\r
	outColor.xyz *= max( 0.0, 1.0 - geo.occulusion * 1.5 );\r
	\r
	// emission\r
\r
	outColor.xyz += mat.emission;\r
\r
	// DEMO4 CUSTOM ----------\r
\r
	// グラデーション質感効果\r
	float rnd = random( vUv );\r
	vec3 noise = texture( uNoiseSimpleTex, vUv * 0.3 * vec2( 1.0, 0.5 ) ).xyz;\r
	vec3 hsv = rgb2hsv( outColor.xyz );\r
	hsv.x += noise.x * gradient * rnd * 0.11;\r
	hsv.z -= noise.y * (gradient) * rnd * 0.25;\r
	outColor.xyz = hsv2rgb( hsv );\r
\r
	// -----------------------\r
\r
	glFragOut0 = glFragOut1 = vec4( max( vec3( 0.0 ), outColor.xyz ), 1.0 );\r
\r
}`,NR=`// @shader-file: packages/maxpower/Component/Renderer/DeferredRenderer/shaders/ssao.fs
#include <common>
#include <packing>
#include <light>
#include <random>

// uniforms

uniform sampler2D uSSAOBackBuffer;
uniform sampler2D uDepthTexture;

uniform sampler2D sampler0; // position, depth
uniform sampler2D sampler1; // normal, emissionIntensity

uniform float uTimeEF;
uniform mat4 uCameraMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uProjectionMatrixInverse;
uniform vec3 uCameraPosition;

#define SAMPLE 16
uniform vec3 uSSAOKernel[16];

// varying

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec3 lightShaftSum = vec3( 0.0 );

	vec3 rayPos = texture( sampler0, vUv ).xyz;
	vec4 rayViewPos = uViewMatrix * vec4(rayPos, 1.0);
	vec4 depthRayPos = uViewMatrix * vec4(rayPos, 1.0);

	if( rayPos.x + rayPos.y + rayPos.z == 0.0 || length(rayPos - uCameraPosition) > 100.0 ) return;

	vec3 normal = texture( sampler1, vUv ).xyz;
	float occlusion = 0.0;

	float dist = 0.5;
	float objectDepth = 0.2;

	vec2 seed = vUv + uTimeEF;
	vec3 random = vec3( random( vec2( seed ) ), random( vec2( seed + 0.25 ) ), random( vec2( seed + 0.5 ) ) ) * 2.0 - 1.0;

	vec3 tangent = normalize(random - normal * dot(random,normal));
	vec3 bitangent = cross( tangent, normal );
	mat3 kernelMatrix = mat3(tangent, bitangent, normal);

	for( int i = 0; i < SAMPLE; i ++ ) {

		float seed = uTimeEF * 1.0 + float( i );
		
		vec3 sampleOffset = kernelMatrix * uSSAOKernel[i];
		vec3 samplePos = rayPos + sampleOffset * dist;

		vec4 depthCoord = (uProjectionMatrix * uViewMatrix * vec4( samplePos, 1.0 ) );
		depthCoord.xy /= depthCoord.w;
		depthCoord.xy = depthCoord.xy * 0.5 + 0.5;

		vec4 samplerPos = (uViewMatrix * vec4(texture( sampler0, depthCoord.xy ).xyz, 1.0));
		vec4 sampleViewPos = uViewMatrix * vec4( samplePos, 1.0 );

		if( sampleViewPos.z < samplerPos.z && sampleViewPos.z >= samplerPos.z - objectDepth ) {

			occlusion += 1.0 - pow( length( sampleOffset ), 2.0);

		}
		
	}

	occlusion /= float( SAMPLE );

	outColor = vec4( mix( texture( uSSAOBackBuffer, vUv ).xyz, vec3( occlusion ), 0.5 ), 1.0 );

}`,nb=`// @shader-file: packages/maxpower/Component/Renderer/DeferredRenderer/shaders/ssaoBlur.fs
#include <common>
#include <packing>
#include <light>
#include <random>

// uniforms

uniform sampler2D uSSAOTexture;
uniform vec2 uPPPixelSize;

uniform sampler2D uNormalTexture;
uniform sampler2D uDepthTexture;

uniform float uWeights[SSAOSAMPLE];

// varying

in vec2 vUv;

// out

layout (location = 0) out vec4 outColor;

const float alpha = 32.0;
const float beta = 0.25;

float getWeight( vec2 uv, vec3 normalBasis, float depthBasis ) {

	vec3 normalOffset = texture( uNormalTexture, uv ).xyz;
	float depthOffset = texture( uDepthTexture, uv ).w;
	float bilateralWeight = pow( ( dot( normalBasis, normalOffset ) + 1.0 ) / 2.0, alpha ) * pow( 1.0 / ( abs( depthBasis - depthOffset ) + 0.001 ), beta );

	return bilateralWeight;

}

void main( void ) {

	float occlusion = 0.0;

	vec3 normalBasis = texture( uNormalTexture, vUv ).xyz;
	float depthBasis = texture( uDepthTexture, vUv ).w;

	vec2 direction;

	#ifdef IS_VIRT

		direction = vec2( 0.0, 1.0 );
	
	#else

		direction = vec2( 1.0, 0.0 );

	#endif

	float weight = 0.0;

	occlusion += texture( uSSAOTexture, vUv ).x * uWeights[0];
	weight += uWeights[0];
	
	for(int i = 1; i < SSAOSAMPLE; i++){

		vec2 offset = float( i ) * direction;
		offset *= uPPPixelSize * 1.0;

		vec2 uvOffsetP = vUv + offset;
		vec2 uvOffsetN = vUv - offset;

		float wP = getWeight( uvOffsetP, normalBasis, depthBasis ) * uWeights[i];
		float wN = getWeight( uvOffsetN, normalBasis, depthBasis ) * uWeights[i];
		
		occlusion += texture( uSSAOTexture, uvOffsetP ).x * wP;
		occlusion += texture( uSSAOTexture, uvOffsetN ).x * wN;

		weight += wP + wN;

	}

	occlusion /= weight;
	outColor = vec4( vec3( occlusion ), 1.0 );

}`,RR=m=>{const l=[];for(let i=0;i<m;i++){const o=new Q;o.x=Math.random()*2-1,o.y=Math.random()*2-1,o.z=i/m*.95+.05,o.normalize(),o.multiply(i/m*.95+.05),l.push(...o.getElm("vec3"))}return l};class DR extends Tn{constructor(i){super();y(this,"timeUniforms_");y(this,"postprocess");y(this,"ssao");y(this,"rtSSAO1");y(this,"rtSSAO2");y(this,"ssaoBlur");y(this,"ssaoBlurUni");y(this,"shading");const o=i.gl,s={uTimeEF:{value:0,type:"1f"}},d=new Et(o).setTexture([new rt(o).setting({magFilter:o.LINEAR,minFilter:o.LINEAR})]),c=new Et(o).setTexture([new rt(o).setting({magFilter:o.LINEAR,minFilter:o.LINEAR})]),v=new yt(o,{name:"ssao",frag:NR,renderTarget:Se("ssao",d),uniforms:Ce.merge(s,{uSSAOBackBuffer:{value:c.textures[0],type:"1i"},uSSAOKernel:{value:RR(16),type:"3fv"}}),resolutionRatio:.5,passThrough:!0}),h=8,p=Ce.merge(s,{uSSAOTexture:{value:c.textures[0],type:"1i"},uDepthTexture:{value:null,type:"1i"},uNormalTexture:{value:null,type:"1i"},uWeights:{type:"1fv",value:Ur.gaussWeights(h)}}),_=new yt(o,{name:"ssaoBlur/h",frag:Se("ssaoBlur",nb),uniforms:p,resolutionRatio:1,passThrough:!0,defines:{SSAOSAMPLE:h}}),S=new yt(o,{name:"ssaoBlur/v",frag:Se("ssaoBlur",nb),uniforms:Ce.merge(p,{uSSAOTexture:{value:_.renderTarget.textures[0],type:"1i"}}),defines:{SSAOSAMPLE:h,IS_VIRT:""},resolutionRatio:1,passThrough:!0}),T=new yt(o,{name:"deferredShading",frag:Se("deferredShading",kR),uniforms:Ce.merge({uSSAOTexture:{value:S.renderTarget.textures[0],type:"1i"},uSSAOResolutionInv:{value:v.resolutionInv,type:"2fv"},uEnvMap:{value:i.envMap,type:"1i"}})});this.postprocess=new Br({passes:[v,_,S,T]}),this.timeUniforms_=s,this.shading=T,this.ssao=v,this.rtSSAO1=d,this.rtSSAO2=c,this.ssaoBlur=_,this.ssaoBlurUni=p}update(i){this.timeUniforms_.uTimeEF.value=(this.timeUniforms_.uTimeEF.value+i.timeDelta)%1;let o=this.rtSSAO1;this.rtSSAO1=this.rtSSAO2,this.rtSSAO2=o,this.ssao.setRendertarget(this.rtSSAO1),this.ssaoBlur.uniforms.uSSAOTexture.value=this.rtSSAO1.textures[0],this.ssao.uniforms.uSSAOBackBuffer.value=this.rtSSAO2.textures[0]}setRenderCamera(i){const o=i.renderTarget;if(o){for(let s=0;s<o.gBuffer.textures.length;s++){const d=o.gBuffer.textures[s];this.shading.uniforms["sampler"+s]=this.ssao.uniforms["sampler"+s]={type:"1i",value:d}}this.ssaoBlur.uniforms.uDepthTexture.value=o.gBuffer.textures[0],this.shading.renderTarget=o.shadingBuffer,this.ssaoBlurUni.uNormalTexture.value=o.gBuffer.textures[1]}}resize(i){this.postprocess.resize(i)}}const MR=`// @shader-file: packages/maxpower/Component/Renderer/PipelinePostProcess/shaders/colorCollection.fs
#include <common>\r
\r
uniform sampler2D uBackBuffer0;\r
uniform sampler2D uBloomTexture[4];\r
\r
uniform vec3 uCameraPosition;\r
uniform float uCameraNear;\r
uniform float uCameraFar;\r
\r
in vec2 vUv;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
//=================================================================================================\r
//\r
//  Baking Lab\r
//  by MJP and David Neubelt\r
//  http://mynameismjp.wordpress.com/\r
//\r
//  All code licensed under the MIT license\r
//\r
//=================================================================================================\r
\r
// The code in this file was originally written by Stephen Hill (@self_shadow), who deserves all\r
// credit for coming up with this fit and implementing it. Buy him a beer next time you see him. :)\r
\r
// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT\r
\r
const mat3 ACESInputMat = mat3(\r
	0.59719, 0.07600, 0.02840,\r
	0.35458,  0.90834, 0.13383,\r
	0.04823, 0.01566, 0.83777\r
);\r
\r
// ODT_SAT => XYZ => D60_2_D65 => sRGB\r
const mat3 ACESOutputMat = mat3( \r
	1.60475,  -0.10208,  -0.00327,\r
	-0.53108, 1.10813, -0.07276,\r
	-0.07367,  -0.00605, 1.07602\r
);\r
\r
vec3 RRTAndODTFit(vec3 v)\r
{\r
    vec3 a = v * (v + 0.0245786f) - 0.000090537f;\r
    vec3 b = v * (0.983729f * v + 0.4329510f) + 0.238081f;\r
    return a / b;\r
}\r
\r
vec3 ACESFitted(vec3 color)\r
{\r
    color = ACESInputMat * color;\r
\r
    // Apply RRT and ODT\r
    color = RRTAndODTFit(color);\r
\r
    color = ACESOutputMat * color;\r
\r
    // Clamp to [0, 1]\r
    color = clamp(color, 0.0, 1.0 );\r
\r
    return color;\r
}\r
\r
void main( void ) {\r
\r
    vec3 col = texture( uBackBuffer0, vUv ).xyz;\r
\r
    col = ACESFitted( col ) * 1.3;\r
\r
	outColor = vec4( col, 1.0 );\r
\r
}`,PR=`// @shader-file: packages/maxpower/Component/Renderer/PipelinePostProcess/shaders/dofBokeh.fs
#include <common>\r
\r
uniform sampler2D uCocTex;\r
uniform vec4 uParams;\r
\r
in vec2 vUv;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
// const int BOKEH_SAMPLE = 16;\r
// const vec2 kDiskKernel[BOKEH_SAMPLE] = vec2[](\r
//     vec2(0,0),\r
//     vec2(0.54545456,0),\r
//     vec2(0.16855472,0.5187581),\r
//     vec2(-0.44128203,0.3206101),\r
//     vec2(-0.44128197,-0.3206102),\r
//     vec2(0.1685548,-0.5187581),\r
//     vec2(1,0),\r
//     vec2(0.809017,0.58778524),\r
//     vec2(0.30901697,0.95105654),\r
//     vec2(-0.30901703,0.9510565),\r
//     vec2(-0.80901706,0.5877852),\r
//     vec2(-1,0),\r
//     vec2(-0.80901694,-0.58778536),\r
//     vec2(-0.30901664,-0.9510566),\r
//     vec2(0.30901712,-0.9510565),\r
//     vec2(0.80901694,-0.5877853)\r
// );\r
\r
#define BOKEH_SAMPLE 43\r
vec2 kDiskKernel[ BOKEH_SAMPLE ] = vec2[](\r
    vec2(0,0),\r
    vec2(0.36363637,0),\r
    vec2(0.22672357,0.28430238),\r
    vec2(-0.08091671,0.35451925),\r
    vec2(-0.32762504,0.15777594),\r
    vec2(-0.32762504,-0.15777591),\r
    vec2(-0.08091656,-0.35451928),\r
    vec2(0.22672352,-0.2843024),\r
    vec2(0.6818182,0),\r
    vec2(0.614297,0.29582983),\r
    vec2(0.42510667,0.5330669),\r
    vec2(0.15171885,0.6647236),\r
    vec2(-0.15171883,0.6647236),\r
    vec2(-0.4251068,0.53306687),\r
    vec2(-0.614297,0.29582986),\r
    vec2(-0.6818182,0),\r
    vec2(-0.614297,-0.29582983),\r
    vec2(-0.42510656,-0.53306705),\r
    vec2(-0.15171856,-0.66472363),\r
    vec2(0.1517192,-0.6647235),\r
    vec2(0.4251066,-0.53306705),\r
    vec2(0.614297,-0.29582983),\r
    vec2(1,0),\r
    vec2(0.9555728,0.2947552),\r
    vec2(0.82623875,0.5633201),\r
    vec2(0.6234898,0.7818315),\r
    vec2(0.36534098,0.93087375),\r
    vec2(0.07473,0.9972038),\r
    vec2(-0.22252095,0.9749279),\r
    vec2(-0.50000006,0.8660254),\r
    vec2(-0.73305196,0.6801727),\r
    vec2(-0.90096885,0.43388382),\r
    vec2(-0.98883086,0.14904208),\r
    vec2(-0.9888308,-0.14904249),\r
    vec2(-0.90096885,-0.43388376),\r
    vec2(-0.73305184,-0.6801728),\r
    vec2(-0.4999999,-0.86602545),\r
    vec2(-0.222521,-0.9749279),\r
    vec2(0.07473029,-0.99720377),\r
    vec2(0.36534148,-0.9308736),\r
    vec2(0.6234897,-0.7818316),\r
    vec2(0.8262388,-0.56332),\r
    vec2(0.9555729,-0.29475483)\r
);\r
\r
// Fragment shader: Bokeh filter with disk-shaped kernels\r
void main( void ) {\r
\r
	float _MaxCoC = uParams.y;\r
	float _RcpMaxCoC = uParams.z;\r
	vec2 _MainTex_TexelSize = vec2( 1.0 ) / vec2( textureSize( uCocTex, 0 ) );\r
	float _RcpAspect = _MainTex_TexelSize.x / _MainTex_TexelSize.y;\r
	// sampler2D _MainTex = uCocTex;\r
\r
    vec4 samp0 = texture(uCocTex, vUv);\r
\r
    vec4 bgAcc = vec4(0.0); // Background: far field bokeh\r
    vec4 fgAcc = vec4(0.0); // Foreground: near field bokeh\r
\r
    for (int si = 0; si < BOKEH_SAMPLE; si++)\r
    {\r
        vec2 disp = kDiskKernel[si] * _MaxCoC;\r
        float dist = length(disp);\r
\r
        vec2 duv = vec2(disp.x * _RcpAspect, disp.y);\r
        vec4 samp = texture(uCocTex, vUv + duv);\r
\r
        // BG: Compare CoC of the current sample and the center sample\r
        // and select smaller one.\r
        float bgCoC = max(min(samp0.a, samp.a), 0.0);\r
\r
        // Compare the CoC to the sample distance.\r
        // Add a small margin to smooth out.\r
        float margin = _MainTex_TexelSize.y * 2.0;\r
        float bgWeight = clamp((bgCoC   - dist + margin ) / margin, 0.0, 1.0);\r
        float fgWeight = clamp((-samp.a - dist + margin ) / margin, 0.0, 1.0);\r
\r
        // Cut influence from focused areas because they're darkened by CoC\r
        // premultiplying. This is only needed for near field.\r
        fgWeight *= step(_MainTex_TexelSize.y, -samp.a);\r
\r
        // Accumulation\r
        bgAcc += vec4(samp.rgb, 1.0) * bgWeight;\r
        fgAcc += vec4(samp.rgb, 1.0) * fgWeight;\r
    }\r
\r
    // Get the weighted average.\r
    bgAcc.rgb /= bgAcc.a + (bgAcc.a == 0.0 ? 1.0 : 0.0 ); // zero-div guard\r
    fgAcc.rgb /= fgAcc.a + (fgAcc.a == 0.0 ? 1.0 : 0.0 );\r
\r
    // BG: Calculate the alpha value only based on the center CoC.\r
    // This is a rather aggressive approximation but provides stable results.\r
    bgAcc.a = smoothstep(_MainTex_TexelSize.y, _MainTex_TexelSize.y * 2.0, samp0.a);\r
\r
    // FG: Normalize the total of the weights.\r
    fgAcc.a *= PI / float(BOKEH_SAMPLE);\r
\r
    // Alpha premultiplying\r
    vec3 rgb = vec3( 0.0 );\r
    rgb = mix(rgb, bgAcc.rgb, clamp(bgAcc.a, 0.0, 1.0));\r
    rgb = mix(rgb, fgAcc.rgb, clamp(fgAcc.a, 0.0, 1.0));\r
\r
    // Combined alpha value\r
    float alpha = (1.0 - clamp(bgAcc.a, 0.0, 1.0)) * (1.0 - clamp(fgAcc.a, 0.0, 1.0));\r
\r
    outColor = vec4(rgb, alpha);\r
}`,zR=`// @shader-file: packages/maxpower/Component/Renderer/PipelinePostProcess/shaders/dofCoc.fs
#include <common>\r
\r
uniform sampler2D uBackBuffer0;\r
uniform sampler2D uGbufferPos;\r
uniform vec4 uParams;\r
uniform mat4 uProjectionMatrixInverse;\r
uniform mat4 uViewMatrix;\r
\r
in vec2 vUv;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
float sampleDepth( sampler2D posTex, vec2 uv ) {\r
\r
	vec4 depth = uViewMatrix * vec4( texture( posTex, uv ).xyz, 1.0 );\r
	\r
	return depth.z * -1.0;\r
	\r
}\r
\r
//  https://github.com/keijiro/KinoBokeh/blob/master/Assets/Kino/Bokeh/Shader/Prefilter.cginc\r
\r
// Max between three components\r
float max3(vec3 xyz) { return max(xyz.x, max(xyz.y, xyz.z)); }\r
\r
// Fragment shader: Downsampling, prefiltering and CoC calculation\r
void main( void ) {\r
\r
	float _Distance = uParams.x;\r
	float _MaxCoC = uParams.y;\r
	float _RcpMaxCoC = uParams.z;\r
	float _LensCoeff = uParams.w;\r
\r
	// Sample source colors.\r
	vec2 mainTexSize = vec2( 1.0 ) / vec2( textureSize( uBackBuffer0, 0 ) );\r
	vec3 duv = mainTexSize.xyx * vec3(0.5, 0.5, -0.5);\r
	vec3 c0 = texture(uBackBuffer0, vUv - duv.xy).rgb;\r
	vec3 c1 = texture(uBackBuffer0, vUv - duv.zy).rgb;\r
	vec3 c2 = texture(uBackBuffer0, vUv + duv.zy).rgb;\r
	vec3 c3 = texture(uBackBuffer0, vUv + duv.xy).rgb;\r
\r
	// Sample linear depths.\r
	float d0 = sampleDepth(uGbufferPos, vUv - duv.xy);\r
	float d1 = sampleDepth(uGbufferPos, vUv - duv.zy);\r
	float d2 = sampleDepth(uGbufferPos, vUv + duv.zy);\r
	float d3 = sampleDepth(uGbufferPos, vUv + duv.xy);\r
	float d4 = sampleDepth(uGbufferPos, vUv);\r
	vec4 depths = vec4(d4, d4, d4, d4);\r
\r
	// Calculate the radiuses of CoCs at these sample points.\r
	vec4 cocs = (depths - _Distance) * _LensCoeff / depths;\r
	cocs = clamp(cocs, -_MaxCoC, _MaxCoC);\r
\r
	// Premultiply CoC to reduce background bleeding.\r
	vec4 weights = clamp(abs(cocs) * _RcpMaxCoC, 0.0, 1.0 );\r
\r
	// #if defined(PREFILTER_LUMA_WEIGHT)\r
	// 	// Apply luma weights to reduce flickering.\r
	// 	// Inspired by goo.gl/j1fhLe goo.gl/mfuZ4h\r
	// 	weights.x *= 1 / (max3(c0) + 1);\r
	// 	weights.y *= 1 / (max3(c1) + 1);\r
	// 	weights.z *= 1 / (max3(c2) + 1);\r
	// 	weights.w *= 1 / (max3(c3) + 1);\r
	// #endif\r
\r
	// Weighted average of the color samples\r
	vec3 avg = c0 * weights.x + c1 * weights.y + c2 * weights.z + c3 * weights.w;\r
	avg /= dot(weights, vec4(1.0)) + 0.0001;\r
\r
	// Output CoC = average of CoCs\r
	float coc = dot(cocs, vec4(0.25));\r
\r
	// Premultiply CoC again.\r
	avg *= smoothstep(0.0, mainTexSize.y * 2.0, abs(coc));\r
\r
	// #if defined(UNITY_COLORSPACE_GAMMA)\r
	// 	avg = GammaToLinearSpace(avg);\r
	// #endif\r
\r
    outColor = vec4(avg, coc);\r
	// outColor = vec4( vec3( abs(coc) ), 1.0 );\r
\r
}\r
`,AR=`// @shader-file: packages/maxpower/Component/Renderer/PipelinePostProcess/shaders/dofComposite.fs
#include <common>

uniform sampler2D uBackBuffer0;
uniform sampler2D uBokeTex;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

// https://github.com/keijiro/KinoBokeh/blob/master/Assets/Kino/Bokeh/Shader/Composition.cginc

// Fragment shader: Additional blur
vec4 frag_Blur2(vec2 uv) {
	vec2 _MainTex_TexelSize = vec2( 1.0 ) / vec2( textureSize( uBackBuffer0, 0 ) );
	
    // 9-tap tent filter
    vec4 duv = _MainTex_TexelSize.xyxy * vec4(1, 1, -1, 0);
    vec4 acc;

    acc  = texture(uBackBuffer0, uv - duv.xy);
    acc += texture(uBackBuffer0, uv - duv.wy) * 2.0;
    acc += texture(uBackBuffer0, uv - duv.zy);

    acc += texture(uBackBuffer0, uv + duv.zw) * 2.0;
    acc += texture(uBackBuffer0, uv         ) * 4.0;
    acc += texture(uBackBuffer0, uv + duv.xw) * 2.0;

    acc += texture(uBackBuffer0, uv + duv.zy);
    acc += texture(uBackBuffer0, uv + duv.wy) * 2.0;
    acc += texture(uBackBuffer0, uv + duv.xy);

    return acc / 16.0;
}

void main( void ) {

	vec4 cs = texture(uBackBuffer0, vUv);
    vec4 cb = texture(uBokeTex, vUv);
	#if defined(UNITY_COLORSPACE_GAMMA)
		cs.rgb = GammaToLinearSpace(cs.rgb);
	#endif
		vec3 rgb = cs.rgb * cb.a + cb.rgb;
	#if defined(UNITY_COLORSPACE_GAMMA)
		rgb = LinearToGammaSpace(rgb);
	#endif

    outColor = vec4(rgb, cs.a);

}`,OR=`// @shader-file: packages/maxpower/Component/Renderer/PipelinePostProcess/shaders/motionBlur.fs
in vec2 vUv;

uniform sampler2D uBackBuffer0;
uniform sampler2D uVelTex;
uniform sampler2D uVelNeighborTex;
uniform sampler2D uDepthTexture;
uniform mat4 uProjectionMatrixInverse;
uniform vec2 uPPPixelSize;
uniform float uPower;

layout (location = 0) out vec4 outColor;

#define EPSILON 0.0001
#define SOFT_Z_EXTENT 0.1
#define SAMPLE 16

#include <random>

float cone( vec2 x, vec2 y, vec2 v ) {

	return clamp( 1.0 - length( x - y ) / length( v ), 0.0, 1.0 ); 
	
}

float cylinder( vec2 x, vec2 y, vec2 v ) {
	
	return 1.0 - smoothstep( 0.95 * length( v ), 1.05 * length( v ), length( x - y ) );

}

float softDepthCompare( float a, float b ) {

	return clamp( 1.0 - (a - b) / SOFT_Z_EXTENT, 0.0, 1.0 );

}

float getLinearDepth( vec2 uv ) {
	vec4 depthRayPos = uProjectionMatrixInverse * vec4( uv * 2.0 - 1.0, texture( uDepthTexture, vUv ).x * 2.0 - 1.0, 1.0 );
	depthRayPos.xyz /= depthRayPos.w;	
	return depthRayPos.z;
}

vec2 getVelocity(sampler2D velTex, vec2 uv) 
{
    vec2 velocity = texture(velTex, uv).xy;
    velocity = normalize( velocity ) * clamp( length( velocity ), 0.5 * uPPPixelSize.y, float(TILE) * uPPPixelSize.y );

	velocity *= uPower;
	
    return velocity * 0.0;
}


void main(void) {
	
	vec2 X = vUv;
	
	vec2 coord = vec2( gl_FragCoord.xy );

	vec2 velNeighbor = getVelocity( uVelNeighborTex, X ).xy;

	vec3 sum = vec3( 0.0 );
	float weight = 0.0;

	vec2 harfPixelSize = uPPPixelSize / 2.0;

	if( length( velNeighbor ) <= uPPPixelSize.y  ) {

		outColor = texture( uBackBuffer0, vUv );
		return;

	}

	weight = 1.0;
	weight = min( 1.0 / length( getVelocity( uVelTex, X ) ), 3.0 );
	sum = texture(uBackBuffer0, X ).xyz * weight;

	for( int i = 0; i < SAMPLE; i++ ) {

		if( i == SAMPLE - 1 / 2 ) continue;

		float j = random(X + float( i ) * 0.1);

		float t = mix( -1.0, 1.0, ( float( i ) + j + 1.0 ) / ( float(SAMPLE) + 1.0 ) );

		vec2 Y = X + velNeighbor * t + harfPixelSize;

		float depthX = getLinearDepth( X );
		float depthY = getLinearDepth( Y );

		float f = softDepthCompare( depthX, depthY );
		float b = softDepthCompare( depthY, depthX );

		float alphaY = f * cone( Y, X, getVelocity( uVelTex, Y ).xy ) +
			b * cone( X, Y, getVelocity( uVelTex, X ).xy ) +
			cylinder( Y, X, getVelocity( uVelTex, Y ).xy ) * cylinder( X, Y, getVelocity( uVelTex, X ).xy ) * 2.0;


		weight += alphaY;
		sum += alphaY * texture( uBackBuffer0, Y ).xyz;

	}

	sum /= weight;
	outColor = vec4(sum.x, sum.y, sum.z, 1.0);

}`,FR=`// @shader-file: packages/maxpower/Component/Renderer/PipelinePostProcess/shaders/motionBlurNeighbor.fs
in vec2 vUv;
uniform sampler2D uBackBuffer0;
uniform sampler2D uVelTex;
uniform vec2 uPPPixelSize;

layout (location = 0) out vec4 outColor;

#define NUM 3

void main(void) {
	vec2 coord = vec2( gl_FragCoord.xy );
	vec2 vel = vec2( 0.0 );

	vec3 sum = vec3( 0.0 );

	for( int i = 0; i < NUM; i++ ) {

		for( int j = 0; j < NUM; j++ ) {

			vec2 offset = vec2( 
				( float(j) / float(NUM - 1) - 0.5 ) * 2.0 * uPPPixelSize.x,
				( float(i) / float(NUM - 1) - 0.5 ) * 2.0 * uPPPixelSize.y
			);

			vec2 currentVel = texture( uVelTex, vUv + offset ).xy;

			if( length(currentVel) > length( vel ) ) {

				vel = currentVel;
				
			}

		}

	}

	outColor = vec4( vel, 0.0, 1.0 );

}`,LR=`// @shader-file: packages/maxpower/Component/Renderer/PipelinePostProcess/shaders/motionBlurTile.fs
in vec2 vUv;
uniform sampler2D uBackBuffer0;
uniform sampler2D uVelTex;
uniform vec2 uPPPixelSize;

layout (location = 0) out vec4 outColor;

void main(void) {
	vec2 coord = vec2( gl_FragCoord.xy );
	vec2 vel = vec2( 0.0 );

	vec3 sum = vec3( 0.0 );

	for( int i = 0; i < TILE; i++ ) {

		for( int j = 0; j < TILE; j++ ) {

			vec2 offset = vec2( 
				( float(j) / float(TILE - 1) - 0.5 ) * uPPPixelSize.x / float( TILE ),
				( float(i) / float(TILE - 1) - 0.5 ) * uPPPixelSize.y / float( TILE )
			);

			vec2 currentVel = texture( uVelTex, vUv + offset ).xy;

			if( length(currentVel) > length( vel ) ) {

				vel = currentVel;
				
			}

		}

	}

	outColor = vec4( vel + 0.0001, 0.0, 1.0 );

}`,UR=`// @shader-file: packages/maxpower/Component/Renderer/PipelinePostProcess/shaders/ssComposite.fs
#include <common>\r
#include <packing>\r
#include <light>\r
\r
uniform sampler2D uBackBuffer0;\r
\r
uniform sampler2D uGbufferPos;\r
uniform sampler2D uGbufferNormal;\r
uniform sampler2D uSSRTexture;\r
\r
uniform vec3 uCameraPosition;\r
uniform float uCameraNear;\r
uniform float uCameraFar;\r
\r
in vec2 vUv;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
void main( void ) {\r
\r
	vec4 gCol0 = texture( uGbufferPos, vUv );\r
	vec4 gCol1 = texture( uGbufferNormal, vUv );\r
	\r
	outColor += vec4( texture( uBackBuffer0, vUv ).xyz, 1.0 );\r
	\r
	vec3 dir = normalize( uCameraPosition - gCol0.xyz );\r
	float f = fresnel( clamp( dot( dir, gCol1.xyz ), 0.0, 1.0 ) );\r
\r
	vec4 ssrCol = texture( uSSRTexture, vUv );\r
\r
	outColor.xyz += f * ssrCol.xyz * 0.15;\r
\r
}`,BR=`// @shader-file: packages/maxpower/Component/Renderer/PipelinePostProcess/shaders/ssr.fs
#include <common>
#include <packing>
#include <light>
#include <random>

// uniforms

uniform sampler2D uBackBuffer0;
uniform sampler2D uGbufferPos;
uniform sampler2D uGbufferNormal;
uniform sampler2D uSSRBackBuffer;
uniform sampler2D uDepthTexture;

uniform float uTimeEF;
uniform mat4 uCameraMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uProjectionMatrixInverse;
uniform vec3 uCameraPosition;

// varying

in vec2 vUv;

layout (location = 0) out vec4 outColor;
#define MARCH 16.0
#define LENGTH 16.0
#define OBJDEPTH 0.5

void main( void ) {

	vec3 lightShaftSum = vec3( 0.0 );

	vec3 rayPos = texture( uGbufferPos, vUv ).xyz;
	vec4 rayViewPos = uViewMatrix * vec4(rayPos, 1.0);
	vec4 depthRayPos = uViewMatrix * vec4(rayPos, 1.0);

	if( abs(rayViewPos.z - depthRayPos.z) > 0.1 || length(rayPos - uCameraPosition) > 100.0 ) {

		outColor = vec4( 0.0, 0.0, 0.0, 0.0 );
		return;
		
	}

	if( rayPos.x + rayPos.y + rayPos.z == 0.0 ) return;

	vec3 rayDir = reflect( normalize( ( uCameraMatrix * uProjectionMatrixInverse * vec4( vUv * 2.0 - 1.0, 1.0, 1.0 ) ).xyz ), texture( uGbufferNormal, vUv ).xyz ) ;

	float rayStepLength = LENGTH / MARCH;
	vec3 rayStep = rayDir * rayStepLength;

	float totalRayLength = random(vUv + uTimeEF) * rayStepLength + 0.1;
	rayPos += rayDir * totalRayLength;

	vec4 col = vec4( 0.0 );

	for( int i = 0; i < int( MARCH ); i ++ ) {

		vec4 depthCoord = (uProjectionMatrix * uViewMatrix * vec4(rayPos, 1.0 ) );
		depthCoord.xy /= depthCoord.w;

		if( abs( depthCoord.x ) > 1.0 || abs( depthCoord.y ) > 1.0 ) break;

		depthCoord.xy = depthCoord.xy * 0.5 + 0.5;

		vec3 gBufferPos = texture( uGbufferPos, depthCoord.xy ).xyz;

		if( length( gBufferPos ) == 0.0 ) break;

		vec4 samplerPos = (uViewMatrix * vec4( gBufferPos, 1.0) );
		vec4 sampleViewPos = uViewMatrix * vec4( rayPos, 1.0 );

		if( sampleViewPos.z < samplerPos.z && sampleViewPos.z >= samplerPos.z - OBJDEPTH ) {

			col.xyz = texture( uBackBuffer0, depthCoord.xy ).xyz;
			col.w = 1.0;
			break;

		}
		
		rayPos += rayStep;
		totalRayLength += rayStepLength;

	}


	outColor = mix( texture( uSSRBackBuffer, vUv ), col, 0.2 );

}`;class VR{constructor(l){y(this,"dofCoc");y(this,"dofBokeh");y(this,"dofComposite");y(this,"rtSSR1");y(this,"rtSSR2");y(this,"postprocess");y(this,"_timeUniforms");y(this,"_ssr");y(this,"_ssComposite");y(this,"_dofParams");y(this,"_motionBlur");y(this,"_motionBlurTile");y(this,"_renderCamera");const i={uTimeEF:{value:0,type:"1f"}},o=new yt(l,{name:"collection",frag:MR}),s=new Et(l).setTexture([new rt(l).setting({magFilter:l.LINEAR,minFilter:l.LINEAR})]),d=new Et(l).setTexture([new rt(l).setting({magFilter:l.LINEAR,minFilter:l.LINEAR})]),c=new yt(l,{name:"ssr",frag:Se("ssr",BR),renderTarget:s,uniforms:Ce.merge(i,{uGbufferPos:{value:null,type:"1i"},uGbufferNormal:{value:null,type:"1i"},uSceneTex:{value:null,type:"1i"},uSSRBackBuffer:{value:d.textures[0],type:"1i"}}),resolutionRatio:.5,passThrough:!0}),v=new yt(l,{name:"ssComposite",frag:Se("ssComposite",UR),uniforms:Ce.merge({uGbufferPos:{value:null,type:"1i"},uGbufferNormal:{value:null,type:"1i"},uSSRTexture:{value:d.textures[0],type:"1i"}})}),h=new Q(10,.05,20,.05),p=new yt(l,{name:"dof/coc",frag:zR,uniforms:Ce.merge(i,{uGbufferPos:{value:null,type:"1i"},uParams:{value:h,type:"4f"}}),renderTarget:new Et(l).setTexture([new rt(l).setting({magFilter:l.LINEAR,minFilter:l.LINEAR,internalFormat:l.RGBA16F,type:l.HALF_FLOAT,format:l.RGBA})]),passThrough:!0,resolutionRatio:.5}),_=new yt(l,{name:"dof/bokeh",frag:PR,uniforms:Ce.merge(i,{uCocTex:{value:p.renderTarget.textures[0],type:"1i"},uParams:{value:h,type:"4f"}}),renderTarget:new Et(l).setTexture([new rt(l).setting({magFilter:l.LINEAR,minFilter:l.LINEAR})]),passThrough:!0,resolutionRatio:.5}),S=new yt(l,{name:"dof/composite",frag:AR,uniforms:Ce.merge({uBokeTex:{value:_.renderTarget.textures[0],type:"1i"}}),renderTarget:new Et(l).setTexture([new rt(l).setting({magFilter:l.LINEAR,minFilter:l.LINEAR,internalFormat:l.RGBA16F,type:l.HALF_FLOAT,format:l.RGBA})])}),T=16,C=new yt(l,{name:"motionBlurTile",frag:LR,uniforms:Ce.merge({uVelTex:{value:null,type:"1i"}}),renderTarget:new Et(l).setTexture([new rt(l).setting({type:l.FLOAT,internalFormat:l.RGBA32F,format:l.RGBA})]),defines:{TILE:T},resolutionRatio:1/T,passThrough:!0}),D=new yt(l,{name:"motionBlurNeighbor",frag:FR,uniforms:Ce.merge({uVelTex:{value:C.renderTarget.textures[0],type:"1i"}}),defines:{TILE:T},renderTarget:new Et(l).setTexture([new rt(l).setting({type:l.FLOAT,internalFormat:l.RGBA32F,format:l.RGBA})]),resolutionRatio:1/T,passThrough:!0}),F=new yt(l,{name:"motionBlur",frag:OR,uniforms:Ce.merge({uVelNeighborTex:{value:D.renderTarget.textures[0],type:"1i"},uVelTex:{value:null,type:"1i"},uDepthTexture:{value:null,type:"1i"},uPower:{value:1,type:"1f"}}),defines:{TILE:T}});this.postprocess=new Br({passes:[o,c,v,p,_,S,C,D,F]}),this._timeUniforms=i,this._ssr=c,this._ssComposite=v,this.dofCoc=p,this.dofBokeh=_,this.dofComposite=S,this._motionBlur=F,this._motionBlurTile=C,this._dofParams=h,this.rtSSR1=s,this.rtSSR2=d,this._renderCamera=null}update(l){if(!this._renderCamera)return;this._timeUniforms.uTimeEF.value=(this._timeUniforms.uTimeEF.value+l.timeDelta)%1;const i=this._renderCamera.fov,o=this._renderCamera.dofParams.focusDistance,s=this._renderCamera.dofParams.kFilmHeight,d=s/Math.tan(.5*(i/180*Math.PI)),c=1/this.dofBokeh.renderTarget.size.y*5,v=1/c,h=d*d/(.3*(o-d)*s*2);this._dofParams.set(o,c,v,h);const p=this.rtSSR1;this.rtSSR1=this.rtSSR2,this.rtSSR2=p,this._ssr.setRendertarget(this.rtSSR1),this._ssComposite.uniforms.uSSRTexture.value=this.rtSSR1.textures[0],this._ssr.uniforms.uSSRBackBuffer.value=this.rtSSR2.textures[0]}resize(l){this.postprocess.resize(l)}setRenderCamera(l){this._renderCamera=l;const i=l.renderTarget;i&&(this.postprocess.passes[0]&&(this.postprocess.passes[0].backBufferOverride=i.shadingBuffer.textures),this._ssr.uniforms.uGbufferPos.value=i.gBuffer.textures[0],this._ssr.uniforms.uGbufferNormal.value=i.gBuffer.textures[1],this._ssr.uniforms.uSceneTex.value=i.forwardBuffer.textures[0],this._ssComposite.uniforms.uGbufferPos.value=i.gBuffer.textures[0],this._ssComposite.uniforms.uGbufferNormal.value=i.gBuffer.textures[1],this.dofCoc.uniforms.uGbufferPos.value=i.gBuffer.textures[0],this._motionBlurTile.uniforms.uVelTex.value=i.gBuffer.textures[4],this._motionBlur.uniforms.uVelTex.value=i.gBuffer.textures[4],this._motionBlur.uniforms.uDepthTexture.value=i.gBuffer.depthTexture)}}const IR=`// @shader-file: packages/maxpower/Component/Renderer/PMREMRender/shaders/pmrem.fs
#include <common>

uniform sampler2D uBackBuffer0;
uniform sampler2D uPMREMBackBuffer;
uniform samplerCube uEnvMap;
uniform float uRoughness;
uniform float uTimeEF;
layout (location = 0) out vec4 outColor;

in vec2 vUv;

#include <random>
#include <pmrem>

// https://www.shadertoy.com/view/4lscWj

vec2 Hammersley(float i, float numSamples)
{   
    uint b = uint(i);
    
    b = (b << 16u) | (b >> 16u);
    b = ((b & 0x55555555u) << 1u) | ((b & 0xAAAAAAAAu) >> 1u);
    b = ((b & 0x33333333u) << 2u) | ((b & 0xCCCCCCCCu) >> 2u);
    b = ((b & 0x0F0F0F0Fu) << 4u) | ((b & 0xF0F0F0F0u) >> 4u);
    b = ((b & 0x00FF00FFu) << 8u) | ((b & 0xFF00FF00u) >> 8u);
    
    float radicalInverseVDC = float(b) * 2.3283064365386963e-10;
    
    return vec2((i / numSamples), radicalInverseVDC);
} 

vec3 SampleHemisphere_Cosinus(float i, float numSamples)
{
    vec2 xi = Hammersley(i, numSamples);
    
    float phi      = xi.y * 2.0 * PI;
    float cosTheta = sqrt(1.0 - xi.x);
    float sinTheta = sqrt(1.0 - cosTheta * cosTheta);
     
    return vec3(cos(phi) * sinTheta, cosTheta, sin(phi) * sinTheta);
}

// https://qiita.com/emadurandal/items/b2ae09c5cc1b3da821c8

vec3 ImportanceSampleCosineWeighted(vec2 Xi, vec3 N)
{
    float r = sqrt(Xi.x);
	// r = 1.0;
    float phi = 2.0 * PI * Xi.y;

    vec3 H;
    H.x = r * cos(phi);
    H.y = r * sin(phi);
    H.z = sqrt(1.0-Xi.x);

    vec3 UpVector = abs(N.z) < 0.999 ? vec3(0,0,1) : vec3(1,0,0);
    vec3 TangentX = normalize( cross(UpVector, N) );
    vec3 TangentY = cross ( N, TangentX );
    // Tangent to world space
    return TangentX * H.x + TangentY * H.y + N * H.z;
}

// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf

vec3 ImportanceSampleGGX( vec2 Xi, float Roughness, vec3 N ) {
	float a = Roughness * Roughness;
	float Phi = 2.0 * PI * Xi.x;
	float CosTheta = sqrt( (1.0 - Xi.y) / ( 1.0 + (a*a - 1.0) * Xi.y ) );
	float SinTheta = sqrt( 1.0 - CosTheta * CosTheta );
	vec3 H;
	H.x = SinTheta * cos( Phi );
	H.y = SinTheta * sin( Phi );
	H.z = CosTheta;

	vec3 UpVector = abs(N.z) < 0.999 ? vec3(0,0,1) : vec3(1,0,0);
	vec3 TangentX = normalize( cross( UpVector, N ) );
	vec3 TangentY = cross( N, TangentX );
	// Tangent to world space
	return TangentX * H.x + TangentY * H.y + N * H.z;
}

vec3 PrefilterEnvMap( float Roughness, vec3 R )
{
	vec3 N = R;
	vec3 V = R;
	vec3 PrefilteredColor = vec3( 0.0 );
	float TotalWeight = 0.0;

	for( int i = 0; i < NUM_SAMPLES; i++ ) {
		
		vec2 Xi = Hammersley( float(i), float( NUM_SAMPLES ) );

		Xi.x += random( vec2( vUv + uTimeEF * 0.1 ) );
		Xi.y += random( vec2( vUv + uTimeEF * 0.1 + 1.0 ) );
		Xi = fract( Xi );
		
		vec3 H = ImportanceSampleGGX( Xi, Roughness, N );
		// vec3 H = ImportanceSampleCosineWeighted(Xi, N);
		vec3 L = 2.0 * dot( V, H ) * H - V;
		float NoL = saturate( dot( N, L ) );

		if( NoL > 0.0 ) {
			PrefilteredColor += texture(uEnvMap , L).rgb * NoL;
			TotalWeight += NoL;
		}

	}
	
	return PrefilteredColor / max( TotalWeight, 1.0 );
}

void main( void ) {

	vec4 sum = vec4( 0.0 );
	vec2 res = vec2( textureSize( uPMREMBackBuffer, 0 ) );

	float face = floor( vUv.x * 3.0 ) + floor( vUv.y * 2.0 ) * 3.0;
	vec2 fuv = fract( vUv * vec2( 3.0, 2.0 ) );


	vec2 uv = fuv;
	uv -= 0.5;
	uv *= 1.0 + 1.0 / res * 2.0;
	uv += 0.5;

	sum.xyz += PrefilterEnvMap(uRoughness, getPmremDir(uv, face));

	outColor = vec4( mix( texture( uPMREMBackBuffer, vUv ).xyz, sum.xyz, 0.04  ), 1.0 );

}`;class jR extends Tn{constructor(i,o){super();y(this,"postprocess");y(this,"resolution");y(this,"renderTarget");y(this,"pmremPasses");y(this,"swapBuffers");y(this,"timeUniforms");y(this,"postProcessRenderer");const s=o.resolution,d={uTimeEF:{value:0,type:"1f"}},c=new Et(i).setTexture([new rt(i).setting({type:i.FLOAT,internalFormat:i.RGBA16F,format:i.RGBA,magFilter:i.LINEAR,minFilter:i.LINEAR,wrapS:i.CLAMP_TO_EDGE,wrapT:i.CLAMP_TO_EDGE,generateMipmap:!0})]),v=[],h=[],p=[],_=5;let S=0;for(let T=0;T<_;T++){const C=1/Math.pow(2,T),D=s.x*C,F=s.y*C*.5,q=new Q(0,S,D,F);S+=F,p.push({rt1:new Et(i).setTexture([new rt(i).setting({type:i.FLOAT,internalFormat:i.RGBA16F,format:i.RGBA})]),rt2:new Et(i).setTexture([new rt(i).setting({type:i.FLOAT,internalFormat:i.RGBA16F,format:i.RGBA})])});let $=1/(_-1)*T;$=$;const j=new yt(i,{renderTarget:p[T].rt1,frag:IR,uniforms:Ce.merge(d,{uRoughness:{value:$,type:"1f"},uEnvMap:{value:o.input,type:"1i"},uPMREMBackBuffer:{value:p[T].rt2.textures,type:"1i"},uRenderCount:{value:1,type:"1f"}}),defines:{NUM_SAMPLES:Math.floor(Math.pow(2,T+1))}});j.resize(new Q(D,F));const K=new yt(i,{renderTarget:c,viewPort:q,passThrough:!0});K.resize(s),v.push(j,K),h.push(j)}this.postprocess=new Br({passes:v}),this.postprocess.passes[0].backBufferOverride=c.textures,this.resolution=s,this.renderTarget=c,this.pmremPasses=h,this.swapBuffers=p,this.timeUniforms=d,this.postProcessRenderer=null}setPostProcessRenderer(i){this.postProcessRenderer=i}renderProcess(){this.postProcessRenderer?this.postProcessRenderer.renderPostProcess(this.postprocess,void 0,this.resolution):console.warn("PostProcessRenderer has not been set in PMREMRender. Call setPostProcessRenderer first.")}swap(){this.timeUniforms.uTimeEF.value=(this.timeUniforms.uTimeEF.value+.016)%1;for(let i=0;i<this.pmremPasses.length;i++){const o=this.pmremPasses[i],s=this.swapBuffers[i],d=s.rt1;s.rt1=s.rt2,s.rt2=d,o.setRendertarget(s.rt1),o.uniforms.uPMREMBackBuffer.value=s.rt2.textures}}resize(i){}}function rb(m){let l=0;for(let i=0;i<m.length;i++){const o=m.charCodeAt(i);l=(l<<5)-l+o,l=l&l}return l.toString(36)}class HR{constructor(l){y(this,"gl");y(this,"pool");this.gl=l,this.pool=new Map}get(l,i){const o=l+i,s=this.pool.get(o);if(s!==void 0&&s.program)return s;const d=new Pb(this.gl);return this.compileWithErrorHandling(d,l,i),this.pool.set(o,d),d}compileWithErrorHandling(l,i,o){{const s=_=>{typeof window<"u"&&window.__glpowerShaderErrorHandler&&window.__glpowerShaderErrorHandler(_)},d=_=>{typeof window<"u"&&window.__glpowerShaderClearHandler&&window.__glpowerShaderClearHandler(_)},c=rb(i),v=rb(o),h=this.checkShaderCompile(i,this.gl.VERTEX_SHADER,c),p=this.checkShaderCompile(o,this.gl.FRAGMENT_SHADER,v);!h.success&&h.error?s(h.error):d(c),!p.success&&p.error?s(p.error):d(v)}l.setShader(i,o)}checkShaderCompile(l,i,o){const s=this.gl.createShader(i);if(!s)return{success:!1};if(this.gl.shaderSource(s,l),this.gl.compileShader(s),this.gl.getShaderParameter(s,this.gl.COMPILE_STATUS))return this.gl.deleteShader(s),{success:!0};const c=this.gl.getShaderInfoLog(s),v=i===this.gl.VERTEX_SHADER?"vertex":"fragment";if(this.gl.deleteShader(s),!c)return{success:!1};const h=l.split(`
`),p=c.matchAll(/ERROR: 0:(\d+)/g);return{success:!1,error:Array.from(p).map((S,T)=>{const C=Number(S[1]),D=Math.max(0,C-5),F=Math.min(h.length,C+2);let q="";return h.forEach(($,j)=>{D<=j&&j<=F&&(q+=`${j+1}: ${$}
`)}),{shaderKey:o,type:v,message:c.split(`
`)[T],line:C,sourceContext:q,fullSource:l}})[0]}}}let ff=0;class Fb extends Tn{constructor(i){super();y(this,"gl");y(this,"resolution");y(this,"_extDisJointTimerQuery");y(this,"programManager");y(this,"_lights");y(this,"_envMapCameras");y(this,"_envMapRenderTarget");y(this,"_pmremRender");y(this,"_deferredRenderer");y(this,"_pipelinePostProcess");y(this,"_quad");y(this,"_glStateCahce");y(this,"_queryList",[]);y(this,"_queryListQueued",[]);y(this,"_queryFrameCount",0);y(this,"_isCorrentCompiles");y(this,"compileDrawParams");y(this,"_tmpNormalMatrix");y(this,"_tmpModelViewMatrix");y(this,"_tmpViewMatrixInverseMatrix");y(this,"_tmpLightDirection");y(this,"_tmpModelMatrixInverse");y(this,"_tmpProjectionMatrixInverse");y(this,"_tmpResolution");y(this,"onAfterUI");this.gl=i,this._isCorrentCompiles=!1,this.compileDrawParams=[],this.programManager=new HR(this.gl),this.resolution=new Q,this._extDisJointTimerQuery=this.gl.getExtension("EXT_disjoint_timer_query_webgl2"),this._extDisJointTimerQuery||console.warn("[Renderer] EXT_disjoint_timer_query_webgl2 extension is not supported. GPU timing features will be disabled."),this._lights={directional:[],spot:[]};const o=new DN(this.gl);this._envMapRenderTarget=new RN(this.gl).setTexture([o]),this._envMapRenderTarget.setSize(256,256);const s=new Q(0,0,0),d=new Q(0,-1,0),c=[new nt().lookAt(s,new Q(1,0,0),d),new nt().lookAt(s,new Q(0,1,0),new Q(0,0,1)),new nt().lookAt(s,new Q(0,0,1),d),new nt().lookAt(s,new Q(-1,0,0),d),new nt().lookAt(s,new Q(0,-1,0),new Q(0,0,-1)),new nt().lookAt(s,new Q(0,0,-1),d)];this._envMapCameras=[];for(let v=0;v<6;v++){const h=new Ct({name:"envMapCamera/"+v}),p=h.addComponent(_f);p.fov=90,p.near=.1,p.far=1e3,p.aspect=1,h.applyMatrix(c[v].clone()),p.updateViewMatrix(),p.updateProjectionMatrix(),this._envMapCameras.push({entity:h,camera:p})}if(this._pmremRender=new jR(this.gl,{input:[o],resolution:new Q(256*3,256*4)}),this._deferredRenderer=new DR({gl:i,envMap:this._pmremRender.renderTarget.textures[0],envMapCube:o}),this._pipelinePostProcess=new VR(i),this._quad=new ro({width:2,height:2}),this._glStateCahce={},this._queryList=[],this._queryListQueued=[],this._queryFrameCount=0,this._extDisJointTimerQuery)for(let h=0;h<200;h++){const p=this.gl.createQuery();p&&this._queryList.push(p)}this._tmpLightDirection=new Q,this._tmpModelMatrixInverse=new nt,this._tmpViewMatrixInverseMatrix=new nt,this._tmpProjectionMatrixInverse=new nt,this._tmpModelViewMatrix=new nt,this._tmpNormalMatrix=new nt,this._tmpResolution=new Q,this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)}getRenderStack(i,o){const s={camera:[],light:[],deferred:[],forward:[],ui:[],shadowMap:[],envMap:[],empty:[],lightVisibility:new Map},d=c=>{const v=c.entity,p=o&&o.forceDraw||(c.visibility||c.visibility===void 0)&&v.visible,_=v.getComponent(me);if(_&&p){const C=_.material;C.visibilityFlag.deferred&&s.deferred.push(v),C.visibilityFlag.shadowMap&&s.shadowMap.push(v),C.visibilityFlag.forward&&s.forward.push(v),C.visibilityFlag.ui&&s.ui.push(v),C.visibilityFlag.envMap&&s.envMap.push(v)}else p&&s.empty.push(v);const S=v.getComponent(Lu);S&&S.enabled&&s.camera.push(v);const T=v.getComponent(Ps);T&&T.enabled&&(s.light.push(v),s.lightVisibility.set(v,p));for(let C=0;C<v.children.length;C++)d({entity:v.children[C],visibility:p});return s};return d({entity:i,visibility:!0}),s}render(i,o,s){if(i.onBeforeRender(s),this._extDisJointTimerQuery)if(this._queryFrameCount++,this.gl.getParameter(this._extDisJointTimerQuery.GPU_DISJOINT_EXT)){this._queryList.forEach(C=>this.gl.deleteQuery(C)),this._queryList.length=0;const T=200;for(let C=0;C<T;C++){const D=this.gl.createQuery();D&&this._queryList.push(D)}}else{const T=[];if(this._queryListQueued.length>0){const C=this._queryListQueued.length;for(let D=C-1;D>=0;D--){const F=this._queryListQueued[D];if(this._queryFrameCount-F.frameQueued<1)continue;if(this.gl.getQueryParameter(F.query,this.gl.QUERY_RESULT_AVAILABLE)){const j=this.gl.getQueryParameter(F.query,this.gl.QUERY_RESULT);T.push({name:F.name,duration:j/1e3/1e3}),this._queryList.push(F.query),this._queryListQueued.splice(D,1)}}}this.emit("timer",[T])}const d=this.getRenderStack(i,s),c=Object.keys(this._lights);for(let S=0;S<c.length;S++){const T=c[S];this._lights[T]=[]}for(let S=0;S<d.light.length;S++){const T=d.light[S],C=T.getComponent(Ps);if(C){const D=d.lightVisibility.get(T)||!1;this.collectLight(T,C,D)}}this._lights.directional.sort((S,T)=>(S.component.castShadow?0:1)-(T.component.castShadow?0:1)),this._lights.spot.sort((S,T)=>(S.component.castShadow?0:1)-(T.component.castShadow?0:1));const v=S=>{for(let T=0;T<S.length;T++){const C=S[T];if(C.component.castShadow&&C.component.renderTarget){const D=d.light.find(F=>F.getComponent(Ps)===C.component);D&&d.lightVisibility.get(D)&&this.renderCamera("shadowMap",D,d.shadowMap,C.component.renderTarget,this.resolution)}}};v(this._lights.directional),v(this._lights.spot);for(let S=0;S<this._envMapCameras.length;S++){const{entity:T}=this._envMapCameras[S];this._envMapRenderTarget.face(S),this.renderCamera("envMap",T,d.envMap,this._envMapRenderTarget,this.resolution)}this.renderPostProcess(this._pmremRender.postprocess,void 0,this._pmremRender.resolution),this._pmremRender.swap();const h=o.getComponent(Lu);if(!h){i.onAfterRender(s);return}if(this.gl.disable(this.gl.BLEND),!h.renderTarget){i.onAfterRender(s);return}this.renderCamera("deferred",o,d.deferred,h.renderTarget.gBuffer,this.resolution),this._deferredRenderer.setRenderCamera(h),this.renderPostProcess(this._deferredRenderer.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:h.viewMatrix,viewMatrixPrev:h.viewMatrixPrev,projectionMatrix:h.projectionMatrix,projectionMatrixPrev:h.projectionMatrixPrev,cameraMatrixWorld:o.matrixWorld}}),this._deferredRenderer.update(s),this.gl.enable(this.gl.BLEND),this.renderCamera("forward",o,d.forward,h.renderTarget.forwardBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:h.renderTarget.shadingBuffer.textures[1],type:"1i"},uDeferredResolution:{value:h.renderTarget.shadingBuffer.size,type:"2fv"},uEnvMap:{value:this._pmremRender.renderTarget.textures[0],type:"1i"}},disableClear:!0}),this.gl.disable(this.gl.BLEND),this._pipelinePostProcess.setRenderCamera(h),this.renderPostProcess(this._pipelinePostProcess.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:h.viewMatrix,projectionMatrix:h.projectionMatrix,cameraMatrixWorld:o.matrixWorld,cameraNear:h.near,cameraFar:h.far}}),this._pipelinePostProcess.update(s);let p=this._pipelinePostProcess.postprocess.output?this._pipelinePostProcess.postprocess.output:void 0;const _=o.getComponent(Ob);if(_)for(let S=0;S<_.postProcesses.length;S++){const T=_.postProcesses[S];T.enabled&&T.hasOutput&&(this.renderPostProcess(T,p,this.resolution,{cameraOverride:{viewMatrix:h.viewMatrix,projectionMatrix:h.projectionMatrix,cameraMatrixWorld:o.matrixWorld,cameraNear:h.near,cameraFar:h.far}}),p=T.output||void 0)}if(p){this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,p.getFrameBuffer()),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,h.renderTarget.uiBuffer.getFrameBuffer());const S=p.size;this.gl.blitFramebuffer(0,0,S.x,S.y,0,0,S.x,S.y,this.gl.COLOR_BUFFER_BIT,this.gl.NEAREST)}if(this.gl.enable(this.gl.BLEND),this.renderCamera("forward",o,d.ui,h.renderTarget.uiBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:h.renderTarget.shadingBuffer.textures[1],type:"1i"}},disableClear:!0}),this.gl.disable(this.gl.BLEND),this.onAfterUI&&this.onAfterUI({stack:d,cameraEntity:o,camera:h,event:s}),h.displayOut){const S=h.renderTarget.uiBuffer;this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,S===null?null:S.getFrameBuffer()),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,null),this.gl.blitFramebuffer(0,0,this.resolution.x,this.resolution.y,0,0,this.resolution.x,this.resolution.y,this.gl.COLOR_BUFFER_BIT,this.gl.NEAREST)}i.onAfterRender(s)}renderCamera(i,o,s,d,c,v){const h=o.getComponentsByTag("camera")[0]||o.getComponent(Ps);v=v||{};const p={viewMatrix:h.viewMatrix,viewMatrixPrev:h.viewMatrixPrev,projectionMatrix:h.projectionMatrix,projectionMatrixPrev:h.projectionMatrixPrev,cameraMatrixWorld:o.matrixWorld,cameraNear:h.near,cameraFar:h.far,renderTarget:d,uniformOverride:v.uniformOverride,...v.cameraOverride};if(h.viewPort){const S=h.viewPort;this.gl.viewport(S.x,S.y,S.z,S.w)}else d?this.gl.viewport(0,0,d.size.x,d.size.y):this.gl.viewport(0,0,c.x,c.y);const _=this._tmpResolution;d?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,d.getFrameBuffer()),this.gl.drawBuffers(d.textureAttachmentList),_.set(d.size.x,d.size.y)):(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),_.set(c.x,c.y)),p.uniformOverride||(p.uniformOverride={}),p.uniformOverride.uResolution={value:_,type:"2fv"},v.disableClear||(i=="shadowMap"?(this.gl.clearColor(1,1,1,1),this.gl.clearDepth(1)):(this.gl.clearColor(0,0,0,1),this.gl.clearDepth(1)),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT));for(let S=0;S<s.length;S++){const T=s[S],C=T.getComponentsByTag("materialOverride")[0],D=T.getComponent(me),F=C?C.material:D.material,q=D.geometry;p.modelMatrixWorld=T.matrixWorld,p.modelMatrixWorldPrev=T.matrixWorldPrev,p.label=`cam[${h.uuid}]/${T.name||F.name||"-"}`,this.draw(T.uuid,i,q,F,p)}this.emit("drawPass",[d,"camera/"+i])}collectLight(i,o,s){const d=o.lightType,c=s?o.intensity*Math.PI:0,v={position:new Q(0,0,0,1).applyMatrix4(i.matrixWorld),direction:new Q(0,1,0,0).applyMatrix4(i.matrixWorld).normalize(),color:new Q(o.color.x,o.color.y,o.color.z).multiply(c),component:o};d=="directional"?this._lights.directional.push(v):d=="spot"&&this._lights.spot.push(v),o.castShadow&&o.renderTarget==null&&o.setShadowMap(new Et(this.gl).setTexture([new rt(this.gl).setting({magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR})]))}renderPostProcess(i,o,s,d){let c=o?o.textures:void 0;if(i.passes)for(let v=0;v<i.passes.length;v++){const h=i.passes[v];if(h.enabled===!1)continue;const p=h.renderTarget;if(h.viewPort){const C=h.viewPort;this.gl.viewport(C.x,C.y,C.z,C.w)}else p?this.gl.viewport(0,0,p.size.x,p.size.y):s&&this.gl.viewport(0,0,s.x,s.y);p?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,p.getFrameBuffer()),this.gl.drawBuffers(p.textureAttachmentList)):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null);let _=0;h.clearColor&&(this.gl.clearColor(h.clearColor.x,h.clearColor.y,h.clearColor.z,h.clearColor.w),_|=this.gl.COLOR_BUFFER_BIT),h.clearDepth!==null&&(this.gl.clearDepth(h.clearDepth),_|=this.gl.DEPTH_BUFFER_BIT),_!==0&&this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);const S=h.backBufferOverride||c||null;if(S)for(let C=0;C<S.length;C++)h.uniforms["uBackBuffer"+C]={type:"1i",value:S[C]};const T=d&&d.cameraOverride||{};T.label=h.name,T.renderTarget=p,this.draw(h.uuid,"postprocess",this._quad,h,T),h.onAfterRender(),!h.passThrough&&h.renderTarget&&(c=h.renderTarget.textures),this.emit("drawPass",[h.renderTarget,h.name])}}draw(i,o,s,d,c){if(this._isCorrentCompiles){this.compileDrawParams.push({drawId:i,renderType:o,geometry:s,material:d,param:{...c}});return}ff=0;let v=this.gl.CULL_FACE;const h=this._glStateCahce[v];(h===void 0||h.state!=d.cullFace)&&(d.cullFace?this.gl.enable(v):this.gl.disable(v)),v=this.gl.DEPTH_TEST;const p=this._glStateCahce[v];(p===void 0||p.state!=d.depthTest)&&(d.depthTest?this.gl.enable(v):this.gl.disable(v)),this.gl.depthMask(d.depthWrite);let _=d.programCache[o];if(!_){const T={...d.defines};o=="deferred"?T.IS_DEFERRED="":o=="forward"||o=="envMap"?T.IS_FORWARD="":o=="shadowMap"&&(T.IS_DEPTH="");const C=pf(d.vert,T,this._lights),D=pf(d.frag,T,this._lights);_=this.programManager.get(C,D),d.programCache[o]=_}if(_.resetUniforms(),c&&(c.modelMatrixWorld&&(_.setUniform("uModelMatrix","Matrix4fv",c.modelMatrixWorld.elm),_.setUniform("uModelMatrixInverse","Matrix4fv",this._tmpModelMatrixInverse.copy(c.modelMatrixWorld).inverse().elm),c.modelMatrixWorldPrev&&_.setUniform("uModelMatrixPrev","Matrix4fv",c.modelMatrixWorldPrev.elm),c.viewMatrix&&(this._tmpModelViewMatrix.copy(c.modelMatrixWorld).preMultiply(c.viewMatrix),this._tmpNormalMatrix.copy(this._tmpModelViewMatrix),this._tmpNormalMatrix.inverse(),this._tmpNormalMatrix.transpose(),_.setUniform("uModelViewMatrix","Matrix4fv",this._tmpModelViewMatrix.elm),_.setUniform("uNormalMatrix","Matrix4fv",this._tmpNormalMatrix.elm),_.setUniform("uViewMatrixInverse","Matrix4fv",this._tmpViewMatrixInverseMatrix.copy(c.viewMatrix).inverse().elm))),c.viewMatrix&&(_.setUniform("uViewMatrix","Matrix4fv",c.viewMatrix.elm),c.viewMatrixPrev&&_.setUniform("uViewMatrixPrev","Matrix4fv",c.viewMatrixPrev.elm)),c.projectionMatrix&&(_.setUniform("uProjectionMatrix","Matrix4fv",c.projectionMatrix.elm),_.setUniform("uProjectionMatrixInverse","Matrix4fv",this._tmpProjectionMatrixInverse.copy(c.projectionMatrix).inverse().elm),c.projectionMatrixPrev&&_.setUniform("uProjectionMatrixPrev","Matrix4fv",c.projectionMatrixPrev.elm)),c.cameraMatrixWorld&&(_.setUniform("uCameraMatrix","Matrix4fv",c.cameraMatrixWorld.elm),_.setUniform("uCameraPosition","3f",[c.cameraMatrixWorld.elm[12],c.cameraMatrixWorld.elm[13],c.cameraMatrixWorld.elm[14]])),o!="deferred"&&(c.cameraNear&&_.setUniform("uCameraNear","1f",[c.cameraNear]),c.cameraFar&&_.setUniform("uCameraFar","1f",[c.cameraFar]))),d.useLight&&o!=="deferred"&&o!=="shadowMap"){for(let T=0;T<this._lights.directional.length;T++){const C=this._lights.directional[T];if(_.setUniform("uDirectionalLight["+T+"].direction","3fv",C.direction.getElm("vec3")),_.setUniform("uDirectionalLight["+T+"].color","3fv",C.color.getElm("vec3")),C.component.renderTarget){const D=C.component.renderTarget.textures[0].activate(ff++),F=`uDirectionalLightCamera[${T}]`;_.setUniform(F+".near","1fv",[C.component.near]),_.setUniform(F+".far","1fv",[C.component.far]),_.setUniform(F+".viewMatrix","Matrix4fv",C.component.viewMatrix.elm),_.setUniform(F+".projectionMatrix","Matrix4fv",C.component.projectionMatrix.elm),_.setUniform(F+".resolution","2fv",D.size.getElm("vec2")),_.setUniform("uDirectionalLightShadowMap["+T+"]","1i",[D.unit])}}for(let T=0;T<this._lights.spot.length;T++){const C=this._lights.spot[T];c&&c.viewMatrix&&this._tmpLightDirection.copy(C.direction).applyMatrix3(c.viewMatrix);const D=`uSpotLight[${T}]`;if(_.setUniform(D+".position","3fv",C.position.getElm("vec3")),_.setUniform(D+".direction","3fv",C.direction.getElm("vec3")),_.setUniform(D+".color","3fv",C.color.getElm("vec3")),_.setUniform(D+".angle","1fv",[Math.cos(C.component.angle/2)]),_.setUniform(D+".blend","1fv",[C.component.blend]),_.setUniform(D+".distance","1fv",[C.component.distance]),_.setUniform(D+".decay","1fv",[C.component.decay]),C.component.renderTarget){const F=C.component.renderTarget.textures[0].activate(ff++),q=`uSpotLightCamera[${T}]`;_.setUniform(q+".near","1fv",[C.component.near]),_.setUniform(q+".far","1fv",[C.component.far]),_.setUniform(q+".viewMatrix","Matrix4fv",C.component.viewMatrix.elm),_.setUniform(q+".projectionMatrix","Matrix4fv",C.component.projectionMatrix.elm),_.setUniform(q+".resolution","2fv",F.size.getElm("vec2")),_.setUniform("uSpotLightShadowMap["+T+"]","1i",[F.unit])}}}GR(_,{...d.uniforms,...c&&c.uniformOverride});const S=_.getVAO(i.toString());S&&(s.vaoCache.get(S)||(s.createBuffers(this.gl),s.attributes.forEach((T,C)=>{T.buffer!==void 0&&(C=="index"?S.setIndex(T.buffer):S.setAttribute(C,T.buffer,T.size,T.opt))}),s.vaoCache.set(S,!0)),_.use(T=>{T.uploadUniforms(),this.gl.bindVertexArray(S.getVAO());const C=S.indexBuffer;let D=this.gl.UNSIGNED_SHORT;C&&C.array&&C.array.BYTES_PER_ELEMENT==4&&(D=this.gl.UNSIGNED_INT),d.blending=="NORMAL"?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA):d.blending=="ADD"?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE):d.blending=="DIFF"&&this.gl.blendFunc(this.gl.ONE_MINUS_DST_COLOR,this.gl.ONE_MINUS_DST_COLOR);const F=this.gl[d.drawType];let q=null,$="";this._extDisJointTimerQuery&&(q=this._queryList.pop()||null,q==null&&(q=this.gl.createQuery()),q&&(this.gl.beginQuery(this._extDisJointTimerQuery.TIME_ELAPSED_EXT,q),$=`${o}/${c&&c.label||"_"}/ [${i}]`)),S.instanceCount>0?C?this.gl.drawElementsInstanced(F,S.indexCount,D,0,S.instanceCount):this.gl.drawArraysInstanced(F,0,S.vertCount,S.instanceCount):C?this.gl.drawElements(F,S.indexCount,D,0):this.gl.drawArrays(F,0,S.vertCount),this._extDisJointTimerQuery&&q&&(this.gl.endQuery(this._extDisJointTimerQuery.TIME_ELAPSED_EXT),this._queryListQueued.push({name:$||`${o}/${c&&c.label||"_"}/ [${i}]`,query:q,frameQueued:this._queryFrameCount})),this.gl.bindVertexArray(null)}))}resize(i){this.resolution.copy(i),this._deferredRenderer.resize(this.resolution),this._pipelinePostProcess.resize(this.resolution)}get deferredRenderer(){return this._deferredRenderer}async compileShaders(i,o,s,d){this._isCorrentCompiles=!0,this.compileDrawParams=[],this.render(i,o,s),this._isCorrentCompiles=!1,console.log(this.compileDrawParams);const c=this.compileDrawParams.length;let v=0;for(let h=0;h<this.compileDrawParams.length;h++){const p=this.compileDrawParams[h],_=p.param.renderTarget;if(_?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,_.getFrameBuffer()),this.gl.drawBuffers(_.textureAttachmentList)):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.draw(p.drawId,p.renderType,p.geometry,p.material,p.param),await new Promise(S=>{setTimeout(()=>{S(null)},10)}),d){v++;const S=p.param&&p.param.label||"-",T=`${p.renderType}/${S}/[${p.drawId}]`;d(T,v,c)}}}}const GR=(m,l)=>{const i=Object.keys(l);for(let o=0;o<i.length;o++){const s=i[o],d=l[s];if(!d)continue;const c=d.type,v=d.value,h=[],p=_=>{_!=null&&(typeof _=="number"||typeof _=="boolean"?h.push(_):"isVector"in _?h.push(..._.getElm("vec"+c.charAt(0))):"isTexture"in _?(_.activate(ff++),h.push(_.unit)):h.push(..._.elm))};if(Array.isArray(v))for(let _=0;_<v.length;_++)p(v[_]);else p(v);h.length>0&&m.setUniform(s,c,h)}},WR=`// @shader-file: packages/maxpower/Material/WireframeMaterial/wireframe.fs
#include <common>
#include <packing>
#include <frag_h>

uniform vec3 uWireColor;

void main( void ) {

	#include <frag_in>
	outColor = vec4( uWireColor, 1.0 );
	#include <frag_out>

}`,YR=`// @shader-file: packages/maxpower/Material/WireframeMaterial/wireframe.vs
#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>
	#include <vert_out>

}
`;class ib extends He{constructor(l){const i=l||[0,0,0];super({name:"WireframeMaterial",phase:["ui"],vert:YR,frag:WR,drawType:"LINES",blending:"NORMAL",depthTest:!0,depthWrite:!1,cullFace:!1,uniforms:{uWireColor:{type:"3f",value:i}},defines:{}}),this.useLight=!1}}function qR(){const l=new Float32Array([-.5,0,0,.5,0,0,0,-.5,0,0,.5,0,0,0,-.5,0,0,.5]),i=new Uint16Array([0,1,2,3,4,5]),o=new Io;return o.setAttribute("position",l,3),o.setAttribute("index",i,1),o}class Fu extends Fb{constructor(i){super(i);y(this,"_wireframeMaterial");y(this,"_wireframeMaterialSelected");y(this,"_emptyWireframeGeometry");y(this,"showWireframe",!0);y(this,"selectedEntityId",null);this._wireframeMaterial=new ib([0,0,0]),this._wireframeMaterialSelected=new ib([1,.5,0]),this._emptyWireframeGeometry=qR(),this.onAfterUI=o=>{this.renderEditorOverlays(o)}}renderEditorOverlays(i){this.renderWireframes(i)}renderWireframes(i){if(!this.showWireframe)return;const{stack:o,cameraEntity:s,camera:d}=i,c=[...o.deferred,...o.forward];this.gl.enable(this.gl.POLYGON_OFFSET_FILL),this.gl.polygonOffset(-1,-1);for(let v=0;v<c.length;v++){const h=c[v],p=h.getComponent(me);if(!p||!p.geometry||p.material.drawType!=="TRIANGLES")continue;const S=h.uuid===this.selectedEntityId?this._wireframeMaterialSelected:this._wireframeMaterial;this.draw(h.uuid+"_wireframe","forward",p.geometry,S,{viewMatrix:d.viewMatrix,projectionMatrix:d.projectionMatrix,cameraMatrixWorld:s.matrixWorld,modelMatrixWorld:h.matrixWorld,cameraNear:d.near,cameraFar:d.far,label:"wireframe"})}if(this._emptyWireframeGeometry)for(let v=0;v<o.empty.length;v++){const h=o.empty[v],_=h.uuid===this.selectedEntityId?this._wireframeMaterialSelected:this._wireframeMaterial;this.draw(h.uuid+"_empty_wireframe","forward",this._emptyWireframeGeometry,_,{viewMatrix:d.viewMatrix,projectionMatrix:d.projectionMatrix,cameraMatrixWorld:s.matrixWorld,modelMatrixWorld:h.matrixWorld,cameraNear:d.near,cameraFar:d.far,label:"empty_wireframe"})}this.gl.disable(this.gl.POLYGON_OFFSET_FILL)}}class XR{constructor(){y(this,"_ray");y(this,"_invMatrix");this._ray={origin:new Q,direction:new Q},this._invMatrix=new nt}raycast(l,i,o,s){const d=this.raycastAll(l,i,o,s);return d.length===0?null:d[0]}raycastAll(l,i,o,s){this._generateRay(l,i,o);const d=[];return this._traverseEntities(s,d),d.sort((c,v)=>c.distance-v.distance),d}_generateRay(l,i,o){const s=o.viewMatrix,d=o.projectionMatrix,c=new nt().copy(d).inverse(),v=new Q(l,i,-1,1),h=new Q(l,i,1,1);v.applyMatrix4(c),h.applyMatrix4(c),v.divide(v.w),h.divide(h.w);const p=new nt().copy(s).inverse();v.applyMatrix4(p),h.applyMatrix4(p),this._ray.origin.copy(v),this._ray.direction.copy(h).sub(v).normalize()}_traverseEntities(l,i){const o=l.getComponent(me);if(o&&o.geometry){const d=this._intersectMesh(l,o);d&&i.push(d)}else if(l.visible){const d=this._intersectEmpty(l);d&&i.push(d)}const s=l.children;for(let d=0;d<s.length;d++)this._traverseEntities(s[d],i)}_intersectMesh(l,i){const o=i.geometry;if(!o)return null;const s=o.getAttribute("position");if(!s)return null;const d=s.array,c=s.size,v=o.getAttribute("index");this._invMatrix.copy(l.matrixWorld).inverse();const h=this._ray.origin.clone().applyMatrix4(this._invMatrix),p=this._ray.direction.clone();p.w=0,p.applyMatrix4(this._invMatrix),p.normalize();let _=null;if(v){const C=v.array,D=C.length/3;for(let F=0;F<D;F++){const q=C[F*3+0],$=C[F*3+1],j=C[F*3+2],K=new Q(d[q*c+0],d[q*c+1],d[q*c+2]),Z=new Q(d[$*c+0],d[$*c+1],d[$*c+2]),I=new Q(d[j*c+0],d[j*c+1],d[j*c+2]),ne=this._intersectTriangle(h,p,K,Z,I);ne&&(!_||ne.t<_.t)&&(_=ne)}}else{const C=d.length/c/3;for(let D=0;D<C;D++){const F=new Q(d[(D*3+0)*c+0],d[(D*3+0)*c+1],d[(D*3+0)*c+2]),q=new Q(d[(D*3+1)*c+0],d[(D*3+1)*c+1],d[(D*3+1)*c+2]),$=new Q(d[(D*3+2)*c+0],d[(D*3+2)*c+1],d[(D*3+2)*c+2]),j=this._intersectTriangle(h,p,F,q,$);j&&(!_||j.t<_.t)&&(_=j)}}if(!_)return null;const S=_.point.applyMatrix4(l.matrixWorld),T=S.clone().sub(this._ray.origin).length();return{entity:l,distance:T,point:S}}_intersectTriangle(l,i,o,s,d){const v=s.clone().sub(o),h=d.clone().sub(o),p=i.clone().cross(h),_=v.dot(p);if(_>-1e-7&&_<1e-7)return null;const S=1/_,T=l.clone().sub(o),C=S*T.dot(p);if(C<0||C>1)return null;const D=T.clone().cross(v),F=S*i.dot(D);if(F<0||C+F>1)return null;const q=S*h.dot(D);if(q>1e-7){const $=l.clone().add(i.clone().multiply(q));return{t:q,point:$}}return null}_intersectEmpty(l){const o=new Q(l.matrixWorld.elm[12],l.matrixWorld.elm[13],l.matrixWorld.elm[14]),d=o.clone().sub(this._ray.origin).dot(this._ray.direction);if(d<0)return null;const c=this._ray.origin.clone().add(this._ray.direction.clone().multiply(d));return c.clone().sub(o).length()<.4?{entity:l,distance:d,point:c}:null}}class Mu{static serializeEntity(l){const i=o=>{const s=[];return o.children.forEach(d=>{d.initiator!="script"&&s.push(i(d))}),{name:o.name,uuid:o.uuid,pos:o.position.x==0&&o.position.y==0&&o.position.z==0?void 0:o.position.getElm("vec3"),rot:o.euler.x==0&&o.euler.y==0&&o.euler.z==0?void 0:o.euler.getElm("vec3"),scale:o.scale.x==1&&o.scale.y==1&&o.scale.z==1?void 0:o.scale.getElm("vec3"),childs:s.length>0?s:void 0}};return i(l)}static serializeEntityOverride(l){const i=[];return l.traverse(o=>{const s={uuid:o.uuid},d=[];o.components.forEach(c=>{const v=c.serialize({mode:"export"}),h=Object.keys(v).length>0,p={name:c.constructor.name};c.initiator==="user"&&(h&&(p.props=v),d.push(p))}),d.length>0&&(s.components=d),!(o.initiator!=="user"&&!s.components)&&i.push(s)}),i}static deserializeOverride(l,i){i.traverse(o=>{const s=l.find(d=>d.uuid===o.uuid);s&&(s.components||[]).forEach(d=>{const c=ct.resources.getComponent(d.name);if(c){const v=o.addComponent(c.component);v.initiator="user",d.props&&v.deserialize(d.props)}})})}static deserializeEntity(l,i){const o=(s,d)=>{const c=d||new Ct;c.initiator="user",c.name=s.name,s.uuid&&(c.uuid=s.uuid);const v=s.pos||[0,0,0];c.position.x=v[0],c.position.y=v[1],c.position.z=v[2];const h=s.rot||[0,0,0];c.euler.x=h[0],c.euler.y=h[1],c.euler.z=h[2];const p=s.scale||[1,1,1];return c.scale.x=p[0],c.scale.y=p[1],c.scale.z=p[2],s.childs&&s.childs.forEach(_=>{c.add(o(_))}),c};l&&o(l,i),i.initiator="god"}}class $R extends Tn{constructor(){super();y(this,"_componentList");y(this,"_componentGroups");y(this,"_textures");this._componentList=[],this._textures=new Map,this._componentGroups=[]}get componentList(){return this._componentList}get componentGroups(){return this._componentGroups}get textures(){return this._textures}clear(){this._componentList=[],this._componentGroups=[],this._textures.clear()}getComponent(i){return this._componentList.find(o=>o.name==i)}addComponentGroup(i){let o=this._componentGroups.find(d=>d.name==i);if(o)return o;const s=d=>{const c=[];return{child:c,name:d,addComponent:(v,h)=>{const p={name:v,component:h};c.push(p),this._componentList.push(p)},createGroup:v=>{const h=s(v);return c.push(h),h}}};return o=s(i),this._componentGroups.push(o),o}addTexture(i,o){return this._textures.set(i,o),o}getTexture(i){return this._textures.get(i)}}class KR{constructor(){y(this,"errors");y(this,"listeners");this.errors=new Map,this.listeners=new Set}addError(l){const i=`${l.type}_${Date.now()}_${Math.random()}`;let o;if(l.fullSource){const d=l.fullSource.match(/^\/\/ @shader-file: (.+)$/m);d&&(o=d[1])}const s={...l,id:i,filePath:o,timestamp:Date.now()};this.errors.set(i,s),this.notifyListeners()}clearErrors(){this.errors.clear(),this.notifyListeners()}removeError(l){this.errors.delete(l),this.notifyListeners()}clearErrorsByShaderKey(l){if(this.errors.size===0)return;let i=0;this.errors.forEach((o,s)=>{o.shaderKey===l&&(this.errors.delete(s),i++)}),i>0&&(console.log(`[ShaderErrorManager] Cleared ${i} error(s) for shaderKey: ${l}`),this.notifyListeners())}getErrors(){return Array.from(this.errors.values())}addListener(l){this.listeners.add(l)}removeListener(l){this.listeners.delete(l)}notifyListeners(){const l=this.getErrors();this.listeners.forEach(i=>i(l))}}const Vo=class Vo extends Ct{constructor(i){super();y(this,"enableRender");y(this,"_audioBuffer");y(this,"_renderer");y(this,"_cameraEntity");y(this,"_gl");y(this,"_canvas");y(this,"_projectCache");y(this,"_root");y(this,"_uniforms");y(this,"_time");y(this,"_frame");y(this,"_frameSetting");y(this,"_disposed");Vo.instances.set(i,this),this._gl=i,this.name="OREngine",this._disposed=!1,this._cameraEntity=null,this._uniforms={uTime:{value:0,type:"1f"},uTimeE:{value:0,type:"1f"},uEnvMapIntensity:{value:1,type:"1f"}},this._canvas=i.canvas,this._renderer=new Fu(i),this._projectCache=null,this._time={current:new Date().getTime(),engine:0,delta:0,code:0},this._frameSetting={duration:600,fps:30},this._frame={current:0,playing:!1},this.seek(0),this.enableRender=!0,this._audioBuffer=null,window.__glpowerShaderErrorHandler=s=>{var d;(d=Vo.shaderErrorManager)==null||d.addError(s)},window.__glpowerShaderClearHandler=s=>{var d;(d=Vo.shaderErrorManager)==null||d.clearErrorsByShaderKey(s)},this._root=new Ct,this._root.initiator="god",this._root.name="root",this.add(this._root),this.field("name",()=>this.name,s=>this.name=s),this.field("scene",()=>Mu.serializeEntity(this._root),s=>{Mu.deserializeEntity(s,this._root)}),this.field("overrides",()=>Mu.serializeEntityOverride(this._root),s=>{Mu.deserializeOverride(s,this._root)});const o=this.fieldDir("timeline");o.field("duration",()=>this._frameSetting.duration,s=>this._frameSetting.duration=s),o.field("fps",()=>this._frameSetting.fps,s=>this._frameSetting.fps=s)}static getInstance(i){const o=this.instances.get(i);if(!o)throw new Error("ERROR: NO ENGINE INSTANCE!!!");return o}get gl(){return this._gl}get canvas(){return this._canvas}get renderer(){return this._renderer}get root(){return this._root}get frame(){return this._frame}get time(){return this._time}get frameSetting(){return this._frameSetting}get uniforms(){return this._uniforms}setCamera(i){this._cameraEntity=i}get disposed(){return this._disposed}get projectCache(){return this._projectCache}get audioBuffer(){return this._audioBuffer}init(){this._root.disposeRecursive(),this._root.position.set(0,0,0),this._root.euler.set(0,0,0),this._root.scale.set(1,1,1),this.add(this._root),this.name="New Project"}async load(i){this.init(),this.deserialize(i),this._projectCache=i||null,this.emit("update/graph"),this.emit("loaded")}applyProjectOverrides(i){this._projectCache&&Mu.deserializeOverride(this._projectCache.overrides,i)}registerMusic(i){i.on("update/music",o=>{this._audioBuffer=o,this.emit("update/audioBuffer",[o])}),this.emit("register/music",[i])}registerBLidgeClient(i){i.on("sync/scene",o=>{o.frame&&(this.setField("timeline/fps",o.frame.fps),this.setField("timeline/duration",o.frame.end-o.frame.start))}),i.on("update/blidge/frame",(o,s)=>{o.current!==void 0&&this.seek(o.current);const d=s&&s.scrubbing;o.playing&&!this.frame.playing&&!d?this.play():(!o.playing||d)&&this.frame.playing&&this.stop()}),i.on("update/blidge/selection",o=>{this.emit("update/blidge/selection",[o])}),this.emit("register/blidgeClient",[i])}update(i){const o=new Date().getTime();this._time.delta=(o-this._time.current)/1e3,this._time.current=o,this._time.engine+=this._time.delta,this._time.code+=this._time.delta*(this._frame.playing?1:0),this._frame.current=this._time.code*this._frameSetting.fps;const s=this.createEntityUpdateEvent({forceDraw:i==null?void 0:i.forceDraw});return this._uniforms.uTime.value=this._time.code,this._uniforms.uTimeE.value=this._time.engine,this._root.update(s),this.enableRender&&this._cameraEntity&&this._renderer.render(this._root,this._cameraEntity,s),this._frame.playing&&this.emit("update/frame/play",[this._frame]),this._time.delta}createEntityUpdateEvent(i){const o={playing:this._frame.playing,timeElapsed:this._time.engine,timeDelta:this._time.delta,timeCode:this._time.code,timeCodeFrame:this._frame.current,resolution:this.renderer.resolution,renderer:this.renderer,forceDraw:!1};return i?{...o,...i}:o}setSize(i){this._renderer.resize(i),this._canvas.width=i.x,this._canvas.height=i.y}play(){this._frame.playing=!0,this._time.current=new Date().getTime(),this.emit("update/frame/play",[this._frame])}stop(){this._frame.playing=!1,this.emit("update/frame/play",[this._frame])}seek(i){this._time.code=i/this._frameSetting.fps,this._frame.current=i,this.emit("update/frame/play",[this._frame])}compileShaders(i){const o=this.createEntityUpdateEvent({forceDraw:!0});return this._cameraEntity?this.renderer.compileShaders(this._root,this._cameraEntity,o,i):Promise.resolve()}dispose(){super.dispose(),this._disposed=!0,this._root.disposeRecursive()}};y(Vo,"resources"),y(Vo,"instances"),y(Vo,"shaderErrorManager");let ct=Vo;ct.resources=new $R;ct.instances=new Map;ct.shaderErrorManager=new KR;const QR=()=>U.useContext(Sb),ZR="_compoAdd_5919t_45",JR="_directory_5919t_49",eD="_subDirectory_5919t_70",tD="_picker_5919t_116",vf={compoAdd:ZR,directory:JR,subDirectory:eD,picker:tD},Lb=({group:m,onClickAdd:l})=>{const i=QR(),[o,s]=U.useState(!1);let d=null,c,v="dir";return"child"in m?d=w.jsxDEV(w.Fragment,{children:m.child.map((h,p)=>w.jsxDEV(Lb,{group:h,onClickAdd:l},p,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:38,columnNumber:12},void 0))},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:35,columnNumber:15},void 0):(c=()=>l(m),v="item"),w.jsxDEV("div",{className:vf.directory,onPointerEnter:()=>s(!0),onPointerLeave:()=>s(!1),onClick:c,"data-type":v,"data-direction":i==null?void 0:i.direction,children:[m.name,o&&w.jsxDEV("div",{className:vf.subDirectory,children:d},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:59,columnNumber:9},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:50,columnNumber:9},void 0)},nD=m=>{const{pushContent:l,closeAll:i}=jv(),o=ct.resources,s=U.useCallback(d=>{if(!o||!l||!i)return;const c=[],v=h=>{m.entity.addComponent(h.component).initiator="user",i()};o.componentGroups.forEach((h,p)=>{c.push(w.jsxDEV(Lb,{group:h,onClickAdd:v},p,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:89,columnNumber:5},void 0))}),l(w.jsxDEV("div",{className:vf.picker,children:c},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:96,columnNumber:4},void 0))},[l,o,m.entity,i]);return w.jsxDEV("div",{className:vf.compAdd,children:w.jsxDEV(Ta,{onClick:s,children:"Add Component"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:105,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:104,columnNumber:9},void 0)},rD="_cross_nfbq8_45",iD={cross:rD},oD=()=>w.jsxDEV("div",{className:iD.cross,children:w.jsxDEV("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[w.jsxDEV("rect",{x:"5.12",y:"16.832",width:"2.57272",height:"17.6514",transform:"rotate(-135 5.12 16.832)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/CrossIcon/index.tsx",lineNumber:7,columnNumber:4},void 0),w.jsxDEV("rect",{x:"3.30078",y:"4.35059",width:"2.57272",height:"17.6514",transform:"rotate(-45 3.30078 4.35059)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/CrossIcon/index.tsx",lineNumber:8,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/CrossIcon/index.tsx",lineNumber:6,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/CrossIcon/index.tsx",lineNumber:5,columnNumber:9},void 0),aD="_edit_f5ct3_45",sD={edit:aD},lD=()=>w.jsxDEV("div",{className:sD.edit,children:w.jsxDEV("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[w.jsxDEV("path",{d:"M14.5 2.5L17.5 5.5L6.5 16.5H3.5V13.5L14.5 2.5Z",stroke:"#D9D9D9",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/EditIcon/index.tsx",lineNumber:7,columnNumber:4},void 0),w.jsxDEV("path",{d:"M12 5L15 8",stroke:"#D9D9D9",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/EditIcon/index.tsx",lineNumber:8,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/EditIcon/index.tsx",lineNumber:6,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/EditIcon/index.tsx",lineNumber:5,columnNumber:9},void 0),uD=[{name:"DebaBouChou",path:"Demo4/Common/DebaBouChou",shaders:[{type:"fs",path:"shaders/debaBouChou.fs"}]},{name:"HUD",path:"Demo4/Common/HUD",shaders:[{type:"fs",path:"shaders/hud.fs"},{type:"vs",path:"shaders/hud.vs"}]},{name:"MizuBall",path:"Demo4/Common/MizuBall",shaders:[{type:"fs",path:"shaders/mizuBall.fs"}]},{name:"ShaderMotionGraphics",path:"Demo4/Common/ShaderMotionGraphics",shaders:[{type:"fs",path:"shaders/border.fs"},{type:"fs",path:"shaders/circle.fs"},{type:"fs",path:"shaders/cross.fs"},{type:"fs",path:"shaders/dotGrid.fs"},{type:"fs",path:"shaders/ikuraBGScreen.fs"},{type:"fs",path:"shaders/maguroBGScreen.fs"},{type:"fs",path:"shaders/salmonBGScreen.fs"},{type:"vs",path:"shaders/smg.vs"},{type:"fs",path:"shaders/takoBGScreen.fs"}]},{name:"Shari",path:"Demo4/Common/Shari",shaders:[{type:"fs",path:"shaders/shari.fs"},{type:"vs",path:"shaders/shari.vs"}]},{name:"SkyBox",path:"Demo4/Common/SkyBox",shaders:[{type:"fs",path:"shaders/skybox.fs"}]},{name:"TableStage",path:"Demo4/Common/TableStage",shaders:[{type:"fs",path:"shaders/tableStage.fs"}]},{name:"TruchetSushiLane",path:"Demo4/Common/TruchetSushiLane",shaders:[{type:"fs",path:"shaders/truchetSushiLane.fs"}]},{name:"TsuriZao",path:"Demo4/Common/Tsuri/TsuriZao",shaders:[{type:"fs",path:"shaders/basic.fs"}]},{name:"UKPAshi",path:"Demo4/Common/UKPAshi",shaders:[{type:"fs",path:"shaders/basic.fs"}]},{name:"Ukonpower",path:"Demo4/Common/Ukonpower",shaders:[{type:"fs",path:"shaders/ukonpower.fs"}]},{name:"IkuraFluids",path:"Demo4/Ikura/IkuraFluids",shaders:[{type:"fs",path:"shaders/ikuraFluids.fs"},{type:"vs",path:"shaders/ikuraFluids.vs"},{type:"fs",path:"shaders/ikuraFluidsCompute.fs"}]},{name:"GunkanShari",path:"Demo4/Ikura/IkuraGunKan/GunkanShari",shaders:[{type:"fs",path:"shaders/gunkanShari.fs"}]},{name:"Ikura",path:"Demo4/Ikura/IkuraGunKan/Ikura",shaders:[{type:"fs",path:"shaders/ikura.fs"},{type:"vs",path:"shaders/ikura.vs"}]},{name:"Kyuuri",path:"Demo4/Ikura/Kyuuri",shaders:[{type:"fs",path:"shaders/kyuuri.fs"}]},{name:"Maguro",path:"Demo4/Maguro/Maguro",shaders:[{type:"fs",path:"shaders/maguro.fs"}]},{name:"Sashimi",path:"Demo4/Maguro/Sashimi",shaders:[{type:"fs",path:"shaders/sashimi.fs"}]},{name:"GreetingCard",path:"Demo4/Party/GreetingCard",shaders:[{type:"fs",path:"shaders/greeting.fs"},{type:"vs",path:"shaders/greeting.vs"}]},{name:"Sara",path:"Demo4/Party/Sara",shaders:[{type:"fs",path:"shaders/sara.fs"},{type:"vs",path:"shaders/sara.vs"}]},{name:"SushiGeta",path:"Demo4/Party/SushiGeta",shaders:[{type:"fs",path:"shaders/sushiGeta.fs"}]},{name:"Onigiri",path:"Demo4/Salmon/Onigiri",shaders:[{type:"fs",path:"shaders/onigiri.fs"}]},{name:"Salmon",path:"Demo4/Salmon/Salmon",shaders:[{type:"fs",path:"shaders/salmon.fs"}]},{name:"TakoGate",path:"Demo4/Tako/TakoGate",shaders:[{type:"fs",path:"shaders/takogate.fs"}]},{name:"TakoKosen",path:"Demo4/Tako/TakoKosen",shaders:[{type:"fs",path:"shaders/takokosen.fs"},{type:"vs",path:"shaders/takokosen.vs"}]},{name:"Ocean",path:"Demo4/Tsuri/Ocean",shaders:[{type:"fs",path:"shaders/ocean.fs"}]},{name:"Taiyaki",path:"Demo4/Tsuri/Taiyaki",shaders:[{type:"fs",path:"shaders/taiyaki.fs"}]},{name:"Teibo",path:"Demo4/Tsuri/Teibo",shaders:[{type:"fs",path:"shaders/teibo.fs"}]}],cD="_compoView_v05nu_45",dD="_head_v05nu_52",fD="_name_v05nu_58",mD="_check_v05nu_62",hD="_shaderEditor_v05nu_66",pD="_propertyBlock_v05nu_86",Rs={compoView:cD,head:dD,name:fD,check:mD,shaderEditor:hD,delete:"_delete_v05nu_76",propertyBlock:pD},vD=({component:m})=>{const l=m.initiator!=="user",i=U.useCallback(c=>{c.stopPropagation();const v=m.entity;v&&v.removeComponentByUUID(m.uuid)},[m]),o=U.useMemo(()=>{const c=m.constructor.name;return uD.find(h=>h.name===c)},[m]),s=U.useCallback(c=>{if(c.stopPropagation(),o){const v=`/shaderEditor?component=${encodeURIComponent(o.path)}`;window.open(v,"_blank")}},[o]),d=w.jsxDEV("div",{className:Rs.head,children:[w.jsxDEV("div",{className:Rs.name,children:m.constructor.name},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentView/index.tsx",lineNumber:69,columnNumber:3},void 0),o&&w.jsxDEV("div",{className:Rs.shaderEditor,children:w.jsxDEV("button",{onClick:s,title:"ShaderEditorで開く",children:w.jsxDEV(lD,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentView/index.tsx",lineNumber:75,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentView/index.tsx",lineNumber:74,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentView/index.tsx",lineNumber:73,columnNumber:4},void 0),w.jsxDEV("div",{className:Rs.delete,children:w.jsxDEV("button",{onClick:i,children:w.jsxDEV(oD,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentView/index.tsx",lineNumber:80,columnNumber:36},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentView/index.tsx",lineNumber:80,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentView/index.tsx",lineNumber:79,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentView/index.tsx",lineNumber:65,columnNumber:19},void 0);return w.jsxDEV("div",{className:Rs.compoView,"data-disable_component":l,children:w.jsxDEV("div",{className:Rs.content,children:w.jsxDEV(zs,{label:d,accordion:!0,bg:!0,defaultClose:!1,children:w.jsxDEV(Rb,{target:m},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentView/index.tsx",lineNumber:87,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentView/index.tsx",lineNumber:86,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentView/index.tsx",lineNumber:85,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentView/index.tsx",lineNumber:84,columnNumber:9},void 0)},gD="_container_18572_1",yD={container:gD},xD=({entity:m})=>{const[l]=Vt(m,"components"),i=U.useMemo(()=>{const o=[];return l?(l.forEach(s=>{const d=m.getComponentByUUID(s);d&&o.push(w.jsxDEV(vD,{component:d},d.uuid,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentList/index.tsx",lineNumber:31,columnNumber:5},void 0))}),o):null},[l,m]);return w.jsxDEV("div",{className:yD.container,children:i},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/ComponentList/index.tsx",lineNumber:40,columnNumber:9},void 0)},bD="_property_5puun_45",_D="_content_5puun_50",wD="_name_5puun_54",SD="_component_controls_5puun_60",ED={property:bD,content:_D,name:wD,component_controls:SD},rf=()=>{const{editor:m,engine:l}=no(),[i]=Vt(m,"selectedEntityId"),o=U.useMemo(()=>{if(i)return l.findEntityByUUID(i)},[l,i]);return o?w.jsxDEV("div",{className:ED.container,children:[w.jsxDEV(zs,{label:"Fields",accordion:!0,children:w.jsxDEV(Rb,{target:o},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/index.tsx",lineNumber:41,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/index.tsx",lineNumber:40,columnNumber:3},void 0),w.jsxDEV(zs,{label:"Components",accordion:!0,children:[w.jsxDEV(xD,{entity:o},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/index.tsx",lineNumber:44,columnNumber:4},void 0),w.jsxDEV(nD,{entity:o},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/index.tsx",lineNumber:45,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/index.tsx",lineNumber:43,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/EntityProperty/index.tsx",lineNumber:39,columnNumber:9},void 0):null},Ub=U.createContext(null),Bb=()=>{const m=U.useContext(Ub);if(m===null)throw new Error("useOREngine must be used within a OREngineProvider");return m};class CD{constructor(l){y(this,"buffer");y(this,"index");y(this,"size");y(this,"filled");this.size=l,this.buffer=new Array(l),this.index=0,this.filled=!1}push(l){this.buffer[this.index]=l,this.index=(this.index+1)%this.size,!this.filled&&this.index===0&&(this.filled=!0)}getAverage(){const l=this.filled?this.size:this.index;if(l===0)return 0;let i=0;for(let o=0;o<l;o++)i+=this.buffer[o];return i/l}getMax(){const l=this.filled?this.size:this.index;if(l===0)return 0;let i=this.buffer[0];for(let o=1;o<l;o++)this.buffer[o]>i&&(i=this.buffer[o]);return i}getMin(){const l=this.filled?this.size:this.index;if(l===0)return 0;let i=this.buffer[0];for(let o=1;o<l;o++)this.buffer[o]<i&&(i=this.buffer[o]);return i}getCount(){return this.filled?this.size:this.index}}class TD{constructor(l=30){y(this,"buffers");y(this,"windowSize");y(this,"currentData");this.windowSize=l,this.buffers=new Map,this.currentData=new Map}update(l){const i=performance.now();for(let o=0;o<l.length;o++){const s=l[o],d=s.name.split("/"),c=d[0]||"unknown";let v;const h=d[d.length-1],p=h&&h.match(/\[([^\]]+)\]/);p&&(v=p[1]);const _={name:s.name,duration:s.duration,timestamp:i,renderType:c};let S=this.buffers.get(s.name);S||(S=new CD(this.windowSize),this.buffers.set(s.name,S)),S.push(s.duration),this.currentData.set(s.name,{..._,entityId:v})}}getStatistics(){const l=[];let i=0;const o=performance.now(),s=1e3,d=[];return this.currentData.forEach((c,v)=>{o-c.timestamp>s&&d.push(v)}),d.forEach(c=>{this.currentData.delete(c)}),this.currentData.forEach(c=>{i+=c.duration}),this.currentData.forEach(c=>{const v=this.buffers.get(c.name);v&&l.push({name:c.name,renderType:c.renderType,entityId:c.entityId,current:c.duration,avg:v.getAverage(),max:v.getMax(),min:v.getMin(),samples:v.getCount(),percentage:i>0?c.duration/i*100:0})}),l}getTotalTime(){let l=0;return this.currentData.forEach(i=>{l+=i.duration}),l}}const kD="_container_1u95i_45",ND="_header_1u95i_56",RD="_totalTime_1u95i_66",DD="_toggleButton_1u95i_71",MD="_controls_1u95i_90",PD="_control_1u95i_90",zD="_controlLabel_1u95i_103",AD="_select_1u95i_107",OD="_input_1u95i_124",FD="_warning_1u95i_138",LD="_group_1u95i_146",UD="_groupHeader_1u95i_150",BD="_item_1u95i_157",VD="_clickable_1u95i_161",ID="_itemName_1u95i_169",jD="_itemTime_1u95i_177",HD="_itemStats_1u95i_184",GD="_progressBar_1u95i_192",WD="_progressFill_1u95i_200",Ot={container:kD,header:ND,totalTime:RD,toggleButton:DD,controls:MD,control:PD,controlLabel:zD,select:AD,input:OD,warning:FD,group:LD,groupHeader:UD,item:BD,clickable:VD,itemName:ID,itemTime:jD,itemStats:HD,progressBar:GD,progressFill:WD},YD=m=>{if(m<2){const l=m/2;return`rgb(${Math.floor(100+l*100)}, 200, 100)`}else if(m<5){const l=(m-2)/3;return`rgb(200, ${Math.floor(200-l*50)}, 100)`}else if(m<10){const l=(m-5)/5,i=Math.floor(150-l*80),o=Math.floor(100-l*50);return`rgb(200, ${i}, ${o})`}else return"rgb(200, 70, 50)"},Pv=m=>m>=10?m.toFixed(1):m>=1?m.toFixed(2):m.toFixed(3),ob=()=>{const{editor:m}=no(),{engine:l}=Bb(),[i,o]=U.useState([]),[s,d]=U.useState(0),[c,v]=U.useState("all"),[h,p]=U.useState(0),[_,S]=U.useState("time"),[T,C]=U.useState(!1),D=U.useRef(new TD(30)),F=U.useRef(0),q=U.useRef(!1),$=U.useRef(0),j=z=>{if(!z)return;const X=l.root.findEntityByUUID(z);X&&m.selectEntity(X)};U.useEffect(()=>{const z=l.renderer,X=D.current,re=300,se=ze=>{T&&(X.update(ze),q.current=!0)},le=ze=>{q.current&&ze-$.current>=re&&(o(X.getStatistics()),d(X.getTotalTime()),q.current=!1,$.current=ze),F.current=requestAnimationFrame(le)};return z.on("timer",se),F.current=requestAnimationFrame(le),()=>{z.off("timer",se),cancelAnimationFrame(F.current)}},[l,T]);const K=i.filter(z=>!(c!=="all"&&z.renderType!==c||z.avg<h)),Z=Array.from(new Set(i.map(z=>z.renderType))),I=[...K].sort((z,X)=>_==="time"?X.avg-z.avg:z.name.localeCompare(X.name)),ne=s>0?Math.floor(1e3/s):0;return w.jsxDEV("div",{className:Ot.container,children:[w.jsxDEV("div",{className:Ot.header,children:[w.jsxDEV("div",{className:Ot.totalTime,children:["Total: ",Pv(s)," ms (",ne," fps)"]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:199,columnNumber:5},void 0),w.jsxDEV("button",{className:Ot.toggleButton,onClick:()=>C(!T),title:T?"Stop timer":"Start timer",children:T?"⏸":"▶"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:204,columnNumber:5},void 0),w.jsxDEV("div",{className:Ot.controls,children:[w.jsxDEV("div",{className:Ot.control,children:[w.jsxDEV("span",{className:Ot.controlLabel,children:"Type:"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:215,columnNumber:7},void 0),w.jsxDEV("select",{className:Ot.select,value:c,onChange:z=>v(z.target.value),children:[w.jsxDEV("option",{value:"all",children:"All"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:221,columnNumber:8},void 0),Z.map(z=>w.jsxDEV("option",{value:z,children:z},z,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:223,columnNumber:9},void 0))]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:216,columnNumber:7},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:214,columnNumber:6},void 0),w.jsxDEV("div",{className:Ot.control,children:[w.jsxDEV("span",{className:Ot.controlLabel,children:"Min:"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:231,columnNumber:7},void 0),w.jsxDEV("input",{className:Ot.input,type:"number",min:"0",step:"0.1",value:h,onChange:z=>p(parseFloat(z.target.value)||0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:232,columnNumber:7},void 0),w.jsxDEV("span",{className:Ot.controlLabel,children:"ms"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:240,columnNumber:7},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:230,columnNumber:6},void 0),w.jsxDEV("div",{className:Ot.control,children:[w.jsxDEV("span",{className:Ot.controlLabel,children:"Sort:"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:244,columnNumber:7},void 0),w.jsxDEV("select",{className:Ot.select,value:_,onChange:z=>S(z.target.value),children:[w.jsxDEV("option",{value:"time",children:"Time"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:250,columnNumber:8},void 0),w.jsxDEV("option",{value:"name",children:"Name"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:251,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:245,columnNumber:7},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:243,columnNumber:6},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:213,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:198,columnNumber:4},void 0),w.jsxDEV("div",{className:Ot.group,children:I.map((z,X)=>{const re=YD(z.avg),se=s>0?z.avg/s*100:0,le=!!z.entityId;return w.jsxDEV("div",{className:`${Ot.item} ${le?Ot.clickable:""}`,onClick:()=>j(z.entityId),children:[w.jsxDEV("div",{children:[w.jsxDEV("span",{className:Ot.itemName,title:z.name,children:z.name},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:273,columnNumber:9},void 0),w.jsxDEV("span",{className:Ot.itemTime,style:{color:re},children:[Pv(z.avg),"ms"]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:276,columnNumber:9},void 0),w.jsxDEV("span",{className:Ot.itemStats,children:["max:",Pv(z.max)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:279,columnNumber:9},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:272,columnNumber:8},void 0),w.jsxDEV("div",{className:Ot.progressBar,children:w.jsxDEV("div",{className:Ot.progressFill,style:{width:`${se}%`,backgroundColor:re}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:284,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:283,columnNumber:8},void 0)]},z.name+X,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:267,columnNumber:7},void 0)})},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:258,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/GPUTimer/index.tsx",lineNumber:196,columnNumber:3},void 0)},qD="_search_icon_1knbw_45",XD={search_icon:qD},$D=()=>w.jsxDEV("div",{className:XD.search_icon,children:w.jsxDEV("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[w.jsxDEV("circle",{cx:"10",cy:"10",r:"7",stroke:"currentColor",strokeWidth:"2"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/SearchIcon/index.tsx",lineNumber:7,columnNumber:4},void 0),w.jsxDEV("path",{d:"M15 15L21 21",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/SearchIcon/index.tsx",lineNumber:8,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/SearchIcon/index.tsx",lineNumber:6,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/SearchIcon/index.tsx",lineNumber:5,columnNumber:9},void 0),KD="_group_vm37a_45",QD="_submit_vm37a_51",ab={group:KD,submit:QD},ZD=m=>{const l=m.initialValues,i=[],[o,s]=U.useState(l);U.useEffect(()=>{s(l)},[l]);const d=Object.keys(o);for(let v=0;v<d.length;v++){const h=d[v],p=o[h];i.push(w.jsxDEV(ui,{label:h,value:p,onChange:_=>{s({...o,[h]:_})}},v,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/InputGroup/index.tsx",lineNumber:35,columnNumber:18},void 0))}const c=U.useRef(null);return U.useEffect(()=>{setTimeout(()=>{var v;c.current&&((v=c.current.querySelector("input"))==null||v.focus())},0)},[]),w.jsxDEV("div",{className:ab.group,ref:c,children:w.jsxDEV("form",{onSubmit:v=>{v.preventDefault()},children:[w.jsxDEV(zs,{label:m.title,noMargin:!0,children:i},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/InputGroup/index.tsx",lineNumber:69,columnNumber:4},void 0),w.jsxDEV("div",{className:ab.submit,children:w.jsxDEV(Ta,{type:"submit",onClick:()=>{m.onSubmit&&m.onSubmit(o)},children:"OK"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/InputGroup/index.tsx",lineNumber:73,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/InputGroup/index.tsx",lineNumber:72,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/InputGroup/index.tsx",lineNumber:64,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/InputGroup/index.tsx",lineNumber:63,columnNumber:9},void 0)},JD="_picker_lpoad_45",e5="_picker_label_lpoad_58",t5="_picker_list_lpoad_63",n5="_picker_list_inner_lpoad_68",r5="_item_lpoad_76",Pu={picker:JD,picker_label:e5,picker_list:t5,picker_list_inner:n5,item:r5},i5=m=>w.jsxDEV("div",{className:Pu.picker,"data-no_bg":m.noBg,children:[m.label&&w.jsxDEV("div",{className:Pu.picker_label,children:m.label},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Picker/index.tsx",lineNumber:18,columnNumber:19},void 0),w.jsxDEV("div",{className:Pu.picker_list,children:w.jsxDEV("div",{className:Pu.picker_list_inner,children:m.list.map((l,i)=>w.jsxDEV("div",{className:Pu.item,onClick:l.onClick,children:l.label},i,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Picker/index.tsx",lineNumber:25,columnNumber:14},void 0))},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Picker/index.tsx",lineNumber:21,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Picker/index.tsx",lineNumber:20,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/composites/Picker/index.tsx",lineNumber:16,columnNumber:9},void 0),o5="_node_dzvso_45",a5="_self_dzvso_54",s5="_self_name_dzvso_65",l5="_fold_dzvso_76",u5="_fold_button_dzvso_79",c5="_child_dzvso_92",d5="_child_line_dzvso_95",Ca={node:o5,self:a5,self_name:s5,fold:l5,fold_button:u5,child:c5,child_line:d5},Vb=m=>{const{editor:l,engine:i}=no(),[o]=Vt(l,"selectedEntityId"),s=o!==void 0&&i.findEntityByUUID(o),[d]=Vt(m.entity,"children"),c=(d||[]).map(X=>i.findEntityByUUID(X)).filter(X=>X!==void 0),v=m.depth||0,h=c&&c.concat().sort((X,re)=>X.name.localeCompare(re.name))||[],p=h.length>0,_=v*20,S=m.entity.initiator=="script",T=m.searchQuery||"",C=T.toLowerCase(),D=(X,re)=>re===""||X.name.toLowerCase().includes(re)?!0:X.children.some(se=>D(se,re)),F=D(m.entity,C),q=U.useRef(null);U.useEffect(()=>{s&&s.uuid==m.entity.uuid&&q.current&&q.current.scrollIntoView({behavior:"smooth",block:"center"})},[s,m.entity.uuid]);const[$,j]=U.useState(!0),K=U.useCallback(X=>{j(!$),X.stopPropagation()},[$]),Z=U.useCallback(()=>{l&&l.selectEntity(m.entity)},[l,m.entity]),{pushContent:I,closeAll:ne}=jv(),z=U.useCallback(X=>{X.preventDefault(),!(!l||!I||!ne||S)&&(l.selectEntity(m.entity),I(w.jsxDEV(i5,{label:m.entity.name,list:[{label:"Add Entity",onClick:()=>{I(w.jsxDEV(ZD,{initialValues:{name:""},onSubmit:re=>{const se=l.createEntity(m.entity,re.name);l.selectEntity(se),ne()}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:109,columnNumber:7},void 0))}},{label:"Delete Entity",onClick:()=>{l.deleteEntity(m.entity),ne()}}]},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:103,columnNumber:16},void 0)))},[l,m.entity,I,ne,S]);return F?w.jsxDEV("div",{className:Ca.node,"data-no_export":S,children:[w.jsxDEV("div",{ref:q,className:Ca.self,style:{paddingLeft:_},onClick:Z,onContextMenu:z,"data-selected":s&&s.uuid==m.entity.uuid,children:[w.jsxDEV("div",{className:Ca.fold,"data-hnode_open":$,children:p&&w.jsxDEV("button",{className:Ca.fold_button,onClick:K,children:w.jsxDEV(Iv,{open:$},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:143,columnNumber:87},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:143,columnNumber:18},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:142,columnNumber:4},void 0),w.jsxDEV("div",{className:Ca.self_name,children:w.jsxDEV("p",{children:[m.entity.name||"-"," ",w.jsxDEV("span",{children:["[",m.entity.uuid,"]"]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:146,columnNumber:35},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:146,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:145,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:141,columnNumber:3},void 0),p&&w.jsxDEV("div",{className:Ca.child,"data-open":$,children:[h.map(X=>w.jsxDEV(Vb,{entity:X,depth:v+1,searchQuery:T},X.uuid,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:153,columnNumber:13},void 0)),w.jsxDEV("div",{className:Ca.child_line,style:{marginLeft:_+4}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:157,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:149,columnNumber:16},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:140,columnNumber:9},void 0):null},f5="_hierarchy_1x2ql_45",m5="_search_1x2ql_52",h5="_search_wrapper_1x2ql_59",p5="_search_input_1x2ql_72",v5="_hierarchy_content_1x2ql_88",zu={hierarchy:f5,search:m5,search_wrapper:h5,search_input:p5,hierarchy_content:v5},sb=()=>{const{editor:m}=no(),l=m.engine.root,[i,o]=U.useState("");return w.jsxDEV("div",{className:zu.hierarchy,children:[w.jsxDEV("div",{className:zu.search,children:w.jsxDEV("div",{className:zu.search_wrapper,children:[w.jsxDEV($D,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/index.tsx",lineNumber:22,columnNumber:5},void 0),w.jsxDEV("input",{type:"text",placeholder:"Search entities...",value:i,onChange:s=>o(s.target.value),className:zu.search_input},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/index.tsx",lineNumber:23,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/index.tsx",lineNumber:21,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/index.tsx",lineNumber:20,columnNumber:3},void 0),w.jsxDEV("div",{className:zu.hierarchy_content,children:l&&w.jsxDEV(Vb,{entity:l,searchQuery:i},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/index.tsx",lineNumber:33,columnNumber:19},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/index.tsx",lineNumber:32,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Hierarchy/index.tsx",lineNumber:19,columnNumber:9},void 0)},g5="_project_7nnqy_1",y5="_project_inner_7nnqy_5",x5="_projectSelector_7nnqy_9",b5="_row_7nnqy_13",_5="_rowItem_7nnqy_20",zv={project:g5,project_inner:y5,projectSelector:x5,row:b5,rowItem:_5,export:"_export_7nnqy_30"},lb=()=>{const{editor:m}=no(),[l,i]=Vt(m.engine,"name");return m?w.jsxDEV("div",{className:zv.project,children:w.jsxDEV("div",{className:zv.project_inner,children:w.jsxDEV(zs,{label:"Project",accordion:!0,children:[w.jsxDEV(Lr,{title:"Project Name",children:w.jsxDEV(Fv,{value:l||"",onChange:o=>{i(o)}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ProjectControl/index.tsx",lineNumber:22,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ProjectControl/index.tsx",lineNumber:21,columnNumber:5},void 0),w.jsxDEV(Ta,{onClick:()=>{m&&m.save()},children:"Save"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ProjectControl/index.tsx",lineNumber:28,columnNumber:5},void 0),w.jsxDEV("div",{className:zv.export,children:w.jsxDEV(Ta,{onClick:()=>{m&&(m.save(),window.open("/player","_blank"))},children:["Play ",w.jsxDEV(Iv,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ProjectControl/index.tsx",lineNumber:48,columnNumber:15},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ProjectControl/index.tsx",lineNumber:38,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ProjectControl/index.tsx",lineNumber:37,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ProjectControl/index.tsx",lineNumber:20,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ProjectControl/index.tsx",lineNumber:19,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ProjectControl/index.tsx",lineNumber:18,columnNumber:9},void 0):null},w5="_container_8wzg2_1",S5={container:w5},E5=()=>{const{engine:m,editor:l}=no(),i=U.useRef(null);return U.useEffect(()=>{const o=i.current;if(!m||!o)return;const s=m.canvas;if(!s){console.error("Canvas element not found in engine");return}o.appendChild(s);let d=null,c=null;if(l&&l._scenePointer){let v=0,h=0;const p=5;d=_=>{v=_.clientX,h=_.clientY},c=_=>{const S=Math.abs(_.clientX-v),T=Math.abs(_.clientY-h);if(S<=p&&T<=p){const C=l._scenePointer;C&&C.handleClick&&C.handleClick(_.clientX,_.clientY,s)}},s.addEventListener("mousedown",d),s.addEventListener("mouseup",c)}return()=>{o.contains(s)&&o.removeChild(s),d&&s.removeEventListener("mousedown",d),c&&s.removeEventListener("mouseup",c)}},[m,l]),w.jsxDEV("div",{className:S5.container,ref:i,role:"presentation","aria-label":"3D Canvas"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Canvas/index.tsx",lineNumber:97,columnNumber:3},void 0)};class C5 extends Tn{constructor(){super();y(this,"wrapperElm");y(this,"canvas");y(this,"canvasCtx");y(this,"viewRangeFrame");y(this,"viewPort");y(this,"viewPortRange");y(this,"musicBuffer");y(this,"resizeObserver");y(this,"frameSetting");y(this,"framePlay");this.wrapperElm=null,this.canvas=document.createElement("canvas"),this.canvasCtx=this.canvas.getContext("2d"),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0];const i=window.localStorage.getItem("audioViweRange");this.viewRangeFrame=i?Number(i):2,this.frameSetting={duration:0,fps:60},this.framePlay={current:0,playing:!1},this.musicBuffer=null,this.resizeObserver=new ResizeObserver(this.onResize.bind(this))}onResize(){if(this.wrapperElm){const i=new Q(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);this.canvas.width=i.x,this.canvas.height=i.y}this.render()}render(){if(this.canvasCtx.fillStyle="#000",this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.musicBuffer){this.canvasCtx.strokeStyle="#888",this.canvasCtx.fillStyle="#888";const i=this.musicBuffer.getChannelData(0),o=1,s=this.viewPortRange[0]/this.frameSetting.fps,d=this.musicBuffer.sampleRate*s,c=d/this.canvas.width,v=this.frameToPx(0);this.canvasCtx.beginPath();for(let h=0;h<d;h+=c){const p=Math.floor(h-v*c),_=i[Math.round(p)]*o,S=h/d*this.canvas.width,T=(_+1)*(this.canvas.height/2);let C=T,D=T;for(let q=0;q<16;q++){const j=(i[Math.round(p+c*(q/16))]*o+1)*(this.canvas.height/2);C>j&&(C=j),D<j&&(D=j)}const F=D-C;F>3&&this.canvasCtx.fillRect(S,C,1,F),h==0?this.canvasCtx.moveTo(S,T):this.canvasCtx.lineTo(S,T)}this.canvasCtx.stroke()}this.canvasCtx.fillStyle="#555",this.canvasCtx.fillRect(this.canvas.width/2,0,1,this.canvas.height)}setWrapperElm(i){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=i,this.resizeObserver.observe(i),this.wrapperElm.appendChild(this.canvas),this.onResize()}setFramePlaying(i){this.framePlay=i,this.viewPort=[this.framePlay.current-this.viewRangeFrame,0,this.framePlay.current+this.viewRangeFrame,0],this.viewPortRange=[this.viewPort[2]-this.viewPort[0],this.viewPort[3]-this.viewPort[1]],this.render()}setViewRangeFrame(i){this.viewRangeFrame=i,this.setFramePlaying(this.framePlay),localStorage.setItem("audioViweRange",String(this.viewRangeFrame))}setFrameSetting(i){this.frameSetting=i,this.render()}setMusicBuffer(i){this.musicBuffer=i,this.render()}frameToPx(i){return(i-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.canvas),this.resizeObserver.disconnect()}}const T5="_audioView_1iv4u_45",k5={audioView:T5},N5=()=>{const{editor:m}=no(),l=U.useRef(null),[i,o]=U.useState();U.useEffect(()=>{const T=new C5;if(o(T),l.current)return T.setWrapperElm(l.current),()=>{T.dispose()}},[]);const s=m&&m.audioBuffer,[d,c]=U.useState(),[v,h]=U.useState({duration:0,fps:0}),[p,_]=U.useState({current:0,playing:!1});U.useEffect(()=>{if(!m)return;const T=m.engine,C=$=>{h({duration:$["timeline/duration"],fps:$["timeline/fps"]})};let D=0;const F=()=>{c(D++)},q=$=>{_({...$})};return C(T.serialize()),q(T.frame),T.on("fields/update",C),T.on("update/frame/play",q),T.on("update/audioBuffer",F),()=>{T.off("update/frame/setting",C),T.off("update/frame/play",q),T.off("update/audioBuffer",F)}},[m]),U.useEffect(()=>{i&&s&&i.setMusicBuffer(s)},[i,s,d]),U.useEffect(()=>{i&&p&&i.setFramePlaying(p)},[i,p]),U.useEffect(()=>{i&&v&&i.setFrameSetting(v)},[i,v]);const S=U.useCallback(T=>{if(i){const C=T.deltaY>0?1.1:.9;i.setViewRangeFrame(i.viewRangeFrame*C)}T.preventDefault()},[i]);return U.useEffect(()=>{const T=l.current;return T&&T.addEventListener("wheel",S,{passive:!1}),()=>{T&&T.removeEventListener("wheel",S)}},[S]),w.jsxDEV("div",{className:k5.audioView,ref:l},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/AudioView/index.tsx",lineNumber:171,columnNumber:9},void 0)},R5="_screen_18s1v_45",D5="_header_18s1v_53",M5="_header_right_18s1v_68",P5="_header_item_18s1v_74",z5="_content_18s1v_82",A5="_canvas_18s1v_90",O5="_audioView_18s1v_94",F5="_externalBtn_18s1v_103",si={screen:R5,header:D5,header_right:M5,header_item:P5,content:z5,canvas:A5,audioView:O5,externalBtn:F5},ub=()=>{const{editor:m}=no(),[l,i]=Vt(m,"enableRender"),[o,s]=Vt(m,"viewType"),[d,c]=Vt(m,"resolutionScale"),[v,h]=Vt(m,"showWireframe");return w.jsxDEV("div",{className:si.screen,children:[w.jsxDEV("div",{className:si.header,children:w.jsxDEV("div",{className:si.header_right,children:[w.jsxDEV("div",{className:si.header_item,children:w.jsxDEV(Lr,{title:"Render",children:w.jsxDEV(ui,{value:l,onChange:p=>{i&&i(p)}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:27,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:26,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:25,columnNumber:5},void 0),w.jsxDEV("div",{className:si.header_item,children:w.jsxDEV(Lr,{title:"View",children:w.jsxDEV(ui,{value:o,format:{type:"select",list:["render","debug"]},onChange:p=>{s&&s(p)}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:40,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:39,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:38,columnNumber:5},void 0),w.jsxDEV("div",{className:si.header_item,children:w.jsxDEV(Lr,{title:"Resolution",children:w.jsxDEV(ui,{value:d,format:{type:"select",list:new Array(6).fill(0).map((p,_)=>{const S=Math.pow(2,_),T=1/S,C=T==1?"1":"1/"+S;return{value:T,label:C}})},onChange:p=>{c&&c(p)}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:56,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:55,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:54,columnNumber:5},void 0),w.jsxDEV("div",{className:si.header_item,children:w.jsxDEV(Lr,{title:"Wireframe",children:w.jsxDEV(ui,{value:v,onChange:p=>{h&&h(p)}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:81,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:80,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:79,columnNumber:5},void 0),w.jsxDEV("div",{className:si.externalBtn,children:w.jsxDEV(Ta,{onClick:()=>{m.openInExternalWindow()},children:w.jsxDEV("svg",{width:"32",height:"12",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[w.jsxDEV("g",{clipPath:"url(#clip0_224_2)",children:[w.jsxDEV("path",{d:"M96 0V416H512V0H96ZM472 376H136V40H472V376Z",fill:"#aaa"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:100,columnNumber:9},void 0),w.jsxDEV("path",{d:"M40 472V296V136V96H0V512H416V472H376H40Z",fill:"#aaa"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:101,columnNumber:9},void 0),w.jsxDEV("path",{d:"M232.812 312.829L350.671 194.969V279.766H390.671V126.688H237.594V166.688H322.39L204.531 284.547L232.812 312.829Z",fill:"#aaa"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:102,columnNumber:9},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:99,columnNumber:8},void 0),w.jsxDEV("defs",{children:w.jsxDEV("clipPath",{id:"clip0_224_2",children:w.jsxDEV("rect",{width:"512",height:"512",fill:"white"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:106,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:105,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:104,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:98,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:93,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:92,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:24,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:23,columnNumber:3},void 0),w.jsxDEV("div",{className:si.content,children:[w.jsxDEV("div",{className:si.canvas,children:w.jsxDEV(E5,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:118,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:117,columnNumber:4},void 0),w.jsxDEV("div",{className:si.audioView,children:w.jsxDEV(N5,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:121,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:120,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:116,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Screen/index.tsx",lineNumber:22,columnNumber:9},void 0)},L5="_container_usdqa_45",U5="_noErrors_usdqa_56",B5="_header_usdqa_62",V5="_errorCount_usdqa_71",I5="_headerButtons_usdqa_76",j5="_copyButton_usdqa_81",H5="_clearButton_usdqa_94",G5="_errorList_usdqa_107",W5="_errorItem_usdqa_112",Y5="_errorHeader_usdqa_119",q5="_errorType_usdqa_132",X5="_errorMessage_usdqa_139",$5="_expandIcon_usdqa_147",K5="_errorDetails_usdqa_153",Q5="_errorDetailsHeader_usdqa_159",Z5="_errorFilePath_usdqa_166",J5="_errorMetaRow_usdqa_173",eM="_errorLine_usdqa_179",tM="_copyErrorButton_usdqa_185",nM="_copySourceButton_usdqa_198",rM="_sourceContext_usdqa_211",Bt={container:L5,noErrors:U5,header:B5,errorCount:V5,headerButtons:I5,copyButton:j5,clearButton:H5,errorList:G5,errorItem:W5,errorHeader:Y5,errorType:q5,errorMessage:X5,expandIcon:$5,errorDetails:K5,errorDetailsHeader:Q5,errorFilePath:Z5,errorMetaRow:J5,errorLine:eM,copyErrorButton:tM,copySourceButton:nM,sourceContext:rM},cb=()=>{const[m,l]=U.useState([]),[i,o]=U.useState(new Set);U.useEffect(()=>{var _,S;const p=T=>{l(T)};return(_=ct.shaderErrorManager)==null||_.addListener(p),l(((S=ct.shaderErrorManager)==null?void 0:S.getErrors())??[]),()=>{var T;(T=ct.shaderErrorManager)==null||T.removeListener(p)}},[]);const s=p=>{o(_=>{const S=new Set(_);return S.has(p)?S.delete(p):S.add(p),S})},d=()=>{var p;(p=ct.shaderErrorManager)==null||p.clearErrors()},c=async p=>{try{return await navigator.clipboard.writeText(p),!0}catch{const S=document.createElement("textarea");S.value=p,S.style.position="fixed",S.style.opacity="0",document.body.appendChild(S),S.select();try{const T=document.execCommand("copy");return document.body.removeChild(S),T}catch{return document.body.removeChild(S),!1}}},v=async p=>{let S=`[${p.type==="vertex"?"頂点シェーダー":"フラグメントシェーダー"}] ${p.message}
`;p.filePath&&(S+=`ファイル: ${p.filePath}
`),p.line&&(S+=`行: ${p.line}
`),p.sourceContext&&(S+=`
ソースコンテキスト:
${p.sourceContext}`),await c(S)?console.log("エラー情報をクリップボードにコピーしました"):console.error("クリップボードへのコピーに失敗しました")},h=async()=>{const p=m.map(S=>{let C=`[${S.type==="vertex"?"頂点シェーダー":"フラグメントシェーダー"}] ${S.message}
`;return S.filePath&&(C+=`ファイル: ${S.filePath}
`),S.line&&(C+=`行: ${S.line}
`),S.sourceContext&&(C+=`
ソースコンテキスト:
${S.sourceContext}`),C}).join(`

---

`);await c(p)?console.log(`${m.length}件のエラー情報をクリップボードにコピーしました`):console.error("クリップボードへのコピーに失敗しました")};return m.length===0?w.jsxDEV("div",{className:Bt.container,children:w.jsxDEV("div",{className:Bt.noErrors,children:"シェーダーエラーはありません"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:185,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:184,columnNumber:10},void 0):w.jsxDEV("div",{className:Bt.container,children:[w.jsxDEV("div",{className:Bt.header,children:[w.jsxDEV("span",{className:Bt.errorCount,children:[m.length," 件のエラー"]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:192,columnNumber:4},void 0),w.jsxDEV("div",{className:Bt.headerButtons,children:[w.jsxDEV("button",{className:Bt.copyButton,onClick:h,children:"全てコピー"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:194,columnNumber:5},void 0),w.jsxDEV("button",{className:Bt.clearButton,onClick:d,children:"クリア"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:197,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:193,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:191,columnNumber:3},void 0),w.jsxDEV("div",{className:Bt.errorList,children:m.map(p=>w.jsxDEV("div",{className:Bt.errorItem,children:[w.jsxDEV("div",{className:Bt.errorHeader,onClick:()=>s(p.id),children:[w.jsxDEV("span",{className:Bt.errorType,children:["[",p.type==="vertex"?"頂点":"フラグメント","]"]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:207,columnNumber:7},void 0),w.jsxDEV("span",{className:Bt.errorMessage,children:p.message},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:210,columnNumber:7},void 0),w.jsxDEV("span",{className:Bt.expandIcon,children:i.has(p.id)?"▼":"▶"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:211,columnNumber:7},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:203,columnNumber:6},void 0),i.has(p.id)&&w.jsxDEV("div",{className:Bt.errorDetails,children:[w.jsxDEV("div",{className:Bt.errorDetailsHeader,children:[p.filePath&&w.jsxDEV("div",{className:Bt.errorFilePath,children:["📄 ",p.filePath]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:219,columnNumber:10},void 0),w.jsxDEV("div",{className:Bt.errorMetaRow,children:[p.line&&w.jsxDEV("div",{className:Bt.errorLine,children:["行 ",p.line]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:225,columnNumber:11},void 0),w.jsxDEV("button",{className:Bt.copyErrorButton,onClick:_=>{_.stopPropagation(),v(p)},children:"コピー"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:227,columnNumber:10},void 0),p.fullSource&&w.jsxDEV("button",{className:Bt.copySourceButton,onClick:async _=>{_.stopPropagation(),await c(p.fullSource)?console.log("ソースコードをクリップボードにコピーしました"):console.error("クリップボードへのコピーに失敗しました")},children:"ソース全体をコピー"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:239,columnNumber:11},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:223,columnNumber:9},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:217,columnNumber:8},void 0),p.sourceContext&&w.jsxDEV("pre",{className:Bt.sourceContext,children:p.sourceContext},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:264,columnNumber:9},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:216,columnNumber:7},void 0)]},p.id,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:202,columnNumber:5},void 0))},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:200,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/ShaderErrors/index.tsx",lineNumber:190,columnNumber:9},void 0)},Ib=U.createContext(null),iM=()=>{const{editor:m}=no(),[l,i]=U.useState({current:0,playing:!1}),[o]=Vt(m==null?void 0:m.engine,"timeline/duration"),[s,d]=U.useState([0,0,100,0]),c=U.useRef([0,0,0,0]);c.current=s;const v=s[2]-s[0];let h=10*Math.pow(2,0+Math.floor(Math.log2(v/100)));h=Math.max(1,Math.floor(h));const p=m==null?void 0:m.audioBuffer,[_,S]=U.useState();U.useEffect(()=>{o!==void 0&&d([0,0,o,0])},[o]),U.useEffect(()=>{if(m){const $=m.engine,j=I=>{i({...I})};j($.frame);let K=0;const Z=()=>{S(K++)};return $.on("update/frame/play",j),$.on("update/audioBuffer",Z),()=>{$.off("update/frame/play",j),$.off("update/audioBuffer",Z)}}},[m]);const T=U.useCallback($=>{m&&m.engine.seek($)},[m]),C=U.useCallback($=>{const j=s[2]-s[0];return Math.floor(s[0]+j*$)},[s]),D=U.useCallback($=>{const j=c.current,K=(j[2]+j[0])/2,Z=(j[0]-K)*$+K,I=(j[2]-K)*$+K;d([Z,j[1],I,j[3]])},[]),F=U.useCallback($=>{const j=c.current,K=$*(j[2]-j[0]);d([j[0]+K,j[1],j[2]+K,j[3]])},[]),q=U.useCallback($=>{const j=c.current,K=j[2]-j[0];d([$-K/2,j[1],$+K/2,j[3]])},[]);return{glEditor:m,framePlay:l,viewPort:s,viewPortScale:h,musicBuffer:p,musicBufferVersion:_,setCurrentFrame:T,getFrameViewPort:C,zoom:D,scroll:F,setViewPortCenter:q}},oM="_timeline_4ojix_45",aM="_inner_4ojix_50",sM="_content_4ojix_62",lM="_setting_4ojix_70",of={timeline:oM,inner:aM,content:sM,setting:lM},Os=()=>{const m=U.useContext(Ib);if(m===null)throw new Error("useTimeline must be used within a TimelineProvider");return m},uM="_timelineCanvas_12pgc_45",cM={timelineCanvas:uM},dM=`// @shader-file: packages/orengine/components/panels/Timeline/TimelineCanvas/TimelineCanvasRenderer/shaders/timeline.fs
#include <common>

uniform sampler2D uCanvasTex;
uniform sampler2D uMusicTex;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 canvas = texture( uCanvasTex, vUv );

	vec3 col = canvas.xyz;

	float audio = texture( uMusicTex, vUv ).x;
	float audioWave = step( vUv.y, audio );
	col += audioWave * 0.2;

	outColor = vec4( col, 1.0 );

}`;class fM extends Tn{constructor(){super();y(this,"wrapperElm");y(this,"glCanvas");y(this,"gl");y(this,"canvasTexture");y(this,"canvas");y(this,"canvasCtx");y(this,"glRenderer");y(this,"postProcess");y(this,"viewPort");y(this,"viewPortRange");y(this,"viewPortScale");y(this,"frameSetting");y(this,"loopSetting");y(this,"musicBuffer");y(this,"musicTexture");y(this,"resizeObserver");y(this,"canvasSize");this.wrapperElm=null,this.canvas=document.createElement("canvas"),this.canvasCtx=this.canvas.getContext("2d"),this.glCanvas=document.createElement("canvas");const i=new Mb(this.glCanvas.getContext("webgl2"));this.gl=i.gl,this.canvasSize=new Q(this.glCanvas.width,this.glCanvas.height),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0],this.viewPortScale=50,this.frameSetting=null,this.loopSetting={enabled:!1,start:0,end:0},this.resizeObserver=new ResizeObserver(this.onResize.bind(this)),this.glRenderer=new Fb(this.gl),this.canvasTexture=new rt(this.gl),this.musicBuffer=null,this.musicTexture=new rt(this.gl),this.musicTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.postProcess=new Br({passes:[new yt(this.gl,{frag:dM,uniforms:{uCanvasTex:{type:"1i",value:null},uMusicTex:{type:"1i",value:this.musicTexture}},renderTarget:null})]})}onResize(){if(this.wrapperElm){const i=new Q(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);this.glCanvas.width=this.canvas.width=i.x,this.glCanvas.height=this.canvas.height=i.y,this.canvasSize.set(this.glCanvas.width,this.glCanvas.height),this.postProcess.resize(i)}this.render()}render(){if(this.canvasCtx.fillStyle="#000",this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.frameSetting){this.canvasCtx.fillStyle="#181818";const o=this.frameToPx(0),s=this.frameToPx(this.frameSetting.duration);this.canvasCtx.fillRect(o,0,s-o,this.canvas.height)}const i=(o,s,d)=>{let c=Math.ceil(this.viewPort[0]/o)*o;this.canvasCtx.beginPath();let v=0;for(;c<this.viewPort[2]&&v<100;){const h=this.frameToPx(c+s);this.canvasCtx.moveTo(h,0),this.canvasCtx.lineTo(h,this.canvas.height),c+=o,v++}this.canvasCtx.strokeStyle=d,this.canvasCtx.lineWidth=1,this.canvasCtx.stroke()};if(i(this.viewPortScale,0,"#555"),i(this.viewPortScale,this.viewPortScale/2,"#333"),this.musicBuffer&&this.frameSetting){this.canvasCtx.strokeStyle="#888",this.canvasCtx.fillStyle="#888";const o=this.musicBuffer.getChannelData(0),s=this.viewPortRange[0]/this.frameSetting.fps,d=this.musicBuffer.sampleRate*s,c=d/this.canvas.width,v=this.frameToPx(0);this.canvasCtx.beginPath();for(let h=0;h<d;h+=c){const p=Math.floor(h-v*c),_=o[Math.round(p)],S=h/d*this.canvas.width,T=(_+1)*(this.canvas.height/2);let C=T,D=T;for(let q=0;q<16;q++){const j=(o[Math.round(p+c*(q/16))]+1)*(this.canvas.height/2);C>j&&(C=j),D<j&&(D=j)}const F=D-C;F>3&&this.canvasCtx.fillRect(S,C,1,F),h==0?this.canvasCtx.moveTo(S,T):this.canvasCtx.lineTo(S,T)}this.canvasCtx.stroke()}if(this.loopSetting.enabled){this.canvasCtx.fillStyle="#0009";const o=this.frameToPx(this.loopSetting.start),s=this.frameToPx(this.loopSetting.end);this.canvasCtx.fillRect(0,0,o,this.canvas.height),this.canvasCtx.fillRect(s,0,this.canvas.width-s,this.canvas.height)}this.canvasTexture.attach(this.canvas),this.postProcess.passes&&(this.postProcess.passes[0].uniforms.uCanvasTex.value=this.canvasTexture),this.glRenderer.renderPostProcess(this.postProcess,void 0,this.canvasSize)}setWrapperElm(i){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=i,this.resizeObserver.observe(i),this.wrapperElm.appendChild(this.glCanvas),this.onResize()}setViewPort(i,o){this.viewPort=i,this.viewPortRange=[i[2]-i[0],i[3]-i[1]],this.viewPortScale=o,this.render()}setFrameSetting(i){this.frameSetting={duration:Math.round(i.duration),fps:Math.round(i.fps)},this.render()}setMusicBuffer(i){this.musicBuffer=i,setTimeout(()=>{this.render()},100)}setLoopSetting(i,o,s){this.loopSetting={enabled:i,start:o,end:s},this.render()}frameToPx(i){return(i-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.glCanvas),this.resizeObserver.disconnect()}}const mM=()=>{const{viewPort:m,viewPortScale:l,musicBuffer:i,musicBufferVersion:o,glEditor:s}=Os(),[d,c]=U.useState(),v=U.useRef(null);U.useEffect(()=>{const C=new fM;return c(C),v.current&&C.setWrapperElm(v.current),()=>{C.dispose()}},[]),U.useEffect(()=>{d&&m&&l&&d.setViewPort(m,l)},[d,m,l]);const[h]=Vt(s==null?void 0:s.engine,"timeline/duration"),[p]=Vt(s==null?void 0:s.engine,"timeline/fps");U.useEffect(()=>{d&&h&&p&&d.setFrameSetting({duration:h||0,fps:p||0})},[d,h,p]);const[_]=Vt(s,"frameLoop/enabled"),[S]=Vt(s,"frameLoop/start"),[T]=Vt(s,"frameLoop/end");return U.useEffect(()=>{d&&d.setLoopSetting(_||!1,S||0,T||0)},[d,_,S,T]),U.useEffect(()=>{d&&i&&d.setMusicBuffer(i)},[d,i,o]),w.jsxDEV("div",{className:cM.timelineCanvas,ref:v},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineCanvas/index.tsx",lineNumber:94,columnNumber:9},void 0)},hM="_controls_n8ed2_45",pM={controls:hM},vM=m=>{const{viewPort:l,setCurrentFrame:i,getFrameViewPort:o,zoom:s,scroll:d,setViewPortCenter:c}=Os(),v=U.useRef([0,0,0,0]),h=U.useRef([0,0]);l&&(v.current=l,h.current=[l[2]-l[0],l[3]-l[1]]);const p=U.useRef(null),_=U.useRef(null),S=U.useRef(null),T=U.useRef(null),C=U.useRef(null),D=U.useRef(!1),F=U.useCallback(z=>{const X=p.current&&p.current.clientWidth||1;if(S.current==0&&!D.current){if(i&&o&&_.current){const re=(z.clientX-_.current.left)/X;i(o(re))}}else if(S.current==1){const re=[z.clientX,z.clientY];if(T.current&&C.current){const se=-(re[0]-T.current[0])/X*h.current[0];c&&c(C.current+se)}}},[i,o,c]),q=U.useCallback(z=>{S.current=z.button,C.current=(v.current[2]+v.current[0])/2,T.current=[z.clientX,z.clientY],_.current=z.currentTarget.getBoundingClientRect();const X=(z.clientX-_.current.left)/z.currentTarget.clientWidth;S.current==0&&i&&o&&!D.current&&i(o(X)),window.addEventListener("pointermove",F);const re=()=>{T.current=null,S.current=null,C.current=null,window.removeEventListener("pointermove",F)};return window.addEventListener("pointerup",re),()=>{window.removeEventListener("pointerup",re),window.removeEventListener("pointermove",F)}},[o,i,F]),$=U.useCallback(z=>{if(S.current!==null||!s||!d)return;z.preventDefault();const X=z.target&&z.target.clientWidth||1,re=Math.abs(z.deltaY);Math.abs(z.deltaX)<re?re>50?s(z.deltaY<0?.9:1.1):s(1+z.deltaY*.005):d(z.deltaX/X*.5)},[s,d]),j=U.useRef(null),K=U.useRef(null),Z=U.useCallback(z=>{if(z.touches.length===2){D.current=!0;const X=z.touches[0],re=z.touches[1],se=re.clientX-X.clientX,le=re.clientY-X.clientY;j.current=Math.sqrt(se*se+le*le),K.current=(X.clientX+re.clientX)/2}},[]),I=U.useCallback(z=>{var X;if(z.touches.length===2&&j.current!==null&&K.current!==null){z.preventDefault();const re=z.touches[0],se=z.touches[1],le=se.clientX-re.clientX,ze=se.clientY-re.clientY,_e=Math.sqrt(le*le+ze*ze),ye=(re.clientX+se.clientX)/2,et=Math.abs(_e-j.current),gt=Math.abs(ye-K.current);if(et>gt){if(s){const Ne=_e/j.current;s(2-Ne)}}else if(d){const Ne=((X=p.current)==null?void 0:X.clientWidth)||1,Tt=-(ye-K.current)/Ne*.5;d(Tt)}j.current=_e,K.current=ye}},[s,d]),ne=U.useCallback(()=>{D.current=!1,j.current=null,K.current=null},[]);return U.useEffect(()=>{const z=p.current;return z&&(z.addEventListener("wheel",$,{passive:!1}),z.addEventListener("touchstart",Z,{passive:!1}),z.addEventListener("touchmove",I,{passive:!1}),z.addEventListener("touchend",ne)),()=>{z&&(z.removeEventListener("wheel",$),z.removeEventListener("touchstart",Z),z.removeEventListener("touchmove",I),z.removeEventListener("touchend",ne))}},[$,Z,I,ne]),l?w.jsxDEV("div",{className:pM.controls,onPointerDown:q,ref:p,children:m.children},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineControls/index.tsx",lineNumber:251,columnNumber:9},void 0):null},gM="_cursor_2b6c4_45",yM="_frame_2b6c4_57",db={cursor:gM,frame:yM},xM=()=>{const{viewPort:m,framePlay:l}=Os();if(!m||!l)return null;const i=m[2]-m[0],o=(l.current-m[0])/i;return w.jsxDEV("div",{className:db.cursor,style:{left:o*100+"%"},children:w.jsxDEV("div",{className:db.frame},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineCursor/index.tsx",lineNumber:15,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineCursor/index.tsx",lineNumber:14,columnNumber:9},void 0)},bM="_timelineLoop_ly75p_45",_M="_start_ly75p_54",wM="_end_ly75p_55",af={timelineLoop:bM,start:_M,end:wM},SM="_cursor_1r72h_45",EM={cursor:SM},fb=({onMove:m})=>{const l=U.useRef(!1);return w.jsxDEV("div",{className:EM.cursor,onPointerDown:i=>{i.buttons==1&&(l.current=!0,i.stopPropagation())},onPointerMove:i=>{const o=i.target;l.current===!1||i.buttons!=1||(o.setPointerCapture(i.pointerId),i.buttons==1&&m&&m(i.clientX),i.nativeEvent.preventDefault(),i.nativeEvent.stopPropagation())},onPointerUp:()=>{l.current=!1}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineLoop/TimelineLoopCursor/index.tsx",lineNumber:9,columnNumber:9},void 0)},CM=()=>{const{viewPort:m,framePlay:l,glEditor:i}=Os(),o=U.useRef(null);Hv(i,["frameLoop/enabled","frameLoop/start","frameLoop/end"]);const[s]=Vt(i,"frameLoop/enabled"),[d,c]=Vt(i,"frameLoop/start"),[v,h]=Vt(i,"frameLoop/end");if(s!==!0||!m||!l||d===void 0||v===void 0)return null;const p=m[2]-m[0],_=(d-m[0])/p,S=(v-m[0])/p,T=(C,D)=>{const F=C.getBoundingClientRect();return(D-F.x)/F.width*(m[2]-m[0])+m[0]};return w.jsxDEV("div",{className:af.timelineLoop,ref:o,children:w.jsxDEV("div",{className:af.timelineLoop_inner,children:[w.jsxDEV("div",{className:af.start,style:{left:_*100+"%"},children:w.jsxDEV(fb,{onMove:C=>{o.current&&c&&c(T(o.current,C))}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineLoop/index.tsx",lineNumber:45,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineLoop/index.tsx",lineNumber:44,columnNumber:4},void 0),w.jsxDEV("div",{className:af.end,style:{left:S*100+"%"},children:w.jsxDEV(fb,{onMove:C=>{o.current&&h&&h(T(o.current,C))}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineLoop/index.tsx",lineNumber:60,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineLoop/index.tsx",lineNumber:59,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineLoop/index.tsx",lineNumber:43,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineLoop/index.tsx",lineNumber:42,columnNumber:9},void 0)},TM="_scale_dsq5l_45",kM="_scale_inner_dsq5l_53",NM="_scale_item_dsq5l_58",RM="_scale_item_frame_dsq5l_66",DM="_scale_item_time_dsq5l_71",Au={scale:TM,scale_inner:kM,scale_item:NM,scale_item_frame:RM,scale_item_time:DM},MM=m=>{const l=("00"+Math.floor(m%3600/60)).slice(-2),i=("00"+Math.floor(m%60)).slice(-2);return`${l}:${i}`},PM=()=>{const{glEditor:m,viewPort:l,viewPortScale:i}=Os(),[o,s]=Vt(m==null?void 0:m.engine,"timeline/fps");if(!l||!i||o===void 0)return null;const d=[];let c=Math.ceil(l[0]/i)*i,v=0;for(;c<l[2]&&v<100;){const h=(c-l[0])/(l[2]-l[0]),p=c/(o||0);d.push(w.jsxDEV("div",{className:Au.scale_item,style:{left:h*100+"%"},children:[w.jsxDEV("div",{className:Au.scale_item_frame,children:c},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineScale/index.tsx",lineNumber:37,columnNumber:5},void 0),w.jsxDEV("div",{className:Au.scale_item_time,children:MM(p)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineScale/index.tsx",lineNumber:40,columnNumber:5},void 0)]},c,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineScale/index.tsx",lineNumber:36,columnNumber:4},void 0)),c+=i,v++}return w.jsxDEV("div",{className:Au.scale,children:w.jsxDEV("div",{className:Au.scale_inner,children:d},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineScale/index.tsx",lineNumber:52,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineScale/index.tsx",lineNumber:51,columnNumber:9},void 0)},zM=()=>w.jsxDEV("svg",{width:"16",height:"16",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[w.jsxDEV("rect",{x:"5",y:"3",width:"3",height:"14",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/PauseIcon/index.tsx",lineNumber:5,columnNumber:3},void 0),w.jsxDEV("rect",{x:"12",y:"3",width:"3",height:"14",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/PauseIcon/index.tsx",lineNumber:6,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/PauseIcon/index.tsx",lineNumber:4,columnNumber:9},void 0),AM=()=>w.jsxDEV("svg",{width:"16",height:"16",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:w.jsxDEV("path",{d:"M5 3L5 17L16 10L5 3Z",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/PlayIcon/index.tsx",lineNumber:5,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/primitives/Icons/PlayIcon/index.tsx",lineNumber:4,columnNumber:9},void 0),OM="_timelineSetting_1yk20_45",FM="_playControls_1yk20_58",mb={timelineSetting:OM,playControls:FM},LM=()=>{const{framePlay:m,glEditor:l}=Os(),i=U.useCallback((_,S)=>{S&&S(_)},[]),[o,s]=Vt(l,"frameLoop/enabled"),[d,c]=Vt(l==null?void 0:l.engine,"timeline/duration"),[v,h]=Vt(l==null?void 0:l.engine,"timeline/fps"),p=U.useCallback(()=>{l!=null&&l.engine&&(m.playing?l.engine.stop():l.engine.play())},[l,m.playing]);return w.jsxDEV("div",{className:mb.timelineSetting,children:w.jsxDEV(Wn,{children:[w.jsxDEV("div",{className:mb.playControls,children:w.jsxDEV(Ta,{onClick:p,children:m.playing?w.jsxDEV(zM,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineSetting/index.tsx",lineNumber:60,columnNumber:27},void 0):w.jsxDEV(AM,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineSetting/index.tsx",lineNumber:60,columnNumber:43},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineSetting/index.tsx",lineNumber:59,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineSetting/index.tsx",lineNumber:58,columnNumber:4},void 0),w.jsxDEV(Lr,{title:"current",children:w.jsxDEV(ui,{value:Math.floor((m==null?void 0:m.current)||0),readOnly:!0},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineSetting/index.tsx",lineNumber:64,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineSetting/index.tsx",lineNumber:63,columnNumber:4},void 0),w.jsxDEV(Lr,{title:"duration",children:w.jsxDEV(ui,{value:d,onChange:_=>i(_,c)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineSetting/index.tsx",lineNumber:67,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineSetting/index.tsx",lineNumber:66,columnNumber:4},void 0),w.jsxDEV(Lr,{title:"fps",children:w.jsxDEV(ui,{value:v,onChange:_=>i(_,h)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineSetting/index.tsx",lineNumber:70,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineSetting/index.tsx",lineNumber:69,columnNumber:4},void 0),w.jsxDEV(Lr,{title:"loop",children:w.jsxDEV(ui,{value:o||!1,onChange:_=>i(_,s)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineSetting/index.tsx",lineNumber:73,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineSetting/index.tsx",lineNumber:72,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineSetting/index.tsx",lineNumber:57,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/TimelineSetting/index.tsx",lineNumber:56,columnNumber:9},void 0)},hb=()=>{const m=iM();return w.jsxDEV(Ib.Provider,{value:m,children:w.jsxDEV("div",{className:of.timeline,children:w.jsxDEV("div",{className:of.inner,children:[w.jsxDEV("div",{className:of.setting,children:w.jsxDEV(LM,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/index.tsx",lineNumber:20,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/index.tsx",lineNumber:19,columnNumber:5},void 0),w.jsxDEV("div",{className:of.content,children:[w.jsxDEV(mM,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/index.tsx",lineNumber:23,columnNumber:6},void 0),w.jsxDEV(xM,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/index.tsx",lineNumber:24,columnNumber:6},void 0),w.jsxDEV(vM,{children:w.jsxDEV(CM,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/index.tsx",lineNumber:26,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/index.tsx",lineNumber:25,columnNumber:6},void 0),w.jsxDEV(PM,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/index.tsx",lineNumber:28,columnNumber:6},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/index.tsx",lineNumber:22,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/index.tsx",lineNumber:18,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/index.tsx",lineNumber:17,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/components/panels/Timeline/index.tsx",lineNumber:16,columnNumber:9},void 0)},sf=768,UM=()=>{const[m,l]=U.useState(()=>typeof window<"u"?window.innerWidth<=sf:!1);return U.useEffect(()=>{let i=null;const o=()=>{const s=window.innerWidth;(i===null||(s-sf)*(i-sf)<=0)&&l(s<=sf),i=s};return o(),window.addEventListener("resize",o),()=>{window.removeEventListener("resize",o)}},[]),{isPC:!m,isSP:m}},BM=`// @shader-file: packages/orengine/features/OREngine/core/FrameDebugger/shaders/frameDebugger.fs
#include <common>\r
\r
uniform sampler2D uBackBuffer0;\r
uniform sampler2D uCanvas;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
in vec2 vUv;\r
\r
void main( void ) {\r
\r
	vec4 bb = texture( uBackBuffer0, vUv );\r
	vec4 canvas = texture(uCanvas, vUv );\r
\r
	// outColor = mix( bb, canvas, canvas.w );\r
	vec3 invert = canvas.xyz * canvas.w;\r
	\r
	outColor.xyz = mix( bb.xyz, 1.0 - bb.xyz, invert ); \r
	outColor.w = 1.0;\r
\r
}`;class VM extends Tn{constructor(i){super();y(this,"_engine");y(this,"_gl");y(this,"_srcFrameBuffer");y(this,"_outFrameBuffer");y(this,"_frameList");y(this,"_enable");y(this,"_resolution");y(this,"_count");y(this,"_total");y(this,"_tile");y(this,"_tilePixelSize");y(this,"_tileInv");y(this,"_focus");y(this,"_uniforms");y(this,"_outPostProcess");y(this,"_elm");y(this,"_labelCanvas");y(this,"_cctx");y(this,"_canvasTexture");this._engine=i,this._gl=i.gl,this._elm=i.canvas,this._srcFrameBuffer=new Et(this._gl,{disableDepthBuffer:!0}),this._outFrameBuffer=new Et(this._gl,{disableDepthBuffer:!0}).setTexture([new rt(this._gl).setting()]),this._enable=!1,this._count=0,this._total=1,this._tile=new Q(1,1),this._tilePixelSize=new Q(1,1),this._tileInv=new Q(1,1),this._focus=null,this._resolution=new Q,this._labelCanvas=document.createElement("canvas"),this._cctx=this._labelCanvas.getContext("2d"),this._canvasTexture=new rt(this._gl).attach(this._labelCanvas),this._uniforms={uCanvas:{value:this._canvasTexture,type:"1i"}},this._outPostProcess=new Br({passes:[new yt(this._gl,{uniforms:this._uniforms,renderTarget:null,frag:BM,backBufferOverride:this._outFrameBuffer.textures})]}),this._frameList=[];const o=new Q(0,0),s=this._onClick.bind(this),d=h=>{o.set(h.clientX,h.clientY)},c=h=>{const p=new Q(h.clientX,h.clientY);o.clone().sub(p).length()<10&&s(h)};this._elm.addEventListener("pointerdown",d),this._elm.addEventListener("pointerup",c);const v=h=>{h.key==="Escape"&&(this._focus=null,this._clear()),h.key=="ArrowRight"&&this._focus!==null&&this._focus++,h.key=="ArrowLeft"&&this._focus!==null&&this._focus--};window.addEventListener("keydown",v),this.once("dispose",()=>{this._elm.removeEventListener("pointerdown",d),this._elm.removeEventListener("pointerup",c),window.removeEventListener("keydown",v)})}_calcTilePos(i){const o=i%this._tile.x*this._tileInv.x*this._resolution.x,s=Math.floor(i/this._tile.x)*this._tileInv.y*this._resolution.y;return{x:o,y:s}}push(i,o){for(let s=0;s<i.textures.length;s++){if(this._focus==null||this._focus==this._count){const d=i.textures[s],c="currentFace"in i?i.currentFace:this._gl.TEXTURE_2D;this._srcFrameBuffer.setSize(d.size),this._gl.bindFramebuffer(this._gl.FRAMEBUFFER,this._srcFrameBuffer.getFrameBuffer()),this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER,this._gl.COLOR_ATTACHMENT0,c,d.getTexture(),0),this._gl.bindFramebuffer(this._gl.FRAMEBUFFER,null),this._gl.bindFramebuffer(this._gl.READ_FRAMEBUFFER,this._srcFrameBuffer.getFrameBuffer()),this._gl.bindFramebuffer(this._gl.DRAW_FRAMEBUFFER,this._outFrameBuffer.getFrameBuffer());let{x:v,y:h}=this._calcTilePos(this._count);const p=this._tilePixelSize.x,_=this._tilePixelSize.y;this._focus!==null&&(v=0,h=0),this._gl.blitFramebuffer(0,0,i.size.x,i.size.y,v,this._resolution.y-h-_,v+p,this._resolution.y-h,this._gl.COLOR_BUFFER_BIT,this._gl.NEAREST),this._srcFrameBuffer.setTexture([]),this._frameList.push({frameBuffer:i,texture:d,label:o?o+(i.textures.length>1?"_"+s:""):""})}this._count++}this._gl.bindFramebuffer(this._gl.READ_FRAMEBUFFER,null),this._gl.bindFramebuffer(this._gl.DRAW_FRAMEBUFFER,null)}draw(){this._cctx.clearRect(0,0,this._resolution.x,this._resolution.y);const i=this._resolution.y/1080;this._cctx.font=`500 ${28*i}px 'Courier New'`,this._cctx.fillStyle="#fff";for(let o=0;o<this._frameList.length;o++){const{x:s,y:d}=this._calcTilePos(o),c=this._frameList[o];this._cctx.fillText(c.label,s+5*i,d+this._tilePixelSize.y-5*i)}this._canvasTexture.attach(this._labelCanvas),this._engine.renderer.renderPostProcess(this._outPostProcess,void 0,this._resolution),this._clear()}_clear(){this._total=this._count;const i=Math.sqrt(this._focus!==null?1:this._total);this._tile.set(Math.round(i),Math.ceil(i)),this._tileInv.set(1,1).divide(this._tile),this._tilePixelSize.copy(this._tileInv).multiply(this._resolution),this._frameList=[],this._count=0}reflesh(){this.resize(this._resolution)}resize(i){this._resolution.copy(i),this._outFrameBuffer.setSize(i),this._outPostProcess.resize(i),this._labelCanvas.width=i.x,this._labelCanvas.height=i.y,this._canvasTexture.attach(this._labelCanvas)}_onClick(i){if(this._enable&&(this.reflesh(),this._focus===null)){const o=this._elm.getBoundingClientRect(),s=this._elm.width/this._elm.height,d=o.width/o.height;let c=o.width,v=o.height,h=0,p=0;s>d?(v=o.width/s,p=(o.height-v)/2):(c=o.height*s,h=(o.width-c)/2);const _=i.offsetX-h,S=i.offsetY-p;if(_<0||_>c||S<0||S>v)return;const T=new Q(c/this._tile.x,v/this._tile.y),C=Math.floor(_/T.x),D=Math.floor(S/T.y);this._focus=C+D*this._tile.x}}set enable(i){this._enable=i,i&&this.reflesh()}get enable(){return this._enable}dispose(){this.emit("dispose")}}class jb extends Tn{constructor(){super();y(this,"_pressedKeys");this._pressedKeys={};const i=this._onKeyDown.bind(this),o=this._onKeyUp.bind(this);window.addEventListener("keydown",i),window.addEventListener("keyup",o);const s=()=>{window.removeEventListener("keydown",i),window.removeEventListener("keyup",o)};this.once("dispose",s)}get pressedKeys(){return this._pressedKeys}_onKeyDown(i){this._pressedKeys[i.key]=!0,this.emit("keydown",[i,this._pressedKeys])}_onKeyUp(i){if(this._pressedKeys[i.key]=!1,i.key=="Meta"||i.key=="Control"){const o=Object.keys(this._pressedKeys);for(let s=0;s<o.length;s++)this._pressedKeys[o[s]]=!1}this.emit("keyup",[i,this._pressedKeys])}dispose(){this.emit("dispose")}}class IM{constructor(l,i){y(this,"_engine");y(this,"_editor");y(this,"_raycaster");y(this,"_lastClickNDC",null);y(this,"_lastHits",[]);y(this,"_currentHitIndex",0);y(this,"_clickThreshold",.01);this._engine=l,this._editor=i,this._raycaster=new XR}handleClick(l,i,o){const s=o.getBoundingClientRect(),d=l-s.left,c=i-s.top,v=d/s.width*2-1,h=-(c/s.height)*2+1,p=this._findMainCamera();if(!p)return;const _=this._isSameClickLocation(v,h),S=this._raycaster.raycastAll(v,h,p,this._engine.root);let T=null;S.length>0?(_&&this._lastHits.length>0?(this._currentHitIndex=(this._currentHitIndex+1)%S.length,T=S[this._currentHitIndex].entity):(this._currentHitIndex=0,T=S[0].entity),this._lastClickNDC={x:v,y:h},this._lastHits=S,this._editor.selectEntity(T)):(this._editor.selectEntity(null),this._lastClickNDC=null,this._lastHits=[],this._currentHitIndex=0)}_isSameClickLocation(l,i){if(!this._lastClickNDC)return!1;const o=l-this._lastClickNDC.x,s=i-this._lastClickNDC.y;return Math.sqrt(o*o+s*s)<this._clickThreshold}_findMainCamera(){const l=[];this._traverseForCamera(this._engine.root,l);for(let i=0;i<l.length;i++){const o=l[i];if(o.displayOut)return o}return l.length>0?l[0]:null}_traverseForCamera(l,i){let o=l.getComponent(_f);o||(o=l.getComponent(Lu)),o&&i.push(o);const s=l.children;for(let d=0;d<s.length;d++)this._traverseForCamera(s[d],i)}dispose(){}}const jM=new Q(1920,840),Ds=document.createElement("canvas"),We=Ds.getContext("webgl2",{antialias:!1}),HM=new Mb(We),ie={time:{uTime:{value:0,type:"1f"},uTimeF:{value:0,type:"1f"},uTimeE:{value:0,type:"1f"},uTimeEF:{value:0,type:"1f"}},resolution:{uAspectRatio:{value:1,type:"1f"},uResolution:{value:new Q,type:"2f"}},camera:{projectionMatrix:{value:new nt,type:"Matrix4fv"},viewMatrix:{value:new nt,type:"Matrix4fv"}},gBuffer:{uGBufferPos:{value:null,type:"1i"},uGBufferNormal:{value:null,type:"1i"}},tex:{},music:{uMusicFreqTex:{value:null,type:"1i"},uMusicDomainTex:{value:null,type:"1i"}}};class pb extends As{constructor(i){super();y(this,"_engine");y(this,"_keyBoard");y(this,"_selectedEntityId");y(this,"_frameLoop");y(this,"_resolutionScale");y(this,"_viewType");y(this,"_frameDebugger");y(this,"_externalWindow");y(this,"_externalCanvasBitmapContext");y(this,"_scenePointer");y(this,"_disposed");this._engine=i,this._viewType="render",this._selectedEntityId=null,this._resolutionScale=1,this._externalWindow=null,this._externalCanvasBitmapContext=null,this._disposed=!1,i.renderer instanceof Fu&&(i.renderer.showWireframe=!0),this._keyBoard=new jb,this._keyBoard.on("keydown",(s,d)=>{(d.Meta||d.Control)&&d.s&&(s.preventDefault(),this.save()),s.key==" "&&(this._engine.frame.playing?this._engine.stop():this._engine.play())}),this._frameDebugger=new VM(i),this.engine.renderer.on("drawPass",(s,d)=>{this._frameDebugger&&this._frameDebugger.enable&&s&&this._frameDebugger.push(s,d)}),this._scenePointer=new IM(i,this),i.on("update/blidge/selection",s=>{this.selectEntity(s)}),this._frameLoop={enabled:!1,start:0,end:0},this.field("enableRender",()=>this._engine.enableRender,s=>this._engine.enableRender=s),this.field("resolutionScale",()=>this._resolutionScale,s=>{this._resolutionScale=Number(s),this._resize()}),this.field("viewType",()=>this._viewType,s=>{this._viewType=s,this._viewType==="debug"?this._frameDebugger.enable=!0:this._frameDebugger.enable=!1});const o=this.fieldDir("frameLoop");o.field("enabled",()=>this._frameLoop.enabled,s=>this._frameLoop.enabled=s),o.field("start",()=>this._frameLoop.start,s=>this._frameLoop.start=s),o.field("end",()=>this._frameLoop.end,s=>this._frameLoop.end=s),this.field("timelineCurrent",()=>this.engine.frame.current,s=>{this.engine.seek(s)}),this.field("selectedEntityId",()=>this._selectedEntityId,s=>{this._selectedEntityId=s,this._engine.renderer instanceof Fu&&(this._engine.renderer.selectedEntityId=s)}),this.field("showWireframe",()=>i.renderer instanceof Fu?i.renderer.showWireframe:!1,s=>{i.renderer instanceof Fu&&(i.renderer.showWireframe=s)}),this._animate()}get engine(){return this._engine}get audioBuffer(){return this._engine.audioBuffer}get disposed(){return this._disposed}_animate(){if(!this._disposed){if(this._engine.update(),this._externalCanvasBitmapContext){const i=this._externalCanvasBitmapContext;createImageBitmap(this.engine.canvas).then(o=>{i.transferFromImageBitmap(o)})}this._engine.frame.playing&&((this._engine.frame.current<0||this._engine.frame.current>this._engine.frameSetting.duration)&&this._engine.seek(0),this._frameLoop.enabled&&(this._engine.frame.current<this._frameLoop.start||this._engine.frame.current>this._frameLoop.end)&&this._engine.seek(this._frameLoop.start)),this._frameDebugger&&this._frameDebugger.enable&&this._frameDebugger.draw(),window.requestAnimationFrame(this._animate.bind(this))}}selectEntity(i){this.setField("selectedEntityId",i?i.uuid:null)}createEntity(i,o){const s=new Ct;return s.name=o,s.initiator="user",i.add(s),s}deleteEntity(i){i.disposeRecursive();const o=i.parent;o&&o.remove(i)}save(){this.emit("save",[this.exportEngine(),this.exportEditor()])}exportEditor(){return this.serialize({mode:"export"})}exportEngine(){return this._engine.serialize({mode:"export"})}openInExternalWindow(){if(this._externalWindow=window.open("","_blank"),!this._externalWindow)return;const i=this._externalWindow.document.createElement("canvas");i.style.width="100%",i.style.height="100%",i.style.objectFit="contain",i.style.cursor="none",this._externalWindow.document.body.style.margin="0",this._externalWindow.document.body.style.background="#000",this._externalWindow.document.body.appendChild(i),this._externalCanvasBitmapContext=i.getContext("bitmaprenderer"),this._externalWindow.addEventListener("unload",()=>{this.closeExternalWindow()}),this._resize()}closeExternalWindow(){this._externalWindow&&(this._externalWindow.close(),this._externalWindow=null,this._externalCanvasBitmapContext=null)}_resize(){const i=jM.clone().multiply(this._resolutionScale);this.engine.setSize(i),this._frameDebugger.resize(i),this._externalCanvasBitmapContext&&(this._externalCanvasBitmapContext.canvas.width=i.x,this._externalCanvasBitmapContext.canvas.height=i.y)}dispose(){this._disposed=!0,this._keyBoard.dispose(),this._frameDebugger.dispose(),this._scenePointer&&this._scenePointer.dispose&&this._scenePointer.dispose()}}const GM=()=>{const{engine:m}=Bb(),[l,i]=U.useState(()=>new pb(m)),o=hf.useRef(l);return o.current=l,U.useEffect(()=>{if(!o.current.disposed&&o.current.engine.uuid==m.uuid)return;const s=new pb(m);i(s)},[m]),U.useEffect(()=>()=>{l.dispose()},[l]),{engine:m,editor:l}},WM="_editor_16tun_45",YM="_vert_16tun_51",qM="_horiz_16tun_58",XM="_flex_16tun_62",$M={editor:WM,vert:YM,horiz:qM,flex:XM},KM=m=>{const l=GM(),[i,o]=U.useState(!1);U.useEffect(()=>{if(!(!l.editor||!m.onSave))return l.editor.on("save",m.onSave),()=>{l.editor.off("save",m.onSave)}},[l.editor,m.onSave]),U.useEffect(()=>{!l.editor||!m.editorData||l.editor.deserialize(m.editorData)},[m.editorData,l.editor]),U.useEffect(()=>{var h,p;const v=_=>{o(_.length>0)};return(h=ct.shaderErrorManager)==null||h.addListener(v),o((((p=ct.shaderErrorManager)==null?void 0:p.getErrors().length)??0)>0),()=>{var _;(_=ct.shaderErrorManager)==null||_.removeListener(v)}},[]);const s=UM(),d=G2();let c=null;return s.isPC?c=w.jsxDEV(w.Fragment,{children:[w.jsxDEV(Lo,{direction:"vertical",sizes:[1,"150px"],minSizes:[300,80],storageKey:"orengine-pc-main",children:[w.jsxDEV(Lo,{direction:"horizontal",sizes:["300px",1,"300px"],minSizes:[200,400,200],storageKey:"orengine-pc-horizontal",children:[w.jsxDEV(Lo,{direction:"vertical",sizes:[1,"200px"],minSizes:[200,100],storageKey:"orengine-pc-left",children:[w.jsxDEV(Fr,{children:[w.jsxDEV(Wn,{title:"Scene",children:w.jsxDEV(sb,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:110,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:109,columnNumber:9},void 0),w.jsxDEV(Wn,{title:"Project",children:w.jsxDEV(lb,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:113,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:112,columnNumber:9},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:108,columnNumber:8},void 0),w.jsxDEV(Fr,{children:w.jsxDEV(Wn,{title:"Timer",noPadding:!0,children:w.jsxDEV(ob,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:118,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:117,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:116,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:102,columnNumber:7},void 0),w.jsxDEV(ub,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:124,columnNumber:7},void 0),i?w.jsxDEV(Lo,{direction:"vertical",sizes:[1,1],minSizes:[150,150],storageKey:"orengine-pc-right",children:[w.jsxDEV(Fr,{children:w.jsxDEV(Wn,{title:"Property",children:w.jsxDEV(rf,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:136,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:135,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:134,columnNumber:9},void 0),w.jsxDEV(Fr,{children:w.jsxDEV(Wn,{title:"Shader Errors",children:w.jsxDEV(cb,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:142,columnNumber:12},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:141,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:140,columnNumber:10},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:128,columnNumber:8},void 0):w.jsxDEV(Fr,{children:w.jsxDEV(Wn,{title:"Property",children:w.jsxDEV(rf,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:150,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:149,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:148,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:95,columnNumber:6},void 0),w.jsxDEV(Fr,{children:w.jsxDEV(Wn,{title:"Timeline",noPadding:!0,children:w.jsxDEV(hb,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:159,columnNumber:8},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:158,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:157,columnNumber:6},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:88,columnNumber:5},void 0),w.jsxDEV(Qx,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:163,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:87,columnNumber:4},void 0):c=w.jsxDEV(w.Fragment,{children:[w.jsxDEV(Lo,{direction:"vertical",sizes:[250,450,300],minSizes:[150,200,100],storageKey:"orengine-tablet-main",children:[w.jsxDEV(ub,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:178,columnNumber:6},void 0),w.jsxDEV(Lo,{direction:"horizontal",sizes:[450,1],minSizes:[200,300],storageKey:"orengine-tablet-middle",children:[w.jsxDEV(Lo,{direction:"vertical",sizes:[1,120],minSizes:[200,80],storageKey:"orengine-tablet-left",children:[w.jsxDEV(Fr,{children:[w.jsxDEV(Wn,{title:"Scene",children:w.jsxDEV(sb,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:196,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:195,columnNumber:9},void 0),w.jsxDEV(Wn,{title:"Project",children:w.jsxDEV(lb,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:199,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:198,columnNumber:9},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:194,columnNumber:8},void 0),w.jsxDEV(Fr,{children:w.jsxDEV(Wn,{title:"Timer",noPadding:!0,children:w.jsxDEV(ob,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:204,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:203,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:202,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:188,columnNumber:7},void 0),i?w.jsxDEV(Lo,{direction:"vertical",sizes:[1,1],minSizes:[150,150],storageKey:"orengine-tablet-right",children:[w.jsxDEV(Fr,{children:w.jsxDEV(Wn,{title:"Property",children:w.jsxDEV(rf,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:219,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:218,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:217,columnNumber:9},void 0),w.jsxDEV(Fr,{children:w.jsxDEV(Wn,{title:"Shader Errors",children:w.jsxDEV(cb,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:225,columnNumber:12},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:224,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:223,columnNumber:10},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:211,columnNumber:8},void 0):w.jsxDEV(Fr,{children:w.jsxDEV(Wn,{title:"Property",children:w.jsxDEV(rf,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:233,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:232,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:231,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:181,columnNumber:6},void 0),w.jsxDEV(Fr,{children:w.jsxDEV(Wn,{title:"Timeline",noPadding:!0,children:w.jsxDEV(F2,{fallback:w.jsxDEV("div",{children:"エラーだよ"},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:242,columnNumber:33},void 0),children:w.jsxDEV(hb,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:243,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:242,columnNumber:8},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:241,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:240,columnNumber:6},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:171,columnNumber:5},void 0),w.jsxDEV(Qx,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:248,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:170,columnNumber:4},void 0),w.jsxDEV(Db.Provider,{value:l,children:w.jsxDEV(Eb.Provider,{value:d,children:w.jsxDEV("div",{className:$M.editor,children:c},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:256,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:255,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREditor/index.tsx",lineNumber:254,columnNumber:9},void 0)},QM=m=>{const[l,i]=hf.useState(()=>new ct(m)),o=hf.useRef(l);o.current=l,U.useEffect(()=>{if(!o.current.disposed)return;const d=new ct(m);i(d)},[m]),U.useEffect(()=>()=>{l.dispose()},[l]);const s=U.useCallback(d=>{d&&l.load(d)},[l]);return{engine:l,load:s}},ZM=m=>{const l=QM(m.gl),{engine:i}=l;return U.useEffect(()=>{i.setSize(new Q(1920,1080))},[i]),U.useEffect(()=>{m.project?i.load(m.project):i.init()},[i,m.project]),w.jsxDEV(Ub.Provider,{value:l,children:m.children},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/packages/orengine/features/OREngine/index.tsx",lineNumber:34,columnNumber:9},void 0)};var Bv={},Hb={exports:{}},br={},Gb={exports:{}},Wb={};(function(m){/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var l=!1,i=!1,o=5;function s(ue,we){var Ge=ue.length;ue.push(we),v(ue,we,Ge)}function d(ue){return ue.length===0?null:ue[0]}function c(ue){if(ue.length===0)return null;var we=ue[0],Ge=ue.pop();return Ge!==we&&(ue[0]=Ge,h(ue,Ge,0)),we}function v(ue,we,Ge){for(var dt=Ge;dt>0;){var ft=dt-1>>>1,Qt=ue[ft];if(p(Qt,we)>0)ue[ft]=we,ue[dt]=Qt,dt=ft;else return}}function h(ue,we,Ge){for(var dt=Ge,ft=ue.length,Qt=ft>>>1;dt<Qt;){var jt=(dt+1)*2-1,Kn=ue[jt],xt=jt+1,cr=ue[xt];if(p(Kn,we)<0)xt<ft&&p(cr,Kn)<0?(ue[dt]=cr,ue[xt]=we,dt=xt):(ue[dt]=Kn,ue[jt]=we,dt=jt);else if(xt<ft&&p(cr,we)<0)ue[dt]=cr,ue[xt]=we,dt=xt;else return}}function p(ue,we){var Ge=ue.sortIndex-we.sortIndex;return Ge!==0?Ge:ue.id-we.id}var _=1,S=2,T=3,C=4,D=5;function F(ue,we){}var q=typeof performance=="object"&&typeof performance.now=="function";if(q){var $=performance;m.unstable_now=function(){return $.now()}}else{var j=Date,K=j.now();m.unstable_now=function(){return j.now()-K}}var Z=1073741823,I=-1,ne=250,z=5e3,X=1e4,re=Z,se=[],le=[],ze=1,_e=null,ye=T,et=!1,gt=!1,Ne=!1,Tt=typeof setTimeout=="function"?setTimeout:null,wr=typeof clearTimeout=="function"?clearTimeout:null,Yn=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function qn(ue){for(var we=d(le);we!==null;){if(we.callback===null)c(le);else if(we.startTime<=ue)c(le),we.sortIndex=we.expirationTime,s(se,we);else return;we=d(le)}}function Gt(ue){if(Ne=!1,qn(ue),!gt)if(d(se)!==null)gt=!0,ur(pn);else{var we=d(le);we!==null&&It(Gt,we.startTime-ue)}}function pn(ue,we){gt=!1,Ne&&(Ne=!1,kr()),et=!0;var Ge=ye;try{var dt;if(!i)return or(ue,we)}finally{_e=null,ye=Ge,et=!1}}function or(ue,we){var Ge=we;for(qn(Ge),_e=d(se);_e!==null&&!l&&!(_e.expirationTime>Ge&&(!ue||Er()));){var dt=_e.callback;if(typeof dt=="function"){_e.callback=null,ye=_e.priorityLevel;var ft=_e.expirationTime<=Ge,Qt=dt(ft);Ge=m.unstable_now(),typeof Qt=="function"?_e.callback=Qt:_e===d(se)&&c(se),qn(Ge)}else c(se);_e=d(se)}if(_e!==null)return!0;var jt=d(le);return jt!==null&&It(Gt,jt.startTime-Ge),!1}function ci(ue,we){switch(ue){case _:case S:case T:case C:case D:break;default:ue=T}var Ge=ye;ye=ue;try{return we()}finally{ye=Ge}}function Vr(ue){var we;switch(ye){case _:case S:case T:we=T;break;default:we=ye;break}var Ge=ye;ye=we;try{return ue()}finally{ye=Ge}}function Ir(ue){var we=ye;return function(){var Ge=ye;ye=we;try{return ue.apply(this,arguments)}finally{ye=Ge}}}function Sr(ue,we,Ge){var dt=m.unstable_now(),ft;if(typeof Ge=="object"&&Ge!==null){var Qt=Ge.delay;typeof Qt=="number"&&Qt>0?ft=dt+Qt:ft=dt}else ft=dt;var jt;switch(ue){case _:jt=I;break;case S:jt=ne;break;case D:jt=re;break;case C:jt=X;break;case T:default:jt=z;break}var Kn=ft+jt,xt={id:ze++,callback:we,priorityLevel:ue,startTime:ft,expirationTime:Kn,sortIndex:-1};return ft>dt?(xt.sortIndex=ft,s(le,xt),d(se)===null&&xt===d(le)&&(Ne?kr():Ne=!0,It(Gt,ft-dt))):(xt.sortIndex=Kn,s(se,xt),!gt&&!et&&(gt=!0,ur(pn))),xt}function vn(){}function Xn(){!gt&&!et&&(gt=!0,ur(pn))}function ar(){return d(se)}function sr(ue){ue.callback=null}function Wt(){return ye}var kn=!1,sn=null,$t=-1,Kt=o,lr=-1;function Er(){var ue=m.unstable_now()-lr;return!(ue<Kt)}function $n(){}function jr(ue){if(ue<0||ue>125){console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");return}ue>0?Kt=Math.floor(1e3/ue):Kt=o}var Cr=function(){if(sn!==null){var ue=m.unstable_now();lr=ue;var we=!0,Ge=!0;try{Ge=sn(we,ue)}finally{Ge?Ln():(kn=!1,sn=null)}}else kn=!1},Ln;if(typeof Yn=="function")Ln=function(){Yn(Cr)};else if(typeof MessageChannel<"u"){var Tr=new MessageChannel,Nn=Tr.port2;Tr.port1.onmessage=Cr,Ln=function(){Nn.postMessage(null)}}else Ln=function(){Tt(Cr,0)};function ur(ue){sn=ue,kn||(kn=!0,Ln())}function It(ue,we){$t=Tt(function(){ue(m.unstable_now())},we)}function kr(){wr($t),$t=-1}var ki=$n,Ni=null;m.unstable_IdlePriority=D,m.unstable_ImmediatePriority=_,m.unstable_LowPriority=C,m.unstable_NormalPriority=T,m.unstable_Profiling=Ni,m.unstable_UserBlockingPriority=S,m.unstable_cancelCallback=sr,m.unstable_continueExecution=Xn,m.unstable_forceFrameRate=jr,m.unstable_getCurrentPriorityLevel=Wt,m.unstable_getFirstCallbackNode=ar,m.unstable_next=Vr,m.unstable_pauseExecution=vn,m.unstable_requestPaint=ki,m.unstable_runWithPriority=ci,m.unstable_scheduleCallback=Sr,m.unstable_shouldYield=Er,m.unstable_wrapCallback=Ir,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})()})(Wb);Gb.exports=Wb;var JM=Gb.exports;/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var m=U,l=JM,i=m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,o=!1;function s(e){o=e}function d(e){if(!o){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];v("warn",e,n)}}function c(e){if(!o){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];v("error",e,n)}}function v(e,t,n){{var r=i.ReactDebugCurrentFrame,a=r.getStackAddendum();a!==""&&(t+="%s",n=n.concat([a]));var u=n.map(function(f){return String(f)});u.unshift("Warning: "+t),Function.prototype.apply.call(console[e],console,u)}}var h=0,p=1,_=2,S=3,T=4,C=5,D=6,F=7,q=8,$=9,j=10,K=11,Z=12,I=13,ne=14,z=15,X=16,re=17,se=18,le=19,ze=21,_e=22,ye=23,et=24,gt=25,Ne=!0,Tt=!1,wr=!1,Yn=!1,qn=!1,Gt=!0,pn=!1,or=!0,ci=!0,Vr=!0,Ir=!0,Sr=new Set,vn={},Xn={};function ar(e,t){sr(e,t),sr(e+"Capture",t)}function sr(e,t){vn[e]&&c("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",e),vn[e]=t;{var n=e.toLowerCase();Xn[n]=e,e==="onDoubleClick"&&(Xn.ondblclick=e)}for(var r=0;r<t.length;r++)Sr.add(t[r])}var Wt=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",kn=Object.prototype.hasOwnProperty;function sn(e){{var t=typeof Symbol=="function"&&Symbol.toStringTag,n=t&&e[Symbol.toStringTag]||e.constructor.name||"Object";return n}}function $t(e){try{return Kt(e),!1}catch{return!0}}function Kt(e){return""+e}function lr(e,t){if($t(e))return c("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.",t,sn(e)),Kt(e)}function Er(e){if($t(e))return c("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",sn(e)),Kt(e)}function $n(e,t){if($t(e))return c("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.",t,sn(e)),Kt(e)}function jr(e,t){if($t(e))return c("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.",t,sn(e)),Kt(e)}function Cr(e){if($t(e))return c("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.",sn(e)),Kt(e)}function Ln(e){if($t(e))return c("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.",sn(e)),Kt(e)}var Tr=0,Nn=1,ur=2,It=3,kr=4,ki=5,Ni=6,ue=":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",we=ue+"\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",Ge=new RegExp("^["+ue+"]["+we+"]*$"),dt={},ft={};function Qt(e){return kn.call(ft,e)?!0:kn.call(dt,e)?!1:Ge.test(e)?(ft[e]=!0,!0):(dt[e]=!0,c("Invalid attribute name: `%s`",e),!1)}function jt(e,t,n){return t!==null?t.type===Tr:n?!1:e.length>2&&(e[0]==="o"||e[0]==="O")&&(e[1]==="n"||e[1]==="N")}function Kn(e,t,n,r){if(n!==null&&n.type===Tr)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":{if(r)return!1;if(n!==null)return!n.acceptsBooleans;var a=e.toLowerCase().slice(0,5);return a!=="data-"&&a!=="aria-"}default:return!1}}function xt(e,t,n,r){if(t===null||typeof t>"u"||Kn(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case It:return!t;case kr:return t===!1;case ki:return isNaN(t);case Ni:return isNaN(t)||t<1}return!1}function cr(e){return Nt.hasOwnProperty(e)?Nt[e]:null}function kt(e,t,n,r,a,u,f){this.acceptsBooleans=t===ur||t===It||t===kr,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=u,this.removeEmptyString=f}var Nt={},di=["children","dangerouslySetInnerHTML","defaultValue","defaultChecked","innerHTML","suppressContentEditableWarning","suppressHydrationWarning","style"];di.forEach(function(e){Nt[e]=new kt(e,Tr,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0],n=e[1];Nt[t]=new kt(t,Nn,!1,n,null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){Nt[e]=new kt(e,ur,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Nt[e]=new kt(e,ur,!1,e,null,!1,!1)}),["allowFullScreen","async","autoFocus","autoPlay","controls","default","defer","disabled","disablePictureInPicture","disableRemotePlayback","formNoValidate","hidden","loop","noModule","noValidate","open","playsInline","readOnly","required","reversed","scoped","seamless","itemScope"].forEach(function(e){Nt[e]=new kt(e,It,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){Nt[e]=new kt(e,It,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){Nt[e]=new kt(e,kr,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){Nt[e]=new kt(e,Ni,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){Nt[e]=new kt(e,ki,!1,e.toLowerCase(),null,!1,!1)});var Hr=/[\-\:]([a-z])/g,jo=function(e){return e[1].toUpperCase()};["accent-height","alignment-baseline","arabic-form","baseline-shift","cap-height","clip-path","clip-rule","color-interpolation","color-interpolation-filters","color-profile","color-rendering","dominant-baseline","enable-background","fill-opacity","fill-rule","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","glyph-name","glyph-orientation-horizontal","glyph-orientation-vertical","horiz-adv-x","horiz-origin-x","image-rendering","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","overline-position","overline-thickness","paint-order","panose-1","pointer-events","rendering-intent","shape-rendering","stop-color","stop-opacity","strikethrough-position","strikethrough-thickness","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-anchor","text-decoration","text-rendering","underline-position","underline-thickness","unicode-bidi","unicode-range","units-per-em","v-alphabetic","v-hanging","v-ideographic","v-mathematical","vector-effect","vert-adv-y","vert-origin-x","vert-origin-y","word-spacing","writing-mode","xmlns:xlink","x-height"].forEach(function(e){var t=e.replace(Hr,jo);Nt[t]=new kt(t,Nn,!1,e,null,!1,!1)}),["xlink:actuate","xlink:arcrole","xlink:role","xlink:show","xlink:title","xlink:type"].forEach(function(e){var t=e.replace(Hr,jo);Nt[t]=new kt(t,Nn,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Hr,jo);Nt[t]=new kt(t,Nn,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){Nt[e]=new kt(e,Nn,!1,e.toLowerCase(),null,!1,!1)});var ka="xlinkHref";Nt[ka]=new kt("xlinkHref",Nn,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){Nt[e]=new kt(e,Nn,!1,e.toLowerCase(),null,!0,!0)});var Fs=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i,Ho=!1;function Go(e){!Ho&&Fs.test(e)&&(Ho=!0,c("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.",JSON.stringify(e)))}function Ri(e,t,n,r){if(r.mustUseProperty){var a=r.propertyName;return e[a]}else{lr(n,t),r.sanitizeURL&&Go(""+n);var u=r.attributeName,f=null;if(r.type===kr){if(e.hasAttribute(u)){var g=e.getAttribute(u);return g===""?!0:xt(t,n,r,!1)?g:g===""+n?n:g}}else if(e.hasAttribute(u)){if(xt(t,n,r,!1))return e.getAttribute(u);if(r.type===It)return n;f=e.getAttribute(u)}return xt(t,n,r,!1)?f===null?n:f:f===""+n?n:f}}function io(e,t,n,r){{if(!Qt(t))return;if(!e.hasAttribute(t))return n===void 0?void 0:null;var a=e.getAttribute(t);return lr(n,t),a===""+n?n:a}}function Di(e,t,n,r){var a=cr(t);if(!jt(t,a,r)){if(xt(t,n,a,r)&&(n=null),r||a===null){if(Qt(t)){var u=t;n===null?e.removeAttribute(u):(lr(n,t),e.setAttribute(u,""+n))}return}var f=a.mustUseProperty;if(f){var g=a.propertyName;if(n===null){var x=a.type;e[g]=x===It?!1:""}else e[g]=n;return}var E=a.attributeName,k=a.attributeNamespace;if(n===null)e.removeAttribute(E);else{var P=a.type,M;P===It||P===kr&&n===!0?M="":(lr(n,E),M=""+n,a.sanitizeURL&&Go(M.toString())),k?e.setAttributeNS(k,E,M):e.setAttribute(E,M)}}}var fi=Symbol.for("react.element"),Gr=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),ee=Symbol.for("react.strict_mode"),ce=Symbol.for("react.profiler"),Re=Symbol.for("react.provider"),$e=Symbol.for("react.context"),Ae=Symbol.for("react.forward_ref"),je=Symbol.for("react.suspense"),Ve=Symbol.for("react.suspense_list"),Pt=Symbol.for("react.memo"),Ye=Symbol.for("react.lazy"),Mt=Symbol.for("react.scope"),Rn=Symbol.for("react.debug_trace_mode"),Wr=Symbol.for("react.offscreen"),Yr=Symbol.for("react.legacy_hidden"),ln=Symbol.for("react.cache"),Wo=Symbol.for("react.tracing_marker"),Na=Symbol.iterator,Ls="@@iterator";function Mi(e){if(e===null||typeof e!="object")return null;var t=Na&&e[Na]||e[Ls];return typeof t=="function"?t:null}var Xe=Object.assign,Yo=0,oo,Us,Bs,Vs,Is,js,Hs;function Gs(){}Gs.__reactDisabledLog=!0;function Vu(){{if(Yo===0){oo=console.log,Us=console.info,Bs=console.warn,Vs=console.error,Is=console.group,js=console.groupCollapsed,Hs=console.groupEnd;var e={configurable:!0,enumerable:!0,value:Gs,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}Yo++}}function Sf(){{if(Yo--,Yo===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:Xe({},e,{value:oo}),info:Xe({},e,{value:Us}),warn:Xe({},e,{value:Bs}),error:Xe({},e,{value:Vs}),group:Xe({},e,{value:Is}),groupCollapsed:Xe({},e,{value:js}),groupEnd:Xe({},e,{value:Hs})})}Yo<0&&c("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var Ws=i.ReactCurrentDispatcher,qo;function Nr(e,t,n){{if(qo===void 0)try{throw Error()}catch(a){var r=a.stack.trim().match(/\n( *(at )?)/);qo=r&&r[1]||""}return`
`+qo+e}}var ao=!1,so;{var Ra=typeof WeakMap=="function"?WeakMap:Map;so=new Ra}function Ys(e,t){if(!e||ao)return"";{var n=so.get(e);if(n!==void 0)return n}var r;ao=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var u;u=Ws.current,Ws.current=null,Vu();try{if(t){var f=function(){throw Error()};if(Object.defineProperty(f.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(f,[])}catch(V){r=V}Reflect.construct(e,[],f)}else{try{f.call()}catch(V){r=V}e.call(f.prototype)}}else{try{throw Error()}catch(V){r=V}e()}}catch(V){if(V&&r&&typeof V.stack=="string"){for(var g=V.stack.split(`
`),x=r.stack.split(`
`),E=g.length-1,k=x.length-1;E>=1&&k>=0&&g[E]!==x[k];)k--;for(;E>=1&&k>=0;E--,k--)if(g[E]!==x[k]){if(E!==1||k!==1)do if(E--,k--,k<0||g[E]!==x[k]){var P=`
`+g[E].replace(" at new "," at ");return e.displayName&&P.includes("<anonymous>")&&(P=P.replace("<anonymous>",e.displayName)),typeof e=="function"&&so.set(e,P),P}while(E>=1&&k>=0);break}}}finally{ao=!1,Ws.current=u,Sf(),Error.prepareStackTrace=a}var M=e?e.displayName||e.name:"",L=M?Nr(M):"";return typeof e=="function"&&so.set(e,L),L}function Iu(e,t,n){return Ys(e,!0)}function qs(e,t,n){return Ys(e,!1)}function Ef(e){var t=e.prototype;return!!(t&&t.isReactComponent)}function lo(e,t,n){if(e==null)return"";if(typeof e=="function")return Ys(e,Ef(e));if(typeof e=="string")return Nr(e);switch(e){case je:return Nr("Suspense");case Ve:return Nr("SuspenseList")}if(typeof e=="object")switch(e.$$typeof){case Ae:return qs(e.render);case Pt:return lo(e.type,t,n);case Ye:{var r=e,a=r._payload,u=r._init;try{return lo(u(a),t,n)}catch{}}}return""}function ju(e){switch(e._debugOwner&&e._debugOwner.type,e._debugSource,e.tag){case C:return Nr(e.type);case X:return Nr("Lazy");case I:return Nr("Suspense");case le:return Nr("SuspenseList");case h:case _:case z:return qs(e.type);case K:return qs(e.type.render);case p:return Iu(e.type);default:return""}}function Xs(e){try{var t="",n=e;do t+=ju(n),n=n.return;while(n);return t}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}function Da(e,t,n){var r=e.displayName;if(r)return r;var a=t.displayName||t.name||"";return a!==""?n+"("+a+")":n}function Hu(e){return e.displayName||"Context"}function it(e){if(e==null)return null;if(typeof e.tag=="number"&&c("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case R:return"Fragment";case Gr:return"Portal";case ce:return"Profiler";case ee:return"StrictMode";case je:return"Suspense";case Ve:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case $e:var t=e;return Hu(t)+".Consumer";case Re:var n=e;return Hu(n._context)+".Provider";case Ae:return Da(e,e.render,"ForwardRef");case Pt:var r=e.displayName||null;return r!==null?r:it(e.type)||"Memo";case Ye:{var a=e,u=a._payload,f=a._init;try{return it(f(u))}catch{return null}}}return null}function $s(e,t,n){var r=t.displayName||t.name||"";return e.displayName||(r!==""?n+"("+r+")":n)}function Ks(e){return e.displayName||"Context"}function Be(e){var t=e.tag,n=e.type;switch(t){case et:return"Cache";case $:var r=n;return Ks(r)+".Consumer";case j:var a=n;return Ks(a._context)+".Provider";case se:return"DehydratedFragment";case K:return $s(n,n.render,"ForwardRef");case F:return"Fragment";case C:return n;case T:return"Portal";case S:return"Root";case D:return"Text";case X:return it(n);case q:return n===ee?"StrictMode":"Mode";case _e:return"Offscreen";case Z:return"Profiler";case ze:return"Scope";case I:return"Suspense";case le:return"SuspenseList";case gt:return"TracingMarker";case p:case h:case re:case _:case ne:case z:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;break}return null}var Gu=i.ReactDebugCurrentFrame,Dn=null,Xo=!1;function uo(){{if(Dn===null)return null;var e=Dn._debugOwner;if(e!==null&&typeof e<"u")return Be(e)}return null}function Wu(){return Dn===null?"":Xs(Dn)}function un(){Gu.getCurrentStack=null,Dn=null,Xo=!1}function zt(e){Gu.getCurrentStack=e===null?null:Wu,Dn=e,Xo=!1}function Yu(){return Dn}function dr(e){Xo=e}function Qn(e){return""+e}function mi(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return Ln(e),e;default:return""}}var Cf={button:!0,checkbox:!0,image:!0,hidden:!0,radio:!0,reset:!0,submit:!0};function Ma(e,t){Cf[t.type]||t.onChange||t.onInput||t.readOnly||t.disabled||t.value==null||c("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."),t.onChange||t.readOnly||t.disabled||t.checked==null||c("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.")}function $o(e){var t=e.type,n=e.nodeName;return n&&n.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function qu(e){return e._valueTracker}function co(e){e._valueTracker=null}function Xu(e){var t="";return e&&($o(e)?t=e.checked?"true":"false":t=e.value),t}function $u(e){var t=$o(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);Ln(e[t]);var r=""+e[t];if(!(e.hasOwnProperty(t)||typeof n>"u"||typeof n.get!="function"||typeof n.set!="function")){var a=n.get,u=n.set;Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(g){Ln(g),r=""+g,u.call(this,g)}}),Object.defineProperty(e,t,{enumerable:n.enumerable});var f={getValue:function(){return r},setValue:function(g){Ln(g),r=""+g},stopTracking:function(){co(e),delete e[t]}};return f}}function Pi(e){qu(e)||(e._valueTracker=$u(e))}function Pa(e){if(!e)return!1;var t=qu(e);if(!t)return!0;var n=t.getValue(),r=Xu(e);return r!==n?(t.setValue(r),!0):!1}function fo(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var za=!1,Ku=!1,Qu=!1,Zu=!1;function Ju(e){var t=e.type==="checkbox"||e.type==="radio";return t?e.checked!=null:e.value!=null}function b(e,t){var n=e,r=t.checked,a=Xe({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??n._wrapperState.initialChecked});return a}function N(e,t){Ma("input",t),t.checked!==void 0&&t.defaultChecked!==void 0&&!Ku&&(c("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components",uo()||"A component",t.type),Ku=!0),t.value!==void 0&&t.defaultValue!==void 0&&!za&&(c("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components",uo()||"A component",t.type),za=!0);var n=e,r=t.defaultValue==null?"":t.defaultValue;n._wrapperState={initialChecked:t.checked!=null?t.checked:t.defaultChecked,initialValue:mi(t.value!=null?t.value:r),controlled:Ju(t)}}function B(e,t){var n=e,r=t.checked;r!=null&&Di(n,"checked",r,!1)}function H(e,t){var n=e;{var r=Ju(t);!n._wrapperState.controlled&&r&&!Zu&&(c("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"),Zu=!0),n._wrapperState.controlled&&!r&&!Qu&&(c("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"),Qu=!0)}B(e,t);var a=mi(t.value),u=t.type;if(a!=null)u==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=Qn(a)):n.value!==Qn(a)&&(n.value=Qn(a));else if(u==="submit"||u==="reset"){n.removeAttribute("value");return}t.hasOwnProperty("value")?Oe(n,t.type,a):t.hasOwnProperty("defaultValue")&&Oe(n,t.type,mi(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(n.defaultChecked=!!t.defaultChecked)}function oe(e,t,n){var r=e;if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var a=t.type,u=a==="submit"||a==="reset";if(u&&(t.value===void 0||t.value===null))return;var f=Qn(r._wrapperState.initialValue);n||f!==r.value&&(r.value=f),r.defaultValue=f}var g=r.name;g!==""&&(r.name=""),r.defaultChecked=!r.defaultChecked,r.defaultChecked=!!r._wrapperState.initialChecked,g!==""&&(r.name=g)}function Me(e,t){var n=e;H(n,t),xe(n,t)}function xe(e,t){var n=t.name;if(t.type==="radio"&&n!=null){for(var r=e;r.parentNode;)r=r.parentNode;lr(n,"name");for(var a=r.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),u=0;u<a.length;u++){var f=a[u];if(!(f===e||f.form!==e.form)){var g=Bc(f);if(!g)throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");Pa(f),H(f,g)}}}}function Oe(e,t,n){(t!=="number"||fo(e.ownerDocument)!==e)&&(n==null?e.defaultValue=Qn(e._wrapperState.initialValue):e.defaultValue!==Qn(n)&&(e.defaultValue=Qn(n)))}var Ke=!1,mt=!1,bt=!1;function _t(e,t){t.value==null&&(typeof t.children=="object"&&t.children!==null?m.Children.forEach(t.children,function(n){n!=null&&(typeof n=="string"||typeof n=="number"||mt||(mt=!0,c("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")))}):t.dangerouslySetInnerHTML!=null&&(bt||(bt=!0,c("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))),t.selected!=null&&!Ke&&(c("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."),Ke=!0)}function Rt(e,t){t.value!=null&&e.setAttribute("value",Qn(mi(t.value)))}var Ft=Array.isArray;function st(e){return Ft(e)}var mo;mo=!1;function Aa(){var e=uo();return e?`

Check the render method of \``+e+"`.":""}var Qs=["value","defaultValue"];function Tf(e){{Ma("select",e);for(var t=0;t<Qs.length;t++){var n=Qs[t];if(e[n]!=null){var r=st(e[n]);e.multiple&&!r?c("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",n,Aa()):!e.multiple&&r&&c("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",n,Aa())}}}}function zi(e,t,n,r){var a=e.options;if(t){for(var u=n,f={},g=0;g<u.length;g++)f["$"+u[g]]=!0;for(var x=0;x<a.length;x++){var E=f.hasOwnProperty("$"+a[x].value);a[x].selected!==E&&(a[x].selected=E),E&&r&&(a[x].defaultSelected=!0)}}else{for(var k=Qn(mi(n)),P=null,M=0;M<a.length;M++){if(a[M].value===k){a[M].selected=!0,r&&(a[M].defaultSelected=!0);return}P===null&&!a[M].disabled&&(P=a[M])}P!==null&&(P.selected=!0)}}function Zs(e,t){return Xe({},t,{value:void 0})}function Js(e,t){var n=e;Tf(t),n._wrapperState={wasMultiple:!!t.multiple},t.value!==void 0&&t.defaultValue!==void 0&&!mo&&(c("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"),mo=!0)}function kf(e,t){var n=e;n.multiple=!!t.multiple;var r=t.value;r!=null?zi(n,!!t.multiple,r,!1):t.defaultValue!=null&&zi(n,!!t.multiple,t.defaultValue,!0)}function a_(e,t){var n=e,r=n._wrapperState.wasMultiple;n._wrapperState.wasMultiple=!!t.multiple;var a=t.value;a!=null?zi(n,!!t.multiple,a,!1):r!==!!t.multiple&&(t.defaultValue!=null?zi(n,!!t.multiple,t.defaultValue,!0):zi(n,!!t.multiple,t.multiple?[]:"",!1))}function s_(e,t){var n=e,r=t.value;r!=null&&zi(n,!!t.multiple,r,!1)}var Gv=!1;function Nf(e,t){var n=e;if(t.dangerouslySetInnerHTML!=null)throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");var r=Xe({},t,{value:void 0,defaultValue:void 0,children:Qn(n._wrapperState.initialValue)});return r}function Wv(e,t){var n=e;Ma("textarea",t),t.value!==void 0&&t.defaultValue!==void 0&&!Gv&&(c("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components",uo()||"A component"),Gv=!0);var r=t.value;if(r==null){var a=t.children,u=t.defaultValue;if(a!=null){c("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");{if(u!=null)throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");if(st(a)){if(a.length>1)throw new Error("<textarea> can only have at most one child.");a=a[0]}u=a}}u==null&&(u=""),r=u}n._wrapperState={initialValue:mi(r)}}function Yv(e,t){var n=e,r=mi(t.value),a=mi(t.defaultValue);if(r!=null){var u=Qn(r);u!==n.value&&(n.value=u),t.defaultValue==null&&n.defaultValue!==u&&(n.defaultValue=u)}a!=null&&(n.defaultValue=Qn(a))}function qv(e,t){var n=e,r=n.textContent;r===n._wrapperState.initialValue&&r!==""&&r!==null&&(n.value=r)}function l_(e,t){Yv(e,t)}var Ai="http://www.w3.org/1999/xhtml",u_="http://www.w3.org/1998/Math/MathML",Rf="http://www.w3.org/2000/svg";function Df(e){switch(e){case"svg":return Rf;case"math":return u_;default:return Ai}}function Mf(e,t){return e==null||e===Ai?Df(t):e===Rf&&t==="foreignObject"?Ai:e}var c_=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,a)})}:e},ec,Xv=c_(function(e,t){if(e.namespaceURI===Rf&&!("innerHTML"in e)){ec=ec||document.createElement("div"),ec.innerHTML="<svg>"+t.valueOf().toString()+"</svg>";for(var n=ec.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild);return}e.innerHTML=t}),Zn=1,Oi=3,Yt=8,Fi=9,Pf=11,tc=function(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===Oi){n.nodeValue=t;return}}e.textContent=t},d_={animation:["animationDelay","animationDirection","animationDuration","animationFillMode","animationIterationCount","animationName","animationPlayState","animationTimingFunction"],background:["backgroundAttachment","backgroundClip","backgroundColor","backgroundImage","backgroundOrigin","backgroundPositionX","backgroundPositionY","backgroundRepeat","backgroundSize"],backgroundPosition:["backgroundPositionX","backgroundPositionY"],border:["borderBottomColor","borderBottomStyle","borderBottomWidth","borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth","borderLeftColor","borderLeftStyle","borderLeftWidth","borderRightColor","borderRightStyle","borderRightWidth","borderTopColor","borderTopStyle","borderTopWidth"],borderBlockEnd:["borderBlockEndColor","borderBlockEndStyle","borderBlockEndWidth"],borderBlockStart:["borderBlockStartColor","borderBlockStartStyle","borderBlockStartWidth"],borderBottom:["borderBottomColor","borderBottomStyle","borderBottomWidth"],borderColor:["borderBottomColor","borderLeftColor","borderRightColor","borderTopColor"],borderImage:["borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth"],borderInlineEnd:["borderInlineEndColor","borderInlineEndStyle","borderInlineEndWidth"],borderInlineStart:["borderInlineStartColor","borderInlineStartStyle","borderInlineStartWidth"],borderLeft:["borderLeftColor","borderLeftStyle","borderLeftWidth"],borderRadius:["borderBottomLeftRadius","borderBottomRightRadius","borderTopLeftRadius","borderTopRightRadius"],borderRight:["borderRightColor","borderRightStyle","borderRightWidth"],borderStyle:["borderBottomStyle","borderLeftStyle","borderRightStyle","borderTopStyle"],borderTop:["borderTopColor","borderTopStyle","borderTopWidth"],borderWidth:["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopWidth"],columnRule:["columnRuleColor","columnRuleStyle","columnRuleWidth"],columns:["columnCount","columnWidth"],flex:["flexBasis","flexGrow","flexShrink"],flexFlow:["flexDirection","flexWrap"],font:["fontFamily","fontFeatureSettings","fontKerning","fontLanguageOverride","fontSize","fontSizeAdjust","fontStretch","fontStyle","fontVariant","fontVariantAlternates","fontVariantCaps","fontVariantEastAsian","fontVariantLigatures","fontVariantNumeric","fontVariantPosition","fontWeight","lineHeight"],fontVariant:["fontVariantAlternates","fontVariantCaps","fontVariantEastAsian","fontVariantLigatures","fontVariantNumeric","fontVariantPosition"],gap:["columnGap","rowGap"],grid:["gridAutoColumns","gridAutoFlow","gridAutoRows","gridTemplateAreas","gridTemplateColumns","gridTemplateRows"],gridArea:["gridColumnEnd","gridColumnStart","gridRowEnd","gridRowStart"],gridColumn:["gridColumnEnd","gridColumnStart"],gridColumnGap:["columnGap"],gridGap:["columnGap","rowGap"],gridRow:["gridRowEnd","gridRowStart"],gridRowGap:["rowGap"],gridTemplate:["gridTemplateAreas","gridTemplateColumns","gridTemplateRows"],listStyle:["listStyleImage","listStylePosition","listStyleType"],margin:["marginBottom","marginLeft","marginRight","marginTop"],marker:["markerEnd","markerMid","markerStart"],mask:["maskClip","maskComposite","maskImage","maskMode","maskOrigin","maskPositionX","maskPositionY","maskRepeat","maskSize"],maskPosition:["maskPositionX","maskPositionY"],outline:["outlineColor","outlineStyle","outlineWidth"],overflow:["overflowX","overflowY"],padding:["paddingBottom","paddingLeft","paddingRight","paddingTop"],placeContent:["alignContent","justifyContent"],placeItems:["alignItems","justifyItems"],placeSelf:["alignSelf","justifySelf"],textDecoration:["textDecorationColor","textDecorationLine","textDecorationStyle"],textEmphasis:["textEmphasisColor","textEmphasisStyle"],transition:["transitionDelay","transitionDuration","transitionProperty","transitionTimingFunction"],wordWrap:["overflowWrap"]},el={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0};function f_(e,t){return e+t.charAt(0).toUpperCase()+t.substring(1)}var m_=["Webkit","ms","Moz","O"];Object.keys(el).forEach(function(e){m_.forEach(function(t){el[f_(t,e)]=el[e]})});function zf(e,t,n){var r=t==null||typeof t=="boolean"||t==="";return r?"":!n&&typeof t=="number"&&t!==0&&!(el.hasOwnProperty(e)&&el[e])?t+"px":(jr(t,e),(""+t).trim())}var h_=/([A-Z])/g,p_=/^ms-/;function v_(e){return e.replace(h_,"-$1").toLowerCase().replace(p_,"-ms-")}var $v=function(){};{var g_=/^(?:webkit|moz|o)[A-Z]/,y_=/^-ms-/,x_=/-(.)/g,Kv=/;\s*$/,Oa={},Af={},Qv=!1,Zv=!1,b_=function(e){return e.replace(x_,function(t,n){return n.toUpperCase()})},__=function(e){Oa.hasOwnProperty(e)&&Oa[e]||(Oa[e]=!0,c("Unsupported style property %s. Did you mean %s?",e,b_(e.replace(y_,"ms-"))))},w_=function(e){Oa.hasOwnProperty(e)&&Oa[e]||(Oa[e]=!0,c("Unsupported vendor-prefixed style property %s. Did you mean %s?",e,e.charAt(0).toUpperCase()+e.slice(1)))},S_=function(e,t){Af.hasOwnProperty(t)&&Af[t]||(Af[t]=!0,c(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`,e,t.replace(Kv,"")))},E_=function(e,t){Qv||(Qv=!0,c("`NaN` is an invalid value for the `%s` css style property.",e))},C_=function(e,t){Zv||(Zv=!0,c("`Infinity` is an invalid value for the `%s` css style property.",e))};$v=function(e,t){e.indexOf("-")>-1?__(e):g_.test(e)?w_(e):Kv.test(t)&&S_(e,t),typeof t=="number"&&(isNaN(t)?E_(e,t):isFinite(t)||C_(e,t))}}var T_=$v;function k_(e){{var t="",n="";for(var r in e)if(e.hasOwnProperty(r)){var a=e[r];if(a!=null){var u=r.indexOf("--")===0;t+=n+(u?r:v_(r))+":",t+=zf(r,a,u),n=";"}}return t||null}}function Jv(e,t){var n=e.style;for(var r in t)if(t.hasOwnProperty(r)){var a=r.indexOf("--")===0;a||T_(r,t[r]);var u=zf(r,t[r],a);r==="float"&&(r="cssFloat"),a?n.setProperty(r,u):n[r]=u}}function N_(e){return e==null||typeof e=="boolean"||e===""}function e0(e){var t={};for(var n in e)for(var r=d_[n]||[n],a=0;a<r.length;a++)t[r[a]]=n;return t}function R_(e,t){{if(!t)return;var n=e0(e),r=e0(t),a={};for(var u in n){var f=n[u],g=r[u];if(g&&f!==g){var x=f+","+g;if(a[x])continue;a[x]=!0,c("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",N_(e[f])?"Removing":"Updating",f,g)}}}}var D_={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},M_=Xe({menuitem:!0},D_),P_="__html";function Of(e,t){if(t){if(M_[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw new Error(e+" is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");if(typeof t.dangerouslySetInnerHTML!="object"||!(P_ in t.dangerouslySetInnerHTML))throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.")}if(!t.suppressContentEditableWarning&&t.contentEditable&&t.children!=null&&c("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."),t.style!=null&&typeof t.style!="object")throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.")}}function Ko(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var nc={accept:"accept",acceptcharset:"acceptCharset","accept-charset":"acceptCharset",accesskey:"accessKey",action:"action",allowfullscreen:"allowFullScreen",alt:"alt",as:"as",async:"async",autocapitalize:"autoCapitalize",autocomplete:"autoComplete",autocorrect:"autoCorrect",autofocus:"autoFocus",autoplay:"autoPlay",autosave:"autoSave",capture:"capture",cellpadding:"cellPadding",cellspacing:"cellSpacing",challenge:"challenge",charset:"charSet",checked:"checked",children:"children",cite:"cite",class:"className",classid:"classID",classname:"className",cols:"cols",colspan:"colSpan",content:"content",contenteditable:"contentEditable",contextmenu:"contextMenu",controls:"controls",controlslist:"controlsList",coords:"coords",crossorigin:"crossOrigin",dangerouslysetinnerhtml:"dangerouslySetInnerHTML",data:"data",datetime:"dateTime",default:"default",defaultchecked:"defaultChecked",defaultvalue:"defaultValue",defer:"defer",dir:"dir",disabled:"disabled",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback",download:"download",draggable:"draggable",enctype:"encType",enterkeyhint:"enterKeyHint",for:"htmlFor",form:"form",formmethod:"formMethod",formaction:"formAction",formenctype:"formEncType",formnovalidate:"formNoValidate",formtarget:"formTarget",frameborder:"frameBorder",headers:"headers",height:"height",hidden:"hidden",high:"high",href:"href",hreflang:"hrefLang",htmlfor:"htmlFor",httpequiv:"httpEquiv","http-equiv":"httpEquiv",icon:"icon",id:"id",imagesizes:"imageSizes",imagesrcset:"imageSrcSet",innerhtml:"innerHTML",inputmode:"inputMode",integrity:"integrity",is:"is",itemid:"itemID",itemprop:"itemProp",itemref:"itemRef",itemscope:"itemScope",itemtype:"itemType",keyparams:"keyParams",keytype:"keyType",kind:"kind",label:"label",lang:"lang",list:"list",loop:"loop",low:"low",manifest:"manifest",marginwidth:"marginWidth",marginheight:"marginHeight",max:"max",maxlength:"maxLength",media:"media",mediagroup:"mediaGroup",method:"method",min:"min",minlength:"minLength",multiple:"multiple",muted:"muted",name:"name",nomodule:"noModule",nonce:"nonce",novalidate:"noValidate",open:"open",optimum:"optimum",pattern:"pattern",placeholder:"placeholder",playsinline:"playsInline",poster:"poster",preload:"preload",profile:"profile",radiogroup:"radioGroup",readonly:"readOnly",referrerpolicy:"referrerPolicy",rel:"rel",required:"required",reversed:"reversed",role:"role",rows:"rows",rowspan:"rowSpan",sandbox:"sandbox",scope:"scope",scoped:"scoped",scrolling:"scrolling",seamless:"seamless",selected:"selected",shape:"shape",size:"size",sizes:"sizes",span:"span",spellcheck:"spellCheck",src:"src",srcdoc:"srcDoc",srclang:"srcLang",srcset:"srcSet",start:"start",step:"step",style:"style",summary:"summary",tabindex:"tabIndex",target:"target",title:"title",type:"type",usemap:"useMap",value:"value",width:"width",wmode:"wmode",wrap:"wrap",about:"about",accentheight:"accentHeight","accent-height":"accentHeight",accumulate:"accumulate",additive:"additive",alignmentbaseline:"alignmentBaseline","alignment-baseline":"alignmentBaseline",allowreorder:"allowReorder",alphabetic:"alphabetic",amplitude:"amplitude",arabicform:"arabicForm","arabic-form":"arabicForm",ascent:"ascent",attributename:"attributeName",attributetype:"attributeType",autoreverse:"autoReverse",azimuth:"azimuth",basefrequency:"baseFrequency",baselineshift:"baselineShift","baseline-shift":"baselineShift",baseprofile:"baseProfile",bbox:"bbox",begin:"begin",bias:"bias",by:"by",calcmode:"calcMode",capheight:"capHeight","cap-height":"capHeight",clip:"clip",clippath:"clipPath","clip-path":"clipPath",clippathunits:"clipPathUnits",cliprule:"clipRule","clip-rule":"clipRule",color:"color",colorinterpolation:"colorInterpolation","color-interpolation":"colorInterpolation",colorinterpolationfilters:"colorInterpolationFilters","color-interpolation-filters":"colorInterpolationFilters",colorprofile:"colorProfile","color-profile":"colorProfile",colorrendering:"colorRendering","color-rendering":"colorRendering",contentscripttype:"contentScriptType",contentstyletype:"contentStyleType",cursor:"cursor",cx:"cx",cy:"cy",d:"d",datatype:"datatype",decelerate:"decelerate",descent:"descent",diffuseconstant:"diffuseConstant",direction:"direction",display:"display",divisor:"divisor",dominantbaseline:"dominantBaseline","dominant-baseline":"dominantBaseline",dur:"dur",dx:"dx",dy:"dy",edgemode:"edgeMode",elevation:"elevation",enablebackground:"enableBackground","enable-background":"enableBackground",end:"end",exponent:"exponent",externalresourcesrequired:"externalResourcesRequired",fill:"fill",fillopacity:"fillOpacity","fill-opacity":"fillOpacity",fillrule:"fillRule","fill-rule":"fillRule",filter:"filter",filterres:"filterRes",filterunits:"filterUnits",floodopacity:"floodOpacity","flood-opacity":"floodOpacity",floodcolor:"floodColor","flood-color":"floodColor",focusable:"focusable",fontfamily:"fontFamily","font-family":"fontFamily",fontsize:"fontSize","font-size":"fontSize",fontsizeadjust:"fontSizeAdjust","font-size-adjust":"fontSizeAdjust",fontstretch:"fontStretch","font-stretch":"fontStretch",fontstyle:"fontStyle","font-style":"fontStyle",fontvariant:"fontVariant","font-variant":"fontVariant",fontweight:"fontWeight","font-weight":"fontWeight",format:"format",from:"from",fx:"fx",fy:"fy",g1:"g1",g2:"g2",glyphname:"glyphName","glyph-name":"glyphName",glyphorientationhorizontal:"glyphOrientationHorizontal","glyph-orientation-horizontal":"glyphOrientationHorizontal",glyphorientationvertical:"glyphOrientationVertical","glyph-orientation-vertical":"glyphOrientationVertical",glyphref:"glyphRef",gradienttransform:"gradientTransform",gradientunits:"gradientUnits",hanging:"hanging",horizadvx:"horizAdvX","horiz-adv-x":"horizAdvX",horizoriginx:"horizOriginX","horiz-origin-x":"horizOriginX",ideographic:"ideographic",imagerendering:"imageRendering","image-rendering":"imageRendering",in2:"in2",in:"in",inlist:"inlist",intercept:"intercept",k1:"k1",k2:"k2",k3:"k3",k4:"k4",k:"k",kernelmatrix:"kernelMatrix",kernelunitlength:"kernelUnitLength",kerning:"kerning",keypoints:"keyPoints",keysplines:"keySplines",keytimes:"keyTimes",lengthadjust:"lengthAdjust",letterspacing:"letterSpacing","letter-spacing":"letterSpacing",lightingcolor:"lightingColor","lighting-color":"lightingColor",limitingconeangle:"limitingConeAngle",local:"local",markerend:"markerEnd","marker-end":"markerEnd",markerheight:"markerHeight",markermid:"markerMid","marker-mid":"markerMid",markerstart:"markerStart","marker-start":"markerStart",markerunits:"markerUnits",markerwidth:"markerWidth",mask:"mask",maskcontentunits:"maskContentUnits",maskunits:"maskUnits",mathematical:"mathematical",mode:"mode",numoctaves:"numOctaves",offset:"offset",opacity:"opacity",operator:"operator",order:"order",orient:"orient",orientation:"orientation",origin:"origin",overflow:"overflow",overlineposition:"overlinePosition","overline-position":"overlinePosition",overlinethickness:"overlineThickness","overline-thickness":"overlineThickness",paintorder:"paintOrder","paint-order":"paintOrder",panose1:"panose1","panose-1":"panose1",pathlength:"pathLength",patterncontentunits:"patternContentUnits",patterntransform:"patternTransform",patternunits:"patternUnits",pointerevents:"pointerEvents","pointer-events":"pointerEvents",points:"points",pointsatx:"pointsAtX",pointsaty:"pointsAtY",pointsatz:"pointsAtZ",prefix:"prefix",preservealpha:"preserveAlpha",preserveaspectratio:"preserveAspectRatio",primitiveunits:"primitiveUnits",property:"property",r:"r",radius:"radius",refx:"refX",refy:"refY",renderingintent:"renderingIntent","rendering-intent":"renderingIntent",repeatcount:"repeatCount",repeatdur:"repeatDur",requiredextensions:"requiredExtensions",requiredfeatures:"requiredFeatures",resource:"resource",restart:"restart",result:"result",results:"results",rotate:"rotate",rx:"rx",ry:"ry",scale:"scale",security:"security",seed:"seed",shaperendering:"shapeRendering","shape-rendering":"shapeRendering",slope:"slope",spacing:"spacing",specularconstant:"specularConstant",specularexponent:"specularExponent",speed:"speed",spreadmethod:"spreadMethod",startoffset:"startOffset",stddeviation:"stdDeviation",stemh:"stemh",stemv:"stemv",stitchtiles:"stitchTiles",stopcolor:"stopColor","stop-color":"stopColor",stopopacity:"stopOpacity","stop-opacity":"stopOpacity",strikethroughposition:"strikethroughPosition","strikethrough-position":"strikethroughPosition",strikethroughthickness:"strikethroughThickness","strikethrough-thickness":"strikethroughThickness",string:"string",stroke:"stroke",strokedasharray:"strokeDasharray","stroke-dasharray":"strokeDasharray",strokedashoffset:"strokeDashoffset","stroke-dashoffset":"strokeDashoffset",strokelinecap:"strokeLinecap","stroke-linecap":"strokeLinecap",strokelinejoin:"strokeLinejoin","stroke-linejoin":"strokeLinejoin",strokemiterlimit:"strokeMiterlimit","stroke-miterlimit":"strokeMiterlimit",strokewidth:"strokeWidth","stroke-width":"strokeWidth",strokeopacity:"strokeOpacity","stroke-opacity":"strokeOpacity",suppresscontenteditablewarning:"suppressContentEditableWarning",suppresshydrationwarning:"suppressHydrationWarning",surfacescale:"surfaceScale",systemlanguage:"systemLanguage",tablevalues:"tableValues",targetx:"targetX",targety:"targetY",textanchor:"textAnchor","text-anchor":"textAnchor",textdecoration:"textDecoration","text-decoration":"textDecoration",textlength:"textLength",textrendering:"textRendering","text-rendering":"textRendering",to:"to",transform:"transform",typeof:"typeof",u1:"u1",u2:"u2",underlineposition:"underlinePosition","underline-position":"underlinePosition",underlinethickness:"underlineThickness","underline-thickness":"underlineThickness",unicode:"unicode",unicodebidi:"unicodeBidi","unicode-bidi":"unicodeBidi",unicoderange:"unicodeRange","unicode-range":"unicodeRange",unitsperem:"unitsPerEm","units-per-em":"unitsPerEm",unselectable:"unselectable",valphabetic:"vAlphabetic","v-alphabetic":"vAlphabetic",values:"values",vectoreffect:"vectorEffect","vector-effect":"vectorEffect",version:"version",vertadvy:"vertAdvY","vert-adv-y":"vertAdvY",vertoriginx:"vertOriginX","vert-origin-x":"vertOriginX",vertoriginy:"vertOriginY","vert-origin-y":"vertOriginY",vhanging:"vHanging","v-hanging":"vHanging",videographic:"vIdeographic","v-ideographic":"vIdeographic",viewbox:"viewBox",viewtarget:"viewTarget",visibility:"visibility",vmathematical:"vMathematical","v-mathematical":"vMathematical",vocab:"vocab",widths:"widths",wordspacing:"wordSpacing","word-spacing":"wordSpacing",writingmode:"writingMode","writing-mode":"writingMode",x1:"x1",x2:"x2",x:"x",xchannelselector:"xChannelSelector",xheight:"xHeight","x-height":"xHeight",xlinkactuate:"xlinkActuate","xlink:actuate":"xlinkActuate",xlinkarcrole:"xlinkArcrole","xlink:arcrole":"xlinkArcrole",xlinkhref:"xlinkHref","xlink:href":"xlinkHref",xlinkrole:"xlinkRole","xlink:role":"xlinkRole",xlinkshow:"xlinkShow","xlink:show":"xlinkShow",xlinktitle:"xlinkTitle","xlink:title":"xlinkTitle",xlinktype:"xlinkType","xlink:type":"xlinkType",xmlbase:"xmlBase","xml:base":"xmlBase",xmllang:"xmlLang","xml:lang":"xmlLang",xmlns:"xmlns","xml:space":"xmlSpace",xmlnsxlink:"xmlnsXlink","xmlns:xlink":"xmlnsXlink",xmlspace:"xmlSpace",y1:"y1",y2:"y2",y:"y",ychannelselector:"yChannelSelector",z:"z",zoomandpan:"zoomAndPan"},t0={"aria-current":0,"aria-description":0,"aria-details":0,"aria-disabled":0,"aria-hidden":0,"aria-invalid":0,"aria-keyshortcuts":0,"aria-label":0,"aria-roledescription":0,"aria-autocomplete":0,"aria-checked":0,"aria-expanded":0,"aria-haspopup":0,"aria-level":0,"aria-modal":0,"aria-multiline":0,"aria-multiselectable":0,"aria-orientation":0,"aria-placeholder":0,"aria-pressed":0,"aria-readonly":0,"aria-required":0,"aria-selected":0,"aria-sort":0,"aria-valuemax":0,"aria-valuemin":0,"aria-valuenow":0,"aria-valuetext":0,"aria-atomic":0,"aria-busy":0,"aria-live":0,"aria-relevant":0,"aria-dropeffect":0,"aria-grabbed":0,"aria-activedescendant":0,"aria-colcount":0,"aria-colindex":0,"aria-colspan":0,"aria-controls":0,"aria-describedby":0,"aria-errormessage":0,"aria-flowto":0,"aria-labelledby":0,"aria-owns":0,"aria-posinset":0,"aria-rowcount":0,"aria-rowindex":0,"aria-rowspan":0,"aria-setsize":0},Fa={},z_=new RegExp("^(aria)-["+we+"]*$"),A_=new RegExp("^(aria)[A-Z]["+we+"]*$");function O_(e,t){{if(kn.call(Fa,t)&&Fa[t])return!0;if(A_.test(t)){var n="aria-"+t.slice(4).toLowerCase(),r=t0.hasOwnProperty(n)?n:null;if(r==null)return c("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",t),Fa[t]=!0,!0;if(t!==r)return c("Invalid ARIA attribute `%s`. Did you mean `%s`?",t,r),Fa[t]=!0,!0}if(z_.test(t)){var a=t.toLowerCase(),u=t0.hasOwnProperty(a)?a:null;if(u==null)return Fa[t]=!0,!1;if(t!==u)return c("Unknown ARIA attribute `%s`. Did you mean `%s`?",t,u),Fa[t]=!0,!0}}return!0}function F_(e,t){{var n=[];for(var r in t){var a=O_(e,r);a||n.push(r)}var u=n.map(function(f){return"`"+f+"`"}).join(", ");n.length===1?c("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props",u,e):n.length>1&&c("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props",u,e)}}function L_(e,t){Ko(e,t)||F_(e,t)}var n0=!1;function U_(e,t){{if(e!=="input"&&e!=="textarea"&&e!=="select")return;t!=null&&t.value===null&&!n0&&(n0=!0,e==="select"&&t.multiple?c("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",e):c("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",e))}}var r0=function(){};{var Un={},i0=/^on./,B_=/^on[^A-Z]/,V_=new RegExp("^(aria)-["+we+"]*$"),I_=new RegExp("^(aria)[A-Z]["+we+"]*$");r0=function(e,t,n,r){if(kn.call(Un,t)&&Un[t])return!0;var a=t.toLowerCase();if(a==="onfocusin"||a==="onfocusout")return c("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."),Un[t]=!0,!0;if(r!=null){var u=r.registrationNameDependencies,f=r.possibleRegistrationNames;if(u.hasOwnProperty(t))return!0;var g=f.hasOwnProperty(a)?f[a]:null;if(g!=null)return c("Invalid event handler property `%s`. Did you mean `%s`?",t,g),Un[t]=!0,!0;if(i0.test(t))return c("Unknown event handler property `%s`. It will be ignored.",t),Un[t]=!0,!0}else if(i0.test(t))return B_.test(t)&&c("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",t),Un[t]=!0,!0;if(V_.test(t)||I_.test(t))return!0;if(a==="innerhtml")return c("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."),Un[t]=!0,!0;if(a==="aria")return c("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."),Un[t]=!0,!0;if(a==="is"&&n!==null&&n!==void 0&&typeof n!="string")return c("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",typeof n),Un[t]=!0,!0;if(typeof n=="number"&&isNaN(n))return c("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",t),Un[t]=!0,!0;var x=cr(t),E=x!==null&&x.type===Tr;if(nc.hasOwnProperty(a)){var k=nc[a];if(k!==t)return c("Invalid DOM property `%s`. Did you mean `%s`?",t,k),Un[t]=!0,!0}else if(!E&&t!==a)return c("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",t,a),Un[t]=!0,!0;return typeof n=="boolean"&&Kn(t,n,x,!1)?(n?c('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',n,t,t,n,t):c('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',n,t,t,n,t,t,t),Un[t]=!0,!0):E?!0:Kn(t,n,x,!1)?(Un[t]=!0,!1):((n==="false"||n==="true")&&x!==null&&x.type===It&&(c("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",n,t,n==="false"?"The browser will interpret it as a truthy value.":'Although this works, it will not work as expected if you pass the string "false".',t,n),Un[t]=!0),!0)}}var j_=function(e,t,n){{var r=[];for(var a in t){var u=r0(e,a,t[a],n);u||r.push(a)}var f=r.map(function(g){return"`"+g+"`"}).join(", ");r.length===1?c("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ",f,e):r.length>1&&c("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ",f,e)}};function H_(e,t,n){Ko(e,t)||j_(e,t,n)}var o0=1,Ff=2,tl=4,G_=o0|Ff|tl,nl=null;function W_(e){nl!==null&&c("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."),nl=e}function Y_(){nl===null&&c("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."),nl=null}function q_(e){return e===nl}function Lf(e){var t=e.target||e.srcElement||window;return t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===Oi?t.parentNode:t}var Uf=null,La=null,Ua=null;function a0(e){var t=_o(e);if(t){if(typeof Uf!="function")throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");var n=t.stateNode;if(n){var r=Bc(n);Uf(t.stateNode,t.type,r)}}}function X_(e){Uf=e}function s0(e){La?Ua?Ua.push(e):Ua=[e]:La=e}function $_(){return La!==null||Ua!==null}function l0(){if(La){var e=La,t=Ua;if(La=null,Ua=null,a0(e),t)for(var n=0;n<t.length;n++)a0(t[n])}}var u0=function(e,t){return e(t)},c0=function(){},Bf=!1;function K_(){var e=$_();e&&(c0(),l0())}function d0(e,t,n){if(Bf)return e(t,n);Bf=!0;try{return u0(e,t,n)}finally{Bf=!1,K_()}}function Q_(e,t,n){u0=e,c0=n}function Z_(e){return e==="button"||e==="input"||e==="select"||e==="textarea"}function J_(e,t,n){switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":return!!(n.disabled&&Z_(t));default:return!1}}function rl(e,t){var n=e.stateNode;if(n===null)return null;var r=Bc(n);if(r===null)return null;var a=r[t];if(J_(t,e.type,r))return null;if(a&&typeof a!="function")throw new Error("Expected `"+t+"` listener to be a function, instead got a value of `"+typeof a+"` type.");return a}var Vf=!1;if(Wt)try{var il={};Object.defineProperty(il,"passive",{get:function(){Vf=!0}}),window.addEventListener("test",il,il),window.removeEventListener("test",il,il)}catch{Vf=!1}function f0(e,t,n,r,a,u,f,g,x){var E=Array.prototype.slice.call(arguments,3);try{t.apply(n,E)}catch(k){this.onError(k)}}var m0=f0;if(typeof window<"u"&&typeof window.dispatchEvent=="function"&&typeof document<"u"&&typeof document.createEvent=="function"){var If=document.createElement("react");m0=function(t,n,r,a,u,f,g,x,E){if(typeof document>"u"||document===null)throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");var k=document.createEvent("Event"),P=!1,M=!0,L=window.event,V=Object.getOwnPropertyDescriptor(window,"event");function G(){If.removeEventListener(W,Ee,!1),typeof window.event<"u"&&window.hasOwnProperty("event")&&(window.event=L)}var de=Array.prototype.slice.call(arguments,3);function Ee(){P=!0,G(),n.apply(r,de),M=!1}var be,Je=!1,qe=!1;function A(O){if(be=O.error,Je=!0,be===null&&O.colno===0&&O.lineno===0&&(qe=!0),O.defaultPrevented&&be!=null&&typeof be=="object")try{be._suppressLogging=!0}catch{}}var W="react-"+(t||"invokeguardedcallback");if(window.addEventListener("error",A),If.addEventListener(W,Ee,!1),k.initEvent(W,!1,!1),If.dispatchEvent(k),V&&Object.defineProperty(window,"event",V),P&&M&&(Je?qe&&(be=new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")):be=new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`),this.onError(be)),window.removeEventListener("error",A),!P)return G(),f0.apply(this,arguments)}}var ew=m0,Ba=!1,rc=null,ic=!1,jf=null,tw={onError:function(e){Ba=!0,rc=e}};function Hf(e,t,n,r,a,u,f,g,x){Ba=!1,rc=null,ew.apply(tw,arguments)}function nw(e,t,n,r,a,u,f,g,x){if(Hf.apply(this,arguments),Ba){var E=Gf();ic||(ic=!0,jf=E)}}function rw(){if(ic){var e=jf;throw ic=!1,jf=null,e}}function iw(){return Ba}function Gf(){if(Ba){var e=rc;return Ba=!1,rc=null,e}else throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.")}function Va(e){return e._reactInternals}function ow(e){return e._reactInternals!==void 0}function aw(e,t){e._reactInternals=t}var De=0,Ia=1,qt=2,tt=4,Qo=16,ol=32,Wf=64,lt=128,Li=256,ho=512,Zo=1024,qr=2048,Ui=4096,Jo=8192,oc=16384,sw=qr|tt|Wf|ho|Zo|oc,lw=32767,al=32768,Bn=65536,Yf=131072,h0=1048576,qf=2097152,ea=4194304,Xf=8388608,Bi=16777216,ac=33554432,$f=tt|Zo|0,Kf=qt|tt|Qo|ol|ho|Ui|Jo,sl=tt|Wf|ho|Jo,ja=qr|Qo,Vi=ea|Xf|qf,uw=i.ReactCurrentOwner;function ta(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{var r=t;do t=r,(t.flags&(qt|Ui))!==De&&(n=t.return),r=t.return;while(r)}return t.tag===S?n:null}function p0(e){if(e.tag===I){var t=e.memoizedState;if(t===null){var n=e.alternate;n!==null&&(t=n.memoizedState)}if(t!==null)return t.dehydrated}return null}function v0(e){return e.tag===S?e.stateNode.containerInfo:null}function cw(e){return ta(e)===e}function dw(e){{var t=uw.current;if(t!==null&&t.tag===p){var n=t,r=n.stateNode;r._warnedAboutRefsInRender||c("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",Be(n)||"A component"),r._warnedAboutRefsInRender=!0}}var a=Va(e);return a?ta(a)===a:!1}function g0(e){if(ta(e)!==e)throw new Error("Unable to find node on an unmounted component.")}function y0(e){var t=e.alternate;if(!t){var n=ta(e);if(n===null)throw new Error("Unable to find node on an unmounted component.");return n!==e?null:e}for(var r=e,a=t;;){var u=r.return;if(u===null)break;var f=u.alternate;if(f===null){var g=u.return;if(g!==null){r=a=g;continue}break}if(u.child===f.child){for(var x=u.child;x;){if(x===r)return g0(u),e;if(x===a)return g0(u),t;x=x.sibling}throw new Error("Unable to find node on an unmounted component.")}if(r.return!==a.return)r=u,a=f;else{for(var E=!1,k=u.child;k;){if(k===r){E=!0,r=u,a=f;break}if(k===a){E=!0,a=u,r=f;break}k=k.sibling}if(!E){for(k=f.child;k;){if(k===r){E=!0,r=f,a=u;break}if(k===a){E=!0,a=f,r=u;break}k=k.sibling}if(!E)throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.")}}if(r.alternate!==a)throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.")}if(r.tag!==S)throw new Error("Unable to find node on an unmounted component.");return r.stateNode.current===r?e:t}function x0(e){var t=y0(e);return t!==null?b0(t):null}function b0(e){if(e.tag===C||e.tag===D)return e;for(var t=e.child;t!==null;){var n=b0(t);if(n!==null)return n;t=t.sibling}return null}function fw(e){var t=y0(e);return t!==null?_0(t):null}function _0(e){if(e.tag===C||e.tag===D)return e;for(var t=e.child;t!==null;){if(t.tag!==T){var n=_0(t);if(n!==null)return n}t=t.sibling}return null}var w0=l.unstable_scheduleCallback,mw=l.unstable_cancelCallback,hw=l.unstable_shouldYield,pw=l.unstable_requestPaint,cn=l.unstable_now,vw=l.unstable_getCurrentPriorityLevel,sc=l.unstable_ImmediatePriority,Qf=l.unstable_UserBlockingPriority,na=l.unstable_NormalPriority,gw=l.unstable_LowPriority,Zf=l.unstable_IdlePriority,yw=l.unstable_yieldValue,xw=l.unstable_setDisableYieldValue,Ha=null,Mn=null,he=null,hi=!1,Xr=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u";function bw(e){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u")return!1;var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled)return!0;if(!t.supportsFiber)return c("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"),!0;try{ci&&(e=Xe({},e,{getLaneLabelMap:Tw,injectProfilingHooks:Cw})),Ha=t.inject(e),Mn=t}catch(n){c("React instrumentation encountered an error: %s.",n)}return!!t.checkDCE}function _w(e,t){if(Mn&&typeof Mn.onScheduleFiberRoot=="function")try{Mn.onScheduleFiberRoot(Ha,e,t)}catch(n){hi||(hi=!0,c("React instrumentation encountered an error: %s",n))}}function ww(e,t){if(Mn&&typeof Mn.onCommitFiberRoot=="function")try{var n=(e.current.flags&lt)===lt;if(Vr){var r;switch(t){case hr:r=sc;break;case ji:r=Qf;break;case Hi:r=na;break;case hc:r=Zf;break;default:r=na;break}Mn.onCommitFiberRoot(Ha,e,r,n)}}catch(a){hi||(hi=!0,c("React instrumentation encountered an error: %s",a))}}function Sw(e){if(Mn&&typeof Mn.onPostCommitFiberRoot=="function")try{Mn.onPostCommitFiberRoot(Ha,e)}catch(t){hi||(hi=!0,c("React instrumentation encountered an error: %s",t))}}function Ew(e){if(Mn&&typeof Mn.onCommitFiberUnmount=="function")try{Mn.onCommitFiberUnmount(Ha,e)}catch(t){hi||(hi=!0,c("React instrumentation encountered an error: %s",t))}}function dn(e){if(typeof yw=="function"&&(xw(e),s(e)),Mn&&typeof Mn.setStrictMode=="function")try{Mn.setStrictMode(Ha,e)}catch(t){hi||(hi=!0,c("React instrumentation encountered an error: %s",t))}}function Cw(e){he=e}function Tw(){{for(var e=new Map,t=1,n=0;n<em;n++){var r=Yw(t);e.set(t,r),t*=2}return e}}function kw(e){he!==null&&typeof he.markCommitStarted=="function"&&he.markCommitStarted(e)}function S0(){he!==null&&typeof he.markCommitStopped=="function"&&he.markCommitStopped()}function ll(e){he!==null&&typeof he.markComponentRenderStarted=="function"&&he.markComponentRenderStarted(e)}function Ga(){he!==null&&typeof he.markComponentRenderStopped=="function"&&he.markComponentRenderStopped()}function Nw(e){he!==null&&typeof he.markComponentPassiveEffectMountStarted=="function"&&he.markComponentPassiveEffectMountStarted(e)}function Rw(){he!==null&&typeof he.markComponentPassiveEffectMountStopped=="function"&&he.markComponentPassiveEffectMountStopped()}function Dw(e){he!==null&&typeof he.markComponentPassiveEffectUnmountStarted=="function"&&he.markComponentPassiveEffectUnmountStarted(e)}function Mw(){he!==null&&typeof he.markComponentPassiveEffectUnmountStopped=="function"&&he.markComponentPassiveEffectUnmountStopped()}function Pw(e){he!==null&&typeof he.markComponentLayoutEffectMountStarted=="function"&&he.markComponentLayoutEffectMountStarted(e)}function zw(){he!==null&&typeof he.markComponentLayoutEffectMountStopped=="function"&&he.markComponentLayoutEffectMountStopped()}function E0(e){he!==null&&typeof he.markComponentLayoutEffectUnmountStarted=="function"&&he.markComponentLayoutEffectUnmountStarted(e)}function C0(){he!==null&&typeof he.markComponentLayoutEffectUnmountStopped=="function"&&he.markComponentLayoutEffectUnmountStopped()}function Aw(e,t,n){he!==null&&typeof he.markComponentErrored=="function"&&he.markComponentErrored(e,t,n)}function Ow(e,t,n){he!==null&&typeof he.markComponentSuspended=="function"&&he.markComponentSuspended(e,t,n)}function Fw(e){he!==null&&typeof he.markLayoutEffectsStarted=="function"&&he.markLayoutEffectsStarted(e)}function Lw(){he!==null&&typeof he.markLayoutEffectsStopped=="function"&&he.markLayoutEffectsStopped()}function Uw(e){he!==null&&typeof he.markPassiveEffectsStarted=="function"&&he.markPassiveEffectsStarted(e)}function Bw(){he!==null&&typeof he.markPassiveEffectsStopped=="function"&&he.markPassiveEffectsStopped()}function T0(e){he!==null&&typeof he.markRenderStarted=="function"&&he.markRenderStarted(e)}function Vw(){he!==null&&typeof he.markRenderYielded=="function"&&he.markRenderYielded()}function k0(){he!==null&&typeof he.markRenderStopped=="function"&&he.markRenderStopped()}function Iw(e){he!==null&&typeof he.markRenderScheduled=="function"&&he.markRenderScheduled(e)}function jw(e,t){he!==null&&typeof he.markForceUpdateScheduled=="function"&&he.markForceUpdateScheduled(e,t)}function Jf(e,t){he!==null&&typeof he.markStateUpdateScheduled=="function"&&he.markStateUpdateScheduled(e,t)}var ke=0,Qe=1,ht=2,Lt=8,pi=16,N0=Math.clz32?Math.clz32:Ww,Hw=Math.log,Gw=Math.LN2;function Ww(e){var t=e>>>0;return t===0?32:31-(Hw(t)/Gw|0)|0}var em=31,J=0,fn=0,Fe=1,Wa=2,Ii=4,ra=8,vi=16,ul=32,Ya=4194240,cl=64,tm=128,nm=256,rm=512,im=1024,om=2048,am=4096,sm=8192,lm=16384,um=32768,cm=65536,dm=131072,fm=262144,mm=524288,hm=1048576,pm=2097152,lc=130023424,qa=4194304,vm=8388608,gm=16777216,ym=33554432,xm=67108864,R0=qa,dl=134217728,D0=268435455,fl=268435456,ia=536870912,fr=1073741824;function Yw(e){{if(e&Fe)return"Sync";if(e&Wa)return"InputContinuousHydration";if(e&Ii)return"InputContinuous";if(e&ra)return"DefaultHydration";if(e&vi)return"Default";if(e&ul)return"TransitionHydration";if(e&Ya)return"Transition";if(e&lc)return"Retry";if(e&dl)return"SelectiveHydration";if(e&fl)return"IdleHydration";if(e&ia)return"Idle";if(e&fr)return"Offscreen"}}var St=-1,uc=cl,cc=qa;function ml(e){switch(oa(e)){case Fe:return Fe;case Wa:return Wa;case Ii:return Ii;case ra:return ra;case vi:return vi;case ul:return ul;case cl:case tm:case nm:case rm:case im:case om:case am:case sm:case lm:case um:case cm:case dm:case fm:case mm:case hm:case pm:return e&Ya;case qa:case vm:case gm:case ym:case xm:return e&lc;case dl:return dl;case fl:return fl;case ia:return ia;case fr:return fr;default:return c("Should have found matching lanes. This is a bug in React."),e}}function dc(e,t){var n=e.pendingLanes;if(n===J)return J;var r=J,a=e.suspendedLanes,u=e.pingedLanes,f=n&D0;if(f!==J){var g=f&~a;if(g!==J)r=ml(g);else{var x=f&u;x!==J&&(r=ml(x))}}else{var E=n&~a;E!==J?r=ml(E):u!==J&&(r=ml(u))}if(r===J)return J;if(t!==J&&t!==r&&(t&a)===J){var k=oa(r),P=oa(t);if(k>=P||k===vi&&(P&Ya)!==J)return t}(r&Ii)!==J&&(r|=n&vi);var M=e.entangledLanes;if(M!==J)for(var L=e.entanglements,V=r&M;V>0;){var G=aa(V),de=1<<G;r|=L[G],V&=~de}return r}function qw(e,t){for(var n=e.eventTimes,r=St;t>0;){var a=aa(t),u=1<<a,f=n[a];f>r&&(r=f),t&=~u}return r}function Xw(e,t){switch(e){case Fe:case Wa:case Ii:return t+250;case ra:case vi:case ul:case cl:case tm:case nm:case rm:case im:case om:case am:case sm:case lm:case um:case cm:case dm:case fm:case mm:case hm:case pm:return t+5e3;case qa:case vm:case gm:case ym:case xm:return St;case dl:case fl:case ia:case fr:return St;default:return c("Should have found matching lanes. This is a bug in React."),St}}function $w(e,t){for(var n=e.pendingLanes,r=e.suspendedLanes,a=e.pingedLanes,u=e.expirationTimes,f=n;f>0;){var g=aa(f),x=1<<g,E=u[g];E===St?((x&r)===J||(x&a)!==J)&&(u[g]=Xw(x,t)):E<=t&&(e.expiredLanes|=x),f&=~x}}function Kw(e){return ml(e.pendingLanes)}function bm(e){var t=e.pendingLanes&~fr;return t!==J?t:t&fr?fr:J}function Qw(e){return(e&Fe)!==J}function _m(e){return(e&D0)!==J}function M0(e){return(e&lc)===e}function Zw(e){var t=Fe|Ii|vi;return(e&t)===J}function Jw(e){return(e&Ya)===e}function fc(e,t){var n=Wa|Ii|ra|vi;return(t&n)!==J}function eS(e,t){return(t&e.expiredLanes)!==J}function P0(e){return(e&Ya)!==J}function z0(){var e=uc;return uc<<=1,(uc&Ya)===J&&(uc=cl),e}function tS(){var e=cc;return cc<<=1,(cc&lc)===J&&(cc=qa),e}function oa(e){return e&-e}function hl(e){return oa(e)}function aa(e){return 31-N0(e)}function wm(e){return aa(e)}function mr(e,t){return(e&t)!==J}function Xa(e,t){return(e&t)===t}function Ie(e,t){return e|t}function mc(e,t){return e&~t}function A0(e,t){return e&t}function xA(e){return e}function nS(e,t){return e!==fn&&e<t?e:t}function Sm(e){for(var t=[],n=0;n<em;n++)t.push(e);return t}function pl(e,t,n){e.pendingLanes|=t,t!==ia&&(e.suspendedLanes=J,e.pingedLanes=J);var r=e.eventTimes,a=wm(t);r[a]=n}function rS(e,t){e.suspendedLanes|=t,e.pingedLanes&=~t;for(var n=e.expirationTimes,r=t;r>0;){var a=aa(r),u=1<<a;n[a]=St,r&=~u}}function O0(e,t,n){e.pingedLanes|=e.suspendedLanes&t}function iS(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=J,e.pingedLanes=J,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t;for(var r=e.entanglements,a=e.eventTimes,u=e.expirationTimes,f=n;f>0;){var g=aa(f),x=1<<g;r[g]=J,a[g]=St,u[g]=St,f&=~x}}function Em(e,t){for(var n=e.entangledLanes|=t,r=e.entanglements,a=n;a;){var u=aa(a),f=1<<u;f&t|r[u]&t&&(r[u]|=t),a&=~f}}function oS(e,t){var n=oa(t),r;switch(n){case Ii:r=Wa;break;case vi:r=ra;break;case cl:case tm:case nm:case rm:case im:case om:case am:case sm:case lm:case um:case cm:case dm:case fm:case mm:case hm:case pm:case qa:case vm:case gm:case ym:case xm:r=ul;break;case ia:r=fl;break;default:r=fn;break}return(r&(e.suspendedLanes|t))!==fn?fn:r}function F0(e,t,n){if(Xr)for(var r=e.pendingUpdatersLaneMap;n>0;){var a=wm(n),u=1<<a,f=r[a];f.add(t),n&=~u}}function L0(e,t){if(Xr)for(var n=e.pendingUpdatersLaneMap,r=e.memoizedUpdaters;t>0;){var a=wm(t),u=1<<a,f=n[a];f.size>0&&(f.forEach(function(g){var x=g.alternate;(x===null||!r.has(x))&&r.add(g)}),f.clear()),t&=~u}}function U0(e,t){return null}var hr=Fe,ji=Ii,Hi=vi,hc=ia,vl=fn;function $r(){return vl}function mn(e){vl=e}function aS(e,t){var n=vl;try{return vl=e,t()}finally{vl=n}}function sS(e,t){return e!==0&&e<t?e:t}function lS(e,t){return e>t?e:t}function Cm(e,t){return e!==0&&e<t}function B0(e){var t=oa(e);return Cm(hr,t)?Cm(ji,t)?_m(t)?Hi:hc:ji:hr}function pc(e){var t=e.current.memoizedState;return t.isDehydrated}var V0;function uS(e){V0=e}function cS(e){V0(e)}var Tm;function dS(e){Tm=e}var I0;function fS(e){I0=e}var j0;function mS(e){j0=e}var H0;function hS(e){H0=e}var km=!1,vc=[],po=null,vo=null,go=null,gl=new Map,yl=new Map,yo=[],pS=["mousedown","mouseup","touchcancel","touchend","touchstart","auxclick","dblclick","pointercancel","pointerdown","pointerup","dragend","dragstart","drop","compositionend","compositionstart","keydown","keypress","keyup","input","textInput","copy","cut","paste","click","change","contextmenu","reset","submit"];function vS(e){return pS.indexOf(e)>-1}function gS(e,t,n,r,a){return{blockedOn:e,domEventName:t,eventSystemFlags:n,nativeEvent:a,targetContainers:[r]}}function G0(e,t){switch(e){case"focusin":case"focusout":po=null;break;case"dragenter":case"dragleave":vo=null;break;case"mouseover":case"mouseout":go=null;break;case"pointerover":case"pointerout":{var n=t.pointerId;gl.delete(n);break}case"gotpointercapture":case"lostpointercapture":{var r=t.pointerId;yl.delete(r);break}}}function xl(e,t,n,r,a,u){if(e===null||e.nativeEvent!==u){var f=gS(t,n,r,a,u);if(t!==null){var g=_o(t);g!==null&&Tm(g)}return f}e.eventSystemFlags|=r;var x=e.targetContainers;return a!==null&&x.indexOf(a)===-1&&x.push(a),e}function yS(e,t,n,r,a){switch(t){case"focusin":{var u=a;return po=xl(po,e,t,n,r,u),!0}case"dragenter":{var f=a;return vo=xl(vo,e,t,n,r,f),!0}case"mouseover":{var g=a;return go=xl(go,e,t,n,r,g),!0}case"pointerover":{var x=a,E=x.pointerId;return gl.set(E,xl(gl.get(E)||null,e,t,n,r,x)),!0}case"gotpointercapture":{var k=a,P=k.pointerId;return yl.set(P,xl(yl.get(P)||null,e,t,n,r,k)),!0}}return!1}function W0(e){var t=ua(e.target);if(t!==null){var n=ta(t);if(n!==null){var r=n.tag;if(r===I){var a=p0(n);if(a!==null){e.blockedOn=a,H0(e.priority,function(){I0(n)});return}}else if(r===S){var u=n.stateNode;if(pc(u)){e.blockedOn=v0(n);return}}}}e.blockedOn=null}function xS(e){for(var t=j0(),n={blockedOn:null,target:e,priority:t},r=0;r<yo.length&&Cm(t,yo[r].priority);r++);yo.splice(r,0,n),r===0&&W0(n)}function gc(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;t.length>0;){var n=t[0],r=Dm(e.domEventName,e.eventSystemFlags,n,e.nativeEvent);if(r===null){var a=e.nativeEvent,u=new a.constructor(a.type,a);W_(u),a.target.dispatchEvent(u),Y_()}else{var f=_o(r);return f!==null&&Tm(f),e.blockedOn=r,!1}t.shift()}return!0}function Y0(e,t,n){gc(e)&&n.delete(t)}function bS(){km=!1,po!==null&&gc(po)&&(po=null),vo!==null&&gc(vo)&&(vo=null),go!==null&&gc(go)&&(go=null),gl.forEach(Y0),yl.forEach(Y0)}function bl(e,t){e.blockedOn===t&&(e.blockedOn=null,km||(km=!0,l.unstable_scheduleCallback(l.unstable_NormalPriority,bS)))}function _l(e){if(vc.length>0){bl(vc[0],e);for(var t=1;t<vc.length;t++){var n=vc[t];n.blockedOn===e&&(n.blockedOn=null)}}po!==null&&bl(po,e),vo!==null&&bl(vo,e),go!==null&&bl(go,e);var r=function(g){return bl(g,e)};gl.forEach(r),yl.forEach(r);for(var a=0;a<yo.length;a++){var u=yo[a];u.blockedOn===e&&(u.blockedOn=null)}for(;yo.length>0;){var f=yo[0];if(f.blockedOn!==null)break;W0(f),f.blockedOn===null&&yo.shift()}}var $a=i.ReactCurrentBatchConfig,Nm=!0;function q0(e){Nm=!!e}function _S(){return Nm}function wS(e,t,n){var r=X0(t),a;switch(r){case hr:a=SS;break;case ji:a=ES;break;case Hi:default:a=Rm;break}return a.bind(null,t,n,e)}function SS(e,t,n,r){var a=$r(),u=$a.transition;$a.transition=null;try{mn(hr),Rm(e,t,n,r)}finally{mn(a),$a.transition=u}}function ES(e,t,n,r){var a=$r(),u=$a.transition;$a.transition=null;try{mn(ji),Rm(e,t,n,r)}finally{mn(a),$a.transition=u}}function Rm(e,t,n,r){Nm&&CS(e,t,n,r)}function CS(e,t,n,r){var a=Dm(e,t,n,r);if(a===null){Gm(e,t,r,yc,n),G0(e,r);return}if(yS(a,e,t,n,r)){r.stopPropagation();return}if(G0(e,r),t&tl&&vS(e)){for(;a!==null;){var u=_o(a);u!==null&&cS(u);var f=Dm(e,t,n,r);if(f===null&&Gm(e,t,r,yc,n),f===a)break;a=f}a!==null&&r.stopPropagation();return}Gm(e,t,r,null,n)}var yc=null;function Dm(e,t,n,r){yc=null;var a=Lf(r),u=ua(a);if(u!==null){var f=ta(u);if(f===null)u=null;else{var g=f.tag;if(g===I){var x=p0(f);if(x!==null)return x;u=null}else if(g===S){var E=f.stateNode;if(pc(E))return v0(f);u=null}else f!==u&&(u=null)}}return yc=u,null}function X0(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return hr;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return ji;case"message":{var t=vw();switch(t){case sc:return hr;case Qf:return ji;case na:case gw:return Hi;case Zf:return hc;default:return Hi}}default:return Hi}}function TS(e,t,n){return e.addEventListener(t,n,!1),n}function kS(e,t,n){return e.addEventListener(t,n,!0),n}function NS(e,t,n,r){return e.addEventListener(t,n,{capture:!0,passive:r}),n}function RS(e,t,n,r){return e.addEventListener(t,n,{passive:r}),n}var wl=null,Mm=null,Sl=null;function DS(e){return wl=e,Mm=K0(),!0}function MS(){wl=null,Mm=null,Sl=null}function $0(){if(Sl)return Sl;var e,t=Mm,n=t.length,r,a=K0(),u=a.length;for(e=0;e<n&&t[e]===a[e];e++);var f=n-e;for(r=1;r<=f&&t[n-r]===a[u-r];r++);var g=r>1?1-r:void 0;return Sl=a.slice(e,g),Sl}function K0(){return"value"in wl?wl.value:wl.textContent}function xc(e){var t,n=e.keyCode;return"charCode"in e?(t=e.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),t>=32||t===13?t:0}function bc(){return!0}function Q0(){return!1}function pr(e){function t(n,r,a,u,f){this._reactName=n,this._targetInst=a,this.type=r,this.nativeEvent=u,this.target=f,this.currentTarget=null;for(var g in e)if(e.hasOwnProperty(g)){var x=e[g];x?this[g]=x(u):this[g]=u[g]}var E=u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1;return E?this.isDefaultPrevented=bc:this.isDefaultPrevented=Q0,this.isPropagationStopped=Q0,this}return Xe(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=bc)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=bc)},persist:function(){},isPersistent:bc}),t}var Ka={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Pm=pr(Ka),El=Xe({},Ka,{view:0,detail:0}),PS=pr(El),zm,Am,Cl;function zS(e){e!==Cl&&(Cl&&e.type==="mousemove"?(zm=e.screenX-Cl.screenX,Am=e.screenY-Cl.screenY):(zm=0,Am=0),Cl=e)}var _c=Xe({},El,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Fm,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(zS(e),zm)},movementY:function(e){return"movementY"in e?e.movementY:Am}}),Z0=pr(_c),AS=Xe({},_c,{dataTransfer:0}),OS=pr(AS),FS=Xe({},El,{relatedTarget:0}),Om=pr(FS),LS=Xe({},Ka,{animationName:0,elapsedTime:0,pseudoElement:0}),US=pr(LS),BS=Xe({},Ka,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),VS=pr(BS),IS=Xe({},Ka,{data:0}),J0=pr(IS),jS=J0,HS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},GS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"};function WS(e){if(e.key){var t=HS[e.key]||e.key;if(t!=="Unidentified")return t}if(e.type==="keypress"){var n=xc(e);return n===13?"Enter":String.fromCharCode(n)}return e.type==="keydown"||e.type==="keyup"?GS[e.keyCode]||"Unidentified":""}var YS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function qS(e){var t=this,n=t.nativeEvent;if(n.getModifierState)return n.getModifierState(e);var r=YS[e];return r?!!n[r]:!1}function Fm(e){return qS}var XS=Xe({},El,{key:WS,code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Fm,charCode:function(e){return e.type==="keypress"?xc(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?xc(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),$S=pr(XS),KS=Xe({},_c,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),eg=pr(KS),QS=Xe({},El,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Fm}),ZS=pr(QS),JS=Xe({},Ka,{propertyName:0,elapsedTime:0,pseudoElement:0}),e3=pr(JS),t3=Xe({},_c,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),n3=pr(t3),r3=[9,13,27,32],tg=229,Lm=Wt&&"CompositionEvent"in window,Tl=null;Wt&&"documentMode"in document&&(Tl=document.documentMode);var i3=Wt&&"TextEvent"in window&&!Tl,ng=Wt&&(!Lm||Tl&&Tl>8&&Tl<=11),rg=32,ig=String.fromCharCode(rg);function o3(){ar("onBeforeInput",["compositionend","keypress","textInput","paste"]),ar("onCompositionEnd",["compositionend","focusout","keydown","keypress","keyup","mousedown"]),ar("onCompositionStart",["compositionstart","focusout","keydown","keypress","keyup","mousedown"]),ar("onCompositionUpdate",["compositionupdate","focusout","keydown","keypress","keyup","mousedown"])}var og=!1;function a3(e){return(e.ctrlKey||e.altKey||e.metaKey)&&!(e.ctrlKey&&e.altKey)}function s3(e){switch(e){case"compositionstart":return"onCompositionStart";case"compositionend":return"onCompositionEnd";case"compositionupdate":return"onCompositionUpdate"}}function l3(e,t){return e==="keydown"&&t.keyCode===tg}function ag(e,t){switch(e){case"keyup":return r3.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==tg;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function sg(e){var t=e.detail;return typeof t=="object"&&"data"in t?t.data:null}function lg(e){return e.locale==="ko"}var Qa=!1;function u3(e,t,n,r,a){var u,f;if(Lm?u=s3(t):Qa?ag(t,r)&&(u="onCompositionEnd"):l3(t,r)&&(u="onCompositionStart"),!u)return null;ng&&!lg(r)&&(!Qa&&u==="onCompositionStart"?Qa=DS(a):u==="onCompositionEnd"&&Qa&&(f=$0()));var g=Tc(n,u);if(g.length>0){var x=new J0(u,t,null,r,a);if(e.push({event:x,listeners:g}),f)x.data=f;else{var E=sg(r);E!==null&&(x.data=E)}}}function c3(e,t){switch(e){case"compositionend":return sg(t);case"keypress":var n=t.which;return n!==rg?null:(og=!0,ig);case"textInput":var r=t.data;return r===ig&&og?null:r;default:return null}}function d3(e,t){if(Qa){if(e==="compositionend"||!Lm&&ag(e,t)){var n=$0();return MS(),Qa=!1,n}return null}switch(e){case"paste":return null;case"keypress":if(!a3(t)){if(t.char&&t.char.length>1)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ng&&!lg(t)?null:t.data;default:return null}}function f3(e,t,n,r,a){var u;if(i3?u=c3(t,r):u=d3(t,r),!u)return null;var f=Tc(n,"onBeforeInput");if(f.length>0){var g=new jS("onBeforeInput","beforeinput",null,r,a);e.push({event:g,listeners:f}),g.data=u}}function m3(e,t,n,r,a,u,f){u3(e,t,n,r,a),f3(e,t,n,r,a)}var h3={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ug(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!h3[e.type]:t==="textarea"}/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */function p3(e){if(!Wt)return!1;var t="on"+e,n=t in document;if(!n){var r=document.createElement("div");r.setAttribute(t,"return;"),n=typeof r[t]=="function"}return n}function v3(){ar("onChange",["change","click","focusin","focusout","input","keydown","keyup","selectionchange"])}function cg(e,t,n,r){s0(r);var a=Tc(t,"onChange");if(a.length>0){var u=new Pm("onChange","change",null,n,r);e.push({event:u,listeners:a})}}var kl=null,Nl=null;function g3(e){var t=e.nodeName&&e.nodeName.toLowerCase();return t==="select"||t==="input"&&e.type==="file"}function y3(e){var t=[];cg(t,Nl,e,Lf(e)),d0(x3,t)}function x3(e){Ng(e,0)}function wc(e){var t=rs(e);if(Pa(t))return e}function b3(e,t){if(e==="change")return t}var dg=!1;Wt&&(dg=p3("input")&&(!document.documentMode||document.documentMode>9));function _3(e,t){kl=e,Nl=t,kl.attachEvent("onpropertychange",mg)}function fg(){kl&&(kl.detachEvent("onpropertychange",mg),kl=null,Nl=null)}function mg(e){e.propertyName==="value"&&wc(Nl)&&y3(e)}function w3(e,t,n){e==="focusin"?(fg(),_3(t,n)):e==="focusout"&&fg()}function S3(e,t){if(e==="selectionchange"||e==="keyup"||e==="keydown")return wc(Nl)}function E3(e){var t=e.nodeName;return t&&t.toLowerCase()==="input"&&(e.type==="checkbox"||e.type==="radio")}function C3(e,t){if(e==="click")return wc(t)}function T3(e,t){if(e==="input"||e==="change")return wc(t)}function k3(e){var t=e._wrapperState;!t||!t.controlled||e.type!=="number"||Oe(e,"number",e.value)}function N3(e,t,n,r,a,u,f){var g=n?rs(n):window,x,E;if(g3(g)?x=b3:ug(g)?dg?x=T3:(x=S3,E=w3):E3(g)&&(x=C3),x){var k=x(t,n);if(k){cg(e,k,r,a);return}}E&&E(t,g,n),t==="focusout"&&k3(g)}function R3(){sr("onMouseEnter",["mouseout","mouseover"]),sr("onMouseLeave",["mouseout","mouseover"]),sr("onPointerEnter",["pointerout","pointerover"]),sr("onPointerLeave",["pointerout","pointerover"])}function D3(e,t,n,r,a,u,f){var g=t==="mouseover"||t==="pointerover",x=t==="mouseout"||t==="pointerout";if(g&&!q_(r)){var E=r.relatedTarget||r.fromElement;if(E&&(ua(E)||Hl(E)))return}if(!(!x&&!g)){var k;if(a.window===a)k=a;else{var P=a.ownerDocument;P?k=P.defaultView||P.parentWindow:k=window}var M,L;if(x){var V=r.relatedTarget||r.toElement;if(M=n,L=V?ua(V):null,L!==null){var G=ta(L);(L!==G||L.tag!==C&&L.tag!==D)&&(L=null)}}else M=null,L=n;if(M!==L){var de=Z0,Ee="onMouseLeave",be="onMouseEnter",Je="mouse";(t==="pointerout"||t==="pointerover")&&(de=eg,Ee="onPointerLeave",be="onPointerEnter",Je="pointer");var qe=M==null?k:rs(M),A=L==null?k:rs(L),W=new de(Ee,Je+"leave",M,r,a);W.target=qe,W.relatedTarget=A;var O=null,te=ua(a);if(te===n){var ve=new de(be,Je+"enter",L,r,a);ve.target=A,ve.relatedTarget=qe,O=ve}eE(e,W,O,M,L)}}}function M3(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var vr=typeof Object.is=="function"?Object.is:M3;function Rl(e,t){if(vr(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(var a=0;a<n.length;a++){var u=n[a];if(!kn.call(t,u)||!vr(e[u],t[u]))return!1}return!0}function hg(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function P3(e){for(;e;){if(e.nextSibling)return e.nextSibling;e=e.parentNode}}function pg(e,t){for(var n=hg(e),r=0,a=0;n;){if(n.nodeType===Oi){if(a=r+n.textContent.length,r<=t&&a>=t)return{node:n,offset:t-r};r=a}n=hg(P3(n))}}function z3(e){var t=e.ownerDocument,n=t&&t.defaultView||window,r=n.getSelection&&n.getSelection();if(!r||r.rangeCount===0)return null;var a=r.anchorNode,u=r.anchorOffset,f=r.focusNode,g=r.focusOffset;try{a.nodeType,f.nodeType}catch{return null}return A3(e,a,u,f,g)}function A3(e,t,n,r,a){var u=0,f=-1,g=-1,x=0,E=0,k=e,P=null;e:for(;;){for(var M=null;k===t&&(n===0||k.nodeType===Oi)&&(f=u+n),k===r&&(a===0||k.nodeType===Oi)&&(g=u+a),k.nodeType===Oi&&(u+=k.nodeValue.length),(M=k.firstChild)!==null;)P=k,k=M;for(;;){if(k===e)break e;if(P===t&&++x===n&&(f=u),P===r&&++E===a&&(g=u),(M=k.nextSibling)!==null)break;k=P,P=k.parentNode}k=M}return f===-1||g===-1?null:{start:f,end:g}}function O3(e,t){var n=e.ownerDocument||document,r=n&&n.defaultView||window;if(r.getSelection){var a=r.getSelection(),u=e.textContent.length,f=Math.min(t.start,u),g=t.end===void 0?f:Math.min(t.end,u);if(!a.extend&&f>g){var x=g;g=f,f=x}var E=pg(e,f),k=pg(e,g);if(E&&k){if(a.rangeCount===1&&a.anchorNode===E.node&&a.anchorOffset===E.offset&&a.focusNode===k.node&&a.focusOffset===k.offset)return;var P=n.createRange();P.setStart(E.node,E.offset),a.removeAllRanges(),f>g?(a.addRange(P),a.extend(k.node,k.offset)):(P.setEnd(k.node,k.offset),a.addRange(P))}}}function vg(e){return e&&e.nodeType===Oi}function gg(e,t){return!e||!t?!1:e===t?!0:vg(e)?!1:vg(t)?gg(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1}function F3(e){return e&&e.ownerDocument&&gg(e.ownerDocument.documentElement,e)}function L3(e){try{return typeof e.contentWindow.location.href=="string"}catch{return!1}}function yg(){for(var e=window,t=fo();t instanceof e.HTMLIFrameElement;){if(L3(t))e=t.contentWindow;else return t;t=fo(e.document)}return t}function Um(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function U3(){var e=yg();return{focusedElem:e,selectionRange:Um(e)?V3(e):null}}function B3(e){var t=yg(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&F3(n)){r!==null&&Um(n)&&I3(n,r);for(var a=[],u=n;u=u.parentNode;)u.nodeType===Zn&&a.push({element:u,left:u.scrollLeft,top:u.scrollTop});typeof n.focus=="function"&&n.focus();for(var f=0;f<a.length;f++){var g=a[f];g.element.scrollLeft=g.left,g.element.scrollTop=g.top}}}function V3(e){var t;return"selectionStart"in e?t={start:e.selectionStart,end:e.selectionEnd}:t=z3(e),t||{start:0,end:0}}function I3(e,t){var n=t.start,r=t.end;r===void 0&&(r=n),"selectionStart"in e?(e.selectionStart=n,e.selectionEnd=Math.min(r,e.value.length)):O3(e,t)}var j3=Wt&&"documentMode"in document&&document.documentMode<=11;function H3(){ar("onSelect",["focusout","contextmenu","dragend","focusin","keydown","keyup","mousedown","mouseup","selectionchange"])}var Za=null,Bm=null,Dl=null,Vm=!1;function G3(e){if("selectionStart"in e&&Um(e))return{start:e.selectionStart,end:e.selectionEnd};var t=e.ownerDocument&&e.ownerDocument.defaultView||window,n=t.getSelection();return{anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}}function W3(e){return e.window===e?e.document:e.nodeType===Fi?e:e.ownerDocument}function xg(e,t,n){var r=W3(n);if(!(Vm||Za==null||Za!==fo(r))){var a=G3(Za);if(!Dl||!Rl(Dl,a)){Dl=a;var u=Tc(Bm,"onSelect");if(u.length>0){var f=new Pm("onSelect","select",null,t,n);e.push({event:f,listeners:u}),f.target=Za}}}}function Y3(e,t,n,r,a,u,f){var g=n?rs(n):window;switch(t){case"focusin":(ug(g)||g.contentEditable==="true")&&(Za=g,Bm=n,Dl=null);break;case"focusout":Za=null,Bm=null,Dl=null;break;case"mousedown":Vm=!0;break;case"contextmenu":case"mouseup":case"dragend":Vm=!1,xg(e,r,a);break;case"selectionchange":if(j3)break;case"keydown":case"keyup":xg(e,r,a)}}function Sc(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Ja={animationend:Sc("Animation","AnimationEnd"),animationiteration:Sc("Animation","AnimationIteration"),animationstart:Sc("Animation","AnimationStart"),transitionend:Sc("Transition","TransitionEnd")},Im={},bg={};Wt&&(bg=document.createElement("div").style,"AnimationEvent"in window||(delete Ja.animationend.animation,delete Ja.animationiteration.animation,delete Ja.animationstart.animation),"TransitionEvent"in window||delete Ja.transitionend.transition);function Ec(e){if(Im[e])return Im[e];if(!Ja[e])return e;var t=Ja[e];for(var n in t)if(t.hasOwnProperty(n)&&n in bg)return Im[e]=t[n];return e}var _g=Ec("animationend"),wg=Ec("animationiteration"),Sg=Ec("animationstart"),Eg=Ec("transitionend"),Cg=new Map,Tg=["abort","auxClick","cancel","canPlay","canPlayThrough","click","close","contextMenu","copy","cut","drag","dragEnd","dragEnter","dragExit","dragLeave","dragOver","dragStart","drop","durationChange","emptied","encrypted","ended","error","gotPointerCapture","input","invalid","keyDown","keyPress","keyUp","load","loadedData","loadedMetadata","loadStart","lostPointerCapture","mouseDown","mouseMove","mouseOut","mouseOver","mouseUp","paste","pause","play","playing","pointerCancel","pointerDown","pointerMove","pointerOut","pointerOver","pointerUp","progress","rateChange","reset","resize","seeked","seeking","stalled","submit","suspend","timeUpdate","touchCancel","touchEnd","touchStart","volumeChange","scroll","toggle","touchMove","waiting","wheel"];function xo(e,t){Cg.set(e,t),ar(t,[e])}function q3(){for(var e=0;e<Tg.length;e++){var t=Tg[e],n=t.toLowerCase(),r=t[0].toUpperCase()+t.slice(1);xo(n,"on"+r)}xo(_g,"onAnimationEnd"),xo(wg,"onAnimationIteration"),xo(Sg,"onAnimationStart"),xo("dblclick","onDoubleClick"),xo("focusin","onFocus"),xo("focusout","onBlur"),xo(Eg,"onTransitionEnd")}function X3(e,t,n,r,a,u,f){var g=Cg.get(t);if(g!==void 0){var x=Pm,E=t;switch(t){case"keypress":if(xc(r)===0)return;case"keydown":case"keyup":x=$S;break;case"focusin":E="focus",x=Om;break;case"focusout":E="blur",x=Om;break;case"beforeblur":case"afterblur":x=Om;break;case"click":if(r.button===2)return;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=Z0;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=OS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=ZS;break;case _g:case wg:case Sg:x=US;break;case Eg:x=e3;break;case"scroll":x=PS;break;case"wheel":x=n3;break;case"copy":case"cut":case"paste":x=VS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=eg;break}var k=(u&tl)!==0;{var P=!k&&t==="scroll",M=Z3(n,g,r.type,k,P);if(M.length>0){var L=new x(g,E,null,r,a);e.push({event:L,listeners:M})}}}}q3(),R3(),v3(),H3(),o3();function $3(e,t,n,r,a,u,f){X3(e,t,n,r,a,u);var g=(u&G_)===0;g&&(D3(e,t,n,r,a),N3(e,t,n,r,a),Y3(e,t,n,r,a),m3(e,t,n,r,a))}var Ml=["abort","canplay","canplaythrough","durationchange","emptied","encrypted","ended","error","loadeddata","loadedmetadata","loadstart","pause","play","playing","progress","ratechange","resize","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],jm=new Set(["cancel","close","invalid","load","scroll","toggle"].concat(Ml));function kg(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,nw(r,t,void 0,e),e.currentTarget=null}function K3(e,t,n){var r;if(n)for(var a=t.length-1;a>=0;a--){var u=t[a],f=u.instance,g=u.currentTarget,x=u.listener;if(f!==r&&e.isPropagationStopped())return;kg(e,x,g),r=f}else for(var E=0;E<t.length;E++){var k=t[E],P=k.instance,M=k.currentTarget,L=k.listener;if(P!==r&&e.isPropagationStopped())return;kg(e,L,M),r=P}}function Ng(e,t){for(var n=(t&tl)!==0,r=0;r<e.length;r++){var a=e[r],u=a.event,f=a.listeners;K3(u,f,n)}rw()}function Q3(e,t,n,r,a){var u=Lf(n),f=[];$3(f,e,r,n,u,t),Ng(f,t)}function Dt(e,t){jm.has(e)||c('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',e);var n=!1,r=kC(t),a=tE(e);r.has(a)||(Rg(t,e,Ff,n),r.add(a))}function Hm(e,t,n){jm.has(e)&&!t&&c('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',e);var r=0;t&&(r|=tl),Rg(n,e,r,t)}var Cc="_reactListening"+Math.random().toString(36).slice(2);function Pl(e){if(!e[Cc]){e[Cc]=!0,Sr.forEach(function(n){n!=="selectionchange"&&(jm.has(n)||Hm(n,!1,e),Hm(n,!0,e))});var t=e.nodeType===Fi?e:e.ownerDocument;t!==null&&(t[Cc]||(t[Cc]=!0,Hm("selectionchange",!1,t)))}}function Rg(e,t,n,r,a){var u=wS(e,t,n),f=void 0;Vf&&(t==="touchstart"||t==="touchmove"||t==="wheel")&&(f=!0),e=e,r?f!==void 0?NS(e,t,u,f):kS(e,t,u):f!==void 0?RS(e,t,u,f):TS(e,t,u)}function Dg(e,t){return e===t||e.nodeType===Yt&&e.parentNode===t}function Gm(e,t,n,r,a){var u=r;if(!(t&o0)&&!(t&Ff)){var f=a;if(r!==null){var g=r;e:for(;;){if(g===null)return;var x=g.tag;if(x===S||x===T){var E=g.stateNode.containerInfo;if(Dg(E,f))break;if(x===T)for(var k=g.return;k!==null;){var P=k.tag;if(P===S||P===T){var M=k.stateNode.containerInfo;if(Dg(M,f))return}k=k.return}for(;E!==null;){var L=ua(E);if(L===null)return;var V=L.tag;if(V===C||V===D){g=u=L;continue e}E=E.parentNode}}g=g.return}}}d0(function(){return Q3(e,t,n,u)})}function zl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Z3(e,t,n,r,a,u){for(var f=t!==null?t+"Capture":null,g=r?f:t,x=[],E=e,k=null;E!==null;){var P=E,M=P.stateNode,L=P.tag;if(L===C&&M!==null&&(k=M,g!==null)){var V=rl(E,g);V!=null&&x.push(zl(E,V,k))}if(a)break;E=E.return}return x}function Tc(e,t){for(var n=t+"Capture",r=[],a=e;a!==null;){var u=a,f=u.stateNode,g=u.tag;if(g===C&&f!==null){var x=f,E=rl(a,n);E!=null&&r.unshift(zl(a,E,x));var k=rl(a,t);k!=null&&r.push(zl(a,k,x))}a=a.return}return r}function es(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==C);return e||null}function J3(e,t){for(var n=e,r=t,a=0,u=n;u;u=es(u))a++;for(var f=0,g=r;g;g=es(g))f++;for(;a-f>0;)n=es(n),a--;for(;f-a>0;)r=es(r),f--;for(var x=a;x--;){if(n===r||r!==null&&n===r.alternate)return n;n=es(n),r=es(r)}return null}function Mg(e,t,n,r,a){for(var u=t._reactName,f=[],g=n;g!==null&&g!==r;){var x=g,E=x.alternate,k=x.stateNode,P=x.tag;if(E!==null&&E===r)break;if(P===C&&k!==null){var M=k;if(a){var L=rl(g,u);L!=null&&f.unshift(zl(g,L,M))}else if(!a){var V=rl(g,u);V!=null&&f.push(zl(g,V,M))}}g=g.return}f.length!==0&&e.push({event:t,listeners:f})}function eE(e,t,n,r,a){var u=r&&a?J3(r,a):null;r!==null&&Mg(e,t,r,u,!1),a!==null&&n!==null&&Mg(e,n,a,u,!0)}function tE(e,t){return e+"__bubble"}var Jn=!1,Al="dangerouslySetInnerHTML",kc="suppressContentEditableWarning",bo="suppressHydrationWarning",Pg="autoFocus",sa="children",la="style",Nc="__html",Wm,Rc,Ol,zg,Dc,Ag,Og;Wm={dialog:!0,webview:!0},Rc=function(e,t){L_(e,t),U_(e,t),H_(e,t,{registrationNameDependencies:vn,possibleRegistrationNames:Xn})},Ag=Wt&&!document.documentMode,Ol=function(e,t,n){if(!Jn){var r=Mc(n),a=Mc(t);a!==r&&(Jn=!0,c("Prop `%s` did not match. Server: %s Client: %s",e,JSON.stringify(a),JSON.stringify(r)))}},zg=function(e){if(!Jn){Jn=!0;var t=[];e.forEach(function(n){t.push(n)}),c("Extra attributes from the server: %s",t)}},Dc=function(e,t){t===!1?c("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",e,e,e):c("Expected `%s` listener to be a function, instead got a value of `%s` type.",e,typeof t)},Og=function(e,t){var n=e.namespaceURI===Ai?e.ownerDocument.createElement(e.tagName):e.ownerDocument.createElementNS(e.namespaceURI,e.tagName);return n.innerHTML=t,n.innerHTML};var nE=/\r\n?/g,rE=/\u0000|\uFFFD/g;function Mc(e){Cr(e);var t=typeof e=="string"?e:""+e;return t.replace(nE,`
`).replace(rE,"")}function Pc(e,t,n,r){var a=Mc(t),u=Mc(e);if(u!==a&&(r&&(Jn||(Jn=!0,c('Text content did not match. Server: "%s" Client: "%s"',u,a))),n&&Ne))throw new Error("Text content does not match server-rendered HTML.")}function Fg(e){return e.nodeType===Fi?e:e.ownerDocument}function iE(){}function zc(e){e.onclick=iE}function oE(e,t,n,r,a){for(var u in r)if(r.hasOwnProperty(u)){var f=r[u];if(u===la)f&&Object.freeze(f),Jv(t,f);else if(u===Al){var g=f?f[Nc]:void 0;g!=null&&Xv(t,g)}else if(u===sa)if(typeof f=="string"){var x=e!=="textarea"||f!=="";x&&tc(t,f)}else typeof f=="number"&&tc(t,""+f);else u===kc||u===bo||u===Pg||(vn.hasOwnProperty(u)?f!=null&&(typeof f!="function"&&Dc(u,f),u==="onScroll"&&Dt("scroll",t)):f!=null&&Di(t,u,f,a))}}function aE(e,t,n,r){for(var a=0;a<t.length;a+=2){var u=t[a],f=t[a+1];u===la?Jv(e,f):u===Al?Xv(e,f):u===sa?tc(e,f):Di(e,u,f,r)}}function sE(e,t,n,r){var a,u=Fg(n),f,g=r;if(g===Ai&&(g=Df(e)),g===Ai){if(a=Ko(e,t),!a&&e!==e.toLowerCase()&&c("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",e),e==="script"){var x=u.createElement("div");x.innerHTML="<script><\/script>";var E=x.firstChild;f=x.removeChild(E)}else if(typeof t.is=="string")f=u.createElement(e,{is:t.is});else if(f=u.createElement(e),e==="select"){var k=f;t.multiple?k.multiple=!0:t.size&&(k.size=t.size)}}else f=u.createElementNS(g,e);return g===Ai&&!a&&Object.prototype.toString.call(f)==="[object HTMLUnknownElement]"&&!kn.call(Wm,e)&&(Wm[e]=!0,c("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",e)),f}function lE(e,t){return Fg(t).createTextNode(e)}function uE(e,t,n,r){var a=Ko(t,n);Rc(t,n);var u;switch(t){case"dialog":Dt("cancel",e),Dt("close",e),u=n;break;case"iframe":case"object":case"embed":Dt("load",e),u=n;break;case"video":case"audio":for(var f=0;f<Ml.length;f++)Dt(Ml[f],e);u=n;break;case"source":Dt("error",e),u=n;break;case"img":case"image":case"link":Dt("error",e),Dt("load",e),u=n;break;case"details":Dt("toggle",e),u=n;break;case"input":N(e,n),u=b(e,n),Dt("invalid",e);break;case"option":_t(e,n),u=n;break;case"select":Js(e,n),u=Zs(e,n),Dt("invalid",e);break;case"textarea":Wv(e,n),u=Nf(e,n),Dt("invalid",e);break;default:u=n}switch(Of(t,u),oE(t,e,r,u,a),t){case"input":Pi(e),oe(e,n,!1);break;case"textarea":Pi(e),qv(e);break;case"option":Rt(e,n);break;case"select":kf(e,n);break;default:typeof u.onClick=="function"&&zc(e);break}}function cE(e,t,n,r,a){Rc(t,r);var u=null,f,g;switch(t){case"input":f=b(e,n),g=b(e,r),u=[];break;case"select":f=Zs(e,n),g=Zs(e,r),u=[];break;case"textarea":f=Nf(e,n),g=Nf(e,r),u=[];break;default:f=n,g=r,typeof f.onClick!="function"&&typeof g.onClick=="function"&&zc(e);break}Of(t,g);var x,E,k=null;for(x in f)if(!(g.hasOwnProperty(x)||!f.hasOwnProperty(x)||f[x]==null))if(x===la){var P=f[x];for(E in P)P.hasOwnProperty(E)&&(k||(k={}),k[E]="")}else x===Al||x===sa||x===kc||x===bo||x===Pg||(vn.hasOwnProperty(x)?u||(u=[]):(u=u||[]).push(x,null));for(x in g){var M=g[x],L=f!=null?f[x]:void 0;if(!(!g.hasOwnProperty(x)||M===L||M==null&&L==null))if(x===la)if(M&&Object.freeze(M),L){for(E in L)L.hasOwnProperty(E)&&(!M||!M.hasOwnProperty(E))&&(k||(k={}),k[E]="");for(E in M)M.hasOwnProperty(E)&&L[E]!==M[E]&&(k||(k={}),k[E]=M[E])}else k||(u||(u=[]),u.push(x,k)),k=M;else if(x===Al){var V=M?M[Nc]:void 0,G=L?L[Nc]:void 0;V!=null&&G!==V&&(u=u||[]).push(x,V)}else x===sa?(typeof M=="string"||typeof M=="number")&&(u=u||[]).push(x,""+M):x===kc||x===bo||(vn.hasOwnProperty(x)?(M!=null&&(typeof M!="function"&&Dc(x,M),x==="onScroll"&&Dt("scroll",e)),!u&&L!==M&&(u=[])):(u=u||[]).push(x,M))}return k&&(R_(k,g[la]),(u=u||[]).push(la,k)),u}function dE(e,t,n,r,a){n==="input"&&a.type==="radio"&&a.name!=null&&B(e,a);var u=Ko(n,r),f=Ko(n,a);switch(aE(e,t,u,f),n){case"input":H(e,a);break;case"textarea":Yv(e,a);break;case"select":a_(e,a);break}}function fE(e){{var t=e.toLowerCase();return nc.hasOwnProperty(t)&&nc[t]||null}}function mE(e,t,n,r,a,u,f){var g,x;switch(g=Ko(t,n),Rc(t,n),t){case"dialog":Dt("cancel",e),Dt("close",e);break;case"iframe":case"object":case"embed":Dt("load",e);break;case"video":case"audio":for(var E=0;E<Ml.length;E++)Dt(Ml[E],e);break;case"source":Dt("error",e);break;case"img":case"image":case"link":Dt("error",e),Dt("load",e);break;case"details":Dt("toggle",e);break;case"input":N(e,n),Dt("invalid",e);break;case"option":_t(e,n);break;case"select":Js(e,n),Dt("invalid",e);break;case"textarea":Wv(e,n),Dt("invalid",e);break}Of(t,n);{x=new Set;for(var k=e.attributes,P=0;P<k.length;P++){var M=k[P].name.toLowerCase();switch(M){case"value":break;case"checked":break;case"selected":break;default:x.add(k[P].name)}}}var L=null;for(var V in n)if(n.hasOwnProperty(V)){var G=n[V];if(V===sa)typeof G=="string"?e.textContent!==G&&(n[bo]!==!0&&Pc(e.textContent,G,u,f),L=[sa,G]):typeof G=="number"&&e.textContent!==""+G&&(n[bo]!==!0&&Pc(e.textContent,G,u,f),L=[sa,""+G]);else if(vn.hasOwnProperty(V))G!=null&&(typeof G!="function"&&Dc(V,G),V==="onScroll"&&Dt("scroll",e));else if(f&&typeof g=="boolean"){var de=void 0,Ee=g&&pn?null:cr(V);if(n[bo]!==!0){if(!(V===kc||V===bo||V==="value"||V==="checked"||V==="selected")){if(V===Al){var be=e.innerHTML,Je=G?G[Nc]:void 0;if(Je!=null){var qe=Og(e,Je);qe!==be&&Ol(V,be,qe)}}else if(V===la){if(x.delete(V),Ag){var A=k_(G);de=e.getAttribute("style"),A!==de&&Ol(V,de,A)}}else if(g&&!pn)x.delete(V.toLowerCase()),de=io(e,V,G),G!==de&&Ol(V,de,G);else if(!jt(V,Ee,g)&&!xt(V,G,Ee,g)){var W=!1;if(Ee!==null)x.delete(Ee.attributeName),de=Ri(e,V,G,Ee);else{var O=r;if(O===Ai&&(O=Df(t)),O===Ai)x.delete(V.toLowerCase());else{var te=fE(V);te!==null&&te!==V&&(W=!0,x.delete(te)),x.delete(V)}de=io(e,V,G)}var ve=pn;!ve&&G!==de&&!W&&Ol(V,de,G)}}}}}switch(f&&x.size>0&&n[bo]!==!0&&zg(x),t){case"input":Pi(e),oe(e,n,!0);break;case"textarea":Pi(e),qv(e);break;case"select":case"option":break;default:typeof n.onClick=="function"&&zc(e);break}return L}function hE(e,t,n){var r=e.nodeValue!==t;return r}function Ym(e,t){{if(Jn)return;Jn=!0,c("Did not expect server HTML to contain a <%s> in <%s>.",t.nodeName.toLowerCase(),e.nodeName.toLowerCase())}}function qm(e,t){{if(Jn)return;Jn=!0,c('Did not expect server HTML to contain the text node "%s" in <%s>.',t.nodeValue,e.nodeName.toLowerCase())}}function Xm(e,t,n){{if(Jn)return;Jn=!0,c("Expected server HTML to contain a matching <%s> in <%s>.",t,e.nodeName.toLowerCase())}}function $m(e,t){{if(t===""||Jn)return;Jn=!0,c('Expected server HTML to contain a matching text node for "%s" in <%s>.',t,e.nodeName.toLowerCase())}}function pE(e,t,n){switch(t){case"input":Me(e,n);return;case"textarea":l_(e,n);return;case"select":s_(e,n);return}}var Fl=function(){},Ll=function(){};{var vE=["address","applet","area","article","aside","base","basefont","bgsound","blockquote","body","br","button","caption","center","col","colgroup","dd","details","dir","div","dl","dt","embed","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","iframe","img","input","isindex","li","link","listing","main","marquee","menu","menuitem","meta","nav","noembed","noframes","noscript","object","ol","p","param","plaintext","pre","script","section","select","source","style","summary","table","tbody","td","template","textarea","tfoot","th","thead","title","tr","track","ul","wbr","xmp"],Lg=["applet","caption","html","table","td","th","marquee","object","template","foreignObject","desc","title"],gE=Lg.concat(["button"]),yE=["dd","dt","li","option","optgroup","p","rp","rt"],Ug={current:null,formTag:null,aTagInScope:null,buttonTagInScope:null,nobrTagInScope:null,pTagInButtonScope:null,listItemTagAutoclosing:null,dlItemTagAutoclosing:null};Ll=function(e,t){var n=Xe({},e||Ug),r={tag:t};return Lg.indexOf(t)!==-1&&(n.aTagInScope=null,n.buttonTagInScope=null,n.nobrTagInScope=null),gE.indexOf(t)!==-1&&(n.pTagInButtonScope=null),vE.indexOf(t)!==-1&&t!=="address"&&t!=="div"&&t!=="p"&&(n.listItemTagAutoclosing=null,n.dlItemTagAutoclosing=null),n.current=r,t==="form"&&(n.formTag=r),t==="a"&&(n.aTagInScope=r),t==="button"&&(n.buttonTagInScope=r),t==="nobr"&&(n.nobrTagInScope=r),t==="p"&&(n.pTagInButtonScope=r),t==="li"&&(n.listItemTagAutoclosing=r),(t==="dd"||t==="dt")&&(n.dlItemTagAutoclosing=r),n};var xE=function(e,t){switch(t){case"select":return e==="option"||e==="optgroup"||e==="#text";case"optgroup":return e==="option"||e==="#text";case"option":return e==="#text";case"tr":return e==="th"||e==="td"||e==="style"||e==="script"||e==="template";case"tbody":case"thead":case"tfoot":return e==="tr"||e==="style"||e==="script"||e==="template";case"colgroup":return e==="col"||e==="template";case"table":return e==="caption"||e==="colgroup"||e==="tbody"||e==="tfoot"||e==="thead"||e==="style"||e==="script"||e==="template";case"head":return e==="base"||e==="basefont"||e==="bgsound"||e==="link"||e==="meta"||e==="title"||e==="noscript"||e==="noframes"||e==="style"||e==="script"||e==="template";case"html":return e==="head"||e==="body"||e==="frameset";case"frameset":return e==="frame";case"#document":return e==="html"}switch(e){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return t!=="h1"&&t!=="h2"&&t!=="h3"&&t!=="h4"&&t!=="h5"&&t!=="h6";case"rp":case"rt":return yE.indexOf(t)===-1;case"body":case"caption":case"col":case"colgroup":case"frameset":case"frame":case"head":case"html":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":return t==null}return!0},bE=function(e,t){switch(e){case"address":case"article":case"aside":case"blockquote":case"center":case"details":case"dialog":case"dir":case"div":case"dl":case"fieldset":case"figcaption":case"figure":case"footer":case"header":case"hgroup":case"main":case"menu":case"nav":case"ol":case"p":case"section":case"summary":case"ul":case"pre":case"listing":case"table":case"hr":case"xmp":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return t.pTagInButtonScope;case"form":return t.formTag||t.pTagInButtonScope;case"li":return t.listItemTagAutoclosing;case"dd":case"dt":return t.dlItemTagAutoclosing;case"button":return t.buttonTagInScope;case"a":return t.aTagInScope;case"nobr":return t.nobrTagInScope}return null},Bg={};Fl=function(e,t,n){n=n||Ug;var r=n.current,a=r&&r.tag;t!=null&&(e!=null&&c("validateDOMNesting: when childText is passed, childTag should be null"),e="#text");var u=xE(e,a)?null:r,f=u?null:bE(e,n),g=u||f;if(g){var x=g.tag,E=!!u+"|"+e+"|"+x;if(!Bg[E]){Bg[E]=!0;var k=e,P="";if(e==="#text"?/\S/.test(t)?k="Text nodes":(k="Whitespace text nodes",P=" Make sure you don't have any extra whitespace between tags on each line of your source code."):k="<"+e+">",u){var M="";x==="table"&&e==="tr"&&(M+=" Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."),c("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s",k,x,P,M)}else c("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.",k,x)}}}}var Ac="suppressHydrationWarning",Oc="$",Fc="/$",Ul="$?",Bl="$!",_E="style",Km=null,Qm=null;function wE(e){var t,n,r=e.nodeType;switch(r){case Fi:case Pf:{t=r===Fi?"#document":"#fragment";var a=e.documentElement;n=a?a.namespaceURI:Mf(null,"");break}default:{var u=r===Yt?e.parentNode:e,f=u.namespaceURI||null;t=u.tagName,n=Mf(f,t);break}}{var g=t.toLowerCase(),x=Ll(null,g);return{namespace:n,ancestorInfo:x}}}function SE(e,t,n){{var r=e,a=Mf(r.namespace,t),u=Ll(r.ancestorInfo,t);return{namespace:a,ancestorInfo:u}}}function bA(e){return e}function EE(e){Km=_S(),Qm=U3();var t=null;return q0(!1),t}function CE(e){B3(Qm),q0(Km),Km=null,Qm=null}function TE(e,t,n,r,a){var u;{var f=r;if(Fl(e,null,f.ancestorInfo),typeof t.children=="string"||typeof t.children=="number"){var g=""+t.children,x=Ll(f.ancestorInfo,e);Fl(null,g,x)}u=f.namespace}var E=sE(e,t,n,u);return jl(a,E),oh(E,t),E}function kE(e,t){e.appendChild(t)}function NE(e,t,n,r,a){switch(uE(e,t,n,r),t){case"button":case"input":case"select":case"textarea":return!!n.autoFocus;case"img":return!0;default:return!1}}function RE(e,t,n,r,a,u){{var f=u;if(typeof r.children!=typeof n.children&&(typeof r.children=="string"||typeof r.children=="number")){var g=""+r.children,x=Ll(f.ancestorInfo,t);Fl(null,g,x)}}return cE(e,t,n,r)}function Zm(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}function DE(e,t,n,r){{var a=n;Fl(null,e,a.ancestorInfo)}var u=lE(e,t);return jl(r,u),u}function ME(){var e=window.event;return e===void 0?Hi:X0(e.type)}var Jm=typeof setTimeout=="function"?setTimeout:void 0,PE=typeof clearTimeout=="function"?clearTimeout:void 0,eh=-1,Vg=typeof Promise=="function"?Promise:void 0,zE=typeof queueMicrotask=="function"?queueMicrotask:typeof Vg<"u"?function(e){return Vg.resolve(null).then(e).catch(AE)}:Jm;function AE(e){setTimeout(function(){throw e})}function OE(e,t,n,r){switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&e.focus();return;case"img":{n.src&&(e.src=n.src);return}}}function FE(e,t,n,r,a,u){dE(e,t,n,r,a),oh(e,a)}function Ig(e){tc(e,"")}function LE(e,t,n){e.nodeValue=n}function UE(e,t){e.appendChild(t)}function BE(e,t){var n;e.nodeType===Yt?(n=e.parentNode,n.insertBefore(t,e)):(n=e,n.appendChild(t));var r=e._reactRootContainer;r==null&&n.onclick===null&&zc(n)}function VE(e,t,n){e.insertBefore(t,n)}function IE(e,t,n){e.nodeType===Yt?e.parentNode.insertBefore(t,n):e.insertBefore(t,n)}function jE(e,t){e.removeChild(t)}function HE(e,t){e.nodeType===Yt?e.parentNode.removeChild(t):e.removeChild(t)}function th(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===Yt){var u=a.data;if(u===Fc)if(r===0){e.removeChild(a),_l(t);return}else r--;else(u===Oc||u===Ul||u===Bl)&&r++}n=a}while(n);_l(t)}function GE(e,t){e.nodeType===Yt?th(e.parentNode,t):e.nodeType===Zn&&th(e,t),_l(e)}function WE(e){e=e;var t=e.style;typeof t.setProperty=="function"?t.setProperty("display","none","important"):t.display="none"}function YE(e){e.nodeValue=""}function qE(e,t){e=e;var n=t[_E],r=n!=null&&n.hasOwnProperty("display")?n.display:null;e.style.display=zf("display",r)}function XE(e,t){e.nodeValue=t}function $E(e){e.nodeType===Zn?e.textContent="":e.nodeType===Fi&&e.documentElement&&e.removeChild(e.documentElement)}function KE(e,t,n){return e.nodeType!==Zn||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e}function QE(e,t){return t===""||e.nodeType!==Oi?null:e}function ZE(e){return e.nodeType!==Yt?null:e}function jg(e){return e.data===Ul}function nh(e){return e.data===Bl}function JE(e){var t=e.nextSibling&&e.nextSibling.dataset,n,r,a;return t&&(n=t.dgst,r=t.msg,a=t.stck),{message:r,digest:n,stack:a}}function eC(e,t){e._reactRetry=t}function Lc(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===Zn||t===Oi)break;if(t===Yt){var n=e.data;if(n===Oc||n===Bl||n===Ul)break;if(n===Fc)return null}}return e}function Vl(e){return Lc(e.nextSibling)}function tC(e){return Lc(e.firstChild)}function nC(e){return Lc(e.firstChild)}function rC(e){return Lc(e.nextSibling)}function iC(e,t,n,r,a,u,f){jl(u,e),oh(e,n);var g;{var x=a;g=x.namespace}var E=(u.mode&Qe)!==ke;return mE(e,t,n,g,r,E,f)}function oC(e,t,n,r){return jl(n,e),n.mode&Qe,hE(e,t)}function aC(e,t){jl(t,e)}function sC(e){for(var t=e.nextSibling,n=0;t;){if(t.nodeType===Yt){var r=t.data;if(r===Fc){if(n===0)return Vl(t);n--}else(r===Oc||r===Bl||r===Ul)&&n++}t=t.nextSibling}return null}function Hg(e){for(var t=e.previousSibling,n=0;t;){if(t.nodeType===Yt){var r=t.data;if(r===Oc||r===Bl||r===Ul){if(n===0)return t;n--}else r===Fc&&n++}t=t.previousSibling}return null}function lC(e){_l(e)}function uC(e){_l(e)}function cC(e){return e!=="head"&&e!=="body"}function dC(e,t,n,r){var a=!0;Pc(t.nodeValue,n,r,a)}function fC(e,t,n,r,a,u){if(t[Ac]!==!0){var f=!0;Pc(r.nodeValue,a,u,f)}}function mC(e,t){t.nodeType===Zn?Ym(e,t):t.nodeType===Yt||qm(e,t)}function hC(e,t){{var n=e.parentNode;n!==null&&(t.nodeType===Zn?Ym(n,t):t.nodeType===Yt||qm(n,t))}}function pC(e,t,n,r,a){(a||t[Ac]!==!0)&&(r.nodeType===Zn?Ym(n,r):r.nodeType===Yt||qm(n,r))}function vC(e,t,n){Xm(e,t)}function gC(e,t){$m(e,t)}function yC(e,t,n){{var r=e.parentNode;r!==null&&Xm(r,t)}}function xC(e,t){{var n=e.parentNode;n!==null&&$m(n,t)}}function bC(e,t,n,r,a,u){(u||t[Ac]!==!0)&&Xm(n,r)}function _C(e,t,n,r,a){(a||t[Ac]!==!0)&&$m(n,r)}function wC(e){c("An error occurred during hydration. The server HTML was replaced with client content in <%s>.",e.nodeName.toLowerCase())}function SC(e){Pl(e)}var ts=Math.random().toString(36).slice(2),ns="__reactFiber$"+ts,rh="__reactProps$"+ts,Il="__reactContainer$"+ts,ih="__reactEvents$"+ts,EC="__reactListeners$"+ts,CC="__reactHandles$"+ts;function TC(e){delete e[ns],delete e[rh],delete e[ih],delete e[EC],delete e[CC]}function jl(e,t){t[ns]=e}function Uc(e,t){t[Il]=e}function Gg(e){e[Il]=null}function Hl(e){return!!e[Il]}function ua(e){var t=e[ns];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Il]||n[ns],t){var r=t.alternate;if(t.child!==null||r!==null&&r.child!==null)for(var a=Hg(e);a!==null;){var u=a[ns];if(u)return u;a=Hg(a)}return t}e=n,n=e.parentNode}return null}function _o(e){var t=e[ns]||e[Il];return t&&(t.tag===C||t.tag===D||t.tag===I||t.tag===S)?t:null}function rs(e){if(e.tag===C||e.tag===D)return e.stateNode;throw new Error("getNodeFromInstance: Invalid argument.")}function Bc(e){return e[rh]||null}function oh(e,t){e[rh]=t}function kC(e){var t=e[ih];return t===void 0&&(t=e[ih]=new Set),t}var Wg={},Yg=i.ReactDebugCurrentFrame;function Vc(e){if(e){var t=e._owner,n=lo(e.type,e._source,t?t.type:null);Yg.setExtraStackFrame(n)}else Yg.setExtraStackFrame(null)}function Kr(e,t,n,r,a){{var u=Function.call.bind(kn);for(var f in e)if(u(e,f)){var g=void 0;try{if(typeof e[f]!="function"){var x=Error((r||"React class")+": "+n+" type `"+f+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[f]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw x.name="Invariant Violation",x}g=e[f](t,f,r,n,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(E){g=E}g&&!(g instanceof Error)&&(Vc(a),c("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",r||"React class",n,f,typeof g),Vc(null)),g instanceof Error&&!(g.message in Wg)&&(Wg[g.message]=!0,Vc(a),c("Failed %s type: %s",n,g.message),Vc(null))}}}var ah=[],Ic;Ic=[];var Gi=-1;function wo(e){return{current:e}}function Pn(e,t){if(Gi<0){c("Unexpected pop.");return}t!==Ic[Gi]&&c("Unexpected Fiber popped."),e.current=ah[Gi],ah[Gi]=null,Ic[Gi]=null,Gi--}function zn(e,t,n){Gi++,ah[Gi]=e.current,Ic[Gi]=n,e.current=t}var sh;sh={};var gr={};Object.freeze(gr);var Wi=wo(gr),gi=wo(!1),lh=gr;function is(e,t,n){return n&&yi(t)?lh:Wi.current}function qg(e,t,n){{var r=e.stateNode;r.__reactInternalMemoizedUnmaskedChildContext=t,r.__reactInternalMemoizedMaskedChildContext=n}}function os(e,t){{var n=e.type,r=n.contextTypes;if(!r)return gr;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===t)return a.__reactInternalMemoizedMaskedChildContext;var u={};for(var f in r)u[f]=t[f];{var g=Be(e)||"Unknown";Kr(r,u,"context",g)}return a&&qg(e,t,u),u}}function jc(){return gi.current}function yi(e){{var t=e.childContextTypes;return t!=null}}function Hc(e){Pn(gi,e),Pn(Wi,e)}function uh(e){Pn(gi,e),Pn(Wi,e)}function Xg(e,t,n){{if(Wi.current!==gr)throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");zn(Wi,t,e),zn(gi,n,e)}}function $g(e,t,n){{var r=e.stateNode,a=t.childContextTypes;if(typeof r.getChildContext!="function"){{var u=Be(e)||"Unknown";sh[u]||(sh[u]=!0,c("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.",u,u))}return n}var f=r.getChildContext();for(var g in f)if(!(g in a))throw new Error((Be(e)||"Unknown")+'.getChildContext(): key "'+g+'" is not defined in childContextTypes.');{var x=Be(e)||"Unknown";Kr(a,f,"child context",x)}return Xe({},n,f)}}function Gc(e){{var t=e.stateNode,n=t&&t.__reactInternalMemoizedMergedChildContext||gr;return lh=Wi.current,zn(Wi,n,e),zn(gi,gi.current,e),!0}}function Kg(e,t,n){{var r=e.stateNode;if(!r)throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");if(n){var a=$g(e,t,lh);r.__reactInternalMemoizedMergedChildContext=a,Pn(gi,e),Pn(Wi,e),zn(Wi,a,e),zn(gi,n,e)}else Pn(gi,e),zn(gi,n,e)}}function NC(e){{if(!cw(e)||e.tag!==p)throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");var t=e;do{switch(t.tag){case S:return t.stateNode.context;case p:{var n=t.type;if(yi(n))return t.stateNode.__reactInternalMemoizedMergedChildContext;break}}t=t.return}while(t!==null);throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.")}}var So=0,Wc=1,Yi=null,ch=!1,dh=!1;function Qg(e){Yi===null?Yi=[e]:Yi.push(e)}function RC(e){ch=!0,Qg(e)}function Zg(){ch&&Eo()}function Eo(){if(!dh&&Yi!==null){dh=!0;var e=0,t=$r();try{var n=!0,r=Yi;for(mn(hr);e<r.length;e++){var a=r[e];do a=a(n);while(a!==null)}Yi=null,ch=!1}catch(u){throw Yi!==null&&(Yi=Yi.slice(e+1)),w0(sc,Eo),u}finally{mn(t),dh=!1}}return null}var as=[],ss=0,Yc=null,qc=0,Rr=[],Dr=0,ca=null,qi=1,Xi="";function DC(e){return fa(),(e.flags&h0)!==De}function MC(e){return fa(),qc}function PC(){var e=Xi,t=qi,n=t&~zC(t);return n.toString(32)+e}function da(e,t){fa(),as[ss++]=qc,as[ss++]=Yc,Yc=e,qc=t}function Jg(e,t,n){fa(),Rr[Dr++]=qi,Rr[Dr++]=Xi,Rr[Dr++]=ca,ca=e;var r=qi,a=Xi,u=Xc(r)-1,f=r&~(1<<u),g=n+1,x=Xc(t)+u;if(x>30){var E=u-u%5,k=(1<<E)-1,P=(f&k).toString(32),M=f>>E,L=u-E,V=Xc(t)+L,G=g<<L,de=G|M,Ee=P+a;qi=1<<V|de,Xi=Ee}else{var be=g<<u,Je=be|f,qe=a;qi=1<<x|Je,Xi=qe}}function fh(e){fa();var t=e.return;if(t!==null){var n=1,r=0;da(e,n),Jg(e,n,r)}}function Xc(e){return 32-N0(e)}function zC(e){return 1<<Xc(e)-1}function mh(e){for(;e===Yc;)Yc=as[--ss],as[ss]=null,qc=as[--ss],as[ss]=null;for(;e===ca;)ca=Rr[--Dr],Rr[Dr]=null,Xi=Rr[--Dr],Rr[Dr]=null,qi=Rr[--Dr],Rr[Dr]=null}function AC(){return fa(),ca!==null?{id:qi,overflow:Xi}:null}function OC(e,t){fa(),Rr[Dr++]=qi,Rr[Dr++]=Xi,Rr[Dr++]=ca,qi=t.id,Xi=t.overflow,ca=e}function fa(){yn()||c("Expected to be hydrating. This is a bug in React. Please file an issue.")}var gn=null,Mr=null,Qr=!1,ma=!1,Co=null;function FC(){Qr&&c("We should not be hydrating here. This is a bug in React. Please file a bug.")}function ey(){ma=!0}function LC(){return ma}function UC(e){var t=e.stateNode.containerInfo;return Mr=nC(t),gn=e,Qr=!0,Co=null,ma=!1,!0}function BC(e,t,n){return Mr=rC(t),gn=e,Qr=!0,Co=null,ma=!1,n!==null&&OC(e,n),!0}function ty(e,t){switch(e.tag){case S:{mC(e.stateNode.containerInfo,t);break}case C:{var n=(e.mode&Qe)!==ke;pC(e.type,e.memoizedProps,e.stateNode,t,n);break}case I:{var r=e.memoizedState;r.dehydrated!==null&&hC(r.dehydrated,t);break}}}function ny(e,t){ty(e,t);var n=Hk();n.stateNode=t,n.return=e;var r=e.deletions;r===null?(e.deletions=[n],e.flags|=Qo):r.push(n)}function hh(e,t){{if(ma)return;switch(e.tag){case S:{var n=e.stateNode.containerInfo;switch(t.tag){case C:var r=t.type;t.pendingProps,vC(n,r);break;case D:var a=t.pendingProps;gC(n,a);break}break}case C:{var u=e.type,f=e.memoizedProps,g=e.stateNode;switch(t.tag){case C:{var x=t.type,E=t.pendingProps,k=(e.mode&Qe)!==ke;bC(u,f,g,x,E,k);break}case D:{var P=t.pendingProps,M=(e.mode&Qe)!==ke;_C(u,f,g,P,M);break}}break}case I:{var L=e.memoizedState,V=L.dehydrated;if(V!==null)switch(t.tag){case C:var G=t.type;t.pendingProps,yC(V,G);break;case D:var de=t.pendingProps;xC(V,de);break}break}default:return}}}function ry(e,t){t.flags=t.flags&~Ui|qt,hh(e,t)}function iy(e,t){switch(e.tag){case C:{var n=e.type;e.pendingProps;var r=KE(t,n);return r!==null?(e.stateNode=r,gn=e,Mr=tC(r),!0):!1}case D:{var a=e.pendingProps,u=QE(t,a);return u!==null?(e.stateNode=u,gn=e,Mr=null,!0):!1}case I:{var f=ZE(t);if(f!==null){var g={dehydrated:f,treeContext:AC(),retryLane:fr};e.memoizedState=g;var x=Gk(f);return x.return=e,e.child=x,gn=e,Mr=null,!0}return!1}default:return!1}}function ph(e){return(e.mode&Qe)!==ke&&(e.flags&lt)===De}function vh(e){throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.")}function gh(e){if(Qr){var t=Mr;if(!t){ph(e)&&(hh(gn,e),vh()),ry(gn,e),Qr=!1,gn=e;return}var n=t;if(!iy(e,t)){ph(e)&&(hh(gn,e),vh()),t=Vl(n);var r=gn;if(!t||!iy(e,t)){ry(gn,e),Qr=!1,gn=e;return}ny(r,n)}}}function VC(e,t,n){var r=e.stateNode,a=!ma,u=iC(r,e.type,e.memoizedProps,t,n,e,a);return e.updateQueue=u,u!==null}function IC(e){var t=e.stateNode,n=e.memoizedProps,r=oC(t,n,e);if(r){var a=gn;if(a!==null)switch(a.tag){case S:{var u=a.stateNode.containerInfo,f=(a.mode&Qe)!==ke;dC(u,t,n,f);break}case C:{var g=a.type,x=a.memoizedProps,E=a.stateNode,k=(a.mode&Qe)!==ke;fC(g,x,E,t,n,k);break}}}return r}function jC(e){var t=e.memoizedState,n=t!==null?t.dehydrated:null;if(!n)throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");aC(n,e)}function HC(e){var t=e.memoizedState,n=t!==null?t.dehydrated:null;if(!n)throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");return sC(n)}function oy(e){for(var t=e.return;t!==null&&t.tag!==C&&t.tag!==S&&t.tag!==I;)t=t.return;gn=t}function $c(e){if(e!==gn)return!1;if(!Qr)return oy(e),Qr=!0,!1;if(e.tag!==S&&(e.tag!==C||cC(e.type)&&!Zm(e.type,e.memoizedProps))){var t=Mr;if(t)if(ph(e))ay(e),vh();else for(;t;)ny(e,t),t=Vl(t)}return oy(e),e.tag===I?Mr=HC(e):Mr=gn?Vl(e.stateNode):null,!0}function GC(){return Qr&&Mr!==null}function ay(e){for(var t=Mr;t;)ty(e,t),t=Vl(t)}function ls(){gn=null,Mr=null,Qr=!1,ma=!1}function sy(){Co!==null&&(ex(Co),Co=null)}function yn(){return Qr}function yh(e){Co===null?Co=[e]:Co.push(e)}var WC=i.ReactCurrentBatchConfig,YC=null;function qC(){return WC.transition}var Zr={recordUnsafeLifecycleWarnings:function(e,t){},flushPendingUnsafeLifecycleWarnings:function(){},recordLegacyContextWarning:function(e,t){},flushLegacyContextWarning:function(){},discardPendingWarnings:function(){}};{var XC=function(e){for(var t=null,n=e;n!==null;)n.mode&Lt&&(t=n),n=n.return;return t},ha=function(e){var t=[];return e.forEach(function(n){t.push(n)}),t.sort().join(", ")},Gl=[],Wl=[],Yl=[],ql=[],Xl=[],$l=[],pa=new Set;Zr.recordUnsafeLifecycleWarnings=function(e,t){pa.has(e.type)||(typeof t.componentWillMount=="function"&&t.componentWillMount.__suppressDeprecationWarning!==!0&&Gl.push(e),e.mode&Lt&&typeof t.UNSAFE_componentWillMount=="function"&&Wl.push(e),typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps.__suppressDeprecationWarning!==!0&&Yl.push(e),e.mode&Lt&&typeof t.UNSAFE_componentWillReceiveProps=="function"&&ql.push(e),typeof t.componentWillUpdate=="function"&&t.componentWillUpdate.__suppressDeprecationWarning!==!0&&Xl.push(e),e.mode&Lt&&typeof t.UNSAFE_componentWillUpdate=="function"&&$l.push(e))},Zr.flushPendingUnsafeLifecycleWarnings=function(){var e=new Set;Gl.length>0&&(Gl.forEach(function(M){e.add(Be(M)||"Component"),pa.add(M.type)}),Gl=[]);var t=new Set;Wl.length>0&&(Wl.forEach(function(M){t.add(Be(M)||"Component"),pa.add(M.type)}),Wl=[]);var n=new Set;Yl.length>0&&(Yl.forEach(function(M){n.add(Be(M)||"Component"),pa.add(M.type)}),Yl=[]);var r=new Set;ql.length>0&&(ql.forEach(function(M){r.add(Be(M)||"Component"),pa.add(M.type)}),ql=[]);var a=new Set;Xl.length>0&&(Xl.forEach(function(M){a.add(Be(M)||"Component"),pa.add(M.type)}),Xl=[]);var u=new Set;if($l.length>0&&($l.forEach(function(M){u.add(Be(M)||"Component"),pa.add(M.type)}),$l=[]),t.size>0){var f=ha(t);c(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,f)}if(r.size>0){var g=ha(r);c(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`,g)}if(u.size>0){var x=ha(u);c(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,x)}if(e.size>0){var E=ha(e);d(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,E)}if(n.size>0){var k=ha(n);d(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,k)}if(a.size>0){var P=ha(a);d(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,P)}};var Kc=new Map,ly=new Set;Zr.recordLegacyContextWarning=function(e,t){var n=XC(e);if(n===null){c("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");return}if(!ly.has(e.type)){var r=Kc.get(n);(e.type.contextTypes!=null||e.type.childContextTypes!=null||t!==null&&typeof t.getChildContext=="function")&&(r===void 0&&(r=[],Kc.set(n,r)),r.push(e))}},Zr.flushLegacyContextWarning=function(){Kc.forEach(function(e,t){if(e.length!==0){var n=e[0],r=new Set;e.forEach(function(u){r.add(Be(u)||"Component"),ly.add(u.type)});var a=ha(r);try{zt(n),c(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`,a)}finally{un()}}})},Zr.discardPendingWarnings=function(){Gl=[],Wl=[],Yl=[],ql=[],Xl=[],$l=[],Kc=new Map}}var xh,bh,_h,wh,Sh,uy=function(e,t){};xh=!1,bh=!1,_h={},wh={},Sh={},uy=function(e,t){if(!(e===null||typeof e!="object")&&!(!e._store||e._store.validated||e.key!=null)){if(typeof e._store!="object")throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");e._store.validated=!0;var n=Be(t)||"Component";wh[n]||(wh[n]=!0,c('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'))}};function $C(e){return e.prototype&&e.prototype.isReactComponent}function Kl(e,t,n){var r=n.ref;if(r!==null&&typeof r!="function"&&typeof r!="object"){if((e.mode&Lt||or)&&!(n._owner&&n._self&&n._owner.stateNode!==n._self)&&!(n._owner&&n._owner.tag!==p)&&!(typeof n.type=="function"&&!$C(n.type))&&n._owner){var a=Be(e)||"Component";_h[a]||(c('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',a,r),_h[a]=!0)}if(n._owner){var u=n._owner,f;if(u){var g=u;if(g.tag!==p)throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");f=g.stateNode}if(!f)throw new Error("Missing owner for string ref "+r+". This error is likely caused by a bug in React. Please file an issue.");var x=f;$n(r,"ref");var E=""+r;if(t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===E)return t.ref;var k=function(P){var M=x.refs;P===null?delete M[E]:M[E]=P};return k._stringRef=E,k}else{if(typeof r!="string")throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");if(!n._owner)throw new Error("Element ref was specified as a string ("+r+`) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`)}}return r}function Qc(e,t){var n=Object.prototype.toString.call(t);throw new Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.")}function Zc(e){{var t=Be(e)||"Component";if(Sh[t])return;Sh[t]=!0,c("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.")}}function cy(e){var t=e._payload,n=e._init;return n(t)}function dy(e){function t(A,W){if(e){var O=A.deletions;O===null?(A.deletions=[W],A.flags|=Qo):O.push(W)}}function n(A,W){if(!e)return null;for(var O=W;O!==null;)t(A,O),O=O.sibling;return null}function r(A,W){for(var O=new Map,te=W;te!==null;)te.key!==null?O.set(te.key,te):O.set(te.index,te),te=te.sibling;return O}function a(A,W){var O=Ea(A,W);return O.index=0,O.sibling=null,O}function u(A,W,O){if(A.index=O,!e)return A.flags|=h0,W;var te=A.alternate;if(te!==null){var ve=te.index;return ve<W?(A.flags|=qt,W):ve}else return A.flags|=qt,W}function f(A){return e&&A.alternate===null&&(A.flags|=qt),A}function g(A,W,O,te){if(W===null||W.tag!==D){var ve=yv(O,A.mode,te);return ve.return=A,ve}else{var fe=a(W,O);return fe.return=A,fe}}function x(A,W,O,te){var ve=O.type;if(ve===R)return k(A,W,O.props.children,te,O.key);if(W!==null&&(W.elementType===ve||vx(W,O)||typeof ve=="object"&&ve!==null&&ve.$$typeof===Ye&&cy(ve)===W.type)){var fe=a(W,O.props);return fe.ref=Kl(A,W,O),fe.return=A,fe._debugSource=O._source,fe._debugOwner=O._owner,fe}var Pe=gv(O,A.mode,te);return Pe.ref=Kl(A,W,O),Pe.return=A,Pe}function E(A,W,O,te){if(W===null||W.tag!==T||W.stateNode.containerInfo!==O.containerInfo||W.stateNode.implementation!==O.implementation){var ve=xv(O,A.mode,te);return ve.return=A,ve}else{var fe=a(W,O.children||[]);return fe.return=A,fe}}function k(A,W,O,te,ve){if(W===null||W.tag!==F){var fe=Fo(O,A.mode,te,ve);return fe.return=A,fe}else{var Pe=a(W,O);return Pe.return=A,Pe}}function P(A,W,O){if(typeof W=="string"&&W!==""||typeof W=="number"){var te=yv(""+W,A.mode,O);return te.return=A,te}if(typeof W=="object"&&W!==null){switch(W.$$typeof){case fi:{var ve=gv(W,A.mode,O);return ve.ref=Kl(A,null,W),ve.return=A,ve}case Gr:{var fe=xv(W,A.mode,O);return fe.return=A,fe}case Ye:{var Pe=W._payload,Ue=W._init;return P(A,Ue(Pe),O)}}if(st(W)||Mi(W)){var vt=Fo(W,A.mode,O,null);return vt.return=A,vt}Qc(A,W)}return typeof W=="function"&&Zc(A),null}function M(A,W,O,te){var ve=W!==null?W.key:null;if(typeof O=="string"&&O!==""||typeof O=="number")return ve!==null?null:g(A,W,""+O,te);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case fi:return O.key===ve?x(A,W,O,te):null;case Gr:return O.key===ve?E(A,W,O,te):null;case Ye:{var fe=O._payload,Pe=O._init;return M(A,W,Pe(fe),te)}}if(st(O)||Mi(O))return ve!==null?null:k(A,W,O,te,null);Qc(A,O)}return typeof O=="function"&&Zc(A),null}function L(A,W,O,te,ve){if(typeof te=="string"&&te!==""||typeof te=="number"){var fe=A.get(O)||null;return g(W,fe,""+te,ve)}if(typeof te=="object"&&te!==null){switch(te.$$typeof){case fi:{var Pe=A.get(te.key===null?O:te.key)||null;return x(W,Pe,te,ve)}case Gr:{var Ue=A.get(te.key===null?O:te.key)||null;return E(W,Ue,te,ve)}case Ye:var vt=te._payload,ot=te._init;return L(A,W,O,ot(vt),ve)}if(st(te)||Mi(te)){var Ht=A.get(O)||null;return k(W,Ht,te,ve,null)}Qc(W,te)}return typeof te=="function"&&Zc(W),null}function V(A,W,O){{if(typeof A!="object"||A===null)return W;switch(A.$$typeof){case fi:case Gr:uy(A,O);var te=A.key;if(typeof te!="string")break;if(W===null){W=new Set,W.add(te);break}if(!W.has(te)){W.add(te);break}c("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",te);break;case Ye:var ve=A._payload,fe=A._init;V(fe(ve),W,O);break}}return W}function G(A,W,O,te){for(var ve=null,fe=0;fe<O.length;fe++){var Pe=O[fe];ve=V(Pe,ve,A)}for(var Ue=null,vt=null,ot=W,Ht=0,at=0,Ut=null;ot!==null&&at<O.length;at++){ot.index>at?(Ut=ot,ot=null):Ut=ot.sibling;var On=M(A,ot,O[at],te);if(On===null){ot===null&&(ot=Ut);break}e&&ot&&On.alternate===null&&t(A,ot),Ht=u(On,Ht,at),vt===null?Ue=On:vt.sibling=On,vt=On,ot=Ut}if(at===O.length){if(n(A,ot),yn()){var Cn=at;da(A,Cn)}return Ue}if(ot===null){for(;at<O.length;at++){var xr=P(A,O[at],te);xr!==null&&(Ht=u(xr,Ht,at),vt===null?Ue=xr:vt.sibling=xr,vt=xr)}if(yn()){var Hn=at;da(A,Hn)}return Ue}for(var Gn=r(A,ot);at<O.length;at++){var Fn=L(Gn,A,at,O[at],te);Fn!==null&&(e&&Fn.alternate!==null&&Gn.delete(Fn.key===null?at:Fn.key),Ht=u(Fn,Ht,at),vt===null?Ue=Fn:vt.sibling=Fn,vt=Fn)}if(e&&Gn.forEach(function(ks){return t(A,ks)}),yn()){var to=at;da(A,to)}return Ue}function de(A,W,O,te){var ve=Mi(O);if(typeof ve!="function")throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");{typeof Symbol=="function"&&O[Symbol.toStringTag]==="Generator"&&(bh||c("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."),bh=!0),O.entries===ve&&(xh||c("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),xh=!0);var fe=ve.call(O);if(fe)for(var Pe=null,Ue=fe.next();!Ue.done;Ue=fe.next()){var vt=Ue.value;Pe=V(vt,Pe,A)}}var ot=ve.call(O);if(ot==null)throw new Error("An iterable object provided no iterator.");for(var Ht=null,at=null,Ut=W,On=0,Cn=0,xr=null,Hn=ot.next();Ut!==null&&!Hn.done;Cn++,Hn=ot.next()){Ut.index>Cn?(xr=Ut,Ut=null):xr=Ut.sibling;var Gn=M(A,Ut,Hn.value,te);if(Gn===null){Ut===null&&(Ut=xr);break}e&&Ut&&Gn.alternate===null&&t(A,Ut),On=u(Gn,On,Cn),at===null?Ht=Gn:at.sibling=Gn,at=Gn,Ut=xr}if(Hn.done){if(n(A,Ut),yn()){var Fn=Cn;da(A,Fn)}return Ht}if(Ut===null){for(;!Hn.done;Cn++,Hn=ot.next()){var to=P(A,Hn.value,te);to!==null&&(On=u(to,On,Cn),at===null?Ht=to:at.sibling=to,at=to)}if(yn()){var ks=Cn;da(A,ks)}return Ht}for(var Nu=r(A,Ut);!Hn.done;Cn++,Hn=ot.next()){var Ti=L(Nu,A,Cn,Hn.value,te);Ti!==null&&(e&&Ti.alternate!==null&&Nu.delete(Ti.key===null?Cn:Ti.key),On=u(Ti,On,Cn),at===null?Ht=Ti:at.sibling=Ti,at=Ti)}if(e&&Nu.forEach(function(_2){return t(A,_2)}),yn()){var b2=Cn;da(A,b2)}return Ht}function Ee(A,W,O,te){if(W!==null&&W.tag===D){n(A,W.sibling);var ve=a(W,O);return ve.return=A,ve}n(A,W);var fe=yv(O,A.mode,te);return fe.return=A,fe}function be(A,W,O,te){for(var ve=O.key,fe=W;fe!==null;){if(fe.key===ve){var Pe=O.type;if(Pe===R){if(fe.tag===F){n(A,fe.sibling);var Ue=a(fe,O.props.children);return Ue.return=A,Ue._debugSource=O._source,Ue._debugOwner=O._owner,Ue}}else if(fe.elementType===Pe||vx(fe,O)||typeof Pe=="object"&&Pe!==null&&Pe.$$typeof===Ye&&cy(Pe)===fe.type){n(A,fe.sibling);var vt=a(fe,O.props);return vt.ref=Kl(A,fe,O),vt.return=A,vt._debugSource=O._source,vt._debugOwner=O._owner,vt}n(A,fe);break}else t(A,fe);fe=fe.sibling}if(O.type===R){var ot=Fo(O.props.children,A.mode,te,O.key);return ot.return=A,ot}else{var Ht=gv(O,A.mode,te);return Ht.ref=Kl(A,W,O),Ht.return=A,Ht}}function Je(A,W,O,te){for(var ve=O.key,fe=W;fe!==null;){if(fe.key===ve)if(fe.tag===T&&fe.stateNode.containerInfo===O.containerInfo&&fe.stateNode.implementation===O.implementation){n(A,fe.sibling);var Pe=a(fe,O.children||[]);return Pe.return=A,Pe}else{n(A,fe);break}else t(A,fe);fe=fe.sibling}var Ue=xv(O,A.mode,te);return Ue.return=A,Ue}function qe(A,W,O,te){var ve=typeof O=="object"&&O!==null&&O.type===R&&O.key===null;if(ve&&(O=O.props.children),typeof O=="object"&&O!==null){switch(O.$$typeof){case fi:return f(be(A,W,O,te));case Gr:return f(Je(A,W,O,te));case Ye:var fe=O._payload,Pe=O._init;return qe(A,W,Pe(fe),te)}if(st(O))return G(A,W,O,te);if(Mi(O))return de(A,W,O,te);Qc(A,O)}return typeof O=="string"&&O!==""||typeof O=="number"?f(Ee(A,W,""+O,te)):(typeof O=="function"&&Zc(A),n(A,W))}return qe}var us=dy(!0),fy=dy(!1);function KC(e,t){if(e!==null&&t.child!==e.child)throw new Error("Resuming work not yet implemented.");if(t.child!==null){var n=t.child,r=Ea(n,n.pendingProps);for(t.child=r,r.return=t;n.sibling!==null;)n=n.sibling,r=r.sibling=Ea(n,n.pendingProps),r.return=t;r.sibling=null}}function QC(e,t){for(var n=e.child;n!==null;)Uk(n,t),n=n.sibling}var Eh=wo(null),Ch;Ch={};var Jc=null,cs=null,Th=null,ed=!1;function td(){Jc=null,cs=null,Th=null,ed=!1}function my(){ed=!0}function hy(){ed=!1}function py(e,t,n){zn(Eh,t._currentValue,e),t._currentValue=n,t._currentRenderer!==void 0&&t._currentRenderer!==null&&t._currentRenderer!==Ch&&c("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."),t._currentRenderer=Ch}function kh(e,t){var n=Eh.current;Pn(Eh,t),e._currentValue=n}function Nh(e,t,n){for(var r=e;r!==null;){var a=r.alternate;if(Xa(r.childLanes,t)?a!==null&&!Xa(a.childLanes,t)&&(a.childLanes=Ie(a.childLanes,t)):(r.childLanes=Ie(r.childLanes,t),a!==null&&(a.childLanes=Ie(a.childLanes,t))),r===n)break;r=r.return}r!==n&&c("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.")}function ZC(e,t,n){JC(e,t,n)}function JC(e,t,n){var r=e.child;for(r!==null&&(r.return=e);r!==null;){var a=void 0,u=r.dependencies;if(u!==null){a=r.child;for(var f=u.firstContext;f!==null;){if(f.context===t){if(r.tag===p){var g=hl(n),x=$i(St,g);x.tag=rd;var E=r.updateQueue;if(E!==null){var k=E.shared,P=k.pending;P===null?x.next=x:(x.next=P.next,P.next=x),k.pending=x}}r.lanes=Ie(r.lanes,n);var M=r.alternate;M!==null&&(M.lanes=Ie(M.lanes,n)),Nh(r.return,n,e),u.lanes=Ie(u.lanes,n);break}f=f.next}}else if(r.tag===j)a=r.type===e.type?null:r.child;else if(r.tag===se){var L=r.return;if(L===null)throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");L.lanes=Ie(L.lanes,n);var V=L.alternate;V!==null&&(V.lanes=Ie(V.lanes,n)),Nh(L,n,e),a=r.sibling}else a=r.child;if(a!==null)a.return=r;else for(a=r;a!==null;){if(a===e){a=null;break}var G=a.sibling;if(G!==null){G.return=a.return,a=G;break}a=a.return}r=a}}function ds(e,t){Jc=e,cs=null,Th=null;var n=e.dependencies;if(n!==null){var r=n.firstContext;r!==null&&(mr(n.lanes,t)&&du(),n.firstContext=null)}}function Xt(e){ed&&c("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");var t=e._currentValue;if(Th!==e){var n={context:e,memoizedValue:t,next:null};if(cs===null){if(Jc===null)throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");cs=n,Jc.dependencies={lanes:J,firstContext:n}}else cs=cs.next=n}return t}var va=null;function Rh(e){va===null?va=[e]:va.push(e)}function eT(){if(va!==null){for(var e=0;e<va.length;e++){var t=va[e],n=t.interleaved;if(n!==null){t.interleaved=null;var r=n.next,a=t.pending;if(a!==null){var u=a.next;a.next=r,n.next=u}t.pending=n}}va=null}}function vy(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,Rh(t)):(n.next=a.next,a.next=n),t.interleaved=n,nd(e,r)}function tT(e,t,n,r){var a=t.interleaved;a===null?(n.next=n,Rh(t)):(n.next=a.next,a.next=n),t.interleaved=n}function nT(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,Rh(t)):(n.next=a.next,a.next=n),t.interleaved=n,nd(e,r)}function er(e,t){return nd(e,t)}var rT=nd;function nd(e,t){e.lanes=Ie(e.lanes,t);var n=e.alternate;n!==null&&(n.lanes=Ie(n.lanes,t)),n===null&&(e.flags&(qt|Ui))!==De&&fx(e);for(var r=e,a=e.return;a!==null;)a.childLanes=Ie(a.childLanes,t),n=a.alternate,n!==null?n.childLanes=Ie(n.childLanes,t):(a.flags&(qt|Ui))!==De&&fx(e),r=a,a=a.return;if(r.tag===S){var u=r.stateNode;return u}else return null}var gy=0,yy=1,rd=2,Dh=3,id=!1,Mh,od;Mh=!1,od=null;function Ph(e){var t={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:J},effects:null};e.updateQueue=t}function xy(e,t){var n=t.updateQueue,r=e.updateQueue;if(n===r){var a={baseState:r.baseState,firstBaseUpdate:r.firstBaseUpdate,lastBaseUpdate:r.lastBaseUpdate,shared:r.shared,effects:r.effects};t.updateQueue=a}}function $i(e,t){var n={eventTime:e,lane:t,tag:gy,payload:null,callback:null,next:null};return n}function To(e,t,n){var r=e.updateQueue;if(r===null)return null;var a=r.shared;if(od===a&&!Mh&&(c("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."),Mh=!0),tk()){var u=a.pending;return u===null?t.next=t:(t.next=u.next,u.next=t),a.pending=t,rT(e,n)}else return nT(e,a,t,n)}function ad(e,t,n){var r=t.updateQueue;if(r!==null){var a=r.shared;if(P0(n)){var u=a.lanes;u=A0(u,e.pendingLanes);var f=Ie(u,n);a.lanes=f,Em(e,f)}}}function zh(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null){var a=r.updateQueue;if(n===a){var u=null,f=null,g=n.firstBaseUpdate;if(g!==null){var x=g;do{var E={eventTime:x.eventTime,lane:x.lane,tag:x.tag,payload:x.payload,callback:x.callback,next:null};f===null?u=f=E:(f.next=E,f=E),x=x.next}while(x!==null);f===null?u=f=t:(f.next=t,f=t)}else u=f=t;n={baseState:a.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:a.shared,effects:a.effects},e.updateQueue=n;return}}var k=n.lastBaseUpdate;k===null?n.firstBaseUpdate=t:k.next=t,n.lastBaseUpdate=t}function iT(e,t,n,r,a,u){switch(n.tag){case yy:{var f=n.payload;if(typeof f=="function"){my();var g=f.call(u,r,a);{if(e.mode&Lt){dn(!0);try{f.call(u,r,a)}finally{dn(!1)}}hy()}return g}return f}case Dh:e.flags=e.flags&~Bn|lt;case gy:{var x=n.payload,E;if(typeof x=="function"){my(),E=x.call(u,r,a);{if(e.mode&Lt){dn(!0);try{x.call(u,r,a)}finally{dn(!1)}}hy()}}else E=x;return E==null?r:Xe({},r,E)}case rd:return id=!0,r}return r}function sd(e,t,n,r){var a=e.updateQueue;id=!1,od=a.shared;var u=a.firstBaseUpdate,f=a.lastBaseUpdate,g=a.shared.pending;if(g!==null){a.shared.pending=null;var x=g,E=x.next;x.next=null,f===null?u=E:f.next=E,f=x;var k=e.alternate;if(k!==null){var P=k.updateQueue,M=P.lastBaseUpdate;M!==f&&(M===null?P.firstBaseUpdate=E:M.next=E,P.lastBaseUpdate=x)}}if(u!==null){var L=a.baseState,V=J,G=null,de=null,Ee=null,be=u;do{var Je=be.lane,qe=be.eventTime;if(Xa(r,Je)){if(Ee!==null){var W={eventTime:qe,lane:fn,tag:be.tag,payload:be.payload,callback:be.callback,next:null};Ee=Ee.next=W}L=iT(e,a,be,L,t,n);var O=be.callback;if(O!==null&&be.lane!==fn){e.flags|=Wf;var te=a.effects;te===null?a.effects=[be]:te.push(be)}}else{var A={eventTime:qe,lane:Je,tag:be.tag,payload:be.payload,callback:be.callback,next:null};Ee===null?(de=Ee=A,G=L):Ee=Ee.next=A,V=Ie(V,Je)}if(be=be.next,be===null){if(g=a.shared.pending,g===null)break;var ve=g,fe=ve.next;ve.next=null,be=fe,a.lastBaseUpdate=ve,a.shared.pending=null}}while(!0);Ee===null&&(G=L),a.baseState=G,a.firstBaseUpdate=de,a.lastBaseUpdate=Ee;var Pe=a.shared.interleaved;if(Pe!==null){var Ue=Pe;do V=Ie(V,Ue.lane),Ue=Ue.next;while(Ue!==Pe)}else u===null&&(a.shared.lanes=J);Su(V),e.lanes=V,e.memoizedState=L}od=null}function oT(e,t){if(typeof e!="function")throw new Error("Invalid argument passed as callback. Expected a function. Instead "+("received: "+e));e.call(t)}function by(){id=!1}function ld(){return id}function _y(e,t,n){var r=t.effects;if(t.effects=null,r!==null)for(var a=0;a<r.length;a++){var u=r[a],f=u.callback;f!==null&&(u.callback=null,oT(f,n))}}var Ql={},ko=wo(Ql),Zl=wo(Ql),ud=wo(Ql);function cd(e){if(e===Ql)throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");return e}function wy(){var e=cd(ud.current);return e}function Ah(e,t){zn(ud,t,e),zn(Zl,e,e),zn(ko,Ql,e);var n=wE(t);Pn(ko,e),zn(ko,n,e)}function fs(e){Pn(ko,e),Pn(Zl,e),Pn(ud,e)}function Oh(){var e=cd(ko.current);return e}function Sy(e){cd(ud.current);var t=cd(ko.current),n=SE(t,e.type);t!==n&&(zn(Zl,e,e),zn(ko,n,e))}function Fh(e){Zl.current===e&&(Pn(ko,e),Pn(Zl,e))}var aT=0,Ey=1,Cy=1,Jl=2,Jr=wo(aT);function Lh(e,t){return(e&t)!==0}function ms(e){return e&Ey}function Uh(e,t){return e&Ey|t}function sT(e,t){return e|t}function No(e,t){zn(Jr,t,e)}function hs(e){Pn(Jr,e)}function lT(e,t){var n=e.memoizedState;return n!==null?n.dehydrated!==null:(e.memoizedProps,!0)}function dd(e){for(var t=e;t!==null;){if(t.tag===I){var n=t.memoizedState;if(n!==null){var r=n.dehydrated;if(r===null||jg(r)||nh(r))return t}}else if(t.tag===le&&t.memoizedProps.revealOrder!==void 0){var a=(t.flags&lt)!==De;if(a)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)return null;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var tr=0,Zt=1,xi=2,Jt=4,xn=8,Bh=[];function Vh(){for(var e=0;e<Bh.length;e++){var t=Bh[e];t._workInProgressVersionPrimary=null}Bh.length=0}function uT(e,t){var n=t._getVersion,r=n(t._source);e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,r]:e.mutableSourceEagerHydrationData.push(t,r)}var pe=i.ReactCurrentDispatcher,eu=i.ReactCurrentBatchConfig,Ih,ps;Ih=new Set;var ga=J,pt=null,en=null,tn=null,fd=!1,tu=!1,nu=0,cT=0,dT=25,Y=null,Pr=null,Ro=-1,jh=!1;function ut(){{var e=Y;Pr===null?Pr=[e]:Pr.push(e)}}function ae(){{var e=Y;Pr!==null&&(Ro++,Pr[Ro]!==e&&fT(e))}}function vs(e){e!=null&&!st(e)&&c("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",Y,typeof e)}function fT(e){{var t=Be(pt);if(!Ih.has(t)&&(Ih.add(t),Pr!==null)){for(var n="",r=30,a=0;a<=Ro;a++){for(var u=Pr[a],f=a===Ro?e:u,g=a+1+". "+u;g.length<r;)g+=" ";g+=f+`
`,n+=g}c(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,t,n)}}}function An(){throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`)}function Hh(e,t){if(jh)return!1;if(t===null)return c("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",Y),!1;e.length!==t.length&&c(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,Y,"["+t.join(", ")+"]","["+e.join(", ")+"]");for(var n=0;n<t.length&&n<e.length;n++)if(!vr(e[n],t[n]))return!1;return!0}function gs(e,t,n,r,a,u){ga=u,pt=t,Pr=e!==null?e._debugHookTypes:null,Ro=-1,jh=e!==null&&e.type!==t.type,t.memoizedState=null,t.updateQueue=null,t.lanes=J,e!==null&&e.memoizedState!==null?pe.current=qy:Pr!==null?pe.current=Yy:pe.current=Wy;var f=n(r,a);if(tu){var g=0;do{if(tu=!1,nu=0,g>=dT)throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");g+=1,jh=!1,en=null,tn=null,t.updateQueue=null,Ro=-1,pe.current=Xy,f=n(r,a)}while(tu)}pe.current=Cd,t._debugHookTypes=Pr;var x=en!==null&&en.next!==null;if(ga=J,pt=null,en=null,tn=null,Y=null,Pr=null,Ro=-1,e!==null&&(e.flags&Vi)!==(t.flags&Vi)&&(e.mode&Qe)!==ke&&c("Internal React error: Expected static flag was missing. Please notify the React team."),fd=!1,x)throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");return f}function ys(){var e=nu!==0;return nu=0,e}function Ty(e,t,n){t.updateQueue=e.updateQueue,(t.mode&pi)!==ke?t.flags&=~(ac|Bi|qr|tt):t.flags&=~(qr|tt),e.lanes=mc(e.lanes,n)}function ky(){if(pe.current=Cd,fd){for(var e=pt.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}fd=!1}ga=J,pt=null,en=null,tn=null,Pr=null,Ro=-1,Y=null,Vy=!1,tu=!1,nu=0}function bi(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return tn===null?pt.memoizedState=tn=e:tn=tn.next=e,tn}function zr(){var e;if(en===null){var t=pt.alternate;t!==null?e=t.memoizedState:e=null}else e=en.next;var n;if(tn===null?n=pt.memoizedState:n=tn.next,n!==null)tn=n,n=tn.next,en=e;else{if(e===null)throw new Error("Rendered more hooks than during the previous render.");en=e;var r={memoizedState:en.memoizedState,baseState:en.baseState,baseQueue:en.baseQueue,queue:en.queue,next:null};tn===null?pt.memoizedState=tn=r:tn=tn.next=r}return tn}function Ny(){return{lastEffect:null,stores:null}}function Gh(e,t){return typeof t=="function"?t(e):t}function Wh(e,t,n){var r=bi(),a;n!==void 0?a=n(t):a=t,r.memoizedState=r.baseState=a;var u={pending:null,interleaved:null,lanes:J,dispatch:null,lastRenderedReducer:e,lastRenderedState:a};r.queue=u;var f=u.dispatch=vT.bind(null,pt,u);return[r.memoizedState,f]}function Yh(e,t,n){var r=zr(),a=r.queue;if(a===null)throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");a.lastRenderedReducer=e;var u=en,f=u.baseQueue,g=a.pending;if(g!==null){if(f!==null){var x=f.next,E=g.next;f.next=E,g.next=x}u.baseQueue!==f&&c("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."),u.baseQueue=f=g,a.pending=null}if(f!==null){var k=f.next,P=u.baseState,M=null,L=null,V=null,G=k;do{var de=G.lane;if(Xa(ga,de)){if(V!==null){var be={lane:fn,action:G.action,hasEagerState:G.hasEagerState,eagerState:G.eagerState,next:null};V=V.next=be}if(G.hasEagerState)P=G.eagerState;else{var Je=G.action;P=e(P,Je)}}else{var Ee={lane:de,action:G.action,hasEagerState:G.hasEagerState,eagerState:G.eagerState,next:null};V===null?(L=V=Ee,M=P):V=V.next=Ee,pt.lanes=Ie(pt.lanes,de),Su(de)}G=G.next}while(G!==null&&G!==k);V===null?M=P:V.next=L,vr(P,r.memoizedState)||du(),r.memoizedState=P,r.baseState=M,r.baseQueue=V,a.lastRenderedState=P}var qe=a.interleaved;if(qe!==null){var A=qe;do{var W=A.lane;pt.lanes=Ie(pt.lanes,W),Su(W),A=A.next}while(A!==qe)}else f===null&&(a.lanes=J);var O=a.dispatch;return[r.memoizedState,O]}function qh(e,t,n){var r=zr(),a=r.queue;if(a===null)throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");a.lastRenderedReducer=e;var u=a.dispatch,f=a.pending,g=r.memoizedState;if(f!==null){a.pending=null;var x=f.next,E=x;do{var k=E.action;g=e(g,k),E=E.next}while(E!==x);vr(g,r.memoizedState)||du(),r.memoizedState=g,r.baseQueue===null&&(r.baseState=g),a.lastRenderedState=g}return[g,u]}function _A(e,t,n){}function wA(e,t,n){}function Xh(e,t,n){var r=pt,a=bi(),u,f=yn();if(f){if(n===void 0)throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");u=n(),ps||u!==n()&&(c("The result of getServerSnapshot should be cached to avoid an infinite loop"),ps=!0)}else{if(u=t(),!ps){var g=t();vr(u,g)||(c("The result of getSnapshot should be cached to avoid an infinite loop"),ps=!0)}var x=Gd();if(x===null)throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");fc(x,ga)||Ry(r,t,u)}a.memoizedState=u;var E={value:u,getSnapshot:t};return a.queue=E,gd(My.bind(null,r,E,e),[e]),r.flags|=qr,ru(Zt|xn,Dy.bind(null,r,E,u,t),void 0,null),u}function md(e,t,n){var r=pt,a=zr(),u=t();if(!ps){var f=t();vr(u,f)||(c("The result of getSnapshot should be cached to avoid an infinite loop"),ps=!0)}var g=a.memoizedState,x=!vr(g,u);x&&(a.memoizedState=u,du());var E=a.queue;if(ou(My.bind(null,r,E,e),[e]),E.getSnapshot!==t||x||tn!==null&&tn.memoizedState.tag&Zt){r.flags|=qr,ru(Zt|xn,Dy.bind(null,r,E,u,t),void 0,null);var k=Gd();if(k===null)throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");fc(k,ga)||Ry(r,t,u)}return u}function Ry(e,t,n){e.flags|=oc;var r={getSnapshot:t,value:n},a=pt.updateQueue;if(a===null)a=Ny(),pt.updateQueue=a,a.stores=[r];else{var u=a.stores;u===null?a.stores=[r]:u.push(r)}}function Dy(e,t,n,r){t.value=n,t.getSnapshot=r,Py(t)&&zy(e)}function My(e,t,n){var r=function(){Py(t)&&zy(e)};return n(r)}function Py(e){var t=e.getSnapshot,n=e.value;try{var r=t();return!vr(n,r)}catch{return!0}}function zy(e){var t=er(e,Fe);t!==null&&an(t,e,Fe,St)}function hd(e){var t=bi();typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e;var n={pending:null,interleaved:null,lanes:J,dispatch:null,lastRenderedReducer:Gh,lastRenderedState:e};t.queue=n;var r=n.dispatch=gT.bind(null,pt,n);return[t.memoizedState,r]}function $h(e){return Yh(Gh)}function Kh(e){return qh(Gh)}function ru(e,t,n,r){var a={tag:e,create:t,destroy:n,deps:r,next:null},u=pt.updateQueue;if(u===null)u=Ny(),pt.updateQueue=u,u.lastEffect=a.next=a;else{var f=u.lastEffect;if(f===null)u.lastEffect=a.next=a;else{var g=f.next;f.next=a,a.next=g,u.lastEffect=a}}return a}function Qh(e){var t=bi();{var n={current:e};return t.memoizedState=n,n}}function pd(e){var t=zr();return t.memoizedState}function iu(e,t,n,r){var a=bi(),u=r===void 0?null:r;pt.flags|=e,a.memoizedState=ru(Zt|t,n,void 0,u)}function vd(e,t,n,r){var a=zr(),u=r===void 0?null:r,f=void 0;if(en!==null){var g=en.memoizedState;if(f=g.destroy,u!==null){var x=g.deps;if(Hh(u,x)){a.memoizedState=ru(t,n,f,u);return}}}pt.flags|=e,a.memoizedState=ru(Zt|t,n,f,u)}function gd(e,t){return(pt.mode&pi)!==ke?iu(ac|qr|Xf,xn,e,t):iu(qr|Xf,xn,e,t)}function ou(e,t){return vd(qr,xn,e,t)}function Zh(e,t){return iu(tt,xi,e,t)}function yd(e,t){return vd(tt,xi,e,t)}function Jh(e,t){var n=tt;return n|=ea,(pt.mode&pi)!==ke&&(n|=Bi),iu(n,Jt,e,t)}function xd(e,t){return vd(tt,Jt,e,t)}function Ay(e,t){if(typeof t=="function"){var n=t,r=e();return n(r),function(){n(null)}}else if(t!=null){var a=t;a.hasOwnProperty("current")||c("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.","an object with keys {"+Object.keys(a).join(", ")+"}");var u=e();return a.current=u,function(){a.current=null}}}function ep(e,t,n){typeof t!="function"&&c("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null");var r=n!=null?n.concat([e]):null,a=tt;return a|=ea,(pt.mode&pi)!==ke&&(a|=Bi),iu(a,Jt,Ay.bind(null,t,e),r)}function bd(e,t,n){typeof t!="function"&&c("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null");var r=n!=null?n.concat([e]):null;return vd(tt,Jt,Ay.bind(null,t,e),r)}function mT(e,t){}var _d=mT;function tp(e,t){var n=bi(),r=t===void 0?null:t;return n.memoizedState=[e,r],e}function wd(e,t){var n=zr(),r=t===void 0?null:t,a=n.memoizedState;if(a!==null&&r!==null){var u=a[1];if(Hh(r,u))return a[0]}return n.memoizedState=[e,r],e}function np(e,t){var n=bi(),r=t===void 0?null:t,a=e();return n.memoizedState=[a,r],a}function Sd(e,t){var n=zr(),r=t===void 0?null:t,a=n.memoizedState;if(a!==null&&r!==null){var u=a[1];if(Hh(r,u))return a[0]}var f=e();return n.memoizedState=[f,r],f}function rp(e){var t=bi();return t.memoizedState=e,e}function Oy(e){var t=zr(),n=en,r=n.memoizedState;return Ly(t,r,e)}function Fy(e){var t=zr();if(en===null)return t.memoizedState=e,e;var n=en.memoizedState;return Ly(t,n,e)}function Ly(e,t,n){var r=!Zw(ga);if(r){if(!vr(n,t)){var a=z0();pt.lanes=Ie(pt.lanes,a),Su(a),e.baseState=!0}return t}else return e.baseState&&(e.baseState=!1,du()),e.memoizedState=n,n}function hT(e,t,n){var r=$r();mn(sS(r,ji)),e(!0);var a=eu.transition;eu.transition={};var u=eu.transition;eu.transition._updatedFibers=new Set;try{e(!1),t()}finally{if(mn(r),eu.transition=a,a===null&&u._updatedFibers){var f=u._updatedFibers.size;f>10&&d("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),u._updatedFibers.clear()}}}function ip(){var e=hd(!1),t=e[0],n=e[1],r=hT.bind(null,n),a=bi();return a.memoizedState=r,[t,r]}function Uy(){var e=$h(),t=e[0],n=zr(),r=n.memoizedState;return[t,r]}function By(){var e=Kh(),t=e[0],n=zr(),r=n.memoizedState;return[t,r]}var Vy=!1;function pT(){return Vy}function op(){var e=bi(),t=Gd(),n=t.identifierPrefix,r;if(yn()){var a=PC();r=":"+n+"R"+a;var u=nu++;u>0&&(r+="H"+u.toString(32)),r+=":"}else{var f=cT++;r=":"+n+"r"+f.toString(32)+":"}return e.memoizedState=r,r}function Ed(){var e=zr(),t=e.memoizedState;return t}function vT(e,t,n){typeof arguments[3]=="function"&&c("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var r=Ao(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Iy(e))jy(t,a);else{var u=vy(e,t,a,r);if(u!==null){var f=jn();an(u,e,r,f),Hy(u,t,r)}}Gy(e,r)}function gT(e,t,n){typeof arguments[3]=="function"&&c("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var r=Ao(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Iy(e))jy(t,a);else{var u=e.alternate;if(e.lanes===J&&(u===null||u.lanes===J)){var f=t.lastRenderedReducer;if(f!==null){var g;g=pe.current,pe.current=ei;try{var x=t.lastRenderedState,E=f(x,n);if(a.hasEagerState=!0,a.eagerState=E,vr(E,x)){tT(e,t,a,r);return}}catch{}finally{pe.current=g}}}var k=vy(e,t,a,r);if(k!==null){var P=jn();an(k,e,r,P),Hy(k,t,r)}}Gy(e,r)}function Iy(e){var t=e.alternate;return e===pt||t!==null&&t===pt}function jy(e,t){tu=fd=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Hy(e,t,n){if(P0(n)){var r=t.lanes;r=A0(r,e.pendingLanes);var a=Ie(r,n);t.lanes=a,Em(e,a)}}function Gy(e,t,n){Jf(e,t)}var Cd={readContext:Xt,useCallback:An,useContext:An,useEffect:An,useImperativeHandle:An,useInsertionEffect:An,useLayoutEffect:An,useMemo:An,useReducer:An,useRef:An,useState:An,useDebugValue:An,useDeferredValue:An,useTransition:An,useMutableSource:An,useSyncExternalStore:An,useId:An,unstable_isNewReconciler:Tt},Wy=null,Yy=null,qy=null,Xy=null,_i=null,ei=null,Td=null;{var ap=function(){c("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().")},Le=function(){c("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks")};Wy={readContext:function(e){return Xt(e)},useCallback:function(e,t){return Y="useCallback",ut(),vs(t),tp(e,t)},useContext:function(e){return Y="useContext",ut(),Xt(e)},useEffect:function(e,t){return Y="useEffect",ut(),vs(t),gd(e,t)},useImperativeHandle:function(e,t,n){return Y="useImperativeHandle",ut(),vs(n),ep(e,t,n)},useInsertionEffect:function(e,t){return Y="useInsertionEffect",ut(),vs(t),Zh(e,t)},useLayoutEffect:function(e,t){return Y="useLayoutEffect",ut(),vs(t),Jh(e,t)},useMemo:function(e,t){Y="useMemo",ut(),vs(t);var n=pe.current;pe.current=_i;try{return np(e,t)}finally{pe.current=n}},useReducer:function(e,t,n){Y="useReducer",ut();var r=pe.current;pe.current=_i;try{return Wh(e,t,n)}finally{pe.current=r}},useRef:function(e){return Y="useRef",ut(),Qh(e)},useState:function(e){Y="useState",ut();var t=pe.current;pe.current=_i;try{return hd(e)}finally{pe.current=t}},useDebugValue:function(e,t){return Y="useDebugValue",ut(),void 0},useDeferredValue:function(e){return Y="useDeferredValue",ut(),rp(e)},useTransition:function(){return Y="useTransition",ut(),ip()},useMutableSource:function(e,t,n){return Y="useMutableSource",ut(),void 0},useSyncExternalStore:function(e,t,n){return Y="useSyncExternalStore",ut(),Xh(e,t,n)},useId:function(){return Y="useId",ut(),op()},unstable_isNewReconciler:Tt},Yy={readContext:function(e){return Xt(e)},useCallback:function(e,t){return Y="useCallback",ae(),tp(e,t)},useContext:function(e){return Y="useContext",ae(),Xt(e)},useEffect:function(e,t){return Y="useEffect",ae(),gd(e,t)},useImperativeHandle:function(e,t,n){return Y="useImperativeHandle",ae(),ep(e,t,n)},useInsertionEffect:function(e,t){return Y="useInsertionEffect",ae(),Zh(e,t)},useLayoutEffect:function(e,t){return Y="useLayoutEffect",ae(),Jh(e,t)},useMemo:function(e,t){Y="useMemo",ae();var n=pe.current;pe.current=_i;try{return np(e,t)}finally{pe.current=n}},useReducer:function(e,t,n){Y="useReducer",ae();var r=pe.current;pe.current=_i;try{return Wh(e,t,n)}finally{pe.current=r}},useRef:function(e){return Y="useRef",ae(),Qh(e)},useState:function(e){Y="useState",ae();var t=pe.current;pe.current=_i;try{return hd(e)}finally{pe.current=t}},useDebugValue:function(e,t){return Y="useDebugValue",ae(),void 0},useDeferredValue:function(e){return Y="useDeferredValue",ae(),rp(e)},useTransition:function(){return Y="useTransition",ae(),ip()},useMutableSource:function(e,t,n){return Y="useMutableSource",ae(),void 0},useSyncExternalStore:function(e,t,n){return Y="useSyncExternalStore",ae(),Xh(e,t,n)},useId:function(){return Y="useId",ae(),op()},unstable_isNewReconciler:Tt},qy={readContext:function(e){return Xt(e)},useCallback:function(e,t){return Y="useCallback",ae(),wd(e,t)},useContext:function(e){return Y="useContext",ae(),Xt(e)},useEffect:function(e,t){return Y="useEffect",ae(),ou(e,t)},useImperativeHandle:function(e,t,n){return Y="useImperativeHandle",ae(),bd(e,t,n)},useInsertionEffect:function(e,t){return Y="useInsertionEffect",ae(),yd(e,t)},useLayoutEffect:function(e,t){return Y="useLayoutEffect",ae(),xd(e,t)},useMemo:function(e,t){Y="useMemo",ae();var n=pe.current;pe.current=ei;try{return Sd(e,t)}finally{pe.current=n}},useReducer:function(e,t,n){Y="useReducer",ae();var r=pe.current;pe.current=ei;try{return Yh(e,t,n)}finally{pe.current=r}},useRef:function(e){return Y="useRef",ae(),pd()},useState:function(e){Y="useState",ae();var t=pe.current;pe.current=ei;try{return $h(e)}finally{pe.current=t}},useDebugValue:function(e,t){return Y="useDebugValue",ae(),_d()},useDeferredValue:function(e){return Y="useDeferredValue",ae(),Oy(e)},useTransition:function(){return Y="useTransition",ae(),Uy()},useMutableSource:function(e,t,n){return Y="useMutableSource",ae(),void 0},useSyncExternalStore:function(e,t,n){return Y="useSyncExternalStore",ae(),md(e,t)},useId:function(){return Y="useId",ae(),Ed()},unstable_isNewReconciler:Tt},Xy={readContext:function(e){return Xt(e)},useCallback:function(e,t){return Y="useCallback",ae(),wd(e,t)},useContext:function(e){return Y="useContext",ae(),Xt(e)},useEffect:function(e,t){return Y="useEffect",ae(),ou(e,t)},useImperativeHandle:function(e,t,n){return Y="useImperativeHandle",ae(),bd(e,t,n)},useInsertionEffect:function(e,t){return Y="useInsertionEffect",ae(),yd(e,t)},useLayoutEffect:function(e,t){return Y="useLayoutEffect",ae(),xd(e,t)},useMemo:function(e,t){Y="useMemo",ae();var n=pe.current;pe.current=Td;try{return Sd(e,t)}finally{pe.current=n}},useReducer:function(e,t,n){Y="useReducer",ae();var r=pe.current;pe.current=Td;try{return qh(e,t,n)}finally{pe.current=r}},useRef:function(e){return Y="useRef",ae(),pd()},useState:function(e){Y="useState",ae();var t=pe.current;pe.current=Td;try{return Kh(e)}finally{pe.current=t}},useDebugValue:function(e,t){return Y="useDebugValue",ae(),_d()},useDeferredValue:function(e){return Y="useDeferredValue",ae(),Fy(e)},useTransition:function(){return Y="useTransition",ae(),By()},useMutableSource:function(e,t,n){return Y="useMutableSource",ae(),void 0},useSyncExternalStore:function(e,t,n){return Y="useSyncExternalStore",ae(),md(e,t)},useId:function(){return Y="useId",ae(),Ed()},unstable_isNewReconciler:Tt},_i={readContext:function(e){return ap(),Xt(e)},useCallback:function(e,t){return Y="useCallback",Le(),ut(),tp(e,t)},useContext:function(e){return Y="useContext",Le(),ut(),Xt(e)},useEffect:function(e,t){return Y="useEffect",Le(),ut(),gd(e,t)},useImperativeHandle:function(e,t,n){return Y="useImperativeHandle",Le(),ut(),ep(e,t,n)},useInsertionEffect:function(e,t){return Y="useInsertionEffect",Le(),ut(),Zh(e,t)},useLayoutEffect:function(e,t){return Y="useLayoutEffect",Le(),ut(),Jh(e,t)},useMemo:function(e,t){Y="useMemo",Le(),ut();var n=pe.current;pe.current=_i;try{return np(e,t)}finally{pe.current=n}},useReducer:function(e,t,n){Y="useReducer",Le(),ut();var r=pe.current;pe.current=_i;try{return Wh(e,t,n)}finally{pe.current=r}},useRef:function(e){return Y="useRef",Le(),ut(),Qh(e)},useState:function(e){Y="useState",Le(),ut();var t=pe.current;pe.current=_i;try{return hd(e)}finally{pe.current=t}},useDebugValue:function(e,t){return Y="useDebugValue",Le(),ut(),void 0},useDeferredValue:function(e){return Y="useDeferredValue",Le(),ut(),rp(e)},useTransition:function(){return Y="useTransition",Le(),ut(),ip()},useMutableSource:function(e,t,n){return Y="useMutableSource",Le(),ut(),void 0},useSyncExternalStore:function(e,t,n){return Y="useSyncExternalStore",Le(),ut(),Xh(e,t,n)},useId:function(){return Y="useId",Le(),ut(),op()},unstable_isNewReconciler:Tt},ei={readContext:function(e){return ap(),Xt(e)},useCallback:function(e,t){return Y="useCallback",Le(),ae(),wd(e,t)},useContext:function(e){return Y="useContext",Le(),ae(),Xt(e)},useEffect:function(e,t){return Y="useEffect",Le(),ae(),ou(e,t)},useImperativeHandle:function(e,t,n){return Y="useImperativeHandle",Le(),ae(),bd(e,t,n)},useInsertionEffect:function(e,t){return Y="useInsertionEffect",Le(),ae(),yd(e,t)},useLayoutEffect:function(e,t){return Y="useLayoutEffect",Le(),ae(),xd(e,t)},useMemo:function(e,t){Y="useMemo",Le(),ae();var n=pe.current;pe.current=ei;try{return Sd(e,t)}finally{pe.current=n}},useReducer:function(e,t,n){Y="useReducer",Le(),ae();var r=pe.current;pe.current=ei;try{return Yh(e,t,n)}finally{pe.current=r}},useRef:function(e){return Y="useRef",Le(),ae(),pd()},useState:function(e){Y="useState",Le(),ae();var t=pe.current;pe.current=ei;try{return $h(e)}finally{pe.current=t}},useDebugValue:function(e,t){return Y="useDebugValue",Le(),ae(),_d()},useDeferredValue:function(e){return Y="useDeferredValue",Le(),ae(),Oy(e)},useTransition:function(){return Y="useTransition",Le(),ae(),Uy()},useMutableSource:function(e,t,n){return Y="useMutableSource",Le(),ae(),void 0},useSyncExternalStore:function(e,t,n){return Y="useSyncExternalStore",Le(),ae(),md(e,t)},useId:function(){return Y="useId",Le(),ae(),Ed()},unstable_isNewReconciler:Tt},Td={readContext:function(e){return ap(),Xt(e)},useCallback:function(e,t){return Y="useCallback",Le(),ae(),wd(e,t)},useContext:function(e){return Y="useContext",Le(),ae(),Xt(e)},useEffect:function(e,t){return Y="useEffect",Le(),ae(),ou(e,t)},useImperativeHandle:function(e,t,n){return Y="useImperativeHandle",Le(),ae(),bd(e,t,n)},useInsertionEffect:function(e,t){return Y="useInsertionEffect",Le(),ae(),yd(e,t)},useLayoutEffect:function(e,t){return Y="useLayoutEffect",Le(),ae(),xd(e,t)},useMemo:function(e,t){Y="useMemo",Le(),ae();var n=pe.current;pe.current=ei;try{return Sd(e,t)}finally{pe.current=n}},useReducer:function(e,t,n){Y="useReducer",Le(),ae();var r=pe.current;pe.current=ei;try{return qh(e,t,n)}finally{pe.current=r}},useRef:function(e){return Y="useRef",Le(),ae(),pd()},useState:function(e){Y="useState",Le(),ae();var t=pe.current;pe.current=ei;try{return Kh(e)}finally{pe.current=t}},useDebugValue:function(e,t){return Y="useDebugValue",Le(),ae(),_d()},useDeferredValue:function(e){return Y="useDeferredValue",Le(),ae(),Fy(e)},useTransition:function(){return Y="useTransition",Le(),ae(),By()},useMutableSource:function(e,t,n){return Y="useMutableSource",Le(),ae(),void 0},useSyncExternalStore:function(e,t,n){return Y="useSyncExternalStore",Le(),ae(),md(e,t)},useId:function(){return Y="useId",Le(),ae(),Ed()},unstable_isNewReconciler:Tt}}var Do=l.unstable_now,$y=0,kd=-1,au=-1,Nd=-1,sp=!1,Rd=!1;function Ky(){return sp}function yT(){Rd=!0}function xT(){sp=!1,Rd=!1}function bT(){sp=Rd,Rd=!1}function Qy(){return $y}function Zy(){$y=Do()}function lp(e){au=Do(),e.actualStartTime<0&&(e.actualStartTime=Do())}function Jy(e){au=-1}function Dd(e,t){if(au>=0){var n=Do()-au;e.actualDuration+=n,t&&(e.selfBaseDuration=n),au=-1}}function wi(e){if(kd>=0){var t=Do()-kd;kd=-1;for(var n=e.return;n!==null;){switch(n.tag){case S:var r=n.stateNode;r.effectDuration+=t;return;case Z:var a=n.stateNode;a.effectDuration+=t;return}n=n.return}}}function up(e){if(Nd>=0){var t=Do()-Nd;Nd=-1;for(var n=e.return;n!==null;){switch(n.tag){case S:var r=n.stateNode;r!==null&&(r.passiveEffectDuration+=t);return;case Z:var a=n.stateNode;a!==null&&(a.passiveEffectDuration+=t);return}n=n.return}}}function Si(){kd=Do()}function cp(){Nd=Do()}function dp(e){for(var t=e.child;t;)e.actualDuration+=t.actualDuration,t=t.sibling}function ti(e,t){if(e&&e.defaultProps){var n=Xe({},t),r=e.defaultProps;for(var a in r)n[a]===void 0&&(n[a]=r[a]);return n}return t}var fp={},mp,hp,pp,vp,gp,e1,Md,yp,xp,bp,su;{mp=new Set,hp=new Set,pp=new Set,vp=new Set,yp=new Set,gp=new Set,xp=new Set,bp=new Set,su=new Set;var t1=new Set;Md=function(e,t){if(!(e===null||typeof e=="function")){var n=t+"_"+e;t1.has(n)||(t1.add(n),c("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",t,e))}},e1=function(e,t){if(t===void 0){var n=it(e)||"Component";gp.has(n)||(gp.add(n),c("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",n))}},Object.defineProperty(fp,"_processChildContext",{enumerable:!1,value:function(){throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).")}}),Object.freeze(fp)}function _p(e,t,n,r){var a=e.memoizedState,u=n(r,a);{if(e.mode&Lt){dn(!0);try{u=n(r,a)}finally{dn(!1)}}e1(t,u)}var f=u==null?a:Xe({},a,u);if(e.memoizedState=f,e.lanes===J){var g=e.updateQueue;g.baseState=f}}var wp={isMounted:dw,enqueueSetState:function(e,t,n){var r=Va(e),a=jn(),u=Ao(r),f=$i(a,u);f.payload=t,n!=null&&(Md(n,"setState"),f.callback=n);var g=To(r,f,u);g!==null&&(an(g,r,u,a),ad(g,r,u)),Jf(r,u)},enqueueReplaceState:function(e,t,n){var r=Va(e),a=jn(),u=Ao(r),f=$i(a,u);f.tag=yy,f.payload=t,n!=null&&(Md(n,"replaceState"),f.callback=n);var g=To(r,f,u);g!==null&&(an(g,r,u,a),ad(g,r,u)),Jf(r,u)},enqueueForceUpdate:function(e,t){var n=Va(e),r=jn(),a=Ao(n),u=$i(r,a);u.tag=rd,t!=null&&(Md(t,"forceUpdate"),u.callback=t);var f=To(n,u,a);f!==null&&(an(f,n,a,r),ad(f,n,a)),jw(n,a)}};function n1(e,t,n,r,a,u,f){var g=e.stateNode;if(typeof g.shouldComponentUpdate=="function"){var x=g.shouldComponentUpdate(r,u,f);{if(e.mode&Lt){dn(!0);try{x=g.shouldComponentUpdate(r,u,f)}finally{dn(!1)}}x===void 0&&c("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",it(t)||"Component")}return x}return t.prototype&&t.prototype.isPureReactComponent?!Rl(n,r)||!Rl(a,u):!0}function _T(e,t,n){var r=e.stateNode;{var a=it(t)||"Component",u=r.render;u||(t.prototype&&typeof t.prototype.render=="function"?c("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?",a):c("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.",a)),r.getInitialState&&!r.getInitialState.isReactClassApproved&&!r.state&&c("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",a),r.getDefaultProps&&!r.getDefaultProps.isReactClassApproved&&c("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",a),r.propTypes&&c("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.",a),r.contextType&&c("contextType was defined as an instance property on %s. Use a static property to define contextType instead.",a),t.childContextTypes&&!su.has(t)&&(e.mode&Lt)===ke&&(su.add(t),c(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`,a)),t.contextTypes&&!su.has(t)&&(e.mode&Lt)===ke&&(su.add(t),c(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`,a)),r.contextTypes&&c("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.",a),t.contextType&&t.contextTypes&&!xp.has(t)&&(xp.add(t),c("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.",a)),typeof r.componentShouldUpdate=="function"&&c("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",a),t.prototype&&t.prototype.isPureReactComponent&&typeof r.shouldComponentUpdate<"u"&&c("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",it(t)||"A pure component"),typeof r.componentDidUnmount=="function"&&c("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",a),typeof r.componentDidReceiveProps=="function"&&c("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",a),typeof r.componentWillRecieveProps=="function"&&c("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",a),typeof r.UNSAFE_componentWillRecieveProps=="function"&&c("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",a);var f=r.props!==n;r.props!==void 0&&f&&c("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",a,a),r.defaultProps&&c("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",a,a),typeof r.getSnapshotBeforeUpdate=="function"&&typeof r.componentDidUpdate!="function"&&!pp.has(t)&&(pp.add(t),c("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",it(t))),typeof r.getDerivedStateFromProps=="function"&&c("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",a),typeof r.getDerivedStateFromError=="function"&&c("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",a),typeof t.getSnapshotBeforeUpdate=="function"&&c("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",a);var g=r.state;g&&(typeof g!="object"||st(g))&&c("%s.state: must be set to an object or null",a),typeof r.getChildContext=="function"&&typeof t.childContextTypes!="object"&&c("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",a)}}function r1(e,t){t.updater=wp,e.stateNode=t,aw(t,e),t._reactInternalInstance=fp}function i1(e,t,n){var r=!1,a=gr,u=gr,f=t.contextType;if("contextType"in t){var g=f===null||f!==void 0&&f.$$typeof===$e&&f._context===void 0;if(!g&&!bp.has(t)){bp.add(t);var x="";f===void 0?x=" However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.":typeof f!="object"?x=" However, it is set to a "+typeof f+".":f.$$typeof===Re?x=" Did you accidentally pass the Context.Provider instead?":f._context!==void 0?x=" Did you accidentally pass the Context.Consumer instead?":x=" However, it is set to an object with keys {"+Object.keys(f).join(", ")+"}.",c("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",it(t)||"Component",x)}}if(typeof f=="object"&&f!==null)u=Xt(f);else{a=is(e,t,!0);var E=t.contextTypes;r=E!=null,u=r?os(e,a):gr}var k=new t(n,u);if(e.mode&Lt){dn(!0);try{k=new t(n,u)}finally{dn(!1)}}var P=e.memoizedState=k.state!==null&&k.state!==void 0?k.state:null;r1(e,k);{if(typeof t.getDerivedStateFromProps=="function"&&P===null){var M=it(t)||"Component";hp.has(M)||(hp.add(M),c("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",M,k.state===null?"null":"undefined",M))}if(typeof t.getDerivedStateFromProps=="function"||typeof k.getSnapshotBeforeUpdate=="function"){var L=null,V=null,G=null;if(typeof k.componentWillMount=="function"&&k.componentWillMount.__suppressDeprecationWarning!==!0?L="componentWillMount":typeof k.UNSAFE_componentWillMount=="function"&&(L="UNSAFE_componentWillMount"),typeof k.componentWillReceiveProps=="function"&&k.componentWillReceiveProps.__suppressDeprecationWarning!==!0?V="componentWillReceiveProps":typeof k.UNSAFE_componentWillReceiveProps=="function"&&(V="UNSAFE_componentWillReceiveProps"),typeof k.componentWillUpdate=="function"&&k.componentWillUpdate.__suppressDeprecationWarning!==!0?G="componentWillUpdate":typeof k.UNSAFE_componentWillUpdate=="function"&&(G="UNSAFE_componentWillUpdate"),L!==null||V!==null||G!==null){var de=it(t)||"Component",Ee=typeof t.getDerivedStateFromProps=="function"?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";vp.has(de)||(vp.add(de),c(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`,de,Ee,L!==null?`
  `+L:"",V!==null?`
  `+V:"",G!==null?`
  `+G:""))}}}return r&&qg(e,a,u),k}function wT(e,t){var n=t.state;typeof t.componentWillMount=="function"&&t.componentWillMount(),typeof t.UNSAFE_componentWillMount=="function"&&t.UNSAFE_componentWillMount(),n!==t.state&&(c("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",Be(e)||"Component"),wp.enqueueReplaceState(t,t.state,null))}function o1(e,t,n,r){var a=t.state;if(typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==a){{var u=Be(e)||"Component";mp.has(u)||(mp.add(u),c("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",u))}wp.enqueueReplaceState(t,t.state,null)}}function Sp(e,t,n,r){_T(e,t,n);var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},Ph(e);var u=t.contextType;if(typeof u=="object"&&u!==null)a.context=Xt(u);else{var f=is(e,t,!0);a.context=os(e,f)}{if(a.state===n){var g=it(t)||"Component";yp.has(g)||(yp.add(g),c("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",g))}e.mode&Lt&&Zr.recordLegacyContextWarning(e,a),Zr.recordUnsafeLifecycleWarnings(e,a)}a.state=e.memoizedState;var x=t.getDerivedStateFromProps;if(typeof x=="function"&&(_p(e,t,x,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps!="function"&&typeof a.getSnapshotBeforeUpdate!="function"&&(typeof a.UNSAFE_componentWillMount=="function"||typeof a.componentWillMount=="function")&&(wT(e,a),sd(e,n,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"){var E=tt;E|=ea,(e.mode&pi)!==ke&&(E|=Bi),e.flags|=E}}function ST(e,t,n,r){var a=e.stateNode,u=e.memoizedProps;a.props=u;var f=a.context,g=t.contextType,x=gr;if(typeof g=="object"&&g!==null)x=Xt(g);else{var E=is(e,t,!0);x=os(e,E)}var k=t.getDerivedStateFromProps,P=typeof k=="function"||typeof a.getSnapshotBeforeUpdate=="function";!P&&(typeof a.UNSAFE_componentWillReceiveProps=="function"||typeof a.componentWillReceiveProps=="function")&&(u!==n||f!==x)&&o1(e,a,n,x),by();var M=e.memoizedState,L=a.state=M;if(sd(e,n,a,r),L=e.memoizedState,u===n&&M===L&&!jc()&&!ld()){if(typeof a.componentDidMount=="function"){var V=tt;V|=ea,(e.mode&pi)!==ke&&(V|=Bi),e.flags|=V}return!1}typeof k=="function"&&(_p(e,t,k,n),L=e.memoizedState);var G=ld()||n1(e,t,u,n,M,L,x);if(G){if(!P&&(typeof a.UNSAFE_componentWillMount=="function"||typeof a.componentWillMount=="function")&&(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"){var de=tt;de|=ea,(e.mode&pi)!==ke&&(de|=Bi),e.flags|=de}}else{if(typeof a.componentDidMount=="function"){var Ee=tt;Ee|=ea,(e.mode&pi)!==ke&&(Ee|=Bi),e.flags|=Ee}e.memoizedProps=n,e.memoizedState=L}return a.props=n,a.state=L,a.context=x,G}function ET(e,t,n,r,a){var u=t.stateNode;xy(e,t);var f=t.memoizedProps,g=t.type===t.elementType?f:ti(t.type,f);u.props=g;var x=t.pendingProps,E=u.context,k=n.contextType,P=gr;if(typeof k=="object"&&k!==null)P=Xt(k);else{var M=is(t,n,!0);P=os(t,M)}var L=n.getDerivedStateFromProps,V=typeof L=="function"||typeof u.getSnapshotBeforeUpdate=="function";!V&&(typeof u.UNSAFE_componentWillReceiveProps=="function"||typeof u.componentWillReceiveProps=="function")&&(f!==x||E!==P)&&o1(t,u,r,P),by();var G=t.memoizedState,de=u.state=G;if(sd(t,r,u,a),de=t.memoizedState,f===x&&G===de&&!jc()&&!ld()&&!wr)return typeof u.componentDidUpdate=="function"&&(f!==e.memoizedProps||G!==e.memoizedState)&&(t.flags|=tt),typeof u.getSnapshotBeforeUpdate=="function"&&(f!==e.memoizedProps||G!==e.memoizedState)&&(t.flags|=Zo),!1;typeof L=="function"&&(_p(t,n,L,r),de=t.memoizedState);var Ee=ld()||n1(t,n,g,r,G,de,P)||wr;return Ee?(!V&&(typeof u.UNSAFE_componentWillUpdate=="function"||typeof u.componentWillUpdate=="function")&&(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(r,de,P),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(r,de,P)),typeof u.componentDidUpdate=="function"&&(t.flags|=tt),typeof u.getSnapshotBeforeUpdate=="function"&&(t.flags|=Zo)):(typeof u.componentDidUpdate=="function"&&(f!==e.memoizedProps||G!==e.memoizedState)&&(t.flags|=tt),typeof u.getSnapshotBeforeUpdate=="function"&&(f!==e.memoizedProps||G!==e.memoizedState)&&(t.flags|=Zo),t.memoizedProps=r,t.memoizedState=de),u.props=r,u.state=de,u.context=P,Ee}function ya(e,t){return{value:e,source:t,stack:Xs(t),digest:null}}function Ep(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function CT(e,t){return!0}function Cp(e,t){try{var n=CT(e,t);if(n===!1)return;var r=t.value,a=t.source,u=t.stack,f=u!==null?u:"";if(r!=null&&r._suppressLogging){if(e.tag===p)return;console.error(r)}var g=a?Be(a):null,x=g?"The above error occurred in the <"+g+"> component:":"The above error occurred in one of your React components:",E;if(e.tag===S)E=`Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;else{var k=Be(e)||"Anonymous";E="React will try to recreate this component tree from scratch "+("using the error boundary you provided, "+k+".")}var P=x+`
`+f+`

`+(""+E);console.error(P)}catch(M){setTimeout(function(){throw M})}}var TT=typeof WeakMap=="function"?WeakMap:Map;function a1(e,t,n){var r=$i(St,n);r.tag=Dh,r.payload={element:null};var a=t.value;return r.callback=function(){yk(a),Cp(e,t)},r}function Tp(e,t,n){var r=$i(St,n);r.tag=Dh;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var u=t.value;r.payload=function(){return a(u)},r.callback=function(){gx(e),Cp(e,t)}}var f=e.stateNode;return f!==null&&typeof f.componentDidCatch=="function"&&(r.callback=function(){gx(e),Cp(e,t),typeof a!="function"&&vk(this);var x=t.value,E=t.stack;this.componentDidCatch(x,{componentStack:E!==null?E:""}),typeof a!="function"&&(mr(e.lanes,Fe)||c("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",Be(e)||"Unknown"))}),r}function s1(e,t,n){var r=e.pingCache,a;if(r===null?(r=e.pingCache=new TT,a=new Set,r.set(t,a)):(a=r.get(t),a===void 0&&(a=new Set,r.set(t,a))),!a.has(n)){a.add(n);var u=xk.bind(null,e,t,n);Xr&&Eu(e,n),t.then(u,u)}}function kT(e,t,n,r){var a=e.updateQueue;if(a===null){var u=new Set;u.add(n),e.updateQueue=u}else a.add(n)}function NT(e,t){var n=e.tag;if((e.mode&Qe)===ke&&(n===h||n===K||n===z)){var r=e.alternate;r?(e.updateQueue=r.updateQueue,e.memoizedState=r.memoizedState,e.lanes=r.lanes):(e.updateQueue=null,e.memoizedState=null)}}function l1(e){var t=e;do{if(t.tag===I&&lT(t))return t;t=t.return}while(t!==null);return null}function u1(e,t,n,r,a){if((e.mode&Qe)===ke){if(e===t)e.flags|=Bn;else{if(e.flags|=lt,n.flags|=Yf,n.flags&=~(sw|al),n.tag===p){var u=n.alternate;if(u===null)n.tag=re;else{var f=$i(St,Fe);f.tag=rd,To(n,f,Fe)}}n.lanes=Ie(n.lanes,Fe)}return e}return e.flags|=Bn,e.lanes=a,e}function RT(e,t,n,r,a){if(n.flags|=al,Xr&&Eu(e,a),r!==null&&typeof r=="object"&&typeof r.then=="function"){var u=r;NT(n),yn()&&n.mode&Qe&&ey();var f=l1(t);if(f!==null){f.flags&=~Li,u1(f,t,n,e,a),f.mode&Qe&&s1(e,u,a),kT(f,e,u);return}else{if(!Qw(a)){s1(e,u,a),ov();return}var g=new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");r=g}}else if(yn()&&n.mode&Qe){ey();var x=l1(t);if(x!==null){(x.flags&Bn)===De&&(x.flags|=Li),u1(x,t,n,e,a),yh(ya(r,n));return}}r=ya(r,n),lk(r);var E=t;do{switch(E.tag){case S:{var k=r;E.flags|=Bn;var P=hl(a);E.lanes=Ie(E.lanes,P);var M=a1(E,k,P);zh(E,M);return}case p:var L=r,V=E.type,G=E.stateNode;if((E.flags&lt)===De&&(typeof V.getDerivedStateFromError=="function"||G!==null&&typeof G.componentDidCatch=="function"&&!lx(G))){E.flags|=Bn;var de=hl(a);E.lanes=Ie(E.lanes,de);var Ee=Tp(E,L,de);zh(E,Ee);return}break}E=E.return}while(E!==null)}function DT(){return null}var lu=i.ReactCurrentOwner,ni=!1,kp,uu,Np,Rp,Dp,xa,Mp,Pd,cu;kp={},uu={},Np={},Rp={},Dp={},xa=!1,Mp={},Pd={},cu={};function Vn(e,t,n,r){e===null?t.child=fy(t,null,n,r):t.child=us(t,e.child,n,r)}function MT(e,t,n,r){t.child=us(t,e.child,null,r),t.child=us(t,null,n,r)}function c1(e,t,n,r,a){if(t.type!==t.elementType){var u=n.propTypes;u&&Kr(u,r,"prop",it(n))}var f=n.render,g=t.ref,x,E;ds(t,a),ll(t);{if(lu.current=t,dr(!0),x=gs(e,t,f,r,g,a),E=ys(),t.mode&Lt){dn(!0);try{x=gs(e,t,f,r,g,a),E=ys()}finally{dn(!1)}}dr(!1)}return Ga(),e!==null&&!ni?(Ty(e,t,a),Ki(e,t,a)):(yn()&&E&&fh(t),t.flags|=Ia,Vn(e,t,x,a),t.child)}function d1(e,t,n,r,a){if(e===null){var u=n.type;if(Fk(u)&&n.compare===null&&n.defaultProps===void 0){var f=u;return f=Ts(u),t.tag=z,t.type=f,Ap(t,u),f1(e,t,f,r,a)}{var g=u.propTypes;if(g&&Kr(g,r,"prop",it(u)),n.defaultProps!==void 0){var x=it(u)||"Unknown";cu[x]||(c("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.",x),cu[x]=!0)}}var E=vv(n.type,null,r,t,t.mode,a);return E.ref=t.ref,E.return=t,t.child=E,E}{var k=n.type,P=k.propTypes;P&&Kr(P,r,"prop",it(k))}var M=e.child,L=Vp(e,a);if(!L){var V=M.memoizedProps,G=n.compare;if(G=G!==null?G:Rl,G(V,r)&&e.ref===t.ref)return Ki(e,t,a)}t.flags|=Ia;var de=Ea(M,r);return de.ref=t.ref,de.return=t,t.child=de,de}function f1(e,t,n,r,a){if(t.type!==t.elementType){var u=t.elementType;if(u.$$typeof===Ye){var f=u,g=f._payload,x=f._init;try{u=x(g)}catch{u=null}var E=u&&u.propTypes;E&&Kr(E,r,"prop",it(u))}}if(e!==null){var k=e.memoizedProps;if(Rl(k,r)&&e.ref===t.ref&&t.type===e.type)if(ni=!1,t.pendingProps=r=k,Vp(e,a))(e.flags&Yf)!==De&&(ni=!0);else return t.lanes=e.lanes,Ki(e,t,a)}return Pp(e,t,n,r,a)}function m1(e,t,n){var r=t.pendingProps,a=r.children,u=e!==null?e.memoizedState:null;if(r.mode==="hidden"||Yn)if((t.mode&Qe)===ke){var f={baseLanes:J,cachePool:null,transitions:null};t.memoizedState=f,Wd(t,n)}else if(mr(n,fr)){var P={baseLanes:J,cachePool:null,transitions:null};t.memoizedState=P;var M=u!==null?u.baseLanes:n;Wd(t,M)}else{var g=null,x;if(u!==null){var E=u.baseLanes;x=Ie(E,n)}else x=n;t.lanes=t.childLanes=fr;var k={baseLanes:x,cachePool:g,transitions:null};return t.memoizedState=k,t.updateQueue=null,Wd(t,x),null}else{var L;u!==null?(L=Ie(u.baseLanes,n),t.memoizedState=null):L=n,Wd(t,L)}return Vn(e,t,a,n),t.child}function PT(e,t,n){var r=t.pendingProps;return Vn(e,t,r,n),t.child}function zT(e,t,n){var r=t.pendingProps.children;return Vn(e,t,r,n),t.child}function AT(e,t,n){{t.flags|=tt;{var r=t.stateNode;r.effectDuration=0,r.passiveEffectDuration=0}}var a=t.pendingProps,u=a.children;return Vn(e,t,u,n),t.child}function h1(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=ho,t.flags|=qf)}function Pp(e,t,n,r,a){if(t.type!==t.elementType){var u=n.propTypes;u&&Kr(u,r,"prop",it(n))}var f;{var g=is(t,n,!0);f=os(t,g)}var x,E;ds(t,a),ll(t);{if(lu.current=t,dr(!0),x=gs(e,t,n,r,f,a),E=ys(),t.mode&Lt){dn(!0);try{x=gs(e,t,n,r,f,a),E=ys()}finally{dn(!1)}}dr(!1)}return Ga(),e!==null&&!ni?(Ty(e,t,a),Ki(e,t,a)):(yn()&&E&&fh(t),t.flags|=Ia,Vn(e,t,x,a),t.child)}function p1(e,t,n,r,a){{switch(Qk(t)){case!1:{var u=t.stateNode,f=t.type,g=new f(t.memoizedProps,u.context),x=g.state;u.updater.enqueueSetState(u,x,null);break}case!0:{t.flags|=lt,t.flags|=Bn;var E=new Error("Simulated error coming from DevTools"),k=hl(a);t.lanes=Ie(t.lanes,k);var P=Tp(t,ya(E,t),k);zh(t,P);break}}if(t.type!==t.elementType){var M=n.propTypes;M&&Kr(M,r,"prop",it(n))}}var L;yi(n)?(L=!0,Gc(t)):L=!1,ds(t,a);var V=t.stateNode,G;V===null?(Ad(e,t),i1(t,n,r),Sp(t,n,r,a),G=!0):e===null?G=ST(t,n,r,a):G=ET(e,t,n,r,a);var de=zp(e,t,n,G,L,a);{var Ee=t.stateNode;G&&Ee.props!==r&&(xa||c("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",Be(t)||"a component"),xa=!0)}return de}function zp(e,t,n,r,a,u){h1(e,t);var f=(t.flags&lt)!==De;if(!r&&!f)return a&&Kg(t,n,!1),Ki(e,t,u);var g=t.stateNode;lu.current=t;var x;if(f&&typeof n.getDerivedStateFromError!="function")x=null,Jy();else{ll(t);{if(dr(!0),x=g.render(),t.mode&Lt){dn(!0);try{g.render()}finally{dn(!1)}}dr(!1)}Ga()}return t.flags|=Ia,e!==null&&f?MT(e,t,x,u):Vn(e,t,x,u),t.memoizedState=g.state,a&&Kg(t,n,!0),t.child}function v1(e){var t=e.stateNode;t.pendingContext?Xg(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Xg(e,t.context,!1),Ah(e,t.containerInfo)}function OT(e,t,n){if(v1(t),e===null)throw new Error("Should have a current fiber. This is a bug in React.");var r=t.pendingProps,a=t.memoizedState,u=a.element;xy(e,t),sd(t,r,null,n);var f=t.memoizedState;t.stateNode;var g=f.element;if(a.isDehydrated){var x={element:g,isDehydrated:!1,cache:f.cache,pendingSuspenseBoundaries:f.pendingSuspenseBoundaries,transitions:f.transitions},E=t.updateQueue;if(E.baseState=x,t.memoizedState=x,t.flags&Li){var k=ya(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."),t);return g1(e,t,g,n,k)}else if(g!==u){var P=ya(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."),t);return g1(e,t,g,n,P)}else{UC(t);var M=fy(t,null,g,n);t.child=M;for(var L=M;L;)L.flags=L.flags&~qt|Ui,L=L.sibling}}else{if(ls(),g===u)return Ki(e,t,n);Vn(e,t,g,n)}return t.child}function g1(e,t,n,r,a){return ls(),yh(a),t.flags|=Li,Vn(e,t,n,r),t.child}function FT(e,t,n){Sy(t),e===null&&gh(t);var r=t.type,a=t.pendingProps,u=e!==null?e.memoizedProps:null,f=a.children,g=Zm(r,a);return g?f=null:u!==null&&Zm(r,u)&&(t.flags|=ol),h1(e,t),Vn(e,t,f,n),t.child}function LT(e,t){return e===null&&gh(t),null}function UT(e,t,n,r){Ad(e,t);var a=t.pendingProps,u=n,f=u._payload,g=u._init,x=g(f);t.type=x;var E=t.tag=Lk(x),k=ti(x,a),P;switch(E){case h:return Ap(t,x),t.type=x=Ts(x),P=Pp(null,t,x,k,r),P;case p:return t.type=x=cv(x),P=p1(null,t,x,k,r),P;case K:return t.type=x=dv(x),P=c1(null,t,x,k,r),P;case ne:{if(t.type!==t.elementType){var M=x.propTypes;M&&Kr(M,k,"prop",it(x))}return P=d1(null,t,x,ti(x.type,k),r),P}}var L="";throw x!==null&&typeof x=="object"&&x.$$typeof===Ye&&(L=" Did you wrap a component in React.lazy() more than once?"),new Error("Element type is invalid. Received a promise that resolves to: "+x+". "+("Lazy element type must resolve to a class or function."+L))}function BT(e,t,n,r,a){Ad(e,t),t.tag=p;var u;return yi(n)?(u=!0,Gc(t)):u=!1,ds(t,a),i1(t,n,r),Sp(t,n,r,a),zp(null,t,n,!0,u,a)}function VT(e,t,n,r){Ad(e,t);var a=t.pendingProps,u;{var f=is(t,n,!1);u=os(t,f)}ds(t,r);var g,x;ll(t);{if(n.prototype&&typeof n.prototype.render=="function"){var E=it(n)||"Unknown";kp[E]||(c("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",E,E),kp[E]=!0)}t.mode&Lt&&Zr.recordLegacyContextWarning(t,null),dr(!0),lu.current=t,g=gs(null,t,n,a,u,r),x=ys(),dr(!1)}if(Ga(),t.flags|=Ia,typeof g=="object"&&g!==null&&typeof g.render=="function"&&g.$$typeof===void 0){var k=it(n)||"Unknown";uu[k]||(c("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",k,k,k),uu[k]=!0)}if(typeof g=="object"&&g!==null&&typeof g.render=="function"&&g.$$typeof===void 0){{var P=it(n)||"Unknown";uu[P]||(c("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",P,P,P),uu[P]=!0)}t.tag=p,t.memoizedState=null,t.updateQueue=null;var M=!1;return yi(n)?(M=!0,Gc(t)):M=!1,t.memoizedState=g.state!==null&&g.state!==void 0?g.state:null,Ph(t),r1(t,g),Sp(t,n,a,r),zp(null,t,n,!0,M,r)}else{if(t.tag=h,t.mode&Lt){dn(!0);try{g=gs(null,t,n,a,u,r),x=ys()}finally{dn(!1)}}return yn()&&x&&fh(t),Vn(null,t,g,r),Ap(t,n),t.child}}function Ap(e,t){{if(t&&t.childContextTypes&&c("%s(...): childContextTypes cannot be defined on a function component.",t.displayName||t.name||"Component"),e.ref!==null){var n="",r=uo();r&&(n+=`

Check the render method of \``+r+"`.");var a=r||"",u=e._debugSource;u&&(a=u.fileName+":"+u.lineNumber),Dp[a]||(Dp[a]=!0,c("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s",n))}if(t.defaultProps!==void 0){var f=it(t)||"Unknown";cu[f]||(c("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",f),cu[f]=!0)}if(typeof t.getDerivedStateFromProps=="function"){var g=it(t)||"Unknown";Rp[g]||(c("%s: Function components do not support getDerivedStateFromProps.",g),Rp[g]=!0)}if(typeof t.contextType=="object"&&t.contextType!==null){var x=it(t)||"Unknown";Np[x]||(c("%s: Function components do not support contextType.",x),Np[x]=!0)}}}var Op={dehydrated:null,treeContext:null,retryLane:fn};function Fp(e){return{baseLanes:e,cachePool:DT(),transitions:null}}function IT(e,t){var n=null;return{baseLanes:Ie(e.baseLanes,t),cachePool:n,transitions:e.transitions}}function jT(e,t,n,r){if(t!==null){var a=t.memoizedState;if(a===null)return!1}return Lh(e,Jl)}function HT(e,t){return mc(e.childLanes,t)}function y1(e,t,n){var r=t.pendingProps;Zk(t)&&(t.flags|=lt);var a=Jr.current,u=!1,f=(t.flags&lt)!==De;if(f||jT(a,e)?(u=!0,t.flags&=~lt):(e===null||e.memoizedState!==null)&&(a=sT(a,Cy)),a=ms(a),No(t,a),e===null){gh(t);var g=t.memoizedState;if(g!==null){var x=g.dehydrated;if(x!==null)return XT(t,x)}var E=r.children,k=r.fallback;if(u){var P=GT(t,E,k,n),M=t.child;return M.memoizedState=Fp(n),t.memoizedState=Op,P}else return Lp(t,E)}else{var L=e.memoizedState;if(L!==null){var V=L.dehydrated;if(V!==null)return $T(e,t,f,r,V,L,n)}if(u){var G=r.fallback,de=r.children,Ee=YT(e,t,de,G,n),be=t.child,Je=e.child.memoizedState;return be.memoizedState=Je===null?Fp(n):IT(Je,n),be.childLanes=HT(e,n),t.memoizedState=Op,Ee}else{var qe=r.children,A=WT(e,t,qe,n);return t.memoizedState=null,A}}}function Lp(e,t,n){var r=e.mode,a={mode:"visible",children:t},u=Up(a,r);return u.return=e,e.child=u,u}function GT(e,t,n,r){var a=e.mode,u=e.child,f={mode:"hidden",children:t},g,x;return(a&Qe)===ke&&u!==null?(g=u,g.childLanes=J,g.pendingProps=f,e.mode&ht&&(g.actualDuration=0,g.actualStartTime=-1,g.selfBaseDuration=0,g.treeBaseDuration=0),x=Fo(n,a,r,null)):(g=Up(f,a),x=Fo(n,a,r,null)),g.return=e,x.return=e,g.sibling=x,e.child=g,x}function Up(e,t,n){return xx(e,t,J,null)}function x1(e,t){return Ea(e,t)}function WT(e,t,n,r){var a=e.child,u=a.sibling,f=x1(a,{mode:"visible",children:n});if((t.mode&Qe)===ke&&(f.lanes=r),f.return=t,f.sibling=null,u!==null){var g=t.deletions;g===null?(t.deletions=[u],t.flags|=Qo):g.push(u)}return t.child=f,f}function YT(e,t,n,r,a){var u=t.mode,f=e.child,g=f.sibling,x={mode:"hidden",children:n},E;if((u&Qe)===ke&&t.child!==f){var k=t.child;E=k,E.childLanes=J,E.pendingProps=x,t.mode&ht&&(E.actualDuration=0,E.actualStartTime=-1,E.selfBaseDuration=f.selfBaseDuration,E.treeBaseDuration=f.treeBaseDuration),t.deletions=null}else E=x1(f,x),E.subtreeFlags=f.subtreeFlags&Vi;var P;return g!==null?P=Ea(g,r):(P=Fo(r,u,a,null),P.flags|=qt),P.return=t,E.return=t,E.sibling=P,t.child=E,P}function zd(e,t,n,r){r!==null&&yh(r),us(t,e.child,null,n);var a=t.pendingProps,u=a.children,f=Lp(t,u);return f.flags|=qt,t.memoizedState=null,f}function qT(e,t,n,r,a){var u=t.mode,f={mode:"visible",children:n},g=Up(f,u),x=Fo(r,u,a,null);return x.flags|=qt,g.return=t,x.return=t,g.sibling=x,t.child=g,(t.mode&Qe)!==ke&&us(t,e.child,null,a),x}function XT(e,t,n){return(e.mode&Qe)===ke?(c("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."),e.lanes=Fe):nh(t)?e.lanes=ra:e.lanes=fr,null}function $T(e,t,n,r,a,u,f){if(n)if(t.flags&Li){t.flags&=~Li;var A=Ep(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));return zd(e,t,f,A)}else{if(t.memoizedState!==null)return t.child=e.child,t.flags|=lt,null;var W=r.children,O=r.fallback,te=qT(e,t,W,O,f),ve=t.child;return ve.memoizedState=Fp(f),t.memoizedState=Op,te}else{if(FC(),(t.mode&Qe)===ke)return zd(e,t,f,null);if(nh(a)){var g,x,E;{var k=JE(a);g=k.digest,x=k.message,E=k.stack}var P;x?P=new Error(x):P=new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");var M=Ep(P,g,E);return zd(e,t,f,M)}var L=mr(f,e.childLanes);if(ni||L){var V=Gd();if(V!==null){var G=oS(V,f);if(G!==fn&&G!==u.retryLane){u.retryLane=G;var de=St;er(e,G),an(V,e,G,de)}}ov();var Ee=Ep(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));return zd(e,t,f,Ee)}else if(jg(a)){t.flags|=lt,t.child=e.child;var be=bk.bind(null,e);return eC(a,be),null}else{BC(t,a,u.treeContext);var Je=r.children,qe=Lp(t,Je);return qe.flags|=Ui,qe}}}function b1(e,t,n){e.lanes=Ie(e.lanes,t);var r=e.alternate;r!==null&&(r.lanes=Ie(r.lanes,t)),Nh(e.return,t,n)}function KT(e,t,n){for(var r=t;r!==null;){if(r.tag===I){var a=r.memoizedState;a!==null&&b1(r,n,e)}else if(r.tag===le)b1(r,n,e);else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)return;for(;r.sibling===null;){if(r.return===null||r.return===e)return;r=r.return}r.sibling.return=r.return,r=r.sibling}}function QT(e){for(var t=e,n=null;t!==null;){var r=t.alternate;r!==null&&dd(r)===null&&(n=t),t=t.sibling}return n}function ZT(e){if(e!==void 0&&e!=="forwards"&&e!=="backwards"&&e!=="together"&&!Mp[e])if(Mp[e]=!0,typeof e=="string")switch(e.toLowerCase()){case"together":case"forwards":case"backwards":{c('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',e,e.toLowerCase());break}case"forward":case"backward":{c('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',e,e.toLowerCase());break}default:c('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e);break}else c('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e)}function JT(e,t){e!==void 0&&!Pd[e]&&(e!=="collapsed"&&e!=="hidden"?(Pd[e]=!0,c('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',e)):t!=="forwards"&&t!=="backwards"&&(Pd[e]=!0,c('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',e)))}function _1(e,t){{var n=st(e),r=!n&&typeof Mi(e)=="function";if(n||r){var a=n?"array":"iterable";return c("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",a,t,a),!1}}return!0}function e4(e,t){if((t==="forwards"||t==="backwards")&&e!==void 0&&e!==null&&e!==!1)if(st(e)){for(var n=0;n<e.length;n++)if(!_1(e[n],n))return}else{var r=Mi(e);if(typeof r=="function"){var a=r.call(e);if(a)for(var u=a.next(),f=0;!u.done;u=a.next()){if(!_1(u.value,f))return;f++}}else c('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',t)}}function Bp(e,t,n,r,a){var u=e.memoizedState;u===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(u.isBackwards=t,u.rendering=null,u.renderingStartTime=0,u.last=r,u.tail=n,u.tailMode=a)}function w1(e,t,n){var r=t.pendingProps,a=r.revealOrder,u=r.tail,f=r.children;ZT(a),JT(u,a),e4(f,a),Vn(e,t,f,n);var g=Jr.current,x=Lh(g,Jl);if(x)g=Uh(g,Jl),t.flags|=lt;else{var E=e!==null&&(e.flags&lt)!==De;E&&KT(t,t.child,n),g=ms(g)}if(No(t,g),(t.mode&Qe)===ke)t.memoizedState=null;else switch(a){case"forwards":{var k=QT(t.child),P;k===null?(P=t.child,t.child=null):(P=k.sibling,k.sibling=null),Bp(t,!1,P,k,u);break}case"backwards":{var M=null,L=t.child;for(t.child=null;L!==null;){var V=L.alternate;if(V!==null&&dd(V)===null){t.child=L;break}var G=L.sibling;L.sibling=M,M=L,L=G}Bp(t,!0,M,null,u);break}case"together":{Bp(t,!1,null,null,void 0);break}default:t.memoizedState=null}return t.child}function t4(e,t,n){Ah(t,t.stateNode.containerInfo);var r=t.pendingProps;return e===null?t.child=us(t,null,r,n):Vn(e,t,r,n),t.child}var S1=!1;function n4(e,t,n){var r=t.type,a=r._context,u=t.pendingProps,f=t.memoizedProps,g=u.value;{"value"in u||S1||(S1=!0,c("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));var x=t.type.propTypes;x&&Kr(x,u,"prop","Context.Provider")}if(py(t,a,g),f!==null){var E=f.value;if(vr(E,g)){if(f.children===u.children&&!jc())return Ki(e,t,n)}else ZC(t,a,n)}var k=u.children;return Vn(e,t,k,n),t.child}var E1=!1;function r4(e,t,n){var r=t.type;r._context===void 0?r!==r.Consumer&&(E1||(E1=!0,c("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))):r=r._context;var a=t.pendingProps,u=a.children;typeof u!="function"&&c("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."),ds(t,n);var f=Xt(r);ll(t);var g;return lu.current=t,dr(!0),g=u(f),dr(!1),Ga(),t.flags|=Ia,Vn(e,t,g,n),t.child}function du(){ni=!0}function Ad(e,t){(t.mode&Qe)===ke&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=qt)}function Ki(e,t,n){return e!==null&&(t.dependencies=e.dependencies),Jy(),Su(t.lanes),mr(n,t.childLanes)?(KC(e,t),t.child):null}function i4(e,t,n){{var r=t.return;if(r===null)throw new Error("Cannot swap the root fiber.");if(e.alternate=null,t.alternate=null,n.index=t.index,n.sibling=t.sibling,n.return=t.return,n.ref=t.ref,t===r.child)r.child=n;else{var a=r.child;if(a===null)throw new Error("Expected parent to have a child.");for(;a.sibling!==t;)if(a=a.sibling,a===null)throw new Error("Expected to find the previous sibling.");a.sibling=n}var u=r.deletions;return u===null?(r.deletions=[e],r.flags|=Qo):u.push(e),n.flags|=qt,n}}function Vp(e,t){var n=e.lanes;return!!mr(n,t)}function o4(e,t,n){switch(t.tag){case S:v1(t),t.stateNode,ls();break;case C:Sy(t);break;case p:{var r=t.type;yi(r)&&Gc(t);break}case T:Ah(t,t.stateNode.containerInfo);break;case j:{var a=t.memoizedProps.value,u=t.type._context;py(t,u,a);break}case Z:{var f=mr(n,t.childLanes);f&&(t.flags|=tt);{var g=t.stateNode;g.effectDuration=0,g.passiveEffectDuration=0}}break;case I:{var x=t.memoizedState;if(x!==null){if(x.dehydrated!==null)return No(t,ms(Jr.current)),t.flags|=lt,null;var E=t.child,k=E.childLanes;if(mr(n,k))return y1(e,t,n);No(t,ms(Jr.current));var P=Ki(e,t,n);return P!==null?P.sibling:null}else No(t,ms(Jr.current));break}case le:{var M=(e.flags&lt)!==De,L=mr(n,t.childLanes);if(M){if(L)return w1(e,t,n);t.flags|=lt}var V=t.memoizedState;if(V!==null&&(V.rendering=null,V.tail=null,V.lastEffect=null),No(t,Jr.current),L)break;return null}case _e:case ye:return t.lanes=J,m1(e,t,n)}return Ki(e,t,n)}function C1(e,t,n){if(t._debugNeedsRemount&&e!==null)return i4(e,t,vv(t.type,t.key,t.pendingProps,t._debugOwner||null,t.mode,t.lanes));if(e!==null){var r=e.memoizedProps,a=t.pendingProps;if(r!==a||jc()||t.type!==e.type)ni=!0;else{var u=Vp(e,n);if(!u&&(t.flags&lt)===De)return ni=!1,o4(e,t,n);(e.flags&Yf)!==De?ni=!0:ni=!1}}else if(ni=!1,yn()&&DC(t)){var f=t.index,g=MC();Jg(t,g,f)}switch(t.lanes=J,t.tag){case _:return VT(e,t,t.type,n);case X:{var x=t.elementType;return UT(e,t,x,n)}case h:{var E=t.type,k=t.pendingProps,P=t.elementType===E?k:ti(E,k);return Pp(e,t,E,P,n)}case p:{var M=t.type,L=t.pendingProps,V=t.elementType===M?L:ti(M,L);return p1(e,t,M,V,n)}case S:return OT(e,t,n);case C:return FT(e,t,n);case D:return LT(e,t);case I:return y1(e,t,n);case T:return t4(e,t,n);case K:{var G=t.type,de=t.pendingProps,Ee=t.elementType===G?de:ti(G,de);return c1(e,t,G,Ee,n)}case F:return PT(e,t,n);case q:return zT(e,t,n);case Z:return AT(e,t,n);case j:return n4(e,t,n);case $:return r4(e,t,n);case ne:{var be=t.type,Je=t.pendingProps,qe=ti(be,Je);if(t.type!==t.elementType){var A=be.propTypes;A&&Kr(A,qe,"prop",it(be))}return qe=ti(be.type,qe),d1(e,t,be,qe,n)}case z:return f1(e,t,t.type,t.pendingProps,n);case re:{var W=t.type,O=t.pendingProps,te=t.elementType===W?O:ti(W,O);return BT(e,t,W,te,n)}case le:return w1(e,t,n);case ze:break;case _e:return m1(e,t,n)}throw new Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function xs(e){e.flags|=tt}function T1(e){e.flags|=ho,e.flags|=qf}var k1,Ip,N1,R1;k1=function(e,t,n,r){for(var a=t.child;a!==null;){if(a.tag===C||a.tag===D)kE(e,a.stateNode);else if(a.tag!==T){if(a.child!==null){a.child.return=a,a=a.child;continue}}if(a===t)return;for(;a.sibling===null;){if(a.return===null||a.return===t)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},Ip=function(e,t){},N1=function(e,t,n,r,a){var u=e.memoizedProps;if(u!==r){var f=t.stateNode,g=Oh(),x=RE(f,n,u,r,a,g);t.updateQueue=x,x&&xs(t)}},R1=function(e,t,n,r){n!==r&&xs(t)};function fu(e,t){if(!yn())switch(e.tailMode){case"hidden":{for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e.tail=null:r.sibling=null;break}case"collapsed":{for(var a=e.tail,u=null;a!==null;)a.alternate!==null&&(u=a),a=a.sibling;u===null?!t&&e.tail!==null?e.tail.sibling=null:e.tail=null:u.sibling=null;break}}}function bn(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=J,r=De;if(t){if((e.mode&ht)!==ke){for(var x=e.selfBaseDuration,E=e.child;E!==null;)n=Ie(n,Ie(E.lanes,E.childLanes)),r|=E.subtreeFlags&Vi,r|=E.flags&Vi,x+=E.treeBaseDuration,E=E.sibling;e.treeBaseDuration=x}else for(var k=e.child;k!==null;)n=Ie(n,Ie(k.lanes,k.childLanes)),r|=k.subtreeFlags&Vi,r|=k.flags&Vi,k.return=e,k=k.sibling;e.subtreeFlags|=r}else{if((e.mode&ht)!==ke){for(var a=e.actualDuration,u=e.selfBaseDuration,f=e.child;f!==null;)n=Ie(n,Ie(f.lanes,f.childLanes)),r|=f.subtreeFlags,r|=f.flags,a+=f.actualDuration,u+=f.treeBaseDuration,f=f.sibling;e.actualDuration=a,e.treeBaseDuration=u}else for(var g=e.child;g!==null;)n=Ie(n,Ie(g.lanes,g.childLanes)),r|=g.subtreeFlags,r|=g.flags,g.return=e,g=g.sibling;e.subtreeFlags|=r}return e.childLanes=n,t}function a4(e,t,n){if(GC()&&(t.mode&Qe)!==ke&&(t.flags&lt)===De)return ay(t),ls(),t.flags|=Li|al|Bn,!1;var r=$c(t);if(n!==null&&n.dehydrated!==null)if(e===null){if(!r)throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");if(jC(t),bn(t),(t.mode&ht)!==ke){var a=n!==null;if(a){var u=t.child;u!==null&&(t.treeBaseDuration-=u.treeBaseDuration)}}return!1}else{if(ls(),(t.flags&lt)===De&&(t.memoizedState=null),t.flags|=tt,bn(t),(t.mode&ht)!==ke){var f=n!==null;if(f){var g=t.child;g!==null&&(t.treeBaseDuration-=g.treeBaseDuration)}}return!1}else return sy(),!0}function D1(e,t,n){var r=t.pendingProps;switch(mh(t),t.tag){case _:case X:case z:case h:case K:case F:case q:case Z:case $:case ne:return bn(t),null;case p:{var a=t.type;return yi(a)&&Hc(t),bn(t),null}case S:{var u=t.stateNode;if(fs(t),uh(t),Vh(),u.pendingContext&&(u.context=u.pendingContext,u.pendingContext=null),e===null||e.child===null){var f=$c(t);if(f)xs(t);else if(e!==null){var g=e.memoizedState;(!g.isDehydrated||(t.flags&Li)!==De)&&(t.flags|=Zo,sy())}}return Ip(e,t),bn(t),null}case C:{Fh(t);var x=wy(),E=t.type;if(e!==null&&t.stateNode!=null)N1(e,t,E,r,x),e.ref!==t.ref&&T1(t);else{if(!r){if(t.stateNode===null)throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");return bn(t),null}var k=Oh(),P=$c(t);if(P)VC(t,x,k)&&xs(t);else{var M=TE(E,r,x,k,t);k1(M,t,!1,!1),t.stateNode=M,NE(M,E,r,x)&&xs(t)}t.ref!==null&&T1(t)}return bn(t),null}case D:{var L=r;if(e&&t.stateNode!=null){var V=e.memoizedProps;R1(e,t,V,L)}else{if(typeof L!="string"&&t.stateNode===null)throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");var G=wy(),de=Oh(),Ee=$c(t);Ee?IC(t)&&xs(t):t.stateNode=DE(L,G,de,t)}return bn(t),null}case I:{hs(t);var be=t.memoizedState;if(e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){var Je=a4(e,t,be);if(!Je)return t.flags&Bn?t:null}if((t.flags&lt)!==De)return t.lanes=n,(t.mode&ht)!==ke&&dp(t),t;var qe=be!==null,A=e!==null&&e.memoizedState!==null;if(qe!==A&&qe){var W=t.child;if(W.flags|=Jo,(t.mode&Qe)!==ke){var O=e===null&&(t.memoizedProps.unstable_avoidThisFallback!==!0||!qn);O||Lh(Jr.current,Cy)?sk():ov()}}var te=t.updateQueue;if(te!==null&&(t.flags|=tt),bn(t),(t.mode&ht)!==ke&&qe){var ve=t.child;ve!==null&&(t.treeBaseDuration-=ve.treeBaseDuration)}return null}case T:return fs(t),Ip(e,t),e===null&&SC(t.stateNode.containerInfo),bn(t),null;case j:var fe=t.type._context;return kh(fe,t),bn(t),null;case re:{var Pe=t.type;return yi(Pe)&&Hc(t),bn(t),null}case le:{hs(t);var Ue=t.memoizedState;if(Ue===null)return bn(t),null;var vt=(t.flags&lt)!==De,ot=Ue.rendering;if(ot===null)if(vt)fu(Ue,!1);else{var Ht=uk()&&(e===null||(e.flags&lt)===De);if(!Ht)for(var at=t.child;at!==null;){var Ut=dd(at);if(Ut!==null){vt=!0,t.flags|=lt,fu(Ue,!1);var On=Ut.updateQueue;return On!==null&&(t.updateQueue=On,t.flags|=tt),t.subtreeFlags=De,QC(t,n),No(t,Uh(Jr.current,Jl)),t.child}at=at.sibling}Ue.tail!==null&&cn()>Q1()&&(t.flags|=lt,vt=!0,fu(Ue,!1),t.lanes=R0)}else{if(!vt){var Cn=dd(ot);if(Cn!==null){t.flags|=lt,vt=!0;var xr=Cn.updateQueue;if(xr!==null&&(t.updateQueue=xr,t.flags|=tt),fu(Ue,!0),Ue.tail===null&&Ue.tailMode==="hidden"&&!ot.alternate&&!yn())return bn(t),null}else cn()*2-Ue.renderingStartTime>Q1()&&n!==fr&&(t.flags|=lt,vt=!0,fu(Ue,!1),t.lanes=R0)}if(Ue.isBackwards)ot.sibling=t.child,t.child=ot;else{var Hn=Ue.last;Hn!==null?Hn.sibling=ot:t.child=ot,Ue.last=ot}}if(Ue.tail!==null){var Gn=Ue.tail;Ue.rendering=Gn,Ue.tail=Gn.sibling,Ue.renderingStartTime=cn(),Gn.sibling=null;var Fn=Jr.current;return vt?Fn=Uh(Fn,Jl):Fn=ms(Fn),No(t,Fn),Gn}return bn(t),null}case ze:break;case _e:case ye:{iv(t);var to=t.memoizedState,ks=to!==null;if(e!==null){var Nu=e.memoizedState,Ti=Nu!==null;Ti!==ks&&!Yn&&(t.flags|=Jo)}return!ks||(t.mode&Qe)===ke?bn(t):mr(Ci,fr)&&(bn(t),t.subtreeFlags&(qt|tt)&&(t.flags|=Jo)),null}case et:return null;case gt:return null}throw new Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function s4(e,t,n){switch(mh(t),t.tag){case p:{var r=t.type;yi(r)&&Hc(t);var a=t.flags;return a&Bn?(t.flags=a&~Bn|lt,(t.mode&ht)!==ke&&dp(t),t):null}case S:{t.stateNode,fs(t),uh(t),Vh();var u=t.flags;return(u&Bn)!==De&&(u&lt)===De?(t.flags=u&~Bn|lt,t):null}case C:return Fh(t),null;case I:{hs(t);var f=t.memoizedState;if(f!==null&&f.dehydrated!==null){if(t.alternate===null)throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");ls()}var g=t.flags;return g&Bn?(t.flags=g&~Bn|lt,(t.mode&ht)!==ke&&dp(t),t):null}case le:return hs(t),null;case T:return fs(t),null;case j:var x=t.type._context;return kh(x,t),null;case _e:case ye:return iv(t),null;case et:return null;default:return null}}function M1(e,t,n){switch(mh(t),t.tag){case p:{var r=t.type.childContextTypes;r!=null&&Hc(t);break}case S:{t.stateNode,fs(t),uh(t),Vh();break}case C:{Fh(t);break}case T:fs(t);break;case I:hs(t);break;case le:hs(t);break;case j:var a=t.type._context;kh(a,t);break;case _e:case ye:iv(t);break}}var P1=null;P1=new Set;var Od=!1,_n=!1,l4=typeof WeakSet=="function"?WeakSet:Set,ge=null,bs=null,_s=null;function u4(e){Hf(null,function(){throw e}),Gf()}var c4=function(e,t){if(t.props=e.memoizedProps,t.state=e.memoizedState,e.mode&ht)try{Si(),t.componentWillUnmount()}finally{wi(e)}else t.componentWillUnmount()};function z1(e,t){try{Mo(Jt,e)}catch(n){wt(e,t,n)}}function jp(e,t,n){try{c4(e,n)}catch(r){wt(e,t,r)}}function d4(e,t,n){try{n.componentDidMount()}catch(r){wt(e,t,r)}}function A1(e,t){try{F1(e)}catch(n){wt(e,t,n)}}function ws(e,t){var n=e.ref;if(n!==null)if(typeof n=="function"){var r;try{if(Vr&&Ir&&e.mode&ht)try{Si(),r=n(null)}finally{wi(e)}else r=n(null)}catch(a){wt(e,t,a)}typeof r=="function"&&c("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",Be(e))}else n.current=null}function Fd(e,t,n){try{n()}catch(r){wt(e,t,r)}}var O1=!1;function f4(e,t){EE(e.containerInfo),ge=t,m4();var n=O1;return O1=!1,n}function m4(){for(;ge!==null;){var e=ge,t=e.child;(e.subtreeFlags&$f)!==De&&t!==null?(t.return=e,ge=t):h4()}}function h4(){for(;ge!==null;){var e=ge;zt(e);try{p4(e)}catch(n){wt(e,e.return,n)}un();var t=e.sibling;if(t!==null){t.return=e.return,ge=t;return}ge=e.return}}function p4(e){var t=e.alternate,n=e.flags;if((n&Zo)!==De){switch(zt(e),e.tag){case h:case K:case z:break;case p:{if(t!==null){var r=t.memoizedProps,a=t.memoizedState,u=e.stateNode;e.type===e.elementType&&!xa&&(u.props!==e.memoizedProps&&c("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Be(e)||"instance"),u.state!==e.memoizedState&&c("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Be(e)||"instance"));var f=u.getSnapshotBeforeUpdate(e.elementType===e.type?r:ti(e.type,r),a);{var g=P1;f===void 0&&!g.has(e.type)&&(g.add(e.type),c("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",Be(e)))}u.__reactInternalSnapshotBeforeUpdate=f}break}case S:{{var x=e.stateNode;$E(x.containerInfo)}break}case C:case D:case T:case re:break;default:throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}un()}}function ri(e,t,n){var r=t.updateQueue,a=r!==null?r.lastEffect:null;if(a!==null){var u=a.next,f=u;do{if((f.tag&e)===e){var g=f.destroy;f.destroy=void 0,g!==void 0&&((e&xn)!==tr?Dw(t):(e&Jt)!==tr&&E0(t),(e&xi)!==tr&&Cu(!0),Fd(t,n,g),(e&xi)!==tr&&Cu(!1),(e&xn)!==tr?Mw():(e&Jt)!==tr&&C0())}f=f.next}while(f!==u)}}function Mo(e,t){var n=t.updateQueue,r=n!==null?n.lastEffect:null;if(r!==null){var a=r.next,u=a;do{if((u.tag&e)===e){(e&xn)!==tr?Nw(t):(e&Jt)!==tr&&Pw(t);var f=u.create;(e&xi)!==tr&&Cu(!0),u.destroy=f(),(e&xi)!==tr&&Cu(!1),(e&xn)!==tr?Rw():(e&Jt)!==tr&&zw();{var g=u.destroy;if(g!==void 0&&typeof g!="function"){var x=void 0;(u.tag&Jt)!==De?x="useLayoutEffect":(u.tag&xi)!==De?x="useInsertionEffect":x="useEffect";var E=void 0;g===null?E=" You returned null. If your effect does not require clean up, return undefined (or nothing).":typeof g.then=="function"?E=`

It looks like you wrote `+x+`(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

`+x+`(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching`:E=" You returned: "+g,c("%s must not return anything besides a function, which is used for clean-up.%s",x,E)}}}u=u.next}while(u!==a)}}function v4(e,t){if((t.flags&tt)!==De)switch(t.tag){case Z:{var n=t.stateNode.passiveEffectDuration,r=t.memoizedProps,a=r.id,u=r.onPostCommit,f=Qy(),g=t.alternate===null?"mount":"update";Ky()&&(g="nested-update"),typeof u=="function"&&u(a,g,n,f);var x=t.return;e:for(;x!==null;){switch(x.tag){case S:var E=x.stateNode;E.passiveEffectDuration+=n;break e;case Z:var k=x.stateNode;k.passiveEffectDuration+=n;break e}x=x.return}break}}}function g4(e,t,n,r){if((n.flags&sl)!==De)switch(n.tag){case h:case K:case z:{if(!_n)if(n.mode&ht)try{Si(),Mo(Jt|Zt,n)}finally{wi(n)}else Mo(Jt|Zt,n);break}case p:{var a=n.stateNode;if(n.flags&tt&&!_n)if(t===null)if(n.type===n.elementType&&!xa&&(a.props!==n.memoizedProps&&c("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Be(n)||"instance"),a.state!==n.memoizedState&&c("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Be(n)||"instance")),n.mode&ht)try{Si(),a.componentDidMount()}finally{wi(n)}else a.componentDidMount();else{var u=n.elementType===n.type?t.memoizedProps:ti(n.type,t.memoizedProps),f=t.memoizedState;if(n.type===n.elementType&&!xa&&(a.props!==n.memoizedProps&&c("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Be(n)||"instance"),a.state!==n.memoizedState&&c("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Be(n)||"instance")),n.mode&ht)try{Si(),a.componentDidUpdate(u,f,a.__reactInternalSnapshotBeforeUpdate)}finally{wi(n)}else a.componentDidUpdate(u,f,a.__reactInternalSnapshotBeforeUpdate)}var g=n.updateQueue;g!==null&&(n.type===n.elementType&&!xa&&(a.props!==n.memoizedProps&&c("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Be(n)||"instance"),a.state!==n.memoizedState&&c("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Be(n)||"instance")),_y(n,g,a));break}case S:{var x=n.updateQueue;if(x!==null){var E=null;if(n.child!==null)switch(n.child.tag){case C:E=n.child.stateNode;break;case p:E=n.child.stateNode;break}_y(n,x,E)}break}case C:{var k=n.stateNode;if(t===null&&n.flags&tt){var P=n.type,M=n.memoizedProps;OE(k,P,M)}break}case D:break;case T:break;case Z:{{var L=n.memoizedProps,V=L.onCommit,G=L.onRender,de=n.stateNode.effectDuration,Ee=Qy(),be=t===null?"mount":"update";Ky()&&(be="nested-update"),typeof G=="function"&&G(n.memoizedProps.id,be,n.actualDuration,n.treeBaseDuration,n.actualStartTime,Ee);{typeof V=="function"&&V(n.memoizedProps.id,be,de,Ee),hk(n);var Je=n.return;e:for(;Je!==null;){switch(Je.tag){case S:var qe=Je.stateNode;qe.effectDuration+=de;break e;case Z:var A=Je.stateNode;A.effectDuration+=de;break e}Je=Je.return}}}break}case I:{C4(e,n);break}case le:case re:case ze:case _e:case ye:case gt:break;default:throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}_n||n.flags&ho&&F1(n)}function y4(e){switch(e.tag){case h:case K:case z:{if(e.mode&ht)try{Si(),z1(e,e.return)}finally{wi(e)}else z1(e,e.return);break}case p:{var t=e.stateNode;typeof t.componentDidMount=="function"&&d4(e,e.return,t),A1(e,e.return);break}case C:{A1(e,e.return);break}}}function x4(e,t){for(var n=null,r=e;;){if(r.tag===C){if(n===null){n=r;try{var a=r.stateNode;t?WE(a):qE(r.stateNode,r.memoizedProps)}catch(f){wt(e,e.return,f)}}}else if(r.tag===D){if(n===null)try{var u=r.stateNode;t?YE(u):XE(u,r.memoizedProps)}catch(f){wt(e,e.return,f)}}else if(!((r.tag===_e||r.tag===ye)&&r.memoizedState!==null&&r!==e)){if(r.child!==null){r.child.return=r,r=r.child;continue}}if(r===e)return;for(;r.sibling===null;){if(r.return===null||r.return===e)return;n===r&&(n=null),r=r.return}n===r&&(n=null),r.sibling.return=r.return,r=r.sibling}}function F1(e){var t=e.ref;if(t!==null){var n=e.stateNode,r;switch(e.tag){case C:r=n;break;default:r=n}if(typeof t=="function"){var a;if(e.mode&ht)try{Si(),a=t(r)}finally{wi(e)}else a=t(r);typeof a=="function"&&c("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",Be(e))}else t.hasOwnProperty("current")||c("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",Be(e)),t.current=r}}function b4(e){var t=e.alternate;t!==null&&(t.return=null),e.return=null}function L1(e){var t=e.alternate;t!==null&&(e.alternate=null,L1(t));{if(e.child=null,e.deletions=null,e.sibling=null,e.tag===C){var n=e.stateNode;n!==null&&TC(n)}e.stateNode=null,e._debugOwner=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}}function _4(e){for(var t=e.return;t!==null;){if(U1(t))return t;t=t.return}throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.")}function U1(e){return e.tag===C||e.tag===S||e.tag===T}function B1(e){var t=e;e:for(;;){for(;t.sibling===null;){if(t.return===null||U1(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==C&&t.tag!==D&&t.tag!==se;){if(t.flags&qt||t.child===null||t.tag===T)continue e;t.child.return=t,t=t.child}if(!(t.flags&qt))return t.stateNode}}function w4(e){var t=_4(e);switch(t.tag){case C:{var n=t.stateNode;t.flags&ol&&(Ig(n),t.flags&=~ol);var r=B1(e);Gp(e,r,n);break}case S:case T:{var a=t.stateNode.containerInfo,u=B1(e);Hp(e,u,a);break}default:throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.")}}function Hp(e,t,n){var r=e.tag,a=r===C||r===D;if(a){var u=e.stateNode;t?IE(n,u,t):BE(n,u)}else if(r!==T){var f=e.child;if(f!==null){Hp(f,t,n);for(var g=f.sibling;g!==null;)Hp(g,t,n),g=g.sibling}}}function Gp(e,t,n){var r=e.tag,a=r===C||r===D;if(a){var u=e.stateNode;t?VE(n,u,t):UE(n,u)}else if(r!==T){var f=e.child;if(f!==null){Gp(f,t,n);for(var g=f.sibling;g!==null;)Gp(g,t,n),g=g.sibling}}}var wn=null,ii=!1;function S4(e,t,n){{var r=t;e:for(;r!==null;){switch(r.tag){case C:{wn=r.stateNode,ii=!1;break e}case S:{wn=r.stateNode.containerInfo,ii=!0;break e}case T:{wn=r.stateNode.containerInfo,ii=!0;break e}}r=r.return}if(wn===null)throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");V1(e,t,n),wn=null,ii=!1}b4(n)}function Po(e,t,n){for(var r=n.child;r!==null;)V1(e,t,r),r=r.sibling}function V1(e,t,n){switch(Ew(n),n.tag){case C:_n||ws(n,t);case D:{{var r=wn,a=ii;wn=null,Po(e,t,n),wn=r,ii=a,wn!==null&&(ii?HE(wn,n.stateNode):jE(wn,n.stateNode))}return}case se:{wn!==null&&(ii?GE(wn,n.stateNode):th(wn,n.stateNode));return}case T:{{var u=wn,f=ii;wn=n.stateNode.containerInfo,ii=!0,Po(e,t,n),wn=u,ii=f}return}case h:case K:case ne:case z:{if(!_n){var g=n.updateQueue;if(g!==null){var x=g.lastEffect;if(x!==null){var E=x.next,k=E;do{var P=k,M=P.destroy,L=P.tag;M!==void 0&&((L&xi)!==tr?Fd(n,t,M):(L&Jt)!==tr&&(E0(n),n.mode&ht?(Si(),Fd(n,t,M),wi(n)):Fd(n,t,M),C0())),k=k.next}while(k!==E)}}}Po(e,t,n);return}case p:{if(!_n){ws(n,t);var V=n.stateNode;typeof V.componentWillUnmount=="function"&&jp(n,t,V)}Po(e,t,n);return}case ze:{Po(e,t,n);return}case _e:{if(n.mode&Qe){var G=_n;_n=G||n.memoizedState!==null,Po(e,t,n),_n=G}else Po(e,t,n);break}default:{Po(e,t,n);return}}}function E4(e){e.memoizedState}function C4(e,t){var n=t.memoizedState;if(n===null){var r=t.alternate;if(r!==null){var a=r.memoizedState;if(a!==null){var u=a.dehydrated;u!==null&&uC(u)}}}}function I1(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new l4),t.forEach(function(r){var a=_k.bind(null,e,r);if(!n.has(r)){if(n.add(r),Xr)if(bs!==null&&_s!==null)Eu(_s,bs);else throw Error("Expected finished root and lanes to be set. This is a bug in React.");r.then(a,a)}})}}function T4(e,t,n){bs=n,_s=e,zt(t),j1(t,e),zt(t),bs=null,_s=null}function oi(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var u=r[a];try{S4(e,t,u)}catch(x){wt(u,t,x)}}var f=Yu();if(t.subtreeFlags&Kf)for(var g=t.child;g!==null;)zt(g),j1(g,e),g=g.sibling;zt(f)}function j1(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case h:case K:case ne:case z:{if(oi(t,e),Ei(e),a&tt){try{ri(xi|Zt,e,e.return),Mo(xi|Zt,e)}catch(Pe){wt(e,e.return,Pe)}if(e.mode&ht){try{Si(),ri(Jt|Zt,e,e.return)}catch(Pe){wt(e,e.return,Pe)}wi(e)}else try{ri(Jt|Zt,e,e.return)}catch(Pe){wt(e,e.return,Pe)}}return}case p:{oi(t,e),Ei(e),a&ho&&r!==null&&ws(r,r.return);return}case C:{oi(t,e),Ei(e),a&ho&&r!==null&&ws(r,r.return);{if(e.flags&ol){var u=e.stateNode;try{Ig(u)}catch(Pe){wt(e,e.return,Pe)}}if(a&tt){var f=e.stateNode;if(f!=null){var g=e.memoizedProps,x=r!==null?r.memoizedProps:g,E=e.type,k=e.updateQueue;if(e.updateQueue=null,k!==null)try{FE(f,k,E,x,g,e)}catch(Pe){wt(e,e.return,Pe)}}}}return}case D:{if(oi(t,e),Ei(e),a&tt){if(e.stateNode===null)throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");var P=e.stateNode,M=e.memoizedProps,L=r!==null?r.memoizedProps:M;try{LE(P,L,M)}catch(Pe){wt(e,e.return,Pe)}}return}case S:{if(oi(t,e),Ei(e),a&tt&&r!==null){var V=r.memoizedState;if(V.isDehydrated)try{lC(t.containerInfo)}catch(Pe){wt(e,e.return,Pe)}}return}case T:{oi(t,e),Ei(e);return}case I:{oi(t,e),Ei(e);var G=e.child;if(G.flags&Jo){var de=G.stateNode,Ee=G.memoizedState,be=Ee!==null;if(de.isHidden=be,be){var Je=G.alternate!==null&&G.alternate.memoizedState!==null;Je||ak()}}if(a&tt){try{E4(e)}catch(Pe){wt(e,e.return,Pe)}I1(e)}return}case _e:{var qe=r!==null&&r.memoizedState!==null;if(e.mode&Qe){var A=_n;_n=A||qe,oi(t,e),_n=A}else oi(t,e);if(Ei(e),a&Jo){var W=e.stateNode,O=e.memoizedState,te=O!==null,ve=e;if(W.isHidden=te,te&&!qe&&(ve.mode&Qe)!==ke){ge=ve;for(var fe=ve.child;fe!==null;)ge=fe,N4(fe),fe=fe.sibling}x4(ve,te)}return}case le:{oi(t,e),Ei(e),a&tt&&I1(e);return}case ze:return;default:{oi(t,e),Ei(e);return}}}function Ei(e){var t=e.flags;if(t&qt){try{w4(e)}catch(n){wt(e,e.return,n)}e.flags&=~qt}t&Ui&&(e.flags&=~Ui)}function k4(e,t,n){bs=n,_s=t,ge=e,H1(e,t,n),bs=null,_s=null}function H1(e,t,n){for(var r=(e.mode&Qe)!==ke;ge!==null;){var a=ge,u=a.child;if(a.tag===_e&&r){var f=a.memoizedState!==null,g=f||Od;if(g){Wp(e,t,n);continue}else{var x=a.alternate,E=x!==null&&x.memoizedState!==null,k=E||_n,P=Od,M=_n;Od=g,_n=k,_n&&!M&&(ge=a,R4(a));for(var L=u;L!==null;)ge=L,H1(L,t,n),L=L.sibling;ge=a,Od=P,_n=M,Wp(e,t,n);continue}}(a.subtreeFlags&sl)!==De&&u!==null?(u.return=a,ge=u):Wp(e,t,n)}}function Wp(e,t,n){for(;ge!==null;){var r=ge;if((r.flags&sl)!==De){var a=r.alternate;zt(r);try{g4(t,a,r,n)}catch(f){wt(r,r.return,f)}un()}if(r===e){ge=null;return}var u=r.sibling;if(u!==null){u.return=r.return,ge=u;return}ge=r.return}}function N4(e){for(;ge!==null;){var t=ge,n=t.child;switch(t.tag){case h:case K:case ne:case z:{if(t.mode&ht)try{Si(),ri(Jt,t,t.return)}finally{wi(t)}else ri(Jt,t,t.return);break}case p:{ws(t,t.return);var r=t.stateNode;typeof r.componentWillUnmount=="function"&&jp(t,t.return,r);break}case C:{ws(t,t.return);break}case _e:{var a=t.memoizedState!==null;if(a){G1(e);continue}break}}n!==null?(n.return=t,ge=n):G1(e)}}function G1(e){for(;ge!==null;){var t=ge;if(t===e){ge=null;return}var n=t.sibling;if(n!==null){n.return=t.return,ge=n;return}ge=t.return}}function R4(e){for(;ge!==null;){var t=ge,n=t.child;if(t.tag===_e){var r=t.memoizedState!==null;if(r){W1(e);continue}}n!==null?(n.return=t,ge=n):W1(e)}}function W1(e){for(;ge!==null;){var t=ge;zt(t);try{y4(t)}catch(r){wt(t,t.return,r)}if(un(),t===e){ge=null;return}var n=t.sibling;if(n!==null){n.return=t.return,ge=n;return}ge=t.return}}function D4(e,t,n,r){ge=t,M4(t,e,n,r)}function M4(e,t,n,r){for(;ge!==null;){var a=ge,u=a.child;(a.subtreeFlags&ja)!==De&&u!==null?(u.return=a,ge=u):P4(e,t,n,r)}}function P4(e,t,n,r){for(;ge!==null;){var a=ge;if((a.flags&qr)!==De){zt(a);try{z4(t,a,n,r)}catch(f){wt(a,a.return,f)}un()}if(a===e){ge=null;return}var u=a.sibling;if(u!==null){u.return=a.return,ge=u;return}ge=a.return}}function z4(e,t,n,r){switch(t.tag){case h:case K:case z:{if(t.mode&ht){cp();try{Mo(xn|Zt,t)}finally{up(t)}}else Mo(xn|Zt,t);break}}}function A4(e){ge=e,O4()}function O4(){for(;ge!==null;){var e=ge,t=e.child;if((ge.flags&Qo)!==De){var n=e.deletions;if(n!==null){for(var r=0;r<n.length;r++){var a=n[r];ge=a,U4(a,e)}{var u=e.alternate;if(u!==null){var f=u.child;if(f!==null){u.child=null;do{var g=f.sibling;f.sibling=null,f=g}while(f!==null)}}}ge=e}}(e.subtreeFlags&ja)!==De&&t!==null?(t.return=e,ge=t):F4()}}function F4(){for(;ge!==null;){var e=ge;(e.flags&qr)!==De&&(zt(e),L4(e),un());var t=e.sibling;if(t!==null){t.return=e.return,ge=t;return}ge=e.return}}function L4(e){switch(e.tag){case h:case K:case z:{e.mode&ht?(cp(),ri(xn|Zt,e,e.return),up(e)):ri(xn|Zt,e,e.return);break}}}function U4(e,t){for(;ge!==null;){var n=ge;zt(n),V4(n,t),un();var r=n.child;r!==null?(r.return=n,ge=r):B4(e)}}function B4(e){for(;ge!==null;){var t=ge,n=t.sibling,r=t.return;if(L1(t),t===e){ge=null;return}if(n!==null){n.return=r,ge=n;return}ge=r}}function V4(e,t){switch(e.tag){case h:case K:case z:{e.mode&ht?(cp(),ri(xn,e,t),up(e)):ri(xn,e,t);break}}}function I4(e){switch(e.tag){case h:case K:case z:{try{Mo(Jt|Zt,e)}catch(n){wt(e,e.return,n)}break}case p:{var t=e.stateNode;try{t.componentDidMount()}catch(n){wt(e,e.return,n)}break}}}function j4(e){switch(e.tag){case h:case K:case z:{try{Mo(xn|Zt,e)}catch(t){wt(e,e.return,t)}break}}}function H4(e){switch(e.tag){case h:case K:case z:{try{ri(Jt|Zt,e,e.return)}catch(n){wt(e,e.return,n)}break}case p:{var t=e.stateNode;typeof t.componentWillUnmount=="function"&&jp(e,e.return,t);break}}}function G4(e){switch(e.tag){case h:case K:case z:try{ri(xn|Zt,e,e.return)}catch(t){wt(e,e.return,t)}}}if(typeof Symbol=="function"&&Symbol.for){var mu=Symbol.for;mu("selector.component"),mu("selector.has_pseudo_class"),mu("selector.role"),mu("selector.test_id"),mu("selector.text")}var W4=[];function Y4(){W4.forEach(function(e){return e()})}var q4=i.ReactCurrentActQueue;function X4(e){{var t=typeof IS_REACT_ACT_ENVIRONMENT<"u"?IS_REACT_ACT_ENVIRONMENT:void 0,n=typeof jest<"u";return n&&t!==!1}}function Y1(){{var e=typeof IS_REACT_ACT_ENVIRONMENT<"u"?IS_REACT_ACT_ENVIRONMENT:void 0;return!e&&q4.current!==null&&c("The current testing environment is not configured to support act(...)"),e}}var $4=Math.ceil,Yp=i.ReactCurrentDispatcher,qp=i.ReactCurrentOwner,Sn=i.ReactCurrentBatchConfig,ai=i.ReactCurrentActQueue,nn=0,q1=1,En=2,Ar=4,Qi=0,hu=1,ba=2,Ld=3,pu=4,X1=5,Xp=6,Ze=nn,In=null,At=null,rn=J,Ci=J,$p=wo(J),on=Qi,vu=null,Ud=J,gu=J,Bd=J,yu=null,nr=null,Kp=0,$1=500,K1=1/0,K4=500,Zi=null;function xu(){K1=cn()+K4}function Q1(){return K1}var Vd=!1,Qp=null,Ss=null,_a=!1,zo=null,bu=J,Zp=[],Jp=null,Q4=50,_u=0,ev=null,tv=!1,Id=!1,Z4=50,Es=0,jd=null,wu=St,Hd=J,Z1=!1;function Gd(){return In}function jn(){return(Ze&(En|Ar))!==nn?cn():(wu!==St||(wu=cn()),wu)}function Ao(e){var t=e.mode;if((t&Qe)===ke)return Fe;if((Ze&En)!==nn&&rn!==J)return hl(rn);var n=qC()!==YC;if(n){if(Sn.transition!==null){var r=Sn.transition;r._updatedFibers||(r._updatedFibers=new Set),r._updatedFibers.add(e)}return Hd===fn&&(Hd=z0()),Hd}var a=$r();if(a!==fn)return a;var u=ME();return u}function J4(e){var t=e.mode;return(t&Qe)===ke?Fe:tS()}function an(e,t,n,r){Sk(),Z1&&c("useInsertionEffect must not schedule updates."),tv&&(Id=!0),pl(e,n,r),(Ze&En)!==J&&e===In?Tk(t):(Xr&&F0(e,t,n),kk(t),e===In&&((Ze&En)===nn&&(gu=Ie(gu,n)),on===pu&&Oo(e,rn)),rr(e,r),n===Fe&&Ze===nn&&(t.mode&Qe)===ke&&!ai.isBatchingLegacy&&(xu(),Zg()))}function ek(e,t,n){var r=e.current;r.lanes=t,pl(e,t,n),rr(e,n)}function tk(e){return(Ze&En)!==nn}function rr(e,t){var n=e.callbackNode;$w(e,t);var r=dc(e,e===In?rn:J);if(r===J){n!==null&&hx(n),e.callbackNode=null,e.callbackPriority=fn;return}var a=oa(r),u=e.callbackPriority;if(u===a&&!(ai.current!==null&&n!==lv)){n==null&&u!==Fe&&c("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");return}n!=null&&hx(n);var f;if(a===Fe)e.tag===So?(ai.isBatchingLegacy!==null&&(ai.didScheduleLegacyUpdate=!0),RC(tx.bind(null,e))):Qg(tx.bind(null,e)),ai.current!==null?ai.current.push(Eo):zE(function(){(Ze&(En|Ar))===nn&&Eo()}),f=null;else{var g;switch(B0(r)){case hr:g=sc;break;case ji:g=Qf;break;case Hi:g=na;break;case hc:g=Zf;break;default:g=na;break}f=uv(g,J1.bind(null,e))}e.callbackPriority=a,e.callbackNode=f}function J1(e,t){if(xT(),wu=St,Hd=J,(Ze&(En|Ar))!==nn)throw new Error("Should not already be working.");var n=e.callbackNode,r=eo();if(r&&e.callbackNode!==n)return null;var a=dc(e,e===In?rn:J);if(a===J)return null;var u=!fc(e,a)&&!eS(e,a)&&!t,f=u?dk(e,a):Yd(e,a);if(f!==Qi){if(f===ba){var g=bm(e);g!==J&&(a=g,f=nv(e,g))}if(f===hu){var x=vu;throw wa(e,J),Oo(e,a),rr(e,cn()),x}if(f===Xp)Oo(e,a);else{var E=!fc(e,a),k=e.current.alternate;if(E&&!rk(k)){if(f=Yd(e,a),f===ba){var P=bm(e);P!==J&&(a=P,f=nv(e,P))}if(f===hu){var M=vu;throw wa(e,J),Oo(e,a),rr(e,cn()),M}}e.finishedWork=k,e.finishedLanes=a,nk(e,f,a)}}return rr(e,cn()),e.callbackNode===n?J1.bind(null,e):null}function nv(e,t){var n=yu;if(pc(e)){var r=wa(e,t);r.flags|=Li,wC(e.containerInfo)}var a=Yd(e,t);if(a!==ba){var u=nr;nr=n,u!==null&&ex(u)}return a}function ex(e){nr===null?nr=e:nr.push.apply(nr,e)}function nk(e,t,n){switch(t){case Qi:case hu:throw new Error("Root did not complete. This is a bug in React.");case ba:{Sa(e,nr,Zi);break}case Ld:{if(Oo(e,n),M0(n)&&!px()){var r=Kp+$1-cn();if(r>10){var a=dc(e,J);if(a!==J)break;var u=e.suspendedLanes;if(!Xa(u,n)){jn(),O0(e,u);break}e.timeoutHandle=Jm(Sa.bind(null,e,nr,Zi),r);break}}Sa(e,nr,Zi);break}case pu:{if(Oo(e,n),Jw(n))break;if(!px()){var f=qw(e,n),g=f,x=cn()-g,E=wk(x)-x;if(E>10){e.timeoutHandle=Jm(Sa.bind(null,e,nr,Zi),E);break}}Sa(e,nr,Zi);break}case X1:{Sa(e,nr,Zi);break}default:throw new Error("Unknown root exit status.")}}function rk(e){for(var t=e;;){if(t.flags&oc){var n=t.updateQueue;if(n!==null){var r=n.stores;if(r!==null)for(var a=0;a<r.length;a++){var u=r[a],f=u.getSnapshot,g=u.value;try{if(!vr(f(),g))return!1}catch{return!1}}}}var x=t.child;if(t.subtreeFlags&oc&&x!==null){x.return=t,t=x;continue}if(t===e)return!0;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}return!0}function Oo(e,t){t=mc(t,Bd),t=mc(t,gu),rS(e,t)}function tx(e){if(bT(),(Ze&(En|Ar))!==nn)throw new Error("Should not already be working.");eo();var t=dc(e,J);if(!mr(t,Fe))return rr(e,cn()),null;var n=Yd(e,t);if(e.tag!==So&&n===ba){var r=bm(e);r!==J&&(t=r,n=nv(e,r))}if(n===hu){var a=vu;throw wa(e,J),Oo(e,t),rr(e,cn()),a}if(n===Xp)throw new Error("Root did not complete. This is a bug in React.");var u=e.current.alternate;return e.finishedWork=u,e.finishedLanes=t,Sa(e,nr,Zi),rr(e,cn()),null}function ik(e,t){t!==J&&(Em(e,Ie(t,Fe)),rr(e,cn()),(Ze&(En|Ar))===nn&&(xu(),Eo()))}function rv(e,t){var n=Ze;Ze|=q1;try{return e(t)}finally{Ze=n,Ze===nn&&!ai.isBatchingLegacy&&(xu(),Zg())}}function ok(e,t,n,r,a){var u=$r(),f=Sn.transition;try{return Sn.transition=null,mn(hr),e(t,n,r,a)}finally{mn(u),Sn.transition=f,Ze===nn&&xu()}}function Ji(e){zo!==null&&zo.tag===So&&(Ze&(En|Ar))===nn&&eo();var t=Ze;Ze|=q1;var n=Sn.transition,r=$r();try{return Sn.transition=null,mn(hr),e?e():void 0}finally{mn(r),Sn.transition=n,Ze=t,(Ze&(En|Ar))===nn&&Eo()}}function nx(){return(Ze&(En|Ar))!==nn}function Wd(e,t){zn($p,Ci,e),Ci=Ie(Ci,t)}function iv(e){Ci=$p.current,Pn($p,e)}function wa(e,t){e.finishedWork=null,e.finishedLanes=J;var n=e.timeoutHandle;if(n!==eh&&(e.timeoutHandle=eh,PE(n)),At!==null)for(var r=At.return;r!==null;){var a=r.alternate;M1(a,r),r=r.return}In=e;var u=Ea(e.current,null);return At=u,rn=Ci=t,on=Qi,vu=null,Ud=J,gu=J,Bd=J,yu=null,nr=null,eT(),Zr.discardPendingWarnings(),u}function rx(e,t){do{var n=At;try{if(td(),ky(),un(),qp.current=null,n===null||n.return===null){on=hu,vu=t,At=null;return}if(Vr&&n.mode&ht&&Dd(n,!0),ci)if(Ga(),t!==null&&typeof t=="object"&&typeof t.then=="function"){var r=t;Ow(n,r,rn)}else Aw(n,t,rn);RT(e,n.return,n,t,rn),sx(n)}catch(a){t=a,At===n&&n!==null?(n=n.return,At=n):n=At;continue}return}while(!0)}function ix(){var e=Yp.current;return Yp.current=Cd,e===null?Cd:e}function ox(e){Yp.current=e}function ak(){Kp=cn()}function Su(e){Ud=Ie(e,Ud)}function sk(){on===Qi&&(on=Ld)}function ov(){(on===Qi||on===Ld||on===ba)&&(on=pu),In!==null&&(_m(Ud)||_m(gu))&&Oo(In,rn)}function lk(e){on!==pu&&(on=ba),yu===null?yu=[e]:yu.push(e)}function uk(){return on===Qi}function Yd(e,t){var n=Ze;Ze|=En;var r=ix();if(In!==e||rn!==t){if(Xr){var a=e.memoizedUpdaters;a.size>0&&(Eu(e,rn),a.clear()),L0(e,t)}Zi=U0(),wa(e,t)}T0(t);do try{ck();break}catch(u){rx(e,u)}while(!0);if(td(),Ze=n,ox(r),At!==null)throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");return k0(),In=null,rn=J,on}function ck(){for(;At!==null;)ax(At)}function dk(e,t){var n=Ze;Ze|=En;var r=ix();if(In!==e||rn!==t){if(Xr){var a=e.memoizedUpdaters;a.size>0&&(Eu(e,rn),a.clear()),L0(e,t)}Zi=U0(),xu(),wa(e,t)}T0(t);do try{fk();break}catch(u){rx(e,u)}while(!0);return td(),ox(r),Ze=n,At!==null?(Vw(),Qi):(k0(),In=null,rn=J,on)}function fk(){for(;At!==null&&!hw();)ax(At)}function ax(e){var t=e.alternate;zt(e);var n;(e.mode&ht)!==ke?(lp(e),n=av(t,e,Ci),Dd(e,!0)):n=av(t,e,Ci),un(),e.memoizedProps=e.pendingProps,n===null?sx(e):At=n,qp.current=null}function sx(e){var t=e;do{var n=t.alternate,r=t.return;if((t.flags&al)===De){zt(t);var a=void 0;if((t.mode&ht)===ke?a=D1(n,t,Ci):(lp(t),a=D1(n,t,Ci),Dd(t,!1)),un(),a!==null){At=a;return}}else{var u=s4(n,t);if(u!==null){u.flags&=lw,At=u;return}if((t.mode&ht)!==ke){Dd(t,!1);for(var f=t.actualDuration,g=t.child;g!==null;)f+=g.actualDuration,g=g.sibling;t.actualDuration=f}if(r!==null)r.flags|=al,r.subtreeFlags=De,r.deletions=null;else{on=Xp,At=null;return}}var x=t.sibling;if(x!==null){At=x;return}t=r,At=t}while(t!==null);on===Qi&&(on=X1)}function Sa(e,t,n){var r=$r(),a=Sn.transition;try{Sn.transition=null,mn(hr),mk(e,t,n,r)}finally{Sn.transition=a,mn(r)}return null}function mk(e,t,n,r){do eo();while(zo!==null);if(Ek(),(Ze&(En|Ar))!==nn)throw new Error("Should not already be working.");var a=e.finishedWork,u=e.finishedLanes;if(kw(u),a===null)return S0(),null;if(u===J&&c("root.finishedLanes should not be empty during a commit. This is a bug in React."),e.finishedWork=null,e.finishedLanes=J,a===e.current)throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");e.callbackNode=null,e.callbackPriority=fn;var f=Ie(a.lanes,a.childLanes);iS(e,f),e===In&&(In=null,At=null,rn=J),((a.subtreeFlags&ja)!==De||(a.flags&ja)!==De)&&(_a||(_a=!0,Jp=n,uv(na,function(){return eo(),null})));var g=(a.subtreeFlags&($f|Kf|sl|ja))!==De,x=(a.flags&($f|Kf|sl|ja))!==De;if(g||x){var E=Sn.transition;Sn.transition=null;var k=$r();mn(hr);var P=Ze;Ze|=Ar,qp.current=null,f4(e,a),Zy(),T4(e,a,u),CE(e.containerInfo),e.current=a,Fw(u),k4(a,e,u),Lw(),pw(),Ze=P,mn(k),Sn.transition=E}else e.current=a,Zy();var M=_a;if(_a?(_a=!1,zo=e,bu=u):(Es=0,jd=null),f=e.pendingLanes,f===J&&(Ss=null),M||dx(e.current,!1),ww(a.stateNode,r),Xr&&e.memoizedUpdaters.clear(),Y4(),rr(e,cn()),t!==null)for(var L=e.onRecoverableError,V=0;V<t.length;V++){var G=t[V],de=G.stack,Ee=G.digest;L(G.value,{componentStack:de,digest:Ee})}if(Vd){Vd=!1;var be=Qp;throw Qp=null,be}return mr(bu,Fe)&&e.tag!==So&&eo(),f=e.pendingLanes,mr(f,Fe)?(yT(),e===ev?_u++:(_u=0,ev=e)):_u=0,Eo(),S0(),null}function eo(){if(zo!==null){var e=B0(bu),t=lS(Hi,e),n=Sn.transition,r=$r();try{return Sn.transition=null,mn(t),pk()}finally{mn(r),Sn.transition=n}}return!1}function hk(e){Zp.push(e),_a||(_a=!0,uv(na,function(){return eo(),null}))}function pk(){if(zo===null)return!1;var e=Jp;Jp=null;var t=zo,n=bu;if(zo=null,bu=J,(Ze&(En|Ar))!==nn)throw new Error("Cannot flush passive effects while already rendering.");tv=!0,Id=!1,Uw(n);var r=Ze;Ze|=Ar,A4(t.current),D4(t,t.current,n,e);{var a=Zp;Zp=[];for(var u=0;u<a.length;u++){var f=a[u];v4(t,f)}}Bw(),dx(t.current,!0),Ze=r,Eo(),Id?t===jd?Es++:(Es=0,jd=t):Es=0,tv=!1,Id=!1,Sw(t);{var g=t.current.stateNode;g.effectDuration=0,g.passiveEffectDuration=0}return!0}function lx(e){return Ss!==null&&Ss.has(e)}function vk(e){Ss===null?Ss=new Set([e]):Ss.add(e)}function gk(e){Vd||(Vd=!0,Qp=e)}var yk=gk;function ux(e,t,n){var r=ya(n,t),a=a1(e,r,Fe),u=To(e,a,Fe),f=jn();u!==null&&(pl(u,Fe,f),rr(u,f))}function wt(e,t,n){if(u4(n),Cu(!1),e.tag===S){ux(e,e,n);return}var r=null;for(r=t;r!==null;){if(r.tag===S){ux(r,e,n);return}else if(r.tag===p){var a=r.type,u=r.stateNode;if(typeof a.getDerivedStateFromError=="function"||typeof u.componentDidCatch=="function"&&!lx(u)){var f=ya(n,e),g=Tp(r,f,Fe),x=To(r,g,Fe),E=jn();x!==null&&(pl(x,Fe,E),rr(x,E));return}}r=r.return}c(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,n)}function xk(e,t,n){var r=e.pingCache;r!==null&&r.delete(t);var a=jn();O0(e,n),Nk(e),In===e&&Xa(rn,n)&&(on===pu||on===Ld&&M0(rn)&&cn()-Kp<$1?wa(e,J):Bd=Ie(Bd,n)),rr(e,a)}function cx(e,t){t===fn&&(t=J4(e));var n=jn(),r=er(e,t);r!==null&&(pl(r,t,n),rr(r,n))}function bk(e){var t=e.memoizedState,n=fn;t!==null&&(n=t.retryLane),cx(e,n)}function _k(e,t){var n=fn,r;switch(e.tag){case I:r=e.stateNode;var a=e.memoizedState;a!==null&&(n=a.retryLane);break;case le:r=e.stateNode;break;default:throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.")}r!==null&&r.delete(t),cx(e,n)}function wk(e){return e<120?120:e<480?480:e<1080?1080:e<1920?1920:e<3e3?3e3:e<4320?4320:$4(e/1960)*1960}function Sk(){if(_u>Q4)throw _u=0,ev=null,new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");Es>Z4&&(Es=0,jd=null,c("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."))}function Ek(){Zr.flushLegacyContextWarning(),Zr.flushPendingUnsafeLifecycleWarnings()}function dx(e,t){zt(e),qd(e,Bi,H4),t&&qd(e,ac,G4),qd(e,Bi,I4),t&&qd(e,ac,j4),un()}function qd(e,t,n){for(var r=e,a=null;r!==null;){var u=r.subtreeFlags&t;r!==a&&r.child!==null&&u!==De?r=r.child:((r.flags&t)!==De&&n(r),r.sibling!==null?r=r.sibling:r=a=r.return)}}var Xd=null;function fx(e){{if((Ze&En)!==nn||!(e.mode&Qe))return;var t=e.tag;if(t!==_&&t!==S&&t!==p&&t!==h&&t!==K&&t!==ne&&t!==z)return;var n=Be(e)||"ReactComponent";if(Xd!==null){if(Xd.has(n))return;Xd.add(n)}else Xd=new Set([n]);var r=Dn;try{zt(e),c("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.")}finally{r?zt(e):un()}}}var av;{var Ck=null;av=function(e,t,n){var r=bx(Ck,t);try{return C1(e,t,n)}catch(u){if(LC()||u!==null&&typeof u=="object"&&typeof u.then=="function")throw u;if(td(),ky(),M1(e,t),bx(t,r),t.mode&ht&&lp(t),Hf(null,C1,null,e,t,n),iw()){var a=Gf();typeof a=="object"&&a!==null&&a._suppressLogging&&typeof u=="object"&&u!==null&&!u._suppressLogging&&(u._suppressLogging=!0)}throw u}}}var mx=!1,sv;sv=new Set;function Tk(e){if(Xo&&!pT())switch(e.tag){case h:case K:case z:{var t=At&&Be(At)||"Unknown",n=t;if(!sv.has(n)){sv.add(n);var r=Be(e)||"Unknown";c("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render",r,t,t)}break}case p:{mx||(c("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."),mx=!0);break}}}function Eu(e,t){if(Xr){var n=e.memoizedUpdaters;n.forEach(function(r){F0(e,r,t)})}}var lv={};function uv(e,t){{var n=ai.current;return n!==null?(n.push(t),lv):w0(e,t)}}function hx(e){if(e!==lv)return mw(e)}function px(){return ai.current!==null}function kk(e){{if(e.mode&Qe){if(!Y1())return}else if(!X4()||Ze!==nn||e.tag!==h&&e.tag!==K&&e.tag!==z)return;if(ai.current===null){var t=Dn;try{zt(e),c(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`,Be(e))}finally{t?zt(e):un()}}}}function Nk(e){e.tag!==So&&Y1()&&ai.current===null&&c(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`)}function Cu(e){Z1=e}var Or=null,Cs=null,Rk=function(e){Or=e};function Ts(e){{if(Or===null)return e;var t=Or(e);return t===void 0?e:t.current}}function cv(e){return Ts(e)}function dv(e){{if(Or===null)return e;var t=Or(e);if(t===void 0){if(e!=null&&typeof e.render=="function"){var n=Ts(e.render);if(e.render!==n){var r={$$typeof:Ae,render:n};return e.displayName!==void 0&&(r.displayName=e.displayName),r}}return e}return t.current}}function vx(e,t){{if(Or===null)return!1;var n=e.elementType,r=t.type,a=!1,u=typeof r=="object"&&r!==null?r.$$typeof:null;switch(e.tag){case p:{typeof r=="function"&&(a=!0);break}case h:{(typeof r=="function"||u===Ye)&&(a=!0);break}case K:{(u===Ae||u===Ye)&&(a=!0);break}case ne:case z:{(u===Pt||u===Ye)&&(a=!0);break}default:return!1}if(a){var f=Or(n);if(f!==void 0&&f===Or(r))return!0}return!1}}function gx(e){{if(Or===null||typeof WeakSet!="function")return;Cs===null&&(Cs=new WeakSet),Cs.add(e)}}var Dk=function(e,t){{if(Or===null)return;var n=t.staleFamilies,r=t.updatedFamilies;eo(),Ji(function(){fv(e.current,r,n)})}},Mk=function(e,t){{if(e.context!==gr)return;eo(),Ji(function(){Tu(t,e,null,null)})}};function fv(e,t,n){{var r=e.alternate,a=e.child,u=e.sibling,f=e.tag,g=e.type,x=null;switch(f){case h:case z:case p:x=g;break;case K:x=g.render;break}if(Or===null)throw new Error("Expected resolveFamily to be set during hot reload.");var E=!1,k=!1;if(x!==null){var P=Or(x);P!==void 0&&(n.has(P)?k=!0:t.has(P)&&(f===p?k=!0:E=!0))}if(Cs!==null&&(Cs.has(e)||r!==null&&Cs.has(r))&&(k=!0),k&&(e._debugNeedsRemount=!0),k||E){var M=er(e,Fe);M!==null&&an(M,e,Fe,St)}a!==null&&!k&&fv(a,t,n),u!==null&&fv(u,t,n)}}var Pk=function(e,t){{var n=new Set,r=new Set(t.map(function(a){return a.current}));return mv(e.current,r,n),n}};function mv(e,t,n){{var r=e.child,a=e.sibling,u=e.tag,f=e.type,g=null;switch(u){case h:case z:case p:g=f;break;case K:g=f.render;break}var x=!1;g!==null&&t.has(g)&&(x=!0),x?zk(e,n):r!==null&&mv(r,t,n),a!==null&&mv(a,t,n)}}function zk(e,t){{var n=Ak(e,t);if(n)return;for(var r=e;;){switch(r.tag){case C:t.add(r.stateNode);return;case T:t.add(r.stateNode.containerInfo);return;case S:t.add(r.stateNode.containerInfo);return}if(r.return===null)throw new Error("Expected to reach root first.");r=r.return}}}function Ak(e,t){for(var n=e,r=!1;;){if(n.tag===C)r=!0,t.add(n.stateNode);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)return r;for(;n.sibling===null;){if(n.return===null||n.return===e)return r;n=n.return}n.sibling.return=n.return,n=n.sibling}return!1}var hv;{hv=!1;try{var yx=Object.preventExtensions({})}catch{hv=!0}}function Ok(e,t,n,r){this.tag=e,this.key=n,this.elementType=null,this.type=null,this.stateNode=null,this.return=null,this.child=null,this.sibling=null,this.index=0,this.ref=null,this.pendingProps=t,this.memoizedProps=null,this.updateQueue=null,this.memoizedState=null,this.dependencies=null,this.mode=r,this.flags=De,this.subtreeFlags=De,this.deletions=null,this.lanes=J,this.childLanes=J,this.alternate=null,this.actualDuration=Number.NaN,this.actualStartTime=Number.NaN,this.selfBaseDuration=Number.NaN,this.treeBaseDuration=Number.NaN,this.actualDuration=0,this.actualStartTime=-1,this.selfBaseDuration=0,this.treeBaseDuration=0,this._debugSource=null,this._debugOwner=null,this._debugNeedsRemount=!1,this._debugHookTypes=null,!hv&&typeof Object.preventExtensions=="function"&&Object.preventExtensions(this)}var yr=function(e,t,n,r){return new Ok(e,t,n,r)};function pv(e){var t=e.prototype;return!!(t&&t.isReactComponent)}function Fk(e){return typeof e=="function"&&!pv(e)&&e.defaultProps===void 0}function Lk(e){if(typeof e=="function")return pv(e)?p:h;if(e!=null){var t=e.$$typeof;if(t===Ae)return K;if(t===Pt)return ne}return _}function Ea(e,t){var n=e.alternate;n===null?(n=yr(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n._debugSource=e._debugSource,n._debugOwner=e._debugOwner,n._debugHookTypes=e._debugHookTypes,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=De,n.subtreeFlags=De,n.deletions=null,n.actualDuration=0,n.actualStartTime=-1),n.flags=e.flags&Vi,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue;var r=e.dependencies;switch(n.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.selfBaseDuration=e.selfBaseDuration,n.treeBaseDuration=e.treeBaseDuration,n._debugNeedsRemount=e._debugNeedsRemount,n.tag){case _:case h:case z:n.type=Ts(e.type);break;case p:n.type=cv(e.type);break;case K:n.type=dv(e.type);break}return n}function Uk(e,t){e.flags&=Vi|qt;var n=e.alternate;if(n===null)e.childLanes=J,e.lanes=t,e.child=null,e.subtreeFlags=De,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null,e.selfBaseDuration=0,e.treeBaseDuration=0;else{e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=De,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type;var r=n.dependencies;e.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},e.selfBaseDuration=n.selfBaseDuration,e.treeBaseDuration=n.treeBaseDuration}return e}function Bk(e,t,n){var r;return e===Wc?(r=Qe,t===!0&&(r|=Lt,r|=pi)):r=ke,Xr&&(r|=ht),yr(S,null,null,r)}function vv(e,t,n,r,a,u){var f=_,g=e;if(typeof e=="function")pv(e)?(f=p,g=cv(g)):g=Ts(g);else if(typeof e=="string")f=C;else e:switch(e){case R:return Fo(n.children,a,u,t);case ee:f=q,a|=Lt,(a&Qe)!==ke&&(a|=pi);break;case ce:return Vk(n,a,u,t);case je:return Ik(n,a,u,t);case Ve:return jk(n,a,u,t);case Wr:return xx(n,a,u,t);case Yr:case Mt:case ln:case Wo:case Rn:default:{if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Re:f=j;break e;case $e:f=$;break e;case Ae:f=K,g=dv(g);break e;case Pt:f=ne;break e;case Ye:f=X,g=null;break e}var x="";{(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(x+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var E=r?Be(r):null;E&&(x+=`

Check the render method of \``+E+"`.")}throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) "+("but got: "+(e==null?e:typeof e)+"."+x))}}var k=yr(f,n,t,a);return k.elementType=e,k.type=g,k.lanes=u,k._debugOwner=r,k}function gv(e,t,n){var r=null;r=e._owner;var a=e.type,u=e.key,f=e.props,g=vv(a,u,f,r,t,n);return g._debugSource=e._source,g._debugOwner=e._owner,g}function Fo(e,t,n,r){var a=yr(F,e,r,t);return a.lanes=n,a}function Vk(e,t,n,r){typeof e.id!="string"&&c('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',typeof e.id);var a=yr(Z,e,r,t|ht);return a.elementType=ce,a.lanes=n,a.stateNode={effectDuration:0,passiveEffectDuration:0},a}function Ik(e,t,n,r){var a=yr(I,e,r,t);return a.elementType=je,a.lanes=n,a}function jk(e,t,n,r){var a=yr(le,e,r,t);return a.elementType=Ve,a.lanes=n,a}function xx(e,t,n,r){var a=yr(_e,e,r,t);a.elementType=Wr,a.lanes=n;var u={isHidden:!1};return a.stateNode=u,a}function yv(e,t,n){var r=yr(D,e,null,t);return r.lanes=n,r}function Hk(){var e=yr(C,null,null,ke);return e.elementType="DELETED",e}function Gk(e){var t=yr(se,null,null,ke);return t.stateNode=e,t}function xv(e,t,n){var r=e.children!==null?e.children:[],a=yr(T,r,e.key,t);return a.lanes=n,a.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},a}function bx(e,t){return e===null&&(e=yr(_,null,null,ke)),e.tag=t.tag,e.key=t.key,e.elementType=t.elementType,e.type=t.type,e.stateNode=t.stateNode,e.return=t.return,e.child=t.child,e.sibling=t.sibling,e.index=t.index,e.ref=t.ref,e.pendingProps=t.pendingProps,e.memoizedProps=t.memoizedProps,e.updateQueue=t.updateQueue,e.memoizedState=t.memoizedState,e.dependencies=t.dependencies,e.mode=t.mode,e.flags=t.flags,e.subtreeFlags=t.subtreeFlags,e.deletions=t.deletions,e.lanes=t.lanes,e.childLanes=t.childLanes,e.alternate=t.alternate,e.actualDuration=t.actualDuration,e.actualStartTime=t.actualStartTime,e.selfBaseDuration=t.selfBaseDuration,e.treeBaseDuration=t.treeBaseDuration,e._debugSource=t._debugSource,e._debugOwner=t._debugOwner,e._debugNeedsRemount=t._debugNeedsRemount,e._debugHookTypes=t._debugHookTypes,e}function Wk(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.pendingChildren=null,this.current=null,this.pingCache=null,this.finishedWork=null,this.timeoutHandle=eh,this.context=null,this.pendingContext=null,this.callbackNode=null,this.callbackPriority=fn,this.eventTimes=Sm(J),this.expirationTimes=Sm(St),this.pendingLanes=J,this.suspendedLanes=J,this.pingedLanes=J,this.expiredLanes=J,this.mutableReadLanes=J,this.finishedLanes=J,this.entangledLanes=J,this.entanglements=Sm(J),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null,this.effectDuration=0,this.passiveEffectDuration=0;{this.memoizedUpdaters=new Set;for(var u=this.pendingUpdatersLaneMap=[],f=0;f<em;f++)u.push(new Set)}switch(t){case Wc:this._debugRootType=n?"hydrateRoot()":"createRoot()";break;case So:this._debugRootType=n?"hydrate()":"render()";break}}function _x(e,t,n,r,a,u,f,g,x,E){var k=new Wk(e,t,n,g,x),P=Bk(t,u);k.current=P,P.stateNode=k;{var M={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null};P.memoizedState=M}return Ph(P),k}var bv="18.3.1";function Yk(e,t,n){var r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:null;return Er(r),{$$typeof:Gr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}var _v,wv;_v=!1,wv={};function wx(e){if(!e)return gr;var t=Va(e),n=NC(t);if(t.tag===p){var r=t.type;if(yi(r))return $g(t,r,n)}return n}function qk(e,t){{var n=Va(e);if(n===void 0){if(typeof e.render=="function")throw new Error("Unable to find node on an unmounted component.");var r=Object.keys(e).join(",");throw new Error("Argument appears to not be a ReactComponent. Keys: "+r)}var a=x0(n);if(a===null)return null;if(a.mode&Lt){var u=Be(n)||"Component";if(!wv[u]){wv[u]=!0;var f=Dn;try{zt(a),n.mode&Lt?c("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,u):c("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,u)}finally{f?zt(f):un()}}}return a.stateNode}}function Sx(e,t,n,r,a,u,f,g){var x=!1,E=null;return _x(e,t,x,E,n,r,a,u,f)}function Ex(e,t,n,r,a,u,f,g,x,E){var k=!0,P=_x(n,r,k,e,a,u,f,g,x);P.context=wx(null);var M=P.current,L=jn(),V=Ao(M),G=$i(L,V);return G.callback=t??null,To(M,G,V),ek(P,V,L),P}function Tu(e,t,n,r){_w(t,e);var a=t.current,u=jn(),f=Ao(a);Iw(f);var g=wx(n);t.context===null?t.context=g:t.pendingContext=g,Xo&&Dn!==null&&!_v&&(_v=!0,c(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,Be(Dn)||"Unknown"));var x=$i(u,f);x.payload={element:e},r=r===void 0?null:r,r!==null&&(typeof r!="function"&&c("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",r),x.callback=r);var E=To(a,x,f);return E!==null&&(an(E,a,f,u),ad(E,a,f)),f}function $d(e){var t=e.current;if(!t.child)return null;switch(t.child.tag){case C:return t.child.stateNode;default:return t.child.stateNode}}function Xk(e){switch(e.tag){case S:{var t=e.stateNode;if(pc(t)){var n=Kw(t);ik(t,n)}break}case I:{Ji(function(){var a=er(e,Fe);if(a!==null){var u=jn();an(a,e,Fe,u)}});var r=Fe;Sv(e,r);break}}}function Cx(e,t){var n=e.memoizedState;n!==null&&n.dehydrated!==null&&(n.retryLane=nS(n.retryLane,t))}function Sv(e,t){Cx(e,t);var n=e.alternate;n&&Cx(n,t)}function $k(e){if(e.tag===I){var t=dl,n=er(e,t);if(n!==null){var r=jn();an(n,e,t,r)}Sv(e,t)}}function Kk(e){if(e.tag===I){var t=Ao(e),n=er(e,t);if(n!==null){var r=jn();an(n,e,t,r)}Sv(e,t)}}function Tx(e){var t=fw(e);return t===null?null:t.stateNode}var kx=function(e){return null};function Qk(e){return kx(e)}var Nx=function(e){return!1};function Zk(e){return Nx(e)}var Rx=null,Dx=null,Mx=null,Px=null,zx=null,Ax=null,Ox=null,Fx=null,Lx=null;{var Ux=function(e,t,n){var r=t[n],a=st(e)?e.slice():Xe({},e);return n+1===t.length?(st(a)?a.splice(r,1):delete a[r],a):(a[r]=Ux(e[r],t,n+1),a)},Bx=function(e,t){return Ux(e,t,0)},Vx=function(e,t,n,r){var a=t[r],u=st(e)?e.slice():Xe({},e);if(r+1===t.length){var f=n[r];u[f]=u[a],st(u)?u.splice(a,1):delete u[a]}else u[a]=Vx(e[a],t,n,r+1);return u},Ix=function(e,t,n){if(t.length!==n.length){d("copyWithRename() expects paths of the same length");return}else for(var r=0;r<n.length-1;r++)if(t[r]!==n[r]){d("copyWithRename() expects paths to be the same except for the deepest key");return}return Vx(e,t,n,0)},jx=function(e,t,n,r){if(n>=t.length)return r;var a=t[n],u=st(e)?e.slice():Xe({},e);return u[a]=jx(e[a],t,n+1,r),u},Hx=function(e,t,n){return jx(e,t,0,n)},Ev=function(e,t){for(var n=e.memoizedState;n!==null&&t>0;)n=n.next,t--;return n};Rx=function(e,t,n,r){var a=Ev(e,t);if(a!==null){var u=Hx(a.memoizedState,n,r);a.memoizedState=u,a.baseState=u,e.memoizedProps=Xe({},e.memoizedProps);var f=er(e,Fe);f!==null&&an(f,e,Fe,St)}},Dx=function(e,t,n){var r=Ev(e,t);if(r!==null){var a=Bx(r.memoizedState,n);r.memoizedState=a,r.baseState=a,e.memoizedProps=Xe({},e.memoizedProps);var u=er(e,Fe);u!==null&&an(u,e,Fe,St)}},Mx=function(e,t,n,r){var a=Ev(e,t);if(a!==null){var u=Ix(a.memoizedState,n,r);a.memoizedState=u,a.baseState=u,e.memoizedProps=Xe({},e.memoizedProps);var f=er(e,Fe);f!==null&&an(f,e,Fe,St)}},Px=function(e,t,n){e.pendingProps=Hx(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var r=er(e,Fe);r!==null&&an(r,e,Fe,St)},zx=function(e,t){e.pendingProps=Bx(e.memoizedProps,t),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var n=er(e,Fe);n!==null&&an(n,e,Fe,St)},Ax=function(e,t,n){e.pendingProps=Ix(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var r=er(e,Fe);r!==null&&an(r,e,Fe,St)},Ox=function(e){var t=er(e,Fe);t!==null&&an(t,e,Fe,St)},Fx=function(e){kx=e},Lx=function(e){Nx=e}}function Jk(e){var t=x0(e);return t===null?null:t.stateNode}function e2(e){return null}function t2(){return Dn}function n2(e){var t=e.findFiberByHostInstance,n=i.ReactCurrentDispatcher;return bw({bundleType:e.bundleType,version:e.version,rendererPackageName:e.rendererPackageName,rendererConfig:e.rendererConfig,overrideHookState:Rx,overrideHookStateDeletePath:Dx,overrideHookStateRenamePath:Mx,overrideProps:Px,overridePropsDeletePath:zx,overridePropsRenamePath:Ax,setErrorHandler:Fx,setSuspenseHandler:Lx,scheduleUpdate:Ox,currentDispatcherRef:n,findHostInstanceByFiber:Jk,findFiberByHostInstance:t||e2,findHostInstancesForRefresh:Pk,scheduleRefresh:Dk,scheduleRoot:Mk,setRefreshHandler:Rk,getCurrentFiber:t2,reconcilerVersion:bv})}var Gx=typeof reportError=="function"?reportError:function(e){console.error(e)};function Cv(e){this._internalRoot=e}Kd.prototype.render=Cv.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw new Error("Cannot update an unmounted root.");{typeof arguments[1]=="function"?c("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."):Qd(arguments[1])?c("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."):typeof arguments[1]<"u"&&c("You passed a second argument to root.render(...) but it only accepts one argument.");var n=t.containerInfo;if(n.nodeType!==Yt){var r=Tx(t.current);r&&r.parentNode!==n&&c("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.")}}Tu(e,t,null,null)},Kd.prototype.unmount=Cv.prototype.unmount=function(){typeof arguments[0]=="function"&&c("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;nx()&&c("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."),Ji(function(){Tu(null,e,null,null)}),Gg(t)}};function r2(e,t){if(!Qd(e))throw new Error("createRoot(...): Target container is not a DOM element.");Wx(e);var n=!1,r=!1,a="",u=Gx;t!=null&&(t.hydrate?d("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."):typeof t=="object"&&t!==null&&t.$$typeof===fi&&c(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`),t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(u=t.onRecoverableError),t.transitionCallbacks!==void 0&&t.transitionCallbacks);var f=Sx(e,Wc,null,n,r,a,u);Uc(f.current,e);var g=e.nodeType===Yt?e.parentNode:e;return Pl(g),new Cv(f)}function Kd(e){this._internalRoot=e}function i2(e){e&&xS(e)}Kd.prototype.unstable_scheduleHydration=i2;function o2(e,t,n){if(!Qd(e))throw new Error("hydrateRoot(...): Target container is not a DOM element.");Wx(e),t===void 0&&c("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");var r=n??null,a=n!=null&&n.hydratedSources||null,u=!1,f=!1,g="",x=Gx;n!=null&&(n.unstable_strictMode===!0&&(u=!0),n.identifierPrefix!==void 0&&(g=n.identifierPrefix),n.onRecoverableError!==void 0&&(x=n.onRecoverableError));var E=Ex(t,null,e,Wc,r,u,f,g,x);if(Uc(E.current,e),Pl(e),a)for(var k=0;k<a.length;k++){var P=a[k];uT(E,P)}return new Kd(E)}function Qd(e){return!!(e&&(e.nodeType===Zn||e.nodeType===Fi||e.nodeType===Pf||!Gt))}function ku(e){return!!(e&&(e.nodeType===Zn||e.nodeType===Fi||e.nodeType===Pf||e.nodeType===Yt&&e.nodeValue===" react-mount-point-unstable "))}function Wx(e){e.nodeType===Zn&&e.tagName&&e.tagName.toUpperCase()==="BODY"&&c("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."),Hl(e)&&(e._reactRootContainer?c("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."):c("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."))}var a2=i.ReactCurrentOwner,Yx;Yx=function(e){if(e._reactRootContainer&&e.nodeType!==Yt){var t=Tx(e._reactRootContainer.current);t&&t.parentNode!==e&&c("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.")}var n=!!e._reactRootContainer,r=Tv(e),a=!!(r&&_o(r));a&&!n&&c("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."),e.nodeType===Zn&&e.tagName&&e.tagName.toUpperCase()==="BODY"&&c("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.")};function Tv(e){return e?e.nodeType===Fi?e.documentElement:e.firstChild:null}function qx(){}function s2(e,t,n,r,a){if(a){if(typeof r=="function"){var u=r;r=function(){var M=$d(f);u.call(M)}}var f=Ex(t,r,e,So,null,!1,!1,"",qx);e._reactRootContainer=f,Uc(f.current,e);var g=e.nodeType===Yt?e.parentNode:e;return Pl(g),Ji(),f}else{for(var x;x=e.lastChild;)e.removeChild(x);if(typeof r=="function"){var E=r;r=function(){var M=$d(k);E.call(M)}}var k=Sx(e,So,null,!1,!1,"",qx);e._reactRootContainer=k,Uc(k.current,e);var P=e.nodeType===Yt?e.parentNode:e;return Pl(P),Ji(function(){Tu(t,k,n,r)}),k}}function l2(e,t){e!==null&&typeof e!="function"&&c("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",t,e)}function Zd(e,t,n,r,a){Yx(n),l2(a===void 0?null:a,"render");var u=n._reactRootContainer,f;if(!u)f=s2(n,t,e,a,r);else{if(f=u,typeof a=="function"){var g=a;a=function(){var x=$d(f);g.call(x)}}Tu(t,f,e,a)}return $d(f)}var Xx=!1;function u2(e){{Xx||(Xx=!0,c("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));var t=a2.current;if(t!==null&&t.stateNode!==null){var n=t.stateNode._warnedAboutRefsInRender;n||c("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",it(t.type)||"A component"),t.stateNode._warnedAboutRefsInRender=!0}}return e==null?null:e.nodeType===Zn?e:qk(e,"findDOMNode")}function c2(e,t,n){if(c("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"),!ku(t))throw new Error("Target container is not a DOM element.");{var r=Hl(t)&&t._reactRootContainer===void 0;r&&c("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?")}return Zd(null,e,t,!0,n)}function d2(e,t,n){if(c("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"),!ku(t))throw new Error("Target container is not a DOM element.");{var r=Hl(t)&&t._reactRootContainer===void 0;r&&c("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?")}return Zd(null,e,t,!1,n)}function f2(e,t,n,r){if(c("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"),!ku(n))throw new Error("Target container is not a DOM element.");if(e==null||!ow(e))throw new Error("parentComponent must be a valid React Component");return Zd(e,t,n,!1,r)}var $x=!1;function m2(e){if($x||($x=!0,c("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")),!ku(e))throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");{var t=Hl(e)&&e._reactRootContainer===void 0;t&&c("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?")}if(e._reactRootContainer){{var n=Tv(e),r=n&&!_o(n);r&&c("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.")}return Ji(function(){Zd(null,null,e,!1,function(){e._reactRootContainer=null,Gg(e)})}),!0}else{{var a=Tv(e),u=!!(a&&_o(a)),f=e.nodeType===Zn&&ku(e.parentNode)&&!!e.parentNode._reactRootContainer;u&&c("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s",f?"You may have accidentally passed in a React root node instead of its container.":"Instead, have the parent component update its state and rerender in order to remove this component.")}return!1}}uS(Xk),dS($k),fS(Kk),mS($r),hS(aS),(typeof Map!="function"||Map.prototype==null||typeof Map.prototype.forEach!="function"||typeof Set!="function"||Set.prototype==null||typeof Set.prototype.clear!="function"||typeof Set.prototype.forEach!="function")&&c("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),X_(pE),Q_(rv,ok,Ji);function h2(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null;if(!Qd(t))throw new Error("Target container is not a DOM element.");return Yk(e,t,null,n)}function p2(e,t,n,r){return f2(e,t,n,r)}var kv={usingClientEntryPoint:!1,Events:[_o,rs,Bc,s0,l0,rv]};function v2(e,t){return kv.usingClientEntryPoint||c('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'),r2(e,t)}function g2(e,t,n){return kv.usingClientEntryPoint||c('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'),o2(e,t,n)}function y2(e){return nx()&&c("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."),Ji(e)}var x2=n2({findFiberByHostInstance:ua,bundleType:1,version:bv,rendererPackageName:"react-dom"});if(!x2&&Wt&&window.top===window.self&&(navigator.userAgent.indexOf("Chrome")>-1&&navigator.userAgent.indexOf("Edge")===-1||navigator.userAgent.indexOf("Firefox")>-1)){var Kx=window.location.protocol;/^(https?|file):$/.test(Kx)&&console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools"+(Kx==="file:"?`
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq`:""),"font-weight:bold")}br.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=kv,br.createPortal=h2,br.createRoot=v2,br.findDOMNode=u2,br.flushSync=y2,br.hydrate=c2,br.hydrateRoot=g2,br.render=d2,br.unmountComponentAtNode=m2,br.unstable_batchedUpdates=rv,br.unstable_renderSubtreeIntoContainer=p2,br.version=bv,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})();Hb.exports=br;var eP=Hb.exports,Av=eP;{var lf=Av.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;Bv.createRoot=function(m,l){lf.usingClientEntryPoint=!0;try{return Av.createRoot(m,l)}finally{lf.usingClientEntryPoint=!1}},Bv.hydrateRoot=function(m,l,i){lf.usingClientEntryPoint=!0;try{return Av.hydrateRoot(m,l,i)}finally{lf.usingClientEntryPoint=!1}}}const tP="OREngine",nP=[0,0,0],rP=[0,0,0],iP=[1,1,1],oP={name:"root",uuid:"root",pos:[-1.75,0,0]},aP=[{uuid:"root",components:[{name:"BLidgeClient",props:{mode:"json","websocket/url":"ws://localhost:3100"}},{name:"Music"},{name:"TextureGenerator"},{name:"UniformControls"}]},{uuid:"d7b3bbdf",components:[{name:"MainCamera"}]},{uuid:"93978ccc",components:[{name:"HUD"}]},{uuid:"dcfcefc5",components:[{name:"HUD"}]},{uuid:"26751dfa",components:[{name:"Logo"}]},{uuid:"0f3c0a1f",components:[{name:"TruchetSushiLane"}]},{uuid:"f4a7a7e8",components:[{name:"TableStage"}]},{uuid:"72ce0867",components:[{name:"RandomSMG",props:{count:40,"Position Range/rangeX":14.999999999999991,"Position Range/rangeY":24.850000000000023,"Position Range/rangeZ":7.299999999999983,randomSeed:0,shaderType:"random","Movement/movementX":0,"Movement/movementY":0}}]},{uuid:"cebe8ad4",components:[{name:"ShaderMotionGraphics",props:{shaderName:"ikuraBGScreen",layers:5,layerSpacing:-.01,timeOffset:0}}]},{uuid:"67e890a6",components:[{name:"IkuraFluids"}]},{uuid:"2b281283",components:[{name:"IkuraGunKan"}]},{uuid:"c85f4ed4",components:[{name:"IkuraGunKan"}]},{uuid:"24df161a",components:[{name:"Kyuuri"}]},{uuid:"989f5be8",components:[{name:"DebaBouChou"}]},{uuid:"9aecb1bb",components:[{name:"RandomSMG",props:{count:24,"Position Range/rangeX":17.249999999999964,"Position Range/rangeY":7.899999999999973,"Position Range/rangeZ":11.149999999999986,randomSeed:30,shaderType:"random","Movement/movementX":0,"Movement/movementY":0}}]},{uuid:"29549b03",components:[{name:"Maguro"}]},{uuid:"c21a6cf1",components:[{name:"ShaderMotionGraphics",props:{shaderName:"maguroBGScreen",layers:3,layerSpacing:-.08999999999999662,timeOffset:0}}]},{uuid:"32dd0971",components:[{name:"MizuBall"}]},{uuid:"ef136354",components:[{name:"MizuBall"}]},{uuid:"cc506154",components:[{name:"MizuBall"}]},{uuid:"b6c68e95",components:[{name:"Nigiri",props:{sashimiType:"maguro"}}]},{uuid:"f2985235",components:[{name:"Nigiri",props:{sashimiType:"maguro"}}]},{uuid:"629afea1",components:[{name:"BreakDanceOnigiri"}]},{uuid:"b01f8327",components:[{name:"KaitenSushi"}]},{uuid:"76c75ce7",components:[{name:"Maguro"},{name:"PartyTime",props:{isJumping:!0}}]},{uuid:"dd391494",components:[{name:"Maguro"},{name:"PartyTime",props:{isJumping:!0}}]},{uuid:"ef245de7",components:[{name:"Salmon",props:{blockType:"saku"}},{name:"PartyTime",props:{isJumping:!0}}]},{uuid:"24a125ef",components:[{name:"Salmon",props:{blockType:"saku"}},{name:"PartyTime",props:{isJumping:!0}}]},{uuid:"96971d72",components:[{name:"Taiyaki"},{name:"PartyTime",props:{isJumping:!0}}]},{uuid:"b2ebb3cb",components:[{name:"SaraAudio",props:{samplePosition:.3}}]},{uuid:"dd9c0ac8",components:[{name:"SaraAudio",props:{samplePosition:.5}}]},{uuid:"0472d010",components:[{name:"SaraAudio",props:{samplePosition:.56}}]},{uuid:"651fdf32",components:[{name:"SaraAudio",props:{samplePosition:.2}}]},{uuid:"02e7b7ae",components:[{name:"SaraAudio",props:{samplePosition:.5}}]},{uuid:"526c1c65",components:[{name:"SushiGetaWithNigiri"}]},{uuid:"06a4626d",components:[{name:"SushiGetaWithNigiri"}]},{uuid:"b41b8d15",components:[{name:"TakoGate"},{name:"PartyTime",props:{isJumping:!1}}]},{uuid:"e63fb6c9",components:[{name:"TakoGate"},{name:"PartyTime",props:{isJumping:!1}}]},{uuid:"4dbbbcce",components:[{name:"Ukonpower"},{name:"PartyTime",props:{isJumping:!0}}]},{uuid:"7d90402e",components:[{name:"RandomSMG",props:{count:26,"Position Range/rangeX":18.449999999999935,"Position Range/rangeY":10.049999999999974,"Position Range/rangeZ":10,randomSeed:9,shaderType:"random","Movement/movementX":-3.1000000000000085,"Movement/movementY":-2.300000000000002}}]},{uuid:"06674a7c",components:[{name:"MizuBall"}]},{uuid:"768002b3",components:[{name:"Onigiri"}]},{uuid:"c51ba9ef",components:[{name:"Salmon",props:{blockType:"saku"}},{name:"SalmonSushi"}]},{uuid:"0dd05673",components:[{name:"Salmon",props:{blockType:"kirimi"}}]},{uuid:"78014334",components:[{name:"Salmon",props:{blockType:"saku"}},{name:"SalmonSushi"}]},{uuid:"cc48dd93",components:[{name:"ShaderMotionGraphics",props:{shaderName:"salmonBGScreen",layers:3,layerSpacing:-.09,timeOffset:0}}]},{uuid:"de897ba0",components:[{name:"RandomSMG",props:{count:24,"Position Range/rangeX":15.150000000000007,"Position Range/rangeY":5.950000000000014,"Position Range/rangeZ":10,randomSeed:0,shaderType:"random","Movement/movementX":0,"Movement/movementY":.25}}]},{uuid:"5e9cf8ad",components:[{name:"ShaderMotionGraphics",props:{shaderName:"takoBGScreen",layers:3,layerSpacing:-.04000000000000001,timeOffset:0}}]},{uuid:"27599264",components:[{name:"TakoGate"}]},{uuid:"77db9e8a",components:[{name:"TakoKosen"}]},{uuid:"f14b3580",components:[{name:"Nigiri",props:{sashimiType:"tako"}}]},{uuid:"2a16e1b2",components:[{name:"Nigiri",props:{sashimiType:"tako"}}]},{uuid:"727525da",components:[{name:"Ocean"}]},{uuid:"4afddbe4",components:[{name:"SkyBox",props:{skyboxType:"tsuri"}}]},{uuid:"d454a187",components:[{name:"Taiyaki"}]},{uuid:"ddc6e769",components:[{name:"Teibo"}]},{uuid:"69f163d9",components:[{name:"Teibo"}]},{uuid:"5fe0ec15",components:[{name:"Ukonpower"}]},{uuid:"60382d7c",components:[{name:"SkyBox",props:{skyboxType:"default"}}]}],sP={name:tP,position:nP,euler:rP,scale:iP,scene:oP,overrides:aP,"timeline/duration":4280,"timeline/fps":30};class Ou extends rt{constructor(i,o){const s=i.gl;super(s);y(this,"material");y(this,"_renderer");y(this,"_resolution");y(this,"_postProcess");y(this,"_frameBuffer");this._renderer=i,this._resolution=o.resolution||new Q(1024,1024),this.setting({wrapS:s.REPEAT,wrapT:s.REPEAT,magFilter:s.LINEAR,minFilter:s.LINEAR}),this._frameBuffer=new Et(s).setTexture([this]).setSize(this._resolution),this.material=new yt(s,{...o,renderTarget:this._frameBuffer}),this._postProcess=new Br({passes:[this.material]}),this.render()}render(){this._renderer.renderPostProcess(this._postProcess,void 0,this._resolution)}}class lP extends Tn{constructor(){super();y(this,"_isTouching");y(this,"element",null);y(this,"position");y(this,"delta");this.position=new Q(NaN,NaN),this.delta=new Q(NaN,NaN),this._isTouching=!1;const i=this._onPointer.bind(this,"move"),o=this._onPointer.bind(this,"end");window.addEventListener("pointermove",i),window.addEventListener("pointerup",o),window.addEventListener("dragend",o);const s=()=>{this.element&&this.removeElement(this.element),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",o),window.removeEventListener("dragend",o),this.off("dispose",s)};this.on("dispose",s)}setElement(i){this.element&&this.removeElement(this.element),this.element=i;const o=this._onPointer.bind(this,"start");i.addEventListener("pointerdown",o);const s=d=>{i.isEqualNode(d.elm)&&(i.removeEventListener("pointerdown",o),this.off("unregister",s))};this.on("unregister",s)}removeElement(i){this.emit("unregister",[i])}getScreenPosition(i){if(this.position.x!=this.position.x)return new Q(NaN,NaN);const o=this.position.clone().divide(i).multiply(2).sub(1);return o.y*=-1,o}getRelativePosition(i,o){const s=i.getClientRects()[0];let d=this.position.x-s.left,c=this.position.y-s.top;return o&&(d/=s.width,c/=s.height),new Q(d,c)}_setPos(i,o){this.position.x!==this.position.x||this.position.y!==this.position.y?this.delta.set(0,0):this.delta.set(i-this.position.x,o-this.position.y),this.position.set(i,o)}_onPointer(i,o){const s=o.pointerType;s!=null?(s=="mouse"&&(o.button==-1||o.button==0)||s=="touch"||s=="pen")&&this._touchEventHandler(o.pageX,o.pageY,i,o):this._touchEventHandler(o.pageX,o.pageY,i,o)}_touchEventHandler(i,o,s,d){let c=!1;const v=i-window.pageXOffset,h=o-window.pageYOffset;s=="start"?(this._isTouching=!0,this._setPos(v,h),this.delta.set(0,0),c=!0):s=="move"?(this._setPos(v,h),this._isTouching&&(c=!0)):s=="end"&&("targetTouches"in d?d.targetTouches.length==0&&(this._isTouching=!1):this._isTouching=!1,c=!0),c&&this.emit(s,[{pointerEvent:d,position:this.position.clone(),delta:this.delta.clone()}])}dispose(){this.emit("dispose")}}class gf extends Te{constructor(i){super(i);y(this,"target");y(this,"up");y(this,"entityWorldPos");y(this,"targetWorldPos");this.target=null,this.entityWorldPos=new Q,this.targetWorldPos=new Q,this.up=new Q(0,1,0),this.order=9999}setTarget(i){this.target=i}beforeRenderImpl(i){if(this.target&&this._enabled){this.entity.matrixWorld.decompose(this.entityWorldPos),this.target.matrixWorld.decompose(this.targetWorldPos),this.entity.matrixWorld.lookAt(this.entityWorldPos,this.targetWorldPos,this.up);const o=this.entity.getComponentsByTag("camera")[0];o&&o.viewMatrix.copy(this.entity.matrixWorld).inverse()}}}class Yb extends Te{constructor(i){super(i);y(this,"keyborad_");y(this,"_pointer");y(this,"orbit_");y(this,"mouseVelOrbit_");y(this,"mouseVelMove_");y(this,"eye_");y(this,"target_");y(this,"up_");y(this,"lookatMatrix_");y(this,"distance_");y(this,"distanceVel_");y(this,"_memPos");y(this,"_memTarget");y(this,"elmDisposer");this._pointer=new lP,this.keyborad_=new jb,this.orbit_=new Q,this.mouseVelOrbit_=new Q,this.mouseVelMove_=new Q,this.target_=new Q,this.eye_=new Q,this.up_=new Q(0,1,0),this.distance_=5,this.distanceVel_=0,this.lookatMatrix_=new nt,this._memPos=new Q,this._memTarget=new Q,this.order=999;let o=!1;const s=v=>{o||(o=!0)},d=v=>{if(!o)return;const h={x:v.delta.x*1,y:v.delta.y*1};this.keyborad_.pressedKeys.Shift?this.mouseVelMove_.add(h):this.mouseVelOrbit_.add(h),v.pointerEvent.preventDefault(),v.pointerEvent.stopPropagation()},c=v=>{o&&(o=!1)};this._pointer.on("move",d),this._pointer.on("start",s),this._pointer.on("end",c),this.once("dispose",()=>{this._pointer.off("move",d),this._pointer.off("start",s),this._pointer.off("end",c)}),this.setPosition(this.entity.position,this.target_)}set enabled(i){if(this._enabled=i,i){this._memTarget.copy(this.target_),this._memPos.copy(this.entity.position);const o=this.entity.getComponent(gf);o&&o.target&&this.setPosition(this.entity.position,o.target.position),this.calc(this.entity)}}get enabled(){return this._enabled}setElm(i){this.elmDisposer&&this.elmDisposer(),this._pointer.setElement(i);const o=h=>{h.preventDefault(),this.distanceVel_+=h.deltaY};i.addEventListener("wheel",o);let s=0;const d=h=>{if(h.touches.length===2){const p=h.touches[0].pageX-h.touches[1].pageX,_=h.touches[0].pageY-h.touches[1].pageY;s=Math.sqrt(p*p+_*_)}},c=h=>{if(h.touches.length===2){h.preventDefault();const p=h.touches[0].pageX-h.touches[1].pageX,_=h.touches[0].pageY-h.touches[1].pageY,S=Math.sqrt(p*p+_*_);if(s>0){const T=S-s;this.distanceVel_-=T*2}s=S}},v=()=>{s=0};i.addEventListener("touchstart",d,{passive:!1}),i.addEventListener("touchmove",c,{passive:!1}),i.addEventListener("touchend",v),this.elmDisposer=()=>{i.removeEventListener("wheel",o),i.removeEventListener("touchstart",d),i.removeEventListener("touchmove",c),i.removeEventListener("touchend",v)}}calc(i){const o=Math.PI/2-.001;this.eye_.set(0,0,0),this.eye_.z+=this.distance_,this.eye_.applyMatrix3(new nt().makeRotationAxis({x:1,y:0,z:0},Math.min(o,Math.max(-o,this.orbit_.x)))),this.eye_.applyMatrix3(new nt().makeRotationAxis({x:0,y:1,z:0},this.orbit_.y)),this.eye_.add(this.target_),this.lookatMatrix_.lookAt(this.eye_,this.target_,this.up_),this.lookatMatrix_.decompose(i.position,i.quaternion,i.scale)}updateImpl(i){const o=new Q(-this.mouseVelMove_.x*this.distance_*25e-5,this.mouseVelMove_.y*this.distance_*25e-5,0,0);o.applyMatrix3(this.entity.matrix),this.target_.add(o),this.orbit_.x+=this.mouseVelOrbit_.y*.001,this.orbit_.x=Math.min(Math.PI/2,Math.max(-Math.PI/2,this.orbit_.x)),this.orbit_.y+=this.mouseVelOrbit_.x*.001,this.distance_+=this.distanceVel_*.01*this.distance_*.025,this.distance_=Math.max(.1,this.distance_);const s=Math.max(0,1-i.timeDelta*10);this.mouseVelOrbit_.multiply(s),this.mouseVelMove_.multiply(s),this.distanceVel_*=s,this.calc(this.entity)}setPosition(i,o){if(this.eye_.copy(i),this.target_.copy(o),this.entity){const c=this.entity.parent;c&&(c.updateMatrix(!0),this.target_.applyMatrix4(c.matrixWorld.clone().inverse()))}const s=this.eye_.clone().sub(this.target_),d=Math.sqrt(s.x*s.x+s.z*s.z);this.orbit_.x=Math.atan2(s.y,d),this.orbit_.y=-Math.atan2(s.x,s.z),this.distance_=this.eye_.clone().sub(this.target_).length(),this.mouseVelOrbit_.set(0,0,0),this.mouseVelMove_.set(0,0,0)}dispose(){super.dispose(),this._pointer.dispose()}}const uP=2,cP=[[0,1,2],[3,4,5],[6,9],[7,8],[7],[10,11,12],[13,14],[15,16,17],[18],[19],[22,23],[24,25],[26],[27],[28,29],[30,31],[32,33,34],[35],[36,37],[38,39,40],[41],[42],[43,44,45,46],[47],[48,49,50,51],[52,53],[54],[55,56,57],[58],[59],[60,61],[62],[63],[64],[65,66,67],[68,69],[70,71],[72,75],[73,74],[75,76],[75],[77],[78],[80],[81],[82],[83],[84],[85],[86],[87],[88],[89,90],[91,92,93],[94],[95,96],[97,98,99],[100],[101,102],[103],[104,105,106],[107,108],[109],[111,112,113],[114,115],[116,117,118],[119,120,121],[122],[123,124,125],[126,127,128],[129]],dP=[{axis:"x",k:[[1,[357,-.129]],[0,[1,-8.153]],[1,[87,7.915]],[0,[1,8.787]],[1,[99,3.404]],[0,[1,.705]],[1,[97,-2.281]],[1,[1,0]],[1,[74,99.945]],[0,[1153,-711.636]],[1,[305,-715.384]],[1,[1,-715.987]],[2,[287,-713.921,2463.958,-713.92,2473.5,-714.084]],[2,[80,-714.111,2524.646,-714.421,2570.577,-713.686]],[2,[74,-710.032,2597.768,-710.487,2638.886,-709.563]],[1,[70,-710.093,2667.346,-710.093]],[0,[65,5.331]],[1,[285,-5.259]],[1,[1,-11.108]],[0,[288,-5.937]],[1,[70,-4.204]],[1,[1,-1.349]],[1,[76,4.46]],[0,[80,-7.571]],[1,[65,5.82]],[1,[1,0]],[1,[577,-0]]]},{axis:"z",k:[[0,[48,336.142]],[1,[309,266.413]],[1,[1,84.442]],[1,[88,30.333]],[1,[100,2.386]],[0,[98,31.793]],[1,[72,33.136]],[0,[2,16.63]],[2,[260,9.524,786.959,16.465,1020.736,7.972]],[0,[49,-14.405,987.557,-13.102]],[0,[267,-20.248]],[2,[270,-20.248,1384.026,-20.248,1602.539,-20.248]],[0,[48,-46.982,1567.072,-44.794]],[1,[258,-52.944]],[1,[1,20.646]],[0,[306,-3.44]],[1,[286,-.762]],[2,[1,7.661,2463.953,7.661,2473.839,7.661]],[1,[224,-13.991,2654.913,-13.991]],[1,[65,17.9]],[1,[286,-11.771]],[0,[288,12.828]],[1,[70,13.173]],[1,[1,12.468]],[1,[76,14.665]],[1,[80,11.074]],[0,[66,30.716]],[1,[74,33.093]],[0,[1,56.347]],[1,[70,61.945]],[0,[1,110.359]],[0,[433,154.197]]]},{axis:"y",k:[[1,[120,3.791]],[1,[326,-1.549]],[1,[100,7.219]],[1,[98,1.799]],[1,[74,3.765]],[2,[545,3.765,1034.564,3.765,1319.823,3.765]],[0,[146,-17.766,1284.321,-15.841]],[2,[57,-18.4,1439.682,-18.113,1532.488,-19.125]],[1,[116,-37.554,1493.553,-37.047]],[1,[289,2.041]],[1,[306,2.244]],[2,[287,3.041,2463.953,3.041,2473.839,3.041]],[1,[224,.914,2654.913,.914]],[1,[65,3.947]],[0,[286,7.027]],[1,[287,5.779]],[0,[1,2.675]],[1,[70,2.724]],[0,[1,5.184]],[1,[75,5.673]],[0,[1,6.112]],[1,[79,2.015]],[1,[1,9.679]],[0,[66,4.947]],[0,[282,5.067]],[0,[297,5.786]]]},{axis:"x",k:[[1,[545,1.571]],[1,[1,1.377]],[1,[1325,1.571]],[1,[1168,1.653]],[1,[287,1.655]],[1,[1,1.399]],[0,[71,1.45]],[1,[75,1.71]],[0,[1,1.459]],[1,[79,1.506]],[0,[1,1.299]],[1,[65,1.325]],[1,[1,1.553]]]},{axis:"z",k:[[1,[358,0]],[0,[3040,-.094]],[1,[75,-.057]],[0,[1,-0]]]},{axis:"y",k:[[1,[358,0]],[1,[188,-.32]],[1,[98,0]],[1,[1532,0]],[1,[1,-1.577]],[1,[862,-1.051]],[0,[288,-.357]],[1,[70,-.475]],[0,[1,.47]],[1,[75,.475]],[0,[1,-.242]],[1,[79,-.249]],[0,[1,-.521]],[1,[65,.456]],[1,[1,-0]]]},{axis:"y",k:[[1,[358,0]],[1,[286,1]],[1,[1227,0]],[1,[593,1]],[1,[575,0]]]},{axis:"x",k:[[2,[53.001,0,-32.564,0,138.566,0]],[1,[190,1,179.667,1]],[1,[457,0]],[1,[18,1]],[1,[1153,0]],[2,[19,0,1427.07,0,1928.143,0]],[1,[120,1,1974.44,1]],[1,[2187,0]]]},{axis:"y",k:[[2,[3844,0,3807.333,0,3880.667,0]],[2,[110,5.128,3917.333,5.128,3990.667,5.128]]]},{axis:"x",k:[[2,[2648,17.297,2634.667,17.297,2661.333,17.297]],[1,[40,12.176,2674.667,13.026]],[1,[65,10.794]],[1,[801,5.962]],[1,[66,11.85]]]},{axis:"x",k:[[1,[69,0]],[1,[289,1.634]],[1,[360,100.066]],[1,[1152,100.074,1486,100.074,1870.333,100.074]],[1,[1,-712.978,1870.667,-712.977]],[1,[593,-713.061]],[1,[289,-.035]],[1,[286,-4.794]]]},{axis:"z",k:[[1,[69,-0]],[1,[289,-9.311]],[1,[360,-.013]],[2,[262,-.013,588.692,-.013,1024.434,-.013]],[1,[47,-30.021,979.267,-30.021]],[2,[537,-30.021,1200.558,-30.021,1602.539,-30.021]],[1,[48,-68.645,1566.693,-68.645]],[1,[258,-68.645,1784,-68.645,1870.333,-68.645]],[1,[1,-1.16,1870.667,-1.16]],[1,[593,-10.02]],[1,[289,.127]],[1,[286,-13.966]]]},{axis:"y",k:[[1,[69,1.139]],[1,[289,1.997]],[1,[360,3.899]],[2,[556,3.899,724.024,3.899,1308.17,3.899]],[0,[105,-22.476,1271.091,-21.528]],[2,[96,-23.12,1375.508,-22.393,1536.152,-23.566]],[1,[97,-37.458,1488.03,-37.047]],[1,[299,1.834]],[1,[593,.429]],[2,[214,.429,2636.471,.429,2686.539,.429]],[1,[38,2.843,2669.012,2.809]],[1,[37,4.69]],[1,[286,6.791]]]},{axis:"x",k:[[0,[1127,76.279]],[1,[134,-76.511]]]},{axis:"y",k:[[0,[1127,29.509]],[1,[134,-45.664]]]},{axis:"x",k:[[0,[1127,-.526]],[1,[134,.613]]]},{axis:"z",k:[[0,[1127,-.279]],[1,[134,.376]]]},{axis:"y",k:[[0,[1127,.048]],[1,[134,-.074]]]},{axis:"x",k:[[1,[108,0]],[1,[610,1]],[1,[2034,0]]]},{axis:"x",k:[[2,[255,0,220,0,290,0]],[1,[105,1,325,1]]]},{axis:"x",k:[[1,[108,0]],[1,[675,1]]]},{axis:"x",k:[[2,[258,0,223,0,293,0]],[2,[105,1,328,1,398,1]]]},{axis:"x",k:[[2,[724,-6.033,709.829,-6.158,738.171,-5.909]],[2,[91,-5.175,806.133,-4.992,827.056,-5.424]],[2,[24,-6.73,830.676,-7.338,843.502,-6.401]],[2,[14,3.052,841.332,2.978,860.882,3.102]],[2,[57,4.706,900.38,4.576,917.338,4.804]],[2,[24,-9.86,914.524,-9.86,953.476,-9.86]]]},{axis:"y",k:[[2,[798,-28.229,795.967,-28.229,800.033,-28.229]],[2,[22,-15.361,802.479,-12.435,829.271,-16.848]],[2,[19,-12.507,833.465,-12.493,842.11,-12.515]],[2,[19,-20.097,838.478,-20.097,866.884,-20.097]],[2,[37,-16.022,883.508,-16.022,901.602,-16.022]],[2,[15,-19.943,905.455,-19.943,914.171,-19.943]],[2,[24,-11.698,917.015,-11.698,950.985,-11.698]]]},{axis:"z",k:[[2,[816,-.087,805.81,-.071,826.896,-.103]],[2,[19,.311,827.474,.312,843.048,.309]],[2,[18,-1.485,842.964,-1.485,865.188,-1.485]],[2,[30,.236,870.167,.236,888.817,.236]],[2,[14,.094,891.505,.09,902.523,.098]],[2,[13,.579,901.798,.579,918.049,.579]],[2,[24,-.827,907.69,-.827,951.116,-.827]]]},{axis:"y",k:[[2,[798,-0,794.864,-0,801.136,-0]],[2,[35,-6.27,793.505,-6.306,840.658,-6.264]],[2,[30,-6.267,844.83,-6.293,882.035,-6.241]],[2,[41,-2.937,884.588,-2.983,923.412,-2.892]],[2,[39,-3.237,937.396,-3.234,948.604,-3.24]]]},{axis:"x",k:[[1,[717,1]],[1,[1,0]]]},{axis:"x",k:[[0,[1273,0]],[1,[104,1]]]},{axis:"x",k:[[1,[970,0]],[1,[130,1]]]},{axis:"y",k:[[0,[1288,0]],[0,[87,1]]]},{axis:"x",k:[[2,[1578,-.18,1548.301,-.18,1582.826,-.18]],[1,[13,2.022,1586.505,2.022]]]},{axis:"y",k:[[2,[1498,-33.378,1483.268,-37.264,1512.732,-29.492]],[2,[77,-27.141,1549.333,-27.141,1581.753,-27.141]],[1,[14,-28.024,1584.333,-28.024]]]},{axis:"x",k:[[2,[1498,.776,1470,.776,1526,.776]],[1,[84,.572,1554,.572]]]},{axis:"z",k:[[2,[1498,.431,1472,.431,1524,.431]],[2,[78,.018,1555.235,.04,1579.7,-.039]],[1,[9,-.299,1582.237,-.299]]]},{axis:"y",k:[[2,[1498,-.93,1470,-.93,1526,-.93]],[1,[84,-.404,1554,-.404]]]},{axis:"x",k:[[2,[1494,1,1471.672,1,1516.328,1]],[1,[88,0,1543.461,0]]]},{axis:"x",k:[[2,[1574,-2.944,1539.215,-2.944,1588.718,-2.944]],[1,[32,-7.055,1595.333,-7.055]]]},{axis:"y",k:[[2,[1574,-24.617,1547.333,-24.617,1587.488,-24.617]],[1,[31,-19.582,1594.667,-19.582]]]},{axis:"x",k:[[2,[1494,1.225,1466.667,1.225,1521.333,1.225]],[2,[82,.723,1548.667,.723,1580.667,.723]],[1,[12,.39,1584,.39]]]},{axis:"z",k:[[2,[1494,.171,1466.667,.171,1521.333,.171]],[1,[82,.139,1548.667,.139]]]},{axis:"y",k:[[2,[1494,1.082,1466.667,1.082,1521.333,1.082]],[2,[82,.59,1548.667,.59,1603.333,.59]]]},{axis:"x",k:[[2,[1491,1,1477.069,1,1504.931,1]],[1,[85,0,1533.62,0]]]},{axis:"x",k:[[1,[65,0]],[1,[293,1]]]},{axis:"x",k:[[2,[3912,0,3859.426,0,3964.575,0]],[1,[60,1,3933.802,1]]]},{axis:"y",k:[[2,[3947,0,3917.932,0,3976.068,0]],[1,[48,1,3960.361,1]]]},{axis:"z",k:[[2,[3966,0,3923.623,0,4008.377,0]],[1,[56,1,3978.308,1]]]},{axis:"w",k:[[1,[4004,0]],[1,[7,1]],[1,[3,0]],[1,[3,1]]]},{axis:"x",k:[[1,[3863,0]],[1,[334,1]]]},{axis:"x",k:[[2,[4059,0,4032.446,0,4083.737,0]],[2,[36,1,4067.522,1,4122.479,1]]]},{axis:"z",k:[[1,[4143,0]],[1,[2,1]],[1,[3,0]],[1,[3,1]]]},{axis:"y",k:[[2,[4092,0,4063.144,0,4120.856,0]],[2,[42,1,4105.19,1,4162.81,1]]]},{axis:"w",k:[[2,[4021,0,3992.252,0,4049.748,0]],[2,[37,1,4032.091,1,4083.909,1]]]},{axis:"x",k:[[2,[718,20.519,717.999,26.464,718.004,.212]],[2,[146,.119,815.388,.119,912.612,.119]],[2,[2682,.119,2652,.119,4440,.119]]]},{axis:"y",k:[[2,[718,-22.097,717.999,-29.168,718.001,-12.869]],[2,[146,-12.487,815.388,-12.487,912.612,-12.487]]]},{axis:"x",k:[[2,[718,6.721,717.996,23.388,718.001,2.205]],[2,[124,.063,792.496,.405,853.687,-1.088]],[2,[75,-6.283,814.736,-6.283,925.061,-6.283]],[2,[86,-11.703,900.736,-11.703,1105.264,-11.703]]]},{axis:"x",k:[[0,[840,0]],[0,[7,.831]]]},{axis:"y",k:[[2,[842,0,839.379,0,844.621,0]],[2,[19,1,831.427,1,890.573,1]]]},{axis:"z",k:[[0,[914,0]],[0,[4,.999]]]},{axis:"x",k:[[1,[718,0]],[1,[199,1]]]},{axis:"x",k:[[0,[704.129,0]],[1,[80.451,.998]],[0,[192,.998]],[1,[41,.15]]]},{axis:"x",k:[[0,[1091,4.766]],[0,[43,-4.299]]]},{axis:"y",k:[[0,[1091,-9.866]],[0,[43,-14.859]]]},{axis:"x",k:[[1,[1051,1]],[1,[31,0]]]},{axis:"x",k:[[2,[2677,0,2663.333,0,2690.667,0]],[1,[41,1.304,2704.333,1.304]]]},{axis:"x",k:[[0,[1555,0]],[1,[71,1]]]},{axis:"x",k:[[2,[1003,-28.103,976.667,-28.103,1029.333,-28.103]],[2,[79,-5.926,1059.599,-7.763,1104.401,-4.089]],[2,[97,-3.589,1160.059,-1.616,1229.317,-8.83]],[1,[88,-75.067,1237.667,-75.067]]]},{axis:"y",k:[[2,[1003,-20.062,983,-20.062,1023,-20.062]],[2,[60,-10.401,1031.678,-12.651,1121.884,-6.17]],[2,[150,-19.104,1178.234,-7.574,1240.422,-28.198]],[1,[54,-47.254,1249,-47.254]]]},{axis:"z",k:[[2,[1160,-11.533,1142.333,-11.533,1177.667,-11.533]],[1,[53,-70.541,1199.616,-64.508]],[1,[54,-75.954]]]},{axis:"z",k:[[2,[1213,-.368,1195,-.368,1231,-.368]],[1,[54,.4,1249,.4]]]},{axis:"y",k:[[2,[1160,3.138,1124.333,3.138,1195.667,3.138]],[2,[107,6.263,1231.333,6.263,1302.667,6.263]]]},{axis:"x",k:[[2,[993,-24.403,967.333,-24.403,1018.667,-24.403]],[2,[77,2.343,1045.276,-.085,1094.724,4.772]],[2,[87,2.343,1141.278,2.343,1172.722,2.343]],[2,[56,21.665,1175.849,21.665,1235.839,21.665]],[1,[75,-.142,1236.758,-.142]]]},{axis:"y",k:[[2,[993,-32.081,967.333,-32.081,1018.667,-32.081]],[2,[77,-16.908,1045.02,-18.717,1094.98,-15.098]],[2,[87,-16.908,1141.278,-16.908,1172.722,-16.908]],[2,[56,-8.224,1179.927,-8.224,1233.645,-8.224]],[1,[78,-16.065,1236.686,-16.065]]]},{axis:"y",k:[[1,[1158,0]],[1,[50,1]]]},{axis:"x",k:[[2,[993,-36.28,991.846,-36.28,994.154,-36.28]],[2,[48,.854,1008.173,-6.409,1060.309,5.126]],[2,[115,-.074,1136.725,-.074,1167.966,-.074]],[2,[41,19.658,1179.36,19.658,1210.293,19.658]],[1,[88,-.098,1221.092,-.098]]]},{axis:"y",k:[[2,[993,-27.842,991.846,-27.842,994.154,-27.842]],[2,[48,-12.461,1006.88,-15.549,1066.424,-10.16]],[2,[115,-12.423,1136.679,-12.423,1168.284,-12.423]],[2,[41,-3.475,1180.87,-3.475,1206.232,-3.475]],[1,[88,-12.036,1218.648,-12.036]]]},{axis:"x",k:[[0,[1111,0]],[2,[15,1,1121,1,1131,1]]]},{axis:"y",k:[[1,[1168,0]],[1,[24,1]]]},{axis:"x",k:[[0,[976,0]],[0,[73,1]],[0,[239,1]],[0,[77,2]]]},{axis:"x",k:[[1,[10,0]],[1,[694,1]],[1,[14,1]],[1,[2035,0]]]},{axis:"x",k:[[1,[10,0]],[1,[694,1]],[1,[14,1]]]},{axis:"x",k:[[1,[1254,1]],[1,[35,0]],[1,[300,1]]]},{axis:"x",k:[[1,[600,1]],[1,[118,0]],[1,[299,1]]]},{axis:"x",k:[[1,[411,1]],[1,[2342,0]]]},{axis:"x",k:[[1,[977,1]],[1,[15,0]],[1,[331,1]]]},{axis:"x",k:[[1,[1539,1]],[1,[38,0]],[1,[294,1]]]},{axis:"x",k:[[1,[1831,1]],[1,[40,0]],[1,[882,1]]]},{axis:"x",k:[[2,[263,0,223.667,0,302.333,0]],[1,[118,.085,336.132,.078]],[1,[324,1]],[1,[2048,.141]]]},{axis:"x",k:[[1,[717,1]],[1,[1,0]]]},{axis:"x",k:[[1,[717,1]],[1,[1,0]],[1,[2035,1]]]},{axis:"x",k:[[2,[915,2.74,912.258,2.74,917.742,2.74]],[2,[81,2.245,943.179,2.245,1048.821,2.245]]]},{axis:"y",k:[[2,[915,-14.149,907.217,-14.149,922.783,-14.149]],[2,[81,-13.728,949.47,-13.728,1042.53,-13.728]]]},{axis:"x",k:[[2,[915,-.613,913.046,-.613,916.954,-.613]],[2,[81,-.843,960.385,-.843,1031.615,-.843]]]},{axis:"z",k:[[2,[915,-.087,913.902,-.087,916.098,-.087]],[2,[81,-.696,950.01,-.696,1041.99,-.696]]]},{axis:"y",k:[[2,[915,.713,912.781,.713,917.219,.713]],[2,[81,.15,952.345,.15,1039.655,.15]]]},{axis:"x",k:[[1,[878,1]],[1,[37,0]]]},{axis:"x",k:[[2,[916,-2.114,911.511,-2.114,920.489,-2.114]],[2,[76,-2.439,894.514,-2.439,1003.575,-2.439]],[2,[14,-2.937,999.646,-2.937,1012.354,-2.937]]]},{axis:"y",k:[[2,[916,-13.294,915.521,-13.294,916.479,-13.294]],[2,[76,-12.498,896.023,-12.498,1006.349,-12.498]],[2,[14,-11.871,998.689,-11.871,1013.311,-11.871]]]},{axis:"x",k:[[2,[916,-.606,915.003,-.606,916.997,-.606]],[2,[76,-.446,963.778,-.446,1020.222,-.446]]]},{axis:"z",k:[[2,[916,-.712,915.491,-.712,916.509,-.712]],[2,[76,-.031,951.739,-.031,1032.261,-.031]]]},{axis:"y",k:[[2,[916,-1.052,915.131,-1.052,916.869,-1.052]],[2,[76,-.641,967.196,-.641,1016.804,-.641]]]},{axis:"x",k:[[1,[878,1]],[1,[38,0]]]},{axis:"x",k:[[2,[-650,0,-651,0,-649,0]]]},{axis:"y",k:[[1,[2741,0]],[1,[12,1]],[2,[867,1,3356.464,111.248,3621.65,.31]],[1,[89,0,3679.333,0]]]},{axis:"y",k:[[2,[2679,-12.409,2675.942,-12.898,2682.058,-11.921]],[1,[30,-7.348,2637.225,-7.434]]]},{axis:"x",k:[[2,[2679,.793,2676.628,.793,2681.372,.793]],[1,[29,.649,2689.798,.649]]]},{axis:"z",k:[[2,[2679,-0,2676.628,-0,2681.372,-0]],[1,[29,-.347,2689.798,-.347]]]},{axis:"y",k:[[2,[2679,0,2676.628,0,2681.372,0]],[1,[29,.398,2689.798,.398]]]},{axis:"x",k:[[2,[2661,0,2638.667,0,2683.333,0]],[2,[67,1,2692.086,1,2763.914,1]]]},{axis:"y",k:[[2,[2747,1,2746,1,2748,1]]]},{axis:"y",k:[[0,[3094,1.718]]]},{axis:"x",k:[[0,[3094,1.718]]]},{axis:"x",k:[[2,[1577,1,1571.337,1.293,1582.663,.707]],[1,[80,0,1604.182,0]]]},{axis:"y",k:[[2,[1583,0,1564.667,0,1601.333,0]],[2,[55,0,1633.19,0,1656.036,0]],[2,[44,1,1647.202,1,1711.01,1]],[2,[48,2,1696.097,2,1771.558,2]],[2,[53,3,1743.733,3,1822.267,3]],[1,[54,4,1797.733,4]]]},{axis:"z",k:[[2,[1749,.025,1732.667,.025,1765.333,.025]],[2,[49,1,1782.766,1,1800.328,1]],[1,[17,-.007,1801.602,-.007]]]},{axis:"x",k:[[2,[1748,0,1731.333,0,1764.667,0]],[2,[50,2.134,1775.519,2.12,1799.226,2.135]],[1,[27,2.956,1800.102,2.956]]]},{axis:"y",k:[[2,[1734,0,1731.333,0,1736.667,0]],[2,[8,1,1734,1,1750,1]],[2,[51,1,1791.649,1,1794.351,1]],[1,[37,0,1756.825,0]]]},{axis:"x",k:[[2,[1800,-.821,1774.667,-.821,1825.333,-.821]],[2,[76,-.821,1850.667,-.821,1901.333,-.821]]]},{axis:"z",k:[[2,[1800,-.063,1774.667,-.063,1825.333,-.063]],[2,[76,-.063,1850.667,-.063,1901.333,-.063]]]},{axis:"y",k:[[2,[1800,-.277,1794.706,-.277,1805.294,-.277]],[2,[76,-.796,1827.954,-.796,1924.046,-.796]]]},{axis:"x",k:[[2,[1800,-2.278,1797.745,-2.278,1802.255,-2.278]],[2,[76,-3.714,1842.09,-3.714,1909.91,-3.714]]]},{axis:"z",k:[[2,[1800,-1.202,1774.667,-1.202,1825.333,-1.202]],[2,[76,-1.206,1850.667,-1.206,1901.333,-1.206]]]},{axis:"y",k:[[2,[1800,-13.761,1794.866,-13.761,1805.134,-13.761]],[2,[76,-12.11,1827.667,-12.11,1924.333,-12.11]]]},{axis:"x",k:[[1,[1710,1]],[1,[90,0]]]},{axis:"x",k:[[2,[1800,1.152,1792.445,1.152,1807.503,1.152]],[2,[76,1.911,1827.833,1.894,1876.332,1.911]]]},{axis:"z",k:[[2,[1800,-5.469,1774.667,-5.469,1825.333,-5.469]],[1,[76,-5.457,1850.667,-5.457]]]},{axis:"y",k:[[2,[1800,-8.926,1792.445,-8.926,1807.555,-8.926]],[1,[76,-8.277,1837.471,-8.277]]]},{axis:"x",k:[[2,[1800,-.867,1795.011,-.867,1804.989,-.867]],[1,[76,-.821,1819.572,-.821]]]},{axis:"z",k:[[2,[1800,.213,1795.375,.213,1804.625,.213]],[1,[76,-.063,1822.14,-.063]]]},{axis:"y",k:[[2,[1800,1.807,1795.5,1.807,1804.5,1.807]],[1,[76,2.243,1815.225,2.243]]]},{axis:"x",k:[[1,[1710,1]],[1,[90,0]]]}],fP={name:"root",parent:null,children:[{name:"Camera",uuid:"d7b3bbdf",type:"camera",animation:{position:0,rotation:1,state:2,uPP:3},param:{fov:38.262},uniforms:{uPP:3}},{name:"CamLook",uuid:"b89a78b8",position:[100.066,3.899,-30.021],rotation:[0,-.815,0],animation:{position:5},children:[{name:"CamDof",uuid:"42325580",position:[-.013,-.005,-0],animation:{}}]},{name:"HUD",uuid:"93978ccc",animation:{hide:12,uState:4},uniforms:{uState:4}},{name:"Outro",uuid:"dcfcefc5",position:[0,17.299,21.167],children:[{name:"Logo",uuid:"26751dfa",animation:{hide:23,state:22,state2:24}}]},{name:"SceneHome",uuid:"dbabc2b5",position:[0,0,-0],visible:!1,animation:{hide:42},children:[{name:"Lane",uuid:"0f3c0a1f",position:[-0,3.855,265.898],rotation:[1.571,0,0],visible:!1,animation:{hide:21}},{name:"Table",uuid:"f4a7a7e8",position:[0,0,-0],scale:[29.83,29.83,29.83],animation:{uState:58},uniforms:{uState:58},children:[]}]},{name:"SceneIkura",uuid:"5ea37a9e",position:[101.415,-11.404,-23.71],visible:!1,animation:{hide:43},children:[{name:"GraphIkura",uuid:"72ce0867",position:[-1.273,-16.472,-11.971],scale:[1.698,1.698,1.698]},{name:"IBG",uuid:"cebe8ad4",position:[-1.442,-24.389,-18.564],rotation:[-.322,-.06,.011],scale:[67.194,67.194,67.194],animation:{uState:13},uniforms:{uState:13}},{name:"IkuraFluids",uuid:"67e890a6",position:[-1.563,-11.712,-6.411],scale:[7.802,7.802,7.802],animation:{uState:14},uniforms:{uState:14}},{name:"IkuraGunKan_left",uuid:"2b281283",position:[-2.944,-24.617,-8.38],rotation:[1.225,1.082,.171],scale:[5.81,5.81,5.81],animation:{position:18,rotation:19,uState:20},uniforms:{uState:20}},{name:"IkuraGunKan_right",uuid:"c85f4ed4",position:[-.18,-33.378,-6.461],rotation:[.776,-.93,.431],scale:[5.252,5.252,5.252],animation:{position:15,rotation:16,uState:17},uniforms:{uState:17}},{name:"Kyuri",uuid:"24df161a",position:[-1.347,-11.439,-6.251],rotation:[-.26,-0,.218],scale:[6.953,6.953,6.953]}]},{name:"SceneIntro",uuid:"9df2d6d7",position:[0,0,-0]},{name:"SceneMaguro",uuid:"8d834b6f",position:[100,16.37,-0],visible:!1,animation:{hide:44},children:[{name:"DebaBouChou",uuid:"989f5be8",position:[-9.86,-11.698,2.819],rotation:[0,-3.237,-.827],scale:[5.625,5.625,5.625],animation:{position:10,rotation:11}},{name:"GraphMaguro",uuid:"9aecb1bb",position:[.204,-12.548,-2.134],scale:[1.886,1.886,1.886]},{name:"Maguro",uuid:"29549b03",position:[.119,-12.487,-.001],rotation:[-11.703,0,-.443],scale:[9.774,9.774,9.774],visible:!1,animation:{position:25,rotation:26,hide:28,uState:27},uniforms:{uState:27}},{name:"MBG",uuid:"c21a6cf1",position:[.146,-12.462,-9.085],scale:[73.019,73.019,73.019],animation:{uState:29},uniforms:{uState:29}},{name:"MizuBall",uuid:"32dd0971",position:[-7.423,-14.64,-1.212],scale:[1.658,1.658,1.658]},{name:"MizuBall.001",uuid:"ef136354",position:[-3.26,-7.261,-5.785],scale:[1.227,1.227,1.227]},{name:"MizuBall.002",uuid:"cc506154",position:[14.39,-11.728,-7.296],scale:[1.604,1.604,1.604]},{name:"Sushi",uuid:"b6c68e95",position:[-2.937,-11.871,-.026],rotation:[-.446,-.641,-.031],scale:[5.99,5.99,5.99],animation:{position:55,rotation:56,hide:57}},{name:"Sushi.001",uuid:"f2985235",position:[2.245,-13.728,-1.187],rotation:[-.843,.15,-.696],scale:[5.346,5.346,5.346],animation:{position:52,rotation:53,hide:54}}]},{name:"SceneParty",uuid:"dba88dd0",position:[0,16.458,6.4],visible:!1,animation:{hide:45},children:[{name:"BO",uuid:"629afea1",position:[-.056,-15.117,2.834],scale:[1.195,1.195,1.195]},{name:"KaitenSushi",uuid:"b01f8327",position:[0,-11.584,-20.722],scale:[3.625,3.625,3.625]},{name:"PartyMaguro",uuid:"76c75ce7",position:[-9.637,-14.129,-5.997],rotation:[-.711,3.215,-1.334],scale:[8.814,8.814,8.814]},{name:"PartyMaguro.001",uuid:"dd391494",position:[-9.637,-14.129,-1.584],rotation:[-.711,3.215,-1.334],scale:[8.814,8.814,8.814]},{name:"PartySalmon",uuid:"ef245de7",position:[10.088,-14.871,-7.183],rotation:[.446,.494,-1.376],scale:[9.941,9.941,9.941]},{name:"PartySalmon.001",uuid:"24a125ef",position:[10.088,-14.871,-.411],rotation:[.446,.494,-1.376],scale:[9.941,9.941,9.941]},{name:"PartyTai",uuid:"96971d72",position:[.415,-10.148,-6.367],rotation:[.454,1.86,.118],scale:[15.484,15.484,15.484]},{name:"Sara.001",uuid:"b2ebb3cb",position:[3.512,-15.622,3.205],scale:[2,2,2]},{name:"Sara.002",uuid:"dd9c0ac8",position:[3.186,-15.621,-11.01],scale:[2.721,2.721,2.721]},{name:"Sara.003",uuid:"0472d010",position:[-4.073,-15.76,3.197],scale:[2,2,2]},{name:"Sara.004",uuid:"651fdf32",position:[-3.207,-15.621,-12.204],scale:[2.721,2.721,2.721]},{name:"Sara.005",uuid:"02e7b7ae",position:[-4.292,-15.621,-8.977],scale:[2.721,2.721,2.721]},{name:"Spot.003",uuid:"3bf2b50c",position:[-12.028,-14.623,15.77],rotation:[-1.892,2.423,.08],type:"light",param:{shadow_map:!1,color:{x:1,y:1,z:1},intensity:1.26,type:"spot",angle:.785,blend:.15,distance:99.97}},{name:"Spot.004",uuid:"26373a5a",position:[10.375,-14.623,15.77],rotation:[-1.892,-2.446,.08],type:"light",param:{shadow_map:!1,color:{x:1,y:1,z:1},intensity:1.26,type:"spot",angle:.785,blend:.15,distance:99.97}},{name:"SushiGetaL",uuid:"526c1c65",position:[-3.44,-15.185,-.602],rotation:[0,.438,0],scale:[4.67,4.67,4.67]},{name:"SushiGetaR",uuid:"06a4626d",position:[3.449,-15.117,-1.002],rotation:[0,-.266,0],scale:[4.959,4.959,4.959]},{name:"Tako",uuid:"b41b8d15",position:[18.972,-2.219,-11.792],rotation:[-2.267,-.835,0],scale:[5.323,5.323,5.323],animation:{uState:62},uniforms:{uState:62}},{name:"Tako.001",uuid:"e63fb6c9",position:[-16.211,-2.015,-11.778],rotation:[-2.267,.935,-0],scale:[5.323,5.323,5.323],animation:{uState:62},uniforms:{uState:62}},{name:"ukp",uuid:"4dbbbcce",position:[68.097,-62.154,-10.403],rotation:[0,2.031,0],scale:[8.725,8.725,8.725]}]},{name:"SceneSalmon",uuid:"b1c3550e",position:[100.217,16.315,-23.661],animation:{hide:46},children:[{name:"GraphSalmon",uuid:"7d90402e",position:[-0,-12.412,-12.21],scale:[2.407,2.407,2.407]},{name:"MizuBall.003",uuid:"06674a7c",position:[4.766,-9.866,4.183],scale:[1.34,1.34,1.34],visible:!1,animation:{position:30,hide:31}},{name:"Onigiri",uuid:"768002b3",position:[76.279,29.509,-75.15],rotation:[-.526,.048,-.279],scale:[9.497,9.497,9.497],animation:{position:6,rotation:7}},{name:"Salmon",uuid:"c51ba9ef",position:[2.411,-11.612,-6.016],rotation:[-.002,3.138,-.368],scale:[7.953,7.953,7.953],animation:{position:38,uState:39},uniforms:{uState:39}},{name:"Salmon_sub1",uuid:"0dd05673",position:[-11.904,-10.726,-11.533],rotation:[.012,3.138,-.368],scale:[6.226,6.226,6.226],animation:{position:34,rotation:35,uState:40},uniforms:{uState:40}},{name:"Salmon_sub2",uuid:"78014334",position:[.005,-18.357,-11.151],rotation:[-.002,3.138,-.368],scale:[6.518,6.518,6.518],animation:{position:36,uState:37},uniforms:{uState:37}},{name:"SBG",uuid:"cc48dd93",position:[-.07,-12.406,-16.837],scale:[72.711,72.711,72.711],animation:{uState:41},uniforms:{uState:41}}]},{name:"SceneTako",uuid:"ba87ca2f",position:[100.656,-27.191,-70.038],visible:!1,animation:{hide:47},children:[{name:"GraphTako",uuid:"de897ba0",position:[-0,-7.78,-29.78],scale:[5.763,5.763,5.763]},{name:"Plane",uuid:"5e9cf8ad",position:[-.569,-11.168,-31.346],scale:[103.398,103.398,103.398],animation:{uState:33},uniforms:{uState:33}},{name:"TakoGate",uuid:"27599264",position:[-.72,-10.023,-3.232],scale:[5.593,5.593,5.593],animation:{uState:63},uniforms:{uState:63}},{name:"TakoKosen",uuid:"77db9e8a",position:[-.441,-9.975,-3.491],scale:[5.875,5.875,5.875],animation:{uState:64},uniforms:{uState:64}},{name:"TakoNigiri",uuid:"f14b3580",position:[1.152,-8.926,-5.469],rotation:[-.867,1.807,.213],scale:[13.213,13.213,13.213],visible:!1,animation:{position:68,rotation:69,hide:70}},{name:"TakoNigiri.001",uuid:"2a16e1b2",position:[-2.278,-13.761,-1.202],rotation:[-.821,-.277,-.063],scale:[10.71,10.71,10.71],visible:!1,animation:{position:66,rotation:65,hide:67}}]},{name:"SceneTsuri",uuid:"3cb58617",position:[-713.899,10.301,-.112],visible:!1,animation:{hide:48},children:[{name:"Ocean",uuid:"727525da",position:[.648,-10.253,-.914],animation:{uState:32},uniforms:{uState:32}},{name:"SkyBoxTuri",uuid:"4afddbe4",position:[.629,-10.301,-.599],rotation:[0,-3.577,0],scale:[.251,.251,.251]},{name:"Taiyaki",uuid:"d454a187",position:[.819,-12.409,-9.969],rotation:[.793,0,-0],scale:[5.456,5.456,5.456],animation:{position:59,rotation:60,uState:61},uniforms:{uState:61}},{name:"Teibo",uuid:"ddc6e769",position:[14.99,-9.752,1.378],scale:[34.744,2,4.351]},{name:"Teibo.001",uuid:"69f163d9",position:[18.571,-9.752,20.907],rotation:[0,-1.566,0],scale:[34.744,2,4.351]},{name:"ukonpower",uuid:"5fe0ec15",position:[1.489,-8.188,-.527],scale:[1.575,1.575,1.575]}]},{name:"SkyBox",uuid:"60382d7c",position:[46.874,3.846,11.143],scale:[1.235,1.235,1.235],animation:{uState:49},uniforms:{uState:49}},{name:"Spot",uuid:"d9fff7dc",position:[92.626,9.823,16.176],rotation:[.991,.069,.87],type:"light",animation:{hide:50},param:{shadow_map:!1,color:{x:1,y:1,z:1},intensity:2,type:"spot",angle:.785,blend:.15}},{name:"Spot.001",uuid:"3f8ac3fd",position:[-.436,31.409,7.075],rotation:[-.005,0,0],type:"light",visible:!1,animation:{hide:8,light:9},param:{shadow_map:!0,color:{x:1,y:1,z:1},intensity:.002,type:"spot",angle:2.119,blend:1,distance:400}},{name:"Spot.002",uuid:"cc736d54",position:[-.436,-158.07,436.502],rotation:[.965,0,-0],type:"light",param:{shadow_map:!1,color:{x:1,y:1,z:1},intensity:1.13,type:"spot",angle:1.864,blend:1,distance:361.31}},{name:"Sun",uuid:"130e1f31",position:[66.81,52.478,116.473],rotation:[.169,1.119,-.425],type:"light",animation:{hide:51},param:{shadow_map:!1,color:{x:1,y:1,z:1},intensity:1,type:"directional"}}],type:"empty",visible:!0},mP={start:1,end:4280,fps:30,playing:!1},vb={version:uP,animations:cP,fcurves:dP,root:fP,frame:mP};class qb extends Te{constructor(i){super(i);y(this,"blidge");y(this,"type");y(this,"blidgeRoot");y(this,"entities");y(this,"animationState");y(this,"connection");y(this,"reloadTimerId");y(this,"saveSceneTimerId");y(this,"connectionTimeoutId");this.entities=new Map,this.type="websocket",this.connection={enabled:!0,url:"ws://localhost:3100"},this.reloadTimerId=null,this.saveSceneTimerId=null,this.connectionTimeoutId=null,this.animationState={playing:!1,scrubbing:!1,currentFrame:0},this.blidgeRoot=null,this.blidge=new GN(We);const o=this.onSyncScene.bind(this),s=_=>{if(this.entity){this.animationState.playing=_.playing||!1,this.animationState.scrubbing=_.scrubbing||!1,this.animationState.currentFrame=_.current;const S=!this.animationState.scrubbing;this.emit("update/blidge/frame",[_,{interpolate:S,scrubbing:this.animationState.scrubbing}])}},d=_=>{if(this.entity){const S=_.selected[0];if(S&&S.uuid){const T=this.entities.get(S.uuid);T&&this.emit("update/blidge/selection",[T])}}};this.blidge.on("sync/scene",o),this.blidge.on("sync/timeline",s),this.blidge.on("sync/selection",d),this.once("dispose",()=>{this.blidge.off("sync/scene",o),this.blidge.off("sync/timeline",s),this.blidge.off("sync/selection",d)});const c=async()=>{this.connectionTimeoutId!==null&&(clearTimeout(this.connectionTimeoutId),this.connectionTimeoutId=null),this.type=="json"?(await this.blidge.loadScene(vb),this.emit("loaded")):(this.blidge.connect(this.connection.url),this.connectionTimeoutId=window.setTimeout(async()=>{console.warn("[BLidgeClient] WebSocket connection timeout. Falling back to JSON..."),await this.blidge.loadScene(vb),this.emit("loaded"),this.connectionTimeoutId=null},1e3))},v=()=>{this.reloadTimerId!==null&&clearTimeout(this.reloadTimerId),this.reloadTimerId=window.setTimeout(()=>{this.reloadTimerId=null,c()},500)};this.field("mode",()=>this.type,_=>{this.type=_,v()},{format:{type:"select",list:["websocket","json"]}});const h=this.fieldDir("websocket",{hidden:()=>this.type!="websocket"});h.field("reconnect",()=>()=>c(),void 0,{label:"Reconnect"}),h.field("url",()=>this.connection.url,_=>this.connection.url=_),ct.getInstance(We).registerBLidgeClient(this)}saveSceneToLocal(i){this.saveSceneTimerId!==null&&clearTimeout(this.saveSceneTimerId),this.saveSceneTimerId=window.setTimeout(async()=>{this.saveSceneTimerId=null;try{const o=await fetch("/api/writeScene",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sceneData:i})});if(!o.ok){const s=await o.text();throw new Error(`HTTP error! status: ${o.status}, body: ${s}`)}}catch(o){console.error("[BLidgeClient] Failed to save blidge-data.json:",o)}},1e3)}onSyncScene(i){this.connectionTimeoutId!==null&&(clearTimeout(this.connectionTimeoutId),this.connectionTimeoutId=null),this.type==="websocket"&&i.currentData;const o=new Date().getTime(),s=c=>{let v;if(c.uuid&&(v=this.entities.get(c.uuid)),v||(v=this.entities.get(c.name)),v||(v=new Ct),c.type=="camera"){const p=c.param;v.userData.cameraParam=p}v.removeComponent(li),v.addComponent(li,{blidge:i,node:c}),c.children.forEach(p=>{const _=s(p);v.add(_)});const h=c.uuid||v.name;return this.entities.set(h,v),v.userData.updateTime=o,v},d=i.root&&s(i.root);d&&(d.name="blidgeRoot",this.blidgeRoot&&this.entity&&this.entity.remove(this.blidgeRoot),this.blidgeRoot=d,this.entity&&this.entity.add(this.blidgeRoot)),this.entities.forEach(c=>{if(c.userData.updateTime!=o){const v=c.parent;v&&v.remove(c),c.dispose(),this.entities.delete(c.name)}}),this.entity&&this.blidgeRoot&&(ct.getInstance(We).applyProjectOverrides(this.blidgeRoot),this.emit("sceneCreated",[this.blidgeRoot]))}getAnimationState(){return{...this.animationState}}dispose(){super.dispose(),this.reloadTimerId!==null&&(clearTimeout(this.reloadTimerId),this.reloadTimerId=null),this.saveSceneTimerId!==null&&(clearTimeout(this.saveSceneTimerId),this.saveSceneTimerId=null),this.connectionTimeoutId!==null&&(clearTimeout(this.connectionTimeoutId),this.connectionTimeoutId=null),this.blidgeRoot&&(this.blidgeRoot.disposeRecursive(),this.entity.remove(this.blidgeRoot),this.blidgeRoot=null)}}const hP=`// @shader-file: src/resources/Components/Camera/MainCamera/PostProcess/shaders/gaussBlur.fs
// https://qiita.com/aa_debdeb/items/26ab808de6745611df53

in vec2 vUv;

uniform sampler2D uBackBuffer0;
uniform vec2 uPPResolution;
uniform bool uIsVertical;
uniform float uBlurRange;

#ifdef USE_BACKBLURTEX
  uniform sampler2D uBackBlurTex;
#endif

layout (location = 0) out vec4 outColor;

// Gaussianブラーの重み
uniform float uWeights[GAUSS_WEIGHTS];

vec3 blur( sampler2D tex ) {
  
  vec2 coord = vec2(gl_FragCoord.xy);
  vec3 sum = uWeights[0] * texture(tex, vUv).rgb;
  
  for (int i = 1; i < GAUSS_WEIGHTS; i++) {
    vec2 offset = (uIsVertical ? vec2(0, i) : vec2(i, 0)) * uBlurRange;
    sum += uWeights[i] * texture(tex, vUv + offset / uPPResolution).rgb;
    sum += uWeights[i] * texture(tex, vUv - offset / uPPResolution).rgb;
  }

  return sum;
  
}

void main(void) {
  
  vec3 sum = vec3( 0.0 );

  #ifdef USE_BACKBLURTEX
    sum = blur(uBackBlurTex);
  #else
    sum = blur(uBackBuffer0);
  #endif
  
  outColor = vec4(sum, 1.0);
  
}`,pP=`// @shader-file: src/resources/Components/Camera/MainCamera/PostProcess/Bloom/shaders/bloomBright.fs
uniform sampler2D uSrcTexture1;
uniform float uThreshold;
uniform float uBrightness;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 c = texture( uSrcTexture1, vUv );
  
	vec3 f;
	f = max( c.xyz - uThreshold, vec3( 0.0 ) ) / 10.0 * uBrightness;
	outColor = vec4( f, 1.0 );
	
}`,vP=`// @shader-file: src/resources/Components/Camera/MainCamera/PostProcess/Bloom/shaders/bloomComposite.fs
#include <common>

uniform sampler2D uBackBuffer0;
uniform sampler2D uBloomTexture[4];

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec3 col = texture( uBackBuffer0, vUv ).xyz;

	#pragma loop_start 4
		col += texture( uBloomTexture[ LOOP_INDEX ], vUv ).xyz * pow( (float(LOOP_INDEX) + 1.0) / 4.0, 1.0 ) * 1.0;
	#pragma loop_end
	
	outColor = vec4( col, 1.0 );

}`;class gP extends Br{constructor(l){const{pipeline:i,args:o}=l;let s=o&&o.srcTexture;if(!s){const C=i.entity.getComponent(Lu);if(s=C&&C.renderTarget.shadingBuffer.textures[0]||void 0,!s)throw new Error("Bloom requires RenderCamera component or srcTexture argument")}const d=4,c=[],v=[];for(let C=0;C<d;C++)c.push(new Et(We).setTexture([new rt(We).setting({magFilter:We.LINEAR,minFilter:We.LINEAR})])),v.push(new Et(We).setTexture([new rt(We).setting({magFilter:We.LINEAR,minFilter:We.LINEAR})]));let h=2;const p=new yt(We,{name:"bloom/bright/",frag:pP,passThrough:!0,uniforms:{uSrcTexture1:{value:s,type:"1i"},uThreshold:{value:1,type:"1f"},uBrightness:{value:1,type:"1f"}},resolutionRatio:1/h}),_=[];let S=p.renderTarget.textures;for(let C=0;C<d;C++){const D=c[C],F=v[C],q=8,$={name:"bloom/blur/"+C+"/v",renderTarget:D,frag:hP,uniforms:{uBackBlurTex:{value:S,type:"1i"},uIsVertical:{type:"1i",value:!0},uWeights:{type:"1fv",value:Ur.gaussWeights(q)},uBlurRange:{value:2,type:"1f"}},defines:{GAUSS_WEIGHTS:q.toString(),USE_BACKBLURTEX:""},passThrough:!0,resolutionRatio:1/h};_.push(new yt(We,$)),_.push(new yt(We,{...$,name:"bloom/blur/"+C+"/h",renderTarget:F,uniforms:{...$.uniforms,uBackBlurTex:{value:D.textures[0],type:"1i"},uIsVertical:{type:"1i",value:!1}}})),S=F.textures,h*=2}const T=new yt(We,{name:"bloom/composite/",frag:vP,uniforms:{uBloomTexture:{value:v.map(C=>C.textures[0]),type:"1iv"}}});super({name:"Bloom",passes:[p,..._,T]})}get threshold(){return this.passes[0].uniforms.uThreshold.value}set threshold(l){this.passes[0].uniforms.uThreshold.value=l}get brightness(){return this.passes[0].uniforms.uBrightness.value}set brightness(l){this.passes[0].uniforms.uBrightness.value=l}}const yP=`// @shader-file: src/resources/Components/Camera/MainCamera/shaders/gaussBlur.fs
// https://qiita.com/aa_debdeb/items/26ab808de6745611df53

in vec2 vUv;

uniform sampler2D uBackBuffer0;
uniform vec2 uPPResolution;
uniform bool uIsVertical;
uniform float uBlurRange;

#ifdef USE_BACKBLURTEX
  uniform sampler2D uBackBlurTex;
#endif

layout (location = 0) out vec4 outColor;

// Gaussianブラーの重み
uniform float uWeights[GAUSS_WEIGHTS];

vec3 blur( sampler2D tex ) {
  
  vec2 coord = vec2(gl_FragCoord.xy);
  vec3 sum = uWeights[0] * texture(tex, vUv).rgb;
  
  for (int i = 1; i < GAUSS_WEIGHTS; i++) {
    vec2 offset = (uIsVertical ? vec2(0, i) : vec2(i, 0)) * uBlurRange;
    sum += uWeights[i] * texture(tex, vUv + offset / uPPResolution).rgb;
    sum += uWeights[i] * texture(tex, vUv - offset / uPPResolution).rgb;
  }

  return sum;
  
}

void main(void) {
  
  vec3 sum = vec3( 0.0 );

  #ifdef USE_BACKBLURTEX
    sum = blur(uBackBlurTex);
  #else
    sum = blur(uBackBuffer0);
  #endif
  
  outColor = vec4(sum, 1.0);
  
}`;class xP extends Br{constructor(i){const s={name:"bokeh/v",frag:yP,uniforms:{uIsVertical:{type:"1i",value:!0},uWeights:{type:"1fv",value:Ur.gaussWeights(8)},uBlurRange:{value:6,type:"1f"}},defines:{GAUSS_WEIGHTS:"8"},resolutionRatio:1},d=new yt(We,s),c=new yt(We,{...s,name:"bokeh/h",uniforms:{...s.uniforms,uIsVertical:{type:"1i",value:!1}}});super({name:"Bokeh",passes:[d,c]});y(this,"bokehV");y(this,"bokehH");this.bokehV=d,this.bokehH=c,this.enabled=!0}}const bP=`// @shader-file: src/resources/Components/Camera/MainCamera/PostProcess/ColorGrading/shaders/colorGrading.fs
#include <common>\r
\r
uniform sampler2D uBackBuffer0;\r
\r
in vec2 vUv;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
float grayScale( vec3 color ) {\r
	float gray = dot( color, vec3( 0.299, 0.587, 0.114 ) );\r
	return gray;\r
}\r
\r
vec3 contrast( vec3 color, float contrast ) {\r
	return ( color - 0.5 ) * contrast + 0.5;\r
}\r
\r
void main( void ) {\r
\r
	vec3 col = texture( uBackBuffer0, vUv ).xyz;\r
\r
	// float gs = grayScale( col.xyz );\r
	// col.xyz = mix( col.xyz, vec3( gs ), 0.8 );\r
	// col.xyz = contrast( col.xyz + 0.1, 1.4 );\r
	\r
	outColor = vec4( col, 1.0 );\r
\r
}`;class _P extends Br{constructor(l){super({name:"ColorGrading",passes:[new yt(We,{name:"colorGrading",frag:bP})]})}}const wP=`// @shader-file: src/resources/Components/Camera/MainCamera/PostProcess/Finalize/shaders/finalize.fs
#include <common>\r
#include <random>\r
#include <noise_simplex>\r
\r
uniform float uTimeEF;\r
uniform sampler2D uBackBuffer0;\r
uniform vec4 uPP;\r
\r
in vec2 vUv;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
vec2 lens_distortion(vec2 r, float alpha) {\r
    return r * (1.0 - alpha * dot(r, r));\r
}\r
\r
void main( void ) {\r
	vec3 col = vec3( 0.0, 0.0, 0.0 );\r
	vec2 uv = vUv;\r
	vec2 cuv = uv - 0.5;\r
	float w = 0.09 * smoothstep( 0.40, 0.55, length( cuv ) );\r
\r
	float d;\r
	float s = 0.98; \r
\r
	#pragma loop_start 8\r
		d = -float( LOOP_INDEX ) / 8.0 * w;\r
        col.x += texture( uBackBuffer0, lens_distortion( cuv * s, d * 0.0 ) + 0.5 + vec2( (float( LOOP_INDEX ) / 8.0 - 0.5 ) * 0.002, 0.0 ) ).x;\r
        col.y += texture( uBackBuffer0, lens_distortion( cuv * s, d * 3.0 ) + 0.5 ).y;\r
        col.z += texture( uBackBuffer0, lens_distortion( cuv * s, d * 6.0 ) + 0.5 ).z;\r
	#pragma loop_end\r
	col.xyz /= 8.0;\r
\r
	float len = length(cuv);\r
	col *= smoothstep( 1.2, 0.3, len );\r
\r
	col.xyz += random( vUv + floor(uTimeEF * 18.0 ) * 0.5 ) * 0.02;\r
\r
	col.xyz *= uPP.x;\r
	\r
	outColor = vec4( col, 1.0 );\r
\r
}`;class SP extends Br{constructor(l){const{pipeline:i}=l,o=i.entity.getComponent(li),s=Ce.merge(ie.time);o&&o.bindUniforms(s),super({name:"Finalize",passes:[new yt(We,{name:"finalize",frag:wP,uniforms:s})]})}}const EP=`// @shader-file: src/resources/Components/Camera/MainCamera/PostProcess/FXAA/shaders/fxaa.fs
uniform sampler2D uBackBuffer0;\r
uniform vec2 uPPPixelSize;\r
\r
in vec2 vUv;\r
\r
layout ( location = 0 ) out vec4 outColor;\r
\r
// source: https://github.com/unity3d-jp/NVIDIAHairWorksIntegration/blob/master/HairWorksIntegration/Assets/Standard%20Assets/Effects/ImageEffects/Shaders/_Antialiasing/FXAA2.shader\r
\r
vec4 texOffset( sampler2D tex, vec2 uv, vec2 offsetPixel, vec2 resolutionInv ) {\r
\r
	return texture( tex, uv + offsetPixel * resolutionInv );\r
\r
}\r
\r
#define FXAA_REDUCE_MIN   ( 1.0 / 128.0 )\r
#define FXAA_REDUCE_MUL   ( 1.0 / 16.0 )\r
#define FXAA_SPAN_MAX    8.0\r
\r
void main( void ) {\r
\r
	/*--------------------------------------------------------------------------*/\r
\r
    vec3 rgbNW = texOffset( uBackBuffer0, vUv, vec2( -1.0, 1.0 ), uPPPixelSize ).xyz;\r
    vec3 rgbNE = texOffset( uBackBuffer0, vUv, vec2( 1.0, 1.0 ), uPPPixelSize ).xyz;\r
    vec3 rgbSW = texOffset( uBackBuffer0, vUv, vec2( -1.0, -1.0 ), uPPPixelSize ).xyz;\r
    vec3 rgbSE = texOffset( uBackBuffer0, vUv, vec2( 1.0, -1.0 ), uPPPixelSize ).xyz;\r
    vec3 rgbM  = texture( uBackBuffer0, vUv ).xyz;\r
	\r
	/*--------------------------------------------------------------------------*/\r
\r
    vec3 luma = vec3( 0.299, 0.587, 0.114 );\r
\r
    float lumaNW = dot( rgbNW, luma );\r
    float lumaNE = dot( rgbNE, luma );\r
    float lumaSW = dot( rgbSW, luma );\r
    float lumaSE = dot( rgbSE, luma );\r
    float lumaM  = dot( rgbM,  luma );\r
\r
	/*--------------------------------------------------------------------------*/\r
\r
    float lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );\r
    float lumaMax = max( lumaM, max( max( lumaNW, lumaNE ), max( lumaSW, lumaSE ) ) );\r
\r
	/*--------------------------------------------------------------------------*/\r
\r
    vec2 dir; \r
    dir.x = -( ( lumaNW + lumaNE ) - ( lumaSW + lumaSE ) );\r
    dir.y =  ( ( lumaNW + lumaSW ) - ( lumaNE + lumaSE ) );\r
\r
	/*--------------------------------------------------------------------------*/\r
\r
    float dirReduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * ( 0.25 * FXAA_REDUCE_MUL ), FXAA_REDUCE_MIN );\r
    float rcpDirMin = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + dirReduce );\r
    dir = min( vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX ), max( vec2( -FXAA_SPAN_MAX, -FXAA_SPAN_MAX ), dir * rcpDirMin ) ) * uPPPixelSize.xy;\r
\r
	/*--------------------------------------------------------------------------*/\r
	\r
    vec3 rgbA = ( 1.0 / 2.0 ) * ( \r
        texture( uBackBuffer0, vUv + dir * ( 1.0 / 3.0 - 0.5 ) ).xyz +\r
        texture( uBackBuffer0, vUv + dir * ( 2.0 / 3.0 - 0.5 ) ).xyz\r
    );\r
\r
    vec3 rgbB = rgbA * 0.5  + 0.25  * ( \r
        texture( uBackBuffer0, vUv + dir * -0.5 ).xyz +\r
        texture( uBackBuffer0, vUv + dir *  0.5 ).xyz \r
    );\r
		\r
    float lumaB = dot( rgbB, luma );\r
\r
    if( ( lumaB < lumaMin ) || ( lumaB > lumaMax ) ) {\r
\r
		outColor = vec4( rgbA, 1.0 );\r
\r
	} else {\r
\r
		outColor = vec4( rgbB, 1.0 );\r
\r
	};\r
\r
    // outColor = vec4( 0.0 );\r
\r
}`;class CP extends Br{constructor(l){super({name:"FXAA",passes:[new yt(We,{name:"fxaa",frag:EP})]})}}const Xb=new Tn;new Promise(m=>{Xb.once("createdCamera",l=>{m(l)})});class TP extends Te{constructor(i){super(i);y(this,"renderCamera");y(this,"_commonUniforms");y(this,"_renderTarget");y(this,"_lookAt");y(this,"_orbitControls");y(this,"postProcessPipeline");y(this,"_resolution");y(this,"_resolutionInv");y(this,"_tmpVector1");y(this,"_tmpVector2");y(this,"_dofTarget");y(this,"_bokeh");this._resolution=new Q,this._resolutionInv=new Q,this._commonUniforms=Ce.merge({uResolution:{type:"2f",value:this._resolution},uResolutionInv:{type:"2f",value:this._resolutionInv}}),this.renderCamera=this.entity.addComponent(Lu,{gl:We}),this._renderTarget=this.renderCamera.renderTarget,this._lookAt=this.entity.addComponent(gf),Xb.emit("createdCamera",[this.renderCamera]),this.postProcessPipeline=this.entity.addComponent(Ob),this.postProcessPipeline.add(CP);const o=this.postProcessPipeline.add(gP,{srcTexture:this.renderCamera.renderTarget.shadingBuffer.textures[0]});o.threshold=1,o.brightness=1,this.postProcessPipeline.add(_P),this._bokeh=this.postProcessPipeline.add(xP),this.postProcessPipeline.add(SP),this._dofTarget=null,this._tmpVector1=new Q,this._tmpVector2=new Q;const s=p=>{const _=p.findEntityByName("Camera")||null,S=_==null?void 0:_.getComponent(li),T=this.entity.getComponent(li);S&&T&&(S.transformAutoUpdate=T.transformAutoUpdate);const C=p.findEntityByName("CamLook")||null;this._lookAt.setTarget(C),this._dofTarget=p.findEntityByName("CamDof")||null},d=ct.getInstance(We),c=d.root.getComponent(qb);c&&(c.on("sceneCreated",s),this.once("dispose",()=>{c.off("sceneCreated",s)})),d.setCamera(this.entity);{this._orbitControls=this.entity.addComponent(Yb),this._orbitControls.setElm(Ds),this._orbitControls.enabled=!1;const p=D=>{this._orbitControls&&(this._orbitControls.enabled=D);const F=this._entity.getComponent(li),q=this._entity.getComponent(gf);F&&(F.transformAutoUpdate=!D),q&&(q.enabled=!D)},_=D=>{if(this._orbitControls&&this._orbitControls.enabled)return;D.target.setPointerCapture(D.pointerId),p(!0)},S=()=>{this._orbitControls&&this._orbitControls.enabled||p(!0)},T=D=>{D.key==="Escape"&&p(!1)};Ds.addEventListener("pointerdown",_),Ds.addEventListener("wheel",S),window.addEventListener("keydown",T);const C=()=>{Ds.removeEventListener("pointerdown",_),Ds.removeEventListener("wheel",S),window.removeEventListener("keydown",T)};this.once("dispose",C)}ie.gBuffer.uGBufferPos.value=this.renderCamera.gBuffer.textures[0],ie.gBuffer.uGBufferNormal.value=this.renderCamera.gBuffer.textures[1];const v=this.entity.getRootEntity(),h=v.findEntityByName("CamLook")||null;this._lookAt.setTarget(h),this._dofTarget=v.findEntityByName("CamDof")||null}updateImpl(i){this.resize(i.resolution),this.updateCameraParams(),this.entity.matrixWorld.decompose(this._tmpVector1),this._dofTarget&&this._dofTarget.matrixWorld.decompose(this._tmpVector2),this.renderCamera.dofParams.focusDistance=this._tmpVector1.sub(this._tmpVector2).length();const o=this.entity.getComponent(li);if(o){const s=o.uniforms.uPP;if(s){const d=s.value.y;this._bokeh.bokehV.uniforms.uBlurRange.value=d,this._bokeh.bokehH.uniforms.uBlurRange.value=d}}}resize(i){i.x==this._resolution.x&&i.y==this._resolution.y||(this._resolution.copy(i),this._resolutionInv.set(1/i.x,1/i.y,0,0),this.renderCamera.resize(this._resolution),this.postProcessPipeline.resize(i),this.updateCameraParams())}updateCameraParams(){this.renderCamera.aspect=this._resolution.x/this._resolution.y,this.renderCamera.near=.5,this.renderCamera.far=3e3,this.renderCamera.needsUpdateProjectionMatrix=!0;const i=this.entity.getComponent(li);if(i){const o=i.animations.get("state");o&&(this.renderCamera.fov=2*Math.atan(12/(2*o.value.x))/Math.PI*180,this._lookAt.enabled=o.value.y>.5)}}}const kP=`// @shader-file: src/resources/Components/Demo4/Common/DebaBouChou/shaders/debaBouChou.fs
#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <random>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

uniform float uTimeE;
uniform sampler2D uNoiseTex;

SDFResult D( vec3 p ) {

	vec3 knifeP = p;
	knifeP.y -= 0.6;

	vec2 d = vec2( 100.0, 1.0 ); // マテリアルID: 1=刃

	// 刃の部分
	vec3 pp = knifeP;
	pp.yz *= rotate( HPI );
	pp.xyz *= 0.7;
	pp.z += - 0.13;
	pp.z *= 0.1 + length(pp.z * 0.5);
	pp.x -= pow(pp.z, 3.0) * 0.3;
	
	vec3 pp1 = pp + vec3( -0.4, 0.0, 0.0 );
	vec3 pp2 = pp + vec3( 0.4, 0.0, 0.0 );

	float h = 0.01 * linearstep( 0.09, 0.02, length( max( vec2( 0.0 ), pp.xz ) * vec2( 1.0, 0.3 ) ) );
	
	float cylinder1 = sdCappedCylinder( pp1, 0.5, h );
	float cylinder2 = sdCappedCylinder( pp2, 0.5, h );

	d.x = opAnd( cylinder1, cylinder2 );
	d.x = opAnd( d.x, sdBox( pp + vec3( 0.0, 0.0, 0.49 ), vec3( 0.5 ) ) );

	d.x = opSmoothSub( sdBox( pp + vec3( -0.08, 0.0, -0.10 ), vec3( 0.1 ) ), d.x, 0.0 );

	// 柄（持ち手）の部分
	pp = knifeP;
	pp.x += 0.03;
	pp.y += 0.6;
	pp.x += 0.05;
	d = opAdd( d, vec2( sdCappedCylinder( pp, 0.08 - pp.y * 0.02, 0.30 ), 2.0 ) );

	return SDFResult(
		d.x,
		p,
		d.y,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>



	#include <rm_loop,128,0.001,1.0>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	// ノイズテクスチャを取得
	vec2 noiseUV = rayPos.xy * 0.5 + 0.5;
	vec4 n1 = texture( uNoiseTex, noiseUV );
	vec4 n2 = texture( uNoiseTex, noiseUV * 4.0 );
	vec4 n3 = texture( uNoiseTex, noiseUV * 1.0 + n1.xy );

	// マテリアルIDに応じた色とラフネスを設定
	float matId = dist.mat;

	// デフォルト
	vec3 col = vec3( 1.0 );
	float rough = 0.5;
	float metal = 0.0;

	// 1: 刃
	if( matId == 1.0 ) {
		col = vec3( 0.9, 0.92, 0.95 ); // 銀色
		rough = 0.01;
		metal = 1.0;
	}
	// 2: 柄
	else if( matId == 2.0 ) {
		col = vec3( 1.0, 0.7, 0.45 ); // 暗い木目色
		rough = 1.0;
		metal = 0.0;
	}

	outNormal = normalize( outNormal + n3.xyz * 0.15 );
	outColor.xyz = col;
	outRoughness = rough;
	outMetalic = metal;

	#include <frag_out>


}
`;class NP extends Te{constructor(i){super(i);y(this,"mesh");const o=new _r({height:2,depth:.2,width:.4}),s=new nt().setFromTransform(new Q(0,.6,0));o.applyMatrix(s);const d=new He({frag:Se("debaBouChouFrag",kP),uniforms:Ce.merge(ie.resolution,ie.time,ie.noiseTex)});this.mesh=this.entity.addComponent(me,{geometry:o,material:d})}disposeImpl(){this._entity.removeComponent(me)}}const RP=`// @shader-file: src/resources/Components/Demo4/Common/HUD/shaders/hud.fs
#include <common>
#include <packing>
#include <frag_h>
#include <rotate>
#include <sdf>

// uTime is available from <common>
uniform float uTimeE;
uniform vec4 uState;

void main( void ) {

	#include <frag_in>

	// 六角形グリッド (魚のウロコ柄) - 参考: https://www.shadertoy.com/view/4dKXz3
	const float SQRT3 = 1.73;
	const mat2 hexToCartesian = mat2(1, 0.5, 0, SQRT3/2.0);

	vec2 cuv = vUv - 0.5;

	float aspect = uResolution.x / uResolution.y;

	// アスペクト比補正、abs、回転を一度に適用
	vec2 uv = abs(cuv);
	uv.y /= aspect;
	uv *= rotate(HPI * 0.8);
	uv.y += uTimeE * 0.01 * sign(cuv.y); // スクロール

	// 六角形座標系への変換
	uv *= 18.0 * SQRT3 / 2.0;
	vec2 U = uv * mat2(1, -1.0/SQRT3, 0, 2.0/SQRT3);
	vec3 g = fract(vec3(U, 1.0 - U.x - U.y));
	vec3 id = floor(vec3(U, 1.0 - U.x - U.y));

	if (length(g) > 1.0) g = 1.0 - g; // 重心座標

	U = id.xy * hexToCartesian;

	// 最近傍ノード探索（使用する距離のみ計算）
	float l10 = length(U + vec2(1, 0) - uv);
	float l01 = length(U + vec2(0.5, SQRT3/2.0) - uv);
	float l11 = length(U + vec2(1.5, SQRT3/2.0) - uv);
	float l20 = length(U + vec2(2, 0) - uv);

	// ウロコ模様のセル選択
	id += l20 < 1.0 ? vec3(2, 0, 0) : l11 < 1.0 ? vec3(1, 1, 0) : l10 < 1.0 ? vec3(1, 0, 0) : l01 < 1.0 ? vec3(0, 1, 0) : vec3(0);
	vec2 C = id.xy * hexToCartesian;

	// グリッドパターン
	float dist = length(C - uv);
	float w = sin(dist * PI * 10.0 - sin(uTimeE * 0.3 + length(C.x) * 2.0) * 10.0);
	w *= smoothstep(3.6, 8.0, C.x) * 0.5;

	vec2 dotUv = cuv;
	dotUv.x *= aspect;
	dotUv.y = abs(dotUv.y);
	dotUv.x = abs(dotUv.x);
	float dots = 0.0;
	dots += smoothstep( 0.009, 0.007, length( dotUv + vec2( 0.0, -0.44 ) ) );
	dots += smoothstep( 0.009, 0.007, length( dotUv + vec2( -0.05, -0.44 ) ) );
	dots += smoothstep( 0.009, 0.007, length( dotUv + vec2( -1.08, -0.0 ) ) );
	dots += smoothstep( 0.009, 0.007, length( dotUv + vec2( -1.08, -0.05 ) ) );
	// dots += smoothstep( 0.2, 0.17, length( dotUv + vec2( -1.10, -0.0 ) ) ) * 0.2;

	w += dots * 0.4;

	w = max( w, smoothstep( 0.004, 0.002, abs( sdBox( dotUv, vec2( 1.1, 0.46 ) ) - 0.02 )  ) * 0.3 );

	w *= uState.x;

	outColor = vec4(1.0, 1.0, 1.0, w);
	
	#include <frag_out>

}`,DP=`// @shader-file: src/resources/Components/Demo4/Common/HUD/shaders/hud.vs
#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>
	#include <vert_out>
	gl_Position = vec4( position.xy, 0.0, 1.0 );

}
`;function hn(m,l){const i=m.getComponent(li);if(!i)return;let o;l instanceof me?o=l.material.uniforms:l instanceof He?o=l.uniforms:o=l,i.bindUniforms(o)}class MP extends Te{constructor(i){super(i);y(this,"material");const o=new ro({width:2,height:2});this.material=new He({phase:["ui"],vert:Se("hudVert",DP),frag:Se("hudFrag",RP),depthTest:!1,depthWrite:!1,uniforms:Ce.merge(ie.time,ie.resolution)}),this.entity.addComponent(me,{geometry:o,material:this.material}),hn(this.entity,this.material)}}const PP=`// @shader-file: src/resources/Components/Demo4/Common/MizuBall/shaders/mizuBall.fs
#include <common>
#include <frag_h>
#include <rotate>
#include <light>
#include <pmrem>
#include <noise_cyclic>

uniform sampler2D uEnvMap;

void main( void ) {

	#include <frag_in>

	// ジオメトリからの法線を使用
	vec3 normal = normalize( vNormal );
	outNormal = normal;

	outRoughness = 0.1;
	outMetalic = 0.0;
	outColor.xyz = vec3( 0.0 );

	#ifdef IS_FORWARD

		#include <lighting_forwardIn>

		vec2 uv = gl_FragCoord.xy / uResolution;

		// フレネル効果
		float dnv = dot( geo.normal, geo.viewDir );
		float ef = fresnel( dnv );

		// ビュー空間の法線を使用
		vec3 viewNormal = normalize( vViewNormal );

		// 屈折効果によるシーンテクスチャのサンプリング
		float nf = 1.0;

		for( int i = 0; i < 16; i++ ) {

			// 法線に基づいて屈折オフセットを計算
			vec2 v = -( viewNormal.xy ) * ( float( i + 1 ) / 4.0 * 0.015 + 0.05 );
			outColor.x += nf * texture( uDeferredTexture, uv + v * 1.0 ).x;
			outColor.y += nf * texture( uDeferredTexture, uv + v * 1.3 ).y;
			outColor.z += nf * texture( uDeferredTexture, uv + v * 1.6 ).z;

		}

		outColor.xyz /= 16.0;

		// 水の色味を加える（青緑系）
		outColor.xyz *= vec3( 0.95, 0.95, 1.0 );
		outColor.w = 1.0;

		// フレネル効果でハイライト追加
		outColor.xyz += ef * 2.0;

		#include <lighting_light>
		#include <lighting_env>

	#endif

	#include <frag_out>

}
`;class zP extends Te{constructor(l){super(l);const i=new ir({radius:1,widthSegments:16,heightSegments:16}),o=new He({frag:Se("mizuBallFrag",PP),phase:["forward"],uniforms:Ce.merge(ie.resolution,ie.time)});this.entity.addComponent(me,{geometry:i,material:o})}}const AP=`// @shader-file: src/resources/Components/Demo4/Maguro/Sashimi/shaders/sashimi.fs
#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

// グローバルテクスチャユニフォーム
uniform sampler2D uNoiseTex;
uniform sampler2D uNoiseCyclicTex;

uniform float uTimeE;
uniform float uEmission;

// 刺身のSDF定義
SDFResult D( vec3 p ) {

	vec3 sashimiP = p;
	sashimiP.y -= 0.2;

	vec3 pp = sashimiP;
	pp.yz *= rotate( smoothstep( 0.0, 0.8, abs(pp.z) ) * sign( pp.z ) * 0.3);
	pp.xy *= rotate( -smoothstep( 0.0, 0.3, abs(pp.x) ) * sign( pp.x ) * 0.4);

	vec2 d = vec2( 9999999.0, 1.0 );

	#if defined( TAKO )

		// タコ

		vec4 n = texture( uNoiseTex, p.xz * 0.1 - vec2( 0.1, 0.3 ) );
		vec4 n2 = texture( uNoiseTex, p.xz * 0.1 - vec2( 0.1, 0.3 ) + n.xy * 3.0 );
		pp.y += n2.x * 0.02;
		
		vec3 takoSize = vec3( 0.25, 0.02, 0.4 );
		pp.x *= 1.2 + sin( -HPI + pp.z * 4.0 ) * 0.4;
		pp.y -= (texture( uNoiseTex, pp.xz * 0.1 - vec2( 0.1, 0.3 ) + vec2( 0.0, uTimeE * 0.01 ) ).x - 0.45) * smoothstep( 0.05, 0.2, abs( pp.x ) ) * 0.3;
		pp.x += sin( pp.z * 30.0 ) * 0.2 * smoothstep( 0.1, 1.0, abs( pp.x ) );
		d.x = sdBox( pp, takoSize );

	#else

		vec4 n = texture( uNoiseTex, p.xz * 0.1 - vec2( 0.1, 0.3 ) );
		vec4 n2 = texture( uNoiseTex, p.xz * 2.0 - vec2( 0.1, 0.3 ) );
		pp.y += n2.x * 0.02;

		// マグロ・サーモン（薄め）
		vec3 sashimiSize = vec3( 0.2, 0.01 + n.x * 0.08, 0.65 );
		d.x = sdBox( pp, sashimiSize );

		vec3 trimP = pp;
		trimP.xz += vec2( -0.0, 0.0);
		trimP.xz *= rotate( 0.3 );
		d.x = opAnd( sdBox(trimP, vec3( 1.0, 0.2, 0.4 )), d.x );

	#endif

	return SDFResult(
		d.x,
		p,
		d.y,
		vec4(pp, 0.0)
	);

}

#include <subsurface>
#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>



	// レイマーチングループ
	#include <rm_loop,64,0.001,0.7>

	if( !hit ) discard;

	vec4 n = texture( uNoiseTex,  rayPos.xz * 0.1 + 0.5 );
	vec4 n2 = texture( uNoiseTex,  rayPos.xz * 4.0 + 0.5 );

	float sss = subsurface( rayPos, normalize( vec3( 1.0, 1.0, 0.0 ) ), 0.15);

	outNormal = N( rayPos, 0.01 );
	outNormal = normalize( outNormal + (n2.y - 0.5) * 0.4 );

	#include <rm_out_obj>

	float dnv = dot( rayDir, -outNormal.xyz );

	vec3 sashimiColor = vec3( 1.0 );
	vec3 sashimiEmission = vec3( 0.0 );

	// 刺身のカラー（Defineで種類を切り替え）
	#if defined( SALMON )
		sashimiColor = vec3( 1.0, 0.4, 0.2 );  // サーモン：オレンジ
		sashimiEmission = vec3( 1.0, 0.4, 0.1 );
	#elif defined( TAKO )
		sashimiColor = vec3( 1.0, 0.95, 0.9 ); // タコ：白っぽい
		sashimiColor.xyz = mix( sashimiColor.xyz, vec3( 0.8, 0.0, 0.1 ), smoothstep( 0.16, 0.23, abs( dist.matparam.x ) )  );
		sashimiEmission = vec3( 1.0, 0.8, 0.7 );
	#else
		sashimiColor = vec3( 0.9, 0.15, 0.1 ); // マグロ：赤身
		sashimiEmission = vec3( 0.9, 0.1, 0.2 );
	#endif

	outColor.xyz = sashimiColor;
	outColor.xyz = mix( outColor.xyz, vec3( 1.0 ), smoothstep( 0.8, 1.0, fract(length( rayPos.xz + 0.5 + n.xy * 0.3 ) * 5.0 ) ) * n.y * 0.8 );

	outEmission.xyz += sashimiEmission * sss * 0.9 * smoothstep( 1.5, 0.0, dnv );
	outRoughness = 0.4;

	// グラデーション効果
	outColor.xyz *= smoothstep( 1.5, 0.4, length( rayPos ) );
	outRoughness = 0.2 + n2.y * 0.2;
	outMetalic = 0.3;
	outEmission *= 1.0 + uEmission * 3.0;
	outEmission += outColor.xyz * 0.2;

	#include <frag_out>


}
`;class $b extends Te{constructor(i){super(i);y(this,"sashimiType");y(this,"material");this.sashimiType="maguro",this.material=new He({frag:Se("sashimiFrag",AP),uniforms:Ce.merge(ie.resolution,ie.time,ie.tex,{uEmission:{value:0,type:"1f"}})}),this.field("sashimiType",()=>this.sashimiType,s=>{this.sashimiType=s;const d={};s==="salmon"?d.SALMON="":s==="ikura"?d.IKURA="":s==="tako"&&(d.TAKO=""),this.material.defines=d,this.material.requestUpdate()},{format:{type:"select",list:[{label:"マグロ",value:"maguro"},{label:"サーモン",value:"salmon"},{label:"いくら",value:"ikura"},{label:"タコ",value:"tako"}]}});const o=new _r({depth:1,width:.6,height:.3});o.applyMatrix(new nt().setFromTransform(new Q(0,.11,0))),this.entity.addComponent(me,{geometry:o,material:this.material})}set emission(i){this.material.uniforms.uEmission.value=i}}const OP=`// @shader-file: src/resources/Components/Demo4/Common/Shari/shaders/shari.fs
#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>

#include <rm_h>

// 頂点シェーダーから受け取るインスタンスID
in vec4 vId;
in vec4 vId2;
in mat4 vTransformMatrix;

// SDF関数：シャリの形状を定義
SDFResult D( vec3 p ) {

	vec3 pp = p;

	vec3 scale = vec3(0.25, 0.5, 0.22) * 2.0; // x:幅、y:長さ、z:厚み
	vec3 scaled = pp / scale;
	float sphere = sdSphere(scaled, 0.8) * min(min(scale.x, scale.y), scale.z);

	vec2 d = vec2(sphere, 0.0);

	return SDFResult(
		d.x,
		p,
		d.y,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	// vTransformMatrixの逆行列を計算してレイの座標をインスタンス空間に変換
	mat4 invMatrix = inverse(vTransformMatrix);
	vec3 localRayPos = (invMatrix * vec4(rayPos, 1.0)).xyz;
	vec3 localRayDir = normalize((invMatrix * vec4(rayDir, 0.0)).xyz);

	SDFResult dist;
	bool hit = false;

	// レイマーチングループ
	for( int i = 0; i < 64; i++ ) {

		dist = D( localRayPos );
		localRayPos += dist.d * localRayDir * 1.0;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	// 法線計算（ローカル空間）
	vec3 localNormal = N( localRayPos, 0.01 );

	// 法線をワールド空間に変換
	outNormal = normalize((transpose(invMatrix) * vec4(localNormal, 0.0)).xyz);

	// ワールド空間の位置を計算
	rayPos = (vTransformMatrix * vec4(localRayPos, 1.0)).xyz;

	#include <rm_out_obj>

	// シャリらしい見た目を設定
	// 白っぽいベースカラーにインスタンスごとの微妙なバリエーション
	outColor.xyz = vec3(1.0, 0.95, 0.9) * (0.9 + vId.y * 0.1);

	// ラフネス調整（少し光沢を持たせる）
	outRoughness = 0.3 + vId.z * 0.2;

	// メタリック値（非金属）
	outMetalic = 0.0;
	outEmission += 0.15;

	#include <frag_out>

}
`,FP=`// @shader-file: src/resources/Components/Demo4/Common/Shari/shaders/shari.vs
#include <common>
#include <vert_h>

// インスタンスごとのID属性（location = 4, 5）
layout(location = 4) in vec4 id;
layout(location = 5) in vec4 id2;

// ユーティリティ関数のインクルード
#include <rotate>
#include <matrix>

// グローバルユニフォーム
uniform float uTime;

// フラグメントシェーダーに渡す変数
out vec4 vId;
out vec4 vId2;
out mat4 vTransformMatrix;

void main( void ) {

	// 基本的な頂点処理
	#include <vert_in>

	vec3 instancePos = id2.xyz - 0.5;
	instancePos.xyz *= vec3( 0.225, 0.15, 0.55 );

	// 回転角度を計算
	float angleXY = id.y * TPI;
	float angleYZ = id.z * TPI;

	// マトリックス生成関数を使用してマトリックスを構築
	mat4 scaleMatrix = makeScale(0.1);
	mat4 rotXY = makeRotationXY(angleXY);
	mat4 rotYZ = makeRotationYZ(angleYZ);
	mat4 translateMatrix = makeTranslation(instancePos);

	// マトリックスを合成（スケール -> 回転 -> 平行移動の順）
	vTransformMatrix = translateMatrix * rotYZ * rotXY * scaleMatrix;

	// マトリックスを頂点位置に適用
	outPos = (vTransformMatrix * vec4(outPos * 1.8, 1.0)).xyz;

	// 法線には回転のみを適用（平行移動とスケールは法線に影響しない）
	mat3 normMat = normalMatrix(rotYZ * rotXY);
	outNormal = normMat * outNormal;

	// 標準的な頂点出力処理
	#include <vert_out>

	// インスタンスIDをフラグメントシェーダーに渡す
	vId = id;
	vId2 = id2;

}
`;class Kb extends Te{constructor(l){super(l);const i=256,o=new _r({}),s=Ur.randomSeed(1),d=[],c=[];for(let v=0;v<i;v++)d.push(v/i,s(),s(),s()),c.push(s(),s(),s(),s());o.setAttribute("id",new Float32Array(d),4,{instanceDivisor:1}),o.setAttribute("id2",new Float32Array(c),4,{instanceDivisor:1}),this._entity.addComponent(me,{geometry:o,material:new He({phase:["deferred","shadowMap"],vert:Se("shariVert",FP),frag:Se("shariFrag",OP),uniforms:Ce.merge(ie.time,ie.resolution)})})}}class Uu extends Te{constructor(i){super(i);y(this,"sashimiTypeValue","maguro");y(this,"emissionValue",0);y(this,"shariEntity");y(this,"sashimiEntity");y(this,"sashimiComponent");this.shariEntity=new Ct,this.shariEntity.name="Shari",this.shariEntity.addComponent(Kb),this.shariEntity.position.set(0,-0,0),this.entity.add(this.shariEntity),this.sashimiEntity=new Ct,this.sashimiEntity.name="Sashimi",this.sashimiEntity.position.set(0,0,0),this.entity.add(this.sashimiEntity),this.sashimiComponent=this.sashimiEntity.addComponent($b),this.field("sashimiType",()=>this.sashimiTypeValue,o=>{this.sashimiTypeValue=o,this.sashimiComponent.setField("sashimiType",o)},{format:{type:"select",list:[{label:"マグロ",value:"maguro"},{label:"サーモン",value:"salmon"},{label:"タコ",value:"tako"}]}}),this.sashimiComponent.setField("sashimiType",this.sashimiTypeValue)}set sashimiType(i){this.setField("sashimiType",i)}set emission(i){this.emissionValue=i,this.updateEmissionUniforms()}updateEmissionUniforms(){this.sashimiComponent&&(this.sashimiComponent.emission=this.emissionValue)}disposeImpl(){this.entity.remove(this.shariEntity),this.shariEntity.dispose(),this.entity.remove(this.sashimiEntity),this.sashimiEntity.dispose()}}const LP=`// @shader-file: src/resources/Components/Demo4/Common/ShaderMotionGraphics/shaders/ikuraBGScreen.fs
#include <common>\r
#include <packing>\r
#include <frag_h>\r
#include <noise_simplex>\r
\r
in vec2 vLayerIndex;\r
uniform float uTime;\r
uniform vec4 uState;\r
\r
uniform sampler2D uNoiseTex;\r
\r
void main( void ) {\r
\r
	#include <frag_in>\r
\r
	// UV座標を正規化\r
	vec2 uv = vUv;\r
	vec2 cuv = uv - 0.5;\r
	vec2 p = uv * 2.0 - 1.0;\r
\r
	vec4 noiseTex = texture( uNoiseTex, vUv );\r
\r
	float line = length( vec2( 1.0 - uv.x, uv.y ) );\r
\r
	float v = smoothstep(0.0, 1.0, - ((1.0 - vLayerIndex.y) * 0.5 + line * 0.5 ) * 0.3 + (uState.x) * 1.3 );\r
	v = easeOut(v, 2.5);\r
\r
	float noise1 = noiseSimplex( vec3( p * 1.5 - vLayerIndex.x * vec2(0.1, -0.1) + vec2( 0.85, -0.04 ), uTime * 0.098  ) ) * 0.5 + 0.5;\r
	float hole = noise1 - ( v - 1.0 );\r
\r
	if( hole > 0.5 - (1.0 - vLayerIndex.y) * 0.2 ) {\r
\r
		discard;\r
\r
	}\r
\r
\r
	vec3 color;\r
	color = mix( vec3( 0.0, 0.6, 0.0 ), vec3( 0.0, 0.3, 0.0 ), vLayerIndex.y);\r
	outColor = vec4( color, 1.0 );\r
	outRoughness = 0.3;\r
	outMetalic = 0.2;\r
	outEmission = color;\r
	outEnv = 0.0;\r
	outGradient = 1.0;\r
\r
	#include <frag_out>\r
\r
}\r
`,UP=`// @shader-file: src/resources/Components/Demo4/Common/ShaderMotionGraphics/shaders/maguroBGScreen.fs
#include <common>
#include <packing>
#include <frag_h>
#include <noise_simplex>

in vec2 vLayerIndex;
uniform float uTime;
uniform vec4 uState;

uniform sampler2D uNoiseTex;

void main( void ) {

	#include <frag_in>

	// UV座標を正規化
	vec2 uv = vUv;
	vec2 cuv = uv - 0.5;
	vec2 p = uv * 2.0 - 1.0;

	// 時間ベースのアニメーション
	float t = uTime * 0.2;

	// ノイズのフェッチ - レイヤーごとに異なるノイズパターン (整数値を使用)
	float noise1 = noiseSimplex( vec3( p * 2.5, vLayerIndex.x * 10.0 + t  ) ) * 0.5 + 0.5;

	vec4 noiseTex = texture( uNoiseTex, vUv );

	float hole = length( cuv );

	float line = length( vec2( 1.0 - uv.x, uv.y ) );

	float v = smoothstep(0.0, 1.0, - ((1.0 - vLayerIndex.y) * 0.5 + line * 0.5 ) * 0.3 + (uState.x) * 1.3 );
	v = easeBounce(v, 2.5);

	hole += noise1 * 0.1;
	hole -= (1.0 - v) * 0.5;

	if( hole < 0.15 + (1.0 - vLayerIndex.y) * 0.1 ) {

		discard;

	}

	// シンプルなマグロの赤身カラー - 正規化値で明るさを調整
	vec3 color;
	color = mix( vec3( 1.0, 0.0, 0.0 ), vec3(  0.5, 0.0, 0.0 ), vLayerIndex.y);
	outColor = vec4( color, 1.0 );
	outRoughness = 0.4;
	outMetalic = 0.3;
	outEmission = color;
	outEnv = 0.0;
	outGradient = 1.0;

	#include <frag_out>

}
`,BP=`// @shader-file: src/resources/Components/Demo4/Common/ShaderMotionGraphics/shaders/salmonBGScreen.fs
#include <common>
#include <packing>
#include <frag_h>
#include <noise_simplex>

in vec2 vLayerIndex;
uniform float uTime;
uniform vec4 uState;

uniform sampler2D uNoiseTex;

void main( void ) {

	#include <frag_in>

	// UV座標を正規化
	vec2 uv = vUv;
	vec2 cuv = uv - 0.5;
	vec2 p = uv * 2.0 - 1.0;

	// 時間ベースのアニメーション
	float t = uTime * 0.2;

	// ノイズのフェッチ - レイヤーごとに異なるノイズパターン (整数値を使用)
	float noise1 = noiseSimplex( vec3( p * 2.0 + uTime * 0.4, vLayerIndex.x * 10.0 + t  ) ) * 0.5 + 0.5;

	vec4 noiseTex = texture( uNoiseTex, vUv );

	float hole = length( (-cuv.x * 0.5 + cuv.y) );

	float line = length( vec2( 1.0 - uv.x, uv.y ) );

	float v = smoothstep(0.0, 1.0, - (vLayerIndex.y * 0.5 + line * 0.5 ) * 0.3 + (uState.x) * 1.3 );
	v = easeBounce(v, 2.5);

	hole += noise1 * 0.1;
	hole -= (1.0 - v) * 0.3;

	float hide = max(0.0, uState.x - 1.0);


	if( hole < 0.15 + (1.0 - vLayerIndex.y ) * 0.05 ) {

		discard;

	}

	if( cuv.y - cuv.x * 0.4 < -0.7 + hide * 1.0 + + noise1 * 0.3 ) {

		discard;
		
	}

	// シンプルなマグロの赤身カラー - 正規化値で明るさを調整
	vec3 color;
	color = mix( vec3( 0.0, 0.7, 1.0 ), vec3(  0.0, 0.3, 1.0 ), vLayerIndex.y);
	outColor = vec4( color, 1.0 );
	outRoughness = 0.4;
	outMetalic = 0.3;
	outEmission = color;
	outEnv = 0.0;
	outGradient = 1.0;

	#include <frag_out>

}
`,VP=`// @shader-file: src/resources/Components/Demo4/Common/ShaderMotionGraphics/shaders/takoBGScreen.fs
#include <common>
#include <packing>
#include <frag_h>
#include <noise_simplex>

in vec2 vLayerIndex;
uniform float uTime;
uniform vec4 uState;

uniform sampler2D uNoiseTex;

void main( void ) {

	#include <frag_in>

	// UV座標を正規化
	vec2 uv = vUv;
	vec2 cuv = uv - 0.5;
	vec2 p = uv * 2.0 - 1.0;

	vec4 noiseTex = texture( uNoiseTex, vUv );

	float line = length( vec2( 1.0 - uv.x, uv.y ) );

	float v = smoothstep(0.0, 1.0, - ((1.0 - vLayerIndex.y) * 0.5 + line * 0.5 ) * 0.3 + (uState.x) * 1.3 );
	v = easeOut(v, 2.5);

	float noise1 = noiseSimplex( vec3( p * 1.5 - vLayerIndex.x * vec2(0.1, -0.1) + vec2( 0.85, -0.04 ), uTime * 0.098  ) ) * 0.5 + 0.5;
	float hole = noise1 - ( v - 1.0 );

	if( hole > 0.5 - (1.0 - vLayerIndex.y) * 0.2 ) {

		discard;

	}


	vec3 color;
	color = mix( vec3( 0.3, 0.3, 0.3 ), vec3( 0.0, 0.0, 0.0 ), vLayerIndex.y);
	outColor = vec4( color, 1.0 );
	outRoughness = 0.3;
	outMetalic = 0.2;
	outEmission = color;
	outEnv = 0.0;
	outGradient = 1.0;

	#include <frag_out>

}
`,IP=`// @shader-file: src/resources/Components/Demo4/Common/ShaderMotionGraphics/shaders/circle.fs
#include <common>
#include <packing>
#include <frag_h>
#include <rotate>

in vec2 vLayerIndex;
uniform float uTime;
uniform float uTimeOffset;
uniform vec4 uState;

void main( void ) {

	#include <frag_in>

	// タイムオフセットを適用
	float time = uTime * 0.2 + uTimeOffset;

	// UV座標を中心基準に変換
	vec2 uv = vUv;
	vec2 p = uv * 2.0 - 1.0;
	p.xy *= rotate( time * 20.0 + uTimeOffset * 10.0 );

	// 中心からの距離を計算
	float dist = length( p );

	// 中心からの角度を計算（円周上での位置を決定）
	float angle = atan( p.y, p.x );
	float normalizedAngle = ( angle + PI ) / ( 2.0 * PI );

	// 円周上での描画進行（0.0 ~ 1.0）
	float drawProgress = fract( time * 1.5 );
	float phase1 = linearstep( 0.15, 0.3, drawProgress );
	float phase2 = linearstep( 0.7, 0.85, drawProgress );

	// 描画されていない部分を破棄
	if( normalizedAngle > phase1 ) {
		discard;
	}

	if( 1.0 - normalizedAngle > 1.0 - phase2 ) {
		discard;
	}

	// 円のサイズ（レイヤーごとに変化）
	float radius = 0.7 + vLayerIndex.y * 0.1;

	// ボーダーの太さ
	float borderWidth = 0.1;

	// 円のボーダー（輪）を描画
	float outerEdge = smoothstep( radius - 0.01, radius + 0.01, dist );
	float innerEdge = smoothstep( radius - borderWidth - 0.01, radius - borderWidth + 0.01, dist );
	float circleBorder = innerEdge - outerEdge;

	// ボーダーの外側を破棄
	if( circleBorder < 0.1 ) {
		discard;
	}

	// 真っ白な色
	vec3 color = vec3( 1.0 );
	outEmission = vec3( 1.0 );

	#include <frag_out>

}
`,jP=`// @shader-file: src/resources/Components/Demo4/Common/ShaderMotionGraphics/shaders/cross.fs
#include <common>
#include <packing>
#include <frag_h>
#include <sdf>
#include <rotate>

in vec2 vLayerIndex;
uniform float uTime;
uniform float uTimeOffset;
uniform vec4 uState;

void main( void ) {

	#include <frag_in>

	vec2 p = vUv * 2.0 - 1.0;

	float t = uTime * 0.5 + uTimeOffset;

	p.xy *= rotate( (floor( t ) + exp( fract( t ) * -5.0 )) * HPI );

	float len = 0.5;
	float d = sdSegment( p, vec2( -len ), vec2( len ) );
	d = min( d, sdSegment( p, vec2( len, -len ), vec2( -len, len ) ) );

	float w = step( d, 0.15 );

	if( w < 0.5 ) {
		discard;
	}

	// 真っ白な色
	vec3 color = vec3( 1.0 );
	outEmission = vec3( 1.0 );
	#include <frag_out>


}
`,HP=`// @shader-file: src/resources/Components/Demo4/Common/ShaderMotionGraphics/shaders/border.fs
#include <common>
#include <packing>
#include <frag_h>

in vec2 vLayerIndex;
uniform float uTime;
uniform float uTimeOffset;
uniform vec4 uState;

void main( void ) {

	#include <frag_in>
	
	// UV座標
	vec2 uv = vUv;

	float t = uTime + uTimeOffset * 10.0;

	// 横スクロール（時間に応じて移動）
	float scrollSpeed = 0.3;
	uv.x += t * scrollSpeed;

	// ボーダーパターン（横線、レイヤーごとに密度が変化）
	float stripeFreq = 3.0 + vLayerIndex.y * 2.0;

	// 横方向の縞々パターン
	float stripes = fract( (uv.x + uv.y) * stripeFreq );
	float pattern = step( 0.5, stripes );

	pattern *= (sin( t * 100.0 ) * 0.5 + 0.5) * 0.3 + sin( t * 2.0 );

	// パターンの外側を破棄
	if( pattern < 0.5 ) {
		discard;
	}

	// 真っ白な色
	vec3 color = vec3( 1.0 );
	outEmission = vec3( 1.0 );
	#include <frag_out>

}
`,GP=`// @shader-file: src/resources/Components/Demo4/Common/ShaderMotionGraphics/shaders/dotGrid.fs
#include <common>
#include <packing>
#include <frag_h>

in vec2 vLayerIndex;
uniform float uTime;
uniform float uTimeOffset;
uniform sampler2D uNoiseTex;
uniform vec4 uState;

void main( void ) {

	#include <frag_in>

	// タイムオフセットを適用
	float time = uTime + uTimeOffset * 3.0;

	// UV座標
	vec2 uv = vUv;

	// グリッドの分割数（レイヤーごとに変化）
	float gridSize = 8.0 + vLayerIndex.y * 4.0;

	// グリッド座標を計算
	vec2 gridUV = fract( uv * gridSize );
	vec2 gridID = floor( uv * gridSize );
	vec2 gridCenter = gridUV * 2.0 - 1.0;

	// 各グリッドセルごとのノイズ値（ノイズテクスチャを使用）
	vec2 noiseUV = gridID * 0.1 + time * 0.05;
	vec4 noiseTex = texture( uNoiseTex, noiseUV );
	float noiseValue = noiseTex.r;

	// ノイズ値が閾値を超えたドットのみ表示
	float threshold = sin( time * 2.0 ) * 0.3 + 0.5;
	if( noiseValue < threshold ) {
		discard;
	}

	// 各グリッドセル内での中心からの距離
	float dist = length( gridCenter );

	// ドットの半径（レイヤーごとに変化）
	float dotRadius = 0.4 + vLayerIndex.y * 0.2;

	// ドットのエッジをスムーズに描画
	float dot = 1.0 - smoothstep( dotRadius - 0.05, dotRadius + 0.05, dist );


	if(dot < 0.5 ) {
		discard;
	}

	// 真っ白な色
	vec3 color = vec3( 1.0 );
	outEmission = vec3( 1.0 );
	#include <frag_out>

}
`,Uo=`// @shader-file: src/resources/Components/Demo4/Common/ShaderMotionGraphics/shaders/smg.vs
#include <common>
#include <vert_h>

layout(location = 4) in vec2 layerIndex;

uniform int uLayers;
uniform float uLayerSpacing;

out vec2 vLayerIndex;

void main( void ) {

	#include <vert_in>

	outPos.z += layerIndex.x * uLayerSpacing;

	vLayerIndex = layerIndex;

	#include <vert_out>

}
`;class Qb extends Te{constructor(i){super(i);y(this,"mesh");y(this,"shaderName");y(this,"layers");y(this,"layerSpacing");y(this,"timeOffset");y(this,"shaders");this.shaders=new Map([["ikuraBGScreen",{vert:Uo,frag:LP}],["maguroBGScreen",{vert:Uo,frag:UP}],["salmonBGScreen",{vert:Uo,frag:BP}],["takoBGScreen",{vert:Uo,frag:VP}],["circle",{vert:Uo,frag:IP}],["cross",{vert:Uo,frag:jP}],["border",{vert:Uo,frag:HP}],["dotGrid",{vert:Uo,frag:GP}]]),this.shaderName="ikuraBGScreen",this.layers=1,this.layerSpacing=.01,this.timeOffset=0,this.mesh=this._entity.addComponent(me),this.updateGeometry(),this.updateMaterial(),this.field("shaderName",()=>this.shaderName,o=>{this.shaderName=o,this.updateMaterial()},{format:{type:"select",list:[{label:"Ikura BG Screen",value:"ikuraBGScreen"},{label:"Maguro BG Screen",value:"maguroBGScreen"},{label:"Salmon BG Screen",value:"salmonBGScreen"},{label:"Tako BG Screen",value:"takoBGScreen"},{label:"Circle",value:"circle"},{label:"Cross",value:"cross"},{label:"Border",value:"border"},{label:"Dot Grid",value:"dotGrid"}]}}),this.field("layers",()=>this.layers,o=>{this.layers=Math.max(1,Math.floor(o)),this.updateGeometry(),this.updateMaterial()}),this.field("layerSpacing",()=>this.layerSpacing,o=>{this.layerSpacing=o,this.updateMaterial()}),this.field("timeOffset",()=>this.timeOffset,o=>{this.timeOffset=o,this.updateMaterial()})}updateGeometry(){const i=new ro({width:1,height:1,widthSegments:8,heightSegments:8});if(this.layers>1){const o=[];for(let s=0;s<this.layers;s++)o.push(s,s/(this.layers-1));i.setAttribute("layerIndex",new Float32Array(o),2,{instanceDivisor:1})}this.mesh.geometry=i}updateMaterial(){const i=this.shaders.get(this.shaderName);i&&(this.mesh.material=new He({phase:["deferred"],vert:Se("smgBasicVert",i.vert),frag:Se(`smg${this.shaderName.charAt(0).toUpperCase()+this.shaderName.slice(1)}Frag`,i.frag),uniforms:Ce.merge(ie.time,ie.resolution,ie.tex,{uLayers:{value:this.layers,type:"1i"},uLayerSpacing:{value:this.layerSpacing,type:"1f"},uTimeOffset:{value:this.timeOffset,type:"1f"}})}),hn(this.mesh.entity,this.mesh))}updateImpl(i){}}class WP extends Te{constructor(i){super(i);y(this,"count");y(this,"rangeX");y(this,"rangeY");y(this,"rangeZ");y(this,"randomSeed");y(this,"shaderType");y(this,"movementX");y(this,"movementY");y(this,"shapeEntities");y(this,"initialPositions");y(this,"timeOffsets");this.count=10,this.rangeX=10,this.rangeY=5,this.rangeZ=10,this.randomSeed=0,this.shaderType="random",this.movementX=0,this.movementY=0,this.shapeEntities=[],this.initialPositions=[],this.timeOffsets=[],this.field("count",()=>this.count,d=>{this.count=Math.max(1,Math.floor(d)),this.regenerateShapes()});const o=this.fieldDir("Position Range");o.field("rangeX",()=>this.rangeX,d=>{this.rangeX=d,this.regenerateShapes()}),o.field("rangeY",()=>this.rangeY,d=>{this.rangeY=d,this.regenerateShapes()}),o.field("rangeZ",()=>this.rangeZ,d=>{this.rangeZ=d,this.regenerateShapes()}),this.field("randomSeed",()=>this.randomSeed,d=>{this.randomSeed=d,this.regenerateShapes()}),this.field("shaderType",()=>this.shaderType,d=>{this.shaderType=d,this.regenerateShapes()},{format:{type:"select",list:[{label:"Random",value:"random"},{label:"Circle",value:"circle"},{label:"Cross",value:"cross"},{label:"Border",value:"border"},{label:"Dot Grid",value:"dotGrid"}]}});const s=this.fieldDir("Movement");s.field("movementX",()=>this.movementX,d=>{this.movementX=d}),s.field("movementY",()=>this.movementY,d=>{this.movementY=d}),this.regenerateShapes()}getRandomShaderType(i){const o=["circle","cross","border","dotGrid"],s=Math.floor(i()*o.length);return o[s]}regenerateShapes(){for(let o=0;o<this.shapeEntities.length;o++)this.entity.remove(this.shapeEntities[o]),this.shapeEntities[o].dispose();this.shapeEntities=[],this.initialPositions=[],this.timeOffsets=[];const i=Ur.randomSeed(this.randomSeed);for(let o=0;o<this.count;o++){const s=new Ct;s.name=`ShaderMotionGraphics_${o}`;const d=(i()-.5)*this.rangeX,c=(i()-.5)*this.rangeY,v=(i()-.5)*this.rangeZ;s.position.set(d,c,v),this.initialPositions.push(new Q(d,c,v));const h=i()*10;this.timeOffsets.push(h);const p=s.addComponent(Qb),_=this.shaderType==="random"?this.getRandomShaderType(i):this.shaderType;p.setField("shaderName",_),p.setField("timeOffset",h),this.entity.add(s),this.shapeEntities.push(s)}}updateImpl(i){if(!(this.movementX===0&&this.movementY===0))for(let o=0;o<this.shapeEntities.length;o++){const s=this.shapeEntities[o],d=this.initialPositions[o],c=this.movementX*i.timeCode,v=this.movementY*i.timeCode;let h=d.x+c,p=d.y+v;this.rangeX>0&&(h=((h+this.rangeX/2)%this.rangeX+this.rangeX)%this.rangeX-this.rangeX/2),this.rangeY>0&&(p=((p+this.rangeY/2)%this.rangeY+this.rangeY)%this.rangeY-this.rangeY/2),s.position.set(h,p,d.z)}}disposeImpl(){for(let i=0;i<this.shapeEntities.length;i++)this.entity.remove(this.shapeEntities[i]),this.shapeEntities[i].dispose();this.shapeEntities=[]}}const YP=`// @shader-file: src/resources/Components/Demo4/Common/SkyBox/shaders/skybox.fs
#include <common>\r
#include <packing>\r
#include <frag_h>\r
#include <noise_value>\r
#include <rotate>\r
\r
uniform float uTime;\r
uniform float uAspectRatio;\r
uniform sampler2D uNoiseTex;\r
uniform vec4 uState;\r
\r
void main( void ) {\r
\r
	#include <frag_in>\r
\r
	vec3 normal = normalize( - vNormal );\r
	outRoughness = 1.0;\r
\r
	#ifdef TSURI\r
\r
		// たい焼き釣りシーンの水辺の空（明るい青空グラデーション）\r
		vec3 skyColor = mix(\r
			vec3( 0.4, 0.7, 1.0 ),  // 上部：明るい青\r
			vec3( 0.8, 0.9, 1.0 ),  // 下部：淡い青\r
			smoothstep( -0.5, 0.5, normal.y )\r
		);\r
\r
		// ノイズで雲のような質感を追加\r
		vec4 n = texture( uNoiseTex, vUv * 0.3 + uTime * 0.01 );\r
		skyColor += vec3( 0.2 ) * smoothstep( 0.5, 0.7, n.x );\r
\r
		outEmission = skyColor * 1.5;\r
\r
	#else\r
\r
		// デフォルトスカイボックス\r
		outColor *= 1.0;\r
		outEmission = vec3( 2.0 );\r
		outEmission *= uState.x;\r
\r
	#endif\r
\r
	#ifdef IS_FORWARD\r
\r
		#ifdef TSURI\r
			outColor = vec4( outEmission, 1.0 );\r
		#else\r
			vec4 n = texture( uNoiseTex, vUv * 0.2 );\r
			outColor = vec4( outEmission * 1.0 * smoothstep( 0.2, 0.5, n.x ) , 1.0 );\r
		#endif\r
\r
	#endif\r
\r
	outEnv = 0.0;\r
\r
	#include <frag_out>\r
\r
} `;class qP extends Te{constructor(i){super(i);y(this,"skyboxType");y(this,"material");this.skyboxType="default",this.material=new He({phase:["deferred","envMap"],frag:Se("skyboxFrag",YP),cullFace:!1,uniforms:Ce.merge(ie.time,ie.tex)}),this.field("skyboxType",()=>this.skyboxType,s=>{this.skyboxType=s;const d={};s==="tsuri"&&(d.TSURI=""),this.material.defines=d,this.material.requestUpdate()},{format:{type:"select",list:[{label:"Default",value:"default"},{label:"Tsuri",value:"tsuri"}]}});const o=this._entity.addComponent(me,{geometry:new ir({radius:500,widthSegments:32,heightSegments:32}),material:this.material});hn(o.entity,o)}}const XP=`// @shader-file: src/resources/Components/Demo4/Common/TableStage/shaders/tableStage.fs
#include <common>\r
#include <packing>\r
#include <frag_h>\r
#include <sdf>\r
#include <rm_h>\r
#include <rotate>\r
#include <noise_cyclic>\r
#include <noise_value>\r
\r
const float seatDepth = 0.4;\r
\r
// マテリアルID\r
const float MAT_FLOOR = 0.0;\r
const float MAT_WOOD = 1.0;\r
const float MAT_LANE = 2.0;\r
const float MAT_CONVEYOR = 3.0;\r
const float MAT_FAUCET = 4.0;\r
const float MAT_BLACK = 5.0;\r
const float MAT_WALL = 6.0;\r
const float MAT_NOREN = 7.0;\r
\r
uniform float uTimeE;\r
uniform vec4 uState;\r
\r
vec2 gridCenter = vec2( 0.0, 0.0 );\r
const vec2 gridSize = vec2( 1.0, 1.6 );\r
const vec2 offsetPos = vec2( gridSize / 2.0 ) + vec2( 0.0, 0.3);\r
\r
// https://kinakomoti321.hatenablog.com/entry/2024/12/10/023309\r
float gridTraversal( vec2 ro, vec2 rd) {\r
\r
	ro -= offsetPos;\r
\r
  gridCenter = (floor( ( ro + rd * 1E-3 ) / gridSize) + 0.5)*gridSize;\r
  vec2 src = -( ro - gridCenter ) / rd;\r
  vec2 dst = abs( 0.5 * gridSize / rd );\r
  vec2 bv = src + dst;\r
\r
  return  min( bv.x, bv.y );\r
}\r
\r
SDFResult jaguchi( vec3 p ) {\r
\r
	vec3 baseP = p;\r
	baseP += vec3( -0.05, -0.08, 0.38 );\r
\r
	vec3 baseRotP = baseP;\r
	baseRotP.yz *= rotate( HPI );\r
	vec2 d = vec2( sdCappedCylinder( baseRotP, 0.01, 0.05 ), 0.0 );\r
\r
	vec3 buttonP = baseP;\r
	buttonP += vec3( 0.0, 0.0, -0.05);\r
	buttonP.yz *= rotate( HPI );\r
	d = opAdd( d, vec2( sdCappedCylinder( buttonP, 0.013, 0.003 ), 1.0 ) );\r
\r
	vec3 jaguchiP = baseP;\r
	jaguchiP += vec3( 0.0, -0.03, -0.025 );\r
	jaguchiP.yz *= rotate( 0.6 );\r
	d = opAdd( d, vec2( sdCappedCylinder( jaguchiP, 0.01, 0.035 ), 0.0 ) );\r
\r
	vec3 jaguchi2P = baseP;\r
	jaguchi2P += vec3( 0.0, -0.059, -0.06 );\r
	jaguchi2P.yz *= rotate( HPI + 0.6 );\r
	jaguchi2P += vec3( 0.0, 0.0054, -0.01 );\r
	d = opAdd( d, vec2( sdCappedCylinder( jaguchi2P, 0.009, 0.015 ), 0.0 ) );\r
\r
	return SDFResult( d.x, p, MAT_FAUCET, vec4( p, 0.0 ) );\r
}\r
\r
SDFResult laneConveyor( vec3 p ) {\r
\r
	vec3 laneConveyorP = p;\r
	laneConveyorP.x += cos( laneConveyorP.z * 30.0 ) * 0.01;\r
	laneConveyorP += vec3( 0.0, 0.008, 0.0 );\r
	laneConveyorP.x = mod( laneConveyorP.x + uTimeE * 0.2, 0.1 ) - 0.045;\r
	float d = sdBox( laneConveyorP, vec3( 0.045, 0.005, 0.06 ) );\r
\r
	return SDFResult( d, p, MAT_CONVEYOR, vec4( p, 0.0 ) );\r
}\r
\r
SDFResult lane( vec3 p ) {\r
\r
	vec3 laneP = p;\r
	laneP += vec3( 0.0, 0.05, 0.5 );\r
	vec2 d = vec2( sdBox( laneP, vec3( 0.5, 0.2, 0.1) ), MAT_WOOD );\r
\r
	vec3 laneSubP = laneP;\r
	laneSubP += vec3( 0.0, -0.2, -0.015  );\r
	d.x = opSub( d.x, sdBox( laneSubP, vec3( 0.5, 0.01, 0.07 ) ) );\r
\r
	d = opAdd( d, vec2( laneConveyor( laneP + vec3( 0.0, -0.2, -0.015 ) ).d, MAT_CONVEYOR ) );\r
	\r
	vec3 topLaneP = laneP;\r
	topLaneP += vec3( 0.0, -0.45, 0.0  );\r
	d = opAdd( d, vec2( sdBox( topLaneP, vec3( 0.5, 0.013, 0.1) ), MAT_WOOD ) );\r
\r
	vec3 laneWallP = topLaneP;\r
	laneWallP += vec3( 0.0, 0.0, 0.1 );\r
	d = opAdd( d, vec2( sdBox( laneWallP, vec3( 0.5, 2.0, 0.03) ), MAT_WALL ) );\r
\r
	vec3 shikiriP = laneWallP;\r
	shikiriP.x = abs( shikiriP.x );\r
	shikiriP += vec3( -0.5, 0.0, -0.01 );\r
	d = opAdd( d, vec2( sdBox( shikiriP, vec3( 0.03, 2.0, 0.03) ), MAT_WOOD ) );\r
\r
	return SDFResult( d.x, p, d.y, vec4( laneP, 0.0 ) );\r
\r
}\r
\r
SDFResult table( vec3 p  ) {\r
\r
	vec2 d = vec2( sdBox( p, vec3( 0.2, 0.02, seatDepth ) ), MAT_WOOD );\r
\r
	vec3 poleP = p;\r
	poleP += vec3( 0.0, 0.25, 0.0 );\r
	d = opAdd( d, vec2( sdCappedCylinder( poleP, 0.03, 0.25 ), MAT_BLACK ) );\r
	return SDFResult( d.x, p, d.y, vec4( p, 0.0 ) );\r
\r
}\r
\r
SDFResult seat( vec3 p  ) {\r
\r
	vec3 seatP = p;\r
	seatP.x = abs( seatP.x );\r
	seatP += vec3( - 0.4, 0.2, 0.0 );\r
	vec2 d = vec2( sdBox( seatP, vec3( 0.2, 0.06, seatDepth ) ), MAT_WOOD );\r
\r
	vec3 semotareP = seatP;\r
	semotareP += vec3( -0.12, -0.26, 0.0 );\r
	d = opAdd( d, vec2( sdBox( semotareP, vec3( 0.08, 0.20, seatDepth ) ), MAT_WOOD ) );\r
\r
	vec3 kushonP = seatP;\r
	kushonP -= vec3( 0.02, 0.27, 0.0 );\r
	d = opAdd( d, vec2( sdBox( kushonP, vec3( 0.007, 0.15, seatDepth * 0.93 ) ) - 0.02, MAT_BLACK ) );\r
\r
	vec3 kushon2P = seatP;\r
	kushon2P -= vec3( -0.08, 0.08, 0.0 );\r
	d = opAdd( d, vec2( sdBox( kushon2P, vec3( 0.1, 0.007, seatDepth * 0.93 ) ) - 0.02, MAT_BLACK ) );\r
\r
	vec3 ashiP = semotareP;\r
	ashiP += vec3( 0.0, 0.4, 0.0 );\r
	d = opAdd( d, vec2( sdBox( ashiP, vec3( 0.25, 0.1, 0.35 ) ), MAT_WOOD ) );\r
\r
	return SDFResult( d.x, p, d.y, vec4( p, 0.0 ) );\r
\r
}\r
\r
SDFResult sdFloor( vec3 p ) {\r
\r
	float seatDepth = 0.4;\r
\r
	vec3 floorP = p;\r
	floorP.x = abs( floorP.x );\r
	floorP += vec3( 0.0, 0.45, 0.0 );\r
	float d = sdBox( floorP, vec3( 0.5, 0.05, seatDepth ) );\r
\r
	return SDFResult( d, p, MAT_FLOOR, vec4( p, 0.0 ) );\r
\r
}\r
\r
SDFResult noren( vec3 p ) {\r
\r
	float norenWidth = 0.045;\r
	float norenLoop = norenWidth * 2.5;\r
	float size = step( 0.45, abs( p.x ) );\r
\r
	vec3 norenP = p;\r
	\r
	norenP += vec3( 0.0, -0.8, 0.55 );\r
	norenP.x = mod( norenP.x, norenLoop ) - norenLoop * 0.5;\r
	float d = sdBox( norenP, vec3( norenWidth, 0.15, 0.005 ) );\r
\r
	return SDFResult( d, p, MAT_WOOD, vec4( p, 0.0 ) );\r
\r
}\r
\r
SDFResult D( vec3 p ) {\r
\r
	p.z += pow( p.x, 2.0 ) * 0.03;\r
\r
	vec3 pl = p;\r
	pl.xy -= offsetPos;\r
	pl.xy -= gridCenter;\r
	pl.y += 0.3;\r
	\r
\r
	SDFResult distTable = table( pl );\r
	SDFResult result = distTable;\r
\r
	SDFResult distSeat = seat( pl );\r
	if( distSeat.d < result.d ) result = distSeat;\r
\r
  	SDFResult distFloor = sdFloor( pl );\r
	if( distFloor.d < result.d ) result = distFloor;\r
\r
	SDFResult distLane = lane( pl );\r
	if( distLane.d < result.d ) result = distLane;\r
\r
	SDFResult distJaguchi = jaguchi( pl );\r
	if( distJaguchi.d < result.d ) result = distJaguchi;\r
\r
	SDFResult distNoren = noren( pl );\r
	if( distNoren.d < result.d ) result = distNoren;\r
\r
	return result;\r
\r
}\r
\r
#include <rm_normal>\r
\r
void main( void ) {\r
\r
	#include <frag_in>\r
\r
	// カメラ位置からワールド空間でレイを初期化\r
	#include <rm_ray_screen>\r
\r
	SDFResult dist;\r
	bool hit = false;\r
\r
\r
	// レイマーチング\r
	for( int i = 0; i < 128; i++ ) {\r
\r
		// グリッドトラバーサルで最適化\r
		float limitD = gridTraversal(rayPos.xy, rayDir.xy);\r
\r
		dist = D( rayPos );\r
\r
		if( dist.d < 0.001 ) {\r
\r
			hit = true;\r
			break;\r
\r
		}\r
\r
		float d = min( dist.d, limitD );\r
		rayPos += rayDir * d;\r
\r
	}\r
\r
	if( !hit ) discard;\r
\r
\r
	// 法線を計算\r
	outNormal = N( rayPos, 0.001 );\r
\r
	// オブジェクト空間からワールド空間への変換、位置・法線・深度を出力\r
	#include <rm_out_obj>\r
\r
	// 汎用ノイズ（細かさ違い3種）\r
	vec3 matP = dist.matparam.xyz;\r
	vec4 noise = vec4(\r
		fbm( rayPos * 2.0 ),   // 粗い\r
		fbm( rayPos * 8.0 ),   // 中間\r
		fbm( rayPos * 32.0 ),   // 細かい\r
		fbm( rayPos * 64.0 )   // さらに細かい\r
	);\r
\r
	// マテリアルIDごとに色とプロパティを設定\r
	outEmission = vec3( 0.0 );\r
	outRoughness = 0.7;\r
	outMetalic = 0.0;\r
\r
	if( dist.mat == MAT_FLOOR ) {\r
\r
		// 床（タイル風の明るいグレー）\r
		outColor.xyz = vec3( 0.85, 0.85, 0.88 );\r
		outRoughness = 0.4;\r
\r
	} else if( dist.mat == MAT_WOOD ) {\r
\r
		// テーブル・椅子（木目）\r
		float mokume = fract( length( matP * vec3( 0.5, 1.0, 1.0 ) + vec3( -0.1, 0.4, 0.1 ) ) * 45.0 + noise.x * 20.0 );\r
		vec3 baseCol = vec3( 0.8, 0.55, 0.25 );\r
		outColor.xyz = mix( baseCol, baseCol * 0.95, mokume );\r
		outNormal = normalize( outNormal + mokume * 0.0 );\r
		outRoughness = 0.2 + mokume * 0.1;\r
\r
	} else if( dist.mat == MAT_LANE ) {\r
\r
		// レーン（プラスチック風の白）\r
		outColor.xyz = vec3( 0.95, 0.95, 0.95 );\r
		outRoughness = 0.3;\r
\r
	} else if( dist.mat == MAT_CONVEYOR ) {\r
\r
		// コンベア（ゴム風の濃いグレー）\r
		outColor.xyz = vec3( 1.0, 0.95, 0.85 );\r
		outRoughness = 0.8;\r
\r
	} else if( dist.mat == MAT_FAUCET ) {\r
\r
		// 蛇口（ステンレス風のメタリック）\r
		outColor.xyz = vec3( 0.8, 0.8, 0.82 );\r
		outRoughness = 0.15;\r
		outMetalic = 0.85;\r
\r
	} else if( dist.mat == MAT_BLACK ) {\r
\r
		// クッション\r
		float gara = fract( noise.w * 20.0 );\r
		outColor.xyz = vec3( 0.3, 0.3, 0.3 ) * noise.x + gara * 0.01;\r
		outRoughness = 0.3 + gara * 0.3;\r
		outNormal = normalize( outNormal + vec3(  gara  ) * 0.05 );\r
\r
	} else if( dist.mat == MAT_WALL ) {\r
\r
		// 壁（白ベース）\r
		float gara = fract( noise.x * 40.0 ) * noise.z;\r
		outColor.xyz = vec3( 0.95, 0.90, 0.8 );\r
		outColor.xyz *= 0.95 + gara * 0.1;\r
		outRoughness = 0.1+ gara;\r
\r
	} else if( dist.mat == MAT_NOREN ) {\r
\r
		// 暖簾（青い布）\r
		float gara = noise.z * 0.1;\r
		outColor.xyz = vec3( 0.25, 0.35, 0.5 ) + gara;\r
		outRoughness = 0.8 + noise.w * 0.2;\r
		outNormal = normalize( outNormal + vec3( noise.y, noise.z, 0.0 ) * 0.1 );\r
\r
	}\r
\r
	float partyLen = length( rayPos ) * 15.0;\r
\r
	vec3 emission = vec3( 0.0 );\r
	emission.x = sin( partyLen - uTimeE * 10.0 );\r
	emission.y = sin( partyLen - uTimeE * 20.0 - 0.5 );\r
	emission.z = sin( partyLen - uTimeE * 30.0 - 1.0);\r
	emission = smoothstep( 0.9, 1.0, emission );\r
	emission *= 10.0 * uState.y;\r
\r
	outEmission = emission;\r
\r
	#include <frag_out>\r
\r
}\r
`,wf=`// @shader-file: src/resources/shaders/screen.vs
#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>

	gl_Position = vec4( position.xy, 0.0, 1.0 );

}
`;class $P extends Te{constructor(i){super(i);y(this,"mesh");this.mesh=this._entity.addComponent(me,{geometry:new ro({width:2,height:2}),material:new He({phase:["deferred","shadowMap"],vert:wf,frag:Se("tableStageFrag",XP),uniforms:Ce.merge(ie.time,ie.resolution)})});const o=new Ct;this._entity.add(o),hn(this.entity,this.mesh)}disposeImpl(){this._entity.removeComponent(me)}}const KP=`// @shader-file: src/resources/Components/Demo4/Common/TruchetSushiLane/shaders/truchetSushiLane.fs
#include <common>
#include <packing>
#include <frag_h>
#include <sdf>
#include <hash>
#include <rm_h>
#include <rotate>

uniform float uTime;
uniform sampler2D uNoiseTex;

float sdOrientedBox( in vec2 p, in vec2 a, in vec2 b, float th )
{
    float l = length(b-a);
    vec2  d = (b-a)/l;
    vec2  q = (p-(a+b)*0.5);
          q = mat2(d.x,-d.y,d.y,d.x)*q;
          q = abs(q)-vec2(l,th)*0.5;
    return length(max(q,0.0)) + min(max(q.x,q.y),0.0);    
}

vec2 gridCenter;
float gridSize = 5.0;
float strokeWidth = 0.35;
float laneHeight = 0.1;

float ring( vec2 center ) {
	return sdRing( center, vec2( -1.0, 0.0 ), 0.5, strokeWidth );
}

float p1( vec3 p, vec2 dir1 ) {

	float d = sdOrientedBox( p.xz, vec2( 0.0 ), dir1, strokeWidth );
	d = min( d, length( p.xz ) - strokeWidth / 2.0 );

	return d;

}

float p2( vec3 p, vec2 dir1, vec2 dir2 ) {

	if( dot( dir1, dir2 ) < 0.0 ) {

		return sdOrientedBox( p.xz, dir1, dir2, strokeWidth );

	}

	return ring( p.xz - ( dir1 + dir2 ) * 0.5 );

}

float p3( vec3 p, vec2 dir1, vec2 dir2, vec2 dir3 ) {

	vec2 line1 = dir1;
	vec2 line2 = dir2;
	vec2 aloneDir = dir3;

	if( dot( line1, line2 ) > -0.5  ) {

		line2 = dir3;
		aloneDir = dir2;

	}

	if( dot( line1, line2 ) > -0.5 ) {

		line1 = dir2;
		line2 = dir3;
		aloneDir = dir1;

	} 

	float d = sdOrientedBox( p.xz, line1, line2, strokeWidth);
	d = min( d, length( p.xz - aloneDir * 0.5 ) - strokeWidth / 2.0 );

	vec2 dirAmari = mix( line1, line2, step( hash12( gridCenter ), 0.5 ) );

	d = min( d, ring( p.xz - ( aloneDir + dirAmari ) * 0.5 ) );

	return d;
	
}

float p4( vec3 p, vec2 dir1, vec2 dir2, vec2 dir3, vec2 dir4 ) {

	p.xz *= rotate( HPI * step(hash12( gridCenter ), 0.5) );
	float d = ring( p.xz - 0.5 );
	d = min( d, ring( p.xz + 0.5 ) );
	return d;

}


// https://kinakomoti321.hatenablog.com/entry/2024/12/10/023309
float gridTraversal( vec2 ro, vec2 rd) {

   gridCenter = (floor( ( ro + rd * 1E-3 ) / gridSize) + 0.5)*gridSize;
   vec2 src = -( ro - gridCenter ) / rd;
   vec2 dst = abs( 0.5 * gridSize / rd );
   vec2 bv = src + dst;

   return  min( bv.x, bv.y );
} 

vec2 tci(vec2 uv)
{
  return round(uv*2.)*.5;
}

const float loopY = 10.0;

// SDF（Signed Distance Function）
SDFResult D( vec3 p ) {


	vec3 op = p;
	float loopYId = floor(op.y / loopY);
	op.y = mod( op.y, loopY ) - loopY / 2.0;
	p.xz -= gridCenter;

	// TruchetTiling
	// thanks to renard
	// https://renard.hateblo.jp/entry/2023/08/11/230202
	// https://gist.github.com/Forenard/eb96f682c46aeb3b10cacd6812f29ba0

	vec2[4] quv;
	vec2[4] dir = vec2[4](
		vec2( 0.0, 1.0 ),
		vec2( 1.0, 0.0 ),
		vec2( 0.0, -1.0 ),
		vec2( -1.0, 0.0 )
	);

	int qCount = 0;

	for( int i = 0; i < 4; i++ ) {

		vec2 id = tci(gridCenter + dir[i] * 0.5 * gridSize) + loopYId;

		if( hash12( id ) < 0.8 ) {

			quv[qCount++] = dir[i];

		}

	}

	float s = 0.0;

	float dist2D;

	dist2D = gridSize / 3.0;

	if( qCount == 1 ) {

		dist2D = min( dist2D, p1( p / gridSize, quv[0] ) );

	}

	if( qCount == 2 ) {

		dist2D = min( dist2D, p2( p / gridSize, quv[0], quv[1] ) );

	}

	if( qCount == 3 ) {

		dist2D = min( dist2D, p3( p / gridSize, quv[0], quv[1], quv[2] ) );

	}

	if( qCount == 4 ) {

		dist2D = min( dist2D, p4( p / gridSize, quv[0], quv[1], quv[2], quv[3] ) );

	}

    vec2 w = vec2( dist2D, abs(op.y) - laneHeight );
    float d =  min(max(w.x,w.y),0.0) + length(max(w,0.0));



	return SDFResult(
		d,
		p,
		0.0,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>

	// カメラ位置からワールド空間でレイを初期化
	#include <rm_ray_screen>

	SDFResult dist;
	bool hit = false;
	float t = 0.0;

	// 通常のレイマーチング
	for( int i = 0; i < 128; i++ ) {

		dist = D( rayPos );

		if( dist.d < 0.001 ) {
			hit = true;
			break;
		}

		
		if( rayPos.y < 0.0 ) break;

        float limitD = gridTraversal(rayPos.xz, rayDir.xz);
		float d = min( dist.d, limitD );
		t += d;
		rayPos += rayDir * d;

	}

	if( !hit ) discard;

	// 法線を計算
	outNormal = N( rayPos, 0.001 );
	vec3 edgeNormal = N( rayPos, 0.05 );
	float edge = (length(outNormal - edgeNormal));
	#include <rm_out_obj>

	outColor = vec4( vec3( 0.85 ), 1.0 );
	outEmission = vec3( edge * 5.0 * smoothstep( 0.3, 0.7, texture( uNoiseTex, rayPos.xz * 0.05 + uTime * 0.05 ).y) );
	outRoughness = texture( uNoiseTex, rayPos.xz * 0.05 ).r;
	outColor *= 1.0 - outRoughness * 0.1;

	#include <frag_out>

}
`;class QP extends Te{constructor(l){super(l),this._entity.addComponent(me,{geometry:new _r({width:2,height:2,depth:2}),material:new He({phase:["deferred","shadowMap"],vert:wf,frag:Se("truchetSushiLaneFrag",KP),uniforms:Ce.merge(ie.time,ie.resolution,ie.tex)})})}}const ZP=`// @shader-file: src/resources/Components/Demo4/Common/Tsuri/TsuriZao/shaders/basic.fs
#include <common>
#include <packing>
#include <frag_h>

void main( void ) {

	#include <frag_in>

	outColor = vec4( vec3( 0.3, 0.2, 0.0 ), 1.0 );
	
	#include <frag_out>

}
`,Zb=`// @shader-file: src/resources/shaders/basic.vs
#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>
	#include <vert_out>

}
`;class Jb extends Te{constructor(i){super(i);y(this,"mesh");const o=1.7,s=new bf({radiusTop:.018,radiusBottom:.018,height:o,radSegments:8,heightSegments:16});s.applyMatrix(new nt().setFromTransform(new Q(0,o*.5,0)));const d=new He({vert:Se("tsuriZaoVert",Zb),frag:Se("tsuriZaoFrag",ZP),uniforms:Ce.merge(ie.resolution,ie.time)});this.mesh=this.entity.addComponent(me,{geometry:s,material:d})}disposeImpl(){this._entity.removeComponent(me)}}const JP=`// @shader-file: src/resources/Components/Demo4/Common/UKPAshi/shaders/basic.fs
#include <common>
#include <packing>
#include <frag_h>

void main( void ) {

	#include <frag_in>

	outColor = vec4( 0.0, 0.0, 0.0, 1.0 );

	#include <frag_out>

}
`;class e_ extends Te{constructor(i){super(i);y(this,"cylinderMesh");y(this,"sphereBottomEntity");const o=new He({vert:Se("ukpashiVert",Zb),frag:Se("ukpashiFrag",JP),uniforms:Ce.merge(ie.resolution,ie.time)}),s=1.1,d=new bf({height:s,radiusTop:.1,radiusBottom:.1,radSegments:16});d.applyMatrix(new nt().setFromTransform(new Q(0,-s/2,0))),this.cylinderMesh=this.entity.addComponent(me,{geometry:d,material:o}),this.sphereBottomEntity=new Ct,this.sphereBottomEntity.position.set(0,-s,0),this.sphereBottomEntity.addComponent(me,{geometry:new ir({radius:.2}),material:o}),this.entity.add(this.sphereBottomEntity)}disposeImpl(){this._entity.removeComponent(me),this.entity.remove(this.sphereBottomEntity)}}const ez=`// @shader-file: src/resources/Components/Demo4/Common/Ukonpower/shaders/ukonpower.fs
#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

SDFResult D( vec3 p ) {

	vec3 pp = p;

	// たこ焼き風の球体を描画
	float baseRadius = 0.40 + noiseValue( pp * 5.0 ) * 0.01;
	float bodyRadius = baseRadius + fbm( pp * 20.0 ) * 0.01;

	vec2 d = vec2( sdSphere( pp, bodyRadius ), 0.0 );

	// eye
	// 黒い丸
	float eyeSize = 0.01;
	float eyeDepth = 0.02;
	vec3 eyeOffset = vec3( 0.05, 0.2, -0.33 );

	// 左目
	vec3 leftEyePos = pp - eyeOffset * vec3( 1.0, 1.0, 1.0 );
	float leftEye = sdSphere( leftEyePos, eyeSize ) - eyeDepth;

	// 右目
	vec3 rightEyePos = pp - eyeOffset * vec3( -1.0, 1.0, 1.0 );
	float rightEye = sdSphere( rightEyePos, eyeSize ) - eyeDepth;

	// 目を本体に結合（matを2.0に設定）
	vec2 eyes = vec2( min( leftEye, rightEye ), 2.0 );
	d = d.x < eyes.x ? d : eyes;

	return SDFResult(
		d.x,
		p,
		d.y,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>



	#include <rm_loop,32,0.001,1.0>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	outRoughness = 1.0;
	outMetalic = 0.0;

	if( dist.mat == 0.0 ) {

		// たこ焼き本体
		outColor.xyz = mix( vec3( 0.8, 0.6, 0.4 ), vec3( 0.3, 0.15, 0.05 ), smoothstep( 0.3, 0.7, fbm( dist.pos * 3.0 ) ) );
		outRoughness = 0.3;

	} else if( dist.mat == 1.0 ) {

		// ソース
		outColor.xyz = vec3( 0.15, 0.03, 0.00 );
		outRoughness = 0.1;

	} else if( dist.mat == 2.0 ) {

		// 目（黒い丸）
		outColor.xyz = vec3( 0.02 );
		outRoughness = 0.2;

	}

	// リムライト効果
	float limLight = ( 1.0 - dot( outNormal.xyz, -rayDir ) ) * 0.8;
	outEmission += limLight * 0.3;

	#include <frag_out>


}
`;class tz extends Te{constructor(i){super(i);y(this,"mesh");y(this,"ashiEntities",[]);y(this,"legInitialRotX",[]);y(this,"tsuriZaoEntity",null);const o=new ir({radius:.5}),s=new He({frag:Se("ukonpowerFrag",ez),uniforms:Ce.merge(ie.resolution,ie.time)});this.mesh=this.entity.addComponent(me,{geometry:o,material:s});const d=[{pos:[-.31,0,-.2],rot:[Math.PI/2,0,.5]},{pos:[.31,0,-.2],rot:[Math.PI/2,0,-.5]},{pos:[-.2,-.3,-.1],rot:[Math.PI/2*.9,0,0]},{pos:[.2,-.3,-.1],rot:[Math.PI/2*.9,0,0]}];for(let c=0;c<d.length;c++){const v=d[c],h=new Ct;h.position.set(v.pos[0],v.pos[1],v.pos[2]),h.quaternion.setFromEuler(new Ms(v.rot[0],v.rot[1],v.rot[2])),h.scale.set(.3,.3,.3),h.addComponent(e_),this.entity.add(h),this.ashiEntities.push(h),c>=2&&this.legInitialRotX.push(v.rot[0])}this.tsuriZaoEntity=new Ct,this.tsuriZaoEntity.position.set(0,0,-.45),this.tsuriZaoEntity.quaternion.setFromEuler(new Ms(-Math.PI/4,0,0)),this.tsuriZaoEntity.addComponent(Jb),this.entity.add(this.tsuriZaoEntity)}updateImpl(i){const o=i.timeCode,s=this.ashiEntities[2],d=this.legInitialRotX[0]+Math.sin(o*3)*.3;s.quaternion.setFromEuler(new Ms(d,0,0));const c=this.ashiEntities[3],v=this.legInitialRotX[1]+Math.sin(o*3+Math.PI)*.3;c.quaternion.setFromEuler(new Ms(v,0,0))}disposeImpl(){this._entity.removeComponent(me);for(const i of this.ashiEntities)i.dispose();this.ashiEntities=[],this.tsuriZaoEntity&&(this.tsuriZaoEntity.dispose(),this.tsuriZaoEntity=null)}}const nz=`// @shader-file: src/resources/Components/Demo4/Ikura/IkuraFluids/shaders/ikuraFluids.fs
#include <common>
#include <packing>
#include <frag_h>
#include <light>
#include <pmrem>

uniform sampler2D uEnvMap;

in vec4 vGPUVel;
in vec4 vGPUPos;
in vec4 vId;

void main( void ) {

	#include <frag_in>

	// デフォルト設定
	outColor.xyz = vec3(0.0);
	outRoughness = 0.2;
	outMetalic = 0.2;

	#ifdef IS_FORWARD

		vec3 viewNormal = normalize( vViewNormal );

		#include <lighting_forwardIn>

		vec2 uv = gl_FragCoord.xy / uResolution;

		// フレネル効果
		float dnv = dot( geo.normal, geo.viewDir );
		float ef = fresnel( dnv );

		// 屈折効果によるシーンテクスチャのサンプリング
		float nf = 1.0;

		for( int i = 0; i < 3; i++ ) {

			// 法線に基づいて屈折オフセットを計算
			vec2 v = -( viewNormal.xy ) * ( float( i + 1 ) / 4.0 * 0.015 + 0.05 );
			outColor.x += nf * texture( uDeferredTexture, uv + v * 1.0 ).x;
			outColor.y += nf * texture( uDeferredTexture, uv + v * 1.3 ).y;
			outColor.z += nf * texture( uDeferredTexture, uv + v * 1.6 ).z;

		}

		outColor.xyz /= 3.0;

		// いくらの色味を加える（オレンジ系）
		outColor.xyz = (outColor.xyz + vec3( 0.7, 0.3, 0.0 )) * vec3( 0.7, 0.1, 0.0 );
		outColor.w = 1.0;

		// フレネル効果でハイライト追加
		outColor.xyz += ef * 1.0 * vec3( 1.0, 0.5, 0.0 );

		#include <lighting_light>

		float emit = smoothstep( 0.85, 1.0, vGPUVel.w );

		outColor.xyz *= 1.0 + smoothstep( 0.02, 0.2, ef ) * 1.0 + emit * 55.0;

		
		#include <lighting_env>

	#endif

	#include <frag_out>

}
`,rz=`// @shader-file: src/resources/Components/Demo4/Ikura/IkuraFluids/shaders/ikuraFluids.vs
#include <common>
#include <vert_h>

#include <rotate>

layout (location = 3) in vec2 cuv;
layout (location = 4) in vec4 id;

uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;
uniform vec4 uState;

out vec4 vGPUVel;
out vec4 vGPUPos;
out vec4 vId;

void main( void ) {

	#include <vert_in>

	vGPUVel = texture(uGPUSampler1, cuv );
	vec4 gpuPos = texture(uGPUSampler0, cuv );

	// いくら粒のサイズ調整
	outPos *= 0.06 * (0.7 + id.z * 0.3) * uState.y;
	outPos *= smoothstep( 0.0, 0.5, sin(vGPUVel.w * PI) );

	// 密度に基づくサイズ変化
	float density = gpuPos.w;
	outPos *= 0.8 + density * 0.4;

	// 速度に基づく引き伸ばし
	float speed = length(vGPUVel.xyz);
	vec3 stretchDir = normalize(vGPUVel.xyz + vec3(0.001));
	outPos += stretchDir * dot(outPos, stretchDir) * speed * .2;

	// apply GPU position
	outPos += gpuPos.xyz;

	vGPUPos = gpuPos;
	vId = id;

	// motion blur
	vec4 vel = ( uProjectionMatrix * uViewMatrix * uModelMatrix * vec4( vGPUVel.xyz, 0.0 ) );

	#include <vert_out>

	vVelocity += vel.xy * 0.001;

}
`,iz=`// @shader-file: src/resources/Components/Demo4/Ikura/IkuraFluids/shaders/ikuraFluidsCompute.fs
#include <common>
#include <noise_cyclic>
#include <rotate>

layout (location = 0) out vec4 outColor0;
layout (location = 1) out vec4 outColor1;

uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;
uniform float uTimeE;
uniform float uDeltaTime;
uniform vec4 uState;

in vec2 vUv;

#include <random>

const float LIFE_TIME = 5.0; // パーティクルの寿命（秒）

void main( void ) {

	vec4 position = texture( uGPUSampler0, vUv );
	vec4 velocity = texture( uGPUSampler1, vUv );

	// velocity.wを時間として使用
	float time = velocity.w;
	time += uDeltaTime / (LIFE_TIME + vUv.y * 1.0);

	// 一定時間経ったらリセット
	if(time > 1.0 || uState.x < 0.5) {

		
		// 位置をランダムにリセット
		float r = random(vUv + uTimeE) * 2.0;
		float theta = random(vUv * 2.0 + uTimeE) * 6.28318;
		float phi = random(vUv * 3.0 + uTimeE) * 3.14159;

		
		if( vUv.x < 0.05  ) {

			position.xyz = vec3(
				r * sin(phi) * cos(theta),
				r * sin(phi) * sin(theta),
				r * cos(phi)
			);
			
		} else {

			position.xyz = vec3(
				r * sin(phi) * cos(theta),
				r * sin(phi) * sin(theta),
				r * cos(phi)
			) * 0.03 + vec3( 
				0.7,
				0.5,
				-0.5
			);

		}


		velocity.xyz = vec3(0.0);
		time = 0.0;

		if( uState.x < 0.5 ) {

			time = random(vUv + uTimeE + 10.0) * 1.0;
			
		}
	}

	// simplex noiseをvelocityに足す
	velocity.xyz *= 0.998;

	
	vec3 noiseForce = noiseCyc(position.xyz * 5.0 + vec3(0.0, 0.0, uTimeE * 0.5 + time + vUv.x * 0.0));
	velocity.xyz += noiseForce * 0.01;

	float dir = atan2( position.z, position.x ) - 1.0;
	vec3 rotateVec = vec3( sin( dir ), 0.0, -cos( dir ) );
	velocity.xz = mix( velocity.xz, rotateVec.xz, 0.01 );

	velocity.xyz += normalize(-position.xyz) * length( position.xyz ) * 0.005 * vec3( 1.4, 0.4, 1.0);

	

	// position update
	position.xyz += velocity.xyz * uDeltaTime;

	// 時間を保存
	velocity.w = time;

	// output
	outColor0 = position;
	outColor1 = velocity;

}
`;class oz extends Te{constructor(i){super(i);y(this,"gpu");y(this,"mesh");const o=new Q(64,64);this.gpu=new zb({passes:[new Ab(We,{name:"ikuraFluids",size:o,dataLayerCount:2,frag:Se("ikuraFluidsCompute",iz),uniforms:Ce.merge(ie.time)})]}),hn(this.entity,this.gpu.passes[0]),this.gpu.passes[0].initTexture(v=>{if(v===0){const h=Math.random()*2,p=Math.random()*Math.PI*2,_=Math.random()*Math.PI;return[h*Math.sin(_)*Math.cos(p),h*Math.sin(_)*Math.sin(p),h*Math.cos(_),1]}else return[0,0,0,Math.random()*5]});const s=new ir({radius:.5,widthSegments:16,heightSegments:12}),d=[],c=[];for(let v=0;v<o.x;v++)for(let h=0;h<o.y;h++)d.push(v/o.x,h/o.y),c.push(Math.random(),Math.random(),Math.random(),Math.random());s.setAttribute("cuv",new Float32Array(d),2,{instanceDivisor:1}),s.setAttribute("id",new Float32Array(c),4,{instanceDivisor:1}),this.mesh=this.entity.addComponent(me,{geometry:s,material:new He({name:"ikuraFluids",phase:["shadowMap","forward"],vert:Se("ikuraFluidsVert",rz),frag:Se("ikuraFluidsFrag",nz),uniforms:Ce.merge(ie.time,this.gpu.passes[0].outputUniforms)})}),hn(this.entity,this.mesh)}updateImpl(i){this.gpu.compute(i.renderer)}disposeImpl(){this.entity.removeComponent(me),this.gpu.dispose()}}const az=`// @shader-file: src/resources/Components/Demo4/Ikura/IkuraGunKan/GunkanShari/shaders/gunkanShari.fs
#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <rm_h>
#include <sdf>
#include <noise_cyclic>
#include <rotate>

uniform sampler2D uNoiseTex;
uniform float uTime;
uniform vec4 uState;

float daenScale = 0.7;

// シャリ部分
SDFResult shari( vec3 p ) {

	vec3 shariP = p;
	shariP.z *= daenScale;

	vec4 noise = texture( uNoiseTex, shariP.xz * 0.5 + 0.5 );
	shariP.y -= noise.y * 0.05 - 0.1;

	float d = sdCappedCylinder(shariP, 0.25, 0.08);


	return SDFResult( d, p, 0.0, vec4( 0.95, 0.93, 0.88, 1.0 ) );

}

// 海苔部分
SDFResult nori( vec3 p ) {

	vec3 noriPos = p - vec3(0.0, 0.0, 0.0);
	noriPos.z *= daenScale;

	// 海苔の表面テクスチャ（ノイズで凹凸）
	vec3 noise = noiseCyc(p * 30.0);
	float heightMap = noise.x * 0.003;

	// 海苔のシェル形状 - 外側の円柱
	float noriOuter = sdCappedCylinder(noriPos, heightMap + 0.26, 0.15);
	float noriInner = sdCappedCylinder(noriPos, heightMap + 0.255, 0.16);
	float d = max(noriOuter, -noriInner);


	return SDFResult( d, p, 1.0, vec4( 0.05, 0.08, 0.05, 1.0 ) );

}

// スライスきゅうり部分
SDFResult kyuuri( vec3 p ) {

	float comp = uState.x;

	vec3 kyuuriP = p;
	// kyuuriP.x += uState.x * 0.1;
	kyuuriP += vec3(0.0, -0.14, 0.2);
	kyuuriP.y += -uState.x * 0.4;
	kyuuriP.xz *= rotate( comp * 0.5 );
	kyuuriP.yz *= rotate( 0.3 + comp * 1.0 );
	kyuuriP.xy *= rotate( 0.3 + comp * 1.0 );

	kyuuriP.y -= sin( kyuuriP.z * 4.0 + HPI ) * 0.05 - 0.04;
	kyuuriP.z *= 0.8;


	// きゅうりの表面の凹凸
	vec3 noise = noiseCyc(kyuuriP * 40.0);
	float heightMap = noise.x * 0.002;

	// スライスされた円柱（薄い円盤）
	float d = sdCappedCylinder(kyuuriP, heightMap + 0.2, 0.015);

	vec3 color = vec3( 0.4, 0.7, 0.3 );
	color = mix( color, vec3( 0.05, 0.08, 0.05 ), smoothstep( 0.00, 0.3, length( kyuuriP.xz ) ) );
	color = mix( color, vec3( 0.05, 0.08, 0.05 ), smoothstep( 0.19, 0.205, length( kyuuriP.xz ) ) );

	return SDFResult( d, kyuuriP, 2.0, vec4( color, 1.0 ) );

}

SDFResult D( vec3 p ) {

	SDFResult distShari = shari( p );
	SDFResult result = distShari;

	SDFResult distNori = nori( p );
	if( distNori.d < result.d ) result = distNori;

	SDFResult distKyuuri = kyuuri( p );
	if( distKyuuri.d < result.d ) result = distKyuuri;

	return result;

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>


	#include <rm_loop,64,0.001,1.0>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	// SDFResultから渡された色を使用
	outColor.xyz = dist.matparam.xyz;
	outEmission = vec3( 0.0 );
	outRoughness = 0.8;
	outMetalic = 0.0;

	if( dist.mat == 0.0 ) {

		// シャリ（白いご飯）
		outRoughness = 0.8;

	} else if( dist.mat == 1.0 ) {

		// 海苔（黒緑色）
		float variation = noiseCyc(rayPos * 20.0).x * 0.05;
		outColor.xyz += variation;
		outRoughness = 0.9;

	} else if( dist.mat == 2.0 ) {

		// きゅうり（緑色）
		float variation = noiseCyc(dist.pos * 25.0).x * 0.08;
		outColor.xyz += variation;
		outRoughness = 0.7;

	}

	// 距離に応じたフェードアウト
	outColor.xyz *= smoothstep( 2.0, 0.5, length( rayPos ) );

	#include <frag_out>

}
`;class sz extends Te{constructor(i){super(i);y(this,"mesh");const o=new _r({width:1,depth:1.3,height:.8,segmentsDepth:4,segmentsHeight:4,segmentsWidth:4});o.applyMatrix(new nt().setFromTransform(new Q(0,.2,0)));const s=new He({frag:Se("gunkanShariFrag",az),uniforms:Ce.merge(ie.resolution,ie.time,ie.tex)});this.mesh=this.entity.addComponent(me,{geometry:o,material:s}),hn(this.mesh.entity,this.mesh)}disposeImpl(){this._entity.removeComponent(me)}}const lz=`// @shader-file: src/resources/Components/Demo4/Ikura/IkuraGunKan/Ikura/shaders/ikura.fs
#include <common>\r
#include <packing>\r
#include <frag_h>\r
#include <light>\r
#include <pmrem>\r
\r
uniform sampler2D uEnvMap;\r
\r
// 頂点シェーダーから受け取るインスタンスID\r
in vec4 vId;\r
\r
void main( void ) {\r
\r
	#include <frag_in>\r
\r
	// イクラの基本色 - 透明なオレンジ色\r
	outColor.xyz = vec3(0.0);\r
	outRoughness = 0.15;\r
	outMetalic = 0.0;\r
\r
	#ifdef IS_FORWARD\r
\r
		vec3 viewNormal = normalize( vViewNormal );\r
\r
		#include <lighting_forwardIn>\r
\r
		vec2 uv = gl_FragCoord.xy / uResolution;\r
\r
		// フレネル効果\r
		float dnv = dot( geo.normal, geo.viewDir );\r
		float ef = fresnel( dnv );\r
\r
		// 屈折効果によるシーンテクスチャのサンプリング\r
		float nf = 1.0;\r
\r
		for( int i = 0; i < 16; i++ ) {\r
\r
			// 法線に基づいて屈折オフセットを計算\r
			vec2 v = -( viewNormal.xy ) * ( float( i + 1 ) / 4.0 * 0.015 + 0.05 );\r
			outColor.x += nf * texture( uDeferredTexture, uv + v * 1.0 ).x;\r
			outColor.y += nf * texture( uDeferredTexture, uv + v * 1.3 ).y;\r
			outColor.z += nf * texture( uDeferredTexture, uv + v * 1.6 ).z;\r
\r
		}\r
\r
		outColor.xyz /= 16.0;\r
\r
		// イクラの色味を加える（オレンジ系）\r
		outColor.xyz *= vec3( 0.7, 0.1, 0.0 );\r
		outColor.w = 1.0;\r
\r
		// フレネル効果でハイライト追加\r
		outColor.xyz += ef * 1.5;\r
\r
		#include <lighting_light>\r
		#include <lighting_env>\r
\r
	#endif\r
\r
	#include <frag_out>\r
\r
\r
}\r
`,uz=`// @shader-file: src/resources/Components/Demo4/Ikura/IkuraGunKan/Ikura/shaders/ikura.vs
#include <common>\r
#include <vert_h>\r
#include <rotate>\r
\r
layout (location = 4) in vec4 id;\r
\r
uniform float uTime;\r
uniform vec4 uState;\r
\r
// フラグメントシェーダーに渡す変数\r
out vec4 vId;\r
\r
void main( void ) {\r
\r
	#include <vert_in>\r
\r
	// 球のボリューム内のランダム座標を使用\r
	vec3 instancePos = id.yzw;\r
\r
	vec3 offsetPos = ( vec4( vec3(0.0, pow(instancePos.y, 2.0) * uState.x, 0.0 ), 1.0 ) * uModelMatrix ).xyz;\r
\r
	// スケール調整（球のサイズ）\r
	instancePos += offsetPos * 0.3 * id.x;\r
	instancePos *= 0.1;\r
\r
	// 上部に配置\r
	// instancePos.y += 0.15;\r
\r
	// イクラのサイズ（小さめの球体）\r
	outPos *= 0.06;\r
\r
	outPos += instancePos;\r
\r
	#include <vert_out>\r
\r
	// インスタンスIDをフラグメントシェーダーに渡す\r
	vId = id;\r
\r
}\r
`;class cz extends Te{constructor(i){super(i);y(this,"mesh");const o=150,s=new ir({radius:1,widthSegments:16,heightSegments:12}),d=Ur.randomSeed(1),c=[];for(let v=0;v<o;v++){const h=Ur.randomInSphere(2,d);h.z*=1.5,h.y=Math.abs(h.y)*1.5,c.push(v/o,h.x,h.y,h.z)}s.setAttribute("id",new Float32Array(c),4,{instanceDivisor:1}),this.mesh=this._entity.addComponent(me,{geometry:s,material:new He({phase:["forward","shadowMap"],vert:Se("ikuraVert",uz),frag:Se("ikuraFrag",lz),uniforms:Ce.merge(ie.time,ie.resolution)})}),hn(this.mesh.entity,this.mesh)}disposeImpl(){this._entity.removeComponent(me)}}class yf extends Te{constructor(i){super(i);y(this,"shariEntity");y(this,"ikuraEntity");this.shariEntity=new Ct;const o=this.shariEntity.addComponent(sz);this._entity.add(this.shariEntity),hn(this.entity,o.entity.getComponent(me)),this.ikuraEntity=new Ct;const s=this.ikuraEntity.addComponent(cz);this._entity.add(this.ikuraEntity),hn(this.entity,s.entity.getComponent(me))}dispose(){this.shariEntity.dispose(),this.ikuraEntity.dispose(),super.dispose()}}const dz=`// @shader-file: src/resources/Components/Demo4/Ikura/Kyuuri/shaders/kyuuri.fs
#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

uniform float uTime;

SDFResult D( vec3 p ) {

	vec3 pp = p;

	// きゅうりの基本形状 - カプセル
	float h = 0.8;
	float hh = h / 2.0;
	pp.y += hh;

	float r = 0.09;
	r *=  mix( 1.0, 0.7, linearstep( -hh, hh, ( p.y ) ));
	// r *=  mix( 1.0, 1.0, smoothstep( hh * 0.98, hh * 1.00, abs( p.y ) ));

	float wave = (sin( atan2( p.x, p.z ) * PI * 3.0 ) * 0.5 + 0.5);
	r *= mix( 1.0, 0.9, wave * smoothstep( hh, 0.0, abs( p.y ) ) );
	
	pp.x += cos( p.y * 2.0 ) * 0.04;
	
	float cylinder = sdVerticalCapsule(pp, h, r); // 高さ1.0、半径0.15のカプセル

	// 表面のイボイボ（ノイズで凹凸を追加）
	float bumps = noiseCyc(pp * 15.0 + uTime * 0.1).x * 0.005;

	// きゅうりの形状にイボイボを追加
	float d = cylinder - bumps;

	return SDFResult(
		d,
		p,
		0.0,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>



	#include <rm_loop,128,0.001,1.0>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	// きゅうりの緑色 - ベースカラーとイボイボで色の濃淡
	vec3 baseColor = vec3( 0.01, 0.3, 0.01 );
	vec3 noiseCyc = noiseCyc(rayPos * 10.0);
	float noiseVal = noiseValue(rayPos * 5.0);
	
	vec3 c = baseColor * mix( 1.0, 0., noiseVal );
	c = c * mix( 1.0, 0.5, noiseCyc.y );

	outRoughness = 0.4 + noiseCyc.y;
	outNormal = normalize( outNormal + noiseCyc.xyz * 0.4 );
	outMetalic = 0.1;

	outColor.xyz = c;
	outColor.xyz *= smoothstep( 1.5, 0.4, length( rayPos ) );

	#include <frag_out>

}
`;class fz extends Te{constructor(i){super(i);y(this,"mesh");const o=new ir({radius:.5}),s=new He({frag:Se("kyuuriFrag",dz),uniforms:Ce.merge(ie.resolution,ie.time)});this.mesh=this.entity.addComponent(me,{geometry:o,material:s}),hn(this.mesh.entity,this.mesh)}disposeImpl(){this._entity.removeComponent(me)}}const mz=`// @shader-file: src/resources/Components/Demo4/Maguro/Maguro/shaders/maguro.fs
#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <random>
#include <noise_cyclic>
#include <noise_value>
#include <rm_h>

uniform mat4 uModelViewMatrix;

uniform float uTimeE;
uniform sampler2D uNoiseTex;
uniform vec4 uState;
uniform float uParty;

// マグロの形状を定義
float maguro( vec3 p ) {

	vec3 maguroP = p;
	maguroP *= 0.8;

	float r = sin( -p.x - 0.3 + uTimeE * 1.0 ) * 0.5 * smoothstep( -1.0, 1.0, p.x );
	r = mix( r, sin( -p.x - 0.3 + uTimeE * 9.0 ) * 0.9, uParty );
	maguroP.xz *= rotate( r );


	// ボデー

	vec3 pp = maguroP;
	pp.z *= 1.2;
	float d = sdVesicaSegment( pp, vec3( -0.5, 0.0, 0.0 ), vec3( 0.5, 0.0, 0.0 ), 0.2 * cos(pp.x + 0.5) );

	// 口

	pp = maguroP;
	pp += vec3( 0.5, -0.05, 0.0 );
	d = opSmoothSub( sdTriPrism( pp, vec2(0.14, 0.2) ), d, 0.0 );

	// ヒレ下

	pp = maguroP;
	pp += vec3( -0.1, 0.09, 0.0 );
	pp.x += pp.y * 0.3;
	pp.xy *= rotate( PI);
	d = opSmoothAdd( sdTriPrism( pp, vec2(0.14, 0.01) ) - 0.002, d, 0.04 );

	// ヒレ上

	pp = maguroP;
	pp += vec3( -0.1, -0.2, 0.0 );
	pp.x *= 1.2;
	pp.x -= pow(pp.y, 2.0 ) * 2.0;
	d = opSmoothAdd( sdTriPrism( pp, vec2(0.10, 0.001) ) - 0.002, d, 0.04 );

	// ヒレ横

	pp = maguroP;
	pp.z = abs( pp.z );
	pp += vec3( -0.0, 0.01, -0.14 );
	pp.y += pow(pp.x, 2.0 ) * 1.0;
	pp.x += 0.03;
	pp.xz *= rotate( 0.5 + sin( uTimeE * 3.0 - pp.x * 5.0) * 0.2 );
	pp.x -= 0.03;
	pp.xy *= rotate( - 1.7 );
	pp.y *= 0.5;
	d = opSmoothAdd( sdTriPrism( pp, vec2(0.05, 0.001) ) - 0.002, d, 0.01 );

	// ヒレ後ろ

	pp = maguroP;
	pp.y = abs( pp.y );
	pp.x -= pow(pp.y, 2.0 ) * 1.3;
	pp += vec3( -0.5, -0.05, 0.0 );
	pp.y *= 0.24;

	d = opSmoothAdd( sdTriPrism( pp, vec2(0.03, 0.01) ) - 0.002, d, 0.04 );

	// ギザギザ

	pp = maguroP;
	pp.y = abs( pp.y );
	float w = cos( pp.x * PI );
	pp.y -= w * 0.17;
	pp.x = mod( pp.x, 0.05 ) - 0.025;
	float s = smoothstep( 0.15, 0.1, abs( maguroP.x - 0.3 ) );
	d = opSmoothAdd( sdTriPrism( pp, vec2(0.015 * s, 0.005 * s) ), d, 0.01 );

	return d;

}

// マグロブロックの形状を定義
float maguroBlock( vec3 p ) {

	vec3 blockP = p;
	blockP.x -= 0.03;
	blockP.y -= 0.06;
	blockP.x *= 1.2;
	blockP.z *= 1.5;
	blockP.x += texture( uNoiseTex, (blockP.xz + blockP.x)  * 0.4).x * 0.05;

	blockP.z += fract( length( (blockP.xy + vec2( -0.02, 0.0 )) * vec2( 1.0, 1.2 ) * (1.0 + length( blockP.xy ) * 1.5 ) ) * 40.0 ) * 0.002;

	vec3 pp = blockP;
	pp.yz *= rotate( HPI );
	pp.z += 0.89;
	float d = sdCappedCylinder( pp, 1.0, 0.2 );

	pp = blockP;
	pp.y += 0.14;
	pp.xy *= rotate( 0.5 );
	d = opAnd( d, sdBox( pp, vec3( 0.1 ) ) - 0.05 );
	d -= 0.01;

	pp = blockP;
	pp.z = abs(pp.z);
	pp.z -= 0.23;

	d = opSub( d, sdBox( pp, vec3( 1.0, 1.0, 0.1 ) ));

	return d;

}

SDFResult D( vec3 p ) {

	float mgr = maguro( p );
	mgr = opSmoothSub( sdBox( p + vec3( 1.8 - uState.x * 2.1, 0.0, 0.0 ), vec3( 1.0, 0.5, 0.5 ) ), mgr, 0.0 );

	float blk = maguroBlock( p * mix( 1.0 , 0.4, uState.y ) );
	blk = opSmoothSub( sdBox( p + vec3( -1.8 + uState.z * 2.1, 0.0, 0.0 ), vec3( 1.0, 0.5, 0.5 ) ), blk, 0.0 );


	float d = opSmoothAdd( mgr, blk, 0.10 );

	float matID = mgr < blk ? 0.0 : 1.0;

	return SDFResult(
		d,
		p,
		matID,
		vec4(0.0)
	);

}

#include <subsurface>
#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	SDFResult dist;
	bool hit = false;

	for( int i = 0; i < 128; i++ ) {

		if( uParty > 0.5 && i > 32 ) {
			break;
		}

		dist = D( rayPos );
		rayPos += dist.d * rayDir * 0.7;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	// ノイズテクスチャを取得
	vec2 noiseUV = rayPos.xy * 0.5 + 0.5;
	vec4 n1 = texture(uNoiseTex, noiseUV);
	vec4 n2 = texture(uNoiseTex, noiseUV * 4.0 );
	vec4 n3 = texture(uNoiseTex, noiseUV * 1.0 + n1.xy);

	float dnv = dot( rayDir, -outNormal.xyz );

	// マテリアルIDに応じた処理
	if( dist.mat < 0.5 ) {
		// マグロ本体 (mat=0.0)
		outRoughness = smoothstep( 0.2, 1.0, n1.r );
		outNormal = normalize( outNormal + n3.xyz * 0.3 );

		vec3 c = vec3( 1.0 );
		float kuro = smoothstep( 0.01 , 0.08, rayPos.y - cos( rayPos.x * PI + 0.15 ) * 0.06 - n2.x * 0.05 + 0.04 );
		c.xyz = mix(c, vec3( 0.0 ), kuro );
		outColor.xyz = c;
		outMetalic = 0.2;
	} else {

		// マグロブロック (mat=1.0)
		float sss = subsurface( rayPos, normalize( (vec4( 0.0, 1.0, 0.0, 0.0 ) * uModelViewMatrix).xyz ), 0.3);

		outRoughness = 0.5;
		outNormal = normalize( outNormal + n3.xyz * 0.1 );

		float kuro = smoothstep( 0.35, 0.1, length( rayPos.xy + vec2( -0.08, -0.11 ) ) );
		float kawal = length( rayPos.xy + vec2( -0.02, -1.27 ) );
		float kawa = smoothstep( 1.398, 1.415, kawal );
		float kawaSoto = smoothstep( 1.41, 1.43, kawal );

		outColor.xyz = mix( vec3( 1.0, 0.1, 0.1 ), vec3( 0.6, 0.0, 0.0 ), kuro );
		outEmission.xyz += vec3( 0.9, 0.1, 0.2 ) * sss * 1.7 * ( 1.0 - kawa);
		outMetalic = 0.0;
		outRoughness = 0.2;


		outColor.xyz = mix( outColor.xyz, vec3( 1.0, 0.7, 0.7 ), kawa );
		outColor.xyz = mix( outColor.xyz, vec3( 0.0 ), kawaSoto );
	}


	#include <frag_out>


}
`;class hz extends Te{constructor(l){super(l);const i=new _r({width:1.5,height:.8,depth:1}),o=new He({frag:Se("maguroFrag",mz),uniforms:Ce.merge(ie.resolution,ie.time,ie.tex)}),s=this.entity.addComponent(me,{geometry:i,material:o});hn(s.entity,s)}}const pz=`// @shader-file: src/resources/Components/Demo4/Music/shaders/music.fs
void main( void ) {}\r
`,vz=`// @shader-file: src/resources/Components/Demo4/Music/shaders/music.vs
#include <common>\r
#include <noise_value>\r
\r
in float aTime;\r
\r
out float o_left;\r
out float o_right;\r
\r
uniform float uDuration;\r
uniform float uSampleRate;\r
uniform float uTimeOffset;\r
\r
uniform float uBPM;\r
\r
// MARK: Utils\r
\r
/*-------------------------------\r
	Utils\r
-------------------------------*/\r
\r
float whiteNoise(float time)\r
{\r
    return fract(sin(dot(vec2( time ), vec2(12.9898,78.233))) * 43758.5453);\r
}\r
\r
float saw(float time){\r
\r
    return fract(-time)*2.-1.;\r
\r
}\r
\r
vec2 saw( vec2 time ) {\r
\r
	return vec2(\r
		saw( time.x ),\r
		saw( time.y )\r
	);\r
\r
}\r
\r
float tri(float time ){\r
    return abs(2.*fract(time*.5-.25)-1.)*2.-1.;\r
}\r
\r
float ssin(float time ) {\r
	return sin( time * TPI );\r
}\r
\r
vec2 ssin( vec2 time ) {\r
\r
	return vec2(\r
		ssin( time.x ),\r
		ssin( time.y )\r
	);\r
\r
}\r
\r
float s2f( float scale ){\r
\r
	return 440.0 * pow( 1.06, scale );\r
	\r
}\r
\r
bool isin( float time, float start, float end ) {\r
\r
	return start <= time && time < end;\r
	\r
}\r
\r
// ビート情報を計算する関数\r
// 戻り値:\r
//   x: 現在のビート内での経過時間（0.0 〜 beat）\r
//   y: 現在のビート番号（整数、0から始まる）\r
//   z: 現在のビート内での進行度（0.0 〜 1.0）\r
//   w: 開始からの総ビート数（小数、連続的に増加）\r
vec4 beat( float time, float beat ) {\r
\r
	float b = mod( time, beat );\r
\r
	return vec4(\r
		b,                   // x: ビート内経過時間\r
		floor( time / beat ), // y: ビート番号\r
		b / beat,            // z: ビート内進行度（正規化）\r
		time / beat          // w: 総ビート数\r
	);\r
\r
}\r
\r
// MARK: Base\r
\r
/*-------------------------------\r
	Base\r
-------------------------------*/\r
\r
// コード進行: Am - F - C - G\r
const float baseLine[] = float[](\r
	10.0, 6.0, 8.0, 3.0, 10.0, 6.0, 8.0, 3.0\r
);\r
\r
// グローバルなコード進行速度（climaxで変更される）\r
float g_chordSpeed = 1.0;\r
\r
\r
// MARK: Snare\r
\r
/*-------------------------------\r
	Snare\r
-------------------------------*/\r
\r
float snare( float et, float ft, float etw ) {\r
\r
	float o = 0.0;\r
\r
	et = fract( et );\r
\r
	float t = ft;\r
\r
	// より激しいスネアサウンド：減衰を速く、音量を大きく\r
	o += ( fbm( t * 3200.0 ) - 0.5 ) * exp( -250.0 * et * etw );\r
	o += ( fbm( t * 4800.0 ) - 0.5 ) * exp( -300.0 * et * etw ) * 0.5; // 高域のノイズを追加\r
\r
	o *= 1.0; // 音量を上げる\r
\r
	return o;\r
\r
}\r
\r
\r
vec2 snare2( float mt, float ft ) {\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	vec4 bt = beat( mt, 2.0 );\r
\r
	o += snare( bt.z - (0.5), fract( ft ), 0.25 );\r
\r
	return o * 1.0; // より激しく\r
\r
}\r
\r
// ランダムなスネアパターン\r
vec2 snare3( float mt, float ft ) {\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	vec4 b2 = beat( mt, 2.0 );\r
	vec4 b4 = beat( mt, 4.0 );\r
\r
	// 16分音符でランダムに刻む\r
	for(int i = 0; i < 16; i++){\r
\r
		float l = b2.z - float(i) / 16.0;\r
\r
		// ランダムに鳴らす\r
		float rand = whiteNoise( b2.y * 200.0 + float(i) );\r
		float threshold = 0.5; // 50%の確率で鳴らす\r
\r
		// 基本のバックビート（2拍目と4拍目）は必ず鳴らす\r
		bool isBackbeat = (i == 8); // 裏拍\r
		bool shouldPlay = isBackbeat || (rand > threshold);\r
\r
		if( shouldPlay ) {\r
			float volume = isBackbeat ? 1.2 : (0.5 + rand * 0.5); // ランダムな音量\r
			o += snare( l, fract( ft ), isBackbeat ? 1.0 : 1.5 ) * volume;\r
		}\r
\r
	}\r
\r
	return o * 0.9;\r
\r
}\r
\r
// MARK: Hihat\r
\r
/*-------------------------------\r
	Hihat\r
-------------------------------*/\r
\r
float hihat( float et ) {\r
\r
	et = fract( et );\r
	return noiseValue( vec3( et * 22000.0 ) ) * max( 0.0, 1.0 - min( 0.85, et * 4.25 ) - ( et - 0.25 ) * 0.3 );\r
\r
}\r
\r
vec2 hihat1( float mt ) {\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	vec4 b16 = beat( mt * 16.0 , 4.0 );\r
\r
	// 16分音符でランダムに鳴らす\r
	o += hihat( b16.z ) * ( step( 0.4, whiteNoise( b16.y ) ) * 0.5 + 0.5 );\r
	o += hihat( b16.z - 0.5 ) * step( 0.5, whiteNoise( b16.y * 10.0 + 0.1 ) );\r
\r
	return o * 0.02;\r
\r
}\r
\r
// MARK: Kick\r
\r
/*-------------------------------\r
	Kick\r
-------------------------------*/\r
\r
\r
float deepKick( float et, float ft ) {\r
\r
	float envTime = fract( et );\r
\r
	float t = ft;\r
	t -= 0.05 * exp( -100.0 * envTime );\r
\r
	float o = sin( t * s2f( 5.0 ) ) * exp( - 20.0 * envTime );\r
	o *= smoothstep( 0.0, 0.0005, envTime);\r
	o *= 0.3;\r
\r
    return o;\r
\r
}\r
\r
float lightKick( float et, float ft ) {\r
\r
	float envTime = fract( et );\r
\r
	float t = ft;\r
	t -= 0.06 * exp( -100.0 * envTime );\r
\r
	float o = sin( t * s2f( 2.0 ) ) * exp( - 50.0 * envTime );\r
	o *= smoothstep( 0.0, 0.0005, envTime);\r
	o *= 0.3;\r
\r
    return o;\r
\r
}\r
\r
// より激しく重いキック - deepとlightの両方の特性を持つ - だだだだ専用\r
float hardKick( float et, float ft ) {\r
\r
	float envTime = fract( et );\r
\r
	float t = ft;\r
	// 適度なピッチベンド\r
	t -= 0.08 * exp( -100.0 * envTime );\r
\r
	// 低音と中音の両方を混ぜる\r
	float o = sin( t * s2f( 5.0 ) ) * exp( - 30.0 * envTime ); // 重低音\r
	o += sin( t * s2f( 8.0 ) ) * exp( - 45.0 * envTime ) * 0.5; // パンチ感のある中音\r
	o += sin( t * s2f( 12.0 ) ) * exp( - 60.0 * envTime ) * 0.25; // アタック音\r
\r
	o *= smoothstep( 0.0, 0.008, envTime);\r
	o *= 0.25; // 音量控えめに\r
\r
	return o;\r
\r
}\r
\r
vec2 kick1( float mt, float ft ) {\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	vec4 b4 = beat( mt, 4.0 );\r
	vec4 b8 = beat( mt, 8.0 );\r
\r
	for(int i = 0; i < 3; i++){\r
\r
		float l = b4.z - float(i) / ( 16.0 / 3.0 );\r
\r
		if( i != 2 || b8.z > 0.5 ) {\r
\r
			o += deepKick( l, ft );\r
\r
		}\r
\r
	}\r
\r
	return o * 1.15; // より激しく\r
\r
}\r
\r
\r
vec2 kick2( float mt, float ft ) {\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	vec4 b4 = beat( mt, 4.0 );\r
	vec4 b8 = beat( mt, 8.0 );\r
\r
	for(int i = 0; i < 6; i++){\r
\r
		float l = b4.z - float(i) / ( 16.0 / 3.0 );\r
\r
		if( i != 2 || b8.z > 0.5 ) {\r
\r
			o += lightKick( l, ft );\r
\r
		}\r
\r
	}\r
\r
	return o * 1.15; // より激しく\r
\r
}\r
\r
// より激しいhardKickを使用したkick3 - ランダムなパターン\r
vec2 kick3( float mt, float ft ) {\r
\r
	vec2 o = vec2( 0.0 );\r
	vec4 b2 = beat( mt, 2.0 );\r
\r
	// ランダムなキックパターン - 16分音符ベース\r
	for(int i = 0; i < 16; i++){\r
\r
		float l = b2.z - float(i) / 16.0;\r
		float rand = whiteNoise( b2.y * 100.0 + float(i) );\r
		float threshold = 0.35; // 35%の確率で鳴らす\r
\r
		// 特定の位置では必ず鳴らす（基本ビート）\r
		bool isBasicBeat = (i % 4 == 0);\r
		bool shouldPlay = isBasicBeat || (rand > threshold);\r
\r
		if( shouldPlay ) {\r
			float volume = isBasicBeat ? 1.0 : (0.6 + rand * 0.4); // ランダムな音量\r
			o += hardKick( l, ft ) * volume;\r
		}\r
\r
	}\r
\r
	return o * 0.85; // 音量調整\r
\r
}\r
\r
float getFrec( float t, float m, vec4 b8 ) {\r
\r
	return t - ( m * 16.0 + max( 0.0, b8.y - m * 2.0 ) * 8.0 ) * ( 60.0 / uBPM ) ;\r
\r
}\r
\r
// MARK: Arpeggio\r
\r
/*-------------------------------\r
	Arpeggio - キラキラしたアルペジオ\r
-------------------------------*/\r
\r
vec2 arpeggio( float mt, float ft, float pitch ) {\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	vec4 b32 = beat( mt, 32.0 );\r
\r
	// アルペジオパターン: 上昇→下降\r
	int notes[] = int[]( 0, 4, 7, 12, 7, 4 );\r
	int noteIndex = int( mod( floor( mt * 4.0 ), 6.0 ) );\r
\r
	float scale = baseLine[ int( mod( b32.x / 4.0 * g_chordSpeed, 8.0 ) ) ];\r
	float note = scale + float( notes[noteIndex] ) + pitch;\r
\r
	float envTime = fract( mt * 4.0 );\r
	float env = exp( -envTime * 8.0 );\r
	env *= smoothstep( 0.0, 0.005, envTime );\r
\r
	// ディチューンで厚みを出す\r
	for( int i = 0; i < 2; i++ ) {\r
		float detune = float(i) * 0.003;\r
		o += ssin( ft * s2f( note ) * ( 1.0 + detune ) + vec2( float(i) * 0.3, 0.0 ) ) * env;\r
	}\r
\r
	return o * 0.08;\r
\r
}\r
\r
// アルペジオバリエーション1: 速い16分音符パターン\r
vec2 arpeggio_fast( float mt, float ft, float pitch ) {\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	vec4 b32 = beat( mt, 32.0 );\r
\r
	// 速いパターン: 16分音符\r
	int notes[] = int[]( 0, 4, 7, 12 );\r
	int noteIndex = int( mod( floor( mt * 8.0 ), 4.0 ) );\r
\r
	float scale = baseLine[ int( mod( b32.x / 4.0 * g_chordSpeed, 8.0 ) ) ];\r
	float note = scale + float( notes[noteIndex] ) + pitch;\r
\r
	float envTime = fract( mt * 8.0 );\r
	float env = exp( -envTime * 12.0 );\r
	env *= smoothstep( 0.0, 0.003, envTime );\r
\r
	// シンプルな波形\r
	o += ssin( ft * s2f( note ) ) * env;\r
\r
	// ステレオ効果\r
	float pan = float(noteIndex) / 4.0;\r
	o.x *= 1.0 + pan * 0.3;\r
	o.y *= 1.0 - pan * 0.3;\r
\r
	return o * 0.06;\r
\r
}\r
\r
// MARK: Pad\r
\r
/*-------------------------------\r
	Pad - 温かいパッドサウンド\r
-------------------------------*/\r
\r
vec2 pad( float mt, float ft, float pitch ) {\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	vec4 b32 = beat( mt, 32.0 );\r
\r
	// g_chordSpeedを反映したコード進行を取得\r
	int chordIndex = int( mod( b32.x / 4.0 * g_chordSpeed, 8.0 ) );\r
	float scale = baseLine[ chordIndex ];\r
\r
	float envTime = fract( b32.z / 4.0 );\r
	float env = smoothstep( 0.0, 0.01, envTime ) * smoothstep( 1.0, 0.7, envTime );\r
\r
	// コード進行に合わせたボイシング\r
	int chord[3];\r
	if( chordIndex == 0 || chordIndex == 4 ) {\r
		// マイナーコード\r
		chord[0] = 0; chord[1] = 3; chord[2] = 7;\r
		chord[0] = 0; chord[1] = 4; chord[2] = 7;\r
\r
	} else {\r
		// メジャーコード\r
		chord[0] = 0; chord[1] = 4; chord[2] = 7;\r
	}\r
\r
	for( int i = 0; i < 3; i++ ) {\r
		float note = scale + float( chord[i] ) + pitch - 12.0;\r
\r
		// 複数のオシレーターでリッチなサウンド\r
		for( int j = 0; j < 3; j++ ) {\r
			float detune = ( float(j) - 1.0 ) * 0.004;\r
			float phase = float(j) * 0.2;\r
			o += ssin( ft * s2f( note ) * ( 1.0 + detune ) + phase ) * env;\r
		}\r
	}\r
\r
	// ステレオ広がり\r
	float pan = ssin( mt * 0.1 ) * 0.5;\r
	o.x *= 1.0 + pan;\r
	o.y *= 1.0 - pan;\r
\r
	return o * 0.03;\r
\r
}\r
\r
// MARK: Stab\r
\r
/*-------------------------------\r
	Stab - 激しいシンセスタブ（Climax用）\r
-------------------------------*/\r
\r
vec2 stab( float mt, float ft, float pitch ) {\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	vec4 b32 = beat( mt, 32.0 );\r
	vec4 b8 = beat( mt, 8.0 );\r
\r
	// 16分音符で細かく刻む「てけてけとことこ」パターン\r
	float envTime = fract( mt * 4.0 ); // 16分音符\r
\r
	// 非常に速いアタック、素早いリリース\r
	float env = exp( -envTime * 30.0 );\r
	env *= smoothstep( 0.0, 0.001, envTime );\r
\r
	// ピッチベンド: 上がって下がる効果\r
	float pitchBend = 0.0;\r
	if( envTime < 0.08 ) {\r
		// 最初で急上昇\r
		pitchBend = 7.0 * ( envTime / 0.08 );\r
	} else {\r
		// その後すぐに元に戻る\r
		pitchBend = 7.0 * exp( -( envTime - 0.08 ) * 20.0 );\r
	}\r
\r
	// 16分音符ごとにコード進行パターンを細かく変える\r
	int noteIndex = int( mod( floor( mt * 4.0 ), 8.0 ) );\r
\r
	// 「てけてけとことこ」メロディパターン: 上下に動く\r
	int pattern[8] = int[]( 0, 4, 7, 4, 0, -3, 0, 4 );\r
\r
	// ベースとなるコード進行\r
	int chordIndex = int( b32.x / 4.0 ) % 8;\r
	float scale = baseLine[ chordIndex ];\r
\r
	// パターンからオフセットを取得\r
	float note = scale + float( pattern[noteIndex] ) + pitch + pitchBend;\r
\r
	// コード進行に合わせたボイシング（簡略化）\r
	int chord[3];\r
	if( chordIndex == 0 || chordIndex == 4 ) {\r
		// マイナーコード\r
		chord[0] = 0; chord[1] = 3; chord[2] = 7;\r
	} else {\r
		// メジャーコード\r
		chord[0] = 0; chord[1] = 4; chord[2] = 7;\r
	}\r
\r
	// コードトーンを重ねる\r
	for( int i = 0; i < 3; i++ ) {\r
		float chordNote = note + float( chord[i] );\r
\r
		// 複数のオシレーターで厚み\r
		for( int j = 0; j < 2; j++ ) {\r
			float detune = float(j) * 0.004;\r
			float phase = float(j) * 0.1;\r
\r
			// サイン波とノコギリ波を混ぜる\r
			float sine = ssin( ft * s2f( chordNote ) * ( 1.0 + detune ) + phase );\r
			float sawWave = saw( ft * s2f( chordNote ) * ( 1.0 + detune ) );\r
\r
			// ハードクリッピングで歪みを追加\r
			float wave = mix( sine, sawWave, 0.4 );\r
			wave = clamp( wave * 1.5, -0.7, 0.7 );\r
\r
			o += vec2( wave ) * env / float(i + 1);\r
		}\r
	}\r
\r
	// PWM（パルス幅変調）的な効果を追加\r
	float pwmMod = sin( ft * 3.0 ) * 0.5 + 0.5;\r
	o *= 0.8 + pwmMod * 0.2;\r
\r
	// ステレオで左右に細かく振る\r
	float pan = float(noteIndex) / 4.0 - 1.0;\r
	o.x *= 1.0 + pan * 0.6;\r
	o.y *= 1.0 - pan * 0.6;\r
\r
	return o * 0.08;\r
\r
}\r
\r
// MARK: Bass\r
\r
/*-------------------------------\r
	Bass - ベースライン\r
-------------------------------*/\r
\r
// 低音で厚みのあるベースサウンド\r
vec2 bass( float mt, float ft, float pitch ) {\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	vec4 b32 = beat( mt, 32.0 );\r
\r
	// コード進行に合わせたベース音階\r
	float scale = baseLine[ int( mod( b32.x / 4.0 * g_chordSpeed, 8.0 ) ) ];\r
	float note = scale + pitch - 12.0 * 3.0; // 3オクターブ下\r
\r
	float envTime = fract( mt * 0.25 );\r
	float env = exp( -envTime * 3.0 );\r
	env *= smoothstep( 0.0, 0.01, envTime );\r
\r
	// 複数のオシレーターで厚みのあるベースサウンド\r
	for( int i = 0; i < 4; i++ ) {\r
		float detune = float(i) * 0.01; // デチューンで厚みを出す\r
		float harmonic = float(i + 1); // 倍音を追加\r
		float wave = ssin( ft * s2f( note ) );\r
		o += wave * env / harmonic;\r
	}\r
\r
	// ステレオで左右にゆっくり振る\r
	float pan = sin( mt * 8.0 );\r
	o.x *= 1.0 + pan * 0.3;\r
	o.y *= 1.0 - pan * 0.3;\r
\r
	return o * 0.05;\r
\r
}\r
\r
// Climax用: 「だっだっだっ」リズミカルベース\r
vec2 rhythmicBass( float mt, float ft, float pitch ) {\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	vec4 b32 = beat( mt, 32.0 );\r
\r
	// コード進行に合わせたベース音階\r
	float scale = baseLine[ int( mod( b32.x / 4.0 * g_chordSpeed, 8.0 ) ) ];\r
\r
	// 16分音符で「だっだっだっ」と刻む\r
	float envTime = fract( mt * 4.0 );\r
\r
	// 鋭いアタック、速い減衰で「だっ」感を出す\r
	float env = exp( -envTime * 2.0 );\r
	env *= smoothstep( 0.0, 0.003, envTime );\r
\r
	// 16分音符ごとのパターン: 4つで1セット\r
	int noteIndex = int( mod( floor( mt * 4.0 ), 4.0 ) );\r
	int pattern[4] = int[]( 0, 0, 0, 7 ); // ルート3回 + 5度上1回\r
\r
	float note = scale + float( pattern[noteIndex] ) + pitch - 12.0 * 3.0;\r
\r
	// 太くてパンチのあるベース音\r
	for( int i = 0; i < 4; i++ ) {\r
		float harmonic = float(i + 1);\r
		// サイン波とノコギリ波をブレンドして太く\r
		float sine = ssin( ft * s2f( note - 12.0 ) * harmonic\r
		 );\r
		float sawWave = tri( ft * s2f( note ) * harmonic );\r
		float wave = mix( sine, sawWave, 0.5 );\r
\r
		o += vec2( wave ) * env / (harmonic * 0.8);\r
	}\r
\r
	// ステレオで左右に細かく振る\r
	float pan = float(noteIndex) / 4.0 - 0.5;\r
	o.x *= 1.0 + pan * 0.3;\r
	o.y *= 1.0 - pan * 0.3;\r
\r
	return o * 0.2;\r
\r
}\r
\r
// MARK: Lead Synth\r
\r
/*-------------------------------\r
	Lead Synth - 印象的なメロディライン\r
-------------------------------*/\r
\r
// リードシンセのメロディパターン: クライマックスのメロディライン\r
vec2 leadSynth( float mt, float ft, float pitch ) {\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	vec4 b32 = beat( mt, 32.0 );\r
	vec4 b4 = beat( mt, 4.0 );\r
\r
	// メロディパターン: 32分音符ベースの「てけてけ」メロディ\r
	vec4 b2 = beat( mt, 2.0 );\r
\r
	// 32分音符のパターン: 連続的に音階を上下させる\r
	// 8音のパターンを繰り返す「てけてけ」フレーズ\r
	int pattern[8] = int[]( 0, 4, 7, 4, 0, -5, 0, 4 );\r
\r
	// コード進行に合わせてベース音を取得\r
	float scale = baseLine[ int( mod( b32.x / 4.0 * g_chordSpeed, 8.0 ) ) ];\r
\r
	// 32分音符のインデックス（1小節で8音）\r
	int noteIndex = int(mod(b2.w * 8.0, 8.0));\r
\r
	// パターンからオフセットを取得してメロディを構成\r
	float note = scale + float( pattern[noteIndex] ) + pitch + 12.0;\r
\r
	// エンベロープ: 32分音符ごとの素早いアタック/リリース\r
	float envTime = fract( b2.w * 8.0 );\r
	float env = exp( -envTime * 16.0 ); // 非常に速い減衰で「てけてけ」感\r
	env *= smoothstep( 0.0, 0.002, envTime ); // 極めて速いアタック\r
\r
	// リッチな音色: 複数のオシレーターとディチューン\r
	for( int i = 0; i < 3; i++ ) {\r
		float detune = (float(i) - 1.0) * 0.003;\r
		float harmonic = 1.0 + float(i) * 0.5;\r
\r
		// サイン波とノコギリ波のブレンド\r
		float phase = float(i) * 0.1;\r
		float sine = ssin( ft * s2f( note ) * (1.0 + detune) + phase );\r
		float sawWave = saw( ft * s2f( note ) * (1.0 + detune) );\r
\r
		o += vec2( mix( sine, sawWave * 0.5, 0.3 ) * env / harmonic );\r
	}\r
\r
	// ビブラート効果（揺らぎ）\r
	float vibrato = sin( ft * 5.0 ) * 0.002;\r
	o *= 1.0 + vibrato;\r
\r
	// ステレオエフェクト: ノートごとに左右に配置\r
	float pan = float(noteIndex) / 4.0;\r
	o.x *= 1.0 + pan * 0.4;\r
	o.y *= 1.0 - pan * 0.4;\r
\r
	return o * 0.12;\r
\r
}\r
\r
// MARK: Main Composition\r
\r
/*-------------------------------\r
	Main Composition\r
-------------------------------*/\r
\r
vec2 music( float t ) {\r
\r
	float mt = t * (uBPM / 60.0);\r
	mt = max( 0.0, mt - 4.0 );\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	vec4 beat4 = beat( mt, 4.0 );\r
	vec4 beat8 = beat( mt, 8.0 );\r
	vec4 beat16 = beat( mt, 16.0 );\r
\r
	// Section A: Intro - シンプルなアルペジオとパッド (1小節)\r
	if( isin( beat16.y, 0.0, 1.0 ) ) {\r
\r
		t = getFrec( t, 0.0, beat8 );\r
		o += arpeggio( mt, t, 0.0 );\r
		o += pad( mt, t, 0.0 ) * 0.3;\r
	}\r
\r
	// Section B: Intro Buildup - キックとハイハット導入 (1小節)\r
\r
	if( isin( beat16.y, 1.0, 2.0 ) ) {\r
\r
		t = getFrec( t, 1.0, beat8 );\r
		o += arpeggio( mt, t, 0.0 );\r
		o += arpeggio( mt, t, 12.0 ) * 0.5;\r
		o += kick1( mt, t );\r
		o += pad( mt, t, 0.0 ) * 0.6;\r
\r
	}\r
\r
	// Section C: Transition - 転換セクション、スネアロールとミュート効果 (1小節)\r
\r
	if( isin( beat4.y, 8.0, 9.0 ) ) {\r
\r
		t = getFrec( t - 16.0, 0.0, beat8 );\r
\r
		vec2 tenkan = vec2(0.0);\r
\r
		tenkan += arpeggio( mt, t, -12.0 );\r
\r
		float mute = step( beat8.x, 2.0 - 0.0 );\r
		tenkan *= mute;\r
\r
		o += snare2( mt, t ) * 0.8 * (1.0 - mute );\r
\r
		o += tenkan;\r
\r
	}\r
\r
	// Section D: Main Drop 1 - フルアレンジメント登場、徐々にレイヤー追加 (4小節)\r
\r
	mt -= 36.0;\r
\r
	beat4 = beat( mt, 4.0 );\r
	beat8 = beat( mt, 8.0 );\r
	beat16 = beat( mt, 16.0 );\r
\r
	if( isin( beat16.y, 0.0, 4.0 ) ) {\r
\r
		t = getFrec( t, 0.0, beat8 );\r
\r
		vec2 sum = vec2(0.0);\r
		sum += kick2( mt, t ) * 1.2;\r
		sum += snare2( mt, t ) * 0.8;\r
		sum += pad( mt, t, 0.0 ) * 0.6;\r
		sum += bass( mt, t, 0.0 ); // ベースライン\r
		sum += arpeggio( mt, t, 0.0 );\r
\r
\r
		if( beat16.y >= 1.0 ) {\r
			sum += arpeggio( mt, t, 12.0 ) * 0.5;\r
		}\r
\r
		if( beat16.y >= 2.0 ) {\r
			sum += pad( mt, t, 0.0 ) * 0.4;\r
		}\r
\r
		o += sum * smoothstep( 4.0, 3.98, beat16.w );\r
\r
	}\r
\r
	// Section E: Bridge - ブレイクダウンとビルドアップ (3小節)\r
\r
	mt -= 65.0;\r
	beat4 = beat( mt, 4.0 );\r
	beat8 = beat( mt, 8.0 );\r
	beat16 = beat( mt, 16.0 );\r
\r
	// Section E-1: Breakdown - パッドのみ、静寂の瞬間 (1小節)\r
	if( isin( beat16.y, 0.0, 1.0 ) ) {\r
\r
		t = getFrec( t, 6.0, beat8 );\r
		o += pad( mt, t, 0.0 ) * 0.6;\r
\r
	}\r
\r
	// Section E-2: Buildup - 速いアルペジオで緊張感を高める (2小節)\r
	if( isin( beat16.y, 1.0, 3.0 ) ) {\r
\r
		vec2 sum = vec2(0.0);\r
\r
		t = getFrec( t, 6.0, beat8 );\r
		sum += arpeggio( mt, t, -12.0 ) * 0.8;\r
		sum += arpeggio_fast( mt, t, 0.0 ) * 1.2;\r
		sum += arpeggio( mt, t, 12.0 ) * 0.6;\r
		sum += snare2( mt, t ) * 0.5;\r
		sum += hihat1( mt ) * 0.8;\r
		sum += pad( mt, t, 0.0 ) * 0.6;\r
\r
		o += sum * smoothstep( 2.75, 2.740, beat16.w);\r
\r
	}\r
\r
	// Section F: Main Drop 2 - 最高潮、速いアルペジオとガーガー音 (6小節)\r
\r
	mt -= 48.0;\r
	beat4 = beat( mt, 4.0 );\r
	beat8 = beat( mt, 8.0 );\r
	beat16 = beat( mt, 16.0 );\r
\r
	// Section F-1: Climax - フルパワー、全要素が揃う (4小節)\r
	if( isin( beat16.y, 0.0, 3.0 ) ) {\r
\r
		// Climaxではコード進行を倍速に\r
		g_chordSpeed = 1.0;\r
\r
		t = getFrec( t, 0.0, beat8 );\r
\r
		float pitch = 0.0;\r
\r
		vec2 sum = vec2(0.0);\r
		sum += kick3( mt, t ) * 1.0; // だだだだっちゃだだだだのkick3\r
		sum += snare3( mt, t ); // 「っちゃ」部分のsnare3\r
		sum += hihat1( mt ); // ハイハットも強調\r
		sum += bass( mt, t, pitch ); // climaxでリズミカルに\r
		sum += arpeggio_fast( mt, t, pitch ) * 1.2;\r
		sum += arpeggio( mt, t, pitch + 12.0 ) * 0.6;\r
		sum += arpeggio_fast( mt, t, pitch ) * 1.2;\r
		sum += rhythmicBass( mt, t, pitch ); // climaxでリズミカルに\r
\r
\r
		// シンセスタブで激しさを追加（8分音符で鋭く刺さる）\r
		sum += stab( mt, t, pitch + 0.0 ) * 0.5;\r
\r
		// クライマックスのメロディライン追加（コード進行倍速）\r
		sum += leadSynth( mt, t, pitch );\r
\r
		o += sum;\r
\r
	}\r
\r
	// Section F-2: Outro - 静かに終わる (2小節)\r
	if( isin( beat16.y, 3.0, 5.0 ) ) {\r
\r
		// 通常速度に戻す\r
		g_chordSpeed = 1.0;\r
\r
		t = getFrec( t, 0.0, beat8 );\r
\r
		vec2 sum = vec2(0.0);\r
		sum += bass( mt, t, 0.0 );\r
		o += arpeggio_fast( mt, t, 0.0 ) * 1.2;\r
		sum += pad( mt, t, 0.0 ) * 0.4;\r
\r
		// アウトロにも控えめなメロディライン\r
		sum += leadSynth( mt, t, 0.0 ) * 0.4;\r
\r
		o += sum;\r
\r
	}\r
	\r
	return o;\r
\r
}\r
\r
void main( void ) {\r
\r
	float time = (aTime / uSampleRate ) + uTimeOffset;\r
\r
	vec2 o = music( time );\r
	\r
\r
	o_left = o.x;\r
	o_right = o.y;\r
\r
}`,t_=100,uf=60*(8*33/t_);class n_ extends Te{constructor(i){super(i);y(this,"power");y(this,"gl");y(this,"isAudioBufferReady");y(this,"audioContext");y(this,"audioBuffer");y(this,"implusBuffer");y(this,"audioSrcNode");y(this,"convolverNode");y(this,"gainNode");y(this,"analyser");y(this,"frequencyData");y(this,"frequencyTexture");y(this,"bufferLength");y(this,"blockLength");y(this,"numSampleBlocks");y(this,"bufferIn");y(this,"bufferL");y(this,"bufferR");y(this,"tmpOutputArrayL");y(this,"tmpOutputArrayR");y(this,"progress");y(this,"timeCode");y(this,"playStartTime");y(this,"forcePlay");y(this,"currentRender");this.power=HM,this.gl=this.power.gl,this.audioSrcNode=null,this.isAudioBufferReady=!1,this.timeCode=0,this.playStartTime=-1,this.forcePlay=!1,this.audioContext=new AudioContext,this.bufferLength=Math.floor(this.audioContext.sampleRate*uf),this.progress=[0,0];let o=1024;o=512*256,this.blockLength=Math.min(o,this.bufferLength),this.numSampleBlocks=Math.ceil(this.audioContext.sampleRate*uf/this.blockLength),this.tmpOutputArrayL=new Float32Array(this.blockLength),this.tmpOutputArrayR=new Float32Array(this.blockLength),this.audioBuffer=this.audioContext.createBuffer(2,this.bufferLength,this.audioContext.sampleRate),this.bufferIn=new df(this.gl),this.bufferIn.setData(new Float32Array(new Array(this.blockLength).fill(0).map((c,v)=>v)),"vbo"),this.bufferL=new df(this.gl),this.bufferL.setData(new Float32Array(this.bufferLength),"vbo",this.gl.DYNAMIC_COPY),this.bufferR=new df(this.gl),this.bufferR.setData(new Float32Array(this.bufferLength),"vbo",this.gl.DYNAMIC_COPY),this.currentRender=this.render(),this.implusBuffer=this.audioContext.createBuffer(2,this.audioContext.sampleRate*1.5,this.audioContext.sampleRate);for(let c=0;c<this.implusBuffer.length;c++){const v=c/this.implusBuffer.length;this.implusBuffer.getChannelData(0)[c]=(Math.random()*2-1)*.9*Math.exp(-v*7),this.implusBuffer.getChannelData(1)[c]=(Math.random()*2-1)*.9*Math.exp(-v*7)}this.convolverNode=this.audioContext.createConvolver(),this.convolverNode.buffer=this.implusBuffer,this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=1.3,this.analyser=this.audioContext.createAnalyser(),this.analyser.fftSize=512,this.frequencyData=new Uint8Array(this.analyser.frequencyBinCount),this.frequencyTexture=new rt(this.gl),this.frequencyTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.CLAMP_TO_EDGE,wrapT:this.gl.CLAMP_TO_EDGE}),this.frequencyTexture.attach({width:this.analyser.frequencyBinCount,height:1,data:this.frequencyData}),ie.music.uMusicFreqTex.value=this.frequencyTexture;const s=ct.getInstance(We),d=s.renderer&&s.renderer.deferredRenderer;d&&Ce.assign(d.shading.uniforms,ie.music),ct.getInstance(We).registerMusic(this)}render(){this.progress=[0,0],this.currentRender&&this.currentRender.stop(),this.stop(),this.isAudioBufferReady=!1;const i=new Pb(this.gl),o=new MN(this.gl);o.setBuffer("left",this.bufferL,0),o.setBuffer("right",this.bufferR,1),o.bind(()=>{i.setShader(pf(Se("music",vz)),pf(pz),{transformFeedbackVaryings:["o_left","o_right"]})}),i.setUniform("uDuration","1f",[uf]),i.setUniform("uBPM","1f",[t_]),i.setUniform("uSampleRate","1f",[this.audioContext.sampleRate]);const s=i.getVAO();let d=!0;const c=()=>{d=!1};if(s){s.setAttribute("aTime",this.bufferIn,1);{const v=Math.floor(this.timeCode/(this.bufferLength/this.audioBuffer.sampleRate/this.numSampleBlocks));(async()=>{for(let p=0;p<this.numSampleBlocks;p++){let _;if(p%2===0?_=v+Math.floor(p/2):_=v-Math.ceil(p/2),_>=this.numSampleBlocks?_=_-this.numSampleBlocks:_<0&&(_=_+this.numSampleBlocks),await new Promise(S=>{setTimeout(()=>{this.isAudioBufferReady=!0,S(null)},100)}),!d)return;i.setUniform("uTimeOffset","1f",[this.blockLength*_/this.audioContext.sampleRate]),i.use(()=>{i.uploadUniforms(),o.use(()=>{this.gl.beginTransformFeedback(this.gl.POINTS),this.gl.enable(this.gl.RASTERIZER_DISCARD),s.use(()=>{this.gl.drawArrays(this.gl.POINTS,0,s.vertCount)}),this.gl.disable(this.gl.RASTERIZER_DISCARD),this.gl.endTransformFeedback()}),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.bufferL.buffer),this.gl.getBufferSubData(this.gl.ARRAY_BUFFER,0,this.tmpOutputArrayL),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.bufferR.buffer),this.gl.getBufferSubData(this.gl.ARRAY_BUFFER,0,this.tmpOutputArrayR),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null);for(let S=0;S<this.blockLength;S++){const T=_*this.blockLength+S,C=T<uf*this.audioContext.sampleRate?1:0;this.audioBuffer.getChannelData(0)[T]=this.tmpOutputArrayL[S]*C,this.audioBuffer.getChannelData(1)[T]=this.tmpOutputArrayR[S]*C}}),this.progress=[p,this.numSampleBlocks-1],this.notice()}})()}}return{stop:c}}updateImpl(i){if(this.timeCode=i.timeCode,!i.playing||i.timeCode<0){this.stop();return}this.play(i.timeCode,this.forcePlay),this.forcePlay=!1,this.analyser&&this.frequencyData&&this.frequencyTexture&&i.playing&&(this.analyser.getByteFrequencyData(this.frequencyData),this.frequencyTexture.attach({width:this.analyser.frequencyBinCount,height:1,data:this.frequencyData}))}notice(){queueMicrotask(()=>{this.entity&&this.emit("update/music",[this.audioBuffer,this.progress])})}play(i=0,o){this.audioSrcNode&&!o&&Math.abs(this.audioSrcNode.context.currentTime-this.playStartTime-i)<.1||(this.stop(),this.isAudioBufferReady&&(this.audioSrcNode=this.audioContext.createBufferSource(),this.audioSrcNode.buffer=this.audioBuffer,this.audioSrcNode.loop=!1,this.audioSrcNode.start(0,i),this.playStartTime=this.audioSrcNode.context.currentTime-(i||0),this.audioSrcNode.connect(this.gainNode),this.audioSrcNode.connect(this.convolverNode),this.convolverNode.connect(this.gainNode),this.gainNode.connect(this.audioContext.destination),this.analyser&&this.gainNode.connect(this.analyser)))}stop(){this.audioSrcNode&&(this.audioSrcNode.stop(),this.audioSrcNode.disconnect(this.gainNode),this.audioSrcNode=null),this.convolverNode&&this.convolverNode.disconnect()}dispose(){super.dispose(),this.stop(),this.frequencyTexture&&(this.frequencyTexture.dispose(),this.frequencyTexture=null),this.analyser&&(this.analyser.disconnect(),this.analyser=null)}}const gz=1e3,gb={_ic_body:{l:365,i:"x"},_ic_yoji:{l:100,i:"z"},_ic_mayo:{l:150,i:"y"},_ic_eye:{l:0,i:"w"}},yb={_sub_path1:{l:200,i:"y"},_sub_path2:{l:85,i:"x"},_sub_path3:{l:70,i:"x"},_sub_path4:{l:85,i:"x"},_sub_circle1:{l:0,i:"z"},_sub_circle2:{l:0,i:"z"},_sub_circle3:{l:0,i:"z"},_sub_circle4:{l:0,i:"z"}};class yz extends Te{constructor(i){super(i);y(this,"svgWrap");y(this,"elms");y(this,"blidger");y(this,"icGroup");if(this.blidger=null,this.icGroup=null,this.svgWrap=document.createElement("div"),this.svgWrap.innerHTML=`
<svg width="100%" viewBox="0 -50 345 254" fill="none">
<g id="ic">
<path id="ic_body" d="M85.3 30.7C117.2 30.7 143.1 56.8 143.1 89S117.2 147.3 85.3 147.3 27.5 121.2 27.5 89 53.4 30.7 85.3 30.7Z" stroke="#fff" stroke-width="12" stroke-linecap="round"/>
<path id="ic_yoji" d="M153.5 6L99.5 88.8" stroke="#fff" stroke-width="12" stroke-linecap="round"/>
<path id="ic_mayo" d="M4.5 94.7C10.4 85 25.1 62.2 39.4 62.2 57.4 62.2 42.4 98 54.9 98S73.5 67.2 92.9 65.5" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
<g id="ic_eye">
<circle cx="68.3" cy="50.2" fill="#fff" r="4"/>
<circle cx="81.7" cy="50.2" fill="#fff" r="4"/>
</g>
</g>
<g id="sub">
<path id="sub_path1" d="M339.5 127.5C333.7 139.6 321.2 148 306.8 148 286.8 148 270.5 131.9 270.5 112S286.8 76 306.8 76C321.2 76 333.7 84.4 339.5 96.5" stroke="#fff" stroke-width="11" stroke-linecap="round"/>
<path id="sub_path2" d="M239.5 127C233.7 139.4 221.3 148 207 148S180.3 139.4 174.5 127" stroke="#fff" stroke-width="11" stroke-linecap="round"/>
<path id="sub_path3" d="M174.5 96L239.5 127" stroke="#fff" stroke-width="11" stroke-linecap="round"/>
<path id="sub_path4" d="M239.5 96C233.7 84.2 221.3 76 207 76S180.3 84.2 174.5 96" stroke="#fff" stroke-width="11" stroke-linecap="round"/>
<circle id="sub_circle1" cx="211.5" cy="98" fill="#fff" r="4"/>
<circle id="sub_circle2" cx="223.9" cy="98" fill="#fff" r="4"/>
<circle id="sub_circle3" cx="298.5" cy="103" fill="#fff" r="4"/>
<circle id="sub_circle4" cx="286.5" cy="103" fill="#fff" r="4"/>
<g>
</svg>
`,this.svgWrap.style.position="absolute",this.svgWrap.style.width="20%",this.svgWrap.style.top="50%",this.svgWrap.style.left="50%",this.svgWrap.style.transform="translate(-57%,-50%)",this.svgWrap.style.pointerEvents="none",this.svgWrap.style.strokeDasharray=gz+"",this.elms=new Map,[...Object.keys(gb),...Object.keys(yb)].map(s=>s.slice(1)).forEach(s=>{const d=this.svgWrap.querySelector("#"+s);d&&this.elms.set(s,d)}),this.blidger=this.entity&&this.entity.getComponent(li)||null,this.icGroup=this.svgWrap.querySelector("#ic"),We.canvas instanceof HTMLCanvasElement){const s=We.canvas.parentElement;s&&s.appendChild(this.svgWrap)}}updateImpl(){if(!this.blidger)return;const i=this.blidger.animations.get("hide");i&&(this.svgWrap.style.display=i.value.x>.5?"none":"block");const o=(c,v)=>{this.elms.forEach((h,p)=>{const _=v["_"+p];if(!_)return;const S=c.value[_.i];h.style.opacity=Ur.smoothstep(0,.05,S)*100+"%",_.l&&(h.style.strokeDasharray=_.l+"",h.style.strokeDashoffset=(1-S)*_.l+"")})},s=this.blidger.animations.get("state"),d=this.blidger.animations.get("state2");if(s&&o(s,gb),d&&o(d,yb),d&&this.icGroup){const c=1-d.value.w,v=c*110,h=c*360;this.icGroup.style.transformOrigin="85px 89px",this.icGroup.style.transform=`translate(${v}px, 0) rotate(${h}deg)`}}dispose(){super.dispose(),this.svgWrap&&this.svgWrap.parentElement&&this.svgWrap.parentElement.removeChild(this.svgWrap),this.blidger=null}}const xz=`// @shader-file: src/resources/Components/Demo4/Salmon/Onigiri/shaders/onigiri.fs
#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

SDFResult D( vec3 p ) {
	
	vec3 pp = p;

	vec2 d = vec2( udTriangle( pp, vec3( 0.0, 0.5, 0.0 ), vec3( -0.5, -0.35, 0.0 ), vec3( 0.5, -0.35, 0.0 ) ), 0.0 );
	d -= 0.3;

	return SDFResult(
		d.x,
		p,
		d.y,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>


	
	#include <rm_loop,128,0.001,1.0>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );
	
	#include <rm_out_obj>

	outColor.xyz = vec3( 1.0 );
	outRoughness = 0.5;
	outColor.xyz *= smoothstep( 1.5, 0.4,  length( rayPos ) );
	outColor.xyz *= smoothstep( 0.0, 0.03, sdBox( rayPos.xy + vec2( 0.0, 0.4 ), vec2( 0.25, 0.3 ) ) );
	
	#include <frag_out>
	

}`;class Vv extends Te{constructor(i){super(i);y(this,"mesh");const o=new ir({radius:1}),s=new He({frag:Se("onigirifrag",xz),uniforms:Ce.merge(ie.resolution,ie.time)});this.mesh=this.entity.addComponent(me,{geometry:o,material:s})}disposeImpl(){this._entity.removeComponent(me)}}class bz extends Te{constructor(i){super(i);y(this,"onigiri");y(this,"basePosition");y(this,"baseRotation");this.basePosition=this.entity.position.clone(),this.baseRotation=this.entity.euler.clone(),this.onigiri=this.entity.addComponent(Vv)}updateImpl(i){const o=i.timeCode;this.entity.euler.y=this.baseRotation.y+Math.sin(o*1)*50,this.entity.euler.x=this.baseRotation.x+Math.sin(o*5)*1,this.entity.euler.z=this.baseRotation.z+Math.cos(o*6.5)*1,this.entity.position.y=this.basePosition.y+Math.abs(Math.sin(o*1))*.1,this.entity.position.x=this.basePosition.x+Math.cos(o*1),this.entity.position.z=this.basePosition.z+Math.sin(o*.5)}disposeImpl(){this._entity.removeComponent(Vv)}}const _z=`// @shader-file: src/resources/Components/Demo4/Party/GreetingCard/shaders/greeting.fs
#include <common>
#include <frag_h>

uniform float uTime;
uniform sampler2D uTex;

void main( void ) {

	#include <frag_in>

	// テクスチャから色を取得
	vec4 tex = texture( uTex, vUv );

	// 枠の幅
	float borderWidth = 0.05;

	// UV座標から枠判定
	vec2 dist = min(vUv, 1.0 - vUv);
	float border = step(min(dist.x * 0.4, dist.y), borderWidth) * 0.2;
	
	// 枠の色（虹色グラデーション）
	float hue = length(vUv - 0.5) * 10.0;
	vec3 gradientColor = vec3(
		0.5 + 0.5 * cos(hue - uTime * 20.0),
		0.5 + 0.5 * cos(hue - uTime * 25.0 + 2.09439),
		0.5 + 0.5 * cos(hue - uTime * 30.0 + 4.18879)
	);

	// 基本的なマテリアルプロパティ
	outRoughness = 1.0;
	outEmission = (1.0 - tex.r + border * sin( uTime * 40.0 )) * gradientColor * 10.0;

	#include <frag_out>

}
`,wz=`// @shader-file: src/resources/Components/Demo4/Party/GreetingCard/shaders/greeting.vs
#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>
	#include <vert_out>

}
`;class r_ extends Te{constructor(i){super(i);y(this,"texture",null);y(this,"material",null);y(this,"nameValue","");const o=.3,s=.9,d=new ro({width:o,height:s});this.material=new He({vert:Se("greetingVert",wz),frag:Se("greetingFrag",_z),uniforms:Ce.merge(ie.time,{uTex:{value:null,type:"1i"}})}),this.entity.addComponent(me,{geometry:d,material:this.material})}set name(i){if(this.nameValue!==i&&(this.nameValue=i,this.texture&&(this.texture.dispose(),this.texture=null),i)){const o=document.createElement("canvas");o.width=128,o.height=384;const s=o.getContext("2d");if(!s)return;s.fillStyle="#FFF",s.fillRect(0,0,o.width,o.height),s.fillStyle="#000",s.textAlign="center",s.textBaseline="middle";const d=i.toUpperCase(),c=o.height-40;let v=42,h=44;d.length*h>c&&(h=c/d.length,v=Math.min(42,h-2)),s.font=`bold ${v}px Noto Sans JP`;const _=(o.height-(d.length-1)*h)/2;for(let S=0;S<d.length;S++){const T=d[S],C=_+S*h;s.fillText(T,o.width/2,C)}this.texture=new rt(We).attach(o),this.material&&(this.material.uniforms.uTex.value=this.texture)}}disposeImpl(){this.texture&&(this.texture.dispose(),this.texture=null)}}const Sz=`// @shader-file: src/resources/Components/Demo4/Party/Sara/shaders/sara.fs
#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

// インスタンスIDを受け取る
in vec4 vId;
in vec4 vId2;
in mat4 vTransformMatrix;
in float vDiscard;

// 皿のSDF関数（参考URLのGYOZA形状を皿形状に変換）
SDFResult D( vec3 p ) {

	vec3 pp = p;

	// スケール調整（皿の大きさ）
	pp *= 0.8;

	// 皿の中心の穴の半径
	float holeRadius = 0.3;

	// トーラス状の基本形状を作成（皿の底面）
	vec2 q = vec2( length(pp.xz) - holeRadius, pp.y );

	vec2 d = vec2( 10000.0, 0.0 );

	// 皿の底面（回転させて厚みを持たせる）
	vec2 q1 = q;
	q1.xy *= rotate( -1.4 );
	q1.y += 0.21;
	d = opAdd( d, vec2( sdBox( vec3( q1, 0.0 ), vec3( 0.01, 0.28, 1.0 )), 0.0 ) );

	// 皿の縁（上部のリム）
	vec2 q2 = q;
	q2.x += 0.4;
	q2.y += 0.05;
	d = opAdd( d, vec2( sdBox( vec3( q2, 0.0 ), vec3( 0.3, 0.04, 0.1 )), 0.0 ) );

	return SDFResult(
		d.x,
		p,
		d.y,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	// vDiscardが1.0なら非表示
	if (vDiscard > 0.5) discard;

	#include <frag_in>
	#include <rm_ray_obj>

	// vTransformMatrixの逆行列を計算してレイの座標をインスタンス空間に変換
	mat4 invMatrix = inverse(vTransformMatrix);
	vec3 localRayPos = (invMatrix * vec4(rayPos, 1.0)).xyz;
	vec3 localRayDir = normalize((invMatrix * vec4(rayDir, 0.0)).xyz);

	SDFResult dist;
	bool hit = false;

	// レイマーチングループ
	for( int i = 0; i < 128; i++ ) {

		dist = D( localRayPos );
		localRayPos += dist.d * localRayDir * 1.0;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	// 法線計算（ローカル空間）
	vec3 localNormal = N( localRayPos, 0.01 );

	// 法線をワールド空間に変換
	outNormal = normalize((transpose(invMatrix) * vec4(localNormal, 0.0)).xyz);

	// ワールド空間の位置を計算
	rayPos = (vTransformMatrix * vec4(localRayPos, 1.0)).xyz;

	#include <rm_out_obj>

	float saraGrade = vId.x;
	vec3 saraColor = mix( vec3( 0.1, 0.15, 0.3 ), vec3( 0.6, 0.2, 0.0 ), smoothstep( 0.0, 0.3, saraGrade ) );
	saraColor = mix( saraColor, vec3( 1.0, 0.6, 0.0 ), smoothstep( 0.3, 1.0, saraGrade ) );

	// 皿の色（白基調）
	outColor.xyz = mix( 
		saraColor,
		vec3( 0.8, 0.7, 0.6 ),
		smoothstep( 0.35, 0.3, length( localRayPos ) )
	);

	// ラフネス（陶器の質感）
	outRoughness = 0.3;

	outEmission.xyz = saraColor * 10.0 * pow( saraGrade, 3.0 );

	// メタリック値（非金属）
	outMetalic = 0.0;

	#include <frag_out>

}
`,Ez=`// @shader-file: src/resources/Components/Demo4/Party/Sara/shaders/sara.vs
#include <common>\r
#include <vert_h>\r
\r
// インスタンスごとのID属性（location = 4, 5）\r
layout(location = 4) in vec4 id;\r
layout(location = 5) in vec4 id2;\r
\r
// ユーティリティ関数のインクルード\r
#include <rotate>\r
#include <matrix>\r
\r
// グローバルユニフォーム\r
uniform float uTime;\r
uniform float uVisibleCount;\r
\r
// フラグメントシェーダーに渡す変数\r
out vec4 vId;\r
out vec4 vId2;\r
out mat4 vTransformMatrix;\r
out float vDiscard;\r
\r
void main( void ) {\r
\r
	// 基本的な頂点処理\r
	#include <vert_in>\r
\r
	// uVisibleCountより大きいインデックスは非表示\r
	float instanceIndex = id.x * 15.0;\r
	\r
\r
	// 上に積み重ねる\r
	vec3 instancePos = vec3( 0.0, id.x * 2.2, 0.0 );\r
	instancePos.y += step(uVisibleCount, instanceIndex) * 100.0;\r
\r
	// マトリックス生成関数を使用してマトリックスを構築\r
	mat4 translateMatrix = makeTranslation(instancePos);\r
\r
	// マトリックスを合成\r
	vTransformMatrix = translateMatrix;\r
\r
	// マトリックスを頂点位置に適用\r
	outPos = (vTransformMatrix * vec4(outPos, 1.0)).xyz;\r
\r
	// 回転なしなので法線はそのまま\r
\r
	// 標準的な頂点出力処理\r
	#include <vert_out>\r
\r
	// インスタンスIDをフラグメントシェーダーに渡す\r
	vId = id;\r
	vId2 = id2;\r
\r
}\r
`;class xf extends Te{constructor(i){super(i);y(this,"uniforms");const o=15,s=new bf({radiusTop:.5,radiusBottom:.5,height:.2}),d=Ur.randomSeed(2),c=[],v=[];for(let p=0;p<o;p++)c.push(p/o,d(),d(),d()),v.push(d(),d(),d(),d());s.setAttribute("id",new Float32Array(c),4,{instanceDivisor:1}),s.setAttribute("id2",new Float32Array(v),4,{instanceDivisor:1}),this.uniforms={uVisibleCount:{value:o,type:"1f"}};const h=new He({phase:["deferred","shadowMap"],vert:Se("saraVert",Ez),frag:Se("saraFrag",Sz),uniforms:Ce.merge(ie.resolution,ie.time,this.uniforms)});this.entity.addComponent(me,{geometry:s,material:h})}}class i_ extends Te{constructor(i){super(i);y(this,"saraEntity");y(this,"sushiEntity");y(this,"nigiriComponent",null);y(this,"ikuraGunkanComponent",null);y(this,"greetingEntity");y(this,"greetingComponent");y(this,"sashimiTypeValue","maguro");this.saraEntity=new Ct,this.saraEntity.name="Sara";const o=this.saraEntity.addComponent(xf);this.entity.add(this.saraEntity),o&&o.uniforms&&(o.uniforms.uVisibleCount.value=1),this.sushiEntity=new Ct,this.sushiEntity.name="Sushi",this.sushiEntity.position.set(0,.15,0),this.entity.add(this.sushiEntity),this.updateSushiComponent(this.sashimiTypeValue),this.greetingEntity=new Ct,this.greetingEntity.name="GreetingCard",this.greetingEntity.position.set(-.4,.49,0),this.greetingEntity.euler.y=-Math.PI/4,this.entity.add(this.greetingEntity),this.greetingComponent=this.greetingEntity.addComponent(r_),this.field("sashimiType",()=>this.sashimiTypeValue,s=>{this.sashimiTypeValue=s,this.updateSushiComponent(s)},{format:{type:"select",list:[{label:"マグロ",value:"maguro"},{label:"サーモン",value:"salmon"},{label:"いくら",value:"ikura"},{label:"タコ",value:"tako"}]}})}set sashimiType(i){this.setField("sashimiType",i)}set greetingName(i){this.greetingComponent.name=i}updateSushiComponent(i){const o=i==="ikura";if(!(o&&this.ikuraGunkanComponent)){if(!o&&this.nigiriComponent){this.nigiriComponent.sashimiType=i;return}this.nigiriComponent&&(this.sushiEntity.removeComponent(Uu),this.nigiriComponent=null),this.ikuraGunkanComponent&&(this.sushiEntity.removeComponent(yf),this.ikuraGunkanComponent=null),o?(this.ikuraGunkanComponent=this.sushiEntity.addComponent(yf),this.sushiEntity.scale.setScalar(.8)):(this.nigiriComponent=this.sushiEntity.addComponent(Uu),this.nigiriComponent.sashimiType=i,this.nigiriComponent.emission=1,this.sushiEntity.scale.setScalar(1))}}disposeImpl(){this.entity.remove(this.greetingEntity),this.greetingEntity.dispose(),this.entity.remove(this.saraEntity),this.saraEntity.dispose(),this.entity.remove(this.sushiEntity),this.sushiEntity.dispose()}}const xb=["0b5vr","conspiracy","ctrl-alt-test","doxas","draw();","gam0022","kinakomochi","logicoma","mrdoob","renard","saina","SESSIONS","totetmatt"];class Cz extends Te{constructor(i){super(i);y(this,"sushiEntities",[]);y(this,"sushiComponents",[]);y(this,"speed",.1);y(this,"rangeX",40);y(this,"sushiCount",18);y(this,"sashimiTypes",["maguro","salmon","ikura","tako"]);this.createSushi()}createSushi(){for(let i=0;i<this.sushiEntities.length;i++)this.entity.remove(this.sushiEntities[i]),this.sushiEntities[i].dispose();this.sushiEntities=[],this.sushiComponents=[];for(let i=0;i<this.sushiCount;i++){const o=new Ct;o.name="SushiSara_"+i,this.entity.add(o);const s=o.addComponent(i_);s.sashimiType=this.sashimiTypes[i%this.sashimiTypes.length],s.greetingName=xb[i%xb.length],this.sushiEntities.push(o),this.sushiComponents.push(s)}}updateImpl(i){const o=i.timeCode;for(let s=0;s<this.sushiEntities.length;s++){const d=s/this.sushiCount,c=(o*this.speed+d)%1,v=this.rangeX/2-c*this.rangeX,h=-Math.pow(v,2)*.003;this.sushiEntities[s].position.x=v,this.sushiEntities[s].position.z=h}}disposeImpl(){for(let i=0;i<this.sushiEntities.length;i++)this.entity.remove(this.sushiEntities[i]),this.sushiEntities[i].dispose();this.sushiEntities=[],this.sushiComponents=[]}}class Tz extends Te{constructor(i){super(i);y(this,"basePosition");y(this,"isJumping");y(this,"speed");y(this,"height");this.basePosition=this.entity.position.clone(),this.isJumping=!0,this.speed=9,this.height=3;const o=this.entity.getComponent(me);o&&o.material&&o.material.uniforms&&(o.material.uniforms.uParty={value:1,type:"1f"}),this.field("isJumping",()=>this.isJumping,s=>this.isJumping=s)}updateImpl(i){if(!this.isJumping){this.entity.position.y=this.basePosition.y;return}const o=Math.abs(Math.sin(i.timeElapsed*this.speed));this.entity.position.y=this.basePosition.y+o*this.height}}class kz extends Te{constructor(i){super(i);y(this,"musicComponent");y(this,"frequencyData");y(this,"saraEntity");y(this,"samplePosition");this.musicComponent=null,this.frequencyData=null,this.saraEntity=null,this.samplePosition=.5,this.setupSara(),this.field("samplePosition",()=>this.samplePosition,o=>{this.samplePosition=o})}setupSara(){this.saraEntity=new Ct,this.saraEntity.name="Sara",this.saraEntity.addComponent(xf),this.entity.add(this.saraEntity)}setupMusicReference(){const i=this.entity.getRootEntity(),o=d=>{const c=d.getComponent(n_);if(c)return c;for(let v=0;v<d.children.length;v++){const h=o(d.children[v]);if(h)return h}return null},s=o(i);s&&(this.musicComponent=s,this.frequencyData=this.musicComponent.frequencyData)}updateImpl(i){if(!this.musicComponent&&i.playing&&this.setupMusicReference(),this.frequencyData&&i.playing&&this.saraEntity){const o=Math.floor(this.samplePosition*(this.frequencyData.length-1)),s=5;let d=0,c=0;for(let _=-s;_<=s;_++){const S=o+_;S>=0&&S<this.frequencyData.length&&(d+=this.frequencyData[S],c++)}const v=d/c,h=Math.floor(v*2/255*1.2*15),p=this.saraEntity.getComponent(xf);p&&p.uniforms&&(p.uniforms.uVisibleCount.value=h)}}dispose(){super.dispose(),this.saraEntity&&(this.saraEntity.dispose(),this.saraEntity=null)}}const Nz=`// @shader-file: src/resources/Components/Demo4/Party/SushiGeta/shaders/sushiGeta.fs
#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

SDFResult D( vec3 p ) {

	vec3 pp = p;

	vec3 mainP = pp;
	float d = sdBox( mainP, vec3( 0.5, 0.05, 0.35 ) ) - 0.01;

	// ashi
	vec3 ashiP = pp;
	ashiP.x = abs( ashiP.x );
	ashiP.x -= 0.3;
	ashiP.y += 0.1;
	d = opAdd( d, sdBox( ashiP, vec3( 0.05,0.05,0.35 ) ) - 0.01 );
	
	return SDFResult(
		d,
		p,
		0.0,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	#include <rm_loop,64,0.001,1.0>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	outColor.xyz = vec3( 1.0 );
	outRoughness = 0.5;

	float n1 = fbm( rayPos * 0.4 );
	float mokume = fract( length( rayPos * vec3( 0.5, 1.0, 1.0) + vec3( -0.1, 0.4, 0.1 ) ) * 45.0 + n1 * 20.0 );

	vec3 baseCol = vec3( 0.8, 0.55, 0.25 );
	outColor.xyz = mix( baseCol, baseCol * 0.9, mokume );
	outNormal = normalize( outNormal + mokume * 0.2 );

	#include <frag_out>


}
`;class o_ extends Te{constructor(i){super(i);y(this,"mesh");const o=new _r({width:1.1,height:.4,depth:1.1}),s=new He({frag:Se("sushiGetaFrag",Nz),uniforms:Ce.merge(ie.resolution,ie.time)});this.mesh=this.entity.addComponent(me,{geometry:o,material:s})}disposeImpl(){this._entity.removeComponent(me)}}class Rz extends Te{constructor(i){super(i);y(this,"getaEntity");y(this,"sushiEntities",[]);this.getaEntity=new Ct,this.getaEntity.name="SushiGeta",this.getaEntity.addComponent(o_),this.entity.add(this.getaEntity);const s=this.entity.name.endsWith("R")?["maguro","salmon","ikura","tako"]:["tako","ikura","salmon","maguro"],d=.25,c=-(s.length-1)*d/2;for(let v=0;v<s.length;v++){const h=new Ct;if(h.name="Sushi_"+v,h.position.set(c+v*d,.12,0),h.euler.set(0,-.5,0),h.scale.setScalar(.6),this.entity.add(h),s[v]==="ikura")h.addComponent(yf),h.scale.setScalar(.45);else{const p=h.addComponent(Uu);p.sashimiType=s[v]}this.sushiEntities.push(h)}}disposeImpl(){this.entity.remove(this.getaEntity),this.getaEntity.dispose();for(let i=0;i<this.sushiEntities.length;i++)this.entity.remove(this.sushiEntities[i]),this.sushiEntities[i].dispose()}}const Dz=`// @shader-file: src/resources/Components/Demo4/Salmon/Salmon/shaders/salmon.fs
#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <random>
#include <noise_cyclic>
#include <noise_value>
#include <rm_h>

uniform mat4 uModelViewMatrix;

uniform float uTimeE;
uniform sampler2D uNoiseTex;
uniform vec4 uState;
uniform float uParty;

// サーモンの形状を定義
float salmon( vec3 p ) {

	vec3 salmonP = p;
	salmonP *= 0.8;
	salmonP.y -= 0.05;
	float r = sin( -p.x - 0.3 + uTimeE * 12.0 ) * 0.5 * smoothstep( -1.0, 1.0, p.x );
	r = mix( r, sin( -p.x - 0.3 + uTimeE * 12.0 ) * 0.5, uParty );
	salmonP.xz *= rotate( r );

	// ボデー

	vec3 pp = salmonP;
	pp.z *= 1.3;
	pp.y += cos( pp.x * PI  ) * 0.05;
	float d = sdVesicaSegment( pp, vec3( -0.5, 0.0, 0.0 ), vec3( 0.5, 0.0, 0.0 ), 0.13 * cos(pp.x + 0.5) );

	// 口

	pp = salmonP;
	pp += vec3( 0.5, 0.000, 0.0 );
	pp.y += pow( pp.x * 1.0, 2.0 ) * 1.5;
	pp.x *= 0.10;
	d = opSmoothSub( sdTriPrism( pp, vec2(0.022, 0.2) ), d, 0.0 );

	// ヒレ下

	pp = salmonP;
	pp += vec3( -0.26, 0.13, 0.0 );
	pp.x *= 0.5;
	pp.x -= pow( pp.y, 2.0 ) * 5.0;
	pp.xy *= rotate( PI + 0.6 );
	pp.x -= pow(pp.y, 2.0 ) * 1.0;
	d = opSmoothAdd( sdTriPrism( pp, vec2(0.05, 0.001) ) - 0.002, d, 0.01 );

	// ヒレ上

	pp = salmonP;
	pp += vec3( -0.03, -0.07, 0.0 );
	pp.x *= 0.5;
	pp.x -= pow( pp.y, 2.0 ) * 6.0;
	pp.x -= pow(pp.y, 2.0 ) * 1.0;
	d = opSmoothAdd( sdTriPrism( pp, vec2(0.065, 0.001) ) - 0.002, d, 0.01 );

	// ヒレ横

	pp = salmonP;
	pp.z = abs( pp.z );
	pp += vec3( 0.14, 0.09, -0.08 );
	pp.y += pow(pp.x, 2.0 ) * 1.0;
	pp.x += 0.03;
	pp.xz *= rotate( 0.5 + sin( uTimeE * 3.0 - pp.x * 5.0) * 0.2 );
	pp.x -= 0.03;
	pp.xy *= rotate( - 1.7 );
	pp.y *= 0.3;
	d = opSmoothAdd( sdBox( pp, vec3(0.02 + pp.y * 0.5, 0.03 - pp.x * 0.3, 0.001) ), d, 0.01 );

	// ヒレ後ろ

	pp = salmonP;

	pp.y = abs( pp.y );
	pp.x -= pow(pp.y, 1.19 ) * 1.3;
	pp += vec3( -0.48, -0.00, 0.0 );
	pp.xy *= rotate( -0.0 );
	// pp.y *= 0.4;

	d = opSmoothAdd( sdTriPrism( pp, vec2(0.1, 0.001) ) - 0.002, d, 0.07 );


	return d;

}

// サーモンブロックの形状を定義
// BLOCK_KIRIMIまたはBLOCK_SAKUのdefineで形状を切り替え可能
vec4 salmonBlock( vec3 p ) {

	vec3 blockP = p;
	blockP *= 0.4;

	vec3 pp;
	vec3 bodyP;
	float d = 0.0;

	#ifdef BLOCK_KIRIMI
	
		blockP.x += texture( uNoiseTex, (blockP.xz + blockP.x)  * 0.4).x * 0.05;
		blockP.x -= 0.05;
		blockP.y += 0.05;

		pp = blockP;
		pp.y *= 1.0 + cos( pp.x * PI * 1.3 - 0.6 );
		pp.yz *= rotate( HPI );
		bodyP = pp;
		d = sdCappedCylinder( pp, 0.2, 0.02 );
		d = opSmoothSub( sdBox( blockP + vec3( 0.1, 0.5, 0.0 ), vec3( 0.5, 0.5, 0.5 ) ), d, 0.02 );

		pp = blockP;
		pp.y += 0.15;
		pp.x -= 0.02;
		pp.yz *= rotate( HPI );
		d = opSmoothSub( sdCappedCylinder( pp, 0.18, 0.5 ), d, 0.01 );
		
	#endif

	#ifdef BLOCK_SAKU

		blockP.yz *= rotate( 0.5 );
		blockP.z += sin( - uTimeE * 6.0 + blockP.x * 8.0 ) * 0.03;
		blockP.y += ( texture( uNoiseTex, (blockP.xz + blockP.x)  * 0.3).x - 0.3 ) * 0.03;
		blockP.z += ( texture( uNoiseTex, (blockP.xy + blockP.x)  * 0.1).y - 0.3 ) * 0.03;

		pp = blockP;
		bodyP = pp;


		pp.y += pp.z * 0.3;

		d = sdBox( pp, vec3( 0.15, 0.07, 0.03) );
	
	#endif

	return vec4( d, bodyP );

}

SDFResult D( vec3 p ) {

	float slm = salmon( p );
	slm = opSmoothSub( sdBox( p + vec3( 1.8 - uState.x * 2.1, 0.0, 0.0 ), vec3( 1.0, 0.5, 0.5 ) ), slm, 0.0 );

	vec4 blk = salmonBlock( p );
	blk.x = opSmoothSub( sdBox( p + vec3( -2.0 + 1.8 - uState.x * 2.1, 0.0, 0.0 ), vec3( 1.0, 0.5, 0.5 ) ), blk.x, 0.0 );

	float d = opAdd( slm, blk.x );

	float matID = slm < blk.x ? 0.0 : 1.0;


	return SDFResult(
		d,
		p,
		matID,
		vec4(blk.y, blk.yzw)
	);

}

#include <subsurface>
#include <rm_normal>

void main( void ) {

	// uState.yが1の時は何も表示しない
	if( uState.y >= 1.0 ) discard;

	#include <frag_in>
	#include <rm_ray_obj>



	#include <rm_loop,32,0.001,0.7>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	// ノイズテクスチャを取得
	vec3 rp = dist.matparam.yxz;
	rp.yz *= rotate( 0.5 );
	vec2 noiseUV = rp.yz * 0.5 + 0.5;
	vec4 n1 = texture(uNoiseTex, noiseUV);
	vec4 n2 = texture(uNoiseTex, noiseUV * 4.0 );
	vec4 n3 = texture(uNoiseTex, noiseUV * 1.0 + n1.xy);
	vec4 n4 = texture(uNoiseTex, rayPos.xz * 1.0 - 0.5 );

	float dnv = dot( rayDir, -outNormal.xyz );

	// マテリアルIDに応じた処理
	if( dist.mat < 0.5 ) {
		// サーモン本体 (mat=0.0)
		outRoughness = smoothstep( 0.2, 1.0, n1.r );
		outNormal = normalize( outNormal + n2.xyz * 0.3 );

		vec3 c = vec3( 1.0 );
		float kuro = smoothstep( 0.01 , 0.08, rayPos.y - cos( rayPos.x * PI + 0.15 ) * 0.06 - n2.x * 0.05 + 0.04 );
		c.xyz = mix(c, vec3( 0.5 ), kuro );
		outColor.xyz = c;
		outMetalic = 0.2;
	} else {

		// サーモンブロック (mat=1.0)
		float sss = subsurface( rayPos, normalize( (vec4( 0.0, 1.0, 0.0, 0.0 ) * uModelViewMatrix).xyz ), 0.15);

		outRoughness = 0.5;
		outNormal = normalize( outNormal + n2.xyz * 0.5 );

		float kawal = length( dist.matparam.yzw );
		float kawa = smoothstep( 0.19, 0.2, kawal );

		outColor.xyz = vec3( 1.0, 0.4, 0.2 );
		outEmission.xyz += vec3( 1.0, 0.4, 0.1 ) * sss * 1.7 * ( 1.0 - kawa );
		outMetalic = 0.1;
		outRoughness = 0.2;

		
		vec3 bodyP = dist.matparam.yzw;
		
		float line = fract( length( bodyP * vec3( 2.0, 1.0, 1.0 ) + vec3( 0.05 + sin( bodyP.y ), 0.0, 0.0 ) ) * 30.0 );
		line = smoothstep( 0.5, 1.0, line );
		outColor.xyz += line * 0.1;
		outColor.xyz = mix( outColor.xyz, vec3( 0.9  ) * smoothstep( -0.4, 0.8, rayPos.x ), kawa );

	}


	#include <frag_out>


}
`;class Mz extends Te{constructor(i){super(i);y(this,"blockType","saku");y(this,"material");this.field("blockType",()=>this.blockType,c=>{this.blockType=c,this.updateMaterialDefines()},{format:{type:"select",list:[{label:"Kirimi",value:"kirimi"},{label:"Saku",value:"saku"}]}});const o=new _r({width:1.5,height:.8,depth:1}),s=new He({frag:Se("salmonFrag",Dz),uniforms:Ce.merge(ie.resolution,ie.time,ie.tex),defines:this.getDefines()}),d=this.entity.addComponent(me,{geometry:o,material:s});hn(d.entity,d),this.material=s}getDefines(){const i={};return this.blockType==="kirimi"?i.BLOCK_KIRIMI="":this.blockType==="saku"&&(i.BLOCK_SAKU=""),i}updateImpl(i){}updateMaterialDefines(){this.material&&(this.material.defines=this.getDefines(),this.material.requestUpdate())}}class Pz extends Te{constructor(i){super(i);y(this,"sushiEntity",null);y(this,"blidger",null);this.blidger=this.entity.getComponent(li)||null,this.sushiEntity=new Ct,this.sushiEntity.name="Nigiri",this.sushiEntity.euler.set(0,Math.PI/2,0);const o=this.sushiEntity.addComponent(Uu);o.sashimiType="salmon",this.entity.add(this.sushiEntity)}updateImpl(){if(this.blidger&&this.sushiEntity){const i=this.blidger.animations.get("uState");i&&(this.sushiEntity.visible=i.value.y==1)}}disposeImpl(){this.sushiEntity&&(this.entity.remove(this.sushiEntity),this.sushiEntity.dispose(),this.sushiEntity=null),this.blidger=null}}const zz=`// @shader-file: src/resources/Components/Demo4/Tako/TakoGate/shaders/takogate.fs
#include <common>
#include <packing>
#include <frag_h>
#include <sdf>
#include <rm_h>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>
#include <random>

uniform mat4 uModelViewMatrix;

uniform vec4 uState;
uniform vec4 uPrevState;

uniform float uTime;
uniform float uTimeE;

uniform float uParty;

// SDF関数 - TakoAshiを参考にしたゲート形状
SDFResult D( vec3 p ) {

	float close = uState.x;
	float open = 1.0 - uState.x;

	// ランダムな補間位置を計算（位置ベース）
	float randSeed = random( gl_FragCoord.xy / 1000.0 );

	// uPrevStateとuStateの間をランダムに補間
	float b = mix( uState.y, uPrevState.y, randSeed * 1.0 );

	float phase1 = min( b, 1.0 );
	float phase2 = clamp( b - 1.0, 0.0, 1.0 );
	float phase3 = clamp( b - 2.0, 0.0, 1.0 );
	float phase4 = clamp( b - 3.0, 0.0, 1.0 );

	for( int i = 0; i < 4; i++ ) {

		if( phase2 > 0.2 ) {

			p.x = abs( p.x );

		}

		p.x -= phase2 * 0.5;
		p.yz *= rotate( phase2 * PI / 1.0 );
		p.xz *= rotate( -phase2 * PI / 4.0 + phase4 * 0.4  );

		p.z -= phase3 * 0.5;
		p.yz *= rotate( phase3 * PI / 1.0 );

	}

	p.xy *= rotate( open * 1.0 * -length( p.yx ) * 0.4 * ( 1.0 - phase1 ) + uTime * 0.2 );
	
	p.xy = pmod( p.xy, 1.0 + phase1 * 7.0 );
	
	p.y += close * 5.0 + sin( uTime * 1.0 + p.y * 0.5 ) * 0.05;

	float wave = linearstep( 0.4, 1.0, open );

	p.xz *= rotate( sin( p.y * 2.0 - uTime * 2.0 - 1.0 ) * 0.5 * smoothstep( 0.3, 1.0, p.y )  * wave );


	float partyWaveT = uTimeE * 3.0 * uParty;
	partyWaveT = floor( partyWaveT ) + 1.0 - exp( fract( partyWaveT ) * -5.0 );
	
	p.z += sin( p.y + uTime  - partyWaveT * 6.0) * 0.3 * wave - p.y * 0.2;


	// ノイズによる形状の変化
	p.xz *= 1.0 + noiseValue( vec3( p.y * 1.5 ) ) * 0.15;

	vec3 n1 = noiseCyc( p * 0.6 );

	float radius = 1.0 + 1.0 / (linearstep( 2.3, -2.3, p.y ) + 0.01);

	p.xz *= radius;

	float r = (0.55 + n1.x * 0.1) * 0.5;
	float d = sdRoundedCylinder( p, r, r, 10.0 );

	p.y *= 1.0 + pow(radius, 1.0 ) * 0.3;

	// 吸盤の作成
	vec3 suckerP = p;
	suckerP.z -= 0.4;
	suckerP.x = abs( suckerP.x ) - 0.25;
	suckerP.y = mod( suckerP.y, 0.5 ) - 0.25;
	suckerP.xz *= rotate( -0.1 );
	suckerP.yz *= rotate( HPI );
	d = opSmoothAdd( d, sdRoundedCylinder( suckerP, 0.11, 0.04, 0.12 + length( suckerP.xz )* 0.2 ), 0.2 );

	// 吸盤のディテール
	d = opSmoothSub( sdSphere( suckerP - vec3( 0.0, 0.2, 0.0 ), 0.05 ), d, 0.05 );
	d = opSmoothAdd( sdSphere( suckerP - vec3( 0.0, 0.13, 0.0 ), 0.06 ), d, 0.02 );

	d /= radius;

	return SDFResult(
		d,
		p.xyz,
		0.0,
		vec4( 0.0 )
	);

}

#include <subsurface>
#include <rm_normal>

void main( void ) {

	#include <frag_in>

	// カメラ位置からワールド空間でレイを初期化
	#include <rm_ray_screen>

	SDFResult dist;
	bool hit = false;

	for( int i = 0; i < 64; i++ ) {

		if( uParty > 0.5 && i > 32 ) {
			break;
		}

		dist = D( rayPos );
		rayPos += dist.d * rayDir * 0.7;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	// マテリアル設定
	outRoughness = 0.02;
	outMetalic = 0.0;

	vec3 uvPos = dist.pos;
	uvPos.xy *= rotate( HPI / 2.0 );
	uvPos.yz *= rotate( HPI / 2.0);

	outNormal = N( rayPos, 0.01 );

	vec3 marchPos = dist.pos;
	
	// カラー設定 - ノイズによる模様と境界のスムージング
	float noiseValue = noiseCyc( marchPos + 0.5 ).x;
	vec3 redColor = vec3( 0.6, 0.2, 0.2 ) * ( 0.4 + noiseValue * 0.5 ) * 0.5;
	vec3 whiteColor = vec3( 1.0 );
	float redMask = smoothstep( 0.59, 0.55, marchPos.z );
	outColor.xyz = mix( whiteColor, redColor, redMask );

	
	// subsurface scatteringを計算 - 赤い部分のみに適用
	float sssPower = (1.0 + uState.z * 5.0) + uParty * 10.0;
	float sss = subsurface( rayPos, normalize( (vec4( normalize( -rayPos.xyz), 0.0 )).xyz ), 0.5 );

	sss += uParty * 10.0 * exp(fract( uTimeE * 4.0 + noiseValue * 0.7 ) * - 5.0);
	
	outEmission += outColor.xyz * 1.0 * redMask;
	outEmission.xyz += sss * (outColor.xyz + vec3( 0.5, 0.1, 0.0 )) * ( redMask );

	// オブジェクト空間からワールド空間への変換、位置・法線・深度を出力
	#include <rm_out_obj>



	#include <frag_out>

}
`;class Az extends Te{constructor(i){super(i);y(this,"mesh");y(this,"prevState");this.prevState=new Q,this.mesh=this._entity.addComponent(me,{geometry:new ro({width:2,height:2}),material:new He({phase:["deferred"],vert:wf,frag:Se("takoGateFrag",zz),uniforms:Ce.merge(ie.time,ie.resolution,{uPrevState:{value:this.prevState,type:"4f"}})})}),hn(this.mesh.entity,this.mesh)}afterRenderImpl(i){const o=this.mesh.material.uniforms.uState;o&&o.value&&this.prevState.copy(o.value)}disposeImpl(){this._entity.removeComponent(me)}}const Oz=`// @shader-file: src/resources/Components/Demo4/Tako/TakoKosen/shaders/takokosen.fs
#include <common>
#include <packing>
#include <frag_h>

uniform vec4 uState;

void main( void ) {

	#include <frag_in>

	outColor.xyz += 10.0;
	outColor.w *= uState.y;
	
	#include <frag_out>

}
`,Fz=`// @shader-file: src/resources/Components/Demo4/Tako/TakoKosen/shaders/takokosen.vs
#include <common>
#include <vert_h>

uniform vec4 uState;

void main( void ) {

	#include <vert_in>

	outPos.xyz *= uState.x;
	
	#include <vert_out>

}
`;class Lz extends Te{constructor(i){super(i);y(this,"mesh");this.mesh=this._entity.addComponent(me,{geometry:new ir({radius:.5,widthSegments:32,heightSegments:32}),material:new He({phase:["forward"],vert:Se("takoKosenVert",Fz),frag:Se("takoKosenFrag",Oz),uniforms:Ce.merge(ie.time,ie.resolution)})}),hn(this.entity,this.mesh)}updateImpl(i){}disposeImpl(){this._entity.removeComponent(me)}}const Uz=`// @shader-file: src/resources/Components/Demo4/Tsuri/Ocean/shaders/ocean.fs
#include <common>
#include <packing>
#include <frag_h>
#include <sdf>
#include <noise_cyclic>

#include <rm_h>

uniform float uTime;
uniform vec4 uState;

// 海洋の波を生成するノイズ関数
float oceanNoise( vec3 p ) {

	// 複数のオクターブでノイズを重ね合わせて波を表現
	float n = 0.0;
	float amp = 1.0;
	float freq = 1.0;

	for( int i = 0; i < 4; i++ ) {
		vec3 noise = noiseCyc( p * freq * 0.5 + vec3( uTime * 0.2, 0.0, uTime * 0.3  ) );
		n += amp * noise.x;
		amp *= 0.5;
		freq *= 2.0;
	}

	return n;
}

// SDF（Signed Distance Function）
SDFResult D( vec3 p ) {

	// Y座標を波の高さとして変調
	float wave = 0.0;
	float wh = 0.1;


	vec2 fishPos = p.xz -vec2( 0.0, -9.0 );
	float lfp = length( fishPos );
	float fishWave = sin( lfp * 7.0 - uTime * 15.0 ) * smoothstep( 5.0, 0.0, lfp );

	if( p.y < wh ) {

		wave = oceanNoise( p * 0.5 + vec3( 0.0, fishWave * 0.2, 0.0 ) ) * wh;

	}

	p.y -= sin( clamp( lfp * 3.0 - uState.x * PI * 5.0 + PI * 3.0, 
	0.0,
	PI * 3.0
	) ) * 0.7 * smoothstep( 4.0, 0.0, lfp );

	// 水平面との距離（sdPlane関数を使用）
	// 法線は上向き(0,1,0)、オフセットはwaveで変調
	float d = sdPlane( p, vec3(0.0, 1.0, 0.0), wave );

	return SDFResult(
		d,
		p,
		0.0,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>

	// カメラ位置からワールド空間でレイを初期化
	#include <rm_ray_screen>


	// レイマーチング
	#include <rm_loop,128,0.05,1.0>

	if( !hit ) discard;

	// 法線を計算
	outNormal = N( rayPos, 0.01 );

	// オブジェクト空間からワールド空間への変換、位置・法線・深度を出力
	#include <rm_out_obj>

	// 海洋の色（深い青緑）
	vec3 oceanColor = vec3( 0.0, 0.3, 0.5 );

	// 深度に応じて色を変化（ワールド座標のY値で判定）
	float depth = abs( rayPos.y );
	oceanColor = mix( oceanColor, vec3( 0.0, 0.1, 0.2 ), clamp( depth / 1.0, 0.0, 1.0 ) );

	outColor = vec4( oceanColor, 1.0 );
	outEmission = vec3( 0.0 );
	outRoughness = 0.1; // 水面なので低いラフネス
	outGradient = 1.0;

	#include <frag_out>

}
`;class Bz extends Te{constructor(i){super(i);y(this,"mesh");this.mesh=this._entity.addComponent(me,{geometry:new _r({width:2,height:2}),material:new He({phase:["deferred"],vert:wf,frag:Se("oceanFrag",Uz),uniforms:Ce.merge(ie.time,ie.resolution)})}),hn(this.mesh.entity,this.mesh)}disposeImpl(){this._entity.removeComponent(me)}}const Vz=`// @shader-file: src/resources/Components/Demo4/Tsuri/Taiyaki/shaders/taiyaki.fs
#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

uniform mat4 uModelViewMatrix;

uniform float uTime;
uniform float uTimeE;
uniform float uParty;
uniform sampler2D uNoiseTex;
uniform vec4 uState;

// たいやき形状を表現するSDF関数
SDFResult D( vec3 p ) {

	vec3 pp = p;


	float rFish = sin( -pp.x * 3.0 - 0.3 + uState.x * 30.0 ) * 0.4;
	rFish *= uState.y;

	float r = sin( -pp.x * 3.0 - 0.3 + uTimeE * 10.0 ) * 0.5;
	r *= uParty;

	pp.xz *= rotate( r + rFish );


	pp.yz *= rotate( PI / 2.0 );
	pp.xy *= rotate( PI / 2.0 );

	// 六角形座標系でのパターン計算（魚のウロコ柄）
	// 参考: https://www.shadertoy.com/view/4dKXz3
	vec2 uv = pp.xz * 15.0 * 1.73 / 2.0; // スケール調整
	uv.x *= -1.0;
	vec2 U = uv * mat2(1, -1.0/1.73, 0, 2.0/1.73); // 六角形座標への変換
	vec3 g = vec3(U, 1.0 - U.x - U.y); // 六角形座標
	vec3 id = floor(g); // セルID

	g = fract(g); // ダイアモンド座標
	if (length(g) > 1.0) g = 1.0 - g; // 重心座標

	U = id.xy * mat2(1, 0.5, 0, 1.73/2.0);

	// 各ノードへのスクリーン空間距離
	float l00 = length(U - uv);
	float l10 = length(U + vec2(1, 0) - uv);
	float l01 = length(U + vec2(0.5, 1.73/2.0) - uv);
	float l11 = length(U + vec2(1.5, 1.73/2.0) - uv);
	float l20 = length(U + vec2(2, 0) - uv);

	// 魚のウロコ模様を作成
	float k = 0.75 + 0.25;
	id += l20 < k ? vec3(2, 0, 0) : l11 < k ? vec3(1, 1, 0) : l10 < k ? vec3(1, 0, 0) : l01 < k ? vec3(0, 1, 0) : vec3(0);
	vec2 C = id.xy * mat2(1, 0.5, 0, 1.73/2.0); // 最近傍ノードの中心

	vec2 tileUv = uv - C;
	vec3 bodyP = pp;
	bodyP.x += 0.08;
	bodyP.x *= 0.7;
	float bodyPos = smoothstep( 0.3, -0.4, bodyP.x );
	float bodyHeightMap = 0.0;
	bodyHeightMap = -tileUv.x * 1.5;
	bodyHeightMap *= smoothstep( 0.195, 0.2, length( bodyP.xz * vec2( 1.0, 0.7 ) + vec2( 0.27, 0.05 ) ) ); 
	
	float d = sdRoundedCylinder( bodyP, 0.12, 0.04 + bodyHeightMap * 0.012, 0.01 );


	vec3 shippoP = pp;
	shippoP.xz *= rotate( -0.2 );
	shippoP.xz += vec2( -0.3, 0.01 );
	shippoP.z *= 1.0 - shippoP.x * 2.0;
	shippoP.x += abs( sin( shippoP.z * 37.0 ) ) * 0.02;
	shippoP.x += cos( shippoP.z * 10.0 ) * 0.05;
	float shippoHeightMap = 0.0;
	shippoHeightMap += sin( shippoP.z * 180.0 );
	shippoP.y -= shippoHeightMap * 0.002;
	d = opSmoothAdd( d,sdRoundBox( shippoP, vec3( 0.15,0.05,0.16), 0.03 ), 0.05 );

	// 目
	vec3 eyeP = pp;
	eyeP.xz += vec2( 0.3, 0.07 );
	float eye = sdRoundedCylinder( eyeP, 0.015, 0.02, 0.045 );
	d = opSmoothAdd( d, eye, 0.01 );

	vec3 eyeRoundP = eyeP;
	float eyeRoundHeight = 0.04 * smoothstep( -0.08, 0.05, length( eyeP.xz ) );
	float eyeRound = sdRoundedCylinder( eyeRoundP, 0.025, 0.02, eyeRoundHeight );
	d = opSmoothAdd( d, eyeRound, 0.003 );

	// 口
	vec3 mouthP = pp;
	mouthP.xz += vec2( 0.39, 0.0 );
	mouthP.xz *= rotate( 0.25 );
	mouthP.z = abs( mouthP.z );
	mouthP.z -= 0.01;
	mouthP.xz *= rotate( -0.25 );
	float mouth = sdRoundBox( mouthP, vec3( 0.05, 0.06, 0.015 ), 0.015 );
	d = opSmoothAdd( d, mouth, 0.005 );

	// 頭のヒレ(トサカ)
	vec3 hireTosakaP = pp;
	hireTosakaP.xz += vec2( -0.010, 0.22 );
	hireTosakaP.xz *= rotate( 0.25 );
	float hireTosaka = sdRoundBox( hireTosakaP, vec3( 0.15, 0.035 + sin( hireTosakaP.x * 200.0) * 0.002, 0.07 ), 0.03 );
	d = opSmoothAdd( d, hireTosaka, 0.015 );

	// バックヒレ
	vec3 hireBackP = pp;
	hireBackP.xz += vec2( -0.1, -0.19 );
	hireBackP.xz *= rotate( -0.5 );
	float hireBack = sdRoundBox( hireBackP, vec3( 0.1, 0.035 + sin( hireBackP.x * 200.0) * 0.002, 0.05 ), 0.03 );
	d = opSmoothAdd( d, hireBack, 0.02 );

	// ヒレサイド
	vec3 hireSideP = pp;
	hireSideP.xz += vec2( 0.11, -0.12 );
	hireSideP.z *= 1.0 - hireSideP.x * 3.0;
	float hireSideHeight = 0.073 + hireSideP.x * 0.1 + sin( hireSideP.z * 200.0 ) * 0.002;
	float hireSide = sdRoundBox( hireSideP, vec3( 0.1, hireSideHeight, 0.06 ), 0.01 );
	d = opSmoothAdd( d, hireSide, 0.003 );

	return SDFResult(
		d,
		p,
		0.0,
		vec4( pp, 0.0 )
	);

}

#include <subsurface>
#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>


	#include <rm_loop,50,0.001,0.8>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.002 );

	#include <rm_out_obj>

	// ノイズテクスチャを取得
	vec2 noiseUV = dist.matparam.xz * 1.0 + 0.5;
	vec4 n1 = texture(uNoiseTex, noiseUV);
	vec4 n2 = texture(uNoiseTex, noiseUV * 4.0);
	vec4 n3 = texture(uNoiseTex, noiseUV * 8.0);

	// subsurface scatteringを計算
	float sss = subsurface( rayPos, normalize( (vec4( 0.0, 1.0, 0.0, 0.0 ) * uModelViewMatrix).xyz ), 0.1);

	// たいやきの焼き色
	vec3 baseColor = vec3( 0.9, 0.55, 0.2 );

	// ノイズで焼き色のバリエーションを追加
	outColor.xyz = mix( baseColor.xyz, vec3( 1.0, 0.2, 0.0 ), n1.r * 0.2 + n2.r * 0.1 );
	outColor.xyz = mix( outColor.xyz, vec3( 0.6, 0.2, 0.0 ), smoothstep( 0.1, 0.01, abs( dist.matparam.y ) ) * 0.5 );

	// ノイズでroughnessを調整（焼きムラを表現）
	outRoughness = 0.1 + n1.r * 0.3 + n2.r * 0.2;

	// ノイズでノーマルを微調整（表面の質感）
	outNormal = normalize(outNormal + n3.xyz * 0.3);

	#include <frag_out>

}
`;class Iz extends Te{constructor(i){super(i);y(this,"mesh");const o=new _r({width:.4,height:1,depth:1,segmentsDepth:8,segmentsHeight:8,segmentsWidth:2}),s=new He({frag:Se("taiyakiFrag",Vz),uniforms:Ce.merge(ie.resolution,ie.time,ie.tex)});this.mesh=this.entity.addComponent(me,{geometry:o,material:s}),hn(this.entity,this.mesh)}disposeImpl(){this._entity.removeComponent(me)}}const jz=`// @shader-file: src/resources/Components/Demo4/Tsuri/Teibo/shaders/teibo.fs
#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

uniform sampler2D uNoiseTex;

#include <rm_h>

SDFResult D( vec3 p ) {

	vec3 pp = p;

	vec3 n = noiseCyc( pp * vec3( 5.0,1.0, 1.0 ) );

	vec2 d = vec2( sdBox( pp, vec3( 0.5, 0.49 - n.x * 0.0005, 0.49 - n.x * 0.0005 ) ) - 0.005, 0.0 );

	return SDFResult(
		d.x,
		p,
		d.y,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>



	#include <rm_loop,32,0.001,1.0>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>

	// アスファルト質感
	vec3 uvSide = rayPos.xyz * 3.0;

	// ノイズテクスチャから複数スケールでサンプリング
	vec4 n1 = vec4( 
		fbm( uvSide * vec3( 40.0, 1.0, 7.0) ),
		fbm( uvSide * vec3( 20.0, 1.0, 7.0) + 100.0 ),
		fbm( uvSide * vec3( 10.0, 1.0, 1.0 ) * 30.0 + 30.0 ),
		fbm( uvSide * vec3( 10.0, 1.0, 1.0 ) * 2.0 + 30.0 )
	);

	// アスファルトのベースカラー（暗いグレー）
	vec3 asphaltColor = mix( vec3( 0.5 ), vec3( 0.1 ), n1.x * smoothstep( -0.5, 0.7, rayPos.y ) * ( 1.0 - dot( outNormal, vec3( 0.0, 1.0, 0.0 ) ) ) );

	asphaltColor = mix( asphaltColor, vec3( 0.0 ), smoothstep( 0.2, -0.3, rayPos.y + smoothstep( 0.3, 1.0, n1.y ) * 0.3 ));
	
	asphaltColor = mix( asphaltColor, vec3( 0.1 ), n1.z * dot( outNormal, vec3( 0.0, 1.0, 0.0 ) ) * n1.w);

	outColor.xyz = asphaltColor;

	// ラフネス（アスファルトは粗い）
	outRoughness = 0.7;

	outColor.xyz *= smoothstep( 1.5, 0.4, length( rayPos ) );

	#include <frag_out>


}
`;class Hz extends Te{constructor(i){super(i);y(this,"mesh");const o=new _r({width:1,height:1,depth:1,segmentsDepth:8,segmentsHeight:8,segmentsWidth:8}),s=new He({frag:Se("teiboFrag",jz),uniforms:Ce.merge(ie.resolution,ie.time,{uNoiseTex:ie.tex.uNoiseTex})});this.mesh=this.entity.addComponent(me,{geometry:o,material:s})}disposeImpl(){this._entity.removeComponent(me)}}const Gz=`// @shader-file: src/resources/Components/Texture/TextureGenerator/shaders/hash.fs
#include <common>\r
#include <frag_h>\r
#include <noise_value>\r
\r
layout (location = 0) out vec4 outColor;\r
\r
void main( void ) {\r
\r
	vec2 uv = vUv * 400.0;\r
\r
	outColor.x = hashv( uv );\r
	outColor.y = hashv( uv  + 1.0);\r
	outColor.z = hashv( uv + 2.0 );\r
	outColor.w = hashv( uv + 3.0 );\r
\r
} `,Wz=`// @shader-file: src/resources/Components/Texture/TextureGenerator/shaders/noise.fs
#include <common>\r
#include <frag_h>\r
#include <noise_value>\r
\r
layout (location = 0) out vec4 outColor;\r
\r
void main( void ) {\r
\r
	vec2 v = vUv * 15.0;\r
	vec2 lv = abs( vUv - 0.5 ) * 15.0;\r
	float lw = sin( vUv.x * PI ) * sin( vUv.y * PI );\r
\r
	outColor.x += mix( fbm( vec3( lv, 0.0 ) ), fbm( vec3( v, 0.0 ) ), lw );\r
	outColor.y += mix( fbm( vec3( lv, 100.0 ) ), fbm( vec3( v, 100.0 ) ), lw );\r
	outColor.z += mix( fbm( vec3( lv, 200.0 ) ), fbm( vec3( v, 200.0 ) ), lw );\r
	outColor.w += mix( fbm( vec3( lv, 300.0 ) ), fbm( vec3( v, 300.0 ) ), lw );\r
\r
} `,bb=`// @shader-file: src/resources/Components/Texture/TextureGenerator/shaders/noiseCyclic.fs
#include <common>\r
#include <noise_cyclic>\r
\r
layout (location = 0) out vec4 outColor;\r
in vec2 vUv;\r
uniform float uTimeE;\r
\r
void main( void ) {\r
\r
	vec3 n = noiseCyc( vec3( vUv * 3.0, uTimeE * 0.5 ) );\r
	outColor.xyz = n;\r
\r
} `,Yz=`// @shader-file: src/resources/Components/Texture/TextureGenerator/shaders/noiseSimple.fs
#include <common>
#include <frag_h>
#include <noise_simplex>

uniform float uTimeE;

layout (location = 0) out vec4 outColor;

void main( void ) {

	// 時間でアニメーションするsimplexノイズ
	vec3 pos = vec3( vUv * 4.0, uTimeE * 0.3 );

	outColor.x = noiseSimplex( pos ) * 0.5 + 0.5;
	outColor.y = noiseSimplex( pos + vec3( 100.0, 0.0, 0.0 ) ) * 0.5 + 0.5;
	outColor.z = noiseSimplex( pos + vec3( 0.0, 100.0, 0.0 ) ) * 0.5 + 0.5;
	outColor.w = noiseSimplex( pos + vec3( 0.0, 0.0, 100.0 ) ) * 0.5 + 0.5;

}
`;class qz extends Te{constructor(i){super(i);y(this,"updateTextures");this.updateTextures=[];const s=ct.getInstance(We).renderer,d=new Ou(s,{frag:Wz,resolution:new Q(1024,1024)});ct.resources.addTexture("noise",d),ie.tex.uNoiseTex={type:"1i",value:d};const c=new Ou(s,{frag:bb,resolution:new Q(1024,1024)});ct.resources.addTexture("noiseCyclic",c),ie.tex.uNoiseCyclicTex={type:"1i",value:c};const v=new Ou(s,{frag:Gz,resolution:new Q(512,512)});v.setting({magFilter:We.NEAREST,minFilter:We.NEAREST}),v.render(),ct.resources.addTexture("hash",v),ie.tex.uHashTex={type:"1i",value:v};const h=new Ou(s,{frag:bb,uniforms:ct.getInstance(We).uniforms,resolution:new Q(512,512)});h.setting({wrapS:We.REPEAT,wrapT:We.REPEAT}),ct.resources.addTexture("noiseCyclic_anime",h),this.updateTextures.push(h);const p=new Ou(s,{frag:Yz,uniforms:ct.getInstance(We).uniforms,resolution:new Q(512,512)});p.setting({wrapS:We.REPEAT,wrapT:We.REPEAT}),ct.resources.addTexture("noiseSimple_anime",p),ie.tex.uNoiseSimpleTex={type:"1i",value:p},this.updateTextures.push(p);const _=s.deferredRenderer;_&&Ce.assign(_.shading.uniforms,ie.tex),this.once("dispose",()=>{this.updateTextures.forEach(S=>{S.dispose()}),this.updateTextures=[]})}updateImpl(){for(let i=0;i<this.updateTextures.length;i++)this.updateTextures[i].render()}}class Xz extends Te{constructor(l){super(l)}updateImpl(l){ie.time.uTime.value=l.timeCode,ie.time.uTimeF.value=l.timeCode%1,ie.time.uTimeE.value=l.timeElapsed,ie.time.uTimeEF.value=l.timeElapsed%1,ie.resolution.uAspectRatio.value=l.resolution.x/l.resolution.y}}const $z=`// @shader-file: src/resources/Components/_DevOnly/ShaderEditorSkybox/shaders/shaderEditorSkybox.fs
#include <common>
#include <packing>
#include <frag_h>
#include <noise_value>
#include <rotate>

uniform float uTimeE;
uniform float uAspectRatio;
uniform sampler2D uNoiseTex;
uniform vec4 uState;

void main( void ) {

	#include <frag_in>

	vec3 normal = normalize( - vNormal );
	outRoughness = 1.0;
	outColor *= 0.0;
	outEmission = vec3( 1.0 );

	#ifdef IS_FORWARD

		vec4 n = texture( uNoiseTex, vUv * 0.2 );
		outColor = vec4( outEmission * 1.0 * smoothstep( 0.2, 0.5, n.x ) , 1.0 );
	
	#endif

	outEnv = 0.0;

	#include <frag_out>

} `;class Kz extends Te{constructor(l){super(l);const i=this._entity.addComponent(me,{geometry:new ir({radius:500,widthSegments:32,heightSegments:32}),material:new He({phase:["deferred","envMap"],frag:Se("shaderEditorSkybox",$z),cullFace:!1,uniforms:Ce.merge(ie.time)})});hn(i.entity,i)}}const Qz=`// @shader-file: src/resources/Components/_Templates/InstancedMesh/shaders/instanced.vs
#include <common>
#include <vert_h>

// インスタンスごとのID属性（location = 4）
layout(location = 4) in vec4 id;

// ユーティリティ関数のインクルード
#include <rotate>
#include <noise_simplex>

// グローバルユニフォーム
uniform float uTime;

// フラグメントシェーダーに渡す変数
out vec4 vId;

void main( void ) {

	// 基本的な頂点処理
	#include <vert_in>

	// インスタンスごとの位置・変形処理の例
	// id.x: 正規化されたインデックス (0.0 ~ 1.0)
	// id.y, id.z, id.w: ランダム値

	vec3 instancePos = outPos;

	// 例: 各インスタンスを円形に配置
	float angle = id.x * 6.28318530718; // 2 * PI
	float radius = 2.0 + id.y * 1.0; // ランダムな半径

	instancePos.x += cos(angle) * radius;
	instancePos.z += sin(angle) * radius;
	instancePos.y += id.z * 2.0 - 1.0; // Y軸方向にランダムなオフセット

	// 時間に基づく回転アニメーション
	float rotationSpeed = id.w * 0.5 + 0.5;
	float rotation = uTime * rotationSpeed;
	rotate(instancePos.xy, outNormal.xy, rotation);

	// 最終的な位置を設定
	outPos = instancePos;

	// 標準的な頂点出力処理
	#include <vert_out>

	// インスタンスIDをフラグメントシェーダーに渡す
	vId = id;

}
`,Zz=`// @shader-file: src/resources/Components/_Templates/InstancedMesh/shaders/instanced.fs
#include <common>
#include <packing>
#include <frag_h>

// 頂点シェーダーから受け取るインスタンスID
in vec4 vId;

void main( void ) {

	// 基本的なフラグメント処理
	#include <frag_in>

	// インスタンスIDを使った色のバリエーション例
	// vId.x: 正規化されたインデックス
	// vId.y, vId.z, vId.w: ランダム値

	// ラフネス調整
	outRoughness = 0.3;

	// インスタンスごとに色を変化させる例（コメントアウト）
	// outColor.xyz *= vec3(vId.y, vId.z, vId.w);
	// outColor.xyz *= smoothstep(1.0, 0.0, vId.x);

	// メタリック値の調整例
	// outMetalic = vId.y;

	// サブサーフェススキャタリング値の調整例
	// outSSN = vId.z;

	// 標準的なフラグメント出力処理
	#include <frag_out>

}
`;class Jz extends Te{constructor(i){super(i);y(this,"mesh");const o=32,s=new _r({segmentsHeight:16}),d=Ur.randomSeed(1),c=[];for(let v=0;v<o;v++)c.push(v/o,d(),d(),d());s.setAttribute("id",new Float32Array(c),4,{instanceDivisor:1}),this.mesh=this._entity.addComponent(me,{geometry:s,material:new He({phase:["deferred","shadowMap"],vert:Se("instancedVert",Qz),frag:Se("instancedFrag",Zz),uniforms:Ce.merge(ie.time,ie.resolution,{})})})}updateImpl(i){}disposeImpl(){this._entity.removeComponent(me)}}const eA=`// @shader-file: src/resources/Components/_Templates/Particles/shaders/particles.fs
#include <common>
#include <packing>
#include <frag_h>

in vec4 vGPUVel;
in vec4 vGPUPos;
in vec4 vId;

void main( void ) {

	#include <frag_in>

	// basic material properties
	outColor = vec4( 1.0 );
	outRoughness = 0.5;
	outMetalic = 0.0;
	outSSN = 0.0;

	// basic emission
	outEmission = vec3( 0.0 );

	#include <frag_out>

}
`,tA=`// @shader-file: src/resources/Components/_Templates/Particles/shaders/particles.vs
#include <common>
#include <vert_h>

#include <rotate>

layout (location = 3) in vec2 cuv;
layout (location = 4) in vec4 id;

uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;

out vec4 vGPUVel;
out vec4 vGPUPos;
out vec4 vId;

void main( void ) {

	#include <vert_in>

	vGPUVel = texture(uGPUSampler1, cuv );
	vec4 gpuPos = texture(uGPUSampler0, cuv );

	// basic particle transformation
	outPos *= 0.1; // particle size

	// fade in/out based on lifetime
	float life = gpuPos.w;
	outPos *= smoothstep( 0.0, 0.1, life);
	outPos *= smoothstep( 1.0, 0.9, life);

	// apply GPU position
	outPos += gpuPos.xyz;

	vGPUPos = gpuPos;
	vId = id;

	// motion blur
	vec4 vel = ( uProjectionMatrix * uViewMatrix * uModelMatrix * vec4( vGPUVel.xyz, 0.0 ) );

	#include <vert_out>

	vVelocity += vel.xy * 0.1;

}
`,nA=`// @shader-file: src/resources/Components/_Templates/Particles/shaders/particlesCompute.fs
#include <common>
#include <noise_cyclic>

layout (location = 0) out vec4 outColor0;
layout (location = 1) out vec4 outColor1;

uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;
uniform vec2 uGPUResolution;
uniform float uTimeE;
uniform float uDeltaTime;

in vec2 vUv;

#include <random>

void main( void ) {

	vec4 position = texture( uGPUSampler0, vUv );
	vec4 velocity = texture( uGPUSampler1, vUv );

	// velocity update
	vec3 noisePosition = position.xyz * 1.0 + vUv.y;
	vec3 noise = noiseCyc( noisePosition + vec3( 0.0, -uTimeE * 0.5, 0.0 ) ) * 0.03;

	velocity.xyz += noise;
	velocity.xyz *= 0.95; // damping
	velocity.y += 0.001; // gravity

	// position update
	position.xyz += velocity.xyz;

	// lifetime
	if( position.w > 1.0 ) {

		// reset particle
		position = vec4( 0.0, 0.0, 0.0, random( vUv ) );
		velocity = vec4( 0.0 );

	}

	position.w += uDeltaTime * 0.5;

	// output
	outColor0 = position;
	outColor1 = velocity;

}
`;class rA extends Te{constructor(i){super(i);y(this,"gpu");y(this,"mesh");const o=new Q(128,128);this.gpu=new zb({passes:[new Ab(We,{name:"particles",size:o,dataLayerCount:2,frag:Se("particlesCompute",nA),uniforms:Ce.merge(ie.time)})]}),this.gpu.passes[0].initTexture(v=>v===0?[(Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2,Math.random()]:[0,0,0,0]);const s=new ir({radius:.5,widthSegments:6,heightSegments:4}),d=[],c=[];for(let v=0;v<o.x;v++)for(let h=0;h<o.y;h++)d.push(v/o.x,h/o.y),c.push(Math.random(),Math.random(),Math.random(),Math.random());s.setAttribute("cuv",new Float32Array(d),2,{instanceDivisor:1}),s.setAttribute("id",new Float32Array(c),4,{instanceDivisor:1}),this.mesh=this._entity.addComponent(me,{geometry:s,material:new He({name:"particles",phase:["deferred","shadowMap"],vert:Se("particlesVert",tA),frag:Se("particlesFrag",eA),uniforms:Ce.merge(ie.time,this.gpu.passes[0].outputUniforms)})})}updateImpl(i){this.gpu.compute(i.renderer)}disposeImpl(){this._entity.removeComponent(me),this.gpu.dispose()}}const iA=`// @shader-file: src/resources/Components/_Templates/RaymarchCube/shaders/raymarchCube.fs
#include <common>
#include <frag_h>
#include <light>
#include <pmrem>
#include <sdf>
#include <rotate>
#include <noise_cyclic>
#include <noise_value>

#include <rm_h>

SDFResult D( vec3 p ) {
	
	vec3 pp = p;

	vec2 d = vec2( sdBox( pp, vec3( 0.5, 0.5, 0.5) ) - 0.005, 0.0 );
	
	return SDFResult(
		d.x,
		p,
		d.y,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>


	
	#include <rm_loop,128,0.001,1.0>

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );
	
	#include <rm_out_obj>

	outColor.xyz = vec3( 1.0 );
	outRoughness = 0.5;

	outColor.xyz *= smoothstep( 1.5, 0.4,  length( rayPos ) );
	
	#include <frag_out>
	

}`;class oA extends Te{constructor(i){super(i);y(this,"mesh");const o=new ir({radius:1}),s=new He({frag:Se("raymarchCubeFrag",iA),uniforms:Ce.merge(ie.resolution,ie.time)});this.mesh=this.entity.addComponent(me,{geometry:o,material:s})}disposeImpl(){this._entity.removeComponent(me)}}const aA=`// @shader-file: src/resources/Components/_Templates/RaymarchScreen/shaders/raymarch.fs
#include <common>
#include <packing>
#include <frag_h>
#include <sdf>

#include <rm_h>

// SDF（Signed Distance Function）
SDFResult D( vec3 p ) {

    p = mod( p, 10.0 ) - 5.0;

	// とりあえずシンプルな球体
	float d = length( p ) - 1.0;

	return SDFResult(
		d,
		p,
		0.0,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>

	// カメラ位置からワールド空間でレイを初期化
	#include <rm_ray_screen>


	// レイマーチング
	#include <rm_loop,128,0.001,1.0>

	if( !hit ) discard;

	// 法線を計算
	outNormal = N( rayPos, 0.01 );

	// オブジェクト空間からワールド空間への変換、位置・法線・深度を出力
	#include <rm_out_obj>

	// 赤い色を設定
	outColor = vec4( 1.0, 0.0, 0.0, 1.0 );
	outEmission = vec3( 0.0 );
	outRoughness = 0.5;

	#include <frag_out>

}
`,sA=`// @shader-file: src/resources/Components/_Templates/RaymarchScreen/shaders/raymarch.vs
#include <common>\r
#include <vert_h>\r
\r
void main( void ) {\r
\r
	#include <vert_in>\r
\r
	// カメラ変換を無視して、画面フルサイズでクリップ空間に直接描画\r
	// 頂点座標をそのままクリップ空間座標として使用（-1.0 ~ 1.0）\r
	gl_Position = vec4( position.xy, 0.0, 1.0 );\r
\r
}`;class lA extends Te{constructor(i){super(i);y(this,"mesh");this.mesh=this._entity.addComponent(me,{geometry:new ro({width:2,height:2}),material:new He({phase:["deferred"],vert:Se("raymarchVert",sA),frag:Se("raymarchFrag",aA),uniforms:Ce.merge(ie.time,ie.resolution)})})}disposeImpl(){this._entity.removeComponent(me)}}const uA=`// @shader-file: src/resources/Components/_Templates/RaymarchTransparent/shaders/raymarchTransparent.fs
#include <common>
#include <frag_h>
#include <sdf>
#include <rotate>
#include <light>
#include <pmrem>
#include <noise_cyclic>
#include <rm_h>

uniform sampler2D uEnvMap;

// 水球のSDF定義
SDFResult D( vec3 p ) {

	vec3 pp = p;

	// 球体の基本形状
	float d = sdSphere( pp, 0.5 );

	return SDFResult(
		d,
		p,
		0.0,
		vec4(0.0)
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>



	// レイマーチングループ
	#include <rm_loop,64,0.001,0.8>

	if( !hit ) discard;

	// 法線計算
	vec3 normal = N( rayPos, 0.01 );
	outNormal = normal;

	outRoughness = 0.1;
	outMetalic = 0.0;
	outColor.xyz = vec3( 0.0 );

	#include <rm_out_obj>

	#ifdef IS_FORWARD

		#include <lighting_forwardIn>

		vec2 uv = gl_FragCoord.xy / uResolution;

		// フレネル効果
		float dnv = dot( geo.normal, geo.viewDir );
		float ef = fresnel( dnv );

		// 屈折効果によるシーンテクスチャのサンプリング
		float nf = 1.0;

		for( int i = 0; i < 16; i++ ) {

			// 法線に基づいて屈折オフセットを計算
			vec2 v = -( viewNormal.xy ) * ( float( i + 1 ) / 4.0 * 0.015 + 0.05 );
			outColor.x += nf * texture( uDeferredTexture, uv + v * 1.0 ).x;
			outColor.y += nf * texture( uDeferredTexture, uv + v * 1.3 ).y;
			outColor.z += nf * texture( uDeferredTexture, uv + v * 1.6 ).z;

		}

		outColor.xyz /= 16.0;

		// 水の色味を加える（青緑系）
		outColor.xyz *= vec3( 0.95, 0.95, 1.0 );
		outColor.w = 1.0;

		// フレネル効果でハイライト追加
		outColor.xyz += ef * 2.0;

		#include <lighting_light>
		#include <lighting_env>

	#endif

	#include <frag_out>

}
`;class cA extends Te{constructor(i){super(i);y(this,"mesh");const o=new ir({radius:1}),s=new He({frag:Se("raymarchTransparentFrag",uA),phase:["forward"],uniforms:Ce.merge(ie.resolution,ie.time)});this.mesh=this.entity.addComponent(me,{geometry:o,material:s})}disposeImpl(){this._entity.removeComponent(me)}}const dA=`// @shader-file: src/resources/Components/_Templates/ShaderMesh/shaders/basic.fs
#include <common>
#include <packing>
#include <frag_h>

void main( void ) {

	#include <frag_in>

	#include <frag_out>

}`,fA=`// @shader-file: src/resources/Components/_Templates/ShaderMesh/shaders/basic.vs
#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>
	#include <vert_out>
	
}`;class mA extends Te{constructor(i){super(i);y(this,"mesh");this.mesh=this._entity.addComponent(me,{geometry:new ro({width:1,height:1}),material:new He({vert:Se("basicVert",fA),frag:Se("basicFrag",dA),uniforms:Ce.merge(ie.time,ie.resolution)})})}updateImpl(i){}disposeImpl(){this._entity.removeComponent(me)}}const hA={Camera:{MainCamera:TP},Demo4:{Common:{DebaBouChou:NP,HUD:MP,MizuBall:zP,Nigiri:Uu,RandomSMG:WP,ShaderMotionGraphics:Qb,Shari:Kb,SkyBox:qP,TableStage:$P,TruchetSushiLane:QP,Tsuri:{TsuriZao:Jb},UKPAshi:e_,Ukonpower:tz},Ikura:{IkuraFluids:oz,IkuraGunKan:yf,Kyuuri:fz},Maguro:{Maguro:hz,Sashimi:$b},Music:n_,Outro:{Logo:yz},Party:{BreakDanceOnigiri:bz,GreetingCard:r_,KaitenSushi:Cz,PartyTime:Tz,Sara:xf,SaraAudio:kz,SushiGeta:o_,SushiGetaWithNigiri:Rz,SushiSara:i_},Salmon:{Onigiri:Vv,Salmon:Mz,SalmonSushi:Pz},Tako:{TakoGate:Az,TakoKosen:Lz},Tsuri:{Ocean:Bz,Taiyaki:Iz,Teibo:Hz}},ObjectControls:{LookAt:gf},Texture:{TextureGenerator:qz},Utilities:{BLidgeClient:qb,UniformControls:Xz},_DevOnly:{OrbitControls:Yb,ShaderEditorSkybox:Kz},_Templates:{InstancedMesh:Jz,Particles:rA,RaymarchCube:oA,RaymarchScreen:lA,RaymarchTransparent:cA,ShaderMesh:mA}},pA=()=>{ct.resources.clear();const m=(s,d)=>{const c=Object.keys(s);for(let v=0;v<c.length;v++){const h=c[v],p=s[h];if(typeof p=="function")d.addComponent(h,p);else{const _=d.createGroup(h);m(p,_)}}};ct.resources.addComponentGroup("Light").addComponent("Light",Ps);const i=hA,o=Object.keys(i);for(let s=0;s<o.length;s++){const d=o[s],c=i[d],v=ct.resources.addComponentGroup(d);m(c,v)}},vA="orengine/";class gA extends Tn{constructor(){super()}set(l,i){try{const o=JSON.stringify(i);return localStorage.setItem(vA+l,o),fetch("/api/data/save/"+l,{method:"POST",headers:{"Content-Type":"application/json"},body:o})}catch(o){return console.error(o),Promise.reject(o)}}async get(l){try{return await(await fetch("/api/data/get/"+l)).json()}catch{return}}}const cf=new gA;pA();const yA=()=>{const[m,l]=U.useState(),[i,o]=U.useState();return U.useEffect(()=>{cf.get("project.json").then(s=>{s&&l(s)}),cf.get("editor.json").then(s=>{s&&o(s)}),l(sP)},[]),w.jsxDEV(ZM,{gl:We,project:m,children:w.jsxDEV(KM,{editorData:i,onSave:(s,d)=>{cf.set("project.json",s),cf.set("editor.json",d)}},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/src/app/editor/main.tsx",lineNumber:51,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/src/app/editor/main.tsx",lineNumber:50,columnNumber:3},void 0)};Bv.createRoot(document.getElementById("root")).render(w.jsxDEV(w.Fragment,{children:w.jsxDEV(yA,{},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/src/app/editor/main.tsx",lineNumber:65,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/ukonpower/work-space/demo4/src/app/editor/main.tsx",lineNumber:63,columnNumber:2},void 0));
