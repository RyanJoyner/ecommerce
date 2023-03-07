import {
  $,
  component$,
  useBrowserVisibleTask$,
  useSignal,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import emailjs from "@emailjs/browser";

import Input from "~/components/inputs";
import { RightArrow } from "~/components/icons";
import Toast from "../../components/toast";

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
  const successMessageState = useSignal(false);

  useBrowserVisibleTask$(({ track }) => {
    track(() => successMessageState.value);

    // TODO: For some reason the values won't clear grrr. 
    state.name.value = "";
    state.email.value = "";
    state.message.value = "";

    setTimeout(() => {
      successMessageState.value = false;
    }, 3000);
  });

  const sendEmail = $(() => {
    const { name, email, message } = state;
    emailjs
      .send(
        VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: name.value,
          email: email.value,
          message: message.value,
        },
        VITE_EMAILJS_PUBLIC_KEY
      )
      .then((res) => {
        if (res.status === 200) {
          successMessageState.value = true;
        }
      });
    () => {};
  });

  return (
    <>
      {successMessageState.value && (
        <div
          style={{
            position: "absolute",
            top: "100px",
            right: "100px",
            width: "420px",
          }}
        >
          <Toast message="Your email has been received!" state="success" />
        </div>
      )}
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
              sendEmail();
            }
          }}
        >
          <i class="text">Submit</i>
          <RightArrow />
        </div>
      </container>
    </>
  );
});
