
const wrapper = 'wrapper';
const link_class = 'panel-title';
const active_class = 'is-active';
const hamburger = 'nav-toggle';
const sidebar = 'sidebar';
const subpanel = 'sub-panel';

const classClick = (className, action, ...extras) => {
    var elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = function(){
            action(this, ...extras);
        }
    }
}

// sp = subpanel class name
// ac = active class name
classClick(link_class, function(element, sp, ac) {
    let parent = element.parentNode;
    for (let j = 0; j < parent.childNodes.length; j++) {
        let transition = function(panel) {
            if (panel.style.maxHeight){
                panel.style.maxHeight = null;
                setTimeout(function(){
                    parent.classList.remove(ac);
                }, 200);
            } else {
                parent.classList.toggle(ac);
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        }
        if (parent.childNodes[j].className) {
            if (parent.childNodes[j].className.indexOf(sp) >= 0) {
                transition(parent.childNodes[j]);
            }
        }
    }
}, subpanel, active_class);

let sidebar_clone = document.getElementById(sidebar);
let panel_items = sidebar_clone.getElementsByClassName('panel-item');
let panel_highlights = sidebar_clone.getElementsByClassName('panel-highlight');
let maxHeight = (panel_items.length - panel_highlights.length) * 45 + 5;

// sb = sidebar class name
// ac = active class name
classClick(hamburger, function(element, sb, ac, mh) {
    let sidebar = document.getElementById(sb);
    let transition = (sidebar) => {
        if (sidebar.style.maxHeight){
            sidebar.style.maxHeight = null;
            setTimeout(function(){
                sidebar.classList.remove(ac);
                element.classList.remove(ac);
            }, 200);
        } else {
            sidebar.classList.toggle(ac);
            element.classList.toggle(ac);
            sidebar.style.maxHeight = sidebar.scrollHeight + 'px';
            setTimeout(function(){
                sidebar.style.maxHeight = mh + 'px'
            }, 200);
        }
    }
    transition(sidebar);
}, sidebar, active_class, maxHeight);

function resizeWrapper(wrapper, window) {
    var topOffset = 49;
    var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
    height = height - topOffset;
    if (height < 1) height = 1;
    if (height > topOffset) {
        document.getElementById(wrapper).style.height = height + "px";
    }
}

window.addEventListener('load', function() {
    resizeWrapper(wrapper, window);
});
window.addEventListener('resize', function() {
    resizeWrapper(wrapper, window);
});

