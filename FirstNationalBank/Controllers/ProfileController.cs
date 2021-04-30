using FirstNationalBank.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace FirstNationalBank.Controllers
{
   public class ProfileController : Controller
   {
      public IActionResult ProfilePage()
      {
         return View();
      }
   }
}
