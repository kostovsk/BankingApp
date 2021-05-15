using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FirstNationalBank.Models
{
   public class BankAccount
   {
      [Key]
      public int Id { get; set; }
      public string Number { get; set; }
      public decimal Balance { get; set; }

   }
}
