<?php 
// yes, this is php - I'd rather it wasn't but it had to be quick.

if(isset($_POST['submit'])){
    $to = "jsvilling@gmail.com"; 
    $from = $_POST['email'];
    $name = $_POST['name'];
	$answer = $_POST['answer'];
	$number = $_POST['number'];
    $subject = "Einladung";
    $message =  "Name: \t\t" . $name . " \n\n Antwort: \t\t" . $_POST['answer'] . "\n\n Anzahl: \t\t" . $number . "\n\n Nachricht: \t\t" . $_POST['message'];

    $headers = "From:" . $from;
    
	mail($to,$subject,$message,$headers);
	
	header('location: index.php');
}
?>