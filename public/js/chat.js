$(document).ready(function(){
    var id = $('#receiverId').val();
    $('#message').click(function(){
        var message = $.trim($('#msg').val());
        
        if(message != ''){
            $.post('/message/'+id,{ // abbreviation of ajax method
                mes1: message,
                id:id
            }, function(){
                $('#msg').val('');
            });
        }
    });
    
    setInterval(function(){
        //location.href basically is used to target a particular element, in this case the div with class="msg". The setInterval method is used to refresh that particular div after every 0.2seconds
        console.log('location.href',location.href);
        $('.msg').load(location.href+ ' .msg');
    }, 200);
});