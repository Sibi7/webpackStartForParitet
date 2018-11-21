$(function () {

    var inputCon = new Condition();
    var uri = getUri();
    inputCon.init({
        valAttrName: 'data-scv',
        cookieName: '___input-result___' + uri.bulletinId,
        customLoad: function (item, name, value, type) {
            //console.log(item, name, value, type);
            if (type === 'block') {
                if (parseInt(value) === 1) {
                    $(item).closest('label').addClass('checked__');

                }
            }
            if (type === 'input') {
                item.value = value;
            }
            if (type === 'checkbox') {
                if (parseInt(value) === 1) {
                    if (!$(item).closest('.voting-inputs__choice').find('.input-selected').length > 0) {
                        $(item).closest('.voting-inputs__choice--item').addClass('input-selected');
                        item.setAttribute('checked', 'checked');
                    }
                    if ($(item).closest('.voting-inputs__choice--item').hasClass('voting-true')) {

                        $('.voting-actions-all-btn.voting-true').addClass('input-selected')
                    }

                }
            }
        },
        // afterLoad: function () {
        //     // var v = new allVoting();
        //     v.clickToBtn();
        // }

    });
    inputCon.runLoad();
    // var btnAll = new allVoting();
    // btnAll.clickNumberAllBtn();


    $(document).on('change', '.bullet-number-all', function (e) {
        // var v = new allVoting();

        if (!$(".bullet-number-all").hasClass('checked__')) {
            var votingSelected = document.querySelector('.input-selected');
            if (votingSelected.classList.contains('voting-false')) {
                v.addToCookie('voting-false');
            }
            if (votingSelected.classList.contains('voting-true')) {
                v.addToCookie('voting-true');
            }
            if (votingSelected.classList.contains('voting-abstained')) {
                v.addToCookie('voting-abstained');
            }
            if (votingSelected.classList.contains('voting-close')) {
                v.addToCookie('voting-close');
            }
        }
        else{
            v.delFromCookie();
        }
        $(this).toggleClass('checked__');
        $(this).find('input').attr('data-scv', 1);
        inputCon.runSave();
        return false;
    });
    $(document).on('click', '.voting-actions-all-btn', function (e) {

        var val = parseInt($(this).find('input').attr('data-scv'));


        if ($(this).hasClass('input-selected')) {

            $('li.input-selected input').attr('data-scv', 0).removeAttr('checked');
            $('li.input-selected').removeClass('input-selected');
            inputCon.runSave();
            return false
        }
        if ($(this).hasClass('voting-true')) {
            $('.voting-true').addClass('input-selected');
            $('.voting-true input').attr('data-scv', 1).attr('checked', 'checked');
        }
        else {
            $('.voting-true').removeClass('input-selected');
            $('.voting-true input').attr('data-scv', 0).removeAttr('checked');
        }
        if ($(this).hasClass('voting-close')) {
            $('.voting-close').addClass('input-selected');
            $('.voting-close input').attr('data-scv', 1).attr('checked', 'checked');
        }
        else {
            $('.voting-close').removeClass('input-selected');
            $('.voting-close input').attr('data-scv', 0).removeAttr('checked');
        }

        if ($(this).hasClass('voting-false')) {
            $('.voting-false').addClass('input-selected');
            $('.voting-false input').attr('data-scv', 1).attr('checked', 'checked');
        }
        else {
            $('.voting-false').removeClass('input-selected');
            $('.voting-false input').attr('data-scv', 0).removeAttr('checked');
        }
        if ($(this).hasClass('voting-close')) {
            $('.voting-close').addClass('input-selected');
            $('.voting-close a').attr('data-scv', 1).attr('checked', 'checked');
        }
        else {
            $('.voting-close').removeClass('input-selected');
            $('.voting-close a').attr('data-scv', 0).removeAttr('checked');
        }

        if ($(this).hasClass('voting-abstained')) {
            $('.voting-abstained').addClass('input-selected');
            $('.voting-abstained input').attr('data-scv', 1).attr('checked', 'checked');
        }
        else {
            $('.voting-abstained').removeClass('input-selected');
            $('.voting-abstained input').attr('data-scv', 0).removeAttr('checked');
        }
        if ($(this).hasClass('voting-veto')) {
            $('.voting-veto').addClass('input-selected');
            $('.voting-veto input').attr('data-scv', 1).attr('checked', 'checked');
        }
        else {
            $('.voting-veto').removeClass('input-selected');
            $('.voting-veto input').attr('data-scv', 0).removeAttr('checked');
        }
        if (val === 0) {
            $(this).find('input').attr('data-scv', 1).attr('checked', 'checked');
        }
        else {
            $(this).find('input').attr('data-scv', 0).removeAttr('checked');
        }
        inputCon.runSave();
        return false;


    });
    $(document).on('click', '.voting-actions-sing-btn', function (e) {
        var _this = $(this);
        $('.voting-actions-all-btn').removeClass('input-selected');
        $('.voting-actions-all-btn input').attr('data-scv', 0).removeAttr('checked');


        if ($(this).hasClass('input-selected')) {
            checkCookie();
            $(this).removeClass('input-selected');

        }
        else {
            $(this).closest('.voting-inputs__choice').find('.input-selected').removeClass('input-selected');
            $(this).closest('.voting-inputs__choice').find('input').attr('data-scv', 0).removeAttr('checked');
            $(this).addClass('input-selected');
            checkCookie();

        }

        // $('.voting-actions-sing-btn').attr('data-scv', 0);
        function checkCookie() {
            var val = parseInt(_this.find('input').attr('data-scv'));
            if (val === 0) {
                _this.find('input').attr('data-scv', 1).attr('checked', 'checked')
            }
            else {
                _this.find('input').attr('data-scv', 0).removeAttr('checked');
            }
        }

        inputCon.runSave();
        return false;


    });

    function getUri() {
        var search = window.location.search.substr(1),
            keys = {};

        search.split('&').forEach(function (item) {
            item = item.split('=');
            keys[item[0]] = item[1];
        });

        return keys;

    }

    $(document).on('click', '#reset-voting-result-btn', function () {
        inputCon.resetVote();
    });

});