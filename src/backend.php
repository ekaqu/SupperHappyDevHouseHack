<?php
mysql_connect("localhost", "root", "");
mysql_select_db("test");

if($_GET["all"]) {
	$query = "select * from word";
	$result = mysql_query($query) or die($query);
	
	$out = array();
	while ($res = mysql_fetch_assoc($result)) {
		$out[] = $res;
	}

	echo json_encode($out);
}
else if($_POST["word"]) {
	$query = "insert into word (name, x, y) values ('".$_POST["word"]."', ".$_POST["x"].", ".$_POST["y"].")";
	mysql_query($query);
	echo mysql_insert_id();;
}
?>
