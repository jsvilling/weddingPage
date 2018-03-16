<?php 
// yes, this is php - I'd rather it wasn't but it had to be quick.

if(isset($_POST['submit'])){
    $to = $_POST['receiver']; 
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

<!DOCTYPE HTML>
<html>
	<head>
		<title>Chantal & Joshua</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<link rel="icon" href="favicon.ico" type="image/x-icon"/>
		<!--[if lte IE 9]><link rel="stylesheet" href="assets/css/ie9.css" /><![endif]-->
		<!--noscript><link rel="stylesheet" href="assets/css/noscript.css" /></noscript-->
	</head>
	<body>
		<div id="wrapper">
			<header id="header">
				<div class="logo">
					<span class="icon fa-heart"></span>
				</div>
				<div class="content">
					<div class="inner">
						<h1>Wir heiraten</h1>
						<p>7. Juli 2018</p>
					</div>
				</div>
				<nav>
					<ul>
						<li><a href="#us">Über uns</a></li>
						<li><a href="#info">Wann & Wo</a></li>
						<li><a href="#invitation">Einladung</a></li>
						<li><a href="#geschenke">Geschenke</a></li>
						<li><a href="#contact">Kontakt</a></li>
					</ul>
				</nav>
			</header>
			<div id="main"></div>
			<footer id="footer"></footer>
		</div>
		
		<div id="bg"></div>

		<!-- Scripts -->
		<script src="assets/js/jquery.min.js"></script>
		<script src="assets/js/skel.min.js"></script>
		<script src="assets/js/util.js"></script>
		<script src="assets/js/main.js"></script>

	</body>
</html>