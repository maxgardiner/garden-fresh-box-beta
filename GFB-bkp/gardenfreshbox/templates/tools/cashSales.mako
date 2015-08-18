<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Garden Fresh Box">
	<meta name="author" content="Fruitful Community Solutions">

	<title>Garden Fresh Box</title>

	<!-- Bootstrap Core CSS -->
	<link href="../css/bootstrap.min.css" rel="stylesheet">
	<!-- Custom CSS -->
	<link href="../css/custom.css" rel="stylesheet">


</head>

<body>

	<!-- jQuery -->
	<script src="../js/jquery.js"></script>
	<script src="../js/bootstrap.min.js"></script>
	<script src="../js/helper.js"></script>
	<script src="../js/cashSales.js"></script>

	<div class="body_div">

			<!-- header file containing the main nav bar and logo -->
			<%include file="../header.mako"/>

			<div class="row">
				<div id="sidebar" style="display: none;" class="col-sm-2">
					<%include file="../tools/sidebar.mako"/>
				</div>

				<div id="mainContent" class="col-sm-10">
					
					<div id="newAccount" class="wellA">
					<h2 class="form" >Cash Sales<br></h2>
						<div id = "hsAction"><h4 class="formA">New Sale</h4></div><br>

						<div class="form-group">
							<div class="row">
								<div class="col-A">
									<div class="input-group">
										<span>Host Site</span>
										<select id="hostsitecreated_idFK" class="form-controlB2" onchange="loadSales()"></select>
									</div>
									<br>
									<div class="input-group">
										<span class="input-group-addonA">First Name</span>
										<input id="customer_first_name" type="text" class="form-controlA" placeholder="John" val="">
									</div>
									<div class="input-group">
										<span class="input-group-addonA">Last Name</span>
										<input id="customer_last_name" type="text" class="form-controlA" placeholder="Doe" val="">
									</div>
									<div class="input-group">
										<span class="input-group-addonA">Customer Email</span>
										<input id="customer_email" type="text" class="form-controlA" placeholder="john.doe@example.com" val="">
									</div>
									<div class="input-group">
										<span class="input-group-addonA">Customer Phone</span>
										<input id="customer_phone" type="text" class="form-controlA" placeholder="519-123-4567" val="">
									</div>
									<div class="input-group text-left">
										<span class="input-group">
										<p><br>Recieve Email notifications?   
											<input id="email_notifications" type="checkbox" value="off" onchange="toggleEmail()">
										</p>
										</span>
									</div>
									
								</div>
	
								<div class="col-sm-6">
									<div class="input-group">
										<span>Date</span>
										<input id="creation_date" type="text" class="form-control" placeholder="" val="">
									</div>
									<br>
									<div class="input-group">
										<span class="input-group-addonA2">Pickup Location and Date</span>
										<select id="hostsitepickup_idFK" class="form-controlB"></select>
										<select id="distribution_date" class="form-controlB">
											<option>11/19/2014</option>
											<option>12/17/2014</option>
											<option>1/21/2015</option>
											<option>2/18/2015</option>
											<option>3/18/2015</option>
											<option>4/15/2015</option>
											<option>5/20/2015</option>
										</select>
									</div>
									<div class="input-group">
										<span class="input-group-addonA">Number Small</span>
										<input id="small_quantity" type="text" class="form-controlA" placeholder="0" val="">
									</div>
									<div class="input-group">
										<span class="input-group-addonA">Number Large</span>
										<input id="large_quantity" type="text" class="form-controlA" placeholder="0" val="">
									</div>
									<div class="input-group">
										<span class="input-group-addonA">Amt. Paid</span>
										<input id="total_paid" type="text" class="form-controlA" placeholder="0" val="">
									</div>
									<div class="input-group">
										<span class="input-group-addonA">Donation Amt.</span>
										<input id="donation" type="text" class="form-controlA" placeholder="0" val="">
									</div>
									<div class="input-group text-left">
										<span class="input-group">
										<p><br>Recieve Donation Receipt?   
											<input id="donation_receipt" type="checkbox" value="off" onchange="toggleReceipt()">
										</p>
										</span>
									</div>
								</div>
								<br>
									<input id="submit" type="submit" class="button_general_left">
							</div> <!-- close row -->

							<!-- This is used to store the original email address if the user is being edited-->
							<div style="display: none;">
								<input id="orderID" type="text" class="form-control" val="">
							</div>
						</div> <!-- close form group -->
					</div> <!-- close well -->

					<div id="allOrders" class="well" style="background-color:white" >Select A Host Site</div>

				</div> <!-- close main content -->
			</div>
			
			<%include file="../footer.mako"/>
		</div><!--End of body_div-->

	</body>

</html>