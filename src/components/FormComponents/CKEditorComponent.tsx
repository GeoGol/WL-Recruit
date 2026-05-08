import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    AccessibilityHelp,
    Autoformat,
    AutoLink,
    Autosave,
    Bold, Italic, Underline,
    BlockQuote,
    Essentials,
    Heading,
    Indent, IndentBlock,
    Link,
    List, ListProperties,
    Paragraph,
    SelectAll,
    Table, TableCaption, TableCellProperties,
    TableColumnResize, TableProperties, TableToolbar,
    TextTransformation,
    Undo,
    Alignment,
    WordCount,
    type EditorConfig,
    type Translations,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import './CKEditorComponent.css';

// ─── Translations (one static import per language) ────────────────────────────
import elCore    from 'ckeditor5/translations/el.js';
import roCore    from 'ckeditor5/translations/ro.js';
import elPremium from 'ckeditor5-premium-features/translations/el.js';
import roPremium from 'ckeditor5-premium-features/translations/ro.js';

// English is CKEditor's built-in language — no translation file needed.
const TRANSLATIONS: Record<string, Translations[]> = {
    el: [elCore, elPremium],
    ro: [roCore, roPremium],
    en: [],
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface CKEditorComponentProps {
    value?       : string;
    placeholder? : string;
    label?       : string;
    helperText?  : string;
    maxChars?    : number;
    disabled?    : boolean;
    required?    : boolean;
    wrapperClass?: string;
    onChange?    : (html: string) => void;
}

// ─── License ──────────────────────────────────────────────────────────────────

const LICENSE_KEY = import.meta.env.VITE_CKEDITOR_LICENSE_KEY || 'GPL';

// ─── Component ────────────────────────────────────────────────────────────────

const CKEditorComponent = memo<CKEditorComponentProps>(({
    value       = '',
    label,
    helperText,
    maxChars,
    disabled    = false,
    required    = false,
    wrapperClass='',
    onChange,
}) => {
    const { i18n }  = useTranslation();
    const lang      = (i18n.language ?? 'en').split('-')[0];

    const editorRef             = useRef<ClassicEditor | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [charCount, setCharCount] = useState(0);

    // ── Config — rebuilt only when language changes ───────────────────────────
    const editorConfig = useMemo<EditorConfig>(() => ({
        licenseKey: LICENSE_KEY,
        ...(lang !== 'en' && TRANSLATIONS[lang] ? {
            language    : lang,
            translations: TRANSLATIONS[lang],
        } : {}),
        plugins: [
            AccessibilityHelp,
            Autoformat,
            AutoLink,
            Autosave,
            Bold, Italic, Underline,
            BlockQuote,
            Essentials,
            Heading,
            Indent, IndentBlock,
            Link,
            List, ListProperties,
            Paragraph,
            SelectAll,
            Table, TableCaption, TableCellProperties,
            TableColumnResize, TableProperties, TableToolbar,
            TextTransformation,
            Undo,
            Alignment,
            WordCount,
        ],
        toolbar: {
            items: [
                'undo', 'redo', '|',
                'heading', '|',
                'bold', 'italic', 'underline', '|',
                'bulletedList', 'numberedList', '|',
                'outdent', 'indent', '|',
                'alignment', '|',
                'link', 'blockQuote',
                'insertTable', '|',
                'accessibilityHelp',
            ],
            shouldNotGroupWhenFull: true,
        },
        heading: {
            options: [
                { model: 'paragraph',  title: 'Paragraph',  class: 'ck-heading_paragraph'  },
                { model: 'heading1',   view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2',   view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3',   view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            ],
        },
        link: {
            addTargetToExternalLinks : true,
            defaultProtocol          : 'https://',
            decorators               : {
                toggleDownloadable: {
                    mode   : 'manual',
                    label  : 'Downloadable',
                    attributes: { download: 'file' },
                },
            },
        },
        list: {
            properties: {
                styles     : true,
                startIndex : true,
                reversed   : true,
            },
        },
        table: {
            contentToolbar: [
                'tableColumn', 'tableRow', 'mergeTableCells',
                'tableProperties', 'tableCellProperties',
            ],
        },
    }), [lang]);

    // ── Sync external value ───────────────────────────────────────────────────
    useEffect(() => {
        if (!isReady) return;
        const editor = editorRef.current;
        if (editor && editor.getData() !== value) {
            editor.setData(value);
        }
    }, [value, isReady]);

    // ── Sync read-only / disabled ─────────────────────────────────────────────
    useEffect(() => {
        if (!isReady) return;
        const editor = editorRef.current;
        if (!editor) return;
        if (disabled) {
            editor.enableReadOnlyMode('ck-disabled');
        } else {
            editor.disableReadOnlyMode('ck-disabled');
        }
    }, [disabled, isReady]);

    return (
        <div className={`flex flex-col ${disabled ? 'opacity-60 pointer-events-none' : ''}`}>

            {/* Label */}
            {label && (
                <div className="justify-start items-center gap-1 flex mb-2">
                    <label className="text-muted text-base font-normal whitespace-nowrap text-ellipsis overflow-hidden">
                        {label}
                    </label>
                    {required && (
                        <span className="ml-1 text-danger text-sm" aria-hidden="true">*</span>
                    )}
                </div>
            )}

            {/* Editor */}
            <div className={`ck-editor-wrapper ${wrapperClass}`}>
                <CKEditor                    
                    key={lang}
                    editor={ClassicEditor}
                    config={editorConfig}
                    data={value}
                    onReady={editor => {
                        editorRef.current = editor;
                        if (disabled) editor.enableReadOnlyMode('ck-disabled');
                        // Initialise char count from initial value
                        const count = editor.plugins.get('WordCount').characters;
                        setCharCount(count);
                        setIsReady(true);
                    }}
                    onChange={(_event, editor) => {
                        const count = editor.plugins.get('WordCount').characters;
                        setCharCount(count);
                        // Block further input once limit is reached
                        if (maxChars && count > maxChars) {
                            editor.model.change(writer => {
                                writer.setSelection(
                                    editor.model.document.getRoot()!,
                                    'end'
                                );
                            });
                            return; // do not emit onChange
                        }
                        onChange?.(editor.getData());
                    }}
                    onError={(error, { willEditorRestart }) => {
                        if (willEditorRestart) {
                            editorRef.current = null;
                            setIsReady(false);
                        }
                        console.error('CKEditor error:', error);
                    }}
                />

                {/* Character counter */}
                {maxChars && (
                    <div className="flex justify-end p-3">
                        <span className={`text-xs ${charCount >= maxChars ? 'text-danger' : 'text-gray-400'}`}>
                            {charCount} / {maxChars}
                        </span>
                    </div>
                )}
            </div>



            {/* Helper text */}
            {helperText && (
                <p className="mt-2 text-sm text-muted">{helperText}</p>
            )}
        </div>
    );
});

CKEditorComponent.displayName = 'CKEditorComponent';
export default CKEditorComponent;

