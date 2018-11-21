$(function () {

    /**
     *
     * @param {Object} obj
     * @param {string} obj.selectorForFilter - Селектор по которому будет производится фильрация
     * @param {string} obj.inputSelector - Селектор инпута, в котором производится фильтрация
     * @param {string} obj.selectorForHide - Селектор в который обернуты элементы по которым производится фильтрация. Этот селектор будет скрываться, если не совпадает с введенным значением
     */
    function searchFilter(obj) {
        var items = document.querySelectorAll(obj.selectorForFilter),
            input = document.querySelector(obj.inputSelector);

        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (item.innerHTML.toUpperCase().indexOf(input.value.trim().replace(/[#№0]/g, ' ').toUpperCase()) > -1) {
                item.closest(obj.selectorForHide).style.display = "";
                item.closest(obj.selectorForHide).classList.add('active-search-item');

            }
            else if (item.innerHTML.toUpperCase().replace(/\s+/g, '').indexOf(input.value.trim().replace(/[#№0]/g, ' ').replace(/\s+/g, '').toUpperCase()) > -1) {
                item.closest(obj.selectorForHide).style.display = "";
                item.closest(obj.selectorForHide).classList.add('active-search-item');

            }
            else {
                item.closest(obj.selectorForHide).style.display = "none";
                item.closest(obj.selectorForHide).classList.remove('active-search-item');
            }
        }
    }

    $(document).on('keyup', '.t-search', function (e) {
        e.preventDefault();


        if ($(this).val()[0] === "#" || $(this).val()[0] === "№" || $(this).val()[0] === 0)  {
            searchFilter({
                selectorForFilter: '.search-select li .account-register',
                inputSelector: '.t-search',
                selectorForHide: 'li'
            });
        } else if ($.isNumeric($(this).val()[0])) {
            searchFilter({
                selectorForFilter: '.search-select li .account-passport',
                inputSelector: '.t-search',
                selectorForHide: 'li'
            });
        } else {
            searchFilter({
                selectorForFilter: '.search-select li .account-owner',
                inputSelector: '.t-search',
                selectorForHide: 'li'
            });
        }
        if (e.key === 'Enter' &&  $(this).siblings('.search-select')[0].querySelector('.active-search-item') !== null) {
            $(this).siblings('.search-select')[0].querySelector('.active-search-item').click();
        }

    });
    $(document).on('keyup', '.t-search-submit', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

    $(document).on('click', '.search-select li', function () {
        $('.mass-search').val($(this).text().replace(/\s{2,}/g, " ").replace(/([.!?]+)(?=\S)/g, "$1 "));

        setTimeout(function () {
            $(this).closest('form').submit();
        },100);

    });
});