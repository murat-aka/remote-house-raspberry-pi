
<?php

include("phpsqlajax_dbinfo.php");

$db = mysql_connect($db_host, $db_user, $db_password);
mysql_select_db($db_database);

/**
 * Used to produce a Google Chart for the weekly average prices of widgets
 */

    //Get the data from the database
    $sqlQuery = "SELECT week, price FROM widget_prices";
    $sqlResult = mysql_query($sqlQuery);
    

$rows = array();
while($r = mysql_fetch_array($sqlResult)) {
    $row[0] = $r[0];
    $row[1] = $r[1];
    array_push($rows,$row);
}

//Display the JSOn data

$string = json_encode($rows);
echo $string;

?>







