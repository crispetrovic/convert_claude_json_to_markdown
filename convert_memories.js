const fs = require('fs');

// Read your memories JSON file
const data = JSON.parse(fs.readFileSync('memories.json', 'utf8'));

// Create output directory
if (!fs.existsSync('./claude_memories')) {
  fs.mkdirSync('./claude_memories');
}

data.forEach((memory, index) => {
  const content = `---
type: claude-memory
imported: ${new Date().toISOString()}
---

${memory.conversations_memory}
`;

  fs.writeFileSync(`./claude_memories/Memory-${index + 1}.md`, content);
});

console.log('Done! Check the obsidian_memories folder');