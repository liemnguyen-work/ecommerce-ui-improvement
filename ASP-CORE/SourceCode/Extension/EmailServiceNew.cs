using System.Net;
using System.Net.Mail;
using System.Text;

namespace _31241023460_NguyenThanhLiem.Extension;

public class EmailServiceNew
{
    public static async Task<bool> SendMailGoogleSmtp(
        string from,
        string to,
        string subject,
        string body,
        string gmail,
        string appPassword)
    {
        using var client = new SmtpClient("smtp.gmail.com")
        {
            Port = 587,
            Credentials = new NetworkCredential(gmail, appPassword),
            EnableSsl = true
        };

        return await SendMail(from, to, subject, body, client);
    }

    public static async Task<bool> SendMail(
        string from,
        string to,
        string subject,
        string body,
        SmtpClient client)
    {
        try
        {
            using var message = new MailMessage(
                from, to, subject, body)
            {
                BodyEncoding = Encoding.UTF8,
                SubjectEncoding = Encoding.UTF8,
                IsBodyHtml = true
            };

            message.ReplyToList.Add(new MailAddress(from));
            message.Sender = new MailAddress(from);

            await client.SendMailAsync(message);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return false;
        }
    }
}