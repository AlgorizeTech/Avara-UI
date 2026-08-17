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
  <div className="my-6 w-full max-w-full overflow-x-auto lg:overflow-x-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent not-prose cursor-pointer block">
    <table className="w-full min-w-[560px] lg:min-w-0 text-sm my-0 border-collapse text-left cursor-pointer overflow-hidden table-auto">
      <thead className="bg-transparent text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 text-[12px] font-bold uppercase tracking-wider cursor-pointer">
        <tr className="divide-x divide-zinc-200 dark:divide-zinc-800 border-b border-zinc-200 dark:border-zinc-800 cursor-pointer">
          <th className="px-4 py-3.5 text-left font-bold tracking-wider whitespace-nowrap border-b border-zinc-200 dark:border-zinc-800 cursor-pointer">Prop</th>
          <th className="px-4 py-3.5 text-left font-bold tracking-wider whitespace-nowrap border-b border-zinc-200 dark:border-zinc-800 cursor-pointer">Type</th>
          <th className="px-4 py-3.5 text-left font-bold tracking-wider whitespace-nowrap border-b border-zinc-200 dark:border-zinc-800 cursor-pointer">Default</th>
          <th className="px-4 py-3.5 text-left font-bold tracking-wider whitespace-nowrap border-b border-zinc-200 dark:border-zinc-800 cursor-pointer">Required</th>
          <th className="px-4 py-3.5 text-left font-bold tracking-wider border-b border-zinc-200 dark:border-zinc-800 cursor-pointer">Description</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 cursor-pointer">
        {props.map((prop, idx) => (
          <tr
            key={prop.name + idx}
            className="divide-x divide-zinc-200 dark:divide-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors duration-150 cursor-pointer"
          >
            <td className="py-3 px-4 font-mono font-extrabold text-zinc-900 dark:text-white whitespace-nowrap cursor-pointer"><span className="cursor-text">{prop.name}</span></td>
            <td className="py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300 break-words whitespace-normal cursor-pointer"><span className="cursor-text">{prop.type}</span></td>
            <td className="py-3 px-4 font-mono text-zinc-500 dark:text-zinc-400 whitespace-nowrap cursor-pointer">
              <span className="cursor-text">{prop.default ?? "-"}</span>
            </td>
            <td className="py-3 px-4 font-mono text-zinc-500 dark:text-zinc-400 whitespace-nowrap cursor-pointer">
              <span className="cursor-text">{prop.required ? "Yes" : "No"}</span>
            </td>
            <td className="py-3 px-4 break-words whitespace-normal leading-relaxed text-zinc-600 dark:text-zinc-400 cursor-pointer"><span className="cursor-text">{prop.description}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
