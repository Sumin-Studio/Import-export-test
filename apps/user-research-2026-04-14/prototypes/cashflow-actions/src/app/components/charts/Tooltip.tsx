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
  data: DataItem[],
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
