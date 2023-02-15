import {
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
  $,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import emailjs from "@emailjs/browser";

import Input from "~/components/inputs";
import { RightArrow } from "~/components/icons";

import styles from "./_contact.scss?inline";

type Field = {
  value: string;
  isValid: boolean;
};

interface ContactFormState {
  name: Field;
  email: Field;
  message: Field;
}

export default component$(() => {
  const {
    VITE_EMAILJS_SERVICE_ID,
    VITE_EMAILJS_TEMPLATE_ID,
    VITE_EMAILJS_PUBLIC_KEY,
  } = import.meta.env;

  useStylesScoped$(styles);

  const state = useStore<ContactFormState>({
    name: { value: "", isValid: true },
    email: { value: "", isValid: true },
    message: { value: "", isValid: true },
  });

  const formIsValid = useSignal(false);

  const sendEmail = $(() => {
    const { name, email, message } = state;
    emailjs.send(
      VITE_EMAILJS_SERVICE_ID,
      VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: name.value,
        email: email.value,
        message: message.value,
      },
      VITE_EMAILJS_PUBLIC_KEY
    );
    () => {};
  });

  return (
    <container class="contact form">
      <h1>Contact</h1>
      <Input
        name="name"
        formState={state}
        label="Name"
        type="text"
        errorMessage="Please enter a name."
      />
      <Input
        name="email"
        formState={state}
        label="Email"
        type="text"
        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        errorMessage="Please enter a valid email."
      />
      <Input
        name="message"
        formState={state}
        label="Message"
        type="text"
        errorMessage="Please enter a message."
      />
      <div
        class="arrow-btn"
        onClick$={() => {
          for (const field in state) {
            // @ts-ignore
            formIsValid.value = state[field].value.length > 0;
          }
          if (formIsValid.value) {
            console.log("fired");
            sendEmail();
          }
        }}
      >
        <i class="text">Submit</i>
        <RightArrow />
      </div>
    </container>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
