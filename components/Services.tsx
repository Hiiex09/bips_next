const services = [
    {
        title: "Document Requests",
        desc: "Request Barangay Clearance, Indigency certificates, and residency proofs online.",
        btn: "Proceed",
    },
    {
        title: "Public Complaints",
        desc: "Report incidents or community issues directly to the barangay.",
        btn: "File Report",
    },
    {
        title: "Registry Inquiry",
        desc: "Verify your status in the official resident registry.",
        btn: "Verify",
    },
];

export default function Services() {
    return (
        <section className="bg-base-200 py-24">
            <div className="max-w-7xl mx-auto px-8 text-center">
                <h2 className="text-4xl font-black text-primary mb-4">
                    Digital Services
                </h2>
                <p className="max-w-xl mx-auto opacity-70 mb-16">
                    Skip the lines. Access official barangay services online.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                        <div key={i} className="card bg-base-100 shadow-md">
                            <div className="card-body items-center text-center">
                                <h4 className="font-bold text-lg">{s.title}</h4>
                                <p className="text-sm opacity-70">{s.desc}</p>
                                <button className="btn btn-primary btn-sm mt-4">
                                    {s.btn}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}