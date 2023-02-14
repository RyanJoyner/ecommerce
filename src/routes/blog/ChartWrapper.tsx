// @ts-nocheck
import { component$, useTask$, useSignal } from "@builder.io/qwik";
import { TreeMap } from "./D3Treemap/TreeMap";

interface ChartWrapperProps {
  data: any;
  store: any; // selection index
}

export default component$(({ data, store }: ChartWrapperProps) => {
  const chartRef = useSignal<Element>();

  useTask$(
    () => {
      chartRef.value?.append(
        TreeMap(data, {
          value: (d) => d.size, // size of each node (file); null for internal nodes (folders)
          group: (d, n) => n.ancestors().slice(-2)[0].data.name, // e.g., "animate" in flare/animate/Easing; color
          label: (d, n) =>
            [
              ...d.name.split(/(?=[A-Z][a-z])/g),
              n.value.toLocaleString("en"),
            ].join("\n"),
          title: (d, n) =>
            `${n
              .ancestors()
              .reverse()
              .map((d) => d.data.name)
              .join(".")}\n${n.value.toLocaleString("en")}`,
          paddingTop: 20,
          paddingBottom: 200,
          paddingLeft: 200,
          height: 700,
          width: 600,
          callBack: (name, message) => {
            store.name = name;
            store.message = message;
          },
        })
      );
      () => {
        chartRef.value?.append();
      };
    },
    { eagerness: "load" }
  );

  return <div ref={chartRef} style={{ marginLeft: "-50px" }}></div>;
});
