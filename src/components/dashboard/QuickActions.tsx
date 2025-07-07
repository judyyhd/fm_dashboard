import React, { useState } from 'react';
import { XIcon, CheckCircleIcon, CheckIcon, BookmarkIcon, ArrowRightIcon } from 'lucide-react';

type QuickAction = {
  id: string;
  label: string;
  priority: 'high' | 'medium' | 'low';
  equipment: string;
  action: string;
};

const getColor = (priority: QuickAction['priority']) => {
  switch (priority) {
    case 'high': return 'bg-red-500 hover:bg-red-600';
    case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
    case 'low': return 'bg-green-500 hover:bg-green-600';
    default: return 'bg-gray-500 hover:bg-gray-600';
  }
};

const QuickActions = ({ actions }: { actions: QuickAction[] }) => {
  const [activeAction, setActiveAction] = useState<QuickAction | null>(null);
  const [isImplementing, setIsImplementing] = useState(false);

  const handleActionClick = (action: QuickAction) => {
    setActiveAction(action);
  };

  const handleImplement = () => {
    setIsImplementing(true);
    setTimeout(() => {
      setIsImplementing(false);
      setActiveAction(null);
    }, 1500);
  };

  const handleCloseAction = () => {
    setActiveAction(null);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">AI-Powered Quick Actions</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
          <BookmarkIcon className="h-4 w-4 mr-1" /> Browse & Pin
        </button>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className={`${getColor(action.priority)} text-white rounded-md p-4 flex flex-col items-center text-center transition-all hover:shadow-lg`}
            >
              <div className="bg-white/20 p-3 rounded-full mb-3">
                <CheckIcon className="h-5 w-5" />
              </div>
              <span className="font-medium mb-1">{action.label}</span>
              <span className="text-xs text-white/80 mt-1 hidden md:block">
                {action.action}
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeAction && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <div className="flex items-center">
                <div className={`${getColor(activeAction.priority).split(' ')[0]} p-2 rounded-md text-white mr-3`}>
                  <CheckIcon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{activeAction.label}</h3>
              </div>
              <button onClick={handleCloseAction} className="text-gray-400 hover:text-gray-500">
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {isImplementing ? (
              <div className="p-8 flex flex-col items-center justify-center">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Implementing Action</h3>
                <p className="text-gray-500 text-center">
                  The selected action is being implemented. Updates will be reflected shortly.
                </p>
              </div>
            ) : (
              <div>
                <div className="p-5">
                  <p className="text-gray-700 text-sm mb-2"><strong>Action:</strong> {activeAction.action}</p>
                  <p className="text-gray-500 text-sm"><strong>Equipment:</strong> {activeAction.equipment}</p>
                  <p className="text-gray-500 text-sm"><strong>Priority:</strong> {activeAction.priority}</p>
                </div>

                <div className="bg-gray-50 p-5 flex justify-between items-center border-t border-gray-200">
                  <button onClick={handleCloseAction} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                    Review Later
                  </button>
                  <button onClick={handleImplement} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
                    Implement <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;
