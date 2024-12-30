# Automated Web Crawling Solution for Entity-Specific Data Extraction

## **Problem Statement**
In today's data-driven world, obtaining structured, accurate, and entity-specific information from websites is critical. Extracting details such as **Name**, **Contact Information**, **Images**, **Occupation**, **Family Details**, and **Political Party Affiliation** from websites poses significant challenges due to:
- Complex and dynamic web structures.
- The need to interact with tabs, collapsible sections, and multi-step navigation.
- Handling dynamic pagination and AJAX-based content loading.

This solution automates web crawling and data extraction while ensuring minimal manual intervention, scalable design, and robust handling of dynamic content.

---

## **Key Features**
- **Dynamic Content Handling**: Uses Playwright for navigating and scraping AJAX-based, dynamic web pages.
- **Smart Extractors**: Modular extractors for specific data fields (e.g., names, emails) powered by regex and intelligent DOM traversal.
- **Retry and Error Management**: Built-in retry logic ensures robustness against network failures and unexpected errors.
- **Data Deduplication**: Prevents duplicate records by maintaining a database of visited URLs.
- **Structured Output**: Outputs extracted data in JSON or CSV format.
- **Separation of Concerns**: Encapsulated logic for scraping, extracting, and database management.
- **Scalable and Extensible**: Ready to integrate with AI and NLP (e.g., Named Entity Recognition) for enhanced data classification.

---

## **Installation**

### **Prerequisites**
- Node.js (v18 or higher)
- SQLite3 (pre-installed on most systems or install via your package manager)

### **Setup**
1. Clone this repository:
   ```bash
   git clone https://github.com/devshridhar/crawler
   cd crawler
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## **How to Run**

### **Start Crawling**
1. Run the crawler script:
   ```bash
   npm start
   ```
2. The script processes URLs listed in the `crawler.js` file, dynamically extracts data, and saves it to the database.

### **Export Data**
To export data to CSV:
```bash
npm run export
```

---

## **Packages Used**

### **1. Playwright**
- **Purpose**: Handles dynamic web interactions, such as AJAX content loading, pagination, and navigating collapsible sections.
- **Advantage**: Mimics human browsing behavior, ensuring accurate data extraction from modern websites.

### **2. SQLite3**
- **Purpose**: Stores extracted data and tracks visited URLs.
- **Advantage**: Lightweight and easy to query, with support for unique constraints to prevent duplicate entries.

### **3. Modular Extractors**
- **Extractors** are tailored for:
    - Names (e.g., regex for titles like "Hon.", "Dr.").
    - Contact Information (e.g., email and phone).
    - Occupations and Political Affiliations.
- **Advantage**: Separation of concerns allows modular testing and quick updates.

---

## **Processing Logic**
1. **Crawler**:
    - Iterates through a list of target URLs.
    - Uses Playwright to navigate and fetch page content dynamically.

2. **Extractors**:
    - Parses HTML content using predefined patterns and modular logic.
    - Extracted fields are validated for completeness (e.g., name + contact info).

3. **Database**:
    - Saves meaningful records.
    - Tracks visited URLs to avoid redundant crawling.

4. **Error Handling**:
    - Retries failed URLs.
    - Logs errors for debugging.

---

## **Example Output**
### Input URL
`https://www.parlament.mt/en/14th-leg/political-groups/labour-party/abela-carmelo/`

### Extracted Data
```json
{
  "name": "Hon. Carmelo Abela MP",
  "email": "carmelo.abela@parlament.mt",
  "phone": null,
  "occupation": null,
  "politicalParty": "Labour Party",
  "image": "https://www.parlament.mt/media/116709/abela-carmelo-grey.jpg",
  "source_url": "https://www.parlament.mt/en/14th-leg/political-groups/labour-party/abela-carmelo/"
}
```

---

## **Advantages**

### **1. Scalable Design**
- Modular extractors allow easy integration of additional data fields.
- Extendable for AI/ML-powered classification and Named Entity Recognition.

### **2. Intelligent Processing**
- Smart crawling adapts to varying web structures.
- Efficient retry logic minimizes failures.

### **3. Future Integration**
- Add Natural Language Models (NLMs) for extracting semantic relationships.
- Integrate vector databases for advanced search and correlation.

---

## **Attractive Features to Highlight**
- Fully automated, requiring no manual intervention.
- Handles complex websites with pagination, tabs, and AJAX calls.
- High reliability with robust deduplication and error management.
- Outputs ready-to-use structured data for downstream processing.

---

## **Conclusion**
This solution combines the power of **Playwright** for dynamic web interaction, **smart extractors** for targeted data parsing, and **SQLite3** for efficient data storage. With its extensible design, the application is poised for integration with advanced AI capabilities, making it a versatile tool for large-scale entity-specific data extraction.

