jQuery(window).load(function () {
    "use strict";
   	jQuery("#status").fadeOut();
	jQuery("#preloader").delay(350).fadeOut("slow");
});


var breakingStart = true; // autostart breaking news
var breakingSpeed = 40; // breaking msg speed

var breakingScroll = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var breakingOffset = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var elementsToClone = [true, true, true, true, true, true, true, true, true, true];
var elementsActive = [];
var theCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


(function ($) {
    "use strict";


$(document).ready(function ($) {
	
	/*********color change script*******/
		$('.colorchange').on('click', function(){
			var color_name=$(this).attr('id');
			var new_style='css/color/'+color_name+'.css';
			$('#theme-color').attr('href',new_style);
			$('.colorchange').removeClass('active');
			$(this).addClass('active');
		});
		
		$('.pattern_change').on('click', function(){
			var name=$(this).attr('id');
			$('.pattern_change').removeClass('active');
			$(this).addClass('active');
			var new_style='css/pattern/'+name+'.css';
			$('#theme-pattern').attr('href',new_style);
		});
	
	/* mail function */
	$('#em_sub').on('click', function(){
		var un=$('#uname').val();
		var em=$('#uemail').val();
		var wsite=$('#web_site').val();
		var meesg=$('#message').val();
		
		$.ajax({
				type: "POST",
				url: "ajaxmail.php",
				data: {
					'username':un,
					'useremail':em,
					'website':wsite,
					'mesg':meesg,
					},
				success: function(msg) {
			var full_msg=msg.split("#");
					if(full_msg[0]=='1')
					{
						$('#uname').val("");
						$('#uemail').val("");
						$('#web_site').val("");
						$('#message').val("");
						$('#err').html( full_msg[1] );
					}
					else
					{
						$('#uname').val(un);
						$('#uemail').val(em);
						$('#web_site').val(wsite);
						$('#message').val(meesg);
						$('#err').html( full_msg[1] );
					}
				}
			});
		});
	
	


	$("#style-switcher .bottom a.settings").on('click', function(e){
			e.preventDefault();
			var div = $("#style-switcher");
			if (div.css("left") === "-161px") {
				$("#style-switcher").animate({
					left: "0px"
				}); 
			} else {
				$("#style-switcher").animate({
					left: "-161px"
				});
			}
		});
	
	
		$('#style-switcher').mouseleave(function(){
				$("#style-switcher").animate({
						left: "-161px"
				});
		});
	/******color change script end******/
	
	
	// portfolio single page gallery
	//$('.oracle_single_portfolio_gallery .owl-carousel').owlCarousel({
//		items:1,
//		loop:true,
//		margin:10,
//		responsiveClass:true,
//		responsive:{
//			0:{
//				items:1,
//				nav:true
//			},
//			600:{
//				items:1,
//				nav:false
//			},
//			1000:{
//				items:1,
//				nav:true,
//				loop:false
//			}
//		}
//	})
		
		//gallery-single-with-thumb slider
		var sync1 = $("#slider");
		var sync2 = $("#thumbnails");
		var flag = false;
		var slides = sync1.owlCarousel({
			margin: 10,
			loop: true,
			items: 1,
			nav: false
		}).on('change.owl.carousel', function (e) {
			if (e.namespace && e.property.name === 'position' && !flag) {
				flag = true;
				thumbs.to(e.relatedTarget.relative(e.property.value), 300, true);
				flag = false;
			}
		}).data('owl.carousel');
		var thumbs = sync2.owlCarousel({
			items: 10,
			margin: 10,
			center:true,
			loop: true,
			nav: false,
			responsive:{
				0:{
					items:5
				},
				600:{
					items:5
				},            
				960:{
					items:8
				},
				1200:{
					items:10
				}
			}
		}).on('click', '.item', function (e) {
			e.preventDefault();
			$('#thumbnails .item').removeClass('active');
			$(this).addClass('active');
			sync1.trigger('to.owl.carousel', [$(e.target).parents('.owl-item').index(), 300, true]);
		}).on('change.owl.carousel', function (e) {
			if (e.namespace && e.property.name === 'position' && !flag) {
				//nsole.log('...');
			}
		}).data('owl.carousel');
 
	
		sync2.on('mousewheel', '.owl-stage', function (e) {
			if (e.deltaY>0) {
				sync2.trigger('next.owl');
			} else {
				sync2.trigger('prev.owl');
			}
			e.preventDefault();
		});
	
	
	// mixed gallery
	$('.oracle_mix_gallery .owl-carousel').owlCarousel({
        items:1,
        merge:true,
        loop:true,
        margin:10,
		autoplay:true,
        video:true,
		lazyLoad:true,
		dots:true,
		center:true,
        responsive:{
            480:{
                items:2
            },
            600:{
                items:4
            }
        }
    })
	
	// vimoe thumb image 
	 //jQuery('.item-video').find('.owl-lazy').each(function() {
//        setTimeout(function () {
//			var img = this;
//			var url = $(this).attr('data-src');
//			jQuery(this).css('opacity','1');
//			jQuery(this).css('background-image', 'url(' + url + ')');
//			
//		   }, 3000);
//     });
	 
    
	// Breaking News Scroller
        jQuery(".oracle_latest_news").mouseenter(function () {
            var thisindex = jQuery(this).attr("rel");
            clearTimeout(elementsActive[thisindex]);
        }).mouseleave(function () {
            var thisindex = jQuery(this).attr("rel");
            elementsActive[thisindex] = false;
        });

        start();
	
	
	
	//wp sub-menu level
	$('.sub-menu li').hover(function(){
		if($(this).children('.sub-menu').length != 0){
			$(this).addClass('dropdown-submenu');
		}
	});
	
	// fixed menu on scroll
	var width = $(document).width();
    if (width > 991) {
		$(window).scroll(function(){
			var slider_hight = $(window).innerHeight();
			var window_top = $(window).scrollTop() + 1; 
				if (window_top > 100) {
					$('.oracle_menu').addClass('oracle_fixed_menu').addClass('animated fadeInDown');
				} else {
					$('.oracle_menu').removeClass('oracle_fixed_menu').removeClass('animated fadeInDown');
				}
		});
	}
	else{
		$('.oracle_menu').removeClass('oracle_fixed_menu').removeClass('animated fadeInDown');
		}
	
	// club photo image popup
	$(".fancybox").fancybox({
          openEffect	: 'elastic',
		  closeEffect	: 'elastic',
		  enableAutosize: true,
		  helpers : 
			{
				overlay: 
				{ 
					locked: false 
				} 
			}
      });	
	// vimeo video popup
	$('.vimeo').fancybox({ 
		openEffect	: 'elastic',
		closeEffect	: 'elastic',
		enableAutosize: true,
		padding: 0, //optional 
		type: 'iframe' 
	});
	
	// youtube video popup
	$('.youtube').fancybox({ 
		openEffect	: 'elastic',
		closeEffect	: 'elastic',
		enableAutosize: true,
		padding: 0, //optional 
		type: 'iframe' 
	});
	
	
	
	
	// menu toggle
    $('.oracle_menu_toggle a').on('click', function () {
        $('.oracle_menu').slideToggle(200);
    });

	//accordion
	jQuery(function ($) {
		var $active = $('#accordion .panel-collapse.in').prev().addClass('active');
		$active.find('a').prepend('<i class="fa fa-minus-square-o"></i>');
		$('#accordion .panel-heading').not($active).find('a').prepend('<i class="fa fa-plus-square-o"></i>');
		$('#accordion').on('show.bs.collapse', function (e) {
			$('#accordion .panel-heading.active').removeClass('active').find('.fa').toggleClass('fa-plus-square-o fa-minus-square-o');
			$(e.target).prev().addClass('active').find('.fa').toggleClass('fa-plus-square-o fa-minus-square-o');
		})
	});
	
	// smooth scroll
	$.smoothScroll();
	

    // Submenu Check Visible Space
    $("#mainMenu li.dropdown-submenu").hover(function () {

        if ($(window).width() < 767) return;

        var subMenu = $(this).find("ul.sub-menu");

        if (!subMenu.get(0)) return;

        var screenWidth = $(window).width(),
            subMenuOffset = subMenu.offset(),
            subMenuWidth = subMenu.width(),
            subMenuParentWidth = subMenu.parents("ul.sub-menu").width(),
            subMenuPosRight = subMenu.offset().left + subMenu.width();

        if (subMenuPosRight > screenWidth) {
            subMenu.css("margin-left", "-" + (subMenuParentWidth + subMenuWidth + 10) + "px");
        } else {
            subMenu.css("margin-left", 0);
        }

    });

	
	// Responsive Menu Events
	
	// $('#mainMenu li').has('ul').addClass('oracle_dropdown');
	// var window_width = $(document).width();
	// if (window_width < 767) {
		// $("#mainMenu li.oracle_dropdown").append("<span class='dropdown_toggle'></span>");	
		
		// $('#mainMenu li').children('.dropdown_toggle').on('click', function(){
			// $(this).prev('ul.sub-menu').slideToggle();	
		// });
	// }
	
	
    var addActiveClass = false;

    $("#mainMenu > li > a, #mainMenu > li.dropdown-submenu > a").on("click", function (e) {

        if ($(window).width() > 979) return;

        e.preventDefault();

		addActiveClass = $(this).parent().hasClass("resp-active");
        

        $("#mainMenu").find(".resp-active").removeClass("resp-active");

        if (!addActiveClass) {
            $(this).parents("li").addClass("resp-active");
        }

        return;

    });



    // Mobile Redirect
    $(".mobile-redirect").on("click", function () {
        if ($(window).width() < 991) {
            self.location = $(this).attr("href");
        }
    });
	
	
	// video js mediaelementplayer	
	$('video').mediaelementplayer({
		success: function(media, node, player) {
			$('#' + node.id + '-mode').html('mode: ' + media.pluginType);
		}
	});
	


	$('.oracle_feature_video_list > ul').each(function(){
		// For each set of tabs, we want to keep track of
		// which tab is active and it's associated content
		var $active, $content, $links = $(this).find('a');
	
		// If the location.hash matches one of the links, use that as the active tab.
		// If no match is found, use the first link as the initial active tab.
		$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
		$active.addClass('active');
	
		$content = $($active[0].hash);
	
		// Hide the remaining content
		$links.not($active).each(function () {
		  $(this.hash).hide();
		});
	
		// Bind the click event handler
		$(this).on('click', 'a', function(e){
		  // Make the old tab inactive.
		  $active.removeClass('active');
		  $content.hide();
	
		  // Update the variables with the new link and content
		  $active = $(this);
		  $content = $(this.hash);
	
		  // Make the tab active.
		  $active.addClass('active');
		  $content.fadeIn();
	
		  // Prevent the anchor's default click action
		  e.preventDefault();
		});
	  });
	  
	 
	 


		$('.social_widget_tab > ul').each(function(){
			// For each set of tabs, we want to keep track of
			// which tab is active and it's associated content
			var $active, $content, $links = $(this).find('a');
		
			// If the location.hash matches one of the links, use that as the active tab.
			// If no match is found, use the first link as the initial active tab.
			$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
			$active.addClass('active');
		
			$content = $($active[0].hash);
		
			// Hide the remaining content
			$links.not($active).each(function () {
			  $(this.hash).hide();
			});
		
			// Bind the click event handler
			$(this).on('click', 'a', function(e){
			  // Make the old tab inactive.
			  $active.removeClass('active');
			  $content.hide();
		
			  // Update the variables with the new link and content
			  $active = $(this);
			  $content = $(this.hash);
		
			  // Make the tab active.
			  $active.addClass('active');
			  $content.show();
		
			  // Prevent the anchor's default click action
			  e.preventDefault();
			});
		  });
	  
	  

});

})(jQuery);

