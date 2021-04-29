using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstNationalBank.Models
{
   public class Person
   {
      public string Name { get; set; }
      public string Address { get; set; }
      public string Phone { get; set; }
      public string Email { get; set; }
      public string Password { get; set; }

      public Person(string name, string address, string phone, string email, string password)
      {
         this.Name = name;
         this.Address = address;
         this.Phone = phone;
         this.Email = email;
         this.Password = password;
      }
   }
}
