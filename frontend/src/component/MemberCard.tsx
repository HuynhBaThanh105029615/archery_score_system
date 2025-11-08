import React from "react";

// Define the type for a single team member
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

interface MemberCardProps {
    teamMembers: TeamMember[]
}

const MemberCard: React.FC<MemberCardProps> = ({ teamMembers }) => {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
            <div
                key={member.name}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
            >
                <img
                src={member.avatarUrl}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
                <p className="text-gray-600 mt-2 text-sm">{member.bio}</p>
            </div>
            ))}
        </div>
    );
}

export default MemberCard;