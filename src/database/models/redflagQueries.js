import db from "../connections/conn";

const RedFlagModel = {
  async createRedflag(redflag) {
    const queryText = `INSERT INTO incidents(createdBy,type,location,images,videos,comment)
    VALUES($1,$2,$3,ARRAY[$4],ARRAY[$5],$6) RETURNING *`;
    const values = [
      redflag.createdBy,
      redflag.type,
      redflag.location,
      redflag.images,
      redflag.videos,
      redflag.comment
    ];
    const { rows } = await db
      .query(queryText, values)
      .then(res => res)
      .catch(err => console.error(err));

    return rows[0];
  },

  getAllRedflag() {
    return redFlags;
  },
  getSpecificRedflag(id) {
    const redflags = [...redFlags];
    const red_flag = redflags.filter(redflag => redflag.id === id);
    return red_flag;
  },
  deleteSpecificRedflag(id) {
    const redFlag = redFlags.find(redflag => redflag.id === id);
    const index = redFlags.indexOf(redFlag);
    redFlags.splice(index, 1);
    return redFlag;
  }
};

export default RedFlagModel;
