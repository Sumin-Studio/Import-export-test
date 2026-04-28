interface ComponentProps {
  className?: string;
}

export default function HubspotOverflow({ className = "" }: ComponentProps) {
  return (
    <div className={className}>
      <nav className="text-[15px]/[24px]">
        <button
          className="flex w-full items-center justify-between px-3 text-left hover:bg-background-primary"
          type="button"
        >
          <span className="flex items-center gap-1">
            <svg
              fill="none"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M19.5 27a7.5 7.5 0 100-15 7.5 7.5 0 000 15zm-.991-5.002V24h2.041v-2.002h-2.041zm-2.093-4.29h1.911c0-.234.026-.453.078-.656a1.58 1.58 0 01.24-.534c.109-.151.247-.273.416-.364.17-.09.371-.136.605-.136.347 0 .617.095.813.286.195.19.292.485.292.884.009.234-.033.429-.123.585-.091.156-.21.299-.358.429-.147.13-.308.26-.481.39s-.338.284-.494.462a2.687 2.687 0 00-.41.643c-.117.251-.188.563-.214.936v.585h1.755v-.494c.035-.26.12-.477.253-.65.135-.173.289-.327.462-.462.173-.134.357-.268.552-.402a2.532 2.532 0 00.936-1.176c.109-.27.163-.612.163-1.028a2.334 2.334 0 00-.702-1.625c-.251-.251-.583-.462-.994-.63-.412-.17-.926-.254-1.541-.254-.477 0-.908.08-1.293.24a2.87 2.87 0 00-.988.67 3.054 3.054 0 00-.637 1.014c-.152.39-.232.819-.241 1.287z"
                fill="#59606D"
                fillRule="evenodd"
              />
            </svg>
            Help
          </span>
          <svg
            fill="none"
            height="40"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M14.01 15.09C14 14.547 14.5 14 15 14h5v1h-5v10h10v-5h1v4.91c0 .544-.5 1.09-1 1.09H15c-.5 0-1-.546-1-1.09l.01-9.82zm9.24.16L22 14h4v4l-1.25-1.25L21 20.5 19.5 19l3.75-3.75z"
              fill="#59606D"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
}
