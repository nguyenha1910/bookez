
// $('#error_message').text(req.session.message_fail);

$('form').on('submit', function () {
    if ( !$('#email').val() || !$('#password').val() || !$('#confirm_password').val() ) {
        $('#error_message').text("One of the required fields is empty");
        return false; 
    }

    if ($('#password').val().length < 5){
        $('#error_message').text("Password must be at least 5 characters long");
        return false; 
    }

    if ( $('#password').val() !== $('#confirm_password').val() ) {
        $('#error_message').text("Password does not match");
        return false; 
    }
    
});
