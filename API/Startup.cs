using DAL;
using DAL.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using FluentValidation.AspNetCore;
using API.Models;
using API.Interfaces;
using API.Commands;
using API.Services;
using API.Queries;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("HCStudents")));

            services.AddMvc().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<LoginPageValidator>());

            services.AddControllers();


            var builder = services.AddIdentity<AppUser, AppRole>(options =>
             {
                 options.User.RequireUniqueEmail = true;
             });
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.RoleType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            identityBuilder.AddDefaultTokenProviders();
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my-super-secret-key"));
            services.AddAuthentication(x => { 
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateLifetime = true,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                };
            });

            services.AddScoped<IUserCommandService, UserCommandService>();
            services.AddScoped<IUserQueriesService,UserQueriesService>();
            services.AddScoped<IJwtToken, JwtToken>();
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddSpaStaticFiles(configuration =>
            {
               configuration.RootPath = "client-app/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseSpa(spa =>
            {
               spa.Options.SourcePath = "client-app";

               if (env.IsDevelopment())
               {
                   spa.UseReactDevelopmentServer(npmScript: "start");
               }
            });
        }
    }
}
