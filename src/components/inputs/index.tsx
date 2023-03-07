import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./_inputs.scss?inline";

type LinkProps = {
  name: string;
  label: string;
  formState: any;
  type: string;
  pattern?: string;
  minLength?: number;
  errorMessage?: string;
  validation?: () => void;
};

export default component$(
  ({
    name = "",
    label = "",
    formState,
    type = "",
    pattern,
    errorMessage = "",
    minLength = 1,
  }: LinkProps) => {
    useStylesScoped$(styles);
    const input = formState[name];

    return (
      <div class="group">
        <input
          data-value={input.value.length > 0 && "true"}
          type={type}
          onInput$={(ev) => {
            const value = (ev.target as HTMLInputElement).value;
            formState[name] = {
              value,
              isValid: (ev.target as HTMLInputElement).validity.valid,
            };
          }}
          pattern={pattern}
          minLength={minLength}
          required
        />
        <label class="label" for={name}>
          {label}
        </label>
        {input.isValid || <span>{errorMessage}</span>}
      </div>
    );
  }
);
