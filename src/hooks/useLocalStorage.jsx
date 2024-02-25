import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      console.log(value)
      if (value) {
        console.log(value)
        return JSON.parse(`"${value}"`);
      } else {
        console.log(value)
        if(defaultValue){
          window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        }
        return defaultValue;
      }
    } catch (err) {
      console.log(err)
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};