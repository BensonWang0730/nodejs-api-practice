// import mysql from "mysql2";
// import dotenv from "dotenv";
// dotenv.config();
require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql
  .createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    pool: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: "notes",
  })
  .promise();

module.exports.getAllEmployee = async () => {
  const [rows] = await pool.query("SELECT * FROM employee");
  return rows;
};

module.exports.getEmployee = async (employeeId) => {
  const [rows] = await pool.query(
    `
  SELECT * FROM employee
  WHERE emp_id = ?
  `,
    [employeeId]
  );
  return rows;
};

module.exports.findNewEmployee = async (
  employeeId = "0000",
  name,
  sex,
  birthdate,
  salary = 30000,
  branchId = 1,
  supervisorId = 207
) => {
  const result = await pool.query(
    `
  INSERT INTO employee VALUES(?,?,?,?,?,?,?)
  `,
    [employeeId, name, sex, birthdate, salary, branchId, supervisorId]
  );

  return result;
};

// 因為改成 commonjs 所以就不能在使用了
// const allEmployee = await getAllEmployee();
// const singleEmployee = await getEmployee(211);
// const newEmployee = await findNewEmployee(
//   "211",
//   "大B",
//   "2000-03-12",
//   "M",
//   "87000",
//   "3",
//   null
// );
// console.log(allEmployee);

// pool.getConnection(function (err, connection) {
//   if (err) {
//     // 取得可用連線出錯
//     console.log("err", err);
//   } else {
//     // 成功取得可用連線
//     console.log("succ");
//     // 使用取得的連線
//     connection.query("SELECT * FROM employee", function (err, rows) {
//       // 使用連線查詢完資料

//       // 釋放連線
//       connection.release();
//       // 不要再使用釋放過後的連線了，這個連線會被放到連線池中，供下一個使用者使用
//     });
//   }
// });
