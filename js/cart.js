var cart = {};


function loadCart(){
    if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
    showCart();
    }
}

function showCart(){
    if (!isEmpty(cart)){
        $('.main-cart').html('Корзина пуста !');
    }
    else {
        $.getJSON('goods1000.json',  function (data){

               var goods1000 = data;
var sum = 0;
            var out = '';
            for (var id in cart) {

                out +='<a>'+id+ '</a>';
                out += `<a> ${cart[id]} шт.</a>`;
                out +=  `<a> ${cart[id]*goods1000[id].cost} грн.</a>    `;
                out += `<button data-id="${id}" class="minus-goods">-</button> `;
                out += `<button data-id="${id}" class="plus-goods">+</button>`;
                sum=sum+cart[id]*goods1000[id].cost;
                out += '<br>';
            }
               out +='<a>Всего: '+sum+' грн.</a>';


            $('.main-cart').html(out);
          $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);


        });

    }
}

    function delGoods(){
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();

}
function plusGoods(){
    var id = $(this).attr('data-id');
    cart[id] ++;
    saveCart();
    showCart();

}
function minusGoods(){
    var id = $(this).attr('data-id');
    if (cart[id]==1){
        delete cart[id];
    }else {
    cart[id] --;
    }
    saveCart();
    showCart();

}
function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
}



function isEmpty(object){
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail(){

    saveCart();
    showCart();

    var Name = $('#Name').val();
    var email = $('#email').val();
    var Phone = $('#Phone').val();
    var Delivery1 = $('#Delivery1').val();
    var Delivery2 = $('#Delivery2').val();
    var Delivery3 = $('#Delivery3').val();
    if (Delivery3!='' && email!='' && Phone!='' ){
if(isEmpty(cart)){

    $.post(
        "core/mail.php",
        {
            "Name" : Name,
            "email" : email,
            "Phone" : Phone,
            "Delivery1" : Delivery1,
            "Delivery2" : Delivery2,
            "Delivery3" : Delivery3,
            "cart" : cart

        },
        function (data){
            if (data==1) {
                location.href = '/feed.html';


            }else{
                alert('Ошибка, повторите заказ!!!');

            }
        }

    )

    }else{
    alert('Корзина пуста !');


    }
        }else{
        alert('Заполните поля');


        }

}


$(document).ready(function () {
    loadCart();
    $('.send-email').on('click', sendEmail);
});

function delCart(){
    localStorage.removeItem('cart');
}