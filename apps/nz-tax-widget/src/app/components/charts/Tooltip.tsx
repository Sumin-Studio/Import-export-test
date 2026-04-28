// Define an interface for the data structure
interface DataItem {
  category: string;
  tipCategory: string;
  quantityDue?: number;
  ammountDue?: number;
  quantityOverdue?: number;
  ammountOverdue?: number;
}

export const customTooltipContent = (
  context: { x: string },
  data: DataItem[]
): string => {
  const dataItem = data.find((d) => d.category === context.x);
  if (!dataItem) return "";
  return `
          <span style="font-weight: 600; margin-bottom: 4px; display: block;">${dataItem.tipCategory}</span>
          <ul>
          ${
            dataItem.quantityDue && dataItem.ammountDue
              ? `
            <li style="display: flex; flex-direction: row; justify-content: space-between;">
              <span>${dataItem.quantityDue.toLocaleString()} awaiting payment</span>
              <span>${dataItem.ammountDue.toFixed(2).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",")}</span>
            </li>
            `
              : ""
          }
            ${(() => {
              if (
                dataItem.quantityDue &&
                dataItem.quantityOverdue &&
                dataItem.ammountOverdue
              ) {
                return `
                  <li style="display: flex; flex-direction: row; justify-content: space-between;">
                    <span>${dataItem.quantityOverdue.toLocaleString()} of ${dataItem.quantityDue.toLocaleString()} overdue</span>
                    <span>${dataItem.ammountOverdue.toFixed(2).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",")}</span>
                  </li>
                `;
              } else if (dataItem.quantityOverdue && dataItem.ammountOverdue) {
                return `
                  <li style="display: flex; flex-direction: row; justify-content: space-between;">
                    <span>${dataItem.quantityOverdue.toLocaleString()} overdue</span>
                    <span>${dataItem.ammountOverdue.toFixed(2).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",")}</span>
                  </li>
                `;
              }
              return "";
            })()}
          </ul>
        `;
};

/** Shared HTML for Highcharts column tooltips (callout card). */
export function chartCalloutTooltipHtml(opts: {
  title: string;
  rows: Array<{ label: string; value: string; color: string }>;
}): string {
  const rowsHtml = opts.rows
    .map(
      (row) => `
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:4px;">
          <div style="width:8px;height:8px;background:${row.color};border-radius:100%;flex-shrink:0;"></div>
          <div style="flex-grow:1;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#000a1e;">${row.label}</div>
          <div style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#000a1e;white-space:nowrap;">${row.value}</div>
        </div>`
    )
    .join("");
  return `
    <div style="background:#ffffff;border:1px solid #a6a9b0;border-radius:8px;padding:16px;box-shadow:0 2px 8px rgba(0,10,30,0.12);min-width:200px;">
      <div style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-weight:700;font-size:13px;line-height:20px;color:#000a1e;margin-bottom:8px;">${opts.title}</div>
      ${rowsHtml}
    </div>`;
}
