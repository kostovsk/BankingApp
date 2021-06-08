using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace FirstNationalBank.Controllers
{
   public class EditController : Controller
   {
      public IActionResult EditAccount()
      {
         return View();
      }
   }
}
