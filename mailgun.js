const Mailgun = require('mailgun.js');
const FormData = require('form-data');
// import MailGen from 'mailgen';

const API_KEY = process.env.MAILGUN_KEY || '3369a6c668bd2f5cb16346c87b7ccdb7-309b0ef4-998219c5';
const DOMAIN = process.env.MAILGUN_DOMAIN || 'sandbox2d0d656ea3064c29869ef292708ae68c.mailgun.org';

const mailgun = new Mailgun(FormData).client({
    username: 'api',
    key: API_KEY,
});

const mailFunc = async () => {
    await mailgun.messages.create(DOMAIN, {
        to: 'ayushkiledar10@gmail.com',
        from: 'ayushkiledar12@gmail.com',
        subject: 'Email',
        text: 'email'
    });
}

mailFunc();