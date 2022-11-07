const fs = require("fs");

export default function handler(req, res) {
    const file = fs.readFileSync("./data.json");
    let data = JSON.parse(file);
    console.log(data)
    res.status(200).json(data);
}