"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const logics_1 = require("./logics");
const config_1 = __importDefault(require("./config"));
const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());
app.post("/", (req, res) => {
    let data = req.body;
    let Resultdata = data.items.filter((order) => (0, logics_1.result)(order.OrderBlocks));
    res.json(Resultdata);
});
app.post("/storeid/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    const result = yield (0, logics_1.Insertorders)(data);
    console.log(result);
    res.json(result);
}));
app.post("/array/", (req, res) => {
    let data = req.body;
    (0, logics_1.ArrayFunctions)(data);
});
app.post("/passstudent/", (req, res) => {
    let students = req.body;
    // const students = [
    //     { name: "Alice", age: 20, grade: 75 },
    //     { name: "Bob", age: 22, grade: 85 },
    //     { name: "Charlie", age: 21, grade: 60 },
    //     { name: "David", age: 19, grade: 45 },
    //     { name: "Eve", age: 20, grade: 90 }
    //     ];
    let result = (0, logics_1.filterPassedStudents)(students);
    res.send(result);
});
app.post("/getnames/", (req, res) => {
    let students = req.body;
    // const students = [
    //     { name: "Alice", age: 20, grade: 75 },
    //     { name: "Bob", age: 22, grade: 85 },
    //     { name: "Charlie", age: 21, grade: 60 },
    //     { name: "David", age: 19, grade: 45 },
    //     { name: "Eve", age: 20, grade: 90 }
    //     ];
    let result = (0, logics_1.getStudentNames)(students);
    res.send(result);
});
app.post("/sortstud/", (req, res) => {
    let students = req.body;
    let result = (0, logics_1.sortStudentsByGrade)(students);
    console.log(result);
    res.send(result);
});
app.post("/findavg/", (req, res) => {
    let students = req.body;
    let result = (0, logics_1.getAverageAge)(students);
    console.log(result);
    res.json(result);
});
app.post("/checktable/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    try {
        const query = 'select exists(select from pg_tables where tablename= $1);';
        const result = yield config_1.default.query(query, ['orders']);
        const tableexist = result.rows[0].exists;
        if (tableexist) {
            console.log("Table is exist");
            const alldata = yield (0, logics_1.Insertorders)(data);
            console.log(alldata);
            res.json(alldata);
        }
        else {
            const query2 = 'CREATE TABLE orders(id serial primary key, OrderID int);';
            console.log("Table is Created");
            const creatTable = yield config_1.default.query(query2);
            const result = yield (0, logics_1.Insertorders)(data);
            res.json(result);
        }
    }
    catch (err) {
        console.error('Error occurred:', err);
        res.send('An error occurred while checking the table.');
    }
}));
app.listen(3000, () => {
    console.log("Server is Running");
});
//# sourceMappingURL=index.js.map