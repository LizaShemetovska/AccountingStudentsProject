using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace API.Services
{
    public class EmailSender : IEmailSender
    {
      
        public Task Execute(string subject, string message, string email)
        {
          
            var client = new SendGridClient(sendGridKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("shemetovska1107@gmail.com", "StudentAccounting"),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
            msg.AddTo(new EmailAddress(email));
            msg.SetClickTracking(false, false);

            return client.SendEmailAsync(msg);
        }

       
    }
}
