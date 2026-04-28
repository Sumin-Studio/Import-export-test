"use client";

import Icon from "@/components/ui/icon";
import { toast as sonnerToast } from "sonner";

/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */
export default function toast(toast: Omit<ToastProps, "id">) {
  return sonnerToast.custom((id) => <Toast id={id} title={toast.title} />);
}

/** A fully custom toast that still maintains the animations and interactions. */
function Toast(props: ToastProps) {
  const { title, id } = props;

  return (
    <div className="rounded-large border-border-regular shadow-lift relative flex w-full items-center gap-6 border bg-white px-4 py-2 ring-1 ring-black/5 md:max-w-[400px]">
      <div className="rounded-l-large bg-sentiment-positive-foreground absolute inset-y-0 left-0 w-1" />
      <p>{title}</p>
      <div>
        <button
          className=""
          onClick={() => sonnerToast.dismiss(id)}
          aria-label="Close"
        >
          <Icon name="Multiplication" className="-my-4" />
        </button>
      </div>
    </div>
  );
}

interface ToastProps {
  id: string | number;
  title: string;
}
