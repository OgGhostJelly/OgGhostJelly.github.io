recipe = {};
var decimal;

const params = new URLSearchParams(document.location.search);
fetch("/JSON/cooking/" + params.get("recipe") + ".json")
  .then(response => response.json())
  .then(json => { recipe = json ; load(recipe) } )
  .catch(error => {
    alert('Failed to load recipe, Error Message:\n' + error + '\n\nTry Reloading...')
    document.getElementById('h1').innerHTML = "Data Failed To Load :(<br>"
});

function load(recipe) {
  //load template
  document.getElementById("title").innerHTML = recipe.title;
  document.getElementById("desc").innerHTML = recipe.desc;
  document.getElementById("input").value = "1";
  document.getElementById("size").innerHTML = "1 Batch = " + recipe.size + " " + recipe.sizeunitb + " " + recipe.title + " " + recipe.sizeunit;
  //load favicon
  let favicon = document.createElement('link');
  favicon.setAttribute('rel','shortcut icon');
  favicon.setAttribute('href',"/IMG/" + recipe.img);
  document.querySelector('head').appendChild(favicon);
  //load img
  let image = document.createElement('img');
  image.setAttribute('src',"/IMG/" + recipe.img);
  image.setAttribute('class','one');
  document.getElementById("img").appendChild(image);
  //load recipe
  var i = 0
  do {
    let name = document.createElement('r');
    name.innerHTML = recipe.ingredients[i].name + " - "
    name.setAttribute('class','two')
    document.getElementById("recipe").appendChild(name);

    let quantity = document.createElement('r');
    quantity.setAttribute('id', recipe.ingredients[i].name)
    quantity.innerHTML = recipe.ingredients[i].quantity
    quantity.setAttribute('class','two')
    document.getElementById("recipe").appendChild(quantity);

    let unit = document.createElement('r');
    unit.innerHTML = recipe.ingredients[i].unit
    unit.setAttribute('class','two')
    document.getElementById("recipe").appendChild(unit);

    if ( !!recipe.ingredients[i].select ) {
      var whitespace = document.createElement('whitespace')
      whitespace.innerHTML = '&nbsp&nbsp&nbsp&nbsp'
      document.getElementById("recipe").appendChild(whitespace);
      var select = document.createElement('select')
      select.setAttribute('id','select' + i)
      select.setAttribute('class','two')
      select.setAttribute('selected','Medium')
      document.getElementById("recipe").appendChild(select);
      //loop
      var seli = 0
      do {
        var options = document.createElement('option')
        options.innerHTML = recipe.ingredients[i].select[seli].name
        if ( recipe.ingredients[i].select[seli].default == 'true' ) {
          options.setAttribute('selected','')
        }
        document.getElementById('select' + i).appendChild(options);

        seli = seli + 1
      } while ( seli < recipe.ingredients[i].select.length )
    }

    document.getElementById("recipe").appendChild(document.createElement('br'));
    i = i + 1
  } while (i < recipe.ingredients.length)
  //load dir
  var i = 0;
  do {
    let direction = document.createElement("p");
    direction.setAttribute('class','three text');
    let footer = document.createElement("p");
    footer.setAttribute('class','three footer');

    direction.innerHTML = i + 1 + '. ' + recipe.dir[i].desc
    document.getElementById('dir').appendChild(direction)

    if (!!recipe.dir[i].footer) {
      footer.innerHTML = recipe.dir[i].footer
      document.getElementById('dir').appendChild(footer)
    }
    i = i + 1;
  } while (i < recipe.dir.length);
  //start loop
  window.requestAnimationFrame(loop);
}
//update loop
function loop() {
  var userinput = document.getElementById('input').value;
  document.getElementById("size").innerHTML = (userinput * 1) + " Batch = " + recipe.size * userinput + " " + recipe.sizeunitb + " " + recipe.title + " " + recipe.sizeunit;
  
  var i = 0;
  do {
    var select = 1
    if (!!recipe.ingredients[i].select) {
      select = recipe.ingredients[i].select[document.getElementById('select' + i).selectedIndex].change
    }
    var displaytext = (userinput * recipe.ingredients[i].quantity) * select
    //fraction converter
    if ( !!(displaytext % 1) ) {
      var decimal = Math.round((displaytext % 1)*1000)/1000
      displaytext = displaytext - decimal
      switch ( decimal ) {
        case 0.9:
          decimal = '9/10'
          break;
        case 0.75:
          decimal = '3/4'
          break;
        case 0.5:
          decimal = '1/2'
          break;
        case 0.25:
          decimal = '1/4'
          break;
        case 0.33:
          decimal = '1/3'
          break;
        case 0.125:
          decimal = '1/8'
          break;
        case 0.1:
          decimal = '1/10'
          break;
      }
      if ( !!displaytext ) {
        displaytext = displaytext + ' ' + '<r class="fraction">' + decimal + '</r>'
      } else {
        displaytext = decimal
      }
    }
    document.getElementById(recipe.ingredients[i].name).innerHTML = displaytext;

    i = i + 1;
  } while (i < recipe.ingredients.length);
  window.requestAnimationFrame(loop);
}