$('#removeButtonIssuer').click(function() {
  //вызов функции удаления Model.DateOfElectionExecutiveBody и @Model.ElectionExecutiveBodyReason
  submitAjaxForm("/Manager/Issuer/ExecElectionDataToNull");
  //перезагрузить этот контрол
  if (!$(this).parent().hasClass("swap-control-edit")) {
    $(".swap-control-edit").each(function () {
      var elem = $('#execBodyDate').first();
      returnControlInEditMode(elem, false);
    });
  }
});
$('#linkButtonIssuer').click(function () {
  ////вызов функции обновления Model.DateOfElectionExecutiveBody, @Model.ElectionExecutiveBodyReason, Model.TermOfOfficeExecutiveBody, Model.TermOfEndOfficeExecutiveBody
  //submitAjaxForm("/Manager/Issuer/ExecElectionFieldsUpdate");
  ////перезагрузить этот контрол
  //if (!$(this).parent().hasClass("swap-control-edit")) {
  //  $(".swap-control-edit").each(function () {
  //    var elem = $('#execBodyDate').first();
  //    returnControlInEditMode(elem, false);
  //  });
  //}
});
$("#execBodyName input[type='radio']").change(function () {
  var selection = $(this).val();
  alert("Radio button selection changed. Selected: " + selection);
  if (selection === "Копировать данные из системы ведения реестра") {
    var bodyNameZenith = $("#execBodyName p").text();
    // вызов функции, которая устанавливает ExecutiveBodyName в значение ExecutiveBodyNameZenith
    submitAjaxForm("/Manager/Issuer/ExecBodyNameToZenithValue");
    // перезагрузить этот контрол
    if (!$(this).parent().hasClass("swap-control-edit")) {
      $(".swap-control-edit").each(function () {
        var elem = $('#execBodyName').first();
        returnControlInEditMode(elem, false);
      });
    }
  }
});
$("#execBodyTerm input[type='radio']").change(function () {
  var selection = $(this).attr('id');
  alert("Radio button selection changed. Selected: " + selection);
  if (selection === "bodyTermZenit") {
    // вызов функции, которая устанавливает TermOfOfficeExecutiveBody & TermOfEndOfOfficeExecutiveBody в значения из Zenith
    submitAjaxForm("/Manager/Issuer/ExecTermToZenithValue");
    // перезагрузить этот контрол
    if (!$(this).parent().hasClass("swap-control-edit")) {
      $(".swap-control-edit").each(function () {
        var elem = $('#execBodyTerm').first();
        returnControlInEditMode(elem, false);
      });
    }
  }
});
$("#execBodyDate input[type='radio']").change(function () {
  var selection = $(this).val();
  alert("Radio button selection changed. Selected: " + selection);
  if (selection === "Копировать данные из системы ведения реестра") {
    // вызов функции, которая устанавливает DateOfElectionExecutiveBody & ElectionExecutiveBodyReason в значения из Zenith
    submitAjaxForm("/Manager/Issuer/ExecElectionDataToZenithValue");
    // перезагрузить эти контролы
    if (!$(this).parent().hasClass("swap-control-edit")) {
      $(".swap-control-edit").each(function () {
        var elem = $('#execBodyDate').first();
        returnControlInEditMode(elem, false);
      });
    }
  }
});
function submitAjaxForm(url) {
  var urlString = url;
  var ajaxForm = $('.ajax-form');

    $.ajax({
      type: "POST",
      url: urlString,
      data: { issuerId: $('#EntityID').val() }, // serializes the form's elements.
      success: function (data) {
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