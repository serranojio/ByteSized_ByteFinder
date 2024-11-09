from flask import Flask, jsonify, render_template, request
import requests

main_api = "https://geo.ipify.org/api/v2/country,city?apiKey=at_Fmv5F8IfCGpi5gYC5ZC0omAWxHfN1&ipAddress=8.8.8.8"

app = Flask(__name__)

def get_ip_info():
    """Fetch public IPv4 and IPv6 information."""
    ipv4 = requests.get("https://api64.ipify.org?format=json").json().get("ip")
    ipv6 = requests.get("https://api64.ipify.org?format=json&ipv6=true").json().get("ip")
    return {"ipv4": ipv4, "ipv6": ipv6}

@app.route("/api/ip", methods=["GET"])
def api_ip():
    """API endpoint to retrieve IP information."""
    ip_info = get_ip_info()
    return jsonify(ip_info)

@app.route("/")
def home():
    """Home route to display IP information."""
    ip_info = get_ip_info()
    return render_template("index.html", ip_info=ip_info)

if __name__ == "_main_":
    app.run(debug=True)