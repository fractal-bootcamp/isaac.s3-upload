/* Useful helper functions */

// Helper function to format bytes to a human-readable string
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// Helper function to check if the file is an image
export function isImageFile(fileName: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(fileName);
}
