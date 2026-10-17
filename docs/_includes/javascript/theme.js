/**
 * Desktop theme: Windows 98 or Mac OS 8/9
 *
 * Runs at the start of the <body>, before anything is shown, and sets the
 * body's class to os-win or os-mac: both themes' styles are loaded
 * (assets/css/style.css), each nested under its class. The body starts as
 * os-win, which is also the theme without JavaScript.
 *
 * The theme can be chosen with ?os=mac or ?os=win, or from the start dialog
 * (remembered in this browser), otherwise it depends on the viewer's
 * platform - just as the original chose between e2.css and e2_mac.css.
 */
(function () {
    var os = new URLSearchParams(location.search).get('os');
    if (os !== 'mac' && os !== 'win') {
        try {
            os = localStorage.getItem('error404-os');
        } catch (e) {}
    }
    if (os !== 'mac' && os !== 'win') {
        var platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || navigator.userAgent;
        os = /mac|iphone|ipad|ipod/i.test(platform) ? 'mac' : 'win';
    }
    document.body.classList.remove('os-mac', 'os-win');
    document.body.classList.add('os-' + os);
})();
