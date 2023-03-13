import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./_carousel.scss?inline";
import Link from "../buttons/Link";

interface CarouselProps {
  items: any;
}

export default component$(({ items }: CarouselProps) => {
  useStylesScoped$(styles);
  const currentIndex = useSignal(0);
  const slideDirection = useSignal("");

  return (
    <div class="carousel">
      {items.map(({}, i: number) => {
        return (
          <input
            class={`carousel-locator ${i === currentIndex.value && "active"}`}
            id={`slide-${i}}`}
            type="radio"
            name="carousel-radio"
            hidden={true}
            checked={currentIndex.value === i}
          />
        );
      })}

      <div
        class={`left-arrow`}
        onClick$={() => {
          currentIndex.value =
            currentIndex.value - 1 === -1
              ? currentIndex.value
              : currentIndex.value - 1;

          slideDirection.value = "left";
        }}
      >
        <i
          class={`icon icon-arrow-left ${
            0 === currentIndex.value ? "end" : ""
          }`}
        ></i>
      </div>

      <div
        class={`right-arrow ${0 === currentIndex.value ? "end" : ""}`}
        onClick$={() => {
          currentIndex.value =
            currentIndex.value + 1 === items.length
              ? currentIndex.value
              : currentIndex.value + 1;

          slideDirection.value = "right";
        }}
      >
        <i
          class={`icon icon-arrow-right ${
            items.length - 1 === currentIndex.value ? "end" : ""
          }`}
        ></i>
      </div>

      <div class="carousel-container">
        {items.map(({ img }: { img: string }, i: number) => {
          return (
            <img
              class={`carousel-item ${i === currentIndex.value && "active"} ${
                slideDirection.value
              }`}
              src={img}
              alt=""
            />
          );
        })}
      </div>

      <div class="carousel-nav">
        {items.map(({}, i: number) => {
          return (
            <div
              class={`nav-item text-hide c-hand ${
                i === currentIndex.value && "active"
              }`}
              onClick$={() => {
                currentIndex.value = i;
              }}
            />
          );
        })}
      </div>
    </div>
  );
});
