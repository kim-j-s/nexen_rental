$(function(){
	
	/* ==============================
	 * common
	 * ============================== */
	
	selectMake();
	selectMakeUI();

	//datepicker
	/*
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
		showButtonPanel: true // 닫기버튼
	});
	*/

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

	// mainRoll
	$('.mainRoll > .items').slick({
		autoplay: true,
		autoplaySpeed: 2500,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnFocus: false,
		pauseOnHover: false,
		adaptiveHeight: false,
		arrows: true,
		dots: true
	});
	
	var mainRollLng = $('.mainRoll').find('.item').length;
	var mainRBtn = '<li class="etc"><button class="play"><span>일시정지/재생</span></button></li>';
	if (mainRollLng > 0)
	{
		$('.mainRoll').find('.slick-dots').append(mainRBtn);
	}

	$(window).load(function(){
		var mainRollPp = $('.mainRoll').find('.play');
		$(mainRollPp).on('click', function(){
			if ( $(this).hasClass('on') )
			{
				$(this).removeClass('on');
				$('.mainRoll > .items').slick('slickPlay');
			} else {
				$(this).addClass('on');
				$('.mainRoll > .items').slick('slickPause');
			}
		});
	});
	// mainRoll

	$('.pageTop').on('click', function(e){
		e.preventDefault();
		$("html, body").animate({
			scrollTop: 0 }
		,500);
	});

	var DimmdBg = '<div class="dimmedBg"></div>';
	$('.mainWing').find('.call').on('click', function(){
		if ( $(this).hasClass('on') )
		{
			$('.wing').removeClass('down');
			$(this).closest('li').siblings().removeClass('on');
			$('.dimmedBg').removeClass('on');
			setTimeout(function(){
				$('.dimmedBg').remove();
			},500);
			$(this).removeClass('on');
			$(this).next('.cList').removeClass('on');
			$(this).closest('.inner').animate({
				width: '79px',
				left: '0'
			}, 500);
		} else {
			$('.wing').addClass('down');
			$(this).closest('li').siblings().addClass('on');
			$(DimmdBg).insertBefore('#footerWrap');
			setTimeout(function(){
				$('.dimmedBg').addClass('on');
			},100);
			$(this).addClass('on');
			$(this).next('.cList').addClass('on');
			$(this).closest('.inner').animate({
				width: '428px',
				left: '-349px'
			}, 500);
		}
	});

	$('.wing').find('.call').on('click', function(){
		if ( $(this).hasClass('on') )
		{
			$('.mainWing').removeClass('down');
			$(this).closest('li').siblings().removeClass('on');
			$('.dimmedBg').removeClass('on');
			setTimeout(function(){
				$('.dimmedBg').remove();
			},500);
			$(this).removeClass('on');
			$(this).next('.cList').removeClass('on');
			$(this).closest('.inner').animate({
				width: '79px',
				left: '0'
			}, 500);
		} else {
			$('.mainWing').addClass('down');
			$(this).closest('li').siblings().addClass('on');
			$(DimmdBg).insertBefore('#footerWrap');
			setTimeout(function(){
				$('.dimmedBg').addClass('on');
			},100);
			$(this).addClass('on');
			$(this).next('.cList').addClass('on');
			$(this).closest('.inner').animate({
				width: '428px',
				left: '-349px'
			}, 500);
		}
	});

	$('.wing').find('.call2').on('click', function(){
		if ( $(this).hasClass('on') )
		{
			$('.mainWing').removeClass('down');
			$(this).closest('li').siblings().removeClass('on');
			$('.dimmedBg').removeClass('on');
			setTimeout(function(){
				$('.dimmedBg').remove();
			},500);
			$(this).removeClass('on');
			$(this).next('.itemHistory').removeClass('on');
			$(this).closest('.inner').animate({
				width: '79px',
				left: '0'
			}, 500);
		} else {
			$('.mainWing').addClass('down');
			$(this).closest('li').siblings().addClass('on');
			$(DimmdBg).insertBefore('#footerWrap');
			setTimeout(function(){
				$('.dimmedBg').addClass('on');
			},100);
			$(this).addClass('on');
			$(this).next('.itemHistory').addClass('on');
			$(this).closest('.inner').animate({
				width: '429px',
				left: '-349px'
			}, 500);
		}
	});

	itemHistory();
	
	/* ==============================
	 * gnb 
	 * ============================== */

	 $('#headerWrap.etc').on('mouseenter', function(){
		 var cImg = $(this).find('h1').find('img');
		 $(this).removeClass('main');
		 $(cImg).attr("src",$(cImg).attr("src").replace("logo_white.png","logo.png"));
	 }).on('mouseleave', function(){
		 var cImg = $(this).find('h1').find('img');
		 $(cImg).attr("src",$(cImg).attr("src").replace("logo.png","logo_white.png"));
		 if ( !$('.allBtn').hasClass('on') )
		 {
			 $(this).addClass('main');
		 }
	 });

	gnbBack();
	$(window).resize(function(){
		 gnbBack();
	});
	function gnbBack(){
		var wWidth = $(window).width();
		var bCenter = wWidth / 2;
		$('.menuAll').find('.amback').css({'width':wWidth, 'margin-left':-bCenter});
		$('.gnbBack').css({'width':wWidth, 'margin-left':-bCenter});
	}

	var gnbBg = '<div class="gnbBg"></div>';
	var allMenuBtn = $('.menuAll > .allBtn');
	$(allMenuBtn).on('click', function(){
		if ( $(this).hasClass('on') )
		{
			openAllmenu();
			
		} else {
			closeAllmenu();
		}
	});

	function openAllmenu() {
		$(allMenuBtn).removeClass('on');
		$('.menuAllList').stop(true, false).slideUp(500);
		$('.gnbBg').removeClass('on');
		setTimeout(function(){
			$('.gnbBg').remove();
		},300);
		$('.mainWing').removeClass('down');
		$('.wing').removeClass('down');
	}
	function closeAllmenu() {
		$(allMenuBtn).addClass('on');
		$('.mainWing').addClass('down');
		$('.wing').addClass('down');
		$('.menuAllList').stop(true, false).slideDown(500);
		$(gnbBg).insertBefore('#footerWrap');
		setTimeout(function(){
			$('.gnbBg').addClass('on');
		},100);
	}

	var GnbList = $('.gnbList > li');
	$(GnbList).bind("mouseenter focusin", function() {
		$(this).addClass("on").siblings().removeClass("on");
		$(gnbBg).insertBefore('#footerWrap');
		$('.gnbBg').addClass('on');
		$('.mainWing').addClass('down');
		$('.wing').addClass('down');
		$('.gnbWrap').addClass('on');
	});
	$(GnbList).bind("mouseleave focusout", function() {
		$(this).removeClass("on");
		$('.gnbBg').removeClass('on');
		$('.gnbBg').remove();
		$('.mainWing').removeClass('down');
		$('.wing').removeClass('down');
		$('.gnbWrap').removeClass('on');
	});



	/* ==============================
	 * main 
	 * ============================== */
	
	// 배너갯수
	var TBLng = $('.topBanner > .item > a').length;
	var TBCnt = 1;
	var TBIntervalCnt = 0;
	var TBLeft = $('.topBanner').find('.left');
	var TBRight = $('.topBanner').find('.right');
	var RollingTime = 2500;
	// 배너 컨트롤 초기화
	if (TBLng < 2)
	{
		$('.topBanner').find('.counter').hide();
		$('.topBanner').find('.btns').hide();
	}
	$('.topBanner').find('.allcnt').html(TBLng);

	if (TBLng > 1)
	{
		TBRolling = StartInterval();
	}

	// topbanner close
	$('.topBanner').find('.topBclose').on('click', function(){
		var winHeight = $(window).height();
		$('.topBanner').animate({
			height : '0px'
		},300, function(){
			$('.topBanner').remove();
		});
		$('.mainVisual').animate({
			height : winHeight + 3
		},300);
		$('.mainRightVisual').animate({
			height : winHeight + 3
		},300);
		$('.mainLeftVisual').animate({
			height : winHeight + 3
		},300);

		$('#nomore').prop("checked") ? setCookie("no_tb", "y", "7") : setCookie("no_tb", 0, 0);
		StopInterval();
	});

	// cookie
	(function checkCookie() {
		if (getCookie("no_tb") != "")
		{
			$('.topBanner').remove();
		}
	})();

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	// 배너 이벤트
	$(TBLeft).on('click', function(){
		TBCnt--;
		if (TBCnt == 0)
		{
			TBCnt = TBLng;
		}
		TBL(TBCnt);
	});

	$(TBLeft).on('mouseenter', function(){
		StopInterval();
		$('.topBanner').find('.playBtn').addClass('on');
		TBIntervalCnt = 1;
	});

	$(TBRight).on('click', function(){
		TBCnt++;
		if (TBCnt == TBLng + 1)
		{
			TBCnt = 1;
		}
		TBL(TBCnt);
	});

	$(TBRight).on('mouseenter', function(){
		StopInterval();
		$('.topBanner').find('.playBtn').addClass('on');
		TBIntervalCnt = 1;
	});

	$('.topBanner').find('.playBtn').on('click', function(){
		TBIntervalCnt++;
		if (TBIntervalCnt == 1)
		{
			StopInterval();
			$(this).addClass('on');
		} else {
			$(this).removeClass('on');
			TBIntervalCnt = 0;
			restartRolling();
		}
	});

	function StartInterval() {
		i = setInterval(function(){
			TBCnt++;
			if (TBCnt == TBLng + 1)
			{
				TBCnt = 1;
			}
			TBL(TBCnt);
		},RollingTime);
		return i;
	}

	// 롤링 시작
	function restartRolling(){
		TBRolling = StartInterval();
	}
	
	// 재생정지
	function StopInterval(){
		clearInterval(TBRolling);
	}

	function TBL(TBCnt) {
		$('.topBanner > .item > a').hide();
		$('.topBanner > .item > a').eq(TBCnt - 1).show();
		$('.topBanner').find('.now').html(TBCnt);
	}
	// TopRollingBanner End


	var viewLeft = $('.mainFind.case1').find('a');
	var viewRight = $('.mainFind.case2').find('a');
	var mainMove = $('#mainWrap > .inner');

	$(viewLeft).click(function(){
		$('.wing').addClass('none');
		$(mainMove).animate({
			left:'0'
		},500, function(){
			$('.mainContent.centerCont').css('height','0');
		});
	});
	$(viewRight).click(function(){
		$('.wing').addClass('none');
		$(mainMove).animate({
			left:'-200%'
		},500, function(){
			$('.mainContent.centerCont').css('height','0');
		});
	});

	$('.centerGo').click(function(){
		MoveCenter();
	});

	function MoveCenter() {
		$('.mainContent.centerCont').css('height','auto');
		$(mainMove).animate({
			left:'-100%'
		},500, function(){
			$('.wing').removeClass('none');
		});
	}

	var RankEvent = $('.rankSelect').find('.rankList').eq(0);
	var RankEventList = $('.rankList').find('li');
	var RankEventRadio = $('.rankList').find('input[type=radio]');
	$(RankEvent).hover(function(){
		$(RankEvent).animate({
			top:0
		},function(){
			$(this).find('.dom').slideDown();
		});
	});

	$(RankEventList).click(function(){
		if ( !$(this).closest('.rankList').hasClass('active') )
		{
			$(this).closest('.rankList').addClass('active');
			$(this).closest('.rankList').next().animate({
				top:0
			},function(){
				$(this).find('.dom').slideDown();
			});
		}
		$(this).closest('.rankSelect').next('.btnBox').children('.btn').addClass('on').prop('disabled',false);
	});

	$(RankEventRadio).on('click', function(){
		var $radio = $(this);
		if ( !$(this).closest('.rankList').hasClass('first') )
		{
			if ( $radio.data('waschecked') == true )
			{
				$radio.prop('checked', false);
				$radio.data('waschecked', false);
				if ( $(this).closest('.rankList').hasClass('step1') )
				{
					$(this).closest('.rankList').siblings().find('input[type=radio]').data('waschecked', false).prop('checked', false);
					$(this).closest('.rankList').siblings().find('.dom').slideUp(500, function(){
						$(this).closest('.rankList').animate({
							top:'119px'
						},function(){
							$('.rankList').removeClass('active');
							$(this).closest('.rankSelect').next('.btnBox').children('.btn').removeClass('on').prop('disabled',true);
						});
					});
				}
				if ( $(this).closest('.rankList').hasClass('step2') )
				{
					$(this).closest('.rankList').next().find('input[type=radio]').data('waschecked', false).prop('checked', false);

					$(this).closest('.rankList').next().find('.dom').slideUp(500, function(){
						$(this).closest('.rankList').animate({
							top:'119px'
						},function(){
							$('.rankList.step2').removeClass('active');
						});
					});
				}
			} else {
				$radio.data('waschecked', true);
			}
		}
		$(this).parent('li').siblings().find('input[type=radio]').data('waschecked', false);
	});

	// switch
	$('.typeSwitch').each(function(){
		$(this).find('.switchBtn').eq(1).click(function(){
			$(this).closest('.inner').addClass('on');
		});
		$(this).find('.switchBtn').eq(0).click(function(){
			$(this).closest('.inner').removeClass('on');
		});
	});

	$('.typeSwitch2').each(function(){
		$(this).find('.switchBtn').eq(1).click(function(){
			$(this).closest('.typeSwitch2').addClass('on');
			$('.serviceCont').removeClass('on');
			$('.serviceCont').eq(1).addClass('on');
		});
		$(this).find('.switchBtn').eq(0).click(function(){
			$(this).closest('.typeSwitch2').removeClass('on');
			$('.serviceCont').removeClass('on');
			$('.serviceCont').eq(0).addClass('on');
		});
	});

	
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

	var winHeight = $(window).height();
	$(window).resize(function(){
		var winHeight = $(window).height();
		$('.mainVisual').height(winHeight + 3);
	});

	// 공통
	visualHeight();

	function visualHeight() {
		var tbLng = $('.topBanner').length;
		if (tbLng > 0)
		{
			$('.mainVisual').height(winHeight - 97);
			$('.mainRightVisual').height(winHeight - 97);
			$('.mainLeftVisual').height(winHeight - 97);
		} else {
			$('.mainVisual').height(winHeight + 3);
			$('.mainRightVisual').height(winHeight + 3);
			$('.mainLeftVisual').height(winHeight + 3);
		}
	}

	$('.goPage').click(function(){
		movement = $('.mainVisual').height();
		$('body, html').animate({
			scrollTop:movement
		},500);

	});


	/* ==============================
	 * content 
	 * ============================== */
	 
});

