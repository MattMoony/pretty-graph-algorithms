!function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);class i{constructor(t=null,e=null,s=null){this.from=t,this.to=e,this.cost=s,this.active=!1,this.used=!1,this.consider=!1}setActive(t=!0){null!==this.from&&null!==this.to&&(this.active=t,this.from.active=t,this.to.active=t)}setUsed(t=!0){null!==this.from&&null!==this.to&&(this.used=t,this.from.used=t,this.to.used=t)}setConsider(t=!0){null!==this.from&&null!==this.to&&(this.consider=t,this.from.consider=t,this.to.consider=t)}toString(){return this.from+" -> "+this.to}}class n{constructor(t,e,s,i,o){this.cost=Number.MAX_VALUE,this.s=4,this.x=t,this.y=e,this.active=!1,this.used=!1,this.edges=o||[],s&&(this.s=s),this.l=i||"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[n.lind++]}get id(){return this.l}addEdge(t,e){e&&t instanceof n?this.edges.push(new i(this,t,e)):this.edges.push(t)}edgeTo(t){const e=this.edges.filter(e=>this.to(e)===t);return e.length>0?e[0]:new i}to(t){return t.to!==this?t.to:t.from}_trcUsed(t,e,s){let i=this;for(;i!==e;)i.used=s,t.used=s,[i,t]=[i.to(t),i.to(t).prev];i.used=s}traceUsed(t,e){this._trcUsed(t,e,!0)}untraceUsed(t,e){this._trcUsed(t,e,!1)}_trcActive(t,e,s){let i=this;for(;i!==e;)i.active=s,t.active=s,[i,t]=[i.to(t),i.to(t).prev];i.active=s}traceActive(t,e){this._trcActive(t,e,!0)}untraceActive(t,e){this._trcActive(t,e,!1)}_color(t=this,e){return e?t.used?"rgba(255, 172, 118, .15)":t.active?"rgba(155, 90, 255, .15)":t.consider?"rgba(255, 105, 123, .15)":void 0:t.used?"#FFAC76":t.active?"#9B5AFF":t.consider?"#FF697B":void 0}draw(t){t.circle(this.x,this.y,this.s,this._color(),this._color(this,!0)),t.text(this.l,this.x,this.y,this.s,this._color())}drawEdges(t,e){this.edges.forEach(s=>{const i=this.to(s);if(-1===e.indexOf(i))return;const n=.5*(this.x+i.x);let o=this.y-i.y;const c=.5*(this.y+i.y);let d=i.x-this.x;const r=Math.sqrt(o*o+d*d);o/=r,d/=r,t.line(this.x,this.y,i.x,i.y,this._color(s),s.used?1.2:s.active?.8:s.consider?.6:void 0),t.text(""+s.cost,n+o*this.s*.5,c+d*this.s*.5,this.s,this._color(s))})}toString(){return this.l}static reset(){n.lind=0}}n.lind=0;class o{constructor(){this.q=[]}push(t,e){this.q.push({first:t,second:e}),this.q.sort((t,e)=>t.first-e.first)}pop(){return this.q.pop()}empty(){return 0===this.length}get length(){return this.q.length}}class c{constructor(t){this.m=new Map,this.s=new Map;for(const e of t)this.m.set(e,e),this.s.set(e,1)}find(t){if(this.m.get(t)===t)return t;const e=this.find(this.m.get(t));return this.m.set(t,e),e}union(t,e){t=this.find(t),e=this.find(e),this.s.get(t)<this.s.get(e)&&([t,e]=[e,t]),this.m.set(e,t),this.s.set(t,this.s.get(t)+this.s.get(e))}}var d=function(t,e,s,i){return new(s||(s=Promise))((function(n,o){function c(t){try{r(i.next(t))}catch(t){o(t)}}function d(t){try{r(i.throw(t))}catch(t){o(t)}}function r(t){var e;t.done?n(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(c,d)}r((i=i.apply(t,e||[])).next())}))},r=300;function h(t){r=t}function f(t=r){return new Promise((e,s)=>window.setTimeout(e,t))}function a(t){t.nodes=[new n(10,15),new n(15,80),new n(35,30),new n(47,70),new n(56,45),new n(62,20),new n(75,75),new n(90,50)],t.addEdge(0,2,5),t.addEdge(0,1,2),t.addEdge(0,5,6),t.addEdge(1,4,5),t.addEdge(1,2,3),t.addEdge(2,3,3),t.addEdge(2,7,10),t.addEdge(3,6,3),t.addEdge(4,5,1),t.addEdge(4,6,2),t.addEdge(6,7,2)}var l={dfs:function(t,e){return d(this,void 0,void 0,(function*(){yield function t(e,s,i){return d(this,void 0,void 0,(function*(){if(i.push(e),!e.active)if(e.active=!0,yield f(),e!==s){for(const n of e.edges){if(n.active)continue;const o=e.to(n);if(n.setConsider(!0),yield f(),n.setConsider(!1),n.active=!0,yield t(o,s,i),i.slice(-1)[0]===s){n.used=!0;break}n.active=!1,i.pop()}i.slice(-1)[0]===s?e.used=!0:e.active=!1}else e.used=!0}))}(t.nodes[0],t.nodes.slice(-1)[0],[]),e()}))},bfs:function(t,e){return d(this,void 0,void 0,(function*(){const s=t.nodes[0],n=t.nodes.slice(-1)[0],o=[{first:s,second:new i}];let c;for(;o.length>0;)if(c=o.shift(),c.second.from&&(c.first.to(c.second).active=!0,c.second.active=!0,c.first.traceActive(c.second,s)),yield f(),c.first.prev)c.second.active=!1,c.first.untraceActive(c.second,s);else{if(c.first.prev=c.second,c.first===n)break;for(const t of c.first.edges)c.first.to(t).prev||(t.consider=!0,c.first.to(t).consider=!0,o.push({first:c.first.to(t),second:t}),yield f(),t.consider=!1,c.first.to(t).consider=!1);c.second.from&&(c.first.to(c.second).active=!1,c.second.active=!1,c.first.untraceActive(c.second,s))}c.first===n&&c.first.traceUsed(c.second,s),e()}))},dijkstra:function(t,e){return d(this,void 0,void 0,(function*(){const s=t.nodes[0],n=t.nodes.slice(-1)[0],c=new o;var d;for(c.push(0,{first:s,second:new i});!c.empty();)if((d=c.pop()).second.second.from&&(d.second.first.to(d.second.second).active=!0,d.second.second.active=!0,d.second.first.traceActive(d.second.second,s)),yield f(),d.second.first.prev)d.second.second.active=!1,d.second.first.untraceActive(d.second.second,s);else{if(d.second.first.prev=d.second.second,d.second.first===n)break;for(const t of d.second.first.edges)d.second.first.to(t).prev||(t.consider=!0,d.second.first.to(t).consider=!0,c.push(d.first-t.cost,{first:d.second.first.to(t),second:t}),yield f(),t.consider=!1,d.second.first.to(t).consider=!1);d.second.second.from&&(d.second.first.to(d.second.second).active=!1,d.second.second.active=!1,d.second.first.untraceActive(d.second.second,s))}d.second.first===n&&d.second.first.traceUsed(d.second.second,s),e()}))},aStar:function(t,e){return d(this,void 0,void 0,(function*(){const s=t.nodes[0],n=t.nodes.slice(-1)[0],c=new o;var d;for(c.push(0,{first:0,second:{first:s,second:new i}});!c.empty();)if((d=c.pop()).second.second.second.from&&(d.second.second.first.to(d.second.second.second).active=!0,d.second.second.second.active=!0,d.second.second.first.traceActive(d.second.second.second,s)),yield f(),d.second.second.first.prev)d.second.second.second.active=!1,d.second.second.first.untraceActive(d.second.second.second,s);else{if(d.second.second.first.prev=d.second.second.second,d.second.second.first===n)break;for(const t of d.second.second.first.edges){if(d.second.second.first.to(t).prev)continue;const e=d.second.second.first.to(t);t.consider=!0,e.consider=!0;const s=d.first+d.second.first-t.cost,i=Math.sqrt(Math.pow(e.x-n.x,2)+Math.pow(e.y-n.y,2));c.push(s-i,{first:i,second:{first:e,second:t}}),yield f(),t.consider=!1,e.consider=!1}d.second.second.second.from&&(d.second.second.first.to(d.second.second.second).active=!1,d.second.second.second.active=!1,d.second.second.first.untraceActive(d.second.second.second,s))}d.second.second.first===n&&d.second.second.first.traceUsed(d.second.second.second,s),e()}))},bellmanFord:function(t,e){return d(this,void 0,void 0,(function*(){const s=t.nodes[0],i=t.nodes.slice(-1)[0],n=t.edges;let o=!0;s.cost=0;for(let t=0;t<n.length-1&&o;t++){o=!1;for(const t of n)t.setConsider(!0),yield f(),t.from.cost+t.cost<t.to.cost?(t.setActive(!0),t.to.cost=t.from.cost+t.cost,t.to.prev=t,yield f(),t.setActive(!1),o=!0):t.to.cost+t.cost<t.from.cost&&(t.setActive(!0),t.from.cost=t.to.cost+t.cost,t.from.prev=t,yield f(),t.setActive(!1),o=!0),t.setConsider(!1)}if(i.prev){let t=i;for(;t!==s;)t.used=!0,t.prev.used=!0,t=t.to(t.prev);t.used=!0}e()}))},floydWarshall:function(t,e){return d(this,void 0,void 0,(function*(){const s=t.edges,i=new Array(t.nodes.length).fill(null).map((e,s)=>new Array(t.nodes.length).fill(null).map((t,e)=>[s===e?0:Number.MAX_VALUE,-1,-1])),n=(e,s)=>{let n=[],o=i[e][s];for(;o[1]!==s&&-1!==o[1];)n.push(t.nodes[o[1]].edgeTo(t.nodes[o[2]])),o[1]!==o[2]?o=i[o[1]][o[2]]:(n.push(t.nodes[o[1]].edgeTo(t.nodes[i[o[1]][s][1]])),o=i[o[1]][s]);return n=n.filter(t=>t.from&&t.to),n.length>0?n:[t.nodes[e].edgeTo(t.nodes[s])]};for(const e of s){const[s,n]=[t.nodes.indexOf(e.from),t.nodes.indexOf(e.to)];e.setConsider(!0),yield f(),(e.cost<i[s][n][0]||e.cost<i[n][s][0])&&(e.setActive(!0),e.cost<i[s][n][0]&&(i[s][n]=[e.cost,n,n]),e.cost<i[n][s][0]&&(i[n][s]=[e.cost,s,s]),yield f(),e.setActive(!1)),e.setConsider(!1)}for(let e=0;e<t.nodes.length;e++)for(let s=0;s<t.nodes.length;s++)for(let o=0;o<t.nodes.length;o++){const t=i[s][e][0]+i[e][o][0],[c,d]=[n(s,e),n(e,o)];c.forEach(t=>t.setConsider(!0)),d.forEach(t=>t.setConsider(!0)),yield f(),t<i[s][o][0]&&(c.forEach(t=>t.setActive(!0)),d.forEach(t=>t.setActive(!0)),i[s][o]=[t,s,e],yield f(),c.forEach(t=>t.setActive(!1)),d.forEach(t=>t.setActive(!1))),c.forEach(t=>t.setConsider(!1)),d.forEach(t=>t.setConsider(!1))}n(0,t.nodes.length-1).forEach(t=>t.setUsed(!0)),t.nodes.slice(-1)[0].used=!0,e()}))},prims:function(t,e){return d(this,void 0,void 0,(function*(){const s=[],n=new o;var c;for(n.push(0,{first:t.nodes[0],second:new i});!n.empty();)if((c=n.pop()).second.second.from&&(c.second.second.active=!0),yield f(),c.second.first.active)c.second.second.active=!1;else{if(c.second.first.active=!0,c.second.second.from&&s.push(c.second.second),s.length===t.nodes.length-1)break;for(const t of c.second.first.edges)c.second.first.to(t).active||(t.consider=!0,c.second.first.to(t).consider=!0,n.push(-t.cost,{first:c.second.first.to(t),second:t}),yield f(),t.consider=!1,c.second.first.to(t).consider=!1)}for(const t of s)t.from.used=!0,t.to.used=!0,t.used=!0;s.length<t.nodes.length-1&&t.reset(),e()}))},kruskals:function(t,e){return d(this,void 0,void 0,(function*(){const s=[],i=[...new Set(t.nodes.map(t=>t.edges).flat())];i.sort((t,e)=>t.cost-e.cost);const n=new c(t.nodes.map(t=>t.id));let o;for(;i.length>0&&(o=i.shift(),o.setConsider(!0),yield f(),o.setConsider(!1),n.find(o.from.id)===n.find(o.to.id)||(n.union(o.from.id,o.to.id),o.setActive(!0),s.push(o),s.length!==t.nodes.length-1)););s.forEach(t=>t.setUsed(!0)),s.length<t.nodes.length-1&&t.reset(),e()}))},lcaBinaryLifting:function(t,e){return d(this,void 0,void 0,(function*(){e()}))},lcaEulerTour:function(t,e){return d(this,void 0,void 0,(function*(){e()}))}};class u{constructor(t=[]){this.nodes=t}addEdge(t,e,s){const n=new i(this.nodes[t],this.nodes[e],s);this.nodes[t].addEdge(n),this.nodes[e].addEdge(n)}get edges(){return[...new Set(this.nodes.map(t=>t.edges).flat())]}reset(){this.nodes.forEach(t=>{t.active=!1,t.used=!1,t.consider=!1,t.cost=Number.MAX_VALUE,t.prev=null,t.edges.forEach(t=>{t.active=!1,t.used=!1,t.consider=!1})})}clear(){n.reset(),this.nodes=[]}draw(t){t.clear();const e=[];this.nodes.forEach(s=>{s.drawEdges(t,e),e.push(s)}),this.nodes.forEach(e=>e.draw(t))}}class v{constructor(t){this.cvf=100,this.neu="#DEF2FF",this.can=t,this.ctx=t.getContext("2d")}get width(){return this.can.width}set width(t){this.can.width=t}get height(){return this.can.height}set height(t){this.can.height=t}cv(t){return this.can.width<this.can.height?this.cvx(t):this.cvy(t)}dv(t){return this.can.width<this.can.height?this.dvx(t):this.dvy(t)}cvx(t){let e=this.cvf;return this.can.width<this.can.height&&(e=this.can.width/this.can.height*this.cvf),this.can.width/e*t}dvx(t){let e=this.cvf;return this.can.width<this.can.height&&(e=this.can.width/this.can.height*this.cvf),t*e/this.can.width}cvy(t){let e=this.cvf;return this.can.height<this.can.width&&(e=this.can.height/this.can.width*this.cvf),this.can.height/this.cvf*t}dvy(t){let e=this.cvf;return this.can.height<this.can.width&&(e=this.can.height/this.can.width*this.cvf),t*e/this.can.height}circle(t,e,s,i="#000",n="rgba(0,0,0,.15)"){this.ctx.beginPath(),this.ctx.fillStyle=this.neu,this.ctx.ellipse(this.cvx(t),this.cvy(e),this.cv(s),this.cv(s),0,0,2*Math.PI),this.ctx.closePath(),this.ctx.fill(),this.ctx.beginPath(),this.ctx.strokeStyle=i,this.ctx.lineWidth=.4,this.ctx.fillStyle=n,this.ctx.ellipse(this.cvx(t),this.cvy(e),this.cv(s),this.cv(s),0,0,2*Math.PI),this.ctx.closePath(),this.ctx.fill(),this.ctx.stroke()}text(t,e,s,i,n="#000"){this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.font=this.cv(i)+"px sans-serif",this.ctx.fillStyle=n,this.ctx.fillText(t,this.cvx(e),this.cvy(s))}line(t,e,s,i,n="#555",o=.4){this.ctx.beginPath(),this.ctx.strokeStyle=n,this.ctx.lineWidth=this.cv(o),this.ctx.moveTo(this.cvx(t),this.cvy(e)),this.ctx.lineTo(this.cvx(s),this.cvy(i)),this.ctx.closePath(),this.ctx.stroke()}clear(){this.ctx.clearRect(0,0,this.can.width,this.can.height)}getBoundingClientRect(){return this.can.getBoundingClientRect()}}window.onload=()=>{const t=document.getElementById("sidebar"),e=new v(document.getElementById("main")),s=document.getElementById("rangein"),i=document.getElementById("timeout"),o=new u;a(o),window.onresize=()=>{e.width=null,e.height=null;const t=e.getBoundingClientRect();e.width=t.width,e.height=t.height,o.draw(e)},window.onresize(null),s.oninput=()=>{h(+s.value),i.innerHTML=s.value+"ms"},h(300),s.value="300",i.innerHTML="300ms";function c(){t.classList.remove("disabled")}Array.prototype.slice.call(document.getElementsByClassName("side-alg")).forEach(e=>{e.onclick=()=>{if(t.classList.contains("disabled"))return;const s=document.querySelector("div.side-alg.selected");s&&s.classList.remove("selected"),e.classList.add("selected"),t.classList.add("disabled"),o.clear(),"graph"===e.getAttribute("graph")?a(o):function(t){t.nodes=[new n(50,10),new n(25,25),new n(70,25),new n(10,40),new n(40,40),new n(85,40),new n(32.5,60),new n(47.5,60),new n(77.5,60),new n(28.75,80),new n(36.25,80),new n(74.25,80),new n(80.75,80)],t.addEdge(0,1,1),t.addEdge(0,2,1),t.addEdge(1,3,1),t.addEdge(1,4,1),t.addEdge(2,5,1),t.addEdge(4,6,1),t.addEdge(4,7,1),t.addEdge(5,8,1),t.addEdge(6,9,1),t.addEdge(6,10,1),t.addEdge(8,11,1),t.addEdge(8,12,1)}(o),l[e.getAttribute("alg")](o,c)}}),window.setInterval(()=>{o.draw(e)},10)}}]);