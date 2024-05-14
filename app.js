const createError = require("http-errors");
const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Configurar el motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser
app.use(bodyParser.json()); // support json encoded bodies
app.use(
    bodyParser.urlencoded({
        extended: true
    })
); // support encoded bodies

app.use(logger("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(cookieParser());

const rel = o => express.static(path.join(__dirname, "/node_modules/" + o));
app.use(express.static(path.join(__dirname, "public")));
app.use("/bootstrap", rel("bootstrap-icons"));

// Rutas
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    console.log(req.url + " not found.");
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    //res.render("error");
    next();
});

module.exports = app;
