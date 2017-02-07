'use strict';

var wrapper = 'wrapper';
var link_class = 'panel-title';
var active_class = 'is-active';
var hamburger = 'nav-toggle';
var sidebar = 'sidebar';
var subpanel = 'sub-panel';

var classClick = function classClick(className, action) {
    for (var _len = arguments.length, extras = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        extras[_key - 2] = arguments[_key];
    }

    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        elements[i].onclick = function () {
            action.apply(undefined, [this].concat(extras));
        };
    }
};

// sp = subpanel class name
// ac = active class name
classClick(link_class, function (element, sp, ac) {
    var parent = element.parentNode;
    for (var j = 0; j < parent.childNodes.length; j++) {
        var transition = function transition(panel) {
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                setTimeout(function () {
                    parent.classList.remove(ac);
                }, 200);
            } else {
                parent.classList.toggle(ac);
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        };
        if (parent.childNodes[j].className) {
            if (parent.childNodes[j].className.indexOf(sp) >= 0) {
                transition(parent.childNodes[j]);
            }
        }
    }
}, subpanel, active_class);

var sidebar_clone = document.getElementById(sidebar);
var panel_items = sidebar_clone.getElementsByClassName('panel-item');
var panel_highlights = sidebar_clone.getElementsByClassName('panel-highlight');
var maxHeight = (panel_items.length - panel_highlights.length) * 45 + 5;

// sb = sidebar class name
// ac = active class name
classClick(hamburger, function (element, sb, ac, mh) {
    var sidebar = document.getElementById(sb);
    var transition = function transition(sidebar) {
        if (sidebar.style.maxHeight) {
            sidebar.style.maxHeight = null;
            setTimeout(function () {
                sidebar.classList.remove(ac);
                element.classList.remove(ac);
            }, 200);
        } else {
            sidebar.classList.toggle(ac);
            element.classList.toggle(ac);
            sidebar.style.maxHeight = sidebar.scrollHeight + 'px';
            setTimeout(function () {
                sidebar.style.maxHeight = mh + 'px';
            }, 200);
        }
    };
    transition(sidebar);
}, sidebar, active_class, maxHeight);

function resizeWrapper(wrapper, window) {
    var topOffset = 49;
    var height = (window.innerHeight > 0 ? window.innerHeight : this.screen.height) - 1;
    height = height - topOffset;
    if (height < 1) height = 1;
    if (height > topOffset) {
        document.getElementById(wrapper).style.height = height + "px";
    }
}

window.addEventListener('load', function () {
    resizeWrapper(wrapper, window);
});
window.addEventListener('resize', function () {
    resizeWrapper(wrapper, window);
});