const whatsapp = require("./dist/index.js")

// Start Session with Pairing Code
whatsapp.startWhatsappWithPairingCode("karimroy", { phoneNumber: '6285183020580' }).then((data) => {
  // console.log(data.authState.creds);
}).catch((error) => {
  console.log(error);
})

// Whatasaap Connected
whatsapp.onConnected((sessionId) => {
  console.log("session connected to: ", sessionId);
})

// Whatsapp Connecting
whatsapp.onConnecting((sessionId) => {
  console.log("session connecting to: ", sessionId);
})

// Whatsapp Disconected
whatsapp.onDisconnected((sessionId) => {
  console.log("session disconnected to: ", sessionId);
})

// Whatsapp on update
whatsapp.onMessageUpdate((data) => {
  console.log("session message update: ", data);
})

// Whatsapp on Pairing Code
whatsapp.onPairingCode((sessionId, code) => {
  console.log("On pairing code: ", sessionId, code);
})

// Whatsapp on QRCOde
whatsapp.onQRUpdated((sessionId, qr) => {
  console.log("On qrcode update: ", sessionId, qr);
})


// Whatsapp On Message Recieved
whatsapp.onMessageReceived(async (msg) => {
  console.log(msg);

  // Recieved Image
  if (msg.message?.imageMessage) {
    const extension = msg.message.imageMessage.mimetype.split('/')
    const fileName = `./${msg.pushName.toLocaleLowerCase().replace(/ /g, '_')}_${msg.messageTimestamp.toString()}.${extension[1]}`
    console.log(fileName);
    // save image
    msg.saveImage(fileName);
  }

  // Recieved Video
  if (msg.message?.videoMessage) {
    const extension = msg.message.videoMessage.mimetype.split('/')
    const fileName = `./${msg.pushName.toLocaleLowerCase().replace(/ /g, '_')}_${msg.messageTimestamp.toString()}.${extension[1]}`
    console.log(fileName);
    // save video
    msg.saveVideo(fileName);
  }

  // Recieved Document
  if (msg.message?.documentMessage) {
    const extension = msg.message.documentMessage.mimetype.split('/')
    const fileName = `./${msg.pushName.toLocaleLowerCase().replace(/ /g, '_')}_${msg.messageTimestamp.toString()}`
    console.log(fileName);
    // save document
    msg.saveDocument(fileName);
  }

  // If from me and from status return false
  if (msg.key.fromMe || msg.key.remoteJid.includes("status")) return false;

  await whatsapp.readMessage({
    sessionId: msg.sessionId,
    key: msg.key,
  });

  await whatsapp.sendTyping({
    sessionId: msg.sessionId,
    to: msg.key.remoteJid,
    duration: 3000,
  });

  await whatsapp.sendTextMessage({
    sessionId: msg.sessionId,
    to: msg.key.remoteJid,
    text: "Hello!",
    // answering: msg, // for quoting message
  });
});