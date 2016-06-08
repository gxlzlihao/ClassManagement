$(document).ready(function(){
    ss = window.location.href.split('/');
    var base_url = ss[0] + '/' + ss[1] + '/' + ss[2] + '/';

    $('div.course_item').click(function(){
        var _course_id = $(this).children('span.course_id').text();
        var new_url = base_url + 'client/client_homepage?course_id=' + _course_id;
        window.location.href = new_url;
    });
});