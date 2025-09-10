import base64
import struct

def int_array_to_base64( array ):
    return base64.b64encode(b''.join([struct.pack('<H', v) for v in array])).decode("ascii")

def float_array_to_base64( array ):
    return base64.b64encode(b''.join([struct.pack('<f', v) for v in array])).decode("ascii")