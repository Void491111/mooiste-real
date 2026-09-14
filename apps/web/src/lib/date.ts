export function todayIso() {
    const now = new Date();
    const local =  new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    return local.toISOString().slice(0, 10);
}

export function daysAgoIso(days: number) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    return local.toISOString().slice(0, 10);
}