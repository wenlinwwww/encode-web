import React, { useState } from "react";
import "./App.css";

function App() {
  const [srcUrl, setSrcUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  const handleConvert = () => {
    if (!srcUrl) return;

    const firstEncodeUrl = encodeURIComponent(srcUrl);
    const intermediateUrl = `http://192.168.91.162:9080/sso/oauth2.0/authorize?response_type=code&redirect_uri=${firstEncodeUrl}&client_id=1664244035647`;
    const secondEncodeUrl = encodeURIComponent(intermediateUrl);
    const thirdEncodeURL = encodeURIComponent(secondEncodeUrl);

    const finalUrl = `http://192.168.91.162:9080/sso/oauth2.0/authorize?response_type=code&client_id=1664244035647&state=${thirdEncodeURL}&redirect_uri=http://192.168.91.153/kmp/api/SSOLogin/SSOLoginToMyApproval&response_type`;
    setResultUrl(finalUrl);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resultUrl);
    alert("链接已复制！");
  };

  return (
    <div className="App">
      <div className="container">
        <div className="link-area">
          <input
            type="text"
            placeholder="请输入链接..."
            value={srcUrl}
            onChange={(e) => setSrcUrl(e.target.value)}
          />
        </div>
        <button className="convert-button" onClick={handleConvert}>
          转换
        </button>
        {resultUrl && (
          <div className="result-area">
            <div className="result-header">
              <span>转换结果</span>
              <button onClick={handleCopy}>一键复制</button>
            </div>
            <textarea readOnly value={resultUrl}></textarea>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
