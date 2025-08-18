import React from "react";
import Link from "next/link";
import ApiKeysTable from "./ApiKeysTable";
import type { ApiKey } from "../../store/apiKeySlice";

interface ApiKeysSectionProps {
  apiKeys: ApiKey[];
  loading: boolean;
  visibleKeys: Set<number>;
  onToggleKeyVisibility: (keyId: number) => void;
  onCopyToClipboard: (text: string) => void;
  onEditKey: (key: ApiKey) => void;
  onDeleteKey: (id: number) => void;
  onIncrementUsage: (id: number) => void;
  onCreateKey: () => void;
}

const ApiKeysSection: React.FC<ApiKeysSectionProps> = ({
  apiKeys,
  loading,
  visibleKeys,
  onToggleKeyVisibility,
  onCopyToClipboard,
  onEditKey,
  onDeleteKey,
  onIncrementUsage,
  onCreateKey,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">API Keys</h2>
          <button
            onClick={onCreateKey}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            disabled={loading}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add Key</span>
          </button>
        </div>
        <p className="text-gray-600 mt-2">
          The key is used to authenticate your requests to the{" "}
          <Link
            href="#"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Research API
          </Link>
          . To learn more, see the{" "}
          <Link
            href="#"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            documentation page
          </Link>
          .
        </p>
      </div>

      <ApiKeysTable
        apiKeys={apiKeys}
        loading={loading}
        visibleKeys={visibleKeys}
        onToggleKeyVisibility={onToggleKeyVisibility}
        onCopyToClipboard={onCopyToClipboard}
        onEditKey={onEditKey}
        onDeleteKey={onDeleteKey}
        onIncrementUsage={onIncrementUsage}
        onCreateKey={onCreateKey}
      />
    </div>
  );
};

export default ApiKeysSection;
