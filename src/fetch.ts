export async function fetchData(url: string, options?: FetchRequestInit) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}${url}`, options);
        const data = await response.json();
        return [data.data, null];
    } catch (error) {
        return [null, error];
    }
}

export async function updateContent(id: number, content: string) {
    console.log(`Updating content for ID ${id}`);
    const [updatedData, error] = await fetchData('/client/common/opus/updateOpusContent', {
        method: 'POST',
        body: JSON.stringify({
            id,
            content,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (error) {
        console.error(error);
        return;
    } else {
        console.log('Updated:', updatedData);
    }
}

export async function fetchList(pageIndex: number) {
    console.log(`Fetching page ${pageIndex}`);
    const [res, error] = await fetchData(`/client/common/opus/pageOpus?pageIndex=${pageIndex}`);
    return [res.data, error];
}

export async function* fetchOpus() {
    let pageIndex = 1;
    while (true) {
        const [data, error] = await fetchList(pageIndex);
        if (error) {
            console.error(error);
            return;
        }
        if (data.length === 0) {
            return;
        }
        for (const opus of data) {
            yield opus;
        }
        pageIndex++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
}
