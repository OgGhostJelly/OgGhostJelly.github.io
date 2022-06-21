fetch('/IMG/index/bg/bg.json')
    .then(response => response.json())
    .then(bg_count => {
        let url = 'url(/IMG/index/bg/bg' + Math.floor(Math.random() * bg_count) + '.png)'
        console.log(url)
        document.body.style.backgroundImage = url
    })