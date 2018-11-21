$(function () {

    // var meetingBlockText = $('.meeting-text-wrap');
    // if (meetingBlockText.length > 0) {
    //     meetingBlockText.each(function () {
    //         var hiddenText = $(this).find('.fullsize-text').val();
    //         if (hiddenText.length > 51) {
    //             // $(this).append('<button type="button" class="need-hide-btn">больше...</button>');
    //         }
    //     });
    // }

    $(document).on('click', '.need-hide-btn', function () {
        var smallText = $(this).siblings('.small-size-text').html(),
            hiddenText = $(this).siblings('.fullsize-text').html();
        $(this).prev().toggleClass('resize-text');

        if ($(this).prev().hasClass('resize-text')) {
            $(this).text('меньше...');
            $(this).siblings('.need-hide').html(hiddenText);
        } else {
            $(this).text('больше...');
            $(this).siblings('.need-hide').html(smallText)
        }
    })
    $(document).on('click', '.show-full-text-btn', function () {
        var smallText = $(this).siblings('.small-size-text').html(),
            hiddenText = $(this).siblings('.fullsize-text').html(),
            showText = $(this).siblings('.meeting-answer.need-hide');
        if ($(this).hasClass('visible-full-text')) {
            showText.html(smallText);
            $(this).text('Больше...');
            $(this).removeClass('visible-full-text');
        }
        else {
            showText.html(hiddenText);
            $(this).text('Меньше...');
            $(this).addClass('visible-full-text');
        }
        return false
    });

});