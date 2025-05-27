# OneDrive Integration Setup Guide

## Step 1: Prepare Your OneDrive Files

1. **Upload your resources** to a dedicated OneDrive folder (e.g., "Client Resources")
2. **Organize files** into subfolders:
   - User Guides
   - Policies & Procedures  
   - Templates & Forms
   - Troubleshooting Guides

## Step 2: Generate Share Links

For each file you want to include:

1. **Right-click the file** in OneDrive
2. **Select "Share"**
3. **Click "Copy link"** 
4. **Choose "Anyone with the link can view"** (for client access)
5. **Copy the generated link**

## Step 3: Get OneDrive File IDs

### Method 1: From Share URL
\`\`\`
https://1drv.ms/b/s!AhKjsd8f7sdf8sdf7sd8f7sd8f
                    ^-- This is your encoded file ID
\`\`\`

### Method 2: Using OneDrive API
\`\`\`bash
# Get file info from share URL
curl "https://api.onedrive.com/v1.0/shares/{encoded-share-url}/root"
\`\`\`

## Step 4: Update Resource Configuration

Replace the placeholder URLs in `app/portal/page.tsx`:

\`\`\`typescript
{
  id: "1",
  title: "Your Document Title",
  shareUrl: "https://1drv.ms/b/s!YOUR_ACTUAL_SHARE_LINK",
  downloadUrl: "https://api.onedrive.com/v1.0/shares/YOUR_ENCODED_URL/root/content",
  previewUrl: "https://onedrive.live.com/embed?resid=YOUR_RESOURCE_ID&authkey=YOUR_AUTH_KEY"
}
\`\`\`

## Step 5: Test Integration

1. **Upload a test file** to OneDrive
2. **Generate share link**
3. **Update one resource** in the portal
4. **Test download and preview** functionality

## Advanced Features

### Authentication (Optional)
For private files, you can implement Microsoft Graph API authentication:

\`\`\`typescript
// Add to your environment variables
MICROSOFT_CLIENT_ID=your_client_id
MICROSOFT_CLIENT_SECRET=your_client_secret
MICROSOFT_TENANT_ID=your_tenant_id
\`\`\`

### Automatic Sync
You can set up webhooks to automatically update the resource list when files change in OneDrive.

## Security Considerations

1. **Use "Anyone with link"** for public resources
2. **Use "Specific people"** for sensitive documents
3. **Regularly audit** share permissions
4. **Monitor download logs** for unusual activity

## Troubleshooting

### Common Issues:
- **403 Forbidden**: Check share permissions
- **404 Not Found**: Verify file ID and share URL
- **CORS Errors**: Use share URLs instead of direct API calls from browser

### Testing URLs:
- Share URL: Should open file in OneDrive web interface
- Preview URL: Should embed file in iframe
- Download URL: Should trigger file download
