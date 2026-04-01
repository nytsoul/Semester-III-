import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentEvent } from "../types";

const ACCENT_COLORS = [
  { border: "border-l-blue-500", bg: "bg-blue-50", badge: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
  { border: "border-l-emerald-500", bg: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
  { border: "border-l-amber-500", bg: "bg-amber-50", badge: "bg-amber-100 text-amber-800", dot: "bg-amber-500" },
  { border: "border-l-rose-500", bg: "bg-rose-50", badge: "bg-rose-100 text-rose-800", dot: "bg-rose-500" },
  { border: "border-l-violet-500", bg: "bg-violet-50", badge: "bg-violet-100 text-violet-800", dot: "bg-violet-500" },
  { border: "border-l-cyan-500", bg: "bg-cyan-50", badge: "bg-cyan-100 text-cyan-800", dot: "bg-cyan-500" },
];

function EventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<StudentEvent[]>([]);
  const [studentName, setStudentName] = useState<string>("");
  const [rollNumber, setRollNumber] = useState<string>("");

  useEffect(() => {
    const storedEvents = sessionStorage.getItem("studentEvents");
    const storedName = sessionStorage.getItem("studentName");
    const storedRoll = sessionStorage.getItem("studentRollNumber");

    if (storedEvents) setEvents(JSON.parse(storedEvents));
    if (storedName) setStudentName(storedName);
    if (storedRoll) setRollNumber(storedRoll);
  }, []);

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!studentName) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Student Events</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm mb-4">Please login to view your event registrations</p>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Event Participation</h1>
            <p className="text-sm text-gray-500 mt-1">
              GET{" "}
              <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                /api/events/student/{rollNumber}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1.5">
            <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-xs font-semibold text-blue-800">
              {studentName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-blue-800">{studentName}</span>
            <span className="text-xs text-blue-500 font-mono">#{rollNumber}</span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-4 flex items-center gap-4">
          <div className="bg-white border border-gray-100 rounded-lg px-4 py-2 flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-900">{events.length}</span>
            <span className="text-xs text-gray-500">Events<br />Registered</span>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No events registered yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, index) => {
            const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
            return (
              <div
                key={index}
                className={`bg-white border border-gray-100 border-l-4 ${accent.border} rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden`}
              >
                {/* Card Header */}
                <div className={`${accent.bg} px-4 py-3 border-b border-gray-100`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${accent.dot}`}></div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${accent.badge}`}>
                      {event.eventId}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mt-2 leading-tight">
                    {event.eventName}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="px-4 py-3 space-y-2">
                  {/* Student Name */}
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span className="font-medium text-gray-700">{event.studentName}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {event.eventLocation}
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    {formatDate(event.eventDate)}
                  </div>

                  {/* Description */}
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500 leading-relaxed">{event.eventDescription || "No description available"}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default EventsPage;