import React, { useEffect, useState, useRef } from 'react';
import { SendIcon, LoaderIcon, CheckCircleIcon, XIcon, MessageSquareIcon, ArrowRightIcon, ClipboardCheckIcon, CalendarIcon, MinimizeIcon, ChevronDownIcon } from 'lucide-react';
interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}
interface ActionPlan {
  title: string;
  steps: string[];
  estimatedImpact: {
    costSavings: string;
    implementationTime: string;
    roi: string;
  };
  relatedItems?: {
    tasks?: {
      id: string;
      title: string;
    }[];
    inspections?: {
      id: string;
      title: string;
    }[];
    events?: {
      id: string;
      title: string;
      date: string;
    }[];
  };
}
interface ChatInterfaceProps {
  onImplementPlan: (plan: ActionPlan) => void;
  onCustomizePlan: (plan: ActionPlan) => void;
}
const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onImplementPlan,
  onCustomizePlan
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentPlan, setCurrentPlan] = useState<ActionPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages]);
  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isGenerating) return;
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsGenerating(true);
    // Add loading message
    const loadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: 'Analyzing facility data and generating a response...',
      timestamp: new Date(),
      isLoading: true
    };
    setMessages(prev => [...prev, loadingMessage]);
    // Simulate response with mock data (would be replaced with actual API call)
    setTimeout(() => {
      setIsGenerating(false);
      // Remove loading message
      setMessages(prev => prev.filter(msg => !msg.isLoading));
      // Generate response based on user input
      const plan = generateMockResponse(inputValue);
      setCurrentPlan(plan);
      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: `Here's an action plan for "${plan.title}":`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 2000);
  };
  const generateMockResponse = (query: string): ActionPlan => {
    // This would be replaced with actual backend logic
    if (query.toLowerCase().includes('hvac') || query.toLowerCase().includes('energy')) {
      return {
        title: 'HVAC Energy Optimization',
        steps: ['Conduct energy audit of all HVAC systems', 'Adjust temperature setpoints by 2°F during non-peak hours', 'Clean or replace air filters in all units', 'Inspect and repair duct leakage in Buildings A and B', 'Implement smart thermostat scheduling across all zones', 'Train facility staff on energy-efficient operation'],
        estimatedImpact: {
          costSavings: '$18,500 annually',
          implementationTime: '4-6 weeks',
          roi: '12-16 months'
        },
        relatedItems: {
          tasks: [{
            id: 'T-1001',
            title: 'HVAC System Audit'
          }, {
            id: 'T-1002',
            title: 'Air Filter Replacement'
          }],
          inspections: [{
            id: 'I-345',
            title: 'Duct Leakage Inspection'
          }],
          events: [{
            id: 'E-201',
            title: 'Staff Training: HVAC Efficiency',
            date: 'Aug 25, 2023'
          }]
        }
      };
    } else if (query.toLowerCase().includes('air quality') || query.toLowerCase().includes('complaint')) {
      return {
        title: 'Indoor Air Quality Improvement',
        steps: ['Conduct air quality testing in all tenant spaces', 'Increase fresh air intake by 15% during occupied hours', 'Replace MERV-8 filters with MERV-13 in all air handlers', 'Clean all air ducts and vents in affected areas', 'Implement CO2 monitoring in high-occupancy zones', 'Schedule quarterly air quality assessments'],
        estimatedImpact: {
          costSavings: 'Reduced tenant complaints by 70%',
          implementationTime: '2-3 weeks',
          roi: 'Improved tenant satisfaction and retention'
        },
        relatedItems: {
          tasks: [{
            id: 'T-1005',
            title: 'Air Quality Testing'
          }, {
            id: 'T-1006',
            title: 'HVAC Filter Upgrade'
          }],
          inspections: [{
            id: 'I-346',
            title: 'Duct Cleaning Assessment'
          }]
        }
      };
    } else if (query.toLowerCase().includes('fire') || query.toLowerCase().includes('safety') || query.toLowerCase().includes('compliance')) {
      return {
        title: 'Fire Safety Compliance Review',
        steps: ['Audit all fire safety systems against current regulations', 'Test all smoke detectors and alarms in Buildings A, B, and C', 'Inspect fire extinguishers and replace those past expiration', 'Conduct fire drill and evacuation training for all tenants', 'Update emergency exit signage where needed', 'Schedule annual fire marshal inspection'],
        estimatedImpact: {
          costSavings: 'Avoid non-compliance penalties',
          implementationTime: '3 weeks',
          roi: 'Improved safety rating and reduced insurance premiums'
        },
        relatedItems: {
          tasks: [{
            id: 'T-1010',
            title: 'Fire System Audit'
          }, {
            id: 'T-1011',
            title: 'Extinguisher Replacement'
          }],
          inspections: [{
            id: 'I-350',
            title: 'Fire Marshal Inspection'
          }],
          events: [{
            id: 'E-205',
            title: 'Tenant Fire Safety Training',
            date: 'Aug 30, 2023'
          }]
        }
      };
    } else {
      // Default response for other queries
      return {
        title: 'Facility Optimization Plan',
        steps: ['Conduct comprehensive facility assessment', 'Identify key areas for improvement based on your request', 'Develop targeted action items with measurable outcomes', 'Implement changes with minimal disruption to operations', 'Monitor results and adjust approach as needed', 'Provide detailed reporting on improvements'],
        estimatedImpact: {
          costSavings: 'Varies based on implementation',
          implementationTime: '4-8 weeks',
          roi: 'Typically 12-18 months'
        }
      };
    }
  };
  const handleImplement = () => {
    if (currentPlan) {
      onImplementPlan(currentPlan);
      setCurrentPlan(null);
      // Add confirmation message
      const confirmationMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: "Plan implementation has been initiated. You'll receive updates as tasks are completed.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, confirmationMessage]);
    }
  };
  const handleCustomize = () => {
    if (currentPlan) {
      onCustomizePlan(currentPlan);
      setCurrentPlan(null);
    }
  };
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  // Auto-resize textarea as content grows
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Reset height to auto to get the correct scrollHeight
    e.target.style.height = 'auto';
    // Set new height based on scrollHeight
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };
  return <div className={`bg-white rounded-lg shadow transition-all duration-300 overflow-hidden ${isExpanded ? 'h-[500px]' : ''}`}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50" onClick={toggleExpanded}>
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-blue-100 mr-3">
            <MessageSquareIcon className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-800">Ask Neuron AI</h2>
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          {isExpanded ? <>
              <span className="mr-2">Minimize</span>
              <ChevronDownIcon className="h-4 w-4" />
            </> : 'Not seeing what you need? Just ask.'}
        </div>
      </div>
      {isExpanded && <div className="flex flex-col h-full relative">
          {/* Collapse button */}
          <button onClick={toggleExpanded} className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 z-10" title="Collapse chat">
            <MinimizeIcon className="h-4 w-4" />
          </button>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? <div className="text-center py-8">
                <MessageSquareIcon className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-2">
                  Ask me anything about facility management
                </p>
                <div className="space-y-2 max-w-md mx-auto mt-4">
                  <div className="bg-gray-100 text-gray-700 text-sm py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-200" onClick={() => setInputValue('I want to reduce HVAC energy usage')}>
                    "I want to reduce HVAC energy usage"
                  </div>
                  <div className="bg-gray-100 text-gray-700 text-sm py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-200" onClick={() => setInputValue("We're getting tenant complaints about air quality")}>
                    "We're getting tenant complaints about air quality"
                  </div>
                  <div className="bg-gray-100 text-gray-700 text-sm py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-200" onClick={() => setInputValue("What's our current fire safety compliance status?")}>
                    "What's our current fire safety compliance status?"
                  </div>
                </div>
              </div> : <>
                {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3/4 rounded-lg p-3 ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      {message.isLoading ? <div className="flex items-center">
                          <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
                          <span>{message.content}</span>
                        </div> : <div>{message.content}</div>}
                    </div>
                  </div>)}
                {currentPlan && <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-4">
                    <h3 className="text-md font-medium text-gray-900 mb-2">
                      {currentPlan.title}
                    </h3>
                    <div className="space-y-2 mb-3">
                      {currentPlan.steps.map((step, index) => <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                            {index + 1}
                          </div>
                          <div className="text-sm text-gray-700">{step}</div>
                        </div>)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                      <div className="bg-green-50 p-2 rounded-md border border-green-100">
                        <div className="text-xs font-medium text-green-800 mb-1">
                          Impact
                        </div>
                        <div className="text-sm text-green-700">
                          {currentPlan.estimatedImpact.costSavings}
                        </div>
                      </div>
                      <div className="bg-blue-50 p-2 rounded-md border border-blue-100">
                        <div className="text-xs font-medium text-blue-800 mb-1">
                          Timeline
                        </div>
                        <div className="text-sm text-blue-700">
                          {currentPlan.estimatedImpact.implementationTime}
                        </div>
                      </div>
                      <div className="bg-purple-50 p-2 rounded-md border border-purple-100">
                        <div className="text-xs font-medium text-purple-800 mb-1">
                          ROI
                        </div>
                        <div className="text-sm text-purple-700">
                          {currentPlan.estimatedImpact.roi}
                        </div>
                      </div>
                    </div>
                    {currentPlan.relatedItems && <div className="mb-3">
                        <h4 className="text-xs font-medium text-gray-700 uppercase mb-2">
                          Related Items
                        </h4>
                        <div className="space-y-2">
                          {currentPlan.relatedItems.tasks && <div className="flex items-start">
                              <div className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                              <div className="text-sm">
                                {currentPlan.relatedItems.tasks.map((task, i) => <span key={task.id}>
                                      <span className="text-blue-600">
                                        {task.title}
                                      </span>
                                      {i < currentPlan.relatedItems!.tasks!.length - 1 ? ', ' : ''}
                                    </span>)}
                              </div>
                            </div>}
                          {currentPlan.relatedItems.inspections && <div className="flex items-start">
                              <ClipboardCheckIcon className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                              <div className="text-sm">
                                {currentPlan.relatedItems.inspections.map((inspection, i) => <span key={inspection.id}>
                                      <span className="text-blue-600">
                                        {inspection.title}
                                      </span>
                                      {i < currentPlan.relatedItems!.inspections!.length - 1 ? ', ' : ''}
                                    </span>)}
                              </div>
                            </div>}
                          {currentPlan.relatedItems.events && <div className="flex items-start">
                              <CalendarIcon className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                              <div className="text-sm">
                                {currentPlan.relatedItems.events.map((event, i) => <span key={event.id}>
                                      <span className="text-blue-600">
                                        {event.title}
                                      </span>{' '}
                                      ({event.date})
                                      {i < currentPlan.relatedItems!.events!.length - 1 ? ', ' : ''}
                                    </span>)}
                              </div>
                            </div>}
                        </div>
                      </div>}
                    <div className="flex justify-end space-x-2">
                      <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={handleCustomize}>
                        Customize Plan
                      </button>
                      <button className="px-3 py-1.5 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 flex items-center" onClick={handleImplement}>
                        Implement Plan{' '}
                        <ArrowRightIcon className="ml-1.5 h-3 w-3" />
                      </button>
                    </div>
                  </div>}
                <div ref={messagesEndRef} />
              </>}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="relative">
              <textarea ref={inputRef} value={inputValue} onChange={handleInput} placeholder="Describe what you want to achieve..." className="w-full border border-gray-300 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none" rows={1} style={{
            minHeight: '42px',
            maxHeight: '120px'
          }} />
              <button type="submit" className="absolute right-2 bottom-2 text-blue-600 hover:text-blue-800 p-1" disabled={isGenerating || !inputValue.trim()}>
                <SendIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>}
    </div>;
};
export default ChatInterface;