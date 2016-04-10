define(['zepto','frozen','zepto.touchSwipe','../../module/module.server','../../module/module.localStorage'],
    function ($,f,z,server,DB) {
    $('#tj').click(function(){
        console.log('添加')
        server.resource('http://bbs.fzbm.com/api/1/focus').then(function(data){
            //console.log(data)
            DB.add('fenlei',{name:'cs'},1)

        },function(data){
            console.log('请检查网络')
        })
    })
        $('#get').click(function(){
            var value = DB.get('fenlei',function(value){
                console.log('您的数据过期了噢')
                console.log(value);
            })
            console.log(value)
        })
    $('#gx').click(function(){
        console.log('更新');
        DB.update('fenlei',{name:'卧槽'},2)
    })
});