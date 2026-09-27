"""
Simple local development server with clean URL rewrite support for HERMES CLI site
Run: python serve.py [port]
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
DIRECTORY = Path(__file__).parent.resolve()

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def do_GET(self):
        # Clean URL rewrites (e.g. /privacy -> /privacy/index.html or /privacy.html)
        req_path = self.path.split('?')[0].rstrip('/')
        if req_path and not req_path.endswith(('.html', '.css', '.js', '.svg', '.png', '.jpg', '.xml', '.txt')):
            target_html = DIRECTORY / f"{req_path.lstrip('/')}.html"
            target_dir_index = DIRECTORY / req_path.lstrip('/') / 'index.html'
            if target_dir_index.exists():
                self.path = f"{req_path}/index.html"
            elif target_html.exists():
                self.path = f"{req_path}.html"
        return super().do_GET()

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), CleanURLHandler) as httpd:
        print(f"HERMES CLI Public Website running locally at: http://localhost:{PORT}")
        print("Press Ctrl+C to stop server.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
