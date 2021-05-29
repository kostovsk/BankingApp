using FirstNationalBank.Models;

using Microsoft.EntityFrameworkCore;

namespace FirstNationalBank.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<BankAccount> BankAccounts { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BankAccount>()
                .HasMany(p => p.Transactions)
                .WithOne()
                .HasForeignKey(t => t.BankAccountId);

            modelBuilder.Entity<Person>()
                .HasMany<BankAccount>(p => p.BankAccounts)
                .WithOne()
                .HasForeignKey(b => b.PersonId);




        }

    }

}
