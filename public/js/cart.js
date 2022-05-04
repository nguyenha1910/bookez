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
                    <div class="book_name">${book.book_name}</div>
                    <div class="author_name">${book.author_name}</div>
                    <div class="price">${book.price}</div>
                </div>
                <div class="buttonDiv col">
                    <button type="button" class="btn btn-danger" onclick="removeBook(this)">Remove</button>
                </div>
            </div>`;
}

function showList(books) {
    $('#cart_list').empty();
    books.forEach((book, idx) => {
        $('#cart_list').append(get_book_object(book, idx));
    });

    $('.infoDiv').on('click', function () {
        const book_id = $(this).parent().attr('data-m');
        location.href = '../views/book_detail.html?book_id=' + book_id;
    });
}

function removeBook(buttonDiv){
    const book_id = $(buttonDiv).parent().parent().attr('data-m');
    console.log(book_id);
    $.post('/remove_book_from_cart', {user_id: user_id, book_id: book_id}).done((data)=>{
        // console.log(data);
        location.reload();
    });
}

$(document).ready(function () {
    if (user_id) {
        $.getJSON('/get_books_in_cart_by_id?user_id=' + user_id).done((data)=>{
            showList(data.data);
        });
    }
});
