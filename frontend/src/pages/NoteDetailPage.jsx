import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useAuthContext } from "../hooks/useAuthContext";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user, isLoading: authLoading } = useAuthContext(); // Get authLoading

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Wait for auth check to complete
    if (authLoading) return;

    // Only redirect if auth check is complete and no user
    if (!user) {
      navigate("/");
      return;
    }

    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setNote(res.data);
      } catch (error) {
        console.log("Error fetching note", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          toast.error("Unauthorized to view this note");
          navigate("/");
        } else if (error.response?.status === 404) {
          toast.error("Note not found");
          navigate("/");
        } else {
          toast.error("Error loading note");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, user, navigate, authLoading]);

  // Show loading while checking auth OR fetching note
  if (authLoading || (user && loading)) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  // Don't render anything if no user after auth check
  if (!user) {
    return null;
  }

  const handleDelete = async () => {
    if (!window.confirm("Delete the Note?")) return;
    try {
      await api.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete Note");
    }
  };

  const handleSave = async () => {
    if (!note?.title?.trim() || !note?.content?.trim()) {
      toast.error("All fields are required");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Note saved");
      navigate("/");
    } catch (error) {
      console.log("Error in handleSave", error);
      toast.error("Failed to save Note");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-neutral">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-primary bg-base-200"
                  value={note?.title || ""}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-primary h-32 bg-base-200"
                  value={note?.content || ""}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;