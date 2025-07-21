from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time

# Specify the full path to chromedriver.exe
driver_path = 'C:/Users/Ritika/chromedriver-win64/chromedriver.exe'  # Replace with your actual path

# Set up the Service object for ChromeDriver
service = Service(driver_path)

# Start Chrome using the Service object
driver = webdriver.Chrome(service=service)

# Open WhatsApp Web
driver.get('https://web.whatsapp.com')

# Wait for the QR code to be scanned
print("Scan the QR code from your phone...")
time.sleep(15)

# Find the chat by name (replace with your contact's name)
contact_name = "Ritika Sister"  # Replace with the contact you want to message
message = "Hello, this is a test message!"

# Wait for the chat to appear in the DOM
chat = driver.find_element(By.XPATH, f'//span[@title="{contact_name}"]')
chat.click()

# Wait for the message input field to load
time.sleep(2)

# Find the message input field and send the message
message_box = driver.find_element(By.XPATH, '//div[@contenteditable="true"][@data-tab="1"]')
message_box.send_keys(message)
message_box.send_keys(Keys.RETURN)

# Simulate typing (to show the typing indicator)
message_box.send_keys("I am typing...")  # This can be any random message
time.sleep(2)  # Wait for typing animation to appear

# Close the browser after sending the message
time.sleep(5)  # Keep the window open for a few seconds
driver.quit()
