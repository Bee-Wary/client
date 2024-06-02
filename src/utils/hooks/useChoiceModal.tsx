import { useState } from 'react';
import { ChoiceModal } from '@/components/modals/choiceModal';
import { Check, X } from "@phosphor-icons/react/dist/ssr";


type ShowChoiceModalOptions = {
    titleContent: React.ReactNode;
    continueText?: string;
    cancelText?: string;
    isCancelButtonWarning?: boolean;
    confirmIcon?: React.ReactNode;
    cancelIcon?: React.ReactNode;
}

export const useChoiceModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [titleContent, setTitleContent] = useState<React.ReactNode>(null);
    const [continueText, setContinueText] = useState<string>('Confirm');
    const [cancelText, setCancelText] = useState<string>('Cancel');
    const [isCancelButtonWarning, setIsCancelButtonWarning] = useState<boolean>(false);
    const [confirmIcon, setConfirmIcon] = useState<React.ReactNode>(<Check />);
    const [cancelIcon, setCancelIcon] = useState<React.ReactNode>(<X />);
    const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>(() => { });

    const showChoiceModalFunction = (options: ShowChoiceModalOptions): Promise<boolean> => {
        setTitleContent(options.titleContent);
        setContinueText(options.continueText || 'Confirm');
        setCancelText(options.cancelText || 'Cancel');
        setConfirmIcon(options.confirmIcon || <Check />)
        setCancelIcon(options.cancelIcon || <X />)
        setIsCancelButtonWarning(options.isCancelButtonWarning || false);
        setIsVisible(true);

        return new Promise<boolean>((resolve) => {
            setResolvePromise(() => resolve);
        });
    };

    const handleConfirm = () => {
        setIsVisible(false);
        resolvePromise(true);
    };

    const handleCancel = () => {
        setIsVisible(false);
        resolvePromise(false);
    };

    const ModalComponent = () => (
        <ChoiceModal
            isVisible={isVisible}
            titleContent={titleContent}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            continueText={continueText}
            cancelText={cancelText}
            isCancelButtonWarning={isCancelButtonWarning}
            confirmIcon={confirmIcon}
            cancelIcon={cancelIcon}
        />
    );

    return { showChoiceModalFunction, ModalComponent };
};

export default useChoiceModal;