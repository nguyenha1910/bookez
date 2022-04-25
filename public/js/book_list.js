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
<!--                    <button type="button" class="btn btn-outline-primary">Show More</button>-->
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



// $(document).ready(()=>{
//     $.getJSON('/get_current_user').done((data)=>{
//         if (data.message === "success"){
//             const user = data.data;
//             $('.login').remove();
//             $('#showname').text(user.fullname);
//         } else {
//             $('.logout').remove();
//         }
//     });
// });