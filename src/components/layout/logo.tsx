import Image from 'next/image';

export function Logo() {
  return (
    <span className="font-bold text-xl text-foreground">
      <Image src="/images/Logo.png" alt="Logo" width={150} height={150} />
    </span>
  );
}
