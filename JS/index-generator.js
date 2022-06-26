// init main elements
let html = document.documentElement
html.lang = 'en'
if(!document.head){
    var head = document.createElement('head')
    html.appendChild(head)
} else { var head = document.head }
if(!document.body){
    var body = document.createElement('body')
    html.appendChild(body)
} else { var body = document.getElementsByTagName('body')[0] }
//init head
function createElement(tag, attr, attr_node){
    let element = document.createElement(tag)
    for(i in attr){
        let child = attr[i]
        element.setAttribute(child[0], child[1])
    }
    for(i in attr_node){
        let child = attr_node[i]
        element[child[0]] = child[1]
    }
    return element
}
let drag
function dragElementLoaded(){
    dragElement(drag)
}
function DetectHandHeld(bool){
    //init head
    head.appendChild(createElement('script', [['src', '/JS/index/background.js']]))
    head.appendChild(createElement('link', [['rel', 'stylesheet'],['type','text/css'],['href',main.style_directory]]))
    head.appendChild(createElement('link', [['rel', 'stylesheet'],['type','text/css'],['href',bool ? main.handheld_index_style_directory : main.pc_index_style_directory]]))
    head.appendChild(createElement('link', [['rel', 'shortcut icon'],['type','image/x-icon'],['href',main.favicon]]))
    head.appendChild(createElement('meta', [['name', 'viewport'],['content','width=device-width, initial-scale=1.0']]))
    head.appendChild(createElement('meta', [['property', 'og:title'],['content',main.title]]))
    head.appendChild(createElement('meta', [['property', 'og:description'],['content',main.description]]))
    head.appendChild(createElement('meta', [['property', 'og:image'],['content',main.favicon]]))
    head.appendChild(createElement('title', [], [['innerHTML',main.title]]))
    // init body
    //generate title
    let h1 = createElement('h1', [['class','main-header']])
    let title
    !bool ? title = createElement('t', [], [['innerHTML',main.header]]) : null
    !bool ? h1.appendChild(title) : null
    bool ? h1.innerHTML = main.header : null
    body.appendChild(h1)
    //link-icon and website generator
    let div
    div = createElement('div', [['class','link-icon-container']])
    bool ? body.appendChild(document.createElement('br')) : null
    bool ? body.appendChild(div) : h1.appendChild(div)
    for(i in main.link){
        let child = main.link[i]
        let new_tab
        child.new_tab ? new_tab = '_blank' : new_tab = ''
        let a = createElement('a',[['href',child.link],['target',new_tab]])
        a.appendChild(createElement('img',[['class','link-icon'],['src',main.link_icon_directory + child.src]]))
        div.appendChild(a)
    }
    div = createElement('div', [['class','website-container']])
    for(i in main.web){
        let child = main.web[i]
        if(child){
            let a = createElement('a',[['href',child.link],['title-text',child.title_text]])
            a.appendChild(createElement('img',[['class','website'],['src',main.website_directory + child.src]]))
            div.appendChild(a)
        } else {
            !bool ? div.appendChild(document.createElement('br')) : null
        }
    }
    body.appendChild(div)
    //title change
    let title_Arr = document.querySelectorAll('[title-text]')
    for(let i=0;i<title_Arr.length;i++){
        title_Arr[i].addEventListener('mouseover',function(){
            let title_text = this.getAttribute('title-text').toString()
            title.innerHTML = title_text
        })
    }
    div.addEventListener('mouseleave',function(){
        title.innerHTML = main.header
    })
    //drag
    if(!bool && main.drag){
        drag = createElement('img',[['class','drag'],['src',main.favicon]])
        body.appendChild(drag)
        body.appendChild(createElement('script', [['src', '/JS/dragabble.js']]))
    }
}
head.appendChild(createElement('script', [['src', '/JS/handheld-detector.js']]))