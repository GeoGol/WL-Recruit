import { Extension } from '@tiptap/core';

const INDENT_STEP = 2; // rem per level
const MAX_INDENT  = 10;
const MIN_INDENT  = 0;

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        indent: {
            indent:  () => ReturnType;
            outdent: () => ReturnType;
        };
    }
}

const Indent = Extension.create({
    name: 'indent',

    addGlobalAttributes() {
        return [
            {
                types: ['paragraph', 'heading', 'bulletList', 'orderedList'],
                attributes: {
                    indent: {
                        default: 0,
                        parseHTML: el => {
                            const ml = (el as HTMLElement).style.marginLeft;
                            if (!ml) return 0;
                            return Math.round(parseFloat(ml) / INDENT_STEP);
                        },
                        renderHTML: attrs => {
                            if (!attrs.indent) return {};
                            return { style: `margin-left: ${attrs.indent * INDENT_STEP}rem` };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            indent: () => ({ tr, state, dispatch }) => {
                const { selection } = state;
                const { from, to }  = selection;

                tr.doc.nodesBetween(from, to, (node, pos) => {
                    if (!['paragraph', 'heading', 'bulletList', 'orderedList'].includes(node.type.name)) return;
                    const current = (node.attrs.indent as number) ?? 0;
                    if (current >= MAX_INDENT) return;
                    tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: current + 1 });
                });

                if (dispatch) dispatch(tr);
                return true;
            },

            outdent: () => ({ tr, state, dispatch }) => {
                const { selection } = state;
                const { from, to }  = selection;

                tr.doc.nodesBetween(from, to, (node, pos) => {
                    if (!['paragraph', 'heading', 'bulletList', 'orderedList'].includes(node.type.name)) return;
                    const current = (node.attrs.indent as number) ?? 0;
                    if (current <= MIN_INDENT) return;
                    tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: current - 1 });
                });

                if (dispatch) dispatch(tr);
                return true;
            },
        };
    },

    addKeyboardShortcuts() {
        return {
            Tab:       () => this.editor.commands.indent(),
            'Shift-Tab': () => this.editor.commands.outdent(),
        };
    },
});

export default Indent;

