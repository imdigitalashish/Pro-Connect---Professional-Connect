<?php
$port_number    = 1230;
$IPadress_host    = "127.0.0.1";
$hello_msg= "This is server";
echo "Hitting the server :".$hello_msg;
$socket_creation = socket_create(AF_INET, SOCK_STREAM, 0) or die("Unable to create connection with socket\n");
$server_connect = socket_connect($socket_creation, $IPadress_host , $port_number) or die("Unable to create connection with server\n");
socket_write($socket_creation, $hello_msg, strlen($hello_msg)) or die("Unable to send data to the  server\n");
$server_connect = socket_read ($socket_creation, 1024) or die("Unable to read response from the server\n");
echo "Message from the server :".$server_connect;
socket_close($socket_creation);
?>