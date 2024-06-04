/**
 *
 * @param str
 * @returns 0:text 1:json 2:html
 */
export function isHtmlorJson(str: string) {
    // const StringType = {
    //   JSON: 'json',
    //   HTML: 'html',
    //   TEXT: 'text',
    // };
    try {
        JSON.parse(str);
        return 1;
    } catch (e) {
        const htmlPattern = /<([a-z][a-z0-9]*)\b[^>]*>/i;
        if (htmlPattern.test(str)) {
            return 2;
        } else {
            return 0;
        }
    }
}
