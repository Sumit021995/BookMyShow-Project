
// Import express for server creation
const express = require("express"); 
// Define App Components to use express
const app = express(); 
const bodyParser = require("body-parser");
// Port Defined!
const port = 8080; 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Import connector.js file  to make Database connection
const { connection } = require("./connector"); 
// Import cors
const cors = require("cors"); 
   


// .use Method Used cors for cross origin resource sharing here frontend and backend
app.use(cors()); 

// .use Method Used to Parse JSON bodies (as sent by API clients)
app.use(express.json());

// .post Method Used to POST API which insert booking data to dataBase
app.post("/api/booking", async (req, res) => {
  const { movie, slot, seats } = req.body;
  try {
    // Return true if body, movie or slot are empty.
    // It will  also check the seat selected or not.
    if (!movie || !slot) {
      res.send({ result: "Please Choose proper way!" });
    } else if (
      seats.A1 ||
      seats.A2 ||
      seats.A3 ||
      seats.A4 ||
      seats.D1 ||
      seats.D2
    ) {
      let data = new connection(req.body);
      let result = await data.save();
      res.status(200).send(result);
    } else {
      res.send({ result: "Please select a slot!" });
    }
  } catch (err) {
    // console.log(err);
    res.status(401).send({ result: "Please Don't use wrong way!" });
  }
});

// .get Method Used to GET API for returning last booking details from Database
app.get("/api/booking", async (_req, res) => {
  let data = await connection.find();
  if (data.length == 0) {
    res.send([]);
  } else {
    res.send([data[data.length - 1]]);
  }
});

// .listen Method Used to Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
