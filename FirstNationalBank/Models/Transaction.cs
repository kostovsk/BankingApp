using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstNationalBank.Models
{
   public class Transaction
   {
      public decimal Amount { get; set; }
      public DateTime Date { get; set; }
      public string Notes { get; set; }

      public Transaction(decimal amount, DateTime date, string note)
      {
         this.Amount = amount;
         this.Date = date;
         this.Notes = note;
      }
   }
}
