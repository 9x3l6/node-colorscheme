var path = require('path');
var files = require(path.join('..', 'data', 'index.json'));

var palettes: any = {};
for (let file of files) {
  palettes[file] = require(path.join('..', 'data', `${file}.json`))
}
module.exports = {
  palettes,
};
