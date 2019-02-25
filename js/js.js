//RegExp
var regex = {
    name : /^[а-яёА-ЯЁa-zA-Z\s]+$/,
    password : /^[a-zA-Z0-9_-]{6,18}$/,
    phone : /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
    comment : /[^\<\>\[\]%'`]+$/,
    email : /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

};

var errList = {
    name : "Your name",
    password : "Your password",
    phone : "Your phone",
    // comment : "About you",
    email : "Your e-mail"
};

function buildGoods() {//создаем список товаров
    $.get('http://localhost:3000/goods', {}, function (goods) {
        $('.box-product').empty();

        goods.forEach(function (good) {
            var $product = $('<div/>', {
                class: 'product'
            });
            $product.appendTo('.box-product');

            var $link = $('<a/>', {
                class: 'product-link',
                href: 'singlepage.html'
            });
            $link.appendTo($product);

            var $img = $('<img/>', {
                class: 'product-image',
                alt: 'product image',
                src: good.src
            });

            $img.appendTo($link);


            var $prodText = $('<div/>', {
                class: 'product-text'
            })

            $prodText.appendTo($link);
            var $p = $('<p/>', {
                text: 'Mango  People  T-shirt'
            })

            $p.appendTo($prodText)

            var $span = $('<span/>', {
                text: '$' + good.price,
            })

            $span.appendTo($prodText)


            var $star = $('<div/>', {
                class: 'star',
            });

            $star.appendTo($prodText);

            var $i = $('<i/>', {
                class: 'fas fa-star'
            });

            $i.appendTo($star);

            var $boxCenter = $('<div/>', {
                class: 'box-center'
            });

            var $cart = $('<i/>', {
                class: 'fas fa-shopping-cart',
                text: ' ' + ' Add to Cart'
            });

            var $toCart = $('<a/>', {
                class: 'add-to-cart',
                href: 'shoppingcart.html',
                'data-id': good.id,
                'data-price': good.price,
                'data-name': good.name,
                'data-quantity': good.quantity,
                'data-src': good.src,
                'data-result': good.result
            })



            $cart.appendTo($toCart);

            $toCart.appendTo($boxCenter)

            $boxCenter.appendTo($product);



        }, 'json');

    }, 'json');
};
function buildUserCart(){
    $.get('http://localhost:3000/cart', {}, function (items) {
        $('.cart-mega-menu').empty();
        items.forEach(function(item){
            var item = {
                'id': item.id,
                'price': item.price,
                'name': item.name,
                'quantity': item.quantity,
                'src': item.src,
                'result': 1
            }
            $.ajax({
                url: 'http://localhost:3000/cart/' + item.id,
                type: 'PATCH',
                data: item,
                success: function () {
                    buildCart();
                    
                }
            }) 

        })

    })
}

function logoutUserCart(){
    $.get('http://localhost:3000/cart', {}, function (items) {
        $('.cart-mega-menu').empty();
        items.forEach(function(item){
            var item = {
                'id': item.id,
                'price': item.price,
                'name': item.name,
                'quantity': item.quantity,
                'src': item.src,
                'result': 0
            }
            $.ajax({
                url: 'http://localhost:3000/cart/' + item.id,
                type: 'PATCH',
                data: item,
                success: function () {
                    buildCart();
                    
                }
            }) 

        })

    })
}
function buildUserGoods(){
    $.get('http://localhost:3000/goods', {}, function (items) {
        $('.box-product').empty();
        items.forEach(function(item){
            var item = {
                'id': item.id,
                'price': item.price,
                'name': item.name,
                'quantity': item.quantity,
                'src': item.src,
                'result': 1
            }
            $.ajax({
                url: 'http://localhost:3000/goods/' + item.id,
                type: 'PATCH',
                data: item,
                success: function () {
                    buildGoods();
                    
                }
            }) 

        })

    })
}

function logoutUserGoods(){
    $.get('http://localhost:3000/goods', {}, function (items) {
        $('.box-product').empty();
        items.forEach(function(item){
            var item = {
                'id': item.id,
                'price': item.price,
                'name': item.name,
                'quantity': item.quantity,
                'src': item.src,
                'result': 0
            }
            $.ajax({
                url: 'http://localhost:3000/goods/' + item.id,
                type: 'PATCH',
                data: item,
                success: function () {
                    buildGoods();
                    
                }
            }) 

        })

    })
}
function buildCart() {
    $.get('http://localhost:3000/cart', {}, function (items) {
        $('.cart-mega-menu').empty();

        // создаем мегаменю

        var $triangle = $('<div/>', {
            class: 'triangle'
        });

        var $square = $('<div/>', {
            class: 'square'
        });

        $triangle.appendTo($('.cart-mega-menu'));
        $square.appendTo($('.cart-mega-menu'));

        var $megabox = $('<div/>', {
            class: 'mega-box',
            id: '#mega-box'
        })
        $megabox.appendTo($('.cart-mega-menu'));

        var total = 0; //создаем переменную тут, считаем ее в цикле
        $('.summary').empty();
        $('.summary').append('$'+' ' + total);
        //создаем сами товары корзины
        items.forEach(function (item) {

            total += +item.price * +item.quantity;
            // sum += +item.quantity;
            $('.summary').empty();
            $('.summary').append('$'+' ' + total);
            
            var $cartProduct = $('<div/>', {
                class: 'cart-product2',
                'data-id': item.id,
                'data-quantity': item.quantity,
                'data-price': item.price,
                'data-name': item.name,
                'data-src': item.src,
                'data-result':item.result
            });

            $cartProduct.appendTo($megabox);

            var $leftImg = $('<div/>', {
                class: 'left-img'
            })

            $leftImg.appendTo($cartProduct);

            var $cartImg = $('<img/>', {
                class: 'cart-image',
                alt: 'cart-product2',
                src: item.src
            })

            $cartImg.appendTo($leftImg);

            var $cartText = $('<div/>', {
                class: 'cart-product-text'
            })

            $cartText.appendTo($cartProduct);

            var $h3 = $('<h3/>', {
                text: item.name,
            });
            $h3.appendTo($cartText);

            var $stars = $('<div/>', {
                class: 'stars'
            })

            $stars.appendTo($cartText);

            var $i = $('<i/>', { //можно попробовать звезды через цикл
                class: 'fas fa-star'
            })

            $i.appendTo($stars);

            var $p = $('<p/>', {//не понятно что тут
                // text: $spanQuantity[+'data-quantity'] +' X '+'$ '+item.price
            });

            var $spanQuantity = $('<span/>', {
                class: 'cartGoodQuantity',
                // 'data-id': item.id,
                // 'data-quantity': item.quantity,
                text: item.quantity
            })

            var $spanSum = $('<span/>', {
                class: 'sumCartGood',
                // 'data-id': item.id,
                // 'data-quantity': item.quantity,
                text: ' X ' + ' $ ' + item.price
            })
            $spanQuantity.appendTo($p);
            $spanSum.appendTo($p);
            $p.appendTo($cartText);

            var $wrapCross = $('<div/>', {
                class: 'cross',
            })

            $wrapCross.appendTo($cartProduct);

            var $crossLink = $('<a/>', {

                class: 'delete',
                'data-id': item.id,
                'data-price': item.price,
                'data-quantity': item.quantity,
                // 'data-name': item.name,
                // 'data-src': item.src,
            });
            $crossLink.appendTo($wrapCross);

            var $i = $('<i/>', {
                class: 'fas fa-times-circle'
            })

            $i.appendTo($crossLink);


        });

        //создаем надпись тотал

        var $total = $('<div/>', {
            class: 'total'
        })
        $total.appendTo($megabox);

        var $totalLeft = $('<div>', {
            class: 'left'
        })
        $totalLeft.appendTo($total);

        var $h2 = $('<h2>', {
            text: 'Total:'
        })

        $h2.appendTo($totalLeft);

        var $totalRight = $('<div>', {
            class: 'right'
        })
        $totalRight.appendTo($total);


        var $h2R = $('<h2>', {
            text: '$' + ' ' + total
        })

        $h2R.appendTo($totalRight);


        //создаем кнопки
        var $cartBtns = $('<div/>', {
            class: 'cart-product-btns'
        })

        $cartBtns.appendTo($megabox);

        var $linkBtnTop = $('<a/>', {
            href: 'checkout.html'
        })

        $linkBtnTop.appendTo($cartBtns)

        var $checkoutWrap = $('<div/>', {
            class: 'ct-product-btn',
            id: 'top'
        })

        $checkoutWrap.appendTo($linkBtnTop);

        var $span = $('<span/>', {
            text: 'checkout'
        })

        $span.appendTo($checkoutWrap);

        var $linkBtnBottom = $('<a/>', {
            href: 'shoppingcart.html'
        })

        $linkBtnBottom.appendTo($cartBtns);

        var $checkoutWrapper = $('<div/>', {
            class: 'ct-product-btn',
            id: 'bottom'
        })

        $checkoutWrapper.appendTo($linkBtnBottom);

        var $spanb = $('<span/>', {
            text: 'go to cart'
        })

        $spanb.appendTo($checkoutWrapper);







    }, 'json')
}

function buildCartRow() {
    $.get('http://localhost:3000/cart', {}, function (rows) {
        $('#cart-row-container').empty();

        //create table header  
        $rowHead = $('<div/>', {
            class: 'cart-row'
        })
        $rowHead.appendTo('#cart-row-container')
        //1
        $cellHead1 = $('<div/>', {
            class: 'cart-cell cell1'
        })
        $cellHead1.appendTo($rowHead);

        $spanHead1 = $('<span/>', {
            class: 'cart-header',
            text: 'product details'
        })
        $spanHead1.appendTo($cellHead1);
        //2
        $cellHead2 = $('<div/>', {
            class: 'cart-cell cell2'
        })
        $cellHead2.appendTo($rowHead);

        $spanHead2 = $('<span/>', {
            class: 'cart-header',
            text: 'unite price'
        })
        $spanHead2.appendTo($cellHead2);
        //3
        $cellHead3 = $('<div/>', {
            class: 'cart-cell cell3'
        })
        $cellHead3.appendTo($rowHead);

        $spanHead3 = $('<span/>', {
            class: 'cart-header',
            text: 'quantity'
        })
        $spanHead3.appendTo($cellHead3);
        //4
        $cellHead4 = $('<div/>', {
            class: 'cart-cell cell4'
        })
        $cellHead4.appendTo($rowHead);

        $spanHead4 = $('<span/>', {
            class: 'cart-header',
            text: 'shipping'
        })
        $spanHead4.appendTo($cellHead4);
        //5
        $cellHead5 = $('<div/>', {
            class: 'cart-cell cell5'
        })
        $cellHead5.appendTo($rowHead);

        $spanHead5 = $('<span/>', {
            class: 'cart-header',
            text: 'subtotal'
        })
        $spanHead5.appendTo($cellHead5);
        //6
        $cellHead6 = $('<div/>', {
            class: 'cart-cell cell6'
        })
        $cellHead6.appendTo($rowHead);

        $spanHead6 = $('<span/>', {
            class: 'cart-header',
            text: 'action'
        })
        $spanHead6.appendTo($cellHead6);



        rows.forEach(function (row) {
            //    $('.cart-table-btn-left').attr('data-id', row.id);

            $cartRow = $('<div/>', {
                class: 'cart-row',//возможно добавить дата атрибуты
                'data-name': row.name,
                'data-id': row.id,
                'data-quantity': row.quantity,
                'data-price': row.price,
                'data-src': row.src
            })

            $cartRow.appendTo($('#cart-row-container'));

            $cell1 = $('<div/>', {
                class: 'cart-cell cell1'
            })

            $cell1.appendTo($cartRow);

            $cellLink = $('<a/>', {
                class: 'contrast',
                href: 'singlepage.html'
            })
            $cellLink.appendTo($cell1);

            $imgCell = $('<img/>', {
                class: 'box',
                src: row.src,
                alt: 'mango people t-shirt'
            })
            $imgCell.appendTo($cellLink);

            var $cell1Text = $('<div/>', {
                class: 'cell1-text',
            })
            $cell1Text.appendTo($cell1);

            $cellTextLink = $('<a/>', {
                href: '#',
            })
            $cellTextLink.appendTo($cell1Text);

            $cellH3 = $('<h3/>', {
                text: row.name
            })
            $cellH3.appendTo($cellTextLink);

            var $star = $('<div/>', {
                class: 'star',
            });

            $star.appendTo($cellTextLink);

            var $i = $('<i/>', {
                class: 'fas fa-star'
            });

            $i.appendTo($star);

            $spanPar1 = $('<span/>', {
                text: 'Color:' + ' '
            })
            $spanPar1.appendTo($cell1Text);

            $spanCh1 = $('<span/>', {
                text: 'Red'
            })
            $spanCh1.appendTo($spanPar1);

            $br = $('<br/>');
            $br.appendTo($spanPar1);

            $spanPar2 = $('<span/>', {
                text: 'Size:' + ' '
            })
            $spanPar2.appendTo($cell1Text);

            $spanCh2 = $('<span/>', {
                text: 'XII'
            })
            $spanCh2.appendTo($spanPar2);

            $br = $('<br/>');
            $br.appendTo($spanCh2);

            //cell2
            $cell2 = $('<div/>', {
                class: 'cart-cell cell2'
            })
            $cell2.appendTo($cartRow);

            $spanC2 = $('<span/>', {
                text: '$' + ' ' + row.price
            })
            $spanC2.appendTo($cell2);

            //cell3
            $cell3 = $('<div/>', {
                class: 'cart-cell cell3'
            })
            $cell3.appendTo($cartRow);

            var $inputC3 = $('<input/>', {
                type: 'text',
                value: row.quantity
            })
            $inputC3.appendTo($cell3);

            //cell4
            $cell4 = $('<div/>', {
                class: 'cart-cell cell4'
            })
            $cell4.appendTo($cartRow);

            $spanC4 = $('<span/>', {
                text: 'free'
            })
            $spanC4.appendTo($cell4);

            //cell5
            $cell5 = $('<div/>', {
                class: 'cart-cell cell5'
            })
            $cell5.appendTo($cartRow);

            $spanC5 = $('<span/>', {
                text: '$' + ' ' + row.price * row.quantity
            })
            $spanC5.appendTo($cell5);

            //cell6
            $cell6 = $('<div/>', {
                class: 'cart-cell cell6'
            })
            $cell6.appendTo($cartRow);

            var $crossLink = $('<a/>', {
                class: 'delete',
                'data-id': row.id,
                'data-price': row.price,
                'data-quantity': row.quantity,
                // 'data-name': item.name,
                // 'data-src': item.src,
            });
            $crossLink.appendTo($cell6);

            var $i = $('<i/>', {
                class: 'fas fa-times-circle'
            })

            $i.appendTo($crossLink);
        })

    })
}

function roundCounter() {
    $.get('http://localhost:3000/cart', {}, function (sums) {
        //round with quantity
        var sum = 0;
        
        sums.forEach(function (summ) {
            sum += +summ.quantity;
            // console.log(sum);

            var $quantity = $('<div/>', {
                class: 'round-two',
                text: sum
            });
            $quantity.appendTo('.image-cart');

            

            
        })

    })
}

function buildLoginBtn(){
    $.get('http://localhost:3000/user', {}, function (logins){
        logins.forEach(function(login){
            var $loginBtn = $('<a/>', {
                href: '#',
                class: 'btnH loginBtn',
                text: 'Log In'
            })
            $loginBtn.appendTo($('.login-form'))
        })
    })
}

function userData(){
    var user = {
        'name':$('#name').val(),
        'password':$('#password').val(),
        'email':$('#email').val(),
        'phone':$('#phone').val(),
        'result': 0
    }
    $.ajax({
        url: 'http://localhost:3000/user',
        type: 'POST',
        data: user,
        success: function () {
            buildCart();
            roundCounter();
        }
    }, 'json');


}

function isLogin(){
    $.get('http://localhost:3000/user', {}, function (users) {
        $('.user-hello').empty();
        users.forEach(function(user){
            if(+user.result == 1){
                var $spanHello = $('<span/>', {
                    result: user.result,
                    id: user.id,
                    email:user.email,
                    password:user.password,
                    text: 'Hello,' + ' ' + user.name,
                    class:'user-hello'
                })
                
                $('#shoppingcart').before($spanHello)
            }else{
                false;
            }
            
          
        })
    })
}

// function userLogin(){
//     var $loginBtn = $('<a/>', {
//         class: 'btnH log-in',
//         text: 'Log In',
//         href: '#',
//     })
//     $loginBtn.appendTo($('.header-right'))
// }

function userLogOut(){//login
    var $logOutBtn = $('<a/>', {
        class: 'btnH log-out',
        text: 'Log Out',
        href: '#',
    })
    $logOutBtn.appendTo($('.header-right'))
}

function myAcc(){//login
    var $logOutBtn = $('<a/>', {
        class: 'btnH account',
        text: 'My account',
        href: '#',
        id: 'account'
    })
    $logOutBtn.appendTo($('.header-right'))
}

function successRegistration(){
    var $succesWrap = $('<h3/>', {
        text: 'Success! Now you can login. For continue, please close the message',
        class: 'success',
    })
    $succesWrap.appendTo('#my-form');
}

function load(){
    $.get('http://localhost:3000/user', {}, function (users){
        users.forEach(function(user){
                
            if(+user.result===1){//авторизован
                buildUserCart();//не только меняет но и строит
                buildUserGoods();//не только меняет но и строит
                // buildGoods();
                // buildCart();
                roundCounter();
                buildCartRow();
                //кнопки собираем и удаляем ненужные
                userLogOut();
                myAcc();
                isLogin();
                $('.log-in').css('display','none');
                $('#signIn').css('display','none');
                $('.account').css('display','block');
            }else{
                logoutUserCart();
                logoutUserGoods();
                roundCounter();
                buildCartRow();
                // userLogin();
                // myAcc()
                isLogin();
                $('.log-out').css('display','none');
                $('#signIn').css('display','block');
                $('.account').css('display','none');
                $('.log-in').css('display','block');

            }
            console.log(+user.result===1)
        })
    })
}

function buildReviews(){
    $.ajax({
        url: 'http://localhost:3000/comments',
        type: 'GET',
        success: function(items) {
            $('#commentsList').empty();
            items.forEach(function(item){
                var $itemSlider = $('<div/>');
                $('.sbs-slider-left').append($itemSlider)

                var $item = $('<div/>', {
                    class: 'item',
                })
                $($itemSlider).append($item)

                var $wrap = $('<div/>', {
                    class: 'slider-left-wrap'
                })
                $($item).append($wrap)

                var $img = $('<div/>', {
                    class: 'face-img'
                })
                $wrap.append($img);

                var $sbsText = $('<div/>', {
                    class: 'subscribe-text'
                })
                $wrap.append($sbsText);

                var $p = $('<p/>', {
                    'data-id': item.id,
                    text:item.text,
                    class: item.approved == 1 ? 'approved' : ''
                });
                
                
                var $btnDelete = $('<button />',{
                    text: 'Delete',
                    class: 'delete'
                });
    
                var $btnApproved = $('<button />',{
                    text: 'Approve',
                    class: 'approve'
                })
    
                if(item.approved == 0){
                    $p.append($btnApproved);
                }
    
                $p.append($btnDelete);
                $sbsText.append($p);
            });
            // reviews.forEach(function(review){
            //     var $item = $('<div/>', {
            //         class: 'item'
            //     })
            //     $item.appendTo($('.reviews'))

            //     var $leftWrap = $('<div/>', {
            //         class: 'slider-left-wrap',
            //     })
            //     $leftWrap.appendTo($item);

            //     var $image=$('<div/>',{
            //         class: 'face-img'
            //     })
            //     $image.appendTo($leftWrap);

            //     var $text = $('<div/>', {
            //         class: 'subscribe-text'
            //     })
            //     $text.appendTo($leftWrap);

            //     var $textP = $('<p/>', {
            //         'data-id':review.id,
            //         text: review.text,
            //         class: review.approved == 1
            //     });
                
            //     var $btnRemove = $('<button />', {
            //         text: 'Remove',
            //         class: 'remove'
            //     });

            //     var $btnApprove = $('<button />', {
            //         text: 'Approve',
            //         class: 'approve'
            //     })

            //     if(review.approved == 0){
            //         $textP.append($btnApprove);
            //     }

            //     $textP.append($btnRemove);
            //     $text.append($textP);
                             
            // });
        }
    })
}



(function ($) {
    $(function () {
        buildGoods();
        buildCart();
        load();
        // userLogOut();
        // userLogin();
        // myAcc();
        buildReviews();
        


        
        $('.my-acc').magnificPopup();
        
        
        $('.header-right').on('click', '.log-in', function(event){
            $('.login-form').slideToggle('slow');
            return false;
            event.preventDefault();
        })

        $('.header-right').on('click', '#account', function(event){
            $('.delete-account').slideToggle('slow');
            return false;
            event.preventDefault();
        })

        $('.header-right').on('click', '.deleteBtn', function(event){
           
            $.get('http://localhost:3000/user', {}, function (deleted){//тут меняем статус корзины на 0
                
                deleted.forEach(function(delets){
                    if(delets.email === $('.user-hello').attr('email')&&delets.password === $('.user-hello').attr('password')&&delets.result == 1){
                       
                            $.ajax({
                                url: 'http://localhost:3000/user/' + delets.id,
                                type: 'DELETE',
                                
                                success: function () {
                                    logoutUserCart();
                                    logoutUserGoods();
                                    roundCounter();
                                    buildCartRow();
                                    // userLogin();
                                    myAcc()
                                    isLogin();
                                    $('.log-out').css('display','none');
                                    $('#signIn').css('display','block');
                                    $('.account').css('display','none');
                                    $('.log-in').css('display','block');
                                    $('.delete-account').css('display','none');   
                                    }
                            }) 
                        
                        
                        
                    }
                })
                
            })
           
            event.preventDefault();
        })

        $('.login-form').on('click', '.loginBtn', function(event){
            $.get('http://localhost:3000/user', {}, function (logins){
                
                logins.forEach(function(login){
                    var login = {
                        "name": login.name,
                        "password": login.password,
                        "email": login.email,
                        "phone": login.phone,
                        "result": 1,
                        "id": login.id
                    }
                    if($('.logMail').val() == login.email && $('.logPassword').val() == login.password){
                        
                        $.ajax({
                            url: 'http://localhost:3000/user/' + login.id,
                            type: 'PATCH',
                            data: login,
                            success: function () {
                                buildUserCart();
                                buildUserGoods();
                                roundCounter();
                                buildCartRow();
                                //кнопки собираем и удаляем ненужные
                                userLogOut();
                                isLogin();
                                
                                myAcc();
                                $('.log-in').css('display','none');
                                $('.login-form').css('display','none');
                                $('.logMail').val('');
                                $('.logPassword').val('');
                                $('.logMail').removeClass('error');
                                $('.logPassword').removeClass('error');
                                $('#signIn').css('display','none');
                                // $('.account').css('display','block');
                                
                            }
                        }) 
                        
                        
                    }else{
                        $('.logMail').addClass('error');
                        $('.logPassword').addClass('error');
                        $('.account').css('display','none');
                    }
                })
                // $('.account').css('display','block');
                // $('#signIn').css('display','none');
            })
            event.preventDefault();
        })

        $('.header-right').on('click', '.log-out', function(event){
            $.get('http://localhost:3000/user', {}, function (logouts){
                
                logouts.forEach(function(logout){
                    if(logout.email == logout.email && logout.password == logout.password){
                        var logout = {
                            "name": logout.name,
                            "password": logout.password,
                            "email": logout.email,
                            "phone": logout.phone,
                            "result": 0,
                            "id": logout.id
                        }
                        $.ajax({
                            url: 'http://localhost:3000/user/' + logout.id,
                            type: 'PATCH',
                            data: logout,
                            success: function () {
                                logoutUserCart();
                                logoutUserGoods();
                                roundCounter();
                                buildCartRow();
                                // userLogin();
                                myAcc()
                                isLogin();
                                $('.log-in').css('display','block');
                                $('.log-out').css('display','none');
                                $('#signIn').css('display','block');
                                $('.account').css('display','none');
                                $('.delete-account').css('display','none');
                                
                            }
                        }) 
                        
                    }
                })
                // userLogin();
                
            })
            event.preventDefault();
        })
        
        
        $('#my-form').on('click', '#send', function(event){
            
            Object.keys(regex).forEach(function(rule){
                var fields = $('[data-validation-rule="'+ rule +'"]');
                fields.each(function(field){
                    var field = $('[data-validation-rule="'+ rule +'"]').val();
        
                    if (regex[rule].test(field)){//true
                        $('[data-validation-rule="'+ rule +'"]').removeClass('error');
                        $('[data-validation-rule="'+ rule +'"]').addClass('valid');
                        
                    }else{//false
                        $('[data-validation-rule="'+ rule +'"]').addClass('error');
                        $('[data-validation-rule="'+ rule +'"]').effect('pulsate', {times: 3}, 1500);
                        
                    }
        
                });
             });

            if($("#my-form *").is(".error") === false){
                userData();
                $('.footer__button').css('display', 'none');
                $('#my-form').empty();  
                
                
                successRegistration();
                
                
                
                         
            }
            
            event.preventDefault();         
        
    });

    
    //список городов
    $.get('cities.json', {}, function(cities){
        var $select = $('<select/>', {
            id: 'cities'
        });
        cities.forEach(function(city){
            var $option = $('<option />', {
                class: city.country_id,
                value: city.name,
                text: city.name
            });
            $select.append($option);
        });
        $('#citiesField').append($select);
    }, 'json');

    $('#age').datepicker({
        firstDay: 1,
        dateFormat: 'dd.mm.yy', 
        // dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        // monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    });





        $('#shoppingcart').click(function () {
            $('.cart-mega-menu').slideToggle('slow');
            buildCart();
            return false;
            
        })

        $('#slider').slick({
            accessibility: true,
            arrows: true,
            prevArrow: '<div class="slick-prev:before n"><i class="fas fa-angle-left sliderarrow"></i></div>',
            nextArrow: '<div class="slick-prev:before n"><i class="fas fa-angle-right sliderarrow"></i></div>',
            centerMode: true,
            centerPadding: '10px',
            cssEase: 'ease',
            speed: '1000',
            lazyLoad: 'progressive',


        });

        // $('.sbs-slider-left').slick({
        //     accessibility: true,
        //     arrows: true,
        //     prevArrow: '<div class="slick-prev:before n"><i class="fas fa-angle-left sliderarrow"></i></div>',
        //     nextArrow: '<div class="slick-prev:before n"><i class="fas fa-angle-right sliderarrow"></i></div>',
        //     centerMode: true,
        //     centerPadding: '10px',
        //     cssEase: 'ease',
        //     speed: '1000',
        //     lazyLoad: 'progressive',

        // });

        //запрос на список товаров и добавление в корзину
        $('.box-product').on('click', '.add-to-cart', function (event) {

            var good = {
                id: $(this).attr('data-id'),
                name: $(this).attr('data-name'),
                price: $(this).attr('data-price'),
                quantity: $(this).attr('data-quantity'),
                src: $(this).attr('data-src'),
                result: $(this).attr('data-result')
            }

            //ищем товар в корзине
            var cartGoodId = $('.cart-product2[data-id="' + $(this).attr('data-id') + '"]');

            if (cartGoodId.length) {
                good.quantity = +cartGoodId.eq(0).attr('data-quantity') + 1;

                $.ajax({
                    url: 'http://localhost:3000/cart/' + good.id,
                    type: 'PATCH',
                    data: good,
                    success: function () {
                        buildCart();
                        buildGoods();
                        roundCounter();
                    }
                })
            } else {
                good.quantity = 1;
                $.ajax({
                    url: 'http://localhost:3000/cart',
                    type: 'POST',
                    data: good,
                    success: function () {
                        buildCart();
                        roundCounter();
                    }
                }, 'json')

            }

            event.preventDefault();
        });

        $('.cart-mega-menu').on('click', '.delete', function (event) {
            // $('.cart-mega-menu').empty();//clean cart

            var good = { //аттрибуты кнопки
                id: $(this).attr('data-id'),
                name: $(this).attr('data-name'),
                price: $(this).attr('data-price'),
                quantity: $(this).attr('data-quantity'),
                src: $(this).attr('data-src'),
                result: $(this).attr('data-result')
            }


            var cartGoodId = $('.delete[data-id="' + $(this).attr('data-id') + '"]');

            if (+$(this).attr('data-quantity') > 1) {
                good.quantity = +cartGoodId.eq(0).attr('data-quantity') - 1;

                $.ajax({
                    url: 'http://localhost:3000/cart/' + good.id,
                    type: 'PATCH',
                    data: good,
                    success: function () {
                        buildCart();
                        buildGoods();
                        roundCounter();
                        buildCartRow();
                    }
                })
            } else {

                $.ajax({
                    url: 'http://localhost:3000/cart/' + good.id,
                    type: 'DELETE',
                    success: function () {
                        buildCart();
                        $('.round-two').empty();
                        roundCounter();
                        $('.round-two').remove();
                        buildCartRow();
                    }
                })

            }

            event.preventDefault();
        });

        //delete for cartrow
        $('#cart-row-container').on('click', '.delete', function (event) {
            $('.cart-mega-menu').empty();//clean cart

            var good = { //аттрибуты кнопки
                id: $(this).attr('data-id'),
                name: $(this).attr('data-name'),
                price: $(this).attr('data-price'),
                quantity: $(this).attr('data-quantity'),
                src: $(this).attr('data-src'),
                result: $(this).attr('data-result')
            }


            var cartGoodId = $('.delete[data-id="' + $(this).attr('data-id') + '"]');

            if (+$(this).attr('data-quantity') > 1) {
                good.quantity = +cartGoodId.eq(0).attr('data-quantity') - 1;

                $.ajax({
                    url: 'http://localhost:3000/cart/' + good.id,
                    type: 'PATCH',
                    data: good,
                    success: function () {
                        buildCartRow();
                        buildCart();
                        roundCounter();

                    }
                })
            } else {

                $.ajax({
                    url: 'http://localhost:3000/cart/' + good.id,
                    type: 'DELETE',
                    success: function () {
                        buildCartRow();
                        buildCart();
                        $('.round-two').empty();
                        roundCounter();
                        $('.round-two').remove();
                        
                        

                    }
                })

            }

            event.preventDefault();
        });

        $('.cart-table-btn').on('click', '.cart-table-btn-left', function (event) {
            $.get('http://localhost:3000/cart', {}, function (rowGoods) {
                $('.cart-row').each(function (index, value) {
                    var rowGood = $(this).attr('data-id')
                    
                    // var rowGood = $('.cart-row[data-id="'+ $(this).attr('data-id') + '"]');
                    $.ajax({
                        url: 'http://localhost:3000/cart/' + +rowGood,
                        type: 'DELETE',
                        success: function () {
                            buildCart();
                            buildCartRow();
                            $('.round-two').empty();
                            roundCounter();
                            $('.round-two').remove();
                            buildCartRow();

                        }
                    })

                })


            });
        })
        roundCounter();

        $('#commentsList').on('click', '.approve', function(event){
            var itemId = $(this).parent().attr('data-id');
    
            $.ajax({
                url: 'http://localhost:3000/comments/'+itemId,
                type: 'PATCH',
                data: {approved: 1},
                success: function(){
                    buildReviews();
                }
            })
            
            event.preventDefault();
          })
    
          $('#commentsList').on('click', '.delete', function(event){
            var itemId = $(this).parent().attr('data-id');
    
            $.ajax({
                url: 'http://localhost:3000/comments/'+itemId,
                type: 'DELETE',
                success: function(){
                    buildReviews();
                }
            })
            
            event.preventDefault();
          })
    
          $('#send-review').on('click', function(event){
            
            $.ajax({
                url: 'http://localhost:3000/comments',
                type: 'POST',
                data: {
                    text: $('#message').val(),
                    approved: 0
                },
                success: function(){
                    buildReviews();
                }
            })
    
            event.preventDefault();
          }); 

    //     $('#send-review').on('click', function(event){
            
    //         $.ajax({
    //             url: 'http://localhost:3000/reviews',
    //             type: 'POST',
    //             data: {
    //                 text:$('#message').val(),
    //                 approved: 0
    //             },
    //             success: function(){
    //                 buildReviews();
                    
    //             }
    //         })
    //         event.preventDefault();
    //     })
    // });

    // $('.subscribe-text > p').on('click', '.remove', function(event){
    //     var reviewId = $(this).parent().attr('data-id');
    //     console.log(reviewId)
    //     $.ajax({
    //         url: 'http://localhost:3000/reviews/' + reviewId,
    //         type: 'DELETE',
    //         success: function(){
    //             buildReviews();
    //         }
    //     })
    //     event.preventDefault();
    // })

    // $('.subscribe-text > p').on('click', '.approve', function(event){
    //     var reviewId = $(this).parent().attr('data-id');
    //     $.ajax({
    //         url: 'http://localhost:3000/reviews/' + reviewId,
    //         type: 'PATCH',
    //         data: {approved: 1},
    //         success: function(){
    //             buildReviews();
    //         }
    //     })
    //     event.preventDefault();
    // })
});
})(jQuery)