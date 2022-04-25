// toggle sidebar
const menu_toggle = document.querySelector('.menu-toggle'); 
const sidebar = document.querySelector('.sidebar');

menu_toggle.addEventListener('click', () => {
    menu_toggle.classList.toggle("is-active"); 
    sidebar.classList.toggle('is-active'); 
}); 



// order list
function get_order_object(order) {
    return `<li>
            <a href="/each_order?orderid=${order._id}" method="GET" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{title}}</h5>
                    <small>{{date_and_time}}</small>
                </div> 
                <p class="mb-1">{{body}}</p>
                <small>{{tags}}</small>
            </a>      
            </li>`
}


// function for search functionality
function search_filter(){
    const currentSearch = $('#search_box').val().toLowerCase(); //receive user input in the search box
    // for each loop jQuery
    $.each($('#order_list li'), function (){ // run function for each li elem
        // console.log($(this));
        // search from the title and overview section
        const title = $(this).find('h5').text().toLowerCase();
        const overview = $(this).find('.mb-1 p').text().toLowerCase();

        const hasWord = title.includes(currentSearch) || overview.includes(currentSearch);
        if (hasWord) {
            // console.log(title);
            $(this).show(500);
        }else{
            $(this).hide(500);
        }
    });
}

$('#search_box').on('keyup', search_filter);











