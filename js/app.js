$(function () {



    // Get random numbers for image name's without duplicated
    // It give always 10 numbers - so 10 pictures if you wnat more just incress from 10 to your number

    const $board = $('.board');
    const array = [];
    const j = 21;
    const scoreHTML = $('#score span')
    let score = 0;


    while (array.length < 10) {
        const number = (Math.floor((Math.random() * j) + 1))
        const genNumber = array.indexOf(number);
        if (genNumber === -1) {
            array.push(number);
        }
    }

    // duplicate images

    const cloned = array.map(x=>x)
    const array2 = [...array, ...cloned];

    // Shuffle numbers for image name to put them on different places every time

    Array.prototype.shuffle = function() {
        var input = this;

        for (var i = input.length-1; i >=0; i--) {

            var randomIndex = Math.floor(Math.random()*(i+1));
            var itemAtIndex = input[randomIndex];

            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    };
    array2.shuffle();


    // Create 20 divs with images


    for (let i = 0; i <= 19; i++) {
        const $divs = $(`<div class="mainBox"><div data-id="${array2[i]}" class="images"><div class="box"></div></div></div>`);
        $board.append($divs);
        $('.mainBox').css({
            'width': '159px',
            'height': '159px',
            'display': 'inline-block'
        });
        $divs.children().css({
            'background-image': 'url("img/memory/image' + array2[i] + '.png")',
            'width': '159px',
            'height': '159px',
            'display': 'inline-block'
        });
    }
    const $allDivs = $('.box');
    $allDivs.css({
        'width': '159px',
        'height': '159px',
        'display': 'inline-block'
    });

    // Check condition for different images and if they are different then hide again
    // Check if they are the same - if same then remove and add 10 points to score

    let arr1 = [];
    const get1 = $allDivs.on('click', function (e) {
        arr1.push($(this).parent().data('id'));
        //$(this).css('display', 'none');
        $(this).fadeOut();
        if(arr1[0] === arr1[1]){
            score += 10;
            setTimeout(function () {
                $board.find('[data-id="'+arr1[0]+'"]').remove()
                arr1 = [];
                scoreHTML.text(score)
            },500)
        } else if (arr1.length === 2 && arr1[0] !== arr1[1]) {
            e.preventDefault();
            setTimeout(function () {
                $('.box').data('data-id', arr1[0]).fadeIn();
                $('.box').data('data-id', arr1[1]).fadeIn();
                arr1 = [];
            },500)
        }
    })

});