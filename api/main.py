from flask import Flask, render_template,request

app = Flask(__name__)

# 假設你的 JSON 數據
json_data = {
    "buttons": ["Button 1", "Button 2", "Button 3"]
}

# 路由，根據設備返回不同的 HTML 模板
@app.route('/')
def index():
    # 檢測用戶訪問設備，這裡簡單地假設是桌面電腦
    agent = request.headers.get('User-Agent')
    if any(device in agent.lower() for device in ('iphone', 'android', 'blackberry')):
            return render_template('index_mobile.html', buttons=json_data['buttons'])
    else:
        return render_template('index_desktop.html', buttons=json_data['buttons'])

if __name__ == '__main__':
    app.run(debug=True)