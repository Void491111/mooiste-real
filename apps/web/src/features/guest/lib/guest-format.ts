export function formatCategory(code: string) {
  return code
    .toLowerCase()
    .split("_")
    .map(function capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}