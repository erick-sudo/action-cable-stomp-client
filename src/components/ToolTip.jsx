import React from "react";

function ToolTip({ className, children, pointerPosition, bg = "white" }) {
  return (
    <div
      style={{
        maxWidth: "85%",
        position: "relative",
        backgroundColor: `${bg}`,
        ...(pointerPosition === "right"
          ? {
              borderRadius: "10px 0 10px 10px",
              marginRight: "22px",
            }
          : {
              borderRadius: "0px 10px 10px 10px",
              marginLeft: "22px",
            }),
      }}
      className={`${className}`}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          ...(pointerPosition === "right"
            ? {
                left: "100%",
                borderWidth: "0 0 20px 20px",
                borderColor: `transparent transparent transparent ${bg}`,
              }
            : {
                right: "100%",
                borderWidth: "0 20px 20px 0",
                borderColor: `transparent ${bg} transparent transparent`,
              }),
          borderStyle: "solid",
        }}
      ></div>
      <div style={{ overflow: "hidden" }}>{children}</div>
    </div>
  );
}

export default ToolTip;
