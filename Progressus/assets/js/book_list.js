// Load Navigation bar
$(function(){
    $("#nav-placeholder").load("navbar.html");
});

function get_book_object(book) {
    return `<div class="bookDiv row py-2" data-m="${book._id}">
                <div class="col book_name"><a>${book.book_name}</a></div>
                <div class="col author_name"><a>${book.author_name}</a></div>
                <div class="col price"><a>${book.price}</a></div>
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

    // $('.carDiv button').on('click', function () {
    //     const car_id = $(this).parent().parent().attr('data-m');
    //     location.href = "detail.html?car_id=" + car_id;
    // });
}

