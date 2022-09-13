import React from "react";

const SOCIALS = [
  {
    label: "Twitter",
    link: "https://twitter.com/GavrilaAndrew",
    className: "brightness-button text-skin-primary hover:text-skin-hover mr-4",
  },
  {
    label: "Github",
    link: "https://github.com/mgavrila/vite-app",
    className: "brightness-button text-skin-primary hover:text-skin-hover",
  },
];

export const AppFooter: React.FC = () => {
  return (
    <footer className="flex flex-row h-10 w-full pr-3 pl-3 pt-2 fixed bottom-0 justify-end bg-skin-base">
      {SOCIALS.map((socialItem) => (
        <a
          key={socialItem.label}
          href={socialItem.link}
          target="_blank"
          rel="noopener noreferrer"
          className={socialItem.className}
        >
          {socialItem.label}
        </a>
      ))}
    </footer>
  );
};
