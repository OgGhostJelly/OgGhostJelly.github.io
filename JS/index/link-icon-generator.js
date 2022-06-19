let link_icon_directory = '/IMG/index/link-icon/'
for(let i in link){
    let a = document.createElement('a')
    a.href = link[i].link
    a.target = '_blank'
    document.getElementsByClassName('link-icon-container')[0].appendChild(a)

    let img = document.createElement('img')
    img.className = 'link-icon'
    img.src = link_icon_directory + link[i].src
    a.appendChild(img)
}