<link rel="stylesheet" href="style.css">

<h1 class="title">LOGROS</h1>

<div class="card-ui">

<?php

$logros = [
["5 combates","bronce"],
["10 combates","plata"],
["20 combates","oro"],
["Racha 10","oro"],
["Sin muertes","legendario"],
["Campeón","legendario"]
];

foreach($logros as $l){

echo "
<div class='logro {$l[1]}'>
<span>🏆 {$l[0]}</span>

<div>
<button class='btn-main'>💰</button>
<button class='btn-main'>🃏</button>
<button class='btn-main'>🛒</button>
</div>

</div>
";
}

?>

</div>