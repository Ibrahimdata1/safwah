function autoFormatText(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line !== "")
    .map((line) => {
      // ลบ – : ที่อยู่โดดๆ
      line = line.replace(/^[–-]?\s*[:：]?\s*$/, "");
      // รวมอายะฮ์ให้ดูดี: จากหลายบรรทัด -> [ซูเราะฮ์: เลข]
      line = line.replace(
        /([^\[])(النساء|المائدة|البقرة|يوسف|الزمر|يُونس|الأنبياء)\s*[:：]?\s*(\d+)/g,
        "$1[$2: $3]"
      );
      return line;
    });

  const grouped = [];
  for (let i = 0; i < lines.length; i += 2) {
    grouped.push(`${lines[i] || ""}\n${lines[i + 1] || ""}`);
  }

  return grouped.join("\n\n");
}
export default autoFormatText;
