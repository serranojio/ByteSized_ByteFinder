from requests import get

def get_ip_details(ip=None):
    url = f'https://ipapi.co/{ip}/json/' if ip else 'https://ipapi.co/json/'
    response = get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print("Error retrieving IP details.")
        return None

def display_ip_details(details):
    print("IP Address:", details.get("ip"))
    print("Version:", details.get("version"))
    print("Name:", details.get("org"))  
    print("Country Name:", details.get("country_name"))
    print("Location (Latitude, Longitude):", f"{details.get('latitude')}, {details.get('longitude')}")

while True:
    choice = input("Do you want to get your current IP address details? (yes/no): ").strip().lower()
    
    if choice == "yes":
        details = get_ip_details()
        if details:
            print("Your IP details:")
            display_ip_details(details)
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
