let donation_list; 

// donation list
function get_donation_object(donation) {
    return `<li>
            <a href="/each_donation?donation_id=${donation._id}" method="GET" class="list-group-item list-group-item-action">
                <div class="row donation_title">
                    <h4>${donation.book_name}</h4>
                    <p>Edition: ${donation.edition}</p>
                    <p>Condition: ${donation.condition}</p>
                    <small>${donation.date_and_time}</small>
                </div>
                <div class="row donation_info">
                    <p>Donated by: ${donation.user_fname} ${donation.user_lname}</p>
                    <p>User id: ${donation.user_id}</p>
                </div>
            </a>     
            </li>`
}


$.get('/order_and_donation/populateDonations').done((data)=>{
    if (data){
        donation_list = data.data;
        console.log("donation_list: ", donation_list);
        console.log(donation_list.length);
        $('#donation_length').text(donation_list.length);
        $('#donation_list').append(get_donation_object(donation_list[0])); 
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











