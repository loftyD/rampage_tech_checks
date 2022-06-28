<!DOCTYPE HTML>
<html class="page page-<?=$view_name;?>">
	<head>
		<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>Rampage Tech Checks</title>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
		<?php if(file_exists("styles/". $view_name.".css")) { ?><link href="/styles/<?=$view_name;?>.css" rel="stylesheet"><?php } ?>
		<link href="/styles/main.css">
	</head>
	<body>
		<?=$this->render("nav");?>