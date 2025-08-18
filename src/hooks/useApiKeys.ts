import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import {
  fetchApiKeys,
  createApiKey,
  updateApiKey,
  deleteApiKey,
  incrementUsage,
} from "../store/apiKeySlice";
import type { ApiKey } from "../store/apiKeySlice";

export const useApiKeys = () => {
  const dispatch = useAppDispatch();
  const { apiKeys, loading, error } = useAppSelector((state) => state.apiKeys);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    value: "",
  });
  const [visibleKeys, setVisibleKeys] = useState<Set<number>>(new Set());

  // Confirmation modal states
  const [showCreateConfirmation, setShowCreateConfirmation] = useState(false);
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletingKeyId, setDeletingKeyId] = useState<number | null>(null);

  // Toast notification states
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  // Load API keys from Supabase on component mount
  useEffect(() => {
    dispatch(fetchApiKeys());
  }, [dispatch]);

  const handleCreateConfirmation = () => {
    setShowCreateConfirmation(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setFormData({ name: "", value: "" });
  };

  const handleCreateKey = async () => {
    try {
      await dispatch(
        createApiKey({ name: formData.name, value: formData.value })
      ).unwrap();
      closeCreateModal();
      setShowCreateConfirmation(false);
      setToast({
        message: "✅ API key created successfully!",
        type: "success",
        isVisible: true,
      });
    } catch (error) {
      console.error("Failed to create API key:", error);
      setToast({
        message: "❌ Failed to create API key",
        type: "error",
        isVisible: true,
      });
    }
  };

  const handleEditKey = async () => {
    if (!editingKey) return;

    try {
      await dispatch(
        updateApiKey({
          id: editingKey.id,
          name: formData.name,
          value: formData.value,
        })
      ).unwrap();
      closeEditModal();
      setShowEditConfirmation(false);
      setToast({
        message: "✅ API key updated successfully!",
        type: "success",
        isVisible: true,
      });
    } catch (error) {
      console.error("❌ Failed to update API key:", error);
      setToast({
        message: "❌ Failed to update API key",
        type: "error",
        isVisible: true,
      });
    }
  };

  const handleEditConfirmation = () => {
    setShowEditConfirmation(true);
  };

  const handleDeleteKey = async (id: number) => {
    setDeletingKeyId(id);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    if (!deletingKeyId) return;

    try {
      await dispatch(deleteApiKey(deletingKeyId)).unwrap();
      setShowDeleteConfirmation(false);
      setDeletingKeyId(null);
      setToast({
        message: "✅ API key deleted successfully!",
        type: "info",
        isVisible: true,
      });
    } catch (error) {
      console.error("Failed to delete API key:", error);
      setToast({
        message: "❌ Failed to delete API key",
        type: "error",
        isVisible: true,
      });
    }
  };

  const handleIncrementUsage = async (id: number) => {
    try {
      await dispatch(incrementUsage(id)).unwrap();
      setToast({
        message: "✅ Usage count added successfully!",
        type: "success",
        isVisible: true,
      });
    } catch (error) {
      console.error("Failed to increment usage:", error);
      setToast({
        message: "❌ Failed to add usage count",
        type: "error",
        isVisible: true,
      });
    }
  };

  const openEditModal = (key: ApiKey) => {
    setEditingKey(key);
    setFormData({ name: key.name, value: key.value });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingKey(null);
    setFormData({ name: "", value: "" });
  };

  const toggleKeyVisibility = (keyId: number) => {
    setVisibleKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast({
        message: "✅ API key copied to clipboard successfully!",
        type: "success",
        isVisible: true,
      });
    } catch (error) {
      setToast({
        message: "❌ Failed to copy API key to clipboard",
        type: "error",
        isVisible: true,
      });
    }
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  const formatApiKey = (key: ApiKey) => {
    const isVisible = visibleKeys.has(key.id);
    if (isVisible) {
      return key.value;
    }
    return "byw-" + "*".repeat(28);
  };

  return {
    // State
    apiKeys,
    loading,
    error,
    isCreateModalOpen,
    isEditModalOpen,
    editingKey,
    formData,
    visibleKeys,
    showCreateConfirmation,
    showEditConfirmation,
    showDeleteConfirmation,
    deletingKeyId,
    toast,

    // Actions
    setIsCreateModalOpen,
    setFormData,
    setShowCreateConfirmation,
    setShowEditConfirmation,
    setShowDeleteConfirmation,
    handleCreateConfirmation,
    closeCreateModal,
    handleCreateKey,
    handleEditKey,
    handleEditConfirmation,
    handleDeleteKey,
    handleDeleteConfirmation,
    handleIncrementUsage,
    openEditModal,
    closeEditModal,
    toggleKeyVisibility,
    copyToClipboard,
    closeToast,
    formatApiKey,
  };
};
