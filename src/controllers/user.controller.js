
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = async (req, res)=>{
    return await User.create({
        login: req.body.login,
        password: req.body.password,
      })
        .then((data) => {
          const result = {id: data.dataValues.id, login: data.dataValues.login};
          return res.send(result);
        })
        .catch((err) => {res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });}
    );
};

exports.findOne = async (req, res) =>{
    console.log('asdas');
  return await User.findOne({
    where:{
      [Op.and]: [{login: req.body.login}, {password: req.body.password}]
    }
  }).then(data=>{
    if(data !== null){
      res.send(data);
    } else{
      res.status(404).send({message: 'Error'});
    }
  }).catch(err=>{res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving data."
  });});
};

exports.update = async (req, res) => {
    return await User.update({
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone
    }, {
            where:{
            id:req.body.id
        }
    }).then(data => res.send(data.dataValues)).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
    });
}