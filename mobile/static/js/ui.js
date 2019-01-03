$(function(){
	
	/* ==============================
	 * common
	 * ============================== */
	
	uiMain.init();
	uiForm();
	// footerFix();

	// 메인 
	tireContSelect();
	tireOptSelect();
	tireRentalSearch();

	SwiperActMain();
	TopBanner();
	dateGroup();
	cartOpt();
	DateInput();
	slideCont();
	inpReset();

	// 타이어-상품상세 탭
	if ($('.productViewWrap').length > 0) { fixedMoveTab(); } 
	
	GradeSelect()

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

	// 나의정보 - 기간선택 버튼
	$('.sortBtn li').on('click', function(e){
		e.preventDefault();
		
		$(this).addClass('on').siblings().removeClass('on');
	})

	/* ==============================
	 * content 
	 * ============================== */

	function GradeSelect() {
		$('.gradeSelect').change(function(){
			grade = $(this).children('option:selected').data('grade');
			console.log(grade);
			$(this).closest('td').find('.grade').children('span').attr('class','').addClass(grade);
		});
	}

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
	var searchShop = $('.searchShop');
	var toggleBtn = $('.searchShop > .btnTogl')
	var searchArea = $('.searchShop > .searchWrap')

	$(toggleBtn).click(function(){
		if ( $(toggleBtn).hasClass('on') )
		{
			$(searchArea).slideUp(200);
			$(toggleBtn).removeClass('on');			
			$(searchShop).addClass('close');
		} else {
			$(searchArea).slideDown(200);
			$(toggleBtn).addClass('on');		
			$(searchShop).removeClass('close');
		}
	});

	// 렌탈전문점 매장위치&섬네일 슬라이드
	$('.storeThumbs .swiper-slide').mouseenter(function(){
		$('.storeSlideWrap').find('.mapArea').removeClass('on');
	}).mouseleave(function(){
		$('.storeSlideWrap').find('.mapArea').addClass('on');
	});

	var galleryTop = new Swiper('.storeView', {
		spaceBetween: 0,
		thumbs: {
			swiper: {
				el: '.storeThumbs',
				spaceBetween: 5,
				slidesPerView: 3,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			}
		}
	});

	var rentalshopSlideLng = $('.storeThumbs').find('.swiper-slide').length;
	if (rentalshopSlideLng < 4)
	{
		$('.storeSlideWrap').find('.swiper-button-next').hide();
		$('.storeSlideWrap').find('.swiper-button-prev').hide();
	}

	// 타이어 상품 갤러리
	var xswiper = new Swiper('.photoSlide', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
		},
	});

	var tubeLng = $('.tube').length;
	var tubeIndex = $('.tube').index();

	if (tubeIndex > 0)
	{
		xswiper.on('slideChangeTransitionEnd', function () {
			var idx = $('.swiper-pagination-bullet-active').index();
			if (idx != tubeIndex)
			{
				$('#popup-youtube-player')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
				$('.productViewWrap').find('.badge').show(); // 동영상 플레이 때 노출관련 
			} else {
				$('.productViewWrap').find('.badge').hide(); // 동영상 플레이 때 노출관련
			}
		});
	}

	// 장바구니 주문/결제
	var orderSlideLng = $('.orderSlide').find('.swiper-slide').length;
	if (orderSlideLng > 1)
	{
		var swiper = new Swiper('.orderSlide', {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
				pagination: {
				el: '.swiper-pagination',
			},
		});
	} else if (orderSlideLng == 1)
	{
		$('.orderSlide').find('.swiper-button-next').hide();
		$('.orderSlide').find('.swiper-button-prev').hide();
	}

	// 나의정보
	var itemSlideLng = $('.itemSlide').find('.swiper-slide').length;
	if (itemSlideLng > 1)
	{
		var swiper = new Swiper('.itemSlide', {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
				pagination: {
				el: '.swiper-pagination',
			},
		});
	} else if (itemSlideLng == 1)
	{
		$('.itemSlide').find('.swiper-button-next').hide();
		$('.itemSlide').find('.swiper-button-prev').hide();
	}

	//타이어 간편 조회 툴팁 레이어
	var toolTipInfo = $('.easySearchInfo .toolTipInfo')
	$('.searchOptList .tireSize').click(function(){	
		$(toolTipInfo).hide();
		$(toolTipInfo).eq(1).show();
	});

	$('.searchOptList .member').click(function(){	
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

	//렌탈상품 QnA
	var btnDetailView = $('.qnaDetailWrap .btn')

	$(btnDetailView).each(function(qna){
		$(this).click(function(){
			if ( $(this).hasClass('on') )
			{
				$(btnDetailView).removeClass('on');
				$(this).removeClass('on');				
				$(this).siblings('.qnaA').slideUp(200);
			} else {
				$(btnDetailView).removeClass('on');
				$(this).addClass('on');
				$('.qnaDetailWrap').find('.qnaA').slideUp(200);
				$(this).siblings('.qnaA').slideDown(200);
			}
		});
	}); 
});


