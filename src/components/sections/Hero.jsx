import { useLang } from "../../app/LangContext";
import Brand from "../ui/Brand";
import Shot from "../ui/Shot";
import Slots from "../ui/Slots";
import "./Hero.css";

export default function Hero() {
  const { c } = useLang();
  const h = c.hero;
  return (
    <div className="hero" id="top">
      <div>
        <h1>
          <Brand />
        </h1>
        <p className="eta">{h.eta}</p>
        <p className="lead">{h.lead}</p>

        <Slots />
        <p className="more-ways">
          <a href={`#${c.stores.id}`}>{c.get.other}</a>
        </p>
      </div>
      <div className="devices">
        <div className="tablet">
          <Shot
            device="tablet"
            name="board"
            alt={h.alt.tablet}
            eager
            small
            crisp
            sizes="(min-width: 1160px) 590px, (min-width: 861px) 50vw, calc(100vw - 32px)"
          />
        </div>
        <div className="phone">
          <Shot device="phone" name="hero" alt={h.alt.phone} eager small />
        </div>
      </div>
    </div>
  );
}
