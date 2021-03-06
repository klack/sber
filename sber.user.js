// ==UserScript==
// @name           sber
// @namespace      klack
// @description    Fixes margin, hides side panel, adds "turn page" by scrolling the page when the sides are tapped"
// @copyright      Richard Layton
// @version        0.55
// @grant          GM_addStyle
// @include        https://www.safaribooksonline.com*
// @include-jquery
// ==/UserScript==
// a function that loads jQuery and calls a callback function when jQuery has finished loading

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function addFontAwesome(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "https://use.fontawesome.com/d23519e09b.js");
    document.body.appendChild(script);
}

function main() {
    // Note, jQ replaces $ to avoid conflicts.
    jQ('body').prepend('<div id="sber-next"></div><div id="sber-prev"></div>');
    jQ('body').prepend('<div id="sber-menu"><i class="fa fa-bars"></i></div><div id="sber-menu-hidden"><i class="fa fa-bars"></i></div>');
    jQ("#sber-next").click(function () {
        var sber_wh = jQ(window).height();
        window.scrollBy(0, sber_wh / 2);
    });
    jQ("#sber-prev").click(function () {
        var sber_wh = jQ(window).height();
        window.scrollBy(0, -(sber_wh / 2));
    });
    jQ("#sber-menu").click(function () {
        jQ(this).hide();
        jQ('#sber-menu-hidden').show();
        jQ('.interface-controls-top').hide();
        jQ('.topbar').hide();
        jQ('body.sidenav').addClass('no-padding-left');
        jQ('#sber-next').show();
        jQ('#sber-prev').show();
        jQ('.sbo-nav-top').hide();
        jQ('.sbo-reading-menu').hide();
        jQ('.icon-up').toggle('clear');
        jQ('.icon-up').toggleClass('clear');
    });
    jQ("#sber-menu-hidden").click(function () {
        jQ(this).hide();
        jQ('#sber-menu').show();
        jQ('.interface-controls-top').show();
        jQ('.topbar').show();
        jQ('body.sidenav').removeClass('no-padding-left');
        jQ('#sber-next').hide();
        jQ('#sber-prev').hide();
        jQ('.sbo-nav-top').show();
        jQ('.sbo-reading-menu').show();
        jQ('.icon-up').toggleClass('clear');
    });
}

addFontAwesome();
addJQuery(main);

GM_addStyle(" \
.clear{\
    opacity:0;\
}\
.no-padding{\
	padding-left:0; !important \
}\
#sbo-rt-content { \
	min-width:100%; !important \
} \
.topbar { \
	//position:static; !important \
} \
body.sidenav { \
	// \
} \
.topnav{ \
	margin-top: 100px; \
} \
#sber-prev, #sber-next { \
	top:62px; \
		z-index: 500; \
			position: fixed; \
				height: 100px; \
	width: 100px; \
	background: black; \
	color: white; \
	height: 100%; \
	font-size: 80px; \
	display: none;\
	opacity: 0;\
} \
.interface-controls-top { \
	margin-top: 100px; \
} \
#sber-next { \
	right: 0; \
} \
#sber-menu-hidden { \
	display: none; \
} \
#sber-menu, #sber-menu-hidden { \
	top:0; \
	height:61px; \
	width:55px; \
	position:fixed; \
	z-index:999; \
	color:black; \
	left:0;\
	text-align:center;\
	padding-top:22px;\
} \
#sbo-rt-content .FontName1 { \
	font-size: initial; !important; \
} \
pre .FontName1 { \
	font-size:151%; !important \
}\
.no-padding-left { \
	padding-left: 0 !important; \
} \
");

console.log('Finito');