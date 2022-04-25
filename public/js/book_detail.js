// Load Navigation bar
$(function(){
    $("#nav-placeholder").load("navbar.html");
});


function load_book(book) {
    // $('#poster_img').attr('src', car.url);
    $('#book_title').text(book.book_title);
    $('#book_author').text(book.book_author);
    $('#price').text(book.price);
}

