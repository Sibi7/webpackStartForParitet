$(function () {
    $('.main__form--content').each(function (i) {
        if(i !=0) {
            $(this).hide(0);
        }
    });
    $(document).on('click', '.main__form--buttons a', function (e) {
        e.preventDefault();
        var tabId = $(this).attr('href');
        $('.main__form--buttons a').removeClass('active');
        $(this).addClass('active');
        $('.main__form--content').hide(0);
        $(tabId).fadeIn();
    });
});