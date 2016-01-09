/* 通配符的使用方式
 * 匹配任意数量的字符，但不匹配 /
 ? 匹配单个字符，但不匹配 /
 ** 匹配任意数量的字符，包括/，只要它是路径中唯一的一部分
 {} 允许使用一个逗号分割的列表或者表达式
 ! 在模式的开头用于否定一个匹配模式(即排除与模式匹配的信息)
 大多数的人都知道foo/*.js将匹配位于foo/目录下的所有的.js结尾的文件。
 foo/**而将匹配foo/目录以及其子目录中所有以.js结尾的文件。
 */
// 所有的文件产出到 static/ 目录下
fis.match('/css/**', {
    release: '/build/$0'
});
fis.match('*.html', {
    release: '/template/$0'
});
//虚拟数据与动态数据配置
fis.match('/test/server.conf', {
    release: '/config/server.conf'
});
//不想被构建的目录资源
fis.set('project.ignore', [
    'node_modules/**',
    '.git/**',
    '.svn/**',
    'js/**'
]);

fis.media('prod').match('lib/**.js', {
    useHash: true, // default is true
    // 指定压缩插件 fis-optimizer-uglify-js
    optimizer: fis.plugin('uglify-js', {
        // option of uglify-js
    })
})
    .match('*.css', {
        useHash: true, //default is `true`
        // compress css invoke fis-optimizer-clean-css
        optimizer: fis.plugin('clean-css', {
            // option of clean-css
        })
    }).match('::package', {
        packager: fis.plugin('map', {
            //共用js文件目录
            'build/pkg/lib.css': [
                'build/css/**.css'
            ]
        })
    });

fis.media('pro')
    .match('*.css', {
    }).match('::package', {
        packager: fis.plugin('map', {
            //共用js文件目录
            'build/pkg/lib.css': [
                'css/**.css'
            ]
        })
    });


