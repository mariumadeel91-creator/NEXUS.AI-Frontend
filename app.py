import os

# Flask ke route mein folder banao
if not os.path.exists('user_data'):
    os.makedirs('user_data')