let order_list; 

// order list
function get_order_object(order) {
    return `<li>
            <a href="/each_order?order_id=${order._id}" method="GET" class="list-group-item list-group-item-action">
                <p><strong>Order by: ${order.user_fname} ${order.user_lname}</strong></p>
                <small>${order.date_and_time}</small>
                <p>Area: ${order.city} ${order.state}</p>
            </a>     
            </li>`
}


$.get('/order_and_donation/populateOrders').done((data)=>{
    if (data){
        order_list = data.data;
        // console.log("order_list: ", order_list);
        // console.log(order_list.length);
        $('#order_length').text(order_list.length);
        order_list.forEach((item) => {
            $('#order_list').append(get_order_object(item)); 
        });
    } 
});








// // function for search functionality
// function search_filter(){
//     const currentSearch = $('#search_box').val().toLowerCase(); //receive user input in the search box
//     // for each loop jQuery
//     $.each($('#order_list li'), function (){ // run function for each li elem
//         // console.log($(this));
//         // search from the title and overview section
//         const title = $(this).find('h5').text().toLowerCase();
//         const overview = $(this).find('.mb-1 p').text().toLowerCase();

//         const hasWord = title.includes(currentSearch) || overview.includes(currentSearch);
//         if (hasWord) {
//             // console.log(title);
//             $(this).show(500);
//         }else{
//             $(this).hide(500);
//         }
//     });
// }

// $('#search_box').on('keyup', search_filter);











