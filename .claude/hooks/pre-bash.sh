#!/usr/bin/env bash

set -e

CMD="$CLAUDE_TOOL_INPUT"

echo "🧠 Claude Bash Input:"
echo "$CMD"

# 禁止高危操作
if echo "$CMD" | grep -E "rm -rf /|git clean -fdx|dd if="; then
  echo "❌ 检测到危险命令，已阻止"
  exit 1
fi

# 强制在项目根目录
if [ ! -f package.json ]; then
  echo "❌ 非项目根目录，禁止执行 bash"
  exit 1
fi
