using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FirstNationalBank.Models
{
   public class Transaction
   {
      [Key]
      public int Id { get; set; }
      /// <summary>
      /// Foreign Key
      /// </summary>
      public int AcctId { get; set; }
      public string Type { get; set; }
      public decimal Amount { get; set; }
      public DateTime Date { get; set; }
      public string Notes { get; set; }
   }
}
