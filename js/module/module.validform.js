define(function(require, exports, module) {
  var __ = {

  };
  __.activeForm = function(formDom) {
    var el;
    var isCls = {
      s: 'u-null',
      m: 'u-phone',
      name:"gender"
    };
    var tip = function(tipsText) {
      el = $.tips({
        content: tipsText,
        stayTime: 2000,
        type: "info"
      })
    }
    var str = function(str) {
      return str.replace(/\s/g, "");
    }
    var dataType = {
      sn: /[\w\W]+/,
      "*6-16": /^[\w\W]{6,16}$/,
      n: /^\d+$/,
      "n6-16": /^\d{6,16}$/,
      s: /^[\-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
      "s6-18": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
      p: /^[0-9]{6}$/,
      m: /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/,
      e: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      url: /^(\w+:\/\/)?\w+(\.\w+)+.*$/
    };
    var key = true;
    var a = $(formDom);
    var b = a.find('input.u-null');
    b.each(function(i, v) {
      if (str($(this).val()).length <= 0) {
        tip(this.getAttribute('placeholder'));
        key = false;
        this.focus();
        return false;
      }
      if ($(this).hasClass(isCls.m)) {
        if (!dataType.m.test($(this).val())) {
          tip('请输入正确的手机格式');
          key = false;
          this.focus();
          return false;
        };
      };
    });
    return key;
  };
  return __;
})