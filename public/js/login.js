$('form').on('submit', function () {
    if ( !$('#email').val() ) {
        $('#error_message').text("Missing email");
        return false; 
    }

    if ( !$('#password').val() ) {
        $('#error_message').text("Missing password");
        return false; 
    }
});
