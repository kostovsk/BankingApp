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
   }
}
