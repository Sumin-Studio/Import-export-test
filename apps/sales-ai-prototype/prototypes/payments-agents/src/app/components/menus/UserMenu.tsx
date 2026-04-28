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
            className="flex w-full items-center gap-1 px-3 text-left hover:bg-background-tertiary"
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
            className="flex w-full items-center gap-1 px-3 text-left hover:bg-background-tertiary"
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
      <hr className="my-3 h-px w-full border-border-primary" />
      <ul>
        <li>
          <button
            aria-disabled="true"
            className="flex w-full items-center gap-1 px-3 text-left hover:bg-background-tertiary"
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
                  d="M13.746 7.418H4.254c-.583 0-1.055.472-1.055 1.055v7.383c0 .582.472 1.054 1.055 1.054h9.492c.583 0 1.055-.472 1.055-1.054V8.473c0-.583-.472-1.055-1.055-1.055zm-8.437 0V4.781a3.691 3.691 0 017.382 0v2.637"
                  stroke="#000A1E"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12.164a.264.264 0 110-.527m0 .527a.264.264 0 100-.527"
                  stroke="#000A1E"
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
