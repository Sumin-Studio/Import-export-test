"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast from "@/components/ui/toast";

export default function ToastSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Toast Component</CardTitle>
        <CardDescription>
          Toasts provide brief, non-intrusive notifications to the user. They
          appear at the bottom of the screen and dismiss automatically or via a
          close button.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => toast({ title: "Changes saved successfully" })}
          >
            Show Toast
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast({ title: "Item has been archived" })}
          >
            Show Another Toast
          </Button>
          <Button
            variant="tertiary"
            onClick={() => toast({ title: "Your invoice was sent" })}
          >
            Show Third Toast
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
