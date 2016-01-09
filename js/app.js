/**
 * Created by Administrator on 2016/1/5.
 */
requirejs.config({
     //By default load any module IDs from js/lib
    baseUrl: '../js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'zepto':'lib/zepto',
        'zepto.touchSwipe':'lib/zepto.touchSwipe',
        'frozen':'lib/frozen'
    },
    shim: {
        'zepto': {
            exports: '$'
        },
       'zepto.touchSwipe':['zepto'],
       'frozen':['zepto']
    }
});