$(document).ready(function(){

    $('div#main_attendance').css({'display':'block'});

    $('div#sub_navbar div div').each(function(){
        $(this).click(function(){
            $(this).siblings('div').each(function(){
                $(this).removeClass('active');
            });
            $(this).addClass('active');

            $('div#main>div').each(function(){
                $(this).css({'display':'none'});
            });
            var _index = $(this).index();

            if ( _index == 0 ) {
                $('div#main_attendance').css({'display':'block'});
            } else if ( _index == 1 ) {
                $('div#main_performance').css({'display':'block'});
            } else if ( _index == 2 ) {
                $('div#main_homework').css({'display':'block'});
            }

        });
    });

});