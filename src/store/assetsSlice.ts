import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Asset = {
    id: string;
    name: string;
    quantity: number;
    currentPrice: number;
    totalValue: number;
    change24h: number;
    portfolioPersent: number;
};

export type AssetsState = {
    assets: Asset[];
};

const initialState: AssetsState = {
    assets: JSON.parse(localStorage.getItem('assets') || '[]'), // mekablim data mi LS
};

const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {
        addAsset(state, action: PayloadAction<Asset>) {
            state.assets.push(action.payload);
            localStorage.setItem('assets', JSON.stringify(state.assets));
        },
        removeAsset(state, action: PayloadAction<string>) {
            state.assets = state.assets.filter(asset => asset.id !== action.payload);
            localStorage.setItem('assets', JSON.stringify(state.assets));
        },
        updateAsset(state, action: PayloadAction<Partial<Asset>>) {
            const index = state.assets.findIndex(asset => asset.id === action.payload.id);
            if (index !== -1) {
                state.assets[index] = { ...state.assets[index], ...action.payload };
                localStorage.setItem('assets', JSON.stringify(state.assets));
            }
        },
    },
});

export const { addAsset, removeAsset, updateAsset } = assetsSlice.actions;
export default assetsSlice.reducer;