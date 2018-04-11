//Pokemon constructor containing selected pokemon data

class pokeData {
    constructor(id, name, image, hp, attack, defense, abilities,types){
        this.id = id;
        this.name = name;
        this.image = image;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.abilities = abilities;
        this.types = types;
    }	 
}

//Trainer constructor takes a hash full of selected pokemon data
class pokeTrainer{
    constructor(pokemon){
        this.pokemon = [];
    }
    addPokemon(a){
		this.pokemon.push(a);
	}
}
// Create new trainer
let jan = new pokeTrainer();
    console.log(jan);

// Creating the pokedex from information collected from API

let pokeDex = function(myTrainer)  {
	
        for ( let i = 0; i < myTrainer.pokemon.length; i++) {
                let pokeMon = myTrainer.pokemon[i],
                    // create carousel
                    newDivItem = $(`<div class='carousel-item' href='#${i}'></div>`),
                     // create poke card
                    newDivCard = $(`<div id=${pokeMon.id} class='card large'><div class="card-title"><p>${pokeMon.id}</p><h6>${pokeMon.name}</h6></div><a><i class="activator fas fa-info-circle"></i></i></a>`),
                    newDivTypes = $(`<ul class='types'></ul>`),
                    newDivContent = $(`<div class='card-content'></div>`),
                    newDivReveal = $(`<div    class='card-reveal'><div class="card-title ">${pokeMon.name}<i class="material-icons right">close</i></div></div>`),
                    newDivAbility = $(`<ul class='abilities'><p>ABILITIES</p></ul>`);
                    pokeeImg = $(`<div class='card-image'><img  id=${pokeMon.id} src='"  "'></div>`);
                    pokeeImgThumb = $(`<img class="thumb" id=${pokeMon.id} src='${pokeMon.image}'><p class="num">${pokeMon.id}</p>`);
                    pokeeStats = $(`<div class='stats'><p class="stats-title">Stats</p><ul><li class='hp'>${pokeMon.hp}<br>HP</li><li class='attack'> ${pokeMon.attack}<br>A</p><li class='defense'> ${pokeMon.defense}<br>D</li></ul></div>`);
    
                  // create types list

            for ( let j = 0; j < myTrainer.pokemon[i].types.length; j++){
                  let pokeeType = $(`<li class="${myTrainer.pokemon[i].types[j]}">${myTrainer.pokemon[i].types[j]}</li>`);
                $(newDivTypes ).append(pokeeType);
                	
            }
                    // create abilities list

            for ( let k = 0; k < myTrainer.pokemon[i].abilities.length; k++){
                let pokeeAbility = $(`<li class="${myTrainer.pokemon[i].abilities[k]}">${myTrainer.pokemon[i].abilities[k]}</li>`);
                $(newDivAbility).append(pokeeAbility);
                  
          }  
                    
            //Create individual pokemon information
            $('#pokemon_grid .carousel ').append(newDivItem);
            $(newDivItem).append(newDivCard);
            $(newDivCard).append(newDivTypes);
            $(newDivReveal).append(pokeeImgThumb);
            $(newDivCard).append(pokeeImg).append(newDivContent).append(newDivReveal);
            $(newDivReveal).append(pokeeStats).append(newDivAbility);
        
            // Initializing materialize js
            $('.carousel').carousel();	
            // $('.dropdown-trigger').dropdown();	
            
            // Replace selected pokemon images
            $('#59, #59.thumb').attr("src","images/pokemon/arcanine1.png");
            $('#228, #228.thumb').attr("src","images/pokemon/houndour2.png");
            $('#262, #262.thumb').attr("src","images/pokemon/mightyena.png");  
        }	 
    }

//Pulling data from the pokemon api by id and populating with selected data by creating a function which call the api by id

function getApokemon(id, pokeTrainer){
	return $.ajax({
	url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
	method: 'GET',
	dataType: 'JSON',
	success: function(data){
		console.log(data);
		let id = data.id,
			name = data.name,
			image = data.sprites.front_default,
			defense = data.stats[3].base_stat,
			attack = data.stats[4].base_stat,
			hp = data.stats[5].base_stat,
			abilities = [],
			types = [];

		for ( let i = 0;  i < data.abilities.length; i++) {
			 abilities.push(data.abilities[i].ability.name);	
		}   

		for ( let i = 0;  i < data.types.length; i++) {
			 types.push( data.types[i].type.name);
		}  
		
		 let poke = new pokeData(id,name,image,hp,attack,defense,abilities,types); 
         pokeTrainer.addPokemon(poke);
},
        error: function(error){
          console.log(error);
        }
})
};

// Get specfic Pokemon to individual trainers
$.when(getApokemon(228, jan), getApokemon(59,jan), getApokemon(262, jan)).done(function( data ) {
    console.log('IM DONE');
    pokeDex(jan);
    
});

// Loading Page Animation Fade
$(window).load(function(){
    setTimeout(function(){ $('#loading_page').delay(3500).fadeOut() }, 1000);
  });

// Search
$('form').on('submit',function(e){
    e.preventDefault();
    let findName = $('input[type=search]').val();
});