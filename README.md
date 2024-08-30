This project sets up a Vite-React TypeScript application and integrates it with the Wormhole Connect SDK.

Prerequisites
Ensure you have the following installed on your system:

Node.js & TypeScript
npm 
Setup
1. Clone the Repository
First, clone the repository to your local machine:

git clone https://github.com/kerwinzlb/wormhole-connect-test.git
cd wormhole-connect-test
2. Download Dependencies
Make sure to install all required dependencies using npm or yarn:

# Using npm
npm install

### 3. Adjust WormholeConnectConfig

Adjust the `WormholeConnectConfig` in `src/views/IndexView/IndexView.tsx` based on the `deployment.json` file from your NTT deployment. This configuration is essential to ensure proper integration with your deployment environment.

### 4. Run the App

Finally, run your application:

npm run dev

### 5. Use the App

http://localhost:3002