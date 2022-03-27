/*
-todo list-
1. shop items can have multiple ores as price
2. shop desc
*/
var minespeed = 1
var shopitems = [
    { name: 'Pickaxes +1 CPM', cost: { amount: 50, resotype: 'rock', }, desc: 'ew', run: function() {
            minespeed += 1
            console.log(minespeed)
        } 
    },
    { name: 'Spicky boi Pickaxes +2 CPM', cost: { amount: 100, resotype: 'rock', }, desc: 'ew', run: function() {
            minespeed += 2
            console.log(minespeed)
        } 
    },
    { name: 'Mechanical Pickaxes +2.5 CPM', cost: { amount: 100, resotype: 'coal', }, desc: 'ew', run: function() {
        minespeed += 2.5
        console.log(minespeed)
    } 
},
]
var planet = [0,
    { name: 'Earth', reso: 1000, resomax: 1000, img:'earth.png', resotype: function(planetresource) {
            if (planetresource<501) {
                return('iron')
            }
            if (planetresource<751) {
                return('coal')
            }
            if (planetresource<1001) {
                return('rock')
            }
        }
    },
    { name: 'Grën', reso: 500, resomax: 500, img:'gren.png', resotype: function(planetresource) {
            if (planetresource<51) {
                return('green')
            }
            if (planetresource<501) {
                return('coal')
            }
        }
    },
    { name: 'Terra', reso: 1200, resomax: 1200, img:'terra.png', resotype: function(planetresource) {
            if (planetresource<501) {
                return('platinum')
            }
            if (planetresource<1001) {
                return('iron')
            }
            if (planetresource<1201) {
                return('rock')
            }
        }
    }
]
var reso = {
    rock : {  amount:0, img:'rock.jpeg', show:true },
    coal : {  amount:0, img:'coal.jpeg', show:true },
    iron : {  amount:0, img:'iron.jpeg', show:true },
    green : {  amount:0, img:'platinum.jpeg', show:false },
    platinum : {  amount:0, img:'platinum.jpeg', show:false },
}

function init() {
    document.getElementById('play').remove()

    document.getElementById('title').setAttribute('align','')

    var button = document.createElement('button')
    button.innerHTML = 'Mine'
    button.setAttribute('onclick','mine()')
    document.getElementById('game').appendChild(button)
    document.getElementById('game').appendChild(document.createElement('br'))

    var resodisplay = document.createElement('ore')
    resodisplay.setAttribute('id','reso')
    document.getElementById('game').appendChild(resodisplay)
    document.getElementById('game').appendChild(document.createElement('br'))

    var imgplanet = document.createElement('img')
    imgplanet.setAttribute('id','planet')
    imgplanet.setAttribute('style','height: 200px;width: 200px;')
    document.getElementById('game').appendChild(imgplanet)

    var div = document.createElement('div')
    div.setAttribute('id','resodisplay')
    document.getElementById('game').appendChild(div)

    document.getElementById('game').appendChild(document.createElement('br'))
    document.getElementById('game').appendChild(document.createElement('br'))
    //temporary
    var temptext = document.createElement('t')
    temptext.innerHTML = 'shop is in progress :/'
    document.getElementById('game').appendChild(temptext)
    //temporary

    var div = document.createElement('div')
    div.setAttribute('id','shop')
    document.getElementById('game').appendChild(div)
    loadshop()

    window.requestAnimationFrame(loop)
}

function loop() {
    document.getElementById('reso').innerHTML = planet[[planet[0]+1]].name+': '+planet[[planet[0]+1]].reso+'/'+planet[[planet[0]+1]].resomax
    document.getElementById('planet').setAttribute('src','/IMG/'+planet[[planet[0]+1]].img)
    document.getElementById('resodisplay').innerHTML = ''
    for (let i=0;i<Object.keys(reso).length;i++) {
        if (reso[Object.keys(reso)[i]].show) {
            var resodisplay = document.createElement('img')
            resodisplay.setAttribute('src','/IMG/' + reso[Object.keys(reso)[i]].img)
            document.getElementById('resodisplay').appendChild(resodisplay)
            var resodisplay = document.createElement('ore')
            resodisplay.innerHTML = ' ' + reso[Object.keys(reso)[i]].amount
            document.getElementById('resodisplay').appendChild(resodisplay)
            document.getElementById('resodisplay').appendChild(document.createElement('br'))
        }
    }

    window.requestAnimationFrame(loop)
}

function mine() {
    for (let i=0;i<minespeed;i++) {
        if ( planet[0+1].reso > 0 ) {
            reso[planet[[planet[0]+1]].resotype(planet[[planet[0]+1]].reso)].amount += 1
            planet[[planet[0]+1]].reso -= 1
        }
    }
}

function buy(i) {
    if (reso[shopitems[i].cost.resotype].amount>(shopitems[i].cost.amount-1)) {
        reso[shopitems[i].cost.resotype].amount -= shopitems[i].cost.amount
        shopitems[i].run()
        shopitems.splice(i, 1)
        loadshop()
    }
}

function loadshop() {
    document.getElementById('shop').innerHTML = ''
    for (let i=0;i<shopitems.length;i++) {
        if (i>4) break;

        var shopdiv = document.createElement('div')
        shopdiv.setAttribute('id','shop'+i)
        shopdiv.setAttribute('class','shop')
        shopdiv.addEventListener('click', function() {
                buy(i)
            }
        )
        document.getElementById('shop').appendChild(shopdiv)
        var shopdisplay = document.getElementById('shop'+i)

        var shopnamedisplay = document.createElement('shop')
        shopnamedisplay.innerHTML = shopitems[i].name+'&nbsp&nbsp&nbsp&nbsp'
        shopdisplay.appendChild(shopnamedisplay)

        var shopimgdisplay = document.createElement('img')
        shopimgdisplay.setAttribute('src','/IMG/'+reso[shopitems[i].cost.resotype].img)
        shopdisplay.appendChild(shopimgdisplay)

        var shopcostdisplay = document.createElement('shop')
        shopcostdisplay.innerHTML = ' '+shopitems[i].cost.amount
        shopdisplay.appendChild(shopcostdisplay)

        shopdisplay.appendChild(document.createElement('br'))
    }
}