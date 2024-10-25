$(document).ready(function() {
    handleSliderProgress();
    // post loading
    var group2 = $('.input-group-2');
    var dropdown = $('.dropdown');
    
    function rearrangeElements() {
        if ($(window).width() < 769) {
            group2.detach().insertAfter(dropdown);
        } else {
            dropdown.detach().insertAfter(group2);
        }
    }

    rearrangeElements();
    
    // if screen width updated
    var mql = window.matchMedia("(orientation: landscape)");
    mql.addEventListener("change", function() {
        rearrangeElements();
    });

    // esc key's action
    $(document).on('keydown', function(event) {
        $('#search').focus()
        if (event.key === 'Escape') {
            $('#search').val('');
            $('#clear-text-button').hide();
            $('#search').trigger('input');
        }
    });

    //create audio file for playing
    let audioCtx,gainNode,echoEffectNode;// create effect's node
    let source;
    let currentAudio = null; // now playing audio
    $(document).on('click', '.play-audio', function(){
        //autopause check
        if ($("#flexCheckChecked").prop('checked')){
            if (currentAudio !=null){
                currentAudio.pause();
            }
            $('.play-audio .progress').remove();
        }else{
            $(this).find('.progress').remove();
        }
        // 取得當前按鈕的 ID
        const buttonId = $(this).attr('id');

        // set audio node
        let audioFileName;
        if (buttonId === '0-000') {
            // 隨機選擇音訊檔案
            const audioFiles = ['0-000.mp3', '0-001.mp3']; // 音訊檔案陣列
            audioFileName = audioFiles[Math.floor(Math.random() * audioFiles.length)]; // 隨機選擇檔案
        } else {
            // 如果不是 0-000，使用該按鈕的 data-audio 屬性
            audioFileName = $(this).data('audio');
        }
        let encodedFileName = encodeURIComponent(audioFileName);
        let audioFile = '/static/audios/' + encodedFileName;
        let audio = new Audio(audioFile);
        currentAudio = audio;
        
        // set effect node
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        gainNode = audioCtx.createGain();
        echoEffectNode = createEchoEffect(audioCtx);
        source = audioCtx.createMediaElementSource(audio);
        
        // set volume node
        source.connect(gainNode)
        $("#volumeRange").trigger('input');

        // check echo effect node
        $("#echoCheckChecked").trigger('input');
        
        // progress bar animation
        const progressContainer = $('<div>').addClass('progress');
        const progressBar = $('<div>').addClass('progress-bar').css('width', '0%');
        progressContainer.append(progressBar);
        $(this).append(progressContainer);
        const interval = 100; // Update interval in milliseconds
        progressInterval = setInterval(() => {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.css('width', progress + '%');
        }, interval);

        currentAudio.play();
    });

    // volume node's action
    $("#volumeRange").on('input', function() {
        if (gainNode){
            gainNode.gain.value = this.value*0.01;
        }
    });
    
    // echo effect node's update time limit 
    const throttledUpdateEcho = throttle(function(impulseValue) {
        const sampleRate = audioCtx.sampleRate;
        const length = sampleRate * (impulseValue / 33); // max 3 seconds
        const impulse = audioCtx.createBuffer(2, length, sampleRate);
        const impulseL = impulse.getChannelData(0);
        const impulseR = impulse.getChannelData(1);
        for (let i = 0; i < length; i++) {
            impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 1);
            impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 1);
        }
        echoEffectNode.reverbNode.buffer = impulse;
    }, 500);

    // echo effect node's action
    $("#echoCheckChecked").on('input', function() {
        if (echoEffectNode){
            if (this.value == 0){
                gainNode.disconnect();
                echoEffectNode.outputNode.disconnect();
                gainNode.connect(audioCtx.destination);
            }else{
                throttledUpdateEcho(this.value);
                gainNode.disconnect();
                gainNode.connect(echoEffectNode.inputNode);
                echoEffectNode.outputNode.connect(audioCtx.destination);
            }
        }
    });

    // collapse/expand category container
    $(".category_area").on('click', function() {
        $("#"+this.id).siblings('.row').find('.cate-body').slideToggle();
        var $span = $("#"+this.id).siblings('.button-subdirectory').find('.content');
        if ($span.text() === '▲') {
          $span.text('▼');
        } else {
          $span.text('▲');
        }
    })

    // collapse/expand category container on button
    $(".button-subdirectory").on('click', function() {
        $(this).siblings('.row').find('.cate-body').slideToggle();
        var $span = $(this).find('.content');
        if ($span.text() === '▲') {
          $span.text('▼'); // if text is ▲, change to ▼
        } else {
          $span.text('▲');
        }
    });

    //back to top
    $('#site-title').click(function(){
        $('html, body').animate({scrollTop : 0},0);
        return false;
    });

    // language switch
    $('.lang-switch').click(function() {
        const lang = $(this).data('lang');
        switchLanguage(lang);
    });
    
    // use to clear search box
    $('#clear-text-button').on('click', function() {
        $('#search').val('');
        $('#clear-text-button').hide();
        $('#search').trigger('input')
    });

    // real time search button
    $('#search').on('input', function(e) {
        var content = $(this).val();
        
        if (content === 'ミュート助からない' || content === 'ミュートたすからない') { 
            // Hide other elements in container_area
            setTimeout(() => {
                $('#container_area').children().hide(); 
                if ($('#sneeze').length === 0) {
                    const FADE_DURATION = 200;
                
                    const sneezeContainer = $('<div>', {
                        id: 'sneeze',
                        class: 'new-container',
                        css: { display: 'none' }  // Set initial to hidden
                    });
                
                    const button = $('<button>', {
                        class: 'btn btn-danger play-audio',
                        'data-audio': '0-000.mp3',
                        id: '0-000',
                        type: 'button',
                        css: {
                            position: 'relative', // Set relative positioning for the button
                            overflow: 'hidden'    // Ensure the content is contained within the button
                        }
                    });
                
                    // Create video element and set properties to fill the container with 20% opacity
                    const video = $('<video>', {
                        id: 'sneeze-video',
                        src: '/static/videos/no.mp4',  // Relative path to the video file
                        autoplay: true,  // Autoplay video
                        loop: false,     // Disable loop so we can control it manually
                        css: {
                            width: '100%',        // Video width fills the container
                            height: '100%',       // Video height fills the container
                            opacity: 0.2,         // Set opacity to 20%
                            display: 'block',      // Ensure video is block-level
                            pointerEvents: 'none',  // Hide player controls and allow button clicks
                            objectFit: 'cover',      // Cover the container without distortion
                        }
                    });
                
                    // Create span and style it to stack on top of the video
                    const span = $('<span>', {
                        class: 'content',
                        text: 'くしゃみ助かる',
                        css: {
                            position: 'absolute',      // Position the span absolutely
                            top: '50%',                // Center vertically
                            left: '50%',               // Center horizontally
                            transform: 'translate(-50%, -50%)', // Adjust to center the span
                            width: '100%',             // Make the span full width
                            textAlign: 'center',       // Center text within the span
                            color: 'white',            // Change text color to make it visible
                            fontSize: '24px',          // Adjust font size as needed
                            zIndex: 3                  // Ensure the span is above the video
                        }
                    });
                
                    // Append the span to the button (which is the parent)
                    button.append(video);  // Add video directly to the button
                    button.append(span);   // Add span on top of the video
                    sneezeContainer.append(button);  // Add button to sneezeContainer
                    $('#container_area').append(sneezeContainer);  // Add sneezeContainer to container_area
                
                    // Fade in the sneezeContainer and hide others
                    sneezeContainer.fadeIn(FADE_DURATION); // Use FADE_DURATION for fade in
                    
                    // Set the video playback rate to 1.2x
                    video[0].playbackRate = 1.2;
        
                    // Handle fade in and fade out on video end
                    video.on('ended', function() {
                        $(this).fadeOut(FADE_DURATION, function() {
                            // Once the video fades out, reset it and set a timeout for delay
                            setTimeout(function() {
                                video[0].currentTime = 0; // Reset video to the start
                                video.fadeIn(FADE_DURATION, function() {
                                    // After fading in, play the video again
                                    video[0].play();
                                });
                            }, FADE_DURATION); // 200 ms delay before restarting the video
                        });
                    });
                
                    // Start playing the video and handle initial fade-in
                    video.on('loadeddata', function() {
                        video[0].play(); // Start playing the video
                        video.fadeIn(FADE_DURATION); // Fade in when video is loaded
                    });    
                    $('#sneeze').fadeIn();
                } else {
                    $('#sneeze').show();
                }
            }, 200);
            $('#clear-text-button').show();
        } else {
            // Hide the sneeze if the input is changed
            setTimeout(() => {
                $('#sneeze').remove(); 
                $('#container_area').children().fadeIn(); 
            }, 200);
            $("button").each(function() {
                if ($(this).attr('id') === 'offcanvasNavbarbutton' || $(this).hasClass('button-subdirectory')) {
                    return true;
                }
                if ($(this).text().includes(content)) {
                    $(this).show(); 
                } else {
                    $(this).hide(); 
                }
            });
            if (content) {
                $('#clear-text-button').show(); 
            } else {
                $('#clear-text-button').hide(); 
                setTimeout(() => {
                    $('#container_area').children().fadeIn(); 
                }, 200);
            }
        }
    });
    
    
    //search box's visual effect
    $('#search').on('focus', function() {
        $("#search-icon").css('border-color', '#6eb1de');
        $("#search-icon").css('background-color', '#fafafa');
    })
    $('#search').on('blur', function() {
        $("#search-icon").css('border-color', '#fff');
        $("#search-icon").css('background-color', '#fff');
    });
});

