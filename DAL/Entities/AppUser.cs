using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class AppUser : IdentityUser
    {
        public string LastName { get; set; }
        public int Age { get; set; }
        public DateTime RegisteredDate { get; set; }
        public DateTime StudyDate { get; set; }
    }
}
