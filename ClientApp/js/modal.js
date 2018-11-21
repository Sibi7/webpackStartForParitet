$(function () {

    var modal = $('.modal-delete');

    $(document).on('click', '.modal__header>.t-delete', function () {
        modal.hide()
    });
    $(document).on('click', '.modal__footer>.cancel', function () {
        modal.hide();
        return false;
    });
    $(document).on('click', '.modal__footer>.delete-btn', function () {
        modal.hide();
    });

    $(document).on('click', '.questionModal .submit', function () {
        $(this).closest('.overlay').hide();
    });
    $(document).on('click', '.modal-registration .close', function () {
        $(this).closest('.overlay').hide();
    });

    $(document).mouseup(function (e) {
        var overlayModal = $(".overlay");
        if (overlayModal.has(e.target).length === 0){
            overlayModal.fadeOut();
        }
    });




});
