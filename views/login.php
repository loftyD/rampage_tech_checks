	    <form class="form-signin">
	      <div class="text-center mb-4">
	        <img class="mb-4" src="https://www.rampagebots.co.uk/apple-touch-icon.png" alt="" width="72" height="72">
	        <h1 class="h3 mb-3 font-weight-normal">Rampage FRA Tech Checks</h1>
	        <p>Login with your Rampage account.</p>
	      </div>

	      <div id="phase-1">
		      <div class="form-label-group">
		        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
		        <label for="inputEmail">Email address</label>
		      </div>

		      <div class="form-label-group">
		        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
		        <label for="inputPassword">Password</label>
		      </div>
		  </div>
		  <div id="phase-2" class="d-none">
		  	<div class="form-label-group">
		  		<input type="text" id="inputMfa" class="form-control" placeholder="PIN" required autofocus>
		  		<label for="inputMfa">PIN</label>
		  	</div>
		  </div>

	      <p class="mt-5 mb-3" id="login-error"></p>
	      <button class="btn btn-lg btn-primary btn-block" type="submit" id="login-btn">Sign in</button>
	      <p class="mt-5 mb-3 text-muted text-center">&copy; 2020-<?=date("Y");?></p>
	    </form>