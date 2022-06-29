<div class="container">
	<h1>Technical Checks</h1>
	<p>To be completed by a "Tech Checker"</p>
	<form>
    	<div class="main_checks">
    		<hr />
    		<div class="row">
    			<div class="col-6">
    				<h4><strong>Driver Name</strong></h4>
    			</div>
    			<div class="col-6">
    				<input type="text" name="driver_name" id="driver_name" class="form-control" />
    			</div>
    		</div>
    		<div class="row">
    			<div class="col-2">
    				<h4><strong>CHECKS</strong></h4>
    			</div>
    			<div class="col-6"></div>
    			<div class="col-2"><h4><strong>PASS</strong></h4></div>
    			<div class="col-2"><h4><strong>FAIL</strong></h4></div>
    		</div>
    		<?php // checks here ?>
    		<?php $this->render("checks"); ?>
    	<hr />
    	<div class="row">
    		<div class="col-4">
    			<h4><strong>PASS</strong></h4>
    		</div>
    		<div class="col-4">
    			<h4><strong>FAIL</strong></h4>
    		</div>
    		<div class="col-4">
    			<h4><strong>COMMENTS</strong></h4>
    		</div>
    	</div>
    	<div class="row">
    		<div class="col-4">
    			<input type="radio" name="result" disabled="disabled" id="pass" value="p" class="form-control" />
    		</div>
    		<div class="col-4">
    			<input type="radio" name="result" disabled="disabled" id="fail" value="f" class="form-control" />
    		</div>
    		<div class="col-4">
    			<textarea class="form-control" id="comments"></textarea>
    		</div>
    	</div>
    	<div class="row">
    		<div class="col-8">
    			<p>A robot will not be allowed to compete unless all sections are marked as a pass.</p>
    		</div>
    		<div class="col-4"></div>
    	</div>
    	<div class="row">
    		<div class="col-12">
    			<h4 class="text-center"><strong>Inspected By <span class="current-user"></span></strong></h4>
    		</div>
    	</div>

    	<hr />
    	</div>
    	<a href="javascript:void(0)" id="checks-save" class="disabled btn btn-primary btn-block d-none">Submit Tech Check</a>
	</form>
</div>