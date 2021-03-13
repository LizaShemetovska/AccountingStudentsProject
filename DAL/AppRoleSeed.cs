using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using DAL.Entities;
namespace DAL
{
    public class AppRoleSeed
    {
        public static async Task SeedRoleData(RoleManager<AppRole> roleManager)
        {
            if (!roleManager.Roles.Any())
            {
                var roles = new List<AppRole>
                {
                    new AppRole
                    {
                        Name = "admin",
                    },
                   new AppRole
                    {
                        Name = "user",
                    },
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }
            }
           
        }
    }
}
