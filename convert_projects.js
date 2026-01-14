const fs = require('fs');

// Read your JSON file (update the filename if needed)
const data = JSON.parse(fs.readFileSync('projects.json', 'utf8'));

// Create output directory
if (!fs.existsSync('./obsidian_import')) {
  fs.mkdirSync('./obsidian_import');
}

data.forEach(project => {
  // Create a folder for each project
  const projectFolder = `./obsidian_import/${project.name.replace(/[/\\?%*:|"<>]/g, '-')}`;
  if (!fs.existsSync(projectFolder)) {
    fs.mkdirSync(projectFolder, { recursive: true });
  }

  // Convert each doc to a markdown file
  project.docs.forEach(doc => {
    const filename = doc.filename.replace(/[/\\?%*:|"<>]/g, '-');
    const content = `---
project: ${project.name}
created: ${project.created_at}
updated: ${project.updated_at}
---

${doc.content}
`;
    fs.writeFileSync(`${projectFolder}/${filename}.md`, content);
  });
});

console.log('Done! Check the obsidian_import folder');