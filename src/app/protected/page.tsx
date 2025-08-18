"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { validateApiKey } from "../../services/apiKeyValidationService";
import { Toast } from "../../components/Notification";

// Component that uses useSearchParams - needs to be wrapped in Suspense
const ProtectedContent = () => {
  const [isValidating, setIsValidating] = useState(true);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
    apiKey?: {
      id: number;
      name: string;
      usage: number;
    };
  } | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [toastMessage, setToastMessage] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const apiKey = searchParams.get("key");

  useEffect(() => {
    const validateKey = async () => {
      if (!apiKey) {
        setValidationResult({
          isValid: false,
          message: "No API key provided",
        });
        setToastType("error");
        setToastMessage("No API key provided");
        setShowToast(true);
        setIsValidating(false);
        return;
      }

      try {
        const result = await validateApiKey(apiKey);
        setValidationResult(result);
        setToastType(result.isValid ? "success" : "error");
        setToastMessage(result.message);
        setShowToast(true);
      } catch (error) {
        setValidationResult({
          isValid: false,
          message: "Error validating API key",
        });
        setToastType("error");
        setToastMessage("Error validating API key");
        setShowToast(true);
      } finally {
        setIsValidating(false);
      }
    };

    validateKey();
  }, [apiKey]);

  const handleGoBack = () => {
    router.push("/playground");
  };

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  if (isValidating) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Validating API Key
            </h2>
            <p className="text-gray-600">
              Please wait while we validate your API key...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-6">
            {validationResult?.isValid ? (
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            ) : (
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {validationResult?.isValid ? "Access Granted" : "Access Denied"}
            </h2>
            <p className="text-gray-600">{validationResult?.message}</p>
          </div>

          <div className="space-y-4">
            {validationResult?.isValid && validationResult.apiKey && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-green-800">
                      API Key Details
                    </h3>
                    <div className="mt-2 text-sm text-green-700 space-y-1">
                      <p>
                        <strong>Name:</strong> {validationResult.apiKey.name}
                      </p>
                      <p>
                        <strong>ID:</strong> {validationResult.apiKey.id}
                      </p>
                      <p>
                        <strong>Usage Count:</strong>{" "}
                        {validationResult.apiKey.usage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={handleGoBack}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Go Back
              </button>
              <button
                onClick={handleGoToDashboard}
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

// Fallback component for Suspense
const ProtectedPageFallback = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading...
          </h2>
          <p className="text-gray-600">
            Please wait while we prepare the validation page...
          </p>
        </div>
      </div>
    </div>
  );
};

// Main page component with Suspense boundary
const ProtectedPage = () => {
  return (
    <Suspense fallback={<ProtectedPageFallback />}>
      <ProtectedContent />
    </Suspense>
  );
};

export default ProtectedPage;
