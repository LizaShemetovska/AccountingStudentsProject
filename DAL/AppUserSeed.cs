using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entities;
namespace DAL
{
   public class AppUserSeed
    {
        public static async Task SeedUserData(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                       
                        UserName="Svitlana",
                        LastName = "Gordovich",
                        Age=18,
                        Email="svitlana@gmail.com",
                        RegisteredDate=DateTime.UtcNow,
                        StudyDate=DateTime.UtcNow,
                    },
                    new AppUser
                    {
                        
                        UserName="Ihor",
                        LastName = "Coloma",
                        Age=24,
                        Email="ihor@gmail.com",
                        RegisteredDate=DateTime.UtcNow,
                        StudyDate=DateTime.UtcNow,
                    },
                     new AppUser
                    {
                       
                        UserName="Alisa",
                        LastName = "Bibko",
                        Age=14,
                        Email="alisa@gmail.com",
                        RegisteredDate=DateTime.UtcNow,
                        StudyDate=DateTime.UtcNow,
                    }
                };

                foreach (var user in users)
                {
                    var successCreate = await userManager.CreateAsync(user, "Qwerty12345@");
                    if (successCreate.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, "user");
                    }
                }
            }
        }
    }
}
