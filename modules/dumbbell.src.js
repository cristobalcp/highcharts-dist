/**
 * @license Highcharts JS v8.2.2 (2020-11-23)
 *
 * (c) 2009-2019 Sebastian Bochan, Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/dumbbell', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'Series/ColumnRangeSeries.js', [_modules['Core/Series/Series.js'], _modules['Series/Column/ColumnSeries.js'], _modules['Core/Globals.js'], _modules['Core/Options.js'], _modules['Core/Utilities.js']], function (BaseSeries, ColumnSeries, H, O, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var columnProto = ColumnSeries.prototype;
        var noop = H.noop;
        var defaultOptions = O.defaultOptions;
        var clamp = U.clamp,
            merge = U.merge,
            pick = U.pick;
        var arearangeProto = BaseSeries.seriesTypes.arearange.prototype;
        /**
         * The column range is a cartesian series type with higher and lower
         * Y values along an X axis. To display horizontal bars, set
         * [chart.inverted](#chart.inverted) to `true`.
         *
         * @sample {highcharts|highstock} highcharts/demo/columnrange/
         *         Inverted column range
         *
         * @extends      plotOptions.column
         * @since        2.3.0
         * @excluding    negativeColor, stacking, softThreshold, threshold
         * @product      highcharts highstock
         * @requires     highcharts-more
         * @optionparent plotOptions.columnrange
         */
        var columnRangeOptions = {
                /**
                 * Extended data labels for range series types. Range series data labels
                 * have no `x` and `y` options. Instead,
            they have `xLow`,
            `xHigh`,
                 * `yLow` and `yHigh` options to allow the higher and lower data label
                 * sets individually.
                 *
                 * @declare   Highcharts.SeriesAreaRangeDataLabelsOptionsObject
                 * @extends   plotOptions.arearange.dataLabels
                 * @since     2.3.0
                 * @product   highcharts highstock
                 * @apioption plotOptions.columnrange.dataLabels
                 */
                pointRange: null,
                /** @ignore-option */
                marker: null,
                states: {
                    hover: {
                        /** @ignore-option */
                        halo: false
                    }
                }
            };
        /**
         * The ColumnRangeSeries class
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.columnrange
         *
         * @augments Highcharts.Series
         */
        BaseSeries.seriesType('columnrange', 'arearange', merge(defaultOptions.plotOptions.column, defaultOptions.plotOptions.arearange, columnRangeOptions), {
            setOptions: function () {
                merge(true, arguments[0], { stacking: void 0 }); // #14359 Prevent side-effect from stacking.
                return arearangeProto.setOptions.apply(this, arguments);
            },
            // eslint-disable-next-line valid-jsdoc
            /**
             * Translate data points from raw values x and y to plotX and plotY
             * @private
             */
            translate: function () {
                var series = this,
                    yAxis = series.yAxis,
                    xAxis = series.xAxis,
                    startAngleRad = xAxis.startAngleRad,
                    start,
                    chart = series.chart,
                    isRadial = series.xAxis.isRadial,
                    safeDistance = Math.max(chart.chartWidth,
                    chart.chartHeight) + 999,
                    plotHigh;
                // eslint-disable-next-line valid-jsdoc
                /**
                 * Don't draw too far outside plot area (#6835)
                 * @private
                 */
                function safeBounds(pixelPos) {
                    return clamp(pixelPos, -safeDistance, safeDistance);
                }
                columnProto.translate.apply(series);
                // Set plotLow and plotHigh
                series.points.forEach(function (point) {
                    var shapeArgs = point.shapeArgs,
                        minPointLength = series.options.minPointLength,
                        heightDifference,
                        height,
                        y;
                    point.plotHigh = plotHigh = safeBounds(yAxis.translate(point.high, 0, 1, 0, 1));
                    point.plotLow = safeBounds(point.plotY);
                    // adjust shape
                    y = plotHigh;
                    height = pick(point.rectPlotY, point.plotY) - plotHigh;
                    // Adjust for minPointLength
                    if (Math.abs(height) < minPointLength) {
                        heightDifference = (minPointLength - height);
                        height += heightDifference;
                        y -= heightDifference / 2;
                        // Adjust for negative ranges or reversed Y axis (#1457)
                    }
                    else if (height < 0) {
                        height *= -1;
                        y -= height;
                    }
                    if (isRadial) {
                        start = point.barX + startAngleRad;
                        point.shapeType = 'arc';
                        point.shapeArgs = series.polarArc(y + height, y, start, start + point.pointWidth);
                    }
                    else {
                        shapeArgs.height = height;
                        shapeArgs.y = y;
                        point.tooltipPos = chart.inverted ?
                            [
                                yAxis.len + yAxis.pos - chart.plotLeft - y -
                                    height / 2,
                                xAxis.len + xAxis.pos - chart.plotTop -
                                    shapeArgs.x - shapeArgs.width / 2,
                                height
                            ] : [
                            xAxis.left - chart.plotLeft + shapeArgs.x +
                                shapeArgs.width / 2,
                            yAxis.pos - chart.plotTop + y + height / 2,
                            height
                        ]; // don't inherit from column tooltip position - #3372
                    }
                });
            },
            directTouch: true,
            trackerGroups: ['group', 'dataLabelsGroup'],
            drawGraph: noop,
            getSymbol: noop,
            // Overrides from modules that may be loaded after this module
            crispCol: function () {
                return columnProto.crispCol.apply(this, arguments);
            },
            drawPoints: function () {
                return columnProto.drawPoints.apply(this, arguments);
            },
            drawTracker: function () {
                return columnProto.drawTracker.apply(this, arguments);
            },
            getColumnMetrics: function () {
                return columnProto.getColumnMetrics.apply(this, arguments);
            },
            pointAttribs: function () {
                return columnProto.pointAttribs.apply(this, arguments);
            },
            adjustForMissingColumns: function () {
                return columnProto.adjustForMissingColumns.apply(this, arguments);
            },
            animate: function () {
                return columnProto.animate.apply(this, arguments);
            },
            polarArc: function () {
                return columnProto.polarArc.apply(this, arguments);
            },
            translate3dPoints: function () {
                return columnProto.translate3dPoints.apply(this, arguments);
            },
            translate3dShapes: function () {
                return columnProto.translate3dShapes.apply(this, arguments);
            }
        }, {
            setState: columnProto.pointClass.prototype.setState
        });
        /**
         * A `columnrange` series. If the [type](#series.columnrange.type)
         * option is not specified, it is inherited from
         * [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.columnrange
         * @excluding dataParser, dataURL, stack, stacking
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @apioption series.columnrange
         */
        /**
         * An array of data points for the series. For the `columnrange` series
         * type, points can be given in the following ways:
         *
         * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
         *    to `x,low,high`. If the first value is a string, it is applied as the name
         *    of the point, and the `x` value is inferred. The `x` value can also be
         *    omitted, in which case the inner arrays should be of length 2\. Then the
         *    `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 4, 2],
         *        [1, 2, 1],
         *        [2, 9, 10]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.columnrange.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        low: 0,
         *        high: 4,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        low: 5,
         *        high: 3,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
         * @extends   series.arearange.data
         * @excluding marker
         * @product   highcharts highstock
         * @apioption series.columnrange.data
         */
        /**
         * @extends   series.columnrange.dataLabels
         * @product   highcharts highstock
         * @apioption series.columnrange.data.dataLabels
         */
        /**
         * @excluding halo, lineWidth, lineWidthPlus, marker
         * @product   highcharts highstock
         * @apioption series.columnrange.states.hover
         */
        /**
         * @excluding halo, lineWidth, lineWidthPlus, marker
         * @product   highcharts highstock
         * @apioption series.columnrange.states.select
         */
        ''; // adds doclets above into transpiled

    });
    _registerModule(_modules, 'Series/DumbbellSeries.js', [_modules['Core/Series/Series.js'], _modules['Series/Column/ColumnSeries.js'], _modules['Series/Line/LineSeries.js'], _modules['Core/Color/Palette.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (BaseSeries, ColumnSeries, LineSeries, palette, SVGRenderer, H, U) {
        /* *
         *
         *  (c) 2010-2020 Sebastian Bochan, Rafal Sebestjanski
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var _a = BaseSeries.seriesTypes,
            areaRangeProto = _a.arearange.prototype,
            columnRangeProto = _a.columnrange.prototype;
        var colProto = ColumnSeries.prototype;
        var seriesProto = LineSeries.prototype;
        var noop = H.noop;
        var extend = U.extend,
            pick = U.pick;
        var areaRangePointProto = areaRangeProto.pointClass.prototype, TrackerMixin = H.TrackerMixin; // Interaction
            /* *
             *
             *  Class
             *
             * */
            /**
             * The dumbbell series is a cartesian series with higher and lower values for
             * each point along an X axis, connected with a line between the values.
             * Requires `highcharts-more.js` and `modules/dumbbell.js`.
             *
             * @sample {highcharts} highcharts/demo/dumbbell/
             *         Dumbbell chart
             * @sample {highcharts} highcharts/series-dumbbell/styled-mode-dumbbell/
             *         Styled mode
             *
             * @extends      plotOptions.arearange
             * @product      highcharts highstock
             * @excluding    fillColor, fillOpacity, lineWidth, stack, stacking,
             *               stickyTracking, trackByArea, boostThreshold, boostBlending
             * @since 8.0.0
             * @optionparent plotOptions.dumbbell
             */
            BaseSeries.seriesType('dumbbell', 'arearange', {
                /** @ignore-option */
                trackByArea: false,
                /** @ignore-option */
                fillColor: 'none',
                /** @ignore-option */
                lineWidth: 0,
                pointRange: 1,
                /**
                 * Pixel width of the line that connects the dumbbell point's values.
                 *
                 * @since 8.0.0
                 * @product   highcharts highstock
                 */
                connectorWidth: 1,
                /** @ignore-option */
                stickyTracking: false,
                groupPadding: 0.2,
                crisp: false,
                pointPadding: 0.1,
                /**
                 * Color of the start markers in a dumbbell graph.
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @since 8.0.0
                 * @product   highcharts highstock
                 */
                lowColor: palette.neutralColor80,
                /**
                 * Color of the line that connects the dumbbell point's values.
                 * By default it is the series' color.
                 *
                 * @type      {string}
                 * @product   highcharts highstock
                 * @since 8.0.0
                 * @apioption plotOptions.dumbbell.connectorColor
                 */
                states: {
                    hover: {
                        /** @ignore-option */
                        lineWidthPlus: 0,
                        /**
                         * The additional connector line width for a hovered point.
                         *
                         * @since 8.0.0
                         * @product   highcharts highstock
                         */
                        connectorWidthPlus: 1,
                        /** @ignore-option */
                        halo: false
                    }
                }
            }, {
                trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
                drawTracker: TrackerMixin.drawTrackerPoint,
                drawGraph: noop,
                crispCol: colProto.crispCol,
                /**
                 * Get connector line path and styles that connects dumbbell point's low and
                 * high values.
                 * @private
                 *
                 * @param {Highcharts.Series} this The series of points.
                 * @param {Highcharts.Point} point The point to inspect.
                 *
                 * @return {Highcharts.SVGAttributes} attribs The path and styles.
                 */
                getConnectorAttribs: function (point) {
                    var series = this, chart = series.chart, pointOptions = point.options, seriesOptions = series.options, xAxis = series.xAxis, yAxis = series.yAxis, connectorWidth = pick(pointOptions.connectorWidth, seriesOptions.connectorWidth), connectorColor = pick(pointOptions.connectorColor, seriesOptions.connectorColor, pointOptions.color, point.zone ? point.zone.color : void 0, point.color), connectorWidthPlus = pick(seriesOptions.states &&
                        seriesOptions.states.hover &&
                        seriesOptions.states.hover.connectorWidthPlus, 1), dashStyle = pick(pointOptions.dashStyle, seriesOptions.dashStyle), pointTop = pick(point.plotLow, point.plotY), pxThreshold = yAxis.toPixels(seriesOptions.threshold || 0, true), pointHeight = chart.inverted ?
                        yAxis.len - pxThreshold : pxThreshold, pointBottom = pick(point.plotHigh, pointHeight), attribs, origProps;
                if (point.state) {
                    connectorWidth = connectorWidth + connectorWidthPlus;
                }
                if (pointTop < 0) {
                    pointTop = 0;
                }
                else if (pointTop >= yAxis.len) {
                    pointTop = yAxis.len;
                }
                if (pointBottom < 0) {
                    pointBottom = 0;
                }
                else if (pointBottom >= yAxis.len) {
                    pointBottom = yAxis.len;
                }
                if (point.plotX < 0 || point.plotX > xAxis.len) {
                    connectorWidth = 0;
                }
                // Connector should reflect upper marker's zone color
                if (point.upperGraphic) {
                    origProps = {
                        y: point.y,
                        zone: point.zone
                    };
                    point.y = point.high;
                    point.zone = point.zone ? point.getZone() : void 0;
                    connectorColor = pick(pointOptions.connectorColor, seriesOptions.connectorColor, pointOptions.color, point.zone ? point.zone.color : void 0, point.color);
                    extend(point, origProps);
                }
                attribs = {
                    d: SVGRenderer.prototype.crispLine([[
                            'M',
                            point.plotX,
                            pointTop
                        ], [
                            'L',
                            point.plotX,
                            pointBottom
                        ]], connectorWidth, 'ceil')
                };
                if (!chart.styledMode) {
                    attribs.stroke = connectorColor;
                    attribs['stroke-width'] = connectorWidth;
                    if (dashStyle) {
                        attribs.dashstyle = dashStyle;
                    }
                }
                return attribs;
            },
            /**
             * Draw connector line that connects dumbbell point's low and high values.
             * @private
             *
             * @param {Highcharts.Series} this The series of points.
             * @param {Highcharts.Point} point The point to inspect.
             *
             * @return {void}
             */
            drawConnector: function (point) {
                var series = this,
                    animationLimit = pick(series.options.animationLimit, 250),
                    verb = point.connector && series.chart.pointCount < animationLimit ?
                        'animate' : 'attr';
                if (!point.connector) {
                    point.connector = series.chart.renderer.path()
                        .addClass('highcharts-lollipop-stem')
                        .attr({
                        zIndex: -1
                    })
                        .add(series.markerGroup);
                }
                point.connector[verb](this.getConnectorAttribs(point));
            },
            /**
             * Return the width and x offset of the dumbbell adjusted for grouping,
             * groupPadding, pointPadding, pointWidth etc.
             *
             * @private
             *
             * @function Highcharts.seriesTypes.column#getColumnMetrics
             *
             * @param {Highcharts.Series} this The series of points.
             *
             * @return {Highcharts.ColumnMetricsObject} metrics shapeArgs
             *
             */
            getColumnMetrics: function () {
                var metrics = colProto.getColumnMetrics.apply(this,
                    arguments);
                metrics.offset += metrics.width / 2;
                return metrics;
            },
            translatePoint: areaRangeProto.translate,
            setShapeArgs: columnRangeProto.translate,
            /**
             * Translate each point to the plot area coordinate system and find
             * shape positions
             *
             * @private
             *
             * @function Highcharts.seriesTypes.dumbbell#translate
             *
             * @param {Highcharts.Series} this The series of points.
             *
             * @return {void}
             */
            translate: function () {
                // Calculate shapeargs
                this.setShapeArgs.apply(this);
                // Calculate point low / high values
                this.translatePoint.apply(this, arguments);
                // Correct x position
                this.points.forEach(function (point) {
                    var shapeArgs = point.shapeArgs,
                        pointWidth = point.pointWidth;
                    point.plotX = shapeArgs.x;
                    shapeArgs.x = point.plotX - pointWidth / 2;
                    point.tooltipPos = null;
                });
                this.columnMetrics.offset -= this.columnMetrics.width / 2;
            },
            seriesDrawPoints: areaRangeProto.drawPoints,
            /**
             * Extend the arearange series' drawPoints method by applying a connector
             * and coloring markers.
             * @private
             *
             * @function Highcharts.Series#drawPoints
             *
             * @param {Highcharts.Series} this The series of points.
             *
             * @return {void}
             */
            drawPoints: function () {
                var series = this,
                    chart = series.chart,
                    pointLength = series.points.length,
                    seriesLowColor = series.lowColor = series.options.lowColor,
                    i = 0,
                    lowerGraphicColor,
                    point,
                    zoneColor;
                this.seriesDrawPoints.apply(series, arguments);
                // Draw connectors and color upper markers
                while (i < pointLength) {
                    point = series.points[i];
                    series.drawConnector(point);
                    if (point.upperGraphic) {
                        point.upperGraphic.element.point = point;
                        point.upperGraphic.addClass('highcharts-lollipop-high');
                    }
                    point.connector.element.point = point;
                    if (point.lowerGraphic) {
                        zoneColor = point.zone && point.zone.color;
                        lowerGraphicColor = pick(point.options.lowColor, seriesLowColor, point.options.color, zoneColor, point.color, series.color);
                        if (!chart.styledMode) {
                            point.lowerGraphic.attr({
                                fill: lowerGraphicColor
                            });
                        }
                        point.lowerGraphic.addClass('highcharts-lollipop-low');
                    }
                    i++;
                }
            },
            /**
             * Get non-presentational attributes for a point. Used internally for
             * both styled mode and classic. Set correct position in link with connector
             * line.
             *
             * @see Series#pointAttribs
             *
             * @function Highcharts.Series#markerAttribs
             *
             * @param {Highcharts.Series} this The series of points.
             *
             * @return {Highcharts.SVGAttributes}
             *         A hash containing those attributes that are not settable from
             *         CSS.
             */
            markerAttribs: function () {
                var ret = areaRangeProto.markerAttribs.apply(this,
                    arguments);
                ret.x = Math.floor(ret.x);
                ret.y = Math.floor(ret.y);
                return ret;
            },
            /**
             * Get presentational attributes
             *
             * @private
             * @function Highcharts.seriesTypes.column#pointAttribs
             *
             * @param {Highcharts.Series} this The series of points.
             * @param {Highcharts.Point} point The point to inspect.
             * @param {string} state current state of point (normal, hover, select)
             *
             * @return {Highcharts.SVGAttributes} pointAttribs SVGAttributes
             */
            pointAttribs: function (point, state) {
                var pointAttribs;
                pointAttribs = seriesProto.pointAttribs.apply(this, arguments);
                if (state === 'hover') {
                    delete pointAttribs.fill;
                }
                return pointAttribs;
            }
        }, {
            // seriesTypes doesn't inherit from arearange point proto so put below
            // methods rigidly.
            destroyElements: areaRangePointProto.destroyElements,
            isValid: areaRangePointProto.isValid,
            pointSetState: areaRangePointProto.setState,
            /**
             * Set the point's state extended by have influence on the connector
             * (between low and high value).
             *
             * @private
             * @param {Highcharts.Point} this The point to inspect.
             *
             * @return {void}
             */
            setState: function () {
                var point = this,
                    series = point.series,
                    chart = series.chart,
                    seriesLowColor = series.options.lowColor,
                    seriesMarker = series.options.marker,
                    pointOptions = point.options,
                    pointLowColor = pointOptions.lowColor,
                    zoneColor = point.zone && point.zone.color,
                    lowerGraphicColor = pick(pointLowColor,
                    seriesLowColor,
                    pointOptions.color,
                    zoneColor,
                    point.color,
                    series.color),
                    verb = 'attr',
                    upperGraphicColor,
                    origProps;
                this.pointSetState.apply(this, arguments);
                if (!point.state) {
                    verb = 'animate';
                    if (point.lowerGraphic && !chart.styledMode) {
                        point.lowerGraphic.attr({
                            fill: lowerGraphicColor
                        });
                        if (point.upperGraphic) {
                            origProps = {
                                y: point.y,
                                zone: point.zone
                            };
                            point.y = point.high;
                            point.zone = point.zone ? point.getZone() : void 0;
                            upperGraphicColor = pick(point.marker ? point.marker.fillColor : void 0, seriesMarker ? seriesMarker.fillColor : void 0, pointOptions.color, point.zone ? point.zone.color : void 0, point.color);
                            point.upperGraphic.attr({
                                fill: upperGraphicColor
                            });
                            extend(point, origProps);
                        }
                    }
                }
                point.connector[verb](series.getConnectorAttribs(point));
            }
        });
        /**
         * The `dumbbell` series. If the [type](#series.dumbbell.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.dumbbell
         * @excluding boostThreshold, boostBlending
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @requires  modules/dumbbell
         * @apioption series.dumbbell
         */
        /**
         * An array of data points for the series. For the `dumbbell` series
         * type, points can be given in the following ways:
         *
         * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
         *    to `x,low,high`. If the first value is a string, it is applied as the name
         *    of the point, and the `x` value is inferred. The `x` value can also be
         *    omitted, in which case the inner arrays should be of length 2\. Then the
         *    `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 4, 2],
         *        [1, 2, 1],
         *        [2, 9, 10]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.dumbbell.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        low: 0,
         *        high: 4,
         *        name: "Point2",
         *        color: "#00FF00",
         *        lowColor: "#00FFFF",
         *        connectorWidth: 3,
         *        connectorColor: "#FF00FF"
         *    }, {
         *        x: 1,
         *        low: 5,
         *        high: 3,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
         * @extends   series.arearange.data
         * @product   highcharts highstock
         * @apioption series.dumbbell.data
         */
        /**
         * Color of the line that connects the dumbbell point's values.
         * By default it is the series' color.
         *
         * @type        {string}
         * @since       8.0.0
         * @product     highcharts highstock
         * @apioption   series.dumbbell.data.connectorColor
         */
        /**
         * Pixel width of the line that connects the dumbbell point's values.
         *
         * @type        {number}
         * @since       8.0.0
         * @default     1
         * @product     highcharts highstock
         * @apioption   series.dumbbell.data.connectorWidth
         */
        /**
         * Color of the start markers in a dumbbell graph.
         *
         * @type        {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @since       8.0.0
         * @default     ${palette.neutralColor80}
         * @product     highcharts highstock
         * @apioption   series.dumbbell.data.lowColor
         */
        ''; // adds doclets above to transpiled file

    });
    _registerModule(_modules, 'masters/modules/dumbbell.src.js', [], function () {


    });
}));