// filepath: c:\repos\WL-Recruit\src\components\FormComponents\RichTextEditor.tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import Indent from '@/components/FormComponents/extensions/Indent';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import {
    RiBold, RiItalic, RiUnderline,
    RiListUnordered, RiListOrdered,
    RiAlignLeft, RiAlignCenter, RiAlignRight,
    RiLinkM, RiLinkUnlink,
    RiArrowGoBackLine, RiArrowGoForwardLine,
    RiIndentIncrease, RiIndentDecrease,
    RiExternalLinkLine, RiPencilLine,
} from '@/components/IconComponent/Icons';

// ─── Types ────────────────────────────────────────────────────────────────────

interface RichTextEditorProps {
    value?       : string;
    placeholder? : string;
    label?       : string;
    helperText?  : string;
    maxLength?   : number;
    minHeight?   : string;
    disabled?    : boolean;
    onChange?    : (html: string) => void;
}

// ─── Tooltip wrapper ──────────────────────────────────────────────────────────

const Tooltip = memo(({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="relative group/tip inline-flex">
        {children}
        <div className="
            pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50
            whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white
            opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150
        ">
            {title}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
    </div>
));
Tooltip.displayName = 'Tooltip';

// ─── Toolbar button ───────────────────────────────────────────────────────────

interface ToolbarButtonProps {
    onClick  : () => void;
    active?  : boolean;
    disabled?: boolean;
    icon     : React.ReactNode;
    title    : string;
}

const ToolbarButton = memo(({ onClick, active, disabled, icon, title }: ToolbarButtonProps) => (
    <Tooltip title={title}>
        {/* onMouseDown preventDefault keeps editor focus/selection intact when clicking toolbar */}
        <div onMouseDown={e => e.preventDefault()}>
            <ButtonComponent
                variant="ghost"
                size="xs"
                onClick={onClick}
                disabled={disabled}
                aria-label={title}
                className={[
                    '!p-1.5 w-7 h-7',
                    active ? '!bg-gray-200 !text-primary-700' : 'text-gray-600',
                ].join(' ')}
                leftIcon={icon}
            />
        </div>
    </Tooltip>
));
ToolbarButton.displayName = 'ToolbarButton';

const Divider = () => <div className="w-px h-5 bg-gray-200 mx-0.5 self-center" />;

// ─── Link bubble popover ──────────────────────────────────────────────────────

interface LinkBubbleProps {
    url        : string;
    onEdit     : () => void;
    onRemove   : () => void;
    anchorRef  : React.RefObject<HTMLDivElement | null>;
}

const LinkBubble = memo(({ url, onEdit, onRemove, anchorRef }: LinkBubbleProps) => {
    const bubbleRef = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

    useEffect(() => {
        const anchor = anchorRef.current;
        if (!anchor) return;

        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range  = selection.getRangeAt(0);
        const rect   = range.getBoundingClientRect();
        const parent = anchor.getBoundingClientRect();

        setPos({
            top : rect.bottom - parent.top + 6,
            left: rect.left   - parent.left,
        });
    }, [url, anchorRef]);

    if (!pos) return null;

    const display = url.length > 40 ? url.slice(0, 40) + '…' : url;

    return (
        <div
            ref={bubbleRef}
            style={{ top: pos.top, left: pos.left }}
            className="absolute z-50 flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white shadow-md px-2.5 py-1.5 text-xs"
            onMouseDown={e => e.preventDefault()}
        >
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 underline max-w-[200px] truncate hover:text-primary-800"
                title={url}
            >
                {display}
            </a>
            <div className="w-px h-3.5 bg-gray-200 mx-0.5" />
            <button
                type="button"
                title="Open link"
                onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                className="text-gray-500 hover:text-primary-600 transition-colors"
                onMouseDown={e => e.preventDefault()}
            >
                <RiExternalLinkLine size={13} />
            </button>
            <button
                type="button"
                title="Edit link"
                onClick={onEdit}
                className="text-gray-500 hover:text-primary-600 transition-colors"
                onMouseDown={e => e.preventDefault()}
            >
                <RiPencilLine size={13} />
            </button>
            <button
                type="button"
                title="Remove link"
                onClick={onRemove}
                className="text-gray-500 hover:text-danger transition-colors"
                onMouseDown={e => e.preventDefault()}
            >
                <RiLinkUnlink size={13} />
            </button>
        </div>
    );
});
LinkBubble.displayName = 'LinkBubble';

// ─── Component ────────────────────────────────────────────────────────────────

const RichTextEditor = memo<RichTextEditorProps>(({
    value       = '',
    placeholder = 'Write something...',
    label,
    helperText,
    maxLength,
    minHeight   = 'min-h-48',
    disabled    = false,
    onChange,
}) => {
    const [linkUrl, setLinkUrl]             = useState('');
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [activeLink, setActiveLink]       = useState<string | null>(null);
    const editorWrapperRef                  = useRef<HTMLDivElement>(null);
    const savedSelection                    = useRef<{ from: number; to: number } | null>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link.configure({ openOnClick: false, HTMLAttributes: { class: 'rte-link' } }),
            Placeholder.configure({ placeholder }),
            Indent,
            ...(maxLength ? [CharacterCount.configure({ limit: maxLength })] : [CharacterCount]),
        ],
        content: value,
        editable: !disabled,
        onUpdate:          ({ editor }) => onChange?.(editor.getHTML()),
        onSelectionUpdate: ({ editor }) => {
            const href = editor.getAttributes('link').href as string | undefined;
            setActiveLink(href ?? null);
        },
    });

    const applyLink = useCallback(() => {
        if (!editor) return;
        if (linkUrl) {
            const sel = savedSelection.current;
            if (sel) {
                // Restore selection that was lost when URL input took focus, apply link, then collapse
                editor
                    .chain()
                    .focus()
                    .setTextSelection({ from: sel.from, to: sel.to })
                    .setLink({ href: linkUrl })
                    .setTextSelection(sel.to)   // collapse to end → stops typing as link
                    .run();
            } else {
                editor.chain().focus().setLink({ href: linkUrl }).run();
                const { to } = editor.state.selection;
                editor.chain().setTextSelection(to).run();
            }
        }
        savedSelection.current = null;
        setLinkUrl('');
        setShowLinkInput(false);
    }, [editor, linkUrl]);

    const removeLink = useCallback(() => {
        editor?.chain().focus().unsetLink().run();
        setActiveLink(null);
        setShowLinkInput(false);
    }, [editor]);

    const openEditLink = useCallback(() => {
        if (editor) {
            // Extend the selection to the full link range so it gets re-applied correctly
            editor.chain().focus().extendMarkRange('link').run();
            const { from, to } = editor.state.selection;
            savedSelection.current = { from, to };
        }
        setLinkUrl(activeLink ?? '');
        setActiveLink(null);
        setShowLinkInput(true);
    }, [activeLink, editor]);

    if (!editor) return null;

    const charCount = editor.storage.characterCount?.characters?.() ?? 0;

    return (
        <div className={`flex flex-col ${disabled ? 'opacity-60 pointer-events-none' : ''}`}>

            {/* Label */}
            {label && (
                <label className="mb-2 block text-sm font-medium text-primary">
                    {label}
                </label>
            )}

            {/* Editor wrapper */}
            <div ref={editorWrapperRef} className="relative flex flex-col rounded-lg border border-gray-200 bg-surface focus-within:border-primary-600 focus-within:ring-1 focus-within:ring-primary-600 transition-colors duration-150">

                {/* ── Toolbar ─────────────────────────────────────────── */}
                <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 px-2 py-1.5 flex-shrink-0">

                    {/* History */}
                    <ToolbarButton title="Undo" icon={<RiArrowGoBackLine size={14} />}
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()} />
                    <ToolbarButton title="Redo" icon={<RiArrowGoForwardLine size={14} />}
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()} />

                    <Divider />

                    {/* Inline formatting */}
                    <ToolbarButton title="Bold (Ctrl+B)" icon={<RiBold size={14} />}
                        active={editor.isActive('bold')}
                        onClick={() => editor.chain().focus().toggleBold().run()} />
                    <ToolbarButton title="Italic (Ctrl+I)" icon={<RiItalic size={14} />}
                        active={editor.isActive('italic')}
                        onClick={() => editor.chain().focus().toggleItalic().run()} />
                    <ToolbarButton title="Underline (Ctrl+U)" icon={<RiUnderline size={14} />}
                        active={editor.isActive('underline')}
                        onClick={() => editor.chain().focus().toggleUnderline().run()} />

                    <Divider />

                    {/* Lists */}
                    <ToolbarButton title="Bulleted list" icon={<RiListUnordered size={14} />}
                        active={editor.isActive('bulletList')}
                        onClick={() => editor.chain().focus().toggleBulletList().run()} />
                    <ToolbarButton title="Numbered list" icon={<RiListOrdered size={14} />}
                        active={editor.isActive('orderedList')}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()} />

                    {/* Indent */}
                    <ToolbarButton title="Decrease indent" icon={<RiIndentDecrease size={14} />}
                        onClick={() => editor.chain().focus().indent().run()} />
                    <ToolbarButton title="Increase indent" icon={<RiIndentIncrease size={14} />}
                        onClick={() => editor.chain().focus().outdent().run()} />

                    <Divider />

                    {/* Alignment */}
                    <ToolbarButton title="Align left" icon={<RiAlignLeft size={14} />}
                        active={editor.isActive({ textAlign: 'left' })}
                        onClick={() => editor.chain().focus().setTextAlign('left').run()} />
                    <ToolbarButton title="Align center" icon={<RiAlignCenter size={14} />}
                        active={editor.isActive({ textAlign: 'center' })}
                        onClick={() => editor.chain().focus().setTextAlign('center').run()} />
                    <ToolbarButton title="Align right" icon={<RiAlignRight size={14} />}
                        active={editor.isActive({ textAlign: 'right' })}
                        onClick={() => editor.chain().focus().setTextAlign('right').run()} />

                    <Divider />

                    {/* Link */}
                    <ToolbarButton title="Insert link" icon={<RiLinkM size={14} />}
                        active={editor.isActive('link') || showLinkInput}
                        onClick={() => {
                            const { from, to } = editor.state.selection;
                            savedSelection.current = { from, to };
                            setShowLinkInput(prev => !prev);
                        }} />
                    <ToolbarButton title="Remove link" icon={<RiLinkUnlink size={14} />}
                        disabled={!editor.isActive('link')}
                        onClick={removeLink} />
                </div>

                {/* ── Link input bar ───────────────────────────────────── */}
                {showLinkInput && (
                    <div className="flex items-center gap-2 border-b border-gray-200 px-3 py-1.5 bg-surface">
                        <input
                            type="url"
                            value={linkUrl}
                            onChange={e => setLinkUrl(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    applyLink();
                                }
                            }}
                            placeholder="https://..."
                            autoFocus
                            className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-600"
                        />
                        <ButtonComponent variant="confirmation" size="xs" label="Add"    onClick={applyLink} />
                        <ButtonComponent variant="ghost"        size="xs" label="Cancel" onClick={() => { setShowLinkInput(false); setLinkUrl(''); }} />
                    </div>
                )}

                {/* ── Content area ─────────────────────────────────────── */}
                <EditorContent
                    editor={editor}
                    onClick={() => editor.commands.focus()}
                    className={[
                            'prose prose-sm max-w-none px-4 py-3 text-primary text-md cursor-text flex-1',
                            minHeight,
                            '[&_.tiptap]:outline-none',
                            '[&_.tiptap]:h-full',
                            '[&_.tiptap]:min-h-[inherit]',
                            '[&_.tiptap_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
                            '[&_.tiptap_p.is-editor-empty:first-child::before]:text-gray-400',
                            '[&_.tiptap_p.is-editor-empty:first-child::before]:float-left',
                            '[&_.tiptap_p.is-editor-empty:first-child::before]:pointer-events-none',
                            '[&_.tiptap_p.is-editor-empty:first-child::before]:h-0',
                            '[&_.tiptap_ul]:list-disc [&_.tiptap_ul]:pl-5',
                            '[&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:pl-5',
                        '[&_.tiptap_li_p]:my-0',
                    ].join(' ')}
                />

                {/* ── Footer: char count ───────────────────────────────── */}
                {maxLength && (
                    <div className="flex justify-end px-3 py-1">
                        <span className={`text-xs ${charCount >= maxLength ? 'text-danger' : 'text-gray-400'}`}>
                            {charCount} / {maxLength}
                        </span>
                    </div>
                )}

                {/* ── Link bubble ──────────────────────────────────────── */}
                {activeLink && !showLinkInput && (
                    <LinkBubble
                        url={activeLink}
                        onEdit={openEditLink}
                        onRemove={removeLink}
                        anchorRef={editorWrapperRef}
                    />
                )}
            </div>

            {/* Helper text */}
            {helperText && (
                <p className="mt-2 text-xs text-gray-500">{helperText}</p>
            )}
        </div>
    );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;

