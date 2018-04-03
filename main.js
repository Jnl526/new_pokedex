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
let newTrainer = new pokeTrainer(getApokemon(228), getApokemon(59), getApokemon(262));
let newTrainer1 = new pokeTrainer(getApokemon(142), getApokemon(429), getApokemon(452));
	console.log(newTrainer);
	console.log(newTrainer1);


    let pokeDex = function(myTrainer)  {
	
        for ( let i = 0; i < myTrainer.pokemon.length; i++) {
                let pokeMon = myTrainer.pokemon[i],
                    // create carousel
                    newDivItem = $(`<div class='carousel-item' href='#${i}'></div>`),
                    newDivCard = $(`<div class='card large'>${pokeMon.id}</div>`),
                    newDivTypes = $(`<ul class='types'></ul>`),
                    newDivContent = $(`<div class='card-content'></div>`),
                    newDivReveal = $(`<div class='card-reveal'><span class="card-title ">${pokeMon.name}<i class="material-icons right">close</i></span></div>`);;
    
                  // create types list
            for ( let j = 0; j < myTrainer.pokemon[i].types.length; j++){
                  let pokeeType = $(`<li class="${myTrainer.pokemon[i].types[j]}">${myTrainer.pokemon[i].types[j]}</li>`);
                $(newDivTypes ).append(pokeeType);
    
                // add class to types then add image in css
                $( " li:contains('fire')" ).addClass('fire');
                $( " li:contains('dark')" ).addClass('dark');	
            }
                  
                      pokeeName = $(`<h5 class="card-title">${pokeMon.name}</h5>`),
                      pokeeImg = $(`<div class='card-image'><img class="activator" id=${pokeMon.id} src='"  "'></div>`);
                      
                        // pokeeType = $("<div class='types'><h6>" + pokeMon.types + "</h6></div>");
                        // pokeeAbility = $("<div class='abilities'><h6>" + pokeMon.abilities + "</h6></div>");
                        // pokeeHp = $("<div class='hp'><h6>" + pokeMon.hp + "</h6></div>");
                        // pokeeAttack = $("<div class='attack'><h6>" + pokeMon.attack + "</h6></div>");
                        // pokeeDefense = $("<div class='defense'><h6>" + pokeMon.defense + "</h6></div>");
    
            //Create individual pokemon information
            $('#pokemon_grid .carousel').append(newDivItem);
            $(newDivItem).append(newDivCard);
            $(newDivCard).append(newDivTypes);
            $(newDivCard).append(pokeeImg).append(newDivContent).append(newDivReveal);;
            $(newDivContent).append(pokeeName);
        
        
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

function getApokemon(id){
	return $.ajax({
	url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
	method: 'GET',
	dataType: 'JSON',
	success: function(data){
		// console.log(data);
		let id = data.id,
			name = data.name,
			image = "",
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
		
		let poke = new pokeData(id, name, image, hp,attack, defense, abilities,types);  
		
		newTrainer.addPokemon(poke);
		newTrainer1.addPokemon(poke);
		//  console.log(poke);

},
        error: function(error){
          console.log(error);
        }
})
};


if(!localStorage.getItem("myPokemonArray")){
	$.when(getApokemon(228), getApokemon(59), getApokemon(262)).done(function( result ) {
		console.log('IM DONE');
		localStorage.setItem("myPokemonArray", JSON.stringify(newTrainer.pokemon));
		pokeDex(newTrainer);
	});
} else {
	newTrainer.pokemon = JSON.parse(localStorage.getItem("myPokemonArray"));
	pokeDex(newTrainer);
}









    
	