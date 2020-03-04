$(document).ready(function () {

    $('.section-protect_item').on('mouseover',(e)=>{
        let startWidth=$(document).width()/8;
     $('.section-protect_item').css({'width':startWidth+'px'});
        $('.section-protect_item').css({'width' : startWidth-(startWidth*0.14)+'px'});
        let imgBlock=event.target.closest('.section-protect_item');
        $(imgBlock).css({'width' : startWidth+(startWidth*0.14)*7+'px'})
                    .find('.item-gallery_overlay').addClass('hide-overlay')
                    .find('.item-gallery_intro').removeClass('hide-bl');


        let currId=imgBlock.id;

        $('#'+imgBlock.id+' canvas').css({'opacity':'1'});
        let canvas = $('#'+imgBlock.id+' canvas')[0].getContext('2d');
        canvas.width=100;
        canvas.height=100;
        canvas.clearRect(0,0,100,100);

        let canvasImage= $(imgBlock).find('img')[0];
        let frames=1;

        setInterval(()=>{
            drawImage (canvasImage.src,frames);
            frames++;
        },150)

        
        function drawImage(img,num){
            num=num?num-1:0;
            canvasImage.onload = function() {
                width = 98;
                height = 82;
                canvas.drawImage(canvasImage,0,834*num,834,834,12,0,98,82);

            }
            canvasImage.src=img;
        }

        $(e.target).on('mouseout',()=>{
            $('.section-protect_item').css({'width' : startWidth+'px'});
            $('.item-gallery_overlay').removeClass('hide-overlay');
            $('.item-gallery_intro').addClass('hide-bl');
            $('canvas').css({'opacity':'0'});
        })
    })
    $('.section-protect_item').on('resize',(e)=>{
        $('.section-protect_item').css({'width' : $(document).width()/8+'px'});
    });
    

});


