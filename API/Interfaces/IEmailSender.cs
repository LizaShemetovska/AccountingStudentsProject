using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IEmailSender
    {
        public Task Execute( string subject, string message, string email);
        
    }
}
