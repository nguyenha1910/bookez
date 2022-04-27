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

$('#cartButton').on('click', function(){
    // console.log(book_id);
    $.getJSON('/get_current_user').done((data)=>{
        if (data.message === "success"){
            console.log(data.data);
            // // console.log(data);
            // user_id = data.data._id;
            // car_id = obj.value;
            // const car = cars[car_id];
            // like = {
            //     user_id: user_id,
            //     make: car['make'],
            //     model: car['model'],
            //     year: car['year'],
            //     price: car['price']
            // };
            // console.log(like);
            // // $.post('/like_car', like).done((data)=>{
            // //     if (data.message === "success"){
            // //         console.log(`car ${car_id} liked`);
            // //     } else {
            // //         location.href = "login.html";
            // //     }
            // // });
        }
        else {
            console.log(data);
            // location.href = '/login';
        }
    });
});

// $.post('/get_car_by_id?car_id=' + car_id)
//     .done(function (data) {
//         if (data["message"] === "success") {
//             car = data["data"];
//             load_car(car);
//         }
//     });