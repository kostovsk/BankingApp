﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using FirstNationalBank.Data;
using FirstNationalBank.Models;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FirstNationalBank.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class BankAccountsController : ControllerBase
   {
      private readonly ApplicationDbContext _context;

      public BankAccountsController(ApplicationDbContext context)
      {
         _context = context;
      }

      public class WrapperForAPIRequest
      {
         public BankAccount bankAccount { get; set; }
         public Person person { get; set; }
      }

      public IList<BankAccount> accounts { get; set; }

      // GET: api/BankAccounts
      [HttpGet]
      public async Task<ActionResult<IEnumerable<Person>>> GetBankAccounts()
      {
         return await _context.Persons.ToListAsync();
      }

      // GET: api/BankAccounts/5
      [HttpGet("{id}")]
      public async Task<ActionResult<WrapperForAPIRequest>> GetBankAccount(int id)
      {
         var acct = new WrapperForAPIRequest();
         acct.person = await _context.Persons
            .SingleAsync(x => x.PersonId == id);
         acct.bankAccount = await _context.BankAccounts
            .SingleAsync(x => x.PersonId == id);

         if (acct == null)
         {
            return NotFound();
         }

         return acct;
      }

      // PUT: api/BankAccounts/5
      // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
      [HttpPut("{id}")]
      public async Task<IActionResult> PutBankAccount(int id, WrapperForAPIRequest updatedAccount)
      {
         if (id != updatedAccount.person.PersonId)
         {
            return BadRequest();
         }

         _context.Entry(updatedAccount.person).State = EntityState.Modified;
         _context.Entry(updatedAccount.bankAccount).State = EntityState.Modified;

         try
         {
            await _context.SaveChangesAsync();
         }
         catch (DbUpdateConcurrencyException)
         {
            if (!PersonExists(id))
            {
               return NotFound();
            }
            else
            {
               throw;
            }
         }

         return NoContent();
      }

      // POST: api/BankAccounts
      // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
      [HttpPost]
      public async Task<IActionResult> PostBankAccount(WrapperForAPIRequest newAccount)
      {
         var exists = await _context.Persons.Where(x => x.Email == newAccount.person.Email).FirstOrDefaultAsync();

         if (exists != null && exists.PersonId > 0)
         {
            //TODO: person for the given name, exists in DB

            //return error'
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Customer already exists in database");
         }
         else
         {
            _context.Persons.Add(newAccount.person);
            newAccount.bankAccount.PersonId = newAccount.person.PersonId;
            newAccount.person.BankAccounts = new List<BankAccount>() { };
            newAccount.person.BankAccounts.Add(newAccount.bankAccount);
            //_context.BankAccounts.Add(newAccount.bankAccount);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBankAccount", new { id = newAccount.person.PersonId }, newAccount.person);
         }
      }

      // DELETE: api/BankAccounts/5
      [HttpDelete("{id}")]
      public async Task<IActionResult> DeleteBankAccount(int id)
      {
         var person = await _context.Persons.FindAsync(id);
         if (person == null)
         {
            return NotFound();
         }

         var bankAccount = await _context.BankAccounts
            .SingleAsync(x => x.PersonId == id);
         if (bankAccount == null)
         {
            return NotFound();
         }

         var bankAccountID = bankAccount.BankAccountId;

         var transactions = _context.Transactions
            .Where(y => y.BankAccountId == bankAccountID)
            .ToListAsync();

         foreach (var item in await transactions)
         {
            _context.Transactions.Remove(item);
         }

         _context.BankAccounts.Remove(bankAccount);
         _context.Persons.Remove(person);
         await _context.SaveChangesAsync();

         return NoContent();
      }

      private bool PersonExists(int id)
      {
         return _context.Persons.Any(e => e.PersonId == id);
      }
   }
}
