import React from "react";

const SurfCampCard = ({ pic, topic, body1, body2, link, index }) => {
  const handleCardClick = () => {
    window.location.href = link;
  };

  return (
    <div
      className={`${index === 0 || index === 1 ? 'relative bg-cover bg-center h-[360px] flex items-end justify-center shadow-lg cursor-pointer' : 'relative bg-cover bg-center h-[420px] flex items-end justify-center shadow-lg cursor-pointer'}`}
      style={{
        backgroundImage: `url(/${pic})`,
      }}
      onClick={handleCardClick}
    >
      <div className=" bg-opacity-50 text-white p-6 rounded-md text-center w-full max-h-full">
        <h1 className="text-2xl font-bold mb-2 leading-6">{topic}</h1>
        <p className="text-sm mb-2 leading-4">{body1}</p>
        <p className="text-sm mb-4">{body2}</p>
        {index !== 3 && (
          <a 
            href={link} 
            className="text-white border-2 border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition"
            onClick={(e) => e.stopPropagation()}
          >
            BOOK NOW
          </a>
        )}
      </div>
    </div>
  );
};

export default SurfCampCard;