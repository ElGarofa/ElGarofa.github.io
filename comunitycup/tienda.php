<link rel="stylesheet" href="style.css">

<h1 class="title">TIENDA</h1>

<div class="card-ui">

<?php

$items = [
["Pokemon Random",80],
["Pokemon Fuerte",120],
["Legendario",300],
["Captura Extra",60],
["Captura Ilimitada",200],
["Revive",100],
["Quitar Muerte",120],
["Segunda Vida",150],
["Boost Ataque",140],
["Boost Defensa",140],
["XP x2",180],
["Velocidad+",120]
];

foreach($items as $i){

echo "
<div class='shopItem'>
<span>{$i[0]} 💰{$i[1]}</span>
<button class='btn-main'>Comprar</button>
</div>
";
}

?>

</div><link rel="stylesheet" href="style.css">

<h1 class="title">TIENDA</h1>

<div class="card-ui">

<?php

$items = [
["Pokemon Random",80],
["Pokemon Fuerte",120],
["Legendario",300],
["Captura Extra",60],
["Captura Ilimitada",200],
["Revive",100],
["Quitar Muerte",120],
["Segunda Vida",150],
["Boost Ataque",140],
["Boost Defensa",140],
["XP x2",180],
["Velocidad+",120]
];

foreach($items as $i){

echo "
<div class='shopItem'>
<span>{$i[0]} 💰{$i[1]}</span>
<button class='btn-main'>Comprar</button>
</div>
";
}

?>

</div>