define(function() {
  var __ = {};
  __.el = null;
  __.dataType = {
      sn: /[\w\W]+/,
      "*6-16": /^[\w\W]{6,16}$/,
      n: /^\d+$/,
      "n6-16": /^\d{6,16}$/,
      s: /^[\-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
      "s6-18": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
      p: /^[0-9]{6}$/,
      m: /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/,
      e: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      url: /^(\w+:\/\/)?\w+(\.\w+)+.*$/
    };
    __.config = {
      s: {
        cls: 'valid-null',
        dataType:'*',
        tip: '不能为空'
      },
      m: {
        cls: 'valid-phone',
        tip: '请输入正确的手机格式'
      },
      n: {
        cls: 'valid-n',
        tip: '只能为数字'
      },
      e: {
        cls: 'valid-email',
        tip: '请输入正确的邮箱'
      }
    };
    __.str = function(str) {
      return str.replace(/\s/g, "");
    }

    __.tip = function(tipsText) {
      __.el= $.tips({
        content: tipsText,
        stayTime: 2000,
        type: "info"
      })
    }
    __.activeForm = function(formDom) {
      var key = true;
      var _form = $(formDom);
      var _input = _form.find('.' + __.config.s.cls);
      _input.each(function(i, v) {
        //判断文本框和下拉框是否为空
        if (__.str($(this).val()).length <= 0) {
          var tips = $(this).attr('placeholder') === null ? 'tip' : 'placeholder';
          __.tip('请输入' + $(this).attr(tips));
          key = false;
          this.focus();
          return false;
        }
        //判断单选按钮或者复选框按钮是否为空
        if ($(this).attr('type') == 'radio' || $(this).attr('type') == 'checkbox') {
          var radioName = $(this).attr('name');
          var value = $("input[name='" + radioName + "']:checked").val();
          if (value == undefined) {
            key = false;
            __.tip($(this).attr('tip'));
            return false;  
          }
        } 

        //验证手机号码
        if ($(this).hasClass(__.config.m.cls)) {
          console.log(__.dataType.m.test($(this).val()))
          if (!__.dataType.m.test($(this).val())) {
            __.tip(__.config.m.tip);
            key = false;
            this.focus();
            return false;
          };
        };

        //验证只能为数字
        if ($(this).hasClass(__.config.n.cls)) {
          if (!__.dataType.n.test($(this).val())) {
            __.tip(__.config.n.tip);
             key = false;
             this.focus();
             return false;
          };
        };

        //验证邮箱
        if ($(this).hasClass(__.config.e.cls)) {
          if (!__.dataType.e.test($(this).val())) {
            __.tip(__.config.e.tip);
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