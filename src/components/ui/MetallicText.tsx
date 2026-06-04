export default function MetallicText({
  text,
  className = ""
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`metallic-text-sweep font-bold tracking-tight select-none ${className}`}>
      {text}
    </span>
  );
}
