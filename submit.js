document.getElementById("gform").on('submit', function(e) {
	document.getElementById("gform").fadeOut(2000);
	document.getElementById("gform").prepend('Your submission has been processed...');
});