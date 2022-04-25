// // Load Navigation bar
// $(function(){
//     $("#nav-placeholder").load("navbar.html");
// });

function get_book_object(book) {
    return `<div class="bookDiv row py-2" data-m="${book._id}">
                <div class="col-7 book_name"><a>${book.book_name}</a></div>
                <div class="col-2 author_name"><a>${book.author_name}</a></div>
                <div class="col-1 price"><a>${book.price}</a></div>
<!--                <div class="col-2">-->
<!--                    <button type="button" class="btn btn-outline-primary">Add to Cart</button>-->
<!--                </div>-->
            </div>`;
}

function showList(books) {
    $('#book_list').empty();
    books.forEach((book, idx) => {
        $('#book_list').append(get_book_object(book, idx));
    });

    $.each($('#book_list .row'), function (idx) {
        if (idx % 2 === 0) {
            $(this).addClass('even_row');
        } else {
            $(this).addClass('odd_row');
        }
    });

    $('.bookDiv').on('click', function () {
        const book_id = $(this).attr('data-m');
        location.href = "book_detail.html?book_id=" + book_id;
    });
}

$.getJSON("/get_all_books").done((data)=>{
    if (data.message === "success") {
        console.log("file loaded");
        bookData = data.data;
        showList(bookData);
    } else {
        console.log("FE cant load data");
    }
});

function sortAlpha(prop, a, b) {
    if (a[prop] < b[prop]) {
        return -1;
    }
    if (a[prop] > b[prop]) {
        return 1;
    }
    return 0;
}

function update_books(){
    const sort_by = $('#sortDropdown').val();
    if (sort_by === "book_name_sort"){
        bookData.sort((a, b) => sortAlpha("book_name", a, b));
    } else if (sort_by === "author_name_sort"){
        bookData.sort((a, b) => sortAlpha("author_name", a, b));
    } else{
        bookData.sort(function (a, b) {
            return a.price - b.price;
        });
    }
    showList(bookData);
}