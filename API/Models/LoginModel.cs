using API.Validators;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class LoginModel
    {
       
        public string Email { get; set; }
     
        public string Password { get; set; }
    }
    public class LoginPageValidator : AbstractValidator<LoginModel>
    {
        public LoginPageValidator()
        {
         
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
          
        }
    }

}
