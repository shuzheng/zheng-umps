$(function() {
	
});
// 启动angular
var app = angular.module('app', ['ngMaterial']);
app.controller('main', function($scope, $log) {
	var tabs = [
		{ title: '首页', content: "1", url: "home.html"}
	],
	selected = null,
	previous = null;
	$scope.tabs = tabs;
	$scope.selectedIndex = 0;
	$scope.$watch('selectedIndex', function(current, old) {
		previous = selected;
		selected = tabs[current];
		// 切换上一个标签
		if(old + 1 && (old != current)) {
			//$log.debug(previous.title);
		}
		// 切换当前标签
		if(current + 1) {
			//$log.debug(selected.url);
		}
	});
	$scope.addTab = function (title, url) {
		var hasTab = false;
		for (var i in tabs) {
			if (tabs[i].title == title) {
				hasTab = true;
				$scope.selectedIndex = i;
			}
		}
		if (!hasTab) {
			tabs.push({ title: title, url: url});
		}
	};
	$scope.removeTab = function (tab) {
		var index = tabs.indexOf(tab);
		tabs.splice(index, 1);
	};
	$scope.changeFrameHeight = changeFrameHeight;
});
// url防注入过滤器
app.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])















/*------------------------------------------- app.js ---------------------------------------------*/
$(document).ready(function () {
    $('body').on('click', '[data-ma-action]', function (e) {
        e.preventDefault();

        var $this = $(this);
        var action = $(this).data('ma-action');

        switch (action) {

            /*-------------------------------------------
                Sidebar & Chat Open/Close
            ---------------------------------------------*/
            case 'sidebar-open':
                var target = $this.data('ma-target');
                var backdrop = '<div data-ma-action="sidebar-close" class="ma-backdrop" />';

                $('body').addClass('sidebar-toggled');
                $('#header, #header-alt, #main').append(backdrop);
                $this.addClass('toggled');
                $(target).addClass('toggled');

                break;

            case 'sidebar-close':
                $('body').removeClass('sidebar-toggled');
                $('.ma-backdrop').remove();
                $('.sidebar, .ma-trigger').removeClass('toggled')

                break;


            /*-------------------------------------------
                Profile Menu Toggle
            ---------------------------------------------*/
            case 'profile-menu-toggle':
                $this.parent().toggleClass('toggled');
                $this.next().slideToggle(200);

                break;


            /*-------------------------------------------
                Mainmenu Submenu Toggle
            ---------------------------------------------*/
            case 'submenu-toggle':
                $this.next().slideToggle(200);
                $this.parent().toggleClass('toggled');

                break;


            /*-------------------------------------------
                Top Search Open/Close
            ---------------------------------------------*/
            //Open
            case 'search-open':
                $('#header').addClass('search-toggled');
                $('#top-search-wrap input').focus();

                break;

            //Close
            case 'search-close':
                $('#header').removeClass('search-toggled');

                break;


            /*-------------------------------------------
                Header Notification Clear
            ---------------------------------------------*/
            case 'clear-notification':
                var x = $this.closest('.list-group');
                var y = x.find('.list-group-item');
                var z = y.size();

                $this.parent().fadeOut();

                x.find('.list-group').prepend('<i class="grid-loading hide-it"></i>');
                x.find('.grid-loading').fadeIn(1500);


                var w = 0;
                y.each(function(){
                    var z = $(this);
                    setTimeout(function(){
                        z.addClass('animated fadeOutRightBig').delay(1000).queue(function(){
                            z.remove();
                        });
                    }, w+=150);
                })

                //Popup empty message
                setTimeout(function(){
                    $('.him-notification').addClass('empty');
                }, (z*150)+200);

                break;


            /*-------------------------------------------
                Fullscreen Browsing
            ---------------------------------------------*/
            case 'fullscreen':
                //Launch
                function launchIntoFullscreen(element) {
                    if(element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if(element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if(element.webkitRequestFullscreen) {
                        element.webkitRequestFullscreen();
                    } else if(element.msRequestFullscreen) {
                        element.msRequestFullscreen();
                    }
                }

                //Exit
                function exitFullscreen() {

                    if(document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if(document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if(document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                }

                launchIntoFullscreen(document.documentElement);

                break;


            /*-------------------------------------------
                Clear Local Storage
            ---------------------------------------------*/
            case 'clear-localstorage':
                swal({
                    title: "确认该操作吗？",
                    text: "你的本地缓存将会全部删除",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "确认",
                }).then(function(){
                    localStorage.clear();
                    swal("完成！", "缓存已删除", "success");
                });

                break;


            /*-------------------------------------------
                Print
            ---------------------------------------------*/
            case 'print':

                window.print();

                break;


            /*-------------------------------------------
                Login Window Switch
            ---------------------------------------------*/
            case 'login-switch':
                var loginblock = $this.data('ma-block');
                var loginParent = $this.closest('.lc-block');

                loginParent.removeClass('toggled');

                setTimeout(function(){
                    $(loginblock).addClass('toggled');
                });

                break;


            /*-------------------------------------------
                Profile Edit/Edit Cancel
            ---------------------------------------------*/
            //Edit
            case 'profile-edit':
                $this.closest('.pmb-block').toggleClass('toggled');

                break;

            case 'profile-edit-cancel':
                $(this).closest('.pmb-block').removeClass('toggled');

                break;


            /*-------------------------------------------
                Action Header Open/Close
            ---------------------------------------------*/
            //Open
            case 'action-header-open':
                ahParent = $this.closest('.action-header').find('.ah-search');

                ahParent.fadeIn(300);
                ahParent.find('.ahs-input').focus();

                break;

            //Close
            case 'action-header-close':
                ahParent.fadeOut(300);
                setTimeout(function(){
                    ahParent.find('.ahs-input').val('');
                }, 350);

                break;


            /*-------------------------------------------
                Wall Comment Open/Close
            ---------------------------------------------*/
            //Open
            case 'wall-comment-open':
                if(!($this).closest('.wic-form').hasClass('toggled')) {
                    $this.closest('.wic-form').addClass('toggled');
                }

                break;

            //Close
            case 'wall-comment-close':
                $this.closest('.wic-form').find('textarea').val('');
                $this.closest('.wic-form').removeClass('toggled');

                break;


            /*-------------------------------------------
                Todo Form Open/Close
            ---------------------------------------------*/
            //Open
            case 'todo-form-open':
                $this.closest('.t-add').addClass('toggled');

                break;

            //Close
            case 'todo-form-close':
                $this.closest('.t-add').removeClass('toggled');
                $this.closest('.t-add').find('textarea').val('');

                break;


            /*-------------------------------------------
                Change Header Skin
            ---------------------------------------------*/
            case 'change-skin':

                var skin = $this.data('ma-skin');
                $('[data-ma-theme]').attr('data-ma-theme', skin);

                break;
        }
    });
});
$(document).ready(function () {


});

/*----------------------------------------------------------
    Detect Mobile Browser
-----------------------------------------------------------*/
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
   $('html').addClass('ismobile');
}

$(window).load(function () {
    /*----------------------------------------------------------
        Page Loader
     -----------------------------------------------------------*/
    if(!$('html').hasClass('ismobile')) {
        if($('.page-loader')[0]) {
            setTimeout (function () {
                $('.page-loader').fadeOut();
            }, 200);
        }
    }
})

$(document).ready(function(){

    /*----------------------------------------------------------
        Scrollbar
    -----------------------------------------------------------*/
    function scrollBar(selector, theme, mousewheelaxis) {
        $(selector).mCustomScrollbar({
            theme: theme,
            scrollInertia: 100,
            axis:'yx',
            mouseWheel: {
                enable: true,
                axis: mousewheelaxis,
                preventDefault: true
            }
        });
    }

    if (!$('html').hasClass('ismobile')) {
        //On Custom Class
        if ($('.c-overflow')[0]) {
            scrollBar('.c-overflow', 'minimal-dark', 'y');
        }
    }


    /*----------------------------------------------------------
        Dropdown Menu
    -----------------------------------------------------------*/
    if($('.dropdown')[0]) {
		//Propagate
		$('body').on('click', '.dropdown.open .dropdown-menu', function(e){
			e.stopPropagation();
		});

		$('.dropdown').on('shown.bs.dropdown', function (e) {
			if($(this).attr('data-animation')) {
				$animArray = [];
				$animation = $(this).data('animation');
				$animArray = $animation.split(',');
				$animationIn = 'animated '+$animArray[0];
				$animationOut = 'animated '+ $animArray[1];
				$animationDuration = ''
				if(!$animArray[2]) {
					$animationDuration = 500; //if duration is not defined, default is set to 500ms
				}
				else {
					$animationDuration = $animArray[2];
				}

				$(this).find('.dropdown-menu').removeClass($animationOut)
				$(this).find('.dropdown-menu').addClass($animationIn);
			}
			
		});

		$('.dropdown').on('hide.bs.dropdown', function (e) {
			if($(this).attr('data-animation')) {
				e.preventDefault();
				$this = $(this);
				$dropdownMenu = $this.find('.dropdown-menu');

				$dropdownMenu.addClass($animationOut);
				setTimeout(function(){
					$this.removeClass('open')

				}, $animationDuration);
			}
		});
    }

    /*-----------------------------------------------------------
        Waves
    -----------------------------------------------------------*/
    (function(){
         Waves.attach('.btn:not(.btn-icon):not(.btn-float)');
         Waves.attach('.btn-icon, .btn-float', ['waves-circle', 'waves-float']);
        Waves.init();
        // Waves.displayEffect();
    })();


    /*-----------------------------------------------------------
        Link prevent
    -----------------------------------------------------------*/
    $('body').on('click', '.a-prevent', function(e){
        e.preventDefault();
    });


    /*----------------------------------------------------------
        Bootstrap Accordion Fix
    -----------------------------------------------------------*/
    if ($('.collapse')[0]) {

        //Add active class for opened items
        $('.collapse').on('show.bs.collapse', function (e) {
            $(this).closest('.panel').find('.panel-heading').addClass('active');
        });

        $('.collapse').on('hide.bs.collapse', function (e) {
            $(this).closest('.panel').find('.panel-heading').removeClass('active');
        });

        //Add active class for pre opened items
        $('.collapse.in').each(function(){
            $(this).closest('.panel').find('.panel-heading').addClass('active');
        });
    }


    /*-----------------------------------------------------------
        Tooltips
    -----------------------------------------------------------*/
    if ($('[data-toggle="tooltip"]')[0]) {
        $('[data-toggle="tooltip"]').tooltip();
    }


    /*-----------------------------------------------------------
        Popover
    -----------------------------------------------------------*/
    if ($('[data-toggle="popover"]')[0]) {
        $('[data-toggle="popover"]').popover();
    }


    /*-----------------------------------------------------------
        IE 9 Placeholder
    -----------------------------------------------------------*/
    if($('html').hasClass('ie9')) {
        $('input, textarea').placeholder({
            customClass: 'ie9-placeholder'
        });
    }

});


























