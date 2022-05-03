$('#user_id').hide(); 

var user;

// check to see if there is a user
$.get('/auth/get_user').done((data)=>{
    if (data){
        user = data.data;
        console.log("user: ", user);
        
        $('#full_name').hide();
        $('.email_input').hide();

        $('#signin').remove();
        $('#user_fname').text(user.fname);
        if (user.user_type == 0) {
            $('#admin_zone').remove();
        }
    } else {
        console.log("no user");
        $('#profile').remove();   
        $('#admin_zone').remove();
    }
});



$('form').on('submit', function () {
    // delete error text
    $('#error_message').text("");

    if (user) {
        $('#first_name:text').val(user.fname);
        $('#last_name:text').val(user.lname); 
        $('#email').val(user.email);
        $('#user_id:text').val(user.id); 
    }

    if ( !$('#first_name').val() || !$('#last_name').val() || !$('#book_name').val() ||
         !$('#condition').val() || !$('#email').val() || !$('#phone_num').val() || !$('#note').val() ) 
    {
        $('#error_message').text("One or more required fields are empty");
        return false; 
    }

    $('#success_message').text("Donation submitted successfully");

});
