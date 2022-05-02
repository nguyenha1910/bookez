// // Load Navigation bar
// $(function(){
//     $("#nav-placeholder").load("navbar.html");
// });

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const user_id = urlParams.get('user_id');
console.log(user_id);

function get_book_object(book) {
    return `<div class="bookDiv row py-2" data-m="${book._id}">
                <div class="infoDiv col">
                    <div class="book_name"><a>${book.book_name}</a></div>
                    <div class="author_name"><a>${book.author_name}</a></div>
                    <div class="price"><a>${book.price}</a></div>
                </div>
                <div class="buttonDiv col">
                    <div class="price">{book.price}</div>
                    <button type="button btn bth-danger">Remove</button>
                </div>
            </div>`;
}

function showList(books) {
    $('#cart_list').empty();
    books.forEach((book, idx) => {
        $('#cart_list').append(get_book_object(book, idx));
    });

    $('bookDiv').on('click', function () {
        const book_id = $(this).attr('data-m');
        location.href = "book_detail.html?book_id=" + car_id;
    });
}

$(document).ready(function () {
    if (user_id) {
        $.getJSON('/get_cart_by_id?user_id=' + user_id)
            .done(function (data) {
                if (data["message"] === "success") {
                    books = data["data"].cart;
                    showList(books);
                }
            });
    }
});