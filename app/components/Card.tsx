import Image from "next/image";
import React from "react";

type CardProps = {
  title: string;
  link: string;
  imageSrc?: string;
};

const Card: React.FC<CardProps> = ({ title, link, imageSrc }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      <div className="aspect-square relative bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-xl">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            className="object-cover w-full h-full rounded-xl"
            width={200}
            height={200}
          />
        ) : null}

        <span className="absolute left-0 right-0 text-white bg-white bg-opacity-0 text-xs text-center px-2 py-1 rounded-tl-lg rounded-tr-lg">
          {title}
        </span>
      </div>
    </a>
  );
};

export default Card;
