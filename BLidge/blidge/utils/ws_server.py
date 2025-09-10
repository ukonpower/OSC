import logging
import threading
import json
import sys

from .. import Globals

sys.path.insert(0, Globals.libpath)

try:
    from websocket_server import WebsocketServer
except:
    print("websocket not found")

class WS:

    server = None
    on_connect = None
    server_thread = None

    def __init__(self):
        pass

    # server

    def start_server_thread(self):
        try:
            self.server.run_forever()
        except:
            pass

    def start_server(self, host, port):
        self.server = WebsocketServer( host=host, port=port, loglevel=logging.CRITICAL)
        self.server.set_fn_new_client(self.new_client)
        self.server_thread = threading.Thread(target=self.start_server_thread, daemon=True,)
        self.server_thread.start()
            
    def stop_server(self):
        if self.server != None:
            self.server.disconnect_clients_gracefully()
            self.server.shutdown_gracefully()
            self.server = None

    # client

    def new_client(self, client, server):
        if self.on_connect:
            self.on_connect(client)
        pass

    # send
    
    def get_str( self, type, data ):
        return json.dumps({
            "type": type,
            "data": data
        })
    
    def send(self, client, type, data):
        messageStr = self.get_str(type,data)
        
        if self.server:
            self.server.send_message(client, messageStr)

    def broadcast(self, type, data):
        messageStr = self.get_str(type,data)

        if self.server:
            self.server.send_message_to_all(messageStr)

        
