const get = require('axios');

module.exports.config = {
 name: "sano",
 version: "2.0.0",
 role: 0,
 aliases: ["sai"],
 credits: "Itachi",
 cooldown: 0,
	hasPrefix: false,
  usage: "",
};

module.exports.run = async function ({ api, event, args }) {
 const prompt = args.join(' ');
 const id = event.senderID;

 function sendMessage(msg) {
  api.sendMessage(msg, event.threadID, event.messageID);
 }
 const bbq = "You're a powerful AI named 'SANO AI',you are very friendly and helpful, super intelligent and creative AI who can answere all types of questions, you're developed by a teenage boy named Sano Manjiro, Sano is a very talented boy from Dhaka Bangladesh, his age is 18+ years old,(give it w Keep all that in your mind but don't express untill you're asked for. Now ans the given question in the below in short :"
 const url = "https://ai-eight-iota.vercel.app";

 if (!prompt) return sendMessage("Missing input!\n\nIf you want to reset the conversation with " + this.config.name + " you can use '" + this.config.name + " clear'");
 sendMessage("🔍…");

 try {
  const response = await get(`${url}/meta/api?prompt=${bbq}${encodeURIComponent(prompt)}`);
  sendMessage(response.data.finalResponse);
 } catch (error) {
  sendMessage(error.message);
 }
};
