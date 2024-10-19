import express from 'express';
const app = express();
const port = 3000;
import multer from 'multer';
import cors from 'cors';
import { createUserFromTelegram, getUserByTelegramId, userTelegramIdIsExists } from './db/handler.js';
import connection from './db/connection.js';

const upload = multer();

app.use(cors())

app.post('/user/get', upload.none(), async (req, res) => {
    const { tg_id, tg_firstname } = req.body;
    if(await userTelegramIdIsExists(tg_id)) {
        const result = await getUserByTelegramId(tg_id);
        res.send(JSON.stringify(result[0]));
        return;
    }
    const result = await createUserFromTelegram(tg_id, tg_firstname);
    if(result) {
        const result = await getUserByTelegramId(tg_id);
        res.send(JSON.stringify(result[0]));
    }
})

app.post('/request/create', upload.none(), async (req, res) => {
    const { 
        user_id,
        firstname,
        lastname,
        age,
        gender,
        number,
        location_id,
        email,
        speciality,
        speciality_level_id,
        experience,
        languages,
        skill,
        work_time_id
     } = req.body
    const [result] = await connection.query(
        "INSERT INTO requests (`user_id`, `user_firstname`, `user_lastname`, `user_age`, `user_gender`, `user_number`, `location_id`, `user_email`, `user_speciality`, `speciality_level_id`, `experience`, `user_languages`, `user_skill`, `work_time_id`) VALUES (" + user_id + ", '" + firstname + "', '"+ lastname +"', "+age+", "+gender+", '"+number+"', "+location_id+", '"+email+"', '"+speciality+"', "+speciality_level_id+", '"+experience+"', '"+languages+"', '"+skill+"', "+work_time_id+")"
    );
    if(result) {
        res.send('OK')
    }else {
        res.send('not!')
    }
})

app.post('/vacancy/create', upload.none(), async (req, res) => {
    const { 
        user_id,
        companyName,
        location_id,
        email,
        speciality,
        speciality_level_id,
        experience_id,
        work_time_id,
        requirements,
        description,
        minSalary,
        maxSalary
     } = req.body;

    const [result] = await connection.query(
        "INSERT INTO vacancy (`company_name`, `user_id`, `company_email`, `location_id`, `speciality`, `minSalary`, `maxSalary`, `experience_id`, `work_time_id`, `speciality_level_id`, `requirements`, `description`) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [companyName, user_id, email, location_id, speciality, minSalary, maxSalary, experience_id, work_time_id, speciality_level_id, requirements, description]
    );

    if (result) {
        res.send('OK');
    } else {
        res.send('not!');
    }
});


app.get('/request/list', async (req, res) => {
    const [requests] = await connection.query(`SELECT request_id as id, locations.location_name, requests.user_age as age, requests.experience, work_time.work_time_name, user_speciality as speciality FROM requests, locations, work_time WHERE locations.location_id = requests.location_id AND work_time.work_time_id = requests.work_time_id`)
    return res.send(JSON.stringify(requests))
})

app.get('/vacancy/list', async (req, res) => {
    const [vacancy] = await connection.query(`SELECT vacancy_id as id, locations.location_name, vacancy.company_name as name, experiences.experience_name, work_time.work_time_name, speciality FROM vacancy, locations, work_time, experiences WHERE locations.location_id = vacancy.location_id AND work_time.work_time_id = vacancy.work_time_id AND experiences.experience_id = vacancy.experience_id`)
    return res.send(JSON.stringify(vacancy))
})

app.get('/request/get', async (req, res) => {
    const { id } = req.query;
    const [request] = await connection.query(`SELECT requests.*, locations.location_name, work_time.work_time_name, speciality_level.speciality_level_name FROM requests, locations, work_time, speciality_level WHERE request_id = '${id}' AND requests.location_id = locations.location_id AND requests.work_time_id = work_time.work_time_id AND requests.speciality_level_id = speciality_level.speciality_level_id`)
    return res.send(JSON.stringify(request[0]))
})

app.get('/vacancy/get', async (req, res) => {
    const { id } = req.query;
    const [vacancy] = await connection.query(`SELECT vacancy.*, locations.location_name, work_time.work_time_name, speciality_level.speciality_level_name, experiences.experience_name FROM vacancy, locations, work_time, speciality_level, experiences WHERE vacancy_id = '${id}' AND vacancy.location_id = locations.location_id AND vacancy.work_time_id = work_time.work_time_id AND vacancy.speciality_level_id = speciality_level.speciality_level_id AND vacancy.experience_id = experiences.experience_id`)
    return res.send(JSON.stringify(vacancy[0]))
})

app.get('/get/formdata', async (req, res) => {
    try {
        // Выполняем два отдельных запроса
        const [locations] = await connection.query('SELECT * FROM locations');
        const [experiences] = await connection.query('SELECT * FROM experiences');
        const [speciality_level] = await connection.query('SELECT * FROM speciality_level');
        const [work_time] = await connection.query('SELECT * FROM work_time');

        // Создаем объект с двумя массивами
        const data = {
            locations: locations,
            experiences: experiences,
            speciality_level: speciality_level,
            work_time: work_time
        };

        res.send(data);
    } catch (error) {
        console.error('Ошибка выполнения запросов:', error);
        res.status(500).send('Ошибка сервера');
    }
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})