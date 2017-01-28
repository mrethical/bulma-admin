
const classClick = function(className, action) {
    var elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = function(){
            action(this);
        }
    }
}

classClick('panel-title', function(element) {
    let parent = element.parentNode;
    for (let j = 0; j < parent.childNodes.length; j++) {
        let transition = function(panel) {
            if (panel.style.maxHeight){
                panel.style.maxHeight = null;
                setTimeout(function(){
                    parent.classList.remove("is-active");
                }, 200);
            } else {
                parent.classList.toggle("is-active");
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        }
        if (parent.childNodes[j].className) {
            if (parent.childNodes[j].className.indexOf("sub-panel") >= 0) {
                transition(parent.childNodes[j]);
            }
        }
    }
});

classClick('nav-toggle', function(element) {
    let sidebar = document.getElementsByClassName('sidebar');
    for (let i = 0; i < sidebar.length; i++) {
        let transition = function(sidebar) {
            if (sidebar.style.maxHeight){
                sidebar.style.maxHeight = null;
                setTimeout(function(){
                    sidebar.classList.remove("is-active");
                    element.classList.remove("is-active");
                }, 200);
            } else {
                sidebar.classList.toggle("is-active");
                element.classList.toggle("is-active");
                sidebar.style.maxHeight = sidebar.scrollHeight + 'px';
            }
        }
        if (sidebar[i].className) {
            transition(sidebar[i]);
        }
    }
});

function resizeWrapper() {
    var topOffset = 49;
    var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
    height = height - topOffset;
    if (height < 1) height = 1;
    if (height > topOffset) {
        document.getElementById('wrapper').style.height = height + "px";
    }
}

window.addEventListener('load', function() {
    resizeWrapper();
});
window.addEventListener('resize', function() {
    resizeWrapper();
});