const checkbox = document.getElementById("checkInput");
const div = document.getElementById("myDiv");
div.style.display = "none"; 
const inputField = document.getElementById('input');
checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    div.style.display = "block"; // Show the div
  } else {
    div.style.display = "none"; // Hide the div
  }
});
const butt = document.getElementById("run-button");
butt.addEventListener("click", () => {
  const selection = document.getElementById("lang");
  const codebox = document.getElementById("code");
  const lang = selection.value;
  const code1 = codebox.value;
  const input = checkbox.checked ? inputField.value : ""; // Use input if checkbox is checked
  console.log(lang, code1, input);
  run(lang, code1, input);
});
const langSelect = document.getElementById("lang");
const codebox = document.getElementById("code");
langSelect.addEventListener("change", () => {
  codebox.value = ""; // Clear the value of the textarea
});
function run(lang, code, input) {
    const data = {
        code: code,
        language: lang,
        input: input,
    };
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    fetch("https://api.codex.jaagrav.in", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            const output1 = document.getElementById('output');
            const outputStatus = document.getElementById('output-status');
            console.log(data);
            if (data.status === 200 && data.output.length) {
                outputStatus.innerText = "Success (200)";
                output1.innerText = data.output;
            } else {
                outputStatus.innerText = `Error (${data.status})`;
                output1.innerText = data.error;
            }
            output1.style.display = "flex";
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
}
//download code

const downloadButton = document.getElementById("review-button");

downloadButton.addEventListener("click", () => {
  const code = codebox.value;

  if (code.length > 0) {
    const blob = new Blob([code], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code.txt";
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    alert("Please enter some code before downloading.");
  }
});

const webselect = document.getElementById("website");
webselect.addEventListener("change", () => {
  const val = webselect.value;
  disweb(val);
});
function formatedDate(oldDate) {
  let Dates = new Date(oldDate);
  let offset = Dates.getTimezoneOffset();
  let utc = new Date(Dates.getTime() - offset);
  let Year = ('' + utc.getFullYear()).substring(2, 4);
  let Month = utc.getMonth();
  let date = utc.getDate();
  let day = utc.getDay();
  let hour = utc.getHours();
  let minutes = utc.getMinutes();
  let seconds = utc.getSeconds();
  if (hour < 10) hour = '0' + hour;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  if (date < 10) date = '0' + date;
  if (Month < 10) Month = '0' + Month;
  if (Year < 10) Year = '0' + Year;
  return date + "." + Month + "." + Year + " "  + hour + ":" + minutes + " IST";
}
function disweb(val) {
  fetch(`https://kontests.net/api/v1/${val}`)
    .then((response) => response.json())
    .then((data) => {
      let str = `
         <style>
         .card {
          text-align: center;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 300px;
      }
      
      img {
          width: 100%;
          max-height: 150px;
          object-fit: cover;
          border-radius: 10px;
      }
      
      h2 {
          margin: 10px 0;
          font-size: 1.5em;
      }
      
      p {
          margin: 5px 0;
          font-size: 1.1em;
      }
      
      .custom-button {
          padding: 10px 20px;
          font-size: 1em;
          background-color: #0074D9;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.2s;
      }
      
      .custom-button:hover {
          background-color: #0056b3;
      }
         </style>
      `;
      for (key in data) {
        const name = data[key].name;
        var currentDate = new Date();
        const curr = currentDate.getDate();
        console.log(curr);
        const start = formatedDate(data[key].start_time);
        const end = formatedDate(data[key].end_time);
        const url = data[key].url;
        const img = `image/${val}.png`;
        str += `
        <div class="card">
         <img src=${img} alt="Image">
         <h2>${name}</h2>
         <p><b>Start:</b>${start}</p>
         <p><b>End-:</b>${end}</p>
         <a href="${url}" target="_blank"><button class="custom-button">Go to contest</button></a>
        </div>
        `;
      }
      const carbody = document.getElementById('condis');
      carbody.innerHTML = str;
    });
}
//code review
const codeSampleButton = document.getElementById("code-sample-button");
const code = document.getElementById("code");

// Store the previous language selection.
let previousLang = "";

// Define a function to generate a code sample for the given language.
function generateCodeSample(lang) {
  let codeSample = "";

  switch (lang) {
    case "py":
      codeSample = `print("Hello, world!")`;
      break;
    case "js":
      codeSample = `console.log("Hello, world!");`;
      break;
    case "c":
      codeSample = `#include <stdio.h>\n\nint main() {\n  printf("Hello, world!\n");\n  return 0;\n}`;
      break;
    case "java":
      codeSample = `public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, world!");\n  }\n}`;
      break;
    case "cpp":
      codeSample = `#include <iostream>\n\nint main() {\n  std::cout << "Hello, world!" << std::endl;\n  return 0;\n}`;
      break;
    case "go":
      codeSample = `package main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello, world!")\n}`;
      break;
    case "cs":
      codeSample = `using System;\n\nclass HelloWorld\n{\n  static void Main(string[] args)\n  {\n    Console.WriteLine("Hello, world!");\n  }\n}`;
      break;
    default:
      codeSample = "Code sample not available for the selected language.";
  }

  return codeSample;
}


// Update the code sample when the language selection changes.
langSelect.addEventListener("change", () => {
  const lang = langSelect.value;
  const codeSample = generateCodeSample(lang);
  code.innerText = codeSample;
});

// Update the code sample when the code sample button is clicked.
codeSampleButton.addEventListener("click", () => {
  const lang = langSelect.value;
  const codeSample = generateCodeSample(lang);
  codebox.value = codeSample; // Update the content of the textarea
});
