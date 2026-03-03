"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
/* =========================
   COURSE DATA
========================= */
const courses = [
    { courseId: 1, courseName: "TypeScript", duration: "30 Days", fee: 3000, level: "Beginner", mode: "Online" },
    { courseId: 2, courseName: "React", duration: "45 Days", fee: 5000, level: "Intermediate", mode: "Online" },
    { courseId: 3, courseName: "NodeJS", duration: "40 Days", fee: 4500, level: "Intermediate", mode: "Offline" },
    { courseId: 4, courseName: "MongoDB", duration: "20 Days", fee: 2500, level: "Beginner", mode: "Online" },
    { courseId: 5, courseName: "Tailwind", duration: "15 Days", fee: 2000, level: "Beginner", mode: "Online" }
];
/* =========================
   SEARCH FUNCTION
========================= */
function searchCourse(courseName) {
    return courses.find(c => c.courseName.toLowerCase() === courseName.toLowerCase());
}
/* =========================
   STORAGE
========================= */
let studentProfiles = [];
/* =========================
   DISPLAY COURSES
========================= */
console.log("\nAvailable Courses:");
courses.forEach(c => console.log(c.courseName));
/* =========================
   USER INPUT
========================= */
const id = Number(readlineSync.question("\nEnter Student ID: "));
const name = readlineSync.question("Enter Student Name: ");
const dept = readlineSync.question("Enter Department: ");
const courseInput = readlineSync.question("Enter Course Name to Register: ");
/* =========================
   REGISTRATION PROCESS
========================= */
const selectedCourse = searchCourse(courseInput);
if (selectedCourse) {
    const studentProfile = {
        studentId: id,
        studentName: name,
        department: dept,
        registeredCourse: selectedCourse
    };
    studentProfiles.push(studentProfile);
    console.log("\nCourse Registered Successfully!");
    console.log("\nStudent Profile:");
    console.log("Student ID:", studentProfile.studentId);
    console.log("Student Name:", studentProfile.studentName);
    console.log("Department:", studentProfile.department);
    console.log("Registered Course:", studentProfile.registeredCourse.courseName);
    console.log("Mode:", studentProfile.registeredCourse.mode);
    console.log("Level:", studentProfile.registeredCourse.level);
}
else {
    console.log("\nCourse not found!");
}
/* =========================
   ADMIN VIEW
========================= */
console.log("\nADMIN : All Registered Student Profiles");
if (studentProfiles.length === 0) {
    console.log("No students registered yet.");
}
else {
    studentProfiles.forEach((s, index) => {
        console.log(`\n${index + 1}. ${s.studentName} (${s.studentId})`);
        console.log("Dept:", s.department);
        console.log("Course:", s.registeredCourse.courseName);
        console.log("Mode:", s.registeredCourse.mode);
        console.log("Level:", s.registeredCourse.level);
    });
}
