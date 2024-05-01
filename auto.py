import add_json
import generate

genre = ['かわいい','うまい','病み','奇声','名言','モノマネ','その他']

with open('api/static/temp_audio/なんて？4.mp3','rb') as file:
    mp3 = file.read()
add_json.update_json_data(genre[-1], 'なんて？4.mp3',mp3)
generate.generate()
