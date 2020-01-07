const mailer = {}
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'agenao1997@gmail.com',
        pass: 'Lightning1997249'
    }
});

mailer.contacto = async (Correo, text) => {
    let contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Para: ${Correo}</li>
        </ul>
        <p>${text}</p>
    `;
    const info = await transporter.sendMail({
        from: "agenao1997@gmail.com",
        to: "darwinramos20009@gmail.com",
        subject: 'Pruebita',
        html: contentHTML

    });
    
}

module.exports = mailer;