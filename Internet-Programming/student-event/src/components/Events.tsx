import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type EventItem = {
  eventName: string;
  studentName: string;
};

function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const rollNumber = localStorage.getItem("rollNumber");

  useEffect(() => {
    if (!rollNumber) {
      return;
    }

    fetch(`http://localhost:8081/events/${rollNumber}`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(() => setEvents([]));
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f5ef]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex flex-col items-center gap-4 rounded-2xl border border-black/5 bg-white p-6 text-center shadow-[0_20px_50px_-40px_rgba(0,0,0,0.55)]">
          <div>
            <div className="section-pill mb-2 justify-center">Student Events</div>
            <h2 className="heading-display text-3xl font-bold text-gray-900">
              Your personalized schedule
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Roll number: {rollNumber || "Not logged in"}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="stat-tile border-sky-100 bg-sky-50/70 text-center">
              <p className="text-xs text-sky-700">Total events</p>
              <p className="text-xl font-bold text-gray-900">{events.length}</p>
            </div>
            <Link
              to="/login"
              className="btn-secondary !w-auto px-6"
            >
              Switch account
            </Link>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="card p-6 text-center animate-fade-up">
            <p className="text-lg font-semibold text-gray-800">
              No events found
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Check back later or contact the coordinator for upcoming sessions.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <div
                key={`${event.eventName}-${index}`}
                className="card p-5 text-center animate-fade-up"
              >
                <div className="section-pill mb-4 justify-center">Upcoming</div>
                <h3 className="text-lg font-bold text-gray-900">
                  {event.eventName}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Registered by {event.studentName}
                </p>
                <div className="mt-4 rounded-xl border border-black/5 bg-white p-3 text-xs text-gray-600">
                  Venue details will appear 24 hours before the event.
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
