import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDateOnly, formatTimeOnly } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../hooks/useAuthContext";

function NoteCard({ note, setNotes }) {
  const { user } = useAuthContext();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!window.confirm("Delete the Note?")) return;
    
    try {
      await api.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted");
    } catch (error) {
      console.log("Error in handleDelete", error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Unauthorized to delete this note");
        setNotes((prev) => prev.filter((note) => note._id !== id));
      } else if (error.response?.status === 404) {
        toast.error("Note not found");
        setNotes((prev) => prev.filter((note) => note._id !== id));
      } else {
        toast.error("Failed to delete note");
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-neutral/50 hover:shadow-xl hover:bg-neutral transition-all duration-200
            border-t-2 border-l-2 border-primary box-border"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-base-content/60">
              {formatTimeOnly(note.updatedAt)}
            </span>
            <span className="text-sm text-base-content/60">
              {formatDateOnly(note.updatedAt)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-sm"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;