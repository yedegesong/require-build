;(function(window,$){
	"use strict";
	$.fn.visibility = function (parameters) {
		$.fn.visibility.settings = {
			namespace : 'visibility',
			//到达底部的回调函数
			onBottomVisible : false,
			deferTime :500
		};
		var $allModules = $(this),
			cleanTime,
   			totalheight = 0;     //定义一个总的高度变量;
		return $allModules.each(function(){
			var 
			settings = $.extend({}, $.fn.visibility.settings, parameters),
			$module = $(this),
			$window = $(window),
			namespace = settings.namespace,
			eventNamespace = '.' + namespace,
			element = this,
			module={
				logData:function(){
					//当文档的高度小于或者等于总的高度的时候，开始动态加载数据
					totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
					if ($(document).height() <= totalheight)    
						    {
						       //执行回调函数
						      	cleanTime=setTimeout(function(){
									clearTimeout(cleanTime);
									settings.onBottomVisible ? settings.onBottomVisible($module) : false;
							   },settings.deferTime);
						       		//settings.onBottomVisible ? settings.onBottomVisible($module) : false;
						    } 
				},
				scrollInit:function(){
						$window.off('scroll').on('scroll', module.event.scroll);
					},
				event:{
					scroll:function(){
						//console.log('什么意思啊，完全看不懂')
						module.logData();
					}
				}
			};
			module.scrollInit( );
			})
	};
})(window,Zepto);