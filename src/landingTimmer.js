$( document ).ready(function() {
	var idTimer = setInterval(clockUpdate, 1000);

	$('.clock .board').on('click', function(){
		clearInterval(idTimer);
		$('.clock .board').animate({
			opacity: 0
		},500, null, function(){
			$('.clock').remove();

			$(".letter-left") .animate({right: g_strPosition});
			$(".letter-right").animate({left : g_strPosition});
			g_bOpenMap = true;

			initBook();
		});
	});
/*
	$('.spell .board').on('click', function(){
		$('.spell .board').animate({
			opacity: 0
		},500, null, function(){
			$('.spell').remove();

			$(".letter-left") .animate({right: g_strPosition});
			$(".letter-right").animate({left : g_strPosition});
			g_bOpenMap = true;

			initBook();
		});
	})
*/
});

function clockUpdate() {
	var date = new Date();
	var targetDate = new Date('2021/11/14 12:00');
	var remaining = parseInt((targetDate - date)/1000);
	//$('.digital-clock').css({'color': '#fff', 'text-shadow': '0 0 6px #ff0'});
	function addZero(x) {
		if (x < 10) {
			return x = '0' + x;
		} else {
			return x;
		}
	}

	function twelveHour(x) {
		if (x > 12) {
			return x = x - 12;
		} else if (x == 0) {
			return x = 12;
		} else {
			return x;
		}
	}

	if( remaining > 0 ){

		var s = addZero( remaining % 60 );
		var m = addZero( parseInt(remaining / 60 ) % 60 );
		var h = addZero( parseInt(remaining / 3600) % 24 );
		var d = Math.floor(remaining / 86400);

		var echo = '';
		if( d > 1 ){
			echo += d + '天 ';
		}

		$('.digital-clock').text( echo + h + ':' + m + ':' + s)
	}else{
		$('.digital-clock').text( '2021/11/14' )
	}
}
