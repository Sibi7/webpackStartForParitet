$(function () {

    // ajax для кнопок "Подписать и отправить"
    $(document).on('click', '.voting-send-ajax', function (e) {
        e.preventDefault();
        var _this = $(this);
        var parent = $(this).closest('.content__block');
        // Данные для отправки формы преобразуем в массив
        var formData = parent.find('form').serializeArray();
        var url = parent.find('form').attr('action').toString();
        var customUrl = url.replace(/SignBulletinAjax/g, 'SignBulletin');
        $.ajax({
            url: url,
            type: 'post',
            data: formData,
            success: function (data) {
                parent.html(data)
            },
            error: function (err) {
                if (err.status === 401) {
                    location.href='/User/SignIn';
                }
                else {
                    alert('Ошибка! Ответ сервера: ' + err.status);
                }
            }
        }).done(function () {
            var regAccId = $('.register-account-id-num').val();
            $.ajax({
                url: '/Helper/GetVoteStatus/' + regAccId,
                type: 'get',
                success: function (data) {
                    $('.status-voiting').html(data);
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
        })
        // $.ajax({
        //     url:  customUrl,
        //     type: 'post',
        //     success: function (data) {
        //         var block = $('<div>');
        //         block.html(data);
        //         $('.status-voiting').html(block.find('.status-voiting').html());
        //     },
        //     error: function (err) { 
        //         console.error(err)
        //     }
        // })
    });

    $(document).on('click', '.voting-actions__choice--item', function () {
        var parent = $(this).closest('.voting-actions');
        var siblingsVotingActions = parent.siblings('.voting-actions');
        var inputs = parent.find('input[type="radio"]');
        var votingFalse = parent.find('.if-voting-false');
        var votingTrue = parent.find('.if-voting-true');
        var thisRadio = $(this).find('input[type="radio"]');
        var contentBlock = $(this).closest('.content__block');
        var thisClassList = $(this).attr('class').split(' ');
        var editedThisClassList = '';
        contentBlock.find('.help-hidden-block').removeClass('help-hidden-block--is-visible');

        // Берем классы нажатой кнопки, и переводим их в строку, по которой будет удобно искать кнопку в соседней строке
        for (var i=0; i<thisClassList.length; i++) {
            editedThisClassList += '.' + thisClassList[i].trim();
        }

        if (parent.hasClass('voting-actions-disable')) {
            return false
        }
        if (!contentBlock.hasClass('modal-is-shown')) {
            contentBlock.find('.modal-first-click').closest('.overlay').show().focus();
            contentBlock.find('.modal-first-click').find('button').focus();
            contentBlock.addClass('modal-is-shown');
            contentBlock.find('.voting-send').show();
        }
        // Запрещаем клик по кнопке, которая уже нажата в соседней строке
        if (siblingsVotingActions.find(editedThisClassList).hasClass('voting-selected')) {
            return false
        }
        if ($(this).hasClass('voting-selected')) {
            $(this).removeClass('voting-selected');
            thisRadio.removeAttr('checked');
            votingFalse.show();
            votingTrue.hide();
            parent.find('.cumulative-voting__sum').text('0');
            parent.find('.votes-cast').val(0);
            return false
        } else if (parent.find('.voting-selected').length > 0) {
            parent.find('.voting-actions__choice--item').removeClass('voting-selected');
            parent.find('.votes-cast').focus();
            $(this).addClass('voting-selected');
            inputs.each(function () {
                $(this).removeAttr('checked')
            });
            thisRadio.attr('checked', 'checked');
            votingFalse.hide();
            if ($(this).hasClass('voting-veto')) {
                votingTrue.hide();
                return false
            } else {
                votingTrue.show();
                return false
            }
        } else {
            parent.find('.votes-cast').focus();
            $(this).addClass('voting-selected');
            thisRadio.attr('checked', 'checked');
            votingFalse.hide();
            if ($(this).hasClass('voting-veto')) {
                votingTrue.hide();
                return false
            } else {
                votingTrue.show();
                return false
            }
        }
    });









});
