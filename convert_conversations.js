const fs = require('fs');

// Read your conversations JSON file
const data = JSON.parse(fs.readFileSync('conversations.json', 'utf8'));

// Create output directory
if (!fs.existsSync('./obsidian_conversations')) {
  fs.mkdirSync('./obsidian_conversations');
}

data.forEach(conversation => {
  const safeName = conversation.name.replace(/[/\\?%*:|"<>]/g, '-');
  const date = conversation.created_at.split('T')[0];
  
  // Build the message content
  let messages = '';
  conversation.chat_messages.forEach(msg => {
    messages += `${msg.text}\n\n---\n\n`;
  });
  
  const content = `---
title: ${conversation.name}
created: ${conversation.created_at}
updated: ${conversation.updated_at}
conversation_id: ${conversation.uuid}
---

# ${conversation.name}

${messages}
`;

  fs.writeFileSync(`./obsidian_conversations/${date} - ${safeName}.md`, content);
});

console.log('Done! Check the obsidian_conversations folder');