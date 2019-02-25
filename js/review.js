function buildReviewList(){
    
    $.ajax({
        url: 'http://localhost:3000/reviews',
        type: 'GET',
        succes: function(reviews){
            $('#reviews').empty();
            reviews.forEach(function(review){
                var $li = $('<li/>', {
                    text: review.text,
                    class: review.approved == 1 ? 'approved' : ''
                });
                $li.append($('<button />', {
                    text: 'Remove',
                    class: 'remove'
                }));
                if(review.approved==0){
                    $li.append($('<button />', {
                        text: 'Approve',
                        class: 'approve'
                    }));
                }
                $('#reviews').append($li);
            });
        }

    })
}


(function($) {
    $(function(){
   buildReviewList();
    $('#send').on('click', function(event){
        $.ajax({
            url: 'http://localhost:3000/reviews',
            type: 'POST',
            data: {
                text: $('#message').val(),
                approved: 0
            },
            success: function(){
                buildReviewList();
            }
        })

        event.preventDefault();
    });   
           
});
})(jQuery);