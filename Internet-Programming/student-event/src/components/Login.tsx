import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStudent, getEventsByStudent } from "../services/api";
import { LoginRequest, StudentEvent } from "../types";

interface LoginPageProps {
  onEventsLoaded?: (events: StudentEvent[], studentName: string) => void;
}

// Using localStorage to pass events between Login and Events page
function LoginPage({ onEventsLoaded }: LoginPageProps) {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginRequest>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchingEvents, setFetchingEvents] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const loginResponse = await loginStudent(form);

      if (!loginResponse.success || !loginResponse.student) {
        setError(loginResponse.message || "Invalid credentials.");
        setLoading(false);
        return;
      }

      const { rollNumber, name } = loginResponse.student;

      setLoading(false);
      setFetchingEvents(true);

      // GET /api/events/student/{rollNumber}
      const events = await getEventsByStudent(rollNumber);

      // Store in sessionStorage for Events page
      sessionStorage.setItem("studentName", name);
      sessionStorage.setItem("studentRollNumber", rollNumber);
      sessionStorage.setItem("studentEvents", JSON.stringify(events));

      if (onEventsLoaded) onEventsLoaded(events, name);

      navigate("/events");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
      setFetchingEvents(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Student login form</h1>
        </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-700 max-w-md">
          {error}
        </div>
      )}

      {fetchingEvents && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700 max-w-md flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Fetching your event registrations...
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-xl p-6 max-w-md shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Email ID
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="student@college.edu"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading || fetchingEvents}
            className="w-full py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2 flex items-center justify-center gap-2"
          >
            {(loading || fetchingEvents) && (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {fetchingEvents ? "Loading Events..." : loading ? "Authenticating..." : "Login & View Events"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          New student?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  </div>
  );
}

export default LoginPage;