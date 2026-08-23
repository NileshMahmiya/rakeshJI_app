
const accountCreatedEmail = (fullName, email, password, userType) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Account Has Been Created</title>
</head>

<body style="margin:0; padding:0; background-color:#f5f5f5; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5; padding:40px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0"
          style="max-width:600px; width:100%; background:#ffffff; border-radius:12px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#8B5E34; padding:30px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:28px;">
                Welcome!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px 35px; color:#333333;">

              <h2 style="margin-top:0;">
                Hello ${fullName},
              </h2>

              <p style="font-size:16px; line-height:1.6;">
                Your account has been successfully created by an administrator.
              </p>

              <p style="font-size:16px; line-height:1.6;">
                Below are your account details:
              </p>

              <!-- Account Details -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#f8f1e8; border-radius:8px; margin:25px 0;">

                <tr>
                  <td style="padding:15px 20px; font-size:14px; color:#777777;">
                    Account Type
                  </td>
                  <td style="padding:15px 20px; font-size:16px; font-weight:bold; color:#8B5E34; text-align:right;">
                    ${userType}
                  </td>
                </tr>

                <tr>
                  <td style="padding:15px 20px; font-size:14px; color:#777777;">
                    Email
                  </td>
                  <td style="padding:15px 20px; font-size:16px; font-weight:bold; color:#333333; text-align:right;">
                    ${email}
                  </td>
                </tr>

                <tr>
                  <td style="padding:15px 20px; font-size:14px; color:#777777;">
                    Your Password
                  </td>
                  <td style="padding:15px 20px; font-size:16px; font-weight:bold; color:#333333; text-align:right;">
                    ${password}
                  </td>
                </tr>

              </table>

              <p style="font-size:15px; line-height:1.6; color:#555555;">
                For your security, please change your password after logging in for the first time.
              </p>

              <p style="font-size:15px; line-height:1.6; color:#555555;">
                If you did not expect this account to be created, please contact the administrator immediately.
              </p>

              <p style="margin-top:30px; font-size:16px;">
                Thank you,<br>
                <strong>Your Platform Team</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f5f5f5; padding:20px; text-align:center; color:#888888; font-size:13px;">
              This is an automated email. Please do not reply to this message.
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

export default accountCreatedEmail;

