var title = document.getElementsByClassName('main-header')[0].getElementsByTagName('t')[0]
var title_innerHTML = title.innerHTML
let popup_Arr = document.querySelectorAll('[title-text]')
for(let i=0;i<popup_Arr.length;i++){
    popup_Arr[i].addEventListener('mouseover',function(){
        let title_text = this.getAttribute('title-text').toString()
        title.innerHTML = title_text
    })
}
document.getElementsByClassName('website-container')[0].addEventListener('mouseleave',function(){
    title.innerHTML = title_innerHTML
})