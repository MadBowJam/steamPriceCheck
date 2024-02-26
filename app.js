const steamprice = require('./assets/js/core.js');
const itemsArray = require('./assets/js/itemList.js');
const fs = require('fs'); // Доступ до файлової системи
let results = []; // Масив для зберігання мінімальних цін
const delay = 5000; // Затримка між запитами

const today = new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }) // Отримуємо поточну дату та час
  .replace(/\//g, '.') // Замінюємо "/" на "."
  .replace(/[,\s:]/g, '_'); // Замінюємо пробіли, коми та крапки на "_"

for (let i = 0; i < itemsArray.itemsList.length; i ++) {
  setTimeout(()=> {
    steamprice.getprice(730, itemsArray.itemsList[i], '1')
    .then(data => {
      results.push(data["lowest_price"].substring(1).replace('.', ',')); //  Додаємо в масив результат найнижчої ціни
      console.log(`${i+1} complete`); // Виводимо в консоль надпис про успішно завершену ітерацію
    })
    .catch(err => console.log(err));
  }, delay * i)
}

setTimeout(() => {
  fs.writeFile(`json/${today}.json`, JSON.stringify(results), function(err) { // Створюємо файл з сьогоднішньою датою, та записуємо туди масив
    if (err) throw err;
    console.log('All complete');
  });
}, delay * itemsArray.itemsList.length);