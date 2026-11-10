import { useEffect, useRef, useState } from "react";
import { useLang } from "../../app/LangContext";
import Icon from "../ui/Icon";
import Shot from "../ui/Shot";
import Tick from "../ui/Tick";
import { read, write } from "../../app/storage";
import "../ui/Seg.css";
import "./Showcase.css";

const DEVICE_KEY = "mv-device";
const SETTLE_MS = 1500;
const DEVICES = [
  { key: "tablet", icon: "tablet_mac" },
  { key: "phone", icon: "smartphone" },
];

const fill = (template, values) =>
  template.replace(/\{(\w+)\}/g, (_, name) => values[name]);

export default function Showcase() {
  const { c } = useLang();
  const s = c.showcase;
  const total = s.slides.length;
  const [device, setDevice] = useState("tablet");
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const view = useRef(null);
  const dots = useRef([]);
  const timer = useRef(0);
  const goal = useRef(null);

  useEffect(() => {
    const saved = read(DEVICE_KEY);
    if (DEVICES.some((d) => d.key === saved)) setDevice(saved);
    else if (window.matchMedia?.("(max-width: 760px)").matches)
      setDevice("phone");
    setReady(true);
    return () => clearTimeout(timer.current);
  }, []);

  const choose = (key) => {
    write(DEVICE_KEY, key);
    setDevice(key);
  };

  const go = (target) => {
    const next = ((target % total) + total) % total;
    const wrapped = next !== target;
    setIndex(next);
    goal.current = { index: next, at: Date.now() };
    const el = view.current;
    const slide = el?.children[next];
    if (slide && el.scrollTo) {
      const reduced = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      el.scrollTo({
        left: slide.offsetLeft - el.offsetLeft,
        behavior: reduced || wrapped ? "auto" : "smooth",
      });
    }
    return next;
  };

  const onScroll = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const el = view.current;
      if (!el || !el.clientWidth) return;
      const seen = Math.round(el.scrollLeft / el.clientWidth);
      const aim = goal.current;
      if (aim && Date.now() - aim.at < SETTLE_MS) {
        if (seen !== aim.index) return;
        goal.current = null;
      }
      setIndex(seen);
    }, 90);
  };

  const onViewKey = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
  };

  const onDotsKey = (event) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[
      event.key
    ];
    if (!step) return;
    event.preventDefault();
    dots.current[go(index + step)]?.focus();
  };

  return (
    <section id={s.id}>
      <div className="wrap">
        <h2 className="t">{s.title}</h2>
        <p className="sub">{s.sub}</p>
        <div
          className="car"
          data-device={device}
          role="region"
          aria-roledescription="carousel"
          aria-label={s.carouselLabel}
        >
          <div className="dev-switch">
            <div className="seg" role="group" aria-label={s.deviceLabel}>
              {DEVICES.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  aria-pressed={device === d.key}
                  onClick={() => choose(d.key)}
                >
                  <Icon name={d.icon} />
                  {s.devices[d.key]}
                </button>
              ))}
            </div>
          </div>
          <div
            className="car-view"
            ref={view}
            tabIndex={0}
            onScroll={onScroll}
            onKeyDown={onViewKey}
          >
            {s.slides.map((slide, i) => {
              const off = ready && i !== index;
              return (
                <div
                  className="slide"
                  key={slide.key}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={fill(s.slideOf, { n: i + 1, total })}
                  inert={off ? "" : undefined}
                  aria-hidden={off ? "true" : undefined}
                >
                  <div className="shot s-t">
                    <Shot
                      device="tablet"
                      name={slide.key}
                      alt={slide.alt.tablet}
                      small
                      sizes="(min-width: 861px) 600px, calc(100vw - 80px)"
                    />
                  </div>
                  <div className="shot s-p">
                    <Shot
                      device="phone"
                      name={slide.key}
                      alt={slide.alt.phone}
                      small
                      sizes="250px"
                    />
                  </div>
                  <div className="txt">
                    <h3>{slide.title}</h3>
                    <ul className="ticks">
                      {slide.ticks.map((t) => (
                        <li key={t}>
                          <Tick />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="car-ctl">
            <button
              className="btn car-prev"
              type="button"
              onClick={() => go(index - 1)}
            >
              <Icon name="prev" />
              {s.prev}
            </button>
            <div
              className="dots"
              role="radiogroup"
              aria-label={s.dotsLabel}
              onKeyDown={onDotsKey}
            >
              {s.slides.map((slide, i) => (
                <button
                  key={slide.key}
                  type="button"
                  role="radio"
                  aria-checked={i === index}
                  aria-label={fill(s.screen, { n: i + 1, total })}
                  tabIndex={i === index ? 0 : -1}
                  ref={(el) => {
                    dots.current[i] = el;
                  }}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <button
              className="btn car-next"
              type="button"
              onClick={() => go(index + 1)}
            >
              {s.next}
              <Icon name="next" />
            </button>
            <span className="sr-only count" aria-live="polite">
              {fill(s.screen, { n: index + 1, total })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
