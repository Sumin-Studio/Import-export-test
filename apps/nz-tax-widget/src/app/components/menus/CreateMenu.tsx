interface MenuProps {
  onClose: () => void;
}

const createMenuItems = [
  {
    label: "Invoice",
  },
  {
    label: "Payment link",
  },
  {
    label: "Bill",
  },
  {
    label: "Contact",
  },
  {
    label: "Quote",
  },
  {
    label: "Purchase order",
  },
  {
    label: "Spend money",
  },
  {
    label: "Receive money",
  },
  {
    label: "Transfer money",
  },
];

export default function CreateMenu({ onClose }: MenuProps) {
  return (
    <nav className="text-content-primary">
      <span className="block w-full px-5 py-2 text-[11px]/[16px] leading-[130%] font-bold uppercase">
        Create new
      </span>
      <ul className="flex flex-col text-[15px]/[20px]">
        {createMenuItems.map((item) => (
          <li key={item.label}>
            <button
              className="hover:bg-background-tertiary block w-full px-5 py-2 text-left"
              type="button"
              onClick={onClose}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
