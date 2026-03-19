# Blockchain-Enabled IoT Data Security with Machine Learning

A full-stack, browser-based simulation demonstrating how IoT sensor data can be generated, verified using machine learning, and secured via blockchain technology. 

## Features
- **IoT Simulator & Real-time Graphing:** Generates mock temperature and humidity data.
- **Machine Learning (Isolation Forest):** Uses an interactive simulation of ML anomaly detection to classify data streams.
- **Blockchain Ledger:** Visualizes the hashing and block creation cycle to secure validated datasets.
- **Modern UI:** Built with React, Vite, and Lucide React icons for a responsive, dashboard-like experience.

## Prerequisites
- **Node.js**: Ensure Node.js (version 18 or higher recommended) is installed on your computer.
- **npm**: Node Package Manager comes bundled with Node.js.

## Installation & Running Locally

1. **Open your Terminal/Command Prompt**
   Ensure you are in the root directory of the project (the folder containing this `README.md`).

2. **Download Dependencies**
   Run the following command to download and install all the necessary libraries:
   ```bash
   npm install
   ```

3. **Start the Development Server**
   Launch the project locally on your machine by running:
   ```bash
   npm run dev
   ```

4. **Access the Application**
   Once the server starts, open your web browser and navigate to the address shown in your terminal (typically `http://localhost:5173/`).

## Deployment Notes
If deploying this frontend to a static host (like Vercel or Netlify), client-side routing is used.
- **Vercel**: A `vercel.json` file is included to automatically redirect unmapped paths to `index.html`.
- **Netlify**: A `public/_redirects` file is included for route fallbacks.
This prevents the **404 error** that may occur if you refresh a page like `/settings` or `/explorer`.
