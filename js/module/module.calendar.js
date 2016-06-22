define(function() {
   var calUtil = {
        //当前日历显示的年份
        showYear: 2016,
        //当前日历显示的月份
        showMonth: 1,
        showDay: 10,
        hasOne: true,
        eventName: "",
        //需要保存的数据
        saveData: [],
        //初始化日历
        init: function (options) {
            var info = {
                date: null,
                data: [],
                adv_id: null
            }
            var _options = $.extend({}, info, options);
            
            //初始化保存已选择的日期
            //calUtil.saveData
            if (calUtil.hasOne) {
                calUtil.showYear = parseInt(_options.date.split('-')[0]);
                calUtil.showMonth = parseInt(_options.date.split('-')[1]);
                calUtil.showDay = parseInt(_options.date.split('-')[2]);
                calUtil.hasOne = false;
            }
            if (_options.data.length > 0) {
                $.each(_options.data, function (index, item) {
                    if (item.state == 1) {
                        calUtil.saveData.push(item);
                    }
                })
            }
            calUtil.setMonthAndDay(_options);
            calUtil.draw(_options);
            calUtil.bindEnvent(_options);
            //开启移入显示文本提示
            calUtil.bindHoverTips();
            //点击添加和删除数据
            calUtil.bindHandle();
            //点击保存按钮
            calUtil.bindSave(_options);
        },
        draw: function (_options) {
            //绑定日历
            var str = calUtil.drawCal(calUtil.showYear, calUtil.showMonth, _options);
            $("#calendar").html(str);
            //绑定日历表头
            var calendarName = calUtil.showYear + "年" + calUtil.showMonth + "月";
            $(".calendar_month_span").html(calendarName);
        },
        //保存事件
        bindSave: function (_options) {
            var _adv_id = _options.adv_id;
            if (calUtil.saveData.length > 0) {
                $('#CalendarSave').click(function () {
                    var submitDate = {date:calUtil.showYear+'-'+calUtil.showMonth,data:calUtil.saveData,adv_id:_adv_id};
                    console.log(submitDate);
                    /*--提交数据状态不可在多次提交--*/
                    $('#CalendarSave').html('提交数据中...').attr('disabled', true).addClass('on');
                });
            } else {
                $('#CalendarSave').attr('disabled', true).addClass('on');
            }

        },
        confirm: function (tips) {
            return confirm(tips);
        },
        //绑定事件
        bindEnvent: function (_options) {
            //绑定上个月事件
            $(".calendar_month_prev").click(function () {
                var now_bjYear = parseInt(_options.date.split('-')[0]);
                var now_bjMonth = parseInt(_options.date.split('-')[1]);
                var new_bjYear = parseInt(calUtil.showYear);
                var new_bjMonth = parseInt(calUtil.showMonth-1);
                console.log(new_bjMonth)
                console.log(now_bjMonth)
                if(now_bjMonth > new_bjMonth || now_bjYear > new_bjYear){
                    alert('不能选择小于当前年月份的排期');
                    $(".calendar_month_prev").addClass('on');
                    return false;
                }
                if (calUtil.saveData.length >= 0) {
                    var r = calUtil.confirm("当月广告排期未保存,是否前去保存?");
                    if (r == true) {
                        alert('请点击下方的确定保存按钮');
                    } else {
                        if (calUtil.saveData.length > 0) {
                            calUtil.saveData = [];
                        }
                        calUtil.eventName = "prev";
                        
                        var prveDate = {now_date:_options.date,new_date:calUtil.showYear+'-'+(calUtil.showMonth-1),adv_id:_options.adv_id};
                        console.log(prveDate)
                        /*--服务端取数据--*/
                        smallServer('GET', 'http://127.0.0.1:3000/test/text2.json',prveDate).then(function (data) {
                            var _signList = data;
                            calUtil.init({data:_signList.data,date:_signList.date,adv_id:_signList.adv_id});
                        })
                    }
                }
            });
            //绑定下个月事件
            $(".calendar_month_next").click(function () {
                if (calUtil.saveData.length >= 0) {
                    var r = calUtil.confirm("当月广告排期未保存,是否前去保存?");
                    if (r == true) {
                        alert('请点击下方的确定保存按钮')
                    } else {
                        if (calUtil.saveData.length > 0) {
                            calUtil.saveData = [];
                        }
                        calUtil.eventName = "next";
                        var nextDate = {now_date:_options.date,new_date:calUtil.showYear+'-'+(calUtil.showMonth+1),adv_id:_options.adv_id};
                        console.log(nextDate)
                        /*--服务端取数据--*/
                        smallServer('GET', 'http://127.0.0.1:3000/test/text2.json',nextDate).then(function (data) {
                            var _signList = data;
                            calUtil.init({data:_signList.data,date:_signList.date,adv_id:_signList.adv_id});
                        })
                    }
                }
            });
        },
        /*--存在就删除，不存在就添加--*/
        bindHandle: function () {
            var DataContainers = calUtil.saveData;
            $('#sign_layer td').click(function (event) {
                //判断是否不可点击
                if (!$(this).hasClass('off') && $.trim($(this).html()).length > 0) {
                    //判断是否已选中，选中就去掉，未选中就勾上
                    if ($(this).hasClass('on')) {
                        var _this = $(this);
                        $(this).removeClass('on');
                        if ($(this).data('date')) {
                            $(this).removeAttr('data-date');
                        }
                        //删除已选择的
                        $.each(DataContainers, function (index, item) {
                            if (item.signDay == parseInt(_this.html())) {
                                DataContainers.splice(index, 1);
                                return false;
                            }
                        })
                        //console.log(DataContainers)
                    } else {
                        //未选择商圈无法点击
                        if (selectedCircles.length <= 0) {
                            alert('请选择广告商圈');
                            return false;
                        }
                        var str = '';
                        $.each(selectedCircles, function (index, item) {
                            str += item.circle_name + ',';
                        })
                        var tip = str.substring(0, str.length - 1);
                        var signDay = parseInt($(this).html());
                        var state = 1;
                        var _newAddData = {"signDay": signDay, "tip": tip, "state": state};
                        var _newAddJson = JSON.stringify(_newAddData);
                        DataContainers.push(_newAddData);
                        $(this).attr('data-date', _newAddJson);
                        $(this).addClass('on');
                        //console.log(DataContainers)
                    }
                }
                event.stopPropagation();
            })
        },
        //绑定移动显示内容
        bindHoverTips: function () {
            $('#sign_layer').on('mouseover', 'td', function (event) {
                if ($(this).data('date') != undefined && $(this).attr('data-date') != undefined) {
                    var _tip_JSON = $(this).data('date');
                    var _left = $(this).position().left - 20;
                    var _top = $(this).position().top - 40;
                    $('.sign_tips_box').html(_tip_JSON.tip).css({top: _top, left: _left}).show();
                }
                event.stopPropagation();
            });
            $('#sign_cal').on('mouseout', function (event) {
                $('.sign_tips_box').html('').hide();
                event.stopPropagation();
            })
        },
        //获取当前选择的年月
        setMonthAndDay: function () {
            switch (calUtil.eventName) {
                /*case "load":
                 var current = new Date();
                 calUtil.showYear = current.getFullYear();
                 calUtil.showMonth = current.getMonth() + 1;
                 break;*/
                case "prev":
                    var nowMonth = $(".calendar_month_span").html().split("年")[1].split("月")[0];
                    calUtil.showMonth = parseInt(nowMonth) - 1;
                    if (calUtil.showMonth == 0) {
                        calUtil.showMonth = 12;
                        calUtil.showYear -= 1;
                    }
                    break;
                case "next":
                    var nowMonth = $(".calendar_month_span").html().split("年")[1].split("月")[0];
                    calUtil.showMonth = parseInt(nowMonth) + 1;
                    if (calUtil.showMonth == 13) {
                        calUtil.showMonth = 1;
                        calUtil.showYear += 1;
                    }
                    break;
            }
        },
        prev:function(){

        },
        getDaysInmonth: function (iMonth, iYear) {
            var dPrevDate = new Date(iYear, iMonth, 0);
            return dPrevDate.getDate();
        },
        bulidCal: function (iYear, iMonth) {
            
            var aMonth = new Array();
            aMonth[0] = new Array(7);
            aMonth[1] = new Array(7);
            aMonth[2] = new Array(7);
            aMonth[3] = new Array(7);
            aMonth[4] = new Array(7);
            aMonth[5] = new Array(7);
            aMonth[6] = new Array(7);
            var dCalDate = new Date(iYear, iMonth - 1, 1);
            var iDayOfFirst = dCalDate.getDay();
            var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);
            var iVarDate = 1;
            var d, w;
            aMonth[0][0] = "日";
            aMonth[0][1] = "一";
            aMonth[0][2] = "二";
            aMonth[0][3] = "三";
            aMonth[0][4] = "四";
            aMonth[0][5] = "五";
            aMonth[0][6] = "六";
            for (d = iDayOfFirst; d < 7; d++) {
                aMonth[1][d] = iVarDate;
                iVarDate++;
            }
            for (w = 2; w < 7; w++) {
                for (d = 0; d < 7; d++) {
                    if (iVarDate <= iDaysInMonth) {
                        aMonth[w][d] = iVarDate;
                        iVarDate++;
                    }
                }
            }
            return aMonth;
        },
        ifHasSigned: function (data, day) {
            
            var signed;
            if (data) {
                $.each(data, function (index, item) {
                    if (item.signDay == day && item.state == -1) {
                        signed = item;
                    }
                    if (item.signDay == day && item.state == 1) {
                        signed = item;
                    }
                    if (item.signDay == day && item.state == 0) {
                        signed = item;
                    }
                });
            } else {
                signed = null;
            }

            return signed;
        },
        drawCal: function (iYear, iMonth, _options) {

            var myMonth = calUtil.bulidCal(iYear, iMonth);
            var htmls = new Array();
            htmls.push("<div class='sign_main' id='sign_layer'>");
            htmls.push("<div class='sign_succ_calendar_title'>");
            htmls.push("<div class='calendar_month_next'><span></span></div>");
            htmls.push("<div class='calendar_month_prev'><span></span></div>");
            htmls.push("<div class='calendar_month_span'></div>");
            htmls.push("</div>");
            htmls.push("<div class='sign_tips_box'></div>")
            htmls.push("<div class='sign' id='sign_cal'>");
            htmls.push("<table>");
            htmls.push("<tr>");
            htmls.push("<th>" + myMonth[0][0] + "</th>");
            htmls.push("<th>" + myMonth[0][1] + "</th>");
            htmls.push("<th>" + myMonth[0][2] + "</th>");
            htmls.push("<th>" + myMonth[0][3] + "</th>");
            htmls.push("<th>" + myMonth[0][4] + "</th>");
            htmls.push("<th>" + myMonth[0][5] + "</th>");
            htmls.push("<th>" + myMonth[0][6] + "</th>");
            htmls.push("</tr>");
            var d, w;
            //state 状态 未选择 0 已选择 1 不可选 -1
            for (w = 1; w < 6; w++) {
                htmls.push("<tr>");
                for (d = 0; d < 7; d++) {
                    //console.log(_options.date.split('-')[1]);
                    //console.log(calUtil.showMonth)
                    //console.log(myMonth[w][d])
                    var ifHasSigned = calUtil.ifHasSigned(_options.data, myMonth[w][d]);
                    if(myMonth[w][d] != undefined && myMonth[w][d]< calUtil.showDay && _options.date.split('-')[1] == calUtil.showMonth && _options.date.split('-')[0] == calUtil.showYear){
                        htmls.push("<td class='off' >" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
                    }
                    else if (ifHasSigned != undefined && ifHasSigned.state == 1) {
                        var _json = JSON.stringify(ifHasSigned);
                        htmls.push("<td class='on' data-date=" + _json + ">" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
                    } else if (ifHasSigned != undefined && ifHasSigned.state == 0) {
                        var _json = JSON.stringify(ifHasSigned);
                        htmls.push("<td class='on-choose' data-date=" + _json + ">" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
                    }
                    else if (ifHasSigned != undefined && ifHasSigned.state == -1) {
                        var _json = JSON.stringify(ifHasSigned);
                        htmls.push("<td class='off' data-date=" + _json + ">" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
                    }
                    else {
                        htmls.push("<td >" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
                    }
                }
                htmls.push("</tr>");
            }
            htmls.push("</table>");
            htmls.push("</div>");
            htmls.push("<div class='calendar-box'><button id='CalendarSave'>确定保存</button></div>");
            htmls.push("</div>");
            return htmls.join('');
        }
    };
    return calUtil;
})