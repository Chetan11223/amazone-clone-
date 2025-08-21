#!/bin/bash

# Amazon Clone Launcher Script
# This script opens the Amazon Clone application in your default browser

echo "🚀 Launching Amazon Clone..."
echo "📂 Opening index.html in your default browser..."

# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Open the index.html file in the default browser
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open "$DIR/index.html"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open "$DIR/index.html"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    # Windows
    start "$DIR/index.html"
else
    echo "❌ Unable to detect operating system"
    echo "📝 Please manually open index.html in your browser"
    exit 1
fi

echo "✅ Amazon Clone should now be open in your browser!"
echo "🔑 Demo accounts:"
echo "   Admin: admin@amazonclone.com / admin123"
echo "   User:  john@example.com / password123"
echo ""
echo "🛍️ Happy shopping!"
