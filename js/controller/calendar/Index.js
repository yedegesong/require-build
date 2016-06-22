/**
 * Created by apple on 16/4/11.
 */
define(['../../module/module.calendar'],
    function (calUtil) {
        //window.selectedCircles = [{"circle_id":1,"circle_name":"五一广场商圈"}];
    window.selectedCircles = [
        {"circle_id":1,"circle_name":"五一广场商圈"},
        {"circle_id":2,"circle_name":"金山大道商圈"}
    ];
   //calUtil.init(_signList);
   smallServer('GET','http://127.0.0.1:3000/test/text2.json').then(function(data){
        
        var _signList = data;
        calUtil.init({data:_signList.data,date:_signList.date,adv_id:_signList.adv_id});
   })
    });