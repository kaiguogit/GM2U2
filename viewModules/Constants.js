export const ItemTypes = {
  WIDGETICON: 'widgeticon'
};

export const WidgetTypes = {
  time: "time",
  traffic: "traffic",
  weather: "weather",
  calendar: "calendar",
  news: "news"
}

export const WidgetIconImage = {
  time: "./public/clock-icon.jpg",
  traffic: "./public/Maps.png",
  weather: "./public/weather.png",
  calendar: "./public/calendar.png",
  //http://c.dryicons.com/images/icon_sets/colorful_stickers_part_5_icons_set/png/256x256/news.png
  //http://dryicons.com/icon/colorful-stickers-part-5-icons-set/news/
  news: "./public/news.png"
}

export const WidgetIconImageX96 = {
  time: "./public/x96/clock-icon.jpg",
  traffic: "./public/x96/Maps.png",
  weather: "./public/x96/weather.png",
  calendar: "./public/x96/calendar.png",
  news: "./public/news.png"
}

export const ClockFace = {
  TwentyFourHourClock: "TwentyFourHourClock",
  TwelveHourClock: "TwelveHourClock"
}

export const NewsSource = {
  "the-new-york-times": {name: "the-new-york-times", sortBy: "popular"},
  "espn": {name: "espn", sortBy: "top"},
  "ign": {name: "ign", sortBy: "top"},
  "google-news": {name: "google-news", sortBy: "top"},
  "reddit-r-all": {name: "reddit-r-all", sortBy: "top"},
  "new-scientist": {name: "new-scientist", sortBy: "top"},
  "fox-sports": {name: "fox-sports", sortBy: "top"},
  "nfl-news": {name: "nfl-news", sortBy: "top"},
}