import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  user: {
    name?: string;
    image?: string;
  };
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  const getInitials = (name: string) => {
    return name?.charAt(0).toUpperCase() || '?';
  };

  return (
    <Avatar className="h-10 w-10 border-2 border-blue-100">
      {user.image ? (
        <AvatarImage src={user.image} alt={user.name} />
      ) : (
        <AvatarFallback className="bg-blue-600 text-white">
          {getInitials(user.name || '')}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;