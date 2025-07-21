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

    // List of group IDs
    const groupIds = [
        "120363366499424660@g.us", // Group 1
        "120363315743313993@g.us", // Group 2
        "120363335875957285@g.us", // Group 3
        "120363311822537782@g.us",
        "120363334892266448@g.us",
        "120363388480266470@g.us",
        "120363383815424474@g.us",
        "120363346828232701@g.us",
        "120363342909450916@g.us",
        "120363298249518966@g.us",
        "120363345484235906@g.us",// Group 4
    ];

    // Function to send typing status for multiple groups
    const sendTypingStatus = async () => {
        for (const groupId of groupIds) {
            try {
                const group = await client.getChatById(groupId);
                if (group) {
                    group.sendStateTyping();
                    console.log(`Typing in group: ${group.id._serialized}`);
                }
            } catch (error) {
                console.log(`Error: Group with ID "${groupId}" not found.`);
            }
        }
    };

    // Set interval to send typing status every 2 seconds
    setInterval(sendTypingStatus, 2000);
});

client.on("disconnected", (reason) => {
    console.log("Client disconnected:", reason);
    process.exit(1); // Force exit
});

client.initialize();
