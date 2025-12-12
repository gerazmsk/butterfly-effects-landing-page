# Email Configuration for Chat Widget

The chat widget requires SMTP credentials to send lead emails to `georgii.zalygin@butterflyeffects.com`.

## Railway Environment Variables

In your Railway project dashboard, add these environment variables:

1. **SMTP_USER** - Your email address (e.g., `your-email@gmail.com`)
2. **SMTP_PASS** - Your email password or app-specific password
3. **SMTP_HOST** (optional) - SMTP server hostname (default: `smtp.gmail.com`)
4. **SMTP_PORT** (optional) - SMTP server port (default: `587`)

## Gmail Setup

If using Gmail:
1. Enable 2-factor authentication on your Google account
2. Generate an "App Password" at https://myaccount.google.com/apppasswords
3. Use the app password as `SMTP_PASS`

## Other Email Providers

- **Outlook/Hotmail**: Use `smtp-mail.outlook.com` as SMTP_HOST
- **Custom SMTP**: Set SMTP_HOST and SMTP_PORT to your provider's values

## Testing

After setting environment variables, restart your Railway deployment. The chat widget will send emails when leads are submitted.

