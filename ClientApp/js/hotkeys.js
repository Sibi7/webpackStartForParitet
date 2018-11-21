function Hotkeys() {

    var keysObj = [
        {
            //test
            func: function () {
            },
            keys: [90, 88]
        },
        {
            //фокус на инпутпоиска
            func: function () {
                $('.hotkeys').find('.t-search').focus();
            },
            keys: [113]
        },
        {
            //фокус на инпутпоиска
            func: function () {
                $('.hotkeys').find('.mass-entry-search').focus();
            },
            keys: [113]
        },
        {
            //клик по сабмит
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.send-hotkey').click()
            },
            keys: [18, 83]
        },
        {
            //клик по кнопке "не дейтвительно"
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.not-valid-hotkey').click()
            },
            keys: [18, 8]
        },
        {
            //клик по кнопке "отмена"
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.cancel-hotkey').click()
            },
            keys: [27]
        },
        {
            // alt + 1
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[0].click()
            },
            keys: [18, 49]
        },
        {
            // alt + 2
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[1].click()
            },
            keys: [18, 50]
        },
        {
            // alt + 3
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[2].click()
            },
            keys: [18, 51]
        },
        {
            // alt + 4
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[3].click()
            },
            keys: [18, 52]
        },
        {
            // alt + 5
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[4].click()
            },
            keys: [18, 53]
        },
        {
            // alt + 6
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[5].click()
            },
            keys: [18, 54]
        },

        {
            // alt + 7
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[6].click()
            },
            keys: [18, 55]
        },
        {
            // ctrl + 8
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[7].click()
            },
            keys: [18, 56]
        },
        {
            // ctrl + 9
            func: function (e) {
                e.preventDefault();
                $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[8].click()
            },
            keys: [18, 57]
        },
        {
            // alt + 0 выбор всех бюллетеней
            func: function (e) {
                e.preventDefault();
                $('.bullet-numbers-hotkey').find('.bullet-number-all').trigger('change');
            },
            keys: [18, 48]
        },
        {
            func: function (e) {
                e.preventDefault();
                findNextInput($(e.target), $(e.target).closest('.voting-actions__choice-btn'));
                findNextInputAcumulative($(e.target), $(e.target).closest('.cumulative-voting-input'));
            },
            keys: [9]
        },
        {
            func: function (e) {
                e.preventDefault();
                findPrevInput($(e.target), $(e.target).closest('.voting-actions__choice-btn'));
                findPrevInputAcumulative($(e.target), $(e.target).closest('.cumulative-voting-input'));
            },
            keys: [16, 9]
        },
        {
            // space
            func: function () {
                var nextBtn = $(event.target).closest('.voting-enter__tr').next().find('.voting-true');
                if (nextBtn.length === 0) {
                    nextBtn = $(event.target).closest('.voting-enter__tr-parent').next().find('.voting-true').first();
                    if (nextBtn.length === 0) {
                        nextBtn = $('.send-hotkey');
                    }
                }
                event.target.click();
                nextBtn.focus();
            },
            keys: [32]
        },
        {
            //фокус на инпутпоиска  при нажатиеf2 в форме массового ввода
            func: function () {
                $('.hotkeys').find('.t-search').focus();
            },
            keys: [113]
        },
        {
            //фокус на инпутпоиска  при нажатиеf2 в форме массового ввода
            func: function () {
                var hotkeys = $('.hotkeys');
                hotkeys.find('.t-search').blur();
                hotkeys.find('.search-select').hide();
            },
            keys: [27]
        }
        // {
        //    //убираем фокус с инпута
        //     func: function () {
        //         $('.hotkeys').find('.t-search').blur();
        //     },
        //     keys: [113]
        // }
    ];

    this.run = function () {
        var pressed = [];

        $(document).on('keydown', function (e) {
            e = e || window.event;
            pressed.push(e.keyCode);
            for (var j = 0; j < keysObj.length; j++) {
                if (pressed.length !== keysObj[j]["keys"].length) continue;
                var on = 0;
                for (var i = 0; i < keysObj[j]["keys"].length; i++) {
                    for (var k = 0; k < pressed.length; k++) {
                        if (pressed[k] === keysObj[j]["keys"][i]) {
                            on++;
                            break
                        }
                    }
                    if (on === pressed.length) {
                        keysObj[j].func(e)
                    }
                }
            }
        })
        $(document).on('keyup', function () {
            if (pressed.length === 2) {
                pressed.splice(1, 1);
            }
            else {
                pressed = []
            }
        })
    }

}

