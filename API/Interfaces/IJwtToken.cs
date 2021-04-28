using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
   public interface IJwtToken
    {
        public string CreateToken(AppUser user,string role);
    }
}
