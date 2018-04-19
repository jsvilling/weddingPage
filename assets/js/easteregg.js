(function($) {
	var easterEggTrigger = 0;
	var $logo = $('#logo');
	$logo.on('click', function() {
		if (++easterEggTrigger >= 3) {
			location.hash = "keks";
		}
	});
})(jQuery);