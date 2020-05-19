const request = require('request-promise');

const getData = async function(){

const json = await request({
  url: 'http://www.json-generator.com/api/json/get/bRQrVzkySq' ,
  json: true 
});

return json.map(person => ({
  age: person.age,
  email: person.email,
  name: person.name
}));

};

(async function(){
try{

  //get the data  
  const people = await getData();
  


let slackResult = {};
slackResult =  people.map(person => ({
          color: '#f71407',
          text: `*${person.email}*`
      }) )


console.log(slackResult);


const slackBody = {

"attachments": [
  {
      "mrkdwn_in": ["text"],
      "color": "#2EB67D",
      "pretext": "Successful Tests",    
      "title": "title",
      "title_link": "https://api.slack.com/",      
      "fields": [
          {
              "title": "A field's title",
              "value": "This field's value",
              "short": false
          },
          {
              "title": "A short field's title",
              "value": "A short field's value",
              "short": true
          }
      ],    
      "footer": "footer",
      "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
      "ts": Date.now()
  },

  {
    "mrkdwn_in": ["text"],
    "color": "#E01E5A",
    "pretext": "Failed Tests",    
    "title": "title",
    "title_link": "https://api.slack.com/",
    "text": "Failed Tests",
    "fields": [
      slackResult
        ]
  ,
    "footer": "footer",
    "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
    "ts": Date.now()
}
]
};


    //post to slack
   const res = await request({
        url: 'https://hooks.slack.com/services/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',
        method: 'POST',
        body: slackBody,
        json: true
    }) ;
  
    console.log(res);

}catch(e){
    console.log(e);
}

})();