/*!*
 *
 *  Copyright (c) Highsoft AS. All rights reserved.
 *
 *!*/
import * as globals from "../globals.src";
import * as _Highcharts from "../highcharts.src";
/**
 * Adds the module to the imported Highcharts namespace.
 *
 * @param highcharts
 *        The imported Highcharts namespace to extend.
 */
export function factory(highcharts: typeof Highcharts): void;
declare module "../highcharts.src" {
    interface Chart {
        /**
         * Add an annotation to the chart after render time.
         *
         * @param options
         *        The annotation options for the new, detailed annotation.
         *
         * @return - The newly generated annotation.
         */
        addAnnotation(options: AnnotationsOptions, redraw?: boolean): Annotation;
        /**
         * Remove an annotation from the chart.
         *
         * @param idOrAnnotation
         *        The annotation's id or direct annotation object.
         */
        removeAnnotation(idOrAnnotation: (number|string|Annotation)): void;
    }
}
export default factory;
export let Highcharts: typeof _Highcharts;
