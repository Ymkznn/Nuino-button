# Nuino Button

Nuino Button [https://nuino-button.vercel.app](https://nuino-button.vercel.app/)

Related Links:
* [Kohaku Nuino's Youtube channel](https://www.youtube.com/channel/UCF4KiwafRPMgvnfipsk1JZg)
* [Kohaku Nuino's Twitter](https://twitter.com/Kohaku_Nuino)

# Requirements
Flask>=3.0.2  
dominate>=2.9.1

## Installation

`pip install flask`  
`pip install dominate`

# Usage
Clone all the documents to local.
This document is built using Python Flask. You can deploy the code to any supported platform, such as Vercel.  
If you're using Vercel to build the website, you only need to deploy the entire document to Vercel.

```
{
    "description":"ぬいのボタン; 心羽白ぬいの; nuino kohaku; vtuber button",
    "site-title":"ぬいのボタン",
    "title":"ぬいのボタン NUINO_BUTTON",
    "offcanvas-title":"ぬいのボタン",
    "default-lang":"日本語",
    "lang":{
        "ja":"日本語",
        "zh_TW":"繁體中文"
    },
    "voice_pause":"前の音声再生を停止",
    "links":{
        "Youtube":["Youtube","https://www.youtube.com/channel/UCF4KiwafRPMgvnfipsk1JZg"],
        "Twitter":["Twitter","https://twitter.com/Kohaku_Nuino"],
        "UNiVIRTUAL":["UNiVIRTUAL","https://univirtual.jp/"],
        "Unofficial_wiki":["非公式wiki","https://seesaawiki.jp/univirtual_fan/d/%bf%b4%b1%a9%c7%f2%a4%cc%a4%a4%a4%ce"]
    },
    "footer_left":"サイト制作：やまかぜ\n音声編集/協力のぬいぐる民さん（敬称略）：ARI、MIHARU、しょー、ただの通りすがり、ひらきょん、ふっく～、ヤナギ、梅",
    "source":{
        "google_form":["音声投稿","https://forms.gle/xYhMXtFcwTdLw8hJ7"],
        "github":["github","https://github.com/Ymkznn/Nuino-button"]
    },
    "declaration":"このサイトはファン作品であり、公式とは関係ありません"
}
```
auto.py can help you update index.html.  
All the parameters needed for generate are set in [api/static/text/description.json.](https://github.com/Ymkznn/Nuino-button/blob/main/api/static/text/description.json)

The 'lang' parameter in [api/static/text/description.json](https://github.com/Ymkznn/Nuino-button/blob/main/api/static/text/description.json) will generate corresponding translation files in [/api/static/text](https://github.com/Ymkznn/Nuino-button/tree/main/api/static/text) when using auto.py to generate index.html.

All button categories, names, and supplementary information (such as audio sources, etc.) are stored in [api/static/text/data.json.](https://github.com/Ymkznn/Nuino-button/blob/main/api/static/text/data.json) 
*The supplementary information will not be displayed on the website.

The audio format must be mp3 and saved in the format category-number.mp3 in [api/static/audios/.](https://github.com/Ymkznn/Nuino-button/tree/main/api/static/audios)

You can freely change the website's color scheme or form in [api/static/css/style.css.](https://github.com/Ymkznn/Nuino-button/blob/main/api/static/css/style.css)
