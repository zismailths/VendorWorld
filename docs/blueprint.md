# **App Name**: VendorVerse: Seller's Portal

## Core Features:

- Dashboard Overview: Provide a comprehensive dashboard summarizing key metrics like sales performance, inventory status, and order fulfillment. Include Summary Cards for Total Active Offers, Total Laptops Sold, and Lifetime Revenue. Feature a dynamic alert panel to notify sellers when their offer achieves Rank #1 or is undercut by more than Rs. 2,000.
- Product Listing (New Offer): Implement a guided form to capture sellerOffers data, including modelId (lookup/dropdown), uniqueSerialNumber (manual/QR code), conditionGrade, and sellerPrice. Integrate Cloud Storage for uploadedImageURLs.
- Offer Management: Create a data table listing all seller's sellerOffers with columns for Model, Serial, Offered Price, Current Rank, Rank #1 Price, and Status. Allow inline or modal editing of the sellerPrice (updating the submissionTimestamp) and a button to Withdraw Offer (sets status to EXPIRED).
- Key Metrics / Stats: Section dedicated to showing historical performance (e.g., Average Rank, Sold vs. Withdrawn ratio).
- Profile Management: Standard section for managing sellers profile data (Name, contact info).

## Style Guidelines:

- Primary color: Vibrant Blue (#2E9AFE) for trust, reliability, and a professional look. Used for main buttons, navigation background, and key data visualization.
- Background color: Light Blue (#EBF5FF) for a clean, calm feel, visually related to the Primary color. Used for overall page background and subtle card/panel backgrounds.
- Accent color: Saturated Violet (#BE29EC) to stand out significantly. Used exclusively for high-priority interactive elements (e.g., Submit Offer button, Rank #1 alert icon).
- Body font: 'PT Sans' (Sans-serif) for readability in data tables, form labels, and detailed text.
- Headline font: 'Playfair' (Serif) for elegance and distinction in page titles and main dashboard headings.
- Consistent Line Icons: Modern, clean aesthetic. Use icons for navigation and feature representations (e.g., a chart icon for Dashboard, a laptop icon for New Offer).
- Clean, Grid-Based Layout: Prioritize usability. Dashboard elements (metrics, alerts) must be organized into logical, responsive cards. Use ample whitespace.
- Interactions: Subtle Transitions - Use light animations (e.g., fade-in for page load, subtle shadow change on button hover) to enhance user experience.