
$('.hide').hide();
$('#user_id').hide(); 
$('#cart').hide(); 

var user;

// check to see if there is a user
$.get('/auth/get_user').done((data)=>{
    if (data["data"]){
        user = data.data;
        console.log("user: ", user);

        $('#signin').remove();
        $('#user_fname').text(user.fname);
        if (user.user_type == 0) {
            $('#admin_zone').remove();
        }
    } else {
        console.log("no user");
        $('#profile').remove();   
        $('#admin_zone').remove();
        location.href = '/'; 
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

    if ( !$('#phone_no').val() || !$('#address').val() || !$('#apt').val() ||
         !$('#city').val() || !$('#state').val() || !$('#zip').val() ) 
    {
        $('#error_message').text("One or more required fields are empty");
        return false; 
    }

    $('#success_message').text("Order submitted successfully");

});