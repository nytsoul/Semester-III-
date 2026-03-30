import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/students/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.rollNumber) {
      localStorage.setItem("rollNumber", data.rollNumber);
      navigate("/events");
    } else {
      alert("Invalid Login");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f5ef]">
      <div className="pointer-events-none absolute -top-16 left-8 h-64 w-64 rounded-full bg-black/5 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-black/5 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4 py-12">
        <form
          onSubmit={handleLogin}
          className="card w-full max-w-md p-8 text-center animate-fade-up"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
            <p className="text-sm text-gray-500">
              Login to view your personalized event dashboard.
            </p>
          </div>

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
            placeholder="Your password"
            className="input"
            onChange={handleChange}
          />

          <button type="submit" className="btn-primary mt-2 bg-emerald-600 hover:bg-emerald-700">
            Login
          </button>
          <button type="button" className="btn-secondary mt-3">
            Continue with college ID
          </button>

          <div className="mt-6 text-sm text-gray-600">
            New here?{" "}
            <Link
              to="/"
              className="font-semibold text-gray-900 hover:text-black"
            >
              Create an account
            </Link>
          </div>
        </form>

        <section className="card w-full max-w-2xl p-8 text-center animate-fade-up-delay">
          <div className="section-pill mb-6 justify-center">Student Events</div>
          <h1 className="heading-display text-3xl font-bold text-gray-900">
            Your schedule, one place
          </h1>
          <p className="mt-3 text-gray-600">
            Track workshops, seminars, and competitions. Stay prepared with
            real-time updates.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="stat-tile border-indigo-100 bg-indigo-50/70">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                Upcoming
              </p>
              <p className="text-2xl font-bold text-gray-900">12 events</p>
            </div>
            <div className="stat-tile border-rose-100 bg-rose-50/70">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">
                Checked in
              </p>
              <p className="text-2xl font-bold text-gray-900">7 sessions</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-black/5 bg-white p-4 text-sm text-gray-600">
            Next event: AI Research Talk - Hall B, 4:00 PM
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
