var fs = require('fs');
var path = require('path');
var osmosis = require('osmosis');

var palettes: any = {};

osmosis
.get('https://www.schemecolor.com/tools/color-scheme-generator')
// .find('//*[@id="container"]/script')
// .set('script')
// .data(function(data: any) {
//   palettes.generated = data.script.replace(/.*Array\(/, '').split(',);var ')[0].replace(/"/g, '').split(',');
// })
.find('//ul[@class="tags-page-items"]/li/h3/a')
.set('in', '@href')
.follow('@href')
.then(function (context: any, data: any) {
  const location = path.basename(context.request.pathname)
  data.palette = location.replace(/ /gi, '-');
})
.find('//*[@class="hx"]')
.set('item')
.data(function(data: any) {
  if (!palettes[data.palette]) {
    palettes[data.palette] = [];
  }
  palettes[data.palette].push(data.item);
})
.log(console.log)
.error(console.error)
.debug(console.debug)
.done(function() {
  // console.log(palettes);
  const filename = path.join('data', 'generated.json');
  fs.writeFile(filename, JSON.stringify(palettes), (err: any) => {
    if (err) throw console.error(err);
    console.log(`Saved ${filename}`);
  });
});
