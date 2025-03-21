const nodemailer = require('nodemailer');

const emailConfig = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'eljardindecrital@gmail.com',
        pass: 'pftx cibb nmiu uhtn' 
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = async ({ name, email, subject, message } ) => {
    try {
        const mailOptions = {
            from: 'eljardindecrital@gmail.com',
            to: 'eljardindecrital@gmail.com',  
            subject: `Nuevo mensaje de contacto: ${subject}`,
            text: `
              Nombre: ${name}
              Correo: ${email}
              Asunto: ${subject}
              Mensaje: ${message}
            `,
          };
        await emailConfig.sendMail(mailOptions);

    } catch (error) {
        console.error('Error al enviar email:', error);
    }
}

module.exports = sendEmail;