function start() {
    var z = 0;
    jQuery('.latest_news_block ul').each(function () {
        var thisitem = jQuery(this), thisindex = z;
        z = z + 1;
        if (thisitem.find("li").size() > 0) {

            if (!breakingStart) { return false; }
            var theBreakingMargin = parseInt(thisitem.find("li").css("margin-right")),
            	theBreakingWidth = parseInt(thisitem.parent().css("width")),

				itemul = thisitem,
            	itemtemp = 0,
            	items = itemul.find("li").each(function(){
            		itemtemp = itemtemp+parseInt(jQuery(this).width()) + parseInt(jQuery(this).css("padding-right")) + parseInt(jQuery(this).css("margin-right"));
            	});

            theCount[thisindex] = (itemtemp / 2);

            if (elementsToClone[thisindex]) {
                jQuery(this).parent().parent().addClass("isscrolling");
                jQuery('.latest_news_block').eq(thisindex).parent().attr("rel", thisindex);
                thisitem.find("li").clone().appendTo(this);

                elementsToClone[thisindex] = false;
            }
            var theNumber = theCount[thisindex] + breakingOffset[thisindex];

            if (Math.abs(theNumber) <= (Math.abs(breakingScroll[thisindex]))) {
                cloneBreakingLine(thisindex);
            }

            if (!elementsActive[thisindex]) {
                elementsActive[thisindex] = setInterval(function () {
                    beginScrolling(thisitem, thisindex);
                }, breakingSpeed);
            }
        }
    });

    setTimeout("start()", breakingSpeed);
}

function beginScrolling(thisitem, thisindex) {
    breakingScroll[thisindex] = breakingScroll[thisindex] - 1;
    thisitem.css("left", breakingScroll[thisindex] + 'px');
}

function cloneBreakingLine(thisindex) {
    breakingScroll[thisindex] = 0;
    jQuery('.latest_news_block').eq(thisindex).find('ul').css("left", "0px");
}