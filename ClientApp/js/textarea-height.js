$(function () {

    var p = $('.contenteditable');
    var input = p.siblings('.contenteditable-input');
    for (var i=0; i< input.length; i++) {
        var that = input[i];
        $(that).siblings('.contenteditable').html($(that)[0].value);
    }
    $(document).on('keyup', '.contenteditable', function () {
        $(this).siblings('.contenteditable-input')[0].value = $(this).html();
    })

});