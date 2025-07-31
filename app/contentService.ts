export type Content = {
    id: string
    name: string
    description: string
}

export function getContent(slug: string): Content | null {
    if (!slug) {
        return null
    }    
    const name: string = slug.replace('-', ' ').toUpperCase()
    const description: string = 'This is a description of ' + name + '.'
    const content: Content = {
        id: '1',
        name: name,
        description: description    
    }
    return content
}

export function getsMusic(contentid: string): Content | null {
    if (!contentid) {
        return null
    }      
    const name: string = 'Content Id ' + contentid
    const description: string = 'This is a description of ' + contentid + '.'
    const content: Content = {
        id: contentid,
        name: name,
        description: description    
    }
    return content
}