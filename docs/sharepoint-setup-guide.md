# SharePoint Integration Setup Guide

## 🚨 Fixing "This link has been removed" Error

The error you're seeing indicates a SharePoint permission issue. Here's how to fix it:

### Step 1: Check File Permissions

1. **Go to your SharePoint site**: https://nextphaseit968-my.sharepoint.com
2. **Navigate to the file** you want to share
3. **Right-click the file** → Select "Manage Access"
4. **Check current permissions** - you should see who has access

### Step 2: Create Proper Share Links

#### For Public Client Access:
1. **Right-click the file** → "Share"
2. **Click "Anyone with the link"** (not "Specific people")
3. **Set permissions to "View"** (not edit)
4. **Uncheck "Allow editing"**
5. **Click "Apply"**
6. **Copy the link**

#### For Restricted Access:
1. **Right-click the file** → "Share"
2. **Select "Specific people"**
3. **Add client email addresses**
4. **Set to "View" permissions**
5. **Add a message** (optional)
6. **Send**

### Step 3: Test Your Links

Before adding to the portal, test each link:

1. **Open in incognito/private browser**
2. **Verify file opens correctly**
3. **Test download functionality**
4. **Check preview works**

### Step 4: SharePoint URL Structure

Your SharePoint URLs should look like this:

\`\`\`
# Share URL (for viewing)
https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/FILE_ID?e=SHARE_KEY

# Download URL (add &download=1)
https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/FILE_ID?e=SHARE_KEY&download=1

# Preview URL (add &action=embedview)
https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/FILE_ID?e=SHARE_KEY&action=embedview
\`\`\`

## 📁 Recommended Folder Structure

Create this structure in your SharePoint:

\`\`\`
📁 Client Resources/
├── 📁 User Guides/
│   ├── Microsoft 365 User Guide.pdf
│   ├── Email Setup Instructions.pdf
│   └── Teams User Manual.pdf
├── 📁 Policies & Procedures/
│   ├── Security Best Practices.pdf
│   ├── Acceptable Use Policy.pdf
│   └── Data Backup Policy.pdf
├── 📁 Templates & Forms/
│   ├── IT Request Form.xlsx
│   ├── Incident Report Template.docx
│   └── Network Diagram Template.vsdx
└── 📁 Troubleshooting/
    ├── Network Issues Guide.pdf
    ├── Email Problems Checklist.pdf
    └── Software Installation Guide.pdf
\`\`\`

## 🔧 Alternative Solutions

### Option 1: Use Document Library
1. Create a **Document Library** in SharePoint
2. Upload files to the library
3. Share the **entire library** with clients
4. Use library URLs instead of individual file URLs

### Option 2: Use SharePoint Site
1. Create a **dedicated SharePoint site** for client resources
2. Add clients as **site members** with read permissions
3. Organize files in site document libraries
4. Share site URL with clients

### Option 3: Use Microsoft Lists
1. Create a **Microsoft List** with file attachments
2. Add metadata (category, description, etc.)
3. Share list with clients
4. Embed list view in your portal

## 🛠️ Troubleshooting Common Issues

### "Access Denied" Error
- **Check sharing permissions**
- **Verify user has access**
- **Try regenerating share link**

### "File Not Found" Error
- **Check if file was moved/deleted**
- **Verify URL is correct**
- **Check if sharing was disabled**

### "Link Expired" Error
- **SharePoint links don't expire by default**
- **Check if admin disabled external sharing**
- **Regenerate the share link**

## 🔐 Security Best Practices

1. **Use "View only" permissions** for client resources
2. **Regularly audit access** to shared files
3. **Use expiration dates** for sensitive documents
4. **Monitor download activity** through SharePoint analytics
5. **Use watermarks** on confidential documents

## 📞 Next Steps

1. **Fix the current link** using the steps above
2. **Test the corrected link** in incognito mode
3. **Update the portal code** with working URLs
4. **Create additional resource files**
5. **Test the complete integration**

Need help? Contact Microsoft Support or your SharePoint administrator.
