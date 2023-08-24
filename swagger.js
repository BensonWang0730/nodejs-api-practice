import swaggerAutogen from "swagger-autogen";

const doc = [
  {
    tags: [{ name: "allemployee", description: "員工" }],
  },
];
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
