import React from 'react';
import { Cake, Phone, Mail, CalendarDays, Zap, Edit } from 'lucide-react';
import Breadcrumbs from '../../common/Breadcrumbs';

// A helper component for each detail row
const ProfileDetail = ({ Icon, label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center space-x-4 text-gray-700">
      <Icon className="w-5 h-5 text-gray-500" />
      <span className="font-medium">{label}</span>
    </div>
    <span className="text-gray-800 font-semibold">{value}</span>
  </div>
);

const ProfileCard = () => {
  // Mock data based on the screenshot
  const profileData = {
    dateOfBirth: '20-01-2003',
    phone: '+91 987654321',
    email: 'krithishetty@gmail.com',
    dateOfJoining: '15- Dec-2021',
    profileImageUrl: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png', // Replace with the actual image URL
  };

  return (
  
      <div className="w-full rounded-xl bg-white p-3 overflow-hidden">
        <Breadcrumbs/>
        

        {/* Details Section */}
        <div className="px- pb-6 pt-2">
         
          <ProfileDetail 
            Icon={Phone} 
            label="Phone" 
            value={profileData.phone} 
          />
          <ProfileDetail 
            Icon={Mail} 
            label="Email" 
            value={profileData.email} 
          />
          <ProfileDetail 
            Icon={CalendarDays} 
            label="Date of joining" 
            value={profileData.dateOfJoining} 
          />
         
        </div>

        {/* Edit Profile Button */}
        <div className="p-6 pt-0">
          {/* <button
            className="flex items-center justify-center w-full px-4 py-3 text-lg font-semibold text-white bg-primary rounded-lg hover:bg-blue-600 transition duration-150 shadow-md shadow-blue-300"
            onClick={() => console.log('Edit Profile Clicked')}
          >
            <Edit className="w-5 h-5 mr-2" />
            Edit Profile
          </button> */}
        </div>
      </div>
  );
};

export default ProfileCard;