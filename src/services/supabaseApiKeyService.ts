import {
  supabase,
  type ApiKey,
  type CreateApiKeyData,
  type UpdateApiKeyData,
} from "../../lib/supabaseClient";

// Generate a random API key
const generateApiKey = (): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "tvly-";
  for (let i = 0; i < 28; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Fetch all API keys
export const fetchApiKeys = async (): Promise<ApiKey[]> => {
  try {
    const { data, error } = await supabase
      .from("api_keys")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching API keys:", error);
    throw error;
  }
};

// Create a new API key
export const createApiKey = async (
  apiKeyData: CreateApiKeyData
): Promise<ApiKey> => {
  try {
    const newApiKey: Partial<ApiKey> = {
      name: apiKeyData.name,
      value: apiKeyData.value || generateApiKey(),
      usage: apiKeyData.usage || 0,
    };

    const { data, error } = await supabase
      .from("api_keys")
      .insert([newApiKey])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error creating API key:", error);
    throw error;
  }
};

// Update an API key
export const updateApiKey = async (
  id: number,
  updateData: UpdateApiKeyData
): Promise<ApiKey> => {
  try {
    const { data, error } = await supabase
      .from("api_keys")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error updating API key:", error);
    throw error;
  }
};

// Delete an API key
export const deleteApiKey = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase.from("api_keys").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error deleting API key:", error);
    throw error;
  }
};

// Increment usage count
export const incrementUsage = async (id: number): Promise<ApiKey> => {
  try {
    // First get the current usage
    const { data: currentKey, error: fetchError } = await supabase
      .from("api_keys")
      .select("usage")
      .eq("id", id)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    // Increment the usage
    const { data, error } = await supabase
      .from("api_keys")
      .update({
        usage: (currentKey.usage || 0) + 1,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error incrementing usage:", error);
    throw error;
  }
};

// Get API key by ID
export const getApiKeyById = async (id: number): Promise<ApiKey | null> => {
  try {
    const { data, error } = await supabase
      .from("api_keys")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // Not found
      }
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error fetching API key by ID:", error);
    throw error;
  }
};
