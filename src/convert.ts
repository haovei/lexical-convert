import { $insertNodes, createEditor } from 'lexical';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import { $generateNodesFromDOM } from '@lexical/html';

export function convertHtml(html: string): Promise<string> {
    return new Promise((resolve) => {
        const config = {
            namespace: 'EditorTheme',
            nodes: [...PlaygroundNodes],
            theme: PlaygroundEditorTheme,
            onError: console.error,
        };

        const editor = createEditor(config);

        const parser = new DOMParser();
        const dom = parser.parseFromString(html, 'text/html');

        editor.update(() => {
            const nodes = $generateNodesFromDOM(editor, dom);
            $insertNodes(nodes);
        });
        setTimeout(() => {
            resolve(JSON.stringify(editor.getEditorState().toJSON()));
        });
    });
}
