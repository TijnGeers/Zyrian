#!/usr/bin/env python3
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import os
from urllib.parse import urlparse, parse_qs

class ZyrianHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        # Serve static files
        if parsed_path.path == '/' or parsed_path.path == '':
            self.serve_file('vrienden/index.html')
        elif parsed_path.path.startswith('/tijn/'):
            self.serve_file('tijn/index.html')
        elif parsed_path.path.startswith('/vrienden/'):
            self.serve_file('vrienden/index.html')
        elif parsed_path.path == '/api/woorden':
            self.get_woorden()
        else:
            # Serve other static files (css, js)
            file_path = parsed_path.path.lstrip('/')
            if os.path.exists(file_path):
                self.serve_file(file_path)
            else:
                self.send_error(404)
    
    def do_POST(self):
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/woorden':
            self.save_woord()
        else:
            self.send_error(404)
    
    def serve_file(self, filepath):
        try:
            with open(filepath, 'rb') as f:
                content = f.read()
            
            self.send_response(200)
            
            # Set correct content type
            if filepath.endswith('.html'):
                self.send_header('Content-type', 'text/html')
            elif filepath.endswith('.css'):
                self.send_header('Content-type', 'text/css')
            elif filepath.endswith('.js'):
                self.send_header('Content-type', 'application/javascript')
            else:
                self.send_header('Content-type', 'text/plain')
            
            self.end_headers()
            self.wfile.write(content)
        except FileNotFoundError:
            self.send_error(404)
    
    def get_woorden(self):
        try:
            if os.path.exists('woorden.json'):
                with open('woorden.json', 'r') as f:
                    data = json.load(f)
            else:
                data = []
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(data).encode())
        except Exception as e:
            self.send_response(500)
            self.end_headers()
    
    def save_woord(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Load existing words
            if os.path.exists('woorden.json'):
                with open('woorden.json', 'r') as f:
                    woorden = json.load(f)
            else:
                woorden = []
            
            # Add new word if not exists
            woord = data.get('woord', '').lower()
            if woord and woord not in woorden:
                woorden.append(woord)
                woorden.sort()
                
                # Save to file
                with open('woorden.json', 'w') as f:
                    json.dump(woorden, f)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'success': True}).encode())
        except Exception as e:
            self.send_response(500)
            self.end_headers()

def run_server():
    port = 8000
    # Gebruik '0.0.0.0' zodat andere computers kunnen verbinden
    server = HTTPServer(('0.0.0.0', port), ZyrianHandler)
    
    # Krijg je IP adres
    import socket
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    local_ip = s.getsockname()[0]
    s.close()
    
    print(f"Server draait op poort {port}")
    print(f"Jouw IP adres: {local_ip}")
    print(f"Jij kunt naar: http://localhost:{port}")
    print(f"Anderen kunnen naar: http://{local_ip}:{port}")
    print("Druk Ctrl+C om te stoppen")
    server.serve_forever()

if __name__ == '__main__':
    run_server()
