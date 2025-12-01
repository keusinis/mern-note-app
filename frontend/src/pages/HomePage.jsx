import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";
import { LoaderIcon } from "lucide-react";
import { useAuthContext } from "../hooks/useAuthContext";
import UnauthorizedUser from "../components/UnauthorizedUser";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoading: authLoading } = useAuthContext();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchNotes();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || (user && loading)) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  if (isRateLimited) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar noteAmount={notes.length} />
        <RateLimitedUI />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar noteAmount={notes.length} />
        <UnauthorizedUser />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar noteAmount={notes.length} />
      <div className="max-w-6xl mx-auto p-4 mt-6">
        {notes.length === 0 ? (
          <NotesNotFound />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;