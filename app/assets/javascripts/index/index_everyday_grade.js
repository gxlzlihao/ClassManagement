$(document).ready(function(){

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

});