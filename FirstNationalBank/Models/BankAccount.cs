using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FirstNationalBank.Models
{
    public class BankAccount
    {
        [Key]
        public int BankAccountId { get; set; }
        /// <summary>
        /// Foreign Key
        /// </summary>
        public int PersonId { get; set; }
        public string Number { get; set; }
        public string Type { get; set; }
        public decimal Balance { get; set; }

        public Person Person { get; set; }
        public List<Transaction> Transactions { get; set; }

    }
}
