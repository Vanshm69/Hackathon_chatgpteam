import { useState } from "react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

export default function PostItem() {
  const { addItem } = useData();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    type: "lost"
  });

  const [image, setImage] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result); // Base64 string
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addItem({
      ...form,
      image,
      postedByRoll: user.rollNo
    });

    setForm({
      title: "",
      category: "",
      location: "",
      description: "",
      type: "lost"
    });

    setImage("");

    alert("Item Posted Successfully");
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          className="border p-3 w-full rounded"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="border p-3 w-full rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="border p-3 w-full rounded"
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            className="h-40 rounded"
          />
        )}

        <button className="bg-red-600 text-white px-6 py-2 rounded">
          Submit
        </button>

      </form>
    </div>
  );
}
