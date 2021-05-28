using Microsoft.EntityFrameworkCore;
using FirstNationalBank.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            .HasOne(p => p.Person)
            .WithMany(b => b.BankAccounts);
      }

   }

}
