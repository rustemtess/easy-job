import connection from './connection.js';

export async function getUserByTelegramId(tg_id){
    const [rows, fields] = await connection.query(`SELECT * FROM users WHERE tg_id = '${tg_id}'`);
    return rows;
}

export async function userTelegramIdIsExists(tg_id) {
    const user = await getUserByTelegramId(tg_id); 
    return user.length > 0;
}

export async function createUserFromTelegram(tg_id, tg_firstname) {
    const [result] = await connection.query("INSERT INTO users (`tg_id`, `tg_firstname`) VALUES ('" + tg_id + "', '" + tg_firstname + "')");
    return result;
}