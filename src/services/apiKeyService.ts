import axios from "axios";
import { ApiKey } from "../store/apiKeySlice";

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Mock data for development (replace with actual API calls)
const mockApiKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production API Key",
    key: "pk_live_1234567890abcdef",
    description: "API key for production environment",
    createdAt: "2024-01-15T10:30:00Z",
    lastUsed: "2024-01-20T14:22:00Z",
    isActive: true,
  },
  {
    id: "2",
    name: "Development API Key",
    key: "pk_test_abcdef1234567890",
    description: "API key for development and testing",
    createdAt: "2024-01-10T09:15:00Z",
    isActive: true,
  },
];

export const apiKeyService = {
  // Get all API keys
  async getApiKeys(): Promise<ApiKey[]> {
    try {
      // For now, return mock data
      // In production, uncomment the line below:
      // const response = await api.get('/api-keys');
      // return response.data;

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockApiKeys;
    } catch (error) {
      console.error("Error fetching API keys:", error);
      throw new Error("Failed to fetch API keys");
    }
  },

  // Create new API key
  async createApiKey(name: string, description: string): Promise<ApiKey> {
    try {
      // For now, create mock data
      // In production, uncomment the lines below:
      // const response = await api.post('/api-keys', { name, description });
      // return response.data;

      const newKey: ApiKey = {
        id: Date.now().toString(),
        name,
        key: `pk_${Math.random()
          .toString(36)
          .substr(2, 9)}_${Date.now().toString(36)}`,
        description,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      mockApiKeys.push(newKey);
      return newKey;
    } catch (error) {
      console.error("Error creating API key:", error);
      throw new Error("Failed to create API key");
    }
  },

  // Update API key
  async updateApiKey(
    id: string,
    name: string,
    description: string
  ): Promise<ApiKey> {
    try {
      // For now, update mock data
      // In production, uncomment the lines below:
      // const response = await api.put(`/api-keys/${id}`, { name, description });
      // return response.data;

      const keyIndex = mockApiKeys.findIndex((key) => key.id === id);
      if (keyIndex === -1) {
        throw new Error("API key not found");
      }

      const updatedKey: ApiKey = {
        ...mockApiKeys[keyIndex],
        name,
        description,
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      mockApiKeys[keyIndex] = updatedKey;
      return updatedKey;
    } catch (error) {
      console.error("Error updating API key:", error);
      throw new Error("Failed to update API key");
    }
  },

  // Delete API key
  async deleteApiKey(id: string): Promise<void> {
    try {
      // For now, delete from mock data
      // In production, uncomment the line below:
      // await api.delete(`/api-keys/${id}`);

      const keyIndex = mockApiKeys.findIndex((key) => key.id === id);
      if (keyIndex === -1) {
        throw new Error("API key not found");
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      mockApiKeys.splice(keyIndex, 1);
    } catch (error) {
      console.error("Error deleting API key:", error);
      throw new Error("Failed to delete API key");
    }
  },

  // Toggle API key status
  async toggleApiKeyStatus(id: string): Promise<ApiKey> {
    try {
      // For now, toggle in mock data
      // In production, uncomment the lines below:
      // const response = await api.patch(`/api-keys/${id}/toggle`);
      // return response.data;

      const keyIndex = mockApiKeys.findIndex((key) => key.id === id);
      if (keyIndex === -1) {
        throw new Error("API key not found");
      }

      const updatedKey: ApiKey = {
        ...mockApiKeys[keyIndex],
        isActive: !mockApiKeys[keyIndex].isActive,
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      mockApiKeys[keyIndex] = updatedKey;
      return updatedKey;
    } catch (error) {
      console.error("Error toggling API key status:", error);
      throw new Error("Failed to toggle API key status");
    }
  },
};
