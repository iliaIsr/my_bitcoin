import React from 'react';
import logo from './logo.svg';
import './App.css';
import {PortfolioOverview} from "./components/portfolioOverview/PortfolioOverview";
import {AddAssetForm} from "./components/addAsset/AddAssetForm";

function App() {
    return (
        <div>
            <PortfolioOverview/>
            <AddAssetForm/>
        </div>
    );
}

export default App;
