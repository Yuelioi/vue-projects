export function srtParser(srt: any) {
  let result = srt.split("\n");
  let sub_list, id_list, start_list, end_list;
  sub_list = id_list = start_list = end_list = <any>[];

  for (let i = 0, j = Math.floor(result.length / 4); i < j; i++) {
    id_list.push(result[i * 4]);
    sub_list.push(result[i * 4 + 2]);
    const t = result[i * 4 + 1].split(" --> ");
    start_list.push(srtTime2seconds(t[0]));
    end_list.push(srtTime2seconds(t[1]));
  }

  return [id_list, start_list, end_list, sub_list];
}

function srtTime2seconds(srtTime: string) {
  const st = srtTime.replace(",", ":").split(":");
  const tm = parseInt(st[0]) * 3600 + parseInt(st[1]) * 60 + parseInt(st[2]) + parseInt(st[3]) / 1000;
  return tm;
}

export function jyParson(jsonContent: any, srcList: string[], trgList: string[]) {
  var jsonData = JSON.parse(jsonContent);
  var texts = jsonData.materials.texts;
  var tracks = jsonData["tracks"];

  for (let i = 0; i < texts.length; i++) {
    let s = texts[i];
    for (var j = 0, l = srcList.length; j < l; j++) {
      s["content"] = s["content"].replace(srcList[j], trgList[j]);
    }
  }
  return jsonData;
}
