import { component$, useOn, Slot, QRL } from "@builder.io/qwik";

export default component$(
  ({
    eventName,
    callBack,
  }: {
    eventName: string;
    callBack: QRL<() => void>;
  }) => {
    useOn(eventName, callBack);
    return (
      <div>
        <Slot />
      </div>
    );
  }
);
