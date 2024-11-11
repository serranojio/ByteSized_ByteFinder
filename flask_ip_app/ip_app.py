from flask import Flask, render_template, request, jsonify
from requests import get

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

def get_ip_details(ip=None, version="v4"):
    """
    Getting the IP details function. This function uses the ipapi.co API
    to obtain IP address details for:
        a) user input
        b) user current public IP
    """
    url = f'https://ipapi.co/{ip}/json/' if ip else f'https://ipapi.co/{version}/json/'
    response = get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error retrieving IP details for {version.upper()}.")
        return None
    
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_ip_details', methods=['POST'])
def fetch_ip_details():
    data = request.json
    ip = data.get("ip", None)
    version = data.get("version", "v4")
    ip_details = get_ip_details(ip, version)
    return jsonify(ip_details)

if __name__ == '__main__':
    app.run(debug=True)
