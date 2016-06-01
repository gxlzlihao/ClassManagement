$(document).ready(function(){
    $('button#submit_client_signin').click(function(){
        var _input_client_id = $('input#input_client_id').val();
        var _input_client_password = $('input#input_client_password').val();

        var _data = new Object();
        _data.client_id = _input_client_id;
        _data.client_password = _input_client_password;

        $.ajax({
                type: 'POST',
                url: '/client/signin' ,
                data: _data ,
                complete: function( obj ){ 

                    console.log( obj ); 
                    var _answer = obj.responseText;
                    var _result = JSON.parse( _answer ).result;

                    if ( _result == 'ok' ) {
                        alert( "logining succeeds" );
                        window.location.href = window.location.href.replace( 'index', 'course_browser' );
                    } else if ( _result == 'not_found' ) {
                        alert( "logining fails" );
                    }

                } ,
                dataType: 'json'
        });
    });
});