const db = require("../models");
const Userlessons = db.userlessons;
const Op = db.Sequelize.Op;



exports.create = async(req, res) => {
  return await Userlessons.create({
    user_id: req.body.userId,
    course_id: req.body.courseId,
    current_lesson: 1,
    isDone: 0
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving data."
    });
  });
};

exports.update = async(req, res) => {
  return await Userlessons.update({
    current_lesson: req.body.current_lesson,
    current_dz: req.body.current_dz,
    isDone: req.body.isDone,
  },{
    where: {
      id:req.body.id
    }
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving data."
    });
  });
}

exports.findOne = async(req, res) => {
    let result = {};
    await Userlessons.findOne({
        where:{
            user_id: req.body.userId
        }
    })
      .then(data => {
        result.mylesson = data;
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
      });
    await db.lessons.findAll({
      where:{
          course_id: req.body.courseId
      }
    }).then(data => {
      result.lessons = data;
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
    res.send(result);
};
// exports.update = async(req, res) => {
//   return await Userlessons.update({
//       current_lesson: req.body.id,
//       userId: req.body.userId,
//       isDone: req.body.isDone,
//   },{
//       where:{
//           id:req.body.id
//       }
//   }).then(data=>{
//       console.log(data);
//       res.send(data);
//   })
//   .catch(err =>{res.status(500).send({
//       message:
//         err.message || "Some error occurred while retrieving data."
//     });
//   });
// };