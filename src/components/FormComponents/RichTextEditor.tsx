import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { memo, useCallback, useState } from 'react';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import {
    RiBold, RiItalic, RiUnderline,
    RiListUnordered, RiListOrdered,
    RiAlignLeft, RiAlignCenter, RiAlignRight,
    RiLinkM, RiLinkUnlink,
    RiArrowGoBackLine, RiArrowGoForwardLine,
    RiIndentIncrease, RiIndentDecrease,
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
    </Tooltip>
));
ToolbarButton.displayName = 'ToolbarButton';

const Divider = () => <div className="w-px h-5 bg-gray-200 mx-0.5 self-center" />;

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
    const [linkUrl, setLinkUrl]           = useState('');
    const [showLinkInput, setShowLinkInput] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder }),
            ...(maxLength ? [CharacterCount.configure({ limit: maxLength })] : [CharacterCount]),
        ],
        content: value,
        editable: !disabled,
        onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    });

    const applyLink = useCallback(() => {
        if (!editor) return;
        if (linkUrl) editor.chain().focus().setLink({ href: linkUrl }).run();
        setLinkUrl('');
        setShowLinkInput(false);
    }, [editor, linkUrl]);

    const removeLink = useCallback(() => {
        editor?.chain().focus().unsetLink().run();
        setShowLinkInput(false);
    }, [editor]);

    if (!editor) return null;

    const charCount = editor.storage.characterCount?.characters?.() ?? 0;
    const inList    = editor.isActive('bulletList') || editor.isActive('orderedList');

    return (
        <div className={`flex flex-col ${disabled ? 'opacity-60 pointer-events-none' : ''}`}>

            {/* Label */}
            {label && (
                <label className="mb-2 block text-sm font-medium text-primary ">
                    {label}
                </label>
            )}

            {/* Editor wrapper */}
            <div className="flex flex-col rounded-lg border border-gray-200 bg-surface focus-within:border-primary-600 focus-within:ring-1 focus-within:ring-primary-600 transition-colors duration-150">

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

                    {/* Indent — only meaningful inside a list */}
                    <ToolbarButton title="Decrease indent" icon={<RiIndentDecrease size={14} />}
                        disabled={!inList}
                        onClick={() => editor.chain().focus().liftListItem('listItem').run()} />
                    <ToolbarButton title="Increase indent" icon={<RiIndentIncrease size={14} />}
                        disabled={!inList}
                        onClick={() => editor.chain().focus().sinkListItem('listItem').run()} />

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
                        onClick={() => setShowLinkInput(prev => !prev)} />
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
                            onKeyDown={e => e.key === 'Enter' && applyLink()}
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
                        '[&_.tiptap_a]:text-primary-600 [&_.tiptap_a]:underline',
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

