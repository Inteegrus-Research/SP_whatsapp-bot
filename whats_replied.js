const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false,
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Update this path
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
    console.log("Client is ready!");
        // Wait for chats to load
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds

        // Get all chats
        const chats = await client.getChats();
    
        // Log all chats with their names and IDs
        console.log("Chats:", chats.map((chat) => ({
            name: chat.name,
            id: chat.id._serialized, // Log the chat ID
            isGroup: chat.isGroup,
        })));
    });


client.on("disconnected", (reason) => {
    console.log("Client disconnected:", reason);
    process.exit(1); // Force exit
});

client.initialize();