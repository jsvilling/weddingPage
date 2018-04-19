(function($) {
    var hashInvitation = "#invitation";
	var easterEggTrigger = 0;
	var userDeservesCookie = false;
	var $logo = $('#logo');
	var $main = $('#main');
	$logo.on('click', function() {
		if (++easterEggTrigger >= 3) {
			location.hash = "keks";
			userDeservesCookie = true;
		}
	});
    $main.on('viewChanged', function() {
        if (hashInvitation === location.hash && userDeservesCookie) {
            console.log("you deserve that cookie");
        }
    });
    $(document).on('submit','#invitationForm',function(){
        if (hashInvitation === location.hash && userDeservesCookie) {
            var originalMessage = $('#message').val();
            var newMessage = originalMessage + "\n Give that man a cookie";
            $('#message').val(newMessage);
        }
        console.log($('#message').val());
    });
})(jQuery);