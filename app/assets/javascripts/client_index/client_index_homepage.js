$(document).ready(function(){

    $('li#navbar_tab_homework').parent().children('li').click(function(){

        var _id = $(this).attr('id');

        var _reset = function() {
            $('div#main').children('div').children('div').each(function(){
                $(this).css({'display':'none'});
            });
        };

        _reset();

        if ( _id == 'navbar_tab_homework' ) {
            $('div#fragment_homework_list').css({'display':'block'});
        } else if ( _id == 'navbar_tab_document' ) {
            $('div#fragment_document_list').css({'display':'block'});
        } else if ( _id == 'navbar_tab_group') {
            $('div#fragment_group_info').css({'display':'block'});
        } else if ( _id == 'navbar_tab_everyday_grade' ) {
            window.location.href = window.location.href.replace( 'client_homepage', 'everyday_grade' );
        }

    });

});