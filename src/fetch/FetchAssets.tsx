import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './style.css'
import {Asset} from "../store/assetsSlice";
import {Loader} from "../components/loader/Loader";

type FetchAssetsPropsType = {
    onSelect: (obj:Asset) => void,
    searchTerm: string;
}

export const FetchAssets = ({onSelect, searchTerm}: FetchAssetsPropsType) => {
    const [assets, setAssets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAssets = async () => {
        try {
            const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
            setAssets(response.data);
        } catch (error) {
            console.error('Ошибка получения данных:', error);
            setError('Не удалось загрузить данные');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssets();
    }, []);

    if (loading) {
        return <div><Loader/></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }



    const filteredAssets = assets.filter(asset => asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())

    );

    return (
        <div className="assetModalTable">
            {filteredAssets.map((asset) => {
                const assetName = asset.symbol.slice(0, 3);
                const priceChangePercent = +parseFloat(asset.priceChangePercent).toFixed(2);
                const lastPrice = parseFloat(asset.lastPrice).toFixed(5);

                const isNegative = priceChangePercent < 0;
                const formattedChange = isNegative
                    ? `${priceChangePercent}%`
                    : `+${priceChangePercent}%`;

                const assetObj:Asset = {
                    id: asset.symbol,
                    name:assetName,
                    quantity:0,
                    currentPrice: parseFloat(lastPrice),
                    totalValue:0,
                    change24h: priceChangePercent,
                    portfolioPersent: 0,
                }


                return (
                    <div key={asset.symbol} onClick={() => onSelect(assetObj)}>
                        <span>{assetName}</span>
                        <span>{lastPrice}</span>
                        <span style={{color: isNegative ? 'red' : 'green'}}>
                    {formattedChange}
                </span>
                    </div>
                );
            })}
        </div>
    );
};
