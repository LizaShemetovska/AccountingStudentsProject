using System;
using System.ComponentModel.DataAnnotations;
using API.Validators;
using FluentValidation;

namespace API.Models
{
    public class RegistrationModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
    public class RegisterPageValidator : AbstractValidator<RegistrationModel>
    {
        public RegisterPageValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("UserName must be required");
            RuleFor(x => x.LastName).NotEmpty().WithMessage("LastName must be required"); ;
            RuleFor(x => x.Age).InclusiveBetween(16, 40).WithMessage("Age should be from 16 to 40 years");
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).Password();
        }
    }
   
}
