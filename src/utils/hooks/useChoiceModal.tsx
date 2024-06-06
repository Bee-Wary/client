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

/**
 * A fullscreen popup modal that prompts the user to make a choice.
 * In a a page:component, import the useChoiceModal hook and caal it into a varable like: const { showChoiceModal, ModalComponent } = useChoiceModal();
 * Then set the component somewere int he page like: {ModalComponent()}
 * the useChoice hook can be used like:
 * await showChoiceModal({
            titleContent: <h2>Remove changes?</h2>,
            cancelText: "Go back"
        })
 * It will return a boolean value of true if the choice is continue, and false if it is canceled. clicking outside the modal triggers cancel.
 * @returns showChoiceModal and ModalComponent - A function to show the modal and the modal component itself.
 */
export const useChoiceModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [titleContent, setTitleContent] = useState<React.ReactNode>(null);
    const [continueText, setContinueText] = useState<string>('Confirm');
    const [cancelText, setCancelText] = useState<string>('Cancel');
    const [isCancelButtonWarning, setIsCancelButtonWarning] = useState<boolean>(false);
    const [confirmIcon, setConfirmIcon] = useState<React.ReactNode>(<Check />);
    const [cancelIcon, setCancelIcon] = useState<React.ReactNode>(<X />);
    const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>(() => { });

    const showChoiceModal = (options: ShowChoiceModalOptions): Promise<boolean> => {
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

    return { showChoiceModal, ModalComponent };
};

export default useChoiceModal;