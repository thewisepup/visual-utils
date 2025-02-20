export function Spinner({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className="flex justify-center">
      <div
        className={`${className} border-4 border-blue-500 border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
} 