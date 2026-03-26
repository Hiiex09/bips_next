import profile1 from "../public/Teacher 7.png";
import profile2 from "../public/Teacher 8.png";

export default function Officials() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-black text-primary mb-6">
            Your Elected Servants
          </h2>

          <p className="opacity-70 mb-8">
            Meet the team working behind the scenes for your progress.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-base-100 shadow rounded-lg">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={profile2.src} alt="Profile" />
                </div>
              </div>
              <div>
                <p className="font-bold">Hon. Roberto S. Garcia</p>
                <p className="text-sm opacity-60">Punong Barangay</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-base-100 shadow rounded-lg">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={profile1.src} alt="Profile" />
                </div>
              </div>
              <div>
                <p className="font-bold">Hon. Elena V. Santos</p>
                <p className="text-sm opacity-60">Kagawad on Health & Safety</p>
              </div>
            </div>
          </div>

          <button className="btn btn-primary mt-8">View Full Council</button>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&crop=center"
            alt="Barangay Hall - Civic Center"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
