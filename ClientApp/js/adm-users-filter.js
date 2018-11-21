$(function () {

    function admInputFilter(input, table, n) {
        // Declare variables
        var filter, tr;
        filter = input.val().toUpperCase();
        tr = table.find("tbody tr");
        var td;

        // Loop through all table rows, and hide those who don't match the search query
        for (var i = 0; i < tr.length; i++) {

            var tdText = '';
            if (n === undefined) {
                td = tr[i].querySelectorAll("td");
                for(var j=0; j<td.length; j++) {
                    tdText = tdText + td[j].innerText
                }
                if (td) {
                    if (tdText.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            } else {
                td = tr[i].querySelectorAll("td")[n];

                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
    }

    $(document).on('click', '.t-search', function () {
        var filter = $(this).closest('.content__section').find('.filter');
        if(filter.length > 0) {
            filter.removeAttr('style');
            filter.show();
            var parent = filter.closest('.content__section')[0].getBoundingClientRect().bottom;
            var filterBottom = filter[0].getBoundingClientRect().bottom;
            if (filterBottom > parent) {
                filter.css({
                    'top': 'auto',
                    'bottom': '35px'
                })
            }
        }
    });

    $(document).on('keyup', '.t-search', function () {
        var filter = $(this).closest('.content__section').find('.filter');
        var filterTable = filter.find('table');
        var table = $(this).closest('.content__section').find('.table');
        if (filter.length > 0) {
            admInputFilter($(this), filterTable)
        } else {
            admInputFilter($(this), table)
        }
    });

    /*-------usersList------*/
    $(document).on('keyup', '.filter--input', function () {
        admInputFilter($(this), $('.table'));
    });


    /*search user for new account*/
    $(document).on('keyup', '#user-cabinet-new .t-search', function (event) {
        $('#user-cabinet-new .filter tr').find('input[type="checkbox"]').prop('checked', false);
        if(event.keyCode === 13 && $(this).val().length > 0 || event.keyCode === 8) {
            $('#user-cabinet-new .filter').fadeIn('fast');
            admInputFilter($(this), $('#user-cabinet-new .filter table'), 1)
        }
        admInputFilter($(this), $('#user-cabinet-new .filter table'), 1)
    });




    /*-----------------------------------------------------------------------------------*/
});


