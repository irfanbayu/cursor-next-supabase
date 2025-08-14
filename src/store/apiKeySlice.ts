import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as supabaseApiKeyService from "../services/supabaseApiKeyService";
import type { ApiKey as SupabaseApiKey } from "../../lib/supabaseClient";

// Interface yang sesuai dengan struktur Supabase
export interface ApiKey {
  id: number;
  created_at: string;
  name: string;
  value: string;
  usage: number;
}

interface ApiKeyState {
  apiKeys: ApiKey[];
  loading: boolean;
  error: string | null;
}

const initialState: ApiKeyState = {
  apiKeys: [],
  loading: false,
  error: null,
};

// Helper function untuk mengkonversi Supabase ApiKey ke interface lokal
const convertSupabaseApiKey = (supabaseKey: SupabaseApiKey): ApiKey => ({
  id: supabaseKey.id,
  created_at: supabaseKey.created_at,
  name: supabaseKey.name,
  value: supabaseKey.value,
  usage: supabaseKey.usage,
});

// Async thunks
export const fetchApiKeys = createAsyncThunk(
  "apiKeys/fetchApiKeys",
  async () => {
    const response = await supabaseApiKeyService.fetchApiKeys();
    return response.map(convertSupabaseApiKey);
  }
);

export const createApiKey = createAsyncThunk(
  "apiKeys/createApiKey",
  async ({ name, value }: { name: string; value?: string }) => {
    const response = await supabaseApiKeyService.createApiKey({
      name,
      value: value || undefined,
    });
    return convertSupabaseApiKey(response);
  }
);

export const updateApiKey = createAsyncThunk(
  "apiKeys/updateApiKey",
  async ({ id, name, value }: { id: number; name: string; value?: string }) => {
    const response = await supabaseApiKeyService.updateApiKey(id, {
      name,
      value,
    });
    return convertSupabaseApiKey(response);
  }
);

export const deleteApiKey = createAsyncThunk(
  "apiKeys/deleteApiKey",
  async (id: number) => {
    await supabaseApiKeyService.deleteApiKey(id);
    return id;
  }
);

export const incrementUsage = createAsyncThunk(
  "apiKeys/incrementUsage",
  async (id: number) => {
    const response = await supabaseApiKeyService.incrementUsage(id);
    return convertSupabaseApiKey(response);
  }
);

const apiKeySlice = createSlice({
  name: "apiKeys",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch API Keys
    builder
      .addCase(fetchApiKeys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiKeys.fulfilled, (state, action) => {
        state.loading = false;
        state.apiKeys = action.payload;
      })
      .addCase(fetchApiKeys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch API keys";
      });

    // Create API Key
    builder
      .addCase(createApiKey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createApiKey.fulfilled, (state, action) => {
        state.loading = false;
        state.apiKeys.unshift(action.payload); // Add to beginning of array
      })
      .addCase(createApiKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create API key";
      });

    // Update API Key
    builder
      .addCase(updateApiKey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateApiKey.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.apiKeys.findIndex(
          (key) => key.id === action.payload.id
        );
        if (index !== -1) {
          state.apiKeys[index] = action.payload;
        }
      })
      .addCase(updateApiKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update API key";
      });

    // Delete API Key
    builder
      .addCase(deleteApiKey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteApiKey.fulfilled, (state, action) => {
        state.loading = false;
        state.apiKeys = state.apiKeys.filter(
          (key) => key.id !== action.payload
        );
      })
      .addCase(deleteApiKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete API key";
      });

    // Increment Usage
    builder
      .addCase(incrementUsage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(incrementUsage.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.apiKeys.findIndex(
          (key) => key.id === action.payload.id
        );
        if (index !== -1) {
          state.apiKeys[index] = action.payload;
        }
      })
      .addCase(incrementUsage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to increment usage";
      });
  },
});

export const { clearError, loadSampleData } = apiKeySlice.actions;
export default apiKeySlice.reducer;
