// проверяем если в реестре счета для данного пользователя
function FindAccountsForUser() {
    $("#validate-form").valid();
    name = $(".user_name").val();
    docnum = $(".user_doc").val();
    $.post("/admin/user/FindsAccountsForUser", {Name: name, DocNum: docnum}, function (data) {
        $(".user_name").removeClass("validate-input__true");
        $(".user_doc").removeClass("validate-input__true");
        $(".user_name").removeClass("validate-input__false");
        $(".user_doc").removeClass("validate-input__false");

        if (data) {
            $(".user_name").addClass("validate-input__true");
            $(".user_doc").addClass("validate-input__true");
        }
        else {
            $(".user_name").addClass("validate-input__false");
            $(".user_doc").addClass("validate-input__false");
        }
    });
    FindsProbableRepresentativesForUser(name, docnum);
    IsUserRepresentative(name, docnum);
}

function ChangePassword() {
    if ($("[name=TwoFactorEnabled]").val() == "True" && $("#SmsToken").val() == false) {
        $.post("/profile/SendSmsForChangePassword")
        $(".string").has("#SmsToken").slideDown("slow");
        return;
    }

    var model = {
        OldPassword: $("#OldPassword").val(),
        NewPassword: $("#NewPassword").val(),
        NewPasswordRepeat: $("#NewPasswordRepeat").val(),
        SmsToken: $("#SmsToken").val()
    };

    $.ajax({
        method: "POST",
        url: "/profile/ChangePassword",
        data: JSON.stringify(model),
        contentType: "application/json",
        success: function () {
            $(".modal-change-password-success").closest('.overlay').show();
        },
        error: function () {
            $(".modal-change-password-fail").closest('.overlay').show();
        }
    });
}

// Ищем возможных представителей для пользователя
function FindsProbableRepresentativesForUser(Name, DocNum) {
    $.post("/admin/user/FindsProbableRepresentativesForUser", {Name: Name, DocNum: DocNum},
        function (data) {
            $(".filter_wrapper").html(data);
        }).done(function () {
        $('.filter__body').mCustomScrollbar({theme: "my-theme"});
    });
}

function IsUserRepresentative(Name, DocNum) {
    $.post("/admin/user/IsUserRepresentative", {Name: Name, DocNum: DocNum},
        function (IsRepresent) {
            if (IsRepresent) {
                $('.admin-represent').text("Показать");
            }
            else {
                $('.admin-represent').text("Нет");
            }
        });
}


// Выбранные представители
function GetChoosenRepresentatives() {
    var result = [];

    $(".filter_wrapper input:checked[data-is-registry=False]")
        .each(function () {
            result.push($(this).data("account-id"));
        });

    return result;
}

//Добавленные прдеставители по физикам
function GetRegistryPersonRepresentatives() {
    var result = [];

    $(".filter_wrapper input:checked[data-is-registry=True][data-is-legal=False]")
        .each(function () {
            result.push({
                "pname": $(this).data("pname"), "docnum": $(this).data("docnum")
            });
        });

    return result;
}

//Добавленные прдеставители по юрикам
function GetRegistryLegalRepresentatives() {
    var result = [];

    $(".filter_wrapper input:checked[data-is-registry=True][data-is-legal=True]")
        .each(function () {
            result.push({
                "lname": $(this).data("lname"), "INN": $(this).data("inn")
            })
        });

    return result;
}

// добавляем в массив новых представителей
function AddRegistryRepresentative() {
    var lname = $(".entity-name").val();
    var INN = $(".entity-doc").val();
    var pname = $(".individual-name").val();
    var docnum = $(".individual-doc").val();
    var rowtext;
    var htmlData;
    var isLegal = $("label.modal__tab[data-id='entity'] input").prop("checked");
    var isPerson = $("label.modal__tab[data-id='individual'] input").prop("checked");
    if (isLegal) {
        if (lname === "" && INN === "") {
            return;
        }
        rowtext = lname + ", " + INN;
        htmlData = "data-is-legal=True data-lname=" + lname + " data-inn=" + INN;
    }
    if (isPerson) {
        if (pname === "" && docnum === "") {
            return;
        }
        rowtext = pname + ", " + docnum;
        htmlData = "data-is-legal=False data-pname=" + pname + " data-docnum=" + docnum;
    }

    // Если добавляем новго
    console.log($("#edit-represntative-number").val());
    if ($("#edit-represntative-number").val().length == 0) {
        // Добавляем нового представителя в список выбора
        $(".filter__body table tr:last").after("\
        <tr>\
        <td>\<div class='input-check-wrap'>\
        <input type='checkbox' \
        data-is-registry=True " + htmlData + " \
        'checked'>\
        <label></label>\
        <span class='filter__row-text'>" + rowtext + "</span></div>\
        <div class='filter__edit-btn'>\
        <button class='ast-action-btn edit-representative'><img src='/images/icons/edit2.png' alt=''></button>\
        <button class='ast-action-btn delete-representative'><img src='/images/icons/cross.png' alt=''></button>\
        </div>\
        </td>\
        </tr>");
    }


    // Иначе редактируем существующего
    else {
        console.log($("tr"));
        console.log($("tr")[$("#edit-represntative-number").val()]);
        var rowToEdit = $("tr")[$("#edit-represntative-number").val()];
        var inputToEdit = $(rowToEdit).find("input");
        var spanToEdit = $(rowToEdit).find("span");
        if (isLegal) {
            inputToEdit.data("lname", lname);
            inputToEdit.data("INN", INN);
        }
        if (isPerson) {
            inputToEdit.data("pname", pname);
            inputToEdit.data("docnum", docnum);
        }

        spanToEdit.text(rowtext);
    }

    $("#edit-represntative-number").val('');
    $('.represent-modal-filter').hide();
}

