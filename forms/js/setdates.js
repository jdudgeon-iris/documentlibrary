 // Set the input's value to today's date in YYYY-MM-DD format
	document.addEventListener("DOMContentLoaded", function () { const today = new Date().toISOString().split('T')[0];
	document.getElementById('date').value = today;
	document.getElementById('client1Signed').value = today;
	document.getElementById('client2Signed').value = today;
	document.getElementById('staffSigned').value = today;
	});