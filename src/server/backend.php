<?php
mysql_connect("localhost", "mindmap", "wamad");
mysql_select_db("mindmap");

if(isset($_GET["all"])) {
	$query = "select * from word";
	$result = mysql_query($query) or die($query);
	
	$out = array();
	while ($res = mysql_fetch_assoc($result)) {
		$out[] = $res;
	}

	echo json_encode($out);
}
else if(isset($_GET["from"])) {
	$query = "select * from word where id > " . $_GET["from"];
	$result = mysql_query($query) or die($query);
	
	$out = array();
	while ($res = mysql_fetch_assoc($result)) {
		$out[] = $res;
	}

	echo json_encode($out);
}
else if(isset($_POST["word"])) {
	$query = "insert into word (word, x, y) values ('".$_POST["word"]."', ".$_POST["x"].", ".$_POST["y"].")";
	mysql_query($query);
  echo mysql_error();
	echo mysql_insert_id();
}
?>
