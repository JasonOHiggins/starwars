let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();
let PORT = process.env.PORT || 3000;  // "process.env.PORT" is for Heroku to find alternate port if 3000 is taken, if not, than use 3000

//set up app to use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Data
// make sql call and store result into array of objects
var characters = [{
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  }, {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  }, {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Knight",
    age: 60,
    forcePoints: 1350
  }];
  

// routes
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
    // res.send('welcome to the starwars page');
    // console.log('home page');
    //if i was super dorky i could take this console and fs it to a file or database (form here).
})

//api route
app.get('/api/characters', function(req, res) {
    return res.json(characters);
});

app.get('/api/characters/:character', function(req, res) {
    // connect to db and make a sequelize call to db to get yoda
    let chosen = req.params.character;

    for (var i = 0; i < characters.length; i++) {
        if (chosen === characters[i].routeName) {
            return res.json(characters[i]);
        }
    }

    return res.send('no character found');
});

//create new characters
app.post('/api/characters', function(req, res) {
    let newcharacter = req.body;
    characters.push(newcharacter);
    console.log(newCharacter);
    res.json(newcharacter);
});

//listener
app.listen(PORT, function() {
    console.log("app listening on PORT " + PORT);
});