let website_directory = '/IMG/index/website/'
for(let i in web){
    let a = document.createElement('a')
    a.href = web[i].link
    document.getElementsByClassName('website-container')[0].appendChild(a)

    let img = document.createElement('img')
    img.className = 'website'
    img.src = website_directory + web[i].src
    a.appendChild(img)
}