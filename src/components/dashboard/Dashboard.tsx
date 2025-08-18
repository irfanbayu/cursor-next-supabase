import React from "react";
import Sidebar from "../Sidebar";
import DashboardHeader from "./DashboardHeader";
import CurrentPlanCard from "./CurrentPlanCard";
import ApiKeysSection from "./ApiKeysSection";
import ErrorDisplay from "./ErrorDisplay";
import CreateApiKeyModal from "../modals/CreateApiKeyModal";
import EditApiKeyModal from "../modals/EditApiKeyModal";
import ConfirmationModal, { Toast } from "../Notification";
import { useApiKeys } from "../../hooks/useApiKeys";

const Dashboard: React.FC = () => {
  const {
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
  } = useApiKeys();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader />

        {/* Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Error Display */}
            <ErrorDisplay error={error} />

            {/* Current Plan Card */}
            <CurrentPlanCard />

            {/* API Keys Section */}
            <ApiKeysSection
              apiKeys={apiKeys}
              loading={loading}
              visibleKeys={visibleKeys}
              onToggleKeyVisibility={toggleKeyVisibility}
              onCopyToClipboard={copyToClipboard}
              onEditKey={openEditModal}
              onDeleteKey={handleDeleteKey}
              onIncrementUsage={handleIncrementUsage}
              onCreateKey={() => setIsCreateModalOpen(true)}
            />
          </div>
        </main>
      </div>

      {/* Create Modal */}
      <CreateApiKeyModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSubmit={handleCreateConfirmation}
        formData={formData}
        setFormData={setFormData}
        loading={loading}
      />

      {/* Edit Modal */}
      <EditApiKeyModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={handleEditConfirmation}
        editingKey={editingKey}
        formData={formData}
        setFormData={setFormData}
        loading={loading}
      />

      {/* Create Confirmation Modal */}
      {showCreateConfirmation && (
        <ConfirmationModal
          isOpen={showCreateConfirmation}
          onClose={() => setShowCreateConfirmation(false)}
          onConfirm={handleCreateKey}
          title="Confirm Creation"
          message={`Are you sure you want to create API key "${formData.name}"?`}
          confirmText="Create"
          cancelText="Cancel"
          type="create"
          loading={loading}
        />
      )}

      {/* Edit Confirmation Modal */}
      {showEditConfirmation && editingKey && (
        <ConfirmationModal
          isOpen={showEditConfirmation}
          onClose={() => setShowEditConfirmation(false)}
          onConfirm={handleEditKey}
          title="Confirm Update"
          message={`Are you sure you want to update API key "${editingKey.name}"?`}
          confirmText="Update"
          cancelText="Cancel"
          type="edit"
          loading={loading}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && deletingKeyId && (
        <ConfirmationModal
          isOpen={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={handleDeleteConfirmation}
          title="Confirm Deletion"
          message={`Are you sure you want to delete API key "${
            apiKeys.find((key) => key.id === deletingKeyId)?.name
          }"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          type="delete"
          loading={loading}
        />
      )}

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </div>
  );
};

export default Dashboard;
