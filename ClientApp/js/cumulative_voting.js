$(function() {




    // $(document).on('keyup', '.cumulative-voting__input', function () {
    //     onKeyUpCumulativeInput($(this))
    // });

    // function onChangeCumulativeInput(_this) {
    //     var parent = _this.closest('.cumulative-voting__block');
    //     var inputs = parent.find('.cumulative-voting__input');
    //     var total = parent.find('.cumulative-voting__total').val().replace(',', '.');
    //     var sumElement = parent.find('.cumulative-voting__sum');
    //     var sum = 0;
    //
    //     inputs.each(function () {
    //         sum += +($(this).attr('data-converted-fraction'))
    //     });
    //
    //     if (sum > total) {
    //         sumElement.addClass('red');
    //         parent.find('.cumulative-voting-warning').remove();
    //         if(+(_this.val()) > 0) {
    //             parent.find('.voting__block').append('<span class="cumulative-voting-warning">Отдано больше голосов чем имеется. Голосование недействительно</span>')
    //         }
    //     } else {
    //         parent.find('.cumulative-voting-warning').remove();
    //         sumElement.removeClass('red');
    //     }
    //
    //     sumElement.text(sum);
    // }

    // $(document).on('blur', '.cumulative-voting__input', function () {
    //     onChangeCumulativeInput($(this))
    // });


    // $(document).on('click', '.voting-actions__choice--item', function () {
    //     var parent = $(this).closest('.cumulative-voting__block');
    //     var inputs = parent.find('.cumulative-voting__input');
    //     if (inputs.length > 0) {
    //         inputs.each(function () {
    //             $(this).val('')
    //         });
    //         parent.find('.cumulative-voting-warning').remove();
    //         parent.find('.cumulative-voting__sum').removeClass('red').text(0);
    //     }
    // });

    // $(document).on('click', '.cumulative-voting__block .voting-actions__choice--item', function () {
    //     var parent = $(this).closest('.cumulative-voting__block');
    //     if ($(this).hasClass('voting-false') || $(this).hasClass('voting-abstained')) {
    //         var total = parent.find('.cumulative-voting__total').val();
    //         parent.find('.noborder').attr('readonly', '').css({
    //             pointerEvents: 'none'
    //         });
    //         $('.cumulative-voting__sum').text(total);
    //     } else {
    //         parent.find('.noborder').removeAttr('readonly').css({
    //             pointerEvents: 'auto'
    //         });
    //     }
    // })

    // $(document).on('click', '.part-of-voices-btn', function () {
    //     var inputInfo = $(this).closest('.cumulative-voting__block').find('.data-cumulative-input');
    //     var members = inputInfo.data('amount');
    //     var voices = inputInfo.data('total').toString().indexOf(',') > 0 ? inputInfo.data('total').replace(',', '.') : inputInfo.data('total');
    //     var input = $(this).closest('.string').find('.cumulative-voting__input');
    //     input.val(Math.floor(voices / members));
    //     onKeyUpCumulativeInput(input);
    //     onChangeCumulativeInput(input);
    // });
    // $(document).on('click', '.remaining-voices-btn', function () {
    //     var votingBlock = $(this).closest('.cumulative-voting__block');
    //     var allInputs = votingBlock.find('.cumulative-voting__input');
    //     var sum = 0;
    //     var inputInfo = $(this).closest('.cumulative-voting__block').find('.data-cumulative-input');
    //     var voices = inputInfo.data('total').toString().indexOf(',') > 0 ? inputInfo.data('total').replace(',', '.') : inputInfo.data('total');
    //     var input = $(this).closest('.string').find('.cumulative-voting__input');
    //     input.val('');
    //     allInputs.each(function () {
    //         sum += +($(this).val());
    //     });
    //     input.val(voices - sum);
    //     // onKeyUpCumulativeInput(input);
    //     // onChangeCumulativeInput(input);
    // })

});