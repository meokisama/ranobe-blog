// Strips Vietnamese diacritics for accent-insensitive search. Kept as plain
// ESM (.mjs) so it can be shared by both the Node build script
// (scripts/export-posts.mjs) and the client search UI (search-function.tsx).
//
// Character classes are listed explicitly (rather than using Unicode
// normalization) to avoid touching Japanese dakuten/handakuten marks.

/**
 * @param {string} str
 * @returns {string}
 */
export function removeAccents(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
    .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, "A")
    .replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, "E")
    .replace(/[ìíịỉĩ]/g, "i")
    .replace(/[ÌÍỊỈĨ]/g, "I")
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, "O")
    .replace(/[ùúụủũưừứựửữ]/g, "u")
    .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, "U")
    .replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/[ỲÝỴỶỸ]/g, "Y")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}
