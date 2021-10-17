var g_bOpenMap   = false;
var g_bBookReady = false;
var g_direction  = false;
var g_showBook   = [true,true];
var g_strPosition = "70%";
var g_x0     = 21 ; // 外框
var g_y0     = 0  ;
var g_width  = 210;
var g_height = 297;
var initedCnt = 0;

$( document ).ready(function() {
	var g_fWinRatio    = 231 / 297;//2101 / 2556;
	var g_fCanvasRatio = 210 / 297;
	var g_fFrontRatio  = 21 / 297;
    
	function getSize(){
		var w = $(window).width(),
			h = $(window).height(),
			fSizeRatio = w/h;

		g_width = w * 10 / 11;
		g_height = h;

		//if( fSizeRatio > g_fWinRatio ){
		if( g_width > g_height ){
			//寬螢幕
			g_width = g_height / g_fCanvasRatio;
			g_direction = true;
		}else{
			//窄螢幕
			g_height = g_width / g_fCanvasRatio;
			g_direction = false;
		}
		g_x0 = (w - g_width)/2;
		g_y0 = (h - g_height)/2;

		// 門的位置
		g_strPosition = ( (g_width + w)/2).toFixed(0) + 'px';

		$(".center").css({
			'width' : g_width.toFixed(0) + 'px',
			'left' : ((w - g_width )/2).toFixed(0) + 'px'
		});
		$('.flipbook-viewport').css({
			'top' : g_y0 + 'px'
		})

		if( g_bOpenMap ){
			$(".letter-left") .css({right: g_strPosition});
			$(".letter-right").css({left : g_strPosition});
		}
	}

	$(window).resize(function(){
		getSize();
		initBook();
	});
	getSize();

	var swipe = [0,0];
	$('.flipbook-viewport').on( 'touchstart',function( event ){
		swipe[0] = event.changedTouches[0].screenX;
	})
	$('.flipbook-viewport').on('touchend',function( event ){
		swipe[1] = event.changedTouches[0].screenX;
		//console.log( swipe[1] - swipe[0] );
		if( swipe[1] - swipe[0] > 0 ){
			//back
			$('.flipbook').turn('previous');
		}else{
			//next
			$('.flipbook').turn('next');
		}
	})
	$('.pcbook-viewport').on( 'touchstart',function( event ){
		swipe[0] = event.changedTouches[0].screenX;
	})
	$('.pcbook-viewport').on('touchend',function( event ){
		swipe[1] = event.changedTouches[0].screenX;
		//console.log( swipe[1] - swipe[0] );
		if( swipe[1] - swipe[0] > 0 ){
			//back
			$('.pcbook').turn('previous');
		}else{
			//next
			$('.pcbook').turn('next');
		}
	})
    /*$( ".open-letter" ).on('click', function(){
        if( g_bOpenMap ){
            $(".letter-left") .animate({right:"50%"});
            $(".letter-right").animate({left :"50%"});
            g_bOpenMap = false;
        }else{
            $(".letter-left") .animate({right: g_strPosition});
            $(".letter-right").animate({left : g_strPosition});
            g_bOpenMap = true;
        }
    });*/
/*
    $( ".holy_veil" ).on('click', function(){
        $( ".hallows_pic.holy_veil").animate({
            top: 200,
            height: 800
        },1000);
        $( ".hallows.holy_veil" ).animate({
            top: 200,
            opacity: 0
        },500, null, function(){
            $( ".hallows.holy_veil" ).remove();
        });
        setTimeout(function(){
            $( ".hallows_pic.holy_veil" ).animate({
                opacity: 0
            },1000, null, function(){
                $( ".hallows_pic.holy_veil" ).remove();
            });
        },2000);
    });
    $( ".holy_ring" ).on('click', function(){
        $( ".hallows_pic.holy_ring").animate({
            top: 200,
            height: 800
        },1000);
        $( ".hallows.holy_ring" ).animate({
            top: 200,
            opacity: 0
        },500, null, function(){
            $( ".hallows.holy_ring" ).remove();
        });
        setTimeout(function(){
            $( ".hallows_pic.holy_ring" ).animate({
                opacity: 0
            },1000, null, function(){
                $( ".hallows_pic.holy_ring" ).remove();
            });
        },2000);
    });

    $( ".holy_wand" ).on('click', function(){
        $( ".hallows_pic.holy_wand").animate({
            top: 200,
            height: 800
        },1000);
        $( ".hallows.holy_wand" ).animate({
            top: 200,
            opacity: 0
        },500, null, function(){
            $( ".hallows.holy_wand" ).remove();
        });
        setTimeout(function(){
            $( ".center.letter" ).animate({
                left: '-50%'
            },1000, null, function(){
                $( ".center.letter" ).remove();
            });
        },2000);
    });
*/
	yepnope({
		test : Modernizr.csstransforms,
		yep: ['turnjs4/lib/turn.js'],
		nope: ['turnjs4/lib/turn.html4.min.js'],
		complete : function(){
			g_bBookReady = true;
			initBook();
		}
	});
});

function initBook(){
	if( g_bOpenMap && g_bBookReady ){
		if( g_direction ){
			$('.pcbook').show();
			$('.flipbook').hide();
			if(g_showBook[0]){
				g_showBook[0] = false;
				$('.pcbook').turn({
					width : g_width,
					height: g_height,
					display: 'single',
					autoCenter: true
				});
			}
		}else{
			$('.flipbook').show();
			$('.pcbook').hide();
			if(g_showBook[1]){
				g_showBook[1] = false;
				$('.flipbook').turn({
					width : g_width,
					height: g_height,
					display: 'single',
					autoCenter: true
				});
			}
		}
	}
}
