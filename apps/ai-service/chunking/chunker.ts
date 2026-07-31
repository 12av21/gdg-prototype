export interface DocumentChunk {
  chunkIndex: number;
  text: string;
}

export function chunkDocumentText(text: string, chunkSize: number = 500, overlap: number = 50): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];
  const words = text.split(/\s+/);
  let currentIndex = 0;
  let chunkIdx = 0;

  while (currentIndex < words.length) {
    const chunkWords = words.slice(currentIndex, currentIndex + chunkSize);
    chunks.push({
      chunkIndex: chunkIdx++,
      text: chunkWords.join(' ')
    });
    currentIndex += (chunkSize - overlap);
  }

  return chunks;
}
