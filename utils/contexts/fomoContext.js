import React, { createContext, useState, useEffect } from 'react';

const FomoContext = createContext();

export const FomoProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isManuallyHidden, setIsManuallyHidden] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('fomo-products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
      setTimeout(() => {
        setIsVisible(true);
      }, 2000); // Show Fomo product 2 seconds after page load
    }
  }, []); // Empty dependency array ensures this runs only once

  const getNextProduct = () => {
    const nextIndex = (currentProductIndex + 1) % products.length;
    setCurrentProductIndex(nextIndex);
  };

  useEffect(() => {
    if (products.length > 0) {
      const showInterval = 5000; // 5 seconds
      const hideInterval = 10000; // 10 seconds

      const interval = setInterval(() => {
        if (!isManuallyHidden) {
          setIsVisible(false); // Hide the current product
          setTimeout(() => {
            getNextProduct(); // Get the next product
            setIsVisible(true); // Show the next product
          }, hideInterval);
        }
      }, showInterval + hideInterval);

      return () => clearInterval(interval);
    }
  }, [isManuallyHidden, products.length]); // Depend on `isManuallyHidden` and `products.length`

  const handleManualHide = () => {
    setIsVisible(false);
    setIsManuallyHidden(true);
    setTimeout(() => setIsManuallyHidden(false), 15000); // Hide for 15 seconds total
  };

  return (
    <FomoContext.Provider
      value={{
        isVisible,
        products,
        currentProductIndex,
        handleManualHide,
      }}
    >
      {children}
    </FomoContext.Provider>
  );
};

export const useFomo = () => {
  return React.useContext(FomoContext);
};
