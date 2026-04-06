<link rel="stylesheet" href="style.css">

<h1 class="title">MISIONES</h1>

<div class="card-ui">

<?php

for($t=1;$t<=3;$t++){
echo "<h3>Tramo $t</h3>";

for($i=1;$i<=15;$i++){

$reward = ($t*10)+$i;

echo "
<div class='mission'>
<span>Tramo $t - Misión $i</span>

<button class='btn-main'
onclick='alert(\"+$reward coins\")'>

💰$reward

</button>
</div>
";
}
}

?>

</div>