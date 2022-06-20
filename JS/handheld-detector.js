function DetectHandHeld(fetch_item){
    if(screen.height > screen.width){
        fetch(fetch_item)
        .then(response => response.text())
        .then(html => document.documentElement.innerHTML = html);
    }
}