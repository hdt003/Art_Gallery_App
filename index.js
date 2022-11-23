var express = require("express");
var path = require("path");
var routes = require("./routes");
const client = require("./server/database");
const bodyParser = require("body-parser");

var app = express();

app.set("port", process.env.PORT || 3000);

//paths
app.set("views", path.join(__dirname, "views"));
app.use('/CSS', express.static(path.resolve(__dirname, "views/CSS")))
app.use('/IMG', express.static(path.resolve(__dirname, "views/IMG")))
app.use('/images', express.static(path.resolve(__dirname, "views/images")))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(routes);

app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
})

client.connect();
app.get('/query1', (req, res) => {

    client.query('SELECT * FROM public.people', (err, result) => {
        console.log("query1");

        if (!err) {
            console.log(result.rows);
            res.send(result.rows);
        } else {
            console.log("query1 Err");
            console.log(err.message);
        }
    });
    console.log("query1 End");

    // res.render("exhibition.ejs");
})


var id = 0;
app.post('/insertUser', (req, res) => {
    const user = req.body;

    id++;
    let insertQuery = `insert into "User" 
        values( '${1}', '${user.name}', '${user.address}', '${user.email}' ,
                        '${user.DOB}','${user.gender}','${user.password}',${0} )`

    client.query(insertQuery, (err, result) => {

            if (!err) {
                res.send('Insertion was successful')
            } else { console.log(err.message) }
        })
        // res.render("index.ejs");
})

app.post('/insertEx', (req, res) => {
    const EX = req.body;
    console.log(req.body);
    console.log(EX.place);
    console.log(EX.ED);

    let insertQuery = `insert into "Exhibition"
        values( '${102}','${EX.SD}','${EX.ED}','${EX.place}' )`

    client.query(insertQuery, (err, result) => {

            if (!err) {
                res.send('Insertion was successful')
            } else {
                console.log(err.message)
            }
        })
        // res.render("index.ejs");
})

app.get('/EXplace', (req, res) => {

    client.query('SELECT "Exhibition".place from "Exhibition"', (err, result) => {
        if (!err) {
            console.log(result.rows);
            // res.send(result.rows);s
            res.render('placesShow.ejs', { places: result.rows });
        }
    });
})

app.post('/searchArt', (req, res) => {
    const EX = req.body;
    console.log(req.body);


    client.query(`SELECT * from artwork where "title"='${EX.title}'`, (err, result) => {
        if (!err) {
            console.log(result.rows);
            res.render('showArtDetails.ejs', { detail: result.rows });
        }
    });
})

app.post('/ArtFilter', (req, res) => {

    const Filter = req.body;
    let insertQuery = `SELECT title,price from artwork WHERE price >= '${Filter.SP}' AND price <= '${Filter.EP}' `
    client.query(insertQuery, (err, result) => {

        if (!err) {
            res.render('FilteredArt.ejs', { Art: result.rows });
            // res.send(result.rows);
        } else { console.log(err.message) }
    });
})

app.post('/ArtExPlace', (req, res) => {

    const Loc = req.body;
    let insertQuery = `SELECT t1.title
    FROM art_gallery."Artwork" t1
    Join  art_gallery."Exhibition" t2 on t1."ExhibitionID" = t2."ExhibitionID"
    WHERE t2."place" = '${Loc.place}' `


    client.query(insertQuery, (err, result) => {

        if (!err) {
            res.render('FilteredArt1.ejs', { Art: result.rows });
        } else { console.log(err.message) }
    });
})
client.end;

// // // link: https://www.kindsonthegenius.com/build-a-rest-api-with-node-js-and-postgresql-get-post-putdelete-step-by-step/