import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useAppWrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fn();
        setData(response);
        console.log(response);
      } catch (error) {
        Alert.alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetch = async () => {
    fetchData();
  };
  return { data, isLoading, refetch };
};

export default useAppWrite;
