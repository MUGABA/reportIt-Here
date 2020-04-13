import db from "../connections/conn";

const AuthModel = {
  async createUserAccount(user) {
    const queryText = `INSERT INTO users(firstname,lastname,othernames,username,email,password,phonenumber,isadmin)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
    const values = [
      user.firstname,
      user.lastname,
      user.othernames,
      user.username,
      user.email,
      user.password,
      user.phonenumber,
      user.isadmin
    ];

    const { rows } = await db
      .query(queryText, values)
      .then(res => res)
      .catch(err => console.error(err));
    return rows[0];
  },
  async getSpecificUser(email) {
    const queryText = `SELECT * FROM users WHERE email = $1;`;

    const { rows } = await db
      .query(queryText, [email])
      .then(res => res)
      .catch(err => console.error(err));
    return rows[0];
  }
};

export default AuthModel;
