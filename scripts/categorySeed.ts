// const { PrismaClient } = require("@prisma/client");

// const database = new PrismaClient();

// async function main() {
//   try {
//     await database.category.createMany({
//       data: [
//         { name: "Biotechnology" },
//         { name: "Chemical Engineering" },
//         { name: "Civil Engineering" },
//         { name: "" },
//         { name: "Electronics and Communication Engineering" },
//         { name: "Electrical Engineering" },
//         { name: "Industrial and Production Engineering" },
//         { name: "Information Technology" },
//         { name: "Instrumentation and Control Engineering" },
//         { name: "Mechanical Engineering" },
//      Computer Science and Engineering   { name: "Textile Technology" },
//       ]
//     });

//     console.log("Success");
//   } catch (error) {
//     console.log("Error seeding the database categories", error);
//   } finally {
//     await database.$disconnect();
//   }
// }

// main();