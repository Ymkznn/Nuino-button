
$(document).ready(function() {
    var autoPauseEnabled = true; // 設置自動暫停功能是否啟用
    var currentAudio = null; // 用來追蹤當前正在播放的音頻

    $('.lang-switch').click(function() {
        var lang = $(this).data('lang');
        switchLanguage(lang);
    });
    
    $(".play-audio").click(function(){
        // 获取音频文件的文件名
        var audioFileName = $(this).data('audio');
    
        // 构建音频文件的 URL
        var encodedFileName = encodeURIComponent(audioFileName);
        var audioFile = '/static/audios/' + encodedFileName;
        // 如果自动暂停功能启用且有正在播放的音频，则暂停它
        if (autoPauseEnabled && currentAudio !== null) {
            currentAudio.pause();
        }
    
        // 创建新的音频元素并播放
        var audio = new Audio(audioFile);
        audio.play();
    
        // 将新的音频设置为当前音频
        currentAudio = audio;
    });

    $("#autopause_on").click(function(){
        // 切換自動暫停功能的狀態
        var lang = document.documentElement.lang
        msg = updateToggleButton(lang,autoPauseEnabled);
        if (autoPauseEnabled) {
            $(this).attr("id", "autopause_off");
        } else {
            $(this).attr("id", "autopause_on");
        }
        autoPauseEnabled = !autoPauseEnabled;
    });
});

function updateToggleButton(lang,autoPauseEnabled) {
    var toggleButtonText;
    $.ajax({
        url: `/${lang}`,
        method: 'GET',
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
            url: `/${lang}`,
            method: 'GET',
            dataType: 'json'
        })
    ).done(function(textsData) {
        updateTexts(textsData);
        document.title = textsData.title; // 更新标题
    }).fail(function(error) {
        console.error('Error fetching language files:', error);
    });

    $('html').attr('lang', lang); // 修改根元素的 lang 属性
}

function updateTexts(texts) {
    $.each(texts, function(categoryTag, data) {
        if (data !=null){
            $('#' + categoryTag).text(data);
        }
    });
}
