import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
const TopicCard = ({
  topic,
  onSelect
}) => {
  return <div className={`p-4 border rounded-lg ${topic.color} transition-all hover:shadow-md cursor-pointer`} onClick={onSelect}>
      <div className="flex items-start mb-3">
        <div className={`p-2 rounded-full ${topic.iconBg} mr-3`}>
          {topic.icon}
        </div>
        <h3 className="text-md font-medium text-gray-900">{topic.title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
      <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium" onClick={e => {
      e.stopPropagation();
      onSelect();
    }}>
        Request action plan <ArrowRightIcon className="h-4 w-4 ml-1" />
      </button>
    </div>;
};
export default TopicCard;