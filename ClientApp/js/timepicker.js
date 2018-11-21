$(function () {

    var array = [];
    var timeList = $('<ul class="timeList"></ul>');
    for (var i=0; i<24; i++) {
        var listItem = $('<li class="timeList__item"></li>');
        if (i < 10) {
            i = '0'+ i;
        }
        listItem.text(i + ':00');
        array.push(listItem[0]);
    }

    $(document).on('click', 'input[type="time"]', function () {
        timeList.empty();
        timeList.append(array);

        $(this).after(timeList);
    });

    $(document).on('click', '.timeList__item', function () {
        var itemVal = $(this).text();
        var timeList = $(this).parent();
        var input = timeList.siblings('input[type="time"]');
        input.attr('value', itemVal);
        input.val(itemVal);
        $('.timeList').remove();
    });

    $(document).click(function(e) {
        if ($(e.target).closest('.timeList').length === 0 && $(e.target).siblings('.timeList').length === 0) {
            $('.timeList').remove();
        }
    });
});