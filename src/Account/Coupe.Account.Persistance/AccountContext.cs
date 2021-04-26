using Microsoft.EntityFrameworkCore;

namespace Coupe.Account.Persistance
{
    public class AccountContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.HasDefaultSchema("acc");
        }
    }
}
