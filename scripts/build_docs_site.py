import os
import json

base_dir = '/home/daytona/plain-ui/apps/docs/src'

os.makedirs(os.path.join(base_dir, 'styles'), exist_ok=True)
os.makedirs(os.path.join(base_dir, 'components'), exist_ok=True)
os.makedirs(os.path.join(base_dir, 'layouts'), exist_ok=True)
os.makedirs(os.path.join(base_dir, 'pages/docs/components'), exist_ok=True)
os.makedirs(os.path.join(base_dir, 'data'), exist_ok=True)
os.makedirs(os.path.join(base_dir, 'utils'), exist_ok=True)

print('Directories ready.')
