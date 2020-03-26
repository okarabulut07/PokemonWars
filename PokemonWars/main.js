var scores, roundScore, activePlayer, gamePlaying, previousAttack;


init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var attack = Math.floor(Math.random() * 6) + 1;

        //3. Update the round score IF the rolled number was NOT a 1
        if(attack === 6 && previousAttack === 6){
            //Player loose his/her points.
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (attack !== 1) {
            //Add score
            roundScore += attack;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
        
        previousAttack = attack;
    }    
});


function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    var pokemons = ["bulbasaur", "butterfree", "squirtle", "charmander", "haunter"];
	var item = pokemons[Math.floor(Math.random() * pokemons.length)]

	var img = document.createElement("img");
	img.src = item + ".png";
	var src = document.getElementById("enemyPokemon");
	src.appendChild(img);

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-1').textContent = item;
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', function(){
	location.reload();
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

}

