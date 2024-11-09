from flask import Flask, request, jsonify, render_template
from requests import get

app = Flask(__name__)

def get_ip_details(ip=None):
    url = f'https://ipapi.co/{ip}/json/' if ip else 'https://ipapi.co/json/'
    response = get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Unable to retrieve IP details"}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_ip_details', methods=['POST'])
def fetch_ip_details():
    ip = request.form.get('ip')  # Get IP from the form data
    details = get_ip_details(ip)
    
    # Select only required fields
    result = {
        "ip": details.get("ip"),
        "version": details.get("version"),
        "organization": details.get("org"),
        "country_name": details.get("country_name"),
        "location": f"{details.get('latitude')}, {details.get('longitude')}"
    }
    
    return jsonify(result)  # Send JSON response to frontend

if __name__ == '__main__':
    app.run(debug=True)
