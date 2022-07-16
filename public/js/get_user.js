$(document).ready(()=>{
    $.get('/auth/get_user').done((data)=>{
        // console.log(data);
        if (data["message"] === "user exists"){
            const user = data.data;
            const user_id = user.id;
            // console.log(user);
            $('#signin').remove();
            $('#user_fname').text(user.fname);
            if (user.user_type == 0) {
                $('#admin_zone').remove();
            }
            $("#cart-anchor").attr("href", "/views/cart.html?user_id="+user_id);
        } else {
            console.log("no user");
            $('#profile').remove();   
            $('#admin_zone').remove();
            // $("#cart-anchor").attr("href", "/auth/signin");
        }
    });
});

