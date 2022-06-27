<?php

class MyEngine extends \flight\Engine {
	
	public function render($file) {
		$data = [];
		$file_parts = explode("/", $file);
		$nm = $file_parts[count($file_parts)-1];
		$data['view_name'] = str_replace("/","-",strtolower($nm));
		parent::render("head", $data);
		parent::render($file);
		parent::render("foot", $data);
	}

	public function renderParent($file, $data = null) {
		return parent::render($file, $data);
	}

}