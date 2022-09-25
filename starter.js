const child_process = require('child_process');

child_process.exec('./starter.bat', function(error, stdout, stderr) {
    console.log(stdout);
});