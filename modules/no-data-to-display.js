/*
 Highcharts JS v8.2.2 (2020-11-23)

 Plugin for displaying a message when there is no data visible in chart.

 (c) 2010-2019 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/no-data-to-display",["highcharts"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,d,f){a.hasOwnProperty(c)||(a[c]=f.apply(null,d))}a=a?a._modules:{};c(a,"Extensions/NoDataToDisplay.js",[a["Core/Chart/Chart.js"],a["Core/Color/Palette.js"],a["Core/Utilities.js"]],function(a,
c,d){var f=d.addEvent,g=d.extend,e=d.getOptions;d=a.prototype;e=e();g(e.lang,{noData:"No data to display"});e.noData={attr:{zIndex:1},position:{x:0,y:0,align:"center",verticalAlign:"middle"},style:{fontWeight:"bold",fontSize:"12px",color:c.neutralColor60}};d.showNoData=function(a){var b=this.options;a=a||b&&b.lang.noData;b=b&&(b.noData||{});this.renderer&&(this.noDataLabel||(this.noDataLabel=this.renderer.label(a,0,0,void 0,void 0,void 0,b.useHTML,void 0,"no-data").add()),this.styledMode||this.noDataLabel.attr(b.attr).css(b.style||
{}),this.noDataLabel.align(g(this.noDataLabel.getBBox(),b.position||{}),!1,"plotBox"))};d.hideNoData=function(){this.noDataLabel&&(this.noDataLabel=this.noDataLabel.destroy())};d.hasData=function(){for(var a=this.series||[],b=a.length;b--;)if(a[b].hasData()&&!a[b].options.isInternal)return!0;return this.loadingShown};f(a,"render",function(){this.hasData()?this.hideNoData():this.showNoData()})});c(a,"masters/modules/no-data-to-display.src.js",[],function(){})});
//# sourceMappingURL=no-data-to-display.js.map