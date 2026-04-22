import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast, type ToastType } from '@/hooks/useToast';

// ─── useModal ─────────────────────────────────────────────────────────────────

export function useModal(defaultOpen = false) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const open   = useCallback(() => setIsOpen(true),        []);
    const close  = useCallback(() => setIsOpen(false),       []);
    const toggle = useCallback(() => setIsOpen(p => !p),     []);

    return { isOpen, open, close, toggle };
}

// ─── useVariantModal ──────────────────────────────────────────────────────────

/**
 * A modal hook that also tracks which variant is currently active.
 * Call `openWithVariant('delete')` / `openWithVariant('confirm')` etc.
 * to open the same modal in different states.
 */
export function useVariantModal<TVariant extends string>(defaultOpen = false) {
    const [isOpen,  setIsOpen ] = useState(defaultOpen);
    const [variant, setVariant] = useState<TVariant | null>(null);

    const openWithVariant = useCallback((v: TVariant) => {
        setVariant(v);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setVariant(null);
    }, []);

    return { isOpen, variant, openWithVariant, close };
}

// ─── useActionModal ───────────────────────────────────────────────────────────

export type ActionModalVariant = 'delete' | 'confirm' | 'cancel' | 'warning';

export interface ActionModalConfig {
    /** Override the modal title for a specific variant */
    titles?: Partial<Record<ActionModalVariant, string>>;
    /** Override the confirm-button label for a specific variant */
    confirmLabels?: Partial<Record<ActionModalVariant, string>>;
    /** Override the cancel-button label */
    cancelLabel?: string;
    /** Called when the user confirms the 'delete' variant — can be async */
    onDelete?: () => void | Promise<void>;
    /** Called when the user confirms the 'confirm' variant — can be async */
    onConfirm?: () => void | Promise<void>;
    /** Called when the user confirms the 'cancel' variant — can be async */
    onCancel?: () => void | Promise<void>;
    toast?: (type: ToastType, message: string) => void;
    /** Per-variant toast config — type defaults to 'success', message to a sensible default */
    toastMessages?: Partial<Record<ActionModalVariant, { type?: ToastType; message: string }>>;
}

/**
 * A fully generic hook that manages one modal instance for delete / confirm / cancel actions.
 *
 * Usage:
 *   const modal = useActionModal({ onDelete: () => deleteItem() });
 *
 *   modal.openDelete();
 *   modal.openConfirm('my-form-id');  // submits form on confirm
 *   modal.openCancel();
 *
 *   <ModalComponent {...modal.modalProps} size="md">
 *     {modal.variant === 'delete'  && <p>Are you sure?</p>}
 *     {modal.variant === 'confirm' && <p>Save changes?</p>}
 *     {modal.variant === 'cancel'  && <p>Discard changes?</p>}
 *   </ModalComponent>
 */
export function useActionModal(config: ActionModalConfig = {}) {
    const {
        titles        = {},
        confirmLabels = {},
        cancelLabel,
        onDelete,
        onConfirm,
        onCancel,
        toastMessages = {},
    } = config;

    const { t }                             = useTranslation();
    const { show: showToast }               = useToast();
    const inner                             = useVariantModal<ActionModalVariant>();
    const [pendingFormId, setPendingFormId] = useState<string | null>(null);
    const [isLoading,     setIsLoading    ] = useState(false);

    // ── Fire toast helper ─────────────────────────────────────────────────────
    const fireToast = useCallback((variant: ActionModalVariant) => {
        const cfg = toastMessages[variant];
        if (!cfg) return;
        showToast(cfg.type ?? 'success', cfg.message);
    }, [showToast, toastMessages]);

    // ── Openers ───────────────────────────────────────────────────────────────

    const openDelete = useCallback(() => {
        inner.openWithVariant('delete');
    }, [inner]);

    /** Pass a formId to have the form submitted on confirm */
    const openConfirm = useCallback((formId?: string) => {
        if (formId) setPendingFormId(formId);
        inner.openWithVariant('confirm');
    }, [inner]);

    const openCancel = useCallback(() => {
        inner.openWithVariant('cancel');
    }, [inner]);

    // ── Handlers ──────────────────────────────────────────────────────────────

    const handleConfirm = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            if (inner.variant === 'delete') {
                await onDelete?.();
                fireToast('delete');
            }
            if (inner.variant === 'confirm') {
                if (pendingFormId) {
                    document.getElementById(pendingFormId)?.dispatchEvent(
                        new Event('submit', { bubbles: true, cancelable: true })
                    );
                }
                await onConfirm?.();
                fireToast('confirm');
            }
            if (inner.variant === 'cancel') {
                await onCancel?.();
                fireToast('cancel');
            }
            inner.close();
            setPendingFormId(null);
        } finally {
            setIsLoading(false);
        }
    }, [inner, isLoading, pendingFormId, onDelete, onConfirm, onCancel, fireToast]);

    const handleClose = useCallback(() => {
        inner.close();
        setPendingFormId(null);
    }, [inner]);

    // ── Resolved labels ───────────────────────────────────────────────────────

    const defaultTitles: Record<ActionModalVariant, string> = {
        warning : t('lblWarning'),
        delete  : t('lblDelete'),
        confirm : t('lblConfirm'),
        cancel  : t('lblCancel'),
    };

    const defaultConfirmLabels: Record<ActionModalVariant, string> = {
        warning : t('lblWarning'),
        delete  : t('lblDelete'),
        confirm : t('lblConfirm'),
        cancel  : t('lblYesCancel'),
    };

    const resolvedTitle        = inner.variant ? (titles[inner.variant]        ?? defaultTitles[inner.variant]        ?? '') : '';
    const resolvedConfirmLabel = inner.variant ? (confirmLabels[inner.variant] ?? defaultConfirmLabels[inner.variant] ?? undefined) : undefined;
    const resolvedCancelLabel  = cancelLabel ?? t('btnCancel');

    // ── Prop spread ───────────────────────────────────────────────────────────

    const modalProps = {
        isOpen          : inner.isOpen,
        onClose         : handleClose,
        onConfirm       : handleConfirm,
        variant         : inner.variant ?? undefined,
        title           : resolvedTitle,
        confirmLabel    : resolvedConfirmLabel,
        cancelLabel     : resolvedCancelLabel,
        confirmLoading  : isLoading,
        confirmDisabled : isLoading,
    } as const;

    return {
        /** Spread onto <ModalComponent {...modal.modalProps}> */
        modalProps,
        /** The currently active variant — use to conditionally render modal body */
        variant    : inner.variant,
        openDelete,
        openConfirm,
        openCancel,
        close      : handleClose,
    };
}
