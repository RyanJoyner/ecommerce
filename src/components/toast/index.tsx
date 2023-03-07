import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./_toast.scss?inline";

interface TabsProps {
  message: string;
  state: "primary" | "success" | "warning" | "error";
}

export default component$(({ message, state }: TabsProps) => {
  useStylesScoped$(styles);

  return <div class={`toast toast-${state}`}>{message}</div>;
});
