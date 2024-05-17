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
exports.getAverageAge = exports.sortStudentsByGrade = exports.getStudentNames = exports.filterPassedStudents = exports.ArrayFunctions = exports.Insertorders = exports.result = void 0;
const config_1 = __importDefault(require("./config"));
// logic for line No divisible by 3.
let result = (data) => data.some((ob) => {
    if (Array.isArray(ob.lineNo)) {
        return ob.lineNo.some((lineNo) => lineNo % 3 === 0);
    }
    else {
        return ob.lineNo % 3 === 0;
    }
});
exports.result = result;
// Inserting data in database.
function Insertorders(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result = data.items.filter(function (i) {
                return __awaiter(this, void 0, void 0, function* () {
                    const query = 'INSERT INTO orders ("orderid") VALUES ($1)';
                    let result = yield config_1.default.query(query, [i.orderID]);
                });
            });
            if (result) {
                return result;
            }
        }
        catch (err) {
            return err;
        }
    });
}
exports.Insertorders = Insertorders;
function ArrayFunctions(data) {
    // ForEach
    data.forEach((element) => console.log(element));
    //lastIndexOf
    console.log("LastIndexOf:", data.lastIndexOf(20));
    // Join
    const joinStringArray = data.join(",");
    console.log("Join:", joinStringArray);
    // Push
    data.push(111);
    console.log("Push:", data);
    // Splice
    const secondarray = data.splice(1, 3);
    console.log("Splice:", secondarray);
    // Slice
    console.log("Slice:", data.slice(1, 3));
    // map
    const resultarray = data.map((element) => element * 2);
    console.log("Map:", resultarray);
    // Filter
    const filterelement = data.filter((element) => element > 2);
    console.log("Filter:", filterelement);
    // Unshift
    data.unshift(12);
    console.log("Unshift:", data);
    // Flat
    const newarr = data.flat();
    console.log("Flat:", newarr);
    // Find
    const findelement = data.find((element) => element > 40);
    console.log("Find:", findelement);
    // FindIndex
    const indexfind = data.findIndex((item) => item > 20);
    console.log("FindIndex:", indexfind);
    // toString
    const stringTo = data.toString();
    console.log("ToString:", stringTo);
    // Some
    const someres = data.some((x) => x > 3);
    console.log("Some:", someres);
    // Every
    const everyres = data.every((item) => item > 15);
    console.log("Every:", everyres);
    // Includes
    const includesResult = data.includes(44);
    console.log("Includes:", includesResult);
    // IndexOf
    const indexOfelement = data.indexOf(40);
    console.log("IndexOf:", indexOfelement);
    // Pop
    const popelement = data.pop();
    console.log("Pop:", popelement);
    // Shift
    const shiftelement = data.shift();
    console.log("Shift:", shiftelement);
    //Concat
    console.log("Array Concat : " + data.concat([1, 2, 3, 40]));
}
exports.ArrayFunctions = ArrayFunctions;
function filterPassedStudents(students) {
    const result = students.filter((items) => items.grade >= 50);
    console.log(result);
    return result;
}
exports.filterPassedStudents = filterPassedStudents;
function getStudentNames(students) {
    const result = students.map((items) => items.name);
    console.log(result);
    return result;
}
exports.getStudentNames = getStudentNames;
function sortStudentsByGrade(students) {
    const result = students.sort((a, b) => a.grade - b.grade);
    return result;
}
exports.sortStudentsByGrade = sortStudentsByGrade;
function getAverageAge(students) {
    let sumofage = students.reduce((sum, data) => sum + data.age, 0);
    const result = sumofage / students.length;
    return result;
}
exports.getAverageAge = getAverageAge;
//# sourceMappingURL=logics.js.map