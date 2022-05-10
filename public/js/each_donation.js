// donation list
function get_donation_object(donation) {
    return `<div class="row donation_title">
                <h4>${donation.book_name}</h4>
                <p>Edition: ${donation.edition}</p>
                <p>Condition: ${donation.condition}</p>
                <small>${donation.date_and_time}</small>
            </div>
            <br>
            <div class="row donation_info">
                <p>Donated by: ${donation.user_fname} ${donation.user_lname}</p>
                <p>Email: ${donation.email}</p>
                <p>Phone Number: ${donation.phone_num}</p>
                <p>Note: ${donation.note}</p>
                <p>Status: ${donation.status}</p>
            </div>`    
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const donation_id = urlParams.get('donation_id');
console.log(donation_id);



$(document).ready(function () {
    if (donation_id) {
        console.log("here");
        $.get('/order_and_donation/get_donation_by_id?donation_id=' + donation_id).done(function (data) {
                if (data["data"]) {
                    const instance = data["data"];
                    console.log("instance: ", instance);
                    $("#donation_body").html( get_donation_object(instance) );
                }
            });
    }
});






