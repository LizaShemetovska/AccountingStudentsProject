using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using API.Errors;
using API.Helpers;
using API.Interfaces;
using API.Models;
using DAL;
using DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Commands
{
    public class UserCommandService : IUserCommandService
    {

        private readonly UserManager<AppUser> userManager;
        private readonly IEmailSender emailsender;
        private readonly SignInManager<AppUser> signInManager;
        private readonly IJwtToken jwtToken;
        private readonly DataContext dataContext;
        public UserCommandService(UserManager<AppUser> userManager, IEmailSender emailsender, SignInManager<AppUser> signInManager, IJwtToken jwtToken, DataContext dataContext)
        {
            this.userManager = userManager;
            this.emailsender = emailsender;
            this.signInManager = signInManager;
            this.jwtToken = jwtToken;
            this.dataContext = dataContext;
        }

        public async Task<User> Login(LoginModel loginModel)
        {
            var user = await userManager.FindByEmailAsync(loginModel.Email);

            if (user == null)
            { 
                throw new RestException(HttpStatusCode.Unauthorized);
            }

            if (user.EmailConfirmed == false)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email not confirmed" });
            }

            var result = await signInManager.CheckPasswordSignInAsync(user, loginModel.Password, false);
            if (result.Succeeded)
            {
                var role = await RoleHelper.GetUserRoleAsync(userManager, user);
                return new User
                {
                    Token = jwtToken.CreateToken(user,role),
                    Email=user.Email,
                    Role=role,
                };
               
            }
             throw new RestException(HttpStatusCode.Unauthorized);
        }

        public async Task<HttpStatusCode> Register(RegistrationModel registrationModel, IUrlHelper urlHelper, HttpContext httpContext)
        {

            var user = new AppUser
            {
                Name = registrationModel.Name,
                LastName = registrationModel.LastName,
                Age = registrationModel.Age,
                Email = registrationModel.Email,
                RegisteredDate = DateTime.UtcNow,
                UserName=registrationModel.Email,
            };

            var result = await userManager.CreateAsync(user, registrationModel.Password);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, Roles.roleUser);
                var emailConfirmationToken = await userManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmLink = urlHelper.Action("EmailConfirmation", "User", new { Token = emailConfirmationToken, Email = user.Email }, protocol: httpContext.Request.Scheme);
                var message = $"Please сonfirm your registration by <a href='{confirmLink}'>clicking here</a>";
                await emailsender.Execute("Confirm you email", message, user.Email);
                return HttpStatusCode.Created;
            }
            else
            {
                //foreach (var error in result.Errors)
                //{
                //    }
                    // List<IdentityError> errorsList = result.Errors.ToList();
                    // var errors = "";
                    // foreach (var error in errorsList)
                    // {
                    //     errors = errors + error.Description.ToString();
                    // }
                    // throw new RestException(HttpStatusCode.BadRequest, new { Errors = errors });
                    throw new RestException(HttpStatusCode.BadRequest, new { Errors = result.Errors.ToList() });
            }
          
        }

        public async Task<HttpStatusCode> UpdateUser(UpdateUserModel updateUserModel)
        {
            var user = await userManager.FindByIdAsync(updateUserModel.Id);

            if (user == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { User = "User doesn't exist" });
            }

            user.Name = updateUserModel.Name;
            user.LastName = updateUserModel.LastName;
            user.Age = updateUserModel.Age;
            user.Email = updateUserModel.Email;
            user.UserName = updateUserModel.Email;

            var success = await dataContext.SaveChangesAsync() > 0;
            if (!success)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { User = "User isn't updated" }); ;
            }
            return HttpStatusCode.OK;
        }
    }
}