var hotheys = new Hotkeys();


$(function () {
    if ($('.hotkeys').length > 0) {
        if ($('.voting-enter__table').length > 0) {
            var i = 1;
            $('.voting-enter__table .voting-actions__choice--item').each(function () {
                $(this).attr('tabindex', i);
                i++;
            })

        }
        hotheys.run();

        // var keysObj = [
        //     {
        //         //test
        //         func:function () {
        //             console.log('first function')
        //         },
        //         keys: [90, 88]
        //     },
        //     {
        //         //фокус на инпутпоиска
        //         func:function () {
        //             $('.hotkeys').find('.t-search').focus();
        //         },
        //         keys: [113]
        //     },
        //     {
        //         //клик по сабмит
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.send-hotkey').click()
        //         },
        //         keys: [18, 83]
        //     },
        //     {
        //         //клик по кнопке "не дейтвительно"
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.not-valid-hotkey').click()
        //         },
        //         keys: [18, 8]
        //     },
        //     {
        //         //клик по кнопке "отмена"
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.cancel-hotkey').click()
        //         },
        //         keys: [27]
        //     },
        //     {
        //         // ctrl + 1
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[0].click()
        //         },
        //         keys: [18, 49]
        //     },
        //     {
        //         // ctrl + 2
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[1].click()
        //         },
        //         keys: [18, 50]
        //     },
        //     {
        //         // ctrl + 3
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[2].click()
        //         },
        //         keys: [18, 51]
        //     },
        //     {
        //         // ctrl + 4
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[3].click()
        //         },
        //         keys: [18, 52]
        //     },
        //     {
        //         // ctrl + 5
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[4].click()
        //         },
        //         keys: [18, 53]
        //     },
        //     {
        //         // ctrl + 6
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[5].click()
        //         },
        //         keys: [18, 54]
        //     },
        //     {
        //         // ctrl + 7
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[6].click()
        //         },
        //         keys: [18, 55]
        //     },
        //     {
        //         // ctrl + 8
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[7].click()
        //         },
        //         keys: [18, 56]
        //     },
        //     {
        //         // ctrl + 9
        //         func: function () {
        //             event.preventDefault();
        //             $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[8].click()
        //         },
        //         keys: [18, 57]
        //     },
        //     {
        //         // space
        //         func: function () {
        //             var nextBtn = $(event.target).closest('.voting-enter__tr').next().find('.voting-true');
        //             if (nextBtn.length === 0) {
        //                 nextBtn = $(event.target).closest('.voting-enter__tr-parent').next().find('.voting-true').first();
        //                 if (nextBtn.length === 0) {
        //                     nextBtn = $('.send-hotkey');
        //                 }
        //             }
        //             event.target.click();
        //             nextBtn.focus();
        //         },
        //         keys: [32]
        //     }
        // ];
        //
        //
        // (function runOnKeys() {
        //     var pressed = [];
        //
        //     document.onkeydown = function (e) {
        //         e = e || window.event;
        //         pressed.push(e.keyCode);
        //         for (var j=0; j<keysObj.length; j++) {
        //             if(pressed.length !== keysObj[j]["keys"].length) continue;
        //             var on = 0;
        //             for( var i = 0; i < keysObj[j]["keys"].length; i++ ) {
        //                 for( var k = 0; k < pressed.length; k++ ) {
        //                     if(pressed[k] === keysObj[j]["keys"][i]) {
        //                         on++;
        //                         break
        //                     }
        //                 }
        //                 if (on === pressed.length) {
        //                     keysObj[j].func()
        //                 }
        //             }
        //         }
        //     };
        //
        //     document.onkeyup = function () {
        //         if (pressed.length === 2) {
        //             pressed.splice(1, 1);
        //         }
        //         else {
        //             pressed = []
        //         }
        //     };
        //
        // })()
    }

    //for  close modal
    document.onkeydown = function (e) {
        // e.stopPropagation();
        e = e || window.event;
        var modal = $('.overlay');
        modal.each(function () {
            if ($(this).is(':visible') && e.keyCode === 27) {
                $(this).hide()
            }
            if ($(this).is(':visible') && e.keyCode === 13) {
                // console.log($(this)[0].querySelector('.modal__footer button'))
                $(this)[0].querySelector('.modal__footer button').click();
            }
        });
    }
});