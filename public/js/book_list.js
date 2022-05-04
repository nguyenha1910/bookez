// // Load Navigation bar
// $(function(){
//     $("#nav-placeholder").load("navbar.html");
// });

function get_book_object(book) {
    return `<div class="bookDiv row py-2" data-m="${book._id}">
    <div class="col-1 img"><a><img id="book_list_img" class="book_list_img" src="img/dummy_book.png" alt="square"/></a></div>
            <div class="col-7 book_name"><a>${book.book_name}</a></div>
            <div class="col-2 author_name"><a>${book.author_name}</div>
            <div class="col-1 price"><a>$ ${book.price.toFixed(2)}</a></div>
    
        <div class="buttonDiv col-2">
            <button type="button" id="add_to_cart" class="btn btn-outline-primary">Add to Cart</button>
        </div>
    </div>`;
}

function showList(books) {
    $('#book_list').empty();
    books.forEach((book, idx) => {
        $('#book_list').append(get_book_object(book, idx));
    });

    ///
    $('#book_list li')
    .attr("value", function (idx) {
        return books[idx]._id;
    })
    .append("<div class='row'></div>");

    ///

    $.each($('#book_list .row'), function (idx) {
        $(this).addClass('col-lg-4 col-md-5 col-sm-8');
        if (idx % 2 === 0) {
            $(this).addClass('even_row');
        } else {
            $(this).addClass('odd_row');
        }
    });



    $('.infoDiv').on('click', function () {
        const book_id = $(this).parent().attr('data-m');
        location.href = "views/book_detail.html?book_id=" + book_id;
    });
    $('.buttonDiv').on('click', function () {
        const book_id = $(this).parent().attr('data-m');
        $.post('/add_to_cart', {book_id: book_id}).done((data) => {
            if (data.message === "success"){
                console.log(data);
                location.reload();
            } else{
                console.log(data);
                location.href = data.redr;
            }
        });
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

function searchBook() {
    $.get('/search_books', {
        search_key: $('#search_box').val(),
    }).done((data)=>{
        console.log(data);
        if (data.message === "success"){
            showList(data.data);
        }
    });
}
