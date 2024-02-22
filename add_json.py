import json

langs = ['ja','zh_TW']
def update_json_data(target_category, updated_audio, audio_data, streaming_url=None,json_file='api/static/text/data.json'):
        updated_audio = updated_audio.split('.')[0]
        # 读取 JSON 文件
        with open(json_file, 'r', encoding='utf-8') as file:
            data = json.load(file)

        # 更新数据
        if {updated_audio:streaming_url} not in data[target_category]:
            data[target_category].append({updated_audio:streaming_url})
            audio_name = '{}-{:03d}.mp3'.format(list(data.keys()).index(target_category)+1,len(data[target_category]))
            with open('api/static/audios/{}'.format(audio_name),'wb') as file:
                file.write(audio_data)

            # 写回 JSON 文件
        with open(json_file, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
            
        for lang in langs:
            with open('api/static/text/{}.json'.format(lang),'r',encoding='utf-8') as file:
                zh_dict = json.load(file)
                
            for item in get_keys(data):
                if item not in zh_dict:
                    zh_dict[item] = item
                    
            with open('api/static/text/{}.json'.format(lang),'w',encoding='utf-8') as file:
                json.dump(zh_dict, file, ensure_ascii=False, indent=4)
        
            
def get_keys(d):
    keys = []
    if isinstance(d, dict):
        for k, v in d.items():
            keys.append(k)
            keys.extend(get_keys(v))
    elif isinstance(d, list):
        for item in d:
            keys.extend(get_keys(item))
    return keys

# 调用函数以更新 JSON 数据
with open('api/static/audios/いってらっしゃい.mp3','rb') as file:
    mp3 = file.read()
update_json_data('かわいい', 'いってらっしゃい.mp3',mp3)
