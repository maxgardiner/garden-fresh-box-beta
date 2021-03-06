/**
 * validation.js - is a helper function full of frontend form validation
 * 		error_msg is the name of the error message area on each form 
 */

//names: at least 2 chars, spaces and hyphen allowed
var nameregex = /^[a-zA-Z]{2,}[a-zA-Z -]*$/;

//addresses: commas, periods, hypens, and brackets allowed
var addressregex = /^[0-9][a-zA-Z0-9\, \.\-\(\)]{2,}$/;

//emails: regular rules, between 2 and 4 chars after the period
var emailregex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

//passwords: at least 3 of upper, lower, symbols, and numbers and 8 chars long
var passwordregex = /(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*_)[0-9a-zA-Z_]{8,}$)|(^(?=.*\d)(?=.*[a-z])(?=.*_)[0-9a-z_]{8,}$)|(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$)|(^(?=.*\d)(?=.*[A-Z])(?=.*_)[0-9A-Z_]{8,}$)|(^(?=.*[a-z])(?=.*[A-Z])(?=.*_)[a-zA-Z_]{8,}$)/;

//postal code: canadian postal code rules (not all letters in alphabet allowed)
var postalcoderegex = /^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]\d[ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvxy]( )?\d[ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvxy]\d$/i;

//login_input_is_valid - form validation for login page
function login_input_is_valid(){
	var error_msg = "";
	var user_email =  $("#email").val();
	var user_email_label = document.getElementById("email_label");
	var user_password = $("#password").val();
	var user_password_label = document.getElementById("password_label");
	
	if (user_email == null || user_email == ""){
		error_msg += "<li>You must include your username (email address)";
		user_email_label.style.color = "Red";
	}
	else if (user_email.search(emailregex) == -1){
		error_msg += "<li> The provided email address is not valid.";
		user_email_label.style.color = "Red";
	}
	else{
		user_email_label.style.color = "Black";
	}

	if (user_password == "" || user_password == null){ //socialNetworkID
		error_msg += "<li>You must include a valid password";
		user_password_label.style.color = "Red";
	}
	else{
		user_password_label.style.color = "Black";
	}
	
	$("#error_box").html(error_msg);
	
	if (error_msg.length == 0){
		$("#submit").val("Please Wait");
		$("#submit").addClass("btn-warning");
		return true;
	}else{
		return false;
	}
		
}

//create_user_check_if_already_exists - check if new user already has email listed in customer db
function create_user_check_if_already_exists(user_email){
	var ret_val = null;
	jQuery.ajaxSetup({async:false});
	$.get('/user', {'email':user_email},function(response) {
		
		if (response != "free"){
			var error_msg = "The provided email address is already in use with this program.";
			$("#error_box").html("<ul>" + error_msg + "</ul>");
			var user_email_label = document.getElementById("email_label");
			user_email_label.style.color = "Red";
			ret_val = false;
		}
		else{
			var user_email_label = document.getElementById("email_label");
			user_email_label.style.color = "Black";
			ret_val = true;
		}
	});
	jQuery.ajaxSetup({async:true});
	return ret_val;
}

