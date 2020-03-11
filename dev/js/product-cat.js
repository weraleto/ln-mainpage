$(document).ready(function () {
    console.log(1)
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
            if($(document).width()<=1280){
                $("body").css("overflow-y","hidden");
            }
           
            $('.menu_wrapper').click((e)=>{
                if($(e.target).hasClass('close-trigger')) {
                    $('.menu_wrapper').removeClass('menu_show');
                    if($(document).width()<1280){
                        $("body").css("overflow-y","visible");
                    }
                   
                }
            })
        })
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
    
    
    