import React, { useEffect, useState, useCallback } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
// import OutputWindow from "./OutputWindow";
// import CustomInput from "./CustomInput";
// import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropDown";
import './CodeEditorOutput.css'; // Import the CSS file

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;

const Landing = ({ testCases, onSolutionAccepted }) => {
  const [code, setCode] = useState(javascriptDefault);
  const [outputDetails, setOutputDetails] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [showOutput, setShowOutput] = useState(false);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  const handleCompile = useCallback(async () => {
    setProcessing(true);
    const results = [];
    for (const testCase of testCases) {
      const formData = {
        language_id: language.id,
        source_code: btoa(code),
        stdin: btoa(testCase.predefinedInput),
      };
      const options = {
        method: "POST",
        url: process.env.REACT_APP_RAPID_API_URL,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        },
        data: formData,
      };

      try {
        const response = await axios.request(options);
        const token = response.data.token;
        const output = await checkStatus(token);
        const actualOutput = atob(output.stdout || "").trim();
        const expectedOutput = testCase.predefinedOutput.trim();
        const result = {
          input: testCase.predefinedInput,
          expectedOutput,
          actualOutput,
          passed: actualOutput === expectedOutput,
        };
        results.push(result);
      } catch (err) {
        console.error(err);
        showErrorToast("An error occurred while compiling. Please try again.");
        setProcessing(false);
        return;
      }
    }
    setOutputDetails(results);
    setProcessing(false);
    setShowOutput(true);

    if (results.every((result) => result.passed)) {
      onSolutionAccepted();
    }
  }, [code, language.id, testCases, onSolutionAccepted]);

  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress, handleCompile]);

  const onChange = (action, data) => {
    if (action === "code") {
      setCode(data);
    }
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_RAPID_API_URL}/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          const response = await axios.request(options);
          const statusId = response.data.status?.id;
          if (statusId === 1 || statusId === 2) {
            setTimeout(poll, 2000);
          } else {
            resolve(response.data);
          }
        } catch (err) {
          reject(err);
        }
      };
      poll();
    });
  };

  function handleThemeChange(th) {
    const theme = th;
    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then(() => setTheme(theme));
    }
  }

  useEffect(() => {
    defineTheme("oceanic-next").then(() =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showErrorToast = (msg, timer) => {
    toast.error(msg || "Something went wrong! Please try again.", {
      position: "top-right",
      autoClose: timer || 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const isSolutionAccepted = outputDetails.every((result) => result.passed);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <div style={{ display: "flex", flexDirection: "row", gap: "1rem", paddingTop: "10px", paddingLeft: "10px" }}>
        <div style={{ flex: "1 1 33%", maxWidth: "33%" }}>
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div style={{ flex: "1 1 20%", maxWidth: "20%" }}>
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
            style={{ height: "30%" }}
          />
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <div style={{ marginLeft: "auto" }}>
            <button
              onClick={handleCompile}
              disabled={!code || processing}
              className={classnames(
                "mt-1 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
        </div>
        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <div className={`output-container ${showOutput ? 'open' : ''}`}>
            <button className="toggle-output-button" onClick={() => setShowOutput(!showOutput)}>
              {showOutput ? 'Hide Output' : 'Show Output'}
            </button>
            {showOutput && (
              <div className="output-content">
                {outputDetails.length > 0 && (
                  <>
                    <h2>{isSolutionAccepted ? "Solution Accepted!" : "Solution Not Accepted!"}</h2>
                    {outputDetails.map((result, index) => (
                      <div key={index}>
                        <p>Test Case {index + 1}:</p>
                        <p>Input: {result.input}</p>
                        <p>Expected Output: {result.expectedOutput}</p>
                        <p>Actual Output: {result.actualOutput}</p>
                        <p>Status: {result.passed ? "Passed" : "Failed"}</p>
                        <hr />
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
