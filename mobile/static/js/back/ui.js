$(function(){
	
	/* ==============================
	 * common
	 * ============================== */
	
	selectMake();
	selectMakeUI();
	uiMain.init();
	uiForm();
	topBanner();

	//datepicker
	if($('.datepicker').size() > 0){
		$( '.datepicker' ).datepicker({
			closeText: '닫기',
			prevText: '이전 달',
			nextText: '다음 달',
			currentText: '오늘',			
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			dayNames: ['일','월','화','수','목','금','토'],
            dayNamesShort: ['일','월','화','수','목','금','토'],
            dayNamesMin: ['일','월','화','수','목','금','토'],
			dateFormat: 'yy.mm.dd',
			showMonthAfterYear: true,
			changeMonth: true,
      		changeYear: true,
      		yearSuffix: '년',
			showOn: 'button',
			buttonText: '기간조회'
		});
	}

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

	// 탭 메뉴
	$('.tabMenu').each(function(tab){
		$(this).children('.tabList').children('li').each(function(idx){
			$(this).click(function(){
				$(this).parent('.tabList').children('li').removeClass('on');
				$(this).addClass('on');
				$(this).closest('.tabMenu').children('.tabContent').removeClass('on');
				$(this).closest('.tabMenu').children('.tabContent').eq(idx).addClass('on');
			});
		});
	});

	
	/* ==============================
	 * gnb 
	 * ============================== */



	/* ==============================
	 * content 
	 * ============================== */
	// affiliate card 
	var menuOpt = $('.optionList .optionTitle')
	var menuOptList = $('.optionList > ul')
	
	$(menuOpt).click(function(){
		if ( $(menuOpt).hasClass('on') )
		{
			$(menuOpt).removeClass('on');
			$(menuOptList).slideDown(200);
		} else {
			$(menuOptList).slideUp(200);
			$(menuOpt).addClass('on');
		}
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

	// search rental shop
	var toggleBtn = $('.searchShop > .btnTogl')
	var searchArea = $('.searchShop > .searchWrap')

	$(toggleBtn).click(function(){
		if ( $(toggleBtn).hasClass('on') )
		{
			$(searchArea).slideUp(200);
			$(toggleBtn).removeClass('on');			
		} else {
			$(searchArea).slideDown(200);
			$(toggleBtn).addClass('on');
		}
	});

	// 렌탈전문점
	var galleryThumbs = new Swiper('.galleryThumbs', {
		spaceBetween: 10,
		slidesPerView: 3,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	  });
	  var galleryTop = new Swiper('.galleryView', {
		spaceBetween: 15,
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		},
		thumbs: {
		  swiper: galleryThumbs
		}
	  });

	// 타이어 상품 갤러리
	var swiper = new Swiper('.photoSlide', {
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		},
		pagination: {
		  el: '.swiper-pagination',
		},
	 });

	  //타이어 간편 조회 툴팁 레이어
	var toolTipInfo = $('.easySearchInfo .toolTipInfo')
	$('.searchOptList .tireSize').click(function(){	
		console.log('test');
		$(toolTipInfo).hide();
		$(toolTipInfo).eq(1).show();
	});

	$('.searchOptList .member').click(function(){	
		console.log('test');
		$(toolTipInfo).hide();
		$(toolTipInfo).eq(2).show();
	});
	
	//타이어 검색 
	var btnTireSearh = $('.tireSearchWrap .btnSearch')
	var searchCont = $('.tireSearchWrap > .searchWrap')

	$(btnTireSearh).click(function(){
		if ( $(btnTireSearh).hasClass('on') )
		{
			$(searchCont).slideUp(200);
			$(btnTireSearh).removeClass('on');	
			$('.dimCont').css({display:'none'});			
		} else {
			$(searchCont).slideDown(200);
			$(btnTireSearh).addClass('on');
			$('.dimCont').css({display:'block'});	
		}
	});

	var radioVal = $('.searchOpt .radiobtnGroup:nth-child(1)') 
	var radioVal2 = $('.searchOpt .radiobtnGroup:nth-child(2)')

	$(radioVal).children('label').each(function(idx){
		$(this).click(function(){
			$(this).closest('.searchOpt').siblings('.searchOptList').removeClass('on');
			$(this).closest('.searchOpt').siblings('.searchOptList').eq(idx).addClass('on');
			
			if (idx == 1){
				$(radioVal2).css({display:'none'});
			}else{
				$(radioVal2).css({display:'flex'});
			}	
		});
	});

});


