using IdentityServer4.Events;
using IdentityServer4.Extensions;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Coupe.Idsrv.Controllers
{
    public class AccessController : Controller
    {
        private readonly IIdentityServerInteractionService _interaction;
        private readonly IEventService _events;

        public AccessController(
            IEventService events,
            IIdentityServerInteractionService interaction)
        {
            _events = events;
            _interaction = interaction;
        }

        public IActionResult LoginGoogle(string returnUrl)
        {
            return RedirectToAction("Challenge", "Provider", new { provider = "google", returnUrl });
        }

        public async Task<IActionResult> Logout(string logoutId)
        {
            var logout = await _interaction.GetLogoutContextAsync(logoutId);

            if (User?.Identity.IsAuthenticated == true)
            {
                await HttpContext.SignOutAsync();

                await _events.RaiseAsync(new UserLogoutSuccessEvent(User.GetSubjectId(), User.GetDisplayName()));
            }

            return Redirect(logout.PostLogoutRedirectUri);
        }
    }
}
