/** Guarda un Blob en el equipo del usuario con el nombre indicado (el navegador lo descarga sin navegar). */
export function saveBlob(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
}
