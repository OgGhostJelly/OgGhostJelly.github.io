fetch(main.bg.size)
    .then(response => response.json())
    .then(bg_count => {
        let url = 'url('+ main.bg.directory + main.bg.file_name + Math.floor(Math.random() * bg_count) + '.'+main.bg.file_type+')'
        document.body.style.backgroundImage = url
    })