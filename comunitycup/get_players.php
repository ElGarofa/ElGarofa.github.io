<?php
include "db.php";

$res = $conn->query("SELECT * FROM players");

$players = [];

while($row = $res->fetch_assoc()){
$players[] = $row;
}

echo json_encode($players);
?>