//create_user_input_is_valid - form validation for user creation page
function create_user_input_is_valid(isAdmin){
	error_msg = "";

	var user_fname =  $("#first_name").val();
	var user_fname_label = document.getElementById("first_name_label");
	
	var user_lname =  $("#last_name").val();
	var user_lname_label = document.getElementById("last_name_label");

	var user_email =  $("#email").val();
	var user_email_label = document.getElementById("email_label");

	var user_phone =  $("#phone").val();
	var user_phone_label = document.getElementById("phone_label");

	var user_password = $("#password").val();
	var user_password_label = document.getElementById("password_label");

	if (isAdmin){
		var associated_site = $("#associated-site").val();
		var associated_site_label = document.getElementById("associated-site_label");
	}else{
		var user_password_confirm = $("#password_confirm").val();
		var user_password_confirm_label = document.getElementById("password_confirm_label");
	}	
	if (user_fname == null || user_fname == ""){
		error_msg += "<li> Please provide your first name.";
	    user_fname_label.style.color = "Red";
	}
	else if (user_fname.search(nameregex) == -1){
		error_msg += "<li> Please provide a proper first name.";
	    user_fname_label.style.color = "Red";
	}
	else{
		user_fname_label.style.color = "Black";
	}
	
	if (user_lname == null || user_lname == ""){
		error_msg += "<li> Please provide your last name.";
	    user_lname_label.style.color = "Red";
	}
	else if (user_lname.search(nameregex) == -1){
		error_msg += "<li> Please provide a proper first name.";
	    user_lname_label.style.color = "Red";
	}
	else{
		user_lname_label.style.color = "Black";
	}
	
	if (user_email == null || user_email == ""){
		error_msg += "<li>You must include your username (email address)";
		user_email_label.style.color = "Red";
	}
	else if (user_email.search(emailregex) == -1){
		error_msg += "<li> The provided email address is not valid.";
		user_email_label.style.color = "Red";
	}
	
	if (user_phone != null && user_phone != "" && (user_phone.match(/\d/g).length<10 || user_phone.match(/\d/g).length>15)){
		error_msg += "<li>Please enter a valid 10-digit phone number (ie. 519-223-4142)</li>";
		user_phone_label.style.color = "Red";
	}
	else{
		user_phone_label.style.color = "Black";
	}
	
	if (user_password == "" || user_password == null){ //socialNetworkID
		error_msg += "<li>You must include a password";
		user_password_label.style.color = "Red";
	}
	else if(user_password.search(passwordregex) == -1 && !isAdmin){
		error_msg += "<li>You must include a valid password (at least 8 characters, and must include 3 of:<br> <ul><li>a lowercase letter,</li><li>an uppercase letter,</li><li>a number, an underscore</li></ul>";
		user_password_label.style.color = "Red";
	}
	else{
		if (!isAdmin){
			if (user_password_confirm == "" || user_password_confirm == null){ //socialNetworkID
				error_msg += "<li>You must confirm your password";
				user_password_confirm_label.style.color = "Red";
			}
			else if(user_password_confirm != user_password){
				error_msg += "<li>Your password does not match the confirmation password";
				user_password_confirm_label.style.color = "Red";
			}
			else{
				user_password_label.style.color = "Black";
				user_password_confirm_label.style.color = "Black";
			}
		}
	}
	
	if (isAdmin){

		if($("#role").val() == "Host Site Coordinator"){
			$.ajax({
				type: 'get',
				url: '/hsJSON',
				data: {},
				async: false,
				success: function(response) {
					var resp = JSON.parse(response);
					var isValid = false;
					$.each(resp, function(i, item) {
						if (item.id == $("#hostSite-id").val()){
							isValid = true;
						}
					});
					
					if (!isValid){
						error_msg += "<li>Host Site Coordinators must be associated with valid site";
						associated_site_label.style.color = "Red";
					}
					else{
						associated_site_label.style.color = "Black";
					}
				}
			});
		}
	}
	
	
	if (error_msg.length == 0){
		if (isAdmin)
			return true;
		else if (self.create_user_check_if_already_exists(user_email)){
			$("#submit").val("Please Wait");
			$("#submit").addClass("btn-warning");
			return true;
		}
		else
			return false;
	}
	else{
		$("#error_box").html("<ul>" + error_msg + "</ul>");
		return false;
	}
}

