$('.section').on('click', function(){
    event.preventDefault();
    if($(this).attr('id') == 'all'){
        $(this).parent().attr({
            method: "GET",
            action: '/'
        });
        $(this).parent().submit();

    }else{
        var action = '/scrape/' + $(this).attr('id');
        $(this).parent().attr({
            method: "POST",
            action: action
        });
        $(this).parent().submit();
    }
});

$('#all').on('click', function(){
    event.preventDefault();
    $(this).parent().attr({
        method: "GET",
        action: '/'
    });
    $(this).parent().submit();
});

$('#saved').on('click', function(){
    event.preventDefault();
    $(this).parent().attr({
        method: "GET",
        action: '/saved'
    });
    $(this).parent().submit();
});

$(document).ready(function(){
    $('.star').on('click', function(){
        if($(this).hasClass('far')){
            $(this).removeClass('far');
            $(this).addClass('fas selected');
            var action = "/add/star/" + $(this).attr("id");
        }
        else{
            $(this).removeClass('fas selected');
            $(this).addClass('far');
            var action = "/delete/star/" + $(this).attr("id");
        }
        $(this).parent().attr({
            method: "POST",
            action: action
        });
        $(this).parent().submit();

    })

});