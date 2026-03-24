export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-primary py-24 md:py-32 text-white">
            <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-[#002576] to-[#0038a8]" />

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="max-w-3xl">
                    <span className="badge badge-secondary mb-6 uppercase tracking-widest">
                        Official Registry
                    </span>

                    <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                        Barangay San Jose
                    </h1>

                    <p className="text-lg md:text-xl mb-10 opacity-90">
                        Dedicated to fostering a secure, transparent, and vibrant community.
                        Our mission is to provide efficient digital governance and accessible
                        public services for every resident.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="btn btn-lg bg-white text-primary hover:scale-105 transition">
                            Request Documents
                        </button>
                        <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
                            View Announcements
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}