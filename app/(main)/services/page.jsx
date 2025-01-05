import React from "react";

const ServicesPage = () => {
  const allLinks = [
    { href: "/crud", linkText: "crud" },
    { href: "/form", linkText: "form" },
  ];
  return (
    <div>
      <div className="service-page">
        {allLinks.map((link) => (
          <li className="list-none hover:text-blue-500 hover:underline text-2xl">
            <a href={link.href}>{link.linkText}</a>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
