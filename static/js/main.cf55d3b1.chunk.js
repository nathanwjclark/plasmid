(this["webpackJsonpcanvas-and-hooks"]=this["webpackJsonpcanvas-and-hooks"]||[]).push([[0],{13:function(e,t,n){},7:function(e,t,n){e.exports=n(8)},8:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n(2),i=n(3),r=n(5),s=n.n(r),c=n(0),l=n.n(c),h=(n(13),n(6));function g(e,t){return(e%t+t)%t}function u(){var e=Object(c.useState)({scenario:"fullPlasmid",circle:{radius:M(),origin:{x:.4*window.innerWidth,y:window.innerHeight/2}},seqName:"",link:"",purpose:"",bases:[],baseString:"",annotations:[],features:[],selection:{pointer:null,start:0,end:0,endmax:0,activated:!1,mousex:null,mousey:null},zoom:{zoomLevel:1,isZooming:0,zoomDirection:-1,zoomCenter:0},poly:{x:100,y:100,target:-1},image:""}),t=Object(i.a)(e,2),n=t[0],a=t[1],r=l.a.useRef(null);return l.a.useEffect((function(){var e=r.current;e.width=e.offsetWidth,e.height=e.offsetHeight;var t=e.getContext("2d");t.clearRect(0,0,window.innerWidth,window.innerHeight),function(e,t){(function(e,t){var n=t.circle.radius,a=t.circle.origin.x,o=t.circle.origin.y,i="rgba(64,64,64,".concat(1,")");e.beginPath(),e.arc(a,o,n,0,2*Math.PI,!1),e.lineWidth=2,e.strokeStyle=i,e.stroke()})(e,t),function(e,t){var n=t.circle.radius-50,a=t.circle.origin,o=t.bases.length;0===o&&(o=1);for(var i=0,r=0,s=0;s<t.features.length;s++){var c=t.features[s];if(["promoter","enhancer","misc_RNA","CDS","polyA_signal","rep_origin","repeat_region"].includes(c.type)){c.start<i&&(n*=.85,r=1);var l=2*Math.PI*c.start/o,h=Math.pow(.95,1/t.zoom.zoomLevel),u=Math.pow(1.05,1/t.zoom.zoomLevel),M=Math.cos(l),m=Math.sin(l),f={x:M*n*h+a.x,y:m*n*h+a.y},x={x:M*n*u+a.x,y:m*n*u+a.y},b=2*Math.PI*c.end/t.baseString.length,v=2*Math.PI*(1/150)/t.zoom.zoomLevel;Math.abs(l-b)<.25&&(v=.2*Math.abs(l-b));var p=Math.cos(b-v),P=Math.sin(b-v),z={x:p*n*h+a.x,y:P*n*h+a.y},I={x:Math.cos(b)*n+a.x,y:Math.sin(b)*n+a.y},w={x:p*n*u+a.x,y:P*n*u+a.y};e.fillStyle=d(c.end/c.start,.9),e.beginPath(),e.moveTo(x.x,x.y),e.lineTo(f.x,f.y),e.arc(a.x,a.y,n*u,l,b-v,!1),e.lineTo(w.x,w.y),e.lineTo(I.x,I.y),e.lineTo(z.x,z.y),e.arc(a.x,a.y,n*h,b-v,l,!0),e.fill(),e.strokeStyle=d(c.end/c.start,.8),e.stroke(),y(e,c.name,n,a,l,b,h,u,c.end,c.start),1==r&&t.features[g(s+1,t.features.length)].start>i?(n*=1/.85,r=0):0==r&&(i=c.end)}}}(e,t),function(e,t){e.font="24px Arial",e.textAlign="center";var n=t.circle.origin.x,a=t.circle.origin.y;e.fillStyle="black",e.fillText(t.seqName,n,a-40),e.font="18px Arial";for(var o=t.purpose.split(" "),i=0,r="",s=0;s<o.length;s++){((r=r.concat(o[s]," ")).length>50||s==o.length-1)&&(e.fillText(r,n,a+i),i+=25,r="")}}(e,t),function(e,t){for(var n=t.circle,a=n.origin,i=Math.floor(4*n.radius/20),r=t.bases.length,s=n.radius+25,c=n.radius+75,l=[],h=0;h<t.features.length;h++){var g=t.features[h],u=g.start/r*Math.PI*2,d=Math.floor(g.start/r*i);if(!["promoter","enhancer","misc_RNA","CDS","polyA_signal","rep_origin","repeat_region"].includes(g.type)){e.textAlign="left";Math.PI;for(var M=u,m=0;m<l.length;m++){var f=l[m];Math.abs(Math.sin(M)-Math.sin(f))*i/2<1&&(M+=2*Math.PI/i)}M>.5*Math.PI&&M<1.5*Math.PI&&(e.textAlign="right"),e.beginPath(),e.strokeStyle="rgb(139,139,139)";var y=Math.cos(u)*n.radius+a.x,x=Math.sin(u)*n.radius+a.y;e.moveTo(y,x);var b=Math.cos(u)*s+a.x,v=Math.sin(u)*s+a.y;e.lineTo(b,v);var p=Math.cos(M)*c+a.x,P=Math.sin(M)*c+a.y;e.lineTo(p,P),e.stroke();var z=Math.cos(M)*(c+10)+a.x,I=Math.sin(M)*(c+10)+a.y+5;e.font="12px Arial";var w=g.name;if(w.includes("Kozak")||w.includes("kozak")?w="Kozak sequence":w.length>30&&(w=w.slice(0,30)+"..."),e.fillText(w,z,I),(l=[].concat(Object(o.a)(l),[M])).length===i)break}}}(e,t),"fullPlasmid"===t.scenario?(function(e,t){var n=t.selection.pointer;e.beginPath(),e.strokeStyle="rgb(68,68,68)",e.moveTo(Math.cos(n)*t.circle.radius*.8+t.circle.origin.x,Math.sin(n)*t.circle.radius*.8+t.circle.origin.y),e.lineTo(Math.cos(n)*t.circle.radius*1.2+t.circle.origin.x,Math.sin(n)*t.circle.radius*1.2+t.circle.origin.y),e.stroke()}(e,t),1==t.selection.activated&&function(e,t){var n=t.selection.start,a=t.selection.pointer;Math.PI,t.bases.length;e.strokeStyle="rgba(95,154,220,0.75)";e.beginPath(),e.moveTo(Math.cos(n)*t.circle.radius*.8+t.circle.origin.x,Math.sin(n)*t.circle.radius*.8+t.circle.origin.y),e.lineTo(Math.cos(n)*t.circle.radius*1.2+t.circle.origin.x,Math.sin(n)*t.circle.radius*1.2+t.circle.origin.y),e.stroke();var o=t.circle.radius,i=t.circle.origin,r={x:Math.cos(n)*t.circle.radius*1.2+t.circle.origin.x,y:Math.sin(n)*t.circle.radius*1.2+t.circle.origin.y},s={x:Math.cos(n)*t.circle.radius*.8+t.circle.origin.x,y:Math.sin(n)*t.circle.radius*.8+t.circle.origin.y},c={x:Math.cos(a)*t.circle.radius*1.2+t.circle.origin.x,y:Math.sin(a)*t.circle.radius*1.2+t.circle.origin.y},l={x:Math.cos(a)*t.circle.radius*.8+t.circle.origin.x,y:Math.sin(a)*t.circle.radius*.8+t.circle.origin.y};e.fillStyle="rgba(95,154,220,0.5)",e.beginPath(),e.moveTo(r.x,r.y),e.lineTo(s.x,s.y),a-n>0&&a-n<Math.PI||Math.abs(a-n)>Math.PI&&a-n<0?(e.arc(i.x,i.y,1.2*o,n,a,!1),e.lineTo(c.x,c.y),e.lineTo(l.x,l.y),e.arc(i.x,i.y,.8*o,a,n,!0)):(e.arc(i.x,i.y,1.2*o,a,n,!1),e.lineTo(l.x,l.y),e.lineTo(c.x,c.y),e.arc(i.x,i.y,.8*o,n,a,!0));e.fill()}(e,t)):"poly"===t.scenario?(!function(e,t){e.drawImage(t.image,t.poly.x-50,t.poly.y-125,window.innerWidth/6,window.innerWidth/6)}(e,t),x(e,t)):"arc"===t.scenario?x(e,t):"zoom"===t.scenario&&x(e,t)}(t,n)})),[n,a,r]}function d(e,t){var n=function(e){var t=1e4*Math.sin(e++);return t-Math.floor(t)}(e);return function(e,t,n){var a,o,i;if(e/=360,n/=100,0===(t/=100))a=o=i=n;else{var r=function(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e},s=n<.5?n*(1+t):n+t-n*t,c=2*n-s;a=r(c,s,e+1/3),o=r(c,s,e),i=r(c,s,e-1/3)}var l=function(e){var t=Math.round(255*e).toString(16);return 1===t.length?"0"+t:t};return"#".concat(l(a)).concat(l(o)).concat(l(i))}(360*n,75,(85+10*n)*t)}function M(){return Math.min(window.innerWidth/4,window.innerHeight/2.75)}function m(){new FileReader;for(var e=function(e){return h(e)}(function(e){var t,n=new XMLHttpRequest;return n.open("GET",e,!1),n.onreadystatechange=function(){4===n.readyState&&(200!==n.status&&0!=n.status||(t=n.responseText))},n.send(null),t}("https://media.addgene.org/snapgene-media/v1.6.2-0-g4b4ed87/sequences/75/11/267511/addgene-plasmid-18916-sequence-267511.gbk"))[0],t={radius:M(),origin:{x:.4*window.innerWidth,y:window.innerHeight/2}},n=e.sequence.toUpperCase(),a=[],i=0;i<n.length;i++){var r=i,s=v(r,n.length,t),c={number:r,letter:n[i],x:s.x+100*(Math.random()-.5),y:s.y+100*(Math.random()-.5),vx:0,vy:0,weight:1};a=[].concat(Object(o.a)(a),[c])}var l=new Image;return l.src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Eukaryotic_RNA-polymerase_II_structure_1WCM.png",{scenario:"fullPlasmid",circle:t,seqName:e.keywords,link:"https://www.addgene.org/60957/",purpose:e.definition,bases:a,baseString:n,annotations:f(),features:e.features,selection:{start:-.4*Math.PI,end:-.6*Math.PI,endmax:-.6*Math.PI,activated:!1,mousex:null,mousey:null},zoom:{pointer:null,zoomLevel:1,isZooming:0,zoomDirection:-1,zoomCenter:0},poly:{x:100,y:100,target:-1},image:l}}function f(){return[{name:"Waldo",locus:1232},{name:"Wanda",locus:23},{name:"Aries",locus:24}]}function y(e,t,n,a,o,i,r,s,c,l){var h=Math.max(Math.min((s-r)*n/2,18),10);if(!(t.length*h*3.5>=n*(i-o)*2*Math.PI)){e.fillStyle="black",e.textAlign="center";Math.PI;for(var g=(i+o)/2,u=0;u<t.length;u++){var d=r+(s-r)/3,M=g-3.5*h*(t.length/2-u)/(2*Math.PI*n),m=M+.5*Math.PI,f=t[u];m>.5*Math.PI&&m<1.5*Math.PI&&(m+=Math.PI,f=t[t.length-u-1],d=r+2*(s-r)/3);var y=a.x+n*Math.cos(M)*d,x=a.y+n*Math.sin(M)*d;e.translate(y,x),e.rotate(m),e.fillStyle="rgb(64,64,64)",e.font=h+"px Andale Mono",e.fillText(f,0,0),e.resetTransform()}}}function x(e,t){var n=Math.floor(t.selection.start/(2*Math.PI)*t.bases.length),a=Math.floor(t.selection.end/(2*Math.PI)*t.bases.length),o=1-Math.pow(1/t.zoom.zoomLevel,.5),i="rgba(160,160,160,".concat(o,")"),r=!1;if(t.selection.start-t.selection.end>Math.PI&&t.selection.start>1.5*Math.PI||t.selection.start-t.selection.end<-Math.PI&&t.selection.start<.5*Math.PI)r=!0;if(!1===r)for(var s=n;s<a;s++){var c=t.bases[s];t.bases[g(s+1,t.bases.length)];e.beginPath(),e.arc(c.x,c.y,c.weight*t.zoom.zoomLevel/10,0,2*Math.PI,!1),e.lineWidth=2,e.strokeStyle=i;var l="";l="A"===c.letter?"rgba(91,183,248,".concat(o,")"):"C"===c.letter?"rgba(201,161,92,".concat(o,")"):"G"===c.letter?"rgba(19,153,23,".concat(o,")"):"T"===c.letter?"rgba(227,111,111,".concat(o,")"):"rgba(255,255,255,".concat(o,")"),e.fillStyle=l,e.stroke(),e.font="24px Arial",e.textAlign="center",e.fillText(c.letter,c.x,c.y+8)}else if(n>a)for(s=n;s<t.bases.length+a;s++){c=t.bases[g(s,t.bases.length)],t.bases[g(s+1,t.bases.length)];e.beginPath(),e.arc(c.x,c.y,c.weight*t.zoom.zoomLevel/10,0,2*Math.PI,!1),e.lineWidth=2,e.strokeStyle=i;l="";l="A"===c.letter?"rgba(91,183,248,".concat(o,")"):"C"===c.letter?"rgba(201,161,92,".concat(o,")"):"G"===c.letter?"rgba(19,153,23,".concat(o,")"):"T"===c.letter?"rgba(227,111,111,".concat(o,")"):"rgba(255,255,255,".concat(o,")"),e.fillStyle=l,e.stroke(),e.font="24px Arial",e.textAlign="center",e.fillText(c.letter,c.x,c.y+8)}else for(s=n+t.bases.length;s>a;s--){c=t.bases[g(s,t.bases.length)],t.bases[g(s+1,t.bases.length)];e.beginPath(),e.arc(c.x,c.y,c.weight*t.zoom.zoomLevel/10,0,2*Math.PI,!1),e.lineWidth=2,e.strokeStyle=i;l="";l="A"===c.letter?"rgba(91,183,248,".concat(o,")"):"C"===c.letter?"rgba(201,161,92,".concat(o,")"):"G"===c.letter?"rgba(19,153,23,".concat(o,")"):"T"===c.letter?"rgba(227,111,111,".concat(o,")"):"rgba(255,255,255,".concat(o,")"),e.fillStyle=l,e.stroke(),e.font="24px Arial",e.textAlign="center",e.fillText(c.letter,c.x,c.y+8)}}function b(e,t,n){var a=v(e.number,n,t),o=e;return Math.abs(a.x-o.x)>0&&(o.vx+=Math.pow(Math.abs(a.x-o.x),.5)*Math.sign(a.x-o.x)+10*(Math.random()-.5)),Math.abs(a.y-o.y)>0&&(o.vy+=Math.pow(Math.abs(a.y-o.y),.5)*Math.sign(a.y-o.y)+10*(Math.random()-.5)),o.vx*=1/3,o.vy*=1/3,o.x+=o.vx,o.y+=o.vy,o}function v(e,t,n){var a=2*Math.PI/t;return{x:Math.cos(a*e)*(n.radius+25)+n.origin.x,y:Math.sin(a*e)*(n.radius+25)+n.origin.y}}function p(e,t){var n=e.selection.end-e.selection.start;n<-Math.PI?n+=2*Math.PI:(e.selection.start-e.selection.end>Math.PI&&e.selection.start>1.5*Math.PI||e.selection.start-e.selection.end<-Math.PI&&e.selection.start<.5*Math.PI)&&(n=-n+2*Math.PI);var a=Math.floor(n/(2*Math.PI)*e.bases.length);a<10&&(a=10);var o=e.baseString.length/a/2,i=function(e,t,n){return 0===e.zoom.isZooming&&!0===t?(e.zoom.zoomDirection*=-1,e.zoom.isZooming=1,"fullPlasmid"===e.scenario&&(e.selection.start-e.selection.end>Math.PI&&e.selection.start>1.5*Math.PI||e.selection.start-e.selection.end<-Math.PI&&e.selection.start<.5*Math.PI?e.zoom.zoomCenter=(e.selection.start+e.selection.end)/2+Math.PI:e.zoom.zoomCenter=(e.selection.start+e.selection.end)/2)):1===e.zoom.isZooming&&e.zoom.zoomLevel>=n&&1===e.zoom.zoomDirection?(e.zoom.isZooming=0,e.scenario="arc"):1===e.zoom.isZooming&&e.zoom.zoomLevel<=1&&-1===e.zoom.zoomDirection?(e.zoom.isZooming=0,e.scenario="fullPlasmid"):e.scenario="zoom",e}(e,t,o),r=(i.zoom.zoomLevel,Math.pow(1.05,i.zoom.zoomDirection)),s=i.circle.radius;i.circle.radius*=r,i.zoom.zoomLevel*=r;var c=M();i.circle.radius<c?(i.circle.radius=c,i.zoom.zoomLevel=1):i.circle.radius>c*o&&(i.circle.radius=c*o,i.zoom.zoomLevel=o);var l=0;l=5*i.zoom.zoomDirection;var h=i.circle.radius-s+l,g=i.zoom.zoomCenter+Math.PI;return i.circle.origin.x+=h*Math.cos(g),i.circle.origin.y+=h*Math.sin(g),i}function P(e,t,n){var a=e;if("down"==n)a.selection.activated=!0,a.selection.start=a.selection.pointer;else if("up"==n){if(a.selection.activated=!1,a.selection.end=a.selection.pointer,a.selection.start>a.selection.end&&a.selection.start-a.selection.end<Math.PI){var o=a.selection.start;a.selection.start=a.selection.end,a.selection.end=o}a=p(a,!0)}return"fullPlasmid"==e.scenario||(a=a),a}function z(e){var t=e;1===t.zoom.isZooming&&(t=p(t,!1));var n=t.bases,o=!1,i=e.selection.start,r=e.selection.end;if(i-r>Math.PI&&i>1.5*Math.PI||i-r<-Math.PI&&i<.5*Math.PI){var s=i;i=r,r=s;o=!0}var c,l,h=Math.floor(i/(2*Math.PI)*e.bases.length),g=Math.floor(r/(2*Math.PI)*e.bases.length);if("arc"===t.scenario||"zoom"===t.scenario||"poly"===t.scenario)if(!1===o?(c=h,l=g):(c=g,l=h),!1===o)for(var u=0;u<t.bases.length;u++){u>=c&&u<=l&&(n[u]=b(n[u],t.circle,t.bases.length))}else for(u=0;u<t.bases.length;u++){(u<=c||u>=l)&&(n[u]=b(n[u],t.circle,t.bases.length))}return"poly"===(t=Object(a.a)({},t,{bases:n})).scenario&&(t=function(e,t,n){var o=e,i=o.poly,r=o.scenario;i.target<t&&(i.target=t,i.x=-250,i.y=-250,r="poly");var s=o.bases[i.target],c=s.x-i.x,l=s.y-i.y;return Math.abs(c+l)<10?o.poly.target+=1:(i.x+=c/10,i.y+=l/10,i.target>t&&(o.bases[i.target].x-=10,o.bases[i.target].y-=10,o.bases[i.target+1].x-=7,o.bases[i.target+1].y-=7,o.bases[i.target+2].x-=4,o.bases[i.target+2].y-=4)),i.target>n&&(i.target=-1,r="arc"),o=Object(a.a)({},o,{poly:i,scenario:r})}(t,h,g)),t}s.a.render(l.a.createElement((function(){var e=u(),t=Object(i.a)(e,3),n=t[0],r=t[1],s=t[2];return l.a.useEffect((function(){var e=setInterval((function(){r(z(n))}),10);return function(){clearInterval(e)}})),window.onresize=function(){r(Object(a.a)({},n,{circle:{radius:M(),origin:{x:.4*window.innerWidth,y:window.innerHeight/2}}}))},l.a.createElement("div",null,l.a.createElement("canvas",{ref:s,style:{width:"100vw",height:"100vh",border:"1px solid black"},onClick:function(e){},onMouseMove:function(e){r(function(e,t){var n=e,a=e.circle.origin,o=t.clientX,i=t.clientY,r=i-a.y,s=o-a.x,c=(Math.sqrt(Math.pow(o-a.x,2)+Math.pow(r,2)),Math.atan2(r,s));return c<0&&(c+=2*Math.PI),Math.PI,n.selection.pointer=c,n.selection.mousex=o,n.selection.mousey=i,n}(n,e))},onMouseDown:function(e){r(P(n,0,"down"))},onMouseUp:function(e){r(P(n,0,"up"))},display:"inline-block"}),l.a.createElement("div",{className:"controls"},l.a.createElement("button",{onClick:function(){r(m())}},"Default"),l.a.createElement("button",{onClick:function(){r(p(n,!0))}},"Zoom"),l.a.createElement("button",{onClick:function(){"arc"===n.scenario&&r(Object(a.a)({},n,{scenario:"poly"}))}},"Poly"),l.a.createElement("button",{onClick:function(){console.log(n)}},"Debug"),l.a.createElement("input",{onChange:function(e){var t=n;t.bases=function(e,t,n,a){for(var i=n,r=0;r<e.length-t.length;r++){var s=n.length+r,c=v(s,e.length,a),l={number:s,letter:e[n.length+r],x:c.x+100*(Math.random()-.5),y:c.y+100*(Math.random()-.5),vx:0,vy:0,weight:1};i=[].concat(Object(o.a)(i),[l])}return i}(e.target.value,n.baseString,n.bases,n.circle),r(t),r(Object(a.a)({},n,{baseString:e.target.value}))}})))}),null),document.getElementById("root"))}},[[7,1,2]]]);
//# sourceMappingURL=main.cf55d3b1.chunk.js.map