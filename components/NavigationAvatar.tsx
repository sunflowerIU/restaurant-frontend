import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function NavigationAvatar() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        className="grayscale"
      />
      <AvatarFallback>Amit</AvatarFallback>
    </Avatar>
  );
}
