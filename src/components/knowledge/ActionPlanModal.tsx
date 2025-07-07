import React, { useState } from 'react';
import { XIcon, CheckCircleIcon, PencilIcon, ClockIcon, CheckIcon, LoaderIcon } from 'lucide-react';
type Props = {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  status: string;
};
const ActionPlanModal = ({
  isOpen,
  onClose,
  topic,
  status,
  onImplement
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [planText, setPlanText] = useState(`1. Conduct energy audit across all buildings\n2. Identify top energy consumption sources\n3. Implement LED lighting upgrades\n4. Install smart thermostats and sensors\n5. Optimize HVAC scheduling\n6. Train facility staff on energy conservation\n7. Implement power management for office equipment\n8. Monitor and report on energy usage trends`);
  if (!isOpen) return null;
  const renderContent = () => {
    if (status === 'requesting') {
      return <div className="py-10 flex flex-col items-center justify-center">
          <LoaderIcon className="h-10 w-10 text-blue-500 animate-spin mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Requesting Action Plan
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            Our AI team is analyzing your facility data and generating a
            customized action plan for {topic.title.toLowerCase()}...
          </p>
        </div>;
    }
    if (status === 'implementing') {
      return <div className="py-10 flex flex-col items-center justify-center">
          <CheckCircleIcon className="h-10 w-10 text-green-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Action Plan Submitted
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            Your action plan for {topic.title.toLowerCase()} has been submitted
            for implementation. You'll receive updates as work progresses.
          </p>
        </div>;
    }
    return <>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${topic.iconBg} mr-3`}>
                {topic.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Action Plan: {topic.title}
              </h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                Recommended Action Steps
              </h4>
              {!isEditing ? <button onClick={() => setIsEditing(true)} className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                  <PencilIcon className="h-4 w-4 mr-1" /> Edit Plan
                </button> : <button onClick={() => setIsEditing(false)} className="flex items-center text-sm text-green-600 hover:text-green-800">
                  <CheckIcon className="h-4 w-4 mr-1" /> Done Editing
                </button>}
            </div>
            {!isEditing ? <div className="bg-gray-50 p-4 rounded-md">
                {planText.split('\n').map((step, index) => <div key={index} className="mb-2 flex items-start">
                    <div className="flex-shrink-0 mr-2">{step.charAt(0)}.</div>
                    <div>{step.substring(2)}</div>
                  </div>)}
              </div> : <textarea value={planText} onChange={e => setPlanText(e.target.value)} className="w-full h-64 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />}
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">
              Estimated Impact
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-md border border-green-100">
                <h5 className="font-medium text-green-800 mb-1">
                  Cost Savings
                </h5>
                <p className="text-green-700">Approximately $32,500 annually</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <h5 className="font-medium text-blue-800 mb-1">
                  Implementation Time
                </h5>
                <p className="text-blue-700">3-4 months</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-md border border-purple-100">
                <h5 className="font-medium text-purple-800 mb-1">ROI</h5>
                <p className="text-purple-700">18-24 months</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="h-4 w-4 mr-1" /> Generated on{' '}
              {new Date().toLocaleDateString()}
            </div>
            <div className="flex space-x-3">
              <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={onImplement} className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">
                Implement Plan
              </button>
            </div>
          </div>
        </div>
      </>;
  };
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline" onClick={e => e.stopPropagation()}>
          {renderContent()}
        </div>
      </div>
    </div>;
};
export default ActionPlanModal;
