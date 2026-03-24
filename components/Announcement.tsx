export default function Announcements() {
    return (
        <section className="py-24 px-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-black text-primary">
                        Latest Announcements
                    </h2>
                    <p className="text-base-content/70 mt-2">
                        Stay updated with the latest community initiatives and news.
                    </p>
                </div>
                <a className="link link-primary font-bold">View all news →</a>
            </div>

            <div className="grid md:grid-cols-12 gap-6">
                {/* Main */}
                <div className="md:col-span-8 card bg-base-100 shadow-xl border-l-8 border-secondary">
                    <div className="card-body">
                        <div className="flex gap-3 text-xs">
                            <span className="badge badge-accent">Healthcare</span>
                            <span className="opacity-70">May 24, 2024</span>
                        </div>

                        <h3 className="text-2xl font-bold">
                            Upcoming Vaccine Drive
                        </h3>

                        <p className="opacity-70">
                            Join our quarterly immunization program focused on pediatrics and
                            senior citizens. Free vaccinations will be administered.
                        </p>

                        <div className="mt-4 text-sm font-semibold text-primary">
                            📍 San Jose Multi-purpose Center
                        </div>
                    </div>
                </div>

                {/* Side */}
                <div className="md:col-span-4 card bg-base-200">
                    <div className="card-body">
                        <span className="badge badge-primary">Environment</span>

                        <h3 className="font-bold text-lg">Community Cleanup</h3>

                        <p className="text-sm opacity-70">
                            Join the monthly “Linis-Kalsada” initiative this Saturday.
                        </p>

                        <div className="text-xs font-semibold">
                            📅 June 12, 2024
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}