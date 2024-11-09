from requests import get

def get_ip_details(ip=None):
    # Determine URL based on whether an IP address is provided or not
    url = f'https://ipapi.co/{ip}/json/' if ip else 'https://ipapi.co/json/'
    response = get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print("Error retrieving IP details.")
        return None

# Main program
while True:
    choice = input("Do you want to get your current IP address details? (yes/no): ").strip().lower()
    
    if choice == "yes":
        details = get_ip_details()  # No IP provided, gets current IP details
        if details:
            print("Your IP details:")
            print(details)
    elif choice == "no":
        ip_input = input("Enter an IP address to retrieve its details (or 'exit' to quit): ").strip()
        if ip_input.lower() == "exit":
            print("Exiting program.")
            break
        else:
            details = get_ip_details(ip_input)
            if details:
                print(f"Details for IP {ip_input}:")
                print(details)
    else:
        print("Invalid input. Please enter 'yes' or 'no'.")
