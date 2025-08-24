export function getGoogleAuthURL() {
    const params = new URLSearchParams({
        response_type: 'code',
        scope: 'openid profile email',
        access_type: 'offline',
        prompt: 'consent'
    });

    return '';
}