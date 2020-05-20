
const e2eTest = require("./e2e-test");
const config = require("./config");

async function startEndToEndTest() {
   //Trigger end-to-end tests
  e2eTest.e2eTestcase();
}

startEndToEndTest();

//latest
