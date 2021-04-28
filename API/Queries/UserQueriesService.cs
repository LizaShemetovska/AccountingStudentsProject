using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
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

namespace API.Queries
{
   public  class UserQueriesService:IUserQueriesService
    {
        private readonly UserManager<AppUser> userManager;
        private readonly DataContext dataContext;
        public UserQueriesService(UserManager<AppUser> userManager,DataContext dataContext)
        {
            this.userManager = userManager;
            this.dataContext = dataContext;

        }
        public async Task<User> EmailConfirmation(HttpContext httpContext)
        {
            var user = await userManager.FindByEmailAsync(httpContext.Request.Query["Email"].ToString());
            await userManager.ConfirmEmailAsync(user, httpContext.Request.Query["Token"].ToString());
            return null;
        }
  
        public async Task<PaginationModel> GetAllUsers(MoreParametersModel model)
       {
            IQueryable<AppUser> users;
            users = SearchUsers( model.SearchParameter);
            users = users.AsQueryable().AsNoTracking();
           
            var allUsers = await users
                .Skip((model.numberPage - 1) * PaginationModel.DefaultPageSize)
                .Take(PaginationModel.DefaultPageSize).ToListAsync();
           var count = dataContext.Users.Count();

           return new PaginationModel
           {
               Users= allUsers,
               PageNumber= count,
           };
        }

        public async Task<User> GetUserById(string Id)
        {
            var user = await userManager.FindByIdAsync(Id);

            var role = await RoleHelper.GetUserRoleAsync(userManager, user);

            return new User
            {
                Name=user.Name,
                LastName=user.LastName,
                Email=user.Email,
                Age=user.Age,
                RegisterDate = user.RegisteredDate.ToString(),
                Role = role,
            };
        }
        public IQueryable<AppUser> SearchUsers(string searchParameter)
        {
            IQueryable<AppUser> users=null;
            if (!string.IsNullOrWhiteSpace(searchParameter))
            {

                users = dataContext.Users.Where(x => x.Name.ToLower().Contains(searchParameter.ToLower())
                    || x.LastName.ToLower().Contains(searchParameter.ToLower())
                    || (x.Name + ' ' + x.LastName).ToLower().Contains(searchParameter.ToLower())
                    || (x.LastName + ' ' + x.Name).ToLower().Contains(searchParameter.ToLower())
                    || (x.Age).ToString().Contains(searchParameter.ToLower())
                    || (x.Email).ToLower().Contains(searchParameter.ToLower()));
            }
            return users;
        }
    }
}
