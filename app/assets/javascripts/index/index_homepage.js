var now_class_unit = null;
var now_course_id = null;
var temp_class_id = null;

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

    now_course_id = $('a#now_course_info').text().split(':')[0];
    
    $('span.everyday_grade').each(function(){
            if ( $(this).attr('name') != now_course_id ) {
                $(this).addClass('_hide');
            } 
        });

    $('a.course_alternatives').each(function(){
        $(this).click(function(){
            var target_course_id = $(this).text().split(':')[0];
            if ( target_course_id != now_course_id ) {
                now_course_id = target_course_id;
                $('a#now_course_info').text( $(this).text() );

                $('span.everyday_grade').each(function(){
                    if ( $(this).attr('name') == now_course_id ) {
                        $(this).removeClass('_hide');
                    } else {
                        $(this).addClass('_hide');
                    }
                });

            }
        });
    });

    // $('li.class_unit_alternatives').each(function(){
    //     if ( $(this).index() == 2 ) {
    //         now_class_unit = $(this).children('span.class_unit_id').text();
    //     }
    // });

    now_class_unit = $('li.class_unit_alternatives').eq(2).children('span.class_unit_id').text();


    $('tr.student_record_row td select').each(function(){
        var _class_unit_id = $(this).siblings('span.class_unit_id').text();
        var _res_option_index = null;
        $(this).children('option').each(function(){
            var _this_class_unit_id = $(this).val().split(':')[0];
            if ( _this_class_unit_id == _class_unit_id ) {
                _res_option_index = $(this).index();
            }
        });
        $(this).val( $(this).children('option:eq(' + _res_option_index + ')').val() );

        if ( _class_unit_id != now_class_unit ) {
            $(this).parent().parent().toggleClass('_hide');
        }
    });

    $('tr.student_record_row td select').change(function(){

        // when the user changes the class_unit of one student
        var currentClassUnitId = $(this).siblings('span.class_unit_id').text();
        var selectedText = $(this).find("option:selected").text();
        var selectedClassUnitId = selectedText.split(':')[0];
        var temp_class_id = $(this).parent().prev().text();

        if ( currentClassUnitId != selectedClassUnitId ) {
            var currentStudentId = $(this).parent().prev().text();

            var _data = new Object();
            _data.student_id = currentStudentId;
            _data.class_unit_id = selectedClassUnitId;

            $.ajax({
                    type: 'POST',
                    url: '/index/update_student' ,
                    data: _data ,
                    complete: function( obj ){ 

                        console.log( obj ); 
                        var _answer = obj.responseText;
                        var _result = JSON.parse( _answer ).result;

                        if ( _result == 'ok' ) {
                            console.log( "changing succeeds" );

                            if ( selectedClassUnitId != now_class_unit ) {
                                $('tr.student_record_row td select').each(function(){
                                    if ( $(this).parent().prev().text() == temp_class_id ) {
                                        $(this).siblings('span.class_unit_id').text( selectedClassUnitId );
                                        $(this).parent().parent().addClass('_hide');
                                    }
                                });
                        
                            }
                        } else if ( _result == 'not_found' ) {
                            console.log( "changing fails" );
                            alert( "The database operation fails!" );
                        }

                    } ,
                    dataType: 'json'
            });
        }

    });

    $('li.class_unit_alternatives').children('a').click(function(){
        var _target_class_unit = $(this).siblings('span.class_unit_id').text();
        $('tr.student_record_row td select').each(function(){
            var _current_class_unit = $(this).siblings('span.class_unit_id').text();

            if ( _current_class_unit == _target_class_unit ) {
                $(this).parent().parent().removeClass('_hide');
            } else {
                $(this).parent().parent().addClass('_hide');
            }
        });
        now_class_unit = _target_class_unit;
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

    $('a.student_information_details').click(function(){
        var _name = $(this).text();
        var _id = $(this).parent().next().text();
        var _class_unit = $(this).parent().next().next().children('select').val().split(':')[1];

        $('h4#student_details_name').text( _name );
        $('h4#student_details_id').text( _id );
        $('h4#student_details_class_unit').text( _class_unit );
    });

    $('button#delete_account').click(function(){

        var _id = $('h4#student_details_id').text();
        var _data = new Object();
        _data.student_id = _id;

        $.ajax({
                type: 'POST',
                url: '/index/delete_student' ,
                data: _data ,
                complete: function( obj ){ 

                    console.log( obj ); 
                    var _answer = obj.responseText;
                    var _result = JSON.parse( _answer ).result;

                    if ( _result == 'ok' ) {
                        alert( "deleting succeeds" );
                        window.location.reload();
                    } else if ( _result == 'error' ) {
                        alert( "deleting fails" );
                    }

                } ,
                dataType: 'json'
        });

    });

});
