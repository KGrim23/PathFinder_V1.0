import Image from "next/image";
import React from "react";

type CardProps = {
  title: string;
  link: string;
  imageSrc?: string; // Optional image source
};

const Card: React.FC<CardProps> = ({ title, link, imageSrc }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      <div className="aspect-square bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-xl">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            className="object-cover w-full h-full rounded-xl"
            width={200} // Adjusted for square image responsiveness
            height={200}
          />
        ) : (
          <span className="text-gray-400 text-sm text-center px-4">
            {title}
          </span>
        )}
      </div>
    </a>
  );
};

export default Card;
