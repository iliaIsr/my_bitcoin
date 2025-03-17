import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AssetsState, updateAsset} from '../store/assetsSlice';


export const useWebSocket = () => {

    const dispatch = useDispatch();
    const assets = useSelector((state: { assets: AssetsState }) => state.assets.assets);

    useEffect(() => {
        const socket = new WebSocket('wss://stream.binance.com:9443/ws');

        socket.onopen = () => {
            const symbols = assets.map(asset => asset.id.toLowerCase() + '@ticker').join('/');
            socket.send(JSON.stringify({
                method: "SUBSCRIBE",
                params: symbols ? symbols.split('/') : [],
                id: 1
            }));
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.e === '24hrTicker') {
                const updatedAsset = assets.find(asset => asset.id === data.s);
                if (updatedAsset) {
                    const newPrice = parseFloat(data.c);
                    const newChange = parseFloat(data.P);

                    dispatch(updateAsset({
                        id: updatedAsset.id,
                        currentPrice: newPrice,
                        change24h: newChange,
                        totalValue: newPrice * updatedAsset.quantity,
                    }));
                }
            }
        };

        return () => {
            socket.close();
        };
    }, [assets, dispatch]);
}