import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rollNumber: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("http://localhost:8080/students/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Registration Successful!");
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f5ef]">
      <div className="pointer-events-none absolute -top-24 right-10 h-64 w-64 rounded-full bg-black/5 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-black/5 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4 py-12">
        <section className="card w-full max-w-2xl p-8 text-center animate-fade-up">
          <div className="section-pill mb-6 justify-center">Event Hub</div>
          <h1 className="heading-display text-3xl font-bold text-gray-900">
            A clean, modern way to join campus events
          </h1>
          <p className="mt-3 text-gray-600">
            Register once and keep everything in one place. Calm, focused, and
            designed for quick access.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="stat-tile border-amber-100 bg-amber-50/70">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                Avg setup
              </p>
              <p className="text-2xl font-bold text-gray-900">2 min</p>
            </div>
            <div className="stat-tile border-emerald-100 bg-emerald-50/70">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Event updates
              </p>
              <p className="text-2xl font-bold text-gray-900">Instant</p>
            </div>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>Personalized schedule in seconds</li>
            <li>One login across all departments</li>
            <li>Smart reminders before sessions</li>
          </ul>

          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-gray-600">
            <span>Already registered?</span>
            <Link
              to="/login"
              className="font-semibold text-gray-900 hover:text-black"
            >
              Login
            </Link>
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="card w-full max-w-md p-8 text-center animate-fade-up-delay"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Create your account
            </h2>
            <p className="text-sm text-gray-500">
              Use your college email to get started.
            </p>
          </div>

          <label className="text-sm font-semibold text-gray-700">
            Roll Number
          </label>
          <input
            name="rollNumber"
            placeholder="e.g. 23IT105"
            className="input"
            onChange={handleChange}
          />

          <label className="text-sm font-semibold text-gray-700">Name</label>
          <input
            name="name"
            placeholder="Your full name"
            className="input"
            onChange={handleChange}
          />

          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            name="email"
            placeholder="name@college.edu"
            className="input"
            onChange={handleChange}
          />

          <label className="text-sm font-semibold text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Create a strong password"
            className="input"
            onChange={handleChange}
          />

          <button type="submit" className="btn-primary mt-2 bg-amber-600 hover:bg-amber-700">
            Register
          </button>
          <p className="mt-4 text-xs text-gray-500">
            By registering, you agree to campus event guidelines.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
