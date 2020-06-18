$(document).ready(function () {
    $('.city__current').on('click', function () {
        $(this).hide();
        $(this).closest('.city__container').find('.city__list').fadeIn(300);
    });
    $('.city__choose__list').on('click', function () {
        $(this).addClass('active');
        $('.city__choose__map').removeClass('active');
        $('.listMap').fadeIn(300);
        $('#map').hide();
    });
    $('.city__choose__map').on('click', function () {
        $(this).addClass('active');
        $('.city__choose__list').removeClass('active');
        $('#map').fadeIn(300);
        $('.listMap').hide();
    });
    $('.city').on('click', function() {
        const currentText = $(this).text();
        $('.city__list').fadeOut(300);
        $('.city__current').text(currentText);
        $('.city__current').show();
        const dataCity = $(this).data('city');
        $('.list__body').each(function(){
            if(dataCity === 0) {
                $(this).css({'display': 'flex'});
            } else {
                if(dataCity !== $(this).data('list-city')) {
                    $(this).hide();
                } else {
                    $(this).css({'display': 'flex'});
                }
            }
            
        });
        
        initMap($(this).data('city'));
    });
    // $('.product_buy-course-list').each(function() {
    //     const list = $(this);
    //     $('div', this).on('click', function() {
    //         const currentText = $(this).text();
    //         const currentData = $(this).data('buy');
    //         list.closest('.product_buy-course').find('.product_buy-course-text').text(currentText);
    //         list.hide();
    //         list.closest('.product').find('.woocommerce-loop-product__link .attachment-shop_catalog').each(function(){
    //             if ($(this).data('period') === currentData) {
    //                 $(this).show();
    //             } else {
    //                 $(this).hide();
    //             }
    //         });
    //         list.closest('.product').find('.woocommerce-loop-product__link .price').each(function(){
    //             if ($(this).data('period') === currentData) {
    //                 $(this).show();
    //             } else {
    //                 $(this).hide();
    //             }
    //         });
    //     });
    // });

    $('.product_buy-course-text').on('click', function () {
        $(this).closest('.product_buy-course').find('.product_buy-course-list').show();
    });
    $('.product_buy-course-list').each(function() {
        const list = $(this);
        $('div', this).on('click', function() {
            const currentText = $(this).text();
            const currentData = $(this).data('buy');
            list.closest('.product_buy-course').find('.product_buy-course-text').text(currentText);
            list.hide();
            list.closest('.product').find('.woocommerce-loop-product__link .attachment-shop_catalog').each(function(){
                if ($(this).data('period') === currentData) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
            list.closest('.product').find('.woocommerce-loop-product__link .price').each(function(){
                if ($(this).data('period') === currentData) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });
    });
    
    // block 3 gallery animation
        function transformGallery(e){
            let iden=$(e.target).closest('.footer-gallery_item').data('quality');
    
                
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

        }
            
        if($(document).width()>1280){
    
            $('.footer-gallery_item').on('mouseover',transformGallery)
        }else{
           $('.footer-gallery_tablecell').slick({
               infinite: true,
               arrows: false,
               dots: true,
               appendDots: $('.footer-gallery-nav'),
               dotsClass: 'slick-dots gray'
           });
           
        }
    
        $('.main_header-nav-burger').click((e)=>{
            $('.menu_wrapper').addClass('menu_show');
            $("body").css("overflow-y","hidden");
            
           
            $('.menu_wrapper').click((e)=>{
                if($(e.target).hasClass('close-trigger')) {
                    $('.menu_wrapper').removeClass('menu_show');
                    $("body").css("overflow-y","visible");
                    
                   
                }
            })
        })
        let catLinks=$('.category-list_link');
        if(catLinks.length!=0){
            $('.category-list_link').on("click", function (event) {
                event.preventDefault();
                var id  = $(this).attr('href'),
                    top = $(id).offset().top;
                $('body,html').animate({scrollTop: top}, 1000);
            });
        }

        $('.icon-up').click(()=>{
            $('html, body').animate({ scrollTop: 0 }, 1000);
        })
        $(window).resize(()=>{
            if($(document).width()>1280){
                $('.footer-gallery_tablecell').slick('unslick');
            }else{
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
    
    
    