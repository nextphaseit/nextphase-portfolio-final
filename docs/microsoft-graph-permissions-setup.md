# Microsoft Graph API Permissions Setup

## The Issue
The "UnknownError" indicates that your Azure App Registration doesn't have the required permissions to access Microsoft 365 service health data.

## Required Permissions

### 1. Go to Azure Portal
1. Navigate to [Azure Portal](https://portal.azure.com)
2. Go to **Azure Active Directory** > **App registrations**
3. Find your app: `d7390a49-f343-4660-b731-52a12711281b`

### 2. Add API Permissions
1. Click on **API permissions**
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Choose **Application permissions**
5. Add these permissions:
   - `ServiceHealth.Read.All`
   - `ServiceMessage.Read.All` 
   - `Directory.Read.All` (if not already added)

### 3. Grant Admin Consent
1. After adding permissions, click **Grant admin consent for [Your Organization]**
2. Confirm by clicking **Yes**
3. Verify all permissions show "Granted for [Your Organization]"

### 4. Alternative: Use Public Service Health
If you can't get the Graph API permissions approved, you can:
- Use the public Microsoft 365 Status page
- Implement RSS feed parsing from Microsoft's status page
- Use third-party service monitoring APIs

## Testing the Setup

### 1. Test API Permissions
Visit `/debug/graph` and run the endpoint tests to see which permissions are working.

### 2. Check Service Health
Go to `/portal` and verify the service health component loads without errors.

## Troubleshooting

### Common Issues:
1. **Permissions not granted**: Admin consent required
2. **Wrong permission type**: Use Application permissions, not Delegated
3. **Tenant restrictions**: Some tenants restrict service health API access
4. **License requirements**: May require specific Microsoft 365 licenses

### Alternative Solutions:
1. **Manual updates**: Update service health manually in the portal
2. **RSS feeds**: Parse Microsoft's public status RSS feeds
3. **Third-party APIs**: Use services like StatusPage or similar
4. **Webhook integration**: Set up notifications from Microsoft Admin Center

## Next Steps
1. Configure the required permissions in Azure
2. Test the API connection
3. If permissions can't be granted, implement alternative data sources
