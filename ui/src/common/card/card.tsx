import React, { FunctionComponent } from "react";
import { CardProps } from "./types";

export const Card: FunctionComponent<CardProps> = ({
  info,
  className,
  title,
  cardImage,
  tags,
}) => (
  <div className={`max-w-sm rounded overflow-hidden shadow-lg ${className}`}>
    {cardImage ? (
      <img className="w-full" src={cardImage.src} alt={cardImage.alt} />
    ) : null}
    {title || info ? (
      <div className="px-6 py-4">
        {title ? <div className="font-bold text-xl mb-2">{title}</div> : null}
        {info ? <p className="text-base">{info}</p> : null}
      </div>
    ) : null}
    {tags && tags.length ? (
      <div className="px-6 py-4">
        <ul>
          {tags.map((item) => (
            <li
              className="rounded-full inline-block bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900 mr-2"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    ) : null}
  </div>
);
