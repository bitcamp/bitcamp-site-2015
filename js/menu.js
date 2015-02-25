var menuOn = false;
$('#mobile-navigation').hide();

$('.menu-hamburger').click(function () {
	if (!menuOn) {
		$('#mobile-navigation').slideDown(250);
		menuOn = true;
	} else {
		$('#mobile-navigation').slideUp(250);
		menuOn = false;
	}
});
