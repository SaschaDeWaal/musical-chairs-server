const compressor = require('node-minify');

const files = ['server.js', 'game.js', 'player.js'];

files.forEach((fileName) => {
  compressor.minify({
    compressor: 'gcc',
    input: './src/' + fileName,
    output: './build/' + fileName,
    callback: function(err, min) {
      if(err !== null){
        console.log(err);
      }
    }
  });
});
