const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

const clientId ="704317465792-o1dl9m16l1re818h5d3ekfre1004vqoe.apps.googleusercontent.com";
const clientSecret = "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";
const refreshToken ="1//04YpkZn-QYYoRCgYIARAAGAQSNwF-L9Ir3Ns5IjYWDe5ULSiFChi-mHZw_6ij72RNGy8P6A3V95AJbFg2Rk5XQBCs9YjGC-Wq1nA" ;

const oauth2Client = new OAuth2(
  clientId,
  clientSecret,
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: refreshToken,
});

const accessToken = oauth2Client.getAccessToken();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'subhankar.siliguri@gmail.com',
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken,
    accessToken: "ya29.a0AfB_byBW4Ruo5FFRM_m-OzMgjTecReFPENv_gQ3bAKDzIXNyvWCeUSK5LNj_8K6WclaXasQe-lrUYyB_yLgPcmBxt0zUxV_dI5Ehf70je1p7CP4ggvQzYaJTgbW5AjR4L3SbTRBosfjKuBJpoDxi52sd0zYb0PsN2Rv1VAaCgYKAWgSARISFQHsvYlsYjniBMzAHR151KvH2GKPuw0173",
  },
});

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, '../views/mailers', relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log('Error in rendering template');
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
