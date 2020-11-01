$(document).ready(function() {

    var canvas;
    var clickAction = "none";

    // Preloads all the assets for smooth website experience
    (function preloadAssets() {
        var imgAssets = [
            "assets/keyframes/message-1-1.png",
            "assets/keyframes/message-1-2.png",
            "assets/keyframes/message-1-3.png",
            "assets/keyframes/message-2-1.png",
            "assets/keyframes/message-2-2.png",
            "assets/keyframes/message-2-3.png",
            "assets/keyframes/message-3-1.png",
            "assets/keyframes/message-3-2.png",
            "assets/keyframes/message-3-3.png",
            "assets/keyframes/message-4-1.png",
            "assets/keyframes/message-4-2.png",
            "assets/keyframes/message-4-3.png",
            "assets/keyframes/message-5-1.png",
            "assets/keyframes/message-5-2.png",
            "assets/keyframes/message-5-3.png",
            "assets/keyframes/message-6-1.png",
            "assets/keyframes/message-6-2.png",
            "assets/keyframes/message-6-3.png",
            "assets/keyframes/message-7-1.png"
        ];
        var assetsLoaded = 0;
        
        $('#scene').hide();

        for(var i = 0; i < imgAssets.length; i++) {
            var img = new Image();
            img.src = imgAssets[i];
            img.onload = function() {
                updateProgress();
            }
        }

        // Function for updating preloading progress
        function updateProgress() {
            assetsLoaded++;
            var newWidth = $('#progress').width() * (assetsLoaded/imgAssets.length);
            $('#bar').stop(true, true);
            $('#bar').animate({width: newWidth}, 500);

            if(assetsLoaded == imgAssets.length)
                loaded();
        }
        
        // Function for when all the assets are preloaded
        function loaded() {
            $('#progress').hide();
            $('#scene').show();
            messageAnimation();
        }
    })();

    // Executes message animation
    function messageAnimation() {
        var loadTimer, delay;
        var messageNumber = 1;
        var delayRange = {
            '1': [1500, 2000],
            '2': [2100, 2500],
            '3': [3500, 4000],
            '4': [3700, 4300],
            '5': [2600, 3100],
            '6': [1900, 2400]
        }

        loadTimer = animateMessageLoading(messageNumber++);
        (function loop() {
            delay = genRandom(delayRange[messageNumber - 1][0], delayRange[messageNumber - 1][1]);
            setTimeout(function() {
                clearInterval(loadTimer);
                loadTimer = animateMessageLoading(messageNumber++);
                if (messageNumber <= 7)
                    loop();
            }, delay);
        })();
    }

    // Animates message loading frame-by-frame
    function animateMessageLoading(messageNumber) {
        var timer;
        var frameNumber = 1;

        if(messageNumber == 7)
            loadPhoneFrame(messageNumber, frameNumber);
        else {
            loadPhoneFrame(messageNumber, frameNumber);
            timer = setInterval(function() {
                frameNumber = (frameNumber % 3) + 1;
                loadPhoneFrame(messageNumber, frameNumber);
            }, 500);
        }
        
        return timer;
    }

    // Loads the selected phone frame
    function loadPhoneFrame(messageNumber, frameNumber) {
        var src = "assets/keyframes/message-".concat(
            messageNumber, "-", frameNumber, ".png");
        $('#phone-img').attr('src', src);
    }

    // Generates random number in the given range
    function genRandom(min, max) {
        return Math.round((Math.random() * (max - min)) + min);
    }

    // Calculates distance between two 3D coordinates
    function get3dDistance(c1, c2) {
        distance = Math.sqrt(
            Math.pow((c1[0] - c2[0]), 2) + 
            Math.pow((c1[1] - c2[1]), 2) + 
            Math.pow((c1[2] - c2[2]), 2)
        );
        return distance;
    }

    // Checks if pixel belongs to the mail button
    function isMailButton(pixel) {
        var threshold = 15;
        var mailBtnColors = [
            [67, 126, 196, 255],
            [230, 240, 250, 255]
        ];

        for(i = 0; i < mailBtnColors.length; i++) {
            color = mailBtnColors[i];
            if(get3dDistance(color, pixel) < threshold)
                return true;
        }

        return false;
    }

    // Mouse hover event on phone-img for enabling button interactions
    $('#phone-img').mousemove(function(event) {
        if(!canvas) {
            canvas = $('<canvas />')[0];
            canvas.width = this.width;
            canvas.height = this.height;
        }

        canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
        var pixelData = canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
        
        if(isMailButton(pixelData)) {
            $('html, body').css('cursor', 'pointer');
            clickAction = "mail";
        }
        else {
            $('html, body').css('cursor', 'default');
            clickAction = "none";
        }
    });


    // Mouse click event on phone-img for handling button interactions
    $('#phone-img').click(function() {
        if(clickAction == "mail")
            window.open("mailto:adildsw@gmail.com");
    });
})