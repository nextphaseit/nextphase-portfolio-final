# SharePoint Permission Fix - Step by Step Guide

## 🎯 Goal: Enable Public Access to Client Resources

### Step 1: Check SharePoint Admin Settings

1. **Go to SharePoint Admin Center**
   - Visit: https://nextphaseit968-admin.sharepoint.com
   - Sign in with your admin account (adrian.knight@nextphaseit.org)

2. **Navigate to Sharing Settings**
   - Click "Policies" → "Sharing"
   - Ensure "External sharing" is enabled
   - Set to "Anyone" or "New and existing guests"

### Step 2: Fix Individual File Sharing

#### For Each Resource File:

1. **Navigate to your file**
   \`\`\`
   https://nextphaseit968-my.sharepoint.com/personal/adrian_knight_nextphaseit_org/Documents/
   \`\`\`

2. **Right-click the file** → Select "Share"

3. **Change sharing settings:**
   - Click the dropdown that says "Specific people"
   - Select "Anyone with the link"
   - Ensure "Allow editing" is UNCHECKED (View only)
   - Click "Apply"

4. **Copy the share link**
   - The URL should look like:
   \`\`\`
   https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/EXAMPLEfileID?e=sharekey
   \`\`\`

5. **Test the link**
   - Open in incognito/private browser
   - Verify file opens without login prompt

### Step 3: Create Download and Preview URLs

For each working share URL, create these variants:

\`\`\`javascript
// Original share URL
const shareUrl = "https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/EXAMPLEfileID?e=sharekey"

// Download URL (add &download=1)
const downloadUrl = shareUrl + "&download=1"

// Preview URL (add &action=embedview)  
const previewUrl = shareUrl + "&action=embedview"
\`\`\`

### Step 4: Alternative - Create a Public Document Library

If individual file sharing doesn't work:

1. **Create a new Document Library**
   - Go to your SharePoint site
   - Click "New" → "Document Library"
   - Name it "Client Resources"

2. **Upload your files to this library**

3. **Share the entire library**
   - Library Settings → Permissions
   - Share with "Anyone with the link"
   - Set to "Read" permissions

4. **Get library URLs**
   \`\`\`
   https://nextphaseit968.sharepoint.com/sites/yoursite/ClientResources/Forms/AllItems.aspx
   \`\`\`

### Step 5: Test Everything

1. **Open each link in incognito browser**
2. **Verify no login is required**
3. **Test download functionality**
4. **Check preview works**

## 🚨 Common Issues & Solutions

### Issue: "External sharing is disabled"
**Solution:** Contact your Microsoft 365 admin to enable external sharing

### Issue: "This link has been removed"
**Solution:** The file was moved or sharing was revoked - recreate the share link

### Issue: "Sign in required"
**Solution:** Link is set to "Specific people" - change to "Anyone with the link"

### Issue: "Access denied"
**Solution:** Check if the file exists and you have permission to share it

## 📋 Checklist

- [ ] SharePoint external sharing enabled
- [ ] Files uploaded to SharePoint
- [ ] Share links created with "Anyone with the link"
- [ ] Download URLs created (add &download=1)
- [ ] Preview URLs created (add &action=embedview)
- [ ] All links tested in incognito browser
- [ ] Portal updated with working URLs

## 🔗 Example Working URLs

Once fixed, your URLs should work like this:

\`\`\`
✅ Share URL (works in incognito):
https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/EYourFileID?e=YourShareKey

✅ Download URL (triggers download):
https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/EYourFileID?e=YourShareKey&download=1

✅ Preview URL (opens in browser):
https://nextphaseit968-my.sharepoint.com/:b:/g/personal/adrian_knight_nextphaseit_org/EYourFileID?e=YourShareKey&action=embedview
