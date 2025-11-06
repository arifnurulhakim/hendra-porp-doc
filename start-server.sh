#!/bin/bash
# Quick HTTP Server untuk menjalankan dokumentasi
# Usage: ./start-server.sh [port]

PORT=${1:-8000}
DIR="public"

# Check if port is already in use
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port $PORT sudah digunakan!"
    echo ""
    echo "Opsi:"
    echo "1. Gunakan port lain: ./start-server.sh 3000"
    echo "2. Kill proses yang menggunakan port $PORT:"
    echo "   kill \$(lsof -ti:$PORT)"
    echo ""
    echo "Atau langsung akses: http://localhost:$PORT"
    exit 1
fi

echo "🚀 Starting HTTP server..."
echo "📂 Serving directory: $DIR"
echo "🌐 Open your browser at: http://localhost:$PORT"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    cd "$(dirname "$0")"
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    cd "$(dirname "$0")"
    python -m SimpleHTTPServer $PORT
else
    echo "❌ Error: Python not found!"
    echo "Please install Python 3 or use: npx serve public"
    exit 1
fi