// Обновляем список представителей
function UpdateRepresentatives() {
    var model = {
        UserId: $("#UserId").val(),
        Representatives: GetChoosenRepresentatives(),
        RegistryLegalRepresentatives: GetRegistryLegalRepresentatives(),
        RegistryPersonRepresentatives: GetRegistryPersonRepresentatives()
    }

    $.ajax({
        url: "/admin/user/UpdateRepresentatives",
        type: "POST",
        data: JSON.stringify(model),
        contentType: "application/json",
        error: function (err) {
            if (err.status === 401) {
                location.href='/User/SignIn';
            }
            else {
                alert('Ошибка! Ответ сервера: ' + err.status);
            }
        }
    });
    $(".filter.represent-filter").hide();
}

// вызываем функцию добавления пользователя
function AddUser() {
    if ($("#validate-form").valid()) {
        var model = {
            UserName: $("#UserName").val(),
            NewPassword: $("#NewPassword").val(),
            Email: $("#Email").val(),
            Role: $("#Role").val(),
            FullName: $("#FullName").val(),
            DocumentNumber: $("#DocumentNumber").val(),
            PhoneNumber: $("#PhoneNumber").val(),
            TwoFactorEnabled: $("#identification-new").prop("checked"),
            Representatives: GetChoosenRepresentatives(),
            RegistryLegalRepresentatives: GetRegistryLegalRepresentatives(),
            RegistryPersonRepresentatives: GetRegistryPersonRepresentatives()
        };

        $.ajax({
            url: "AddUser",
            type: "POST",
            data: JSON.stringify(model),
            success: function (linkToNewUser) {
                window.location.replace(linkToNewUser)
            },
            error: ShowModalResultFail,
            contentType: "application/json"
        });
    }
}

function ShowModalResultSuccess() {
    $('.modal-add-user-result-succes').closest('.overlay').show();
};

function ShowModalResultFail() {
    $('.modal-add-user-result-fail').closest('.overlay').show();
};

function ShowModalAddUserCancel() {
    $('.modal-add-user-cancel').closest('.overlay').show();
};

function SelectIssuer() {
    $('#selectedIssuerId').attr('value', $('.filter__body .activeTr').data('issuerid'));
}

function SelectAccount() {
    $('#selectedAccountId').attr('value', $('.filter__body .activeTr').data('accountid'));
}

function resestPassword() {
    var model = {
        NewPassword: $('input[name="NewPassword"]').val(),
        NewPasswordRepeat: $('input[name="NewPassword"]').val(),
        UserId: $('input[name="UserId"]').val()
    };
    $.ajax({
        url: "ResetPassword",
        type: "POST",
        data: JSON.stringify(model),
        success: function () {
            $('.modal-success').closest('.overlay').show()
        },
        error: function () {
            $('.modal-fail').closest('.overlay').show()
        },
        contentType: "application/json"
    });
}

function generateLogin(fullName) {
    // fullName = transliterate(fullName);
    var structName = fullName.trim().split(" ");
    var login;
    if (structName.length > 1) {
        login = structName[0][0] + structName[1][0] + structName[2][0];
    }
    else {
        login = structName[0];
    }
    var number = "";
    var notValid = true;
    while (notValid) {
        login = login + number;
        // number = number + 1;
        $.ajax({
            url: "CheckUserName",
            method: "GET",
            data: "username=" + login,
            success: function (response) {
                if (response) {
                    notValid = false;
                }
            },
            async: false,
        });
    }
    return login;
}

