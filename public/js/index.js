$(document).ready(()=>{
    $.get('/auth/get_user').done((data)=>{
        if (data.message === "user exists"){
            const user = data.data;
            console.log(user);
            $('#signin').remove();
            $('#user_fname').text(user.fname);
        } else {
            console.log("no user");
            $('#profile').remove();        
        }
    });
});