/* ==============================
	* main 
* ============================== */
var uiMain = {
	init : function(){
		this.close(); // 전체메뉴 닫기
		this.menu(); // 전체메뉴
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

function SwiperActMain() {
	var swipermAct = $('.mainSwiper').find('.swiper-slide').length;
	if ( swipermAct > 1)
	{
		var swiper = new Swiper('.swiper-main', {
			loop: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
			},
			autoplay: {
				delay: 2500,
			},
		});
	} else {
		$('.swiper-container').find('.swiper-button-next').hide();
		$('.swiper-container').find('.swiper-button-prev').hide();
	}
}

function TopBanner() {

	$('.topBanner .btnClose').bind("click", function(){
		$('.topBanner').animate({height: 0}, 500);
	});

	var tBlng = $('.topBanner').find('.swiper-slide').length;
	if (tBlng > 1)
	{
		var swiper = new Swiper('.tbswiper', {
			loop : true,
			pagination: {
				el: '.swiper-pagination',
			},
			autoplay: {
				delay: 2500,
			},
		});	
	}
}

function dateGroup() {
	//렌탈상품 년도 그룹 swipper
	var dateGroupLng = $('.dateGroup').find('.swiper-slide').length;
	if (dateGroupLng > 0)
	{
		var swiper = new Swiper('.dateGroup', {
			slidesPerView: 'auto',
			spaceBetween: 10,
		});
	}

	$('.dateGroup').find('.advTab').each(function(i){
		$(this).on('click', function(){
			$('.dateGroup').find('.advTab').removeClass('on');
			$(this).addClass('on');
			$(this).closest('.dateGroup').next('.advWrap').children('.advCont').removeClass('on');
			$(this).closest('.dateGroup').next('.advWrap').children('.advCont').eq(i).addClass('on');
		});
	});
}

function inpReset(){
	// 검색 입력 초기화
	$('.inpReset').click(function(){
		$(this).prev('.inp').val('');
		$(this).hide();
	});

	var InpObj = $('input:text, input:password');
	$(InpObj).on('keyup', function(e) {
		if($(this).val().length >= 1) {
			$(this).next('button').css('display','block');
		}
		if ( $(this).val().length == 0 )
		{
			$(this).next('button').css('display','none');
		}
	});
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

			$el.waypoint(function(){
				$el.removeClass('wait-animation');
			}, { offset: '100%', triggerOnce: true });
		});
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

	
}

// 메인 - 타이어검색 탭영역
function tireContSelect() {

	$('.tireContWrap .tab li a').on('click', function(e){
		e.preventDefault();
		
		$(this).parent().addClass('on').siblings().removeClass('on');
	
		var dataID = $(this).attr('href').substring(1);
		$('#' + dataID ).siblings().hide().end().show();
	});

	var tabTire = $('.tireContWrap .tab li:nth-child(1)');
	var tabRental = $('.tireContWrap .tab li:nth-child(2)');
	var tabCare = $('.tireContWrap .tab li:nth-child(3)');
	var mainIntroBg = $('.mainIntro');  

	tabTire.on('click', function(){
		mainIntroBg.addClass('mainIntro').removeClass('rental service');
	});
	tabRental.on('click', function(){
		mainIntroBg.addClass('mainIntro rental').removeClass('service');
	});
	tabCare.on('click', function(){
		mainIntroBg.addClass('mainIntro service').removeClass('rental');
	});
}

// 메인 - 타이어 찾기(차종or사이즈)
function tireOptSelect() {
	var $tireOpt = $('.tireOptSelect input[type="radio"]');
	
	$($tireOpt).change(function(){
		
		if($(this).attr('value') == "carType"){
			$('.optCont.carType').show();
			$('.optCont.tireSize').hide();
		}

		if($(this).attr('value') == "tireSize" ){
			$('.optCont.tireSize').show();
			$('.optCont.carType').hide();
		} 
	}); 
}

// 메인 - 렌탈상품 추천flow
function tireRentalSearch() {
	var $tireRental = $('.tireRental');
	var $tireRentalSelect = $tireRental.find('.selectBox select');
	var $tireRentalBtn = $tireRental.find('.btnSearch');
	var $firstSelect = $tireRental.find('.selectBox:first-child select');

	$firstSelect.change(function(){
		var $this = $(this);
		var selectedIndex = this.selectedIndex;
		var $nextAll = $this.closest('.selectBox').nextAll('.selectBox');
		var select_name = $this.children('option').eq(selectedIndex).text();
		
		$this.siblings('label').text(select_name); 

		if( selectedIndex === 0 ) {
			$nextAll.addClass('disabled').find('select').prop('disabled', true).prop('selectedIndex', 0).trigger('change');
			$tireRentalBtn.prop('disabled', true);
		} else {
			$tireRentalBtn.prop('disabled', false);
		}
	}); 

	$tireRentalSelect.change(function(){ 
		var $this = $(this);
		var selectedIndex = this.selectedIndex;
		var $next = $this.closest('.selectBox').next('.selectBox');
		var select_name = $this.children('option').eq(selectedIndex).text();
		
		$this.siblings('label').text(select_name); 
		
		if( selectedIndex === 0 ) {
			$next.addClass('disabled').find('select').prop('disabled', true).prop('selectedIndex', 0).trigger('change');
		} else {
			$next.removeClass('disabled').find('select').prop('disabled', false);
		}
	});
}

