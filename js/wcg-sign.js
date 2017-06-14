/**
 * Created by Limeilin on 17/6/5.
 **/

var calUtil = {
    //当前日历显示的年份
    showYear:2017,
    //当前日历显示的月份
    showMonth:1,
    //当前日历显示的天数
    showDays:3,
    eventName:"load",
    //初始化日历
    init:function(signList,serverTime){
        calUtil.formatDate(serverTime);
        calUtil.setMonthAndDay();
        calUtil.draw(signList);
    },
    formatDate: function (serverTime) {
        calUtil.dt = new Date(serverTime * 1000);
        var year = calUtil.dt.getFullYear();
        var month = calUtil.dt.getMonth() + 1;
        var date = calUtil.dt.getDate();
        var hour = calUtil.dt.getHours();
        var minute = calUtil.dt.getMinutes();
        var second = calUtil.dt.getSeconds();
        console.log( year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second);
        return calUtil.dt;
    },
    draw:function(signList){
        //绑定日历
        var str = calUtil.drawCal(calUtil.dt.getFullYear(),calUtil.dt.getMonth() + 1,signList);
        $("#calendar").html(str);
        //绑定日历表头
        var calendarName=calUtil.dt.getFullYear()+"年"+(calUtil.dt.getMonth() + 1)+"月"+calUtil.dt.getDate()+"日";
        $(".calendar_month_span").html(calendarName);
    },
    //获取当前选择的年月
    setMonthAndDay:function(){
        switch(calUtil.eventName){
            case "load":
                var current = calUtil.dt;
                calUtil.showYear=current.getFullYear();
                calUtil.showMonth=current.getMonth() + 1;
                calUtil.showDays=current.getDate();
                console.log("showDays"+calUtil.showDays);
                break;
        }
    },
    getDaysInmonth : function(iMonth, iYear){
        var dPrevDate = new Date(iYear, iMonth, 0);
        // var dPate = new Date(iYear, iMonth);
        // console.log("122233:"+dPate) // 服务器时间的下个月1号
        console.log("dPrevDate:"+dPrevDate)
        console.log("dPrevDate:::"+dPrevDate.getDate())
        // 本月第一天
        return dPrevDate.getDate();
    },
    bulidCal : function(iYear, iMonth) {
        var aMonth = new Array();
        aMonth[0] = new Array(7);
        aMonth[1] = new Array(7);
        aMonth[2] = new Array(7);
        aMonth[3] = new Array(7);
        aMonth[4] = new Array(7);
        aMonth[5] = new Array(7);
        aMonth[6] = new Array(7);
        var dCalDate = new Date(iYear, iMonth - 1, 1); //当月第一天
        var iDayOfFirst = dCalDate.getDay();
        console.log("dCalDate:"+dCalDate);
        console.log("dCalDate:::"+dCalDate.getDate());
        console.log("当月第一天: 周几"+iDayOfFirst);
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
    ifHasSigned : function(signList,day){
        var signed = false;
        $.each(signList,function(index,item){
            if(item.signDay == day) {
                signed = true;
                return false;
            }
        });
        return signed ;
    },
    drawCal : function(iYear, iMonth ,signList) {
        var myMonth = calUtil.bulidCal(iYear, iMonth);
        var htmls = new Array();
        htmls.push("<div class='sign_main' id='sign_layer'>");
        htmls.push("<div class='sign_succ_calendar_title'>");
        htmls.push("<div class='calendar_month_span'></div>");
        htmls.push("</div>");
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
        for (w = 1; w < 7; w++) {
            htmls.push("<tr>");
            for (d = 0; d < 7; d++) {
                var ifHasSigned = calUtil.ifHasSigned(signList,myMonth[w][d]);
                if(ifHasSigned){
                    if( myMonth[w][d] == calUtil.showDays ) {
                        var todayhtml="<td><span class='cur_day'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</span><span class='red_tbg'></span></td>";
                        htmls.push(todayhtml);
                    } else {
                        htmls.push("<td>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : "") + "<span class='red_tbg'></span></td>");
                    }
                } else {
                    htmls.push("<td>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : "") + "</td>");
                }
            }
            htmls.push("</tr>");
        }
        htmls.push("</table>");
        htmls.push("</div>");
        htmls.push("</div>");
        return htmls.join('');
    }
};
