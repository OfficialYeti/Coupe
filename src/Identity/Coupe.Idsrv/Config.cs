using IdentityModel;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace Coupe.Idsrv
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
            };
        }

        public static IEnumerable<ApiScope> GetApiScopes()
        {
            return new List<ApiScope>
            {
                new ApiScope{ Name= "api.scope", UserClaims= { JwtClaimTypes.Name } },
            };
        }

        public static IEnumerable<ApiResource> GetApis()
        {
            return new List<ApiResource>
            {
                new ApiResource("api", "Display name of api")
                {
                    ApiSecrets = { new Secret("secret".Sha256()) },
                    UserClaims = {JwtClaimTypes.Name},
                    Scopes = {"api.scope"}
                }
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "interactive.public",
                    ClientName = "Interactive client (Code with PKCE)",

                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    AllowedScopes = { "openid", "profile", "email", "api.scope" },

                    RedirectUris = { "http://localhost:4200/signin-callback", "http://localhost:4200/assets/scripts/silent-token-renew.html" },
                    PostLogoutRedirectUris = { "http://localhost:4200/signout-callback" },
                    AllowedCorsOrigins = { "http://localhost:4200" },

                    RequireClientSecret = false,
                    RequireConsent = false,
                    AllowOfflineAccess = true,
                    AllowAccessTokensViaBrowser = true,
                },
            };
        }
    }
}