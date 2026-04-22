interface AvatarProps {
  fallback: string;
  src?: string;
}

export default function Avatar(props: AvatarProps) {
  const { fallback, src } = props;
  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden">
      {src ? (
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary">
          {fallback}
        </div>
      )}
    </div>
  );
}
