"use strict";!function(){var t=function(t,e){for(var a in e)t.hasOwnProperty(a)||(t[a]=e[a]);return t},e=function(t,e){for(var a=0;a<t.length;a++)e(t[a])},a={rows:[[{type:"dual",top:"~",bottom:"`",a:[192]},{type:"dual",top:"!",bottom:"1",a:[49]},{type:"dual",top:"@",bottom:"2",a:[50]},{type:"dual",top:"#",bottom:"3",a:[51]},{type:"dual",top:"$",bottom:"4",a:[52]},{type:"dual",top:"%",bottom:"5",a:[53]},{type:"dual",top:"^",bottom:"6",a:[54]},{type:"dual",top:"&",bottom:"7",a:[55]},{type:"dual",top:"*",bottom:"8",a:[56]},{type:"dual",top:"(",bottom:"9",a:[57]},{type:"dual",top:")",bottom:"0",a:[48]},{type:"dual",top:"_",bottom:"-",a:[189]},{type:"dual",top:"+",bottom:"=",a:[187]},{type:"bottom-right",text:"Delete",width:1.4,a:["U+0008","Backspace"]}],[{type:"bottom-left",text:"Tab",width:1.4,a:["U+0009"]},{type:"center",text:"Q",a:[81]},{type:"center",text:"W",a:[87]},{type:"center",text:"E",a:[69]},{type:"center",text:"R",a:[82]},{type:"center",text:"T",a:[84]},{type:"center",text:"Y",a:[89]},{type:"center",text:"U",a:[85]},{type:"center",text:"I",a:[73]},{type:"center",text:"O",a:[79]},{type:"center",text:"P",a:[80]},{type:"dual",top:"{",bottom:"[",a:[219]},{type:"dual",top:"}",bottom:"]",a:[221]},{type:"dual",top:"|",bottom:"\\",a:[220]}],[{type:"bottom-left",text:"Caps Lock",a:["CapsLock"],width:1.8},{type:"center",text:"A",a:[65]},{type:"center",text:"S",a:[83]},{type:"center",text:"D",a:[68]},{type:"center",text:"F",a:[70]},{type:"center",text:"G",a:[71]},{type:"center",text:"H",a:[72]},{type:"center",text:"J",a:[74]},{type:"center",text:"K",a:[75]},{type:"center",text:"L",a:[76]},{type:"dual",top:":",bottom:";",a:[186]},{type:"dual",top:'"',bottom:"'",a:[222]},{type:"bottom-right",text:"Return",a:["Enter"],width:1.8}],[{type:"bottom-left",name:"Left-Shift",a:["Shift"],text:"Shift",width:2.4},{type:"center",text:"Z",a:[90]},{type:"center",text:"X",a:[88]},{type:"center",text:"C",a:[67]},{type:"center",text:"V",a:[86]},{type:"center",text:"B",a:[66]},{type:"center",text:"N",a:[78]},{type:"center",text:"M",a:[77]},{type:"dual",top:"<",bottom:",",a:[188]},{type:"dual",top:">",bottom:".",a:[190]},{type:"dual",top:"?",bottom:"/",a:[191]},{type:"bottom-right",name:"Right-Shift",text:"Shift",width:2.4}],[{type:"blank"},{type:"blank"},{type:"blank"},{type:"blank"},{type:"space",width:6.2,a:[32]},{type:"blank"},{type:"blank"},{type:"blank"},{type:"blank"},{type:"blank"}]]},o=function(t){var a={},o={},n=$("<div class='cueboard js-cueboard'>");e(t.keyboard.rows,function(p){var r=$("<div class='cueboard-row js-cueboard-row'>");n.append(r),e(p,function(n){var p=$("<div class='cueboard-key js-cueboard-key'>"),c=$("<div class='cueboard-keytext'>"),d={state:"",changeState:function(t){this.$key.removeClass("cueboard-keystate-"+this.state),this.state=t,this.$key.addClass("cueboard-keystate-"+this.state)},$key:p};switch(d.changeState(t.initialKeyState),n.type){case"dual":p.addClass("cueboard-dual"),c.append("<div class='cueboard-key-top'>"+n.top+"</div>"),c.append("<div class='cueboard-key-bottom'>"+n.bottom+"</div>"),d.name=n.bottom,d.alias=n.top,a[n.bottom]=o[n.top]=d;break;case"bottom-left":p.addClass("cueboard-bottom-left"),c.text(n.text),d.name=n.name||n.text,a[d.name]=d;break;case"bottom-right":p.addClass("cueboard-bottom-right"),c.text(n.text),d.name=n.name||n.text,a[d.name]=d;break;case"center":p.addClass("cueboard-center"),c.text(n.text),d.name=n.name||n.text,a[d.name]=o[d.name.toLowerCase()]=d;break;case"space":p.addClass("cueboard-space"),d.name="Space",d.alias=" ",a.Space=o.space=o[" "]=d;break;case"blank":default:p.addClass("cueboard-blank"),d.changeState("blank")}n.width&&p.attr("data-cueboard-keywidth",n.width),n.a&&e(n.a,function(t){o[t]=d}),p.append(c),r.append(p)})}),$(t.selector).html(n);var p=function(t){return a[t]?a[t]:o[t]?o[t]:!1};return{keys:p,$cb:n}},n=function(n){var p=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];p=t(p,{keyboard:a,selector:n,initialkeyState:"inactive",keyState:{}});var r=o(p),c={changeState:function(t,a){if(a&&a.constructor===Array)return e(a,function(e){this.changeState(t,e)},this);var o=r.keys(a);o&&o.changeState(t)},convert:function(t){var e=r.keys(t);return e}};for(var d in p.keyState)c.changeState(d,p.keyState[d]);return c},p=n,r="cueboard";"undefined"!=typeof exports?module.exports=p:"function"==typeof define&&define.amd?define(r,function(){return p}):window[r]=p}();