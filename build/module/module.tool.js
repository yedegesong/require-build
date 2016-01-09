//工具模块
var tool={};
//清除字符串中的空白
tool.trim=function(str){
  return str = str.replace(/^\s+|\s+$/g,"");
};
//提示模块
tool.tips=function(type,con,time){
  var el;
  el=$.tips({
        content:con,
        stayTime:time,
        type:type
  })
};
//判断一个元素是否显示
tool.isShow=function(dom){
  return dom.css('display') === 'block' ? true : false;
};
//判断添加事件
tool.hasTouch = function(){
  var touchObj={};
  touchObj.isSupportTouch = "ontouchend" in document ? true : false;
  touchObj.isEvent=touchObj.isSupportTouch?'tap':'click';
  return touchObj.isEvent;
 }
tool.support=function(){
  var UI={},
  doc = window.document,
  $win = $(window);
  //注册过度结束事件
  UI.transition = (function () {
    var transitionEnd = (function () {
      var element = doc.body || doc.documentElement;
      var transEndEventNames = {
        WebkitTransition : 'webkitTransitionEnd',
        MozTransition : 'transitionend',
        OTransition : 'oTransitionEnd otransitionend',
        transition : 'transitionend'
      };

      for (var name in transEndEventNames) {
        if (element.style[name] !== undefined) {
          return transEndEventNames[name];
        }
      }
    })();

    return transitionEnd && {
      end : transitionEnd
    };
  })();
  //注册动画结束事件
  UI.animation = (function () {
    var animationEnd = (function () {
      var element = doc.body || doc.documentElement;
      var animEndEventNames = {
        WebkitAnimation : 'webkitAnimationEnd',
        MozAnimation : 'animationend',
        OAnimation : 'oAnimationEnd oanimationend',
        animation : 'animationend'
      };

      for (var name in animEndEventNames) {
        if (element.style[name] !== undefined) {
          return animEndEventNames[name];
        }
      }
    })();

    return animationEnd && {
      end : animationEnd
    };
  })();
  //过度结束执行的函数
  UI.transitionEnd = function (dom,callback) {
    var endEvent = UI.transition.end;
    var dom = dom;

    function fireCallBack(e) {
      callback.call(dom, e);
      endEvent && dom.off(endEvent, fireCallBack);
    }

    if (callback && endEvent) {
      dom.on(endEvent, fireCallBack);
    }
  };
  //动画结束执行的函数
  UI.animationEnd = function (dom,callback) {
    var endEvent = UI.animation.end;
    var dom = this;
    function fireCallBack(e) {
      callback.call(dom, e);
      endEvent && dom.off(endEvent, fireCallBack);
    };

    if (callback && endEvent) {

      dom.on(endEvent, fireCallBack);
    }

  };
  //返回UI
  return UI;
};
tool.support.transitionEnd=tool.support().transitionEnd;
tool.support.animationEnd=tool.support().animationEnd;
//封装开机启动画面效果
tool.entrance=function(dom,opt){
  var options=options ? options : {};
  options={
    tel:'<div id="entrance" class="bodymain"></div>',
    time:5000,
    adCls:"bodymain-on",
    isRemove:true,
    hideCallBack:false
  };
  var configuration=$.extend({},options,opt);
 $(configuration.tel).appendTo("body");
  tool.support.transitionEnd($(dom),function(event){
      if(configuration.isRemove){
          $(event.target).remove();
        }else{
           $(event.target).hide();
        }
      configuration.hideCallBack ? configuration.hideCallBack() : false;
   })
    var cleanEntrance=setTimeout(function(){
      $(dom).addClass(configuration.adCls);
      clearTimeout(cleanEntrance);
    },configuration.time)
};
//封装滚到底部促发事件



tool.getQueryString = function (name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null){
        return unescape(r[2]);
    }else{
        return null; 
    }
}; 

exports = tool;