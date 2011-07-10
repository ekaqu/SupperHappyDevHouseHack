<?php
mysql_connect("localhost", "root", "");
mysql_select_db("mindmap");

if($_GET["timestamp"]) {
	$timestamp = $_GET["timestamp"];
	$query = "select entry.text from entry, entry_map where (entry.id = entry_map.id or entry.id = entry_map.link) and entry.timestamp > $timestamp";
	$res = mysql_query($query) or die("error");

	$data = array();
	while($x = mysql_fetch_assoc($res)) {
		$data[] = $x;
	}
	echo json_encode($data);
}
else if($_GET["data"]) {	
	$data = json_decode($_GET["data"]);
	$text = $data->text;
	$query = "insert into entry (text) values ('$text');";
	mysql_query ($query) or die($query);
	$id = mysql_insert_id();
	
	$query = "insert into entry_map";
	foreach ($data->links as $link_id) {
		$query += " ($id, $link_id), ";
	}

	$query = rtrim($query, ", ");
	mysql_query($query) or die($query);
	die();
}

?>
