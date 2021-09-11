using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RusadaWebAPIProject.Models;

namespace RusadaWebAPIProject.Controllers
{
    public class AircraftSightingsController : ApiController
    {
        private DatabaseEntities db = new DatabaseEntities();

        // GET: api/AircraftSightings
        public IQueryable<AircraftSighting> GetAircraftSightings()
        {
            return db.AircraftSightings;
        }

        // GET: api/AircraftSightings/5
        [ResponseType(typeof(AircraftSighting))]
        public IHttpActionResult GetAircraftSighting(int id)
        {
            AircraftSighting aircraftSighting = db.AircraftSightings.Find(id);
            if (aircraftSighting == null)
            {
                return NotFound();
            }

            return Ok(aircraftSighting);
        }

        // PUT: api/AircraftSightings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAircraftSighting(int id, AircraftSighting aircraftSighting)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != aircraftSighting.SightingId)
            {
                return BadRequest();
            }

            db.Entry(aircraftSighting).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AircraftSightingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/AircraftSightings
        [ResponseType(typeof(AircraftSighting))]
        public IHttpActionResult PostAircraftSighting(AircraftSighting aircraftSighting)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AircraftSightings.Add(aircraftSighting);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = aircraftSighting.SightingId }, aircraftSighting);
        }

        // DELETE: api/AircraftSightings/5
        [ResponseType(typeof(AircraftSighting))]
        public IHttpActionResult DeleteAircraftSighting(int id)
        {
            AircraftSighting aircraftSighting = db.AircraftSightings.Find(id);
            if (aircraftSighting == null)
            {
                return NotFound();
            }

            db.AircraftSightings.Remove(aircraftSighting);
            db.SaveChanges();

            return Ok(aircraftSighting);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AircraftSightingExists(int id)
        {
            return db.AircraftSightings.Count(e => e.SightingId == id) > 0;
        }
    }
}