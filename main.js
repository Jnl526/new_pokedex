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
let newTrainer = new pokeTrainer();
console.log(newTrainer);


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