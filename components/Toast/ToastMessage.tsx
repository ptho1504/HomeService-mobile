// components/common/ToastMessage.tsx
import React from "react";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
} from "@/components/ui/toast";

export type ToastType = "error" | "muted" | "warning" | "success" | "info";

export const showToastMessage = (
  toast: ReturnType<typeof useToast>,
  title: string,
  message: string,
  type: ToastType,
  toastId?: string
) => {
  console.log("Start enter toast");
  const id = toastId || Math.random().toString();

  if (toast.isActive(id)) return;

  toast.show({
    id,
    placement: "top",
    duration: 3000,
    render: () => (
      <Toast nativeID={id} action={type} variant="solid">
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{message}</ToastDescription>
      </Toast>
    ),
  });
};
