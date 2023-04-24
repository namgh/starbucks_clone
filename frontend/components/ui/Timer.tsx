import React, { useEffect, useRef, useState } from "react";

export default function Timer() {
  const [min, setMin] = useState<number>(3);
  const [sec, setSec] = useState<number>(0);
  const time = useRef(180);
  const timerId = useRef<any>(null);

  const [timeout, setTimeout] = useState<boolean>(false);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(Math.floor(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (time.current <= 0) {
      clearInterval(timerId.current);
      setTimeout(true);
    }
  }, [sec]);

  return (
    <>
      {timeout ? (
        <p style={{ width: "40%", fontSize: "1rem", whiteSpace: "nowrap" }}>
          ❗️인증만료
        </p>
      ) : (
        <div
          style={{
            fontSize: "1rem",
            whiteSpace: "nowrap",
            padding: "2px",
            margin: "2px",
            width: "20%",
            textAlign: "center",
          }}
        >
          {min}분 {sec}초
        </div>
      )}
    </>
  );
}
