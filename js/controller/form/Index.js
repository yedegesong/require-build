define(['zepto','frozen','zepto.touchSwipe','../../module/module.validform'],function ($,f,z,__) {
   
  $(".btn-free").on('click',function(){
  		if(__.activeForm('.ui-form')){
  			$('.ui-tips span').html('您通过验证');

  		}else{
  			console.log('我没通过验证')
  		}
  })
  
});