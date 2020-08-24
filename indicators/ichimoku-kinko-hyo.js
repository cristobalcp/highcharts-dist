/*
 Highstock JS v7.2.2 (2020-08-24)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?(d["default"]=d,module.exports=d):"function"===typeof define&&define.amd?define("highcharts/indicators/ichimoku-kinko-hyo",["highcharts","highcharts/modules/stock"],function(l){d(l);d.Highcharts=l;return d}):d("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(d){function l(d,m,l,y){d.hasOwnProperty(m)||(d[m]=y.apply(null,l))}d=d?d._modules:{};l(d,"indicators/ichimoku-kinko-hyo.src.js",[d["parts/Globals.js"],d["parts/Utilities.js"]],
function(d,m){function l(a){return a.reduce(function(a,b){return Math.max(a,b[1])},-Infinity)}function y(a){return a.reduce(function(a,b){return Math.min(a,b[2])},Infinity)}function z(a){return{high:l(a),low:y(a)}}function F(a){var e,b,t,d,h;a.series.forEach(function(a){if(a.xData)for(d=a.xData,h=b=a.xIncrement?1:d.length-1;0<h;h--)if(t=d[h]-d[h-1],e===p||t<e)e=t});return e}function G(a,e,b,d){if(a&&e&&b&&d){var t=e.plotX-a.plotX;e=e.plotY-a.plotY;var h=d.plotX-b.plotX;d=d.plotY-b.plotY;var l=a.plotX-
b.plotX,g=a.plotY-b.plotY;b=(-e*l+t*g)/(-h*e+t*d);h=(h*g-d*l)/(-h*e+t*d);if(0<=b&&1>=b&&0<=h&&1>=h)return{plotX:a.plotX+h*t,plotY:a.plotY+h*e}}return!1}function D(a){var e=a.indicator;e.points=a.points;e.nextPoints=a.nextPoints;e.color=a.color;e.options=B(a.options.senkouSpan.styles,a.gap);e.graph=a.graph;e.fillGraph=!0;w.prototype.drawGraph.call(e)}var E=m.defined,H=m.isArray,I=m.objectEach,p;m=d.seriesType;var B=d.merge,C=d.color,w=d.seriesTypes.sma;d.approximations["ichimoku-averages"]=function(){var a=
[],e;[].forEach.call(arguments,function(b,t){a.push(d.approximations.average(b));e=!e&&void 0===a[t]});return e?void 0:a};m("ikh","sma",{params:{period:26,periodTenkan:9,periodSenkouSpanB:52},marker:{enabled:!1},tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>TENKAN SEN: {point.tenkanSen:.3f}<br/>KIJUN SEN: {point.kijunSen:.3f}<br/>CHIKOU SPAN: {point.chikouSpan:.3f}<br/>SENKOU SPAN A: {point.senkouSpanA:.3f}<br/>SENKOU SPAN B: {point.senkouSpanB:.3f}<br/>'},
tenkanLine:{styles:{lineWidth:1,lineColor:void 0}},kijunLine:{styles:{lineWidth:1,lineColor:void 0}},chikouLine:{styles:{lineWidth:1,lineColor:void 0}},senkouSpanA:{styles:{lineWidth:1,lineColor:void 0}},senkouSpanB:{styles:{lineWidth:1,lineColor:void 0}},senkouSpan:{styles:{fill:"rgba(255, 0, 0, 0.5)"}},dataGrouping:{approximation:"ichimoku-averages"}},{pointArrayMap:["tenkanSen","kijunSen","chikouSpan","senkouSpanA","senkouSpanB"],pointValKey:"tenkanSen",nameComponents:["periodSenkouSpanB","period",
"periodTenkan"],init:function(){w.prototype.init.apply(this,arguments);this.options=B({tenkanLine:{styles:{lineColor:this.color}},kijunLine:{styles:{lineColor:this.color}},chikouLine:{styles:{lineColor:this.color}},senkouSpanA:{styles:{lineColor:this.color,fill:C(this.color).setOpacity(.5).get()}},senkouSpanB:{styles:{lineColor:this.color,fill:C(this.color).setOpacity(.5).get()}},senkouSpan:{styles:{fill:C(this.color).setOpacity(.2).get()}}},this.options)},toYData:function(a){return[a.tenkanSen,a.kijunSen,
a.chikouSpan,a.senkouSpanA,a.senkouSpanB]},translate:function(){var a=this;w.prototype.translate.apply(a);a.points.forEach(function(e){a.pointArrayMap.forEach(function(b){E(e[b])&&(e["plot"+b]=a.yAxis.toPixels(e[b],!0),e.plotY=e["plot"+b],e.tooltipPos=[e.plotX,e["plot"+b]],e.isNull=!1)})})},drawGraph:function(){var a=this,e=a.points,b=e.length,d=a.options,l=a.graph,h=a.color,m={options:{gapSize:d.gapSize}},g=a.pointArrayMap.length,n=[[],[],[],[],[],[]],c={tenkanLine:n[0],kijunLine:n[1],chikouLine:n[2],
senkouSpanA:n[3],senkouSpanB:n[4],senkouSpan:n[5]},u=[],f=a.options.senkouSpan,v=f.color||f.styles.fill,p=f.negativeColor,q=[[],[]],x=[[],[]],y=0,r,z,A;for(a.ikhMap=c;b--;){var k=e[b];for(r=0;r<g;r++)f=a.pointArrayMap[r],E(k[f])&&n[r].push({plotX:k.plotX,plotY:k["plot"+f],isNull:!1});p&&b!==e.length-1&&(f=c.senkouSpanB.length-1,k=G(c.senkouSpanA[f-1],c.senkouSpanA[f],c.senkouSpanB[f-1],c.senkouSpanB[f]),r={plotX:k.plotX,plotY:k.plotY,isNull:!1,intersectPoint:!0},k&&(c.senkouSpanA.splice(f,0,r),c.senkouSpanB.splice(f,
0,r),u.push(f)))}I(c,function(b,c){d[c]&&"senkouSpan"!==c&&(a.points=n[y],a.options=B(d[c].styles,m),a.graph=a["graph"+c],a.fillGraph=!1,a.color=h,w.prototype.drawGraph.call(a),a["graph"+c]=a.graph);y++});a.graphCollection&&a.graphCollection.forEach(function(b){a[b].destroy();delete a[b]});a.graphCollection=[];if(p&&c.senkouSpanA[0]&&c.senkouSpanB[0]){u.unshift(0);u.push(c.senkouSpanA.length-1);for(g=0;g<u.length-1;g++){f=u[g];k=u[g+1];b=c.senkouSpanB.slice(f,k+1);f=c.senkouSpanA.slice(f,k+1);if(1<=
Math.floor(b.length/2))if(k=Math.floor(b.length/2),b[k].plotY===f[k].plotY){for(A=r=k=0;A<b.length;A++)k+=b[A].plotY,r+=f[A].plotY;k=k>r?0:1}else k=b[k].plotY>f[k].plotY?0:1;else k=b[0].plotY>f[0].plotY?0:1;q[k]=q[k].concat(b);x[k]=x[k].concat(f)}["graphsenkouSpanColor","graphsenkouSpanNegativeColor"].forEach(function(b,c){q[c].length&&x[c].length&&(z=0===c?v:p,D({indicator:a,points:q[c],nextPoints:x[c],color:z,options:d,gap:m,graph:a[b]}),a[b]=a.graph,a.graphCollection.push(b))})}else D({indicator:a,
points:c.senkouSpanB,nextPoints:c.senkouSpanA,color:v,options:d,gap:m,graph:a.graphsenkouSpan}),a.graphsenkouSpan=a.graph;delete a.nextPoints;delete a.fillGraph;a.points=e;a.options=d;a.graph=l},getGraphPath:function(a){var e=[];a=a||this.points;if(this.fillGraph&&this.nextPoints){var b=w.prototype.getGraphPath.call(this,this.nextPoints);b[0]="L";var d=w.prototype.getGraphPath.call(this,a);b=b.slice(0,d.length);for(var l=b.length-1;0<l;l-=3)e.push(b[l-2],b[l-1],b[l]);d=d.concat(e)}else d=w.prototype.getGraphPath.apply(this,
arguments);return d},getValues:function(a,d){var b=d.period,e=d.periodTenkan;d=d.periodSenkouSpanB;var l=a.xData,h=a.yData,m=h&&h.length||0;a=F(a.xAxis);var g=[],n=[],c;if(l.length<=b||!H(h[0])||4!==h[0].length)return!1;var u=l[0]-b*a;for(c=0;c<b;c++)n.push(u+c*a);for(c=0;c<m;c++){if(c>=e){var f=h.slice(c-e,c);f=z(f);f=(f.high+f.low)/2}if(c>=b){var v=h.slice(c-b,c);v=z(v);v=(v.high+v.low)/2;var w=(f+v)/2}if(c>=d){var q=h.slice(c-d,c);q=z(q);q=(q.high+q.low)/2}u=h[c][3];var x=l[c];g[c]===p&&(g[c]=
[]);g[c+b]===p&&(g[c+b]=[]);g[c+b][0]=f;g[c+b][1]=v;g[c+b][2]=p;g[c][2]=u;c<=b&&(g[c+b][3]=p,g[c+b][4]=p);g[c+2*b]===p&&(g[c+2*b]=[]);g[c+2*b][3]=w;g[c+2*b][4]=q;n.push(x)}for(c=1;c<=b;c++)n.push(x+c*a);return{values:g,xData:n,yData:g}}});""});l(d,"masters/indicators/ichimoku-kinko-hyo.src.js",[],function(){})});
//# sourceMappingURL=ichimoku-kinko-hyo.js.map