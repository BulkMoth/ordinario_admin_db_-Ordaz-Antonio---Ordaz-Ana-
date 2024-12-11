// Importar dependencias
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Configuración del servidor
const app = express();
const PORT = 3000;
app.use(bodyParser.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'ls-23cee2016d7bb0f339255755c5024e9691c25c65.cvyu60ee84fv.us-east-2.rds.amazonaws.com',
  user: 'dbmasteruser',
  password: 'Xo6>;e<Z,5$Mh1O=,]!oybQ4:<v!Dx2#',
  database: 'ordinario_modelo_admin',
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Rutas para la tabla "estudiantes"
app.get('/estudiantes', (req, res) => {
  db.query('SELECT * FROM estudiantes', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/estudiantes', (req, res) => {
  const estudiante = req.body;
  db.query('INSERT INTO estudiantes SET ?', estudiante, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...estudiante });
  });
});

// Rutas para la tabla "maestros"
app.get('/maestros', (req, res) => {
  db.query('SELECT * FROM maestros', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/maestros', (req, res) => {
  const maestro = req.body;
  db.query('INSERT INTO maestros SET ?', maestro, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...maestro });
  });
});

// Rutas para la tabla "materias"
app.get('/materias', (req, res) => {
  db.query('SELECT * FROM materias', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/materias', (req, res) => {
  const materia = req.body;
  db.query('INSERT INTO materias SET ?', materia, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...materia });
  });
});

// Rutas para la tabla "calificaciones"
app.get('/calificaciones', (req, res) => {
  db.query('SELECT * FROM calificaciones', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/calificaciones', (req, res) => {
  const calificacion = req.body;
  db.query('INSERT INTO calificaciones SET ?', calificacion, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...calificacion });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
