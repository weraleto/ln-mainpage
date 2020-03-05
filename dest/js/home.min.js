$(document).ready(function () {

// block 3 gallery animation

    $('.section-protect_item').on('mouseover',(e)=>{
        let startWidth=$(document).width()/8;
     $('.section-protect_item').css({'width':startWidth+'px'});
        $('.section-protect_item').css({'width' : startWidth-(startWidth*0.14)+'px'});
        let imgBlock=event.target.closest('.section-protect_item');
        $(imgBlock).css({'width' : startWidth+(startWidth*0.14)*7+'px'});
        $(imgBlock).find('.item-gallery_overlay').addClass('hide-overlay');
        $(imgBlock).find('.item-gallery_intro').removeClass('hide-bl');
        $(imgBlock).find('canvas').css({'opacity':'1'});


        let currId=imgBlock.id;

        // $('#'+imgBlock.id+' canvas').css({'opacity':'1'});
        let canvas = $('#'+imgBlock.id+' canvas')[0].getContext('2d');
        canvas.width=100;
        canvas.height=100;
        canvas.clearRect(0,0,120,100);

        let canvasImage= $(imgBlock).find('img')[0];
        let frames=1;

        let iconAnimation=setInterval(()=>{
            drawImage (canvasImage,frames,canvas);
            frames++;
            if(frames==9){clearInterval(iconAnimation)}
        },150);

        


        $(e.target).on('mouseout',()=>{
            $('.section-protect_item').css({'width' : startWidth+'px'});
            $('.item-gallery_overlay').removeClass('hide-overlay');
            $('.item-gallery_intro').addClass('hide-bl');
            $('canvas').css({'opacity':'0'});
            clearInterval(iconAnimation);
        })
    })
    $('.section-protect_item').on('resize',(e)=>{
        $('.section-protect_item').css({'width' : $(document).width()/8+'px'});
    });
    
    function drawImage(img,num,canvas){
        num=num?num-1:0;
        img.onload = function() {
            width = 98;
            height = 82;
            canvas.drawImage(img,0,834*num,834,834,12,0,98,82);

        }
        img.src=img.src;
    }



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

});


