import express from 'express';
import { addSession, getTasks, getTask } from './data';
import bcrypt from 'bcrypt';
import connection from './connection';

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query(`SELECT password FROM users WHERE email = '${email}';`, (dberr, dbres) => {
    if (dberr) {
      res.statusMessage = 'Unknown error while validating login.';
      res.status(500).end();
    } else if (dbres.length !== 1) {
      res.statusMessage = 'Unknown email and password combination.';
      res.status(401).end();
    } else {
      const storedPassword = dbres[0].password;
      bcrypt.compare(password, storedPassword, (err, isMatch) => {
        if (err) {
          res.status(500).end();
        } else if (!isMatch) {
          res.status(401).end();
        } else {
          const name = email.split('@')[0].replace(/\.|_/, ' '); // simulated
          const now = new Date();
          const token = `token-${now.getTime()}`; // simulated
          const session = { email, name, token };
          addSession(token, session);
          res.json(session);
        }
      });
    }
  });
});

router.get('/task', (req, res) => {
  getTasks(req.query).then(tasks => res.json(tasks));
});

router.get('/task/:id', (req, res) => {
  getTask(req.params.id).then((result) => {
    if (!result.task) {
      res.status(404).end();
    } else {
      res.json(result);
    }
  });
});

router.delete('/login/*', (req, res) => {
  res.json(undefined);
});

module.exports = router;
