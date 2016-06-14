$(document).ready(function(){
    ss = window.location.href.split('/');
    var base_url = ss[0] + '/' + ss[1] + '/' + ss[2] + '/';

    $('a#navbar_homepage_link').click(function(){
        window.location.href = base_url + 'index/homepage';
    });

    $('a#navbar_homework_link').click(function(){
        window.location.href = base_url + 'index/homework';
    });

    $('a#navbar_document_link').click(function(){
        window.location.href = base_url + "index/document";
    });

    $('a#navbar_everyday_grade_link').click(function(){
        window.location.href = base_url + "index/everyday_grade";
    });

    $('a#navbar_attendance_link').click(function(){
        window.location.href = base_url + "index/attendance";
    });
    
    $('button#btnClearUserData').click(function(){

        $.ajax({
                    type: 'POST',
                    url: '/index/clear_user_data' ,
                    complete: function( obj ){ 

                        console.log( obj ); 
                        var _answer = obj.responseText;
                        var _result = JSON.parse( _answer ).result;

                        if ( _result == 'ok' ) {
                            console.log( "user data clearing succeeds" );
                        } else if ( _result == 'error' ) {
                            console.log( "user data clearing fails" );
                        }

                    } ,
                    dataType: 'json'
            });

    });

    $('div#inputStudentClassUnit label').children('input:checkbox').click(function(){
        $(this).parent().siblings('label').children('input:checkbox').prop('checked', false)
    });

    $('tr.attendance_record_item').children('td.status').children('span').each(function(){
        var _status = $(this).text();
        if ( _status == '1' )
            $(this).next().val('缺勤');
        else if ( _status == '2' )
            $(this).next().val('迟到');
        else if ( _status == '3' )
            $(this).next().val('请假');
        else if ( _status == '4' )
            $(this).next().val('出勤');
    });

    function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }

    $('tr.attendance_record_item').children('td.status').children('select').change(function(){

        var _student_id = $(this).parent().prev().prev().text();
        var _check_id = getUrlParam("check_id");
        var _status = null;
        var _this_status = $(this).val();
        if ( _this_status.indexOf('出勤') > -1 ) {
            _status = 4;
        } else if ( _this_status.indexOf('请假') > -1 ) {
            _status = 3;
        } else if ( _this_status.indexOf('迟到') > -1 ) {
            _status = 2;
        } else if ( _this_status.indexOf('缺勤') > -1 ) {
            _status = 1;
        }

        var _data = new Object();
        _data.student_id = _student_id;
        _data.check_id = _check_id;
        _data.new_status = _status;

        $.ajax({
                    type: 'POST',
                    url: '/attendance/update_attendance_record',
                    data: _data,
                    complete: function( obj ){ 

                        console.log( obj ); 
                        var _answer = obj.responseText;
                        var _result = JSON.parse( _answer ).result;

                        if ( _result == 'ok' ) {
                            console.log( "updating attendance record succeeds" );
                        } else if ( _result == 'error' ) {
                            console.log( "updating attendance record fails" );
                        }

                    } ,
                    dataType: 'json'
            });

    });

});