$(function () {



    // Get random numbers for image name's without duplicated
    // It give always 10 numbers - so 10 pictures if you wnat more just incress from 10 to your number

    const $board = $('.board');
    const array = [];
    const j = 21;
    const scoreHTML = $('.score span');
    const time = $('.timer span');
    const moves = $('.moves span');
    let score = 0;




    while (array.length < 10) {
        const number = (Math.floor((Math.random() * j) + 1));
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
    // Also block click event when already clicked 2 times
    let movesCount = 1;
    let arr1 = [];
    $allDivs.on('click', function clicked() {
        arr1.push($(this).parent().data('id'));
        $(this).css('display', 'none');
        if(arr1[0] === arr1[1]){
            $allDivs.off("click");
            score += 10;
            setTimeout(function () {
                $board.find('[data-id="'+arr1[0]+'"]').remove();
                arr1 = [];
                scoreHTML.text(score);
                movesCount += 1;
                $allDivs.click(clicked);
            },500)
        } else if (arr1.length === 2 && arr1[0] !== arr1[1]) {
            $allDivs.off("click");
            setTimeout(function () {
                $('.box').data('data-id', arr1[0]).fadeIn();
                $('.box').data('data-id', arr1[1]).fadeIn();
                arr1 = [];
                movesCount += 1;
                $allDivs.click(clicked);
            },500)
        }
        moves.text(movesCount)
    });

    // Timer for count time

    let timeCount = 0;
    const timeIntervalID = setInterval(function () {
        timeCount += 0.01;
        time.text(timeCount.toFixed(2)+'s')
    },10);


    // Show your results when you display all pictures

    setInterval(function () {
        setTimeout(function () {
            if(score === 100) {
                clearInterval(timeIntervalID);
                $('.scoreP').text(score);
                $('.timerP').text(timeCount.toFixed(2)+'s');
                $('.movesP').text(movesCount -1);
                $('.final-score').removeClass('hide')
            }
        },1000)
    },1000);

    // Start Game Again

    $('.btn').on('click',function (e) {
        location.reload()
    })

});
