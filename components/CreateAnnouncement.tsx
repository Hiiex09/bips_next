"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createAnnouncementAction } from "@/features/announcement/actions/createAnnouncement.action";
import { AnnouncementFormData } from "@/features/announcement/validation/announcement.schema";

export default function CreateAnnouncement() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState<AnnouncementFormData["category"]>("General");
    const [priority, setPriority] = useState<AnnouncementFormData["priority"]>("Normal");
    const [expiresAt, setExpiresAt] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const openModal = () => {
        const modal = document.getElementById("announcement_modal") as HTMLDialogElement;
        modal?.showModal();
    };

    const closeModal = () => {
        const modal = document.getElementById("announcement_modal") as HTMLDialogElement;
        modal?.close();
        setError("");
    };

    const handleAction = async (status: "PUBLISHED" | "DRAFT") => {
        setError("");
        setIsLoading(true);

        try {
            const formData = {
                title,
                content,
                category,
                priority,
                status,
                ...(expiresAt ? { expiresAt: new Date(expiresAt).toISOString() } : {})
            };

            const result = await createAnnouncementAction(formData);

            if (result.success) {
                // Reset form
                setTitle("");
                setContent("");
                setCategory("General");
                setPriority("Normal");
                setExpiresAt("");

                closeModal();
                router.refresh();
                toast.success(`Announcement ${status === "PUBLISHED" ? "published" : "saved as draft"} successfully`);
            } else {
                setError(result.error || "Failed to create announcement");
                toast.error(result.error || "Failed to create announcement");
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
            toast.error(err.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* OPEN BUTTON */}
            <button className="btn btn-primary" onClick={openModal}>
                <span className="material-icons text-sm mr-2">add</span> Create Announcement
            </button>

            {/* MODAL */}
            <dialog id="announcement_modal" className="modal">
                <div className="modal-box max-w-6xl p-0">

                    {/* HEADER */}
                    <div className="p-6 border-b">
                        <h2 className="text-2xl font-bold">Create New Announcement</h2>
                        <p className="text-sm opacity-70">
                            Draft a community notice, emergency alert, or event broadcast.
                        </p>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* LEFT SIDE */}
                        <div className="lg:col-span-2 space-y-4">

                            {error && (
                                <div className="alert alert-error mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* TITLE */}
                            <div>
                                <label className="label font-semibold">Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter title..."
                                    className="input input-bordered w-full"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>

                            {/* CONTENT */}
                            <div>
                                <label className="label font-semibold">Content</label>
                                <textarea
                                    className="textarea textarea-bordered w-full h-40"
                                    placeholder="Write announcement..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>

                            {/* IMAGE UPLOAD */}
                            <div className="border-2 border-dashed rounded-xl p-6 text-center">
                                <p className="font-semibold">Add Featured Image</p>
                                <p className="text-sm opacity-60">
                                    Recommended: 1200x630px
                                </p>
                                <input type="file" className="file-input file-input-bordered mt-3" disabled={isLoading} />
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="space-y-4">

                            {/* CATEGORY */}
                            <div>
                                <label className="label font-semibold">Category</label>
                                <select
                                    className="select select-bordered w-full"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value as any)}
                                    disabled={isLoading}
                                >
                                    <option value="General">General</option>
                                    <option value="Meeting">Meeting</option>
                                    <option value="Emergency">Emergency</option>
                                    <option value="Event">Event</option>
                                    <option value="Curfew">Curfew</option>
                                </select>
                            </div>

                            {/* PRIORITY */}
                            <div>
                                <label className="label font-semibold">Priority</label>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${priority === 'Normal' ? 'btn-neutral' : 'btn-outline'}`}
                                        onClick={() => setPriority("Normal")}
                                        disabled={isLoading}
                                    >Normal</button>
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${priority === 'Important' ? 'btn-warning text-warning-content' : 'btn-outline btn-warning'}`}
                                        onClick={() => setPriority("Important")}
                                        disabled={isLoading}
                                    >Important</button>
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${priority === 'Urgent' ? 'btn-error text-error-content' : 'btn-outline btn-error'}`}
                                        onClick={() => setPriority("Urgent")}
                                        disabled={isLoading}
                                    >Urgent</button>
                                </div>
                            </div>

                            {/* EXPIRATION */}
                            <div>
                                <label className="label font-semibold">Expires At</label>
                                <input
                                    type="datetime-local"
                                    className="input input-bordered w-full"
                                    value={expiresAt}
                                    onChange={(e) => setExpiresAt(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>

                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="p-6 border-t flex flex-col gap-2">
                        <button
                            className="btn btn-primary w-full"
                            onClick={() => handleAction("PUBLISHED")}
                            disabled={isLoading}
                        >
                            {isLoading ? <span className="loading loading-spinner"></span> : "Publish Now"}
                        </button>
                        <button
                            className="btn btn-outline w-full"
                            onClick={() => handleAction("DRAFT")}
                            disabled={isLoading}
                        >
                            {isLoading ? <span className="loading loading-spinner"></span> : "Save as Draft"}
                        </button>
                        <button
                            className="btn btn-ghost w-full text-error"
                            onClick={closeModal}
                            disabled={isLoading}
                        >
                            Discard
                        </button>
                    </div>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}