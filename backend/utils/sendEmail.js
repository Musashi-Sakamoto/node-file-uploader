require('dotenv').config();
const sendGrid = require('sendgrid').mail;
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = (to, token) => {
  const { HOST_URL } = process.env;
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [{
        to: [{
          email: to
        }],
        subject: 'Verify Your Email'
      }],
      from: {
        email: 'no-reply@example.com'
      },
      content: [{
        type: 'text/plain',
        value: `Click on this link to verify your email ${HOST_URL}/verification?token=${token}&email=${to}`
      }]
    }
  });
  return new Promise((resolve, reject) => {
    sg.API(request, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    });
  });
};

module.exports = {
  sendVerificationEmail
};
