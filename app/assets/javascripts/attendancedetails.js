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
});