import WeatherHelper from './weatherHelper.js'

export default class ChatHelper {
  constructor() {
  }

  getResponse(text) {
    if (!text) {
      return;
    }

    if (text.indexOf('天氣') !== -1) {
      let timeDesc = ['現在', '今天', '明天', '後天', '大後天', '星期一', '星期二', '星期三',
      '星期四', '星期五', '星期六', '星期日', '星期天', '禮拜一', '禮拜二', '禮拜三', '禮拜四',
      '禮拜五', '禮拜六', '禮拜日', '禮拜天'];

    }

    if (text.indexOf('要不要') !== -1 && text.indexOf('不要不要') === -1) {
      return `本喵要是你就${text.substr(text.indexOf('要不要') + 3, 1)}了喵！`;
    }

    if (text.indexOf('不要不要') !== -1 || text.indexOf('嫑嫑') !== -1) {
      return '本喵也想吃罐罐吃到嫑嫑的~~';
    }

    if (text.indexOf('真想') !== -1) {
      let wantWord = text.indexOf('真想');
      if (text[wantWord + 2] == '要' || text[wantWord + 2] == '有') {
        return '如果給本喵吃罐罐，本喵就考慮賞賜給你唷～喵';
      } else {
        return `如果給本喵吃罐罐，本喵就考慮幫你${text[wantWord + 2]}～喵`;
      }
    }

    if (text.indexOf('有點想') !== -1) {
      let wantWord = text.indexOf('有點想');
      if (text[wantWord + 3] == '要' || text[wantWord + 2] == '有') {
        return '如果給本喵吃罐罐，本喵就考慮賞賜給你唷～喵';
      } else {
        return `如果給本喵吃罐罐，本喵就考慮幫你${text[wantWord + 2]}～喵`;
      }
    }

    if (text.indexOf('為什麼') !== -1 || text.indexOf('不太懂') !== -1 || text.indexOf('不太理解') !== -1) {
      let textList = ['本喵的貓腦也想不透', '給本喵罐罐本喵就大發慈悲回答你', '我問看看 @how30013 他知不知道'];
      let randomText = textList[Math.floor(Math.random() * textList.length)];
      return `${randomText}`;
    }

    if (text.indexOf('不小心') !== -1) {
      return '給本喵罐罐本喵就大發慈悲回答你';
    }

    if (text.indexOf('原來') !== -1 || text.indexOf('以為') !== -1 || text.indexOf('發現') !== -1) {
      let mediaText = ['報紙', '批踢踢', '臉書', 'Line', '雜誌', '電視', '你的噗'];
      let randomText = mediaText[Math.floor(Math.random() * mediaText.length)];
      return `本喵也是看了${randomText}才知道的`;
    }

    if (text.indexOf('也許') !== -1 || text.indexOf('或許') !== -1 || text.indexOf('好像') !== -1 || text.indexOf('似乎') !== -1 || text.indexOf('大概') !== -1 || text.indexOf('感覺') !== -1) {
      let mediaText = ['八卦版', '西斯版', '臉書', '你的D槽裡', 'Google', '圖書館', '冰箱裡'];
      let randomText = mediaText[Math.floor(Math.random() * mediaText.length)];
      return `本喵去${randomText}查看看是不是真的是這樣`;
    }

    if (text.indexOf('好險') !== -1 || text.indexOf('還好') !== -1 || text.indexOf('幸虧') !== -1) {
      return '這樣太危險';
    }

    if (text.indexOf('雖然') !== -1 || text.indexOf('但是') !== -1 || text.indexOf('不過') !== -1 || text.indexOf('可是') !== -1 || text.indexOf('還是') !== -1 ) {
      let textList = ['這也沒辦法嘛喵～', '本喵就讓你摸摸肉球吧', '所以結論是什麼喵？', '人類這種奴才種族還真是麻煩喵～'];
      let randomText = textList[Math.floor(Math.random() * textList.length)];
      return `${randomText}`;
    }

    if (text.indexOf('不小心') !== -1) {
      return '是故意的吧～喵';
    }

    if (text.indexOf('87') !== -1) {
      let textList = ['太87啦～喵', '本喵給87分\n不能再高了', '本喵給0.87分\n不能再低了', '聊天室可以不要打= =嗎我頭很痛'];
      let randomText = textList[Math.floor(Math.random() * textList.length)];
      return `${randomText}`;
    }

    if (text.indexOf('奴才') !== -1) {
      return '本喵的頭號奴才就是 @how30013';
    }

    if (text.indexOf('薛丁格') !== -1) {
      return '別提薛丁格 我的豆頁很痛喵';
    }

    if (text.indexOf('上班') !== -1) {
      return '奴才快去上班買罐罐給本喵吃！';
    }

    if (true) {
      let textList = ['這才不關本喵的事~Zzz(睡',
      '本喵告訴你個小知識就是本喵也會說英文哦！\nMeow~meow~',
      '喵喵喵~',
      '聽說現在這個世界貓派是主流呢',
      '真是太有道理了喵！',
      '本喵的奴才一天到晚敲鍵盤也不知道在打什麼，本喵隨便打的都比他好 sduifhi1heas!@#rtefdsf'];
      let randomText = textList[Math.floor(Math.random() * textList.length)];
      return `${randomText}`;
    }
  }
}