$(function () {
    //табы для переключения между юр. лицом и физ. лицом во всплывающем окне
    $('.filter__block').each(function (i) {
        if (i !== 0) {
            $(this).hide(0);
        }
    });

    $("#ResetPasswordForm").each(function () {
        $(this).data("validator").settings.submitHandler = resestPassword;
    });

    // генерация пароля при создании пользователя
    $("#user-cabinet-new #NewPassword").each(function () {
        $(this).val(Math.random().toString(36).substr(2, 8));
    });

    $(document).on('click', '.modal__tab', function () {
        var tabId = $(this).attr('data-id');
        $(this).siblings('.modal__tab').removeClass('modal__tab--active');
        $(this).addClass('modal__tab--active');
        $('.filter__block').hide(0);
        $('.filter__block[data-id=' + tabId + ']').show();
    });

    //показать или скрыть полей "номер документа" и "представители" при выборе роли владельца
    $(document).on('click', '.admin-user-role', function () {
        if ($(this).val() === 'SHAREHOLDER' || $(this).val() === 'ISSUER') {
            $('.owner-row').slideDown("slow");
        } else {
            $('.owner-row').slideUp("slow");
        }
    });

    //клик по кнопке "Добавить" во всплывающем окне представителей
    $(document).on('click', '.filter .add', function () {
        var insideModal = $(this).closest('.filter').find('.filter');
        insideModal.closest('.overlay').show()
    });

    //клик на поле ввода представителей - открывает окно представителей
    $(document).on('click', '.admin-represent', function () {
        $(this).siblings('.filter').closest('.overlay').show()
    });

    //клик на кнопку "Выбрать" в окне представителей
    $(document).on('click', '.represent-filter .submit', function () {

        var users = [];
        var IsAnyRep = $(".filter_wrapper input").length > 0;
        $(".filter_wrapper input:checked").each(function () {
            if ($(this).data("lname")) {
                users.push($(this).data("lname"));
            }
            ;
            if ($(this).data("pname")) {
                users.push($(this).data("pname"))
            }
            ;
        });

        if (users.length > 0) {
            $('.admin-represent').text(users.join(", "));
        }
        else {
            if (IsAnyRep) {
                $('.admin-represent').text('Показать');
            }
            else {
                $('.admin-represent').text('Нет');
            }
        }
        // Отправляем ajax запрос
        UpdateRepresentatives();
    });

    // закрываем окошко с представителями
    $(document).on('click', '.represent-modal-filter button.cancel', function () {
        $("#edit-representative-number").val('');
        $('.represent-modal-filter').hide();
    });


    $(document).on('click', '.represent-filter label, .filter__row-text', function () {
        var checkbox = $(this).closest('tr').find('input[type="checkbox"]');
        checkbox.is(':checked') ? checkbox.prop('checked', false) : checkbox.prop('checked', true);
    });


    $(document).on('click', '#user-cabinet-new .search > span', function () {
        $('#user-cabinet-new .t-search').val('');
        $('#user-cabinet-new .filter').hide();
        $(this).remove();
    });

    // модалка при удалении группы
    $(document).on('click', '.groups-list .group-delete', function () {
        $('#groupToDelete').attr('value', $(this).data('group-id'));
        $('.modal-delete').closest('.overlay').show();
    });

    // модалка при удалении пользователя
    $(document).on('click', '.users-list .user-delete', function () {
        $('#userToDelete').attr("value", $(this).data('userid'));
        $('.modal-delete-user').closest('.overlay').show();
    });

    // клик в меню удалить группу
    $(document).on('click', 'a:contains("Удалить")', function (event) {
        event.preventDefault();
        // немного костыльно, получаем идишинк из ссылки
        var url = $(this).attr("href");
        var id = url.substring(url.lastIndexOf('/') + 1);
        $('#groupToDelete').attr('value', id);
        $('.modal-delete').closest('.overlay').show();
    });

    $(document).on('click', '.groups-by-user .filter .submit', function () {
        if ($('.activeTr').length > 0) {
            $('input[name="selectedGroup"]').val($('.activeTr').text());
        }
    });

    // генерация логина
    $(document).on('blur', '.user-cabinet-new input[name=FullName]', function () {
        if (!$('#UserName').val()) {
            $('#UserName').val(generateLogin($('input[name="FullName"]').val()));
        }
    });

    $(document).on('click', '.delete-representative', function () {
        $("tr").has(this).remove();
    });

    $(document).on('click', '.edit-representative', function () {
        var input = $(this).closest("tr").children("td").children("input");
        $("#edit-represntative-number").val($("tr").index($(this).closest("tr")));
        console.log($("tr").index($(this).closest("tr")));
        console.log(this);

        console.log(input);
        console.log(input.data("is-legal") === "True");
        console.log($("input.entity-name"));
        if (input.data("is-legal") === "True") {
            $("input.entity-name").val(input.data("lname"));
            $("input.entity-doc").val(input.data("inn"));
        }
        ;

        if (input.data("is-legal") === "False") {
            $("input.individual-doc").val(input.data("docnum"));
            $("input.individual-name").val(input.data("pname"));
        }
        ;

        $(".filter.represent-modal-filter").show();
    });

    $(document).on("change", "#select-personal-manager-for-issuer", function () {
        var manager = $("#select-personal-manager-for-issuer").val();
        var emitent = $("#emitent-id").val();
        var model = {manager: manager, issuerId: emitent}
        $.ajax({
            url: "/admin/issuer/AssignManagerToIssuer",
            type: "POST",
            data: model,
        });
    });
});
