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

    });

    $('.saveNote').on('click', function(){
        event.preventDefault();
        var newNote = $('.newNote').val().trim();
        if(newNote != ""){
            $.ajax({
                method: "POST",
                url: "/add/note/" + $(this).attr("id"),
                data: { notes: newNote },
                success: function(){
                    console.log('success');
                    location.reload();
                },
                error: function(){
                    console.log('failure');
                }
            });
        }
    });

    $('.deleteNote').on('click', function(){
        event.preventDefault();
        console.log($(this).attr("id"));
        var newNote = $(this).attr("data-note");
        $.ajax({
            method: "POST",
            url: "/delete/note/" + $(this).attr("id"),
            data: { notes: newNote },
            success: function(){
                console.log('success');
                // location.reload();
            },
            error: function(){
                console.log('failure');
            }
        });
});

});