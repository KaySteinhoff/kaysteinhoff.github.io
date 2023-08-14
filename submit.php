<?php

if(!isset($_POST['submit']))
{
	echo "Submit the form!"; 
}

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$moment = $_POST['moment'];

if(empty($firstName)||empty($lastName)||empty($email))
{
	echo "Please fill in all fields!";
	exit;
}

$email_from = "kaysteinhoff2003@gmail.com";
$email_subject = "New submition";
$email_body = "You have recieved a message from $fristName $lastName.\nMy email is: $email and my most embarissing moment:\n$moment.";

$to = "kaysteinhoff2003@gmail.com";
$header = "From: $email_from\r\n";

mail($to, $email_subject, $email_body, $header);

?>