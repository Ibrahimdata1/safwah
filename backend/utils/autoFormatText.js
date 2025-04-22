function autoFormatText(text) {
  const lines = text
    .replace(/:\s*/g, ":\n") // เว้นหลัง :
    .replace(/\.\s*/g, ".\n") // เว้นหลัง .
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  const grouped = [];
  let tempGroup = { ar: [], en: [] };

  lines.forEach((line) => {
    const isArabic = /[\u0600-\u06FF]/.test(line);
    if (isArabic) {
      if (tempGroup.en.length > 0) {
        grouped.push(`${tempGroup.ar.join("\n")}\n${tempGroup.en.join("\n")}`);
        tempGroup = { ar: [], en: [] };
      }
      tempGroup.ar.push(line);
    } else {
      tempGroup.en.push(line);
    }
  });

  // push อันสุดท้ายถ้าเหลือ
  if (tempGroup.ar.length || tempGroup.en.length) {
    grouped.push(`${tempGroup.ar.join("\n")}\n${tempGroup.en.join("\n")}`);
  }

  return grouped.join("\n\n"); // เว้นบรรทัดระหว่างคู่
}

export default autoFormatText;
