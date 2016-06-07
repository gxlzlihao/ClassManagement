$(document).ready(function(){
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
        // console.log("jj");
        // var homework_id = $(this).siblings('span.homework_id').text();
        // window.localStorage.setItem( 'ts', homework_id );
        // alert( window.localStorage.getItem('ts') );
    });

});