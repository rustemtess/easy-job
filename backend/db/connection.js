import mysql from 'mysql2/promise';

let connection;

try {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test',
        port: 3307
    });

    console.log('Подключение успешно!');
} catch (error) {
    console.error('Ошибка подключения:', error);
}


export default connection;