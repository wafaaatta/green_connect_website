import React from 'react';

interface NotificationItemProps {
  imageUrl: string;
  content: string;
  time: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ imageUrl, content, time }) => {
  return (
    <div className="flex items-start border-b-2 space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm px-4 py-2 cursor-pointer">
      <img src={imageUrl} alt="Notification" className="h-8 w-8 rounded-full object-cover ml-2" />
      <div className="flex-1">
        <p className="text-sm text-gray-700 dark:text-gray-300">{content}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
