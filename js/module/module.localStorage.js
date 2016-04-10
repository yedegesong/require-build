define(function() {
  var DB = {

    _getLocalStorage : function(){
      if (!localStorage) {
        throw new Error('Need localStorage');
      }
      return localStorage;
    },
    /**
     * 添加本地缓存的key,设置的值,过期的时间 0 为关闭浏览器清除 默认永久 数字表示缓存的天数.
     * @param key
     * @param value
     * @param expired
       */
    add:function(key,value,expired){
      if(value === undefined){
        value = null;
      }
      var localStorage = DB._getLocalStorage();

      expired = DB._getExp(expired,key);
      var obj = {
        data: value,
        expired:expired,
        time: +new Date().getTime()
      };
      localStorage.setItem(key, JSON.stringify(obj));
    },
    /**
     * 获取本地缓存的KEY,过期的回调函数,返回过期前的数据.
     * @param key
     * @param callback
     * @returns {null}
       */
    get:function(key,callback){
      var localStorage = DB._getLocalStorage();
      var _value = localStorage.getItem(key);
      if (_value) {
          var JSON_VALUE = JSON.parse(_value);
          var now = new Date().getTime();
        //如果过期执行的方法
          if(JSON_VALUE.expired - now < 0){
            callback(JSON_VALUE);
            DB.remove(key);
          }else{
            return JSON_VALUE;
          }
      }
      return null;
    },
    /**
     * d更新本地缓存,存在就更新 不存在就返回NULL;
     * @param key
     * @param value
     * @param expired
       * @returns {null}
       */
    update:function(key,value,expired){
      var json = JSON.parse(localStorage.getItem(key));
      console.log(json)
      if (json != null) {
        expired = DB._getExp(expired,key);
        var obj = {
          data: value,
          expired:expired,
          time: +new Date().getTime()
        };
        localStorage.setItem(key, JSON.stringify(obj));
      }else{
        return null;
      }
    },
    /**
     * 删除相对应KEY的本地缓存
     * @param key
       */
    remove: function(key) {
      var localStorage = DB._getLocalStorage();
      localStorage.removeItem(key);
    },
    /**
     * 清除所有本地缓存
     */
    clear: function() {
      var localStorage = DB._getLocalStorage();
      localStorage.clear();
    },
    _getExp: function(expired,key) {
      //当过期
      if (expired == 0) {
        window.onbeforeunload = function(){
          DB.remove(key);
        }
      } else if (typeof expired == 'number' || !isNaN(Number(expired))) {

        //expired = 1455033600000;
        expired = new Date(new Date().getTime() + expired*(24*60*60*1000)).getTime();
      }
      return expired;
    }
  };
  return DB;
})