using System.Collections.Generic;
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
            acct.bankAccount = await _context.BankAccounts
               .SingleAsync(x => x.BankAccountId == id);

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
            if (id != bankAccount.BankAccountId)
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
                await _context.SaveChangesAsync();



                return CreatedAtAction("GetBankAccount", new { id = newAccount.bankAccount.BankAccountId }, newAccount.bankAccount);

            }

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
            return _context.BankAccounts.Any(e => e.BankAccountId == id);
        }
    }
}
