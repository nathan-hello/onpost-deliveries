
// Function wrappers so that I can tell where I'm
// encoding/decoding the base names in the future.

export function encodeBaseName(base_name: string) {
        return encodeURI(base_name)        
}

export function decodeBaseHref(base_href: string) {
        return decodeURI(base_href)
}
