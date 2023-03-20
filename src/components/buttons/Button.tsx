import { $, component$, useStylesScoped$, QRL } from "@builder.io/qwik";

import styles from "./_buttons.scss?inline";

type BtnProps = {
  text: string;
  customClass?: string;
  callBack: QRL<() => void>;
};

export default component$(
  ({ text = "", customClass = "", callBack = $(() => {}) }: BtnProps) => {
    useStylesScoped$(styles);
    return (
      <div class={`btn ${customClass}`} onClick$={callBack}>
        {text}
      </div>
    );
  }
);
