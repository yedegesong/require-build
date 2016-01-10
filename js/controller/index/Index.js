define(['zepto','frozen','zepto.touchSwipe','../../module/module.server'],function ($,f,z,server) {
   server.resource('http://bbs.fzbm.com/api/1/focus').then(function(data){
   	$.each(data.data,function(v,n){
   		$("#list").append("<li>"+n.title+"</li>")
   	})
   	
    },function(data){
        console.log('请检查网络')
    })
});