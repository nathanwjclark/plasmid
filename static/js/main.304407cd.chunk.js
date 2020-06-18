(this["webpackJsonpcanvas-and-hooks"]=this["webpackJsonpcanvas-and-hooks"]||[]).push([[0],{13:function(e,t,a){},7:function(e,t,a){e.exports=a(8)},8:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a(2),i=a(3),r=a(5),s=a.n(r),l=a(0),c=a.n(l),h=(a(13),a(6));function u(e,t){return(e%t+t)%t}var g=b();function d(){var e=Object(l.useState)(g),t=Object(i.a)(e,2),a=t[0],n=t[1],r=c.a.useRef(null);return c.a.useEffect((function(){var e=r.current;e.width=e.offsetWidth,e.height=e.offsetHeight;var t=e.getContext("2d");t.clearRect(0,0,window.innerWidth,window.innerHeight),function(e,t){(function(e,t){var a=t.circle.radius,n=t.circle.origin.x,o=t.circle.origin.y,i="rgba(64,64,64,".concat(1,")");e.beginPath(),e.arc(n,o,a,0,2*Math.PI,!1),e.lineWidth=2,e.strokeStyle=i,e.stroke()})(e,t),function(e,t){var a=t.circle.radius-50,n=t.circle.origin,o=t.bases.length;0===o&&(o=1);for(var i=0,r=0,s=0;s<t.features.length;s++){var l=t.features[s];if(["promoter","enhancer","misc_RNA","CDS","polyA_signal","rep_origin","repeat_region"].includes(l.type)){l.start<i&&(a*=.85,r=1);var c=2*Math.PI*l.start/o,h=2*Math.PI*l.end/o,g=Math.pow(.95,1/t.zoom.zoomLevel),d=Math.pow(1.05,1/t.zoom.zoomLevel),f=Math.cos(c),M=Math.sin(c),v={x:f*a*g+n.x,y:M*a*g+n.y},b={x:f*a*d+n.x,y:M*a*d+n.y},y=2*Math.PI*(1/150)/t.zoom.zoomLevel;Math.abs(c-h)<.25&&(y=.2*Math.abs(c-h));var x=Math.cos(h-y),P=Math.sin(h-y),w={x:x*a*g+n.x,y:P*a*g+n.y},I={x:Math.cos(h)*a+n.x,y:Math.sin(h)*a+n.y},z={x:x*a*d+n.x,y:P*a*d+n.y};e.fillStyle=m(l.end/l.start,.9),e.beginPath(),e.moveTo(b.x,b.y),e.lineTo(v.x,v.y),e.arc(n.x,n.y,a*d,c,h-y,!1),e.lineTo(z.x,z.y),e.lineTo(I.x,I.y),e.lineTo(w.x,w.y),e.arc(n.x,n.y,a*g,h-y,c,!0),e.fill(),e.strokeStyle=m(l.end/l.start,.8),e.stroke(),p(e,l.name,a,n,c,h,g,d,l.end,l.start),1==r&&t.features[u(s+1,t.features.length)].start>i?(a*=1/.85,r=0):0==r&&(i=l.end)}}}(e,t),function(e,t){e.font="24px Arial",e.textAlign="center";var a=t.circle.origin.x,n=t.circle.origin.y;e.fillStyle="black",e.fillText(t.seqName,a,n-40),e.font="18px Arial";for(var o=t.purpose.split(" "),i=0,r="",s=0;s<o.length;s++){((r=r.concat(o[s]," ")).length>50||s==o.length-1)&&(e.fillText(r,a,n+i),i+=25,r="")}}(e,t),function(e,t){for(var a=t.circle,n=a.origin,i=Math.floor(4*a.radius/20),r=t.bases.length,s=a.radius+25,l=a.radius+75,c=[],h=0;h<t.features.length;h++){var u=t.features[h],g=u.start/r*Math.PI*2,d=Math.floor(u.start/r*i);if(!["promoter","enhancer","misc_RNA","CDS","polyA_signal","rep_origin","repeat_region"].includes(u.type)){e.textAlign="left";Math.PI;for(var m=g,f=0;f<c.length;f++){var M=c[f];Math.abs(Math.sin(m)-Math.sin(M))*i/2<1&&(m+=2*Math.PI/i)}m>.5*Math.PI&&m<1.5*Math.PI&&(e.textAlign="right"),e.beginPath(),e.strokeStyle="rgb(139,139,139)";var v=Math.cos(g)*a.radius+n.x,b=Math.sin(g)*a.radius+n.y;e.moveTo(v,b);var y=Math.cos(g)*s+n.x,p=Math.sin(g)*s+n.y;e.lineTo(y,p);var x=Math.cos(m)*l+n.x,P=Math.sin(m)*l+n.y;e.lineTo(x,P),e.stroke();var w=Math.cos(m)*(l+10)+n.x,I=Math.sin(m)*(l+10)+n.y+5;e.font="12px Arial";var z=u.name;if(z.includes("Kozak")||z.includes("kozak")?z="Kozak sequence":z.length>30&&(z=z.slice(0,30)+"..."),e.fillText(z,w,I),(c=[].concat(Object(o.a)(c),[m])).length===i)break}}}(e,t),"fullPlasmid"===t.scenario?(function(e,t){var a=t.selection.pointer;e.beginPath(),e.strokeStyle="rgb(68,68,68)",e.moveTo(Math.cos(a)*t.circle.radius*.8+t.circle.origin.x,Math.sin(a)*t.circle.radius*.8+t.circle.origin.y),e.lineTo(Math.cos(a)*t.circle.radius*1.2+t.circle.origin.x,Math.sin(a)*t.circle.radius*1.2+t.circle.origin.y),e.stroke()}(e,t),1==t.selection.activated&&function(e,t){var a=t.selection.start,n=t.selection.pointer;Math.PI,t.bases.length;e.strokeStyle="rgba(95,154,220,0.75)";e.beginPath(),e.moveTo(Math.cos(a)*t.circle.radius*.8+t.circle.origin.x,Math.sin(a)*t.circle.radius*.8+t.circle.origin.y),e.lineTo(Math.cos(a)*t.circle.radius*1.2+t.circle.origin.x,Math.sin(a)*t.circle.radius*1.2+t.circle.origin.y),e.stroke();var o=t.circle.radius,i=t.circle.origin,r={x:Math.cos(a)*t.circle.radius*1.2+t.circle.origin.x,y:Math.sin(a)*t.circle.radius*1.2+t.circle.origin.y},s={x:Math.cos(a)*t.circle.radius*.8+t.circle.origin.x,y:Math.sin(a)*t.circle.radius*.8+t.circle.origin.y},l={x:Math.cos(n)*t.circle.radius*1.2+t.circle.origin.x,y:Math.sin(n)*t.circle.radius*1.2+t.circle.origin.y},c={x:Math.cos(n)*t.circle.radius*.8+t.circle.origin.x,y:Math.sin(n)*t.circle.radius*.8+t.circle.origin.y};e.fillStyle="rgba(95,154,220,0.5)",e.beginPath(),e.moveTo(r.x,r.y),e.lineTo(s.x,s.y),n-a>0&&n-a<Math.PI||Math.abs(n-a)>Math.PI&&n-a<0?(e.arc(i.x,i.y,1.2*o,a,n,!1),e.lineTo(l.x,l.y),e.lineTo(c.x,c.y),e.arc(i.x,i.y,.8*o,n,a,!0)):(e.arc(i.x,i.y,1.2*o,n,a,!1),e.lineTo(c.x,c.y),e.lineTo(l.x,l.y),e.arc(i.x,i.y,.8*o,a,n,!0));e.fill()}(e,t)):"poly"===t.scenario?(!function(e,t){e.drawImage(t.image,t.poly.x-50,t.poly.y-125,window.innerWidth/6,window.innerWidth/6)}(e,t),x(e,t)):"arc"===t.scenario?x(e,t):"zoom"===t.scenario&&x(e,t)}(t,a)})),[a,n,r]}function m(e,t){var a=function(e){var t=1e4*Math.sin(e++);return t-Math.floor(t)}(e);return function(e,t,a){var n,o,i;if(e/=360,a/=100,0===(t/=100))n=o=i=a;else{var r=function(e,t,a){return a<0&&(a+=1),a>1&&(a-=1),a<1/6?e+6*(t-e)*a:a<.5?t:a<2/3?e+(t-e)*(2/3-a)*6:e},s=a<.5?a*(1+t):a+t-a*t,l=2*a-s;n=r(l,s,e+1/3),o=r(l,s,e),i=r(l,s,e-1/3)}var c=function(e){var t=Math.round(255*e).toString(16);return 1===t.length?"0"+t:t};return"#".concat(c(n)).concat(c(o)).concat(c(i))}(360*a,75,(85+10*a)*t)}function f(){var e=window.visualViewport.width/4;return e<200&&(e=200),Math.min(e,window.visualViewport.height/2.75)}function M(e){var t=function(e){var t,a=new XMLHttpRequest;return a.open("GET",e,!1),a.onreadystatechange=function(){4===a.readyState&&(200!==a.status&&0!=a.status||(t=a.responseText))},a.send(null),t}(e);return h(t)[0]}function v(e,t){for(var a=e,i=M(t),r=i.sequence.toUpperCase(),s=[],l=0;l<r.length;l++){var c=l,h=w(c,r.length,a.circle),u={number:c,letter:r[l],x:h.x+100*(Math.random()-.5),y:h.y+100*(Math.random()-.5),vx:0,vy:0,weight:1};s=[].concat(Object(o.a)(s),[u])}return a=Object(n.a)({},a,{bases:s,baseString:r,seqName:i.keywords,purpose:i.definition,link:t,features:i.features,annotations:y()})}function b(){var e=M("https://media.addgene.org/snapgene-media/v1.6.2-0-g4b4ed87/sequences/14/90/181490/addgene-plasmid-60957-sequence-181490.gbk"),t=.4;window.visualViewport.width<1e3&&(t=.5);for(var a={radius:f(),origin:{x:window.visualViewport.width*t,y:window.visualViewport.height/2}},n=e.sequence.toUpperCase(),i=[],r=0;r<n.length;r++){var s=r,l=w(s,n.length,a),c={number:s,letter:n[r],x:l.x+100*(Math.random()-.5),y:l.y+100*(Math.random()-.5),vx:0,vy:0,weight:1};i=[].concat(Object(o.a)(i),[c])}var h=new Image;return h.src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Eukaryotic_RNA-polymerase_II_structure_1WCM.png",{scenario:"fullPlasmid",circle:a,seqName:e.keywords,link:"https://www.addgene.org/60957/",purpose:e.definition,bases:i,baseString:n,annotations:y(),features:e.features,selection:{start:-.4*Math.PI,end:-.6*Math.PI,endmax:-.6*Math.PI,activated:!1,mousex:null,mousey:null},zoom:{pointer:null,zoomLevel:1,isZooming:0,zoomDirection:-1,zoomCenter:0},poly:{x:100,y:100,target:-1},image:h}}function y(){return[{name:"Waldo",locus:1232},{name:"Wanda",locus:23},{name:"Aries",locus:24}]}function p(e,t,a,n,o,i,r,s,l,c){var h=Math.max(Math.min((s-r)*a/2,18),10);if(!(t.length*h*3.5>=a*(i-o)*2*Math.PI)){e.fillStyle="black",e.textAlign="center";Math.PI;for(var u=(i+o)/2,g=0;g<t.length;g++){var d=r+(s-r)/3,m=u-3.5*h*(t.length/2-g)/(2*Math.PI*a),f=m+.5*Math.PI,M=t[g];f>.5*Math.PI&&f<1.5*Math.PI&&(f+=Math.PI,M=t[t.length-g-1],d=r+2*(s-r)/3);var v=n.x+a*Math.cos(m)*d,b=n.y+a*Math.sin(m)*d;e.translate(v,b),e.rotate(f),e.fillStyle="rgb(64,64,64)",e.font=h+"px Andale Mono",e.fillText(M,0,0),e.resetTransform()}}}function x(e,t){var a=Math.floor(t.selection.start/(2*Math.PI)*t.bases.length),n=Math.floor(t.selection.end/(2*Math.PI)*t.bases.length),o=1-Math.pow(1/t.zoom.zoomLevel,.5),i="rgba(160,160,160,".concat(o,")"),r=!1;if(t.selection.start-t.selection.end>Math.PI&&t.selection.start>1.5*Math.PI||t.selection.start-t.selection.end<-Math.PI&&t.selection.start<.5*Math.PI)r=!0;if(!1===r)for(var s=a;s<n;s++){var l=t.bases[s];t.bases[u(s+1,t.bases.length)];e.beginPath(),e.arc(l.x,l.y,l.weight*t.zoom.zoomLevel/10,0,2*Math.PI,!1),e.lineWidth=2,e.strokeStyle=i;var c="";c="A"===l.letter?"rgba(91,183,248,".concat(o,")"):"C"===l.letter?"rgba(201,161,92,".concat(o,")"):"G"===l.letter?"rgba(19,153,23,".concat(o,")"):"T"===l.letter?"rgba(227,111,111,".concat(o,")"):"rgba(255,255,255,".concat(o,")"),e.fillStyle=c,e.stroke(),e.font="24px Arial",e.textAlign="center",e.fillText(l.letter,l.x,l.y+8)}else if(a>n)for(s=a;s<t.bases.length+n;s++){l=t.bases[u(s,t.bases.length)],t.bases[u(s+1,t.bases.length)];e.beginPath(),e.arc(l.x,l.y,l.weight*t.zoom.zoomLevel/10,0,2*Math.PI,!1),e.lineWidth=2,e.strokeStyle=i;c="";c="A"===l.letter?"rgba(91,183,248,".concat(o,")"):"C"===l.letter?"rgba(201,161,92,".concat(o,")"):"G"===l.letter?"rgba(19,153,23,".concat(o,")"):"T"===l.letter?"rgba(227,111,111,".concat(o,")"):"rgba(255,255,255,".concat(o,")"),e.fillStyle=c,e.stroke(),e.font="24px Arial",e.textAlign="center",e.fillText(l.letter,l.x,l.y+8)}else for(s=a+t.bases.length;s>n;s--){l=t.bases[u(s,t.bases.length)],t.bases[u(s+1,t.bases.length)];e.beginPath(),e.arc(l.x,l.y,l.weight*t.zoom.zoomLevel/10,0,2*Math.PI,!1),e.lineWidth=2,e.strokeStyle=i;c="";c="A"===l.letter?"rgba(91,183,248,".concat(o,")"):"C"===l.letter?"rgba(201,161,92,".concat(o,")"):"G"===l.letter?"rgba(19,153,23,".concat(o,")"):"T"===l.letter?"rgba(227,111,111,".concat(o,")"):"rgba(255,255,255,".concat(o,")"),e.fillStyle=c,e.stroke(),e.font="24px Arial",e.textAlign="center",e.fillText(l.letter,l.x,l.y+8)}}function P(e,t,a){var n=w(e.number,a,t),o=e;return Math.abs(n.x-o.x)>0&&(o.vx+=Math.pow(Math.abs(n.x-o.x),.5)*Math.sign(n.x-o.x)+10*(Math.random()-.5)),Math.abs(n.y-o.y)>0&&(o.vy+=Math.pow(Math.abs(n.y-o.y),.5)*Math.sign(n.y-o.y)+10*(Math.random()-.5)),o.vx*=1/3,o.vy*=1/3,o.x+=o.vx,o.y+=o.vy,o}function w(e,t,a){var n=2*Math.PI/t;return{x:Math.cos(n*e)*(a.radius+25)+a.origin.x,y:Math.sin(n*e)*(a.radius+25)+a.origin.y}}function I(e,t){var a=e.selection.end-e.selection.start;a<-Math.PI?a+=2*Math.PI:(e.selection.start-e.selection.end>Math.PI&&e.selection.start>1.5*Math.PI||e.selection.start-e.selection.end<-Math.PI&&e.selection.start<.5*Math.PI)&&(a=-a+2*Math.PI);var n=Math.floor(a/(2*Math.PI)*e.bases.length);n<10&&(n=10);var o=e.baseString.length/n/2,i=function(e,t,a){return 0===e.zoom.isZooming&&!0===t?(e.zoom.zoomDirection*=-1,e.zoom.isZooming=1,"fullPlasmid"===e.scenario&&(e.selection.start-e.selection.end>Math.PI&&e.selection.start>1.5*Math.PI||e.selection.start-e.selection.end<-Math.PI&&e.selection.start<.5*Math.PI?e.zoom.zoomCenter=(e.selection.start+e.selection.end)/2+Math.PI:e.zoom.zoomCenter=(e.selection.start+e.selection.end)/2)):1===e.zoom.isZooming&&e.zoom.zoomLevel>=a&&1===e.zoom.zoomDirection?(e.zoom.isZooming=0,e.scenario="arc"):1===e.zoom.isZooming&&e.zoom.zoomLevel<=1&&-1===e.zoom.zoomDirection?(e.zoom.isZooming=0,e.scenario="fullPlasmid"):e.scenario="zoom",e}(e,t,o),r=(i.zoom.zoomLevel,Math.pow(1.05,i.zoom.zoomDirection)),s=i.circle.radius;i.circle.radius*=r,i.zoom.zoomLevel*=r;var l=f();i.circle.radius<l?(i.circle.radius=l,i.zoom.zoomLevel=1):i.circle.radius>l*o&&(i.circle.radius=l*o,i.zoom.zoomLevel=o);var c=0;c=5*i.zoom.zoomDirection;var h=i.circle.radius-s+c,u=i.zoom.zoomCenter+Math.PI;return i.circle.origin.x+=h*Math.cos(u),i.circle.origin.y+=h*Math.sin(u),i}function z(e,t,a){var n=e;if("down"==a)n.selection.activated=!0,n.selection.start=n.selection.pointer;else if("up"==a){if(n.selection.activated=!1,n.selection.end=n.selection.pointer,n.selection.start>n.selection.end&&n.selection.start-n.selection.end<Math.PI){var o=n.selection.start;n.selection.start=n.selection.end,n.selection.end=o}n=I(n,!0)}return"fullPlasmid"==e.scenario||(n=n),n}function k(e){var t=e;1===t.zoom.isZooming&&(t=I(t,!1));var a=t.bases,o=!1,i=e.selection.start,r=e.selection.end;if(i-r>Math.PI&&i>1.5*Math.PI||i-r<-Math.PI&&i<.5*Math.PI){var s=i;i=r,r=s;o=!0}var l,c,h=Math.floor(i/(2*Math.PI)*e.bases.length),u=Math.floor(r/(2*Math.PI)*e.bases.length);if("arc"===t.scenario||"zoom"===t.scenario||"poly"===t.scenario)if(!1===o?(l=h,c=u):(l=u,c=h),!1===o)for(var g=0;g<t.bases.length;g++){g>=l&&g<=c&&(a[g]=P(a[g],t.circle,t.bases.length))}else for(g=0;g<t.bases.length;g++){(g<=l||g>=c)&&(a[g]=P(a[g],t.circle,t.bases.length))}return"poly"===(t=Object(n.a)({},t,{bases:a})).scenario&&(t=function(e,t,a){var o=e,i=o.poly,r=o.scenario;i.target<t&&(i.target=t,i.x=-250,i.y=-250,r="poly");var s=o.bases[i.target],l=s.x-i.x,c=s.y-i.y;return Math.abs(l+c)<10?o.poly.target+=1:(i.x+=l/10,i.y+=c/10,i.target>t&&(o.bases[i.target].x-=10,o.bases[i.target].y-=10,o.bases[i.target+1].x-=7,o.bases[i.target+1].y-=7,o.bases[i.target+2].x-=4,o.bases[i.target+2].y-=4)),i.target>a&&(i.target=-1,r="arc"),o=Object(n.a)({},o,{poly:i,scenario:r})}(t,h,u)),t}s.a.render(c.a.createElement((function(){var e=d(),t=Object(i.a)(e,3),a=t[0],o=t[1],r=t[2];return c.a.useEffect((function(){var e=setInterval((function(){o(k(a))}),10);return function(){clearInterval(e)}})),window.onresize=function(){o(Object(n.a)({},a,{circle:{radius:f(),origin:{x:.4*window.innerWidth,y:window.innerHeight/2}}}))},c.a.createElement("div",null,c.a.createElement("canvas",{ref:r,style:{width:"100vw",height:"100vh",border:"1px solid black"},onClick:function(e){},onMouseMove:function(e){o(function(e,t){var a=e,n=e.circle.origin,o=t.clientX,i=t.clientY,r=i-n.y,s=o-n.x,l=(Math.sqrt(Math.pow(o-n.x,2)+Math.pow(r,2)),Math.atan2(r,s));return l<0&&(l+=2*Math.PI),Math.PI,a.selection.pointer=l,a.selection.mousex=o,a.selection.mousey=i,a}(a,e))},onMouseDown:function(e){o(z(a,0,"down"))},onMouseUp:function(e){o(z(a,0,"up"))},display:"inline-block"}),c.a.createElement("div",null,c.a.createElement("div",{id:"menuToggle"},c.a.createElement("input",{type:"checkbox",id:"hamburger",onClick:function(){document.getElementsByClassName("menu")[0].classList.toggle("change")}}),c.a.createElement("span",null),c.a.createElement("span",null),c.a.createElement("span",null),c.a.createElement("div",{id:"menu",className:"menu"},c.a.createElement("div",{id:"selection",className:"menuHeader"},"1. Select a plasmid"),c.a.createElement("select",{name:"plasmids",id:"plasmidSelector",onChange:function(e){o(v(a,e.target.value))}},c.a.createElement("option",{value:"https://media.addgene.org/snapgene-media/v1.6.2-0-g4b4ed87/sequences/14/90/181490/addgene-plasmid-60957-sequence-181490.gbk"},"PX551, Feng Zhang Lab (default)"),c.a.createElement("option",{value:"https://media.addgene.org/snapgene-media/v1.6.2-0-g4b4ed87/sequences/02/51/60251/addgene-plasmid-44250-sequence-60251.gbk"},"pwtCas9, Stanley Qi Lab"),c.a.createElement("option",{value:"https://media.addgene.org/snapgene-media/v1.6.2-0-g4b4ed87/sequences/10/71/171071/addgene-plasmid-50474-sequence-171071.gbk"},"mCherry, Bryan Roth Lab"),c.a.createElement("option",{value:"https://media.addgene.org/snapgene-media/v1.6.2-0-g4b4ed87/sequences/24/14/142414/addgene-plasmid-18917-sequence-142414.gbk"},"tdTomato, Scott Sternson Lab"),c.a.createElement("option",{value:"https://media.addgene.org/snapgene-media/v1.6.2-0-g4b4ed87/sequences/06/36/200636/addgene-plasmid-17576-sequence-200636.gbk"},"pLTR for human stem cells, Jakob Reiser Lab")),c.a.createElement("label",{for:"plasmid"},"Or, enter the url for a ",c.a.createElement("a",{href:"https://www.ncbi.nlm.nih.gov/genbank/"},c.a.createElement("u",null,"GenBank"))," (.gbk) file:"),c.a.createElement("input",{type:"text",id:"plasmid",placeholder:"url",onChange:function(e){o(Object(n.a)({},a,{link:e.target.value}))}}),c.a.createElement("button",{id:"plasmidGo",onClick:function(){o(v(a,a.link))}},"Go"),c.a.createElement("div",{id:"plasmid",className:"menuHeader"},"2. Plasmid Controls"),c.a.createElement("button",{onClick:function(){o(I(a,!0))}},"Zoom"),c.a.createElement("button",{onClick:function(){"arc"===a.scenario&&o(Object(n.a)({},a,{scenario:"poly"}))}},"Poly"),c.a.createElement("div",{id:"debug",className:"menuHeader"},"Debug"),c.a.createElement("button",{onClick:function(){o(b())}},"Reset"),c.a.createElement("button",{onClick:function(){console.log(a)}},"Console Dump")))))}),null),document.getElementById("root"))}},[[7,1,2]]]);
//# sourceMappingURL=main.304407cd.chunk.js.map