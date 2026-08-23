const contactUsEmailTemplate = (
  fullName,
  mobile,
  email,
  queryType,
  message,
) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />

        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            font-family: Arial, Helvetica, sans-serif;
          }

          .container {
            width: 100%;
            padding: 30px 0;
          }

          .email-box {
            max-width: 650px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #eeeeee;
          }

          .header {
            background: #7b1e1e;
            padding: 25px;
            text-align: center;
            color: #ffffff;
          }

          .header h1 {
            margin: 0;
            font-size: 25px;
          }

          .header p {
            margin: 8px 0 0;
            font-size: 14px;
          }

          .content {
            padding: 30px;
          }

          .title {
            font-size: 20px;
            font-weight: bold;
            color: #333333;
            margin-bottom: 20px;
          }

          .info-box {
            background: #fafafa;
            border: 1px solid #eeeeee;
            border-radius: 8px;
            padding: 20px;
          }

          .row {
            padding: 12px 0;
            border-bottom: 1px solid #eeeeee;
          }

          .row:last-child {
            border-bottom: none;
          }

          .label {
            font-size: 13px;
            color: #777777;
            margin-bottom: 5px;
          }

          .value {
            font-size: 15px;
            color: #222222;
            font-weight: 500;
          }

          .message-box {
            margin-top: 20px;
            padding: 20px;
            background: #fff8f0;
            border-left: 4px solid #d97706;
            border-radius: 6px;
          }

          .message-title {
            font-size: 14px;
            font-weight: bold;
            color: #555555;
            margin-bottom: 10px;
          }

          .message {
            font-size: 15px;
            line-height: 1.6;
            color: #333333;
            white-space: pre-line;
          }

          .footer {
            text-align: center;
            padding: 20px;
            background: #fafafa;
            color: #888888;
            font-size: 12px;
          }
        </style>
      </head>

      <body>

        <div class="container">

          <div class="email-box">

            <div class="header">
              <h1>New Contact Us Enquiry</h1>
              <p>A new customer has contacted you</p>
            </div>

            <div class="content">

              <div class="title">
                Customer Details
              </div>

              <div class="info-box">

                <div class="row">
                  <div class="label">Full Name</div>
                  <div class="value">
                    ${fullName}
                  </div>
                </div>

                <div class="row">
                  <div class="label">Mobile Number</div>
                  <div class="value">
                    ${mobile}
                  </div>
                </div>

                <div class="row">
                  <div class="label">Email Address</div>
                  <div class="value">
                    ${email}
                  </div>
                </div>

                <div class="row">
                  <div class="label">Query Type</div>
                  <div class="value">
                    ${queryType}
                  </div>
                </div>

              </div>

              <div class="message-box">

                <div class="message-title">
                  Customer Message
                </div>

                <div class="message">
                  ${message}
                </div>

              </div>

            </div>

            <div class="footer">
              This enquiry was submitted through the Contact Us form.
            </div>

          </div>

        </div>

      </body>
    </html>
  `;
};



export default contactUsEmailTemplate