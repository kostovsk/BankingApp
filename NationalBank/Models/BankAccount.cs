using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NationalBank.Models
{
   public class BankAccount
   {
      public string Number { get; set; }
      public Person Owner { get; set; }
      public List<Transaction> allTransactions { get; set; }
      public decimal Balance {
         get 
         {
            decimal balance = 0;
            foreach(var item in allTransactions)
            {
               balance += item.Amount;
            }

            return balance;
         }
      }

      //TODO make a deposit method
      public void MakeDeposit(decimal amount, DateTime date, string note)
      {
         if (amount <= 0)
         {
            throw new ArgumentOutOfRangeException(nameof(amount), "Amount of deposit must be positive");
         }

         var deposit = new Transaction(amount, date, note);
         allTransactions.Add(deposit);
      }

      //TODO make a withdrawal method
      public void MakeWithdrawal(decimal amount, DateTime date, string note)
      {
         if (amount <= 0)
         {
            throw new ArgumentOutOfRangeException(nameof(amount), "Amount of withdrawal must be positive");
         }
         if (Balance - amount < 0)
         {
            throw new InvalidOperationException("Not sufficient funds for this withdrawal");
         }

         var withdrawal = new Transaction(-amount, date, note);
         allTransactions.Add(withdrawal);
      }

      //TODO get transaction history method


   }
}