/* ==============================
	* main 
* ============================== */
var uiMain = {
	init : function(){
		this.close(); // 전체 메뉴
		this.menu(); // 전체 메뉴
		this.goTop(); // top버튼 클릭시 페이지 상단으로 이동
		this.nav(); // gnb메뉴
		this.botNavList(); // gnb메뉴
	},

	menu : function() {
		$('.totalMenu').on('click',function() {
			$('.overlay').css({display:'block'});
			TweenMax.to('.overlay',0.5,{opacity:0.8});
			TweenMax.to('#gnb', 0.5, {left:'0'});

			$('body').addClass('noScroll');		
		});
	},

	close : function() {
		$('.closeTotalMenu').on('click',function() {
			TweenMax.to('#gnb', 0.5, {left:'100%'});
			TweenMax.to('.overlay',0.5,{opacity:0,onComplete:function() {
				$('.overlay').css({display:'none'});
			}});	

			$('body').removeClass('noScroll');		
		});
	},
	
	nav : function() { 
		 $('.dep1 > li').on('click', function(){
			var $idx = $(this).index();
			$(this).addClass('on').siblings().removeClass('on');			
			
			$('.dep2, .dep2 > li').removeClass('on');
			$('.subnav .dep2').eq($idx).addClass('on');
		});
		
		$('.dep2 > li').on('click', function(){
			$(this).addClass('on').siblings().removeClass('on');			
		});
	},

	goTop : function() {
		$(document).on("click", '.btnGoTop', function(e){
			$(document).scrollTop(0);
			e.preventDefault();
		});
	},

	botNavList : function(){
		// 플로팅메뉴 클릭 시 서브메뉴 노출
		$('.floatingMenu .mypage a').on('click', function(e){
			e.preventDefault();

			$('.floatingWrap').css('display', 'block');
			$('.floatingCont.mypage').show();
			$('body').addClass('noScroll');
			
		});

		$('.floatingMenu .consult a').on('click', function(e){
			e.preventDefault();

			$('.floatingWrap').css('display', 'block');
			$('.floatingCont.consult').show();
			$('body').addClass('noScroll');
		});

		$('.floatingCont .btnClose').on('click', function(){
			$(this).parent().hide();
			$('body').removeClass('noScroll');
		});
	}
}; 

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

function uiForm() {
	var radioForm = 'input[type=radio]';

	//라디오버튼
	$(radioForm).each(function () {
		if ($(this).prop('checked') == true) {
			var labelFor = $(this).attr('id');
			$('[for="'+labelFor+'"]').addClass('on');
		}
		if($(this).prop('disabled') == true){
			$(this).parent().addClass('disabled');
		}
	});

	$(document).on('click', radioForm, function () {
		var labelFor = $(this).attr('id');
		var n = $(this).attr('name');
		$('[name="' + n + '"]').parent().removeClass('on');
		$('[for="'+labelFor+'"]').addClass('on');
	});

	// label + select 
	var selectTarget = $('.tireSearch .selectBox select'); 

	selectTarget.on('focus',function(){ 
		$(this).parent().addClass('focus');
	}); 

	selectTarget.on('blur', function(){ 
		$(this).parent().removeClass('focus'); 
	});

	selectTarget.change(function(){ 
		var select_name = $(this).children('option:selected').text();
		
		$(this).siblings('label').text(select_name); 
		$(this).parent().removeClass('focus'); 
	});


}

// 띠배너
function topBanner() {
	$('.topBanner .btnClose').bind("click", function(){
		$('.topBanner').animate({height: 0}, 500);
	});
}


$(window).scroll(function() {
	var st = $(this).scrollTop();
	var fixedStartY = 50;	

	if(st > fixedStartY) {
		$('#headerWrap').addClass('fixed');
		$('.topBanner').hide();

		$('.btnGoTop').addClass('active');
		$('.fixBotNav').fadeIn(200);

	} else {
		$('#headerWrap').removeClass('fixed');
		$('.topBanner').show();

		$('.btnGoTop').removeClass('active');
		$('.fixBotNav').fadeOut(200);
	}

	// 하단고정네비 노출에 따른 height 설정
	$('.fixBotNav:visible').each(function(){
		$(this).closest('#wrap').css('padding-bottom' , $(this).outerHeight() );
	});

	// 타이어 상품
	$('.sectionTire .fixedBot:visible').each(function(){
		$(this).closest('#wrap').css('padding-bottom' , $(this).outerHeight() );
	});

});


