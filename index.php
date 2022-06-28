<?php
include("vendor/autoload.php");
include("inc/MyEngine.php");
$app = new MyEngine();


$app->route("/", function() use($app) {
	$app->render("home");
});

$app->route("/login", function() use($app) {
	$app->render("login");
});

$app->route("/logout", function() use($app) {
	$app->render("logout");
});

$app->route("/event", function() use($app) {
	$app->render("event");
});

$app->start();

?>