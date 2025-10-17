import express from 'express';
const solarSystem = (await import('npm-solarsystem')).default;


const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//root route
app.get('/', async  (req, res) => {
  let url= "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system";
   let response = await fetch(url);
   let data = await response.json();
   //console.log(data);
    let randIndex = Math.floor(Math.random() * data.hits.length);
       let randImg = data.hits[randIndex].webformatURL;

   res.render('home.ejs',{randImg})
});


app.get('/planet', (req, res) => {
   let planet_name = req.query.planetName;
   let planetInfo = solarSystem[`get${planet_name}`]();
   

   // let planetInfo = solarSystem.getMercury();
   console.log(planetInfo);
   res.render('planetInfo.ejs', { planetInfo,planet_name} );
});


app.get('/nasaPod', (req, res) => {
   res.render('comSoon.ejs');
});

// more effiricient 
// //mercury route
// app.get('/mercury', (req, res) => {
//    let planetInfo = solarSystem.getMercury();
//       console.log(planetInfo);
// res.render('mercury.ejs', { planetInfo} );
// });
// app.get('/venus', (req, res) => {
//    let planetInfo = solarSystem.getVenus();
//       console.log(planetInfo);
// res.render('venus.ejs', { planetInfo} );
// });


app.listen(3000, () => {
   console.log('server started');
});