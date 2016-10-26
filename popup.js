


// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	//alert(request.type);
	if (request.type === "shownotification") {
		try {
			//alert(request.opt.message);
			console.log('Not Request Arrived')
			chrome.notifications.create( request.opt, function () { })
			//alert(request.message);
		} catch (err) {
			console.log(err.message);
			//alert(err.message);
		}
	}


});



