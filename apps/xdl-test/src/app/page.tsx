import PageHeader from "@/components/ui/page-header";
import ButtonsSection from "@/components/design-system-tools/ButtonsSection";
import AvatarSection from "@/components/design-system-tools/AvatarSection";
import PanelSection from "@/components/design-system-tools/PanelSection";
import ToastSection from "@/components/design-system-tools/ToastSection";
import AccordionSection from "@/components/design-system-tools/AccordionSection";
import PageHeaderSection from "@/components/design-system-tools/PageHeaderSection";
import DataTableSection from "@/components/design-system-tools/DataTableSection";

export default function Home() {
  return (
    <div className="bg-background-secondary min-h-screen">
      <PageHeader
        title="Components"
        tabs={{
          defaultValue: "button",
          items: [
            {
              value: "button",
              label: "Button",
              content: <ButtonsSection />,
            },
            {
              value: "avatar",
              label: "Avatar",
              content: <AvatarSection />,
            },
            {
              value: "panel",
              label: "Panel",
              content: <PanelSection />,
            },
            {
              value: "toast",
              label: "Toast",
              content: <ToastSection />,
            },
            {
              value: "accordion",
              label: "Accordion",
              content: <AccordionSection />,
            },
            {
              value: "page-header",
              label: "Page Header",
              content: <PageHeaderSection />,
            },
            {
              value: "data-table",
              label: "Data Table",
              content: <DataTableSection />,
            },
          ],
        }}
      />
    </div>
  );
}
