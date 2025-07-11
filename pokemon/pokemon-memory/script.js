const board = document.getElementById('game-board');

const pokemons = [
  'bulbasaur', 'charmander', 'squirtle', 'pikachu',
  'eevee', 'meowth', 'psyduck', 'snorlax'
];
let cards = [...pokemons, ...pokemons]; // duplicamos para pares
cards.sort(() => 0.5 - Math.random());

let flippedCards = [];
let matched = [];

cards.forEach(name => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const img = document.createElement('img');
  img.src = `sprites/${name}.png`;
  card.appendChild(img);

  card.addEventListener('click', () => {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
      card.classList.add('flipped');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        const [first, second] = flippedCards;
        if (first.dataset.name === second.dataset.name) {
          matched.push(first, second);
          flippedCards = [];
        } else {
          setTimeout(() => {
            first.classList.remove('flipped');
            second.classList.remove('flipped');
            flippedCards = [];
          }, 800);
        }
      }
    }
  });

  board.appendChild(card);
});
