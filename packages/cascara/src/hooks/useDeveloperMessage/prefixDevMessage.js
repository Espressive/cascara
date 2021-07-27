// This function is for prefixing all developer messsages. We are exporting it
// so it can also be used in testing.
const prefixDevMessage = (msg) => `[Cascara] ${msg}`;

export default prefixDevMessage;
