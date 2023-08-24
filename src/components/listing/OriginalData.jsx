import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addData } from "../../store/dataSlice";
import Listing from "./Listing";

const OriginalData = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const res = await fetch("/MOCK_DATA.json");

      const data = await res.json();

      dispatch(addData(data));
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
