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

$app->route("/c/@event/@robot", function($event, $robot) use($app) {
	$app->render("redirect", ["event" => $event, "robot" => $robot]);
});

$app->start();

?>