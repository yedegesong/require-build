({
    baseUrl: './js',//要合并的全部JS文件目录。相对于appDir,代表查找文件的锚点。
    dir: './build',//这是一个输出目录，所有的应用程序文件将会被复制到该文件夹下。
    optimize: 'none',
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
    },
    modules: [
        {
             name: './controller/index/Index'
        },
        {
             name: './controller/detils/Index'
        }
    ]
})