(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["adminPermission"],{"0bfb":function(e,t,r){"use strict";var n=r("cb7c");e.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},"214f":function(e,t,r){"use strict";r("b0c5");var n=r("2aba"),o=r("32e9"),i=r("79e5"),s=r("be13"),a=r("2b4c"),c=r("520a"),u=a("species"),l=!i(function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}),f=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2===r.length&&"a"===r[0]&&"b"===r[1]}();e.exports=function(e,t,r){var h=a(e),d=!i(function(){var t={};return t[h]=function(){return 7},7!=""[e](t)}),p=d?!i(function(){var t=!1,r=/a/;return r.exec=function(){return t=!0,null},"split"===e&&(r.constructor={},r.constructor[u]=function(){return r}),r[h](""),!t}):void 0;if(!d||!p||"replace"===e&&!l||"split"===e&&!f){var y=/./[h],b=r(s,h,""[e],function(e,t,r,n,o){return t.exec===c?d&&!o?{done:!0,value:y.call(t,r,n)}:{done:!0,value:e.call(r,t,n)}:{done:!1}}),m=b[0],v=b[1];n(String.prototype,e,m),o(RegExp.prototype,h,2==t?function(e,t){return v.call(e,this,t)}:function(e){return v.call(e,this)})}}},"386d":function(e,t,r){"use strict";var n=r("cb7c"),o=r("83a1"),i=r("5f1b");r("214f")("search",1,function(e,t,r,s){return[function(r){var n=e(this),o=void 0==r?void 0:r[t];return void 0!==o?o.call(r,n):new RegExp(r)[t](String(n))},function(e){var t=s(r,e,this);if(t.done)return t.value;var a=n(e),c=String(this),u=a.lastIndex;o(u,0)||(a.lastIndex=0);var l=i(a,c);return o(a.lastIndex,u)||(a.lastIndex=u),null===l?-1:l.index}]})},"456d":function(e,t,r){var n=r("4bf8"),o=r("0d58");r("5eda")("keys",function(){return function(e){return o(n(e))}})},"520a":function(e,t,r){"use strict";var n=r("0bfb"),o=RegExp.prototype.exec,i=String.prototype.replace,s=o,a="lastIndex",c=function(){var e=/a/,t=/b*/g;return o.call(e,"a"),o.call(t,"a"),0!==e[a]||0!==t[a]}(),u=void 0!==/()??/.exec("")[1],l=c||u;l&&(s=function(e){var t,r,s,l,f=this;return u&&(r=new RegExp("^"+f.source+"$(?!\\s)",n.call(f))),c&&(t=f[a]),s=o.call(f,e),c&&s&&(f[a]=f.global?s.index+s[0].length:t),u&&s&&s.length>1&&i.call(s[0],r,function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(s[l]=void 0)}),s}),e.exports=s},"5eda":function(e,t,r){var n=r("5ca1"),o=r("8378"),i=r("79e5");e.exports=function(e,t){var r=(o.Object||{})[e]||Object[e],s={};s[e]=t(r),n(n.S+n.F*i(function(){r(1)}),"Object",s)}},"5f1b":function(e,t,r){"use strict";var n=r("23c6"),o=RegExp.prototype.exec;e.exports=function(e,t){var r=e.exec;if("function"===typeof r){var i=r.call(e,t);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==n(e))throw new TypeError("RegExp#exec called on incompatible receiver");return o.call(e,t)}},"83a1":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},ab26:function(e,t,r){"use strict";var n=r("c616"),o=r.n(n);o.a},ac6a:function(e,t,r){for(var n=r("cadf"),o=r("0d58"),i=r("2aba"),s=r("7726"),a=r("32e9"),c=r("84f2"),u=r("2b4c"),l=u("iterator"),f=u("toStringTag"),h=c.Array,d={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},p=o(d),y=0;y<p.length;y++){var b,m=p[y],v=d[m],g=s[m],w=g&&g.prototype;if(w&&(w[l]||a(w,l,h),w[f]||a(w,f,m),c[m]=h,v))for(b in n)w[b]||i(w,b,n[b],!0)}},b0c5:function(e,t,r){"use strict";var n=r("520a");r("5ca1")({target:"RegExp",proto:!0,forced:n!==/./.exec},{exec:n})},c616:function(e,t,r){},cd24:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.permissions,stripe:""}},[r("el-table-column",{attrs:{prop:"name",label:"权限名",width:"220"}}),r("el-table-column",{attrs:{prop:"url",label:"权限url",width:"220"}}),r("el-table-column",{attrs:{prop:"users",label:"拥有人"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.users.join(",")))])]}}])}),r("el-table-column",{attrs:{prop:"operation",label:"修改拥有人",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){e.change(t.row.users,t.row.id)}}},[e._v("修改")])]}}])})],1),r("el-dialog",{attrs:{title:"修改拥有人",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("h3",[e._v("添加用户")]),r("el-input",{staticStyle:{width:"200px",margin:"10px"},attrs:{placeholder:"请输入用户名"},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}}),r("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.addUser()}}},[e._v("添加")]),r("h3",[e._v("当前拥有")]),e._l(e.peoples,function(t){return r("el-tag",{key:t,staticStyle:{margin:"10px"},attrs:{closable:""},on:{close:function(r){e.delUser(t)}}},[e._v("\n      "+e._s(t)+"\n      ")])})],2)],1)},o=[],i=(r("cadf"),r("551c"),r("097d"),r("dab4")),s={data:function(){return{permissions:[],dialogVisible:!1,peoples:[],userName:"",changePermissionId:0}},mounted:function(){this.getData()},methods:{change:function(e,t){this.peoples=e,this.changePermissionId=t,this.dialogVisible=!0},delUser:function(e){var t=this,r=new i["a"];r.POST("/api/admin/permission/put",{operation:"del",permission_id:this.changePermissionId,name:e}).then(function(r){0===r.errno?(t.$message({showClose:!0,message:"删除成功",type:"success"}),t.peoples.splice(t.peoples.indexOf(e),1),t.getData()):t.$message({showClose:!0,message:r.errmsg,type:"error"})})},addUser:function(){var e=this;if(""!==this.userName){var t=new i["a"];t.POST("/api/admin/permission/put",{operation:"add",permission_id:this.changePermissionId,name:this.userName}).then(function(t){0===t.errno?(e.$message({showClose:!0,message:"添加成功",type:"success"}),e.peoples.push(e.userName),e.userName="",e.getData()):e.$message({showClose:!0,message:t.errmsg,type:"error"})})}},getData:function(){var e=this,t=new i["a"];t.GET("/api/admin/permission/get").then(function(t){e.permissions=t.data})}}},a=s,c=(r("ab26"),r("2877")),u=Object(c["a"])(a,n,o,!1,null,"2a7eefc0",null);u.options.__file="permission.vue";t["default"]=u.exports},dab4:function(e,t,r){"use strict";r("386d"),r("456d"),r("ac6a");function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,t,r){return t&&o(e.prototype,t),r&&o(e,r),e}var s={searchParams:"URLSearchParams"in self,iterable:"Symbol"in self&&"iterator"in Symbol,blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self};function a(e){return e&&DataView.prototype.isPrototypeOf(e)}if(s.arrayBuffer)var c=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],u=ArrayBuffer.isView||function(e){return e&&c.indexOf(Object.prototype.toString.call(e))>-1};function l(e){if("string"!==typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function f(e){return"string"!==typeof e&&(e=String(e)),e}function h(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return s.iterable&&(t[Symbol.iterator]=function(){return t}),t}function d(e){this.map={},e instanceof d?e.forEach(function(e,t){this.append(t,e)},this):Array.isArray(e)?e.forEach(function(e){this.append(e[0],e[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function p(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function y(e){return new Promise(function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}})}function b(e){var t=new FileReader,r=y(t);return t.readAsArrayBuffer(e),r}function m(e){var t=new FileReader,r=y(t);return t.readAsText(e),r}function v(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}function g(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function w(){return this.bodyUsed=!1,this._initBody=function(e){this._bodyInit=e,e?"string"===typeof e?this._bodyText=e:s.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:s.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:s.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():s.arrayBuffer&&s.blob&&a(e)?(this._bodyArrayBuffer=g(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):s.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||u(e))?this._bodyArrayBuffer=g(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"===typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):s.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},s.blob&&(this.blob=function(){var e=p(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?p(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(b)}),this.text=function(){var e=p(this);if(e)return e;if(this._bodyBlob)return m(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(v(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},s.formData&&(this.formData=function(){return this.text().then(S)}),this.json=function(){return this.text().then(JSON.parse)},this}d.prototype.append=function(e,t){e=l(e),t=f(t);var r=this.map[e];this.map[e]=r?r+", "+t:t},d.prototype["delete"]=function(e){delete this.map[l(e)]},d.prototype.get=function(e){return e=l(e),this.has(e)?this.map[e]:null},d.prototype.has=function(e){return this.map.hasOwnProperty(l(e))},d.prototype.set=function(e,t){this.map[l(e)]=f(t)},d.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},d.prototype.keys=function(){var e=[];return this.forEach(function(t,r){e.push(r)}),h(e)},d.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),h(e)},d.prototype.entries=function(){var e=[];return this.forEach(function(t,r){e.push([r,t])}),h(e)},s.iterable&&(d.prototype[Symbol.iterator]=d.prototype.entries);var x=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function T(e){var t=e.toUpperCase();return x.indexOf(t)>-1?t:e}function E(e,t){t=t||{};var r=t.body;if(e instanceof E){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new d(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,r||null==e._bodyInit||(r=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new d(t.headers)),this.method=T(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function S(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var r=e.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(n),decodeURIComponent(o))}}),t}function _(e){var t=new d,r=e.replace(/\r?\n[\t ]+/g," ");return r.split(/\r?\n/).forEach(function(e){var r=e.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();t.append(n,o)}}),t}function A(e,t){t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new d(t.headers),this.url=t.url||"",this._initBody(e)}E.prototype.clone=function(){return new E(this,{body:this._bodyInit})},w.call(E.prototype),w.call(A.prototype),A.prototype.clone=function(){return new A(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new d(this.headers),url:this.url})},A.error=function(){var e=new A(null,{status:0,statusText:""});return e.type="error",e};var P=[301,302,303,307,308];A.redirect=function(e,t){if(-1===P.indexOf(t))throw new RangeError("Invalid status code");return new A(null,{status:t,headers:{location:e}})};var O=self.DOMException;try{new O}catch(j){O=function(e,t){this.message=e,this.name=t;var r=Error(e);this.stack=r.stack},O.prototype=Object.create(Error.prototype),O.prototype.constructor=O}function L(e,t){return new Promise(function(r,n){var o=new E(e,t);if(o.signal&&o.signal.aborted)return n(new O("Aborted","AbortError"));var i=new XMLHttpRequest;function a(){i.abort()}i.onload=function(){var e={status:i.status,statusText:i.statusText,headers:_(i.getAllResponseHeaders()||"")};e.url="responseURL"in i?i.responseURL:e.headers.get("X-Request-URL");var t="response"in i?i.response:i.responseText;r(new A(t,e))},i.onerror=function(){n(new TypeError("Network request failed"))},i.ontimeout=function(){n(new TypeError("Network request failed"))},i.onabort=function(){n(new O("Aborted","AbortError"))},i.open(o.method,o.url,!0),"include"===o.credentials?i.withCredentials=!0:"omit"===o.credentials&&(i.withCredentials=!1),"responseType"in i&&s.blob&&(i.responseType="blob"),o.headers.forEach(function(e,t){i.setRequestHeader(t,e)}),o.signal&&(o.signal.addEventListener("abort",a),i.onreadystatechange=function(){4===i.readyState&&o.signal.removeEventListener("abort",a)}),i.send("undefined"===typeof o._bodyInit?null:o._bodyInit)})}L.polyfill=!0,self.fetch||(self.fetch=L,self.Headers=d,self.Request=E,self.Response=A),r.d(t,"a",function(){return B});var B=function(){function e(){n(this,e),this.protocol=location.protocol,this.host=location.host,this.prefix="".concat(this.protocol,"//").concat(this.host)}return i(e,[{key:"GET",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t){var r=[];Object.keys(t).forEach(function(e){return r.push(e+"="+t[e])}),-1===e.search(/\?/)?e+="?"+r.join("&"):e+="&"+r.join("&")}var n=this.prefix+e;return L(n,{method:"GET",credentials:"include"}).then(function(e){if(e.ok)return e.json();throw new Error("出现了网络问题!")})}},{key:"POST",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=this.prefix+e;return L(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),credentials:"include"}).then(function(e){if(e.ok)return e.json();throw new Error("出现了网络问题!")})}},{key:"UPLOAD",value:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"file",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=this.prefix+e,i=new FormData;return i.append(r,t),Object.keys(n).length>0&&Object.keys(n).forEach(function(e){i.append(e,n[e])}),L(o,{method:"POST",body:i}).then(function(e){if(e.ok)return e.json();throw new Error("出现了网络问题!")})}}]),e}()}}]);
//# sourceMappingURL=adminPermission.042ff370.js.map