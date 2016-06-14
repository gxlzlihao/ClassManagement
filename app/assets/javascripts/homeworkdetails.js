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

    var now_class_unit_id = null;
    $('li.class_unit_alternatives').each(function(){
        if ( $(this).index() == 2 )
            now_class_unit_id = $(this).children('span.class_unit_id').text();
    });

    $('tr.homework_item_record').each(function(){
        var this_class_unit_id = $(this).children('td').children('span.homework_record_class_unit_id').text();

        if ( this_class_unit_id != now_class_unit_id )
            $(this).addClass('_hide');
    });

    $('li.class_unit_alternatives').children('a').click(function(){
        var new_class_unit_id = $(this).prev().text();
        if ( new_class_unit_id != now_class_unit_id ) {
            $('tr.homework_item_record').each(function(){
                var this_class_unit_id = $(this).children('td').children('span.homework_record_class_unit_id').text();

                if ( this_class_unit_id != new_class_unit_id ) {
                    $(this).addClass('_hide');
                } else {
                    $(this).removeClass('_hide');
                }
            });
            now_class_unit_id = new_class_unit_id;
        }
    });

    $('button#beginInput').click(function(){

        $('tr.homework_item_record:not(._hide)').each(function(){
            var _grade = $(this).children('td').last().text();
            $(this).children('td').last().remove();
            $('<td><input type="text" placeholder=' + _grade + '></td>').appendTo($(this));
        });

        $(this).addClass('_hide');
        $(this).next().removeClass('_hide');
    });

    $('button#confirmSave').click(function(){

        var _updated_data = new Array();
        var _error_found = false;

        $('tr.homework_item_record:not(._hide)').each(function(){
            var _grade = $(this).children('td').last().children('input').val();

            console.log( _grade );

            if ( isNaN( _grade ) ) {
                console.log( "error found - " + _grade );
                _error_found = true;
            } else if ( _grade != '' ) {
                var _record_id = $(this).children('td').first().children('span.homework_record_id').text();
                var _data = new Object();
                _data.record_id = _record_id;
                _data.grade = _grade;
                _updated_data.push( _data );
            }
        });

        if ( _error_found == false ) {
            var _t = new Object();
            _t.data = _updated_data;

            console.log( "stringify result: " + _updated_data );

            $.ajax({
                    type: 'POST',
                    url: '/homework/update_details' ,
                    data: _t ,
                    complete: function( obj ){ 

                        console.log( obj ); 
                        var _answer = obj.responseText;
                        var _result = JSON.parse( _answer ).result;

                        if ( _result == 'ok' ) {
                            alert( "creating succeeds" );

                            $('tr.homework_item_record:not(._hide)').each(function(){
                                var _value = $(this).children('td').last().children('input').val();
                                if ( _value == '' )
                                    _value = $(this).children('td').last().children('input').attr('placeholder');
                                $(this).children('td').last().remove();
                                $('<td>' + _value + '</td>').appendTo( $(this) );
                            });

                            $('button#confirmSave').addClass('_hide');
                            $('button#confirmSave').prev().removeClass('_hide');
                        } else if ( _result == 'error' ) {
                            alert( "creating fails" );
                        }

                    } ,
                    dataType: 'json'
            });

        } else  {
            alert( "The grade could only be number!" );
        }
    });

    $('div#inputStudentClassUnit label').children('input:checkbox').click(function(){
        $(this).parent().siblings('label').children('input:checkbox').prop('checked', false)
    });

    // $('button#submit_create_student').click(function(){
    //     var _input_student_name = $('input#inputStudentName').val();
    //     var _input_student_id = $('input#inputStudentId').val();
    //     var _input_student_password = $('input#inputStudentPassword').val();
    //     var _input_student_class_unit = null;

    //     $('div#inputStudentClassUnit label').children('input:checkbox').each(function(){
    //         if ( $(this).is(':checked') ) {
    //             var _this_class_unit_id = $(this).siblings('span').text();
    //             _input_student_class_unit = _this_class_unit_id;
    //         }
    //     });

    //     var _data = new Object();
    //     _data.student_name = _input_student_name;
    //     _data.student_id = _input_student_id;
    //     _data.student_class_unit = _input_student_class_unit;
    //     _data.student_password = _input_student_password;

    //     $.ajax({
    //             type: 'POST',
    //             url: '/index/create_student' ,
    //             data: _data ,
    //             complete: function( obj ){ 

    //                 console.log( obj ); 
    //                 var _answer = obj.responseText;
    //                 var _result = JSON.parse( _answer ).result;

    //                 if ( _result == 'ok' ) {
    //                     alert( "creating succeeds" );
    //                     window.location.reload();
    //                 } else if ( _result == 'error' ) {
    //                     alert( "creating fails" );
    //                 }

    //             } ,
    //             dataType: 'json'
    //     });

    // });

    // $('button#submit_create_course').click(function(){
    //     var _input_course_name = $('input#inputCourseName').val();
    //     var _input_course_class_units = [];
    //     $('div#inputCourseClassUnit label').children('input:checkbox').each(function(){
    //         if ( $(this).is(':checked') ) {
    //             var _this_class_unit_id = $(this).siblings('span').text();
    //             _input_course_class_units.push( _this_class_unit_id );
    //         }
    //     });

    //     var _submit_data = new Object();
    //     _submit_data.course_name = _input_course_name;
    //     _submit_data.course_class_units = _input_course_class_units;

    //     $.ajax({
    //             type: 'POST',
    //             url: '/index/create_course' ,
    //             data: _submit_data ,
    //             complete: function( obj ){ 

    //                 console.log( obj ); 
    //                 var _answer = obj.responseText;
    //                 var _result = JSON.parse( _answer ).result;

    //                 if ( _result == 'ok' ) {
    //                     alert( "creating succeeds" );
    //                     window.location.reload();
    //                 } else if ( _result == 'error' ) {
    //                     alert( "creating fails" );
    //                 }

    //             } ,
    //             dataType: 'json'
    //     });
    // });

});