import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Panel from "@/components/ui/panel";

export default function PanelSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Panel Component</CardTitle>
        <CardDescription>
          The Panel component provides a vertical tab layout with a sidebar
          navigation and content area, useful for settings pages and
          multi-section forms.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Panel />
      </CardContent>
    </Card>
  );
}
