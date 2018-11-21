$(function () {

    function subtractionTotalNumber(obj, callback) {

        return $.ajax({
            url: '/FractionCalculator/FractionMinusListOfFraction',
            type: 'get',
            data: {
                value1: obj.total.replace(/\u00a0/g, '').trim(),
                listOfFraction: obj.arrOfInputsValWithoutThis.join(';')
            },
            dataType: 'json',
            success: function (html) {
                callback(html)
            },
            error: function (err) {
                if (err.status === 401) {
                    location.href='/User/SignIn';
                }
                else {
                    alert('Ошибка! Ответ сервера: ' + err.status);
                }
            }
        })
    }

    $(document).on('click', '.balance-total', function () {

        var parent = $(this).closest('.separation-votes'),
            inputs = parent.find('.votes-cast'),
            total = parent.find('.voting-votes-all input').val(),
            arrOfInputsValWithoutThis = [],
            _this = $(this);
            thisInput = $(this).closest('.voting-actions__choice-wrap').find('.votes-cast').val();
        // Заполняем массив arrOfInputsValWithoutThis значениями инпутов
        inputs.each(function () {
            // Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка
            if ($(this).val().trim() === '') {
                $(this).val(0)
            }
            arrOfInputsValWithoutThis.push($(this).val()); // Значение каждого инпута заносим в массив
        });
        arrOfInputsValWithoutThis.splice(arrOfInputsValWithoutThis.indexOf(thisInput), 1); // удаляем из массива значение инпута, по кнопке которого кликнули

        subtractionTotalNumber({
            parent: parent,
            total: total,
            arrOfInputsValWithoutThis: arrOfInputsValWithoutThis
        }, function (data) {
            _this.closest('.voting-actions__choice-wrap').find('.votes-cast').val(data.result);
        })
    })

});