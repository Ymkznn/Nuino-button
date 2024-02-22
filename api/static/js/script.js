
$(document).ready(function() {
    var autoPauseEnabled = true; // 設置自動暫停功能是否啟用
    var currentAudio = null; // 用來追蹤當前正在播放的音頻

    $('.lang-switch').click(function() {
        var lang = $(this).data('lang');
        switchLanguage(lang);
    });
    
    $(".play-audio").click(function(){
        var audioFile = $(this).data('audio');

        // 如果自動暫停功能啟用且有正在播放的音頻，則暫停它
        if (autoPauseEnabled && currentAudio !== null) {
            currentAudio.pause();
        }

        // 創建新的音頻元素並播放
        var audio = new Audio(audioFile);
        audio.play();

        // 將新的音頻設置為當前音頻
        currentAudio = audio;
    });

    $("#autopause_on").click(function(){
        // 切換自動暫停功能的狀態
        var lang = document.documentElement.lang
        msg = updateToggleButton(lang,autoPauseEnabled);
        if (autoPauseEnabled) {
            $(this).text(msg).toggleClass("text-bg-dark text-bg-white").attr("id", "autopause_off");
        } else {
            $(this).text(msg).toggleClass("text-bg-dark text-bg-white").attr("id", "autopause_on");
        }
        autoPauseEnabled = !autoPauseEnabled;
    });
});

function updateToggleButton(lang,autoPauseEnabled) {
    var toggleButtonText;
    $.ajax({
        url: `texts_${lang}.json`,
        dataType: 'json',
        async: false, // 將 AJAX 請求設為同步
        success: function(data) {
            if (!autoPauseEnabled){
                toggleButtonText = data["autopause_on"];
            }
            else{
                toggleButtonText = data["autopause_off"];
            }
        },
        error: function(error) {
            console.error('Error fetching language file:', error);
        }
    });
    return toggleButtonText; // 返回 toggleButtonText
}


function switchLanguage(lang) {
    $.when(
        $.ajax({
            url: `texts_${lang}.json`,
            dataType: 'json'
        }),
        $.ajax({
            url: `${lang}.json`,
            dataType: 'json'
        })
    ).done(function(textsData, dataData) {
        var texts = textsData[0];
        var data = dataData[0];
        updateTexts(texts,lang);
        updateData(data);
        document.title = texts.title; // 更新标题
    }).fail(function(error) {
        console.error('Error fetching language files:', error);
    });

    $('html').attr('lang', lang); // 修改根元素的 lang 属性
}

function updateTexts(texts,lang) {
    $.each(texts, function(categoryTag, data) {
        $('#' + categoryTag).text(data);
    });
}

function updateData(data) {
    $.each(data, function(categoryTag, data) {
        $.each(data, function(categoryName, data) {
            $('#' + categoryTag).text(categoryName);
            $.each(data, function(buttonTag, data) {
                $.each(data, function(buttonText, url) {
                    $('#' + categoryTag+(buttonTag+1)).text(buttonText.split('.')[0]);
                });
            });
        });
    });
}