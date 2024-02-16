import React from "react";

const ConfirmationDialog = ({ setShowConfirmation }) => {
    const handleConfirm = () => {
        setShowConfirmation(false);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="confirmation-dialog">
            
        </div>
    );
};

export default ConfirmationDialog;
