/*
 Highcharts JS v8.2.2 (2020-11-23)

 Pareto series type for Highcharts

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/pareto",["highcharts"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,e,b,f){a.hasOwnProperty(e)||(a[e]=f.apply(null,b))}a=a?a._modules:{};c(a,"Mixins/DerivedSeries.js",[a["Core/Globals.js"],a["Series/Line/LineSeries.js"],a["Core/Utilities.js"]],function(a,e,b){var f=b.addEvent,
c=b.defined;return{hasDerivedData:!0,init:function(){e.prototype.init.apply(this,arguments);this.initialised=!1;this.baseSeries=null;this.eventRemovers=[];this.addEvents()},setDerivedData:a.noop,setBaseSeries:function(){var a=this.chart,d=this.options.baseSeries;this.baseSeries=c(d)&&(a.series[d]||a.get(d))||null},addEvents:function(){var a=this;var d=f(this.chart,"afterLinkSeries",function(){a.setBaseSeries();a.baseSeries&&!a.initialised&&(a.setDerivedData(),a.addBaseSeriesEvents(),a.initialised=
!0)});this.eventRemovers.push(d)},addBaseSeriesEvents:function(){var a=this;var d=f(a.baseSeries,"updatedData",function(){a.setDerivedData()});var b=f(a.baseSeries,"destroy",function(){a.baseSeries=null;a.initialised=!1});a.eventRemovers.push(d,b)},destroy:function(){this.eventRemovers.forEach(function(a){a()});e.prototype.destroy.apply(this,arguments)}}});c(a,"Series/ParetoSeries.js",[a["Core/Series/Series.js"],a["Mixins/DerivedSeries.js"],a["Core/Utilities.js"]],function(a,c,b){var f=b.correctFloat;
b=b.merge;a.seriesType("pareto","line",{zIndex:3},b(c,{setDerivedData:function(){var a=this.baseSeries.xData,b=this.baseSeries.yData,d=this.sumPointsPercents(b,a,null,!0);this.setData(this.sumPointsPercents(b,a,d,!1),!1)},sumPointsPercents:function(a,b,d,c){var e=0,h=0,k=[],g;a.forEach(function(a,l){null!==a&&(c?e+=a:(g=a/d*100,k.push([b[l],f(h+g)]),h+=g))});return c?e:k}}));""});c(a,"masters/modules/pareto.src.js",[],function(){})});
//# sourceMappingURL=pareto.js.map