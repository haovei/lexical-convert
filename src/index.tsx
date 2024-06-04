import { fetchOpus, updateContent } from './fetch';
import { isHtmlorJson } from './utils';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { convertHtml } from './convert';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <div>Loading</div>
    </React.StrictMode>
);

async function main() {
    const opusStream = fetchOpus();
    for await (const opus of opusStream) {
        const type = isHtmlorJson(opus.content);
        if (type === 2) {
            console.log('Converting ID:', opus.id);
            const jsonString = await convertHtml(opus.content);
            await updateContent(opus.id, jsonString);
        }
    }
}

await main();
