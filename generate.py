from dominate.tags import *
import dominate
import json

doc = dominate.document(title="ぬいのボタン NUINO_BUTTON")
with open("api/static/text/description.txt","r",encoding="utf_8") as file:
    description = file.read()
with open("api/static/text/ja.json", "r", encoding="utf_8") as f:
    data = json.load(f)

with doc:
    html(lang="ja")

with doc.head:
    meta(charset="utf_8")
    #meta(http_equiv="X_UA_Compatible",content="IE=edge")
    meta(name="description",content=description)
    meta(name="viewport",content="width=device_width,initial_scale=1")
    link(rel="icon",href="/favicon.ico")
    link(rel="stylesheet",href="style.css")
    link(rel="stylesheet", href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css")
    script(src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js")
    script(src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js")
    script(src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js")

with doc.body:
    script(src="audio_play.js")
    with div(cls="main-app"):
        with nav(cls="navbar navbar-dark bg-dark fixed-top"):
            with div(cls="container-fluid"):
                with button (cls="navbar-toggler", type="button", data_bs_toggle="offcanvas", data_bs_target="#offcanvasNavbar", aria_controls="offcanvasNavbar", aria_label="Toggle navigation"):
                    span (cls="navbar-toggler-icon")
                a("ぬいのボタン", cls="navbar-brand",id="heading", href="#")
                button("オートポーズオン",cls='ms-auto text-bg-white',id="autopause_on")
                with div(cls="nav-item dropdown"):
                    a("日本語",id="lang", cls="nav-link navbar-brand dropdown-toggle", href="#", role="button", data_bs_toggle="dropdown", aria_expanded="false")
                    with ul(cls="dropdown-menu"):
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
                        h5("ぬいのボタン",
                                cls="offcanvas-title",
                                id="SidebarLabel")

                    with div(cls="offcanvas-body"):
                        with ul(cls="navbar-nav justify-content-end flex-grow-1 pe-3"):
                            with li(cls="nav-item"):
                                a("Youtube", cls="nav-link", href="https://www.youtube.com/channel/UCF4KiwafRPMgvnfipsk1JZg",target="-blank")
                            with li(cls="nav-item"):
                                a("Twitter", cls="nav-link", href="https://twitter.com/Kohaku-Nuino",target="-blank")
                            with li(cls="nav-item"):
                                a("UNiVIRTUAL", cls="nav-link", href="https://univirtual.jp/",target="-blank")
            
            
        with div(cls="container-fluid",id="container_area"):
            for category_tag, categorys in data.items():
                for category, buttons in categorys.items():
                    with div(cls=category):
                        with div(id='category_area'):
                            with div(cls="col"):
                                h3(category,id=category_tag, style="text-align: center;padding-bottom: 5px")
                        with div(cls="row"):
                            with div(cls="cate-body"):
                                for button_tag,button_name in enumerate(buttons):
                                    name,url = button_name.popitem()
                                    button(name,id=category_tag+str(button_tag+1),type="button", cls="btn btn-primary play-audio",**{"data-audio":f"{name}.mp3"})
                                
    with div(cls="container-fluid footer-custom", id="page-footer"): # 添加 id 属性
        with div(cls="row"):
            # 靠左的div
            with div(cls="col-md-6"):
                p("Left footer content")
            # 靠右的div
            with div(cls="col-md-6 text-end"):
                p("Right aligned footer content")
            
with open("api/templates/index.html","w",encoding="utf_8") as file:
    file.write(doc.render())