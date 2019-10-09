const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');

// app.use((req, res, next) => {
//     res.render('tamir.hbs');
// });
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    next();
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log');
        }
    });
});
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerHelper('date', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('uppercase', (text) => {
    return text.toUpperCase();
})
app.get('/', (req, res) => {
    //res.send('welcome to my web');
    res.render('home', {
        pagetitle: 'صفحه اصلی',
        title: 'peransa'
    })
});

app.get('/peransa', (req, res) => {
    res.send('hello peransa');
});
app.listen(3000, () => {
    console.log('server is running on port 3000');
});