import { Button } from "@nextui-org/react";
import { Check, X } from "@phosphor-icons/react/dist/ssr";
import choiceModalStyles from '@/styles/inputs/choiceModal.module.scss'
import inputStyles from '@/styles/inputs/inputs.module.scss'


type Props = {
    isVisible: boolean;
    titleContent: React.ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
    continueText?: string;
    cancelText?: string;
    isCancelButtonWarning?: boolean;
    confirmIcon?: React.ReactNode;
    cancelIcon?: React.ReactNode;
}

export const ChoiceModal = ({
    isVisible,
    titleContent,
    onConfirm,
    onCancel,
    continueText,
    cancelText,
    isCancelButtonWarning,
    confirmIcon,
    cancelIcon,
}: Props
) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            onCancel();
        }
    };

    if (!isVisible) return null;

    return (
        <div className={choiceModalStyles.modalBackdrop} onClick={handleBackdropClick}>
            <div className={choiceModalStyles.choiceModal}>
                <div className={choiceModalStyles.choiceModalContent}>
                    {titleContent}
                    <div className={choiceModalStyles.choiceModalActions}>
                        <Button
                            className={`${inputStyles.actionButton}`}
                            size="lg"

                            endContent={cancelIcon}
                            onClick={onCancel}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            className={`${inputStyles.actionButton} ${isCancelButtonWarning ? inputStyles.warningButton : inputStyles.dangerButton}`}
                            size="lg"
                            endContent={confirmIcon}
                            onClick={onConfirm}
                        >
                            {continueText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};