import { useState } from "react";
import callNatiq from "../services/natiq";
import callKateb from "../services/kateb";
import { Iwords } from "../interfaces/Iwords";

const useFetchEcho = () => {
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [words, setWords] = useState<Array<Iwords>>([]);

  const resetResponse = () => {
    setResponse("");
    setWords([]);
  };

  const fetchEcho = async (audioData: Blob) => {
    try {
      setLoading(true);
      const katebResponse = await callKateb(audioData);

      if (!katebResponse.ok) {
        setError("failed fetch");
        throw new Error(`HTTP error! status: ${katebResponse.status}`);
      }
      const katebData = await katebResponse.text();
      const words = JSON.parse(katebData).json.words;
      setWords(words);

      const natiqResponse = await callNatiq(JSON.stringify(words));
      const natiqData = await natiqResponse.text();

      setResponse(JSON.parse(natiqData).wave);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { response, words, error, loading, fetchEcho, resetResponse };
};

export default useFetchEcho;