//create_hostsite_input_is_valid - form validation for hostsite edit or add
function create_hostsite_input_is_valid(isAdmin){
	var error_msg = "";
	var name = $("#HSname").val();
	var phone = $("#phone").val();
	var email = $("#email").val();
	var address = $("#address").val();
	var city = $("#city").val();
	var province = $("#province").val();
	var postal_code = $("#postal_code").val();
	var monday = $("#monHrs").val();
	var tuesday = $("#tuesHrs").val();
	var wednesday = $("#wedHrs").val();
	var thursday = $("#thursHrs").val();
	var friday = $("#friHrs").val();
	var saturday = $("#satHrs").val();
	var sunday = $("#sunHrs").val();
	
	var name_label = document.getElementById("HSname_label");
	var phone_label = document.getElementById("phone_label");
	var email_label = document.getElementById("email_label");
	var address_label = document.getElementById("address_label");
	var city_label = document.getElementById("city_label");
	var province_label = document.getElementById("province_label");
	var postal_code_label = document.getElementById("postal_code_label");
	var monday_label = document.getElementById("monHrs_label");
	var tuesday_label = document.getElementById("tuesHrs_label");
	var wednesday_label = document.getElementById("wedHrs_label");
	var thursday_label = document.getElementById("thursHrs_label");
	var friday_label = document.getElementById("friHrs_label");
	var saturday_label = document.getElementById("satHrs_label");
	var sunday_label = document.getElementById("sunHrs_label");
	
	if (name == null || name == ""){
		error_msg += "<li>You must include the host site organizations name";
		name_label.style.color = "Red";
	}
	else if (name.search(nameregex) == -1){
		error_msg += "<li> The host site name is not valid (Do not use symbols or special characters)";
		name_label.style.color = "Red";
	}
	else{
		name_label.style.color = "Black";
	}

	if ((phone == null || phone == "" )&&(email == null || email == "")){
		error_msg += "<li>Host sites must have either a contact phone or email address</li>";
		phone_label.style.color = "Red";
		email_label.style.color = "Red";
	}
	else{
		if (phone != null && phone != ""){
			if ((phone.match(/\d/g).length<10 || phone.match(/\d/g).length>15)){
				error_msg += "<li>Please enter a valid 10-digit phone number (ie. 519-223-4142)</li>";
				phone_label.style.color = "Red";
			}else{
				phone_label.style.color = "Black";
			}
		}
		
		if (email != null && email != ""){
			if (email.search(emailregex) == -1){
				error_msg += "<li> The provided email address is not valid.";
				email_label.style.color = "Red";
			}
			else{
				email_label.style.color = "Black";
			}
		}

	}
	
	if (address == null || address == ""){
		error_msg += "<li>You must include the host site address for pickup";
		address_label.style.color = "Red";
	}
	else if (address.search(addressregex) == -1){
		error_msg += "<li> The host site address is not valid (Do not use symbols or special characters)";
		address_label.style.color = "Red";
	}
	else{
		address_label.style.color = "Black";
	}
	
	
	if (city == null || city == ""){
		error_msg += "<li>You must include the host site city";
		city_label.style.color = "Red";
	}
	else if (city.search(nameregex) == -1){
		error_msg += "<li> The host site city is not valid (Do not use symbols or special characters)";
		city_label.style.color = "Red";
	}
	else{
		city_label.style.color = "Black";
	}
	
	if (province == null || province == ""){
		error_msg += "<li>You must include the host site province";
		province_label.style.color = "Red";
	}
	else if (province.search(nameregex) == -1){
		error_msg += "<li> The host site province is not valid (Do not use symbols or special characters)";
		province_label.style.color = "Red";
	}
	else{
		province_label.style.color = "Black";
	}
	if (postal_code != null && postal_code != "" && postal_code.search(postalcoderegex) == -1){
		error_msg += "<li>Please use a valid postal code (eg. N1G 532)";
		postal_code_label.style.color = "Red";
	}
	else{
		postal_code_label.style.color = "Black";
	}
	
	if ((monday == null || monday == "")&&(tuesday == null || tuesday == "")&&(wednesday == null || wednesday == "")&&(thursday == null || thursday == "")&&(friday == null || friday == "")&&(saturday == null || saturday == "")&&(sunday == null || sunday == "")){
		error_msg += "<li>Please enter at least one date during which you are open (for questions or orders)";
		monday_label.style.color = "Red";
		tuesday_label.style.color = "Red";
		wednesday_label.style.color = "Red";
		thursday_label.style.color = "Red";
		friday_label.style.color = "Red";
		saturday_label.style.color = "Red";
		sunday_label.style.color = "Red";
	}
	else{
		if (monday == null || monday == "")
			$("#monHrs").val("Closed");
		if (tuesday == null || tuesday == "")
			$("#tuesHrs").val("Closed");
		if (wednesday == null || wednesday == "")
			$("#wedHrs").val("Closed");
		if (thursday == null || thursday == "")
			$("#thursHrs").val("Closed");
		if (friday == null || friday == "")
			$("#friHrs").val("Closed");
		if (saturday == null || saturday == "")
			$("#satHrs").val("Closed");
		if (sunday == null || sunday == "")
			$("#sunHrs").val("Closed");
		
		
		
		monday_label.style.color = "Black";
		tuesday_label.style.color = "Black";
		wednesday_label.style.color = "Black";
		thursday_label.style.color = "Black";
		friday_label.style.color = "Black";
		saturday_label.style.color = "Black";
		sunday_label.style.color = "Black";
	}
	

	$("#error_box").html(error_msg);
	if (error_msg.length == 0){
		$("#submit").val("Please Wait");
		$("#submit").addClass("btn-warning");
		return true;
	}else{
		return false;
	}
}