// cart option change
function cartOpt() {
	var opChangeBtn = $('.cartList li').find('.btnOpt.viewopt');
	$(opChangeBtn).on('click', function(){
		if ( $(this).hasClass('on') )
		{
			$(this).removeClass('on').text('옵션변경');
			$(this).closest('li').find('.optionview').hide();
		} else if ( !$(this).hasClass('on') )
		{
			$(this).addClass('on').text('옵션닫기');
			$(this).closest('li').find('.optionview').show();
		}
	});

	$('.cartList .btnOptChange').on('click', function(){
		$(this).closest('.optionview').hide();
		$(this).closest('li').find('.btnOpt').removeClass('on').text('옵션변경');
	});
}


// input type date
function DateInput() {
	var InpDate = $('input[type=date]');
	$(InpDate).each(function(){
		$(this).on('change', function(){
			if($(this).val()) {
				$(this).next('label').css('display','none');
			}
			if ( !$(this).val() )
			{
				$(this).next('label').css('display','block');
			}
		});
	});
}

function slideCont() {
	var slideBtn = $('.slideContBtn');
	$(slideBtn).each(function(){
		$(this).click(function(){
			if ( $(this).hasClass('on') )
			{
				$(this).removeClass('on');
				$(this).closest('.slideCont').siblings().find('.slideContBtn').removeClass('on');
				$(this).closest('.slideCont').siblings().find('.inner').stop(true, false).slideUp();
				$(this).closest('.slideCont').find('.inner').stop(true, false).slideUp();
			} else {
				$(this).addClass('on');
				$(this).closest('.slideCont').siblings().find('.slideContBtn').removeClass('on');
				$(this).closest('.slideCont').siblings().find('.inner').stop(true, false).slideUp();
				$(this).closest('.slideCont').find('.inner').stop(true, false).slideDown();
			}
		});
	});
}

// 플로팅메뉴
$(window).load(function(){
	
	$(window).scroll(function() {
		var st = $(this).scrollTop();
		var fixedStartY = 50;	
	
		if(st > fixedStartY) {
			$('#headerWrap').addClass('fixed');
	
			$('.btnGoTop').addClass('on');

			$('.floatingWrap').addClass('fixBotNav');
			$('#footerWrap').addClass('on');

	
		} else {
			$('#headerWrap').removeClass('fixed');
	
			$('.btnGoTop').removeClass('on');

			$('.floatingWrap').removeClass('fixBotNav');
			$('#footerWrap').removeClass('on');
		}

	});
});

// 장바구니 플로팅 전체금액
$(window).load(function(){
	$(window).scroll(function(){
		var itemTotalLng = $('.itemTotal').length;
		if (itemTotalLng > 0)
		{
			cartTotal();
		}
	});
	var itemTotalLng = $('.itemTotal').length;
	if (itemTotalLng > 0)
	{
		cartTotal();
	}
	function cartTotal() {
		var top = $('body, html').scrollTop();
		var windowH = $(window).height();
		var itemTotalH = $('.itemTotal').outerHeight();
		var itemTotalCont = $('.itemTotalCont');
		var bpObj = $('.itemTotalCont').offset();
		var bp = (bpObj.top + itemTotalH) - windowH;
		$(itemTotalCont).height(itemTotalH);
		if ( top > bp)
		{
			$('.itemTotal').addClass('on');
		} else {
			$('.itemTotal').removeClass('on');
		}
	}
});

// 상품상세 - fixed Tab
function fixedMoveTab (){
	var $tabWraper = $('.tabList');
	var $contentTab = $tabWraper.find('a');
	var $contentWrap = $('.tabContent'); 

	var tabHeight = $('.tabList').height(); //fixed된 탭영역
	var onTabIdx = 0;
	var moveTime = 300;

	var tabMove = function () {
		var winScrollTop = $(window).scrollTop();
		var contentHeight = $('.tabMenu').height();
		var contentOffsetTop = $('.tabMenu').offset().top;

		if (winScrollTop < contentOffsetTop) {
			$tabWraper.removeClass('fixed');
		} else {
			$tabWraper.addClass('fixed');
		}
	};

	$(window).on('load scroll', tabMove);

	$contentTab.on('click', function(e) {
		var $target = $(this.hash);
		var targetOffset = $target.offset().top;

		$('html,body').stop().animate({
			scrollTop : targetOffset - tabHeight
		}, moveTime);

		e.preventDefault();
	});
}