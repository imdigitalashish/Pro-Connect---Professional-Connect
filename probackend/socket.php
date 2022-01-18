<?php
$port_number    = 1230;
$IPadress_host    = "127.0.0.1";
set_time_limit(0);
$socket_creation = socket_create(AF_INET, SOCK_STREAM, 0) or die("Unable to create socket\n");$socket_outcome = socket_bind($socket_creation, $IPadress_host , $port_number ) or die("Unable to bind to socket\n");

$socket_outcome = socket_listen($socket_creation, 3) or die("Unable to set up socket listener\n");

while(true) {
    $socketAccept = socket_accept($socket_creation) or die("Unable to accept incoming connection\n");
    $data = socket_read($socketAccept, 1024) or die("Unable to read input\n");
    $data = trim($data);
    echo "Client Message : ".$data;
    $outcome = strrev($data) . "\n";
    socket_write($socketAccept, $outcome, strlen ($outcome)) or die("Unable to  write output\n");
}

socket_close($socketAccept);
socket_close($socket_creation);
?>