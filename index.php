<!DOCTYPE HTML>
<html class="page page-login">
	<head>
		<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>Rampage Tech Checks</title>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
		 <link href="/styles/login.css" rel="stylesheet">
	</head>
	<body>
	    <form class="form-signin">
	      <div class="text-center mb-4">
	        <img class="mb-4" src="https://www.rampagebots.co.uk/apple-touch-icon.png" alt="" width="72" height="72">
	        <h1 class="h3 mb-3 font-weight-normal">Rampage FRA Tech Checks</h1>
	        <p>Login with your Rampage account.</p>
	      </div>

	      <div class="form-label-group">
	        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
	        <label for="inputEmail">Email address</label>
	      </div>

	      <div class="form-label-group">
	        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
	        <label for="inputPassword">Password</label>
	      </div>

	      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
	      <p class="mt-5 mb-3 text-muted text-center">&copy; 2020-<?=date("Y");?></p>
	    </form>
		<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
		<script src="/js/api.js"></script>
		<script src="/js/router.js"></script>
	</body>
</html>