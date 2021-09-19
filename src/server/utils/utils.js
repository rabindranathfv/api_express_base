'use stric';
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const path = require('path');
const nodeMailer = require('nodemailer');

const hashPassword = (password, saltRounds) => {
  return bcrypt.hashSync(password, saltRounds)
};

const checkPassword = (bodyPass, userPass) => {
  return bcrypt.compareSync(bodyPass, userPass);
}

/* Function to handle Fatal Error in the server */
const handleFatalError = (error) => {
  console.error(chalk `{red.bold [fatal error] ${error.message}❌ WTF O__O }`)
  console.error(error.stack)
  process.exit(1)
}

const sendSimpleEamil = (sendToEmail) => {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'rabindranath.ferreira@forcast.cl',
      pass: 'rabin123'
    }
  });
  let mailOptions = {
    from: 'soporte@forcast.cl', // sender address
    to: sendToEmail, // list of receivers
    subject: 'Recover Password', // Subject line
    text: 'TEXT CONTENT', // plain text body
    html: '<b>NodeJS Email Tutorial</b>' // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.render('index');
  });
}

/* Function to send a specific responses
* Parameters:
* 1) res: The response
* 2) object: The object of database. Default null
    model: string of model. Example ('User'),
    data: object of database
* 3) status: The status of response. Default status 200 OK+
* 4) in error from backend we send message as string
*/
const handleResponseSuccess = (res, object = { data: null, model: null }, status = 200) => {
  console.log(chalk `{green.bold The response has be send successfully! :) }`)

  let response = {
    status: 200,
    ...object
  }

  if (object.data === null) {
    res.status(status).send(response)
  } else {
    response[object.model] = object.data
    res.status(status).send(response)
  }
}

/* Function to send a error in the response */
const handleResponseError = (res, message, error = {}, status) => {
  console.error(chalk `{red.bold WTF!! ${message} O__O }`);
  // console.log(error);

  // if (error.stack) { console.error(error.stack) }

  res.status(code || 500).send({
    ok: false,
    status: status || 500,
    message: `${message}, An error ocurred  ❌`,
    error: error.message
  });
}


module.exports = {
  hashPassword,
  checkPassword,
  handleResponseSuccess,
  handleResponseError,
  handleFatalError
};