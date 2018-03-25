<?php 
// yes, this is php - I'd rather it wasn't but it had to be quick.

if(isset($_POST['submit'])){
	try {
		$redirectTarget = 'location: .#thankyou';
		$to = $_POST['receiver']; 
		$from = $_POST['email'];
		$name = $_POST['name'];
		$answer = $_POST['answer'];
		$number = $_POST['number'];
		$subject = "Hochzeit Chantal und Joshua";
		$message = $_POST['message'];
		$headers = "From:" . $from;
		if ($answer != null && strlen($answer) > 0) {
			$message =  " Name: " . $name . " \n\n Antwort: " . $answer . "\n\n Anzahl: " . $number . "\n\n Nachricht: " . $message;
		} else {
			$message =  " Name: " . $name . "\n\n Nachricht: " . $message;
		}
		mail($to,$subject,$message,$headers);
	} catch (Exception $e) {
		$redirectTarget = 'location: .#opps';
	}
	header($redirectTarget);
}
?>