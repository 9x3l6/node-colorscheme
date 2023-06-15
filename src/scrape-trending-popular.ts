var fs = require('fs');
var path = require('path');
var osmosis = require('osmosis');

var palettes: any = {};

osmosis
.get('https://www.schemecolor.com/')
.find('//li/h5[not(contains(text(), "Tools"))]/parent::li/following-sibling::li/a')
// .set('in', '@href')
.follow('@href')
.paginate('//*[@id="container"]/div[2]/div/div/div/span[@class="current"]/following-sibling::a[1]')
.then(function (context: any, data: any) {
  const term = context.request.query.s || '';
  const location = term === '' ? path.basename(context.request.pathname) : term;
  data.file = location.replace(/ /gi, '-');
  data.url = context.request.href;
})
.set('page', '//*[@id="container"]/div[2]/div/div/div/span[@class="current"]')
.find('//*[@id="container"]/div/ul/li/h2/a')
.set('palette')
.follow('@href')
// .data(function(data: any) {
//   console.log(data)
// })
.find('//*[@id="container"]/div[4]/div[2]/table/tbody/tr/td[2]/ul/li')
.set('item')
.data(function(data: any) {
  if (!palettes[data.file]) {
    palettes[data.file] = {};
  }
  if (!palettes[data.file][data.palette]) {
    palettes[data.file][data.palette] = [];
  }
  palettes[data.file][data.palette].push(data.item);
})
.log(console.log)
.error(console.error)
.debug(console.debug)
.done(function() {
  // console.log(palettes);
  const files = Object.keys(palettes);
  for (let file of files) {
    const filename = path.join('data', `${file}.json`);
    fs.writeFile(filename, JSON.stringify(palettes[file]), (err: any) => {
      if (err) throw console.error(err);
      console.log(`Saved ${filename}`);
    });
  }
  fs.writeFile(path.join('data', 'index.json'), JSON.stringify(['generated', ...files]), (err: any) => {
    if (err) throw console.error(err);
    console.log(`Saved index.json`);
  });
});
