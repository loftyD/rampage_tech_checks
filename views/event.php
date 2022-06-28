<div class="container">
	<ul class="nav nav-tabs" id="eventTab" role="tablist">
	  <li class="nav-item">
	    <a class="nav-link active" id="event-tab" data-toggle="tab" href="#event" role="tab" aria-controls="event" aria-selected="true">Event</a>
	  </li>
	  <li class="nav-item">
	    <a class="nav-link disabled" id="robot-tab" data-toggle="tab" href="#robot" role="tab" aria-controls="robot" aria-selected="false">Robot</a>
	  </li>
	  <li class="nav-item">
	    <a class="nav-link disabled" id="checks-tab" data-toggle="tab" href="#checks" role="tab" aria-controls="checks" aria-selected="false">Checks</a>
	  </li>
	</ul>
	<div class="tab-content" id="eventTabContent">
	  <div class="tab-pane fade show active" id="event" role="tabpanel" aria-labelledby="event-tab"><?=$this->render("event-select");?></div>
	  <div class="tab-pane fade" id="robot" role="tabpanel" aria-labelledby="robot-tab"><?=$this->render("robot-select");?></div>
	  <div class="tab-pane fade" id="checks" role="tabpanel" aria-labelledby="checks-tab"><?=$this->render("checks-select"); ?></div>
	</div>
</div>