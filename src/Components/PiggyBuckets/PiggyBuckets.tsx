import React, { useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PiggyBuckets.css";
import EthereumImage from '../../assets/EthereumImage.jpeg';
import GiveWell from '../../assets/GiveWellDonations.png';
import GiveDirectly from '../../assets/Give Directly.webp';
import UkraineWar from '../../assets/UkrianeWar.jpg';
import AsterImage from '../../assets/AstarImage.jpg';
import PolygonImage from '../../assets/PolygonImage.jpeg';
import { getWallets, Wallet } from '@talismn/connect-wallets';
import { ethers } from "ethers";


// Define types for the data
type CarouselItem = {
  image: string;
  title: string;
  description: string;
};

// Define types for the data
type DonationItem = CarouselItem & {
  wallets: Map<string, string>;
};

const CarouselComponent: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<"Pools" | "Donations">("Pools");
  const [selectedWallet, setSelectedWallet] = useState<{
    address: string;
    blockchain: string;
  } | null>(null);

  const process = async (item: DonationItem) => {
    if (selectedSection === "Donations") {
      const wallets: Wallet[] = getWallets();
      const installedWallets = wallets.filter((wallet) => wallet.installed);
      const talismanWallet: Wallet | undefined = installedWallets.find(
        (wallet) => wallet.extensionName === 'talisman'
      );

      if (talismanWallet) {
        await talismanWallet.enable('myCoolDapp');
        const accounts = await talismanWallet.getAccounts();
        const senderAddress = accounts[0]?.address; // Get the sender's address
        const destinationAddress = item.wallets.get("ethereum"); // Get destination address
        const amountInEth = "0.01"; // Amount you want to send (in ETH)

        // Create a provider using ethers.js
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Create a signer
        const signer = provider.getSigner(senderAddress);
        
        // Prepare the transaction
        const tx = {
          to: destinationAddress,
          value: ethers.utils.parseEther(amountInEth), // Convert amount to wei
          gasLimit: ethers.utils.hexlify(21000), // Set gas limit
        };

        try {
          // Send the transaction
          const transactionResponse = await signer.sendTransaction(tx);
          console.log("Transaction sent:", transactionResponse.hash); // Log transaction hash
          
          // Wait for the transaction to be mined
          await transactionResponse.wait();
          console.log("Transaction confirmed!");
        } catch (err) {
          console.error("Transaction failed:", err); // Handle any errors
        }
      } else {
        console.error('Talisman wallet not found');
      }
    } else {
      // Handle other cases for "Pools" section if needed
    }
  };

  const poolsData: CarouselItem[] = [
    {
      image: PolygonImage,
      title: "Polygon Pool",
      description: "Join this Pool to buddy invest in MATIC with fellow developers",
    },
    {
      image: EthereumImage,
      title: "Ethereum Pool",
      description: "Join this Pool to buddy invest in Ethereum with fellow developers",
    },
    {
      image: AsterImage,
      title: "Aster Pool",
      description: "Join this Pool to buddy invest in Aster with fellow developers",
    }
  ];

  const donationsData: DonationItem[] = [
    {
      image: UkraineWar,
      title: "Ukraine Donation Campaign",
      description: "The Minister of Digital Transformation of Ukraine provided the addresses of electronic wallets where you can send donations.", 
      wallets: new Map<string, string>([
        ["ethereum", "0x5E1FdF4122861434bD285FC45120b9b592D3Ac7c"],
        ["bitcoin", "357a3So9CbsNfBBgFYACGvxxS6tMaDoa1P"],
      ]),
    },
    {
      image: GiveWell,
      title: "Give Well Donation Campaign",
      description: "Your donation will be granted to the highest-impact programs across all our grantmaking in global health and well-being. Some programs may be much more cost-effective than our top charities, but we may also be much more uncertain about their impact. Source: www.givewell.org.",
      wallets: new Map<string, string>([
        ["ethereum", "0x5E1FdF4122861434bD285FC45120b9b592D3Ac7c"],
        ["bitcoin", "357a3So9CbsNfBBgFYACGvxxS6tMaDoa1P"],
      ]),
    },
    {
      image: GiveDirectly,
      title: "Give Directly Donation Campaign",
      description: "Lifespan Research Institute (“LRI”) will develop, promote, and ensure widespread access to regenerative medicine solutions targeting the disabilities. Source: https://sens.org.",
      wallets: new Map<string, string>([
        ["ethereum", "0x5E1FdF4122861434bD285FC45120b9b592D3Ac7c"],
        ["bitcoin", "34kwsubU6ExhXJdTfdNN1CHYyPvfHajFnX"],
      ]),
    }
  ];

  // Slick carousel settings
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const dataToDisplay = selectedSection === "Pools" ? poolsData : donationsData;

  return (
    <div className="piggy-body" style={{ padding: "20px", paddingTop: "100px", fontFamily: "Arial, sans-serif", background: "linear-gradient(to bottom right, orange, skyblue)", height: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <div
          onClick={() => setSelectedSection("Pools")}
          style={{
            flex: 1,
            padding: "15px",
            margin: "0 5px",
            backgroundColor: selectedSection === "Pools" ? "#007bff" : "#ccc",
            color: selectedSection === "Pools" ? "#fff" : "#000",
            borderRadius: "5px",
            textAlign: "center",
            cursor: "pointer",
            transition: "background-color 0.3s, color 0.3s",
          }}
        >
          Pools
        </div>
        <div
          onClick={() => setSelectedSection("Donations")}
          style={{
            flex: 1,
            padding: "15px",
            margin: "0 5px",
            backgroundColor: selectedSection === "Donations" ? "#007bff" : "#ccc",
            color: selectedSection === "Donations" ? "#fff" : "#000",
            borderRadius: "5px",
            textAlign: "center",
            cursor: "pointer",
            transition: "background-color 0.3s, color 0.3s",
          }}
        >
          Donations
        </div>
      </div>

      {/* Carousel */}
      <div style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        textAlign: "center",
        background: "rgba(248, 230, 204, 0.45)",
        width: "100%",
        flex: 1,
        overflow: "hidden"
      }}>
        <Slider {...settings}>
          {dataToDisplay.map((item, index) => (
            <div key={index} style={{ padding: "10px" }}>
              <div style={{ paddingBottom: "25px", paddingTop: "25px", minHeight: "65vh" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "100%", height: "250px", objectFit: "contain", paddingTop: "20px" }}
                />
                <div style={{ padding: "15px" }}>
                  <h3 style={{ margin: "10px 0" }}>{item.title}</h3>
                  <p style={{ color: "#555", marginBottom: "20px" }}>{item.description}</p>
                  <a onClick={() => process(item)} className="cta-button">{selectedSection === "Pools" ? "Participate" : "Donate Now"}</a>
                </div>
              </div>
            </div>
          ))}
        </
