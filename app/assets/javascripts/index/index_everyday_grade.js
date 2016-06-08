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

    $('div#btnInputGrades').click(function(){

        $('tr.everydayGradeItem').each(function(){
            $(this).children('td').eq(2).children('div').children('div.col-md-1').each(function(){
                var _new_input_element = null;
                if ( $(this).text() == ' - ' )
                    _new_input_element = $('<input style="margin-left: 5px; margin-top: 2px" class="col-md-2" type="text" placeholder="">');
                else
                    _new_input_element = $('<input style="margin-left: 5px; margin-top: 2px" class="col-md-2" type="text" placeholder="' + $(this).text() + '">');

                _new_input_element.appendTo($(this).parent());
                $(this).remove();

            });

            var _original_everyday_grade = $(this).children('td').last().text();
            $(this).children('td').last().text('');
            var _new_input_element = $('<input style="margin: 0 5px" class="col-md-12" type="text" placeholder="' + _original_everyday_grade + '">');
            _new_input_element.appendTo( $(this).children('td').last() );
        });

        $('div#btnInputGrades').addClass('_hide');
        $('div#btnConfirmSave').removeClass('_hide');
    });

    $('div#btnConfirmSave').click(function(){

        var _latest_records = new Array();
        $('tr.everydayGradeItem').each(function(){
            var _values = new Array();
            $(this).children('td').eq(2).children('div').children('input').each(function(){

                var _index = $(this).index();
                var _value = $(this).val();
                var _obj = new Object();

                _obj.index = _index;
                _obj.value = _value;

                _values.push( _obj );
            });

            var _student_id = $(this).children('td').eq(1).text();
            var _everyday_grade = $(this).children('td').last().children('input').val();
            var _obj = new Object();

            _obj.student_id = _student_id;
            _obj.everyday_grade = _everyday_grade;
            _obj.values = _values;

            _latest_records.push( _obj );
        });

        // TODO: update the recorded data inside the database.

        $('tr.everydayGradeItem').each(function(){

            $(this).children('td').eq(2).children('div').children('input').each(function(){

                var _value = $(this).val();
                if ( _value == '' ) _value = ' - ';
                var _new_element = $('<div class="col-md-1">' + _value + '</div>');
                _new_element.appendTo( $(this).parent() );
                $(this).remove();

            });

            var _value = $(this).children('td').last().children('input').val();
            $(this).children('td').last().children('input').remove();
            $(this).children('td').last().text( _value );

        });

        $('div#btnConfirmSave').addClass('_hide');
        $('div#btnInputGrades').removeClass('_hide');
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

    function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }

    $('li.class_unit_alternatives').children('a').click(function(){
        var _class_unit_id = $(this).siblings('span.class_unit_id').text();
        var _new_url = base_url + "index/everyday_grade?class_unit_id=" + _class_unit_id;
        if ( getUrlParam('course_id') != null ) {
            _new_url = _new_url + "&course_id=" + getUrlParam('course_id');
        }
        window.location.href = _new_url;
    });

    $('a.course_alternatives').click(function(){
        var _course_id = $(this).text().split(':')[0];
        var _new_url = base_url + "index/everyday_grade?course_id=" + _course_id;
        if ( getUrlParam('class_unit_id') != null ) {
            _new_url = _new_url + "&class_unit_id=" + getUrlParam('class_unit_id');
        }
        window.location.href = _new_url;
    });


});