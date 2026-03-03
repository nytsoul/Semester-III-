import * as readlineSync from "readline-sync";

type ClassType = "AC" | "Sleeper" | "General";
type PaymentMode = "UPI" | "Card" | "Cash";

interface Train {
    trainId: number;
    trainName: string;
    source: string;
    destination: string;
    classType: ClassType;
    fare: number;
}


interface Passenger {
    passengerId: number;
    passengerName: string;
    age: number;
}

interface BookingMeta {
    bookingId: number;
    paymentMode: PaymentMode;
}

type TrainWithMeta = Train & BookingMeta;

class Person {
    constructor(
        public passengerId: number,
        public passengerName: string,
        public age: number
    ) {}
}

class PassengerBooking extends Person {
    constructor(
        passengerId: number,
        passengerName: string,
        age: number,
        public bookingId: number,
        public paymentMode: PaymentMode,
        public bookedTrain: Train
    ) {
        super(passengerId, passengerName, age);
    }
}


const trains: Train[] = [
    {
        trainId: 101,
        trainName: "Chennai Express",
        source: "Chennai",
        destination: "Delhi",
        classType: "AC",
        fare: 2500
    },
    {
        trainId: 102,
        trainName: "Coimbatore Mail",
        source: "Coimbatore",
        destination: "Chennai",
        classType: "Sleeper",
        fare: 1200
    },
    {
        trainId: 103,
        trainName: "Bangalore Express",
        source: "Bangalore",
        destination: "Mumbai",
        classType: "AC",
        fare: 2200
    }
];


function searchTrain(trainName: string): Train | undefined {
    return trains.find(
        t => t.trainName.toLowerCase() === trainName.toLowerCase()
    );
}

let bookings: PassengerBooking[] = [];
let bookingCounter: number = 1;


console.log("\nAvailable Trains:");
trains.forEach(t => console.log(t.trainName));

const id: number = Number(readlineSync.question("\nEnter Passenger ID: "));
const name: string = readlineSync.question("Enter Passenger Name: ");
const age: number = Number(readlineSync.question("Enter Age: "));
const trainInput: string = readlineSync.question("Enter Train Name to Book: ");
const payment: PaymentMode = readlineSync.question("Enter Payment Mode (UPI/Card/Cash): ") as PaymentMode;

const selectedTrain: Train | undefined = searchTrain(trainInput);

if (selectedTrain) {

    const booking = new PassengerBooking(
        id,
        name,
        age,
        bookingCounter++,
        payment,
        selectedTrain
    );

    bookings.push(booking);

    console.log("\n Ticket Booked Successfully!");
    console.log(booking);

} else {
    console.log("\n Train not found!");
}


console.log("\nADMIN : All Booked Tickets");

if (bookings.length === 0) {
    console.log("No bookings yet.");
} else {
    bookings.forEach((b, index) => {
        console.log(`\n${index + 1}. ${b.passengerName} (${b.passengerId})`);
        console.log(` Train: ${b.bookedTrain.trainName}`);
        console.log(` Route: ${b.bookedTrain.source} → ${b.bookedTrain.destination}`);
        console.log(` Class: ${b.bookedTrain.classType}`);
        console.log(` Fare: ₹${b.bookedTrain.fare}`);
        console.log(` Payment: ${b.paymentMode}`);
    });
}