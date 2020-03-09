using System.Collections.Generic;
using americano_tournaments.api.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace americano_tournaments.api {
    public class Startup {
        public static string[] AllowedOrigins { get; private set; }
        public static string DbConnectionString { get; private set; }
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
            var allowedOrigins = configuration.GetSection ("AllowedOrigins");
            AllowedOrigins = allowedOrigins.Value.Split (";");
            DbConnectionString = configuration.GetConnectionString ("DbConnectionString");
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public void ConfigureServices (IServiceCollection services) {
            services.AddCors (options => {
                options.AddPolicy (MyAllowSpecificOrigins,
                    builder => {
                        builder.WithOrigins (AllowedOrigins);
                        builder.AllowAnyHeader ();
                        builder.AllowAnyMethod ();
                        builder.AllowCredentials ();

                    });
            });

            services.AddControllersWithViews ();

            services.AddSignalR ();

            // In production, the React files will be served from this directory
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            }
            app.UseCors (MyAllowSpecificOrigins);
            app.UseHttpsRedirection ();

            app.UseRouting ();

            var webSocketOptions = new WebSocketOptions () {
                // KeepAliveInterval = TimeSpan.FromSeconds(120),
                ReceiveBufferSize = 4 * 1024
            };

            app.UseWebSockets (webSocketOptions);

            app.UseEndpoints (endpoints => {
                endpoints.MapControllerRoute (
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");

                endpoints.MapHub<WebSocketTestHub> ("/ws");
            });

        }

    }
}