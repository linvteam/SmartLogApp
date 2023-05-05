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
    public class FirmwareController : Controller
    {
        private readonly SmartLogContext _context;

        public FirmwareController(SmartLogContext context)
        {
            _context = context;
        }

        // GET: Firmware
        public async Task<IActionResult> Index()
        {
            var smartLogContext = _context.Firmware.Include(f => f.LogFile);
            return View(await smartLogContext.ToListAsync());
        }

        // GET: Firmware/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Firmware == null)
            {
                return NotFound();
            }

            var firmware = await _context.Firmware
                .Include(f => f.LogFile)
                .FirstOrDefaultAsync(m => m.file_id == id);
            if (firmware == null)
            {
                return NotFound();
            }

            return View(firmware);
        }

        // GET: Firmware/Create
        public IActionResult Create()
        {
            ViewData["file_id"] = new SelectList(_context.File, "id", "id");
            return View();
        }

        // POST: Firmware/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("file_id,unit,subunit,INI_file_name")] Firmware firmware)
        {
            if (ModelState.IsValid)
            {
                _context.Add(firmware);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["file_id"] = new SelectList(_context.File, "id", "id", firmware.file_id);
            return View(firmware);
        }

        // GET: Firmware/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Firmware == null)
            {
                return NotFound();
            }

            var firmware = await _context.Firmware.FindAsync(id);
            if (firmware == null)
            {
                return NotFound();
            }
            ViewData["file_id"] = new SelectList(_context.File, "id", "id", firmware.file_id);
            return View(firmware);
        }

        // POST: Firmware/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("file_id,unit,subunit,INI_file_name")] Firmware firmware)
        {
            if (id != firmware.file_id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(firmware);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FirmwareExists(firmware.file_id))
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
            ViewData["file_id"] = new SelectList(_context.File, "id", "id", firmware.file_id);
            return View(firmware);
        }

        // GET: Firmware/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Firmware == null)
            {
                return NotFound();
            }

            var firmware = await _context.Firmware
                .Include(f => f.LogFile)
                .FirstOrDefaultAsync(m => m.file_id == id);
            if (firmware == null)
            {
                return NotFound();
            }

            return View(firmware);
        }

        // POST: Firmware/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Firmware == null)
            {
                return Problem("Entity set 'SmartLogContext.Firmware'  is null.");
            }
            var firmware = await _context.Firmware.FindAsync(id);
            if (firmware != null)
            {
                _context.Firmware.Remove(firmware);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool FirmwareExists(int id)
        {
          return (_context.Firmware?.Any(e => e.file_id == id)).GetValueOrDefault();
        }
    }
}
