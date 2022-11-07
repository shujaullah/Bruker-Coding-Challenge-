const fs = require("fs");

export default function handler(req, res) {
  res.status(200).json({ text: "Hello" });
  // reading the file using the fs readFileSync
  // and parsing the data as json
  let data = fs.readFileSync("./data.json");
  let myObject = JSON.parse(data);

  while (myObject.data.length > 0) {
    myObject.data.pop();
  }
  // declaring the moment variable for formating the date. 
  var moment = require("moment");
  

  let arr = [];
  // Read key
  for (var key in req.body) {
    console.log(key);
    console.log(req.body[key]);
    // checking if the req body rreturning the date string format 
    // if yes we will save the that date as date saved. 
    if (moment(req.body[key], "YYYY-MM-DD", true).isValid()) {
      myObject.dateSaved = req.body[key];
    }
    if (key === "") continue;
    // if pushing the jason objects in the required fom in the array. 
    arr.push({ fieldId: Number(key), value: req.body[key] });
  }
  // assiging that array to the data array in myObject json data. 
  myObject.data = arr;
  let newData2 = JSON.stringify(myObject);
  // writing into the data.json file with updated data. 
  fs.writeFileSync("./data.json", newData2);
}
