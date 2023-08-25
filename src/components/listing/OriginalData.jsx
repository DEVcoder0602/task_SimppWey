import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addData, addDataKeys } from "../../store/dataSlice";
import Listing from "./Listing";

const OriginalData = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const res = await fetch("/MOCK_DATA.json");

      const data = await res.json();

      dispatch(addData(data));
      // if each object has different keys
      // const allKeys = Array.from(
      //   new Set(data.flatMap((obj) => Object.keys(obj)))
      // );

      if (Array.isArray(data) && data.length > 0) {
        const allKeys = Object.keys(data[0]);
        dispatch(addDataKeys(allKeys));
      }
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <div>OriginalData</div> */}
      <Listing />
    </>
  );
};

export default OriginalData;
