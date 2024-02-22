from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_data')
def get_json_data():
    with open('api/static/text/data.json', encoding="utf_8") as f:
        json_data = json.load(f)
    return jsonify(json_data)

@app.route('/zh_TW',endpoint='zh_TW')
def get_json_data():
    with open('api/static/text/zh_TW.json', encoding="utf_8") as f:
        json_data = json.load(f)
    return jsonify(json_data)

@app.route('/ja',endpoint='ja')
def get_json_data():
    with open('api/static/text/ja.json', encoding="utf_8") as f:
        json_data = json.load(f)
    return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=True)