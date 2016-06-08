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
        window.location.href = base_url + 'index';
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

    $('tr.homework_item').each(function(){
        var item_course_id = $(this).children('td').children('span.homework_course_id').text();
        if ( item_course_id != now_course_id ) {
            $(this).addClass('_hide');
        }
    });

    $('a.course_alternatives').click(function(){
        if ( $(this).text() != $('a#now_course_info').text() ) {
            $('a#now_course_info').text( $(this).text() );
            now_course_id = $(this).text().split(':')[0];

            $('tr.homework_item').each(function(){
            var item_course_id = $(this).children('td').children('span.homework_course_id').text();
            if ( item_course_id != now_course_id ) {
                $(this).addClass('_hide');
            } else {
                $(this).removeClass('_hide');
            }
        });
        }
    });

    $('a.homework_details').click(function(){
        var _homework_id = $(this).next().text();
        window.location.href = window.location.href.replace( '/index/homework','/homework/details?homework_id=' + _homework_id );
    });


    $('div#inputStudentClassUnit label').children('input:checkbox').click(function(){
        $(this).parent().siblings('label').children('input:checkbox').prop('checked', false)
    });

    $('button#submit_create_student').click(function(){
        var _input_student_name = $('input#inputStudentName').val();
        var _input_student_id = $('input#inputStudentId').val();
        var _input_student_password = $('input#inputStudentPassword').val();
        var _input_student_class_unit = null;

        $('div#inputStudentClassUnit label').children('input:checkbox').each(function(){
            if ( $(this).is(':checked') ) {
                var _this_class_unit_id = $(this).siblings('span').text();
                _input_student_class_unit = _this_class_unit_id;
            }
        });

        var _data = new Object();
        _data.student_name = _input_student_name;
        _data.student_id = _input_student_id;
        _data.student_class_unit = _input_student_class_unit;
        _data.student_password = _input_student_password;

        $.ajax({
                type: 'POST',
                url: '/index/create_student' ,
                data: _data ,
                complete: function( obj ){ 

                    console.log( obj ); 
                    var _answer = obj.responseText;
                    var _result = JSON.parse( _answer ).result;

                    if ( _result == 'ok' ) {
                        alert( "creating succeeds" );
                        window.location.reload();
                    } else if ( _result == 'error' ) {
                        alert( "creating fails" );
                    }

                } ,
                dataType: 'json'
        });

    });

    $('button#submit_create_course').click(function(){
        var _input_course_name = $('input#inputCourseName').val();
        var _input_course_class_units = [];
        $('div#inputCourseClassUnit label').children('input:checkbox').each(function(){
            if ( $(this).is(':checked') ) {
                var _this_class_unit_id = $(this).siblings('span').text();
                _input_course_class_units.push( _this_class_unit_id );
            }
        });

        var _submit_data = new Object();
        _submit_data.course_name = _input_course_name;
        _submit_data.course_class_units = _input_course_class_units;

        $.ajax({
                type: 'POST',
                url: '/index/create_course' ,
                data: _submit_data ,
                complete: function( obj ){ 

                    console.log( obj ); 
                    var _answer = obj.responseText;
                    var _result = JSON.parse( _answer ).result;

                    if ( _result == 'ok' ) {
                        alert( "creating succeeds" );
                        window.location.reload();
                    } else if ( _result == 'error' ) {
                        alert( "creating fails" );
                    }

                } ,
                dataType: 'json'
        });
    });

});