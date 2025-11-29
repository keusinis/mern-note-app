import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDateOnly, formatTimeOnly } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

function NoteCard({ note, setNotes }) {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Delete the Note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete Note");
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-md transition-all duration-500
            border-t-2 border-l-2 border-primary"
    >
      <div className="card-body ">
        <h3 className="card-title text-base-content">{note.title} </h3>
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
              className="btn btn-ghost"
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
