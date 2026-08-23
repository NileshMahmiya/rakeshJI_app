const bookingSuccessEmail = ({
  pooja,
  poojaDate,
  fullName,
  mobile,
  email,
  address,
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pooja Booking Confirmed</title>
</head>

<body style="margin:0; padding:0; background:#f8f3ed; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background:#f8f3ed; padding:30px 15px;">

    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px; width:100%; background:#ffffff; border-radius:12px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center"
              style="background:#8b4513; padding:30px 20px;">

              <div style="
                width:60px;
                height:60px;
                line-height:60px;
                background:#ffffff;
                color:#2e8b57;
                border-radius:50%;
                font-size:32px;
                font-weight:bold;
                margin:0 auto 15px;
              ">
                ✓
              </div>

              <h1 style="
                margin:0;
                color:#ffffff;
                font-size:26px;
              ">
                Booking Successful!
              </h1>

              <p style="
                margin:10px 0 0;
                color:#ffffff;
                font-size:15px;
              ">
                Your Pooja booking has been confirmed.
              </p>

            </td>
          </tr>


          <!-- Greeting -->
          <tr>
            <td style="padding:30px 35px 15px;">

              <h2 style="
                margin:0 0 10px;
                color:#7a3e13;
                font-size:21px;
              ">
                🙏 Namaste ${fullName},
              </h2>

              <p style="
                margin:0;
                color:#555555;
                font-size:15px;
                line-height:1.6;
              ">
                Thank you for booking your Pooja with us.
                Your booking has been successfully confirmed.
              </p>

            </td>
          </tr>


          <!-- Pooja Details -->
          <tr>
            <td style="padding:15px 35px;">

              <h3 style="
                margin:0 0 12px;
                color:#7a3e13;
                font-size:17px;
              ">
                🪔 Pooja Details
              </h3>

              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:#fff8ef; border-radius:8px;">

                <tr>
                  <td style="
                    padding:14px;
                    color:#777777;
                    font-size:14px;
                    border-bottom:1px solid #eadfd4;
                  ">
                    Pooja
                  </td>

                  <td align="right" style="
                    padding:14px;
                    color:#333333;
                    font-size:14px;
                    font-weight:bold;
                    border-bottom:1px solid #eadfd4;
                  ">
                    ${pooja}
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding:14px;
                    color:#777777;
                    font-size:14px;
                  ">
                    Pooja Date
                  </td>

                  <td align="right" style="
                    padding:14px;
                    color:#333333;
                    font-size:14px;
                    font-weight:bold;
                  ">
                    ${poojaDate}
                  </td>
                </tr>

              </table>

            </td>
          </tr>


          <!-- Customer Details -->
          <tr>
            <td style="padding:15px 35px;">

              <h3 style="
                margin:0 0 12px;
                color:#7a3e13;
                font-size:17px;
              ">
                👤 Devotee Details
              </h3>

              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:#fff8ef; border-radius:8px;">

                <tr>
                  <td style="
                    padding:12px 14px;
                    color:#777777;
                    font-size:14px;
                    border-bottom:1px solid #eadfd4;
                  ">
                    Full Name
                  </td>

                  <td align="right" style="
                    padding:12px 14px;
                    color:#333333;
                    font-size:14px;
                    font-weight:bold;
                    border-bottom:1px solid #eadfd4;
                  ">
                    ${fullName}
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding:12px 14px;
                    color:#777777;
                    font-size:14px;
                    border-bottom:1px solid #eadfd4;
                  ">
                    Mobile
                  </td>

                  <td align="right" style="
                    padding:12px 14px;
                    color:#333333;
                    font-size:14px;
                    font-weight:bold;
                    border-bottom:1px solid #eadfd4;
                  ">
                    ${mobile}
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding:12px 14px;
                    color:#777777;
                    font-size:14px;
                  ">
                    Email
                  </td>

                  <td align="right" style="
                    padding:12px 14px;
                    color:#333333;
                    font-size:14px;
                    font-weight:bold;
                  ">
                    ${email}
                  </td>
                </tr>

              </table>

            </td>
          </tr>


          <!-- Address -->
          <tr>
            <td style="padding:15px 35px;">

              <h3 style="
                margin:0 0 12px;
                color:#7a3e13;
                font-size:17px;
              ">
                📍 Pooja Address
              </h3>

              <div style="
                background:#fff8ef;
                padding:15px;
                border-radius:8px;
                color:#555555;
                font-size:14px;
                line-height:1.6;
              ">
                ${address}
              </div>

            </td>
          </tr>


          <!-- Confirmation -->
          <tr>
            <td style="padding:20px 35px;">

              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:#fff4df; border-radius:8px;">

                <tr>
                  <td style="
                    padding:18px;
                    text-align:center;
                    color:#6b4a32;
                    font-size:14px;
                    line-height:1.6;
                  ">

                    🪔 Our team will contact you with further
                    details regarding your Pooja.

                    <br><br>

                    Please keep this email for your records.

                  </td>
                </tr>

              </table>

            </td>
          </tr>


          <!-- Footer -->
          <tr>
            <td align="center"
              style="
                padding:25px 20px;
                background:#fafafa;
                border-top:1px solid #eeeeee;
              ">

              <p style="
                margin:0 0 8px;
                color:#777777;
                font-size:13px;
              ">
                Thank you for choosing us for your spiritual journey.
              </p>

              <p style="
                margin:0;
                color:#8b4513;
                font-size:14px;
                font-weight:bold;
              ">
                🙏 May Lord bless you and your family.
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

export default bookingSuccessEmail;