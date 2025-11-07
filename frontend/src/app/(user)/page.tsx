import { CommentCard } from "@/src/component/commentcard";
import { InfoCard } from "@/src/component/infocard"
import { FeatureCard } from "@/src/component/featurecard";

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
        <InfoCard
          image="/info2.jpg"
          alt="Profile"
          title="Your Profile"
          description="Look at your recent scores and tournaments"
          buttonText="Login to see your profile"
          href="/profile"
        />

        <InfoCard
          image="/info.jpg"
          alt="Tournaments"
          title="Tournaments"
          description="The recent tournaments that are happening right now"
          buttonText="Recent Tournaments"
          href="/"
        />

        <InfoCard
          image="/about.jpg"
          alt="About"
          title="About"
          description="The page that contains all the informations of this page"
          buttonText="About Us"
        />
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
          <FeatureCard
            title="Personalized Profile"
            description="Access your personal stats, past scores, and performance insights — all in one organized dashboard that grows with your journey."
          />

          <FeatureCard
            title="Live Tournament Updates"
            description="Stay informed about upcoming and ongoing archery tournaments with real-time updates and live score tracking features."
          />

          <FeatureCard
            title="Community and Growth"
            description="Connect with other archers, share your progress, and celebrate achievements. ArcheryScoreHub fosters a supportive community of competitors and friends."
          />
        </div>
      </section>

      {/* Comment Section */}
      <section className="bg-white py-12 mt-5 border-t border-gray-300">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Comments
          </h2>

        <CommentCard
          avatar="/avatar1.jpg"
          alt="User Avatar"
          name="Robin Archer"
          message="This website is really useful! I love how simple and modern it looks. Can’t wait to use it for my next tournament."
        />

        <CommentCard
          avatar="/avatar2.jpg"
          alt="User Avatar"
          name="Lara Bowman"
          message="Clean layout and great color choice. It feels professional but not overwhelming."
        />

        <CommentCard
          avatar="/avatar3.jpg"
          alt="User Avatar"
          name="Daniel Marks"
          message="Great work! I like how all sections fit together perfectly. The interface feels very modern."
        />
        </div>
      </section>
    </>
  );
}
