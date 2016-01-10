//服务模块
define(function() {
var server = {};
server.resource = function(url, param, action) {
  return new Ajaxfactory(url, param, action);
}; //共用服务块
function Ajaxfactory(url, param, action) {
  this.url = url;
  this.param = param;
  this.action = action;
  //返回promise对象用于外部调用
  return this.getData();
};
Ajaxfactory.prototype.getData = function() {
  var me = this;
  var LoginEl = null;
  var TipEl = null;
  //创建延迟对象
  var dtd = $.Deferred();
  $.ajax({
    type: me.action,
    url: me.url,
    data: me.param,
    dataType: 'json',
    timeout: 30000,
    success: function(data) {
      //后台状态返回0 延迟加载失败
      if (data.status == 0) {
        dtd.reject(data);
        LoginEl = $.loading({
          content: '请检查网络...',
        })
      } else {
        //后台状态返回1 延迟加载成功
        dtd.resolve(data);
        LoginEl.loading("hide");
      }
    },
    beforeSend: function(data) {
      LoginEl = $.loading({
        content: '加载中...',
      })
    },
    error: function(xhr, type) {
      LoginEl.loading("hide");
      TipEl = $.tips({
        content: '链接异常',
        stayTime: 10000,
        type: "warn"
      });
    }
  });
  /*--
        返回promise的作用是防止外部修改全局dtd 延迟对象的执行状态。
        return dtd;
    --*/ //返回promise对象
  return dtd.promise();
};

//分页加载模块
function Pagefactory(domId, url, param, action, callbacks) {
  this.domId = domId;
  this.url = url;
  this.param = param;
  this.action = action;
  this.callbacks = callbacks;
  this.getData();
};
Pagefactory.prototype.getData = function() {
  var me = this;
  var tel = '<div class="ui-loading-wrap">' +
    '<p>正在加载中...</p>' +
    '<i class="ui-loading"></i>' +
    '</div>';
  $.ajax({
    type: me.action,
    url: me.url,
    data: me.param,
    dataType: 'json',
    timeout: 30000,
    success: function(data) {
      me.data = data;
      me.callbacks(me.data);
      $(me.domId).find(".ui-loading-wrap").remove();
    },
    beforeSend: function(data) {
      $(me.domId).append(tel);
    },
    error: function(xhr, type) {

    }
  });
};

server.cookie = function(name, value, options) {

  if (typeof value == 'undefined') {
    return $.fn.cookie(name);
  } else {

    var params = {
      path: '/',
      domain: 'bzbl.com'
    };

    if (typeof options == 'object') {
      options['path'] = params['path'];
      options['domain'] = params['domain'];
    } else {
      options = params;
    };

    $.fn.cookie(name, value, options)
  }

};

server.checkLogin = function(redirect) {

  if (window.userinfo.isGuest == 1) {
    if (typeof redirect == 'undefined') {
      redirect = document.URL;
    };

    if (!redirect) {
      redirect = api.home();
    };

    window.location.href = api.urls.login + "?redirect=" + redirect;
    return false;

  };

  return true;
}

return server;
})