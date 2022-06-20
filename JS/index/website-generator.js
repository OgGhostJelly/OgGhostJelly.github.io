let website_directory = '/IMG/index/website/'
let website_container = document.getElementsByClassName('website-container')[0]
for(let i in web){
    if(web[i].break==true){
        let br = document.createElement('p')
        br.setAttribute('class','break')
        website_container.appendChild(br)
        
        continue;
    }

    let a = document.createElement('a')
    a.href = web[i].link
    website_container.appendChild(a)

    let img = document.createElement('img')
    img.className = 'website'
    img.setAttribute('title-text',web[i].title_text)
    img.src = website_directory + web[i].src
    a.appendChild(img)
}