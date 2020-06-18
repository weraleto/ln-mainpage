$(document).ready(function () {

// block 3 gallery animation

    let fullpageParams={
        licenseKey: 'C39B3150-69A64A57-88A2443B-EDCA6358',
        autoScrolling:true,
        fitToSection: true,
        sectionSelector: '.fullpage_section',
        lockAnchors:true,
        navigation: true,
        navigationPosition: 'right',
        onLeave: function(origin, destination, direction){
            if(destination.anchor=='kids'||destination.anchor=='diagn'||destination.anchor=='choose'){

                $(destination.item).find('.section-photo').removeClass('hide-pic');
            }
        },
    };

    const getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    if($(window).outerWidth()>1279){

        $('.hover_overlay').on('mouseover',(e)=>{
            const protect_item=$(e.target).closest('.section-protect_item');
            let id=protect_item[0].id;
            let frame=protect_item.data('frame');
            const elem = $('#'+id+' .ref');
            const intervalPart = 1000 / 12;
            const fixedStep = 120;
            let separateSprite = fixedStep;
            let interval = setInterval( steps, intervalPart);
            function steps() {
                if (separateSprite >= frame * fixedStep) {
                    clearInterval(interval);
                } else {
                    elem.css({'background-position': `0 -${separateSprite}px`});
                    separateSprite+= fixedStep;
                }
            }
        });


        $('#fullpage').fullpage(fullpageParams);
        let searchParams = new URLSearchParams(window.location.search)
        if (searchParams.has('adult') ) {
            fullpage_api.silentMoveTo(3);
            const param = getUrlParameter('adult');
            setTimeout(() => {
                $(`[data-query="${param}"]`).click();
            }, 0);
        }
        if (searchParams.has('child')) {
            const param = getUrlParameter('child');
            $('.popup-product').removeClass('active');
            $(`[data-popup-id="${param}"]`).addClass('active');
            let promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    $('.popup-product_wrapper').addClass('visible');
                    if ($(window).outerWidth() >= 1279){
                        setTimeout(() => {
                            fullpage_api.destroy('all');
                            resolve(true);
                        }, 1000);
                    }
                },500);
            });

            if ($(window).outerWidth() >= 1279){
                promise.then( res => {
                    if (res) {
                        $("body").css({"overflow": "hidden"});
                    }
                });
            }
        }

        

        //methods
        $.fn.fullpage.setAllowScrolling(true);
        fullpage_api.setFitToSection(true);


        $('.footer-gallery_item').on('mouseover',(e)=>{
            let iden=$(e.target).closest('.footer-gallery_item').data('quality');
            // let params={six:[['one',]]};


            if(iden=='one') {
                $('.footer-gallery_item').css({'transform':'translate(20px,20px)'});
                $('.quality_six, .quality_seven').css({'transform':'translateY(0)'});
                $('.footer-gallery_photo-one').css({'transform':'translate(-20px,-20px)'});
                $('.footer-gallery_photo-two').css({'transform':'translateX(10px)'});
                $('.footer-gallery_photo-six').css({'transform':'translateX(20px)'});

            }
            if(iden=='two'){
                $('.footer-gallery_item').css({'transform':'translateY(20px)'});
                $('.quality_six, .quality_seven').css({'transform':'translate(20px,0)'});
                $('.quality_one, .quality_three, .quality_four').css({'transform':'translate(-20px,20px)'});
            }

            if(iden=='three'||iden=='four') {
                $('.footer-gallery_item').css({'transform':'translate(20px,-20px)'});
                $('.quality_six, .quality_seven').css({'transform':'translateY(0)'});
                $('.footer-gallery_photo-one').css({'transform':'translate(-20px,-20px)'});
                $('.footer-gallery_photo-two').css({'transform':'translateX(20px)'});
                $('.footer-gallery_photo-six').css({'transform':'translateX(20px)'});

            }
            if(iden=='five'){
                $('.footer-gallery_item').css({'transform':'translateY(-20px)'});
                $('.quality_six, .quality_seven').css({'transform':'translate(20px,0)'});
                $('.quality_one, .quality_three, .quality_four').css({'transform':'translate(-20px,-20px)'});
            }

            if(iden=='six'||iden=='seven'){
                $('.footer-gallery_item').css({'transform':'translateX(-20px)'});
                $('.footer-gallery_photo-one').css({'transform':'translateX(-20px)'});
                $('.footer-gallery_photo-two').css({'transform':'translateX(-20px)'});
                $('.footer-gallery_photo-six').css({'transform':'translateX(20px)'});
            }

            $('.footer-gallery_item').on('mouseout',(e)=>{
                $('.footer-gallery_item').css({'transform':'initial'});
                $('.footer-gallery_photo').css({'transform':'initial'});
            })
        })



        $('.icon-up').click(()=>{
            fullpage_api.moveTo(1);
        })
    }else{
        $('.section-protect_inner').slick({
            infinite: true,
            arrows: false,
            dots: true,
            appendDots: $('.slider-protect-navigation')
        });
        $('.footer-gallery_tablecell').slick({
            infinite: true,
            arrows: false,
            dots: true,
            appendDots: $('.footer-gallery-nav'),
            dotsClass: 'slick-dots gray'
        });
        $('.icon-up').click(()=>{
            $('html, body').animate({ scrollTop: 0 }, 1000);
        })
        let searchParams = new URLSearchParams(window.location.search)
        if (searchParams.has('adult') ) {
            const param = getUrlParameter('adult');
            setTimeout(() => {
                $(`[data-query="${param}"]`).click();
            }, 0);
        }
        if (searchParams.has('child')) {
            const param = getUrlParameter('child');
            $('.popup-product').removeClass('active');
            $(`[data-popup-id="${param}"]`).addClass('active');
            let promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    $('.popup-product_wrapper').addClass('visible');
                },500);
            });
        }
    }

    $('.main_header-nav-burger').click((e)=>{
        $('.menu_wrapper').addClass('menu_show');
        if($(window).outerWidth()<=1279){
            $("body").css("overflow-y","hidden");
        }else{
            $.fn.fullpage.setAllowScrolling(false);
        }

        $('.menu_wrapper').click((e)=>{
            if($(e.target).hasClass('close-trigger')) {
                $('.menu_wrapper').removeClass('menu_show');
                if($(window).outerWidth()<1279){
                    $("body").css("overflow-y","visible");
                }else{
                    $.fn.fullpage.setAllowScrolling(true);
                }

            }
        })
    });

    animationBlock3('.section-protect_item');
    animationBlock3('.popup-product_sidebar-nav_item');

    $(window).resize(()=>{
        if($(window).outerWidth()>1279){
            if ( $( 'html' ).hasClass( 'fp-enabled' ) ) {
                fullpage_api.reBuild();
            }else{
                $('#fullpage').fullpage(fullpageParams);
                $('.section-protect_inner').slick('unslick');
            }

        }else{
            fullpage_api.destroy('all');
            $('.section-protect_inner').slick({
                infinite: true,
                arrows: false,
                dots: true,
                appendDots: $('.slider-protect-navigation')
            });
            $('.footer-gallery_tablecell').slick({
                infinite: true,
                arrows: false,
                dots: true,
                appendDots: $('.footer-gallery-nav'),
                dotsClass: 'slick-dots gray'
            });
        }
    });

    $('.popup_close').on('click',(e)=>{
        let searchParams = new URLSearchParams(window.location.search)
        if (searchParams.has('adult') || searchParams.has('child')) {
            if(searchParams.has('adult')) {
            window.location.href = "/katalog-produkczii/#adult";
            }
            if(searchParams.has('child')) {
            window.location.href = "/katalog-produkczii/#young";
            }
            return;
        }
    });

    $('.open-contact-popup').on('click',(e)=>{
        $('.popup-contact__form').fadeIn(300);
    });
    $('.form-field__close').on('click',(e)=>{
        $('.popup-contact__form').fadeOut(300);
    });
    $(document).click(function(event) {
        if ($(event.target).hasClass('popup-contact__form') || $(event.target).closest('.popup-contact__form').length > 0
        && !$(event.target).closest('.form-field__subcontainer').length > 0) {
            $('.popup-contact__form').fadeOut();
        }
    });


    // $('body').click(function(){
    //     $('.popup-contact__form').fadeOut(300);
    // });
    // $('.popup-contact__form').click(function(e){
    //     e.stopPropagation();
    // });

    function animationBlock3(selector) {
        $(selector).on('click', ((e) => {
            let currTab = $(e.target).closest(selector);
            let id = currTab.data('id');
            $('.popup-product').removeClass('active');
            $('#popup-'+id).addClass('active');
            let promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    $('.popup-product_wrapper').addClass('visible');
                    if ($(window).outerWidth() >= 1279){
                        setTimeout(() => {
                            fullpage_api.destroy('all');
                            resolve(true);
                        }, 1000);
                    }
                },500);
            });

            if ($(window).outerWidth() >= 1279){
                $('.section-protect_inner').addClass('clicked');
                currTab.addClass('active');
                promise.then( res => {
                    if (res) {
                        $("body").css({"overflow": "hidden"});
                    }
                });
            }

            $('.popup_close').on('click',(e)=>{
            if ($(window).outerWidth()<=1279){
                $('.popup-product_wrapper').removeClass('visible');
                $('.popup-product').removeClass('active');
                $("body").css({ "overflow": "visible" });
            } else {
                $('#fullpage').fullpage(fullpageParams);
                fullpage_api.silentMoveTo(3);
                setTimeout(() => {
                    $('.popup-product_wrapper').addClass('visible');
                    if ($(window).outerWidth() >= 1279){
                        $('.popup-product_wrapper').removeClass('visible');
                        $('.popup-product').removeClass('active');
                        $('.section-protect_inner').removeClass('clicked');
                        currTab.removeClass('active');
                    }
                },500);
            }
            })
          })
        );
    }
});


