<link rel="stylesheet" href="style.css">

<h1 class="title">COMODINES</h1>

<div class="card-grid">

<?php

for($i=1;$i<=40;$i++){

echo "
<div class='card-item'>
<img src='https://picsum.photos/200?random=$i'>
<h5>Carta $i</h5>
<p>Otorga ventaja estratégica en combate</p>
<p>💰 ".(50+$i)."</p>
</div>
";
}

?>

</div>