$(document).ready(function(){

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

});