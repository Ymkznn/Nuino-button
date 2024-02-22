import json

def update_json_data(json_file, target_category, updated_audio, streaming_url=None):
        updated_audio = updated_audio.split('.')[0]
        # 读取 JSON 文件
        with open(json_file, 'r', encoding='utf-8') as file:
            data = json.load(file)

        # 更新数据
        for category_key, category_value in data.items():
            if target_category in category_value:
                if {updated_audio:streaming_url} not in data[category_key][target_category]:
                    data[category_key][target_category].append({updated_audio:streaming_url})

        # 写回 JSON 文件
        with open(json_file, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=4)

# 调用函数以更新 JSON 数据
update_json_data('ja.json', 'カテゴリー1', 'いってらっしゃい.mp3')
