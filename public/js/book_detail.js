// Load Navigation bar
// $(function(){
//     $("#nav-placeholder").load("navbar.html");
// });

function load_book(book) {
    // $('#poster_img').attr('src', car.url);
    $('#book_title').text(book.book_name);
    $('#book_author').text(book.author_name);
    const price = '$' + book.price.toFixed(2)
    $('#price').text(price);
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const book_id = urlParams.get('book_id');
console.log(book_id);

$(document).ready(function () {
    if (book_id) {
        $.getJSON('/get_book_by_id?book_id=' + book_id)
            .done(function (data) {
                if (data["message"] === "success") {
                    book = data["data"];
                    load_book(book);
                }
            });
    }
});

function addToCart() {
    $.get('/auth/get_user').done((data)=>{
        if (data.message === "user exists"){
            console.log(data);
            user_id = data.data.id;
            if (user_id){
                $.post('/add_to_cart', {user_id: user_id, book_id: book_id}).done((data) => {
                    console.log(data);
                    if (data.message === "success"){
                        // location.reload();
                    } else{
                        // location.href = data.redr;
                    }
                });
            } 
        } else {
            location.href = '/signin';
        }
    });
}