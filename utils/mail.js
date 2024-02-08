const nodemailer=require("nodemailer")
exports.generateOtp=()=>{
     let otp=''
     for(let i=0;i<=3;i++)
     {
        const random=Math.round(Math.random()*9);
        otp=otp+random;

     }
     return otp;
}
exports.MailTransport=()=>{
  var transport = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 487,
    auth: {
      user: "navinmanohar78086@gmail.com",
      pass: "lqwa skiw ifgj tcrz"
    }
  });
      return transport
}

exports.EmailTemplate=(code)=>{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
     
    </head>
      
    <body>
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Anchor</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing anchor. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${code}</h2>
      <p style="font-size:0.9em;">Regards,<br />Anchor Team</p>
      <hr style="border:none;border-top:1px solid #eee" />
    </div>
  </div>
    <body/>
    <html/>`
}
exports.PlainEmailTemplate=(header,message)=>{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <style>
       @media only screen and (max-width:620px){
       h1{
        font-size:20px;
        padding:5px;
       }
      }
       <style/>
    </head>
      <div>
      <div style="max-width:620px; margin:0 auto; font-family:sans-sarif;color:#272727;">
      <h1 style="background:#f6f6f6;padding;10px;text-align:center;color:#272727;>${header}<h1/>
      <p style="color:#272727;text-align:center;">${message}<p/>
      
      <div/>
      <div/>
    <body>
    
    <body/>
    <html/>`
}