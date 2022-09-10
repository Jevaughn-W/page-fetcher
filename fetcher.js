const request = require('request'); // Import the request module
const fs = require('fs'); // Import write module
const cliInput = process.argv;

cliInput.splice(0,2); // remove unnecessary elements from the CLI array

request(cliInput[0], (error, response, body) => { 
  console.log('fetching data...');
  if (error){
    console.log(`Request Error: ${error}`);
  } else {
    console.log(`Request successful: ${response.statusCode}`)
  }
  fs.writeFile(cliInput[1], body, err => {
    
    // write output to a new file
    if (err) {
      console.log(`Write error: ${err}`);
    } else {
      
      // write the file size to output
      fs.stat(cliInput[1], (err, stats) => {
        if(err) {
          console.log("Error", err);
        }
        console.log(`Downloaded and saved bytes ${stats.size} to ${cliInput[1]}`);
      });
    }
  }); 
});
