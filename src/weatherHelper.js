import YQL from 'yql'

// The WeatherHelper uses YQL to get weather data by YAHOO weather api
// YAHOO weather api is free with the access is limited to 2,000 signed calls per day.
export default class WeatherHelper {
  constructor() {
    this.cacheWeatherData = {};
  }

  clearCache() {
    this.cacheWeatherData = {};
  }

  setCacheData(city, data) {
    this.cacheWeatherData[city] = data;
  }

  fetchWeather(city) {
    let setCacheData = this.setCacheData.bind(this);
    let that = this;

    let query = new YQL(
      `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}") and u="c"`
    );

    return new Promise((resolve, reject) => {
      if (that.cacheWeatherData[city]) {
        console.log('cache');
        resolve(that.cacheWeatherData[city]);
      }

      query.exec(function(err, data) {
        setCacheData(city, data);
        resolve(data);
      });
    });
  }

  weatherCodeToMandarin(code) {
    switch (+code) {
      case 0: return '龍捲風';
      case 1: return '熱帶風暴';
      case 2: return '颶風';
      case 3: return '大雷雨';
      case 4: return '雷雨';
      case 5: return '混合雨雪';
      case 6: return '混合雨霰';
      case 7: return '混合雪霰';
      case 8: return '毛毛雨冰';
      case 9: return '毛毛雨';
      case 10: return '雨冰';
      case 11: return '陣雨';
      case 12: return '陣雨';
      case 13: return '飄雪';
      case 14: return '陣雪';
      case 15: return '吹雪';
      case 16: return '下雪';
      case 17: return '冰雹';
      case 18: return '霰';
      case 19: return '多塵';
      case 20: return '多霧';
      case 21: return '陰霾';
      case 22: return '多煙';
      case 23: return '大風';
      case 24: return '有風';
      case 25: return '寒冷';
      case 26: return '陰天';
      case 27: return '多雲時陰(夜)';
      case 28: return '多雲時陰(日)';
      case 29: return '多雲(夜)';
      case 30: return '多雲(日)';
      case 31: return '晴朗(夜)';
      case 32: return '晴天';
      case 33: return '晴朗(夜)';
      case 34: return '晴朗(日)';
      case 35: return '冰雹雨';
      case 36: return '炎熱';
      case 37: return '局部雷雨';
      case 38: return '短暫雷雨';
      case 39: return '短暫雷雨';
      case 40: return '短暫下雪';
      case 41: return '大雪';
      case 42: return '短暫陣雪';
      case 43: return '大雪';
      case 44: return '多雲';
      case 45: return '雷雨';
      case 46: return '陣雪';
      case 47: return '局部雷雨';
      default:
      return '資料錯誤';
    }
  }

  getForecastText(city, data) {
    let queryResult = data.query.results;
    let item = queryResult.item;

    return `現在的氣溫是攝氏${item.condition.code}度喵～本喵覺得${city}今天是${this.weatherCodeToMandarin(item.condition.code)}`
  }


}
