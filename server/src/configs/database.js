const mysql = require('mysql2/promise');
const mysqldump = require('mysqldump');
const fs = require('fs').promises;
const path = require('path');
let database = {};

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'quanlycuahang',
    port: 3306,
    connectionLimit: 500,
});

database.connect = async () => {
    try {
        const connection = await pool.getConnection();
        connection.release();
        return true;
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        return false;
    }
};

database.query = async (sql, values) => {
    try {
        const connection = await pool.getConnection();
        const [results, fields] = await connection.execute(sql, values);
        connection.release();
        return results;
    } catch (error) {
        console.error('Error executing query:', error.message);
        throw error;
    }
};
const publicFolderPath = path.join(__dirname, 'backup');
const backupFileName = 'doanchuyennghanh_backup.bak';
const backupOptions = {
    dest: path.join(publicFolderPath, backupFileName),
};
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'quanlycuahang',
};
database.backupDB = async (req, res) => {
    try {
        await fs.mkdir(publicFolderPath, { recursive: true });
        const data = await mysqldump({
            connection: { ...dbConfig },
            dumpToFile: backupOptions.dest,
        });
        const stringData = typeof data === 'object' ? JSON.stringify(data) : data;
        await fs.writeFile(backupOptions.dest, stringData);
        res.status(200).json({ success: 'Backup DB thành công' });
    } catch (err) {
        console.error('Backup failed:', err);
        if (res) {
            res.status(500).json({ error: 'Đã xảy ra lỗi' });
        } else {
            console.error('Response object is undefined. Unable to send error response.');
        }
    }
};
module.exports = database;


