import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'

export const sendEmail = async({ email , emailtype ,userId}:any) => {
    // these are rthe steps for wroting the emails
    // NOW WE HAVE TO CONFIGUR THR MAIL 

    // now we have to hash the token and conditon for the verify and the rest 

    const hashToken = await bcryptjs.hash(toString() , 10);

    if (emailtype === 'VERIFY') {
        await User.findByIdAndUpdate(userId , {
            verifyToken: hashToken }, {verifyTokenExpi: Date.now() + 36000000}
        )
    } else if(emailtype === 'RESET'){
        await User.findByIdAndUpdate(userId , {
            frogetPasswordToken: hashToken }, {frogetPasswordTokenExpi: Date.now() + 36000000}
        )
    }
    
    try {
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "1465eb8657fb86",// ALWAYS PUT THESE THINGS IN THE .ENV FILES 
              pass: "nskvn84d9f6" // THIS ALSO 
            }
          });

      const emailOption = {
        from: 'kumarrohit9337@gmail.com', // sender address
        to: email,
        subject: emailtype === 'VERIFY' ? "Verify your Email" : "Reset your password" , // Subject line
        html: `<p> Click <a href="${process.env.DOMAIN_NAME}/verifyemail?token=${hashToken}">here</a>
        to ${emailtype === "VERIFY" ? "verify your password" : "Reset your password"}
        or copy and paste the Link below
        <br> ${process.env.DOMAIN_NAME}/verifyemail?token=${hashToken}
        </p>`
      }

      const mailresponse = await transport.sendMail(emailOption);
      return mailresponse;

    } catch (error:any) {
        throw new Error(error.message)
    }
};