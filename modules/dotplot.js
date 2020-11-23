/*
 Highcharts JS v8.2.2 (2020-11-23)

 Dot plot series type for Highcharts

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/dotplot",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,m,d,b){a.hasOwnProperty(m)||(a[m]=b.apply(null,d))}a=a?a._modules:{};b(a,"Series/DotPlot/DotPlotSymbols.js",[a["Core/Renderer/SVG/SVGRenderer.js"]],function(a){a.prototype.symbols.rect=function(b,d,f,
n,g){return a.prototype.symbols.callout(b,d,f,n,g)}});b(a,"Series/DotPlot/DotPlotSeries.js",[a["Core/Series/Series.js"],a["Series/Column/ColumnSeries.js"],a["Core/Utilities.js"]],function(a,b,d){var f=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b])};return a(b,c)};return function(b,c){function d(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):
(d.prototype=c.prototype,new d)}}(),n=d.extend,g=d.merge,m=d.objectEach,t=d.pick;d=function(a){function d(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.options=void 0;c.points=void 0;return c}f(d,a);d.prototype.drawPoints=function(){var a=this,b=a.chart.renderer,d=this.options.marker,f=this.yAxis.transA*a.options.itemPadding,g=this.borderWidth%2?.5:1;this.points.forEach(function(e){var c;var h=e.marker||{};var u=h.symbol||d.symbol,x=t(h.radius,d.radius),v="rect"!==u;e.graphics=c=
e.graphics||{};var p=e.pointAttr?e.pointAttr[e.selected?"selected":""]||a.pointAttr[""]:a.pointAttribs(e,e.selected&&"select");delete p.r;a.chart.styledMode&&(delete p.stroke,delete p["stroke-width"]);if(null!==e.y){e.graphic||(e.graphic=b.g("point").add(a.group));var l=e.y;var w=t(e.stackY,e.y);var q=Math.min(e.pointWidth,a.yAxis.transA-f);for(h=w;h>w-e.y;h--){var k=e.barX+(v?e.pointWidth/2-q/2:0);var r=a.yAxis.toPixels(h,!0)+f/2;a.options.crisp&&(k=Math.round(k)-g,r=Math.round(r)+g);k={x:k,y:r,
width:Math.round(v?q:e.pointWidth),height:Math.round(q),r:x};c[l]?c[l].animate(k):c[l]=b.symbol(u).attr(n(k,p)).add(e.graphic);c[l].isActive=!0;l--}}m(c,function(a,b){a.isActive?a.isActive=!1:(a.destroy(),delete a[b])})})};d.defaultOptions=g(b.defaultOptions,{itemPadding:.2,marker:{symbol:"circle",states:{hover:{},select:{}}}});return d}(b);n(d.prototype,{markerAttribs:void 0});a.registerSeriesType("dotplot",d);return d});b(a,"masters/modules/dotplot.src.js",[],function(){})});
//# sourceMappingURL=dotplot.js.map