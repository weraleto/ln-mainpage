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

    if($(document).width()>1280){
        $('.hover_overlay').on('mouseover',(e)=>{
            //захардяченный элемент
            let id=$(e.target).closest('.section-protect_item')[0].id;
            const elem = $('#'+id+' .ref');
            //24 кадра в секунду
            const intervalPart = 1000 / 24;
            // высота одного кусочка спрайта
            const fixedStep = 120;
            let separateSprite = fixedStep;
            //ложим в interval id сетИнтервала, что бы потом по этому ID удалить сетИнтервал.
            // каждый раз в каждом интервале функции setInterval вызывается метод steps
            let interval = setInterval( steps, intervalPart);
            function steps() {
                if (separateSprite >= 1020) {
                    // у нас 9 кадров, если 9 кадров умножим на высоту кадра то получим 1020
                    clearInterval(interval);
                    // значит если вышло больше нужного кличества кадро - дропаем интервал
                } else {
                    // а пока интевал живёт, каждый такт мы показываем нужный кадр из нашего спрйта
                    elem.css({'background-position': `0 -${separateSprite}px`});
                    // и каждый раз добавляем к текущей высоте кадра, высоту кадра
                    separateSprite+= fixedStep;
                }
            }
        });
        

        $('#fullpage').fullpage(fullpageParams);
    
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
    }

    $('.main_header-nav-burger').click((e)=>{
        $('.menu_wrapper').addClass('menu_show');
        if($(document).width()<=1280){
            $("body").css("overflow-y","hidden");
        }else{
            $.fn.fullpage.setAllowScrolling(false);
        }
       
        $('.menu_wrapper').click((e)=>{
            if($(e.target).hasClass('close-trigger')) {
                $('.menu_wrapper').removeClass('menu_show');
                if($(document).width()<1280){
                    $("body").css("overflow-y","visible");
                }else{
                    $.fn.fullpage.setAllowScrolling(true);
                }
               
            }
        })
    })

    $(window).resize(()=>{
        if($(document).width()>1280){
            $('#fullpage').fullpage(fullpageParams);
            $('.section-protect_inner').slick('unslick');
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
    })
});


