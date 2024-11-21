import React, { useState, useEffect } from "react";
import { ArweaveWalletKit, ConnectButton } from "arweave-wallet-kit";
import Arweave from "arweave"; // Import Arweave library
import Header from '../Header/Header';
import Body from '../Body/Body';
import Footer from '../Footer/Footer';

interface Wallet {
  address: string;
}

const ArweaveUpload = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null); // Define wallet type

  // Provide apiConfig for Arweave initialization
  const arweave = Arweave.init({
    host: "arweave.net", // or your custom Arweave gateway
    port: 443,
    protocol: "https",
  });

  useEffect(() => {
    if (wallet && wallet.address) {
      setWalletAddress(wallet.address);
    }
  }, [wallet]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const uploadToArweave = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      // Convert the file to Uint8Array
      const fileData = await fileToUint8Array(file);

      const transaction = await arweave.createTransaction({ data: fileData });
      await arweave.transactions.sign(transaction); // Sign the transaction with the wallet
      await arweave.transactions.post(transaction); // Post the transaction to Arweave

      console.log("Transaction successful! Transaction ID: ", transaction.id);

      // Send the transaction ID to the backend
      sendTransactionDataToBackend(transaction.id);
    } catch (error) {
      console.error("Error uploading to Arweave", error);
    }
  };

  // Function to convert file to Uint8Array
  const fileToUint8Array = (file: File): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(new Uint8Array(reader.result));
        } else {
          reject(new Error("Failed to read file as ArrayBuffer"));
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const sendTransactionDataToBackend = async (transactionId: string) => {
    try {
      const response = await fetch("http://localhost:3000/save-tx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactionId }),
      });

      const result = await response.json();
      console.log("Backend Response: ", result);
    } catch (error) {
      console.error("Error sending transaction data to backend", error);
    }
  };

  return (
    <div className="home">
      <ArweaveWalletKit
        config={{
          permissions: ["ACCESS_ADDRESS"],
          ensurePermissions: true,
          appInfo: { name: "MyDApp", logo: "logo.png" },
        }}
        theme={{
          displayTheme: "light",
          accent: { r: 0, g: 122, b: 255 },
          radius: "minimal",
        }}
        onConnect={(wallet: Wallet) => setWallet(wallet)} // Type the wallet parameter
      >
        <Header />
        <Body />
        <Footer />
        <ConnectButton
          accent="rgb(255, 0, 0)"
          profileModal={false}
          showBalance={true}
        />
      </ArweaveWalletKit>

      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadToArweave}>Upload to Arweave</button>
      </div>
    </div>
  );
};

export default ArweaveUpload;
