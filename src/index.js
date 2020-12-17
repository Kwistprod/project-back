const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  }));
app.use(express.static(__dirname + "/views"));

const db = require("./models/index");

db.sequelize.sync({force: true}).then(()=>{
    db.user.create({
        login: "user",
        password: "user"
    });
    db.user.create({
        login: "user1",
        password: "user1"
    });
    db.courses.create({
        title: "JavaScript с нуля",
        description: "Данный курс научит вас основам программирования на языке JavaScript. Будут рассмотрены сферы применения языка, перспективы и начальные алгоритмы",
        classes: 4,
        scope:'Программирование'
    }).then(course => {
        return db.lessons.create({
            course_id: 2,
            lesson_id: 1,
            total: 4,
            url: 'HuPK6AwgzJc'
        }).then(less1 => {
            return db.lessons.create({
                lesson_id: 2,
                total: 4,
                url: 'cd0xW9W8hqs'
            }).then(less2 => {
                return db.lessons.create({
                    lesson_id: 3,
                    total: 4,
                    url: 'UGapN-hrekw'
                }).then(less3 =>{
                    return  db.lessons.create({
                        lesson_id: 4,
                        total: 4,
                        url: 'wdViO9OcQzs'
                    }).then(less4=>{
                        course.addLessons(less1);
                        course.addLessons(less2);
                        course.addLessons(less3);
                        course.addLessons(less4);
                    })
                })
            })
        })
    });

    db.courses.create({
        title: "Java с нуля",
        description: "Данный курс научит вас основам программирования на языке Java. Будут рассмотрены сферы применения языка, перспективы и начальные алгоритмы",
        classes: 5,
        scope:'Программирование'
    }).then(course => {
        return db.lessons.create({
            course_id: 2,
            lesson_id: 1,
            total: 5,
            url: 'uR3S0LzHLdE'
        }).then(less1 => {
            return db.lessons.create({
                course_id: 2,
                lesson_id: 2,
                total: 5,
                url: '6I4kdJJM8wk'
            }).then(less2 => {
                return db.lessons.create({
                    course_id: 2,
                    lesson_id: 3,
                    total: 5,
                    url: 'X81MWzN3j8Q'
                }).then(less3 =>{
                    return  db.lessons.create({
                        course_id: 2,
                        lesson_id: 4,
                        total: 5,
                        url: 'FqcJt4_tKEw'
                    }).then(less4 =>{
                        return  db.lessons.create({
                            course_id: 2,
                            lesson_id: 5,
                            total: 5,
                            url: 'uCgF5-yCbGA'
                        }).then(less5=>{
                            course.addLessons(less1);
                            course.addLessons(less2);
                            course.addLessons(less3);
                            course.addLessons(less4);
                            course.addLessons(less5);

                        })
                    })
                })
            })
        })
    })


});

app.get('/', function (req,res) {
    res.sendFile(path + "index.html");
  });
require("./routes/user.route")(app);
require("./routes/courses.route")(app);
require("./routes/userlessons.route")(app);

app.listen(process.env.PORT || config.port,
    () => console.log(`Server start on port ${config.port} ...`));