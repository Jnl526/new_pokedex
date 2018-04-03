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



let jan = new pokeTrainer();
let dan = new pokeTrainer();
    console.log(jan);
    console.log(dan);
	
let pokeDex = function(jan)  {
	
        for ( let i = 0; i < jan.pokemon.length; i++) {
                let pokeMon = jan.pokemon[i],
                    // create carousel
                    newDivItem = $(`<div class='carousel-item' href='#${i}'></div>`),
                    newDivCard = $(`<div class='card large'><div class="card-title"><p>${pokeMon.id}</p><h6>${pokeMon.name}</h6></div>`),
                    newDivTypes = $(`<ul class='types'></ul>`),
                    newDivContent = $(`<div class='card-content'></div>`),
                    newDivReveal = $(`<div class='card-reveal'><span class="card-title ">${pokeMon.name}<i class="material-icons right">close</i></span></div>`);
    
                  // create types list
            for ( let j = 0; j < myTrainer.pokemon[i].types.length; j++){
                  let pokeeType = $(`<li class="${myTrainer.pokemon[i].types[j]}">${jan.pokemon[i].types[j]}</li>`);
                $(newDivTypes ).append(pokeeType);
    
                // add class to types then add image in css
                $( " li:contains('fire')" ).addClass('fire');
                $( " li:contains('dark')" ).addClass('dark');	
            }
                  
                    //   pokeeName = $(``),
                      pokeeImg = $(`<div class='card-image'><img class="activator" id=${pokeMon.id} src='"  "'></div>`);
                      pokeeImgThumb = $(`<img class="thumb" id=${pokeMon.id} src='${pokeMon.image}'><p>${pokeMon.id}</p>`);
                    pokeeStats = $(`<div class='stats'><p class="stats-title">Stats</p><p class='hp'>HP: ${pokeMon.hp}"</p><p class='attack'>Attack: ${pokeMon.attack}"</p><p class='defense'>Defense: ${pokeMon.defense}"</p></div>`);
                        // pokeeAbility = $("<div class='abilities'><h6>" + pokeMon.abilities + "</h6></div>");
                       
                        // pokeeAttack = $("<div class='attack'><h6>" + pokeMon.attack + "</h6></div>");
                        // pokeeDefense = $("<div class='defense'><h6>" + pokeMon.defense + "</h6></div>");
    
            //Create individual pokemon information
            $('#pokemon_grid .carousel').append(newDivItem);
            $(newDivItem).append(newDivCard);
            $(newDivCard).append(newDivTypes);
            $(newDivReveal).append(pokeeImgThumb);
            $(newDivCard).append(pokeeImg).append(newDivContent).append(newDivReveal);
            
            $(newDivReveal).append(pokeeStats);
        
        
            $('.dropdown-trigger').dropdown();
            $('.carousel').carousel();	
            $('.modal').modal();	
            //Replace selected pokemon images
            $('#59').attr("src","images/pokemon/arcanine1.png");
            $('#228').attr("src","images/pokemon/houndour2.png");
            $('#262').attr("src","images/pokemon/mightyena.png");
            $('#452').attr("src","images/pokemon/drapion.png");
            $('#142').attr("src","images/pokemon/aerodactyl.png");
            $('#429').attr("src","images/pokemon/mismagius.png");
        }	 
    }


//Pulling data from the pokemon api by id and populating with selected data by creating a function which call the api by id

function getApokemon(id, pokeTrainer){
	return $.ajax({
	url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
	method: 'GET',
	dataType: 'JSON',
	success: function(data){
		// console.log(data);
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


if(!localStorage.getItem("myPokemonArray")){
	$.when(getApokemon(228, jan), getApokemon(59,jan), getApokemon(262, jan), getApokemon(142, dan), getApokemon(452, dan),getApokemon(429, dan)).done(function( result ) {
		console.log('IM DONE');
		localStorage.setItem("myPokemonArray", JSON.stringify(pokeTrainer.pokemon));
		pokeDex(pokeTrainer);
	});
} else {
	pokeTrainer.pokemon = JSON.parse(localStorage.getItem("myPokemonArray"));
	pokeDex(pokeTrainer);
}



//this does not add extra information to pokeData, generates a random number, when logged returns 2

// let randomPokemon = Math.floor(Math.random() * 4);
// console.log(randomPokemon);

// //undefined

// var pokemon = pokeData[Math.floor(Math.random() * pokeData.length)];
// console.log(pokemon)



//these add an extra set of pokemon to pokeData
// var randomPokemon = [getApokemon(142),getApokemon(429),getApokemon(452)/*not sure if this is the correct calls*/];
// var pickPokemon = function () {
// var pokemonRandom = randomPokemon[Math.floor(Math.random() * 4)];
// console.log(pokemonRandom);
// };


// var randomPokemon1 = [getApokemon(228),getApokemon(59),getApokemon(262)/*not sure if this is the correct calls*/];
// var pickPokemon1 = function () {
// var pokemonRandom1 = randomPokemon1[Math.floor(Math.random() * 4)];
// console.log(randomPokemon1);
// };

$(window).load(function(){
    setTimeout(function(){ $('.fr-img').fadeOut() }, 1000);
  });





    
	