//create_new_order_input_is_valid - form validation for new/edit order
function create_new_order_input_is_valid(){
	var error_msg = "";

	var user_fname =  $("#customer_first_name").val();
	var user_fname_label = document.getElementById("customer_first_name_label");
	
	var user_lname =  $("#customer_last_name").val();
	var user_lname_label = document.getElementById("customer_last_name_label");

	var user_email =  $("#customer_email").val();
	var user_email_label = document.getElementById("customer_email_label");

	var user_phone =  $("#customer_phone").val();
	var user_phone_label = document.getElementById("customer_phone_label");

	var creation_date = $("#creation_date").val();
	var creation_date_label = document.getElementById("creation_date_label");

	var distribution_date = $("#distribution_date").val();
	var hostsite = $("#hostsitepickup_idFK").val();
	var site_and_date_label = document.getElementById("site_and_date_label");
	
	var num_small = $("#small_quantity").val();
	var num_small_label = document.getElementById("small_quantity_label");
	
	var num_large = $("#large_quantity").val();
	var num_large_label = document.getElementById("large_quantity_label");
	
	if (user_fname == null || user_fname == ""){
		error_msg += "<li> Please provide your first name.";
	    user_fname_label.style.color = "Red";
	}
	else if (user_fname.search(nameregex) == -1){
		error_msg += "<li> Please provide a proper first name.";
	    user_fname_label.style.color = "Red";
	}
	else{
		user_fname_label.style.color = "Black";
	}
	
	if (user_lname == null || user_lname == ""){
		error_msg += "<li> Please provide your last name.";
	    user_lname_label.style.color = "Red";
	}
	else if (user_lname.search(nameregex) == -1){
		error_msg += "<li> Please provide a proper first name.";
	    user_lname_label.style.color = "Red";
	}
	else{
		user_lname_label.style.color = "Black";
	}
	
	if ((user_phone == null || user_phone == "" )&&(user_email == null || user_email == "")){
		error_msg += "<li>You must have enter either a phone or an email address so we can contact you</li>";
		user_phone_label.style.color = "Red";
		user_email_label.style.color = "Red";
	}
	else{
		if (user_phone != null && user_phone != ""){
			if ((user_phone.match(/\d/g).length<10 || user_phone.match(/\d/g).length>15)){
				error_msg += "<li>Please enter a valid 10-digit phone number (ie. 519-223-4142)</li>";
				user_phone_label.style.color = "Red";
			}else{
				user_phone_label.style.color = "Black";
			}
		}
		
		if (user_email != null && user_email != ""){
			if (user_email.search(emailregex) == -1){
				error_msg += "<li> The provided email address is not valid.";
				user_email_label.style.color = "Red";
			}
			else{
				user_email_label.style.color = "Black";
			}
		}

	}

	if (distribution_date == null || distribution_date == "--Select--" || hostsite == null || hostsite == "--Select--" || hostsite == "Online"){
		error_msg += "<li> You must select a host site and date to pick up the order from";
		site_and_date_label.style.color = "Red";
	}
	else{
		site_and_date_label.style.color = "Black";
	}
	
	if ((num_small == null || num_small == "")&&(num_large == null || num_large == "")){
		error_msg += "<li> You must select at least 1 small box ($15) or 1 large box ($25)";
		num_small_label.style.color = "Red";
		num_large_label.style.color = "Red";
	}
	else{
		if (num_small != null && num_small != "" && isNaN(num_small)){
			error_msg += "<li> Please enter a valid number of small boxes";
			num_small_label.style.color = "Red";
		}
		else if (num_small > 20){
			error_msg += "<li> ***Please contact Guelph Community Health Center for orders this large";
			num_small_label.style.color = "Red";
		}
		else{
			num_small_label.style.color = "Black";
		}
		
		if (num_large != null && num_large != "" && isNaN(num_large)){
			error_msg += "<li> Please enter a valid number of large boxes";
			num_large_label.style.color = "Red";
		}
		else if (num_large > 20){
			error_msg += "<li> ***Please contact Guelph Community Health Center for orders this large";
			num_large_label.style.color = "Red";
		}
		else{
			num_large_label.style.color = "Black";
		}
	}
	

	$("#error_box").html(error_msg);
	if (error_msg.length == 0){
		$("#submit").val("Please Wait");
		$("#submit").addClass("btn-warning");
		return true;
	}else{
		return false;
	}
}

