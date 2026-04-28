import { Loading } from "@/components/global/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CaretDown from "@/components/ui/icons/CaretDown";

export default function ButtonsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buttons</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          <div className="flex flex-col items-start gap-4 p-4">
            <Button>Default</Button>
            <Button size="sm">Default Small</Button>
            <Button size="xs">Default XSmall</Button>
            <Button disabled>Disabled</Button>
            <Button>
              <Loading />
            </Button>
            <Button size="sm">
              <Loading size="small" />
            </Button>
            <Button size="xs">
              <Loading size="xsmall" />
            </Button>
            <Button>
              Default Caret
              <CaretDown />
            </Button>
          </div>
          <div className="flex flex-col items-start gap-4 p-4">
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondary" size="sm">
              Secondary Small
            </Button>
            <Button variant="secondary" size="xs">
              Secondary XSmall
            </Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
            <Button variant="secondary">
              <Loading />
            </Button>
            <Button variant="secondary" size="sm">
              <Loading size="small" />
            </Button>
            <Button variant="secondary" size="xs">
              <Loading size="xsmall" />
            </Button>
            <Button variant="secondary">
              Secondary Caret
              <CaretDown />
            </Button>
          </div>
          <div className="flex flex-col items-start gap-4 p-4">
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="tertiary" size="sm">
              Tertiary Small
            </Button>
            <Button variant="tertiary" size="xs">
              Tertiary XSmall
            </Button>
            <Button variant="tertiary" disabled>
              Disabled
            </Button>
            <Button variant="tertiary">
              <Loading />
            </Button>
            <Button variant="tertiary" size="sm">
              <Loading size="small" />
            </Button>
            <Button variant="tertiary" size="xs">
              <Loading size="xsmall" />
            </Button>
            <Button variant="tertiary">
              Tertiary Caret
              <CaretDown />
            </Button>
          </div>
          <div className="flex flex-col items-start gap-4 p-4">
            <Button variant="destructive">Destructive</Button>
            <Button variant="destructive" size="sm">
              Destructive Small
            </Button>
            <Button variant="destructive" size="xs">
              Destructive XSmall
            </Button>
            <Button variant="destructive" disabled>
              Disabled
            </Button>
            <Button variant="destructive">
              <Loading />
            </Button>
            <Button variant="destructive" size="sm">
              <Loading size="small" />
            </Button>
            <Button variant="destructive" size="xs">
              <Loading size="xsmall" />
            </Button>
            <Button variant="destructive">
              Destructive Caret
              <CaretDown />
            </Button>
          </div>
          <div className="flex flex-col items-start gap-4 p-4">
            <Button variant="inverse">Inverse</Button>
            <Button variant="inverse" size="sm">
              Inverse Small
            </Button>
            <Button variant="inverse" size="xs">
              Inverse XSmall
            </Button>
            <Button variant="inverse" disabled>
              Disabled
            </Button>
            <Button variant="inverse">
              <Loading />
            </Button>
            <Button variant="inverse" size="sm">
              <Loading size="small" />
            </Button>
            <Button variant="inverse" size="xs">
              <Loading size="xsmall" />
            </Button>
            <Button variant="inverse">
              Inverse Caret
              <CaretDown />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
