using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FirstNationalBank.Data;
using FirstNationalBank.Models;

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
      public async Task<ActionResult<IEnumerable<BankAccount>>> GetBankAccounts()
      {
         return await _context.BankAccounts.ToListAsync();
      }

      // GET: api/BankAccounts/5
      [HttpGet("{id}")]
      public async Task<ActionResult<WrapperForAPIRequest>> GetBankAccount(int id)
      {
         var acct = new WrapperForAPIRequest();

         acct.bankAccount = await _context.BankAccounts.FindAsync(id);

         acct.person = _context.Persons
            .Single(x => x.Acct_Id == id);

         if (acct == null)
         {
            return NotFound();
         }

         return acct;
      }

      // PUT: api/BankAccounts/5
      // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
      [HttpPut("{id}")]
      public async Task<IActionResult> PutBankAccount(int id, BankAccount bankAccount)
      {
         if (id != bankAccount.Id)
         {
            return BadRequest();
         }

         _context.Entry(bankAccount).State = EntityState.Modified;

         try
         {
            await _context.SaveChangesAsync();
         }
         catch (DbUpdateConcurrencyException)
         {
            if (!BankAccountExists(id))
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
      public async Task<ActionResult<BankAccount>> PostBankAccount(WrapperForAPIRequest newAccount)
      {
         _context.BankAccounts.Add(newAccount.bankAccount);
         await _context.SaveChangesAsync();

         accounts = await _context.BankAccounts.ToListAsync();

         int id = 0;

         foreach (var item in accounts)
         {
            if (string.Equals(item.Number, newAccount.bankAccount.Number))
            {
               id = item.Id;
            }
         }
         // TODO add account id to person

         Guid obj = Guid.NewGuid();
         var something = obj;

         if (id != 0 || accounts.Count == 1)
         {
            newAccount.person.Acct_Id = id;

            _context.Persons.Add(newAccount.person);
            await _context.SaveChangesAsync();
         }
         
         return CreatedAtAction("GetBankAccount", new { id = newAccount.bankAccount.Id }, newAccount.bankAccount);
      }

      // DELETE: api/BankAccounts/5
      [HttpDelete("{id}")]
      public async Task<IActionResult> DeleteBankAccount(int id)
      {
         var bankAccount = await _context.BankAccounts.FindAsync(id);
         if (bankAccount == null)
         {
            return NotFound();
         }

         _context.BankAccounts.Remove(bankAccount);
         await _context.SaveChangesAsync();

         return NoContent();
      }

      private bool BankAccountExists(int id)
      {
         return _context.BankAccounts.Any(e => e.Id == id);
      }
   }
}
