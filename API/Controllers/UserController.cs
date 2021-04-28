using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using API.Models;
using System.Net;
using System.Collections.Generic;
using DAL.Entities;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserCommandService commandUserService;
        private readonly IUserQueriesService queryUserService;
        public UserController(IUserCommandService commandUserService, IUserQueriesService queryUserService)
        {
            this.commandUserService = commandUserService;
            this.queryUserService = queryUserService;
        }

        [AllowAnonymous]
        [HttpPost("register/")]
        public async Task<ActionResult<HttpStatusCode>> Register([FromBody] RegistrationModel registrationModel)
        {
            return await commandUserService.Register(registrationModel,Url,HttpContext);
        }
        [AllowAnonymous]
        [HttpPost("login/")]
        public async Task<ActionResult<User>> Login(LoginModel loginModel)
        {
            return await commandUserService.Login(loginModel);
        }
        public async Task<ActionResult<User>> EmailConfirmation()
        {
            return await queryUserService.EmailConfirmation(HttpContext);
        }

        [Authorize(Roles = Roles.roleAdmin)]
        [HttpGet("adminList/")]
        public async Task<PaginationModel> GetAllUsers(MoreParametersModel model)
        {
            return await queryUserService.GetAllUsers(model);
        }
        [Authorize(Roles = Roles.roleAdmin)]
        [HttpGet("{Id}")]
        public async Task<ActionResult<User>> GetUserById(string Id)
        {
            return await queryUserService.GetUserById(Id);
        }
        [Authorize(Roles = Roles.roleAdmin)]
        [HttpPut]
        public async Task<HttpStatusCode> UpdateUser(UpdateUserModel updateUserModel)
        {
            return await commandUserService.UpdateUser(updateUserModel);
        }
    }
}
