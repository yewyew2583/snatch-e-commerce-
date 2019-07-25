using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(HotDeals.Startup))]
namespace HotDeals
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
