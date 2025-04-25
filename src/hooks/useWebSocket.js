import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePrice, selectAllAssets } from "../features/crypto/cryptoSlice";
import { CryptoWebSocketSimulator } from "../services/cryptoWebSocket";

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const assets = useSelector(selectAllAssets);
  const webSocketRef = useRef(null);

  useEffect(() => {
    webSocketRef.current = new CryptoWebSocketSimulator(updateData);
    webSocketRef.current.connect();

    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.disconnect();
      }
    };
  }, [dispatch]);

  const updateData = (data) => {
    const { id, priceChange, change1h, change24h, change7d, volumeChange } =
      data;
    const asset = assets.find((a) => a.id === id);

    if (asset) {
      const newPrice = asset.price * (1 + priceChange);
      const newChange1h = asset.change1h + change1h;
      const newChange24h = asset.change24h + change24h;
      const newChange7d = asset.change7d + change7d;
      const newVolume24h = asset.volume24h * (1 + volumeChange);

      dispatch(
        updatePrice({
          id,
          price: parseFloat(newPrice.toFixed(2)),
          change1h: parseFloat(newChange1h.toFixed(2)),
          change24h: parseFloat(newChange24h.toFixed(2)),
          change7d: parseFloat(newChange7d.toFixed(2)),
          volume24h: parseFloat(newVolume24h.toFixed(0)),
        })
      );
    }
  };

  return {
    isConnected: webSocketRef.current?.isConnected || false,
  };
};
