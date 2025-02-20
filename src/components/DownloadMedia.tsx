type DownloadMediaProps = {
  url: string;
  buttonText: string;
  filename: string;
  className?: string;
};

export function DownloadMedia({
  url,
  buttonText,
  filename,
  className = 'mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors',
}: DownloadMediaProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleDownload} className={className}>
      {buttonText}
    </button>
  );
}
