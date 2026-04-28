interface MenuProps {
  onClose: () => void;
}

export default function UserMenu({ onClose }: MenuProps) {
  return (
    <>
      <h3 className="mx-5 my-2 text-[11px]/[16px] font-bold uppercase">
        Alex Driver
      </h3>
      <ul>
        <li>
          <button
            aria-disabled="true"
            className="hover:bg-background-tertiary flex w-full items-center gap-1 px-3 text-left"
            type="button"
            onClick={onClose}
          >
            <span className="flex size-[36px] flex-none items-center justify-center">
              <svg
                fill="none"
                height="18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.309 7.418a3.691 3.691 0 107.383 0 3.691 3.691 0 00-7.383 0zm8.552 7.823a6.853 6.853 0 00-9.722 0"
                  stroke="#002A46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.09 9a7.91 7.91 0 1015.82 0A7.91 7.91 0 001.09 9z"
                  stroke="#002A46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Profile
          </button>
        </li>
        <li>
          <button
            aria-disabled="true"
            className="hover:bg-background-tertiary flex w-full items-center gap-1 px-3 text-left"
            type="button"
            onClick={onClose}
          >
            <span className="flex size-[36px] flex-none items-center justify-center">
              <svg
                fill="none"
                height="18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.145 1.09h13.711s1.054 0 1.054 1.055v13.711s0 1.054-1.054 1.054H2.145s-1.055 0-1.055-1.054V2.145s0-1.055 1.055-1.055zm7.558 10.547h4.043m-9.492 0h1.934"
                  stroke="#002A46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  clipRule="evenodd"
                  d="M9.703 11.637a1.758 1.758 0 11-3.516 0 1.758 1.758 0 013.516 0z"
                  stroke="#002A46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.406 6.363H4.254"
                  stroke="#002A46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  clipRule="evenodd"
                  d="M13.922 6.363a1.757 1.757 0 10-3.515 0 1.757 1.757 0 003.515 0z"
                  stroke="#002A46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Account
          </button>
        </li>
      </ul>
      <hr className="border-border-primary my-3 h-px w-full" />
      <ul>
        <li>
          <button
            aria-disabled="true"
            className="hover:bg-background-tertiary flex w-full items-center gap-1 px-3 text-left"
            type="button"
            onClick={onClose}
          >
            <span className="flex size-[36px] flex-none items-center justify-center">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.7467 8.38574H16.82"
                  stroke="#002A46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.1835 11.022L16.82 8.38551L14.1835 5.74902"
                  stroke="#002A46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.547 11.546V14.7097C11.5591 14.9766 11.4649 15.2374 11.2852 15.435C11.1055 15.6326 10.8548 15.751 10.588 15.7643H1.95934C1.69267 15.7509 1.44218 15.6324 1.26261 15.4348C1.08305 15.2371 0.989014 14.9765 1.00106 14.7097V2.0546C0.988827 1.78781 1.0828 1.52705 1.2624 1.32939C1.442 1.13174 1.6926 1.0133 1.95934 1H10.588C10.8548 1.0133 11.1055 1.13171 11.2852 1.32935C11.4649 1.52698 11.5591 1.78774 11.547 2.0546V5.21838"
                  stroke="#002A46"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            Log out
          </button>
        </li>
      </ul>
    </>
  );
}
