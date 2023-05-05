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
    public class LogController : Controller
    {
        private readonly SmartLogContext _context;

        public LogController(SmartLogContext context)
        {
            _context = context;
        }

        // GET: Log
        public async Task<IActionResult> Index()
        {
            var smartLogContext = _context.Log.Include(l => l.Event).Include(l => l.LogFile);
            return View(await smartLogContext.ToListAsync());
        }

        // GET: Log/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Log == null)
            {
                return NotFound();
            }

            var log = await _context.Log
                .Include(l => l.Event)
                .Include(l => l.LogFile)
                .FirstOrDefaultAsync(m => m.file_id == id);
            if (log == null)
            {
                return NotFound();
            }

            return View(log);
        }

        // GET: Log/Create
        public IActionResult Create()
        {
            ViewData["code"] = new SelectList(_context.Event, "code", "code");
            ViewData["file_id"] = new SelectList(_context.File, "id", "id");
            return View();
        }

        // POST: Log/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("file_id,log_line,date,time,code,value")] Log log)
        {
            if (ModelState.IsValid)
            {
                _context.Add(log);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["code"] = new SelectList(_context.Event, "code", "code", log.code);
            ViewData["file_id"] = new SelectList(_context.File, "id", "id", log.file_id);
            return View(log);
        }

        // GET: Log/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Log == null)
            {
                return NotFound();
            }

            var log = await _context.Log.FindAsync(id);
            if (log == null)
            {
                return NotFound();
            }
            ViewData["code"] = new SelectList(_context.Event, "code", "code", log.code);
            ViewData["file_id"] = new SelectList(_context.File, "id", "id", log.file_id);
            return View(log);
        }

        // POST: Log/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("file_id,log_line,date,time,code,value")] Log log)
        {
            if (id != log.file_id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(log);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LogExists(log.file_id))
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
            ViewData["code"] = new SelectList(_context.Event, "code", "code", log.code);
            ViewData["file_id"] = new SelectList(_context.File, "id", "id", log.file_id);
            return View(log);
        }

        // GET: Log/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Log == null)
            {
                return NotFound();
            }

            var log = await _context.Log
                .Include(l => l.Event)
                .Include(l => l.LogFile)
                .FirstOrDefaultAsync(m => m.file_id == id);
            if (log == null)
            {
                return NotFound();
            }

            return View(log);
        }

        // POST: Log/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Log == null)
            {
                return Problem("Entity set 'SmartLogContext.Log'  is null.");
            }
            var log = await _context.Log.FindAsync(id);
            if (log != null)
            {
                _context.Log.Remove(log);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool LogExists(int id)
        {
          return (_context.Log?.Any(e => e.file_id == id)).GetValueOrDefault();
        }
    }
}
