$(function(){
	
	/* ==============================
	 * common
	 * ============================== */
	
	selectMake();
	selectMakeUI();

	//datepicker
	$(".datepicker").datepicker({
			closeText: '닫기',
			prevText: '이전 달',
			nextText: '다음 달',
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			dayNames: ['일','월','화','수','목','금','토'],
            dayNamesShort: ['일','월','화','수','목','금','토'],
            dayNamesMin: ['일','월','화','수','목','금','토'],
			dateFormat: 'yy.mm.dd',
			showMonthAfterYear: true,
			changeMonth: true,
      		changeYear: true,
			showButtonPanel: true
		});

	//swiper
	if($('.swiper').size() != 0){
		 $('.swiper').slick({
		  dots: true,
		  arrows:true,
		  roof:false,
		  infinite: false,
		  speed: 1300
		});
	}

	if($('.loding-act').size() > 0){
		//http://kottenator.github.io/jquery-circle-progress/
		var lodingActVal = parseInt($('.loding-act .loding-txt span').text());
		$('.loding-act').circleProgress({
		  value: lodingActVal/100, //변수값
		  startAngle:-Math.PI / 2, //스타트 지점설정
		  fill : { color:"red"}, //색상값
		  emptyFill:'silver', //뒷 색상값
		  size:120 // 전체 사이즈 
		}).on('circle-animation-progress', function(event, progress) {
		  $(this).find('.loding-txt').html('진도율 <br /><span>' + parseInt(lodingActVal * progress) + '%</span>');
		});
	}
	
	/* ==============================
	 * gnb 
	 * ============================== */



	/* ==============================
	 * main 
	 * ============================== */
	
	// 메인화면 띠베너
	$('.bandBanner').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		dots: true
	});

	$('.mainCardBnr').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		arrows: false,
		dots: true
	});


	/* ==============================
	 * content 
	 * ============================== */
	 
});

/* parallax scrolling motion */
scrollAnimation();
function scrollAnimation(){
	$(window).load(function(){
		var $elements = $( '*[data-animation]' );
		var h = $(window).height()
		$elements.each( function( i, el ) {
			var $el = $( el ),
			    animationClass = $el.data('animation'),
			    $delay = $el.data('delay'),
			    $duration = $el.data('duration');
			
			if($delay>0){
				$el.css({
					'-webkit-animation-delay':$delay+'s',
					'animation-delay':$delay+'s'
				})
			}
			if($duration>0){
				$el.css({
					'-webkit-animation-duration':$duration+'s',
					'animation-duration':$duration+'s'
				})
			}

			var t = $el.offset().top;
			if(t > h){
				$el.addClass('wait-animation');
			}
			$el.addClass('animated '+animationClass);

			$el.waypoint(function(){
				$el.removeClass('wait-animation');
			}, { offset: '100%', triggerOnce: true });
		});
	});
}


/* form select */
function selectMake(){
	$("select.selectBox").each(function(){
		if($(this).parents('pre').length < 1){
			var classes = $(this).attr("class"),
				id      = $(this).attr("id"),
				name    = $(this).attr("name");
				style	= $(this).attr('style');
				
			if($(this).is(':visible')){
				var template  = '<div class="' + classes + '" style="' +  style + '">';
					template += '<a href="#" class="ui-select-trigger">' + $(this).find(':selected').text() + '</a>';
					template += '<ul class="ui-select-options">';
					$(this).find("option").each(function(){
						template += '<li><a href="#" class="ui-select-option" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</a></li>';
					});
					template += '</ul></div>';
			  
				$(this).wrap('<div class="ui-select-wrapper"></div>');
				$(this).hide().after(template);
			}
		}
	});
}

function selectMakeUI(){
	$(document).on("hover",".ui-select-option:first-of-type",function(){
	  $(this).closest(".ui-select-options").addClass("ui-select-option-hover");
	}, function(){
	  $(this).closest(".ui-select-options").removeClass("ui-select-option-hover");
	});
	$(document).on("click",".ui-select-trigger", function(e){
		$('.ui-select-options').not($(this).next()).hide();
		$(this).next().show();
		return false;
	});
	$(document).click(function(e){
		$('.ui-select-options').hide();
	});
	$(document).on("click",".ui-select-option", function(e){
	  var $val= $(this).data("value"),
		  $select = $(this).closest(".ui-select-wrapper").find("select");
	  
	  $select.val($val);
	  $(this).addClass("selection").parent().siblings().find(".ui-select-option").removeClass("selection");
	  $(this).closest('.ui-select-options').hide().siblings(".ui-select-trigger").text($(this).text());
	  return false;
	});
}



