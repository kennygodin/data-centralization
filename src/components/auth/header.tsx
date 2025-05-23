interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-3xl font-semibold">Sign into your account</h1>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};
