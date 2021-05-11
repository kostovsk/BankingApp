using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstNationalBank.Models
{
   public class Transaction
   {
      public int Id { get; set; }
      public int Acct_Id { get; set; }
      public decimal Amount { get; set; }
      public DateTime Date { get; set; }
      public string Notes { get; set; }
   }
}
