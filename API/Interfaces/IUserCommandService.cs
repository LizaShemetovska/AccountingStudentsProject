
using System.Net;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface IUserCommandService
    {
      
        Task<HttpStatusCode> Register(RegistrationModel registrationModel, IUrlHelper urlHelper, HttpContext httpContext);
        Task<User> Login(LoginModel loginModel);
      Task<HttpStatusCode> UpdateUser(UpdateUserModel updateUserModel);

    }
}
