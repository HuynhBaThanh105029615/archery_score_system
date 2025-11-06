import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Banner video */}
      <div className="max-w-6xl mx-auto mt-6">
        <video
          src="/banner2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-2xl border border-gray-300 shadow-2xl object-cover"
        />
      </div>

      {/* Info cards */}
      <div className="max-w-6xl mx-auto my-12 grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-5 flex flex-col items-center">
          <img
            src="/info2.jpg"
            alt="Profile"
            className="w-full h-56 object-cover rounded-xl mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            Your Profile
          </h2>
          <p className="text-gray-600 text-center mb-5">
            Look at your recent scores and tournaments
          </p>
          <Link href="/login" className="w-full">
            <button className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 transition-all duration-300">
              Login to see your profile
            </button>
          </Link>
        </div>

        {/* Tournaments card */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-5 flex flex-col items-center">
          <img
            src="/info.jpg"
            alt="Tournaments"
            className="w-full h-56 object-cover rounded-xl mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            Tournaments
          </h2>
          <p className="text-gray-600 text-center mb-5">
            The recent tournaments that are happening right now
          </p>
          <Link href="/recorder_dashboard" className="w-full">
            <button className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 transition-all duration-300">
              Recent Tournaments
            </button>
          </Link>
        </div>

        {/* About card */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-5 flex flex-col items-center">
          <img
            src="/about.jpg"
            alt="About"
            className="w-full h-56 object-cover rounded-xl mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            About
          </h2>
          <p className="text-gray-600 text-center mb-5">
            The page that contains all the informations of this page
          </p>
          <button className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 transition-all duration-300">
            About Us
          </button>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t-4 border-black w-1/4 mx-auto my-10 rounded-full" />

      {/* Info section below divider */}
      <section className="max-w-5xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          What is ArcheryScoreHub
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-12">
          ArcheryScoreHub is a modern platform designed to help archers track their performance,
          stay updated with the latest tournaments, and connect with the archery community.
          Whether you're a beginner or a professional, it keeps your scores organized and your
          progress visible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Subsection 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Personalized Profile
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Access your personal stats, past scores, and performance insights
              — all in one organized dashboard that grows with your journey.
            </p>
          </div>

          {/* Subsection 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Live Tournament Updates
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Stay informed about upcoming and ongoing archery tournaments with real-time
              updates and live score tracking features.
            </p>
          </div>

          {/* Subsection 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Community and Growth
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with other archers, share your progress, and celebrate achievements.
              ArcheryScoreHub fosters a supportive community of competitors and friends.
            </p>
          </div>
        </div>
      </section>

      {/* Comment Section */}
      <section className="bg-white py-12 mt-5 border-t border-gray-300">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Comments
          </h2>

          {/* Comment 1 */}
          <div className="flex items-start gap-4 mb-6 bg-gray-50 p-5 rounded-xl shadow-sm">
            <img
              src="/avatar1.jpg"
              alt="User Avatar"
              className="w-12 h-12 rounded-full border border-gray-300"
            />
            <div>
              <p className="font-semibold text-gray-900">Robin Archer</p>
              <p className="text-gray-600 text-sm mt-1">
                This website is really useful! I love how simple and modern it looks. Can’t wait to
                use it for my next tournament.
              </p>
            </div>
          </div>

          {/* Comment 2 */}
          <div className="flex items-start gap-4 mb-6 bg-gray-50 p-5 rounded-xl shadow-sm">
            <img
              src="/avatar2.jpg"
              alt="User Avatar"
              className="w-12 h-12 rounded-full border border-gray-300"
            />
            <div>
              <p className="font-semibold text-gray-900">Lara Bowman</p>
              <p className="text-gray-600 text-sm mt-1">
                Clean layout and great color choice. It feels professional but not overwhelming.
              </p>
            </div>
          </div>

          {/* Comment 3 */}
          <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl shadow-sm">
            <img
              src="/avatar3.jpg"
              alt="User Avatar"
              className="w-12 h-12 rounded-full border border-gray-300"
            />
            <div>
              <p className="font-semibold text-gray-900">Daniel Marks</p>
              <p className="text-gray-600 text-sm mt-1">
                Great work! I like how all sections fit together perfectly. The interface feels very modern.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
