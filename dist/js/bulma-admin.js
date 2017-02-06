'use strict';

var wrapper = 'wrapper';
var link_class = 'panel-title';
var active_class = 'is-active';
var hamburger = 'nav-toggle';
var sidebar = 'sidebar';
var subpanel = 'sub-panel';

var classClick = function classClick(className, action) {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        elements[i].onclick = function () {
            action(this);
        };
    }
};

classClick(link_class, function (element) {
    var parent = element.parentNode;
    for (var j = 0; j < parent.childNodes.length; j++) {
        var transition = function transition(panel) {
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                setTimeout(function () {
                    parent.classList.remove(active_class);
                }, 200);
            } else {
                parent.classList.toggle(active_class);
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        };
        if (parent.childNodes[j].className) {
            if (parent.childNodes[j].className.indexOf(subpanel) >= 0) {
                transition(parent.childNodes[j]);
            }
        }
    }
});

classClick(hamburger, function (element) {
    var sidebar = document.getElementsByClassName();
    for (var i = 0; i < sidebar.length; i++) {
        var transition = function transition(sidebar) {
            if (sidebar.style.maxHeight) {
                sidebar.style.maxHeight = null;
                setTimeout(function () {
                    sidebar.classList.remove(active_class);
                    element.classList.remove(active_class);
                }, 200);
            } else {
                sidebar.classList.toggle(active_class);
                element.classList.toggle(active_class);
                sidebar.style.maxHeight = sidebar.scrollHeight + 'px';
            }
        };
        if (sidebar[i].className) {
            transition(sidebar[i]);
        }
    }
});

function resizeWrapper() {
    var topOffset = 49;
    var height = (this.window.innerHeight > 0 ? this.window.innerHeight : this.screen.height) - 1;
    height = height - topOffset;
    if (height < 1) height = 1;
    if (height > topOffset) {
        document.getElementById(wrapper).style.height = height + "px";
    }
}

window.addEventListener('load', function () {
    resizeWrapper();
});
window.addEventListener('resize', function () {
    resizeWrapper();
});