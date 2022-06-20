var title = document.getElementsByClassName('main-header')[0].getElementsByTagName('t')[0]
let popup_Arr = document.querySelectorAll('[title-text]')
for(let i=0;i<popup_Arr.length;i++){
    popup_Arr[i].addEventListener('mouseover',function(){
        let title_text = this.getAttribute('title-text').toString()
        title.innerHTML = title_text
    })
    popup_Arr[i].addEventListener('mouseleave',function(){
        title.innerHTML = 'OgGhostJelly Hangout'
    })
}