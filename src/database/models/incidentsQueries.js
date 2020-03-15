import db from "../connections/conn";

const RedFlagModel = {
  async createAnIncident(incident) {
    const queryText = `INSERT INTO incidents(createdBy,type,location,images,videos,comment)
    VALUES($1,$2,$3,ARRAY[$4],ARRAY[$5],$6) RETURNING *`;
    const values = [
      incident.createdBy,
      incident.type,
      incident.location,
      incident.images,
      incident.videos,
      incident.comment
    ];
    const { rows } = await db
      .query(queryText, values)
      .then(res => res)
      .catch(err => console.error(err));
    return rows[0];
  },

  async getAllIncidents(incident) {
    const queryText = `SELECT * FROM incidents WHERE type = $1 ;`;
    const { rows } = await db
      .query(queryText, [incident])
      .then(res => res)
      .catch(err => console.error(err));
    return rows;
  },
  // because they are going into a single table no way they will have a
  // the same id
  async getSpecificIncident(id) {
    const queryText = `SELECT * FROM incidents where id = $1`;

    const { rows } = await db
      .query(queryText, [id])
      .then(res => res)
      .catch(err => console.error(err));

    return rows;
  },
  async deleteSpecificIncident(id) {
    const queryText = `DELETE FROM incidents WHERE id = $1`;
    const { rowCount } = await db
      .query(queryText, [id])
      .then(res => res)
      .catch(err => console.error(err));

    return rowCount;
  },
  async updateIncidentsComment(comment, id) {
    const queryText = `UPDATE incidents SET comment = $1 where id = $2;`;
    const { rows } = await db
      .query(queryText, [comment, id])
      .then(res => res)
      .catch(err => console.error(err));

    return rows;
  },
  async updateIncidentsStatus(status, id) {
    const queryText = `UPDATE incidents SET status = $1 where id = $2;`;
    const { rows } = await db
      .query(queryText, [status, id])
      .then(res => res)
      .catch(err => console.error(err));

    return rows;
  },
  async updateIncidentsLocatin(location, id) {
    const queryText = `UPDATE incidents SET location = $1 where id = $2;`;
    const { rows } = await db
      .query(queryText, [location, id])
      .then(res => res)
      .catch(err => console.error(err));

    return rows;
  }
};

export default RedFlagModel;
