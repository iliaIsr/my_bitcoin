import React, {useState} from 'react';
import './style.css';
import {SuperButton} from "../superButton/SuperButton";
import {SuperInput} from "../superInput/SuperInput";
import {FetchAssets} from "../../fetch/FetchAssets";
import {addAsset, Asset, AssetsState, updateAsset} from "../../store/assetsSlice";
import {useDispatch, useSelector} from "react-redux";

type FormPropsType = {
    onClose: () => void,
}
const defaultAsset: Asset = {
    id: '',
    name: '',
    quantity: 0,
    currentPrice: 0,
    totalValue: 0,
    change24h: 0,
    portfolioPersent: 0,
};

export const Form = ({onClose}: FormPropsType) => {

    const [show, setShow] = useState(defaultAsset);
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    const assets = useSelector((state: { assets: AssetsState }) => state.assets.assets);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleClick = (obj: Asset) => {
        setShow(obj);
    }

    const handleAddAsset = () => {
        if (show.id && quantity > 0) {
            const existingAsset = assets.find(asset => asset.id === show.id);

            let updatedAssets;

            if (existingAsset) {
                const updatedAsset = {
                    ...existingAsset,
                    quantity: existingAsset.quantity + quantity,
                    totalValue: (existingAsset.currentPrice * (existingAsset.quantity + quantity)),
                };
                updatedAssets = assets.map(asset => asset.id === updatedAsset.id ? updatedAsset : asset);
                dispatch(updateAsset(updatedAsset));

            } else {
                const newAsset = {
                    ...show,
                    quantity,
                    totalValue: show.currentPrice * quantity,
                };
                updatedAssets = [...assets, newAsset];
                dispatch(addAsset(newAsset));
            }
            localStorage.setItem('assets', JSON.stringify(updatedAssets));
            onClose();
        }
    }


    return (
        <div className="modal" onClick={handleOverlayClick}>
            <div className="modal-content" style={{height: show.name ? '480px' : '360px'}}>
                <SuperInput type='text' placeholder='Поиск валюты'/>
                <div className='content'>
                    <FetchAssets onSelect={handleClick}/>
                </div>
                {show.name ? (
                    <div>
                        <div className='selectedAsset'>
                            <div>{show.name}</div>
                            <div>${show.currentPrice}</div>
                        </div>
                        <SuperInput
                            type='number'
                            placeholder='Количество'
                            value={quantity}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(+e.currentTarget.value)}/>
                        <div className='buttonContainer'>
                            <SuperButton name='добавить' onClick={handleAddAsset}/>
                            <SuperButton name='отмена' onClick={onClose}/>
                        </div>
                    </div>
                ) : (
                    <div>
                    </div>
                )}
            </div>
        </div>
    );
};

