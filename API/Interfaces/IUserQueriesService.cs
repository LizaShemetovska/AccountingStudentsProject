using API.Models;
using DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUserQueriesService
    {
        Task<User> EmailConfirmation(HttpContext httpContext);
        Task<PaginationModel> GetAllUsers(MoreParametersModel model);
        Task<User> GetUserById(string Id);
        IQueryable<AppUser> SearchUsers(string searchName);
    }
}
