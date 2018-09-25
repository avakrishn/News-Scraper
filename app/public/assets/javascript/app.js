$('.section').on('click', function(){
    event.preventDefault();
    var action = '/scrape/' + $(this).attr('id');
    $(this).parent().attr({
        method: "POST",
        action: action
    });
    $(this).parent().submit();
})
