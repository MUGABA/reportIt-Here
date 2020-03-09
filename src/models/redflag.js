const redFLag1 = {
  id: 1,
  createdOn: Date.now(),
  createdBy: 1,
  type: "red-flag",
  location: "123.3, 123.08",
  status: "draft",
  Images: ["i.jpg", "j.jpg"],
  Videos: ["hello.mkv", "hey.mkv"],
  comment: "money bfor the dum was not seen"
};

const redFLag2 = {
  id: 2,
  createdOn: Date.now(),
  createdBy: 1,
  type: "red-flag",
  location: "123.3, 123.08",
  status: "draft",
  Images: ["i.jpg", "j.jpg"],
  Videos: ["hello.mkv", "hey.mkv"],
  comment: "money bfor the dum was not seen"
};

const redFLag3 = {
  id: 3,
  createdOn: Date.now(),
  createdBy: 1,
  type: "red-flag",
  location: "123.3, 123.08",
  status: "draft",
  Images: ["i.jpg", "j.jpg"],
  Videos: ["hello.mkv", "hey.mkv"],
  comment: "money bfor the dum was not seen"
};

let redFlags = [redFLag1, redFLag2, redFLag3];

const createRedflag = redflag => {
  redflag.id = redFlags.length + 1;
  redFlags.push(redflag);
  return redflag;
};

const getAllRedflag = () => {
  return redFlags;
};

const getSpecificRedflag = id => {
  const redflags = [...redFlags];
  const red_flag = redflags.filter(redflag => redflag.id === id);
  return red_flag;
};

const deleteSpecificRedflag = id => {
  const redFlag = redFlags.find(redflag => redflag.id === id);
  const index = redFlags.indexOf(redFlag);
  redFlags.splice(index, 1);
  return redFlag;
};
export default {
  createRedflag,
  getAllRedflag,
  getSpecificRedflag,
  deleteSpecificRedflag
};
