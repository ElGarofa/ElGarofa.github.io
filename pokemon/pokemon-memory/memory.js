// memory.js
const pokemons = [
  "pikachu", "bulbasaur", "charmander", "squirtle", "jigglypuff",
  "meowth", "psyduck", "snorlax", "eevee", "magikarp"
];

let selected = [];
let matched = 0;
const board = document.getElementById("game-board");

// Duplicar y mezclar los Pokémon
let cards = [...pokemons.slice(0, 6), ...pokemons.slice(0, 6)];
cards = cards.sort(() => 0.5 - Math.random());

cards.forEach(name => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = name;

  card.innerHTML = `
    <div class="front">
      <img src="https://play.pokemonshowdown.com/sprites/ani/${name}.gif" alt="${name}">
    </div>
    <div class="back">❓</div>
  `;

  card.addEventListener("click", () => {
    if (selected.length < 2 && !card.classList.contains("flipped")) {
      card.classList.add("flipped");
      selected.push(card);

      if (selected.length === 2) {
        const [first, second] = selected;

        if (first.dataset.name === second.dataset.name) {
          matched++;
          selected = [];

          if (matched === cards.length / 2) {
            setTimeout(() => alert("¡Ganaste! 🎉"), 500);
          }
        } else {
          setTimeout(() => {
            first.classList.remove("flipped");
            second.classList.remove("flipped");
            selected = [];
          }, 1000);
        }
      }
    }
  });

  board.appendChild(card);
});
