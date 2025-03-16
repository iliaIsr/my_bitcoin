import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AssetsState, removeAsset, updateAsset} from "../../../store/assetsSlice";
import './style.css';
import {useWebSocket} from "../../../hooks/useWebSocket";



export const AssetsInPortfolio = () => {
    const assets = useSelector((state: { assets: AssetsState }) => state.assets.assets);
    const dispatch = useDispatch();

    const handleRemoveAsset = (id: string) => {
        dispatch(removeAsset(id));
    };

    useWebSocket()

    const totalValue = assets.reduce((acc, asset) => acc + asset.totalValue, 0);
    return (
        <div>
            {assets.length > 0 ? (
                <div>
                    <div className="asset-table">
                        <table>
                            <thead>
                            <tr>
                                <th>Актив</th>
                                <th>Количество</th>
                                <th>Цена</th>
                                <th>Общая стоимость</th>
                                <th>Изм. за 24 ч.</th>
                                <th>% портфеля</th>
                            </tr>
                            </thead>
                            <tbody>
                            {assets.map((asset) => (
                                <tr key={asset.id} onClick={() => handleRemoveAsset(asset.id)}>
                                    <td>{asset.name}</td>
                                    <td>{asset.quantity.toFixed(5)}</td>
                                    <td>${asset.currentPrice.toFixed(2)}</td>
                                    <td>${asset.totalValue.toFixed(2)}</td>
                                    <td className={"change24h"} style={{color: asset.change24h < 0 ? 'red' : 'green'}}>
                                        {asset.change24h.toFixed(2)}%
                                    </td>
                                    {/*<td>{asset.portfolioPersent.toFixed(2)}%</td>*/}
                                    <td>
                                        {totalValue > 0
                                            ? `${((asset.totalValue / totalValue) * 100).toFixed(2)}%`
                                            : '0.00%'}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text">
                    Нет активов в вашем портфеле. Добавьте что-нибудь, чтобы начать!
                </div>
            )}
        </div>
    );
};