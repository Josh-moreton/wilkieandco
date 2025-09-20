# MTA-STS (Mail Transfer Agent Strict Transport Security) Implementation

This website implements MTA-STS as per RFC 8461 to enhance email security.

## What is MTA-STS?

MTA-STS is a security standard that helps ensure that email sent to your domain is always encrypted in transit and sent to the correct mail servers. It works by publishing a policy that specifies:

- Which mail servers are authorized to receive email for your domain
- Whether encryption (TLS) is required
- How long the policy should be cached

## Implementation Details

### Policy File Location

- **URL**: `/.well-known/mta-sts.txt`
- **File**: `app/.well-known/mta-sts.txt/route.ts`

### Current Policy Configuration

```
version: STSv1
mode: enforce
mx: *.protection.outlook.com
max_age: 604800
```

#### Policy Explanation

- **version**: Always "STSv1" for the current standard
- **mode**: Set to "enforce" for strict security (alternatives: "testing", "none")
- **mx**: Specifies authorized mail servers (currently configured for Microsoft 365)
- **max_age**: Policy cache duration in seconds (604800 = 7 days)

### DNS Requirements

⚠️ **Important**: MTA-STS also requires DNS TXT record configuration.

You need to add a TXT record to your DNS:

```
_mta-sts.yourdomain.com IN TXT "v=STSv1; id=YYYYMMDDHHMMSS;"
```

- Replace `yourdomain.com` with your actual domain
- Replace `YYYYMMDDHHMMSS` with current timestamp (e.g., 20250920120000)
- Update the `id` value whenever you change the policy

### Subdomain Setup

MTA-STS requires the policy to be served from a subdomain:

- **Subdomain**: `mta-sts.yourdomain.com`
- **Certificate**: Must have valid SSL certificate
- **Accessibility**: Must serve this website/policy at that subdomain

### Customization

To customize the MTA-STS policy for your domain:

1. **Update the MX records** in `app/.well-known/mta-sts.txt/route.ts`:
   - Replace `*.protection.outlook.com` with your actual mail servers
   - Add multiple `mx:` lines if you have multiple mail servers

2. **Adjust the mode**:
   - `testing`: For initial deployment (allows fallback)
   - `enforce`: For production (strict enforcement)
   - `none`: To disable MTA-STS

3. **Configure max_age**:
   - Lower values (3600 = 1 hour) for testing
   - Higher values (604800 = 7 days) for production

### Verification

After deployment, you can verify MTA-STS using:

- Online MTA-STS validators
- `curl https://mta-sts.yourdomain.com/.well-known/mta-sts.txt`
- Email security testing tools

### References

- [RFC 8461 - SMTP MTA Strict Transport Security (MTA-STS)](https://tools.ietf.org/rfc/rfc8461.txt)
- [Microsoft 365 MTA-STS Documentation](https://learn.microsoft.com/en-us/purview/enhancing-mail-flow-with-mta-sts)
