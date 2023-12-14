namespace Stories.Api
{
    using Microsoft.Extensions.Caching.Memory;

    using Stories.Api.Application.CasesUses;
    using Stories.Api.Proxy.Interfaces;
    using Stories.Api.Proxy.Services;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IStoriesProxy, StoriesProxy>();
            services.AddScoped<INewStoriesApplicationProxy, NewStoriesApplicationProxy>();
            services.AddMemoryCache();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (!env.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCors(x => x
            .AllowAnyOrigin());
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
