import React from 'react';

export const FloatingSocialBar: React.FC = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/djtrustbatapola/',
      bgColor: 'bg-[#1877f2] hover:bg-[#166fe5]',
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 320 512" aria-hidden="true">
          <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V137.9c0-26.6 13.1-52.6 54.8-52.6H296V1.7C286.2.4 252.8 0 214 0 133 0 80 49.2 80 138.8V201.5H0v97.8h80z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/94761355465',
      bgColor: 'bg-[#25d366] hover:bg-[#20bd5a]',
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 448 512" aria-hidden="true">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/dj-trust/',
      bgColor: 'bg-[#0a66c2] hover:bg-[#08549e]',
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 448 512" aria-hidden="true">
          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      aria-label="Social Media Links"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5 select-none"
    >
      {socialLinks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
          aria-label={item.name}
          className={`w-11 h-11 sm:w-12 sm:h-12 ${item.bgColor} flex items-center justify-center rounded-l-full rounded-r-none text-white shadow-[0_4px_12px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-x-1.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95`}
        >
          {item.icon}
        </a>
      ))}
    </aside>
  );
};

