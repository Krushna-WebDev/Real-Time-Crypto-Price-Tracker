import { createSlice } from '@reduxjs/toolkit';
import { cryptoData } from '../../data/cryptoData';

const initialState = {
  assets: cryptoData,
  status: 'idle',
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrice: (state, action) => {
      const { id, price, change1h, change24h, change7d, volume24h } = action.payload;
      const assetIndex = state.assets.findIndex(asset => asset.id === id);
      if (assetIndex !== -1) {
        state.assets[assetIndex].price = price;
        state.assets[assetIndex].change1h = change1h;
        state.assets[assetIndex].change24h = change24h;
        state.assets[assetIndex].change7d = change7d;
        state.assets[assetIndex].volume24h = volume24h;
      }
    },
  },
});

export const { updatePrice } = cryptoSlice.actions;

export const selectAllAssets = (state) => state.crypto.assets;
export const selectAssetById = (state, id) => 
  state.crypto.assets.find(asset => asset.id === id);

export default cryptoSlice.reducer; 