
var acc = document.getElementsByClassName("panel-title");

for (let i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        let parent = this.parentNode;
        for (let j = 0; j < parent.childNodes.length; j++) {
            let transition = function(panel) {
                if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                    setTimeout(function(){
                        parent.classList.remove("is-active")
                    }, 200);
                } else {
                    parent.classList.toggle("is-active");
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                }
            }
            if (parent.childNodes[j].className == "sub-panel is-active") {
                transition(parent.childNodes[j]);
            } else if (parent.childNodes[j].className == "sub-panel") {
                transition(parent.childNodes[j]);
            }
        }
    }
}