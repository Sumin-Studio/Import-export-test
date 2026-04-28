import { Search } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Panel() {
  return (
    <Tabs
      defaultValue="option-1"
      orientation="vertical"
      className="border-border-regular rounded-large mx-auto mb-5 flex max-w-[1200px] flex-row border bg-white"
    >
      <div className="w-full max-w-[280px] border-r p-5">
        <div className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 select-none">
            <Search className="size-6" />
          </div>
          <Input
            type="search"
            placeholder="Search organisations"
            className="h-10 pl-12"
          />
        </div>

        <TabsList className="mt-5 flex flex-col items-start gap-5">
          <div className="flex flex-col items-start">
            <h2 className="text-label py-2">Bills settings</h2>
            <TabsTrigger
              value="option-1"
              className="py-2 pl-0 after:inset-x-auto after:inset-y-0 after:bottom-auto after:-left-5 after:h-full after:w-0.5 after:-translate-x-px"
            >
              Option 1
            </TabsTrigger>
            <TabsTrigger
              value="option-2"
              className="py-2 pl-0 after:inset-x-auto after:inset-y-0 after:bottom-auto after:-left-5 after:h-full after:w-0.5 after:-translate-x-px"
            >
              Option 2
            </TabsTrigger>
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-label py-2">Bill payment settings</h2>
            <TabsTrigger
              value="option-1"
              className="py-2 pl-0 after:inset-x-auto after:inset-y-0 after:bottom-auto after:-left-5 after:h-full after:w-0.5 after:-translate-x-px"
            >
              Option 1
            </TabsTrigger>
            <TabsTrigger
              value="option-2"
              className="py-2 pl-0 after:inset-x-auto after:inset-y-0 after:bottom-auto after:-left-5 after:h-full after:w-0.5 after:-translate-x-px"
            >
              Option 2
            </TabsTrigger>
          </div>
        </TabsList>
      </div>

      <div className="p-8">
        <TabsContent value="option-1">
          Content for Option 1
          <h2 className="text-heading-standard-bold mb-8">Bills defaults</h2>
          <h3 className="text-heading-tiny-bold">Bill default</h3>
          <p className="text-body-standard-regular text-text-secondary-foreground mt-2">
            This default applies when no contact-level defaults are set. You can
            still override per bill.
          </p>
        </TabsContent>
        <TabsContent value="option-2">
          Content for Option 2
          <h2 className="text-heading-standard-bold mb-8">Bills defaults</h2>
          <h3 className="text-heading-tiny-bold">Bill default</h3>
          <p className="text-body-standard-regular text-text-secondary-foreground mt-2">
            This default applies when no contact-level defaults are set. You can
            still override per bill.
          </p>
        </TabsContent>
      </div>
    </Tabs>
  );
}

export default Panel;
