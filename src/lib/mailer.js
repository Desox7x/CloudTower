const mailer = {}
const nodemailer = require('nodemailer');
const DB = require('./DBData');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'cloudtower2020@gmail.com',
        pass: 'cloudtower123'
    }
});



//const defaultEmail = "noreply@cloudtower.do";

async function enviarMail(html, subject, to){ 
    await transporter.sendMail({
        from: '"CloudTower" <cloudtower2020@gmail.com>',
        to,
        subject,
        html
    });
}

mailer.contacto = async (Correo, text) => {
    let contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Para: ${Correo}</li>
        </ul>
        <p>${text}</p>
    `;
    
    enviarMail(contentHTML,'questy','emasdf');
    
}

mailer.newuser = async(id) => {

    let user = await DB.getUserById(id);

    let html=`<h1> Bienvenido a CloudTower ${user[0].fullname}!</h1>
    <p>
    
    </p>`;


    let bienvenida = 'Bienvenido a CloudTower.do';
    //console.log(user.correo);
    await enviarMail(html, bienvenida, user[0].correo);

}

mailer.successReserva = async(id) => {
    let user = await DB.getUserById(id);
    let html = `<h1> Gracias! ${user[0].fullname}! <h1>
    <p> Tu reserva a se ha realizado exitosamente. </p>
    `;
    let correo = 'Correo de verificación.'
    console.log('sent');
    await enviarMail(html, correo, user[0].correo);


}

// mailer.validateUser = async(id) => {
//     let user = await DB.getUserById(id);
//     let html = `<h3>Su cuenta ha sido validada exitosamente!</h3>
//     <p>Entre a cloudtower.xyz/login para iniciar sesion. </p>`;
//     let sujeto = 'Validacion exitosa';
//     await enviarMail(html, sujeto, user[0].correo)
// }


module.exports = mailer;