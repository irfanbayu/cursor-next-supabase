import { supabase } from "../../lib/supabaseClient";
import type { ApiKey } from "../store/apiKeySlice";

export interface CreateApiKeyData {
  name: string;
  value?: string;
}

export interface UpdateApiKeyData {
  id: number;
  name: string;
  value: string;
}

export class ApiKeyService {
  static async fetchApiKeys(): Promise<ApiKey[]> {
    const { data, error } = await supabase
      .from("api_keys")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch API keys: ${error.message}`);
    }

    return data || [];
  }

  static async createApiKey(data: CreateApiKeyData): Promise<ApiKey> {
    const apiKeyValue = data.value || this.generateApiKey();

    const { data: newApiKey, error } = await supabase
      .from("api_keys")
      .insert([
        {
          name: data.name,
          value: apiKeyValue,
          usage: 0,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create API key: ${error.message}`);
    }

    return newApiKey;
  }

  static async updateApiKey(data: UpdateApiKeyData): Promise<ApiKey> {
    const { data: updatedApiKey, error } = await supabase
      .from("api_keys")
      .update({
        name: data.name,
        value: data.value,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update API key: ${error.message}`);
    }

    return updatedApiKey;
  }

  static async deleteApiKey(id: number): Promise<void> {
    const { error } = await supabase.from("api_keys").delete().eq("id", id);

    if (error) {
      throw new Error(`Failed to delete API key: ${error.message}`);
    }
  }

  static async incrementUsage(id: number): Promise<ApiKey> {
    const { data: updatedApiKey, error } = await supabase
      .from("api_keys")
      .update({
        usage: supabase.rpc("increment_usage", { key_id: id }),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to increment usage: ${error.message}`);
    }

    return updatedApiKey;
  }

  static async loadSampleData(): Promise<void> {
    const sampleData = [
      {
        name: "Production API Key",
        value: "byw-prod-1234567890abcdef1234567890abcdef",
        usage: 150,
      },
      {
        name: "Development API Key",
        value: "byw-dev-abcdef1234567890abcdef1234567890",
        usage: 25,
      },
      {
        name: "Testing API Key",
        value: "byw-test-7890abcdef1234567890abcdef1234",
        usage: 5,
      },
    ];

    const { error } = await supabase.from("api_keys").insert(sampleData);

    if (error) {
      throw new Error(`Failed to load sample data: ${error.message}`);
    }
  }

  private static generateApiKey(): string {
    const prefix = "byw-";
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const length = 32;
    let result = "";

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return prefix + result;
  }
}