$(function(){

	// tabwrap
	$('.tabWrap').each(function(tab){
		$(this).children('.tabList').children('li').each(function(idx){
			$(this).click(function(){
				$(this).parent('.tabList').children('li').removeClass('on');
				$(this).addClass('on');
				$(this).closest('.tabWrap').children('.tabContent').removeClass('on');
				$(this).closest('.tabWrap').children('.tabContent').eq(idx).addClass('on');
			});
		});
	});

	// itemWrap
	$('.itemWrap').each(function(){
		$(this).children('.itemSelect').children('li').each(function(idx){
			$(this).click(function(){
				$(this).parent('.itemSelect').children('li').removeClass('on');
				$(this).addClass('on');
				$(this).closest('.itemWrap').find('.itemCont').removeClass('on');
				$(this).closest('.itemWrap').find('.itemCont').eq(idx).addClass('on');
				slickInit();
			});
		});
	});

	// slider 
	$('.slider1').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		adaptiveHeight: true
	});
	// slick init
	function slickInit() {
		$('.slider1').slick('setPosition');
	}



	// popup
	$('.popupOpen').click(function(e){
		var NameValue = $(this).data('name');
		console.log(NameValue);
		e.preventDefault();
		popupOpen(NameValue);
	});

	function popupOpen(name) {
		$('.'+ name).addClass('on');
	}

	$('.layerPopupWrap > .bg').click(function(){
		LayerpopupClose();
	});
	$('.layerClose').click(function(e){
		e.preventDefault();
		LayerpopupClose();
	});
	function LayerpopupClose(){
		$('.layerPopupWrap').removeClass('on');
	};

	
	// visual list
	$('.visualList').mouseenter(function(){
		$("p:first",this).text("mouse enter");
		$('.visualContent').find('.mapArea').removeClass('on');
		$('.visualContent').find('.imgVisual').addClass('on');
	}).mouseleave(function(){
		$('.visualContent').find('.mapArea').addClass('on');
		$('.visualContent').find('.imgVisual').removeClass('on');
	});
	
	$('.visualList').find('li').each(function(){
		$(this).mouseenter(function(){
			var thisImg = $(this).html();
			$('.imgVisual').find('img').remove();
			$('.imgVisual').append(thisImg);
		});
	});

	var visualListLng = $('.visualList').find('li').length;
	var MaxEvent = visualListLng - 3;
	console.log(MaxEvent);
	var visualListClickCnt = 0;
	if (visualListLng < 3)
	{
		$('.visualList').find('.btnVL').hide();
	}

	$('.visualList').find('.btn_next').click(function(){
		visualListClickCnt++;
		if (visualListClickCnt < MaxEvent + 1)
		{
			move = visualListClickCnt * -106;
			$('.visualListCont').stop(true, true).animate({
				top:move
			}, function(){
				if (visualListClickCnt == MaxEvent)
				{
					$('.visualList').find('.btn_next').hide();
				}
			});
			BtnChk();
			console.log(visualListClickCnt);
		} else {
			visualListClickCnt = MaxEvent;
		}
	});

	$('.visualList').find('.btn_prev').click(function(){
		visualListClickCnt--;
		if (visualListClickCnt > -1)
		{
			move = visualListClickCnt * -106;
			$('.visualListCont').stop(true, true).animate({
				top:move
			}, function(){
				if (visualListClickCnt == 0)
				{
					$('.visualList').find('.btn_prev').hide();
				}
			});
			BtnChk();
			console.log(visualListClickCnt + 'prev');
		} else {
			visualListClickCnt = 0;
		}
	});

	function BtnChk() {
		if (visualListClickCnt >= 1)
		{
			$('.visualList').find('.btn_prev').show();
		}
		if (visualListClickCnt <= MaxEvent)
		{
			$('.visualList').find('.btn_next').show();
		}
	}
	


});