var regex = {
    name : /^[а-яёА-ЯЁ\s]+$/,
    password : /^[a-zA-Z0-9_-]{6,18}$/,
    phone : /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
    comment : /[^\<\>\[\]%'`]+$/,
    email : /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

};

var errList = {
    name : "Ваше имя",
    password : "Ваш пароль",
    phone : "Ваш телефон",
    comment : "Дополнительная информация о Вас",
    email : "Ваш e-mail"
};

function createDialog(){
    var dialog = $('<div/>').addClass('dialog').attr('title', 'Заполните поля:').dialog();//создали див с диалогом
    
    Object.keys(errList).forEach(function(errMessage){
        
        if($('[data-validation-rule="'+ errMessage +'"]').hasClass('error')){
            var $ul = $('<ul/>');
            var $li = $('<li/>', {text: errList[errMessage]});
            $($ul).append($li);
            $(dialog).append($ul);
        }else{
        //    return false;
        return false;
        }
                
    })

    
    
}


(function($){
    $(function() {
        $('#my-form').on('click', '#send', function(event){

            Object.keys(regex).forEach(function(rule){
                var fields = $('[data-validation-rule="'+ rule +'"]');
                fields.each(function(field){
                    var field = $('[data-validation-rule="'+ rule +'"]').val();

                    if (regex[rule].test(field)){
                        $('[data-validation-rule="'+ rule +'"]').removeClass('error');
                        $('[data-validation-rule="'+ rule +'"]').addClass('valid');
                    }else{
                        $('[data-validation-rule="'+ rule +'"]').addClass('error');
                        $('[data-validation-rule="'+ rule +'"]').effect('pulsate', {times: 3}, 1500);
                    }

                    
                });

               
        });
        
        

        createDialog();
        event.preventDefault();
    });

    

    $.get('cities.json', {}, function(cities){
        var $select = $('<select/>');
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
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    });
});
})(jQuery);
