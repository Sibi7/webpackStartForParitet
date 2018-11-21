$(function () {
    $(document).on('click', '.sidebar__item--header > a', function () {
        if ($(this).parent().hasClass('sidebar__item--active')) {
            // return false;
        } else {
            $('.sidebar__item--header').removeClass('sidebar__item--active');
            $(this).parent().addClass('sidebar__item--active');
        }
    })
});