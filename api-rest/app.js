// app.js

const express = require('express');

const mysql = require('mysql2');

const bodyParser = require('body-parser');


// Crear una instancia de Express

const app = express();




app.use(bodyParser.json());


// Configuración de la conexión con la base de datos MySQL

const db = mysql.createConnection({

  host: 'localhost',

  user: 'admin',

  password: '12345', 

  database: 'ordinario_modelo_admin'

});


// Conectar a la base de datos

db.connect((err) => {

  if (err) {

    console.log('Error al conectar a la base de datos: ', err);

    return;

  }

  console.log('Conectado a la base de datos');

});


// Endpoint GET para obtener estudiantes

app.get('/api/estudiantes', (req, res) => {

  const query = 'SELECT * FROM estudiantes';

  db.query(query, (err, results) => {

    if (err) {

      return res.status(500).send('Error al consultar la base de datos');

    }

    res.json(results);

  });

});


// Endpoint POST para agregar un estudiante

app.post('/api/estudiantes', (req, res) => {

  const { nombre, apellidos, email, matricula, edad, semestre } = req.body;


  // Validar que todos los campos estén presentes

  if (!nombre || !apellidos || !email || !matricula || !edad || !semestre) {

    return res.status(400).send('Todos los campos son necesarios');

  }


  const query = `

    INSERT INTO estudiantes (nombre, apellidos, email, matricula, edad, semestre, usuario_creacio, fecha_creacion)

    VALUES (?, ?, ?, ?, ?, ?, 'admin', NOW())

  `;

  db.query(query, [nombre, apellidos, email, matricula, edad, semestre], (err, result) => {

    if (err) {

      return res.status(500).send('Error al insertar el estudiante');

    }

    res.status(201).send('Estudiante agregado correctamente');

  });

});


// Endpoint GET para obtener maestros

app.get('/api/maestros', (req, res) => {

  const query = 'SELECT * FROM maestros';

  db.query(query, (err, results) => {

    if (err) {

      return res.status(500).send('Error al consultar la base de datos');

    }

    res.json(results);

  });

});


// Endpoint POST para agregar un maestro

app.post('/api/maestros', (req, res) => {

  const { nombre, edad, telefono, correo } = req.body;


  if (!nombre || !edad || !telefono || !correo) {

    return res.status(400).send('Todos los campos son necesarios');

  }


  const query = `

    INSERT INTO maestros (nombre, edad, telefono, correo, usuario_creacio, fecha_creacion)

    VALUES (?, ?, ?, ?, 'admin', NOW())

  `;

  db.query(query, [nombre, edad, telefono, correo], (err, result) => {

    if (err) {

      return res.status(500).send('Error al insertar el maestro');

    }

    res.status(201).send('Maestro agregado correctamente');

  });

});


// Endpoint GET para obtener materias

app.get('/api/asignaturas', (req, res) => {

  const query = 'SELECT * FROM materias';

  db.query(query, (err, results) => {

    if (err) {

      return res.status(500).send('Error al consultar la base de datos');

    }

    res.json(results);

  });

});


// Endpoint POST para agregar una materia

app.post('/api/asignaturas', (req, res) => {

  const { nombre, profesor_id } = req.body;


  if (!nombre || !profesor_id) {

    return res.status(400).send('Todos los campos son necesarios');

  }


  const query = `

    INSERT INTO materias (nombre, profesor_id, create_user, create_date)

    VALUES (?, ?, 'admin', NOW())

  `;

  db.query(query, [nombre, profesor_id], (err, result) => {

    if (err) {

      return res.status(500).send('Error al insertar la materia');

    }

    res.status(201).send('Materia agregada correctamente');

  });

});


// Endpoint GET para obtener calificaciones

app.get('/api/calificaciones', (req, res) => {

  const query = 'SELECT * FROM calificaciones';

  db.query(query, (err, results) => {

    if (err) {

      return res.status(500).send('Error al consultar la base de datos');

    }

    res.json(results);

  });

});


// Endpoint POST para agregar una calificación

app.post('/api/calificaciones', (req, res) => {

  const { estudiante_matricula, maestro_correo, materia_nombre } = req.body;


  if (!estudiante_matricula || !maestro_correo || !materia_nombre) {

    return res.status(400).send('Todos los campos son necesarios');

  }



  db.query('SELECT id FROM estudiantes WHERE matricula = ?', [estudiante_matricula], (err, studentResults) => {

    if (err || studentResults.length === 0) {

      return res.status(400).send('Estudiante no encontrado');

    }


    db.query('SELECT id FROM maestros WHERE correo = ?', [maestro_correo], (err, teacherResults) => {

      if (err || teacherResults.length === 0) {

        return res.status(400).send('Maestro no encontrado');

      }


      db.query('SELECT id FROM materias WHERE nombre = ?', [materia_nombre], (err, subjectResults) => {

        if (err || subjectResults.length === 0) {

          return res.status(400).send('Materia no encontrada');

        }


        // Insertar la calificación

        const query = `

          INSERT INTO calificaciones (estudiante_id, maestro_id, materia_id, create_user, create_date)

          VALUES (?, ?, ?, 'admin', NOW())

        `;

        db.query(query, [studentResults[0].id, teacherResults[0].id, subjectResults[0].id], (err, result) => {

          if (err) {

            return res.status(500).send('Error al insertar la calificación');

          }

          res.status(201).send('Calificación agregada correctamente');

        });

      });

    });

  });

});


// Iniciar el servidor

app.listen(3000, () => {

  console.log('API corriendo en http://localhost:3000');

});

