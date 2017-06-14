/*
    1.获取时间   new Date()
    2.第一天和下个月第0天，计算一个月的时间
    3.确定第一天是周几
    4.将数字排布
*/
var Calendar = {
    _today: new Date(),// 1.获取时间 可以是服务器时间
    _date: new Date().getDate(),// 2.几号
    _day: new Date().getDay(),// 3.周几
    _month: new Date().getMonth(),// 4.月份
    _year: new Date().getFullYear(),// 5.年份
    setDate: function () { //几号
        this._date = new Date(this._today).getDate();
        return this._date;
    },
    setDay: function () { //周几
        this._day = new Date(this._today).getDay();
        return this._day;
    },
    setMonth: function () { //月份
        this._month = new Date(this._today).getMonth() + 1;
        return this._month;
    },
    setYear: function () { //年份
        this._year = new Date(this._today).getFullYear();
        return this._year;
    },
    init: function (time, signing,obj) {
        this._today = time;
        this.setDate();
        this.setDay();
        this.setMonth();
        this.setYear();
        // 注释上面4行，即获得客户端时间；放开为获取指定时间，如后台提供的服务器时间
        this.getCalendar(obj,signing);
    },
    contains: function (arr, obj) {
        var p = arr.length;
        while (p--) {
            if (arr[p] === obj) {
                return true;
            }
        }
        return false;
    },
    getCalendar: function (obj,signing) {
        var d = new Date(this._year, this._month, 1);
        var l = new Date(this._year, (this._month + 1), 0).getDate();
        var dfw = d.getDay();
        var today = this._date;
        var str = '';
        var tem = '';
        var arr = new Array();

        str += '<div class="calendar"><h4>' + this._year + '年' + this._month + '月' + this._date + '日' + '</h4>';
        str += '<table class="sign_tab" border="0" cellpadding="0" cellspacing="0">';
        str += '<thread><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thread>';
        str += '<tbody>';

        for (var i = 0; i < 6; i++) {
            arr[i] = new Array();
            str += '<tr>';
            for (var j = 0; j < 7; j++) {
                tem++;
                if (tem - dfw > 0 && tem - dfw <= l) { // 日历 二维数组（本月第一天到最后一天）
                    arr[i][j] = tem - dfw;
                    var ads = Calendar.contains(signing,arr[i][j]); //遍历签到的日期
                    // console.log('本月签到:'+ Calendar.contains(signing,arr[i][j]))
                    if ( ads == true) { //签到
                        if (arr[i][j] == today) {//当天（自动签到）
                            str += '<td style="color: #fff;background: slateblue">' + arr[i][j] + '</td>';
                        } else {
                            str += '<td style="color: #fff;background: salmon;">' + arr[i][j] + '</td>';
                        }
                    } else {
                        str += '<td>' + arr[i][j] + '</td>';
                    }
                } else { // 空
                    arr[i][j] = " ";
                    str += '<td>' + arr[i][j] + '</td>';
                }
            }
            str += '</tr>';
        }
        str += '</tbody></table></div>';
        return obj.html(str);
    }
};

