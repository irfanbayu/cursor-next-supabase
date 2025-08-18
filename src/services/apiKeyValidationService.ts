import { supabase } from "../../lib/supabaseClient";

export interface ApiKeyValidationResult {
  isValid: boolean;
  message: string;
  apiKey?: {
    id: number;
    name: string;
    usage: number;
  };
}

export const validateApiKey = async (
  apiKey: string
): Promise<ApiKeyValidationResult> => {
  try {
    // Query the api_keys table to check if the key exists
    const { data, error } = await supabase
      .from("api_keys")
      .select("id, name, value, usage")
      .eq("value", apiKey)
      .single();

    if (error) {
      console.error("Error validating API key:", error);
      return {
        isValid: false,
        message: "Error validating API key",
      };
    }

    if (!data) {
      return {
        isValid: false,
        message: "Invalid API Key",
      };
    }

    // Update usage count
    await supabase
      .from("api_keys")
      .update({ usage: data.usage + 1 })
      .eq("id", data.id);

    return {
      isValid: true,
      message: "Valid API key, /protected can be accessed",
      apiKey: {
        id: data.id,
        name: data.name,
        usage: data.usage + 1,
      },
    };
  } catch (error) {
    console.error("Error in validateApiKey:", error);
    return {
      isValid: false,
      message: "Error validating API key",
    };
  }
};

// Helper function to check if API key format is valid (basic validation)
export const isApiKeyFormatValid = (apiKey: string): boolean => {
  // Basic format validation - at least 10 characters
  return apiKey.length >= 10;
};

// Function to get API key details (for display purposes)
export const getApiKeyDetails = async (apiKey: string) => {
  try {
    const { data, error } = await supabase
      .from("api_keys")
      .select("id, name, usage, created_at")
      .eq("value", apiKey)
      .maybeSingle(); // Use maybeSingle() instead of single() to handle 0 rows gracefully

    if (error || !data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error getting API key details:", error);
    return null;
  }
};
