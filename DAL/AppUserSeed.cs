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

                        Name="Svitlana",
                        LastName = "Gordovich",
                        Age=18,
                        Email="svitlana@gmail.com",
                        RegisteredDate=DateTime.UtcNow,
                        StudyDate=DateTime.UtcNow,
                        UserName="svitlana@gmail.com",
                        EmailConfirmed=true,
                    },
                    new AppUser
                    {

                        Name="Ihor",
                        LastName = "Coloma",
                        Age=24,
                        Email="ihor@gmail.com",
                        RegisteredDate=DateTime.UtcNow,
                        StudyDate=DateTime.UtcNow,
                        UserName="ihor@gmail.com",
                          EmailConfirmed=true,
                    },
                     new AppUser
                    {

                        Name="Alisa",
                        LastName = "Bibko",
                        Age=14,
                        Email="alisa@gmail.com",
                        RegisteredDate=DateTime.UtcNow,
                        StudyDate=DateTime.UtcNow,
                        UserName="alisa@gmail.com",
                          EmailConfirmed=true,
                    }
                };
                var userAdmin = new AppUser
                {
                    Name = "Admin",
                    LastName = "Admin",
                    Email = "admin@studacc.com",
                    UserName = "admin@studacc.com",
                    Age = 20,
                    RegisteredDate = DateTime.UtcNow,
                    EmailConfirmed = true,
                };
               
                var adminSuccessCreate = await userManager.CreateAsync(userAdmin, "Admin12345@");
                if (adminSuccessCreate.Succeeded)
                {
                    await userManager.AddToRoleAsync(userAdmin, "admin");
                }
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
