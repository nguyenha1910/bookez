// // Load Navigation bar
// $(function(){
//     $("#nav-placeholder").load("navbar.html");
// });

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const user_id = urlParams.get('user_id');
console.log(user_id);

$('form').on('submit', function () {
    console.log(user_id);
    if (user_id) {
        $('form').append(() => {
            const input = $('<input>')
                .attr("name", "user_id")
                .attr("value", user_id);
            return input;
        });
    }
});