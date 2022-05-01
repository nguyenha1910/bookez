// Load Navigation bar
$(function(){
    $("#nav-placeholder").load("navbar.html");
});

function get_book_object(book) {
    return `<div class="bookDiv row py-2" data-m="${book._id}">
                <div class="bookDiv col">
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

    // $.each($('#book_list .row'), function (idx) {
    //     if (idx % 2 === 0) {
    //         $(this).addClass('even_row');
    //     } else {
    //         $(this).addClass('odd_row');
    //     }
    // });

    $('bookDiv').on('click', function () {
        const book_id = $(this).attr('data-m');
        location.href = "book_detail.html?book_id=" + car_id;
    });
}

$.getJSON("/get_cart_by_id").done((data)=>{
    if (data.message === "success") {
        console.log("file loaded");
        // Get a list of book id
        // GET request to find all books
        // bookData = data.data;
        // showList(bookData);
    } else {
        console.log("FE cant load data");
    }
});

