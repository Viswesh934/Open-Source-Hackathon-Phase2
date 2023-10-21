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

const codeSampleButton = document.getElementById("code-sample-button");

codeSampleButton.addEventListener("click", () => {
  const selection = document.getElementById("lang");
  const syntax = document.getElementById("syntax").value;
  const lang = selection.value;

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  fetch(`https://api.codex.jaagrav.in/code-samples/${lang}/${syntax}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const codebox = document.getElementById("code");
      codebox.value = data.code;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});
