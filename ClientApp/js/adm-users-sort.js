$(function() {

    var userList = document.querySelector(".users-list");
    var groupsList = document.querySelector(".group-users-table");
    var table = document.querySelector(".table");
    var registersList = document.querySelector(".group-registers-table");
    var billsList = document.querySelector(".group-bills-table");


    function sortTable(tbl, n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = tbl;
        switching = true;
        //Set the sorting direction to ascending:
        dir = "asc";
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.querySelectorAll("tbody tr");
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 0; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].querySelectorAll("td")[n];
                y = rows[i + 1].querySelectorAll("td")[n];
                /*check if the two rows should switch place,
                based on the direction, asc or desc:*/
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch= true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch= true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                //Each time a switch is done, increase this count by 1:
                switchcount ++;
            } else {
                /*If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again.*/
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }


    /*------------users-list--------------*/
    $(document).on('click', '.users-list th.u-login', function () {
        sortTable(userList, 0);
    });
    $(document).on('click', '.users-list th.u-rol', function () {
        sortTable(userList, 1);
    });
    $(document).on('click', '.users-list th.u-name', function () {
        sortTable(userList, 2);
    });
    $(document).on('click', '.users-list th.u-status', function () {
        sortTable(userList, 3);
    });
    $(document).on('click', '.users-list th.u-visited', function () {
        sortTable(userList, 4);
    });
    $(document).on('click', '.users-list th.u-online-status', function () {
        sortTable(userList, 5);
    });
    /*------------!users-list--------------*/



    /*------------groupsList--------------*/
    $(document).on('click', '.group-users-table .th-number', function () {
        sortTable(groupsList, 0);
    });
    $(document).on('click', '.group-users-table .th-name', function () {
        sortTable(groupsList, 1);
    });
    /*------------!groupsList--------------*/


    /*------------table--------------*/
    $(document).on('click', '.table .t-sort', function () {
        sortTable(table, 0);
    });
    /*------------!table--------------*/


    /*------------registersList--------------*/
    $(document).on('click', '.group-registers-table .th-number', function () {
        sortTable(registersList, 0);
    });
    $(document).on('click', '.group-registers-table .th-name', function () {
        sortTable(registersList, 1);
    });

    $(document).on('click', '.group-registers-table .th-number', function () {
        sortTable(registersList, 0);
    });
    $(document).on('click', '.group-registers-table .th-name', function () {
        sortTable(registersList, 1);
    });
    /*------------!registersList--------------*/



    /*------------billsList--------------*/
    $(document).on('click', '.group-bills-table .th-number', function () {
        sortTable(billsList, 0);
    });
    $(document).on('click', '.group-bills-table .th-name', function () {
        sortTable(billsList, 1);
    });
    /*------------!billsList--------------*/


});