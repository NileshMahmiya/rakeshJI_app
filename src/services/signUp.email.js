
const signUpEmail = (fullName, email) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Account Created Successfully</title>
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
                  <td
                    style="
                      background-color: #f97316;
                      padding: 30px;
                      text-align: center;
                    "
                  >
                    <h1
                      style="
                        margin: 0;
                        color: #ffffff;
                        font-size: 28px;
                      "
                    >
                      Welcome!
                    </h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 35px;">

                    <h2
                      style="
                        margin-top: 0;
                        color: #333333;
                        font-size: 22px;
                      "
                    >
                      Hello ${fullName},
                    </h2>

                    <p
                      style="
                        color: #555555;
                        font-size: 16px;
                        line-height: 1.6;
                      "
                    >
                      Thank you for creating an account with us.
                      Your account has been successfully created.
                    </p>

                    <!-- Account Information -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="
                        background-color: #f8f8f8;
                        border-radius: 8px;
                        margin: 25px 0;
                      "
                    >
                      <tr>
                        <td style="padding: 20px;">

                          <p
                            style="
                              margin: 0 0 10px 0;
                              color: #777777;
                              font-size: 14px;
                            "
                          >
                            Registered Email
                          </p>

                          <p
                            style="
                              margin: 0;
                              color: #333333;
                              font-size: 16px;
                              font-weight: bold;
                            "
                          >
                            ${email}
                          </p>

                        </td>
                      </tr>
                    </table>

                    <p
                      style="
                        color: #555555;
                        font-size: 16px;
                        line-height: 1.6;
                      "
                    >
                      You can now log in to your account using the
                      email address and password you provided during
                      registration.
                    </p>

                    <p
                      style="
                        color: #555555;
                        font-size: 16px;
                        line-height: 1.6;
                      "
                    >
                      We are happy to have you with us.
                    </p>

                    <p
                      style="
                        margin-top: 30px;
                        color: #333333;
                        font-size: 16px;
                      "
                    >
                      Regards,<br />
                      <strong>Your Team</strong>
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td
                    style="
                      background-color: #f8f8f8;
                      padding: 20px;
                      text-align: center;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        color: #888888;
                        font-size: 13px;
                      "
                    >
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

export default signUpEmail;

