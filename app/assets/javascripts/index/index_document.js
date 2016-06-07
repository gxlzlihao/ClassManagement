$(document).ready(function(){

    var now_course_id = $('a#now_course_info').text().split(':')[0];

    $('tr.document_item').each(function(){
        var this_course_id = $(this).children('td').first().children('span.course_id').text();
        if ( this_course_id != now_course_id ) {
            $(this).addClass('_hide');
        }
    });

    $('a.course_alternatives').click(function(){
        var new_course_id = $(this).text().split(':')[0];
        if ( new_course_id != now_course_id ) {

            $('a#now_course_info').text( $(this).text() );

            now_course_id = new_course_id;

            $('tr.document_item').each(function(){
                var this_course_id = $(this).children('td').first().children('span.course_id').text();
                if ( this_course_id != now_course_id ) {
                    $(this).addClass('_hide');
                } else {
                    $(this).removeClass('_hide');
                }
            });
        }
    });

    $('button#upload_document').click(function(){
        $('div#add_document form').children('input[type=file]').trigger('click');
    });

    $('div#add_document form').children('input[type=file]').change(function(){
        var _now_course_id = $('a#now_course_info').text().split(':')[0];
        $(this).next().val( _now_course_id );
        $(this).next().next().trigger('click');
    });

    $('a.document_link').click(function(){
        var _address = $(this).children('span.address').text();
        var _data = new Object();
        _data.address = _address;

        $.ajax({
                    type: 'POST',
                    url: '/index/download_document' ,
                    data: _data ,
                    dataType: 'json'
            });
    });

});