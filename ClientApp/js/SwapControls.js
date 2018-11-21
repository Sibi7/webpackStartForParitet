function submitNearestForm() {
  var ajaxForm = $(".ajax-form");

    if (ajaxForm) {
      var url = ajaxForm.attr("action");
      var info_controls = $('#load-wrapper').find('.swap-control-info');

      $('#loader').attr('style', 'display: block');
      $('#load-wrapper').attr('style', 'opacity: 0.5; z-index: 998;');

      info_controls.attr('style', 'cursor: none; z-index: 995;');

        $.ajax({
            type: "POST",
            url: url,
            data: ajaxForm.serialize(), // serializes the form's elements.
            success: function (data) {
                info_controls.attr('style', "cursor: pointer; z-index: 998;");

                $('#loader').attr('style', 'display: none');
                $('#load-wrapper').attr('style', 'opacity: 1; z-index: 995;');
                ajaxForm[0].outerHTML = data;
            },
            error: function (err) {
                if (err.status === 401) {
                    location.href='/User/SignIn';
                }
                else {
                    alert('Ошибка! Ответ сервера: ' + err.status);
                }
            }
        });
    }
}

function returnControlInEditMode(clickedElement, inEditMode) {
    var issuerId = $("#EntityID").val();
    var pageId = $("#PageID").val();
    var control = $(clickedElement);
    var propertyName = control.children("#PropertyName").val();

    $.ajax({
        type: "GET",
        url: "/Helper/GetSwapEditor/" + issuerId + "?pageID=" + pageId + "&propertyName=" + propertyName + "&inEditMode=" + inEditMode,
        success: function (data) {
            control[0].outerHTML = data;
        },
        error: function (data) {
            alert("error");
        }
    });
}

$(document).on("change", ".swap-control-edit input", function () {
    submitNearestForm();
});
$(document).on("change", ".swap-control-edit select", function () {
  submitNearestForm();
});
$(document).on("click", ".swap-control-info", function (e) {
    e.preventDefault();
    returnControlInEditMode(e.target, true);
});
$(document).on("click", ".ajax-form", function (e) {
    if (!$(e.target).parent().hasClass("swap-control-edit")) {
        $(".swap-control-edit").each(function () {
            returnControlInEditMode(this, false);
        });
    }
});