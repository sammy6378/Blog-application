"use client";

import { useEffect, useState } from "react";

export default function UpdateImage() {
  const [image, setImage] = useState<File | null>(null);

  const submitAvatar = async () => {};
  return (
    <form onSubmit={submitAvatar}>
      <input
        type="file"
        name="avatar"
        id="avatar"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
          }
        }}
      />
      <button type="submit">Update Avatar</button>
    </form>
  );
}
