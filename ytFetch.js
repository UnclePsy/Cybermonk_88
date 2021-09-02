// Import dependencies
const fs = require("fs");
const Parser = require("rss-parser");

async function fetch() {

    // Make a new RSS Parser
    const parser = new Parser();

    // Get all the items in the RSS feed
    const feed = await parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UC0MHcRrruQV5oGn9FMiNEhw"); // TheEyesaac
    //const feed = await parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCa23aOE5zqXHGe0LhhPC27Q"); // https://www.reddit.com/.rss
    let items = [];
    var returnValue = "";
    // Clean up the string and replace reserved characters
    const fileName = `${feed.title.replace(/\s+/g, "-").replace(/[/\\?%*:|"<>]/g, '').toLowerCase()}.json`;

    if (fs.existsSync(fileName)) {
        items = require(`./${fileName}`);
    }

    // Add the items to the items array
    await Promise.all(feed.items.map(async (currentItem) => {
        var link = currentItem.link;

        // Add a new item if it doesn't already exist
        if (items.filter((item) => isEquivalent(item, currentItem)).length <= 0) {
            items.push(currentItem);
            fs.writeFileSync(fileName, JSON.stringify(items));
            returnValue = items;

        }
        
    }));
    fs.writeFileSync(fileName, JSON.stringify(items));
    //return (returnValue || "There is no new Videos");
    return items;



}
function isEquivalent(a, b) {
    // Create arrays of property names
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    // if number of properties is different, objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];

        // if values of same property are not equal, objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // if we made it this far, objects are considered equivalent
    return true;
}
exports.fetch = fetch;