$(document).ready(function(){

    $('button#submit_teacher_signin').click(function(){
        var _teacher_name = $('input#input_teacher_name').val();
        var _teacher_password = $('input#input_teacher_password').val();

        var _data = new Object();
        _data.teacher_name = _teacher_name;
        _data.teacher_password = _teacher_password;

        $.ajax({
                    type: 'POST',
                    url: '/index/teacher_signin' ,
                    data: _data,
                    complete: function( obj ){ 

                        console.log( obj ); 
                        var _answer = obj.responseText;
                        var _result = JSON.parse( _answer ).result;

                        if ( _result == 'ok' ) {
                            console.log( "teacher loginin succeeds" );
                            
                            ss = window.location.href.split( '/' );
                            var _url = ss[0] + '/' + ss[1] + '/' + ss[2] + '/index/homepage';
                            window.location.href = _url;

                        } else if ( _result == 'error' ) {
                            console.log( "teacher loginin fails" );
                        }

                    } ,
                    dataType: 'json'
            });
    });

});