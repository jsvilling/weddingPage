<?php 
// yes this is php - I'd rather it wasn't but it had to be quick.
if(isset($_POST['submit'])){
    $to = "jsvilling@gmail.com"; 
    $from = $_POST['email'];
    $name = $_POST['name'];
	$answer = $_POST['answer'];
    $subject = "Einladung";
    $subject2 = $_POST['name'];
    $message =  $name . " wrote the following:" . "\n\n" . $_POST['answer'];

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
    
	mail($to,$subject,$message,$headers);
	// mail($from,$subject2,$message2,$headers2); // copy to sender
    echo "Mail Sent. Thank you " . $name . ", we will contact you shortly.";
    }
?>