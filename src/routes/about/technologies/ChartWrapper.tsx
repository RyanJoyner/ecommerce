import { component$, useTask$, useSignal } from "@builder.io/qwik";
import { BubbleChart } from "./D3BubbleChart/BubbleChart";

import data from "./data";

export default component$(({ store }: { store: any }) => {
  const chartRef = useSignal<Element>();

  useTask$(
    () => {
      chartRef.value?.append(
        // @ts-ignore
        BubbleChart(data, {
          // @ts-ignore
          value: (d) => d.value,
          // @ts-ignore
          label: (d) => d.id,
          // @ts-ignore
          group: (d) => d.value,
          // @ts-ignore
          groups: [],
          // @ts-ignore
          callBack: (index) => {
            store.index = index;
          },
          colors: ["#BCAE43", "#CABF68", "#D8CF8D", "#CCCCCC", "#E6E6E6"],
        })
      );
      () => {
        chartRef.value?.append();
      };
    },
    { eagerness: "load" }
  );
  return (
    <div
      ref={chartRef}
      style={{ marginLeft: "-20px" }}
    ></div>
  );
});