//create_new_donation_input_is_valid - form validation for new donation
function create_new_donation_input_is_valid(){
	var error_msg = "";

	var user_fname =  $("#customer_first_name").val();
	var user_fname_label = document.getElementById("customer_first_name_label");
	
	var user_lname =  $("#customer_last_name").val();
	var user_lname_label = document.getElementById("customer_last_name_label");

	var user_email =  $("#customer_email").val();
	var user_email_label = document.getElementById("customer_email_label");

	var user_phone =  $("#customer_phone").val();
	var user_phone_label = document.getElementById("customer_phone_label");

	var donation = $("#donation").val();
	var donation_label = document.getElementById("donation_label");
	
	var donation_receipt = $("#donation_receipt").val() == "on";
	var donation_receipt_label = document.getElementById("donation_receipt_label");
	
	if (donation_receipt == true &&(user_fname == null || user_fname == "")){
		error_msg += "<li> A first name must be provided if you want a donation receipt emailed to you";
		user_fname_label.style.color = "Red";
	}
	else if (user_fname != null && user_fname != "" && user_fname.search(nameregex) == -1){
		error_msg += "<li> The first name you have provided in invalid (do not use special characters).";
		user_fname_label.style.color = "Red";
	}
	else{
		user_fname_label.style.color = "Black";
	}
	
	if (donation_receipt == true &&(user_lname == null || user_lname == "")){
		error_msg += "<li> A last name must be provided if you want a donation receipt emailed to you";
		user_lname_label.style.color = "Red";
	}
	else if (user_lname != null && user_lname != "" && user_lname.search(nameregex) == -1){
		error_msg += "<li> The last name you have provided in invalid (do not use special characters).";
	    user_lname_label.style.color = "Red";
	}
	else{
		user_lname_label.style.color = "Black";
	}
	
	if ((user_phone != null && user_phone != "") && (user_phone.match(/\d/g).length<10 || user_phone.match(/\d/g).length>15)){
		error_msg += "<li>Please enter a valid 10-digit phone number (ie. 519-223-4142)</li>";
		user_phone_label.style.color = "Red";
	}else{
		user_phone_label.style.color = "Black";
	}
	
	if (donation_receipt == true &&(user_email == null || user_email == "")){
		error_msg += "<li> An email must be provided if you want a donation receipt emailed to you";
		user_email_label.style.color = "Red";
	}
	else if ((user_email != null && user_email != "") && (user_email.search(emailregex) == -1)){
		error_msg += "<li> The provided email address is not valid.";
		user_email_label.style.color = "Red";
	}
	else{
		user_email_label.style.color = "Black";
	}
	
	if (donation == null || donation == "" || isNaN(donation)){
		error_msg += "<li> Please enter a valid amount to donate ($)";
		donation_label.style.color = "Red";
	}
	else{
		donation_label.style.color = "Black";
	}

	$("#error_box").html(error_msg);
	if (error_msg.length == 0){
		$("#submit").val("Please Wait");
		$("#submit").addClass("btn-warning");
		return true;
	}else{
		return false;
	}
}

//change_password_input_is_valid - form validation for changing password
function change_password_input_is_valid(email){
	var error_msg = "";


	var old_password = $("#old_password").val();
	var old_password_label = document.getElementById("old_password_label");
	
	var new_password = $("#new_password").val();
	var new_password_label = document.getElementById("new_password_label");
	
	var new_password_confirm = $("#new_password_confirm").val();
	var new_password_confirm_label = document.getElementById("new_password_confirm_label");

	
	if (new_password == "" || new_password == null){ //socialNetworkID
		error_msg += "<li>You must include a new password";
		new_password_label.style.color = "Red";
	}
	else if(new_password.search(passwordregex) == -1){
		error_msg += "<li>You must include a valid password (at least 8 characters, and must include 3 of:<br> <ul><li>a lowercase letter,</li><li>an uppercase letter,</li><li>a number, an underscore</li></ul>";
		new_password_label.style.color = "Red";
	}
	else{
		if (new_password_confirm == "" || new_password_confirm == null){ //socialNetworkID
			error_msg += "<li>You must confirm your password";
			new_password_confirm_label.style.color = "Red";
		}
		else if(new_password_confirm != new_password){
			error_msg += "<li>Your password does not match the confirmation password";
			new_password_confirm_label.style.color = "Red";
		}
		else{
			new_password_label.style.color = "Black";
			new_password_confirm_label.style.color = "Black";
		}
	}
	if (error_msg.length == 0){
		$.ajax({
			type: 'get',
			url: '/user/auth',
			async: false,
			data: {
				email : email,
				password : old_password
			},
			success: function(response) {
				//response will be JSON. response['success'] = false, message will have a list of bad fields
				var resp = JSON.parse(response);
				if(resp.success != "true"){
					error_msg += "<li>The old password you provided was incorrect";
					old_password_label.style.color = "Red";
					 $("#old_password").val("");
				}
				else{
					old_password_label.style.color = "Black";
				}
			}
		});
	}

	$("#error_box").html(error_msg);
	if (error_msg.length == 0){
		$("#submit").val("Please Wait");
		$("#submit").addClass("btn-warning");
		return true;
	}else{
		return false;
	}
}

