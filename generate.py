from dominate.tags import *
import dominate
import json

def generate():
    with open("api/static/text/description.txt","r",encoding="utf_8") as file:
        description = file.read()
    with open("api/static/text/data.json", "r", encoding="utf_8") as f:
        data = json.load(f)
    doc = dominate.document(title="ぬいのボタン NUINO_BUTTON")
    with doc:
        html(lang="ja")

    with doc.head:
        meta(charset="utf_8")
        #meta(http_equiv="X_UA_Compatible",content="IE=edge")
        meta(name="google-site-verification",content="fsRhq_lprbn64PdLt3miBwpUTYLT7Y2Je7UE-4ZI3r8")
        meta(name="description",content=description)
        meta(name="viewport",content="width=device_width,initial_scale=1,maxium-scale=1,user-scalable=0")
        link(rel="shortcut icon", type="image/x-icon", href="{{ url_for('static', filename='favicon.ico') }}")
        link(rel="stylesheet", type="text/css",href="{{ url_for('static', filename='css/style.css') }}")
        link(rel="stylesheet", href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css")
        script(src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js")
        script(src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js")
        script(src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js")

    with doc.body:
        script(type="text/javascript", src="{{ url_for('static', filename='js/script.js') }}")
        with div(cls="main-app"):
            with div(cls="navbar navbar-dark fixed-top"):
                with div(cls="container-fluid",id="navbar_container"):
                    with button (cls="navbar-toggler", type="button", data_bs_toggle="offcanvas", data_bs_target="#offcanvasNavbar", aria_controls="offcanvasNavbar", aria_label="Toggle navigation"):
                        span (cls="navbar-toggler-icon")
                    a("ぬいのボタン", cls="navbar-brand",id="heading", href="#")
                    
                    with div(cls="nav-item dropdown"):
                        a("日本語",id="lang", cls="nav-link navbar-brand dropdown-toggle", href="#", role="button", data_bs_toggle="dropdown", aria_expanded="false")
                        with ul(cls="dropdown-menu dropdown-menu-end"):
                            a("日本語", cls="dropdown-item lang-switch",data_lang="ja", href="#")
                            a("繁體中文", cls="dropdown-item lang-switch",data_lang="zh_TW", href="#")
                    with div(cls="offcanvas offcanvas-start text-bg-dark",
                                tabindex="_1",
                                id="offcanvasNavbar",
                                aria_labelledby="SidebarLabel"):
                        with div(cls="offcanvas-header"):
                            with button(type="button",
                                    cls="navbar-toggler",
                                    data_bs_dismiss="offcanvas",
                                    aria_label="Close"):
                                span(cls="navbar-toggler-icon")
                            div("ぬいのボタン",
                                    cls="offcanvas-title",
                                    id="SidebarLabel")

                        with div(cls="offcanvas-body"):
                            with div(cls="options"):
                                input_(cls="repeat-check",type="checkbox", value="", id="flexCheckChecked",checked="")
                                label("前の音声再生を停止",cls="form-check-label",_for="flexCheckChecked",id="autopause_on")
                            with ul(cls="navbar-nav flex-grow-1 pe-3",id="links"):
                                with li(cls="nav-item"):
                                    a("Youtube", cls="nav-link", href="https://www.youtube.com/channel/UCF4KiwafRPMgvnfipsk1JZg",target="-blank")
                                with li(cls="nav-item"):
                                    a("Twitter", cls="nav-link", href="https://twitter.com/Kohaku_Nuino",target="-blank")
                                with li(cls="nav-item"):
                                    a("UNiVIRTUAL", cls="nav-link", href="https://univirtual.jp/",target="-blank")
                
            with div(cls="container-fluid",id="container_area"):
                for category_tag,(category, buttons) in enumerate(data.items()):
                    with div():
                        div(category,cls="category_area",id="category_{}".format(category_tag+1))
                        with div(cls="row"):
                            with div(cls="cate-body"):
                                for button_tag,button_name in enumerate(buttons):
                                    name,url = button_name.popitem()
                                    button(name,id="{}-{:03d}".format(category_tag+1,button_tag+1),**{"data-audio":"{}-{:03d}.mp3".format(category_tag+1,button_tag+1)},type="button", cls="btn btn-danger play-audio")
                                    
            with div(cls="container-fluid footer-custom", id="page-footer"): # 添加 id 属性
                with div(cls="row"):
                    # 靠左的div
                    with div(cls="col-md-6"):
                        p("サイト制作：やまかぜ",style="font-size:15px;margin:0 auto;")
                        p("音声編集/協力のぬいぐる民さん（敬称略）：ARI、MIHARU、しょー、ただの通りすがり、ひらきょ、ふっく～、ヤナギ、梅",style="font-size:15px;margin:0 auto;")
                    # 靠右的div
                    with div(cls="col-md-6 text-end"):
                        a("音声投稿",href="https://forms.gle/xYhMXtFcwTdLw8hJ7",target="-blank",style="margin:0 auto;")
                        p("このサイトはファン作品であり、公式とは関係ありません",style="margin:0 auto;")
            
    with open("api/templates/index.html","w",encoding="utf_8") as file:
        file.write(doc.render())