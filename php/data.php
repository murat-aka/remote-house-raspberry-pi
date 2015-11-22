<?php
include("phpsqlajax_dbinfo.php");

$con = mysql_connect($db_host, $db_user, $db_password);
mysql_select_db($db_database);
if (!$con) {
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("demo", $con);

$sth = mysql_query("SELECT week FROM widget_prices");

$rows = array();
$rows['name'] = 'week';
while($r = mysql_fetch_array($sth)) {
    $rows['data'][] = $r['week'];
}

$sth = mysql_query("SELECT price FROM widget_prices");
$rows1 = array();
$rows1['name'] = 'price';
while($rr = mysql_fetch_assoc($sth)) {
    $rows1['data'][] = $rr['price'];
}

$result = array();
array_push($result,$rows);
array_push($result,$rows1);

print json_encode($result, JSON_NUMERIC_CHECK);


mysql_close($con);
?> 
