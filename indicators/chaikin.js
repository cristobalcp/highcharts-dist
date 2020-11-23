/*
 Highstock JS v8.2.2 (2020-11-23)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/chaikin",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,e,c){a.hasOwnProperty(b)||(a[b]=c.apply(null,e))}a=a?a._modules:{};b(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],function(a){var b=a.error;return{isParentLoaded:function(a,
c,k,g,l){if(a)return g?g(a):!0;b(l||this.generateMessage(k,c));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"Stock/Indicators/ChaikinIndicator.js",[a["Core/Series/Series.js"],a["Mixins/IndicatorRequired.js"],a["Core/Utilities.js"]],function(a,b,e){var c=a.seriesTypes,k=c.ad,g=c.ema,l=e.correctFloat,n=e.error;a.seriesType("chaikin","ema",{params:{volumeSeriesID:"volume",
periods:[3,10]}},{nameBase:"Chaikin Osc",nameComponents:["periods"],init:function(){var a=arguments,h=this;b.isParentLoaded(g,"ema",h.type,function(b){b.prototype.init.apply(h,a)})},getValues:function(a,b){var d=b.periods,c=b.period,e=[],h=[],m=[],f;if(2!==d.length||d[1]<=d[0])n('Error: "Chaikin requires two periods. Notice, first period should be lower than the second one."');else if(b=k.prototype.getValues.call(this,a,{volumeSeriesID:b.volumeSeriesID,period:c}))if(a=g.prototype.getValues.call(this,
b,{period:d[0]}),b=g.prototype.getValues.call(this,b,{period:d[1]}),a&&b){d=d[1]-d[0];for(f=0;f<b.yData.length;f++)c=l(a.yData[f+d]-b.yData[f]),e.push([b.xData[f],c]),h.push(b.xData[f]),m.push(c);return{values:e,xData:h,yData:m}}}});""});b(a,"masters/indicators/chaikin.src.js",[],function(){})});
//# sourceMappingURL=chaikin.js.map