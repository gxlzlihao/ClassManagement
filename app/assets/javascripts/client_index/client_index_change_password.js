$(document).ready(function(){
    $('button#back').click(function(){
        window.history.go(-1);
    });

    $('button#confirm_client_change_password').click(function(){

        var new_password = $('input#newPassword').val();
        var new_password_confirm = $('input#newPasswordConfirm').val();

        if ( new_password != new_password_confirm ) {
            alert( "您前后输入的新密码并不匹配！" );
        } else {

            var student_id = $('input#clientId').val();
            var student_password = $('input#oldPassword').val();
            var _data = new Object();
            _data.student_id = student_id;
            _data.student_password = student_password;
            _data.new_password = new_password;

            $.ajax({
                    type: 'POST',
                    url: '/client/edit_password' ,
                    data: _data ,
                    complete: function( obj ){ 

                        console.log( obj ); 
                        var _answer = obj.responseText;
                        var _result = JSON.parse( _answer ).result;

                        if ( _result == 'ok' ) {
                            alert( "密码修改成功！" );
                            
                            ss = window.location.href.split('/');
                            var _url = ss[0] + '/' + ss[1] + '/' + ss[2] + '/client/index';
                            window.location.href = _url;
                        } else if ( _result == 'error' ) {
                            alert( "密码修改失败！" );
                        } else if ( _result == 'not_found' ) {
                            alert( "旧密码不匹配！" );
                        }

                    } ,
                    dataType: 'json'
            });
        }

    });
});