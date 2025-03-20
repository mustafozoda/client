export const handleCopy = (clipboard) => {
  const textToCopy = `${clipboard}`;
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      // alert("Text copied to clipboard!");  
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
      alert("Failed to copy text.");
    });
};