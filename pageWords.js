const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");

let newUrl = "https://a-parser.com";
// Получим исходную страницу
request(newUrl, function(error, response, body) {
  if (!error) {
    // Загрузим контент <htmL> тега и получим весь его текстовый контент
    let $page = cheerio.load(body);
    let text = $page("html").text();
    // форматируем контет, что бы в нем не было лишних символов
    text = text
      .replace(/[<div[^>]*><img[^>]*>[^>]*<\/div>/g, "")
      .replace(/\s+/g, " ")
      .replace(/\d/g, "")
      .replace(/[,\/\.\:\;\!\&\?]/g, "")
      .replace(/[ ,;:/]*$/g, "")
      .replace(/[\)\(]/g, "");
    // фильтруем контент, по длине слова
    let wordsFromPage = text.split(" ").filter(w => w.length > 3);
    // вывод в консоль всех слов больше 3х букв
    console.log(wordsFromPage.length);
    // вывод в консоль массива слов
    console.log(wordsFromPage);
  } else {
    console.log("Произошла ошибка: " + error);
  }
});
