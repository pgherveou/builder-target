var fs = require('fs');

module.exports = function (mapping) {
  return function target(file, done) {
    var targetFile = file.node[mapping] && file.node[mapping][file.path];
    if (!targetFile) return done();
    targetFile = file.filename.replace(file.path, targetFile);

    fs.readFile(targetFile, 'utf8', function(err, string) {
      if (!err) file.string = string;
      done(err);
    });
  };
};

