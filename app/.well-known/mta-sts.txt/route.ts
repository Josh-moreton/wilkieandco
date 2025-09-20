export async function GET() {
    // MTA-STS policy file as per RFC 8461
    // This should be customized for your specific domain and mail server configuration
    const policy = `version: STSv1
mode: enforce
mx: *.protection.outlook.com
max_age: 604800`

    return new Response(policy, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        },
    })
}