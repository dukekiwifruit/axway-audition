import connection from './connection';

export function getUserId(email) {
  connection.query('SELECT user_id FROM users WHERE email = ?;', [email], (dberr, dbres) => {
    if (dberr) {
      throw dberr;
    }

    return dbres[0].user_id;
  });
}

export default { getUserId };
