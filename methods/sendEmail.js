/**
 *
 * Run:
 *
 */
const mailjet = require('node-mailjet').apiConnect("458c8397510ef7541166ad6145e06959"
,"870c67b278a2808d117d740b6a0c22b9")

module.exports=function(formObj,callback){

    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'piyush.dewangan2001@ssipmt.com',
            Name: 'Ecommerce',
          },
          To: [
            {
              Email: formObj.email,
              Name: 'Customer',
            },
          ],
          Subject: 'Email Verification of Ecommerce',
          TextPart: 'Click here to create account',
          HTMLPart:`<h3>Dear customer, welcome to amazon</h3>
          <form action="http://localhost:5000/verifymail/${formObj.mailToken}" method="get">
          <input type="submit" value="Verify">
</form>`
          
        },
      ],
    })
    request
      .then(result => {
        console.log(result.body);
        callback(null,result.body);
      })
      .catch(err => {
        console.log(err.statusCode);
        callback(err,null);
      })
}