var FADE_INTERVAL = 50;

var mSettingMenuTimer;
var mMouseX, mMouseY;

(function () {
    document.getElementById("more_slide").addEventListener("mouseleave", function (e) {
        hideMoreSlide();
    });
})();

document.onmousemove = function (e) {
    e = e || window.event;
    if (e.pageX || e.pageY) {
        mMouseX = e.pageX;
        mMouseY = e.pageY
    }
}

function inputSearchLostFocus() {//失去焦点
    document.getElementById("span_search").className = "span_input_search";
}

function inputSearchFocus() {//获得焦点
    document.getElementById("span_search").className = "span_input_search_inputfocus";
}

//获取元素的纵坐标 
function getTop(e) {
    var offset = e.offsetTop;
    if (e.offsetParent != null)
        offset += getTop(e.offsetParent);
    return offset;
}

//获取元素的横坐标 
function getLeft(e) {
    var offset = e.offsetLeft;
    if (e.offsetParent != null)
        offset += getLeft(e.offsetParent);
    return offset;
}

function isMouseInElement(element) {
    var x1 = getLeft(element);
    var y1 = getTop(element);
    var x2 = x1 + element.offsetWidth;
    var y2 = y1 + element.offsetHeight;
    if (mMouseX < x1 || mMouseX > x2 || mMouseY < y1 || mMouseY > y2)
        return false;
    return true;
}

/**
 * 线性淡入
 * 
 * @param {*} element 需要淡入的元素
 * @param {*} duration 动画时长 ms
 */
function fadeIn(element, duration) {
    duration = duration || 20;
    var gap = FADE_INTERVAL / duration;
    var tempAlpha = 0;

    element.style.display = "block";
    element.style.opacity = tempAlpha;

    var fadeHandle = setInterval(function () {
        tempAlpha += gap;
        element.style.opacity = tempAlpha;
        if (tempAlpha >= 1)
            clearInterval(fadeHandle);
    }, FADE_INTERVAL);
}

/**
 * 线性淡出
 * 
 * @param {*} element 
 * @param {*} duration 
 */
function fadeOut(element, duration) {
    duration = duration || 20;
    var gap = FADE_INTERVAL / duration;
    var tempAlpha = 1;

    var fadeHandle = setInterval(function () {
        tempAlpha -= gap;
        element.style.opacity = tempAlpha;
        if (tempAlpha <= 0) {
            clearInterval(fadeHandle);
            element.style.display = "none";
        }
    }, FADE_INTERVAL);
}

function showSettingMenu(a) {
    var x = getLeft(a);
    var y = getTop(a);
    var aWidth = a.offsetWidth;
    var aHeight = a.offsetHeight;
    var menu = document.getElementById("setting_menu");
    menu.style.display = "block";
    menu.style.left = x + aWidth / 2 - menu.offsetWidth / 2;
    menu.style.top = y + aHeight + 10;
}

function hideSettingMenu() {
    if (mSettingMenuTimer != undefined && mSettingMenuTimer != null) {
        clearTimeout(mSettingMenuTimer);
    }
    mSettingMenuTimer = setTimeout(function () {
        var e = document.getElementById("setting_menu");
        var resultE = isMouseInElement(e);
        var resultSetting = isMouseInElement(document.getElementById("bar_setting"));
        if (resultE || resultSetting)
            return;
        e.style.display = "none";
    }, 300);
}

function showMoreSlide() {
    document.getElementById("bar_more").style.className = "navigation_bar_more_hover";
    var element = document.getElementById("more_slide");
    element.style.minHeight = window.innerHeight;
    fadeIn(element, 200);
}

function hideMoreSlide() {
    document.getElementById("bar_more").style.className = "navigation_bar_more";
    var element = document.getElementById("more_slide");
    fadeOut(element, 200);
}