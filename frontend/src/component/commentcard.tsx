interface CommentCardProps {
  avatar: string;
  alt: string;
  name: string;
  message: string;
}

export function CommentCard({ avatar, alt, name, message }: CommentCardProps) {
  return (
    <div className="flex items-start gap-4 mb-6 bg-gray-50 p-5 rounded-xl shadow-sm">
      <img
        src={avatar}
        alt={alt}
        className="w-12 h-12 rounded-full border border-gray-300"
      />
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-gray-600 text-sm mt-1">{message}</p>
      </div>
    </div>
  );
}
