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

    $('tr.homework_item').each(function(){
        var item_course_id = $(this).children('td').children('span.homework_course_id').text();
        if ( item_course_id != now_course_id ) {
            $(this).addClass('_hide');
        }
    });

    $('a.course_alternatives').click(function(){

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

    // $("#deadline_datetime").datetimepicker({format: 'yyyy-mm-dd hh:ii'});

    $('button#create_homework').click(function(){
        var _course_id = $('a#now_course_info').text().split(':')[0];
        var _course_name = $('a#now_course_info').text().split(':')[1];

        $('label#label_homework_course_id').text( _course_id );
        $('label#label_homework_course_name').text( _course_name );
    });

    $('button#submit_create_homework').click(function(){

        var _course_id = $('label#label_homework_course_id').text();
        var _course_name = $('label#label_homework_course_name').text();
        var _homework_name = $('input#input_homework_name').val();
        var _homework_description = $('input#input_homework_description').val();
        var _deadline = $('input#deadline_datetime').val();

        $('input#homework_course_id').val( _course_id );
        $('input#homework_homework_name').val( _homework_name );
        $('input#homework_homework_description').val( _homework_description );
        $('input#homework_deadline_datetime').val( _deadline );

        $('input#real_submit_create_homework').trigger('click');

    });

    $('a#choose_homework_attachment').click(function(){
        $('input#homework_attachment_url').trigger('click');
    });

    $('input#homework_attachment_url').change(function(){
        var _file_name = $(this).val().split('\\')[ $(this).val().split('\\').length - 1 ];
        $('a#choose_homework_attachment').children('label').text( _file_name );
    });

});