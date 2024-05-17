import { promises } from "dns";
import pool from './config';
import { json } from "stream/consumers";

// logic for line No divisible by 3.
export let result = (data: any) => data.some((ob: any) => {
    if (Array.isArray(ob.lineNo)) {
        return ob.lineNo.some((lineNo: any) => lineNo % 3 === 0);
    }
    else {
        return ob.lineNo % 3 === 0;
    }
});

// Inserting data in database.
export async function Insertorders(data: any): Promise<any> {
    try {
        let result: any = data.items.filter(async function (i: any) {
            const query = 'INSERT INTO orders ("orderid") VALUES ($1)';
            let result = await pool.query(query, [i.orderID]);
        })
        if (result) {
            return result;
        }
    }
    catch (err: any) {
        return err;
    }
}

 // Array Functions
export function ArrayFunctions(data: any) {

    // ForEach
    data.forEach((element: any) => console.log(element));

    //lastIndexOf
    console.log("LastIndexOf:", data.lastIndexOf(20));

    // Join
    const joinStringArray: string = data.join(",");
    console.log("Join:", joinStringArray);

    // Push
    data.push(111);
    console.log("Push:", data);

    // Splice
    const secondarray: number[] = data.splice(1, 3);
    console.log("Splice:", secondarray);

    // Slice
    console.log("Slice:", data.slice(1, 3));

    // map
    const resultarray: number[] = data.map((element: any) => element * 2);
    console.log("Map:", resultarray);

    // Filter
    const filterelement: number[] = data.filter((element: any) => element > 2);
    console.log("Filter:", filterelement);

    // Unshift
    data.unshift(12);
    console.log("Unshift:", data);

    // Flat
    const newarr: number[] = data.flat();
    console.log("Flat:", newarr);

    // Find
    const findelement: any = data.find((element: any) => element > 40);
    console.log("Find:", findelement);

    // FindIndex
    const indexfind: number = data.findIndex((item: number) => item > 20);
    console.log("FindIndex:", indexfind);

    // toString
    const stringTo: string = data.toString();
    console.log("ToString:", stringTo);

    // Some
    const someres: boolean = data.some((x: number) => x > 3);
    console.log("Some:", someres);

    // Every
    const everyres: boolean = data.every((item: number) => item > 15);
    console.log("Every:", everyres);

    // Includes
    const includesResult: boolean = data.includes(44);
    console.log("Includes:", includesResult);

    // IndexOf
    const indexOfelement: number = data.indexOf(40);
    console.log("IndexOf:", indexOfelement);

    // Pop
    const popelement: number | undefined = data.pop();
    console.log("Pop:", popelement);

    // Shift
    const shiftelement: number | undefined = data.shift();
    console.log("Shift:", shiftelement);

    //Concat
    console.log("Array Concat : " + data.concat([1, 2, 3, 40])
    );
}

// Filtering passed Student Data
export function filterPassedStudents(students: any) {
    const result: any[] = students.filter((items: any) => items.grade >= 50);
    console.log(result);
    return result;
}

// Geting the users name
export function getStudentNames(students: any) {
    const result: any[] = students.map((items: any) => items.name);
    console.log(result);
    return result;
}

// Sorting the Student data by the Grade in Ascending Order
export function sortStudentsByGrade(students : any)
{
    const result : any[] = students.sort((a :any ,b : any ) => a.grade - b.grade);
    return result;
}

// Calculation of Average 
export function  getAverageAge(students : any)
{
    let sumofage = students.reduce((sum :any , data : any)=> sum + data.age,0);
    const result : any = sumofage/students.length;
    return result;
}
