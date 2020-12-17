
const db = require("../models");
const Courses = db.courses;
const Op = db.Sequelize.Op;

exports.add = async(req, res) =>{
    return await Courses.findOne({
        where: {
            id: req.body.id
        }
    }).then(course => {
            return db.user.findOne({
                where:{
                    id:req.body.userId
                }
            }).then(async user => {
                user.addCourses(course);
                await db.userlessons.create({
                    user_id: user.id,
                    course_id: course.id,
                    current_lesson: 1,
                    current_dz: 1,
                }).then(up=>{
                    user.addUserlessons(up)
                    course.addUsers(user);
                    res.send({message:"done"});
                }).catch(err=>console.log(err));
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving data."
        });
    }); 
};

exports.findAll = async(req, res) => {
    let result = {};
    await Courses.findAll({
        include: [{
            model:db.user,
            as: 'Users',
            attributes: ['id'],
            include:[{
                model: db.userlessons,
               // where: db.sequelize.where(db.sequelize.col('Users.userlessons.course_id'), '=', req.body.userId)
            }]
        },{
            model:db.lessons,
            as:'lessons'
        }],
        where: {
            '$Users.id$': req.body.userId === null ? 0 : req.body.userId
        }
    }
    ).then(data => {
        result.mycourses = data;
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
      });
    await Courses.findAll({
        }
        ).then(data => {
            for(let i = 0; i < data.length; i++){
                for(let j = 0; j < result.mycourses.length; j++){
                    if(data[i].id === result.mycourses[j].id){
                        data.splice(i, 1);
                    }
                }
            }
            result.avcourses = data;
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving data."
            });
    });
    res.send(result);
};