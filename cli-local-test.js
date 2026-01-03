#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import process from 'process';

// === 配置支持的命令列表 ===
const COMMANDS = ['需求分析', 'plan', 'review', 'test', 'design'];

// === 模拟 Claude AI 调用 ===
async function callClaude(systemPrompt, fileContent) {
	// 替换成实际 Claude SDK 或 API 调用
	return `# AI 输出文档\n\n${fileContent}\n\n（根据 ${systemPrompt} 模板生成）`;
}

// === 解析命令行参数 ===
const args = process.argv.slice(2);

if (args.length < 2) {
	console.error('用法: /命令 @文件 -o <输出目录>');
	process.exit(1);
}

const commandArg = args[0].startsWith('/') ? args[0].slice(1) : args[0];
if (!COMMANDS.includes(commandArg)) {
	console.error(`不支持的命令: ${commandArg}`);
	process.exit(1);
}

const fileArg = args[1];
const outputIndex = args.indexOf('-o');
if (outputIndex === -1 || !args[outputIndex + 1]) {
	console.error('缺少 -o 参数，示例: -o /Users/xxx/projects/apm-console/plan');
	process.exit(1);
}
const outputDir = args[outputIndex + 1];

// === 读取文件内容 ===
const filePath = fileArg.startsWith('@') ? fileArg.slice(1) : fileArg;
if (!fs.existsSync(filePath)) {
	console.error('文件不存在:', filePath);
	process.exit(1);
}
const fileContent = fs.readFileSync(filePath, 'utf-8');

// === 读取模板 ===
const templatePath = path.resolve('commands', `${commandArg}.md`);
if (!fs.existsSync(templatePath)) {
	console.error('命令模板不存在:', templatePath);
	process.exit(1);
}
const templateContent = fs.readFileSync(templatePath, 'utf-8');

// === 提取系统提示 ===
const systemPromptMatch = templateContent.match(
	/## 系统提示 \(system prompt\)\n([\s\S]*?)\n## 参数/
);
const systemPrompt = systemPromptMatch ? systemPromptMatch[1].trim() : '';

// === 调用 Claude AI ===
callClaude(systemPrompt, fileContent).then((output) => {
	// 生成文件名
	const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
	const fileName = `${date}-${commandArg}.md`;

	// 创建输出目录
	if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

	const outputPath = path.join(outputDir, fileName);
	fs.writeFileSync(outputPath, output, 'utf-8');
	console.log('生成文件:', outputPath);
});
