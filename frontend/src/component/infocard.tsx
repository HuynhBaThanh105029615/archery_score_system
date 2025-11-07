import Link from "next/link";

interface InfoCardProps {
  image: string;
  alt: string;
  title: string;
  description: string;
  buttonText: string;
  href?: string; // optional because some cards might not use Link
}

export function InfoCard({
  image,
  alt,
  title,
  description,
  buttonText,
  href,
}: InfoCardProps) {
  const cardContent = (
    <button className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 transition-all duration-300">
      {buttonText}
    </button>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-5 flex flex-col items-center">
      <img
        src={image}
        alt={alt}
        className="w-full h-56 object-cover rounded-xl mb-4"
      />
      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
        {title}
      </h2>
      <p className="text-gray-600 text-center mb-5">{description}</p>

      {href ? (
        <Link href={href} className="w-full">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  );
}
