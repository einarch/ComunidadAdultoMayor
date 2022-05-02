<?php
	include 'bd/BD.php';
    $conn = acceder();
	
	$descripcion= "La vida es bella solo es necesario sonreir y gozarlo cada momento en especial junto atodos los que se quiere";
	
	$fechahora= "2022-01-15 12:05:50";
	$nombre= "Maria Jiménez Blanco";
	$id= "15";	

	

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO publicaciones (id, nombre, fechahora, descripcion)

VALUES ('$id', '$nombre', '$fechahora', '$descripcion')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
	
//fuente https://www.w3schools.com/php/php_mysql_insert.asp
?>