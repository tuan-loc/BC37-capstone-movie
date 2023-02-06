import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const Loading = (props) => {
  const { isLoading } = useSelector((state) => state.reducer);

  return (
    <Fragment>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div className="text-4xl text-white">Loading</div>
        </div>
      )}
    </Fragment>
  );
};

export default Loading;
