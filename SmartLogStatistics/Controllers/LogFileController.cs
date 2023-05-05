using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SmartLogStatistics.Model;
using SmartLogStatistics.Repository;

namespace SmartLogStatistics.Controllers
{
    public class LogFileController : Controller
    {
        private readonly SmartLogContext _context;

        public LogFileController(SmartLogContext context)
        {
            _context = context;
        }

        // GET: LogFile
        public async Task<IActionResult> Index()
        {
              return _context.File != null ? 
                          View(await _context.File.ToListAsync()) :
                          Problem("Entity set 'SmartLogContext.File'  is null.");
        }

        // GET: LogFile/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.File == null)
            {
                return NotFound();
            }

            var logFile = await _context.File
                .FirstOrDefaultAsync(m => m.id == id);
            if (logFile == null)
            {
                return NotFound();
            }

            return View(logFile);
        }

        // GET: LogFile/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: LogFile/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id,filename,PC_datetime,UPS_datetime")] LogFile logFile)
        {
            if (ModelState.IsValid)
            {
                _context.Add(logFile);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(logFile);
        }

        // GET: LogFile/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.File == null)
            {
                return NotFound();
            }

            var logFile = await _context.File.FindAsync(id);
            if (logFile == null)
            {
                return NotFound();
            }
            return View(logFile);
        }

        // POST: LogFile/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id,filename,PC_datetime,UPS_datetime")] LogFile logFile)
        {
            if (id != logFile.id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(logFile);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LogFileExists(logFile.id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(logFile);
        }

        // GET: LogFile/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.File == null)
            {
                return NotFound();
            }

            var logFile = await _context.File
                .FirstOrDefaultAsync(m => m.id == id);
            if (logFile == null)
            {
                return NotFound();
            }

            return View(logFile);
        }

        // POST: LogFile/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.File == null)
            {
                return Problem("Entity set 'SmartLogContext.File'  is null.");
            }
            var logFile = await _context.File.FindAsync(id);
            if (logFile != null)
            {
                _context.File.Remove(logFile);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool LogFileExists(int id)
        {
          return (_context.File?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
