// Simple in-memory store for development email previews
export const devMailStore = []

export function pushDevMail(entry) {
    devMailStore.unshift({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...entry,
    })
    // keep last 50
    if (devMailStore.length > 50) devMailStore.length = 50
}

export function listDevMail() {
    return devMailStore
}
