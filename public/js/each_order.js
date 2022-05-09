// order list
function get_order_object(order) {
    return `<p><strong>Order by: ${order.user_fname} ${order.user_lname}</strong></p>
            <small>${order.date_and_time}</small>
            <p>Phone number: ${order.phone_num} </p>
            <p>Area: ${order.city} ${order.state} ${order.zip}</p>
            <p>Note: ${order.note} </p>`
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const order_id = urlParams.get('order_id');
console.log(order_id);



$(document).ready(function () {
    if (order_id) {
        $.get('/order_and_donation/get_order_by_id?order_id=' + order_id).done(function (data) {
                if (data["data"]) {
                    const instance = data["data"];
                    console.log("instance: ", instance);
                    $("#order_body").html( get_order_object(instance) );
                }
            });
    }
});






