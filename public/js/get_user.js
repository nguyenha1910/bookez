$(document).ready(()=>{
    $.get('/auth/get_user').done((data)=>{
        console.log(data);
        if (data["data"]){
            const user = data.data;
            console.log(user);
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
});

