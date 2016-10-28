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


























