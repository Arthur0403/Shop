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
                'data-src': good.src
            })

           

            $cart.appendTo($toCart);

            $toCart.appendTo($boxCenter)

            $boxCenter.appendTo($product);

           

        }, 'json');

    }, 'json');
};

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
         
         //создаем сами товары корзины
         items.forEach(function (item) {

            total += +item.price * +item.quantity;
            // sum += +item.quantity;
            var $cartProduct = $('<div/>', {
                class: 'cart-product2',
                'data-id': item.id,
                'data-quantity': item.quantity,
                'data-price': item.price,
                'data-name': item.name,
                'data-src': item.src
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
            text: '$'+' '+ total
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

function buildCartRow(){
    $.get('http://localhost:3000/cart', {}, function (rows) {
        $('.cart-row').empty();
    rows.forEach(function(row){
        $cartRow = $('<div/>', {
            class: 'cart-row',//возможно добавить дата атрибуты
            'data-name': row.name,
            'data-id': row.id,
            'data-quantity': row.quantity,
            'data-price': row.price,
            'data-src' : row.src
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

        $spanPar1 = $('<span/>',{
            text: 'Color:'+' '
        })
        $spanPar1.appendTo($cell1Text);

        $spanCh1 = $('<span/>', {
            text: 'Red'
        })
        $spanCh1.appendTo($spanPar1);

        $br = $('<br/>');
        $br.appendTo($spanPar1);

        $spanPar2 = $('<span/>',{
            text: 'Size:'+' '
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
            text: '$'+ ' ' + row.price
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
            text: row.price * row.quantity
        })
        $spanC5.appendTo($cell5);

        //cell6
        $cell6 = $('<div/>', {
            class: 'cart-cell cell6'
        })
        $cell6.appendTo($cartRow);

        var $crossLink = $('<a/>', {
                
            class: 'deleteRow',
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

function roundCounter(){
    $.get('http://localhost:3000/cart', {}, function (sums) {
     //round with quantity
     
        
        
        var sum = 0;
        sums.forEach(function(summ){
            sum += +summ.quantity;
            console.log(sum);
            
            var $quantity = $('<div/>', {
                class: 'round-two',
                text: sum
            });
            $quantity.appendTo('.header-right');
        })

    })
}

(function ($) {
    $(function () {
        buildGoods();
        buildCart();
        roundCounter();
        buildCartRow();

        $('#shoppingcart').click(function () {
            $('.cart-mega-menu').slideToggle('slow');
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

        });

         //запрос на список товаров и добавление в корзину
        $('.box-product').on('click', '.add-to-cart', function (event) {
                        
            var good = {
                id: $(this).attr('data-id'),
                name: $(this).attr('data-name'),
                price: $(this).attr('data-price'),
                quantity: $(this).attr('data-quantity'),
                src: $(this).attr('data-src')
            }

            //ищем товар в корзине
            var cartGoodId = $('.cart-product2[data-id="'+ $(this).attr('data-id') + '"]');
            
            if(cartGoodId.length){
                good.quantity = +cartGoodId.eq(0).attr('data-quantity') + 1;
    
                $.ajax({
                    url: 'http://localhost:3000/cart/' + good.id,
                    type: 'PATCH',
                    data: good,
                    success: function() {
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
                src: $(this).attr('data-src')
            }


            var cartGoodId = $('.delete[data-id="'+ $(this).attr('data-id') + '"]');
            
            if(+$(this).attr('data-quantity') > 1){
                good.quantity = +cartGoodId.eq(0).attr('data-quantity') - 1;
    
                $.ajax({
                    url: 'http://localhost:3000/cart/' + good.id,
                    type: 'PATCH',
                    data: good,
                    success: function() {
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
        $('.cart-row').on('click', '.deleteRow', function (event) {
            // $('.cart-mega-menu').empty();//clean cart
            
            var cartgood = { //аттрибуты кнопки
                id: $(this).attr('data-id'),
                name: $(this).attr('data-name'),
                price: $(this).attr('data-price'),
                quantity: $(this).attr('data-quantity'),
                src: $(this).attr('data-src')
            }


            var cartGoodId = $('.cart-row[data-id="'+ $(this).attr('data-id') + '"]');
            
            if(+$(this).attr('data-quantity') > 1){
               cartgood.quantity = +cartGoodId.eq(0).attr('data-quantity') - 1;
    
                $.ajax({
                    url: 'http://localhost:3000/cart/' + cartgood.id,
                    type: 'PATCH',
                    data: cartgood,
                    success: function() {
                      buildCartRow();
                      buildCart();
                      roundCounter();
                      
                    }
                  })
             } else {
                
                $.ajax({
                    url: 'http://localhost:3000/cart/' + cartgood.id,
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


        roundCounter();
    });

})(jQuery)