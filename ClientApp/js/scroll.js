$(function () {

    $('.content__section').mCustomScrollbar({
        theme: "my-theme",
        mouseWheel: {
            deltaFactor: 20,
            normalizeDelta: false
        },
        scrollInertia: 300
    });
    $('.content__aside').mCustomScrollbar({
        theme: "my-theme",
        mouseWheel: {
            deltaFactor: 20,
            normalizeDelta: false
        },
        scrollInertia: 300
    });
    $('.filter__body').mCustomScrollbar({theme: "my-theme"});
    $('.filter .filter .filter__body').mCustomScrollbar({theme: "my-theme"});
    $('.modal__body').mCustomScrollbar({theme: "my-theme"});
    $('.search-select').mCustomScrollbar({theme: "my-theme"});
    $('.history-dropdown').mCustomScrollbar({theme: "my-theme"});
    $('.question-tooltip__modal').mCustomScrollbar({theme: "my-theme"});
    $('.attention-tooltip__modal').mCustomScrollbar({theme: "my-theme"});

    var window_href = window.location.href;
    var locationId = window_href.substr(window_href.indexOf('#'));
    if (locationId[0] === '#') {
        $('.content__section').mCustomScrollbar('scrollTo', $(locationId));
    }

});