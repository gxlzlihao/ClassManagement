$(document).ready(function(){

    $('li.document_item').click(function(){

        var _doc_id = $(this).children('div').children('h4').text();
        var _doc_name = $(this).children('div').children('h6').text();
        var _doc_description = $(this).children('div').children('p').text();
        var _image_src = $(this).children('img').attr('src');
        var _doc_address = $(this).children('div').children('h1').text();

        $('div#fragment_document_details').children('div').children('h4').text( _doc_name );
        if ( _doc_address != null )
            $('div#fragment_document_details').children('div').children('a').attr( 'href', '/index/download_document?address=' + _doc_address );
        $('div#fragment_document_details').children('div').children('h5').text( _doc_id );
        $('div#fragment_document_details').children('div').children('p').text( _doc_description );
        $('div#fragment_document_details').children('div').children('img').attr( 'src', _image_src );

        $('div#fragment_document_list').css({'display':'none'});
        $('div#fragment_document_details').css({'display':'block'});
    });

    $('li#navbar_tab_homework').parent().children('li').click(function(){

        var _id = $(this).attr('id');

        var _reset = function() {
            $('div#main').children('div').children('div').each(function(){
                $(this).css({'display':'none'});
            });
        };

        _reset();

        if ( _id == 'navbar_tab_homework' ) {
            var _n = $('div#fragment_homework_list').children('div.homework_sector').length;
            if ( _n == 0 ) {
                $('div#fragment_homework_list').children('div#no_homework_reminds').css({'display':'block'});
            } else {
                $('div#fragment_homework_list').children('div#no_homework_reminds').css({'display':'none'});
            }
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