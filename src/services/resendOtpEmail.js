
const resendOtpEmail = (fullName, otp) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your OTP</title>
    </head>

    <body style="
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      font-family: Arial, Helvetica, sans-serif;
    ">

      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="padding: 40px 0;"
      >
        <tr>
          <td align="center">

            <table
              width="600"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                max-width: 600px;
                width: 100%;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
              "
            >

              <!-- Header -->
              <tr>
                <td style="
                  background-color: #f97316;
                  padding: 30px;
                  text-align: center;
                ">
                  <h1 style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 26px;
                  ">
                    Verification Code
                  </h1>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 35px;">

                  <h2 style="
                    margin-top: 0;
                    color: #333333;
                    font-size: 21px;
                  ">
                    Hello ${fullName},
                  </h2>

                  <p style="
                    color: #555555;
                    font-size: 16px;
                    line-height: 1.6;
                  ">
                    You requested a new verification code.
                    Please use the OTP below to continue.
                  </p>

                  <!-- OTP -->
                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style="margin: 30px 0;"
                  >
                    <tr>
                      <td align="center">

                        <div style="
                          display: inline-block;
                          padding: 18px 35px;
                          background-color: #fff7ed;
                          border: 2px dashed #f97316;
                          border-radius: 10px;
                        ">
                          <span style="
                            color: #f97316;
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 8px;
                          ">
                            ${otp}
                          </span>
                        </div>

                      </td>
                    </tr>
                  </table>

                  <p style="
                    color: #555555;
                    font-size: 15px;
                    line-height: 1.6;
                    text-align: center;
                  ">
                    This OTP is valid for <strong>5 minutes</strong>.
                  </p>

                  <p style="
                    color: #777777;
                    font-size: 14px;
                    line-height: 1.6;
                  ">
                    If you did not request this OTP, you can safely
                    ignore this email. Never share your OTP with anyone.
                  </p>

                  <p style="
                    margin-top: 30px;
                    color: #333333;
                    font-size: 16px;
                  ">
                    Regards,<br>
                    <strong>Your Team</strong>
                  </p>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="
                  background-color: #f8f8f8;
                  padding: 20px;
                  text-align: center;
                ">
                  <p style="
                    margin: 0;
                    color: #888888;
                    font-size: 13px;
                  ">
                    This is an automated email. Please do not reply
                    to this email.
                  </p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </body>
    </html>
  `;
};

export default resendOtpEmail;

