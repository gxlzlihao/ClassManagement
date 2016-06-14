$(document).ready(function(){

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

    var now_course_id = $('a#now_course_info').text().split(':')[0];
    $('tr.attendance_check_item').each(function(){
        var this_course_id = $(this).children('td').children('div').first().children('div').first().children('span.course_id').text();
        if ( now_course_id != this_course_id )
            $(this).addClass('_hide');
    });

    $('a.course_alternatives').click(function(){
        now_course_id = $(this).text().split(':')[0];
        $('tr.attendance_check_item').each(function(){
            var this_course_id = $(this).children('td').children('div').first().children('div').first().children('span.course_id').text();
            if ( now_course_id != this_course_id )
                $(this).addClass('_hide');
            else 
                $(this).removeClass('_hide');
        });
    });

    var check_id = null;

    $('a#create_new_attendance_check').click(function(){
        var _now = new Date();
        var _time_str = ( _now.getMonth() + 1 ) + "月" + _now.getDate() + "日";
        $('h4#attendanceCheckTargetTime').text( _time_str );

        var _current_course_name = $('a#now_course_info').text().split(':')[1];
        $('h4#attendanceCheckTargetCourse').text( _current_course_name );

        var _random_number= Math.floor( Math.random() * 10000 );
        $('h1#attendanceCheckNumber').text( _random_number );
    });

    $('#refresh_target_number').click(function(){
        // to save the new attendance check
        var _target_number = $('h1#attendanceCheckNumber').text();
        var _course_id = $('a#now_course_info').text().split(':')[0];

        var _data = new Object();
        _data.target_number = _target_number;
        _data.course_id = _course_id;

        // ajax
        $.ajax({
                    type: 'POST',
                    url: '/attendance/create_new_attendance_check' ,
                    data: _data,
                    complete: function( obj ){ 

                        console.log( obj ); 
                        var _answer = obj.responseText;
                        var _result = JSON.parse( _answer ).result;

                        if ( _result == 'ok' ) {
                            check_id = JSON.parse( _answer ).new_check_id;
                            console.log( "creating attendance check succeeds, with the new check id: " + check_id );

                            $('h1#temporal_check_id').text( check_id );
                        } else if ( _result == 'error' ) {
                            console.log( "creating attendance check fails" );
                        }

                    } ,
                    dataType: 'json'
            });
    });

    $('a.attendance_check_details').click(function(){
        var _check_id = $(this).prev().text();
        ss = window.location.href.split('/');
        var new_url = ss[0] + '/' + ss[1] + '/' + ss[2]+ '/attendance/details?check_id=' + _check_id;
        window.location.href = new_url;
    });

    $('a#terminate_attendance_check').click(function(){
        var _data = new Object();
        _data.check_id = $('h1#temporal_check_id').text();;

        $.ajax({
                    type: 'POST',
                    url: '/attendance/terminate_attendance_check' ,
                    data: _data,
                    complete: function( obj ){ 

                        console.log( obj ); 
                        var _answer = obj.responseText;
                        var _result = JSON.parse( _answer ).result;

                        if ( _result == 'ok' ) {
                            var _check_id = JSON.parse( _answer ).check_id;
                            console.log( "terminate attendance check succeeds" );
                            ss = window.location.href.split('/');
                            var new_url = ss[0] + '/' + ss[1] + '/' + ss[2] + '/attendance/details?check_id=' + _check_id;
                            window.location.href = new_url;
                        } else if ( _result == 'error' ) {
                            console.log( "termiante attendance check fails" );
                        }

                    } ,
                    dataType: 'json'
            });
    });

    $('div#inputStudentClassUnit label').children('input:checkbox').click(function(){
        $(this).parent().siblings('label').children('input:checkbox').prop('checked', false)
    });

});