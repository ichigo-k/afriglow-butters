export const WELCOME_EMAIL = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>About AfrGlow Butters</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            text-align: left;
        }
        h1 {
            color: #d4a373;
        }
        p {
            color: #333;
            font-size: 16px;
            line-height: 1.6;
        }
        .highlight {
            font-weight: bold;
            color: #e07a5f;
        }
        .cta-button {
            display: inline-block;
            background: #d4a373;
            color: white;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 15px;
        }
        .cta-button:hover {
            background: #c48b62;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Welcome to AfriGlow Butters</h1>
    <p>Hey <span class="highlight">{name}</span>,</p>
    <p>I’m excited to welcome you to the AfriGlow family.</p>
    <p>At AfriGlow Butters, we are dedicated to providing high-quality, locally sourced products made with care and authenticity. Our premium shea butter and groundnut paste are crafted using traditional methods, ensuring the finest quality while supporting Ghanaian communities.</p>
    <p>We believe in natural, ethically sourced ingredients that bring genuine nourishment to your skin and meals.</p>
    <a href="{shop_link}" class="cta-button">Explore Our Products</a>

    <p class="footer">Thank you for supporting authentic Ghanaian products!</p>
</div>

</body>
</html>

`

export const PASSWORD_RESET_MAIL = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            text-align: left;
        }
        h1 {
            color: #d4a373;
        }
        p {
            color: #333;
            font-size: 16px;
            line-height: 1.6;
        }
        .highlight {
            font-weight: bold;
            color: #e07a5f;
        }
        .cta-button {
            display: inline-block;
            background: #d4a373;
            color: white;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 15px;
        }
        .cta-button:hover {
            background: #c48b62;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Password Reset Request</h1>
    <p>Hey <span class="highlight">{name}</span>,</p>
    <p>We received a request to reset your password. If you made this request, please click the button below to reset your password.</p>
    <p>If you did not request a password reset, you can safely ignore this email.</p>

    <a href="{reset_link}" class="cta-button">Reset Your Password</a>

    <p class="footer">For security reasons, this link will expire in 30 minutes </p>
</div>

</body>
</html>

`

export const PASSWORD_RESET_SUCCESS_MAIL = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Password Reset Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            text-align: left;
        }
        h1 {
            color: #d4a373;
        }
        p {
            color: #333;
            font-size: 16px;
            line-height: 1.6;
        }
        .highlight {
            font-weight: bold;
            color: #e07a5f;
        }
        .cta-button {
            display: inline-block;
            background: #d4a373;
            color: white;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 15px;
        }
        .cta-button:hover {
            background: #c48b62;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Password Reset Successful</h1>
    <p>Your password has been successfully reset. You can now log in using your new password.</p>
    
    <a href="{login_link}" class="cta-button">Go to Login</a>
    
    <p class="footer">If you did not reset your password, please contact our support team immediately.</p>
</div>

</body>
</html>

`

export const PURCHASE_SUCCESSFUL = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Purchase Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            text-align: left;
        }
        h1 {
            color: #4CAF50;
        }
        p {
            color: #333;
            font-size: 16px;
            line-height: 1.6;
        }
        .highlight {
            font-weight: bold;
            color: #e07a5f;
        }
        .cta-button {
            display: inline-block;
            background: #4CAF50;
            color: white;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 15px;
        }
        .cta-button:hover {
            background: #45a049;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Purchase Successful!</h1>
    <p>Thank you for your purchase! Your order has been successfully placed and is being processed.</p>
    
    <p class="highlight">Order ID: {order_id}</p>
    
    <p>You can track your order status or view your purchase details by clicking the button below:</p>
    
    <a href="{order_tracking_link}" class="cta-button">View Order Details</a>
    
    <p class="footer">If you have any questions or concerns about your order, please contact our support team.</p>
</div>

</body>
</html>
`
