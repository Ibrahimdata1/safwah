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
  useEffect(() => {
    const fetchMatn = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/books/${bookId}/matn`
      );
      const data = res.data.data.map((m) => ({
        ...m,
        _original: { arText: m.arText, engText: m.engText },
        sharh: m.sharh.map((s) => ({
          ...s,
          _original: {
            arExplain: s.arExplain,
            engExplain: s.engExplain,
            scholar: s.scholar,
          },
          footnotes: s.footnotes.map((f) => ({
            ...f,
            _original: { ar: f.ar, eng: f.eng },
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
      if (
        m._original?.arText !== m.arText ||
        m._original?.engText !== m.engText
      ) {
        await axios.put(`http://localhost:8080/api/edit/matn/${m.id}`, {
          arText: m.arText,
          engText: m.engText,
        });
      }
      for (const s of m.sharh) {
        if (
          s._original?.arExplain !== s.arExplain ||
          s._original?.engExplain !== s.engExplain ||
          s._original?.scholar !== s.scholar
        ) {
          await axios.put(`http://localhost:8080/api/edit/sharh/${s.id}`, {
            arExplain: s.arExplain,
            engExplain: s.engExplain,
            scholar: s.scholar,
          });
        }
        for (const f of s.footnotes) {
          if (f._original?.ar !== f.ar || f._original?.eng !== f.eng) {
            await axios.put(
              `http://localhost:8080/api/edit/footnotes/${f.id}`,
              {
                ar: f.ar,
                eng: f.eng,
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
      {matn.map((m) => (
        <div key={m.id} className="bg-[#121212f5] rounded shadow p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-lg mb-2">Matn</h2>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteMatn(m.id)}
            >
              <Trash2 className="w-4 h-4 mr-1" /> Delete Matn
            </Button>
          </div>
          <Textarea
            className="w-full p-2 border rounded mb-2"
            value={m.arText}
            onChange={(e) => handleChangeMatn(m.id, "arText", e.target.value)}
            placeholder="Arabic Matn..."
          />
          <Textarea
            className="w-full p-2 border rounded mb-2"
            value={m.engText}
            onChange={(e) => handleChangeMatn(m.id, "engText", e.target.value)}
            placeholder="English Matn..."
          />
          {m.sharh.map((s) => (
            <div key={s.id} className="pl-4 border-1 mt-4">
              <div>
                <h3 className="font-semibold mb-1">Sharh by: {s.scholar}</h3>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteSharh(m.id, s.id)}
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
                value={s.arExplain}
                onChange={(e) =>
                  handleChangeSharh(m.id, s.id, "arExplain", e.target.value)
                }
                placeholder="Arabic Sharh"
              />
              <Textarea
                className="w-full p-2 border rounded mb-2"
                value={s.engExplain}
                onChange={(e) =>
                  handleChangeSharh(m.id, s.id, "engExplain", e.target.value)
                }
                placeholder="English Sharh"
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
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete Footnote
                    </Button>
                  </div>
                  <Textarea
                    className="w-full p-2 border rounded mb-1"
                    value={f.ar}
                    onChange={(e) =>
                      handleChangeFootnote(
                        m.id,
                        s.id,
                        f.id,
                        "ar",
                        e.target.value
                      )
                    }
                    placeholder="Arabic Footnote"
                  />
                  <Textarea
                    className="w-full p-2 border rounded"
                    value={f.eng}
                    onChange={(e) =>
                      handleChangeFootnote(
                        m.id,
                        s.id,
                        f.id,
                        "eng",
                        e.target.value
                      )
                    }
                    placeholder="English Footnote"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
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
