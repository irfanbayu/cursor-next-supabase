import React from "react";

const CurrentPlanCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-purple-100 uppercase tracking-wide">
            Current Plan
          </p>
          <h2 className="text-3xl font-bold mt-1">Researcher</h2>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">API Limit</span>
                <svg
                  className="w-4 h-4 text-purple-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">24 / 1,000 Requests</span>
            </div>
            <div className="w-full bg-purple-200 bg-opacity-30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full"
                style={{ width: "2.4%" }}
              ></div>
            </div>
          </div>
        </div>

        <button className="bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
          <span className="text-sm font-medium">Manage Plan</span>
        </button>
      </div>
    </div>
  );
};

export default CurrentPlanCard;
