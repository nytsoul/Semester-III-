import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              🎓 StudentEvents
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-6">
            Discover & Manage Student Events
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Stay connected with campus events. Register for activities, track your participation, and make the most of your college experience.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
          >
            Get Started Now
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
          >
            Sign In
          </button>
        </div>

        
      </section>

      {/* Calendar Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Upcoming Events Calendar</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Calendar Widget */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 hover:bg-gray-100 rounded">←</button>
                    <button className="px-3 py-1 hover:bg-gray-100 rounded">→</button>
                  </div>
                </div>

                {/* Weekdays Header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center font-bold text-gray-600 text-sm py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {[
                    ...Array(5).fill(null),
                    ...Array(30).fill(null).map((_, i) => i + 1),
                    ...Array(2).fill(null),
                  ].map((day, index) => {
                    const hasEvent = [5, 12, 18, 23, 28].includes(day);
                    return (
                      <div
                        key={index}
                        className={`aspect-square flex items-center justify-center rounded-lg text-sm font-semibold transition ${
                          day === null
                            ? 'bg-transparent'
                            : hasEvent
                            ? 'bg-blue-600 text-white cursor-pointer hover:bg-blue-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>

                <p className="text-sm text-gray-600 mt-6 text-center">
                  <span className="inline-block w-3 h-3 bg-blue-600 rounded mr-2"></span>
                  Events scheduled on highlighted dates
                </p>
              </div>
            </div>

            {/* Upcoming Events List */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Next Events</h3>
              <div className="space-y-4">
                {[
                  { date: 'Apr 5', title: 'Tech Workshop', icon: '💻' },
                  { date: 'Apr 12', title: 'Sports Day', icon: '⚽' },
                  { date: 'Apr 18', title: 'Cultural Fest', icon: '🎭' },
                  { date: 'Apr 23', title: 'Coding Contest', icon: '💡' },
                  { date: 'Apr 28', title: 'Career Fair', icon: '💼' },
                ].map((event, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 hover:bg-blue-50 rounded-lg transition cursor-pointer">
                    <div className="text-2xl">{event.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{event.date}</p>
                      <p className="font-semibold text-gray-800">{event.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Next Event?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of students already using StudentEvents to build amazing campus memories.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            Start Exploring Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">StudentEvents</h3>
              <p className="text-sm">Your gateway to amazing campus experiences.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-white text-left w-full">Features</button></li>
                <li><button className="hover:text-white text-left w-full">Pricing</button></li>
                <li><button className="hover:text-white text-left w-full">Security</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-white text-left w-full">About</button></li>
                <li><button className="hover:text-white text-left w-full">Blog</button></li>
                <li><button className="hover:text-white text-left w-full">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-white text-left w-full">Privacy</button></li>
                <li><button className="hover:text-white text-left w-full">Terms</button></li>
                <li><button className="hover:text-white text-left w-full">Cookies</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 StudentEvents. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
