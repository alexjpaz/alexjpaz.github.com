(function(){
	// Google Analytics
	head.js("http://www.google-analytics.com/ga.js", function() {
		var tracker = _gat._getTracker("UA-25975548-1");
		tracker._trackPageview();
	});

	head.js('//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js','//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js');

})();
