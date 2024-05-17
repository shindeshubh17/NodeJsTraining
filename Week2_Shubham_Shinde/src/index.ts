import exp = require('constants');
import express = require('express');
import bodyParser = require('body-parser')
import { Application, Response, Request } from 'express';
import { result, Insertorders, ArrayFunctions, filterPassedStudents, getStudentNames, sortStudentsByGrade, getAverageAge } from './logics';
import pool from './config';

const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({extended : true}))

app.use(bodyParser.json());

// Filter the OrderBlocks whoes divisible by 3.
app.post("/", (req: Request, res: Response) => {
    let data: any = req.body;
    let Resultdata = data.items.filter((order: any) => result(order.OrderBlocks));
    res.json(Resultdata);
});

// Storing the ID in the Database
app.post("/storeid/", async (req: Request, res: Response) => {
    let data: any = req.body;
    const result = await Insertorders(data);
    console.log(result);
    res.json(result);
});

// Performing Array Functions
app.post("/array/", (req: Request, res: Response) => {
    let data = req.body;
    ArrayFunctions(data);
});

// Getting the data of passed Students
app.post("/passstudent/", (req: Request, res: Response) => {
    let students: any = req.body;
    // const students = [
    //     { name: "Alice", age: 20, grade: 75 },
    //     { name: "Bob", age: 22, grade: 85 },
    //     { name: "Charlie", age: 21, grade: 60 },
    //     { name: "David", age: 19, grade: 45 },
    //     { name: "Eve", age: 20, grade: 90 }
    //     ];
    let result: any[] = filterPassedStudents(students);
    res.send(result);
});

// Get the Students Names
app.post("/getnames/", (req: Request, res: Response) => {
    let students: any = req.body;
    // const students = [
    //     { name: "Alice", age: 20, grade: 75 },
    //     { name: "Bob", age: 22, grade: 85 },
    //     { name: "Charlie", age: 21, grade: 60 },
    //     { name: "David", age: 19, grade: 45 },
    //     { name: "Eve", age: 20, grade: 90 }
    //     ];

    let result: any[] = getStudentNames(students);
    res.send(result);
});

// Sorting Student by Ascending Order
app.post("/sortstud/", (req: Request, res: Response) => {
    let students: any = req.body;
    let result: any[] = sortStudentsByGrade(students);
    console.log(result);
    res.send(result);
});

// Finding average 
app.post("/findavg/", (req: Request, res: Response) => {
    let students: any = req.body;
    let result: any = getAverageAge(students);
    console.log(result);
    res.json(result);
});

// Check table is exist or not if not then it create and insert data.
app.post("/checktable/", async (req: Request, res: Response) => {
    let data: any = req.body;
    try {
        
        // Checking the table is exists or not.
        const query = 'select exists(select from pg_tables where tablename= $1);'
        const result = await pool.query(query, ['orders']); 
        const tableexist = result.rows[0].exists; // return the true and false
        if (tableexist) 
        {
            console.log("Table is exist");
            const alldata = await Insertorders(data);
            console.log(alldata);
            res.json(alldata);
        }
        else {
            const query2  = 'CREATE TABLE orders(id serial primary key, OrderID int);'
            console.log("Table is Created");
            const creatTable = await pool.query(query2);   
            const result = await Insertorders(data);
            res.json(result);
        }
    }
    catch (err) {
        console.error('Error occurred:', err);
        res.send('An error occurred while checking the table.');
    }
});

app.listen(3000, () => {
    console.log("Server is Running");
});