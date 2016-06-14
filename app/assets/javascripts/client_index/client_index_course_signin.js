$(document).ready(function(){
    $('button#submit_number').click(function(){
        var _input_number = $('input#input_number').val();
        var _data = new Object();
        _data.input_number = _input_number;

        $.ajax({
                type: 'POST',
                url: '/client/verify_signin' ,
                data: _data ,
                complete: function( obj ){ 

                    console.log( obj ); 
                    var _answer = obj.responseText;
                    var _result = JSON.parse( _answer ).result;

                    if ( _result == 'ok' ) {
                        alert( "Signin succeeds" );
                        window.location.href = window.location.href.replace( 'course_signin', 'everyday_grade' );
                    } else if ( _result == 'error' ) {
                        alert( "Input is not correct" );
                    } else if ( _result == 'check_not_start' ) {
                        alert( "The check has not started" );
                    }

                } ,
                dataType: 'json'
        });
    });

    $('img#topbar_back_image').click(function(){
        window.history.go(-1);
    });
});