// request json and change text language
function switchLanguage(lang) {
    // switch site's language
    let postData = { "lang": lang };
    $.when(
        $.ajax({
            url: '/data_request',
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify(postData),
            contentType: 'application/json'
        })
    ).done(function(textsData) {
        document.title = textsData.title; // update title
        $.each(textsData, function(categoryTag, data) {
            if (data !=null){
                if ($('#' + categoryTag).children().length > 0){
                    $('#' + categoryTag).children("span").text(data);
                }else{
                    $('#' + categoryTag).text(data);
                }
            }
        });
        $('html').attr('lang', lang); //change html attr
        $('#search').attr('placeholder', textsData.search); //change html attr
    }).fail(function(error) {
        console.error('Error fetching language files:', error);
    });
}

// Define a function to handle input range elements with class 'slider-progress'
function handleSliderProgress() {
    // Get all input range elements with class 'slider-progress'
    const sliders = document.querySelectorAll('input[type="range"].slider-progress');

    // Loop through each input range element
    sliders.forEach(slider => {
        // Set initial CSS custom properties based on the input attributes
        slider.style.setProperty('--value', slider.value);
        slider.style.setProperty('--min', slider.min === '' ? '0' : slider.min);
        slider.style.setProperty('--max', slider.max === '' ? '100' : slider.max);

        // Add event listener for 'input' event to update CSS custom property '--value'
        slider.addEventListener('input', () => {
            slider.style.setProperty('--value', slider.value);
        });
    });
}

// create customize Echo Effect node
function createEchoEffect(audioCtx) {
    const inputNode = audioCtx.createGain();
    const reverbNode = audioCtx.createConvolver();
    const outputNode = audioCtx.createGain();
    const wet = audioCtx.createGain();
    const dry = audioCtx.createGain();

    wet.gain.value = 0.5;
    dry.gain.value = 0.5;

    inputNode.connect(reverbNode);
    reverbNode.connect(wet);
    inputNode.connect(dry);
    dry.connect(outputNode);
    wet.connect(outputNode);

    return {
        inputNode: inputNode,
        reverbNode: reverbNode,
        outputNode: outputNode,
        wet: wet,
        dry: dry
    };
}

// set time limit to exec function
function throttle(func, delay) {
    let lastExecTime = 0;
    return function(...args) {
        const currentTime = Date.now();
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        }
    };
}