function itemHistory() {
	var hListLng = $('.hListWrap').find('li').length;
	if ( hListLng > 3)
	{
		$('.itemHistory > .item').slick({
			arrows: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true,
			dots: true
		});
	}
}

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

			$el.waypoint(function(){ $el.removeClass('wait-animation'); }, { 
			offset: '150%', triggerOnce: true }); }); }); }


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

	//subTabWrap
	$('.subTabWrap').each(function(tab){
		$(this).children('.subTabList').children('li').each(function(idx){
			$(this).click(function(){
				$(this).parent('.subTabList').children('li').removeClass('on');
				$(this).addClass('on');
				$(this).closest('.subTabWrap').children('.subTabContent').removeClass('on');
				$(this).closest('.subTabWrap').children('.subTabContent').eq(idx).addClass('on');
			});
		});
	});

	// 약관 동의 체크박스
	$('.checkbox.all').click(function(){
		 var chkbox = $(this).find('input');
		 if (chkbox.prop('checked'))
		 {
			 $(this).closest('.agreeWrap').find('.inner').find('input').prop("checked",true);
		 } else {
			 $(this).closest('.agreeWrap').find('.inner').find('input').prop("checked",false);
		 }
	 });

	 $('.agreeWrap > .inner').find('input').each(function(){
		$(this).click(function(){
			if (!$(this).prop('checked'))
			{
				$(this).closest('.agreeWrap').find('.checkbox.all').find('input').prop("checked",false);
			}
		});
	});

	// 상품선택 전체 선택
	$('.checkbox.single.all').click(function(){
		 var chkbox = $(this).find('input');
		 if (chkbox.prop('checked'))
		 {
			 $(this).closest('.table').find('tbody').find('input:checkbox').prop("checked",true);
		 } else {
			 $(this).closest('.table').find('tbody').find('input:checkbox').prop("checked",false);
		 }
	 });

	 $('.table').find('tbody').find('input:checkbox').each(function(){
		$(this).click(function(){
			if (!$(this).prop('checked'))
			{
				$(this).closest('.table').find('.checkbox.single.all').find('input:checkbox').prop("checked",false);
			}
		});
	});

	// faq
	var faqList = $('.faqWrap > li')
	$(faqList).each(function(faq){
		$(this).click(function(){
			if ( $(this).hasClass('on') )
			{
				$(faqList).removeClass('on');
				$(faqList).find('.faqA').slideUp(200);
			} else {
				$(faqList).removeClass('on');
				$(faqList).find('.faqA').slideUp(200);
				$(this).addClass('on');
				$(this).find('.faqA').slideDown(200);
			}
		});
	});

	/// switch
	$('.switch').each(function(){
		$(this).find('.switchBtn').eq(1).click(function(){
			$(this).closest('.switch').addClass('on');
			if ( $(this).closest('.switch').hasClass('cartype') )
			{
				$(this).closest('.switchGroup').addClass('on');
			}
		});
		$(this).find('.switchBtn').eq(0).click(function(){
			$(this).closest('.switch').removeClass('on');
			if ( $(this).closest('.switch').hasClass('cartype') )
			{
				$(this).closest('.switchGroup').removeClass('on');
			}
		});
	});

	//
	$('.lifeStyle').find('.close').click(function(){
		$(this).closest('.lifeStyle').remove();
	});

	// slider 
	$('.slider1').slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		adaptiveHeight: true
	});
	// slick init
	function slickInit() {
		$('.slider1').slick('setPosition');
	}

	//slick btn disabled class
	function AddLeftDisabled() {
		$('.slider1').find('.slick-prev').addClass('slick-disabled');
	}
	function RemoveLeftDisabled() {
		$('.slider1').find('.slick-prev').removeClass('slick-disabled');
	}
	function AddRightDisabled() {
		$('.slider1').find('.slick-next').addClass('slick-disabled');
	}
	function RemoveRightDisabled() {
		$('.slider1').find('.slick-next').removeClass('slick-disabled');
	}

	// 타이어 게이지
	var Gauge = $('.gaugeList').find('.bar');
	var GaugeLng = $('.gaugeList').find('.bar').length;
	for (var i = 0; i < GaugeLng; i++)
	{
		time = i * 300;
		GaugeWidth = $(Gauge).eq(i).data('gauge');
		$(Gauge).eq(i).delay(time).animate({
			width:GaugeWidth+'%'
		}, 800, 'easeOutCirc');
	}

	// 타이어 상세 갤러리
	var tgLeft = $('.prodGalleryViewer').find('.prev');
	var tgRight = $('.prodGalleryViewer').find('.next');
	var tgThumb = $('.prodGalleryThumb').find('li');	
	var tgThumbLng = $('.prodGalleryThumb').find('li').length;
	tireGalleryCnt = 0;

	$(tgLeft).click(function(){
		tireGalleryCnt--;
		tireThumb(tireGalleryCnt);
	});
	$(tgRight).click(function(){
		tireGalleryCnt++;
		tireThumb(tireGalleryCnt);
	});

	$(tgThumb).each(function(i){
		$(this).mouseenter(function(x){
			tireThumb(i);
		});
	});

	function tireThumb(cnt) {
		if ( cnt == 0)
		{
			$(tgLeft).addClass('off');
			tireThumbView(cnt);
		} else if ( cnt < 0)
		{
			cnt = 0;
			tireThumbView(cnt);
		} else if ( cnt == tgThumbLng - 1 )
		{
			$(tgLeft).removeClass('off');
			$(tgRight).addClass('off');
			tireThumbView(cnt);
		} else if ( cnt > tgThumbLng - 1 )
		{
			cnt = tgThumbLng - 1;
		} else if ( cnt > 0 && cnt < tgThumbLng )
		{
			$(tgLeft).removeClass('off');
			$(tgRight).removeClass('off');
			tireThumbView(cnt);
		}
		tireGalleryCnt = cnt;
	}

	function tireThumbView(cnt) {
		var tireThumbImg = $('.prodGalleryThumb').find('li').eq(cnt).html();
		$('.prodGalleryThumb').find('li').siblings().removeClass('on');
		$('.prodGalleryThumb').find('li').eq(cnt).addClass('on');
		$('.prodGalleryViewer > img').remove();
		$('.prodGalleryViewer').append(tireThumbImg);
	}

	$('.fixedBottom').find('.btn').on('click', function(e){
		var bpData = $(this).data('bpoint');
		var BreakPoint = $('.'+ bpData).offset();
		e.preventDefault();
		console.log('class : ' + bpData);
		console.log('class : ' + bpData + ' : BreakPoint : ' + BreakPoint.top);
		$("html, body").animate({
			scrollTop: BreakPoint.top }
		,500);
	});

	// 스크롤 이벤트
	$(window).scroll(function(){
		// 타이어 상세 페이지	
		var FloatingChk = $('.floating').length;
		var Floating2Chk = $('.floating2').length;
		var bPoint1Lng = $('.bPoint1').length;
		
		var Top = $('body, html').scrollTop();
		// 타이어 상품 상세 탭
		var Floating = $('.floating').offset();
		var Floating2 = $('.floating2').offset();
		var BreakPoint1 = $('.bPoint1').offset();

		// 상품상세 플로팅버튼
		if (bPoint1Lng > 0)
		{
			if ( Top > BreakPoint1.top + 298 )
			{
				$('.fixedBottom').addClass('on');
			} else {
				$('.fixedBottom').removeClass('on');
			}
		}

		if (FloatingChk > 0)
		{
			if ( Top > Floating.top)
			{
				$('.floating').find('.tabList').addClass('fixed');
				$('.floating').addClass('pt62');
			} else {
				$('.floating').find('.tabList').removeClass('fixed');
				$('.floating').removeClass('pt62');
			}
		}

		if (Floating2Chk > 0)
		{
			if ( Top > Floating2.top)
			{
				$('.floating2').find('.tabList').addClass('fixed');
				$('.floating2').addClass('pt62');
			} else {
				$('.floating2').find('.tabList').removeClass('fixed');
				$('.floating2').removeClass('pt62');
			}
		}

		// 장바구니
		var CartLng = $('.orderView').length;
		var CartBaseTop = $('.paymentWrap').offset();
		var CartTop = $('.orderView').offset();
		if (CartLng > 0)
		{
			if ( Top > CartBaseTop.top + 74)
			{
				$('.orderView').removeClass('fix');
				$('.orderView').css('top',Top - CartBaseTop.top);
			} else {
				$('.orderView').addClass('fix');
			}
		}

		// wingBanner Break Main
		var MainVisualLng = $('.mainVisual').length;
		var itemContWrapOff = $('.itemContWrap').offset();
		if (MainVisualLng >= 1)
		{
			if ( Top < itemContWrapOff.top )
			{
				$('.wing').addClass('on');
				$('.wing').css('top',itemContWrapOff.top);
			}
			if ( Top + 176 > itemContWrapOff.top )
			{
				$('.wing').removeClass('on');
				$('.wing').css('top','');
			}
		}
	});

	var Top = $('body, html').scrollTop();
	var MainVisualLng = $('.mainVisual').length;
	var itemContWrapOff = $('.itemContWrap').offset();
	if (MainVisualLng >= 1)
	{
		if ( Top < itemContWrapOff.top )
		{
			$('.wing').addClass('on');
			$('.wing').css('top',itemContWrapOff.top);
		}
		if ( Top + 176 > itemContWrapOff.top )
		{
			$('.wing').removeClass('on');
			$('.wing').css('top','');
		}
	}

	// 타이어 상세 설정 탭
	/*
	$('.settingList > li > .tit').each(function(){
		$(this).click(function(){
			$(this).parent('li').siblings().removeClass('on');
			$(this).parent('li').addClass('on');
		});
	});
	*/

	// 타이어 종류 셀렉트
	$('.makerGroup1').each(function(){
		$(this).find('label').click(function(){
			$(this).closest('.makerGroup').find('.makerSelect').prop('selectedIndex',0);
		});
	});
	$('.makerGroup2').each(function(){
		$(this).find('.makerSelect').change(function(){
			$(this).closest('.makerGroup').find('input[type="radio"]').prop('checked', false);
		});
	});

	//tabContent
	$('.carTypeSelect > li').click(function(){
		$(this).closest('.tabWrap').find('.tabContent').find('.makerSelect').prop('selectedIndex',0);
		$(this).closest('.tabWrap').find('.tabContent').find('input[type="radio"]').prop('checked', false);
	});

	// input file
	var fileTarget = $('.fileBox .upload-hidden');
	fileTarget.on('change', function(){
		// 값이 변경되면 
		if(window.FileReader){// modern browser 
			var filename = $(this)[0].files[0].name;
		} 
		else { // old IE 
			var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
		} 
		// 추출한 파일명 삽입 
		$(this).closest('.fileBox').find('.upload-name').val(filename); 
	});


	// popup
	$('.popupOpen').click(function(e){
		var NameValue = $(this).data('name');
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
	var visualListClickCnt = 0;
	if (visualListLng < 3)
	{
		$('.visualList').find('.btnVL').hide();
	}

	$('.visualList').find('.btn_next').on('click', function(){
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
		} else {
			visualListClickCnt = MaxEvent;
		}
	});

	$('.visualList').find('.btn_prev').on('click', function(){
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

$(window).load(function(){
	//alert('z');
});