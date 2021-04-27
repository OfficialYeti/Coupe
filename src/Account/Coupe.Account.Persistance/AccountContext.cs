using Microsoft.EntityFrameworkCore;

namespace Coupe.Account.Persistance
{
	public class AccountContext : DbContext
	{
		public AccountContext(DbContextOptions<AccountContext> options)
				: base(options)
		{
		}

		protected override void OnConfiguring(DbContextOptionsBuilder options)
			=> options.UseNpgsql("Host=localhost; Database=coupedb; Username=postgres; Password=docker");

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.HasDefaultSchema("acc");
			modelBuilder.Entity<UserEntity>().ToTable("Users").HasKey(x => x.Id);
			modelBuilder.Entity<UserEntity>().Property(x => x.NameIdentifier).IsRequired();
			modelBuilder.Entity<UserEntity>().Property(x => x.Login).IsRequired();
			modelBuilder.Entity<UserEntity>().HasIndex(x => x.Login).IsUnique();
			modelBuilder.Entity<UserEntity>().HasIndex(x => x.NameIdentifier).IsUnique();
		}

		public DbSet<UserEntity> Users { get; set; }
	}
}
