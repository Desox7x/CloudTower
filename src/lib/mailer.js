const mailer = {}
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: '',
        pass: ''
    }
});

const DB = require('./DBData');

//const defaultEmail = "noreply@cloudtower.do";

async function enviarMail(html, subject, to){ 
    await transporter.sendMail({
        from: '"CloudTower.do" <noreply@cloudtower.do>',
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

    let html=`<h1> Hola ${user[0].fullname}</h1>
    <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum vel ratione exercitationem quisquam blanditiis officia, modi, veniam rerum corporis est alias assumenda, corrupti similique nulla doloribus. Quam ipsam, eius aut praesentium dolores possimus, facere dicta beatae atque placeat laboriosam, excepturi reprehenderit. Id doloremque eaque ab mollitia ipsam? Soluta cupiditate ratione quas, hic rem labore, error saepe natus placeat facilis nulla temporibus quo numquam totam nemo dolorem veniam unde laudantium explicabo perspiciatis. Itaque earum dignissimos natus omnis error, pariatur temporibus quidem? Amet officia harum quos incidunt non, dolore nihil velit cumque quas! Repellendus suscipit maiores unde deserunt tenetur. Cumque, nulla deleniti?
    </p>`;


    let bienvenida = 'Bienvenido a CloudTower.do';
    //console.log(user.correo);
    await enviarMail(html, bienvenida, user[0].correo);

}

module.exports = mailer;