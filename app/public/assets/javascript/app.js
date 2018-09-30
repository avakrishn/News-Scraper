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

$('#starred').on('click', function(){
    event.preventDefault();
    $(this).parent().attr({
        method: "GET",
        action: '/starred'
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
            action: action,
        });
        $(this).parent().submit();

    });

    $('.notes').on('click', function(){
        $('.noteContent').empty();
        $.ajax({
            method: "GET",
            url: "/note/" + $(this).attr("id")
        }).then(function(element){
            var title = $('.modal-title').html("Notes for Article: <br>" + element.title);
            if(typeof element.notes != 'undefined' && element.notes.length > 0){
                element.notes.forEach(function(note){ 
                    var noteDiv = $('<div>').addClass("card m-3 p-3 d-flex flex-row justify-content-between");
                    var eachNote = $('<p>').text(note);
                    if(window.location.href.indexOf("starred") != -1){
                        var deleteButton = $('<button>').attr({
                            class: "deleteNote btn btn-danger",
                            id: element._id,
                            "data-note": note 
                        }).text('X');
                        noteDiv.append(eachNote, deleteButton);
                    }
                    else{
                        noteDiv.append(eachNote);
                    }
                    $('.noteContent').append(noteDiv);
                });  
            } else{ 
                var noteDiv = $('<div>').addClass("card m-3 p-3 text-center");
                var eachNote = $('<p>').text('No notes for this article yet.');
                noteDiv.append(eachNote);
                $('.noteContent').append(noteDiv);
            }
            $('.saveNote').attr('id', element._id);
        });
    })

    $('.saveNote').on('click', function(){
        event.preventDefault();
        var newNote = $('.newNote').val().trim();
        if(newNote != ""){
            var id = $(this).attr("id")
            $.ajax({
                method: "POST",
                url: "/add/note/" + id,
                data: { notes: newNote },
                success: function(){
                    console.log(id);
                    // location.reload();
                    $.ajax({
                        method:"GET",
                        url:"/note/"+ id
                    }).then(function(thisArticle){
                        console.log()
                        var latestNote = thisArticle.notes[thisArticle.notes.length-1];
                        var noteDiv = $('<div>').addClass("card m-3 p-3 d-flex flex-row justify-content-between");
                        var eachNote = $('<p>').text(latestNote);
                        var deleteButton = $('<button>').attr({
                            class: "deleteNote btn btn-danger",
                            id: thisArticle._id,
                            "data-note": latestNote 
                        }).text('X');
                        noteDiv.append(eachNote, deleteButton);
                        $(".newNote").val("");
                        $('.noteContent').append(noteDiv);


                    })
                },
                error: function(){
                    console.log('failure');
                }
            });
        }
    });

    

});

$(document).on('click', '.deleteNote', function(){
    event.preventDefault();
    
    console.log($(this).attr("id"));
    var newNote = $(this).attr("data-note");
    $.ajax({
        method: "POST",
        url: "/delete/note/" + $(this).attr("id"),
        data: { notes: newNote },
        success: function(){
            console.log('success');
            
        },
        error: function(){
            console.log('failure');
        }
    });
    $(this).parent().remove();
})

