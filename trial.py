from requests import get

"""
Trial py file for testing some of the application's functionality.
This contains code for the trials done (e.g., testing the fetching functionality) 
"""

def get_ip_details(ip=None, version="v4"):
    url = f'https://ipapi.co/{ip}/json/' if ip else f'https://ipapi.co/{version}/json/'
    response = get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error retrieving IP details for {version.upper()}.")
        return None

def display_ip_details(details):
    print("IP Address:", details.get("ip"))
    print("Version:", details.get("version"))
    print("Organization:", details.get("org"))  
    print("Country Name:", details.get("country_name"))
    print("Location (Latitude, Longitude):", f"{details.get('latitude')}, {details.get('longitude')}")

while True:
    choice = input("Do you want to get your current IP address details? (yes/no): ").strip().lower()
    
    if choice == "yes":
        print("Retrieving IPv4 details...")
        ipv4_details = get_ip_details(version="v4")
        if ipv4_details:
            print("Your IPv4 details:")
            display_ip_details(ipv4_details)

        print("\nRetrieving IPv6 details...")
        ipv6_details = get_ip_details(version="v6")
        if ipv6_details:
            print("Your IPv6 details:")
            display_ip_details(ipv6_details)
    elif choice == "no":
        ip_input = input("Enter an IP address to retrieve its details (or 'exit' to quit): ").strip()
        if ip_input.lower() == "exit":
            print("Exiting program.")
            break
        else:
            details = get_ip_details(ip_input)
            if details:
                print(f"Details for IP {ip_input}:")
                display_ip_details(details)
    else:
        print("Invalid input. Please enter 'yes' or 'no'.")
