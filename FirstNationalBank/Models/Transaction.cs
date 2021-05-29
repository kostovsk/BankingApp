using System;
using System.ComponentModel.DataAnnotations;

namespace FirstNationalBank.Models
{
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }
        /// <summary>
        /// Foreign Key
        /// </summary>
        public int BankAccountId { get; set; }
        public string Type { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Notes { get; set; }
    }
}
