import React, { useState } from 'react';
import Arweave from 'arweave';

const App = () => {
    const [walletData, setWalletData] = useState<any>(null);
    const [message, setMessage] = useState<string>('');

    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
    });

    const connectToArConnect = async () => {
        try {
            if (window.arweaveWallet) {
                const address = await window.arweaveWallet.getActiveAddress();
                const balance = await arweave.wallets.getBalance(address);

                setWalletData({ address, balance: Number(balance) / 1e12 });
                console.log(`Connected with wallet address: ${address}, Balance: ${ Number(balance) / 1e12}`);
            } else {
                alert('ArConnect not detected. Creating a new wallet...');

                const key = await arweave.wallets.generate();
                const address = await arweave.wallets.jwkToAddress(key);
                const balance = await arweave.wallets.getBalance(address);

                setWalletData({ address, balance: Number(balance) / 1e12 });

                console.log(`Created new wallet with address: ${address}, Balance: ${ Number(balance) / 1e12}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error connecting to wallet or creating a new one.');
        }
    };

    const uploadData = async () => {
        if (!walletData) {
            alert('Please connect your wallet first.');
            return;
        }

        const dataToUpload = "Sample dataset to post";

        try {
            const response = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    walletAddress: walletData.address,
                    data: dataToUpload,
                }),
            });
            const result = await response.json();
            setMessage(result.message || 'Data upload successful');
        } catch (error) {
            console.error('Error uploading data:', error);
            setMessage('Error uploading data');
        }
    };

    return (
        <div>
            <button 
                onClick={connectToArConnect} 
                style={{ backgroundColor: '#ff7e5f', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '10px' }}
            >
                Connect or Create Wallet
            </button>
            {walletData && (
                <div>
                    <p><strong>Wallet Address:</strong> {walletData.address}</p>
                    <p><strong>Balance:</strong> {walletData.balance} AR</p>
                </div>
            )}
            <button 
                onClick={uploadData} 
                style={{ backgroundColor: '#ff7e5f', color: 'white',   margin: '20px 8px', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Upload Data to Arweave
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default App;
