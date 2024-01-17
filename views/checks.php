<?php
$checks = [
                "check_cradle" => [
                    "title" => "Cradle",
                    "description" => "Must be secure and raise wheels away from the surface. For the avoidance of doubt, a cradle is not a house brick, tool box or roll of gaffer tape."
                ],
                "check_sharp_edges" => [
                    "title" => "Sharp Edges",
                    "description" => "All sharp edges must be covered to prevent personal injury. Suitable covers and guards should be in place whenever the robot is outside of the arena."
                ],
                "check_locking_bars" => [
                    "title" => "Locking Bars",
                    "description" => "All weapons must be secured using a locking bar, quickly and easily be installed or removed without touching the weapon. Must ensure that the weapon cannot be fired during the activation process."
                ],
                "check_batteries" => [
                    "title" => "Batteries",
                    "description" => "Batteries must be adequately protected within the body shell and securely fixed to minimise the chance of being punctured or coming loose during combat."
                ],
                "check_chargers" => [
                    "title" => "Chargers",
                    "description" => "Chargers must be specifically designed for the battery chemistry. Where LiPo batteries are in use, charger must incorporate balance charging and roboteer provide LiPo Sack."
                ],
                "check_wiring" => [
                    "title" => "Wiring",
                    "description" => "All wiring and terminals must be of a suitable size and secured to prevent chaffing and shorting. All terminals should be covered to minimise the risk of electrical shorts."
                ],
                "check_pneumatic_system" => [
                    "title" => "Pneumatic System<br /><small>(Pass if not fitted)</small>",
                    "description" => "Must meet requirements of the build rules including pressure relief devices and an easily accessible dump valve that is away from weapons, drive or sharp edges."
                ],
                "check_hydraulic_system" => [
                    "title" => "Hydraulic System<br /><small>(Pass if not fitted)</small>",
                    "description" => "Must meet requirements of the build rules including a pressure relief valve. Pipe work and valves must be suitably rated for the pressure at which they are operating."
                ],
                "check_ic_engine_system" => [
                    "title" => "IC Engine System<br /><small>(Pass if not fitted)</small>",
                    "description" => "Must meet requirements of the build rules including remote shut off. Fuel tank and lines must be protected from puncture. Fuel capacity is limited to 500ml."
                ],
                "check_weaponry" => [
                    "title" => "Weaponry",
                    "description" => "Parts used in flippers, axes and the like must be tethered to prevent parts coming free in the event that the weapon fails. Discs must be built to prevent separation from the robot."
                ],
                "check_removable_link" => [
                    "title" => "Removable Link",
                    "description" => "Electrical systems must be isolated by an easily accessible, removable link that is fitted away from weapons, drive or sharp edges."
                ],
                "check_power_light" => [
                    "title" => "Power-On Light",
                    "description" => "Must have an external “Power On” light that illuminates when the removable link is plugged in. Light should be clearly visible and in contrast to the surroundings."
                ],
                "check_radio_system" => [
                    "title" => "Radio System",
                    "description" => "Must meet local requirements. Failsafes must be tested and bring robot to a neutral position on loss of signal or interference. The robot must demonstrate 'predictable operation'."
                ],
                "check_deactivation" => [
                    "title" => "Deactivation",
                    "description" => "Ensure robot can be safely deactivated. Refit locking devices and sharp edge protection.<br />Make Safe."
                ],
                "check_weight" => [
                    "title" => "Weight Check",
                    "description" => "Maximum weight includes all consumables. Maximum weight does not include safety covers or locking bars that are removed when the robot is activated."
                ]
            ];
?>
<?php foreach($checks as $check => $val) { ?>
<div class="row">
	<div class="col-2">
		<h5><?=$val['title'];?></h5>
	</div>
	<div class="col-6">
		<p><small><?=$val['description'];?></small></p>
	</div>
	<div class="col-2"><input type="radio" id="<?=$check;?>_y" name="<?=$check;?>" value="1" class="form-control metric" /></div>
	<div class="col-2"><input type="radio" id="<?=$check;?>_n" name="<?=$check;?>" value="0" class="form-control metric" /></div>
</div>
<?php } ?>

<div class="club_checks">

</div>