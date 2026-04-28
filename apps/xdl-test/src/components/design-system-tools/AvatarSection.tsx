import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  type AvatarColor,
  type AvatarSize,
} from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";

export default function ButtonsSection() {
  const avatarColors = [
    "turquoise",
    "blue",
    "violet",
    "yellow",
    "grape",
    "green",
    "mint",
    "orange",
    "pink",
    "red",
  ];
  const avatarSizes = [
    "xxsmall",
    "xsmall",
    "small",
    "medium",
    "large",
    "xlarge",
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Avatar Component</CardTitle>
        <CardDescription>
          The Avatar component is used to represent a user or organisation
          visually.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {avatarSizes.map((size) => (
          <div key={size} className="mb-4">
            <p className="mb-2 font-medium">Size: {size}</p>
            <AvatarGroup size={size as AvatarSize}>
              {avatarColors.map((color) => (
                <Avatar
                  key={color}
                  color={color as AvatarColor}
                  size={size as AvatarSize}
                  name="A J"
                  asChild="button"
                  className="shadow-[-1px_0_0_0_var(--color-shadow-default,rgba(0,0,0,0.20)),-3px_0_0_0_var(--color-shadow-subtle,rgba(0,0,0,0.05))]"
                />
              ))}
            </AvatarGroup>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
