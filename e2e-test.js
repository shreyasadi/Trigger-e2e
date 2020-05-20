const axios = require("axios");
const config = require("config");

let currentVectorId;

  const e2eTestcase = async () => {
    try {
      // Get Azure job details
      const azureJobDetails = await getAzureJobDetails();
  
      // Trigger Azure job to test
      const testRes = await triggerAzureJob(azureJobDetails);
  
      const buildUrl = testRes.data.url;
      console.info(`Waiting for end-to-end tests to finish ${buildUrl}`);
   
      // Poll for results
      pollForResults(buildUrl);
    } catch (e) {
      console.log("End-to-end test failed due to following reason: ", e);
    }
  };
  
  module.exports = {
    e2eTestcase,
  };
  

