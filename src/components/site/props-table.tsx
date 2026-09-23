/**
 * Prop, Type and Default read as plain monospace text, not chips: the name in
 * the ink, its type and default a step lighter. They are spans, not <code>,
 * because globals.css restyles every <code> in a table cell. For the same
 * reason the wrapper scrolls via `[overflow-x:auto]` rather than the bare
 * `overflow-x-auto` class, which globals.css restyles with !important.
 */
const MONO = "font-mono text-[12px] leading-[1.55] [overflow-wrap:anywhere]";
const PROP_CHIP = `${MONO} font-medium text-foreground`;
const TYPE_CHIP = `${MONO} text-foreground/70`;
const DASH = "font-mono text-[12px] text-foreground/40";

const TH =
  "border-b border-foreground/[0.06] bg-foreground/[0.07] px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-foreground/60 lg:px-4 lg:py-2.5";
const TD = "px-3 py-2 align-baseline lg:px-4 lg:py-2.5";

export const PropsTable = ({
  props,
}: {
  props: {
    name: string;
    type: string;
    default?: string;
    description: string;
    required?: boolean;
  }[];
}) => (
  <div className="not-prose my-6 block w-full max-w-full cursor-pointer rounded-xl border border-foreground/[0.06] bg-foreground/[0.05] [overflow-x:auto]">
    <table className="my-0 w-full min-w-[560px] table-auto cursor-pointer border-collapse text-left text-[13px] text-foreground/55 lg:min-w-0">
      <thead className="cursor-pointer">
        <tr className="cursor-pointer">
          <th className={`${TH} whitespace-normal [overflow-wrap:anywhere]`}>Prop</th>
          <th className={`${TH} border-l whitespace-normal [overflow-wrap:anywhere]`}>Type</th>
          <th className={`${TH} border-l whitespace-normal [overflow-wrap:anywhere]`}>Default</th>
          <th className={`${TH} border-l whitespace-normal [overflow-wrap:anywhere]`}>Required</th>
          <th className={`${TH} border-l`}>Description</th>
        </tr>
      </thead>
      <tbody className="cursor-pointer">
        {props.map((prop, idx) => (
          <tr
            key={prop.name + idx}
            className="cursor-pointer border-b border-foreground/[0.08] transition-colors duration-150 last:border-b-0 hover:bg-foreground/[0.07]"
          >
            <td className={`${TD} whitespace-normal cursor-pointer`}>
              <span className={`${PROP_CHIP} cursor-text`}>{prop.name}</span>
            </td>
            <td className={`${TD} whitespace-normal cursor-pointer`}>
              <span className={`${TYPE_CHIP} cursor-text`}>{prop.type}</span>
            </td>
            <td className={`${TD} whitespace-normal cursor-pointer`}>
              {prop.default ? (
                <span className={`${TYPE_CHIP} cursor-text`}>{prop.default}</span>
              ) : (
                <span className={`${DASH} cursor-text`}>–</span>
              )}
            </td>
            <td className={`${TD} whitespace-normal [overflow-wrap:anywhere] cursor-pointer`}>
              <span className="cursor-text">{prop.required ? "Yes" : "No"}</span>
            </td>
            <td className={`${TD} whitespace-normal [overflow-wrap:anywhere] text-[12.5px] leading-relaxed text-foreground/55 cursor-pointer`}>
              <span className="cursor-text">{prop.description}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
