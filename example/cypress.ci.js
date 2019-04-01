const server = require("./server");
const cypress = require("cypress");

// start your server
cypress
  .run({
    browser: "chrome"
  })
  .then(() => {
    // stop your server when it's complete
    console.log(`cypress test completed!`);
    process.exit(0);
  });
