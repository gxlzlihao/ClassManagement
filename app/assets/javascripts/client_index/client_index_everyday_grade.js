$(document).ready(function(){

    ss = window.location.href.split('/');
    var base_url = ss[0] + "/" + ss[1] + "/" + ss[2] + "/";

    $('button.btnEnterSignIn').click(function(){
        console.log( "To enter the course sign in page." );
        var _ac_id = $(this).prev().text();
        var _url = base_url + "client/course_signin?id=" + _ac_id;
        window.location.href = _url;
    });

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