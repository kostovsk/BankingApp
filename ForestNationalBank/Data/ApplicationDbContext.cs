using ForestNationalBank.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForestNationalBank.Data
{
   public class ApplicationDbContext : DbContext
   {
      public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
      {
      }

      public DbSet<BankAccount> BankAccounts { get; set; }
      public DbSet<Person> Persons { get; set; }
      public DbSet<Transaction> Transactions { get; set; }

   }
}
