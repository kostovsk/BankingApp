using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FirstNationalBank.Models
{
    public class Person
    {
        [Key]
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        /// <summary>
        /// Stands for mother's maiden name
        /// </summary>
        public string MMN { get; set; }
        public string Password { get; set; }

        public List<BankAccount> BankAccounts { get; set; }
    }
}
