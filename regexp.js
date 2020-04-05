const request = require("request");
const fs = require("fs");
const Inliner = require("inliner");

const wikiParserUrl = "https://a-parser.com/wiki/parsers/";

// регулярка для получения контента
let regexp2 = new RegExp(
  /<tr class="dataRow"><td><b><img[^>]*>\s<a[^>]*>(.*?)<\/a><\/b><\/td><td>Парсер поисковой выдачи(.*?)<\/td><\/tr>/gm
);

// получим контент со страницы
request(wikiParserUrl, function(error, response, body) {
  // инлайним контент и записываем в файл для дальнейшей работы
  new Inliner(body, function(error, html) {
    try {
      const writeDataToFile = fs.createWriteStream("./data-1.html");
      writeDataToFile.write(html);
    } catch (e) {
      console.log(e);
    }
  });
});

fs.readFile("./data-1.html", function(err, data) {
  // читаем полученный контент как текст
  const dataArray = data.toString().match(regexp2);
  // ищем совпадения
  for (const match of dataArray) {
    // вывод в консоль
    console.log(match.replace(regexp2, "Парсер поисковой выдачи - $2"));
  }
});
