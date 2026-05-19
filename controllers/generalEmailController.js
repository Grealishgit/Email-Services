// imports for specific provider


await transporter.sendMail({
    from: '', // receipient email address
    to: '', //sender email address
    subject: 'Hello!',
    html: '<strong>It works!</strong>',
    text: 'It works!'
});


//the rest of the code
