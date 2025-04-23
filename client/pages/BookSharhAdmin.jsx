import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
function BookSharhAdmin() {
  const { bookId } = useParams();
  const [matn, setMatn] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMatn = matn.slice(startIndex, endIndex);
  useEffect(() => {
    const fetchMatn = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/books/${bookId}/matn`
      );
      const data = res.data.data.map((m) => ({
        ...m,
        _original: { matnText: m.matnText },
        sharh: m.sharh.map((s) => ({
          ...s,
          _original: {
            sharhText: s.sharhText,
            scholar: s.scholar,
          },
          footnotes: s.footnotes.map((f) => ({
            ...f,
            _original: { footnoteText: f.footnoteText },
          })),
        })),
      }));
      setMatn(data);
      setLoading(false);
    };
    fetchMatn();
  }, [bookId]);
  const handleChangeMatn = (matnId, field, value) => {
    setMatn((prev) =>
      prev.map((m) => (m.id === matnId ? { ...m, [field]: value } : m))
    );
  };
  const handleDeleteMatn = async (matnId) => {
    await axios.delete(`http://localhost:8080/api/edit/matn/${matnId}`);
    setMatn((prev) => prev.filter((m) => m.id !== matnId));
  };
  const handleChangeSharh = (matnId, sharhId, field, value) => {
    setMatn((prev) =>
      prev.map((m) =>
        m.id === matnId
          ? {
              ...m,
              sharh: m.sharh.map((s) =>
                s.id === sharhId ? { ...s, [field]: value } : s
              ),
            }
          : m
      )
    );
  };
  const handleDeleteSharh = async (matnId, sharhId) => {
    await axios.delete(`http://localhost:8080/api/edit/sharh/${sharhId}`);
    setMatn((prev) =>
      prev.map((m) =>
        m.id === matnId
          ? { ...m, sharh: m.sharh.filter((s) => s.id !== sharhId) }
          : m
      )
    );
  };
  const handleDeleteFootnote = async (matnId, sharhId, footnoteId) => {
    await axios.delete(`http://localhost:8080/api/footnotes/${footnoteId}`);
    setMatn((prev) =>
      prev.map((m) =>
        m.id === matnId
          ? {
              ...m,
              sharh: m.sharh.map((s) =>
                s.id === sharhId
                  ? {
                      ...s,
                      footnotes: s.footnotes.filter((f) => f.id !== footnoteId),
                    }
                  : s
              ),
            }
          : m
      )
    );
  };
  const handleChangeFootnote = (matnId, sharhId, footnoteId, field, value) => {
    setMatn((prev) =>
      prev.map((m) =>
        m.id === matnId
          ? {
              ...m,
              sharh: m.sharh.map((s) =>
                s.id === sharhId
                  ? {
                      ...s,
                      footnotes: s.footnotes.map((f) =>
                        f.id === footnoteId ? { ...f, [field]: value } : f
                      ),
                    }
                  : s
              ),
            }
          : m
      )
    );
  };
  const handleSave = async () => {
    for (const m of matn) {
      if (m._original?.matnText !== m.matnText) {
        await axios.put(`http://localhost:8080/api/edit/matn/${m.id}`, {
          matnText: m.matnText,
        });
      }
      for (const s of m.sharh) {
        if (
          s._original?.sharhText !== s.sharhText ||
          s._original?.scholar !== s.scholar
        ) {
          await axios.put(`http://localhost:8080/api/edit/sharh/${s.id}`, {
            sharhText: s.sharhText,
            scholar: s.scholar,
          });
        }
        for (const f of s.footnotes) {
          if (f._original?.footnoteText !== f.footnoteText) {
            await axios.put(
              `http://localhost:8080/api/edit/footnotes/${f.id}`,
              {
                footnoteText: f.footnoteText,
              }
            );
          }
        }
      }
    }
    alert("บันทึกเฉพาะที่มีการเปลี่ยนแปลงเรียบร้อย");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 text-gray-500 animate-spin mr-2" />
        <span className="text-gray-500 text-lg">Loading...</span>
      </div>
    );
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Content</h1>
      {paginatedMatn.map((m) => (
        <div key={m.id} className="bg-[#121212f5] rounded shadow p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-lg mb-2">Matn</h2>
            <Button
              variant="destructive"
              className="cursor-pointer"
              size="sm"
              onClick={() => handleDeleteMatn(m.id)}
            >
              <Trash2 className="w-4 h-4 mr-1" /> Delete Matn
            </Button>
          </div>
          <Textarea
            className="w-full p-2 border rounded mb-2"
            value={m.matnText}
            onChange={(e) => handleChangeMatn(m.id, "matnText", e.target.value)}
            placeholder="Arabic Matn..."
          />

          {m.sharh.map((s) => (
            <div key={s.id} className="pl-4 border-1 mt-4">
              <div>
                <h3 className="font-semibold mb-1">Sharh by: {s.scholar}</h3>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteSharh(m.id, s.id)}
                  className="cursor-pointer"
                >
                  <Trash2 className="w-4 mr-1 h-4" /> Delete Sharh
                </Button>
              </div>
              <Input
                className="font-semibold mb-1"
                value={s.scholar}
                onChange={(e) =>
                  handleChangeSharh(m.id, s.id, "scholar", e.target.value)
                }
                placeholder="Scholar Name"
              />
              <Textarea
                className="w-full p-2 border rounded mb-2"
                value={s.sharhText}
                onChange={(e) =>
                  handleChangeSharh(m.id, s.id, "sharhText", e.target.value)
                }
                placeholder="Sharh Text..."
              />

              {s.footnotes.map((f) => (
                <div className="ml-4 mt-2" key={f.id}>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-medium text-gray-600">
                      Footnote [{f.id}]
                    </h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteFootnote(m.id, s.id, f.id)}
                      className="cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete Footnote
                    </Button>
                  </div>
                  <Textarea
                    className="w-full p-2 border rounded mb-1"
                    value={f.footnoteText}
                    onChange={(e) =>
                      handleChangeFootnote(
                        m.id,
                        s.id,
                        f.id,
                        "footnoteText",
                        e.target.value
                      )
                    }
                    placeholder="Footnote Text..."
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-center gap-2 my-6">
        <Button
          className="cursor-pointer"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          ← Prev
        </Button>
        <span className="px-2 text-sm text-white">
          Page {currentPage} of {Math.ceil(matn.length / itemsPerPage)}
        </span>
        <Button
          className="cursor-pointer"
          size="sm"
          onClick={() =>
            setCurrentPage((p) =>
              Math.min(p + 1, Math.ceil(matn.length / itemsPerPage))
            )
          }
          disabled={endIndex >= matn.length}
        >
          Next →
        </Button>
      </div>
      <Button
        onClick={handleSave}
        className="px-6 py-2 bg-green-600 text-white rounded shadow cursor-pointer"
      >
        💾 Save Changes
      </Button>
    </div>
  );
}
export default BookSharhAdmin;
